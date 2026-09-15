# Higgsfield — pacote de prompts

Assets visuais do site. Gerar no Higgsfield, exportar nos formatos abaixo e salvar em `public/media/`
com o nome indicado. Enquanto o arquivo não existe, o site renderiza um placeholder com o mesmo
aspect ratio (gradiente radial + grain), então dá pra publicar sem todos.

## Direção comum (colar antes de todo prompt)

> Dark premium editorial. Warm near-black background (#0f0e0c), deep charcoal surfaces, a single
> bronze/champagne accent (#d2b27a) used sparingly as light, never as fill. Soft film grain, subtle
> depth of field, slow cinematic motion. No text, no logos, no people unless stated, no UI mockups,
> no neon, no purple/blue gradients. Restrained, quiet, expensive.

## 1. Vídeo loop do hero

| Campo | Valor |
| --- | --- |
| Arquivo | `public/media/hero.webm` + `public/media/hero.mp4` + `public/media/hero-poster.jpg` |
| Formato | 1920×1080, 24 fps, **8–10 s, loop perfeito (seamless)**, sem áudio |
| Export | WebM (VP9 ou AV1) e MP4 H.264; alvo ≤ 6 MB cada. Poster = frame 0 em JPG q80 |

Prompt:

> Abstract macro of dark brushed metal and smoked glass surfaces, slowly rotating, a thin band of
> warm bronze light sweeping across from left to right and fading out. Extremely slow camera dolly.
> Shallow depth of field, fine film grain, mostly shadow with 10% highlights. Seamless loop, no cuts,
> no text, no logo. Cinematic, minimal, premium.

Variações pra testar: (a) trocar "brushed metal" por "obsidian stone"; (b) "slow-moving silk in
near-darkness with a single warm rim light".

## 2. Capas dos cases (6 imagens, mesmo estilo)

| Campo | Valor |
| --- | --- |
| Formato | **16:10**, 2400×1500 px, JPG q85 (ou WebP) |
| Arquivos | `public/media/covers/<slug>.jpg` com slug em `zenid`, `aetherion`, `pulse`, `polaris`, `watchtower`, `claude-usage-hub` |
| Extra pro ZenID | uma versão **21:9** (2520×1080) em `covers/zenid-wide.jpg` pro topo da página do case |

Um motivo por projeto, sempre abstrato e na mesma família visual:

- **zenid** — "A single brass key floating in darkness, seen edge-on, one warm rim light. Identity, ownership, trust."
- **aetherion** — "Layered dark glass panes suspended in space, slightly offset, a faint lattice of light between them. Structure, depth, orchestration."
- **pulse** — "Concentric ripples on black water lit from one side in warm bronze, frozen mid-motion. Presence, signal, community."
- **polaris** — "A dark navigation compass rose engraved in stone, one needle catching bronze light. Direction, protocol, community."
- **watchtower** — "A tall thin beam of warm light cutting through dark fog over a still surface. Observation, vigilance."
- **claude-usage-hub** — "A minimal dark gauge or dial with a single bronze indicator, macro shot, brushed metal. Measurement, clarity."

Prompt base (substituir o motivo):

> {motivo}. Warm near-black environment, deep charcoal tones, one bronze accent light, fine film
> grain, shallow depth of field, lots of negative space on the left third for text overlay. No text,
> no logo, no UI. Premium editorial still, 16:10.

## 3. Retrato estilizado (página Sobre)

| Campo | Valor |
| --- | --- |
| Formato | **4:5**, 1600×2000 px, JPG q85 |
| Arquivo | `public/media/portrait.jpg` |
| Input | sua foto real como referência (image-to-image), preservando traços |

> Editorial portrait, three-quarter view, warm near-black background, single soft key light from
> the upper left in bronze tone, subtle film grain, dark charcoal clothing, calm expression, looking
> slightly off-camera. Shallow depth of field. No text. Premium magazine look.

## 4. Texturas de seção (3)

| Campo | Valor |
| --- | --- |
| Formato | 2400×1350 px, JPG q80, **bem escuras** (vão atrás de texto com overlay) |
| Arquivos | `public/media/textures/01.jpg`, `02.jpg`, `03.jpg` |

- **01** — "Dark slate stone surface, macro, very low contrast, faint bronze light from one edge."
- **02** — "Black silk fabric folds in near darkness, one warm highlight, extremely subtle."
- **03** — "Smoked glass with faint condensation, dark, warm rim light on the far edge."

Prompt base: `{descrição}. 90% shadow, no focal object, seamless-ish, film grain, no text.`

## Checklist antes de subir

- [ ] Nada de texto/logo/watermark nas imagens.
- [ ] Vídeo faz loop sem salto visível (assista 3 voltas).
- [ ] Tamanhos dentro do alvo (vídeo ≤ 6 MB cada, imagens ≤ 600 KB cada).
- [ ] Nomes de arquivo exatamente como na tabela.
