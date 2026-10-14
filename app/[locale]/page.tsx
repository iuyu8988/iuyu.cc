import type { Metadata } from 'next';
import { alternatesFor, type Locale } from '@/lib/i18n';
import { getDictionary } from '@/content/dictionaries';
import Hero from '@/components/Hero';
import { Factory, RetailNotice } from '@/components/Sections';

/**
 * 홈은 랜딩 한 장입니다 — 히어로 + 설비/라인 실사. (ko 홈과 동일한 구성)
 * 나머지 섹션은 각 하위 페이지가 담당하므로 여기서는 펼치지 않습니다.
 */

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const t = getDictionary(params.locale);
  const alt = alternatesFor('/', params.locale);
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
