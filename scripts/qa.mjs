/**
 * 품질 자동 점검 — 대비비 / 가로 오버플로 / 최소 탭영역 / 최소 글자 크기.
 *
 *   npm run build
 *   npx serve out -l 4330     (또는  python3 -m http.server 4330 --directory out)
 *   node scripts/qa.mjs
 *
 * CSS 토큰을 브라우저에서 직접 읽어 검증하므로 색을 바꿔도 검사가 유효합니다.
 */
import { spawn } from 'node:child_process';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import WebSocket from 'ws';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const BASE = process.env.SITE_URL || 'http://127.0.0.1:4330';
const PORT = 9361;

const BROWSER = [
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
].find((p) => fs.existsSync(p));
if (!BROWSER) { console.error('브라우저를 찾을 수 없습니다.'); process.exit(1); }

const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const get = (p) => new Promise((res, rej) =>
  http.get({ host: '127.0.0.1', port: PORT, path: p }, (r) => {
    let d = ''; r.on('data', (c) => (d += c)); r.on('end', () => res(JSON.parse(d)));
  }).on('error', rej));

function h2r(h) {
  h = h.replace('#', '');
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}
function lum(c) {
  const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
  return 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2]);
}
const ratio = (a, b) => { const L1 = lum(h2r(a)), L2 = lum(h2r(b)); return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05); };

const VIEWS = [[1440, 900, 'desktop'], [834, 1112, 'tablet'], [390, 844, 'mobile'], [320, 720, 'narrow']];
const PAGES = ['/', '/capabilities/', '/products/', '/oem/', '/about/', '/contact/', '/en/', '/zh/', '/legal/ip/'];

const proc = spawn(BROWSER, ['--headless=new', '--disable-gpu', '--no-sandbox', '--hide-scrollbars',
  `--remote-debugging-port=${PORT}`, '--user-data-dir=/tmp/iuyu-qa', 'about:blank'], { stdio: 'ignore' });

let targets;
for (let i = 0; i < 60; i++) { try { targets = await get('/json/list'); break; } catch { await wait(400); } }
const ws = new WebSocket(targets.find((t) => t.type === 'page').webSocketDebuggerUrl,
  { perMessageDeflate: false, maxPayload: 256 * 1024 * 1024 });
await new Promise((r) => ws.on('open', r));
let id = 0; const pending = new Map();
ws.on('message', (raw) => { const m = JSON.parse(raw); if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); } });
const send = (method, params = {}) => new Promise((res) => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });

await send('Page.enable'); await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
await send('Page.navigate', { url: BASE + '/' }); await wait(1800);

const tok = await send('Runtime.evaluate', { returnByValue: true, expression: `(() => {
  const cs = getComputedStyle(document.documentElement);
  const g = v => cs.getPropertyValue(v).trim();
  return JSON.stringify({ paper: g('--paper'), surface: g('--surface'), ink: g('--ink'), ink2: g('--ink-2'),
    ink3: g('--ink-3'), ink4: g('--ink-4'), accent: g('--accent'), accentBright: g('--accent-bright'), onDark: g('--accent-on-dark') });
})()` });
const T = JSON.parse(tok.result.result.value);

console.log('대비비 (CSS 토큰 실측 / WCAG AA — 본문 4.5, 보조 3.0)');
let contrastFail = 0;
for (const [n, h, m] of [['ink', T.ink, 4.5], ['ink-2', T.ink2, 4.5], ['ink-3', T.ink3, 4.5],
  ['ink-4', T.ink4, 3.0], ['accent', T.accent, 4.5], ['accent-bright', T.accentBright, 4.5]]) {
  const r1 = ratio(h, T.paper), r2 = ratio(h, T.surface);
  const ok = Math.min(r1, r2) >= m;
  if (!ok) contrastFail++;
  console.log(`  ${ok ? 'OK  ' : 'FAIL'} ${n.padEnd(15)} ${h}  paper ${r1.toFixed(2)}  surface ${r2.toFixed(2)}  (min ${m})`);
}
const odr = ratio(T.onDark, '#0b0e12');
console.log(`  ${odr >= 4.5 ? 'OK  ' : 'FAIL'} ${'accent-on-dark'.padEnd(15)} ${T.onDark}  vs #0b0e12 ${odr.toFixed(2)}  (min 4.5, 어두운 밴드용)`);
if (odr < 4.5) contrastFail++;

let layoutFail = 0;
for (const [w, h, label] of VIEWS) {
  await send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: w < 800 });
  const issues = [];
  for (const pg of PAGES) {
    await send('Page.navigate', { url: BASE + pg }); await wait(1500);
    await send('Runtime.evaluate', { expression: "localStorage.setItem('iuyu.b2b.notice.v2','1')" });
    await send('Page.reload'); await wait(1300);
    const r = await send('Runtime.evaluate', { returnByValue: true, expression: `(() => {
      const out = { hOverflow: document.documentElement.scrollWidth > window.innerWidth + 1,
        scrollW: document.documentElement.scrollWidth, winW: window.innerWidth, small: [], tiny: 0 };
      document.querySelectorAll('a,button,input,select').forEach(el => {
        // 체크박스는 label 전체가 클릭 영역이므로 시각 크기로 판정하지 않습니다.
        if (el.type === 'checkbox') return;
        const b = el.getBoundingClientRect();
        if (b.width <= 0 || b.height <= 0) return;
        if (el.classList.contains('sr-only') && el !== document.activeElement) return;
        if (b.width < 24 || b.height < 24) out.small.push(((el.textContent || el.tagName).trim().slice(0, 16) + ' ' + Math.round(b.width) + 'x' + Math.round(b.height)));
      });
      document.querySelectorAll('p,h1,h2,h3,li,span,dd,td,th,label').forEach(el => {
        const fs = parseFloat(getComputedStyle(el).fontSize);
        if (fs < 11 && (el.textContent || '').trim().length > 3 && el.children.length === 0) out.tiny++;
      });
      return JSON.stringify(out);
    })()` });
    const d = JSON.parse(r.result.result.value);
    if (d.hOverflow) issues.push(`${pg} 가로 오버플로 ${d.scrollW}>${d.winW}`);
    if (d.small.length) issues.push(`${pg} 작은 탭영역: ${d.small.slice(0, 4).join(' | ')}`);
    if (d.tiny > 0) issues.push(`${pg} 11px 미만 텍스트 ${d.tiny}개`);
  }
  layoutFail += issues.length;
  console.log(`\n[${label} ${w}px] ${issues.length ? '문제 ' + issues.length + '건' : '문제 없음'}`);
  issues.slice(0, 6).forEach((i) => console.log('   -', i));
}

console.log(`\n요약: 대비 실패 ${contrastFail}건 / 레이아웃 이슈 ${layoutFail}건`);

ws.close(); proc.kill();
process.exit(contrastFail + layoutFail > 0 ? 1 : 0);
