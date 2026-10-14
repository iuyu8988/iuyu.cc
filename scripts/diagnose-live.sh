#!/usr/bin/env bash
# iuyu.cc 배포 상태 진단
#   ./scripts/diagnose-live.sh
# HTML/이미지/JS/CSS 각 계층이 실제로 서빙되는지 확인해
# '업로드 누락'과 '설정 오류'를 구분합니다.
set -uo pipefail
DOMAIN="${1:-https://iuyu.cc}"

probe() {
  local path="$1"
  local out code size
  out=$(curl -s -o /dev/null -m 15 -w '%{http_code} %{size_download}' "$DOMAIN$path" 2>/dev/null)
  code="${out%% *}"; size="${out##* }"
  printf "  %-52s %s  %8s B\n" "$path" "$code" "$size"
}

echo "▸ 진단 대상: $DOMAIN"
echo

echo "── 1. HTML (라우팅) ──"
for p in "/" "/index.html" "/zh/" "/zh/index.html" "/en/" "/about/" "/legal/ip/"; do probe "$p"; done

echo
echo "── 2. 정적 자산 (이미지) ──"
for p in "/assets/hero-product.png" "/assets/factory-cleanroom-inspection.jpg" "/assets/icon-192.png"; do probe "$p"; done

echo
echo "── 3. Next.js 번들 (CSS/JS) ──"
LOCAL_CSS=$(ls out/_next/static/css/*.css 2>/dev/null | head -1 | xargs -n1 basename 2>/dev/null)
if [ -n "$LOCAL_CSS" ]; then
  probe "/_next/static/css/$LOCAL_CSS"
else
  echo "  (로컬 out/ 이 없어 파일명을 모릅니다. npm run build 먼저)"
fi
probe "/_next/static/chunks/main-app-09fc5a49696f4b05.js"

echo
echo "── 4. 메타 파일 ──"
for p in "/sitemap.xml" "/robots.txt" "/manifest.webmanifest" "/404.html"; do probe "$p"; done

echo
echo "── 5. 리다이렉트 ──"
printf "  %-52s %s\n" "http → https" "$(curl -s -o /dev/null -m 15 -w '%{http_code} → %{redirect_url}' "http://${DOMAIN#https://}/" 2>/dev/null)"
printf "  %-52s %s\n" "www → 무접두사" "$(curl -s -o /dev/null -m 15 -w '%{http_code} → %{redirect_url}' "https://www.${DOMAIN#https://}/" 2>/dev/null)"

echo
echo "── 6. 존재하지 않는 경로 (404 여야 정상) ──"
probe "/this-page-does-not-exist-xyz/"

echo
echo "판단 기준"
echo "  · HTML 200 + assets 200 + _next 500  → _next 디렉터리가 업로드되지 않음"
echo "  · 전부 200 인데 404 경로도 500        → .htaccess 오류 처리 문제"
echo "  · 404 경로가 200 을 반환              → ErrorDocument 미적용"
