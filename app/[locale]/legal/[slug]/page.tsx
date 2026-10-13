import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { alternatesFor, localePath, LOCALES, DEFAULT_LOCALE, type Locale } from '@/lib/i18n';
import { getDictionary } from '@/content/dictionaries';
import { BRAND_FIXED } from '@/content/brand';
import { Reveal } from '@/components/primitives';

const SLUGS = ['terms', 'privacy', 'youth', 'quality', 'ip'] as const;
type Slug = (typeof SLUGS)[number];

export function generateStaticParams() {
  return LOCALES.filter((l) => l !== DEFAULT_LOCALE).flatMap((locale) =>
    SLUGS.map((slug) => ({ locale, slug })),
  );
}

export function generateMetadata({
  params,
}: {
  params: { locale: Locale; slug: string };
}): Metadata {
  const t = getDictionary(params.locale);
  const doc = t.legal.docs[params.slug as Slug];
  if (!doc) return {};
  const alt = alternatesFor(`/legal/${params.slug}/`, params.locale);
  return {
    title: doc.title,
    description: doc.desc,
    alternates: { canonical: alt.canonical, languages: alt.languages },
  };
}

/** 정책 본문 — 언어별. 실제 배포 전 법무 검토를 거치세요. */
import { LEGAL_BODIES } from '@/content/legal-bodies';

export default function LegalPage({
  params,
}: {
  params: { locale: Locale; slug: string };
}) {
  const slug = params.slug as Slug;
  const t = getDictionary(params.locale);
  const doc = t.legal.docs[slug];
  const body = LEGAL_BODIES[params.locale][slug];
  if (!doc || !body) notFound();

  const L = (path: string) => localePath(params.locale, path);
  const others = SLUGS.filter((s) => s !== slug);

  return (
    <div className="shell pb-24">
      <nav aria-label={t.common.ariaBreadcrumb} className="pt-10 sm:pt-14">
        <ol className="flex items-center gap-2.5 t-note">
          <li>
            <a href={L('/')} className="link-draw foot-link" style={{ color: 'var(--ink-3)' }}>
              {t.common.home}
            </a>
          </li>
          <li aria-hidden="true" style={{ color: 'var(--ink-4)' }}>/</li>
          <li style={{ color: 'var(--ink-2)' }}>{doc.title}</li>
        </ol>
      </nav>

      <div className="mt-10 grid gap-14 lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-20">
        <article className="max-w-[720px]">
          <Reveal variant="fade">
            <p className="t-note" style={{ color: 'var(--accent)' }}>{t.legal.eyebrow}</p>
          </Reveal>
          <Reveal variant="unmask" delay={80}>
            <h1 className="t-h1 mt-5">{doc.title}</h1>
          </Reveal>
          <Reveal variant="rise" delay={200}>
            <p className="t-lead mt-6 text-pretty">{doc.desc}</p>
          </Reveal>
          <Reveal variant="fade" delay={260}>
            <p className="t-num mt-4" style={{ fontSize: 11, letterSpacing: '.1em', color: 'var(--ink-4)' }}>
              {t.legal.updatedLabel} {body.updated}
            </p>
          </Reveal>

          <div className="mt-12 hairline" />

          <div className="mt-12 space-y-12">
            {body.sections.map((sec, i) => (
              <Reveal key={sec.h} variant="rise" delay={Math.min(i * 40, 200)}>
                <section>
                  <div className="flex items-baseline gap-4">
                    <span className="t-num shrink-0" style={{ fontSize: 11, color: 'var(--accent)' }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h2 className="t-h3">{sec.h}</h2>
                  </div>
                  <div className="mt-4 space-y-3 pl-0 sm:pl-7">
                    {sec.p.map((para, j) => (
                      <p key={j} className="t-body text-pretty ink-2" style={{ maxWidth: '68ch' }}>{para}</p>
                    ))}
                  </div>
                </section>
              </Reveal>
            ))}
          </div>

          <div className="mt-16 p-6" style={{ background: 'var(--sunk)', borderRadius: 2 }}>
            <p className="t-sm text-pretty ink-3">
              {t.legal.reviewerNote} {BRAND_FIXED.email}
            </p>
          </div>
        </article>

        <aside aria-label={t.legal.otherDocsLabel} className="lg:sticky lg:top-28 lg:self-start">
          <p className="t-note">{t.legal.otherDocsLabel}</p>
          <ul className="mt-6">
            {others.map((o, i) => (
              <li key={o} style={{ borderBottom: i === others.length - 1 ? 'none' : '1px solid var(--line-soft)' }}>
                <a
                  href={L(`/legal/${o}/`)}
                  className="t-sm block py-3.5 transition-colors duration-300 hover:accent ink-2"
                >
                  {t.legal.docs[o].title}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-10 p-5" style={{ background: 'var(--sunk)', borderRadius: 2 }}>
            <p className="t-note">{t.legal.scopeLabel}</p>
            <p className="t-sm mt-3 text-pretty ink-3">{t.legal.scopeBody}</p>
          </div>

          <a href={L('/contact/')} className="btn btn-line mt-6 w-full !py-2.5 !text-[0.75rem]">
            {t.legal.cta}
          </a>
        </aside>
      </div>
    </div>
  );
}
