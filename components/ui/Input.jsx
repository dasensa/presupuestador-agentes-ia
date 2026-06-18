export default function Input({ label, className = '', ...props }) {
  return (
    <div>
      {label && <label className="block text-sm font-semibold text-slate-300 mb-2">{label}</label>}
      <input
        className={`w-full bg-navy-800 border border-navy-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-gold-400/50 focus:ring-1 focus:ring-gold-400/20 transition-colors ${className}`}
        {...props}
      />
    </div>
  );
}
