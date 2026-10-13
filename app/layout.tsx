import type { Metadata, Viewport } from 'next';
import './globals.css';
import { VERIFICATION } from '@/content/brand';
import HtmlLang from '@/components/HtmlLang';

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://iuyu.cc',
  ),
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

export const viewport: Viewport = {
  themeColor: '#f4f5f7',
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light',
};

/**
 * 루트 레이아웃 — <html>/<body> 만 담당합니다.
 * 정적 export 환경에서 <html> 은 한 곳에서만 렌더할 수 있으므로,
 * 경로 기반으로 lang 을 맞추는 클라이언트 보정을 함께 넣습니다.
 * (각 페이지의 실제 문구·메타데이터는 언어별 layout/페이지에서 생성됩니다)
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        <HtmlLang />
      </head>
      <body className="min-h-screen bg-page">{children}</body>
    </html>
  );
}
