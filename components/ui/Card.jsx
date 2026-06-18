export default function Card({ children, hover = false, className = '', ...props }) {
  return (
    <div
      className={`glass-card p-6 ${hover ? 'transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-gold-400/5 hover:border-gold-400/30' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
