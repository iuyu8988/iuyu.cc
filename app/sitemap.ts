import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/content/brand';
import { LOCALES, LOCALE_META, localePath } from '@/lib/i18n';

export const dynamic = 'force-static';

const PATHS = [
  { path: '/', priority: 1, freq: 'weekly' as const },
  { path: '/capabilities/', priority: 0.9, freq: 'monthly' as const },
  { path: '/products/', priority: 0.9, freq: 'monthly' as const },
  { path: '/oem/', priority: 0.85, freq: 'monthly' as const },
  { path: '/contact/', priority: 0.8, freq: 'yearly' as const },
  { path: '/about/', priority: 0.6, freq: 'yearly' as const },
  { path: '/social/', priority: 0.5, freq: 'weekly' as const },
  { path: '/legal/quality/', priority: 0.45, freq: 'yearly' as const },
  { path: '/legal/ip/', priority: 0.45, freq: 'yearly' as const },
  { path: '/legal/terms/', priority: 0.3, freq: 'yearly' as const },
  { path: '/legal/privacy/', priority: 0.3, freq: 'yearly' as const },
  { path: '/legal/youth/', priority: 0.3, freq: 'yearly' as const },
];

/**
 * 언어별 URL 을 모두 등록하고, 각 항목에 hreflang 대체 링크를 넣습니다.
 * (구글은 sitemap 의 xhtml:link 도 신호로 사용합니다)
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return PATHS.flatMap(({ path, priority, freq }) =>
    LOCALES.map((locale) => ({
      url: `${SITE_URL}${localePath(locale, path)}`,
      lastModified: now,
      changeFrequency: freq,
      priority: locale === 'ko' ? priority : priority * 0.9,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((l) => [LOCALE_META[l].hreflang, `${SITE_URL}${localePath(l, path)}`]),
        ),
      },
    })),
  );
}
