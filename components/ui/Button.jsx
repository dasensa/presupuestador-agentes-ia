import Link from 'next/link';

const variants = {
  primary: 'bg-brand-mint text-[#041012] font-semibold hover:bg-[#7dfcf2] shadow-[0_0_22px_rgba(0,245,228,0.22)]',
  secondary: 'border border-brand-mint/45 bg-[#061214] text-base-text hover:border-brand-mint hover:bg-brand-mint/10',
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
