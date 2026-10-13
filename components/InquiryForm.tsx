'use client';

import { useRef, useState } from 'react';
import { BRAND_FIXED } from '@/content/brand';
import { useLocale } from './LocaleProvider';

/**
 * 문의 폼 — 도면의 기입란(input field) 스타일.
 * 라벨은 등폭 대문자, 입력선은 하단 헤어라인만. 상자 테두리를 없애
 * '종이에 기입하는' 느낌을 유지하면서도 포커스 시 강조선이 그려집니다.
 *
 * ⚠️ 전송 백엔드 미연결 — 현재는 mailto 로 넘어갑니다.
 *    실제 운영 시 아래 submitForm 내부를 교체하세요.
 */
export default function InquiryForm() {
  const { t } = useLocale();
  const f = t.form;
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [focusField, setFocusField] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    for (const k of ['company', 'name', 'email', 'message']) {
      if (!String(fd.get(k) || '').trim()) {
        setError(f.requiredError);
        return;
      }
    }
    setError('');

    const L = f.labels;
    const body = [
      `${L.company}: ${fd.get('company')}`,
      `${L.name}: ${fd.get('name')}`,
      `${L.email}: ${fd.get('email')}`,
      `${L.phone}: ${fd.get('phone') || '-'}`,
      `${L.country}: ${fd.get('country') || '-'}`,
      `${L.device}: ${fd.get('device') || '-'}`,
      `${L.line}: ${fd.get('line') || '-'}`,
      `${L.qty}: ${fd.get('qty') || '-'}`,
      '',
      `${L.message}:`,
      String(fd.get('message') || ''),
    ].join('\n');

    window.location.href =
      `mailto:${BRAND_FIXED.email}?subject=${encodeURIComponent(f.mailSubjectPrefix + fd.get('company'))}` +
      `&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  /* 입력 필드 — 하단선 + 포커스 시 강조선이 좌→우로 그려짐 */
  const Field = ({
    id,
    label,
    name,
    type = 'text',
    placeholder,
    required,
    textarea,
    children,
  }: {
    id: string;
    label: string;
    name?: string;
    type?: string;
    placeholder?: string;
    required?: boolean;
    textarea?: boolean;
    children?: React.ReactNode;
  }) => {
    const on = focusField === id;
    return (
      <div className="relative">
        <label htmlFor={id} className="t-note block">
          {label}
          {required && <span className="ml-1" style={{ color: 'var(--accent)' }}>*</span>}
        </label>
        <div className="relative mt-2.5">
          {children ?? (textarea ? (
            <textarea
              id={id}
              name={name ?? id}
              rows={5}
              placeholder={placeholder}
              onFocus={() => setFocusField(id)}
              onBlur={() => setFocusField(null)}
              className="t-body w-full resize-y bg-transparent pb-3 ink outline-none placeholder:text-[var(--ink-4)]"
              style={{ borderBottom: '1px solid var(--line-strong)' }}
            />
          ) : (
            <input
              id={id}
              name={name ?? id}
              type={type}
              placeholder={placeholder}
              onFocus={() => setFocusField(id)}
              onBlur={() => setFocusField(null)}
              className="t-body w-full bg-transparent pb-3 ink outline-none placeholder:text-[var(--ink-4)]"
              style={{ borderBottom: '1px solid var(--line-strong)' }}
            />
          ))}
          {/* 포커스 강조선 */}
          <span
            className="pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left"
            style={{
              background: 'var(--accent)',
              transform: on ? 'scaleX(1)' : 'scaleX(0)',
              transition: 'transform .45s var(--ease-out)',
              ...(textarea ? { bottom: '0.75rem' } : {}),
            }}
            aria-hidden="true"
          />
        </div>
      </div>
    );
  };

  return (
    <form ref={formRef} onSubmit={onSubmit} className="space-y-9" noValidate>
      <div className="grid gap-x-8 gap-y-9 sm:grid-cols-2">
        <Field id="company" label={f.labels.company} placeholder={f.placeholderCompany} required />
        <Field id="name" label={f.labels.name} placeholder={f.placeholderName} required />
        <Field id="email" label={f.labels.email} type="email" placeholder={f.placeholderEmail} required />
        <Field id="phone" label={f.labels.phone} placeholder={f.placeholderPhone} />
        <Field id="country" label={f.labels.country} placeholder={f.placeholderCountry} />
        <Field id="device" label={f.labels.device} placeholder={f.placeholderDevice} />

        <Field id="line" label={f.labels.line}>
          <select
            id="line"
            name="line"
            defaultValue=""
            onFocus={() => setFocusField('line')}
            onBlur={() => setFocusField(null)}
            className="t-body w-full appearance-none bg-transparent pb-3 ink outline-none"
            style={{ borderBottom: '1px solid var(--line-strong)' }}
          >
            <option value="">{f.selectPlaceholder}</option>
            {t.lines.items.map((l) => (
              <option key={l.id} value={`${l.nameKo} (${l.name})`}>
                {l.nameKo} — {l.name}
              </option>
            ))}
            <option value={f.lineUndecided}>{f.lineUndecided}</option>
          </select>
          <span
            className="pointer-events-none absolute right-0 top-[2.4rem] ink-3"
            style={{ fontSize: 11 }}
            aria-hidden="true"
          >
            ▼
          </span>
        </Field>

        <Field id="qty" label={f.labels.qty} placeholder={f.placeholderQty} />
      </div>

      <Field id="message" label={f.labels.message} placeholder={f.placeholderMessage} required textarea />

      <label className="flex items-start gap-3.5 pt-2">
        <span className="relative mt-[2px] block h-5 w-5 shrink-0">
          <input
            type="checkbox"
            name="consent"
            className="peer absolute inset-0 h-full w-full cursor-pointer appearance-none"
            style={{ border: '1px solid var(--line-strong)', borderRadius: 1 }}
          />
          <span
            className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 peer-checked:opacity-100"
            style={{ background: 'var(--accent)', color: '#fff', fontSize: 11, borderRadius: 1 }}
            aria-hidden="true"
          >
            ✓
          </span>
        </span>
        <span className="t-sm text-pretty ink-3">
          {f.consent.replace(f.consentLink, '')}
          <a href="/legal/privacy/" className="link-draw inline-link font-medium accent">
            {f.consentLink}
          </a>
        </span>
      </label>

      {error && (
        <p
          role="alert"
          className="t-sm px-4 py-3"
          style={{ background: '#fdf2f2', color: '#a33', borderRadius: 2 }}
        >
          {error}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-5 pt-6" style={{ borderTop: '1px solid var(--line)' }}>
        <button type="submit" className="btn btn-solid">
          {f.submit} <span aria-hidden="true">→</span>
        </button>
        <p className="t-note">{f.replyNote}</p>
      </div>

      {sent && (
        <p
          role="status"
          className="t-sm p-4 text-pretty ink-2"
          style={{ background: 'var(--accent-wash)', borderRadius: 2 }}
        >
          {f.sentNote}
        </p>
      )}
    </form>
  );
}
