#!/bin/bash

INPUT=$(cat)
PAYLOAD="$(dirname "$0")/lib/payload.cjs"

FILE_PATH=$(printf '%s' "$INPUT" | node "$PAYLOAD" file_path)

if [[ "$FILE_PATH" =~ \.(ts|tsx|js|jsx)$ ]]; then
  if [[ "$FILE_PATH" == *"node_modules"* ]] || [[ "$FILE_PATH" == *"dist/"* ]] || [[ "$FILE_PATH" == *".venv"* ]]; then
    exit 0
  fi

  npx prettier --write "$FILE_PATH" 2>/dev/null
  npx eslint --fix "$FILE_PATH" 2>/dev/null
fi

exit 0
