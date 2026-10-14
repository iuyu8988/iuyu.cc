import type { Metadata } from 'next';
import { alternatesFor, localePath, type Locale } from '@/lib/i18n';
import { getDictionary } from '@/content/dictionaries';
import { PageFooterCta, PageHead, Reveal } from '@/components/primitives';
import { SOCIAL } from '@/content/brand';

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const t = getDictionary(params.locale).pages.social;
  const alt = alternatesFor('/social/', params.locale);
  return { title: t.title, description: t.description, alternates: { canonical: alt.canonical, languages: alt.languages } };
}

function ChannelIcon({ id }: { id: string }) {
  const c = { width: 26, height: 26, viewBox: '0 0 24 24', fill: 'currentColor', 'aria-hidden': true as const };
  switch (id) {
    case 'instagram':
      return (
        <svg {...c}>
          <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.8 3.8 0 0 1-1.38-.9c-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 1.62c-3.15 0-3.52.01-4.76.07-1.15.05-1.77.24-2.19.4-.55.22-.94.47-1.35.88-.41.41-.66.8-.88 1.35-.16.42-.35 1.04-.4 2.19-.06 1.24-.07 1.61-.07 4.76s.01 3.52.07 4.76c.05 1.15.24 1.77.4 2.19.22.55.47.94.88 1.35.41.41.8.66 1.35.88.42.16 1.04.35 2.19.4 1.24.06 1.61.07 4.76.07s3.52-.01 4.76-.07c1.15-.05 1.77-.24 2.19-.4.55-.22.94-.47 1.35-.88.41-.41.66-.8.88-1.35.16-.42.35-1.04.4-2.19.06-1.24.07-1.61.07-4.76s-.01-3.52-.07-4.76c-.05-1.15-.24-1.77-.4-2.19a3.6 3.6 0 0 0-.88-1.35 3.6 3.6 0 0 0-1.35-.88c-.42-.16-1.04-.35-2.19-.4-1.24-.06-1.61-.07-4.76-.07Z" />
          <path d="M12 6.86a5.14 5.14 0 1 0 0 10.28 5.14 5.14 0 0 0 0-10.28Zm0 8.48a3.34 3.34 0 1 1 0-6.68 3.34 3.34 0 0 1 0 6.68Z" />
          <circle cx="17.34" cy="6.66" r="1.2" />
        </svg>
      );
    case 'tiktok':
      return (
        <svg {...c}>
          <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.59 2.59 0 1 1 .77-5.06V9.7a5.7 5.7 0 0 0-.77-.05A5.66 5.66 0 1 0 15.54 15.3V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3a4.29 4.29 0 0 1-3.24-1.48Z" />
        </svg>
      );
    case 'x':
      return (
        <svg {...c}>
          <path d="M17.53 3h3.02l-6.6 7.54L21.75 21h-6.08l-4.76-6.23L5.46 21H2.44l7.06-8.07L2.25 3h6.23l4.3 5.69L17.53 3Zm-1.06 16.17h1.67L7.6 4.74H5.81l10.66 14.43Z" />
        </svg>
      );
    case 'youtube':
      return (
        <svg {...c}>
          <path d="M21.58 7.19a2.51 2.51 0 0 0-1.77-1.77C18.25 5 12 5 12 5s-6.25 0-7.81.42a2.51 2.51 0 0 0-1.77 1.77A26.1 26.1 0 0 0 2 12c0 1.63.14 3.26.42 4.81a2.51 2.51 0 0 0 1.77 1.77C5.75 19 12 19 12 19s6.25 0 7.81-.42a2.51 2.51 0 0 0 1.77-1.77c.28-1.55.42-3.18.42-4.81 0-1.63-.14-3.26-.42-4.81ZM10 15.02V8.98L15.2 12 10 15.02Z" />
        </svg>
      );
    case 'telegram':
      return (
        <svg {...c}>
          <path d="M21.94 4.3 18.9 18.66c-.23 1.02-.83 1.27-1.68.79l-4.65-3.43-2.24 2.16c-.25.25-.46.46-.94.46l.33-4.73 8.6-7.77c.37-.33-.08-.52-.58-.19l-10.63 6.7-4.58-1.44c-1-.31-1.01-1 .21-1.47L20.34 3.1c.83-.31 1.56.19 1.29 1.2h.31Z" />
        </svg>
      );
    default:
      return null;
  }
}

const CHANNEL_NOTE: Record<string, Record<string, string>> = {
  ko: {
    instagram: '제품 실사와 컬러·마감 사진을 올립니다.',
    tiktok: '짧은 생산 현장 영상과 신제품 소식.',
    x: '공지와 신제품 업데이트.',
    youtube: '설비·공정을 길게 담은 영상.',
    telegram: '해외 바이어용 빠른 문의 창구.',
  },
  en: {
    instagram: 'Product photos, colours and finishes.',
    tiktok: 'Short production clips and new releases.',
    x: 'Announcements and product updates.',
    youtube: 'Longer footage of equipment and process.',
    telegram: 'A quick channel for overseas buyers.',
  },
  zh: {
    instagram: '产品实拍、颜色与表面处理。',
    tiktok: '生产现场短视频与新品动态。',
    x: '公告与新品更新。',
    youtube: '设备与流程的长视频。',
    telegram: '面向海外买家的快速联系渠道。',
  },
};

export default function SocialPage({ params }: { params: { locale: Locale } }) {
  const { locale } = params;
  const t = getDictionary(locale);
  const p = t.pages.social;
  const L = (path: string) => localePath(locale, path);
  const notes = CHANNEL_NOTE[locale] ?? CHANNEL_NOTE.en;

  return (
    <div className="shell pb-24">
      <PageHead
        sheet="07"
        path="IUYU / SOCIAL"
        eyebrow="SOCIAL"
        title={
          <>
            {p.h1Line1}
            <br />
            {p.h1Line2}
          </>
        }
        lede={p.lede}
        meta={[
          { k: 'CHANNELS', v: String(SOCIAL.length).padStart(2, '0') },
          { k: 'LANGUAGES', v: 'KO · EN · ZH' },
        ]}
      />

      <section className="grid gap-3 sm:grid-cols-2">
        {SOCIAL.map((s, i) => (
          <Reveal key={s.id} variant="rise" delay={i * 60}>
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="pane pane-lift group flex h-full items-start gap-5 p-7"
            >
              <span
                className="flex h-12 w-12 shrink-0 items-center justify-center transition-colors duration-300"
                style={{ border: '1px solid var(--line)', borderRadius: 2, color: 'var(--ink-3)' }}
              >
                <span className="transition-colors duration-300 group-hover:text-[var(--accent)]">
                  <ChannelIcon id={s.id} />
                </span>
              </span>

              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="t-h3">{s.label}</span>
                  <span className="t-num t-sm ink-3">@{s.handle}</span>
                </span>
                <span className="t-sm mt-2.5 block text-pretty ink-2">{notes[s.id]}</span>
                <span
                  className="t-note mt-4 inline-flex items-center gap-2 transition-colors duration-300 group-hover:text-[var(--accent)]"
                  style={{ color: 'var(--accent)' }}
                >
                  {p.followLabel}
                  <span aria-hidden="true">→</span>
                </span>
              </span>
            </a>
          </Reveal>
        ))}
      </section>

      <Reveal variant="fade">
        <p className="t-sm mt-8 ink-4">{p.note}</p>
      </Reveal>

      <PageFooterCta
        primaryLabel={t.cta.primary}
        primaryHref={L('/contact/')}
        secondaryLabel={t.hero.ctaSecondary}
        secondaryHref={L('/capabilities/')}
      />
    </div>
  );
}
