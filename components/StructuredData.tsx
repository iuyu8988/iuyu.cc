import { BRAND_FIXED, SITE_URL } from '@/content/brand';
import { LOCALE_META, type Locale } from '@/lib/i18n';
import { getDictionary } from '@/content/dictionaries';

/**
 * JSON-LD — B2B 제조사 기준, 언어별로 생성합니다.
 * B2C 쇼핑몰과 달리 Product/Offer(가격) 를 쓰지 않습니다.
 * 제조사 사이트에서 검색엔진이 원하는 것은 회사 실체와 역량입니다.
 */
export default function StructuredData({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const meta = LOCALE_META[locale];
  const orgId = `${SITE_URL}/#organization`;

  const org = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'Manufacturer'],
    '@id': orgId,
    name: BRAND_FIXED.name,
    alternateName: `${BRAND_FIXED.nameKo} (${BRAND_FIXED.legal.companyEn})`,
    url: SITE_URL,
    logo: `${SITE_URL}/assets/icon-512.png`,
    image: `${SITE_URL}/assets/og-image.png`,
    description: t.brand.description,
    foundingDate: BRAND_FIXED.since,
    email: BRAND_FIXED.email,
    telephone: BRAND_FIXED.legal.tel,
    slogan: t.brand.tagline,
    address: [
      { '@type': 'PostalAddress', name: 'HQ / Factory', streetAddress: BRAND_FIXED.legal.address, addressCountry: 'KR' },
      { '@type': 'PostalAddress', name: 'Office', streetAddress: BRAND_FIXED.legal.addressOffice, addressCountry: 'KR' },
    ],
    areaServed: [{ '@type': 'Country', name: 'South Korea' }, { '@type': 'Place', name: 'Worldwide' }],
    knowsAbout: [
      'silicone injection molding',
      'LSR liquid silicone rubber',
      'protective case design',
      'mold design and fabrication',
      'OEM/ODM manufacturing',
    ],
    makesOffer: t.capabilities.items.map((c) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: c.title,
        alternateName: c.titleEn,
        description: c.body,
        serviceType: 'Manufacturing',
        provider: { '@id': orgId },
      },
    })),
    contactPoint: [
      { '@type': 'ContactPoint', contactType: 'sales', email: BRAND_FIXED.email, availableLanguage: ['ko', 'en', 'zh'], areaServed: 'Worldwide' },
      { '@type': 'ContactPoint', contactType: 'technical support', email: BRAND_FIXED.emailTech, availableLanguage: ['ko', 'en', 'zh'] },
    ],
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: BRAND_FIXED.name,
    url: SITE_URL,
    inLanguage: meta.htmlLang,
    publisher: { '@id': orgId },
  };

  const services = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: t.capabilities.h2Line1 + ' ' + t.capabilities.h2Line2,
    inLanguage: meta.htmlLang,
    itemListElement: t.capabilities.items.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Service',
        name: c.title,
        description: c.lead,
        serviceType: 'Manufacturing',
        provider: { '@id': orgId },
      },
    })),
  };

  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: meta.htmlLang,
    mainEntity: t.faq.items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t.common.home, item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: t.nav[1].label, item: `${SITE_URL}/capabilities/` },
      { '@type': 'ListItem', position: 3, name: t.nav[5].label, item: `${SITE_URL}/contact/` },
    ],
  };

  return (
    <>
      {[org, website, services, faq, breadcrumb].map((data, i) => (
        <script
          key={i}
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
    </>
  );
}
