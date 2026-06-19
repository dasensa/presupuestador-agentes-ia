export default function AnimatedCounter({ value, suffix = '' }) {
  return (
    <span className="font-serif italic text-brand-blue-soft">
      {value}{suffix}
    </span>
  );
}
