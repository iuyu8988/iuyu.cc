import type { Metadata } from 'next';
import { alternatesFor, localePath, type Locale } from '@/lib/i18n';
import { getDictionary } from '@/content/dictionaries';
import { PageFooterCta, PageHead, Reveal, SectionHead } from '@/components/primitives';

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const t = getDictionary(params.locale).pages.capabilities;
  const alt = alternatesFor('/capabilities/', params.locale);
  return {
    title: t.title,
    description: t.description,
    alternates: { canonical: alt.canonical, languages: alt.languages },
  };
}

export default function CapabilitiesPage({ params }: { params: { locale: Locale } }) {
  const { locale } = params;
  const t = getDictionary(locale);
  const p = t.pages.capabilities;
  const L = (path: string) => localePath(locale, path);

  return (
    <div className="shell pb-24">
      <PageHead
        sheet="02"
        path="IUYU / CAPABILITIES"
        eyebrow={t.capabilities.eyebrow}
        title={
          <>
            {p.h1Line1}
            <br />
            {p.h1Line2}
          </>
        }
        lede={p.lede}
        meta={[
          { k: 'PROCESSES', v: '04' },
          { k: 'IN-HOUSE', v: 'DESIGN · MOLD · INJECTION' },
        ]}
      />

      {/* 역량 상세 — 좌: 서술 / 우: 항목 리스트 (교차 배치) */}
      <section className="mt-4 space-y-3">
        {t.capabilities.items.map((c, i) => {
          const flip = i % 2 === 1;
          return (
            <Reveal key={c.id} variant="rise" delay={i * 60}>
              <article className="pane grid gap-0 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
                <div className={`p-8 sm:p-11 ${flip ? 'lg:order-2' : ''}`}>
                  <div className="flex items-center gap-4">
                    <span
                      className="t-num flex h-9 w-9 items-center justify-center text-[0.75rem] font-bold text-white"
                      style={{ background: 'var(--accent)', borderRadius: 2 }}
                    >
                      {c.no}
                    </span>
                    <span className="t-note">{c.titleEn}</span>
                  </div>
                  <h2 className="t-h2 mt-6">{c.title}</h2>
                  <p className="mt-5 font-semibold accent" style={{ fontSize: '0.9375rem', lineHeight: 1.65 }}>
                    {c.lead}
                  </p>
                  <p className="t-body mt-4 max-w-[560px] text-pretty ink-2">{c.body}</p>
                </div>

                <ul
                  className={`flex flex-col justify-center p-8 sm:p-11 ${flip ? 'lg:order-1' : ''}`}
                  style={{
                    background: 'var(--sunk)',
                    borderLeft: flip ? 'none' : '1px solid var(--line)',
                    borderRight: flip ? '1px solid var(--line)' : 'none',
                  }}
                >
                  {c.points.map((pt, j) => (
                    <li
                      key={pt}
                      className="t-sm flex items-baseline gap-4 py-3.5 ink-2"
                      style={{ borderBottom: j === c.points.length - 1 ? 'none' : '1px solid var(--line)' }}
                    >
                      <span className="t-num shrink-0" style={{ fontSize: 11, color: 'var(--accent)' }}>
                        {String(j + 1).padStart(2, '0')}
                      </span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          );
        })}
      </section>

      {/* 소재 등급표 */}
      <section className="mt-24">
        <SectionHead index="A" eyebrow={t.materials.eyebrow} title={t.materials.h2} lede={t.materials.lede} scale="minor" />
        <Reveal variant="rise" delay={120}>
          <div className="mt-10 overflow-hidden" style={{ border: '1px solid var(--line)', borderRadius: 2 }}>
            <table className="spec" style={{ background: 'var(--surface)' }}>
              <caption className="sr-only">{t.materials.h2}</caption>
              <thead style={{ background: 'var(--sunk)' }}>
                <tr>
                  {p.materialTableHead.map((h) => (
                    <th key={h} scope="col">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {t.materials.grades.map((g) => (
                  <tr key={g.k}>
                    <th scope="row">
                      <span
                        className="t-num inline-block px-2 py-1 text-[0.6875rem] font-bold text-white"
                        style={{ background: 'var(--accent)', borderRadius: 1 }}
                      >
                        {g.k}
                      </span>
                    </th>
                    <td>
                      {g.v}
                      <span className="t-num mt-1.5 block" style={{ fontSize: 11, color: 'var(--ink-3)' }}>
                        {g.temp}
                      </span>
                    </td>
                    <td>{g.d}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </section>

      {/* 설비 + 품질 */}
      <section className="mt-24 grid gap-16 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHead index="B" eyebrow={t.equipment.eyebrow} title={t.equipment.h2} lede={t.equipment.lede} scale="minor" />
          <div className="mt-10 grid grid-cols-2 gap-px" style={{ background: 'var(--line-soft)' }}>
            {t.equipment.items.map((e, i) => (
              <Reveal key={e.k} variant="rise" delay={i * 60}>
                <div className="h-full bg-surface p-6">
                  <p className="t-note">{e.k}</p>
                  <p
                    className="t-num mt-4 leading-none ink"
                    style={{ fontSize: 'clamp(1.6rem, 2.6vw, 2.25rem)', fontWeight: 700, letterSpacing: '-0.02em' }}
                  >
                    {e.v}
                  </p>
                  <p className="t-sm mt-3 ink-3">{e.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div>
          <SectionHead index="C" eyebrow={t.qa.eyebrow} title={t.qa.h2} lede={t.qa.lede} scale="minor" />
          <ul className="mt-10">
            {t.qa.checks.map((c, i) => (
              <Reveal key={c.k} variant="rise" delay={i * 50}>
                <li
                  className="flex items-baseline gap-5 py-4"
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
        </div>
      </section>

      {/* 인증 */}
      <Reveal variant="rise">
        <div className="mt-16 p-8 sm:p-10" style={{ background: 'var(--sunk)', borderRadius: 2 }}>
          <p className="t-note">{t.qa.certsTitle}</p>
          <ul className="mt-6 grid gap-x-10 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {t.qa.certs.map((c) => (
              <li key={c.k} className="t-sm flex items-baseline justify-between gap-4 py-2 ink-2"
                  style={{ borderBottom: '1px solid var(--line)' }}>
                <span className="font-medium ink">{c.k}</span>
                <span className="text-right ink-3">{c.v}</span>
              </li>
            ))}
          </ul>
          <p className="t-sm mt-6 text-pretty ink-3">{t.qa.certsNote}</p>
        </div>
      </Reveal>

      {/* 진행 순서 */}
      <section className="mt-24">
        <SectionHead index="D" eyebrow={t.process.eyebrow} title={p.processH2} scale="minor" />
        <ol className="mt-10 grid gap-px" style={{ background: 'var(--line-soft)' }}>
          {t.process.steps.map((s, i) => (
            <Reveal key={s.no} variant="rise" delay={i * 55}>
              <li className="grid items-baseline gap-x-8 gap-y-3 bg-surface p-6 sm:grid-cols-[auto_1fr_auto] sm:p-7">
                <span
                  className="t-num flex h-8 w-8 items-center justify-center text-[0.6875rem] font-bold text-white"
                  style={{ background: 'var(--accent)', borderRadius: 2 }}
                >
                  {s.no}
                </span>
                <div>
                  <p className="t-h3">{s.t}</p>
                  <p className="t-sm mt-2 text-pretty ink-2">{s.d}</p>
                </div>
                <div className="sm:text-right">
                  <p className="t-note">{p.durLabel}</p>
                  <p className="t-num mt-1.5 text-[0.9375rem] font-semibold ink">{s.dur}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      <PageFooterCta
        primaryLabel={p.ctaPrimary}
        primaryHref={L('/contact/')}
        secondaryLabel={p.ctaSecondary}
        secondaryHref={L('/oem/')}
      />
    </div>
  );
}
