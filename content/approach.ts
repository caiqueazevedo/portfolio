import type { Localized } from "./localized";

export type Principle = {
  title: Localized<string>;
  body: Localized<string>;
};

export const approach: Principle[] = [
  {
    title: {
      pt: "Entendo o problema antes da tela",
      en: "I understand the problem before the screen",
    },
    body: {
      pt: "No Polaris, 8 plataformas analisadas viraram 45 padrões e 15 antipadrões antes da primeira linha de código.",
      en: "On Polaris, 8 platforms analysed became 45 patterns and 15 anti-patterns before the first line of code.",
    },
  },
  {
    title: {
      pt: "Segurança é requisito, não feature",
      en: "Security is a requirement, not a feature",
    },
    body: {
      pt: "RLS no banco, PKCE no login, segredos fora do código. O que não pode vazar não chega a existir no cliente.",
      en: "RLS in the database, PKCE at login, secrets out of the code. What must not leak never exists on the client.",
    },
  },
  {
    title: { pt: "Opero o que construo", en: "I operate what I build" },
    body: {
      pt: "Observabilidade, heartbeats e alertas próprios. Entrega não termina no deploy.",
      en: "Observability, heartbeats and alerts of my own. Delivery does not end at deploy.",
    },
  },
];
