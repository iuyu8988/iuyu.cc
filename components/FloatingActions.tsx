'use client';

import { useEffect, useState } from 'react';
import { BRAND_FIXED } from '@/content/brand';
import { localePath } from '@/lib/i18n';
import { useLocale } from './LocaleProvider';

/** B2B 플로팅 — 쇼핑몰의 장바구니 바가 아니라 '상담 바'입니다. */
export default function FloatingActions() {
  const { locale, t } = useLocale();
  const [show, setShow] = useState(false);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        setShow(window.scrollY > 620);
        raf = 0;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* 모바일 하단 바 */}
      <div
        className="fixed inset-x-0 bottom-0 z-40 lg:hidden"
        style={{
          background: 'rgba(242,243,245,.94)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          borderTop: '1px solid var(--line)',
          transform: show ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform .5s var(--ease-out)',
        }}
      >
        <div className="shell flex items-center gap-4 py-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-[0.75rem] font-semibold ink">{t.floating.mobileTitle}</p>
            <p className="t-note truncate" style={{ textTransform: 'none', letterSpacing: 0 }}>
              {t.floating.mobileSub}
            </p>
          </div>
          <a
            href={localePath(locale, '/contact/')}
            className="btn btn-solid shrink-0 !px-4 !py-2.5 !text-[0.75rem]"
          >
            {t.floating.mobileCta}
          </a>
        </div>
      </div>

      {/* 데스크톱 우하단 */}
      <div
        className="fixed bottom-8 right-8 z-40 hidden lg:block"
        style={{
          transform: show ? 'translateY(0)' : 'translateY(14px)',
          opacity: show ? 1 : 0,
          pointerEvents: show ? 'auto' : 'none',
          transition: 'transform .5s var(--ease-out), opacity .5s var(--ease-out)',
        }}
      >
        <div className="flex flex-col items-end gap-2.5">
          <a
            href={`mailto:${BRAND_FIXED.email}`}
            className="t-num inline-flex min-h-[32px] items-center px-3.5 py-2.5 ink-3 transition-colors duration-300 hover:ink"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--line)',
              borderRadius: 2,
              fontSize: 11,
              letterSpacing: '.06em',
              boxShadow: '0 10px 30px -18px rgba(11,14,18,.4)',
            }}
          >
            {BRAND_FIXED.email}
          </a>
          <a
            href={localePath(locale, '/contact/')}
            className="btn btn-solid"
            style={{ boxShadow: '0 14px 32px -14px rgba(13,107,118,.6)' }}
          >
            {t.floating.desktopCta}
          </a>
        </div>
      </div>
    </>
  );
}
