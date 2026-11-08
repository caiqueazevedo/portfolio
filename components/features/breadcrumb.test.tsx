import type { ComponentProps } from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import type { Target } from "@/lib/urls";
import { Breadcrumb, type Crumb } from "./breadcrumb";

vi.mock("@/i18n/navigation", () => ({
  Link: ({ href, ...props }: ComponentProps<"a">) => <a href={href} {...props} />,
}));

const HOME: Target = { url: "https://www.caiqueazevedo.com.br/pt", link: "/" };
const WORK: Target = { url: "https://www.caiqueazevedo.com.br/pt/work", link: "/work" };
const OPEN_SOURCE: Target = { url: "https://open-source.caiqueazevedo.com.br/pt", link: null };

const trail: Crumb[] = [
  { label: "Início", target: HOME },
  { label: "Cases", target: WORK },
  { label: "ZenID" },
];

const jsonLd = (container: HTMLElement) =>
  JSON.parse(container.querySelector('script[type="application/ld+json"]')!.innerHTML);

describe("Breadcrumb", () => {
  it("draws one item per crumb, in the order given", () => {
    render(<Breadcrumb items={trail} label="Trilha" />);
    const items = screen.getAllByRole("listitem").map((li) => li.textContent);
    expect(items).toEqual(["Início", "/Cases", "/ZenID"]);
  });

  it("links every crumb but the current one, by path", () => {
    render(<Breadcrumb items={trail} label="Trilha" />);
    const hrefs = screen.getAllByRole("link").map((a) => a.getAttribute("href"));
    expect(hrefs).toEqual([HOME.link, WORK.link]);
    expect(screen.queryByRole("link", { name: "ZenID" })).not.toBeInTheDocument();
  });

  it("names the host when a crumb has to cross to it", () => {
    render(
      <Breadcrumb
        items={[
          { label: "Início", target: HOME },
          { label: "Código aberto", target: OPEN_SOURCE },
          { label: "Pixel sort" },
        ]}
        label="Trilha"
      />,
    );
    expect(screen.getByRole("link", { name: "Código aberto" })).toHaveAttribute(
      "href",
      OPEN_SOURCE.url,
    );
  });

  it("marks the last crumb as the current page", () => {
    render(<Breadcrumb items={trail} label="Trilha" />);
    expect(screen.getByText("ZenID")).toHaveAttribute("aria-current", "page");
    expect(screen.getByText("Cases")).not.toHaveAttribute("aria-current");
  });

  it("hides the separators from the accessibility tree", () => {
    render(<Breadcrumb items={trail} label="Trilha" />);
    const hidden = screen.getAllByText("/", { ignore: "script" });
    expect(hidden).toHaveLength(2);
    for (const sep of hidden) expect(sep).toHaveAttribute("aria-hidden", "true");
  });

  it("names the trail for a screen reader", () => {
    render(<Breadcrumb items={trail} label="Trilha de navegação" />);
    expect(screen.getByRole("navigation", { name: "Trilha de navegação" })).toBeInTheDocument();
  });

  it("keeps the BreadcrumbList absolute even where the links are relative", () => {
    const { container } = render(<Breadcrumb items={trail} label="Trilha" />);
    expect(jsonLd(container)).toEqual({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: HOME.url },
        { "@type": "ListItem", position: 2, name: "Cases", item: WORK.url },
        { "@type": "ListItem", position: 3, name: "ZenID" },
      ],
    });
  });

  it("escapes a closing tag so a label cannot break out of the script", () => {
    const { container } = render(
      <Breadcrumb items={[{ label: "</script><b>x" }]} label="Trilha" />,
    );
    const script = container.querySelector('script[type="application/ld+json"]')!;
    expect(script.innerHTML).not.toContain("</script");
    expect(jsonLd(container).itemListElement[0].name).toBe("</script><b>x");
  });

  it("carries the placement classes the page asks for", () => {
    render(<Breadcrumb items={trail} label="Trilha" className="absolute top-4" />);
    expect(screen.getByRole("navigation", { name: "Trilha" }).className).toContain("absolute");
  });
});
