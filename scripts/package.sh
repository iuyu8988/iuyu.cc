#!/usr/bin/env bash
#
# 배포 패키지 생성 — 타임스탬프 포함
#
#   npm run pack                 # 빌드 → dist/ 에 타임스탬프 zip → 바탕화면 복사
#   npm run pack -- --no-build   # 현재 out/ 그대로 패키징 (빌드 생략)
#   npm run pack -- --tag logo   # 이름에 메모 추가
#
# 산출물:  iuyu-cc-hostinger-YYYYMMDD-HHMM[_tag].zip
#
# 왜 타임스탬프를 붙이나
#   예전에는 이름이 고정(iuyu-cc-hostinger.zip)이라 새로 만들면 이전 파일을
#   덮어썼습니다. 어느 시점 빌드인지 구분할 수 없어 되돌릴 수도 없었습니다.
#   이제 만들 때마다 다른 이름이 생기므로 이전 패키지가 남습니다.
#
#   기록은 dist/packages.log 에 누적됩니다 (시각·해시·용량·커밋·내용 표식).
#
# 주의: zip 안의 파일은 루트에 펼쳐져 있습니다. 파일명은 내용에 영향이 없으니
#       public_html 에서 그대로 압축을 풀면 됩니다.
set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_DIR"

OUT="$PROJECT_DIR/out"
DIST="$PROJECT_DIR/dist"
DESKTOP="$HOME/Desktop"

DO_BUILD=1
TAG=""
while [[ $# -gt 0 ]]; do
  case "$1" in
    --no-build) DO_BUILD=0; shift ;;
    --tag)      TAG="_${2:?--tag 뒤에 메모를 넣으세요}"; shift 2 ;;
    *) echo "알 수 없는 옵션: $1"; exit 1 ;;
  esac
done

# ── 1. 빌드 ───────────────────────────────────────────────────────────
if [[ "$DO_BUILD" == "1" ]]; then
  echo "▸ 1/4  빌드"
  npm run --silent build
else
  echo "▸ 1/4  빌드 생략 (--no-build)"
  [[ -d "$OUT" ]] || { echo "  ✗ out/ 이 없습니다. 빌드 없이는 패키징할 수 없습니다."; exit 1; }
fi

# ── 2. 신선도 검사 ────────────────────────────────────────────────────
# out/ 보다 최신 소스가 있으면, 지금 만든 패키지가 실제 코드보다 뒤처집니다.
echo "▸ 2/4  신선도 검사"
if [[ "$DO_BUILD" == "0" ]]; then
  newest_src=$(find app components content lib public scripts \
      -type f \( -name '*.ts' -o -name '*.tsx' -o -name '*.css' -o -name '*.mjs' \
                   -o -name '*.json' -o -name '*.png' -o -name '*.jpg' -o -name '*.svg' \) \
      -newer "$OUT/index.html" 2>/dev/null | head -5 || true)
  if [[ -n "$newest_src" ]]; then
    echo "  ⚠ out/ 보다 최신 소스가 있습니다 — 패키지에 반영되지 않았습니다:"
    printf '      %s\n' $newest_src
    echo "      (반영하려면 --no-build 없이 다시 실행하세요)"
  else
    echo "  ✓ out/ 이 최신 소스 기준입니다"
  fi
else
  echo "  ✓ 방금 빌드했습니다"
fi

# ── 3. 패키징 ─────────────────────────────────────────────────────────
STAMP="$(date +%Y%m%d-%H%M)"
NAME="iuyu-cc-hostinger-${STAMP}${TAG}.zip"
mkdir -p "$DIST"
ZIP="$DIST/$NAME"

rm -f "$ZIP"
( cd "$OUT" && zip -rq "$ZIP" . )

echo "▸ 3/4  패키징 → $NAME"

# ── 4. 검증 + 기록 + 복사 ─────────────────────────────────────────────
echo "▸ 4/4  검증 · 기록"
SIZE_BYTES=$(stat -f%z "$ZIP")
SIZE_H=$(ls -lh "$ZIP" | awk '{print $5}')
SHA=$(shasum -a 256 "$ZIP" | awk '{print $1}')
FILES=$(unzip -l "$ZIP" | tail -1 | awk '{print $2}')
NEXT_N=$(unzip -l "$ZIP" | grep -c '_next/' || true)
HAS_HT=$(unzip -l "$ZIP" | grep -c ' \.htaccess$' || true)

# 내용 표식 — 나중에 "이 패키지가 어느 버전이었나" 를 되짚을 근거
SECTIONS=$(grep -o '<section' "$OUT/index.html" | wc -l | tr -d ' ')
CSS_NAME=$(ls "$OUT"/_next/static/css/*.css 2>/dev/null | head -1 | xargs -n1 basename 2>/dev/null || echo '?')

COMMIT=$(git rev-parse --short HEAD 2>/dev/null || echo 'none')
DIRTY=$(git status --porcelain 2>/dev/null | wc -l | tr -d ' ')

# 필수 항목 누락이면 패키지를 남기지 않고 실패시킵니다.
fail=0
[[ -f "$OUT/.htaccess" ]] || { echo "  ✗ .htaccess 누락 — 서버 404·리다이렉트가 깨집니다"; fail=1; }
[[ "$NEXT_N" -gt 0 ]]     || { echo "  ✗ _next 누락 — 페이지가 무스타일로 뜹니다"; fail=1; }
[[ "$HAS_HT" -ge 1 ]]     || { echo "  ✗ zip 안에 .htaccess 없음"; fail=1; }
if [[ "$fail" == "1" ]]; then rm -f "$ZIP"; exit 1; fi

printf '  ✓ %-9s %s\n' "크기"   "$SIZE_H ($SIZE_BYTES bytes)"
printf '  ✓ %-9s %s\n' "파일 수" "$FILES ( _next $NEXT_N )"
printf '  ✓ %-9s %s\n' "SHA256"  "$SHA"
printf '  ✓ %-9s %s\n' "빌드시각" "$STAMP"
printf '  ✓ %-9s %s\n' "커밋"    "$COMMIT$([[ "$DIRTY" != "0" ]] && echo " (미커밋 ${DIRTY}개)")"
printf '  ✓ %-9s %s\n' "홈 섹션" "$SECTIONS 개"
printf '  ✓ %-9s %s\n' "CSS"     "$CSS_NAME"

# 누적 기록 — 이 파일 하나로 배포 이력을 볼 수 있습니다.
LOG="$DIST/packages.log"
{
  echo "[$STAMP] $NAME"
  echo "    크기     : $SIZE_H ($SIZE_BYTES B) / 파일 $FILES"
  echo "    SHA256   : $SHA"
  echo "    커밋     : $COMMIT ($([[ "$DIRTY" != "0" ]] && echo "미커밋 ${DIRTY}개" || echo "clean"))"
  echo "    내용     : 홈 section $SECTIONS · CSS $CSS_NAME · _next $NEXT_N"
} >> "$LOG"
echo "  ✓ 기록     dist/packages.log"

if [[ -d "$DESKTOP" ]]; then
  cp "$ZIP" "$DESKTOP/$NAME"
  printf '  ✓ %-9s %s\n' "바탕화면" "~/$NAME"
fi

echo
echo "${NAME} 준비 완료."
