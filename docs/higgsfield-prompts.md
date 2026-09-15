# Higgsfield — pacote de prompts (Raw Folio)

Assets visuais do site, na linguagem do design system Raw Folio (`design/raw-folio/readme.md`):
**fotos sempre em preto e branco, contraste alto, grão, recortes retos**. Gerar no Higgsfield,
exportar nos formatos abaixo e salvar em `public/media/` com o nome indicado. Enquanto o
arquivo não existe, o site mostra o placeholder cinza do kit, então dá pra publicar sem todos.

O site aplica `grayscale(1) contrast(1.15)` e grão por CSS, então pode gerar colorido: o
importante é luz dura, sombra fechada e textura.

## Direção comum (colar antes de todo prompt)

> Gritty editorial photograph, black and white, high contrast, hard directional light, deep
> shadows, visible film grain, slightly overexposed highlights, street/documentary energy.
> No text, no logos, no UI mockups, no neon. Raw, confident, unpolished on purpose.

## 1. Retrato (hero da home e página Sobre)

| Campo | Valor |
| --- | --- |
| Arquivo | `public/media/portrait.jpg` |
| Formato | **4:5**, 1600×2000 px, JPG q85 |
| Input | sua foto real como referência (image-to-image), preservando traços |

> Three-quarter portrait, looking slightly off-camera, dark plain background, single hard
> key light from the upper left, black clothing, calm and direct expression. Documentary
> black and white, grain, high contrast.

## 2. Capas dos cases (6 imagens)

| Campo | Valor |
| --- | --- |
| Formato | **3:2**, 2400×1600 px, JPG q85 |
| Arquivos | `public/media/covers/<slug>.jpg` com slug em `zenid`, `aetherion`, `pulse`, `polaris`, `watchtower`, `claude-usage-hub` |
| Extra pro ZenID | uma versão **16:9** (2400×1350) em `covers/zenid-wide.jpg` pro topo da página do case |

Um motivo por projeto, sempre objeto físico fotografado, nunca ilustração:

- **zenid** — "A single old brass key on rough concrete, shot from above, one hard light."
- **aetherion** — "Stacked sheets of dark glass, edges catching light, on a black table."
- **pulse** — "Ripples on black water frozen by flash, seen from a low angle."
- **polaris** — "A weathered compass on a metal surface, needle catching the light."
- **watchtower** — "A bare lightbulb burning in a dark concrete room, seen from below."
- **claude-usage-hub** — "Close-up of an analog pressure gauge, needle mid-scale, scratched glass."

Prompt base (substituir o motivo): `{motivo}. Black and white, high contrast, hard light,
film grain, empty space on one side. Documentary still, 3:2.`

## 3. Texturas de fundo (opcional, 2)

| Campo | Valor |
| --- | --- |
| Formato | 2400×1350 px, JPG q80, quase pretas |
| Arquivos | `public/media/textures/concrete.jpg`, `public/media/textures/paper.jpg` |

- **concrete** — "Dark wet concrete wall, macro, very low key, faint texture."
- **paper** — "Crumpled off-white paper, flat lit, subtle fibre, for use as a multiply texture."

## Checklist antes de subir

- [ ] Nada de texto/logo/watermark nas imagens.
- [ ] Tamanhos dentro do alvo (imagens ≤ 600 KB cada).
- [ ] Nomes de arquivo exatamente como na tabela, e a flag correspondente ligada em `content/media.ts`.
