import { Container } from '@/components/ui/Container';

const RELEASES = [
  {
    title: 'NEW MOON',
    type: 'Single',
    link: 'https://ffm.to/swimnewmoon',
    year: '2025',
  },
  {
    title: 'DEAD & BURIED',
    type: 'Single',
    link: 'https://ffm.to/deadandburied',
    year: '2024',
  },
] as const;

export function FeaturedMusic() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <h2 className="mb-12 text-xs font-semibold uppercase tracking-[0.3em] text-muted">
          Latest Releases
        </h2>
        <div className="grid gap-8 sm:grid-cols-2">
          {RELEASES.map((release) => (
            <a
              key={release.title}
              href={release.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              {/* Album art placeholder */}
              <div className="aspect-square w-full bg-card transition-colors group-hover:bg-card-hover">
                <div className="flex h-full items-center justify-center">
                  <span className="text-2xl font-bold uppercase tracking-widest text-white/20">
                    {release.title}
                  </span>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold uppercase tracking-wider text-white">
                  {release.title}
                </h3>
                <p className="mt-1 text-sm text-muted">
                  {release.type} &middot; {release.year}
                </p>
              </div>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
