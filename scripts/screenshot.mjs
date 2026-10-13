/**
 * 다국어·다해상도 캡처.
 * 데스크톱(1440) / 태블릿(834) / 모바일(390) 세 폭으로 주요 화면을 찍습니다.
 */
import { spawn } from 'node:child_process';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import WebSocket from 'ws';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const OUT = path.join(ROOT, 'screenshots');
const BASE = process.env.SITE_URL || 'http://127.0.0.1:4330';
const PORT = 9340;

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

/** 폭 프리셋 */
const W = { desk: 1440, tab: 834, mob: 390 };

const PAGES = [
  // 데스크톱 — 주요 화면
  { p: '/',               n: 'd01-home-ko',        w: W.desk, full: true },
  { p: '/en/',            n: 'd02-home-en',        w: W.desk, full: true },
  { p: '/zh/',            n: 'd03-home-zh',        w: W.desk, full: true },
  { p: '/capabilities/',  n: 'd04-capabilities-ko', w: W.desk, full: true },
  { p: '/products/',      n: 'd05-products-ko',    w: W.desk, full: true },
  { p: '/oem/',           n: 'd06-oem-ko',         w: W.desk, full: true },
  { p: '/about/',         n: 'd07-about-ko',       w: W.desk, full: true },
  { p: '/contact/',       n: 'd08-contact-ko',     w: W.desk, full: true },
  { p: '/en/contact/',    n: 'd09-contact-en',     w: W.desk, full: true },
  { p: '/zh/legal/ip/',   n: 'd10-legal-ip-zh',    w: W.desk, full: true },
  // 태블릿
  { p: '/',               n: 't01-home-ko',        w: W.tab,  full: true },
  { p: '/capabilities/',  n: 't02-capabilities-ko', w: W.tab, full: true },
  // 모바일
  { p: '/',               n: 'm01-home-ko',        w: W.mob,  full: true, dpr: 2 },
  { p: '/en/',            n: 'm02-home-en',        w: W.mob,  full: true, dpr: 2 },
  { p: '/contact/',       n: 'm03-contact-ko',     w: W.mob,  full: true, dpr: 2 },
];

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  fs.readdirSync(OUT).filter((f) => f.endsWith('.png')).forEach((f) => fs.unlinkSync(path.join(OUT, f)));

  const proc = spawn(BROWSER, [
    '--headless=new', '--disable-gpu', '--no-sandbox', '--hide-scrollbars',
    `--remote-debugging-port=${PORT}`, '--user-data-dir=/tmp/iuyu-shot', 'about:blank',
  ], { stdio: 'ignore' });

  let targets;
  for (let i = 0; i < 60; i++) {
    try { targets = await get('/json/list'); break; } catch { await wait(400); }
  }
  if (!targets) { proc.kill(); throw new Error('CDP 연결 실패'); }

  const ws = new WebSocket(targets.find((t) => t.type === 'page').webSocketDebuggerUrl,
    { perMessageDeflate: false, maxPayload: 512 * 1024 * 1024 });
  await new Promise((r) => ws.on('open', r));

  let id = 0; const pending = new Map();
  ws.on('message', (raw) => {
    const m = JSON.parse(raw);
    if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
  });
  const send = (method, params = {}) => new Promise((res) => {
    const mid = ++id; pending.set(mid, res);
    ws.send(JSON.stringify({ id: mid, method, params }));
  });

  await send('Page.enable'); await send('Runtime.enable');
  await send('Page.navigate', { url: BASE + '/' });
  await wait(1400);
  await send('Runtime.evaluate', { expression: "localStorage.setItem('iuyu.b2b.notice.v2','1')" });

  for (const pg of PAGES) {
    const dpr = pg.dpr || 1;
    await send('Emulation.setDeviceMetricsOverride', {
      width: pg.w, height: 900, deviceScaleFactor: dpr, mobile: pg.w < 800,
    });
    await send('Page.navigate', { url: BASE + pg.p });
    await wait(2400);
    // 진입 애니메이션을 끝까지 발동시킨 뒤,
    // 캡처용으로 '정착 상태'를 강제합니다 (검토 대상은 최종 화면이므로).
    await send('Runtime.evaluate', {
      expression: `(async()=>{const h=document.documentElement.scrollHeight;
        for(let y=0;y<h;y+=700){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,40));}
        window.scrollTo(0,0);})()`,
      awaitPromise: true,
    });
    await wait(900);
    // 주의: 닫힌 오버레이(pointer-events:none)까지 opacity:1 로 만들면
    // 모바일 메뉴가 펼쳐진 채로 찍힙니다. 그래서 '표시되어 있어야 할'
    // 요소만 정착시키고, 숨겨진 오버레이는 건드리지 않습니다.
    await send('Runtime.evaluate', {
      expression: `(()=>{
        const hidden = new Set();
        document.querySelectorAll('*').forEach(el => {
          const cs = getComputedStyle(el);
          if (cs.pointerEvents === 'none' && parseFloat(cs.opacity) < 0.5) hidden.add(el);
        });
        const st = document.createElement('style');
        st.id = '__settle';
        st.textContent = '[data-settle]{opacity:1!important;clip-path:none!important;transform:none!important;animation:none!important;transition:none!important}';
        document.head.appendChild(st);
        // Reveal 래퍼(인라인 transition/opacity 를 가진 div)만 정착 대상으로 지정
        document.querySelectorAll('main div, main span, main li, main figure, main a').forEach(el => {
          if (hidden.has(el)) return;
          // 장식용 오버레이(opacity-0 + pointer-events-none)는 정착 대상이 아닙니다.
          // 이걸 opacity:1 로 만들면 호버 하이라이트가 켜진 채로 찍힙니다.
          if (el.classList.contains('opacity-0') || el.className.toString().includes('pointer-events-none')) return;
          if (el.getAttribute('aria-hidden') === 'true') return;
          const cs = getComputedStyle(el);
          if (cs.transitionProperty.includes('opacity') || cs.clipPath !== 'none') {
            el.setAttribute('data-settle','');
          }
        });
        return true;})()`,
    });
    await wait(500);

    if (pg.full) {
      const m = await send('Runtime.evaluate', {
        expression: 'document.documentElement.scrollHeight', returnByValue: true,
      });
      const fh = Math.min(m.result.result.value || 900, 9000);
      await send('Emulation.setDeviceMetricsOverride', {
        width: pg.w, height: fh, deviceScaleFactor: dpr, mobile: pg.w < 800,
      });
      await wait(900);
    }

    const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: !!pg.full });
    fs.writeFileSync(path.join(OUT, `${pg.n}.png`), Buffer.from(shot.result.data, 'base64'));
    console.log('저장:', pg.n);
  }

  ws.close(); proc.kill();
}
main().catch((e) => { console.error(e); process.exit(1); });
