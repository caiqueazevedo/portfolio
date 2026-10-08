# Capas dos cases

Gera `public/media/covers/<slug>.png` (4:5, cards) e `<slug>-wide.png` (16:9, hero do case)
a partir do gabarito editorial.

```bash
cd scripts/covers
npm install playwright
cp ../../.next/static/media/*-s.p.*.woff2 jost.woff2   # Jost que o next/font baixou
node render.mjs ../../public/media/covers
```

`projects.json` é a fonte: slug, nome, tag, stack, ano, número do case. `mark` aponta para um
SVG de marca (hoje só a Aetherion tem); sem marca, o número do case vira a arte.

O render usa o Chrome instalado (`channel: "chrome"`), não os browsers do Playwright.
