import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';

export const metadata: Metadata = {
  title: 'Music',
  description: 'Listen to SWIM - latest releases, singles, and EPs.',
};

const RELEASES = [
  {
    title: 'NEW MOON',
    type: 'Single',
    year: '2025',
    link: 'https://ffm.to/swimnewmoon',
    description: 'The latest single from SWIM.',
  },
  {
    title: 'DEAD & BURIED',
    type: 'Single',
    year: '2024',
    link: 'https://ffm.to/deadandburied',
    description: 'A haunting exploration of letting go.',
  },
] as const;

export default function MusicPage() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <h1 className="text-4xl font-bold uppercase tracking-wider text-white sm:text-5xl">
          Music
        </h1>
        <p className="mt-4 text-lg text-muted">
          Releases, singles, and EPs.
        </p>

        <div className="mt-16 grid gap-12 sm:grid-cols-2">
          {RELEASES.map((release) => (
            <a
              key={release.title}
              href={release.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="aspect-square w-full bg-card transition-colors group-hover:bg-card-hover">
                <div className="flex h-full items-center justify-center">
                  <span className="text-3xl font-bold uppercase tracking-widest text-white/20">
                    {release.title}
                  </span>
                </div>
              </div>
              <div className="mt-4">
                <h2 className="text-xl font-semibold uppercase tracking-wider text-white">
                  {release.title}
                </h2>
                <p className="mt-1 text-sm text-muted">
                  {release.type} &middot; {release.year}
                </p>
                <p className="mt-2 text-sm text-white/60">{release.description}</p>
              </div>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
