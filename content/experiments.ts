import type { Localized } from "./localized";

/**
 * Open-source experiments: self-contained demo pages served from `public/experiments/<slug>/`
 * and embedded live on the open-source page, source shown beside them.
 */
export type Experiment = {
  slug: string;
  title: string;
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
];
