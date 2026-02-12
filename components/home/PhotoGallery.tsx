import { Container } from '@/components/ui/Container';

export function PhotoGallery() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <h2 className="mb-12 text-xs font-semibold uppercase tracking-[0.3em] text-muted">
          Gallery
        </h2>
        {/* Placeholder grid — will be replaced with real images */}
        <div className="grid grid-cols-2 gap-1 md:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[4/5] bg-card"
              role="img"
              aria-label={`Gallery photo ${i + 1}`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
