import type { Metadata } from 'next';
import { alternatesFor, type Locale } from '@/lib/i18n';
import { getDictionary } from '@/content/dictionaries';
import Hero from '@/components/Hero';
import {
  KeywordBand,
  SummaryBand,
  CapabilityGrid,
  Materials,
  Process,
  EquipmentQuality,
  Factory,
  Lines,
  Stats,
  HowToStart,
  ScopeNotice,
  Faq,
  CtaBand,
} from '@/components/Sections';

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
      <KeywordBand />
      <SummaryBand />
      <CapabilityGrid />
      <Materials />
      <Process />
      <EquipmentQuality />
      <Factory />
      <Lines />
      <Stats />
      <HowToStart />
      <ScopeNotice />
      <Faq />
      <CtaBand />
    </>
  );
}
