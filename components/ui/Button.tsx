'use client';

import { clsx } from 'clsx';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-white text-black hover:bg-white/90 focus-visible:ring-white',
  secondary:
    'border border-white text-white hover:bg-white hover:text-black focus-visible:ring-white',
  ghost:
    'text-white hover:text-white/80 focus-visible:ring-white',
};

export function Button({
  children,
  variant = 'primary',
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
}) {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center px-6 py-3 text-sm font-semibold uppercase tracking-widest transition-colors duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black',
        'disabled:pointer-events-none disabled:opacity-50',
        'min-h-[44px] min-w-[44px]',
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
