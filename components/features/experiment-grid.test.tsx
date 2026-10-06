import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ExperimentGrid, type GridItem, type GridLabels } from "./experiment-grid";

vi.mock("./experiment-preview", () => ({
  ExperimentPreview: ({ title }: { title: string }) => <div>{title} preview</div>,
}));
vi.mock("@/i18n/navigation", () => ({ Link: (p: React.ComponentProps<"a">) => <a {...p} /> }));

const items: GridItem[] = [
  {
    slug: "b",
    title: "Beta",
    summary: "",
    tags: ["x"],
    category: "images",
    createdAt: "2026-09-15T10:00",
    dateLabel: "15 set",
  },
  {
    slug: "a",
    title: "Alpha",
    summary: "",
    tags: ["y"],
    category: "typography",
    createdAt: "2026-09-14T10:00",
    dateLabel: "14 set",
  },
  {
    slug: "c",
    title: "Gamma",
    summary: "",
    tags: ["z"],
    category: "images",
    createdAt: "2026-09-16T10:00",
    dateLabel: "16 set",
  },
];

const labels: GridLabels = {
  category: "Categoria",
  sort: "Ordem",
  all: "Todos",
  images: "Imagens & Filtros",
  typography: "Tipografia",
  interaction: "Interação & UI",
  data: "Dados & Visualização",
  security: "Segurança",
  media: "Mídia & Arquivos",
  kits: "Kits de UI",
  az: "A → Z",
  za: "Z → A",
  newest: "Mais novos",
  oldest: "Mais antigos",
  empty: "Nada.",
  open: "Abrir",
  hover: "hover",
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

  it("combines categories, narrows them and clears back to all", async () => {
    const user = userEvent.setup();
    render(<ExperimentGrid items={items} labels={labels} />);
    const cats = screen.getByRole("group", { name: "Categoria" });
    await user.click(within(cats).getByRole("checkbox", { name: "Imagens & Filtros" }));
    expect(titles()).toEqual(["Gamma", "Beta"]);
    expect(screen.getByText("2 itens")).toBeInTheDocument();
    await user.click(within(cats).getByRole("checkbox", { name: "Tipografia" }));
    expect(titles()).toEqual(["Gamma", "Beta", "Alpha"]);
    await user.click(within(cats).getByRole("checkbox", { name: "Imagens & Filtros" }));
    expect(titles()).toEqual(["Alpha"]);
    await user.click(within(cats).getByRole("button", { name: "Todos" }));
    expect(titles()).toHaveLength(3);
  });
});
