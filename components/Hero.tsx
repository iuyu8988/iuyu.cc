'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { BRAND_FIXED } from '@/content/brand';
import { localePath } from '@/lib/i18n';
import { useLocale } from './LocaleProvider';
import { DimLine, Enter, ScrollCue } from './primitives';

/* ============================================================================
   히어로 — 「도면 시트」
   제품 실사를 스튜디오에 올리고, 그 위에 실제 치수 기입 방식을 적용했습니다.
   치수 숫자는 사진에 인쇄된 제조사 실측값입니다(HTML 로 다시 그림 — 3개 언어 공통).
   ========================================================================= */

/** 도면 좌표 마커: 원 + 십자 */
function RegMark({ className = '' }: { className?: string }) {
  return (
    <span className={`pointer-events-none absolute ${className}`} aria-hidden="true">
      <span className="absolute inset-0 rounded-full" style={{ border: '1px solid var(--line-strong)' }} />
      <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2" style={{ background: 'var(--line-strong)' }} />
      <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2" style={{ background: 'var(--line-strong)' }} />
    </span>
  );
}

export default function Hero() {
  const { locale, t } = useLocale();
  const ref = useRef<HTMLElement | null>(null);
  const [p, setP] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const raf = useRef(0);
  const [motion, setMotion] = useState(true);

  const onMove = useCallback((e: PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    if (raf.current) return;
    raf.current = requestAnimationFrame(() => {
      const r = el.getBoundingClientRect();
      setP({
        x: Math.max(-0.5, Math.min(0.5, (e.clientX - r.left) / r.width - 0.5)),
        y: Math.max(-0.5, Math.min(0.5, (e.clientY - r.top) / r.height - 0.5)),
      });
      raf.current = 0;
    });
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setMotion(false);
      return;
    }
    const onScroll = () => {
      const r = el.getBoundingClientRect();
      setScrollY(Math.max(0, Math.min(1, -r.top / Math.max(1, r.height))));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return () => window.removeEventListener('scroll', onScroll);
    }
    el.addEventListener('pointermove', onMove);
    const leave = () => setP({ x: 0, y: 0 });
    el.addEventListener('pointerleave', leave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', leave);
      window.removeEventListener('scroll', onScroll);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [onMove]);

  const dx = motion ? p.x : 0;
  const dy = motion ? p.y : 0;

  return (
    <section ref={ref} className="relative isolate overflow-hidden" style={{ borderBottom: '1px solid var(--line)' }}>
      {/* ── 배경 ── */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ transform: `translate3d(${dx * 10}px, ${dy * 10 + scrollY * -30}px, 0)` }}
      >
        <div className="absolute inset-0 tex tex-silicone" />
        <div className="absolute inset-0 blueprint opacity-[0.85]" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 58% 52% at 68% 42%, rgba(255,255,255,.92) 0%, rgba(255,255,255,.45) 46%, rgba(242,243,245,0) 78%)',
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-32"
          style={{ background: 'linear-gradient(to top, var(--paper), transparent)' }}
        />
      </div>

      <div className="shell">
        {/* ── 시트 표제란 ── */}
        <div
          className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-4"
          style={{ borderBottom: '1px solid var(--line)' }}
        >
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1.5">
            <span className="t-note" style={{ color: 'var(--accent)' }}>SHEET 01 / 08</span>
            <span className="t-note hidden sm:inline">REV. {BRAND_FIXED.since}</span>
            <span className="t-note hidden md:inline">SCALE 1:1</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1.5">
            <span className="t-note">OEM / ODM</span>
            <span className="t-note hidden sm:inline">ISO 9001 · REACH</span>
          </div>
        </div>

        <div className="grid items-center gap-12 py-12 lg:grid-cols-[minmax(0,1.22fr)_minmax(0,1fr)] lg:gap-14 lg:py-16">
          {/* ── 좌: 주장 ── */}
          <div className="relative z-10" style={{ transform: `translate3d(${dx * 6}px, ${dy * 6}px, 0)` }}>
            <Enter variant="fade">
              <div className="flex flex-wrap items-center gap-2">
                <span className="tag tag-accent">{t.hero.chips[0]}</span>
                <span className="tag">{t.hero.chips[1]}</span>
              </div>
            </Enter>

            <h1 className="t-display mt-7">
              <Enter variant="unmask" delay={60} as="span" className="block">{t.hero.h1Line1}</Enter>
              <Enter variant="unmask" delay={160} as="span" className="block accent">{t.hero.h1Accent}</Enter>
              <Enter variant="unmask" delay={260} as="span" className="block">{t.hero.h1Line2}</Enter>
            </h1>

            <Enter variant="rise" delay={400}>
              <p className="t-lead mt-7 max-w-[34rem] text-pretty">{t.hero.lede}</p>
            </Enter>

            <Enter variant="rise" delay={500}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a href={localePath(locale, '/contact/')} className="btn btn-solid">
                  {t.hero.ctaPrimary} <span aria-hidden="true">→</span>
                </a>
                <a href={localePath(locale, '/capabilities/')} className="btn btn-line">
                  {t.hero.ctaSecondary}
                </a>
              </div>
            </Enter>

            {/* 부품표(parts list) — 실측값 */}
            <Enter variant="rise" delay={600}>
              <dl
                className="mt-12 grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-3"
                style={{ borderTop: '1px solid var(--line)', paddingTop: '1.5rem' }}
              >
                {t.hero.facts.map((f) => (
                  <div key={f.k}>
                    <dt className="t-note">{f.k}</dt>
                    <dd className="t-num mt-2 text-[0.875rem] font-semibold ink">{f.v}</dd>
                    <dd className="t-sm mt-1 ink-3">{f.d}</dd>
                  </div>
                ))}
              </dl>
            </Enter>
          </div>

          {/* ── 우: 제품 도면 ── */}
          <div
            className="relative"
            style={{ transform: `translate3d(${dx * -16}px, ${dy * -16 + scrollY * -16}px, 0)` }}
          >
            <Enter variant="unmask" delay={180}>
              <div className="stage aspect-[4/4.4] shadow-[0_2px_3px_rgba(11,14,18,.04),0_34px_66px_-34px_rgba(11,14,18,.3)]">
                <RegMark className="left-4 top-4 h-3 w-3" />
                <RegMark className="right-4 top-4 h-3 w-3" />
                <RegMark className="left-4 bottom-4 h-3 w-3" />
                <RegMark className="right-4 bottom-4 h-3 w-3" />

                <div
                  className="absolute bottom-[8%] left-1/2 h-[26px] w-[54%] -translate-x-1/2 rounded-[50%] blur-xl"
                  style={{ background: 'radial-gradient(ellipse, rgba(11,14,18,.22) 0%, transparent 74%)' }}
                />
                <div
                  className="relative z-10 flex h-full w-full items-center justify-center p-10 sm:p-14"
                  style={{ animation: motion ? 'floatY 9s ease-in-out infinite' : 'none' }}
                >
                  <img
                    src="/assets/hero-product.png"
                    alt={t.hero.productAlt}
                    width={490}
                    height={573}
                    className="h-auto max-h-full w-auto max-w-full object-contain"
                    style={{ filter: 'drop-shadow(0 22px 38px rgba(11,14,18,.15))' }}
                    fetchPriority="high"
                    decoding="async"
                  />
                </div>

                {/* ── 실측 치수 기입 ── */}
                <div className="absolute inset-x-[18%] bottom-[4.5%] z-20">
                  <DimLine orientation="h" label={t.hero.dimW} delay={880} tone="accent" />
                </div>
                <div className="absolute inset-y-[16%] right-[4%] z-20">
                  <DimLine orientation="v" label={t.hero.dimH} delay={980} />
                </div>
              </div>
            </Enter>

            <Enter variant="fade" delay={1080}>
              <div
                className="mt-3.5 flex flex-wrap items-center justify-between gap-x-6 gap-y-2"
                style={{ borderTop: '1px solid var(--line)', paddingTop: '0.75rem' }}
              >
                <span className="t-note">FIG. 01 — SILICONE CASE + LANYARD</span>
                <span className="t-num" style={{ fontSize: 11, letterSpacing: '.12em', color: 'var(--ink-4)' }}>
                  UNIT: mm · {t.hero.dimTotal} TOTAL
                </span>
              </div>
            </Enter>

            <div className="mt-5 grid grid-cols-3 gap-2.5">
              {t.capabilities.items.slice(0, 3).map((c, i) => (
                <Enter key={c.id} variant="rise" delay={1120 + i * 70}>
                  <a
                    href={localePath(locale, '/capabilities/')}
                    className="pane pane-lift group flex h-full flex-col justify-between p-4"
                  >
                    <span className="t-num block" style={{ fontSize: 11, letterSpacing: '.14em', color: 'var(--accent)' }}>
                      {c.no}
                    </span>
                    <span className="mt-5 block text-[0.8125rem] font-semibold leading-snug ink">{c.title}</span>
                    <span
                      className="mt-3 block h-px w-0 transition-all duration-500 group-hover:w-full"
                      style={{ background: 'var(--accent)' }}
                    />
                  </a>
                </Enter>
              ))}
            </div>
          </div>
        </div>

        <Enter variant="fade" delay={1200}>
          <div className="pb-8">
            <ScrollCue label="SCROLL" />
          </div>
        </Enter>
      </div>
    </section>
  );
}
