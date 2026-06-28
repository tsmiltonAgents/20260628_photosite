// Generate a thumbnail screenshot (top viewport, 4:3) of every design's page.
// Output: assets/thumbs/NN-slug.jpg  (downscaled afterwards with sips)
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const OUT = path.join(ROOT, 'assets', 'thumbs');
fs.mkdirSync(OUT, { recursive: true });

const W = 1440, H = 1080; // 4:3 to match the card aspect-ratio

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 1.5 });
  const dirs = fs.readdirSync(path.join(ROOT, 'designs')).filter(d => /^\d/.test(d)).sort();
  for (const dir of dirs) {
    const f = path.join(ROOT, 'designs', dir, 'index.html');
    if (!fs.existsSync(f)) continue;
    const page = await ctx.newPage();
    try { await page.goto('file://' + f, { waitUntil: 'load', timeout: 25000 }); } catch (e) {}
    // trigger lazy-load / observers, then return to top
    await page.evaluate(async () => {
      const h = document.body.scrollHeight;
      for (let y = 0; y <= Math.min(h, window.innerHeight * 4); y += window.innerHeight * 0.7) {
        window.scrollTo(0, y); await new Promise(r => setTimeout(r, 90));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(2400); // fonts, boot sequences, fade-ins
    await page.screenshot({
      path: path.join(OUT, dir + '.jpg'),
      type: 'jpeg', quality: 90,
      clip: { x: 0, y: 0, width: W, height: H },
    });
    console.log('shot', dir);
    await page.close();
  }
  await browser.close();
})();
