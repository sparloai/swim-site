import Link from 'next/link';
import { Container } from '@/components/ui/Container';

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center py-24">
      <Container className="text-center">
        <h1 className="text-6xl font-bold text-white">404</h1>
        <p className="mt-4 text-lg text-muted">Page not found.</p>
        <Link
          href="/"
          className="mt-8 inline-flex min-h-[44px] items-center border border-white px-6 py-3 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          Go Home
        </Link>
      </Container>
    </section>
  );
}
