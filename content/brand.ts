/**
 * 언어와 무관한 고정 정보 (회사명·연락처·사업자 정보).
 * 문구는 content/dictionaries/*.ts 에 있습니다.
 *
 * ⚠️ [대괄호] 값은 placeholder 입니다. 실제 정보로 교체한 뒤 배포하세요.
 */
export const BRAND_FIXED = {
  name: 'IUYU',
  nameKo: '이유',
  since: '2016',
  email: 'sales@iuyu.cc',
  emailTech: 'engineering@iuyu.cc',
  legal: {
    companyKo: '[주식회사 아이유유]',
    companyEn: 'IUYU Co., Ltd.',
    ceo: '[대표자명]',
    bizNo: '[000-00-00000]',
    address: '[공장 주소]',
    addressOffice: '[서울 사무소 주소]',
    tel: '[대표 전화]',
    factory: {
      label: '[공장 소재지]',
      area: '[생산 면적]',
      lines: '[사출기 대수]',
    },
  },
} as const;

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://iuyu.cc';

export const VERIFICATION = {
  google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
  naver: process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION || '',
};
