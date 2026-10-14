import type { Metadata } from 'next';
import { alternatesFor, localePath } from '@/lib/i18n';
import { getDictionary } from '@/content/dictionaries';
import { PageFooterCta, PageHead, Reveal, SectionHead } from '@/components/primitives';
import { BRAND_FIXED } from '@/content/brand';

export function generateMetadata(): Metadata {
  const t = getDictionary('ko').pages.about;
  const alt = alternatesFor('/about/', 'ko');
  return { title: t.title, description: t.description, alternates: { canonical: alt.canonical, languages: alt.languages } };
}

export default function AboutPage() {
  const locale = 'ko' as const;
  const t = getDictionary(locale);
  const p = t.pages.about;
  const L = (path: string) => localePath(locale, path);
  const l = BRAND_FIXED.legal;

  return (
    <div className="shell pb-24">
      <PageHead
        sheet="05"
        path="IUYU / ABOUT"
        eyebrow="ABOUT"
        title={
          <>
            {p.h1Line1}
            <br />
            {p.h1Line2}
          </>
        }
        lede={t.brand.description}
        meta={[
          { k: 'SCOPE', v: 'SILICONE ACCESSORIES' },
        ]}
      />

      {/* 서술 + 사실 패널 */}
      <section className="grid gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-20">
        <div className="space-y-7">
          {p.paragraphs.map((para, i) => (
            <Reveal key={i} variant="rise" delay={i * 80}>
              <p className="t-body text-pretty ink-2" style={{ maxWidth: '62ch' }}>{para}</p>
            </Reveal>
          ))}
        </div>

        <div className="space-y-3">
          <Reveal variant="rise" delay={80}>
            <div className="pane p-7">
              <p className="t-note">{p.scopeLabel}</p>
              <p className="t-h3 mt-4">{t.brand.role}</p>
              <p className="t-sm mt-3.5 text-pretty ink-2">{p.scopeBody}</p>
            </div>
          </Reveal>

          <Reveal variant="rise" delay={140}>
            <div className="pane p-7">
              <p className="t-note">{p.capLabel}</p>
              <ul className="mt-5">
                {t.capabilities.items.map((c, j) => (
                  <li
                    key={c.id}
                    className="flex items-baseline gap-4 py-3"
                    style={{ borderBottom: j === t.capabilities.items.length - 1 ? 'none' : '1px solid var(--line-soft)' }}
                  >
                    <span className="t-num shrink-0" style={{ fontSize: 11, color: 'var(--accent)' }}>{c.no}</span>
                    <span className="text-[0.875rem] font-medium ink">{c.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

        </div>
      </section>

      {/* 지표 — 어두운 밴드 */}
      <Reveal variant="fade">
        <div className="mt-24 px-8 py-12 sm:px-12" style={{ background: 'var(--ink)', borderRadius: 2 }}>
          <div className="flex items-center gap-3">
            <span className="h-px w-8" style={{ background: 'var(--accent-on-dark)' }} />
            <p className="t-note" style={{ color: 'rgba(255,255,255,.62)' }}>{t.stats.eyebrow}</p>
          </div>
          <dl className="mt-10 grid grid-cols-2 gap-y-10 sm:gap-x-8 lg:grid-cols-4">
            {t.stats.items.map((st, i) => (
              <div key={st.k} className="pl-5" style={{ borderLeft: '1px solid rgba(255,255,255,.16)' }}>
                <dt className="t-note" style={{ color: 'rgba(255,255,255,.66)' }}>{st.k}</dt>
                <dd className="t-num mt-3.5 leading-none"
                    style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.25rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#fff' }}>
                  {st.v}
                </dd>
                <dd className="t-sm mt-3" style={{ color: 'rgba(255,255,255,.68)' }}>{st.d}</dd>
              </div>
            ))}
          </dl>
          <p className="t-sm mt-10" style={{ color: 'rgba(255,255,255,.58)' }}>{t.stats.note}</p>
        </div>
      </Reveal>

      {/* 설비 */}
      <section className="mt-24">
        <SectionHead index="A" eyebrow={t.equipment.eyebrow} title={t.equipment.h2} scale="minor" />
        <div className="mt-10 grid gap-px sm:grid-cols-2 lg:grid-cols-4" style={{ background: 'var(--line-soft)' }}>
          {t.equipment.items.map((e, i) => (
            <Reveal key={e.k} variant="rise" delay={i * 60}>
              <div className="h-full bg-surface p-6">
                <p className="t-note">{e.k}</p>
                <p className="t-num mt-4 leading-none ink"
                   style={{ fontSize: 'clamp(1.6rem, 2.6vw, 2.25rem)', fontWeight: 700, letterSpacing: '-0.02em' }}>
                  {e.v}
                </p>
                <p className="t-sm mt-3 ink-3">{e.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <PageFooterCta
        primaryLabel={t.cta.primary}
        primaryHref={L('/contact/')}
        secondaryLabel={t.hero.ctaSecondary}
        secondaryHref={L('/capabilities/')}
      />
    </div>
  );
}
