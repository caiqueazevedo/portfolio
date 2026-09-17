import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { CaseList, type CaseItem, type CaseLabels } from "./case-list";

vi.mock("@/i18n/navigation", () => ({ Link: (p: React.ComponentProps<"a">) => <a {...p} /> }));

const base = { summary: "", kind: "Kind", years: "2026", role: "Code", surfaces: "Web", stack: ["A", "B", "C", "D"], cover: null, tone: "acid" as const };
const items: CaseItem[] = [
  { ...base, slug: "zen", name: "Zen", number: "01", status: "production", featured: true, liveUrl: "https://zen.example.com", repoUrl: "https://github.com/x/zen" },
  { ...base, slug: "aeth", name: "Aeth", number: "02", status: "active", featured: true, liveUrl: null, repoUrl: null },
  { ...base, slug: "pol", name: "Pol", number: "03", status: "paused", featured: false, liveUrl: null, repoUrl: "https://github.com/x/pol" },
];

const labels: CaseLabels = {
  filter: "Status", all: "Todos", open: "Abrir case", live: "Ao vivo", repo: "Código", role: "Papel", year: "Ano",
  surfaces: "Superfícies", featured: "Em destaque", others: "Outros sistemas", empty: "Nada.", count: "{count} cases",
  status: { production: "Em produção", active: "Em desenvolvimento", paused: "Pausado" },
};

const names = () => screen.queryAllByRole("heading", { level: 3 }).map((h) => h.textContent);

describe("CaseList", () => {
  it("splits featured cases from the rest and links each one to its page", () => {
    render(<CaseList items={items} labels={labels} />);
    const featured = screen.getByRole("region", { name: /Em destaque/ });
    const others = screen.getByRole("region", { name: "Outros sistemas" });
    expect(within(featured).getAllByRole("heading", { level: 3 }).map((h) => h.textContent)).toEqual(["Zen", "Aeth"]);
    expect(within(others).getByRole("link", { name: "Pol" })).toHaveAttribute("href", "/work/pol");
    // Cards show three stack items and count the rest.
    expect(within(others).getByText("+1")).toBeInTheDocument();
  });

  it("opens external links in a new tab and omits them when absent", () => {
    render(<CaseList items={items} labels={labels} />);
    const live = screen.getByRole("link", { name: /zen\.example\.com/ });
    expect(live).toHaveAttribute("target", "_blank");
    expect(live).toHaveAttribute("rel", "noopener");
    const aeth = screen.getByRole("heading", { name: "Aeth" }).closest("article")!;
    expect(within(aeth).queryByRole("link", { name: /↗/ })).toBeNull();
  });

  it("filters by several statuses at once and clears back to all", async () => {
    const user = userEvent.setup();
    render(<CaseList items={items} labels={labels} />);
    const group = screen.getByRole("group", { name: "Status" });
    await user.click(within(group).getByRole("checkbox", { name: "Pausado" }));
    expect(names()).toEqual(["Pol"]);
    expect(screen.queryByRole("region", { name: /Em destaque/ })).toBeNull();
    expect(screen.getByText("1 cases")).toBeInTheDocument();
    await user.click(within(group).getByRole("checkbox", { name: "Em produção" }));
    expect(names()).toEqual(["Zen", "Pol"]);
    await user.click(within(group).getByRole("button", { name: "Todos" }));
    expect(names()).toHaveLength(3);
  });

  it("only offers statuses that exist in the list", () => {
    render(<CaseList items={items.filter((i) => i.status !== "active")} labels={labels} />);
    const group = screen.getByRole("group", { name: "Status" });
    expect(within(group).queryByRole("checkbox", { name: "Em desenvolvimento" })).toBeNull();
  });
});
