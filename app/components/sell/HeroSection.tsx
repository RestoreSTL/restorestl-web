export default function HeroSection() {
  return (
    <section className="relative min-h-[500px] md:min-h-[600px] flex items-center justify-center text-white overflow-hidden">
      {/* Clean gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, #2d5a8f 0%, #1e3a5f 50%, #0f172a 100%)',
        }}
      />

      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Sell Your House in St. Louis
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl mb-10 text-gray-200 max-w-2xl mx-auto">
          Get a fair cash offer in 24 hours, or list for top dollar.
          We show you all your options—you decide what&apos;s best.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#instant-offer"
            className="inline-block bg-[var(--brand-yellow)] hover:bg-[var(--brand-yellow-hover)] text-[var(--charcoal-deep)] font-bold text-lg sm:text-xl px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl min-h-[44px]"
          >
            Get Instant Cash Offer
          </a>
          <a
            href="#compare-options"
            className="inline-block bg-white hover:bg-gray-100 text-[var(--charcoal-deep)] font-bold text-lg sm:text-xl px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl min-h-[44px]"
          >
            Compare Your Options
          </a>
        </div>
      </div>

      {/* Bottom fade for smooth transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[var(--background-gray)] to-transparent" />
    </section>
  );
}
