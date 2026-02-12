import Link from 'next/link';
import { Container } from '@/components/ui/Container';

const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://instagram.com/swimakaswim' },
  { label: 'Spotify', href: 'https://open.spotify.com/artist/swimakaswim' },
  { label: 'Apple Music', href: 'https://music.apple.com/artist/swim' },
  { label: 'YouTube', href: 'https://youtube.com/@swimakaswim' },
] as const;

const NAV_LINKS = [
  { label: 'Music', href: '/music' },
  { label: 'Shows', href: '/shows' },
  { label: 'Merch', href: '/merch' },
  { label: 'About', href: '/about' },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-border py-16" role="contentinfo">
      <Container>
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="text-xl font-bold uppercase tracking-[0.2em] text-white"
            >
              SWIM
            </Link>
            <p className="mt-4 text-sm text-muted">Austin, TX</p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted">
              Navigate
            </h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted">
              Connect
            </h3>
            <ul className="space-y-2">
              {SOCIAL_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted">
              Booking:{' '}
              <a
                href="mailto:booking@swim.art"
                className="text-white/70 transition-colors hover:text-white"
              >
                booking@swim.art
              </a>
            </p>
          </div>
        </div>

        <div className="mt-16 border-t border-border pt-8 text-center text-xs text-muted">
          &copy; {new Date().getFullYear()} SWIM. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
