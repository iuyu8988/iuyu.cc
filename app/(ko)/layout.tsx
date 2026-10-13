import { LOCALE_META } from '@/lib/i18n';
import { getDictionary } from '@/content/dictionaries';
import LocaleProvider from '@/components/LocaleProvider';
import IntroGate from '@/components/IntroGate';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';
import StructuredData from '@/components/StructuredData';

/**
 * 한국어(기본 언어) 레이아웃.
 * ko 는 언어 접두사 없이 서비스하므로 라우트 그룹 (ko) 로 묶었습니다.
 * URL 은 / , /about/ , /capabilities/ … 그대로입니다.
 */
export default function KoLayout({ children }: { children: React.ReactNode }) {
  const locale = 'ko' as const;
  const t = getDictionary(locale);

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
