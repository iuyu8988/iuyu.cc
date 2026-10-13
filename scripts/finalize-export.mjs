/**
 * 정적 export 후처리.
 *
 * Next.js 는 메타데이터의 hreflang 을 `hrefLang` (camelCase) 로 출력합니다.
 * 브라우저·검색엔진 대부분은 대소문자를 구분하지 않지만, HTML 표준은 소문자이며
 * 일부 파서가 camelCase 를 무시하므로 export 결과에서 소문자로 정규화합니다.
 *
 * package.json 의 build 스크립트에서 자동 실행됩니다.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const OUT = path.join(ROOT, 'out');

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });
}

if (!fs.existsSync(OUT)) {
  console.error('out/ 이 없습니다. 먼저 next build 를 실행하세요.');
  process.exit(1);
}

let fixed = 0;
for (const file of walk(OUT)) {
  if (!file.endsWith('.html')) continue;
  const src = fs.readFileSync(file, 'utf8');
  if (!src.includes('hrefLang=')) continue;
  fs.writeFileSync(file, src.replaceAll('hrefLang=', 'hreflang='));
  fixed++;
}

console.log(`finalize-export: hreflang 정규화 ${fixed}개 파일`);
