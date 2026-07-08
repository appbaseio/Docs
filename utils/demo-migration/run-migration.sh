#!/usr/bin/env bash
# Run a single demo index migration with full logging.
# Usage: ./run-migration.sh <index-name>
#   index-name: best-buy-dataset | recipes-demo

set -euo pipefail
export PYTHONUNBUFFERED=1

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LOG_DIR="${SCRIPT_DIR}/logs"
MIGRATE_PY="${SCRIPT_DIR}/migrate-demo-indexes.py"

INDEX_NAME="${1:-}"
if [[ -z "${INDEX_NAME}" ]]; then
  echo "Usage: $0 <index-name>" >&2
  echo "  index-name: best-buy-dataset | recipes-demo" >&2
  exit 1
fi

case "${INDEX_NAME}" in
  best-buy-dataset|recipes-demo) ;;
  *)
    echo "Unknown index: ${INDEX_NAME}" >&2
    echo "  Supported: best-buy-dataset, recipes-demo" >&2
    exit 1
    ;;
esac

if [[ "${IMPORT_ONLY:-}" != "1" && -z "${SOURCE_URL:-}" ]]; then
  echo "SOURCE_URL is not set" >&2
  exit 1
fi
if [[ -z "${DEST_URL:-}" ]]; then
  echo "DEST_URL is not set" >&2
  exit 1
fi

mkdir -p "${LOG_DIR}"
TIMESTAMP="$(date -u +"%Y%m%dT%H%M%SZ")"
LOG_FILE="${LOG_DIR}/${INDEX_NAME}-${TIMESTAMP}.log"

# Redact credentials from URLs for logging
redact_url() {
  local url="$1"
  echo "${url}" | sed -E 's|://[^@]+@|://***:***@|'
}

SOURCE_SAFE=""
if [[ -n "${SOURCE_URL:-}" ]]; then
  SOURCE_SAFE="$(redact_url "${SOURCE_URL}")"
fi
DEST_SAFE="$(redact_url "${DEST_URL}")"

MIGRATE_ARGS=(--index "${INDEX_NAME}" --force)
if [[ "${IMPORT_ONLY:-}" == "1" ]]; then
  MIGRATE_ARGS+=(--import-only)
else
  if [[ "${INDEX_NAME}" == "recipes-demo" ]]; then
    MIGRATE_ARGS+=(--max-docs 222286)
  fi
fi

EXIT_CODE=0
FINAL_COUNT="unknown"

log() {
  echo "[$(date -u +"%Y-%m-%dT%H:%M:%SZ")] $*" | tee -a "${LOG_FILE}"
}

on_error() {
  local line="$1"
  log "ERROR: command failed at line ${line} (exit ${EXIT_CODE:-1})"
  exit "${EXIT_CODE:-1}"
}

trap 'EXIT_CODE=$?; on_error ${LINENO}' ERR

log "=== Migration start: ${INDEX_NAME}${IMPORT_ONLY:+ (import-only)} ==="
log "Start time (UTC): $(date -u +"%Y-%m-%dT%H:%M:%SZ")"
if [[ -n "${SOURCE_URL:-}" ]]; then
  log "SOURCE_URL: ${SOURCE_SAFE}"
fi
log "DEST_URL: ${DEST_SAFE}"
log "Command: python3 ${MIGRATE_PY} ${MIGRATE_ARGS[*]}"
log ""

# Run migration; tee stdout/stderr to log
set +e
python3 "${MIGRATE_PY}" "${MIGRATE_ARGS[@]}" 2>&1 | tee -a "${LOG_FILE}"
EXIT_CODE="${PIPESTATUS[0]}"
set -e

log ""
log "Migration script exit code: ${EXIT_CODE}"

if [[ "${EXIT_CODE}" -eq 0 ]]; then
  # Query final _count on destination
  DEST_BASE="$(python3 -c "
import os, sys
url = os.environ['DEST_URL']
scheme, rest = url.split('://', 1)
host = rest.split('@', 1)[1]
print(f'{scheme}://{host}')
")"
  DEST_AUTH="$(python3 -c "
import os, base64
creds = os.environ['DEST_URL'].split('://', 1)[1].split('@', 1)[0]
print(base64.b64encode(creds.encode()).decode())
")"

  COUNT_RESPONSE="$(python3 -c "
import json, os, ssl, urllib.request
dest_base = '''${DEST_BASE}'''
auth = '''${DEST_AUTH}'''
index = '''${INDEX_NAME}'''
req = urllib.request.Request(f'{dest_base}/{index}/_count')
req.add_header('Authorization', f'Basic {auth}')
ctx = ssl.create_default_context()
with urllib.request.urlopen(req, context=ctx, timeout=60) as resp:
    print(json.loads(resp.read().decode()).get('count', 'unknown'))
" 2>/dev/null || echo "query_failed")"
  FINAL_COUNT="${COUNT_RESPONSE}"
  log "Final _count on Aiven: ${FINAL_COUNT}"
else
  log "Migration failed — see output above"
fi

log "End time (UTC): $(date -u +"%Y-%m-%dT%H:%M:%SZ")"
log "Log file: ${LOG_FILE}"
log "=== Migration end: ${INDEX_NAME} (exit ${EXIT_CODE}) ==="

exit "${EXIT_CODE}"
