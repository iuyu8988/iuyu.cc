'use client';

import { useEffect, useRef, useState } from 'react';
import { LOCALES, LOCALE_META, type Locale } from '@/lib/i18n';
import { useLocale } from './LocaleProvider';

/** 언어 전환 — 현재 페이지를 유지한 채 이동합니다. */
export default function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { locale, switchTo, t } = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${t.common.langLabel}: ${LOCALE_META[locale].label}`}
        className="tap inline-flex items-center gap-2 px-3 py-2 text-[0.75rem] font-medium transition-colors duration-300"
        style={{
          border: '1px solid var(--line)',
          borderRadius: 2,
          color: open ? 'var(--ink)' : 'var(--ink-2)',
          background: open ? 'var(--surface)' : 'transparent',
        }}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.5 2.6 2.5 15.4 0 18M12 3c-2.5 2.6-2.5 15.4 0 18" />
        </svg>
        <span>{LOCALE_META[locale].label}</span>
        <span
          style={{
            fontSize: 11,
            transform: open ? 'rotate(180deg)' : 'rotate(0)',
            transition: 'transform .35s var(--ease-out)',
            opacity: 0.55,
          }}
          aria-hidden="true"
        >
          ▼
        </span>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={t.common.langLabel}
          className="absolute right-0 z-50 w-[168px] overflow-hidden"
          style={{
            top: 'calc(100% + 6px)',
            background: 'var(--surface)',
            border: '1px solid var(--line)',
            borderRadius: 2,
            boxShadow: '0 18px 44px -20px rgba(11,14,18,.3)',
            animation: 'fadeUp .3s var(--ease-out) both',
          }}
        >
          {LOCALES.map((l: Locale) => {
            const active = l === locale;
            return (
              <li key={l} role="option" aria-selected={active}>
                <a
                  href={switchTo(l)}
                  hrefLang={LOCALE_META[l].hreflang}
                  onClick={() => setOpen(false)}
                  className="tap flex items-center justify-between px-4 py-3 text-[0.8125rem] transition-colors duration-200"
                  style={{
                    color: active ? 'var(--accent)' : 'var(--ink-2)',
                    fontWeight: active ? 600 : 400,
                    background: active ? 'var(--accent-wash)' : 'transparent',
                  }}
                >
                  <span>{LOCALE_META[l].label}</span>
                  <span className="t-num" style={{ fontSize: 11, color: 'var(--ink-4)' }}>
                    {l.toUpperCase()}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
