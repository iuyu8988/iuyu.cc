import type { Metadata } from 'next';
import { alternatesFor, localePath, type Locale } from '@/lib/i18n';
import { getDictionary } from '@/content/dictionaries';
import { PageHead, Reveal, SectionHead } from '@/components/primitives';
import { FaqStructuredData } from '@/components/StructuredData';

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const t = getDictionary(params.locale).pages.oem;
  const alt = alternatesFor('/oem/', params.locale);
  return { title: t.title, description: t.description, alternates: { canonical: alt.canonical, languages: alt.languages } };
}

export default function OemPage({ params }: { params: { locale: Locale } }) {
  const { locale } = params;
  const t = getDictionary(locale);
  const p = t.pages.oem;
  const L = (path: string) => localePath(locale, path);

  return (
    <div className="shell pb-24">
      <FaqStructuredData locale={locale} />
      <PageHead
        sheet="04"
        path="IUYU / PROCESS"
        eyebrow={t.process.eyebrow}
        title={
          <>
            {p.h1Line1}
            <br />
            {p.h1Line2}
          </>
        }
        lede={p.lede}
        meta={[
          { k: 'STAGES', v: '05' },
          { k: 'LEAD TIME', v: '1–2 DAYS (FIRST REPLY)' },
        ]}
      />

      {/* 5단계 — 세로 도면 타임라인 */}
      <section className="relative">
        <div className="absolute bottom-0 left-[19px] top-0 w-px sm:left-[23px]" style={{ background: 'var(--line-soft)' }} aria-hidden="true" />
        <ol>
          {t.process.steps.map((st, i) => (
            <Reveal key={st.no} variant="rise" delay={i * 70}>
              <li className="relative flex gap-6 pb-3 sm:gap-8">
                <span
                  className="relative z-10 mt-6 flex h-10 w-10 shrink-0 items-center justify-center text-[0.75rem] font-bold sm:h-12 sm:w-12"
                  style={{ background: 'var(--accent)', color: '#fff', borderRadius: 2 }}
                >
                  <span className="t-num">{st.no}</span>
                </span>
                <div className="flex-1 pane p-6 sm:p-8">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                    <h2 className="t-h3">{st.t}</h2>
                    <span className="t-num" style={{ fontSize: 11, letterSpacing: '.1em', color: 'var(--accent)' }}>
                      {p.durLabel} {st.dur}
                    </span>
                  </div>
                  <p className="t-sm mt-3 max-w-[620px] text-pretty ink-2">{st.d}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
        <Reveal variant="fade">
          <p className="t-sm mt-6 pl-16 text-pretty ink-3 sm:pl-20">{p.stepsNote}</p>
        </Reveal>
      </section>

      {/* 시작 자료 */}
      <section className="mt-24">
        <div className="tex tex-silicone relative overflow-hidden p-8 sm:p-12" style={{ border: '1px solid var(--line)', borderRadius: 2 }}>
          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <span className="h-px w-8" style={{ background: 'var(--accent)' }} />
              <p className="t-note" style={{ color: 'var(--accent)' }}>{t.howToStart.eyebrow}</p>
            </div>
            <h2 className="t-h2 mt-5">{t.howToStart.h2}</h2>

            <div className="mt-10 grid gap-px sm:grid-cols-3" style={{ background: 'var(--line-soft)' }}>
              {t.howToStart.items.map((it, i) => (
                <div key={it.k} className="bg-surface p-6">
                  <span className="t-num" style={{ fontSize: 11, letterSpacing: '.16em', color: 'var(--accent)' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="t-h3 mt-4">{it.k}</p>
                  <p className="t-sm mt-2.5 ink-2">{it.d}</p>
                </div>
              ))}
            </div>

            <p className="t-sm mt-7 max-w-[640px] text-pretty ink-2">{t.howToStart.note}</p>
            <a href={L('/contact/')} className="btn btn-solid mt-8">
              {t.howToStart.cta} <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* 계약 조건 */}
      <section className="mt-24">
        <SectionHead index="A" eyebrow="CONTRACT" title={p.contractH2} scale="minor" />
        <div className="mt-10 grid gap-px sm:grid-cols-2" style={{ background: 'var(--line-soft)' }}>
          {p.contracts.map((c, i) => (
            <Reveal key={c.k} variant="rise" delay={i * 55}>
              <div className="h-full bg-surface p-6 sm:p-7">
                <div className="flex items-baseline gap-3">
                  <span className="t-num" style={{ fontSize: 11, color: 'var(--accent)' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-[0.9375rem] font-semibold ink">{c.k}</p>
                </div>
                <p className="t-sm mt-3 text-pretty ink-2">{c.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal variant="fade">
          <div className="mt-8">
            <a href={L('/legal/ip/')} className="btn btn-quiet">
              {p.ipLink} <span aria-hidden="true">→</span>
            </a>
          </div>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="mt-24">
        <SectionHead index="B" eyebrow={t.faq.eyebrow} title={t.faq.h2} scale="minor" />
        <dl className="mt-10">
          {t.faq.items.map((it, i) => (
            <Reveal key={it.q} variant="rise" delay={i * 35}>
              <div className="grid gap-x-10 gap-y-3 py-6 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.5fr)]"
                   style={{ borderBottom: '1px solid var(--line-soft)' }}>
                <dt className="text-[0.9375rem] font-semibold ink">{it.q}</dt>
                <dd className="t-sm text-pretty ink-2">{it.a}</dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </section>
    </div>
  );
}
