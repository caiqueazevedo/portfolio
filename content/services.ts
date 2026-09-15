import type { Localized } from "./localized";

export type Service = {
  slug: string;
  /** Unicode glyph, the system's icon language (✱ ✕ ◉ →). */
  glyph: string;
  title: Localized<string>;
  description: Localized<string>;
};

export const services: Service[] = [
  {
    slug: "product",
    glyph: "✱",
    title: { pt: "Produto end-to-end", en: "End-to-end product" },
    description: {
      pt: "Web em Next.js e React, mobile em Expo, publicado nas lojas. Um responsável do primeiro commit ao release.",
      en: "Web in Next.js and React, mobile in Expo, shipped to the stores. One owner from first commit to release.",
    },
  },
  {
    slug: "backend",
    glyph: "◉",
    title: { pt: "Backend serverless", en: "Serverless backend" },
    description: {
      pt: "Cloudflare Workers, D1, R2, Durable Objects e Supabase. Escala sem uma conta de infra pra sustentar.",
      en: "Cloudflare Workers, D1, R2, Durable Objects and Supabase. Scales without an infra bill to carry.",
    },
  },
  {
    slug: "identity",
    glyph: "✕",
    title: { pt: "Identidade e acesso", en: "Identity and access" },
    description: {
      pt: "OAuth 2.0 com PKCE, consentimento por aplicação e revogação. Login que você controla, não aluga.",
      en: "OAuth 2.0 with PKCE, per-app consent and revocation. A login you own instead of rent.",
    },
  },
  {
    slug: "salesforce",
    glyph: "→",
    title: { pt: "Salesforce", en: "Salesforce" },
    description: {
      pt: "Apex e Lightning Web Components no dia a dia corporativo: integrações, automações e deploy versionado.",
      en: "Apex and Lightning Web Components in enterprise work: integrations, automation and versioned deploys.",
    },
  },
];
