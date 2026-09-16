import type { Localized } from "./localized";

/**
 * Open-source experiments: self-contained demo pages served from `public/experiments/<slug>/`
 * and embedded live on the open-source page, source shown beside them.
 */
export type Category = "images" | "typography" | "interaction" | "data" | "security" | "media";

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
    category: "images",
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
    category: "images",
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
    category: "images",
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
    category: "images",
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
    category: "images",
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
    category: "images",
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
  {
    slug: "drag-drop-list",
    category: "interaction",
    createdAt: "2026-09-16T09:00:00-03:00",
    title: "Drag & Drop List",
    summary: {
      pt: "Lista reordenável com o item seguindo o dedo e os vizinhos abrindo espaço. Funciona no mouse, no toque e no teclado.",
      en: "A reorderable list where the item follows your finger and the neighbours make room. Works with mouse, touch and keyboard.",
    },
    technique: {
      pt: "Pointer Events com setPointerCapture, sem a API nativa de drag and drop (que não existe no toque). A troca de posição usa FLIP: mede antes, muda o DOM, mede depois e anima a diferença com a Web Animations API.",
      en: "Pointer Events with setPointerCapture, skipping the native drag and drop API (which does not exist on touch). Reordering uses FLIP: measure first, change the DOM, measure again and animate the delta with the Web Animations API.",
    },
    tags: ["Pointer Events", "FLIP", "a11y"],
    height: 720,
    background: "#0b0d10",
    sourceUrl: null,
  },
  {
    slug: "command-palette",
    category: "interaction",
    createdAt: "2026-09-16T09:05:00-03:00",
    title: "Command Palette",
    summary: {
      pt: "O Ctrl+K que todo app tem hoje: busca difusa, navegação por setas, ações agrupadas e foco preso no diálogo.",
      en: "The Ctrl+K every app has now: fuzzy search, arrow navigation, grouped actions and focus trapped in the dialog.",
    },
    technique: {
      pt: "Um <dialog> nativo com showModal(), que já dá backdrop, Escape e prisão de foco de graça. O ranking é uma busca por subsequência que pontua início de palavra e caracteres seguidos, e marca os trechos que casaram.",
      en: "A native <dialog> with showModal(), which gives backdrop, Escape and focus trapping for free. Ranking is a subsequence match that scores word starts and consecutive hits, and highlights the matched runs.",
    },
    tags: ["dialog", "Fuzzy search", "a11y"],
    height: 720,
    background: "#0b0d10",
    sourceUrl: null,
  },
  {
    slug: "magnetic-buttons",
    category: "interaction",
    createdAt: "2026-09-16T09:10:00-03:00",
    title: "Magnetic Buttons",
    summary: {
      pt: "Botões que puxam o cursor quando ele chega perto, com um cursor próprio que chega sempre um pouco atrasado.",
      en: "Buttons that pull the cursor when it gets close, with a custom cursor that always arrives a little late.",
    },
    technique: {
      pt: "A distância do ponteiro ao centro do botão vira um deslocamento com queda suave; o texto anda menos que a caixa, o que dá a profundidade. Tudo num único requestAnimationFrame que interpola por atrito, não por transition.",
      en: "The pointer's distance to the button centre becomes an offset with a soft falloff; the label moves less than the box, which reads as depth. It all runs in one requestAnimationFrame that eases by friction, not by transition.",
    },
    tags: ["Pointer Events", "rAF", "Micro-interaction"],
    height: 700,
    background: "#0b0d10",
    sourceUrl: null,
  },
  {
    slug: "scroll-story",
    category: "interaction",
    createdAt: "2026-09-16T09:15:00-03:00",
    title: "Scroll Story",
    summary: {
      pt: "Narrativa que avança conforme você rola: barra de progresso, capítulos que entram e um objeto que se monta ao longo do caminho.",
      en: "A story that advances as you scroll: progress bar, chapters sliding in and an object assembling along the way.",
    },
    technique: {
      pt: "Animações guiadas pelo scroll no próprio CSS: scroll-timeline no contêiner e animation-timeline: view() nos capítulos. Nada roda em JavaScript, então nada trava. Onde o browser não suporta, um @supports not devolve tudo ao estado final.",
      en: "Scroll-driven animations in plain CSS: scroll-timeline on the container and animation-timeline: view() on the chapters. Nothing runs in JavaScript, so nothing janks. Where the browser lacks support, an @supports not restores the final state.",
    },
    tags: ["scroll-timeline", "CSS", "Progressive enhancement"],
    height: 760,
    background: "#0b0d10",
    sourceUrl: null,
  },
  {
    slug: "bottom-sheet",
    category: "interaction",
    createdAt: "2026-09-16T09:20:00-03:00",
    title: "Bottom Sheet",
    summary: {
      pt: "A folha que sobe de baixo, com três pontos de encaixe e a inércia do sistema. Sem uma linha de cálculo de arrasto.",
      en: "The sheet that rises from the bottom, with three snap points and the system's own inertia. Not a line of drag maths.",
    },
    technique: {
      pt: "A folha vive num scroller com scroll-snap-type: y mandatory; espaçadores invisíveis no topo viram os encaixes. O gesto de arrastar é o scroll nativo, com frenagem do sistema, e overscroll-behavior: contain impede que vaze pra página.",
      en: "The sheet lives in a scroller with scroll-snap-type: y mandatory; invisible spacers at the top become the stops. The drag gesture is native scrolling, with the system's own braking, and overscroll-behavior: contain keeps it from leaking to the page.",
    },
    tags: ["scroll-snap", "Mobile", "CSS"],
    height: 760,
    background: "#0b0d10",
    sourceUrl: null,
  },
  {
    slug: "svg-sparklines",
    category: "data",
    createdAt: "2026-09-16T09:30:00-03:00",
    title: "SVG Sparklines",
    summary: {
      pt: "Mini-gráficos de linha, área, barras e degrau em SVG puro, com tooltip e ponto de destaque. Sem biblioteca de chart.",
      en: "Tiny line, area, bar and step charts in pure SVG, with tooltip and highlight dot. No charting library.",
    },
    technique: {
      pt: "Os valores viram um path com escala linear e, na linha suave, uma Bézier cúbica com tangentes de Catmull-Rom. O viewBox faz a responsividade sozinho; o ponto mais próximo do cursor sai de uma busca pelo índice, não de hit testing.",
      en: "Values become a path with a linear scale and, on the smooth line, a cubic Bézier with Catmull-Rom tangents. The viewBox handles responsiveness on its own; the point nearest the cursor comes from an index lookup, not hit testing.",
    },
    tags: ["SVG", "Dataviz", "Vanilla JS"],
    height: 740,
    background: "#0b0d10",
    sourceUrl: null,
  },
  {
    slug: "commit-heatmap",
    category: "data",
    createdAt: "2026-09-16T09:35:00-03:00",
    title: "Commit Heatmap",
    summary: {
      pt: "O calendário de contribuições do GitHub: 53 semanas por 7 dias, intensidade por cor, tooltip por dia. Cole seus dados.",
      en: "GitHub's contribution calendar: 53 weeks by 7 days, colour by intensity, tooltip per day. Paste your own data.",
    },
    technique: {
      pt: "Um grid CSS com grid-auto-flow: column e 7 linhas empilha os dias em colunas de semana. Os cinco níveis de cor saem de color-mix() sobre a mesma base, escolhidos pelo quantil do valor — então a escala se ajusta a quem commita pouco ou muito.",
      en: "A CSS grid with grid-auto-flow: column and 7 rows stacks days into week columns. The five colour levels come from color-mix() over one base, picked by the value's quantile — so the scale adapts to light and heavy committers alike.",
    },
    tags: ["CSS Grid", "color-mix", "Dataviz"],
    height: 700,
    background: "#0b0d10",
    sourceUrl: null,
  },
  {
    slug: "flip-clock",
    category: "data",
    createdAt: "2026-09-16T09:40:00-03:00",
    title: "Flip Clock",
    summary: {
      pt: "Relógio ou contagem regressiva com dígitos que viram, como painel de aeroporto. Só o dígito que muda anima.",
      en: "A clock or countdown with digits that flip, like an airport board. Only the digit that changes animates.",
    },
    technique: {
      pt: "Cada dígito é um cartão em duas metades. Quando muda, uma folha com o valor antigo dobra por cima em rotateX enquanto outra, já com o novo, desdobra por baixo, tudo sob perspective. O relógio alinha o setInterval ao segundo cheio.",
      en: "Each digit is a card in two halves. On change, a leaf with the old value folds over in rotateX while another, already showing the new one, unfolds underneath, all under perspective. The clock aligns its setInterval to the whole second.",
    },
    tags: ["CSS 3D", "Animation", "Vanilla JS"],
    height: 700,
    background: "#0b0d10",
    sourceUrl: null,
  },
  {
    slug: "virtual-table",
    category: "data",
    createdAt: "2026-09-16T09:45:00-03:00",
    title: "Virtual Table",
    summary: {
      pt: "Cem mil linhas rolando liso, com ordenação e filtro. Só as visíveis existem no DOM.",
      en: "A hundred thousand rows scrolling smoothly, with sorting and filtering. Only the visible ones exist in the DOM.",
    },
    technique: {
      pt: "Um espaçador com altura igual a linhas × altura mantém a barra de rolagem honesta. A cada scroll, first = floor(scrollTop / altura) define as ~20 linhas renderizadas, deslocadas por transform: translateY. Ordenar e filtrar mexem num índice, nunca no DOM.",
      en: "A spacer whose height equals rows × height keeps the scrollbar honest. On each scroll, first = floor(scrollTop / height) picks the ~20 rendered rows, offset by transform: translateY. Sorting and filtering touch an index, never the DOM.",
    },
    tags: ["Virtualization", "Performance", "Vanilla JS"],
    height: 740,
    background: "#0b0d10",
    sourceUrl: null,
  },
  {
    slug: "oauth-pkce",
    category: "security",
    createdAt: "2026-09-16T10:00:00-03:00",
    title: "OAuth PKCE",
    summary: {
      pt: "O fluxo authorization code + PKCE passo a passo, com criptografia real. Ligue o modo \"código roubado\" e veja a troca ser recusada.",
      en: "The authorization code + PKCE flow step by step, with real crypto. Flip on \"stolen code\" and watch the exchange get refused.",
    },
    technique: {
      pt: "O code_verifier vem de crypto.getRandomValues e o desafio de crypto.subtle.digest('SHA-256', …), ambos nativos. Como só o hash viaja na ida, quem interceptar o código no redirect não consegue montar a chamada ao /token.",
      en: "The code_verifier comes from crypto.getRandomValues and the challenge from crypto.subtle.digest('SHA-256', …), both native. Since only the hash travels on the way in, whoever intercepts the code at the redirect cannot build the /token call.",
    },
    tags: ["WebCrypto", "OAuth", "Security"],
    height: 780,
    background: "#0b0d10",
    sourceUrl: null,
  },
  {
    slug: "password-strength",
    category: "security",
    createdAt: "2026-09-16T10:05:00-03:00",
    title: "Password Strength",
    summary: {
      pt: "Medidor que conta entropia de verdade e desconta padrão previsível, em vez de exigir um caractere especial e dar \"forte\".",
      en: "A meter that counts real entropy and discounts predictable patterns, instead of demanding one special character and saying \"strong\".",
    },
    technique: {
      pt: "A base é log2(alfabeto^tamanho). Em cima entram descontos por sequência, repetição, ano, padrão de teclado, palavra de dicionário e troca leet — tudo que um cracker já tem na lista. O tempo de quebra é 2^(bits-1) dividido pelas tentativas por segundo.",
      en: "The base is log2(alphabet^length). On top come penalties for runs, repeats, years, keyboard patterns, dictionary words and leet substitutions — everything a cracker already has in its list. Crack time is 2^(bits-1) over guesses per second.",
    },
    tags: ["Entropy", "Security", "UX"],
    height: 740,
    background: "#0b0d10",
    sourceUrl: null,
  },
  {
    slug: "aes-gcm",
    category: "security",
    createdAt: "2026-09-16T10:10:00-03:00",
    title: "AES-GCM",
    summary: {
      pt: "Cifra autenticada no browser. Clique num byte do texto cifrado e veja a decifragem recusar em vez de devolver lixo.",
      en: "Authenticated encryption in the browser. Click a byte of the ciphertext and watch decryption refuse instead of returning garbage.",
    },
    technique: {
      pt: "A senha vira chave com PBKDF2 (210 mil iterações, SHA-256, sal aleatório) e a cifra é crypto.subtle.encrypt com AES-GCM. Os 16 bytes finais são a tag que cobre todo o texto: um bit trocado e o decrypt lança OperationError.",
      en: "The password becomes a key with PBKDF2 (210k iterations, SHA-256, random salt) and the cipher is crypto.subtle.encrypt with AES-GCM. The final 16 bytes are the tag covering the whole text: one flipped bit and decrypt throws OperationError.",
    },
    tags: ["WebCrypto", "AES-GCM", "Security"],
    height: 780,
    background: "#0b0d10",
    sourceUrl: null,
  },
  {
    slug: "qr-code",
    category: "security",
    createdAt: "2026-09-16T10:15:00-03:00",
    title: "QR Code",
    summary: {
      pt: "Gerador de QR escrito do zero — Reed–Solomon, máscaras e tudo. Sem biblioteca, sem rede, saída em SVG.",
      en: "A QR generator written from scratch — Reed–Solomon, masking and all. No library, no network, SVG output.",
    },
    technique: {
      pt: "O texto vira bits em modo byte, ganha paridade Reed–Solomon sobre GF(256), é intercalado por bloco e costurado em zigue-zague pela matriz. As 8 máscaras são testadas e vence a de menor penalidade, pelas quatro regras da norma.",
      en: "Text becomes bits in byte mode, gets Reed–Solomon parity over GF(256), is interleaved per block and woven zig-zag into the matrix. All 8 masks are scored and the lowest penalty wins, by the spec's four rules.",
    },
    tags: ["Reed-Solomon", "SVG", "Vanilla JS"],
    height: 780,
    background: "#0b0d10",
    sourceUrl: null,
  },
  {
    slug: "image-compressor",
    category: "media",
    createdAt: "2026-09-16T10:30:00-03:00",
    title: "Image Compressor",
    summary: {
      pt: "Redimensiona e recomprime no próprio browser, com comparação lado a lado. A imagem nunca sai da máquina.",
      en: "Resize and recompress in the browser itself, with a side-by-side wipe. The image never leaves the machine.",
    },
    technique: {
      pt: "A imagem entra num canvas no tamanho de destino e sai por canvas.toBlob(tipo, qualidade). O redimensionamento vai em etapas de no máximo 2× por vez, senão o downscale de uma tacada serrilha as bordas. AVIF só aparece se o encoder existir.",
      en: "The image goes into a canvas at target size and comes out via canvas.toBlob(type, quality). Downscaling halves at most 2× per step, otherwise a one-shot resize aliases the edges. AVIF only shows up when the encoder exists.",
    },
    tags: ["Canvas 2D", "File API", "Performance"],
    height: 740,
    background: "#0b0d10",
    sourceUrl: null,
  },
  {
    slug: "audio-visualizer",
    category: "media",
    createdAt: "2026-09-16T10:35:00-03:00",
    title: "Audio Visualizer",
    summary: {
      pt: "Espectro, forma de onda e anel radial saindo da Web Audio. Roda com um sinal sintetizado, com o microfone ou com um arquivo seu.",
      en: "Spectrum, waveform and radial ring straight out of Web Audio. Runs on a synthesised signal, the microphone or a file of yours.",
    },
    technique: {
      pt: "Um AnalyserNode entrega getByteFrequencyData e getByteTimeDomainData a cada quadro. O eixo das barras é logarítmico porque a audição também é. Sem fonte externa, osciladores com LFO alimentam o analisador por um ganho zerado: mede, mas não toca.",
      en: "An AnalyserNode hands over getByteFrequencyData and getByteTimeDomainData every frame. The bar axis is logarithmic because hearing is too. With no external source, oscillators with an LFO feed the analyser through a zeroed gain: it measures, but stays silent.",
    },
    tags: ["Web Audio", "Canvas 2D", "rAF"],
    height: 740,
    background: "#0b0d10",
    sourceUrl: null,
  },
  {
    slug: "screen-recorder",
    category: "media",
    createdAt: "2026-09-16T10:40:00-03:00",
    title: "Screen Recorder",
    summary: {
      pt: "Captura de tela com áudio e microfone, do jeito nativo. Sem extensão, sem upload, sem servidor.",
      en: "Screen capture with system audio and microphone, the native way. No extension, no upload, no server.",
    },
    technique: {
      pt: "getDisplayMedia devolve um MediaStream que o MediaRecorder corta em pedaços a cada ondataavailable; os Blobs viram um arquivo só no fim. Com microfone e som do sistema juntos, os dois passam por um AudioContext e saem misturados num MediaStreamDestination.",
      en: "getDisplayMedia returns a MediaStream that MediaRecorder slices at every ondataavailable; the Blobs become a single file at the end. With microphone and system audio together, both pass through an AudioContext and come out mixed at a MediaStreamDestination.",
    },
    tags: ["MediaRecorder", "getDisplayMedia", "Privacy"],
    height: 740,
    background: "#0b0d10",
    sourceUrl: null,
  },
];
