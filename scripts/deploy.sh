#!/usr/bin/env bash
#
# iuyu.cc 배포 스크립트
#
#   ./scripts/deploy.sh              # 빌드 → 업로드 → nginx 리로드
#   ./scripts/deploy.sh --no-build   # 빌드 생략하고 현재 out/ 만 업로드
#
# 전제: ~/.ssh/config 에 goodjob-vps 호스트가 등록되어 있어야 합니다.
set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
REMOTE="goodjob-vps"
REMOTE_DIR="/var/www/iuyu.cc"
DOMAIN="iuyu.cc"
SERVER_IP="23.27.175.200"

cd "$PROJECT_DIR"

echo "▸ 1/5  타입 체크"
npm run --silent typecheck

if [[ "${1:-}" != "--no-build" ]]; then
  echo "▸ 2/5  정적 빌드 (out/)"
  npm run --silent build
else
  echo "▸ 2/5  빌드 생략 (--no-build)"
fi

echo "▸ 3/5  업로드 → ${REMOTE}:${REMOTE_DIR}"
rsync -az --delete out/ "${REMOTE}:${REMOTE_DIR}/"

echo "▸ 4/5  권한 정리"
ssh -o ConnectTimeout=20 "$REMOTE" \
  "chown -R www-data:www-data ${REMOTE_DIR} && chmod -R 755 ${REMOTE_DIR}"

echo "▸ 5/5  nginx 리로드 후 검증"
ssh -o ConnectTimeout=20 "$REMOTE" "nginx -t && nginx -s reload"

for path in "/" "/en/" "/zh/" "/sitemap.xml"; do
  code=$(curl -s -o /dev/null -m 20 -w '%{http_code}' -H "Host: ${DOMAIN}" "http://${SERVER_IP}${path}")
  printf "     %-16s %s\n" "$path" "$code"
done

echo
echo "완료. (도메인 DNS 가 ${SERVER_IP} 를 가리키면 https://${DOMAIN} 로 접속됩니다)"
