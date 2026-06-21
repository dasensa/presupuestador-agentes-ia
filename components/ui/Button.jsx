import Link from 'next/link';

const variants = {
  primary: 'bg-gradient-to-br from-brand-blue to-brand-mint text-white font-semibold shadow-[0_16px_40px_rgba(37,99,235,0.28)] hover:-translate-y-0.5 hover:shadow-[0_22px_52px_rgba(37,99,235,0.34)]',
  secondary: 'border border-border bg-white/75 text-base-text hover:-translate-y-0.5 hover:border-cyan-300 hover:shadow-[0_18px_45px_rgba(6,182,212,0.14)]',
  ghost: 'text-base-muted hover:text-base-text bg-transparent',
};

const sizes = {
  sm: 'px-4 py-2 text-body-sm rounded-full',
  md: 'px-6 py-3 text-body-sm rounded-full',
  lg: 'px-7 py-3.5 text-body rounded-full',
};

export default function Button({ children, variant = 'primary', size = 'md', href, className = '', ...props }) {
  const classes = `inline-flex items-center justify-center gap-2 font-sans transition-all duration-200 ${variants[variant]} ${sizes[size]} ${className}`;

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
