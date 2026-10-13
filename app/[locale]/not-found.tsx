'use client';

import { useLocale } from '@/components/LocaleProvider';
import { localePath } from '@/lib/i18n';

export default function NotFound() {
  const { locale, t } = useLocale();
  return (
    <div className="shell flex min-h-[68svh] flex-col items-center justify-center py-28 text-center">
      <p className="t-note" style={{ color: 'var(--accent)' }}>{t.notFound.eyebrow}</p>
      <h1 className="t-h1 mt-6">{t.notFound.h1}</h1>
      <p className="t-lead mt-6 max-w-[440px] text-pretty">{t.notFound.body}</p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <a href={localePath(locale, '/')} className="btn btn-solid">{t.notFound.home}</a>
        <a href={localePath(locale, '/capabilities/')} className="btn btn-line">{t.notFound.capabilities}</a>
        <a href={localePath(locale, '/contact/')} className="btn btn-line">{t.notFound.contact}</a>
      </div>
    </div>
  );
}
