import Link from 'next/link';

const variants = {
  primary: 'bg-brand-blue text-white font-medium hover:opacity-90',
  secondary: 'border-b border-base-muted text-base-muted hover:text-base-text hover:border-base-text bg-transparent',
  ghost: 'text-base-muted hover:text-base-text bg-transparent',
};

const sizes = {
  sm: 'px-4 py-2 text-body-sm',
  md: 'px-6 py-3 text-body-sm',
  lg: 'px-8 py-4 text-body',
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
