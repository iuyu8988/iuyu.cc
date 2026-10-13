import type { Metadata } from 'next';
import { alternatesFor, localePath, type Locale } from '@/lib/i18n';
import { getDictionary } from '@/content/dictionaries';
import { GalleryItem, PageFooterCta, PageHead, Reveal, SectionHead } from '@/components/primitives';

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const t = getDictionary(params.locale).pages.products;
  const alt = alternatesFor('/products/', params.locale);
  return { title: t.title, description: t.description, alternates: { canonical: alt.canonical, languages: alt.languages } };
}

export default function ProductsPage({ params }: { params: { locale: Locale } }) {
  const { locale } = params;
  const t = getDictionary(locale);
  const p = t.pages.products;
  const L = (path: string) => localePath(locale, path);

  return (
    <div className="shell pb-24">
      <PageHead
        sheet="03"
        path="IUYU / PRODUCTS"
        eyebrow={t.lines.eyebrow}
        title={
          <>
            {p.h1Line1}
            <br />
            {p.h1Line2}
          </>
        }
        lede={p.lede}
        meta={[
          { k: 'LINES', v: '04' },
          { k: 'CUSTOMISATION', v: 'FORM · COLOUR · SURFACE · LOGO' },
        ]}
      />

      {/* 라인업 — 도면 색인 번호와 함께 */}
      <section className="grid gap-3 sm:grid-cols-2">
        {t.lines.items.map((l, i) => (
          <Reveal key={l.id} variant="rise" delay={i * 70}>
            <article className="pane pane-lift flex h-full flex-col p-7 sm:p-8">
              <div className="flex items-baseline justify-between gap-4">
                <span className="t-num" style={{ fontSize: 11, letterSpacing: '.16em', color: 'var(--accent)' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="t-note">{l.name}</span>
              </div>
              <h2 className="t-h2 mt-5">{l.nameKo}</h2>
              <p className="t-sm mt-4 flex-1 text-pretty ink-2">{l.desc}</p>
              <ul className="mt-7" style={{ borderTop: '1px solid var(--line-soft)' }}>
                {l.specs.map((sp, j) => (
                  <li
                    key={sp}
                    className="t-sm flex items-baseline justify-between gap-4 py-3 ink-2"
                    style={{ borderBottom: j === l.specs.length - 1 ? 'none' : '1px solid var(--line-soft)' }}
                  >
                    <span>{sp}</span>
                    <span className="t-num shrink-0" style={{ fontSize: 11, color: 'var(--ink-4)' }}>
                      {String(j + 1).padStart(2, '0')}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </section>

      {/* 제품 실사 — 비율에 따라 배치를 명시합니다.
          첫 컷(전체 구성)은 가로로 넓어 전폭 feature 로,
          나머지 세로 컷은 3열로 나란히 놓습니다.
          (CSS columns 는 높이 차가 크면 열이 비어 보여서 쓰지 않습니다) */}
      <section className="mt-24">
        <SectionHead index="A" eyebrow={p.galleryH2} title={p.galleryLede} scale="minor" />

        <div className="mt-10 space-y-3">
          {/* feature — 전체 구성 */}
          <Reveal variant="unmask">
            <GalleryItem
              src={p.views[0].src}
              alt={`${p.views[0].cap} — ${t.meta.siteName}`}
              cap={p.views[0].cap}
              index={1}
              ratio={p.views[0].ratio}
              eager
            />
          </Reveal>

          {/* 세로 컷 3종 */}
          <div className="grid gap-3 sm:grid-cols-3">
            {p.views.slice(1).map((v: { src: string; cap: string; ratio?: number }, i: number) => (
              <Reveal key={v.src} variant="unmask" delay={(i + 1) * 70}>
                <GalleryItem
                  src={v.src}
                  alt={`${v.cap} — ${t.meta.siteName}`}
                  cap={v.cap}
                  index={i + 2}
                  ratio={v.ratio}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 표면 마감 */}
      <section className="mt-24">
        <SectionHead index="B" eyebrow={p.finishH2} title={t.materials.h2} lede={p.finishNote} scale="minor" />
        <div className="mt-10 grid gap-px sm:grid-cols-2 lg:grid-cols-4" style={{ background: 'var(--line-soft)' }}>
          {t.materials.finishes.map((f, i) => (
            <Reveal key={f.k} variant="rise" delay={i * 60}>
              <div className="group h-full bg-surface p-6">
                <span
                  className="block h-14 w-14 transition-transform duration-500 group-hover:scale-105"
                  style={{
                    borderRadius: f.v === 'Embossed' || f.v === '엠보' || f.v === '压纹' ? 2 : 99,
                    background: 'linear-gradient(145deg,#ffffff,#c9cfd6)',
                    border: '1px solid var(--line-strong)',
                    boxShadow: 'inset 0 1px 2px rgba(255,255,255,.9)',
                  }}
                  aria-hidden="true"
                />
                <p className="t-h3 mt-5">{f.k}</p>
                <p className="t-note mt-1.5">{f.v}</p>
                <p className="t-sm mt-3.5 ink-2">{f.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 커스터마이즈 범위 */}
      <section className="mt-24">
        <SectionHead index="C" eyebrow={p.customH2} title={p.customH2} scale="minor" />
        <Reveal variant="rise" delay={100}>
          <div className="mt-10 overflow-hidden" style={{ border: '1px solid var(--line)', borderRadius: 2 }}>
            <table className="spec" style={{ background: 'var(--surface)' }}>
              <caption className="sr-only">{p.customH2}</caption>
              <tbody>
                {p.customRows.map(([k, v]) => (
                  <tr key={k}>
                    <th scope="row">{k}</th>
                    <td>{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
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
