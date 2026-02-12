import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background — placeholder gradient until real hero image is added */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900/50 to-black" />

      {/* Overlay content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-5xl font-bold uppercase tracking-[0.15em] text-white sm:text-6xl md:text-7xl lg:text-8xl">
          New Moon
        </h1>
        <p className="mt-4 text-sm uppercase tracking-[0.3em] text-white/60">
          Out Now
        </p>
        <Link
          href="https://ffm.to/swimnewmoon"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex min-h-[44px] items-center border border-white px-8 py-3 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          Listen Now
        </Link>
      </div>
    </section>
  );
}
