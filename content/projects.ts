import type { Localized } from "./localized";
export type ProjectStatus = "production" | "active" | "paused";

export type CaseSection = {
  heading: Localized<string>;
  body: Localized<string>;
};

export type Project = {
  slug: string;
  name: string;

  summary: Localized<string>;

  headline: Localized<string>;
  lead: Localized<string>;
  tags: Localized<string[]>;
  stack: string[];
  status: ProjectStatus;
  years: string;
  role: Localized<string>;
  surfaces: Localized<string>;
  liveUrl: string | null;
  repoUrl: string | null;
  featured: boolean;

  cover: string;
  sections: CaseSection[];
};

export const projects: Project[] = [
  {
    slug: "zenid",
    name: "ZenID",
    summary: {
      pt: 'Um provedor de identidade próprio: "Entrar com ZenID" com OAuth + PKCE, consentimento por item com revogação e governança de acesso por aplicação. É o login de todos os outros produtos.',
      en: 'An identity provider of my own: "Sign in with ZenID" with OAuth + PKCE, per-item consent with revocation and per-app access governance. It is the login for every other product.',
    },
    headline: {
      pt: "ZenID: um login que é seu, não alugado.",
      en: "ZenID: a login you own, not rent.",
    },
    lead: {
      pt: "Provedor de identidade próprio com OAuth 2.0 + PKCE, consentimento por item com revogação e governança de acesso por aplicação. Hoje é a porta de entrada de todos os outros produtos.",
      en: "A self-built identity provider with OAuth 2.0 + PKCE, per-item consent with revocation and per-app access governance. Today it is the front door of every other product.",
    },
    tags: { pt: ["Identidade", "Em produção"], en: ["Identity", "In production"] },
    stack: ["React 19", "Supabase", "Cloudflare Workers", "Expo"],
    status: "production",
    years: "[ANO] – 2026",
    role: { pt: "Produto, arquitetura e código", en: "Product, architecture and code" },
    surfaces: { pt: "Web · API · Android", en: "Web · API · Android" },
    liveUrl: "https://zenid.com.br",
    repoUrl: "https://github.com/caiqueazevedo/zenid",
    featured: true,
    cover: "zenid",
    sections: [
      {
        heading: { pt: "Problema", en: "Problem" },
        body: {
          pt: "Cada app novo pedia um cadastro novo, e cada cadastro era mais um lugar pra vazar dado. Login social terceiriza o controle e a política. Eu queria uma identidade única, minha, que os outros produtos consumissem como consomem o Google, mas onde cada item compartilhado fosse uma decisão explícita do usuário.",
          en: "Every new app asked for a new sign-up, and every sign-up was one more place for data to leak. Social login outsources control and policy. I wanted a single identity of my own that other products could consume the way they consume Google, but where every shared item is an explicit decision by the user.",
        },
      },
      {
        heading: { pt: "Abordagem", en: "Approach" },
        body: {
          pt: "Authorization code com PKCE do zero, sem biblioteca de IdP. Consentimento por aplicação e por item, com revogação. Governança de acesso por aplicação: o que cada app enxerga é decisão do usuário, revogável. Três superfícies (web, API em Worker, Android) sobre um mesmo contrato.",
          en: "Authorization code with PKCE from scratch, no IdP library. Per-app and per-item consent, with revocation. Per-app access governance: what each app can see is the user's decision, and revocable. Three surfaces (web, a Worker API, Android) over one contract.",
        },
      },
      {
        heading: { pt: "Resultado", en: "Outcome" },
        body: {
          pt: "Em produção em zenid.com.br. Pulse e Watchtower autenticam por ele hoje. [MÉTRICA: usuários / apps conectados / uptime] Nenhum segredo de aplicação vive no cliente.",
          en: "In production at zenid.com.br. Pulse and Watchtower authenticate through it today. [METRIC: users / connected apps / uptime] No application secret lives on the client.",
        },
      },
    ],
  },
  {
    slug: "aetherion",
    name: "Aetherion 2.0",
    summary: {
      pt: "Hub desktop nativo com sandbox de plugins em Rust, gate de permissões e engine de grafo de código própria.",
      en: "A native desktop hub with a Rust plugin sandbox, a permission gate and a code-graph engine of its own.",
    },
    headline: {
      pt: "Aetherion 2.0: um hub desktop onde cada app vive em sandbox.",
      en: "Aetherion 2.0: a desktop hub where every app lives in a sandbox.",
    },
    lead: {
      pt: "Aplicativo nativo em Tauri e Rust que hospeda apps internos e plugins com permissões explícitas, terminal real e um grafo do código construído com tree-sitter.",
      en: "A native Tauri and Rust application hosting internal apps and plugins behind explicit permissions, a real terminal and a code graph built with tree-sitter.",
    },
    tags: { pt: ["Desktop", "Rust · Tauri"], en: ["Desktop", "Rust · Tauri"] },
    stack: ["Tauri 2", "Rust", "React", "TypeScript", "tree-sitter"],
    status: "active",
    years: "2026",
    role: { pt: "Arquitetura e código", en: "Architecture and code" },
    surfaces: { pt: "Windows", en: "Windows" },
    liveUrl: null,
    repoUrl: "https://github.com/caiqueazevedo/Aetherion2.0",
    featured: true,
    cover: "aetherion",
    sections: [
      {
        heading: { pt: "Problema", en: "Problem" },
        body: {
          pt: "Dezenas de ferramentas pessoais espalhadas em abas e janelas, cada uma com acesso irrestrito à máquina. Eu queria um único lugar pra hospedar tudo, mas sem que um plugin qualquer pudesse ler credenciais ou o disco inteiro.",
          en: "Dozens of personal tools scattered across tabs and windows, each with unrestricted access to the machine. I wanted one place to host them all, without letting any plugin read credentials or the whole disk.",
        },
      },
      {
        heading: { pt: "Abordagem", en: "Approach" },
        body: {
          pt: "Shell em Tauri com o lado Rust como gate de permissões: cada capacidade (arquivos, rede, PTY) é concedida por plugin e nunca cruza pra dentro do sandbox. Engine de grafo com tree-sitter pra navegar código, PTY próprio e parser de markdown com testes.",
          en: "A Tauri shell with the Rust side as the permission gate: each capability (files, network, PTY) is granted per plugin and never crosses into the sandbox. A tree-sitter graph engine to navigate code, a PTY of its own and a tested markdown parser.",
        },
      },
      {
        heading: { pt: "Resultado", en: "Outcome" },
        body: {
          pt: "Em uso diário. Credenciais nunca entram no sandbox. [MÉTRICA: apps hospedados / plugins]",
          en: "In daily use. Credentials never enter the sandbox. [METRIC: hosted apps / plugins]",
        },
      },
    ],
  },
  {
    slug: "pulse",
    name: "Pulse",
    summary: {
      pt: "Hub social sobre o ZenID: chat em tempo real com Durable Objects, mídia em R2 e app Android publicado.",
      en: "A social hub on top of ZenID: realtime chat with Durable Objects, media on R2 and a published Android app.",
    },
    headline: {
      pt: "Pulse: uma rede social inteira, do Worker ao Android.",
      en: "Pulse: a whole social network, from the Worker to Android.",
    },
    lead: {
      pt: "Web, API e app Android publicados, autenticando pelo ZenID. Chat em tempo real, momentos, galeria e temas.",
      en: "Web, API and Android app shipped, authenticating through ZenID. Realtime chat, moments, gallery and themes.",
    },
    tags: { pt: ["Social", "Web + Android"], en: ["Social", "Web + Android"] },
    stack: ["React 19", "Cloudflare Workers", "D1", "Durable Objects", "Expo"],
    status: "production",
    years: "2026",
    role: { pt: "Produto, arquitetura e código", en: "Product, architecture and code" },
    surfaces: { pt: "Web · API · Android", en: "Web · API · Android" },
    liveUrl: "https://floofy.zenid.com.br",
    repoUrl: null,
    featured: true,
    cover: "pulse",
    sections: [
      {
        heading: { pt: "Problema", en: "Problem" },
        body: {
          pt: "Provar que o ZenID sustenta um produto de verdade: uma rede social com chat em tempo real, upload de mídia e app nas mãos de pessoas, sem um servidor pra cuidar.",
          en: "Prove that ZenID can carry a real product: a social network with realtime chat, media upload and an app in people's hands, with no server to babysit.",
        },
      },
      {
        heading: { pt: "Abordagem", en: "Approach" },
        body: {
          pt: "Worker em Hono com D1 pra dados e Durable Objects pra cada sala de chat. Mídia streamada direto pro R2. App Android em Expo com atualizações OTA. Login inteiro delegado ao ZenID via OAuth.",
          en: "A Hono Worker with D1 for data and a Durable Object per chat room. Media streamed straight into R2. An Expo Android app with OTA updates. The whole login delegated to ZenID via OAuth.",
        },
      },
      {
        heading: { pt: "Resultado", en: "Outcome" },
        body: {
          pt: "Web, API e Android no ar hoje. [MÉTRICA: usuários / mensagens]",
          en: "Web, API and Android live today. [METRIC: users / messages]",
        },
      },
    ],
  },
  {
    slug: "polaris",
    name: "Polaris",
    summary: {
      pt: "Plataforma de comunidades e chamadas: canais, threads, permissões e voz, com o servidor como produto.",
      en: "A communities and calls platform: channels, threads, permissions and voice, with the server as the product.",
    },
    headline: {
      pt: "Polaris: 45 padrões antes da primeira linha de código.",
      en: "Polaris: 45 patterns before the first line of code.",
    },
    lead: {
      pt: "Análise comparativa de 8 plataformas destilada em padrões e antipadrões, depois Fastify, Postgres e LiveKit como plano de mídia separado.",
      en: "A comparative analysis of 8 platforms distilled into patterns and anti-patterns, then Fastify, Postgres and LiveKit as a separate media plane.",
    },
    tags: { pt: ["Comunidades", "Backend"], en: ["Communities", "Backend"] },
    stack: ["Fastify 5", "Postgres 17", "Kysely", "LiveKit", "Tauri 2"],
    status: "paused",
    years: "2026",
    role: { pt: "Pesquisa, arquitetura e código", en: "Research, architecture and code" },
    surfaces: { pt: "API · Desktop", en: "API · Desktop" },
    liveUrl: null,
    repoUrl: "https://github.com/caiqueazevedo/polaris",
    featured: false,
    cover: "polaris",
    sections: [
      {
        heading: { pt: "Abordagem", en: "Approach" },
        body: {
          pt: "Oito plataformas de comunidade analisadas e reduzidas a 45 padrões reutilizáveis e 15 antipadrões antes de codar. Servidor em Fastify com Postgres sem ORM, e LiveKit como SFU num plano de mídia independente. Cliente desktop em Tauri, escolhido sobre Electron por medição de memória.",
          en: "Eight community platforms analysed and reduced to 45 reusable patterns and 15 anti-patterns before coding. A Fastify server on Postgres without an ORM, and LiveKit as the SFU on an independent media plane. A Tauri desktop client, chosen over Electron on a measured memory argument.",
        },
      },
    ],
  },
  {
    slug: "watchtower",
    name: "Watchtower",
    summary: {
      pt: "Observabilidade dos meus produtos: erros, eventos, heartbeats e feedback num só painel, com auth adulta.",
      en: "Observability for my products: errors, events, heartbeats and feedback in one panel, with grown-up auth.",
    },
    headline: {
      pt: "Watchtower: operar o que eu construo.",
      en: "Watchtower: operating what I build.",
    },
    lead: {
      pt: "Worker com D1 que ingere sinais de três sistemas e os mostra num painel protegido por OAuth PKCE, chaves de ingestão por app e rate limit.",
      en: "A Worker on D1 that ingests signals from three systems and shows them in a panel protected by OAuth PKCE, per-app ingest keys and rate limiting.",
    },
    tags: { pt: ["Observabilidade", "Cloudflare"], en: ["Observability", "Cloudflare"] },
    stack: ["Cloudflare Workers", "D1", "KV", "React 19"],
    status: "production",
    years: "2026",
    role: { pt: "Arquitetura e código", en: "Architecture and code" },
    surfaces: { pt: "Web · API", en: "Web · API" },
    liveUrl: null,
    repoUrl: null,
    featured: false,
    cover: "watchtower",
    sections: [
      {
        heading: { pt: "Abordagem", en: "Approach" },
        body: {
          pt: "Chaves públicas de ingestão por aplicação com allowlist de origem, limite de payload e rate limit em KV. Painel autenticado pelo ZenID com allowlist de administradores e um token break-glass pra emergência.",
          en: "Public per-app ingest keys with an origin allowlist, payload caps and KV rate limiting. A panel authenticated through ZenID with an admin allowlist and a break-glass token for emergencies.",
        },
      },
    ],
  },
  {
    slug: "claude-usage-hub",
    name: "Claude Usage Hub",
    summary: {
      pt: "Widget desktop que mostra gasto, tokens e sessões do Claude Code em tempo real, com ingestão dupla e dedup.",
      en: "A desktop widget showing Claude Code spend, tokens and sessions live, with dual ingest and dedup.",
    },
    headline: {
      pt: "Claude Usage Hub: a demo de cinco minutos.",
      en: "Claude Usage Hub: the five-minute demo.",
    },
    lead: {
      pt: "Widget em Tauri com receptor OpenTelemetry embutido e leitura de transcrições locais, com uma regra explícita de deduplicação entre as duas fontes.",
      en: "A Tauri widget with an embedded OpenTelemetry receiver and local transcript reading, with an explicit dedup rule between the two sources.",
    },
    tags: { pt: ["Desktop", "Ferramenta"], en: ["Desktop", "Tooling"] },
    stack: ["Tauri 2", "Rust", "React", "OpenTelemetry"],
    status: "paused",
    years: "2026",
    role: { pt: "Código", en: "Code" },
    surfaces: { pt: "Windows", en: "Windows" },
    liveUrl: null,
    repoUrl: "https://github.com/caiqueazevedo/claude-usage-hub",
    featured: false,
    cover: "claude-usage-hub",
    sections: [
      {
        heading: { pt: "Abordagem", en: "Approach" },
        body: {
          pt: "Duas fontes de dados (transcrições JSONL e um receptor OTLP local em 127.0.0.1) alimentam o mesmo modelo, com uma regra clara de qual vence quando as duas reportam o mesmo evento.",
          en: "Two data sources (JSONL transcripts and a local OTLP receiver on 127.0.0.1) feed the same model, with a clear rule for which one wins when both report the same event.",
        },
      },
    ],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function findProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
