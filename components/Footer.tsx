'use client';

import { BRAND_FIXED } from '@/content/brand';
import { localePath } from '@/lib/i18n';
import { useLocale } from './LocaleProvider';
import { Reveal } from './primitives';

const LEGAL_SLUGS = ['terms', 'privacy', 'youth', 'quality', 'ip'] as const;

export default function Footer() {
  const { locale, t } = useLocale();
  const year = new Date().getFullYear();
  const l = BRAND_FIXED.legal;

  const bizValue: Record<string, string> = {
    companyKo: l.companyKo,
    companyEn: l.companyEn,
    ceo: l.ceo,
    bizNo: l.bizNo,
    address: l.address,
    addressOffice: l.addressOffice,
    email: BRAND_FIXED.email,
    emailTech: BRAND_FIXED.emailTech,
    tel: l.tel,
    hours: t.brand.hours,
  };

  return (
    <footer style={{ background: 'var(--surface)', borderTop: '1px solid var(--line)' }}>
      <div className="shell py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1.15fr] lg:gap-10">
          {/* 회사 개요 */}
          <div>
            <p className="font-bold ink" style={{ fontSize: 18, letterSpacing: '.26em' }}>
              {BRAND_FIXED.name}
            </p>
            <p className="t-sm mt-5 max-w-[330px] text-pretty ink-3">{t.brand.description}</p>

            <div
              className="mt-7 inline-flex items-center gap-2.5 px-3.5 py-2.5"
              style={{ background: 'var(--sunk)', borderRadius: 2 }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
              <span className="t-sm font-medium ink-2">{t.brand.role}</span>
            </div>
          </div>

          <nav aria-label={t.footer.menuLabel}>
            <h3 className="t-note">{t.footer.menuLabel}</h3>
            <ul className="mt-6 space-y-3.5">
              {t.nav.map((n) => (
                <li key={n.href}>
                  <a
                    href={localePath(locale, n.href)}
                    className="link-draw foot-link t-sm ink-2 transition-colors duration-300 hover:ink"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t.footer.policyLabel}>
            <h3 className="t-note">{t.footer.policyLabel}</h3>
            <ul className="mt-6 space-y-3.5">
              {LEGAL_SLUGS.map((s) => (
                <li key={s}>
                  <a
                    href={localePath(locale, `/legal/${s}/`)}
                    className="link-draw foot-link t-sm ink-2 transition-colors duration-300 hover:ink"
                  >
                    {t.legal.docs[s].title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="t-note">{t.footer.contactLabel}</h3>
            <ul className="mt-6 space-y-5">
              <li>
                <span className="t-note block">{t.pages.contact.salesLabel}</span>
                <a
                  href={`mailto:${BRAND_FIXED.email}`}
                  className="link-draw foot-link t-sm mt-1.5 font-medium ink-2 hover:ink"
                >
                  {BRAND_FIXED.email}
                </a>
              </li>
              <li>
                <span className="t-note block">{t.pages.contact.techLabel}</span>
                <a
                  href={`mailto:${BRAND_FIXED.emailTech}`}
                  className="link-draw foot-link t-sm mt-1.5 font-medium ink-2 hover:ink"
                >
                  {BRAND_FIXED.emailTech}
                </a>
              </li>
              <li>
                <span className="t-note block">{t.pages.contact.telLabel}</span>
                <span className="t-sm t-num mt-1.5 block ink-2">{l.tel}</span>
              </li>
              <li>
                <span className="t-note block">{t.pages.contact.hoursLabel}</span>
                <span className="t-sm mt-1.5 block ink-3">{t.brand.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* 법정 고지 */}
        <Reveal variant="fade">
          <div className="mt-16 pt-8" style={{ borderTop: '1px solid var(--line)' }}>
            <dl className="grid gap-x-10 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
              {t.footer.bizRows.map(([label, key]) => (
                <div key={label} className="flex gap-3">
                  <dt className="t-note shrink-0 pt-[3px]">{label}</dt>
                  <dd className="t-sm ink-2">{bizValue[key] ?? key}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-9 rounded-sm p-5" style={{ background: 'var(--sunk)' }}>
              <p className="t-sm text-pretty ink-3">
                <strong className="font-semibold ink">{t.footer.scopeTitle}.</strong>{' '}
                {t.footer.serviceNote}
              </p>
            </div>

            <div className="mt-9 flex flex-col gap-3 pt-7 sm:flex-row sm:items-center sm:justify-between">
              <p className="t-note">
                © {year} {BRAND_FIXED.name}. {t.footer.rights}
              </p>
              <p className="t-note">
                {t.footer.tagline} · SINCE {BRAND_FIXED.since}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
