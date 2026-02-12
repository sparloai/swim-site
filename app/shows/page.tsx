import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { ShowCard } from '@/components/shows/ShowCard';

export const metadata: Metadata = {
  title: 'Shows',
  description: 'SWIM live shows and tour dates. Austin, TX and beyond.',
};

const SHOWS = [
  {
    date: 'NOV 15, 2025',
    title: 'SWIM & FRIENDS VOL 1',
    venue: 'Saturn ATX',
    city: 'Austin, TX',
    time: '9:00 PM',
  },
] as const;

export default function ShowsPage() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <h1 className="text-4xl font-bold uppercase tracking-wider text-white sm:text-5xl">
          Shows
        </h1>
        <p className="mt-4 text-lg text-muted">
          Live dates and upcoming performances.
        </p>

        <div className="mt-16">
          {SHOWS.length > 0 ? (
            SHOWS.map((show) => (
              <ShowCard key={show.title} {...show} />
            ))
          ) : (
            <p className="text-lg text-white/60">
              No upcoming shows. Check back soon.
            </p>
          )}
        </div>

        <div className="mt-16 border-t border-border pt-8">
          <p className="text-sm text-muted">
            For booking inquiries:{' '}
            <a
              href="mailto:booking@swim.art"
              className="text-white/70 transition-colors hover:text-white"
            >
              booking@swim.art
            </a>
          </p>
        </div>
      </Container>
    </section>
  );
}
