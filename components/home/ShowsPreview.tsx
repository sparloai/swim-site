import Link from 'next/link';
import { Container } from '@/components/ui/Container';

const UPCOMING_SHOWS = [
  {
    date: 'NOV 15, 2025',
    title: 'SWIM & FRIENDS VOL 1',
    venue: 'Saturn ATX',
    city: 'Austin, TX',
    time: '9:00 PM',
  },
] as const;

export function ShowsPreview() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <div className="flex items-baseline justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">
            Upcoming Shows
          </h2>
          <Link
            href="/shows"
            className="text-xs uppercase tracking-widest text-white/60 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            View All
          </Link>
        </div>

        <div className="mt-12 space-y-0 divide-y divide-border">
          {UPCOMING_SHOWS.map((show) => (
            <div
              key={show.title}
              className="flex flex-col gap-2 py-6 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-8">
                <span className="text-sm font-semibold uppercase tracking-widest text-white">
                  {show.date}
                </span>
                <span className="text-lg font-semibold text-white">
                  {show.title}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted">
                <span>{show.venue}</span>
                <span>&middot;</span>
                <span>{show.city}</span>
                <span>&middot;</span>
                <span>{show.time}</span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
