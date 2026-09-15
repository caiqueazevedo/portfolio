import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Cover } from "./cover";

describe("Cover", () => {
  it("renders the placeholder when there is no image yet", () => {
    render(<Cover src={null} alt="ZenID" />);
    const box = screen.getByTestId("cover");
    expect(box).toHaveAttribute("data-placeholder", "true");
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("renders the image when a source exists", () => {
    render(<Cover src="/media/covers/zenid.jpg" alt="ZenID" />);
    expect(screen.getByRole("img", { name: "ZenID" })).toBeInTheDocument();
    expect(screen.getByTestId("cover")).not.toHaveAttribute("data-placeholder");
  });
});
