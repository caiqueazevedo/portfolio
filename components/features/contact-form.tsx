"use client";

import { Turnstile } from "@marsidev/react-turnstile";
import { useTranslations } from "next-intl";
import { useId, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { contactSchema } from "@/lib/contact-schema";
import { cn } from "@/lib/cn";

type Status = "idle" | "sending" | "success" | "error" | "invalid" | "captcha";

const FIELD =
  "w-full min-w-0 border-b border-line-strong bg-transparent py-3 text-base text-fg outline-none transition-colors placeholder:text-muted/60 focus:border-fg";

export function ContactForm({ siteKey }: { siteKey: string }) {
  const t = useTranslations("contact.form");
  const [status, setStatus] = useState<Status>("idle");
  const [token, setToken] = useState("");
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const id = useId();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const raw = Object.fromEntries(form.entries());
    const parsed = contactSchema.safeParse({ ...raw, turnstileToken: token });
    if (!parsed.success) {
      const bad: Record<string, boolean> = {};
      for (const issue of parsed.error.issues) bad[String(issue.path[0])] = true;
      setErrors(bad);
      setStatus(bad.turnstileToken ? "captcha" : "invalid");
      return;
    }
    setErrors({});
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (res.status === 403) return setStatus("captcha");
      if (!res.ok) return setStatus("error");
      setStatus("success");
      e.currentTarget?.reset?.();
    } catch {
      setStatus("error");
    }
  }

  const feedback: Partial<Record<Status, string>> = {
    success: t("success"),
    error: t("error"),
    invalid: t("invalid"),
    captcha: t("captcha"),
  };

  return (
    <form onSubmit={onSubmit} noValidate className="flex min-w-0 flex-col gap-7" aria-describedby={`${id}-status`}>
      <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
        <Field id={`${id}-name`} label={t("name")} error={errors.name}>
          <input id={`${id}-name`} name="name" autoComplete="name" required className={FIELD} aria-invalid={errors.name || undefined} />
        </Field>
        <Field id={`${id}-email`} label={t("email")} error={errors.email}>
          <input id={`${id}-email`} name="email" type="email" autoComplete="email" required className={FIELD} aria-invalid={errors.email || undefined} />
        </Field>
      </div>
      <Field id={`${id}-company`} label={t("company")} error={errors.company}>
        <input id={`${id}-company`} name="company" autoComplete="organization" className={FIELD} />
      </Field>
      <Field id={`${id}-message`} label={t("message")} error={errors.message}>
        <textarea
          id={`${id}-message`}
          name="message"
          rows={5}
          required
          placeholder={t("messagePlaceholder")}
          className={cn(FIELD, "resize-y")}
          aria-invalid={errors.message || undefined}
        />
      </Field>

      {/* Honeypot: hidden from people, tempting for bots. */}
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor={`${id}-website`}>Website</label>
        <input id={`${id}-website`} name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <Turnstile siteKey={siteKey} onSuccess={setToken} onExpire={() => setToken("")} options={{ theme: "dark", size: "flexible" }} />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" arrow disabled={status === "sending"}>
          {status === "sending" ? t("sending") : t("submit")}
        </Button>
        <p
          id={`${id}-status`}
          role="status"
          aria-live="polite"
          className={cn("text-sm", status === "success" ? "text-accent" : "text-muted")}
        >
          {feedback[status] ?? ""}
        </p>
      </div>
    </form>
  );
}

function Field({ id, label, error, children }: { id: string; label: string; error?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <label htmlFor={id} className={cn("text-tag tracking-[0.14em] uppercase", error ? "text-accent" : "text-muted")}>
        {label}
      </label>
      {children}
    </div>
  );
}
