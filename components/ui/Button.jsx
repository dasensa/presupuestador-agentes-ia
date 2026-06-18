import Link from 'next/link';

const variants = {
  primary: 'bg-gradient-to-r from-gold-400 to-gold-600 text-navy-950 font-bold hover:from-gold-500 hover:to-gold-700 shadow-lg shadow-gold-400/20',
  secondary: 'border border-gold-400/50 text-gold-400 hover:bg-gold-400/10 hover:border-gold-400',
  ghost: 'text-slate-300 hover:text-white hover:bg-navy-700/50',
  accent: 'bg-accent-600 text-white font-bold hover:bg-accent-700 shadow-lg shadow-accent-600/20',
};

const sizes = {
  sm: 'px-4 py-2 text-sm rounded-lg',
  md: 'px-6 py-3 text-sm rounded-lg',
  lg: 'px-8 py-4 text-base rounded-xl',
};

export default function Button({ children, variant = 'primary', size = 'md', href, className = '', ...props }) {
  const classes = `inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
