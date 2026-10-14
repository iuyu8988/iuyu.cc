'use client';

import { useEffect, useState } from 'react';
import { BRAND_FIXED, whatsappLink } from '@/content/brand';
import { localePath } from '@/lib/i18n';
import { useLocale } from './LocaleProvider';

/** B2B 플로팅 — 쇼핑몰의 장바구니 바가 아니라 '상담 바'입니다. */
export default function FloatingActions() {
  const { locale, t } = useLocale();
  const [show, setShow] = useState(false);

  /* 푸터에 닿으면 플로팅을 접습니다.
     이유: 플로팅은 우하단 고정인데 푸터의 연락처·소셜 아이콘·사업 범위 고지도
     같은 자리에 있어, 스크롤 위치에 따라 그 글자를 가립니다. 실측으로
     '전자담배 액세서리 OEM/ODM 제조' 같은 문구와 100×6px 겹쳤습니다.
     연락처는 이 사이트의 최종 목적지라 가려지면 안 됩니다. */
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const footer = document.querySelector('footer');
        // 푸터 상단이 뷰포트 85% 지점을 넘어오면 접기 시작
        const footerNear = footer
          ? footer.getBoundingClientRect().top < window.innerHeight * 0.85
          : false;
        setShow(window.scrollY > 620 && !footerNear);
        raf = 0;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* 모바일 하단 바 */}
      <div
        className="fixed inset-x-0 bottom-0 z-40 lg:hidden"
        style={{
          background: 'rgba(242,243,245,.94)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          borderTop: '1px solid var(--line)',
          transform: show ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform .5s var(--ease-out)',
        }}
      >
        <div className="shell flex items-center gap-4 py-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-[0.75rem] font-semibold ink">{t.floating.mobileTitle}</p>
            <p className="t-note truncate" style={{ textTransform: 'none', letterSpacing: 0 }}>
              {t.floating.mobileSub}
            </p>
          </div>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.pages.contact.whatsappCta}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded text-white"
            style={{ background: '#25D366', borderRadius: 2 }}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.5 14.4c-.3-.2-1.7-.9-2-1-.3-.1-.5-.2-.7.1-.2.3-.7 1-.9 1.2-.2.2-.3.2-.6.1-1.7-.9-2.9-1.6-4-3.6-.3-.5.3-.5.8-1.5.1-.2 0-.4 0-.5s-.7-1.6-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5 1.9.8 2.6.9 3.5.7.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.5-.3zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.4 1.3 4.9L2 22l5.3-1.4c1.5.8 3.1 1.2 4.7 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3.2.8.9-3.1-.2-.3C4.1 14.8 3.7 13.4 3.7 12c0-4.6 3.7-8.3 8.3-8.3s8.3 3.7 8.3 8.3-3.7 8.2-8.3 8.2z"/>
            </svg>
          </a>
          <a
            href={localePath(locale, '/social/')}
            aria-label={t.floating.social}
            className="flex h-9 w-9 shrink-0 items-center justify-center ink-3 transition-colors duration-300"
            style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 2 }}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
              <circle cx="12" cy="12" r="3.1" />
              <path d="M12 3.2v3.4M12 17.4v3.4M3.2 12h3.4M17.4 12h3.4" />
              <path d="M5.9 5.9l2.4 2.4M15.7 15.7l2.4 2.4M18.1 5.9l-2.4 2.4M8.3 15.7l-2.4 2.4" />
            </svg>
          </a>
          <a
            href={localePath(locale, '/contact/')}
            className="btn btn-solid shrink-0 !px-4 !py-2.5 !text-[0.75rem]"
          >
            {t.floating.mobileCta}
          </a>
        </div>
      </div>

      {/* 데스크톱 우하단 */}
      <div
        className="fixed bottom-8 right-8 z-40 hidden lg:block"
        style={{
          transform: show ? 'translateY(0)' : 'translateY(14px)',
          opacity: show ? 1 : 0,
          pointerEvents: show ? 'auto' : 'none',
          transition: 'transform .5s var(--ease-out), opacity .5s var(--ease-out)',
        }}
      >
        <div className="flex flex-col items-end gap-2.5">
          {/* WhatsApp — 해외 바이어가 가장 많이 쓰는 창구 */}
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[34px] items-center gap-2 px-3.5 py-2.5 text-white transition-transform duration-300 hover:-translate-y-0.5"
            style={{
              background: '#25D366',
              borderRadius: 2,
              fontSize: 11.5,
              fontWeight: 600,
              letterSpacing: '.04em',
              boxShadow: '0 10px 30px -16px rgba(37,211,102,.7)',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.5 14.4c-.3-.2-1.7-.9-2-1-.3-.1-.5-.2-.7.1-.2.3-.7 1-.9 1.2-.2.2-.3.2-.6.1-1.7-.9-2.9-1.6-4-3.6-.3-.5.3-.5.8-1.5.1-.2 0-.4 0-.5s-.7-1.6-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5 1.9.8 2.6.9 3.5.7.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.5-.3zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.4 1.3 4.9L2 22l5.3-1.4c1.5.8 3.1 1.2 4.7 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3.2.8.9-3.1-.2-.3C4.1 14.8 3.7 13.4 3.7 12c0-4.6 3.7-8.3 8.3-8.3s8.3 3.7 8.3 8.3-3.7 8.2-8.3 8.2z"/>
            </svg>
            {t.pages.contact.whatsappLabel}
          </a>
          {/* 이메일 — 정식 견적·서류용 */}
          <a
            href={`mailto:${BRAND_FIXED.email}`}
            className="t-num inline-flex min-h-[32px] items-center px-3.5 py-2.5 ink-3 transition-colors duration-300 hover:ink"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--line)',
              borderRadius: 2,
              fontSize: 11,
              letterSpacing: '.06em',
              boxShadow: '0 10px 30px -18px rgba(11,14,18,.4)',
            }}
          >
            {BRAND_FIXED.email}
          </a>
          {/* 소셜 채널 — 제품 실사를 확인하려는 바이어가 가장 먼저 누르는 곳.
              외부 채널로 바로 보내지 않고 사이트 안 모음 페이지를 거칩니다
              (어느 채널을 고를지 한 번 보여주는 편이 이탈이 적습니다). */}
          <a
            href={localePath(locale, '/social/')}
            className="inline-flex min-h-[34px] items-center gap-2 px-3.5 py-2.5 ink-2 transition-colors duration-300 hover:ink"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--line)',
              borderRadius: 2,
              fontSize: 11.5,
              fontWeight: 600,
              letterSpacing: '.04em',
              boxShadow: '0 10px 30px -18px rgba(11,14,18,.4)',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
              <circle cx="12" cy="12" r="3.1" />
              <path d="M12 3.2v3.4M12 17.4v3.4M3.2 12h3.4M17.4 12h3.4" />
              <path d="M5.9 5.9l2.4 2.4M15.7 15.7l2.4 2.4M18.1 5.9l-2.4 2.4M8.3 15.7l-2.4 2.4" />
            </svg>
            {t.floating.social}
          </a>
          <a
            href={localePath(locale, '/contact/')}
            className="btn btn-solid"
            style={{ boxShadow: '0 14px 32px -14px rgba(13,107,118,.6)' }}
          >
            {t.floating.desktopCta}
          </a>
        </div>
      </div>
    </>
  );
}
