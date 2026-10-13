import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LOCALES, LOCALE_META, DEFAULT_LOCALE, alternatesFor, isLocale, type Locale } from '@/lib/i18n';
import { getDictionary } from '@/content/dictionaries';
import { BRAND_FIXED, SITE_URL, VERIFICATION } from '@/content/brand';
import LocaleProvider from '@/components/LocaleProvider';
import IntroGate from '@/components/IntroGate';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';
import StructuredData from '@/components/StructuredData';

// ko 는 접두사 없는 루트 경로(/ , /about/ ...)로 서비스하므로
// [locale] 동적 세그먼트는 en / zh 만 생성합니다.
export function generateStaticParams() {
  return LOCALES.filter((l) => l !== DEFAULT_LOCALE).map((locale) => ({ locale }));
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  if (!isLocale(params.locale)) return {};
  const locale = params.locale as Locale;
  const t = getDictionary(locale);
  const meta = LOCALE_META[locale];
  const alt = alternatesFor('/', params.locale);

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${t.meta.defaultTitle} | ${t.meta.siteName}`,
      template: `%s | ${t.meta.siteName}`,
    },
    description: t.meta.defaultDescription,
    keywords: [...t.meta.keywords],
    authors: [{ name: BRAND_FIXED.name }],
    creator: BRAND_FIXED.name,
    publisher: BRAND_FIXED.name,
    applicationName: BRAND_FIXED.name,
    category: 'manufacturing',
    alternates: { canonical: alt.canonical, languages: alt.languages },
    openGraph: {
      type: 'website',
      locale: meta.ogLocale,
      url: alt.canonical,
      siteName: BRAND_FIXED.name,
      title: `${t.meta.defaultTitle} | ${t.meta.siteName}`,
      description: t.meta.defaultDescription,
      images: [{ url: '/assets/og-image.png', width: 1200, height: 630, alt: t.meta.siteName }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${t.meta.defaultTitle} | ${t.meta.siteName}`,
      description: t.meta.defaultDescription,
      images: ['/assets/og-image.png'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    icons: {
      icon: [
        { url: '/assets/icon-192.png', sizes: '192x192', type: 'image/png' },
        { url: '/assets/icon-512.png', sizes: '512x512', type: 'image/png' },
      ],
      apple: [{ url: '/assets/apple-icon.png', sizes: '180x180' }],
    },
    verification: {
      ...(VERIFICATION.google ? { google: VERIFICATION.google } : {}),
      other: { ...(VERIFICATION.naver ? { 'naver-site-verification': VERIFICATION.naver } : {}) },
    },
    formatDetection: { telephone: false, address: false, email: false },
  };
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  const t = getDictionary(locale);

  // <html>/<body> 는 루트 layout(app/layout.tsx) 이 담당합니다.
  // 여기서는 언어별 콘텐츠와 구조화 데이터만 얹습니다.
  return (
    <>
      <StructuredData locale={locale} />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200]
                   focus:rounded-lg focus:px-5 focus:py-2.5 focus:text-[13px] focus:font-semibold
                   focus:text-white"
        style={{ background: 'var(--accent)' }}
      >
        {t.common.skipToContent}
      </a>
      <LocaleProvider locale={locale}>
        <IntroGate />
        <Header />
        <main id="main" className="min-h-[60svh]">{children}</main>
        <Footer />
        <FloatingActions />
      </LocaleProvider>
    </>
  );
}
