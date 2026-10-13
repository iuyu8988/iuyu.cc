export default function Loading() {
  return (
    <div className="flex min-h-[60svh] items-center justify-center" role="status" aria-live="polite">
      <span className="flex items-center gap-3">
        <span
          className="inline-block h-3.5 w-3.5 animate-spin rounded-full"
          style={{ border: '1.5px solid var(--line-strong)', borderTopColor: 'var(--accent)' }}
        />
        <span className="t-note">LOADING</span>
      </span>
    </div>
  );
}
