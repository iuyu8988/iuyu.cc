#!/usr/bin/env bash
#
# iuyu.cc HTTPS 인증서 발급 (Let's Encrypt)
#
# 전제: DNS 에서 iuyu.cc / www.iuyu.cc 가 서버 IP 를 가리켜야 합니다.
#       전파 확인:  dig +short iuyu.cc A
#
#   ./scripts/enable-ssl.sh              # 인증서 발급 + nginx 적용
#   ./scripts/enable-ssl.sh --dry-run    # 실제 발급 없이 검증만
#
set -euo pipefail

REMOTE="goodjob-vps"
DOMAIN="iuyu.cc"
SERVER_IP="23.27.175.200"
EMAIL="${CERTBOT_EMAIL:-sales@iuyu.cc}"

echo "▸ DNS 확인: ${DOMAIN} → ${SERVER_IP}"
RESOLVED=$(dig +short "$DOMAIN" A @1.1.1.1 2>/dev/null | head -1 || true)
if [[ "$RESOLVED" != "$SERVER_IP" ]]; then
  echo "  ✗ 아직 전파되지 않았습니다 (현재: ${RESOLVED:-없음})"
  echo "    DNS 에서 A 레코드를 ${SERVER_IP} 로 지정한 뒤 다시 실행하세요."
  echo "    전파에 보통 10분 ~ 1시간 걸립니다."
  exit 1
fi
echo "  ✓ 전파 확인됨"

if [[ "${1:-}" == "--dry-run" ]]; then
  echo "▸ 검증 모드 (dry-run)"
  ssh -o ConnectTimeout=25 "$REMOTE" \
    "certbot --nginx -d ${DOMAIN} -d www.${DOMAIN} --non-interactive --agree-tos \
     --email ${EMAIL} --dry-run --redirect"
  exit 0
fi

echo "▸ 인증서 발급 및 nginx 자동 설정"
ssh -o ConnectTimeout=25 "$REMOTE" \
  "certbot --nginx -d ${DOMAIN} -d www.${DOMAIN} --non-interactive --agree-tos \
   --email ${EMAIL} --redirect --hsts"

echo "▸ 자동 갱신 타이머 확인"
ssh -o ConnectTimeout=25 "$REMOTE" "systemctl is-enabled certbot.timer 2>/dev/null || true"

echo "▸ HTTPS 응답 확인"
for url in "https://${DOMAIN}/" "https://${DOMAIN}/en/" "https://${DOMAIN}/zh/"; do
  code=$(curl -s -o /dev/null -m 25 -w '%{http_code}' "$url" || echo "실패")
  printf "  %-32s %s\n" "$url" "$code"
done

echo
echo "완료. http → https 리다이렉트가 설정되었습니다."
