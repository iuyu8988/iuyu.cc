'use client';

import { useEffect } from 'react';
import { LOCALE_META, isLocale, DEFAULT_LOCALE } from '@/lib/i18n';

/**
 * 경로 첫 세그먼트로 언어를 판단해 <html lang> 을 맞춥니다.
 * 정적 export 에서는 <html> 을 언어별로 다르게 렌더할 수 없어(단일 루트 레이아웃),
 * 크롤러가 실행하는 JS 에서 보정합니다. 렌더 차단 스크립트로 동작해
 * 페인트 전에 적용됩니다.
 */
export default function HtmlLang() {
  useEffect(() => {
    const seg = window.location.pathname.split('/').filter(Boolean);
    const locale = isLocale(seg[0] ?? '') ? (seg[0] as keyof typeof LOCALE_META) : DEFAULT_LOCALE;
    document.documentElement.lang = LOCALE_META[locale].htmlLang;
  }, []);
  return null;
}
