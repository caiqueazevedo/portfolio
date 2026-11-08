#!/bin/bash

INPUT=$(cat)
PAYLOAD="$(dirname "$0")/lib/payload.cjs"

COMMAND=$(printf '%s' "$INPUT" | node "$PAYLOAD" command)

block() {
  echo "BLOCKED: $1" >&2
  exit 2
}

if echo "$COMMAND" | grep -qE 'rm\s+(-[a-zA-Z]*\s+)*-?[rRfF]+[a-zA-Z]*\s+(/|~|\$HOME|\.\s*$|\*\s*$)'; then
  block "rm -rf em caminho perigoso. Confirme manualmente."
fi

if echo "$COMMAND" | grep -qE 'git\s+push.*(--force|-f)\b' && echo "$COMMAND" | grep -qE '\b(main|master)\b'; then
  block "git push --force em main/master. Use --force-with-lease em branch, nunca force na main."
fi

if echo "$COMMAND" | grep -qE 'git\s+commit.*--no-verify'; then
  block "git commit --no-verify contorna os hooks de qualidade. Corrija a causa raiz."
fi

if echo "$COMMAND" | grep -qiE 'drop\s+(table|schema|database)\b'; then
  block "DROP detectado. Rule 13: nunca dropar sem confirmacao explicita do usuario."
fi

if echo "$COMMAND" | grep -qiE 'truncate\s+table\b'; then
  block "TRUNCATE TABLE detectado. Confirme manualmente antes de apagar dados."
fi

if echo "$COMMAND" | grep -qE 'SERVICE_ROLE_KEY'; then
  block "Comando referencia SERVICE_ROLE_KEY. Rule 04: nunca expor a service role key."
fi

if echo "$COMMAND" | grep -qE 'wrangler\s+secret\s+put\s+\S+\s+\S'; then
  block "Valor de segredo inline em 'wrangler secret put'. Passe por stdin — argumento vai para o historico do shell."
fi

if echo "$COMMAND" | grep -qE '(^|[;&|]|&&|\|\||[[:space:]]&&[[:space:]])[[:space:]]*(sudo[[:space:]]+)?(curl|wget|iwr|irm)[[:space:]][^|]*\|[[:space:]]*(sudo[[:space:]]+)?(bash|sh|zsh|iex|python[0-9.]*|node)\b'; then
  block "Execucao de codigo remoto sem revisao (curl|bash). Baixe, leia o script, rode em dois passos."
fi

exit 0
