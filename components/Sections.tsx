'use client';

import { useEffect, useRef, useState } from 'react';
import { localePath } from '@/lib/i18n';
import { useLocale } from './LocaleProvider';
import { DimLine, Marquee, Reveal, SectionHead, Spotlight } from './primitives';

/* ============================================================================
   섹션 — 위계를 의도적으로 변주합니다.
   major : 큰 제목 + 넓은 여백 (페이지의 주요 주장)
   minor : 작은 제목 + 좌측 규칙선 (보조 정보, 밀도 높게)
   레이아웃도 2단 / 3단 / 4단 / 비대칭으로 번갈아 배치해 단조로움을 피합니다.
   ========================================================================= */

const CAP_ICONS: Record<string, React.ReactNode> = {
  oem: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <path d="M17.5 14v7M14 17.5h7" />
    </>
  ),
  design: (
    <>
      <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />
      <path d="M12 12l8-4.5M12 12v9M12 12L4 7.5" />
    </>
  ),
  mold: (
    <>
      <rect x="3" y="7" width="18" height="10" rx="1.5" />
      <path d="M7 7V4h10v3M7 17v3h10v-3M12 10v4" />
    </>
  ),
  brand: (
    <>
      <path d="M4 20h16M6 20V9l6-5 6 5v11" />
      <path d="M10 20v-5h4v5" />
    </>
  ),
};

/* ─────────────────────────── 요약 밴드 ─────────────────────────── */

export function SummaryBand() {
  const { t } = useLocale();
  return (
    <section
      aria-label={t.summaryBand[0]?.k}
      style={{ background: 'var(--surface)', borderBottom: '1px solid var(--line)' }}
    >
      <div className="shell grid gap-y-9 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {t.summaryBand.map((s, i) => (
          <Reveal key={s.k} variant="rise" delay={i * 80}>
            <div
              className="h-full lg:pl-7"
              style={{ borderLeft: i === 0 ? '1px solid transparent' : '1px solid var(--line-soft)' }}
            >
              <p className="t-note">{s.k}</p>
              <p className="mt-3 text-[1.0625rem] font-bold ink">{s.v}</p>
              <p className="t-sm mt-1.5 ink-3">{s.d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────── 역량 4종 ─────────────────────────── */
/* 비대칭 2×2: 큰 카드 2개 + 작은 카드 2개로 리듬을 만듭니다 */

export function CapabilityGrid() {
  const { t, locale } = useLocale();
  const c = t.capabilities;

  return (
    <section id="capabilities" className="relative" style={{ paddingBlock: 'var(--section-y)' }}>
      <div className="shell">
        <SectionHead
          index="01"
          eyebrow={c.eyebrow}
          title={
            <>
              {c.h2Line1}
              <br />
              {c.h2Line2}
            </>
          }
          lede={c.lede}
        />

        <div className="mt-16 grid gap-3 lg:grid-cols-2">
          {c.items.map((item, i) => {
            const wide = i % 3 === 0; // 첫 번째만 폭을 넓혀 리듬 변주
            return (
              <Reveal key={item.id} variant="rise" delay={i * 90} className={wide ? 'lg:col-span-2' : ''}>
                <Spotlight className="h-full">
                  <article className="pane pane-lift relative flex h-full flex-col p-7 sm:p-9">
                    <div className="flex items-start justify-between gap-6">
                      <span
                        className="flex h-11 w-11 shrink-0 items-center justify-center"
                        style={{ background: 'var(--accent-wash)', borderRadius: 2 }}
                        aria-hidden="true"
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="var(--accent)"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          {CAP_ICONS[item.id]}
                        </svg>
                      </span>
                      <span className="t-num" style={{ fontSize: 11, letterSpacing: '.16em', color: 'var(--ink-4)' }}>
                        {item.no}
                      </span>
                    </div>

                    <div className={wide ? 'lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-12' : ''}>
                      <div>
                        <h3 className="t-h3 mt-7">{item.title}</h3>
                        <p className="t-note mt-2">{item.titleEn}</p>
                        <p className="mt-5 font-semibold accent" style={{ fontSize: '0.9375rem', lineHeight: 1.65 }}>
                          {item.lead}
                        </p>
                        <p className="t-sm mt-3 text-pretty ink-2">{item.body}</p>
                      </div>

                      <ul
                        className={`mt-6 space-y-0 ${wide ? 'lg:mt-7' : ''}`}
                        style={{ borderTop: '1px solid var(--line-soft)' }}
                      >
                        {item.points.map((pt, j) => (
                          <li
                            key={pt}
                            className="t-sm flex items-baseline gap-3 py-3 ink-2"
                            style={{ borderBottom: j === item.points.length - 1 ? 'none' : '1px solid var(--line-soft)' }}
                          >
                            <span
                              className="t-num shrink-0"
                              style={{ fontSize: 11, color: 'var(--accent)' }}
                            >
                              {String(j + 1).padStart(2, '0')}
                            </span>
                            {pt}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </Spotlight>
              </Reveal>
            );
          })}
        </div>

        <Reveal variant="fade" delay={360}>
          <div className="mt-10">
            <a href={localePath(locale, '/capabilities/')} className="btn btn-quiet">
              {t.pages.capabilities.ctaSecondary} <span aria-hidden="true">→</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────── 소재 ─────────────────────────── */

export function Materials() {
  const { t } = useLocale();
  const m = t.materials;

  return (
    <section
      id="materials"
      style={{ background: 'var(--surface)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', paddingBlock: 'var(--section-y)' }}
    >
      <div className="shell">
        <SectionHead index="02" eyebrow={m.eyebrow} title={m.h2} lede={m.lede} />

        <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-20">
          {/* 소재 등급 — 도면의 재질표 */}
          <div>
            {m.grades.map((g, i) => (
              <Reveal key={g.k} variant="rise" delay={i * 90}>
                <div
                  className="group grid grid-cols-[auto_minmax(0,1fr)] items-start gap-x-5 py-6 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-x-7"
                  style={{ borderBottom: '1px solid var(--line-soft)' }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="t-num px-2 py-1 text-[0.6875rem] font-bold text-white"
                      style={{ background: 'var(--accent)', borderRadius: 1 }}
                    >
                      {g.k}
                    </span>
                  </div>
                  <div>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                      <h3 className="t-h3">{g.v}</h3>
                      <span className="t-num" style={{ fontSize: 11, letterSpacing: '.08em', color: 'var(--ink-3)' }}>
                        {g.temp}
                      </span>
                    </div>
                    <p className="t-sm mt-3 text-pretty ink-2">{g.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* 마감 옵션 */}
          <Reveal variant="rise" delay={140}>
            <div className="tex tex-metal pane relative p-7 sm:p-8">
              <div className="relative z-10">
                <p className="t-note">{m.finishesLabel}</p>
                <div className="mt-6 space-y-0">
                  {m.finishes.map((f, j) => (
                    <div
                      key={f.k}
                      className="group flex items-baseline justify-between gap-5 py-4"
                      style={{ borderBottom: j === m.finishes.length - 1 ? 'none' : '1px solid var(--line-soft)' }}
                    >
                      <div>
                        <p className="text-[0.9375rem] font-semibold ink">
                          {f.k}
                          <span className="t-note ml-2.5">{f.v}</span>
                        </p>
                        <p className="t-sm mt-1.5 ink-3">{f.d}</p>
                      </div>
                      <span
                        className="mt-1 h-6 w-6 shrink-0 transition-transform duration-500 group-hover:scale-110"
                        style={{
                          borderRadius: f.v === 'Embossed' || f.v === '엠보' || f.v === '压纹' ? 2 : 99,
                          background: 'linear-gradient(145deg,#fff,#c9cfd6)',
                          border: '1px solid var(--line-strong)',
                        }}
                        aria-hidden="true"
                      />
                    </div>
                  ))}
                </div>
                <p className="t-sm mt-6 ink-3">{m.note}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── 공정 5단계 ─────────────────────────── */
/* 가로 타임라인 + 실제 길이를 가진 진행선 */

export function Process() {
  const { t } = useLocale();
  const p = t.process;
  const [active, setActive] = useState(0);

  return (
    <section id="process" style={{ paddingBlock: 'var(--section-y)' }}>
      <div className="shell">
        <SectionHead index="03" eyebrow={p.eyebrow} title={p.h2} />

        <div className="mt-16">
          {/* 진행선 — 클릭한 단계까지 채워집니다 */}
          <div className="relative hidden lg:block">
            <div className="absolute left-0 right-0 top-[13px] h-px" style={{ background: 'var(--line)' }} />
            <div
              className="absolute left-0 top-[13px] h-px transition-all duration-700"
              style={{
                background: 'var(--accent)',
                width: `${((active + 1) / p.steps.length) * 100}%`,
              }}
            />
          </div>

          <ol className="grid gap-8 lg:grid-cols-5 lg:gap-6">
            {p.steps.map((s, i) => {
              const on = i <= active;
              return (
                <Reveal key={s.no} variant="rise" delay={i * 80}>
                  <li
                    className="relative cursor-pointer"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    tabIndex={0}
                  >
                    <div className="flex items-center gap-4 lg:block">
                      <span
                        className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-500"
                        style={{
                          background: on ? 'var(--accent)' : 'var(--paper)',
                          border: `1px solid ${on ? 'var(--accent)' : 'var(--line-strong)'}`,
                        }}
                      >
                        <span
                          className="t-num"
                          style={{ fontSize: 11, color: on ? '#fff' : 'var(--ink-3)' }}
                        >
                          {s.no}
                        </span>
                      </span>
                      <span className="t-num t-note lg:mt-5 lg:block" style={{ opacity: on ? 1 : 0.55 }}>
                        {s.dur}
                      </span>
                    </div>
                    <h3 className="t-h3 mt-4 transition-colors duration-500" style={{ color: on ? 'var(--ink)' : 'var(--ink-2)' }}>
                      {s.t}
                    </h3>
                    <p className="t-sm mt-2.5 text-pretty ink-3">{s.d}</p>
                  </li>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}


/* ─────────────────────────── 설비 · 생산동 ─────────────────────────── */
/* 실사 사진이 주인공입니다. 캡션은 사진 아래 최소한으로.
   사진은 모두 자사 생산동에서 촬영했고, 재직자 얼굴은 처리했습니다(문구로 고지). */

export function Factory() {
  const { t, locale } = useLocale();
  const f = t.factory;
  /* 홈이 히어로 + 이 섹션만 남았습니다. 인덱스는 다른 페이지의 내부 섹션과
     같은 규칙(A·B·C)을 따릅니다 — 히어로가 이미 SHEET 01 이라 숫자를 쓰면
     시트 번호와 겹쳐 보입니다. */

  return (
    <section
      id="facility"
      className="scroll-mt-24"
      style={{
        background: 'var(--surface)',
        borderTop: '1px solid var(--line)',
        borderBottom: '1px solid var(--line)',
        paddingBlock: 'var(--section-y)',
      }}
    >
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <SectionHead index="A" eyebrow={f.eyebrow} title={f.h2} lede={f.lede} />
          <Reveal variant="fade" delay={220}>
            <dl className="flex gap-8 lg:pb-1">
              {f.stat.map((st) => (
                <div key={st.k}>
                  <dt className="t-note">{st.k}</dt>
                  <dd className="mt-1.5 text-[0.875rem] font-semibold ink">{st.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {f.items.map((item, i) => (
            <Reveal key={item.src} variant="unmask" delay={i * 60}>
              <figure className="stage group/f flex h-full flex-col">
                <div className="relative z-10 aspect-[4/3] overflow-hidden">
                  <img
                    src={item.src}
                    alt={`${item.cap} — ${t.meta.siteName}`}
                    loading={i < 3 ? 'eager' : 'lazy'}
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover/f:scale-[1.04]"
                  />
                  {/* 사진 하단 그라데이션 — 캡션 가독성 */}
                  <span
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-16"
                    style={{ background: 'linear-gradient(to top, rgba(11,14,18,.34), transparent)' }}
                    aria-hidden="true"
                  />
                  <span
                    className="t-num absolute bottom-3 left-3.5 z-10 text-white"
                    style={{ fontSize: 11, letterSpacing: '.12em', textShadow: '0 1px 3px rgba(0,0,0,.5)' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <figcaption className="relative z-10 flex flex-1 flex-col justify-center px-4 py-3.5">
                  <p className="text-[0.875rem] font-semibold ink">{item.cap}</p>
                  <p className="t-sm mt-1 ink-3">{item.d}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal variant="fade" delay={260}>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <p className="t-sm ink-4">{f.note}</p>
            <a href={localePath(locale, '/contact/')} className="btn btn-line !py-2.5 !text-[0.8125rem]">
              {f.cta}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────── 설비 + 품질 ─────────────────────────── */
/* 좌: 큰 숫자 지표 / 우: 검사 항목 리스트 — 밀도 대비 */

export function EquipmentQuality() {
  const { t } = useLocale();
  const e = t.equipment;
  const q = t.qa;

  return (
    <section
      style={{ background: 'var(--surface)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', paddingBlock: 'var(--section-y)' }}
    >
      <div className="shell grid gap-16 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHead index="05" eyebrow={e.eyebrow} title={e.h2} lede={e.lede} scale="minor" />
          <div className="mt-12 grid grid-cols-2 gap-px" style={{ background: 'var(--line-soft)' }}>
            {e.items.map((item, i) => (
              <Reveal key={item.k} variant="rise" delay={i * 70}>
                <div className="h-full bg-surface p-6">
                  <p className="t-note">{item.k}</p>
                  <p
                    className="t-num mt-4 leading-none ink"
                    style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 700, letterSpacing: '-0.02em' }}
                  >
                    {item.v}
                  </p>
                  <p className="t-sm mt-3.5 ink-3">{item.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal variant="fade" delay={300}>
            <p className="t-sm mt-6 ink-4">{e.note}</p>
          </Reveal>
        </div>

        <div>
          <SectionHead index="06" eyebrow={q.eyebrow} title={q.h2} lede={q.lede} scale="minor" />
          <ul className="mt-12">
            {q.checks.map((c, i) => (
              <Reveal key={c.k} variant="rise" delay={i * 55}>
                <li
                  className="group flex items-baseline gap-5 py-4 transition-colors duration-300"
                  style={{ borderBottom: '1px solid var(--line-soft)' }}
                >
                  <span className="t-num shrink-0" style={{ fontSize: 11, color: 'var(--accent)' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="w-[5.5rem] shrink-0 text-[0.8125rem] font-semibold ink">{c.k}</span>
                  <span className="t-sm ink-2">{c.d}</span>
                </li>
              </Reveal>
            ))}
          </ul>

          <Reveal variant="rise" delay={180}>
            <div className="mt-8 p-6" style={{ background: 'var(--sunk)', borderRadius: 2 }}>
              <p className="t-note">{q.certsTitle}</p>
              <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {q.certs.map((c) => (
                  <li key={c.k} className="t-sm flex items-baseline gap-2 ink-2">
                    <span className="h-1 w-1 shrink-0 rounded-full" style={{ background: 'var(--ink-4)' }} />
                    <span className="font-medium ink">{c.k}</span>
                    <span className="ink-3">— {c.v}</span>
                  </li>
                ))}
              </ul>
              <p className="t-sm mt-5 ink-3">{q.certsNote}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── 제품 라인 ─────────────────────────── */
/* 좌우 교차 배치 — 큰 이미지와 텍스트가 번갈아 나옵니다 */

export function Lines() {
  const { t, locale } = useLocale();
  const l = t.lines;
  const views = t.pages.products.views;

  return (
    <section id="lines" style={{ paddingBlock: 'var(--section-y)' }}>
      <div className="shell">
        <SectionHead index="07" eyebrow={l.eyebrow} title={l.h2} lede={l.lede} />

        <div className="mt-16 space-y-3">
          {l.items.map((item, i) => {
            const flip = i % 2 === 1;
            const img = views[i % views.length];
            return (
              <Reveal key={item.id} variant="rise" delay={i * 70}>
                <article className="pane pane-lift group grid items-stretch gap-0 lg:grid-cols-2">
                  <div className={`stage relative aspect-[16/10] lg:aspect-auto ${flip ? 'lg:order-2' : ''}`}>
                    <div className="relative z-10 flex h-full items-center justify-center p-8">
                      <img
                        src={img.src}
                        alt={img.cap}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-contain transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                        style={{ filter: 'drop-shadow(0 20px 34px rgba(11,14,18,.14))' }}
                      />
                    </div>
                  </div>

                  <div className={`flex flex-col justify-center p-7 sm:p-10 ${flip ? 'lg:order-1' : ''}`}>
                    <div className="flex items-baseline gap-3">
                      <span className="t-num" style={{ fontSize: 11, letterSpacing: '.16em', color: 'var(--accent)' }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="t-note">{item.name}</span>
                    </div>
                    <h3 className="t-h2 mt-4">{item.nameKo}</h3>
                    <p className="t-sm mt-4 max-w-[420px] text-pretty ink-2">{item.desc}</p>

                    <ul className="mt-7" style={{ borderTop: '1px solid var(--line-soft)' }}>
                      {item.specs.map((s, j) => (
                        <li
                          key={s}
                          className="t-sm flex items-baseline justify-between gap-4 py-3 ink-2"
                          style={{ borderBottom: j === item.specs.length - 1 ? 'none' : '1px solid var(--line-soft)' }}
                        >
                          <span>{s}</span>
                          <span className="t-num shrink-0" style={{ fontSize: 11, color: 'var(--ink-4)' }}>
                            {String(j + 1).padStart(2, '0')}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal variant="fade" delay={280}>
          <div className="mt-10">
            <a href={localePath(locale, '/products/')} className="btn btn-quiet">
              {t.pages.products.galleryH2} <span aria-hidden="true">→</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────── 지표 ─────────────────────────── */
/* 큰 숫자 + 치수선 — 도면의 실측값처럼 */

export function Stats() {
  const { t } = useLocale();
  return (
    <section
      style={{ background: 'var(--ink)', paddingBlock: 'clamp(3.5rem, 7vw, 6.5rem)' }}
      aria-label={t.stats.eyebrow}
    >
      <div className="shell">
        <Reveal variant="fade">
          <div className="flex items-center gap-3">
            <span className="h-px w-8" style={{ background: 'var(--accent-on-dark)' }} />
            <p className="t-note" style={{ color: 'rgba(255,255,255,.62)' }}>
              {t.stats.eyebrow}
            </p>
          </div>
        </Reveal>

        <dl className="mt-12 grid grid-cols-2 gap-y-12 sm:gap-x-8 lg:grid-cols-4">
          {t.stats.items.map((s, i) => (
            <Reveal key={s.k} variant="rise" delay={i * 80}>
              <div className="relative pl-6" style={{ borderLeft: '1px solid rgba(255,255,255,.16)' }}>
                <span
                  className="absolute left-0 top-0 h-8 w-px"
                  style={{ background: 'var(--accent-on-dark)' }}
                  aria-hidden="true"
                />
                <dt className="t-note" style={{ color: 'rgba(255,255,255,.66)' }}>
                  {s.k}
                </dt>
                <dd
                  className="t-num mt-4 leading-none"
                  style={{
                    fontSize: 'clamp(1.75rem, 3.4vw, 2.75rem)',
                    fontWeight: 700,
                    letterSpacing: '-0.03em',
                    color: '#fff',
                  }}
                >
                  {s.v}
                </dd>
                <dd className="t-sm mt-3.5" style={{ color: 'rgba(255,255,255,.68)' }}>
                  {s.d}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>

        <Reveal variant="fade" delay={360}>
          <p className="t-sm mt-12" style={{ color: 'rgba(255,255,255,.58)' }}>
            {t.stats.note}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────── 시작 안내 ─────────────────────────── */

export function HowToStart() {
  const { t, locale } = useLocale();
  const h = t.howToStart;

  return (
    <section style={{ paddingBlock: 'var(--section-y)' }}>
      <div className="shell">
        <SectionHead index="08" eyebrow={h.eyebrow} title={h.h2} align="center" />

        <div className="mx-auto mt-16 grid max-w-[1000px] gap-3 sm:grid-cols-3">
          {h.items.map((it, i) => (
            <Reveal key={it.k} variant="rise" delay={i * 90}>
              <div className="pane pane-lift relative flex h-full flex-col items-start p-7">
                <span
                  className="t-num flex h-8 w-8 items-center justify-center text-[0.6875rem] font-bold text-white"
                  style={{ background: 'var(--accent)', borderRadius: 2 }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="t-h3 mt-5">{it.k}</p>
                <p className="t-sm mt-3 text-pretty ink-2">{it.d}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal variant="rise" delay={300}>
          <div className="mx-auto mt-12 max-w-[620px] text-center">
            <p className="t-sm text-pretty ink-3">{h.note}</p>
            <a href={localePath(locale, '/contact/')} className="btn btn-solid mt-8">
              {h.cta} <span aria-hidden="true">→</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────── 범위 고지 ─────────────────────────── */

export function ScopeNotice() {
  const { t } = useLocale();
  const s = t.scope;

  return (
    <section style={{ paddingBottom: 'var(--section-y)' }}>
      <div className="shell">
        <Reveal variant="rise">
          <div className="pane p-8 sm:p-11">
            <div className="flex items-center gap-3">
              <span className="h-px w-8" style={{ background: 'var(--accent)' }} />
              <h2 className="t-note" id="scope-title" style={{ color: 'var(--ink-2)' }}>
                {s.title}
              </h2>
            </div>

            <div className="mt-9 grid gap-9 sm:grid-cols-2 sm:gap-12">
              <div>
                <p className="text-[0.9375rem] font-semibold ink">{s.inTitle}</p>
                <p className="t-sm mt-3 text-pretty ink-2">{s.inBody}</p>
              </div>
              <div className="sm:pl-12" style={{ borderLeft: '1px solid var(--line-soft)' }}>
                <p className="text-[0.9375rem] font-semibold ink">{s.outTitle}</p>
                <p className="t-sm mt-3 text-pretty ink-2">{s.outBody}</p>
              </div>
            </div>

            <p className="t-sm mt-9 pt-7 ink-3" style={{ borderTop: '1px solid var(--line-soft)' }}>
              {s.footer}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────── FAQ ─────────────────────────── */
/* 2단: 좌측 고정 제목 + 우측 아코디언 (긴 목록에서 스크롤 부담을 줄임) */

export function Faq() {
  const { t } = useLocale();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      style={{ background: 'var(--surface)', borderTop: '1px solid var(--line)', paddingBlock: 'var(--section-y)' }}
    >
      <div className="shell grid gap-12 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.6fr)] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHead index="09" eyebrow={t.faq.eyebrow} title={t.faq.h2} scale="minor" />
        </div>

        <div className="lg:-mt-2">
          {t.faq.items.map((it, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={it.q} variant="rise" delay={i * 40}>
                <div style={{ borderBottom: '1px solid var(--line-soft)' }}>
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-start justify-between gap-6 py-5 text-left transition-colors duration-300"
                    >
                      <span
                        className="text-[0.9375rem] font-semibold transition-colors duration-300"
                        style={{ color: isOpen ? 'var(--accent)' : 'var(--ink)' }}
                      >
                        {it.q}
                      </span>
                      <span className="relative mt-1.5 h-3 w-3 shrink-0" aria-hidden="true">
                        <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2" style={{ background: 'var(--ink-3)' }} />
                        <span
                          className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 transition-transform duration-400"
                          style={{
                            background: 'var(--ink-3)',
                            transform: isOpen ? 'scaleY(0)' : 'scaleY(1)',
                          }}
                        />
                      </span>
                    </button>
                  </h3>
                  <div
                    className="grid overflow-hidden transition-all duration-500"
                    style={{
                      gridTemplateRows: isOpen ? '1fr' : '0fr',
                      opacity: isOpen ? 1 : 0,
                      transitionTimingFunction: 'var(--ease-out)',
                    }}
                  >
                    <div className="min-h-0">
                      <p className="t-sm max-w-[680px] pb-6 text-pretty ink-2">{it.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── CTA ─────────────────────────── */

export function CtaBand() {
  const { t, locale } = useLocale();
  const c = t.cta;

  return (
    <section style={{ paddingBlock: 'var(--section-y)' }}>
      <div className="shell">
        <Reveal variant="unmask">
          <div
            className="tex tex-silicone relative overflow-hidden p-9 sm:p-14"
            style={{ border: '1px solid var(--line)', borderRadius: 2 }}
          >
            <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.9fr)] lg:gap-16">
              <div>
                <div className="flex items-center gap-3">
                  <span className="h-px w-8" style={{ background: 'var(--accent)' }} />
                  <p className="t-note" style={{ color: 'var(--accent)' }}>
                    {c.eyebrow}
                  </p>
                </div>
                <h2 className="t-h1 mt-5">
                  {c.h2Line1}
                  <br />
                  {c.h2Line2}
                </h2>
                <p className="t-lead mt-6 max-w-[460px] text-pretty">{c.body}</p>
              </div>

              <div className="flex flex-col gap-3">
                <a href={localePath(locale, '/contact/')} className="btn btn-solid w-full">
                  {c.primary}
                </a>
                <a href={localePath(locale, '/capabilities/')} className="btn btn-line w-full">
                  {c.secondary}
                </a>
                <p className="t-note mt-1.5 text-center">{c.note}</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────── 마퀴 (홈 전용) ─────────────────────────── */

export function KeywordBand() {
  const { t } = useLocale();
  const items = [
    ...t.capabilities.items.map((c) => c.titleEn.toUpperCase()),
    'LSR INJECTION MOLDING',
    'TWO-SHOT MOLDING',
    'IN-HOUSE MOLD MAKING',
    'OEM · ODM',
    'PILOT RUN → MASS PRODUCTION',
  ];
  return <Marquee items={items} />;
}
