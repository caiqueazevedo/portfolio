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
| motion | 13.3 | só em client islands pequenos; `MotionConfig reducedMotion="user"` |
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

- **Mobile first, sem exceção.** Classe base é a do celular; `sm:`/`md:`/`lg:` adicionam. Alvo mínimo
  320px. `document.scrollWidth` nunca passa de `clientWidth`.
- Todo container que envolve conteúdo largo leva `min-w-0`. `overflow-x-auto` sem `min-w-0` não contém nada.
- Tipografia com `clamp()`; nunca `px` cravado em heading.
- Vídeo/animação respeita `prefers-reduced-motion`: fallback estático, sem baixar bytes do vídeo.
- Conteúdo público em `content/*.ts` não carrega detalhe de infra (URLs internas, ids, buckets).

## Invariantes

_(vazio de propósito; entra aqui só o que quebrou uma vez)_
