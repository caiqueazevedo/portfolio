import type { Localized } from "./localized";

/**
 * Career content. Bracketed placeholders are facts only Caique can fill.
 * TODO (Caique): current role, dates, achievements, years of experience.
 */
export const bio: Localized<string[]> = {
  pt: [
    "Engenheiro de software. No trabalho vivo no ecossistema Salesforce: Apex no servidor, Lightning Web Components no cliente, e a disciplina que plataforma com deploy versionado exige.",
    "Fora dele construo sistemas inteiros por conta própria: um core de identidade com OAuth próprio, um hub social em cima dele, um hub desktop com sandbox em Rust. Não são exercícios. São coisas que uso.",
    "[PARÁGRAFO PESSOAL: o que te move, em 2 ou 3 frases.]",
  ],
  en: [
    "Software engineer. At work I live in the Salesforce ecosystem: Apex on the server, Lightning Web Components on the client, and the discipline a platform with versioned deploys demands.",
    "Outside of it I build whole systems on my own: an identity core with its own OAuth, a social hub on top of it, a desktop hub with a Rust sandbox. They are not exercises. They are things I use.",
    "[PERSONAL PARAGRAPH: what drives you, in 2 or 3 sentences.]",
  ],
};

export type Experience = {
  role: Localized<string>;
  company: string;
  start: string;
  /** null = current. */
  end: string | null;
  summary: Localized<string>;
  stack: string[];
};

export const experience: Experience[] = [
  {
    role: { pt: "[CARGO ATUAL]", en: "[CURRENT ROLE]" },
    company: "[EMPRESA]",
    start: "[ANO]",
    end: null,
    summary: {
      pt: "Apex, Lightning Web Components, integrações e automações em plataforma Salesforce. [UMA ENTREGA CONCRETA, DE PREFERÊNCIA COM NÚMERO]",
      en: "Apex, Lightning Web Components, integrations and automation on the Salesforce platform. [ONE CONCRETE DELIVERY, IDEALLY WITH A NUMBER]",
    },
    stack: ["Apex", "LWC", "SOQL", "Flow"],
  },
  {
    role: { pt: "[CARGO ANTERIOR]", en: "[PREVIOUS ROLE]" },
    company: "[EMPRESA]",
    start: "[ANO]",
    end: "[ANO]",
    summary: { pt: "[O QUE VOCÊ FAZIA AQUI.]", en: "[WHAT YOU DID HERE.]" },
    stack: ["[STACK]"],
  },
];

export type StackGroup = { label: Localized<string>; items: string[] };

export const stack: StackGroup[] = [
  { label: { pt: "Front-end", en: "Front-end" }, items: ["React 19", "Next.js", "TypeScript", "Tailwind", "Expo", "Tauri"] },
  { label: { pt: "Back-end", en: "Back-end" }, items: ["Cloudflare Workers", "D1 · R2 · KV · Durable Objects", "Supabase · Postgres", "Fastify", "Node.js", "Rust"] },
  { label: { pt: "Plataforma", en: "Platform" }, items: ["Salesforce Apex", "Lightning Web Components", "OAuth 2.0 · PKCE", "GitHub Actions", "Vitest · pytest"] },
];
