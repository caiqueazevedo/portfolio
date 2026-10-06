import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import type { ComponentProps } from "react";
import { describe, expect, it, vi } from "vitest";
import pt from "@/messages/pt.json";
import { LocaleSwitch } from "./locale-switch";
vi.mock("@/i18n/navigation", () => ({
  usePathname: () => "/work",
  Link: ({ href, locale, ...rest }: ComponentProps<"a"> & { locale: string }) => (
    <a href={`/${locale}${href}`} {...rest} />
  ),
}));

describe("LocaleSwitch", () => {
  it("links every locale to the current route and marks the active one", () => {
    render(
      <NextIntlClientProvider locale="pt" messages={pt}>
        <LocaleSwitch />
      </NextIntlClientProvider>,
    );
    const ptLink = screen.getByRole("link", { name: "Português" });
    const enLink = screen.getByRole("link", { name: "English" });
    expect(ptLink).toHaveAttribute("aria-current", "true");
    expect(ptLink).toHaveAttribute("href", "/pt/work");
    expect(enLink).not.toHaveAttribute("aria-current");
    expect(enLink).toHaveAttribute("href", "/en/work");
  });
});
