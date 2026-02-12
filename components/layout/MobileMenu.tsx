'use client';

import { clsx } from 'clsx';
import Link from 'next/link';
import { useEffect } from 'react';

type NavLink = { href: string; label: string };

export function MobileMenu({
  open,
  onClose,
  links,
}: {
  open: boolean;
  onClose: () => void;
  links: readonly NavLink[];
}) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <div
      className={clsx(
        'fixed inset-0 z-[60] bg-black transition-opacity duration-300 md:hidden',
        open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
      )}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
    >
      <div className="flex h-full flex-col items-center justify-center gap-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 flex min-h-[44px] min-w-[44px] items-center justify-center text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          aria-label="Close menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="text-3xl font-light uppercase tracking-[0.2em] text-white transition-colors hover:text-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            {link.label}
          </Link>
        ))}

        <Link
          href="/about"
          onClick={onClose}
          className="text-3xl font-light uppercase tracking-[0.2em] text-white transition-colors hover:text-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          About
        </Link>
      </div>
    </div>
  );
}
