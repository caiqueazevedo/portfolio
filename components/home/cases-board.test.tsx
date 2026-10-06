import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { CasesBoard } from "./cases-board";
import type { CaseView } from "@/lib/case-view";

vi.mock("@/i18n/navigation", () => ({
  Link: ({ href, ...props }: { href: string }) => <a href={href} {...props} />,
}));

const labels = { title: "Todos os cases", hint: "hint", openCase: "Ver case →", stack: "Stack" };

const view = (index: number): CaseView => ({
  slug: `case-${index}`,
  name: `Case ${index}`,
  number: String(index).padStart(2, "0"),
  tag: "Identidade",
  status: index % 2 === 0 ? "production" : "paused",
  statusLabel: index % 2 === 0 ? "Em produção" : "Pausado",
  short: `Resumo curto ${index}`,
  summary: `Descrição longa do case ${index}.`,
  stackLine: "React · Workers",
  cover: null,
  href: `/work/case-${index}`,
});

const list = (count: number) => Array.from({ length: count }, (_, i) => view(i + 1));

describe("CasesBoard", () => {
  it("draws cards while the list still fits on a screen", () => {
    render(<CasesBoard items={list(6)} labels={labels} />);
    expect(screen.getByTestId("case-cards")).toBeInTheDocument();
    expect(screen.queryByTestId("case-index")).not.toBeInTheDocument();
  });

  it("turns into an index once there are more than eight", () => {
    render(<CasesBoard items={list(12)} labels={labels} />);
    expect(screen.getByTestId("case-index")).toBeInTheDocument();
    expect(screen.queryByTestId("case-cards")).not.toBeInTheDocument();
  });

  it("opens the first case in the detail pane before anyone hovers", () => {
    render(<CasesBoard items={list(12)} labels={labels} />);
    const detail = screen.getByTestId("case-detail");
    expect(within(detail).getByText("Descrição longa do case 1.")).toBeInTheDocument();
  });

  it("follows the cursor down the index", () => {
    render(<CasesBoard items={list(12)} labels={labels} />);
    const rows = screen.getByTestId("case-index-list");
    const detail = screen.getByTestId("case-detail");

    fireEvent.mouseEnter(within(rows).getByText("Case 5"));

    expect(within(detail).getByText("Descrição longa do case 5.")).toBeInTheDocument();
    expect(within(detail).queryByText("Descrição longa do case 1.")).not.toBeInTheDocument();
  });

  it("gives every card a link to its case", () => {
    const cards = render(<CasesBoard items={list(6)} labels={labels} />);
    const card = within(cards.getByTestId("case-cards")).getAllByRole("link")[2];
    expect(card).toHaveAttribute("href", "/work/case-3");
  });
});
