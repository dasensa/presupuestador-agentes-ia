export default function SectionHeading({ eyebrow, title, description, align = 'center' }) {
  const alignment = align === 'center' ? 'text-center' : 'text-left';

  const renderTitle = (text) => {
    const words = text.split(' ');
    if (words.length < 3) return <>{text}</>;
    const lastTwo = words.slice(-2).join(' ');
    const rest = words.slice(0, -2).join(' ');
    return (
      <>
        {rest}{' '}<em className="text-brand-blue-soft not-italic font-serif italic">{lastTwo}</em>
      </>
    );
  };

  return (
    <div className={`${alignment} mb-12 max-w-3xl ${align === 'center' ? 'mx-auto' : ''}`}>
      {eyebrow && (
        <span className="text-label uppercase text-brand-amber tracking-widest mb-3 block">
          {eyebrow}
        </span>
      )}
      <h2 className="text-display-sm md:text-display-md font-serif text-base-text mb-4">
        {renderTitle(title)}
      </h2>
      {description && (
        <p className="text-body-lg text-base-muted font-light leading-relaxed">{description}</p>
      )}
    </div>
  );
}
