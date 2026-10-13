/**
 * 언어 설정 — 단일 소스.
 * 새 언어를 추가할 때는 여기 LOCALES 에 넣고,
 * content/dictionaries/ 에 사전 파일을 하나 추가하면 됩니다.
 */

export const LOCALES = ['ko', 'en', 'zh'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'ko';

export const LOCALE_META: Record<
  Locale,
  { label: string; labelEn: string; htmlLang: string; hreflang: string; ogLocale: string }
> = {
  ko: { label: '한국어', labelEn: 'Korean', htmlLang: 'ko', hreflang: 'ko-KR', ogLocale: 'ko_KR' },
  en: { label: 'English', labelEn: 'English', htmlLang: 'en', hreflang: 'en', ogLocale: 'en_US' },
  zh: { label: '中文', labelEn: 'Chinese', htmlLang: 'zh-Hans', hreflang: 'zh-Hans', ogLocale: 'zh_CN' },
};

/** 경로에 언어 접두사가 있는지 판별하고 locale 을 뽑아냅니다. */
export function splitLocale(pathname: string): { locale: Locale | null; rest: string } {
  const seg = pathname.split('/').filter(Boolean);
  const first = seg[0] as Locale | undefined;
  if (first && (LOCALES as readonly string[]).includes(first)) {
    return { locale: first, rest: '/' + seg.slice(1).join('/') + (seg.length > 1 ? '/' : '') };
  }
  return { locale: null, rest: pathname };
}

/** 기본 언어(ko)는 접두사 없이 서비스합니다. ko → '/', en → '/en/', zh → '/zh/' */
export function localePath(locale: Locale, path = '/'): string {
  const clean = '/' + path.replace(/^\/+/, '').replace(/\/+$/, '');
  const withSlash = clean === '/' ? '/' : clean + '/';
  return locale === DEFAULT_LOCALE ? withSlash : `/${locale}${withSlash}`;
}

/**
 * hreflang 세트와 canonical 을 생성합니다.
 * canonical 은 '그 페이지 자신의 URL' 이어야 하므로 현재 locale 을 받습니다.
 * (모든 언어의 canonical 을 기본 언어로 몰아넣으면 검색엔진이 en/zh 페이지를 무시합니다)
 */
export function alternatesFor(path = '/', locale: Locale = DEFAULT_LOCALE) {
  const languages: Record<string, string> = {};
  for (const l of LOCALES) languages[LOCALE_META[l].hreflang] = localePath(l, path);
  languages['x-default'] = localePath(DEFAULT_LOCALE, path);
  return { canonical: localePath(locale, path), languages };
}

export function isLocale(v: string): v is Locale {
  return (LOCALES as readonly string[]).includes(v);
}

/** 숫자 포맷 (통화 없이 수치만) */
export function fmtNum(n: number, locale: Locale): string {
  return n.toLocaleString(locale === 'zh' ? 'zh-CN' : locale === 'en' ? 'en-US' : 'ko-KR');
}
