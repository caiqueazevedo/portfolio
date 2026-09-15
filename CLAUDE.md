@AGENTS.md

# portfolio — regras do projeto

Portfolio comercial de Caique Azevedo em `www.caiqueazevedo.com.br`. Landing bilíngue (PT-BR padrão,
EN) que vende serviços de engenharia de software e apresenta cases; seção de carreira secundária.
Substitui o `portfolio-web` (v1, estética vaporwave), que fica intocado.

## Stack

| Peça | Versão | Nota |
| --- | --- | --- |
| Next.js (App Router) | 16.3.5 | Turbopack; `AGENTS.md` manda ler `node_modules/next/dist/docs/` antes de codar |
| React | 19.2 | Server Components por padrão |
| Tailwind | 4 | tokens em `app/globals.css` via `@theme` |
| next-intl | 4.14 | `app/[locale]/`, locale lido por `next/root-params`; **sem `proxy.ts`** |
| Vitest + RTL + jsdom | 4 / 16 | testes co-locados `*.test.tsx` |
| @opennextjs/cloudflare | 1.20 | deploy em Workers; build no GitHub Actions (Linux) |
| pnpm | 11.1.2 via corepack | usar sempre `corepack pnpm` |

Dev server: `corepack pnpm dev` na porta 3000.

## Comandos

| Comando | Faz |
| --- | --- |
| `corepack pnpm dev` | dev server |
| `corepack pnpm lint` | ESLint (`eslint-config-next`) |
| `corepack pnpm typecheck` | `tsc --noEmit` (precisa de `.next/types`: rode build ou `next typegen` antes) |
| `corepack pnpm test:run` | Vitest single-run com cobertura |
| `corepack pnpm build` | `next build` |
| `corepack pnpm preview` | build OpenNext + preview local no workerd |
| `corepack pnpm deploy` | build OpenNext + deploy (uso do CI) |

## Guardrails

Hooks em `.claude/settings.json` (secret-guard, block-dangerous-bash, commit-guard), manifesto em
`.claude/quality.json`. Harness: `bash .claude/hooks/test-hooks.sh`.

Commits: `<tipo>: <descrição imperativa em EN>` com tipos de `quality.json` (`feature`, `bugfix`, …).
Sem coautoria.

## Regras de UI

Design system **Raw Folio** (fonte: `design/raw-folio/`, gerado no Claude Design a partir de
uma referência grunge/streetwear). Resumo do que não pode faltar:

- **Cores**: fundo `ink-950`, texto `paper-100`, acento primário `acid-500` em blocos e
  destaques, `blue-500` raro (stickers/selos). Máximo 2 acentos por tela.
- **Tipo**: `font-display` (Anton) sempre uppercase, line-height .9, tamanhos gigantes;
  `font-sans` (Archivo) no corpo; `.label` (Archivo Narrow 700 12px tracking .14em) em
  labels; `font-marker` só 1-2 vezes por tela; `font-mono` em números, anos e meta.
- **Forma**: canto 0 em tudo. Bordas 2px sólidas. Sombra nunca com blur: `shadow-hard*`
  (5px 5px 0). Hover desloca -2px com sombra 7px; press entra na sombra.
- **Textura**: `.grain` sobre preto e ácido; papel sempre `.paper-tex.torn` com
  `filter: drop-shadow` (nunca `box-shadow`, que seria cortado). Fotos sempre P&B (`.bw`).
- **Motion**: seca, 120ms, `ease-snap`. Sem fade longo, sem bounce.
- **Layout**: blocos colados com bordas compartilhadas alternando com respiro grande;
  faixa de estatísticas full-bleed em ácido; stickers levemente tortos (-3° a 3°).
- **Mobile first, sem exceção.** Classe base é a do celular; `sm:`/`md:`/`lg:` adicionam.
  Alvo mínimo 320px. `document.scrollWidth` nunca passa de `clientWidth`. Todo container
  que envolve conteúdo largo leva `min-w-0`.
- Conteúdo público em `content/*.ts` não carrega detalhe de infra (URLs internas, ids, buckets).
- Sem emoji. Glifos unicode (✱ ★ ✕ → ↗ ◉) como ícone decorativo.

## Invariantes

_(vazio de propósito; entra aqui só o que quebrou uma vez)_
