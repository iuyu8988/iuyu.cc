import Link from 'next/link';
import { getDictionary } from '@/content/dictionaries';
import { BRAND_FIXED } from '@/content/brand';

/**
 * 루트 404 — 언어 접두사를 판별할 수 없는 경로(예: /nope)에서 사용됩니다.
 * 런타임 정보를 쓸 수 없으므로 3개 언어 링크를 함께 제시합니다.
 * (언어별 404 는 app/[locale]/not-found.tsx 가 담당)
 */
export default function RootNotFound() {
  const t = getDictionary('ko');

  return (
    <html lang="ko">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'grid',
          placeItems: 'center',
          background: '#f2f3f5',
          color: '#3a424c',
          fontFamily:
            "'Pretendard Variable', Pretendard, -apple-system, system-ui, 'Apple SD Gothic Neo', sans-serif",
          padding: 24,
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 460 }}>
          <p
            style={{
              fontFamily: 'ui-monospace, monospace',
              fontSize: 11,
              letterSpacing: '.2em',
              color: '#0d6b76',
              margin: 0,
            }}
          >
            404 / NOT FOUND
          </p>
          <h1
            style={{
              fontSize: 28,
              lineHeight: 1.2,
              letterSpacing: '-0.03em',
              color: '#0b0e12',
              margin: '20px 0 0',
            }}
          >
            {t.notFound.h1}
          </h1>
          <p style={{ marginTop: 16, fontSize: 14, lineHeight: 1.75, color: '#737d89' }}>
            Page not found · 页面不存在
          </p>

          <div
            style={{
              marginTop: 32,
              display: 'flex',
              gap: 8,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            {[
              { href: '/', label: '한국어' },
              { href: '/en/', label: 'English' },
              { href: '/zh/', label: '中文' },
            ].map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                style={{
                  padding: '11px 22px',
                  fontSize: 13,
                  fontWeight: 600,
                  textDecoration: 'none',
                  borderRadius: 2,
                  ...(i === 0
                    ? { background: '#0d6b76', color: '#fff' }
                    : { background: '#fff', color: '#0b0e12', border: '1px solid rgba(18,23,30,.2)' }),
                }}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <p
            style={{
              marginTop: 36,
              fontFamily: 'ui-monospace, monospace',
              fontSize: 11,
              letterSpacing: '.14em',
              color: '#9aa3ad',
            }}
          >
            {BRAND_FIXED.name} — SILICONE CASE MFG.
          </p>
        </div>
      </body>
    </html>
  );
}
