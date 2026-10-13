'use client';

import { useEffect, useRef, useState } from 'react';

/* ============================================================================
   레이아웃 프리미티브
   모든 리빌은 transform / opacity / clip-path 만 사용합니다.
   (레이아웃을 다시 계산하지 않아 CLS 가 0 입니다)
   ========================================================================= */

/** 스크롤 진입 시 한 번만 발동. 미세한 지연을 줄 수 있어 리듬을 만들 수 있습니다. */
export function Reveal({
  children,
  delay = 0,
  variant = 'rise',
  className = '',
  as: Tag = 'div',
}: {
  children: React.ReactNode;
  delay?: number;
  variant?: 'rise' | 'unmask' | 'fade';
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true);
      return;
    }
    // IntersectionObserver 미지원 환경이면 즉시 표시
    if (typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
          clearTimeout(safety);
        }
      },
      { rootMargin: '-4% 0px -10% 0px', threshold: 0.04 },
    );
    io.observe(el);

    // 안전망: 어떤 이유로든 관측이 발동하지 않으면 2.5초 뒤 표시합니다.
    // (앵커로 중간 진입, 백그라운드 탭, 인쇄, 자동화 도구 등에서
    //  콘텐츠가 영구히 opacity:0 으로 남는 것을 막습니다)
    const safety = window.setTimeout(() => setShown(true), 2500);

    return () => {
      io.disconnect();
      clearTimeout(safety);
    };
  }, []);

  const from: Record<string, React.CSSProperties> = {
    rise: { transform: 'translateY(26px)', opacity: 0 },
    unmask: { clipPath: 'inset(0 0 100% 0)', transform: 'translateY(10px)', opacity: 0.4 },
    fade: { opacity: 0 },
  };
  const to: Record<string, React.CSSProperties> = {
    rise: { transform: 'translateY(0)', opacity: 1 },
    unmask: { clipPath: 'inset(0 0 0 0)', transform: 'translateY(0)', opacity: 1 },
    fade: { opacity: 1 },
  };

  const Comp = Tag as React.ElementType;
  return (
    <Comp
      ref={ref as never}
      className={className}
      style={{
        ...(shown ? to[variant] : from[variant]),
        transition: `transform .85s var(--ease-out) ${delay}ms, opacity .85s var(--ease-out) ${delay}ms, clip-path 1s var(--ease-out) ${delay}ms`,
        willChange: shown ? 'auto' : 'transform, opacity, clip-path',
      }}
    >
      {children}
    </Comp>
  );
}

/**
 * 치수선 — 도면의 치수 기입 방식.
 * 실제로 그려지는 애니메이션이 붙어 있어 '측정'이라는 행위를 시각화합니다.
 */
export function DimLine({
  orientation = 'h',
  label,
  delay = 0,
  className = '',
  tone = 'default',
}: {
  orientation?: 'h' | 'v';
  label?: string;
  delay?: number;
  className?: string;
  tone?: 'default' | 'accent';
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setOn(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true);
          io.disconnect();
          clearTimeout(safety);
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    const safety = window.setTimeout(() => setOn(true), 2500);
    return () => {
      io.disconnect();
      clearTimeout(safety);
    };
  }, []);

  const color = tone === 'accent' ? 'var(--accent)' : 'var(--line-strong)';

  if (orientation === 'v') {
    return (
      <div ref={ref} className={`flex flex-col items-center ${className}`} aria-hidden="true">
        <span
          style={{
            width: 1,
            height: 7,
            background: color,
            transform: on ? 'scaleY(1)' : 'scaleY(0)',
            transition: `transform .4s var(--ease-out) ${delay}ms`,
          }}
        />
        <span
          style={{
            width: 1,
            flex: 1,
            minHeight: 24,
            background: `linear-gradient(to bottom, ${color} ${label ? '0%' : '100%'}, transparent)`,
            transform: on ? 'scaleY(1)' : 'scaleY(0)',
            transformOrigin: 'top',
            transition: `transform .8s var(--ease-out) ${delay + 80}ms`,
            opacity: label ? 0.9 : 0.55,
          }}
        />
        {label && (
          <span
            className="t-num my-2 whitespace-nowrap"
            style={{
              fontSize: 11,
              letterSpacing: '0.1em',
              color: tone === 'accent' ? 'var(--accent)' : 'var(--ink-3)',
              writingMode: 'vertical-rl',
              opacity: on ? 1 : 0,
              transition: `opacity .5s ease ${delay + 500}ms`,
            }}
          >
            {label}
          </span>
        )}
        <span
          style={{
            width: 1,
            flex: 1,
            minHeight: 24,
            background: `linear-gradient(to top, ${color} ${label ? '0%' : '100%'}, transparent)`,
            transform: on ? 'scaleY(1)' : 'scaleY(0)',
            transformOrigin: 'bottom',
            transition: `transform .8s var(--ease-out) ${delay + 80}ms`,
            opacity: label ? 0.9 : 0.55,
          }}
        />
        <span
          style={{
            width: 1,
            height: 7,
            background: color,
            transform: on ? 'scaleY(1)' : 'scaleY(0)',
            transition: `transform .4s var(--ease-out) ${delay + 900}ms`,
          }}
        />
      </div>
    );
  }

  return (
    <div ref={ref} className={`flex items-center gap-2 ${className}`} aria-hidden="true">
      <span
        style={{
          width: 7,
          height: 1,
          background: color,
          transform: on ? 'scaleX(1)' : 'scaleX(0)',
          transition: `transform .4s var(--ease-out) ${delay}ms`,
        }}
      />
      <span className="relative flex-1" style={{ height: 1 }}>
        <span
          className="absolute inset-0 block origin-left"
          style={{
            background: `linear-gradient(to right, ${color} ${label ? '0%' : '100%'}, transparent)`,
            opacity: label ? 0.9 : 0.55,
            transform: on ? 'scaleX(1)' : 'scaleX(0)',
            transition: `transform .9s var(--ease-out) ${delay + 80}ms`,
          }}
        />
      </span>
      {label && (
        <span
          className="t-num whitespace-nowrap"
          style={{
            fontSize: 11,
            letterSpacing: '0.12em',
            color: tone === 'accent' ? 'var(--accent)' : 'var(--ink-3)',
            opacity: on ? 1 : 0,
            transition: `opacity .5s ease ${delay + 560}ms`,
          }}
        >
          {label}
        </span>
      )}
      <span
        style={{
          width: 7,
          height: 1,
          background: color,
          transform: on ? 'scaleX(1)' : 'scaleX(0)',
          transition: `transform .4s var(--ease-out) ${delay + 900}ms`,
        }}
      />
    </div>
  );
}

/**
 * 섹션 헤더 — 세 가지 위계를 명확히 구분합니다.
 *  display: 페이지의 주장 (홈 최상단)
 *  major  : 섹션 제목 (큰 편)
 *  minor  : 보조 섹션 (작게, 좌측 정렬 + 규칙선)
 * 동일한 크기를 반복하면 단조로워지므로 의도적으로 변주합니다.
 */
export function SectionHead({
  index,
  eyebrow,
  title,
  lede,
  scale = 'major',
  align = 'left',
  id,
}: {
  index?: string;
  eyebrow: string;
  title: React.ReactNode;
  lede?: string;
  scale?: 'display' | 'major' | 'minor';
  align?: 'left' | 'center';
  id?: string;
}) {
  const titleClass = scale === 'display' ? 't-display' : scale === 'major' ? 't-h1' : 't-h2';
  const centered = align === 'center';

  return (
    <div className={`${centered ? 'mx-auto max-w-[760px] text-center' : 'max-w-[820px]'}`}>
      <Reveal variant="fade" className="flex items-center gap-3">
        {!centered && <span className="h-px w-8 shrink-0" style={{ background: 'var(--accent)' }} />}
        <p className="t-note">
          {index && <span className="mr-2.5" style={{ color: 'var(--accent)' }}>{index}</span>}
          {eyebrow}
        </p>
      </Reveal>
      <Reveal variant="unmask" delay={90}>
        <h2 id={id} className={`${titleClass} mt-5`}>
          {title}
        </h2>
      </Reveal>
      {lede && (
        <Reveal variant="rise" delay={190}>
          <p className={`t-lead mt-6 ${centered ? 'mx-auto' : ''} max-w-[640px] text-pretty`}>{lede}</p>
        </Reveal>
      )}
    </div>
  );
}

/** 가로 흐르는 키워드 띠 — 정지한 화면에 호흡을 넣습니다. */
export function Marquee({ items, tone = 'dark' }: { items: string[]; tone?: 'dark' | 'light' }) {
  const doubled = [...items, ...items];
  return (
    <div
      className="relative flex overflow-hidden py-5"
      style={{
        background: tone === 'dark' ? 'var(--ink)' : 'var(--surface-sunk)',
        borderTop: `1px solid ${tone === 'dark' ? 'transparent' : 'var(--line)'}`,
        borderBottom: `1px solid ${tone === 'dark' ? 'transparent' : 'var(--line)'}`,
      }}
      aria-hidden="true"
    >
      <div className="flex shrink-0 animate-marquee items-center gap-10 pr-10">
        {doubled.map((t, i) => (
          <span key={i} className="flex shrink-0 items-center gap-10">
            <span
              className="t-note whitespace-nowrap"
              style={{ color: tone === 'dark' ? 'rgba(255,255,255,.62)' : 'var(--ink-3)', fontSize: 11 }}
            >
              {t}
            </span>
            <span
              className="h-1 w-1 shrink-0 rounded-full"
              style={{ background: tone === 'dark' ? 'var(--accent-on-dark)' : 'var(--accent)' }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}

/** 마이크로 인터랙션 — 커서를 따라오는 하이라이트 (--mx/--my 를 CSS 로 전달) */
export function Spotlight({
  children,
  className = '',
  radius = 420,
}: {
  children: React.ReactNode;
  className?: string;
  radius?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  return (
    <div
      ref={ref}
      className={`group/spot relative ${className}`}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty('--mx', `${e.clientX - r.left}px`);
        el.style.setProperty('--my', `${e.clientY - r.top}px`);
      }}
    >
      <span
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        aria-hidden="true"
        style={{
          background: `radial-gradient(${radius}px circle at var(--mx, 50%) var(--my, 50%), rgba(13,107,118,.075), transparent 62%)`,
        }}
      />
      {children}
    </div>
  );
}

/** 홈 최상단의 스크롤 유도 표시 */
export function ScrollCue({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3" aria-hidden="true">
      <span className="relative block h-9 w-px overflow-hidden" style={{ background: 'var(--line)' }}>
        <span
          className="absolute inset-x-0 top-0 block h-3 animate-scrollHint"
          style={{ background: 'var(--accent)' }}
        />
      </span>
      <span className="t-note" style={{ fontSize: 11 }}>{label}</span>
    </div>
  );
}

/**
 * 내부 페이지 헤더 — 도면 시트의 표제란.
 * 브레드크럼 대신 시트 번호와 경로를 등폭으로 표기합니다.
 */
export function PageHead({
  sheet,
  path,
  eyebrow,
  title,
  lede,
  meta,
}: {
  sheet: string;
  path: string;
  eyebrow: string;
  title: React.ReactNode;
  lede?: string;
  meta?: { k: string; v: string }[];
}) {
  return (
    <header className="pb-14 pt-10 sm:pt-14">
      <Reveal variant="fade">
        <div
          className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 pb-5"
          style={{ borderBottom: '1px solid var(--line)' }}
        >
          <span className="t-note" style={{ color: 'var(--accent)' }}>
            SHEET {sheet}
          </span>
          <span className="t-note">{path}</span>
        </div>
      </Reveal>

      <div className="mt-12 max-w-[840px]">
        <Reveal variant="fade" delay={60}>
          <p className="t-note">{eyebrow}</p>
        </Reveal>
        <Reveal variant="unmask" delay={130}>
          <h1 className="t-h1 mt-5">{title}</h1>
        </Reveal>
        {lede && (
          <Reveal variant="rise" delay={260}>
            <p className="t-lead mt-7 max-w-[660px] text-pretty">{lede}</p>
          </Reveal>
        )}
      </div>

      {meta && meta.length > 0 && (
        <Reveal variant="rise" delay={340}>
          <dl className="mt-14 flex flex-wrap gap-x-14 gap-y-6">
            {meta.map((m) => (
              <div key={m.k}>
                <dt className="t-note">{m.k}</dt>
                <dd className="mt-2 text-[0.9375rem] font-semibold t-num ink">{m.v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      )}
    </header>
  );
}

/** 내부 페이지 하단 CTA — 모든 내부 페이지에서 동일한 마무리 */
export function PageFooterCta({
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: {
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <Reveal variant="rise">
      <div
        className="mt-20 flex flex-wrap items-center gap-3 pt-10"
        style={{ borderTop: '1px solid var(--line)' }}
      >
        <a href={primaryHref} className="btn btn-solid">
          {primaryLabel} <span aria-hidden="true">→</span>
        </a>
        {secondaryLabel && secondaryHref && (
          <a href={secondaryHref} className="btn btn-line">
            {secondaryLabel}
          </a>
        )}
      </div>
    </Reveal>
  );
}

/**
 * Enter — 첫 화면(above the fold) 전용 등장.
 *
 * Reveal 과 달리 IntersectionObserver 를 쓰지 않습니다.
 * 이유: 히어로는 사용자가 가장 먼저 보는 콘텐츠이자 대개 LCP 요소입니다.
 * JS 하이드레이션을 기다리면 그만큼 LCP 가 밀립니다(실측: 최대 2.5초 반투명).
 * CSS 애니메이션은 서버 HTML 에 그대로 실려 JS 없이 즉시 재생됩니다.
 */
export function Enter({
  children,
  delay = 0,
  variant = 'rise',
  className = '',
  as: Tag = 'div',
}: {
  children: React.ReactNode;
  delay?: number;
  variant?: 'rise' | 'unmask' | 'fade';
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}) {
  const Comp = Tag as React.ElementType;
  return (
    <Comp
      className={`enter enter-${variant} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </Comp>
  );
}


/**
 * GalleryItem — 제품 실사 한 컷.
 *
 * 배경: 이 제품의 실사는 비율이 0.25 ~ 4.0 으로 크게 다릅니다(목걸이끈은 아주 길고,
 * 전체 구성컷은 가로로 넓음). 고정 프레임에 넣으면 작게 보이거나 잘립니다.
 * 해결: **높이를 통일하고 너비를 비율에 맡깁니다.** 필름스트립처럼 나란히 놓입니다.
 *
 * @param ratio 높이 / 너비
 */
export function GalleryItem({
  src,
  alt,
  cap,
  index,
  ratio = 1,
  eager = false,
}: {
  src: string;
  alt: string;
  cap: string;
  index: number;
  ratio?: number;
  eager?: boolean;
}) {
  /* 컨테이너는 뷰포트에 따라 높이가 변하고, 너비는 비율에서 유도됩니다.
     너무 좁은 화면에서는 한 컷이 과도하게 넓어지지 않도록 max-width 를 겁니다. */
  return (
    <figure
      className="stage group/g flex w-full flex-col"
      style={{
        /* 세로 컷은 통일 높이, 가로 feature 는 비율에서 유도한 높이 */
        height: ratio >= 1 ? 'var(--shot-h)' : `calc(var(--shot-w) / ${(1 / ratio).toFixed(3)})`,
      }}
    >
      <div className="relative z-10 flex flex-1 items-center justify-center overflow-hidden p-3">
        <img
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          className="h-full w-full object-contain transition-transform duration-700 ease-out group-hover/g:scale-[1.03]"
          style={{ filter: 'drop-shadow(0 12px 22px rgba(11,14,18,.12))' }}
        />
      </div>
      <figcaption
        className="relative z-10 flex items-baseline justify-between gap-2 px-3.5 py-2.5"
        style={{ borderTop: '1px solid var(--line)', background: 'rgba(255,255,255,.75)' }}
      >
        <span className="truncate text-[0.8125rem] font-semibold ink">{cap}</span>
        <span className="t-num shrink-0" style={{ fontSize: 11, color: 'var(--ink-4)' }}>
          {String(index).padStart(2, '0')}
        </span>
      </figcaption>
    </figure>
  );
}
