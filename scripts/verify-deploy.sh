#!/usr/bin/env bash
#
# iuyu.cc 배포 검증
#   ./scripts/verify-deploy.sh            # https://iuyu.cc 검사
#   ./scripts/verify-deploy.sh https://... # 다른 도메인
#
# 업로드가 실제로 반영됐는지 '해시 비교'로 판정합니다.
# (스크립트에 파일명을 박아두면 빌드마다 바뀌어서 못 씁니다 — 자동 탐색)
set -uo pipefail

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DOMAIN="${1:-https://iuyu.cc}"
OUT="$PROJECT_DIR/out"
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/141.0 Safari/537.36"

pass=0; fail=0
ok()   { printf "  \033[32m✓\033[0m %-46s %s\n" "$1" "$2"; pass=$((pass+1)); }
bad()  { printf "  \033[31m✗\033[0m %-46s %s\n" "$1" "$2"; fail=$((fail+1)); }
info() { printf "    %-46s %s\n" "$1" "$2"; }

code_of() { curl -s -o /dev/null -m 20 -A "$UA" -w '%{http_code}' "$DOMAIN$1" 2>/dev/null; }
head_of() { echo "${1#https://}"; }

echo "▸ 검증 대상: $DOMAIN"
echo

# ── 0. 로컬 빌드 산출물 확인 ─────────────────────────────────────────
if [ ! -d "$OUT" ]; then
  echo "로컬 out/ 이 없습니다. 먼저:  npm run build"
  exit 1
fi

LOCAL_CSS=$(ls "$OUT"/_next/static/css/*.css 2>/dev/null | head -1 | xargs -n1 basename 2>/dev/null)
if [ -z "$LOCAL_CSS" ]; then
  echo "out/_next/static/css 에 CSS 가 없습니다. 빌드가 비정상입니다."
  exit 1
fi

# 홈 HTML 에서 '이번 빌드'임을 알리는 표식 추출
LOCAL_SECTIONS=$(grep -o '<section' "$OUT/index.html" | wc -l | tr -d ' ')
LOCAL_HAS_FIG01=$(grep -c 'FIG\. 01' "$OUT/index.html" || true)

echo "── 0. 로컬 빌드 (기준) ──"
info "CSS 파일" "$LOCAL_CSS"
info "홈 <section> 수" "$LOCAL_SECTIONS"
info "홈 파일 크기" "$(stat -f%z "$OUT/index.html") B"
echo

# ── 1. 업로드 반영 여부 — 가장 중요한 판정 ──────────────────────────
echo "── 1. 업로드 반영 (핵심) ──"
LIVE_CSS_CODE=$(code_of "/_next/static/css/$LOCAL_CSS")
if [ "$LIVE_CSS_CODE" = "200" ]; then
  ok "이번 빌드의 CSS 가 서빙됨" "$LOCAL_CSS → 200"
else
  bad "이번 빌드의 CSS 가 없음" "$LOCAL_CSS → $LIVE_CSS_CODE  (업로드 안 됨)"
fi

# 라이브 홈이 실제로 이번 빌드를 참조하는지
LIVE_HTML=$(curl -sL -m 25 -A "$UA" "$DOMAIN/" 2>/dev/null)
if printf '%s' "$LIVE_HTML" | grep -q "$LOCAL_CSS"; then
  ok "라이브 홈이 이번 빌드를 참조" "index.html → $LOCAL_CSS"
else
  bad "라이브 홈이 옛 빌드를 참조" "index.html 이 $LOCAL_CSS 를 안 씀"
fi

# 홈 섹션 수 비교 (트림 반영 확인)
LIVE_SECTIONS=$(printf '%s' "$LIVE_HTML" | grep -o '<section' | wc -l | tr -d ' ')
if [ "$LIVE_SECTIONS" = "$LOCAL_SECTIONS" ]; then
  ok "홈 섹션 수 일치" "$LIVE_SECTIONS 개"
else
  bad "홈 섹션 수 불일치" "라이브 $LIVE_SECTIONS / 로컬 $LOCAL_SECTIONS"
fi
echo

# ── 2. HTML 라우팅 ──────────────────────────────────────────────────
echo "── 2. HTML 라우팅 ──"
for p in "/" "/index.html" "/en/" "/zh/" "/capabilities/" "/products/" "/oem/" "/about/" "/contact/" "/legal/ip/"; do
  c=$(code_of "$p")
  [ "$c" = "200" ] && ok "$p" "200" || bad "$p" "$c"
done
echo

# ── 3. 정적 자산 ────────────────────────────────────────────────────
echo "── 3. 정적 자산 ──"
for p in "/assets/hero-product.png" "/assets/logo-iuyu.png" "/assets/factory-cleanroom-inspection.jpg" "/assets/icon-192.png" "/icon.svg"; do
  c=$(code_of "$p")
  [ "$c" = "200" ] && ok "$p" "200" || bad "$p" "$c"
done
echo

# ── 4. JS 청크 전수 검사 ────────────────────────────────────────────
echo "── 4. JS 번들 (_next/chunks) ──"
miss=0; total=0
while IFS= read -r f; do
  rel="${f#$OUT/}"
  total=$((total+1))
  c=$(code_of "/$rel")
  [ "$c" = "200" ] || { miss=$((miss+1)); [ "$miss" -le 3 ] && echo "    누락: /$rel → $c"; }
done < <(find "$OUT/_next/static/chunks" -name '*.js' 2>/dev/null)
if [ "$miss" -eq 0 ]; then ok "청크 ${total}개 전부 200" ""
else bad "청크 ${total}개 중 ${miss}개 실패" "→ _next/chunks 업로드 누락"; fi
echo

# ── 5. 메타 파일 ────────────────────────────────────────────────────
echo "── 5. 메타 파일 ──"
for p in "/sitemap.xml" "/robots.txt" "/manifest.webmanifest" "/404.html"; do
  c=$(code_of "$p")
  [ "$c" = "200" ] && ok "$p" "200" || bad "$p" "$c"
done
echo

# ── 6. .htaccess 동작 ───────────────────────────────────────────────
echo "── 6. .htaccess 동작 ──"
c=$(code_of "/this-page-does-not-exist-xyz/")
if [ "$c" = "404" ]; then ok "없는 경로 → 404" ""
elif [ "$c" = "200" ]; then bad "없는 경로 → 200" "ErrorDocument 미적용 (Soft 404)"
else bad "없는 경로 → $c" "오류 처리 이상"; fi

rh=$(curl -s -o /dev/null -m 20 -A "$UA" -w '%{http_code} %{redirect_url}' "http://$(head_of "$DOMAIN")/" 2>/dev/null)
printf -v _ "" 2>/dev/null || true
if printf '%s' "$rh" | grep -q '^30'; then ok "http → https 리다이렉트" "$rh"
else bad "http → https 리다이렉트 없음" "$rh"; fi

rw=$(curl -s -o /dev/null -m 20 -A "$UA" -w '%{http_code} %{redirect_url}' "https://www.$(head_of "$DOMAIN")/" 2>/dev/null)
if printf '%s' "$rw" | grep -q '^30'; then ok "www → 무접두사 리다이렉트" "$rw"
else bad "www 리다이렉트 없음" "$rw"; fi
echo

# ── 7. 내용 확인 (플레이스홀더 / 연락처) ────────────────────────────
echo "── 7. 내용 확인 (홈) ──"
if printf '%s' "$LIVE_HTML" | grep -q 'iuyu8988@gmail.com'; then ok "신규 이메일 반영" "iuyu8988@gmail.com"
else bad "신규 이메일 없음" "옛 빌드일 가능성"; fi

if printf '%s' "$LIVE_HTML" | grep -qE '\[(공장 주소|사업자[^]]*|법인[^]]*|대표자[^]]*)\]'; then
  bad "법인정보 placeholder 노출" "대괄호 값이 화면에 보임"
else ok "법인정보 placeholder 없음" ""; fi

if printf '%s' "$LIVE_HTML" | grep -q '2016'; then
  bad "'2016' 잔존" "창립연도가 아직 남아 있음"
else ok "'2016' 없음" ""; fi

if printf '%s' "$LIVE_HTML" | grep -q 'wa.me/8613296898988'; then ok "WhatsApp 링크" ""
else bad "WhatsApp 링크 없음" ""; fi
echo

# ── 요약 ────────────────────────────────────────────────────────────
echo "════════════════════════════════════════════"
printf "통과 %d / 실패 %d\n" "$pass" "$fail"
echo
if [ "$fail" -eq 0 ]; then
  echo "배포 정상."
else
  echo "실패가 있습니다. 자주 나오는 원인:"
  echo "  · _next 디렉터리를 빠뜨림        → CSS/JS 가 500 또는 404, 페이지가 무스타일"
  echo "  · .htaccess 를 빠뜨림            → 404 대신 200, 리다이렉트 안 됨"
  echo "  · public_html 안에 폴더째 올림   → 경로가 /iuyu-cc-hostinger-zipte... 처럼 한 단계 깊어짐"
  echo "  · zip 내부가 아니라 zip 자체 업로드 → 서버가 압축파일을 풀지 않음"
fi
exit $fail
