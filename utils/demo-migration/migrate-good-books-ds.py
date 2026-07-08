#!/usr/bin/env python3
"""
Migrate good-books-ds from legacy demo ES to Aiven OpenSearch.

Source physical index: good-books-ds_reindexed_9 (alias: good-books-ds)
Destination index:      good-books-ds

Usage:
  export SOURCE_URL='https://USER:PASS@source-host'
  export DEST_URL='https://USER:PASS@dest-host:PORT'
  python3 migrate-good-books-ds.py

Or pass --import-only to load from ./export/ (after a prior --export-only run).
"""

from __future__ import annotations

import argparse
import base64
import json
import os
import ssl
import sys
import urllib.error
import urllib.request
from pathlib import Path

SRC_INDEX = "good-books-ds_reindexed_9"
DEST_INDEX = "good-books-ds"
EXPORT_DIR = Path(__file__).resolve().parent / "export"
BULK_CHUNK_LINES = 1000  # 500 docs (2 lines each)


def basic_auth_header(url: str) -> str:
    # urllib doesn't embed auth from URL for Request; extract if needed
    if "@" not in url:
        return ""
    creds = url.split("://", 1)[1].split("@", 1)[0]
    return base64.b64encode(creds.encode()).decode()


def base_url(url: str) -> str:
    if "@" in url:
        scheme, rest = url.split("://", 1)
        host = rest.split("@", 1)[1]
        return f"{scheme}://{host}"
    return url.rstrip("/")


def http_json(method: str, url: str, path: str, body=None, auth_header: str = ""):
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(url + path, data=data, method=method)
    if auth_header:
        req.add_header("Authorization", f"Basic {auth_header}")
    if data is not None:
        req.add_header("Content-Type", "application/json")
    ctx = ssl.create_default_context()
    try:
        with urllib.request.urlopen(req, context=ctx, timeout=120) as resp:
            raw = resp.read().decode()
            return resp.status, json.loads(raw) if raw else {}
    except urllib.error.HTTPError as e:
        raw = e.read().decode()
        try:
            payload = json.loads(raw)
        except json.JSONDecodeError:
            payload = {"error": raw}
        return e.code, payload


def http_bulk(url: str, ndjson: bytes, auth_header: str):
    req = urllib.request.Request(url + "/_bulk?refresh=false", data=ndjson, method="POST")
    req.add_header("Authorization", f"Basic {auth_header}")
    req.add_header("Content-Type", "application/x-ndjson")
    ctx = ssl.create_default_context()
    with urllib.request.urlopen(req, context=ctx, timeout=300) as resp:
        return json.loads(resp.read().decode())


def export_from_source(source_url: str, auth_header: str):
    EXPORT_DIR.mkdir(parents=True, exist_ok=True)
    base = base_url(source_url)

    print("Exporting settings…")
    code, settings_wrap = http_json("GET", base, f"/{SRC_INDEX}/_settings?pretty=false", auth_header=auth_header)
    if code != 200:
        sys.exit(f"settings export failed ({code}): {settings_wrap}")

    print("Exporting mapping…")
    code, mapping_wrap = http_json("GET", base, f"/{SRC_INDEX}/_mapping?pretty=false", auth_header=auth_header)
    if code != 200:
        sys.exit(f"mapping export failed ({code}): {mapping_wrap}")

    (EXPORT_DIR / "settings.json").write_text(json.dumps(settings_wrap))
    (EXPORT_DIR / "mapping.json").write_text(json.dumps(mapping_wrap))

    print("Exporting documents via scroll…")
    count = 0
    bulk_path = EXPORT_DIR / "data.bulk.ndjson"
    with bulk_path.open("w") as f:
        code, res = http_json(
            "POST",
            base,
            f"/{SRC_INDEX}/_search?scroll=5m",
            {"size": 500, "query": {"match_all": {}}},
            auth_header=auth_header,
        )
        if code != 200:
            sys.exit(f"search failed ({code}): {res}")
        scroll_id = res["_scroll_id"]
        while True:
            hits = res["hits"]["hits"]
            if not hits:
                break
            for h in hits:
                f.write(json.dumps({"index": {"_index": DEST_INDEX, "_id": h["_id"]}}) + "\n")
                f.write(json.dumps(h["_source"]) + "\n")
                count += 1
            code, res = http_json(
                "POST", base, "/_search/scroll", {"scroll": "5m", "scroll_id": scroll_id}, auth_header=auth_header
            )
            if code != 200:
                sys.exit(f"scroll failed ({code}): {res}")
            scroll_id = res.get("_scroll_id", scroll_id)
        http_json("DELETE", base, "/_search/scroll", {"scroll_id": scroll_id}, auth_header=auth_header)

    print(f"Exported {count} documents to {bulk_path}")


def build_create_payload() -> dict:
    settings_wrap = json.loads((EXPORT_DIR / "settings.json").read_text())
    mapping_wrap = json.loads((EXPORT_DIR / "mapping.json").read_text())
    settings = settings_wrap[SRC_INDEX]["settings"]
    mapping = mapping_wrap[SRC_INDEX]["mappings"]
    index_settings = settings.get("index", {})
    for key in ("creation_date", "uuid", "version", "provided_name", "routing", "store"):
        index_settings.pop(key, None)
    return {"settings": {"index": index_settings}, "mappings": mapping}


def import_to_dest(dest_url: str, auth_header: str):
    base = base_url(dest_url)
    print("Checking destination cluster…")
    code, health = http_json("GET", base, "/_cluster/health", auth_header=auth_header)
    if code != 200:
        sys.exit(f"Destination auth/health failed ({code}): {health}")

    payload = build_create_payload()
    (EXPORT_DIR / "create-index.json").write_text(json.dumps(payload, indent=2))

    code, exists = http_json("HEAD", base, f"/{DEST_INDEX}", auth_header=auth_header)
    if code == 404:
        print(f"Creating index {DEST_INDEX}…")
        code, res = http_json("PUT", base, f"/{DEST_INDEX}", payload, auth_header=auth_header)
        if code not in (200, 201):
            sys.exit(f"Create index failed ({code}): {res}")
        print("Index created.")
    else:
        print(f"Index {DEST_INDEX} already exists (status {code}); skipping create.")

    bulk_path = EXPORT_DIR / "data.bulk.ndjson"
    if not bulk_path.exists():
        sys.exit(f"Missing {bulk_path}; run export first.")

    print("Bulk loading documents…")
    lines = bulk_path.read_text().splitlines()
    loaded = 0
    for i in range(0, len(lines), BULK_CHUNK_LINES):
        chunk = "\n".join(lines[i : i + BULK_CHUNK_LINES]) + "\n"
        result = http_bulk(base, chunk.encode(), auth_header)
        if result.get("errors"):
            sys.exit(f"Bulk errors: {json.dumps(result, indent=2)[:2000]}")
        loaded += len(lines[i : i + BULK_CHUNK_LINES]) // 2
        print(f"  …{loaded} docs")

    http_json("POST", base, f"/{DEST_INDEX}/_refresh", auth_header=auth_header)
    code, count = http_json("GET", base, f"/{DEST_INDEX}/_count", auth_header=auth_header)
    print(f"Done. _count on {DEST_INDEX}: {count}")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--export-only", action="store_true")
    parser.add_argument("--import-only", action="store_true")
    args = parser.parse_args()

    source_url = os.environ.get("SOURCE_URL")
    dest_url = os.environ.get("DEST_URL")
    if not args.import_only and not source_url:
        sys.exit("Set SOURCE_URL for export (or use --import-only).")
    if not args.export_only and not dest_url:
        sys.exit("Set DEST_URL for import (or use --export-only).")

    if not args.import_only:
        export_from_source(source_url, basic_auth_header(source_url))
    if not args.export_only:
        import_to_dest(dest_url, basic_auth_header(dest_url))


if __name__ == "__main__":
    main()
