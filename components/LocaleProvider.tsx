'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { DEFAULT_LOCALE, LOCALES, type Locale, localePath, isLocale } from '@/lib/i18n';
import { getDictionary, type Dictionary } from '@/content/dictionaries';

type Ctx = {
  locale: Locale;
  t: Dictionary;
  /** 현재 경로를 기준으로 같은 페이지의 다른 언어 URL 을 만듭니다. */
  switchTo: (target: Locale) => string;
  /** 언어 접두사를 뗀 현재 경로 (예: /capabilities/) */
  basePath: string;
};

const LocaleCtx = createContext<Ctx | null>(null);

export default function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const [basePath, setBasePath] = useState('/');

  useEffect(() => {
    const seg = window.location.pathname.split('/').filter(Boolean);
    const rest = isLocale(seg[0] ?? '') ? seg.slice(1) : seg;
    setBasePath('/' + rest.join('/') + (rest.length ? '/' : ''));
  }, []);

  const switchTo = useCallback(
    (target: Locale) => localePath(target, basePath),
    [basePath],
  );

  // <html lang> 을 클라이언트 내비게이션에서도 정확히 유지
  useEffect(() => {
    const meta = { ko: 'ko', en: 'en', zh: 'zh-Hans' } as const;
    document.documentElement.lang = meta[locale];
    document.documentElement.dir = 'ltr';
  }, [locale]);

  return (
    <LocaleCtx.Provider value={{ locale, t: getDictionary(locale), switchTo, basePath }}>
      {children}
    </LocaleCtx.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleCtx);
  if (!ctx) throw new Error('useLocale must be used inside <LocaleProvider>');
  return ctx;
}

export { DEFAULT_LOCALE, LOCALES };
