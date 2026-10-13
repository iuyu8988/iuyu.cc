import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/content/brand';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // 상태 페이지·API 는 크롤 대상이 아닙니다
        disallow: ['/api/', '/thank-you/'],
      },
      // 네이버 검색 로봇 명시 허용
      { userAgent: 'Yeti', allow: '/' },
      // 구글 이미지 — 제품 실사가 이미지 검색에 노출되도록
      { userAgent: 'Googlebot-Image', allow: '/' },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
