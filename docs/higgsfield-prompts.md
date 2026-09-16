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

## 5. Fotos dos experimentos (página Código aberto)

Cada demo lê `public/experiments/<slug>/photo.jpg`. Basta substituir o arquivo; nenhum código muda.
O Negative Poster também lê `front.png` (recorte com fundo transparente) pra imagem da frente; se
o arquivo não existir, ele usa `photo.jpg`. O site aplica o efeito por cima, então gere a foto
"limpa": sem texto, sem logo, sem filtro.

| Slug | Formato | O que o efeito precisa |
| --- | --- | --- |
| `frosted-reveal` | 4:5, 1600×2000 | Retrato em close, olhar direto, fundo neutro e liso. O vidro fosco esconde detalhe: o rosto tem que ser reconhecível mesmo borrado. |
| `gaze-poster` | 9:16, 1080×1920 | Retrato editorial vertical, P&B, contraste alto, muito espaço vazio de um lado (a palavra vertical entra ali). |
| `halftone-poster` | 4:5, 1600×2000 | Rosto com luz lateral dura e sombras fechadas. Meios-tons variados viram pontos de tamanhos diferentes. |
| `split-tone-duotone` | 4:5, 1600×2000 | Cena com grande variação de luz: contraluz, cidade à noite, névoa. O duotone separa sombra e luz. |
| `liquid-distortion` | 4:5, 1600×2000 | Superfície com linhas retas e repetição: fachada, grade, azulejos, piscina. A onda fica óbvia deformando linhas. |
| `scanline-reveal` | 4:5, 1600×2000 | Cena escura e tecnológica: corredor de servidores, néon apagado, painel. Vai ficar em P&B escuro atrás do feixe. |
| `knockout-marquee` | 16:9, 2400×1350 | Paisagem panorâmica colorida: praia ao pôr do sol, deserto, skyline. Aparece só dentro das letras, então cor e gradiente contam mais que detalhe. |
| `torn-edge-collage` | 4:5, 1600×2000 | Rua, muro grafitado, textura urbana. Vira P&B; o recorte de papel colorido entra por cima. |
| `pixel-sort` | 4:5, 1600×2000 | Céu com gradiente, skyline com luzes, água refletindo. O sort ordena as áreas claras: quanto mais brilho e gradiente, mais dramático. |
| `negative-poster` (`photo.jpg`) | 9:16, 1080×1920 | Retrato dramático com metade clara e metade escura, ou fundo dividido em luz e sombra. O texto inverte contra cada lado. |
| `negative-poster` (`front.png`) | PNG transparente, ~800×1200 | Figura de corpo inteiro recortada (pessoa de costas, silhueta caminhando), pra colar na frente. |

Prompts (colar a direção comum da seção 1 antes de cada um):

- **frosted-reveal** — "Tight portrait, subject looking straight into the lens, seamless mid-grey backdrop, soft frontal light, shallow depth of field. 4:5."
- **gaze-poster** — "Editorial fashion portrait, three-quarter profile, black and white, hard side light, the right half of the frame empty and white. 9:16."
- **halftone-poster** — "Portrait lit by one hard light from the side, deep black shadows, bright highlights on the cheekbone, plain dark background. 4:5."
- **split-tone-duotone** — "Backlit figure in fog at dusk, strong rim light, city lights out of focus behind, wide tonal range from black to white. 4:5."
- **liquid-distortion** — "Modernist building facade, repeating windows and straight concrete lines, shot straight on, even daylight. 4:5."
- **scanline-reveal** — "Dark data-centre corridor, rows of server racks with small status lights, single cold light at the far end. 4:5."
- **knockout-marquee** — "Wide coastal landscape at golden hour, saturated orange sky, dark sea, thin horizon line. 16:9."
- **torn-edge-collage** — "Concrete wall covered in layered posters and graffiti, street level, flat daylight, gritty texture. 4:5."
- **pixel-sort** — "City skyline at blue hour with lit windows, gradient sky from orange to deep blue, calm water reflecting the lights. 4:5."
- **negative-poster / photo** — "Portrait with the face half in bright light and half in deep shadow, split exactly down the middle, plain background matching each side. 9:16."
- **negative-poster / front** — "Full-body figure walking away from camera, hooded jacket, isolated on transparent background, subtle ground shadow. PNG."
