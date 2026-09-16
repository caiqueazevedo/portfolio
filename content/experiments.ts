import type { Localized } from "./localized";

/**
 * Open-source experiments: self-contained demo pages served from `public/experiments/<slug>/`
 * and embedded live on the open-source page, source shown beside them.
 */
export type Category = "filter" | "typography" | "collage";

export type Experiment = {
  slug: string;
  title: string;
  category: Category;
  /** ISO date; the listing sorts by it. */
  createdAt: string;
  summary: Localized<string>;
  /** One line on the technique, shown under the code. */
  technique: Localized<string>;
  tags: string[];
  /** Iframe height on large screens, px. */
  height: number;
  /** Demo background, so the frame does not flash on load. */
  background: string;
  /** Public URL of the source on GitHub, once the repo exists. */
  sourceUrl: string | null;
};

export const experiments: Experiment[] = [
  {
    slug: "frosted-reveal",
    category: "filter",
    createdAt: "2026-09-14T10:00:00-03:00",
    title: "Frosted Reveal",
    summary: {
      pt: "Vidro fosco sobre um retrato, com uma janela nítida que você arrasta ou deixa seguir o cursor. A janela pode ser retângulo, elipse, losango, triângulo ou uma palavra.",
      en: "Frosted glass over a portrait, with a sharp window you drag or let follow the cursor. The window can be a rectangle, ellipse, diamond, triangle or a word.",
    },
    technique: {
      pt: "feTurbulence → feDisplacementMap → feGaussianBlur num filtro SVG aplicado a uma cópia da imagem. A janela é um <svg> com uma cópia nítida sob mask: a máscara é a forma escolhida ou a palavra em <text>, e a palavra é só o recorte, sem contorno. A foto nunca sai do navegador.",
      en: "feTurbulence → feDisplacementMap → feGaussianBlur in an SVG filter applied to a copy of the image. The window is an <svg> with a sharp copy under a mask: the mask is the chosen shape or the word as <text>, and the word is just the cutout, no outline. The photo never leaves the browser.",
    },
    tags: ["SVG filter", "SVG mask", "Pointer Events"],
    height: 800,
    background: "#0b0d10",
    sourceUrl: null,
  },
  {
    slug: "gaze-poster",
    category: "typography",
    createdAt: "2026-09-14T12:00:00-03:00",
    title: "Gaze Poster",
    summary: {
      pt: "Uma palavra vertical recorta a foto: onde cai no branco mostra a imagem por dentro, onde cai na foto vira só contorno.",
      en: "A vertical word cuts the photo: where it lands on white it shows the image inside, where it lands on the photo it becomes an outline.",
    },
    technique: {
      pt: "Um único <svg>: a foto recebe mask=\"url(#reveal)\", e a máscara é o retângulo da direita mais o mesmo <text> em branco. textLength estica a palavra pra altura do cartaz.",
      en: "A single <svg>: the photo gets mask=\"url(#reveal)\", and the mask is the right-hand rect plus the same <text> in white. textLength stretches the word to the poster height.",
    },
    tags: ["SVG mask", "Typography", "Vanilla JS"],
    height: 760,
    background: "#e6e2db",
    sourceUrl: null,
  },
  {
    slug: "halftone-poster",
    category: "filter",
    createdAt: "2026-09-15T21:00:00-03:00",
    title: "Halftone Poster",
    summary: {
      pt: "A foto vira retícula de pontos, como jornal ou serigrafia. Tamanho do ponto, ângulo da trama e cores de tinta e papel.",
      en: "The photo becomes a dot screen, like newsprint or silkscreen. Dot size, screen angle, ink and paper colours.",
    },
    technique: {
      pt: "Canvas 2D lê a foto com getImageData; uma grade rotacionada percorre a imagem e, em cada célula, a luminância média vira o raio do círculo. Escuro = ponto grande.",
      en: "A 2D canvas reads the photo with getImageData; a rotated lattice walks the image and, in each cell, the average luminance becomes the circle radius. Dark = big dot.",
    },
    tags: ["Canvas 2D", "Print", "Vanilla JS"],
    height: 760,
    background: "#0b0d10",
    sourceUrl: null,
  },
  {
    slug: "split-tone-duotone",
    category: "filter",
    createdAt: "2026-09-15T21:05:00-03:00",
    title: "Split Tone Duotone",
    summary: {
      pt: "Sombras numa cor, luzes em outra, com o meio-tom onde você quiser. Pares prontos e mistura com a cor original.",
      en: "Shadows in one colour, highlights in another, midtone wherever you want it. Presets and a blend back to the original.",
    },
    technique: {
      pt: "Um filtro SVG só: feColorMatrix tira a saturação e feComponentTransfer com type=\"table\" mapeia preto → sombra e branco → luz, com um terceiro ponto no meio-tom. Sem canvas.",
      en: "One SVG filter: feColorMatrix removes saturation and feComponentTransfer with type=\"table\" maps black → shadow and white → highlight, with a third stop at the midtone. No canvas.",
    },
    tags: ["SVG filter", "Color", "CSS"],
    height: 760,
    background: "#0b0d10",
    sourceUrl: null,
  },
  {
    slug: "liquid-distortion",
    category: "filter",
    createdAt: "2026-09-15T21:10:00-03:00",
    title: "Liquid Distortion",
    summary: {
      pt: "A foto ondula como água onde o cursor passa e se acalma quando ele para. Quanto mais rápido o movimento, mais forte a onda.",
      en: "The photo ripples like water where the cursor moves and settles when it stops. Faster movement, stronger wave.",
    },
    technique: {
      pt: "Duas cópias da foto: a de cima passa por feTurbulence → feDisplacementMap e só aparece dentro de uma mask-image radial que segue o ponteiro. A velocidade vira energia, a energia vira scale do deslocamento e decai a cada frame.",
      en: "Two copies of the photo: the top one goes through feTurbulence → feDisplacementMap and only shows inside a radial mask-image that follows the pointer. Speed becomes energy, energy becomes displacement scale and decays every frame.",
    },
    tags: ["SVG filter", "Pointer Events", "rAF"],
    height: 760,
    background: "#0b0d10",
    sourceUrl: null,
  },
  {
    slug: "scanline-reveal",
    category: "typography",
    createdAt: "2026-09-15T21:15:00-03:00",
    title: "Scanline Reveal",
    summary: {
      pt: "Um feixe varre a foto de cima a baixo e a manchete acende linha a linha atrás dele. Texto, duração e cor do feixe editáveis.",
      en: "A beam sweeps the photo top to bottom and the headline lights up line by line behind it. Editable text, duration and beam colour.",
    },
    technique: {
      pt: "Uma propriedade registrada com @property (--scan) é animada de 0% a 100%. O feixe usa o valor como top; a manchete usa como clip-path: inset(). Um @keyframes move os dois. Com prefers-reduced-motion o texto aparece parado.",
      en: "A property registered with @property (--scan) animates from 0% to 100%. The beam uses it as top; the headline as clip-path: inset(). One @keyframes drives both. With prefers-reduced-motion the text shows still.",
    },
    tags: ["CSS @property", "clip-path", "Animation"],
    height: 760,
    background: "#0b0d10",
    sourceUrl: null,
  },
  {
    slug: "knockout-marquee",
    category: "typography",
    createdAt: "2026-09-15T21:20:00-03:00",
    title: "Knockout Marquee",
    summary: {
      pt: "Um texto gigante corre em loop e mostra a foto por dentro das letras. A foto fica parada; só a máscara anda.",
      en: "A giant text runs in a loop and shows the photo inside the letters. The photo stays put; only the mask moves.",
    },
    technique: {
      pt: "A <image> recebe mask=\"url(#knock)\" e a máscara é um <text> com o texto repetido. A Web Animations API desloca o texto exatamente uma repetição por ciclo, então o loop não pula.",
      en: "The <image> gets mask=\"url(#knock)\" and the mask is a <text> with the text repeated. The Web Animations API shifts the text exactly one repetition per cycle, so the loop never jumps.",
    },
    tags: ["SVG mask", "Web Animations", "Typography"],
    height: 640,
    background: "#0b0d10",
    sourceUrl: null,
  },
  {
    slug: "torn-edge-collage",
    category: "collage",
    createdAt: "2026-09-15T21:25:00-03:00",
    title: "Torn Edge Collage",
    summary: {
      pt: "Recortes de papel rasgado colados sobre a foto em P&B. Arraste, gire, troque a cor do papel; cada rasgo é sorteado na hora.",
      en: "Torn paper scraps stuck over the B&W photo. Drag, rotate, change the paper colour; every tear is generated on the spot.",
    },
    technique: {
      pt: "Cada recorte é um clip-path: polygon() com pontos sorteados ao longo da borda; a fibra é um feTurbulence em data: URI com mix-blend-mode: multiply. A sombra é filter: drop-shadow, que acompanha o rasgo. Arrasto com Pointer Events.",
      en: "Each scrap is a clip-path: polygon() with points jittered along the edge; the fibre is a feTurbulence data: URI with mix-blend-mode: multiply. The shadow is filter: drop-shadow, which follows the tear. Dragging via Pointer Events.",
    },
    tags: ["clip-path", "Pointer Events", "Raw Folio"],
    height: 760,
    background: "#0b0d10",
    sourceUrl: null,
  },
  {
    slug: "pixel-sort",
    category: "filter",
    createdAt: "2026-09-15T21:30:00-03:00",
    title: "Pixel Sort",
    summary: {
      pt: "Trechos da foto dentro de uma faixa de brilho são ordenados coluna a coluna. O glitch clássico, sem shader.",
      en: "Runs of the photo inside a brightness window get sorted column by column. The classic glitch, no shader.",
    },
    technique: {
      pt: "Canvas 2D e getImageData. Em cada coluna (ou linha), os pixels com brilho entre os dois limiares formam trechos contínuos; cada trecho é ordenado por brilho e escrito de volta com putImageData.",
      en: "2D canvas and getImageData. In each column (or row), pixels with brightness between the two thresholds form contiguous runs; each run is sorted by brightness and written back with putImageData.",
    },
    tags: ["Canvas 2D", "Glitch", "Vanilla JS"],
    height: 760,
    background: "#0b0d10",
    sourceUrl: null,
  },
  {
    slug: "negative-poster",
    category: "typography",
    createdAt: "2026-09-15T23:00:00-03:00",
    title: "Negative Poster",
    summary: {
      pt: "Cartaz em três camadas: fundo inteiro, manchete que inverte contra o fundo, imagem menor na frente. Faixa de cor, legendas e grão opcionais.",
      en: "A three-layer poster: full background, a headline that inverts against it, a smaller image in front. Optional colour band, captions and grain.",
    },
    technique: {
      pt: "O negativo é uma linha de CSS: a manchete tem uma cor (você escolhe) e mix-blend-mode: difference. Sobre área clara escurece, sobre área escura clareia, letra por letra. exclusion faz o mesmo com menos contraste; sólido desliga. A imagem da frente arrasta com Pointer Events e usa drop-shadow.",
      en: "The negative is one line of CSS: the headline has a colour (your pick) and mix-blend-mode: difference. It darkens over light areas and lightens over dark ones, letter by letter. exclusion does the same with less contrast; solid turns it off. The front image drags with Pointer Events and uses drop-shadow.",
    },
    tags: ["mix-blend-mode", "Poster", "Pointer Events"],
    height: 900,
    background: "#0b0d10",
    sourceUrl: null,
  },
];
