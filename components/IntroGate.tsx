'use client';

import { useEffect, useState } from 'react';
import { useLocale } from './LocaleProvider';

const KEY = 'iuyu.b2b.notice.v2';

/**
 * 사업 범위 고지 — 컴플라이언스 장치.
 * 첫 진입에 취급/비취급 품목을 명확히 밝힙니다.
 * 확인 기록은 localStorage 에만 남기고 서버로 보내지 않습니다.
 */
export default function IntroGate() {
  const { t } = useLocale();
  const [open, setOpen] = useState(true);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = localStorage.getItem(KEY) === '1';
    } catch {
      seen = false;
    }
    if (seen) setOpen(false);
    else requestAnimationFrame(() => setEntered(true));
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const accept = () => {
    try {
      localStorage.setItem(KEY, '1');
    } catch {
      /* 저장 불가 환경이면 이번 세션만 유지 */
    }
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="notice-title"
    >
      <div
        className="absolute inset-0"
        style={{
          background: 'rgba(11,14,18,.42)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
        }}
      />

      <div
        className="relative w-full max-w-[560px] sm:mx-5"
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--line)',
          borderRadius: '2px 2px 0 0',
          transform: entered ? 'translateY(0)' : 'translateY(28px)',
          opacity: entered ? 1 : 0,
          transition: 'transform .7s var(--ease-out), opacity .7s var(--ease-out)',
        }}
      >
        {/* 도면 번호판 */}
        <div
          className="flex items-center justify-between px-7 py-3.5 sm:px-9"
          style={{ borderBottom: '1px solid var(--line)' }}
        >
          <span className="t-note" style={{ color: 'var(--accent)' }}>
            {t.gate.eyebrow}
          </span>
          <span className="t-num" style={{ fontSize: 11, color: 'var(--ink-4)' }}>
            REV. 2026-01
          </span>
        </div>

        <div className="p-7 sm:p-9">
          <h2 id="notice-title" className="t-h2">
            {t.gate.titleLine1}{' '}
            <span className="accent">{t.gate.titleAccent}</span>
            {t.gate.titleLine2}
          </h2>

          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            <div className="p-4" style={{ background: 'var(--sunk)', borderRadius: 2 }}>
              <p className="t-note" style={{ color: 'var(--ink-2)' }}>{t.gate.scopeTitle}</p>
              <ul className="mt-3 space-y-2">
                {t.gate.scopeItems.map((s) => (
                  <li key={s} className="t-sm flex items-baseline gap-2 ink-2">
                    <span className="h-1 w-1 shrink-0 rounded-full" style={{ background: 'var(--accent)' }} />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-4" style={{ background: '#fbf1f0', borderRadius: 2 }}>
              <p className="t-note" style={{ color: 'var(--ink-2)' }}>{t.gate.outOfScopeTitle}</p>
              <ul className="mt-3 space-y-2">
                {t.gate.outOfScopeItems.map((s) => (
                  <li key={s} className="t-sm flex items-baseline gap-2 ink-2">
                    <span className="h-1 w-1 shrink-0 rounded-full" style={{ background: '#b46' }} />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="t-sm mt-6 text-pretty ink-3">{t.gate.body}</p>

          <button type="button" onClick={accept} className="btn btn-solid mt-7 w-full">
            {t.gate.accept}
          </button>

          <p className="t-note mt-5 text-center" style={{ textTransform: 'none', letterSpacing: '.02em' }}>
            {t.gate.privacyNote}
          </p>
        </div>
      </div>
    </div>
  );
}
