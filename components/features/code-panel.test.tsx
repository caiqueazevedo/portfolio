import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { CodePanel } from "./code-panel";

const views = [
  { id: "html", label: "HTML", html: "<pre><code>&lt;div&gt;</code></pre>", code: "<div>", lines: 1 },
  { id: "css", label: "CSS", html: "<pre><code>body{}</code></pre>", code: "body{}", lines: 1 },
];

describe("CodePanel", () => {
  it("switches tabs and copies the active view", async () => {
    // userEvent.setup() installs a clipboard stub we can read back.
    const user = userEvent.setup();
    render(<CodePanel views={views} copyLabel="Copiar" copiedLabel="Copiado" linesLabel="linhas" />);

    expect(screen.getByRole("tab", { name: "HTML" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("<div>");

    await user.click(screen.getByRole("tab", { name: "CSS" }));
    expect(screen.getByRole("tabpanel")).toHaveTextContent("body{}");

    await user.click(screen.getByRole("button", { name: "Copiar" }));
    expect(await navigator.clipboard.readText()).toBe("body{}");
    expect(screen.getByRole("button", { name: "Copiado" })).toBeInTheDocument();
  });
});
