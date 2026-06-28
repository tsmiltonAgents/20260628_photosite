// Screenshot the hub + every design (full page, lazy-load triggered).
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const OUT = path.join(ROOT, '.shots');
fs.mkdirSync(OUT, { recursive: true });

const only = process.argv[2]; // optional substring filter
const BASE = process.env.BASE; // e.g. http://127.0.0.1:8099 — use http for true same-origin (WebGL) rendering

(async () => {
  const browser = await chromium.launch();
  const mk = (rel) => BASE ? (BASE.replace(/\/$/, '') + '/' + rel) : ('file://' + path.join(ROOT, rel));
  const pages = [{ name: '00-index', url: mk('index.html') }];
  for (const dir of fs.readdirSync(path.join(ROOT, 'designs')).sort()) {
    const f = path.join(ROOT, 'designs', dir, 'index.html');
    if (fs.existsSync(f)) pages.push({ name: dir, url: mk('designs/' + dir + '/index.html') });
  }
  const list = only ? pages.filter(p => p.name.includes(only)) : pages;

  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  for (const p of list) {
    const page = await ctx.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push('PAGEERR: ' + String(e)));
    page.on('console', m => { if (m.type() === 'error') errors.push('CONSOLE: ' + m.text()); });
    try { await page.goto(p.url, { waitUntil: 'load', timeout: 25000 }); } catch(e){}
    // scroll through to trigger lazy-load / IntersectionObserver
    await page.evaluate(async () => {
      const h = document.body.scrollHeight;
      for (let y = 0; y <= h; y += window.innerHeight * 0.8) { window.scrollTo(0, y); await new Promise(r=>setTimeout(r,120)); }
      window.scrollTo(0,0);
    });
    await page.waitForTimeout(2200);
    // count real broken (loaded but failed) vs unloaded
    const info = await page.evaluate(() => {
      const imgs=[...document.images];
      return { total: imgs.length, broken: imgs.filter(i=>i.complete && i.naturalWidth===0 && i.getAttribute('src')).length };
    });
    await page.screenshot({ path: path.join(OUT, p.name + '.png'), fullPage: true });
    console.log(`${p.name.padEnd(22)} imgs:${info.total} trulyBroken:${info.broken} jsErr:${errors.length}` + (errors.length?' || '+errors[0]:''));
    await page.close();
  }
  await browser.close();
})();
