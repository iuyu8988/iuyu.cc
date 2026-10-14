import type { Metadata } from 'next';
import { alternatesFor } from '@/lib/i18n';
import { getDictionary } from '@/content/dictionaries';
import Hero from '@/components/Hero';
import { Factory, RetailNotice } from '@/components/Sections';

/**
 * 홈은 랜딩 한 장입니다 — 히어로 + 설비/라인 실사.
 *
 * 역량·소재·공정·제품 라인·지표·FAQ 등은 각 하위 페이지
 * (/capabilities/, /products/, /oem/, /about/, /contact/)가 이미 다루므로
 * 홈에서 다시 펼치지 않습니다. 섹션 컴포넌트는 Sections.tsx 에 그대로
 * 남겨 두었으니, 다시 홈에 올릴 때는 import 만 추가하면 됩니다.
 */

export function generateMetadata(): Metadata {
  const t = getDictionary('ko');
  const alt = alternatesFor('/', 'ko');
  return {
    title: `${t.meta.defaultTitle} | ${t.meta.siteName}`,
    description: t.meta.defaultDescription,
    alternates: { canonical: alt.canonical, languages: alt.languages },
  };
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Factory />
      {/* 개별 구매 안내 — 푸터 연락처 바로 위에 옵니다 */}
      <RetailNotice />
    </>
  );
}
