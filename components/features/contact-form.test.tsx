import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NextIntlClientProvider } from "next-intl";
import { afterEach, describe, expect, it, vi } from "vitest";
import pt from "@/messages/pt.json";
import { ContactForm } from "./contact-form";
vi.mock("@marsidev/react-turnstile", () => ({
  Turnstile: ({ onSuccess }: { onSuccess: (t: string) => void }) => (
    <button type="button" onClick={() => onSuccess("tok")}>
      solve
    </button>
  ),
}));

function setup() {
  render(
    <NextIntlClientProvider locale="pt" messages={pt}>
      <ContactForm siteKey="1x00000000000000000000AA" title="Fale comigo" />
    </NextIntlClientProvider>,
  );
  return userEvent.setup();
}

async function fillValid(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(pt.contact.form.name), "Ana Souza");
  await user.type(screen.getByLabelText(pt.contact.form.email), "ana@example.com");
  await user.type(
    screen.getByLabelText(pt.contact.form.message),
    "Preciso de um app pra minha loja, com login e catálogo.",
  );
}

afterEach(() => vi.unstubAllGlobals());

describe("ContactForm", () => {
  it("blocks submit until the captcha is solved", async () => {
    const user = setup();
    await fillValid(user);
    await user.click(screen.getByRole("button", { name: /enviar mensagem/i }));
    expect(screen.getByRole("status")).toHaveTextContent(pt.contact.form.captcha);
  });

  it("flags invalid fields without calling the API", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const user = setup();
    await user.click(screen.getByRole("button", { name: "solve" }));
    await user.type(screen.getByLabelText(pt.contact.form.name), "A");
    await user.click(screen.getByRole("button", { name: /enviar mensagem/i }));
    expect(screen.getByRole("status")).toHaveTextContent(pt.contact.form.invalid);
    expect(screen.getByLabelText(pt.contact.form.name)).toHaveAttribute("aria-invalid", "true");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("posts the payload and shows success", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue({ ok: true, status: 200, json: async () => ({ ok: true }) });
    vi.stubGlobal("fetch", fetchMock);
    const user = setup();
    await user.click(screen.getByRole("button", { name: "solve" }));
    await fillValid(user);
    await user.click(screen.getByRole("button", { name: /enviar mensagem/i }));
    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent(pt.contact.form.success),
    );
    const body = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(body).toMatchObject({
      name: "Ana Souza",
      email: "ana@example.com",
      turnstileToken: "tok",
    });
  });

  it("shows the error state on a failed request", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, status: 500, json: async () => ({}) }),
    );
    const user = setup();
    await user.click(screen.getByRole("button", { name: "solve" }));
    await fillValid(user);
    await user.click(screen.getByRole("button", { name: /enviar mensagem/i }));
    await waitFor(() =>
      expect(screen.getByRole("status")).toHaveTextContent(pt.contact.form.error),
    );
  });
});
