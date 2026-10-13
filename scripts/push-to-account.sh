#!/usr/bin/env bash
#
# 새 GitHub 계정/조직으로 저장소를 옮겨 푸시합니다.
#
#   ./scripts/push-to-account.sh <owner> [repo]
#
# 예:
#   ./scripts/push-to-account.sh iuyu-official iuyu.cc
#   ./scripts/push-to-account.sh mycompany        # repo 는 iuyu.cc
#
# 전제: gh auth login 으로 대상 계정에 로그인되어 있어야 합니다.
set -euo pipefail

OWNER="${1:?사용법: push-to-account.sh <owner> [repo]}"
REPO="${2:-iuyu.cc}"
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_DIR"

echo "▸ 대상: ${OWNER}/${REPO} (private)"

# 1) 계정 일치 확인 — 인증된 사용자와 대상 owner 가 다르면 경고
ACTIVE="$(gh api user --jq '.login' 2>/dev/null || echo '')"
if [[ "$ACTIVE" != "$OWNER" ]]; then
  echo "  현재 gh 로그인 계정: ${ACTIVE:-없음}"
  echo "  대상 owner 와 다릅니다. 조직(org)이면 정상, 개인 계정이면 확인하세요."
  if ! gh api "orgs/${OWNER}" --jq '.login' >/dev/null 2>&1; then
    echo "  ✗ '${OWNER}' 는 조직으로도 확인되지 않습니다. 계정명을 확인하세요."
    exit 1
  fi
fi

# 2) 원격 재설정
git remote remove origin 2>/dev/null || true
git remote add origin "https://github.com/${OWNER}/${REPO}.git"

# 3) 저장소 생성 + 푸시
if gh repo view "${OWNER}/${REPO}" >/dev/null 2>&1; then
  echo "▸ 기존 저장소에 푸시"
  git push -u origin main
else
  echo "▸ 저장소 새로 생성 후 푸시"
  gh repo create "${OWNER}/${REPO}" --private \
    --source=. --remote=origin --push \
    --description "IUYU 이유 — silicone case OEM/ODM manufacturer site (ko/en/zh, Next.js static export)"
  git push -u origin main 2>/dev/null || true
fi

echo
echo "▸ 결과"
gh repo view "${OWNER}/${REPO}" --json name,url,visibility,pushedAt 2>&1
