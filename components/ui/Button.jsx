import Link from 'next/link';

const variants = {
  primary: 'bg-brand-amber text-[#141008] font-semibold hover:bg-[#ffd766] shadow-[0_0_0_1px_rgba(255,198,46,0.18)]',
  secondary: 'border border-border bg-white/[0.03] text-base-text hover:border-border-hover hover:bg-white/[0.06]',
  ghost: 'text-base-muted hover:text-base-text bg-transparent',
};

const sizes = {
  sm: 'px-4 py-2 text-body-sm rounded',
  md: 'px-6 py-3 text-body-sm rounded',
  lg: 'px-7 py-3.5 text-body rounded',
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
