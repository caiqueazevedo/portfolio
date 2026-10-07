import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { FeaturedBoard } from "./featured-board";
import type { CaseView } from "@/lib/case-view";

vi.mock("@/i18n/navigation", () => ({
  Link: ({ href, ...props }: { href: string }) => <a href={href} {...props} />,
}));

const labels = { title: "Os sistemas", openCase: "Ver case →" };

const view = (index: number): CaseView => ({
  slug: `case-${index}`,
  name: `Case ${index}`,
  number: String(index).padStart(2, "0"),
  tag: `Tag ${index}`,
  status: "production",
  statusLabel: "Em produção",
  short: `Curto ${index}`,
  summary: `Descrição do case ${index}.`,
  stackLine: `Stack ${index}`,
  cover: null,
  href: `/work/case-${index}`,
});

const list = (count: number) => Array.from({ length: count }, (_, i) => view(i + 1));

describe("FeaturedBoard", () => {
  it("lists every case with its number and tag", () => {
    render(<FeaturedBoard items={list(6)} labels={labels} />);
    const rows = screen.getByTestId("featured-list");

    expect(within(rows).getAllByRole("link")).toHaveLength(6);
    expect(within(rows).getByText("Case 4")).toBeInTheDocument();
    expect(within(rows).getByText("Tag 4")).toBeInTheDocument();
  });

  it("opens on the first case, and counts it against the whole list", () => {
    render(<FeaturedBoard items={list(6)} labels={labels} />);
    expect(screen.getByTestId("featured-counter")).toHaveTextContent("01 / 06");
    expect(screen.getByText("Descrição do case 1.")).toBeInTheDocument();
  });

  it("follows the cursor: summary, stack, counter and the button all move together", () => {
    render(<FeaturedBoard items={list(6)} labels={labels} />);

    fireEvent.mouseEnter(within(screen.getByTestId("featured-list")).getByText("Case 4"));

    expect(screen.getByText("Descrição do case 4.")).toBeInTheDocument();
    expect(screen.getByText("Stack 4")).toBeInTheDocument();
    expect(screen.getByTestId("featured-counter")).toHaveTextContent("04 / 06");
    expect(screen.getByText(labels.openCase).closest("a")).toHaveAttribute("href", "/work/case-4");
  });

  it("answers the keyboard too, since the rows are links", () => {
    render(<FeaturedBoard items={list(6)} labels={labels} />);

    fireEvent.focus(within(screen.getByTestId("featured-list")).getByText("Case 2"));

    expect(screen.getByText("Descrição do case 2.")).toBeInTheDocument();
  });
});
