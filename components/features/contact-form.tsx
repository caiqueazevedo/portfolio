"use client";

import { Turnstile } from "@marsidev/react-turnstile";
import { useTranslations } from "next-intl";
import { useId, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Field, Input, Textarea } from "@/components/ui/field";
import { contactSchema } from "@/lib/contact-schema";
import { cn } from "@/lib/cn";

type Status = "idle" | "sending" | "success" | "error" | "invalid" | "captcha";

export function ContactForm({ siteKey, title }: { siteKey: string; title: string }) {
  const t = useTranslations("contact.form");
  const [status, setStatus] = useState<Status>("idle");
  const [token, setToken] = useState("");
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const id = useId();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const raw = Object.fromEntries(new FormData(form).entries());
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
      form.reset();
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
  const toastColor = status === "success" ? "bg-acid-500 text-ink-950" : status === "error" || status === "invalid" || status === "captcha" ? "bg-danger text-white" : "";

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      aria-describedby={`${id}-status`}
      className="relative flex min-w-0 flex-col gap-4.5 border-2 border-paper-100 bg-ink-900 p-5 shadow-hard-acid sm:p-7"
    >
      <span className="font-display text-[26px] text-paper-100 uppercase">{title}</span>

      <Field id={`${id}-name`} label={t("name")} error={errors.name}>
        <Input id={`${id}-name`} name="name" autoComplete="name" placeholder={t("namePlaceholder")} required aria-invalid={errors.name || undefined} />
      </Field>
      <Field id={`${id}-email`} label={t("email")} error={errors.email}>
        <Input id={`${id}-email`} name="email" type="email" autoComplete="email" placeholder={t("emailPlaceholder")} required aria-invalid={errors.email || undefined} />
      </Field>
      <Field id={`${id}-company`} label={t("company")} error={errors.company}>
        <Input id={`${id}-company`} name="company" autoComplete="organization" />
      </Field>
      <Field id={`${id}-message`} label={t("message")} error={errors.message}>
        <Textarea id={`${id}-message`} name="message" rows={4} required placeholder={t("messagePlaceholder")} aria-invalid={errors.message || undefined} />
      </Field>

      {/* Honeypot: hidden from people, tempting for bots. */}
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor={`${id}-website`}>Website</label>
        <input id={`${id}-website`} name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {/* The widget has a 300px floor; below that it scrolls inside its box instead of pushing the page. */}
      <div className="min-w-0 max-w-full overflow-x-auto">
        <Turnstile siteKey={siteKey} onSuccess={setToken} onExpire={() => setToken("")} options={{ theme: "dark", size: "flexible" }} />
      </div>

      <Button type="submit" size="lg" disabled={status === "sending"} className="self-start">
        {status === "sending" ? t("sending") : t("submit")}
      </Button>

      <p
        id={`${id}-status`}
        role="status"
        aria-live="polite"
        className={cn(
          "inline-flex items-center gap-3 self-start border-2 border-ink-950 px-4 py-3 font-condensed text-[13px] font-bold tracking-[0.08em] uppercase shadow-[4px_4px_0_rgb(0_0_0/0.6)]",
          toastColor,
          !feedback[status] && "hidden",
        )}
      >
        <span aria-hidden="true" className="text-[16px] font-extrabold">
          ✱
        </span>
        {feedback[status] ?? ""}
      </p>
    </form>
  );
}
