@AGENTS.md

# portfolio — regras do projeto

Portfolio comercial de Caique Azevedo em `www.caiqueazevedo.com.br`. Landing bilíngue (PT-BR padrão,
EN) que vende serviços de engenharia de software e apresenta cases; seção de carreira secundária.
Substitui o `portfolio-web` (v1, estética vaporwave), que fica intocado.

## Stack

| Peça                   | Versão              | Nota                                                                           |
| ---------------------- | ------------------- | ------------------------------------------------------------------------------ |
| Next.js (App Router)   | 16.3.5              | Turbopack; `AGENTS.md` manda ler `node_modules/next/dist/docs/` antes de codar |
| React                  | 19.2                | Server Components por padrão                                                   |
| Tailwind               | 4                   | tokens em `app/globals.css` via `@theme`                                       |
| next-intl              | 4.14                | `app/[locale]/`, locale lido por `next/root-params`; **sem `proxy.ts`**        |
| Vitest + RTL + jsdom   | 4 / 16              | testes co-locados `*.test.tsx`                                                 |
| @opennextjs/cloudflare | 1.20                | deploy em Workers; build no GitHub Actions (Linux)                             |
| pnpm                   | 11.1.2 via corepack | usar sempre `corepack pnpm`                                                    |

Dev server: `corepack pnpm dev` na porta 3000.

## Comandos

| Comando                   | Faz                                                                           |
| ------------------------- | ----------------------------------------------------------------------------- |
| `corepack pnpm dev`       | dev server                                                                    |
| `corepack pnpm lint`      | ESLint (`eslint-config-next`)                                                 |
| `corepack pnpm typecheck` | `tsc --noEmit` (precisa de `.next/types`: rode build ou `next typegen` antes) |
| `corepack pnpm test:run`  | Vitest single-run com cobertura                                               |
| `corepack pnpm build`     | `next build`                                                                  |
| `corepack pnpm preview`   | build OpenNext + preview local no workerd                                     |
| `corepack pnpm deploy`    | build OpenNext + deploy (uso do CI)                                           |

## Guardrails

Hooks em `.claude/settings.json` (secret-guard, block-dangerous-bash, commit-guard), manifesto em
`.claude/quality.json`. Harness: `bash .claude/hooks/test-hooks.sh`.

Commits: `<tipo>: <descrição imperativa em EN>` com tipos de `quality.json` (`feature`, `bugfix`, …).
Sem coautoria.

## Regras de UI

Design system **Editorial** (fonte: handoff `design_handoff_portfolio_editorial`). Monocromático,
tipografia única, zero raio e zero sombra. Resumo do que não pode faltar:

- **Cores**: `ink` (#111) e os papéis `paper` (#f4f3f1) e `mist` (#e4e2de). Texto corrido em
  `strong`/`body`, secundário em `muted`, números em `faint`. Cor só nos pontos de status
  (`production`/`active`/`paused`). Nenhum acento cromático.
- **Tipo**: uma família, **Jost**. Display sempre `min(Xvw, Yvh)` — a altura também manda, porque
  um painel não rola. Trackings fixos: `.32em` kicker, `.2em` micro, `.14em`/`.16em` nav e botões,
  `.08em` nomes de projeto, `.22em` só na marca. Utilitários `kicker`, `label`, `micro`.
- **Forma**: raio 0 em tudo (exceto círculos: dots, setas, glifos de serviço). Linhas de 1px:
  `border-ink` para a divisória forte, `border-ink/14` para a fina. Sombra nenhuma — só a elipse
  de chão do hero. Link é texto com `rule-link` (1px embaixo), nunca caixa.
- **Fotos** sempre P&B (`bw`); slot vazio é retângulo `mist` com legenda, nunca um degradê que
  finge ser foto.
- **Home**: 8 painéis de uma tela cada (`components/home/`), trilho horizontal em
  `components/features/home-rail.tsx`, decisões de gesto em `lib/pager.ts`. Abaixo de `md` tudo
  empilha e o wheel sai do caminho.
- **Mobile first, sem exceção.** Classe base é a do celular; `sm:`/`md:`/`lg:` adicionam.
  Alvo mínimo 320px. `document.scrollWidth` nunca passa de `clientWidth`. Todo container
  que envolve conteúdo largo leva `min-w-0`.
- Conteúdo público em `content/*.ts` não carrega detalhe de infra (URLs internas, ids, buckets).
- Sem emoji. Glifos unicode (✱ ◉ ✕ → ↗) como ícone decorativo.

## Invariantes

### A nav inverte por `mix-blend-mode`, então nada pode criar contexto de empilhamento acima dela

A barra de nav é branca com `mix-blend-mode: difference` para ler tanto sobre painel claro quanto
sobre o escuro que desliza por baixo. Blend só funciona enquanto nenhum ancestral cria contexto de
empilhamento — `transform`, `opacity`, `filter` — por isso as barras ficam **fora** do trilho, que
é exatamente o elemento que anima.

**Sintoma quando violada:** a nav some sobre o painel escuro, ou fica cinza-chumbo sobre o claro.

### A transição anima `transform`, nunca a propriedade `translate`

Tailwind v4 centraliza com `translate` (`-translate-x-1/2`, `-translate-y-1/2`), que é uma
propriedade própria, não parte do `transform`. Animar `translate` na troca de painel apagava a
centralização enquanto a animação durasse: a palavra gigante e o recorte do hero pulavam para o
lado e voltavam de supetão no fim. `transform` compõe com `translate` em vez de substituí-la.

**Sintoma quando violada:** elementos centralizados se teletransportam ao trocar de painel, em vez
de deslizarem.

### O trilho só cancela o quadro em dois lugares: no unmount e em `go`

O efeito que registra os listeners depende de `panel`, então ele roda de novo a cada troca. Com um
`cancelAnimationFrame` na limpeza dele, a animação era abortada no primeiro quadro e o `animating`
ficava preso em `true` — o teclado e a roda paravam de responder para sempre. Cancelar dentro do
`go` é outra coisa, e é de propósito: um gesto que chega no meio do voo re-mira o trilho em vez de
ser descartado, e as animações dos filhos são canceladas junto para a chegada anterior não brigar
com a própria saída. Um `setTimeout` de guarda garante a chegada mesmo quando a aba vai para
segundo plano e o navegador para de servir quadros.

**Sintoma quando violada:** o primeiro gesto funciona e nenhum outro; a barra de progresso congela
no meio. Coberto por `components/features/home-rail.test.tsx`.

### Inércia de trackpad se distingue de gesto novo pela pausa, não pela trava

Travar a roda por tempo fixo depois de cada troca descarta o segundo gesto de quem está com
pressa — e foi assim que o trilho passou a parecer lento. O estado da roda guarda um `armed`: um
evento que chega depois de 200 ms de silêncio re-arma o gesto e vale mesmo com o trilho em
movimento; a sequência contínua que vem logo atrás (a inércia do próprio gesto) chega desarmada e
é engolida.

**Sintoma quando violada:** ou um flick pula três painéis, ou rolar duas vezes seguidas só anda
uma. Coberto por `lib/pager.test.ts`.
