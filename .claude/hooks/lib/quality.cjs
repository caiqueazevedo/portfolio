const fs = require("fs");
const path = require("path");

const MANIFEST = path.join(process.cwd(), ".claude", "quality.json");

function load() {
  try {
    return JSON.parse(fs.readFileSync(MANIFEST, "utf8"));
  } catch {
    return null;
  }
}

const DEFAULT_TYPES = ["feat", "fix", "docs", "style", "refactor", "test", "chore", "perf", "ci"];

function gateCommands(cfg, gate) {
  const names = cfg?.gate?.[gate]?.run ?? [];
  return names.map((n) => cfg?.commands?.[n]).filter((c) => typeof c === "string" && c.length > 0);
}

function checkCommit(cfg, message) {
  const subject = message.split("\n")[0].trim();
  if (!subject) return null;

  if (/Co-Authored-By:/i.test(message)) {
    return "A mensagem contem Co-Authored-By. Regra universal: sem coautoria.";
  }

  const rules = cfg?.commit ?? {};
  const types = rules.types ?? DEFAULT_TYPES;
  const max = rules.subject_max ?? 72;

  const m = subject.match(/^([a-z]+)(\(([^)]+)\))?(!)?: (.+)$/);
  if (!m) {
    return `Formato invalido: "${subject}". Esperado "<tipo>(<escopo>): <descricao>" com tipo em ${types.join(", ")}.`;
  }

  const [, type, , scope] = m;
  if (rules.type_aliases && rules.type_aliases[type]) {
    return `Tipo "${type}" foi aposentado neste repo; use "${rules.type_aliases[type]}".`;
  }
  if (!types.includes(type)) {
    return `Tipo "${type}" nao permitido neste repo. Tipos: ${types.join(", ")}.`;
  }
  if (rules.scope_required && !scope) {
    return `Escopo obrigatorio neste repo: "<tipo>(<escopo>): <descricao>".`;
  }
  if (rules.scope_aliases && scope && rules.scope_aliases[scope]) {
    return `Escopo "${scope}" foi aposentado neste repo; use "${rules.scope_aliases[scope]}". Duas grafias para o mesmo conceito partem o historico.`;
  }
  if (rules.scopes && scope && !rules.scopes.includes(scope)) {
    return `Escopo "${scope}" nao esta na lista do repo: ${rules.scopes.join(", ")}.`;
  }
  if (subject.length > max) {
    return `Assunto com ${subject.length} chars; maximo ${max}.`;
  }
  return null;
}

const [, , cmd, arg] = process.argv;
const cfg = load();

if (cmd === "gate") {
  if (cfg) process.stdout.write(gateCommands(cfg, arg).join("\n"));
  process.exit(0);
}

if (cmd === "blocking") {
  process.stdout.write(cfg?.gate?.[arg]?.blocking === true ? "true" : "false");
  process.exit(0);
}

if (cmd === "check-commit") {
  let message = "";
  try {
    message = fs.readFileSync(0, "utf8");
  } catch {
    process.exit(0);
  }
  const problem = checkCommit(cfg, message);
  if (problem) {
    process.stderr.write(problem);
    process.exit(1);
  }
  process.exit(0);
}

process.stderr.write(`uso: quality.cjs gate|blocking|check-commit`);
process.exit(2);
