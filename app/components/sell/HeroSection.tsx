import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative min-h-[350px] md:min-h-[450px] flex items-center justify-center text-white overflow-hidden">
      {/* Video placeholder — swap for <video> when TICKET-017 delivers */}
      <div className="absolute inset-0 bg-black" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
          You&apos;ve Got Enough <span className="whitespace-nowrap">Going On.</span>
        </h1>
        <p className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight text-[var(--brand-yellow)]">
          Now You&apos;ve Got Us.
        </p>
        <p className="text-xl md:text-2xl text-gray-300 mb-8">
          Your friends in real estate.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#instant-offer"
            className="inline-block bg-[var(--brand-yellow)] hover:bg-[var(--brand-yellow-hover)] text-[var(--charcoal-deep)] font-bold text-lg px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl min-h-[44px]"
          >
            See Your Home&apos;s Value
          </a>
          <Link
            href="/book"
            className="inline-flex items-center gap-2 text-gray-300 hover:text-[var(--brand-yellow)] font-semibold text-lg transition-colors duration-200"
          >
            Book a Call with Kevin
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
