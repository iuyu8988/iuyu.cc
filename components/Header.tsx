'use client';

import { useEffect, useRef, useState } from 'react';
import { BRAND_FIXED } from '@/content/brand';
import { localePath } from '@/lib/i18n';
import { useLocale } from './LocaleProvider';
import LanguageSwitcher from './LanguageSwitcher';

/* ============================================================================
   헤더 — 도면의 표제란(title block)
   스크롤 진행률이 상단 1px 선으로 표시됩니다.
   다운 시 숨기고 업 시 즉시 재등장시켜 읽기 흐름을 방해하지 않습니다.
   ========================================================================= */

export default function Header() {
  const { locale, t, basePath } = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const raf = useRef(0);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      if (raf.current) return;
      raf.current = requestAnimationFrame(() => {
        const y = window.scrollY;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setScrolled(y > 12);
        setProgress(max > 0 ? Math.min(1, y / max) : 0);
        setHidden(y > 420 && y > lastY.current);
        lastY.current = y;
        raf.current = 0;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const isActive = (href: string) =>
    href === '/' ? basePath === '/' : basePath.startsWith(href.replace(/\/$/, ''));

  return (
    <>
      <header
        className="sticky top-0 z-50"
        style={{
          transform: hidden ? 'translateY(-100%)' : 'translateY(0)',
          transition: 'transform .5s var(--ease-out)',
          borderBottom: `1px solid ${scrolled ? 'var(--line)' : 'transparent'}`,
          background: scrolled ? 'rgba(242,243,245,.86)' : 'rgba(242,243,245,.6)',
          backdropFilter: 'blur(20px) saturate(160%)',
          WebkitBackdropFilter: 'blur(20px) saturate(160%)',
        }}
      >
        <div className="shell">
          <div className="flex h-16 items-center justify-between gap-4 lg:h-[68px]">
            <a
              href={localePath(locale, '/')}
              className="flex shrink-0 items-baseline gap-3"
              aria-label={t.meta.siteName}
            >
              <span
                className="font-bold ink"
                style={{ fontSize: 18, letterSpacing: '.26em' }}
              >
                {BRAND_FIXED.name}
              </span>
              <span className="t-note hidden sm:inline">{t.brand.subline}</span>
            </a>

            <nav className="hidden items-center gap-8 lg:flex" aria-label={t.common.ariaPrimaryNav}>
              {t.nav.map((item) => {
                const active = isActive(item.href);
                return (
                  <a
                    key={item.href}
                    href={localePath(locale, item.href)}
                    aria-current={active ? 'page' : undefined}
                    className="link-draw nav-link whitespace-nowrap text-[0.8125rem] font-medium transition-colors duration-300"
                    style={{ color: active ? 'var(--ink)' : 'var(--ink-3)' }}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>

            <div className="flex items-center gap-2.5">
              <LanguageSwitcher />
              <a
                href={localePath(locale, '/contact/')}
                className="btn btn-solid hidden !px-4 !py-2.5 !text-[0.75rem] xl:inline-flex"
              >
                {t.cta.primary}
              </a>
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label={t.common.ariaMenuOpen}
                className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] lg:hidden"
                style={{ border: '1px solid var(--line-strong)', borderRadius: 2 }}
              >
                <span className="block h-px w-4 bg-ink" />
                <span className="block h-px w-4 bg-ink" />
              </button>
            </div>
          </div>
        </div>

        {/* 스크롤 진행률 */}
        <div className="absolute inset-x-0 bottom-0 h-px" style={{ background: 'transparent' }}>
          <div
            className="h-full"
            style={{
              background: 'var(--accent)',
              width: `${progress * 100}%`,
              transition: 'width .1s linear',
              opacity: scrolled ? 1 : 0,
            }}
            aria-hidden="true"
          />
        </div>
      </header>

      {/* 모바일 메뉴 */}
      <div
        className="fixed inset-0 z-[60] lg:hidden"
        style={{
          pointerEvents: open ? 'auto' : 'none',
          opacity: open ? 1 : 0,
          transition: 'opacity .35s var(--ease-out)',
        }}
      >
        <div
          className="absolute inset-0"
          style={{ background: 'rgba(242,243,245,.97)', backdropFilter: 'blur(16px)' }}
          onClick={() => setOpen(false)}
        />
        <div className="relative flex h-full flex-col px-6 pt-5">
          <div className="flex items-center justify-between">
            <span className="font-bold ink" style={{ fontSize: 18, letterSpacing: '.26em' }}>
              {BRAND_FIXED.name}
            </span>
            <div className="flex items-center gap-2">
              <LanguageSwitcher compact />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t.common.ariaMenuClose}
                className="flex h-9 w-9 items-center justify-center ink-2"
                style={{ border: '1px solid var(--line-strong)', borderRadius: 2 }}
              >
                ✕
              </button>
            </div>
          </div>

          <nav className="mt-10 flex flex-col" aria-label={t.common.ariaMobileNav}>
            {t.nav.map((item, i) => (
              <a
                key={item.href}
                href={localePath(locale, item.href)}
                onClick={() => setOpen(false)}
                className="flex items-baseline justify-between py-4 text-[1.25rem] font-semibold ink"
                style={{
                  borderBottom: '1px solid var(--line)',
                  transform: open ? 'translateY(0)' : 'translateY(10px)',
                  opacity: open ? 1 : 0,
                  transition: `transform .5s var(--ease-out) ${80 + i * 45}ms, opacity .5s ease ${80 + i * 45}ms`,
                }}
              >
                {item.label}
                <span className="t-num" style={{ fontSize: 11, color: 'var(--ink-4)' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
              </a>
            ))}
          </nav>

          <a
            href={localePath(locale, '/contact/')}
            onClick={() => setOpen(false)}
            className="btn btn-solid mb-8 mt-auto w-full"
          >
            {t.cta.primary}
          </a>
        </div>
      </div>
    </>
  );
}
