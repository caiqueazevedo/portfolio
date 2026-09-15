import type { Localized } from "./localized";

export type Service = {
  slug: string;
  title: Localized<string>;
  description: Localized<string>;
};

export const services: Service[] = [
  {
    slug: "product",
    title: { pt: "Produto end-to-end", en: "End-to-end product" },
    description: {
      pt: "Web em Next.js e React, mobile em Expo, publicado nas lojas. Um único responsável do primeiro commit ao release.",
      en: "Web in Next.js and React, mobile in Expo, shipped to the stores. One owner from the first commit to the release.",
    },
  },
  {
    slug: "backend",
    title: { pt: "Backend serverless", en: "Serverless backend" },
    description: {
      pt: "Cloudflare Workers, D1, R2, Durable Objects e Supabase. Arquitetura que escala sem uma conta de infra pra sustentar.",
      en: "Cloudflare Workers, D1, R2, Durable Objects and Supabase. Architecture that scales without an infra bill to carry.",
    },
  },
  {
    slug: "identity",
    title: { pt: "Identidade e acesso", en: "Identity and access" },
    description: {
      pt: "OAuth 2.0 com PKCE, consentimento por aplicação e revogação. Login que você controla, não aluga.",
      en: "OAuth 2.0 with PKCE, per-app consent and revocation. A login you own instead of rent.",
    },
  },
  {
    slug: "salesforce",
    title: { pt: "Salesforce", en: "Salesforce" },
    description: {
      pt: "Apex e Lightning Web Components no dia a dia corporativo: integrações, automações e deploy versionado.",
      en: "Apex and Lightning Web Components in day-to-day enterprise work: integrations, automation and versioned deploys.",
    },
  },
];
