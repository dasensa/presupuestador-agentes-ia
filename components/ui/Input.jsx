export default function Input({ label, className = '', ...props }) {
  return (
    <div>
      {label && <label className="block text-label uppercase text-base-muted tracking-wider mb-2">{label}</label>}
      <input
        className={`w-full rounded-2xl bg-white/80 border border-border-input px-4 py-3 text-body-sm text-base-text placeholder:text-base-subtle shadow-sm focus:outline-none focus:border-border-focus focus:ring-4 focus:ring-cyan-100 transition-colors ${className}`}
        {...props}
      />
    </div>
  );
}
