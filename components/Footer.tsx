'use client';

import { BRAND_FIXED, whatsappLink } from '@/content/brand';
import { localePath } from '@/lib/i18n';
import { useLocale } from './LocaleProvider';
import SocialLinks from './SocialLinks';
import { Reveal } from './primitives';

const LEGAL_SLUGS = ['terms', 'privacy', 'youth', 'quality', 'ip'] as const;

export default function Footer() {
  const { locale, t } = useLocale();
  const year = new Date().getFullYear();
  const l = BRAND_FIXED.legal;

  return (
    <footer style={{ background: 'var(--surface)', borderTop: '1px solid var(--line)' }}>
      <div className="shell py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1.15fr] lg:gap-10">
          {/* 회사 개요 */}
          <div>
            <img
              src="/assets/logo-iuyu.png"
              alt={BRAND_FIXED.name}
              width={436}
              height={130}
              className="h-[26px] w-auto"
              loading="lazy"
            />
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
                <span className="t-note block">{t.pages.contact.emailLabel}</span>
                <a
                  href={`mailto:${BRAND_FIXED.email}`}
                  className="link-draw foot-link t-sm mt-1.5 font-medium ink-2 hover:ink"
                >
                  {BRAND_FIXED.email}
                </a>
              </li>
              <li>
                <span className="t-note block">{t.pages.contact.whatsappLabel}</span>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-draw foot-link t-sm t-num mt-1.5 font-medium ink-2 hover:ink"
                >
                  {BRAND_FIXED.whatsapp.display}
                </a>
              </li>

              <li>
                <span className="t-note block">{t.pages.contact.hoursLabel}</span>
                <span className="t-sm mt-1.5 block ink-3">{t.brand.hours}</span>
              </li>

              {/* 소셜 채널 — 실체 확인(신뢰) 신호 + JSON-LD sameAs 와 동일한 주소 */}
              <li>
                <span className="t-note block">{t.footer.socialLabel}</span>
                <SocialLinks label={t.footer.socialLabel} className="mt-3" />
              </li>
            </ul>
          </div>
        </div>

        {/* 고지
            주의: 사업자 정보(상호·등록번호·주소)는 의도적으로 표시하지 않습니다.
            실제 법인 정보가 확정되면 이 자리에 추가하세요.
            현재는 placeholder 를 노출하지 않는 편이 신뢰에 낫습니다. */}
        <Reveal variant="fade">
          <div className="mt-16 pt-8" style={{ borderTop: '1px solid var(--line)' }}>
            <div className="rounded-sm p-5" style={{ background: 'var(--sunk)' }}>
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
                {t.footer.tagline}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
