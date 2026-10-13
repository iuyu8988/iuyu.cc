"""
공장 사진 → 웹 자산.

사용법:
  mkdir -p .incoming && cp 원본사진/*.jpg .incoming/
  python3 scripts/prepare-photos.py

처리 항목
  1) 얼굴 픽셀화 — 인물 사진만, 사람이 적은 사진에 한해 자동 적용
  2) 제3자 브랜드 제거 — Apple 로고(수동 좌표), KCT 각인(색상 자동 검출)
  3) 크롭 · 리사이즈 · JPEG 압축

중요: 얼굴 검출은 자동화를 신뢰하지 않습니다. 사람이 많은 사진(10명 이상)은
      자동 마스킹이 누락을 만들므로 아예 사용하지 않습니다.
      결과는 반드시 눈으로 확인해야 합니다.
"""
import cv2, numpy as np, json, os, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / ".incoming"
OUT = ROOT / "public" / "assets"
OUT.mkdir(parents=True, exist_ok=True)

# ── 사진별 설정 ─────────────────────────────────────────────────
# faces: "auto" = 자동 검출 후 픽셀화, ["none"] = 인물 없음(처리 안 함)
# brands: 수동 좌표로 지울 제3자 브랜드 영역 [(x0,y0,x1,y1), ...]
PHOTOS = {
    "cleanroom-inspection": {
        "src": "583fd5b23bcddf403ee77b3c3ebb369e.jpg",
        "faces": "auto",
        "brands": [(1580, 1200, 1860, 1420)],       # iMac 뒤 Apple 로고
        "max_w": 1600, "quality": 88,
    },
    "assembly-station": {
        "src": "b4e21f9c336ad48a318e42d9d51add93.jpg",
        "faces": "auto",
        "brands": [(1280, 980, 1480, 1160)],        # Apple 로고
        "max_w": 1600, "quality": 88,
    },
    "equipment-detail": {
        "src": "d58a3b9d734a999f72cfb7be54667692.jpg",
        "faces": "none",
        "brands": [],
        "max_w": 1600, "quality": 88,
    },
    # "production-floor" 는 제외했습니다.
    # 파란 통에 KCT 각인이 6곳 이상 반복 인쇄되어 있어 개별 제거가 지저분해지고,
    # 크롭으로도 완전히 피할 수 없었습니다. 통로 사진은 다른 컷으로 대체 가능합니다.
    "warehouse": {
        "src": "1f1559a474a31b554de40bfd18cebff9.jpg",
        "faces": "none",
        "brands": [],
        "max_w": 1600, "quality": 88,
    },
    "showroom": {
        "src": "d9c88a084ffe13f8b1e838f10ceb008f.jpg",
        "faces": "none",
        "brands": [],
        "kct": False,                      # 목재 선반이 KCT 로 오검출됨 → 비활성
        "max_w": 1500, "quality": 86,
    },
    "showroom-side": {
        "src": "68e4aba0cfc7567a0af300b57a22f05f.jpg",
        "faces": "none",
        "brands": [],
        "kct": False,
        "max_w": 1500, "quality": 86,
    },
}

net = cv2.dnn.readNetFromCaffe("/tmp/deploy.prototxt", "/tmp/res10.caffemodel")
haar_f = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")


def detect_faces(img):
    """무진복 착용자를 위해 여러 입력 크기로 검출하고 넉넉히 패딩합니다."""
    H, W = img.shape[:2]
    boxes = []
    for size in (600, 900, 1200):
        blob = cv2.dnn.blobFromImage(cv2.resize(img, (size, size)), 1.0, (size, size),
                                     (104.0, 177.0, 123.0))
        net.setInput(blob)
        det = net.forward()
        for i in range(det.shape[2]):
            if float(det[0, 0, i, 2]) < 0.28:
                continue
            x1, y1, x2, y2 = (det[0, 0, i, 3:7] * np.array([W, H, W, H])).astype(int)
            boxes.append((int(x1), int(y1), int(x2 - x1), int(y2 - y1)))
    scale = 1500 / max(H, W) if max(H, W) > 1500 else 1.0
    gray = cv2.equalizeHist(cv2.cvtColor(cv2.resize(img, (int(W*scale), int(H*scale))),
                                          cv2.COLOR_BGR2GRAY))
    for (x, y, w, h) in haar_f.detectMultiScale(gray, 1.06, 5, minSize=(24, 24)):
        boxes.append((int(x/scale), int(y/scale), int(w/scale), int(h/scale)))
    # 병합
    keep = []
    for b in sorted(boxes, key=lambda v: -(v[2]*v[3])):
        cx, cy = b[0]+b[2]/2, b[1]+b[3]/2
        if not any(abs(cx-(k[0]+k[2]/2)) < max(k[2], b[2])*0.5 and
                   abs(cy-(k[1]+k[3]/2)) < max(k[3], b[3])*0.5 for k in keep):
            keep.append(b)
    # 머리 일부까지 덮도록 패딩
    out = []
    for x, y, w, h in keep:
        px, py = int(w*0.22)+6, int(h*0.22)+6
        out.append((max(0, x-px), max(0, y-py), min(W, x+w+px)-max(0, x-px),
                    min(H, y+h+py)-max(0, y-py)))
    return out


def pixelate(img, boxes, blocks=8):
    for (x, y, w, h) in boxes:
        if w < 12 or h < 12:
            continue
        roi = img[y:y+h, x:x+w]
        bw, bh = max(3, w//blocks), max(3, h//blocks)
        img[y:y+h, x:x+w] = cv2.resize(
            cv2.resize(roi, (bw, bh), interpolation=cv2.INTER_AREA),
            (w, h), interpolation=cv2.INTER_NEAREST)
    return img


def remove_kct(img):
    """KCT 각인은 노란색 — 색상으로 찾아 주변 파란색으로 덮습니다."""
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    # 노랑/주황 (KCT 글자)
    m = cv2.inRange(hsv, (18, 90, 110), (38, 255, 255))
    # 파란 통 영역 안에 있는 것만 (배경 노란 바닥선 제외)
    blue = cv2.inRange(hsv, (95, 80, 60), (135, 255, 255))
    blue = cv2.dilate(blue, np.ones((41, 41), np.uint8))
    m = cv2.bitwise_and(m, blue)
    m = cv2.dilate(m, np.ones((13, 13), np.uint8))
    if m.sum() == 0:
        return img, 0
    img = img.copy()
    img[m > 0] = (200, 120, 60)     # BGR: 파란 통과 유사한 톤
    return img, int((m > 0).sum())


def main():
    report = {}
    for name, cfg in PHOTOS.items():
        img = cv2.imread(str(SRC / cfg["src"]))
        if img is None:
            print("  건너뜀(파일 없음):", cfg["src"]); continue
        if cfg.get("crop"):
            x0, y0, x1, y1 = cfg["crop"]
            img = img[y0:y1, x0:x1]
        H, W = img.shape[:2]
        n_face = 0
        if cfg["faces"] == "auto":
            boxes = detect_faces(img)
            img = pixelate(img, boxes)
            n_face = len(boxes)
        # 제3자 브랜드 — 로고를 '주변 배경에서 복제한 패치'로 덮습니다.
        # 단색으로 채우면 눈에 띄는 사각형이 남습니다.
        for (x0, y0, x1, y1) in cfg["brands"]:
            x0, y0 = max(0, x0), max(0, y0)
            x1, y1 = min(W, x1), min(H, y1)
            w, h = x1 - x0, y1 - y0
            if w <= 0 or h <= 0:
                continue
            # 로고 바로 위쪽 띠를 복사 (iMac 등은 위가 균일한 금속면)
            sy = max(0, y0 - h - 8)
            patch = img[sy:sy + h, x0:x1]
            if patch.shape[0] == h:
                img[y0:y1, x0:x1] = patch
            else:
                img[y0:y1, x0:x1] = img[y0:y1, x0:x1].reshape(-1, 3).mean(0)
        if cfg.get("kct", True):
            img, kct_px = remove_kct(img)
        else:
            kct_px = 0
        # 리사이즈
        if W > cfg["max_w"]:
            s = cfg["max_w"] / W
            img = cv2.resize(img, (cfg["max_w"], int(H*s)), interpolation=cv2.INTER_AREA)
        out = OUT / f"factory-{name}.jpg"
        cv2.imwrite(str(out), img, [cv2.IMWRITE_JPEG_QUALITY, cfg["quality"], cv2.IMWRITE_JPEG_OPTIMIZE, 1])
        kb = out.stat().st_size/1024
        report[name] = {"faces": n_face, "kct_px": kct_px, "size": list(img.shape[1::-1]), "kb": round(kb)}
        print("  %-24s 얼굴%2d  KCT%6dpx  %4dx%-5d %6.0fKB" % (
            name, n_face, kct_px, img.shape[1], img.shape[0], kb))
    json.dump(report, open(str(SRC/"prepare_report.json"), "w"), indent=1, ensure_ascii=False)


if __name__ == "__main__":
    main()
