import type { Metadata } from 'next';
import { alternatesFor, localePath } from '@/lib/i18n';
import { getDictionary } from '@/content/dictionaries';
import { BRAND_FIXED } from '@/content/brand';
import InquiryForm from '@/components/InquiryForm';
import { PageHead, Reveal, SectionHead } from '@/components/primitives';

export function generateMetadata(): Metadata {
  const t = getDictionary('ko').pages.contact;
  const alt = alternatesFor('/contact/', 'ko');
  return { title: t.title, description: t.description, alternates: { canonical: alt.canonical, languages: alt.languages } };
}

export default function ContactPage() {
  const locale = 'ko' as const;
  const t = getDictionary(locale);
  const p = t.pages.contact;
  const L = (path: string) => localePath(locale, path);

  return (
    <div className="shell pb-24">
      <PageHead
        sheet="06"
        path="IUYU / CONTACT"
        eyebrow="CONTACT"
        title={
          <>
            {p.h1Line1}
            <br />
            {p.h1Line2}
          </>
        }
        lede={p.lede}
        meta={[
          { k: 'REPLY', v: '1–2 BUSINESS DAYS' },
          { k: 'LANGUAGES', v: 'KO · EN · ZH' },
        ]}
      />

      <div className="grid gap-14 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-20">
        <section aria-labelledby="form-title">
          <Reveal variant="fade">
            <div className="flex items-baseline justify-between gap-6 pb-5" style={{ borderBottom: '1px solid var(--line)' }}>
              <h2 id="form-title" className="t-h3">{p.formH2}</h2>
              <span className="t-note">* REQUIRED</span>
            </div>
          </Reveal>
          <Reveal variant="rise" delay={80}>
            <div className="mt-9">
              <InquiryForm />
            </div>
          </Reveal>
        </section>

        <aside className="space-y-3">
          <Reveal variant="rise" delay={120}>
            <div className="pane p-7">
              <p className="t-note">{p.directLabel}</p>
              <dl className="mt-6 space-y-6">
                <div>
                  <dt className="t-note">{p.salesLabel}</dt>
                  <dd className="mt-2">
                    <a href={`mailto:${BRAND_FIXED.email}`} className="link-draw foot-link t-sm font-medium ink">
                      {BRAND_FIXED.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="t-note">{p.techLabel}</dt>
                  <dd className="mt-2">
                    <a href={`mailto:${BRAND_FIXED.emailTech}`} className="link-draw foot-link t-sm font-medium ink">
                      {BRAND_FIXED.emailTech}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="t-note">{p.telLabel}</dt>
                  <dd className="t-num mt-2 text-[0.875rem] ink-2">{BRAND_FIXED.legal.tel}</dd>
                </div>
                <div>
                  <dt className="t-note">{p.hoursLabel}</dt>
                  <dd className="t-sm mt-2 ink-3">{t.brand.hours}</dd>
                </div>
              </dl>
            </div>
          </Reveal>

          <Reveal variant="rise" delay={170}>
            <div className="tex tex-silicone relative overflow-hidden p-7" style={{ border: '1px solid var(--line)', borderRadius: 2 }}>
              <div className="relative z-10">
                <p className="t-note">{p.prepLabel}</p>
                <ol className="mt-6 space-y-5">
                  {t.howToStart.items.map((it, i) => (
                    <li key={it.k} className="flex gap-4">
                      <span className="t-num mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center text-[0.6875rem] font-bold text-white"
                            style={{ background: 'var(--accent)', borderRadius: 2 }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <p className="text-[0.875rem] font-semibold ink">{it.k}</p>
                        <p className="t-sm mt-1.5 ink-2">{it.d}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </Reveal>

          <Reveal variant="rise" delay={220}>
            <div className="pane p-7">
              <p className="t-note">{p.replyLabel}</p>
              <p className="t-sm mt-3.5 text-pretty ink-2">{p.replyBody}</p>
            </div>
          </Reveal>

          <Reveal variant="rise" delay={260}>
            <div className="p-6" style={{ background: 'var(--sunk)', borderRadius: 2 }}>
              <p className="t-note">{p.scopeLabel}</p>
              <p className="t-sm mt-3 text-pretty ink-3">{p.scopeBody}</p>
            </div>
          </Reveal>
        </aside>
      </div>

      {/* FAQ */}
      <section className="mt-24">
        <SectionHead index="A" eyebrow={t.faq.eyebrow} title={t.faq.h2} scale="minor" />
        <dl className="mt-10">
          {t.faq.items.map((it, i) => (
            <Reveal key={it.q} variant="rise" delay={i * 35}>
              <div className="grid gap-x-10 gap-y-3 py-6 sm:grid-cols-[minmax(0,0.85fr)_minmax(0,1.5fr)]"
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
