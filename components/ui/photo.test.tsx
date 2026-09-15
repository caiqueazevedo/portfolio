import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Photo } from "./photo";

describe("Photo", () => {
  it("renders the grey placeholder with its caption when there is no image", () => {
    render(<Photo src={null} alt="" label="Seu retrato" />);
    expect(screen.getByTestId("photo")).toHaveAttribute("data-placeholder", "true");
    expect(screen.getByText("Seu retrato")).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("renders the image when a source exists", () => {
    render(<Photo src="/media/covers/zenid.jpg" alt="ZenID" label="ignored" />);
    expect(screen.getByRole("img", { name: "ZenID" })).toBeInTheDocument();
    expect(screen.queryByText("ignored")).not.toBeInTheDocument();
  });
});
