import { Container } from '@/components/ui/Container';

export function FilmPromo() {
  return (
    <section className="border-y border-border py-24 md:py-32">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">
            Film
          </p>
          <h2 className="mt-4 text-4xl font-bold uppercase tracking-wider text-white sm:text-5xl">
            Otherside EP
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-white/70">
            The visual companion to the Otherside EP. A short film exploring
            the space between what we show and what we feel.
          </p>
          <p className="mt-8 text-sm uppercase tracking-widest text-muted">
            Text &lsquo;otherside&rsquo; to{' '}
            <a
              href="sms:7375303352"
              className="text-white transition-colors hover:text-white/80"
            >
              (737) 530-3352
            </a>
          </p>
        </div>
      </Container>
    </section>
  );
}
