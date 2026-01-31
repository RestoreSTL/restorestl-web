import Link from 'next/link';

export default function MissionSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Logo - Simple text */}
        <div className="mb-4">
          <span className="text-4xl md:text-5xl font-bold">
            <span className="text-[var(--brand-yellow)]">Restore </span>
            <span className="text-gray-400">STL</span>
          </span>
        </div>

        {/* Tagline */}
        <p className="text-lg md:text-xl text-[var(--brand-green)] font-medium mb-8 md:mb-10 italic">
          &ldquo;Restoring St. Louis Through Homeownership&rdquo;
        </p>

        {/* Headline */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mb-6 md:mb-8">
          People First. Neighborhoods Next.
        </h2>

        {/* Mission Statement */}
        <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed mb-10 md:mb-12 max-w-3xl mx-auto">
          We buy distressed houses directly for cash to restore neighborhoods, hire local talent,
          and create homeownership opportunities. Our focus is on understanding your situation and
          providing solutions.
        </p>

        {/* CTA Button */}
        <Link
          href="/sell"
          className="inline-block bg-[var(--brand-yellow)] hover:bg-[var(--brand-yellow-hover)] text-[var(--charcoal-deep)] font-bold text-lg px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl min-h-[44px]"
        >
          Learn More
        </Link>
      </div>
    </section>
  );
}
