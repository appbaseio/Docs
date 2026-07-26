#!/usr/bin/env python3
"""
Migrate demo Elasticsearch indices from legacy cluster to Aiven OpenSearch.

Each entry: (source_physical_index, destination_index_name)
"""

from __future__ import annotations

import argparse
import base64
import json
import os
import ssl
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path

# (source physical index, destination alias/name used by demos)
DEMO_INDICES = [
    ("good-books_reindexed_5", "good-books"),
    ("clone-airbeds_reindexed_22", "clone-airbeds"),
    ("earthquakes_reindexed_1", "earthquakes"),
    ("docs-demo_reindexed_3", "docs-demo"),
    ("best-buy-dataset_reindexed_6", "best-buy-dataset"),
    ("recipes-demo", "recipes-demo"),  # use --max-docs for ~10% sample
]

EXPORT_ROOT = Path(__file__).resolve().parent / "export"
BULK_CHUNK_LINES = 1000


def basic_auth_header(url: str) -> str:
    creds = url.split("://", 1)[1].split("@", 1)[0]
    return base64.b64encode(creds.encode()).decode()


def base_url(url: str) -> str:
    scheme, rest = url.split("://", 1)
    host = rest.split("@", 1)[1]
    return f"{scheme}://{host}"


def _request_with_retry(fn, label: str, max_attempts: int = 8):
    delay = 2.0
    for attempt in range(1, max_attempts + 1):
        try:
            return fn()
        except (urllib.error.URLError, ConnectionResetError, TimeoutError, OSError) as e:
            if attempt == max_attempts:
                raise RuntimeError(f"{label} failed after {max_attempts} attempts: {e}") from e
            print(f"    {label} retry {attempt}/{max_attempts} ({e}); waiting {delay:.0f}s…")
            time.sleep(delay)
            delay = min(delay * 2, 60.0)


def http_json(method: str, url: str, path: str, body=None, auth_header: str = "", timeout: int = 120):
    def do_request():
        data = json.dumps(body).encode() if body is not None else None
        req = urllib.request.Request(url + path, data=data, method=method)
        if auth_header:
            req.add_header("Authorization", f"Basic {auth_header}")
        if data is not None:
            req.add_header("Content-Type", "application/json")
        ctx = ssl.create_default_context()
        try:
            with urllib.request.urlopen(req, context=ctx, timeout=timeout) as resp:
                raw = resp.read().decode()
                if method == "HEAD":
                    return resp.status, {}
                return resp.status, json.loads(raw) if raw else {}
        except urllib.error.HTTPError as e:
            raw = e.read().decode()
            try:
                payload = json.loads(raw)
            except json.JSONDecodeError:
                payload = {"error": raw}
            return e.code, payload

    return _request_with_retry(do_request, f"{method} {path}")


def http_bulk(url: str, ndjson: bytes, auth_header: str):
    def do_request():
        req = urllib.request.Request(url + "/_bulk?refresh=false", data=ndjson, method="POST")
        req.add_header("Authorization", f"Basic {auth_header}")
        req.add_header("Content-Type", "application/x-ndjson")
        ctx = ssl.create_default_context()
        with urllib.request.urlopen(req, context=ctx, timeout=600) as resp:
            return json.loads(resp.read().decode())

    return _request_with_retry(do_request, "bulk")


def export_index(
    source_base: str, auth: str, src_index: str, dest_index: str, export_dir: Path, max_docs: int | None = None
):
    export_dir.mkdir(parents=True, exist_ok=True)

    code, settings_wrap = http_json("GET", source_base, f"/{src_index}/_settings", auth_header=auth)
    if code != 200:
        raise RuntimeError(f"settings export failed ({code}): {settings_wrap}")

    code, mapping_wrap = http_json("GET", source_base, f"/{src_index}/_mapping", auth_header=auth)
    if code != 200:
        raise RuntimeError(f"mapping export failed ({code}): {mapping_wrap}")

    (export_dir / "settings.json").write_text(json.dumps(settings_wrap))
    (export_dir / "mapping.json").write_text(json.dumps(mapping_wrap))

    count = 0
    bulk_path = export_dir / "data.bulk.ndjson"
    with bulk_path.open("w") as f:
        code, res = http_json(
            "POST",
            source_base,
            f"/{src_index}/_search?scroll=10m",
            {"size": 500, "query": {"match_all": {}}},
            auth_header=auth,
            timeout=300,
        )
        if code != 200:
            raise RuntimeError(f"search failed ({code}): {res}")
        scroll_id = res["_scroll_id"]
        while True:
            hits = res["hits"]["hits"]
            if not hits:
                break
            for h in hits:
                f.write(json.dumps({"index": {"_index": dest_index, "_id": h["_id"]}}) + "\n")
                f.write(json.dumps(h["_source"]) + "\n")
                count += 1
                if max_docs and count >= max_docs:
                    break
            if max_docs and count >= max_docs:
                break
            if count % 10000 == 0:
                print(f"    exported {count} docs…")
            code, res = http_json(
                "POST",
                source_base,
                "/_search/scroll",
                {"scroll": "10m", "scroll_id": scroll_id},
                auth_header=auth,
                timeout=300,
            )
            if code != 200:
                raise RuntimeError(f"scroll failed ({code}): {res}")
            scroll_id = res.get("_scroll_id", scroll_id)
        http_json("DELETE", source_base, "/_search/scroll", {"scroll_id": scroll_id}, auth_header=auth)

    return count


def build_create_payload(export_dir: Path, src_index: str) -> dict:
    settings_wrap = json.loads((export_dir / "settings.json").read_text())
    mapping_wrap = json.loads((export_dir / "mapping.json").read_text())
    settings = settings_wrap[src_index]["settings"]
    mapping = mapping_wrap[src_index]["mappings"]
    index_settings = settings.get("index", {})
    for key in (
        "creation_date",
        "uuid",
        "version",
        "provided_name",
        "routing",
        "store",
        "blocks",
        "resize",
        "history",  # private on OpenSearch — cannot be set on create
    ):
        index_settings.pop(key, None)
    # demo cluster: single shard, no replicas
    index_settings["number_of_shards"] = "1"
    index_settings["number_of_replicas"] = "0"
    index_settings.pop("auto_expand_replicas", None)
    return {"settings": {"index": index_settings}, "mappings": mapping}


def import_index(dest_base: str, auth: str, src_index: str, dest_index: str, export_dir: Path, skip_existing: bool):
    bulk_path = export_dir / "data.bulk.ndjson"
    if not bulk_path.exists():
        raise RuntimeError(f"missing {bulk_path}")

    code, _ = http_json("HEAD", dest_base, f"/{dest_index}", auth_header=auth)
    if code == 200 and skip_existing:
        code, count = http_json("GET", dest_base, f"/{dest_index}/_count", auth_header=auth)
        print(f"  skip {dest_index} (exists, count={count.get('count')})")
        return count.get("count", 0)

    payload = build_create_payload(export_dir, src_index)
    if code == 404:
        print(f"  creating {dest_index}…")
        code, res = http_json("PUT", dest_base, f"/{dest_index}", payload, auth_header=auth, timeout=300)
        if code not in (200, 201):
            raise RuntimeError(f"create failed ({code}): {res}")
    elif code == 200:
        print(f"  reindexing into existing {dest_index}…")

    loaded = 0
    chunk_lines: list[str] = []

    def flush_chunk():
        nonlocal loaded, chunk_lines
        if not chunk_lines:
            return
        chunk = "\n".join(chunk_lines) + "\n"
        result = http_bulk(dest_base, chunk.encode(), auth)
        if result.get("errors"):
            err_items = [it for it in result.get("items", []) if "error" in it.get("index", {})][:3]
            raise RuntimeError(f"bulk errors: {json.dumps(err_items, indent=2)}")
        loaded += len(chunk_lines) // 2
        if loaded % 10000 == 0:
            print(f"    loaded {loaded} docs…")
        chunk_lines = []

    with bulk_path.open() as f:
        for line in f:
            chunk_lines.append(line.rstrip("\n"))
            if len(chunk_lines) >= BULK_CHUNK_LINES:
                flush_chunk()
    flush_chunk()
    print(f"    loaded {loaded} docs (final)")

    http_json("POST", dest_base, f"/{dest_index}/_refresh", auth_header=auth)
    code, count = http_json("GET", dest_base, f"/{dest_index}/_count", auth_header=auth)
    return count.get("count", 0)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--export-only", action="store_true")
    parser.add_argument("--import-only", action="store_true")
    parser.add_argument("--index", action="append", help="destination index name(s) to migrate")
    parser.add_argument("--force", action="store_true", help="re-import even if index exists")
    parser.add_argument("--max-docs", type=int, default=None, help="limit export to N documents (for large indices)")
    args = parser.parse_args()

    source_url = os.environ.get("SOURCE_URL")
    dest_url = os.environ.get("DEST_URL")
    if not args.import_only and not source_url:
        sys.exit("Set SOURCE_URL")
    if not args.export_only and not dest_url:
        sys.exit("Set DEST_URL")

    selected = {d for _, d in DEMO_INDICES}
    if args.index:
        selected = set(args.index)

    pairs = [(s, d) for s, d in DEMO_INDICES if d in selected]
    if not pairs:
        sys.exit(f"No matching indices. Available: {[d for _, d in DEMO_INDICES]}")

    source_auth = basic_auth_header(source_url) if source_url else ""
    dest_auth = basic_auth_header(dest_url) if dest_url else ""
    source_base = base_url(source_url) if source_url else ""
    dest_base = base_url(dest_url) if dest_url else ""

    for src_index, dest_index in pairs:
        export_dir = EXPORT_ROOT / dest_index
        print(f"\n=== {src_index} → {dest_index} ===")
        if not args.import_only:
            print("  exporting…")
            n = export_index(
                source_base, source_auth, src_index, dest_index, export_dir, max_docs=args.max_docs
            )
            print(f"  exported {n} docs")
        if not args.export_only:
            print("  importing…")
            n = import_index(dest_base, dest_auth, src_index, dest_index, export_dir, skip_existing=not args.force)
            print(f"  done: {dest_index} count={n}")

    print("\nAll requested migrations finished.")


if __name__ == "__main__":
    main()
