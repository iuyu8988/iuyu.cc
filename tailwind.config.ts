import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './content/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#f2f3f5',
        surface: '#ffffff',
        sunk: '#eceef1',
        ink: { DEFAULT: '#0b0e12', 2: '#3a424c', 3: '#5d666f', 4: '#78818b' },
        accent: {
          DEFAULT: '#0d6b76',
          deep: '#095059',
          bright: '#10798a',
          onDark: '#5fd0e0',
          wash: '#e4eff0',
        },
      },
      /* CSS 변수로 정의된 유체 타이포를 클래스로도 쓸 수 있게 노출 */
      fontSize: {
        display: 'var(--fs-display)',
        h1: 'var(--fs-h1)',
        h2: 'var(--fs-h2)',
        h3: 'var(--fs-h3)',
        lead: 'var(--fs-lead)',
      },
      spacing: {
        section: 'var(--section-y)',
        gutter: 'var(--gutter)',
      },
      maxWidth: {
        shell: 'var(--shell)',
      },
      /* 도면의 미세한 3D 틸트에 쓰는 원근 */
      perspective: {
        drawing: '1400px',
      },
      keyframes: {
        /* 마스크가 위로 걷히며 등장 — 종이에서 도면이 드러나는 느낌 */
        unmask: {
          '0%': { clipPath: 'inset(0 0 100% 0)', transform: 'translateY(14px)' },
          '100%': { clipPath: 'inset(0 0 0 0)', transform: 'translateY(0)' },
        },
        /* 치수선이 좌에서 우로 그려짐 */
        drawX: {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
        /* 세로로 그려짐 */
        drawY: {
          '0%': { transform: 'scaleY(0)' },
          '100%': { transform: 'scaleY(1)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        floatY: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        /* 헤더 상단 진행 표시 */
        scrollHint: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '40%': { opacity: '1' },
          '100%': { transform: 'translateY(100%)', opacity: '0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        unmask: 'unmask .9s var(--ease-out) both',
        drawX: 'drawX .8s var(--ease-out) both',
        drawY: 'drawY .8s var(--ease-out) both',
        fadeUp: 'fadeUp .8s var(--ease-out) both',
        fadeIn: 'fadeIn .9s var(--ease-out) both',
        floatY: 'floatY 9s ease-in-out infinite',
        scrollHint: 'scrollHint 2.4s ease-in-out infinite',
        marquee: 'marquee 42s linear infinite',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(.22,.61,.36,1)',
        'in-out': 'cubic-bezier(.65,0,.35,1)',
      },
    },
  },
  plugins: [],
};
export default config;
