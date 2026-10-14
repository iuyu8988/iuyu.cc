/**
 * 언어와 무관한 고정 정보 (브랜드명·연락처).
 * 문구는 content/dictionaries/*.ts 에 있습니다.
 *
 * ── 법인 정보에 대해 ─────────────────────────────────────────────
 * 사업자 정보(상호·등록번호·주소·대표자)는 의도적으로 비워 두었습니다.
 * 실제 법인이 확정되면 아래 legal 블록을 채우고, 다음 파일에서 다시 노출하세요:
 *   - components/StructuredData.tsx  (address, telephone)
 *   - components/Footer.tsx          (사업자 정보 표)
 *   - app/(ko)/about/page.tsx        (REGISTRATION 섹션)
 * placeholder 를 그대로 노출하면 신뢰를 깎고, 구조화 데이터에 넣으면
 * 검색엔진이 그대로 읽어갑니다. 그래서 값이 없을 때는 아예 렌더하지 않습니다.
 */

export const BRAND_FIXED = {
  name: 'IUYU',
  nameKo: '이유',

  /* ── 창립연도 없음 ──────────────────────────────────────────────
     이전에 '2016' 이 들어 있었으나 근거가 없어 제거했습니다.
     푸터의 SINCE, 히어로의 REV., JSON-LD 의 foundingDate 모두 삭제됨.
     실제 등록일이 확정되면 이 자리에 필드를 추가하고 위 3곳을 함께
     고치세요. (사업자등록증의 날짜를 그대로 쓰지 않습니다.) */

  /* ── 연락처 ─────────────────────────────────────────────────────
     WhatsApp 은 해외 바이어(동남아·중동·중남미)가 가장 많이 쓰는 창구이고,
     이메일은 정식 견적·서류용입니다. 둘 다 노출합니다.
     wa.me 링크는 국가번호+번호를 '+'와 공백 없이 붙여야 합니다. */
  /** 단일 창구 — 영업·기술 문의를 모두 이 주소로 받습니다. */
  email: 'iuyu8988@gmail.com',
  whatsapp: {
    /** wa.me 링크용 — 국가코드 포함, 기호 없이 */
    number: '8613296898988',
    /** 화면 표기용 */
    display: '+86 132 9689 8988',
  },

  legal: {
    /* 법인 정보가 확정되면 채우세요. 빈 문자열이면 화면에 렌더되지 않습니다. */
    companyKo: '',
    companyEn: 'IUYU',
    ceo: '',
    bizNo: '',
    address: '',
    addressOffice: '',
    /** WhatsApp 과 같은 번호입니다. 표시는 WhatsApp 으로 통일합니다. */
    tel: '+86 132 9689 8988',
  },
} as const;

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://iuyu.cc';

/* ── 소셜 채널 ───────────────────────────────────────────────────────
   B2B 사이트라도 채널이 있으면 신뢰 신호가 됩니다 (특히 한국·동남아 바이어).
   JSON-LD 의 sameAs 에도 그대로 들어가서 검색엔진이 '같은 실체'로 묶어 줍니다.

   handle 은 @ 없이 저장하고, 링크 생성 시에만 붙입니다. */
export const SOCIAL = [
  { id: 'instagram', label: 'Instagram', handle: 'iuyu8988',  href: 'https://www.instagram.com/iuyu8988/' },
  { id: 'tiktok',    label: 'TikTok',    handle: 'iuyu267',   href: 'https://www.tiktok.com/@iuyu267' },
  { id: 'x',         label: 'X',         handle: 'iuyu8988',  href: 'https://x.com/iuyu8988' },
  { id: 'youtube',   label: 'YouTube',   handle: 'iuyu-f1h',  href: 'https://www.youtube.com/@iuyu-f1h' },
] as const;

export const VERIFICATION = {
  google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
  naver: process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION || '',
};

/** WhatsApp 대화 링크 (언어별 사전 인사말 포함) */
export function whatsappLink(message?: string) {
  const base = `https://wa.me/${BRAND_FIXED.whatsapp.number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
