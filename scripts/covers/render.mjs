// Renders the case covers from the editorial template.
// Two sizes per project: 4:5 for the cards, 16:9 for the case hero.
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const here = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const out = process.argv[2];
const projects = JSON.parse(fs.readFileSync(path.join(here, "projects.json"), "utf8"));

const SIZES = [
  {
    suffix: "",
    width: 1200,
    height: 1500,
    vars: {
      "--inset": "40px",
      "--pad": "56px",
      "--micro": "18px",
      "--mark": "380px",
      "--monogram": "440px",
      "--name": "62px",
      "--gap": "20px",
    },
  },
  {
    suffix: "-wide",
    width: 1920,
    height: 1080,
    vars: {
      "--inset": "40px",
      "--pad": "64px",
      "--micro": "18px",
      "--mark": "330px",
      "--monogram": "380px",
      "--name": "76px",
      "--gap": "22px",
    },
  },
];

const browser = await chromium.launch({ channel: "chrome" });
fs.mkdirSync(out, { recursive: true });

for (const size of SIZES) {
  const page = await browser.newPage({
    viewport: { width: size.width, height: size.height },
    deviceScaleFactor: 1,
  });
  await page.goto(pathToFileURL(path.join(here, "cover.html")).href);

  for (const project of projects) {
    await page.evaluate((data) => window.render(data), { ...project, vars: size.vars });
    await page.waitForTimeout(120);
    const file = path.join(out, `${project.slug}${size.suffix}.png`);
    await page.screenshot({ path: file });
    console.log(path.basename(file));
  }
  await page.close();
}

await browser.close();
