import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ExperimentGrid, type GridItem, type GridLabels } from "./experiment-grid";

vi.mock("./experiment-preview", () => ({ ExperimentPreview: ({ title }: { title: string }) => <div>{title} preview</div> }));
vi.mock("@/i18n/navigation", () => ({ Link: (p: React.ComponentProps<"a">) => <a {...p} /> }));

const items: GridItem[] = [
  { slug: "b", title: "Beta", summary: "", tags: ["x"], category: "filter", createdAt: "2026-09-15T10:00", dateLabel: "15 set" },
  { slug: "a", title: "Alpha", summary: "", tags: ["y"], category: "typography", createdAt: "2026-09-14T10:00", dateLabel: "14 set" },
  { slug: "c", title: "Gamma", summary: "", tags: ["z"], category: "filter", createdAt: "2026-09-16T10:00", dateLabel: "16 set" },
];

const labels: GridLabels = {
  category: "Categoria", sort: "Ordem", all: "Todos", filter: "Filtro", typography: "Tipografia", collage: "Colagem",
  az: "A → Z", za: "Z → A", newest: "Mais novos", oldest: "Mais antigos", empty: "Nada.", open: "Abrir", hover: "hover",
  count: "{count} itens",
};

const titles = () => screen.getAllByRole("heading", { level: 2 }).map((h) => h.textContent);

describe("ExperimentGrid", () => {
  it("starts with the newest first and sorts alphabetically on request", async () => {
    const user = userEvent.setup();
    render(<ExperimentGrid items={items} labels={labels} />);
    expect(titles()).toEqual(["Gamma", "Beta", "Alpha"]);
    await user.selectOptions(screen.getByLabelText("Ordem"), "az");
    expect(titles()).toEqual(["Alpha", "Beta", "Gamma"]);
    await user.selectOptions(screen.getByLabelText("Ordem"), "oldest");
    expect(titles()).toEqual(["Alpha", "Beta", "Gamma"]);
  });

  it("combines several categories, clears them, and shows count and empty state", async () => {
    const user = userEvent.setup();
    render(<ExperimentGrid items={items} labels={labels} />);
    const cats = screen.getByRole("group", { name: "Categoria" });
    await user.click(within(cats).getByRole("checkbox", { name: "Filtro" }));
    expect(titles()).toEqual(["Gamma", "Beta"]);
    expect(screen.getByText("2 itens")).toBeInTheDocument();
    await user.click(within(cats).getByRole("checkbox", { name: "Tipografia" }));
    expect(titles()).toEqual(["Gamma", "Beta", "Alpha"]);
    await user.click(within(cats).getByRole("checkbox", { name: "Filtro" }));
    await user.click(within(cats).getByRole("checkbox", { name: "Tipografia" }));
    await user.click(within(cats).getByRole("checkbox", { name: "Colagem" }));
    expect(screen.queryAllByRole("heading", { level: 2 })).toHaveLength(0);
    expect(screen.getByText("Nada.")).toBeInTheDocument();
    await user.click(within(cats).getByRole("button", { name: "Todos" }));
    expect(titles()).toHaveLength(3);
  });
});
