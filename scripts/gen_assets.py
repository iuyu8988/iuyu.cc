"""
제품 실사에서 사이트 자산을 생성합니다.

  python3 scripts/gen_assets.py [원본경로] [--debug]

이 스크립트가 반드시 하는 일
  1) 사진에 인쇄된 주석(중국어 치수 텍스트)과 지시선·화살표를 제거합니다.
     3개 언어 사이트에 중국어가 박힌 이미지를 쓰면 안 되고,
     지시선이 남으면 아무것도 가리키지 않는 화살표가 됩니다.
  2) 흰 배경을 소프트 알파로 제거합니다(제품 가장자리 유지).
  3) 제품이 프레임을 채우도록 타이트하게 크롭합니다.

치수는 이미지에 굽지 않습니다. HTML 치수선 프리미티브(components/primitives.tsx
의 DimLine)로 다시 그립니다. 원본에 인쇄된 실측값:

  본체        96 × 53.5 × 29 mm
  마우스피스 커버  15 × 25 × 14 mm
  전체 높이     111 mm (마우스피스 포함)
  목걸이끈      44 cm

이 값들은 content/dictionaries/*.ts 의 hero.dimW/dimH/dimTotal 과
pages.capabilities.specTable 에 들어 있습니다. 원본 사진을 교체하면
주석 좌표(ANNOTATIONS_*)를 다시 잡아야 합니다.
"""

import os
import sys
from PIL import Image, ImageFilter, ImageDraw, ImageFont
import numpy as np

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "public", "assets")
SRC = os.path.join(ROOT, "source-product-original.png")
for arg in sys.argv[1:]:
    if not arg.startswith("--"):
        SRC = arg
DEBUG = "--debug" in sys.argv

# ── 주석 제거 영역 (원본 픽셀 좌표) ───────────────────────────────
#  원본 2094×1249 기준. 제품(파란 케이스)은 x>620, y>560 에 있으므로
#  아래 영역은 제품을 침범하지 않습니다. 원본을 바꾸면 이 좌표를 다시 잡으세요.
ANNOTATION_BOXES = [
    (1860, 150, 1990, 1080),  # 우측 44cm 치수선 + 텍스트 (세로 전폭)
    (645, 245, 932, 482),     # 상단: 烟嘴套 15/25/14 텍스트
    (190, 828, 700, 1092),    # 하단: 主体 96/53.5/29/111 텍스트
    (742, 540, 812, 700),     # 세로 지시 화살표
    (528, 965, 782, 1040),    # 가로 지시 화살표
    (1000, 480, 1030, 560),   # 잔여 조각
]


def strip_annotations(img):
    """주석 텍스트를 지우고, 남은 얇은 지시선을 제거합니다."""
    a = np.asarray(img.convert("RGB")).astype(np.float32).copy()

    for (x0, y0, x1, y1) in ANNOTATION_BOXES:
        a[max(0, y0):min(a.shape[0], y1), max(0, x0):min(a.shape[1], x1)] = 255

    # 얇고 어두우며 주변이 흰색인 픽셀 = 남은 지시선
    gray = a.mean(2)
    bg = gray > 232
    bgd = np.asarray(
        Image.fromarray((bg * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(9))
    ) > 0
    dark = gray < 175
    dens = np.asarray(
        Image.fromarray((dark * 255).astype(np.uint8)).filter(ImageFilter.BoxBlur(5))
    ) / 255.0
    thin = dark & (dens < 0.30) & bgd

    # 파란 실리콘(제품)은 보호
    mx, mn = a.max(2), a.min(2)
    sat = np.where(mx > 0, (mx - mn) / np.maximum(mx, 1), 0)
    protect = np.asarray(
        Image.fromarray(((sat > 0.04) * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(51))
    ) > 0

    kill = np.asarray(
        Image.fromarray(((thin & ~protect) * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(3))
    ) > 0
    a[kill] = 255
    return Image.fromarray(a.astype(np.uint8))


def cutout(img, tol=16.0, soft=28.0, gamma=0.8):
    """흰 배경 → 투명. gamma<1 로 반투명 잔여물을 정리합니다."""
    a = np.asarray(img.convert("RGB")).astype(np.float32)
    d = np.linalg.norm(255.0 - a, axis=2)
    alpha = np.clip((d - tol) / soft * 255.0, 0, 255)
    alpha = (alpha / 255.0) ** gamma * 255.0
    al = Image.fromarray(alpha.astype(np.uint8), "L").filter(ImageFilter.GaussianBlur(0.6))
    return Image.fromarray(np.dstack([a, np.asarray(al)]).astype(np.uint8), "RGBA")


def save(img, name, max_w, quality=92):
    im = img.copy()
    bb = im.split()[-1].getbbox()
    if bb:
        im = im.crop(bb)
    if im.width > max_w:
        im = im.resize((max_w, round(im.height * max_w / im.width)), Image.LANCZOS)
    path = os.path.join(OUT, name)
    im.save(path, optimize=True, quality=quality)
    print("  %-24s %5dx%-5d %6.0f KB" % (name, im.size[0], im.size[1], os.path.getsize(path) / 1024))
    if DEBUG:
        bg = Image.new("RGB", im.size, (255, 255, 255))
        bg.paste(im, (0, 0), im)
        bg.save("/tmp/debug_" + name)
    return im


# 크롭 영역 (원본 좌표) — 주석을 배제한 구간만
# 크롭 영역 (원본 2094×1249 좌표). 구성요소별로 실제 확인한 범위만 사용.
# ratio = 결과물의 대략적 세로/가로 비 (레이아웃에서 배치 판단에 사용)
CROPS = {
    # 파일명                  (x0, y0, x1, y1)          최대폭  ratio
    "hero-product.png":   ((830,  560, 1190, 1245), 880,  0.62),  # 케이스 2종 (세로)
    # 주의: 오픈/클로즈드 케이스는 사진에서 서로 맞닿아 있어(x≈965) 분리 불가.
    #       개별 크롭을 만들면 이웃 케이스 조각이 섞입니다 → hero-product 로 통합.
    "lanyard-a.png":      ((248,  125,  765,  905), 620,  0.70),  # 좌측 목걸이끈
    "lanyard-b.png":      ((676,   86, 1295,  625), 720,  0.52),  # 중앙 목걸이끈
    "view-full-set.png":  ((236,   80, 2000, 1245), 1500, 0.62),  # 전체 구성
}


def make_og(hero):
    card = Image.new("RGB", (1200, 630), (11, 14, 18))
    h = hero.copy()
    scale = 520 / h.height
    h = h.resize((round(h.width * scale), 520), Image.LANCZOS)
    card.paste(h, (1200 - h.width - 70, 55), h)
    path = os.path.join(OUT, "og-image.png")
    card.save(path, optimize=True)
    print("  %-24s %5dx%-5d %6.0f KB" % ("og-image.png", 1200, 630, os.path.getsize(path) / 1024))


def make_icons():
    fams = [
        "/System/Library/Fonts/Supplemental/Futura.ttc",
        "/System/Library/Fonts/Helvetica.ttc",
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
    ]
    for size, name in [(512, "icon-512.png"), (192, "icon-192.png"), (180, "apple-icon.png")]:
        ic = Image.new("RGB", (size, size), (11, 14, 18))
        dr = ImageDraw.Draw(ic)
        font = None
        for f in fams:
            if os.path.exists(f):
                try:
                    font = ImageFont.truetype(f, int(size * 0.30))
                    break
                except OSError:
                    pass
        font = font or ImageFont.load_default()
        text = "IUYU"
        bb = dr.textbbox((0, 0), text, font=font)
        dr.text(((size - (bb[2] - bb[0])) / 2 - bb[0], (size - (bb[3] - bb[1])) / 2 - bb[1]),
                text, font=font, fill=(127, 208, 242))
        dr.rectangle([size * 0.30, size * 0.665, size * 0.70, size * 0.672], fill=(20, 162, 179))
        ic.save(os.path.join(OUT, name), optimize=True)
    print("  icon-512 / icon-192 / apple-icon 생성")


def make_textures(clean):
    """제품 실사에서 배경 텍스처를 추출 (배경이 제품과 무관해지지 않도록)."""
    # 닫힌 케이스의 '무지 실리콘 표면'에서 채취합니다.
    # (화면 아트워크 영역에서 채취하면 배경에 문자·캐릭터가 비쳐 나옵니다)
    matte = clean.crop((1010, 760, 1180, 1060)).resize((1600, 1080), Image.LANCZOS).filter(
        ImageFilter.GaussianBlur(6.0)
    )
    g = np.asarray(matte.convert("L")).astype(np.float32)
    low = np.clip(245 + (g - g.mean()) * 0.18, 200, 250)
    Image.fromarray(np.dstack([low, low, low + 2]).astype(np.uint8)).save(
        os.path.join(OUT, "tex-silicone-matte.jpg"), optimize=True, quality=80
    )

    # 목걸이끈 코드의 무광 질감 → 금속 대신 '실리콘 그립' 질감으로 사용
    metal = clean.crop((300, 200, 560, 700)).convert("L").resize((1400, 420), Image.LANCZOS).filter(
        ImageFilter.GaussianBlur(3.2)
    )
    g2 = np.asarray(metal).astype(np.float32)
    low2 = np.clip(246 + (g2 - g2.mean()) * 0.22, 210, 252)
    Image.fromarray(np.dstack([low2, low2, low2 + 2]).astype(np.uint8)).save(
        os.path.join(OUT, "tex-brushed-metal.jpg"), optimize=True, quality=80
    )
    print("  tex-silicone-matte / tex-brushed-metal 생성")


def main():
    if not os.path.exists(SRC):
        sys.exit("원본을 찾을 수 없습니다: %s" % SRC)
    os.makedirs(OUT, exist_ok=True)

    raw = Image.open(SRC).convert("RGB")
    print("원본: %s (%dx%d)" % (os.path.basename(SRC), raw.size[0], raw.size[1]))

    clean = strip_annotations(raw)

    # 검증: 좌측에 회색 텍스트가 남았는지
    chk = np.asarray(clean).astype(np.float32)[:, :700]
    mx, mn = chk.max(2), chk.min(2)
    sat = np.where(mx > 0, (mx - mn) / np.maximum(mx, 1), 0)
    g = chk.mean(2)
    residual = int(((sat < 0.07) & (g > 90) & (g < 215)).sum())
    print("주석 제거 완료 (좌측 잔여 추정 %d px)\n" % residual)

    print("제품 이미지:")
    hero = None
    for name, (box, max_w, _ratio) in CROPS.items():
        piece = save(cutout(clean.crop(box)), name, max_w)
        if name == "hero-product.png":
            hero = piece

    print("\n공유 카드 / 아이콘 / 텍스처:")
    make_og(hero)
    make_icons()
    make_textures(clean)
    print("\n완료.")


if __name__ == "__main__":
    main()
