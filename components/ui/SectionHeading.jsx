export default function SectionHeading({ eyebrow, title, description, align = 'center' }) {
  const alignment = align === 'center' ? 'text-center' : 'text-left';
  return (
    <div className={`${alignment} mb-12 max-w-3xl ${align === 'center' ? 'mx-auto' : ''}`}>
      {eyebrow && (
        <span className="text-gold-400 text-sm font-semibold tracking-widest uppercase mb-3 block">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-slate-400 text-lg leading-relaxed">{description}</p>
      )}
    </div>
  );
}
