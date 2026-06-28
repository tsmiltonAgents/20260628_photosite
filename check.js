// Fast error/broken-image check over http for a range of designs. No screenshots.
// Usage: BASE=http://127.0.0.1:8099 node check.js 36 85
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const ROOT = __dirname;
const BASE = process.env.BASE || 'http://127.0.0.1:8099';
const lo = parseInt(process.argv[2] || '1', 10);
const hi = parseInt(process.argv[3] || '999', 10);

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const dirs = fs.readdirSync(path.join(ROOT, 'designs')).filter(d => {
    const m = d.match(/^(\d+)/); return m && +m[1] >= lo && +m[1] <= hi;
  }).sort();
  let problems = 0;
  for (const dir of dirs) {
    const page = await ctx.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push('PAGEERR: ' + String(e).slice(0, 160)));
    page.on('console', m => { if (m.type() === 'error') errors.push('CONSOLE: ' + m.text().slice(0, 160)); });
    try { await page.goto(`${BASE}/designs/${dir}/index.html`, { waitUntil: 'load', timeout: 25000 }); }
    catch (e) { errors.push('GOTO: ' + String(e).slice(0,120)); }
    await page.evaluate(async () => {
      const h = document.body.scrollHeight;
      for (let y = 0; y <= Math.min(h, innerHeight*6); y += innerHeight*0.7){ scrollTo(0,y); await new Promise(r=>setTimeout(r,60)); }
      scrollTo(0,0);
    }).catch(()=>{});
    await page.waitForTimeout(1600);
    const info = await page.evaluate(() => {
      const imgs=[...document.images];
      return { total: imgs.length, broken: imgs.filter(i=>i.complete && i.naturalWidth===0 && i.getAttribute('src')).length };
    }).catch(()=>({total:-1,broken:-1}));
    const bad = errors.length || info.broken>0 || info.total===0;
    if (bad) problems++;
    console.log(`${bad?'⚠️ ':'   '}${dir.padEnd(24)} imgs:${info.total} broken:${info.broken} err:${errors.length}` + (errors.length?'  '+errors.slice(0,2).join(' | '):''));
    await page.close();
  }
  console.log(`\n=== ${problems} design(s) flagged ===`);
  await browser.close();
})();
