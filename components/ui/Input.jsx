export default function Input({ label, className = '', ...props }) {
  return (
    <div>
      {label && <label className="block text-label uppercase text-base-muted tracking-wider mb-2">{label}</label>}
      <input
        className={`w-full bg-surface-input border border-border-input px-4 py-3 text-body-sm text-base-text placeholder:text-base-subtle focus:outline-none focus:border-border-focus transition-colors ${className}`}
        {...props}
      />
    </div>
  );
}
