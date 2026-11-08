const fs = require("fs");

let raw = "";
try {
  raw = fs.readFileSync(0, "utf8");
} catch {
  process.exit(0);
}

let data;
try {
  data = JSON.parse(raw);
} catch {
  process.exit(0);
}

const input = data.tool_input ?? data;
const field = process.argv[2];

let value;
if (field === "content") {
  value = input.content ?? input.new_string ?? "";
} else if (field === "tool_name") {
  value = data.tool_name ?? "";
} else {
  value = input[field] ?? "";
}

process.stdout.write(String(value));
