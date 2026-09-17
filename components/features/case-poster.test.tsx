import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CasePoster } from "./case-poster";

describe("CasePoster", () => {
  it("draws a typographic poster when there is no cover", () => {
    render(<CasePoster name="ZenID" number="01" year="2026" caption="Identidade" tone="blue" src={null} />);
    const poster = screen.getByTestId("case-poster");
    expect(poster).toHaveAttribute("aria-hidden", "true");
    expect(poster).toHaveTextContent("case 01 / 2026");
    expect(poster).toHaveTextContent("Identidade");
    expect(screen.queryByTestId("photo")).toBeNull();
  });

  it("shrinks long names so the frame keeps them readable", () => {
    const { rerender } = render(<CasePoster name="Zen" number="01" year="2026" caption="x" tone="acid" src={null} />);
    const short = parseFloat((screen.getByTestId("case-poster").firstElementChild as HTMLElement).style.fontSize);
    rerender(<CasePoster name="Claude Usage Hub" number="01" year="2026" caption="x" tone="acid" src={null} />);
    const long = parseFloat((screen.getByTestId("case-poster").firstElementChild as HTMLElement).style.fontSize);
    expect(long).toBeLessThan(short);
  });

  it("uses the real cover once it exists", () => {
    render(<CasePoster name="ZenID" number="01" year="2026" caption="x" tone="acid" src="/media/covers/zenid.webp" />);
    expect(screen.getByTestId("photo")).not.toHaveAttribute("data-placeholder");
    expect(screen.queryByTestId("case-poster")).toBeNull();
  });
});
