import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';

export const metadata: Metadata = {
  title: 'About',
  description: 'About SWIM - artist bio, press, and contact information.',
};

export default function AboutPage() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <h1 className="text-4xl font-bold uppercase tracking-wider text-white sm:text-5xl">
          About
        </h1>

        <div className="mt-16 max-w-2xl">
          <p className="text-lg leading-relaxed text-white/80">
            SWIM is an artist based in Austin, TX. Blending dark, atmospheric
            soundscapes with raw lyrical honesty, SWIM creates music that sits
            in the space between what we show the world and what we carry
            inside.
          </p>
          <p className="mt-6 text-lg leading-relaxed text-white/80">
            With releases like &ldquo;New Moon&rdquo; and &ldquo;Dead &
            Buried,&rdquo; SWIM explores themes of transformation, loss, and
            the quiet resilience it takes to keep moving forward.
          </p>
        </div>

        <div className="mt-16 grid gap-12 border-t border-border pt-16 sm:grid-cols-2">
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">
              Press
            </h2>
            <p className="mt-4 text-sm text-white/70">
              For press inquiries, interviews, and media requests:
            </p>
            <a
              href="mailto:press@swim.art"
              className="mt-2 inline-block text-sm text-white transition-colors hover:text-white/80"
            >
              press@swim.art
            </a>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">
              Booking
            </h2>
            <p className="mt-4 text-sm text-white/70">
              For live show bookings and performance inquiries:
            </p>
            <a
              href="mailto:booking@swim.art"
              className="mt-2 inline-block text-sm text-white transition-colors hover:text-white/80"
            >
              booking@swim.art
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
