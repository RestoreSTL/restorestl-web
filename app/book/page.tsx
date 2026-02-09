import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import CalendlyEmbed from '../components/book/CalendlyEmbed';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book a Free Property Consultation | Restore STL',
  description:
    'Schedule a free 15-minute call with a local St. Louis property specialist. Get a detailed property analysis report with comparable sales, repair estimates, and your full market breakdown.',
};

export default function BookPage() {
  return (
    <>
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="bg-[var(--charcoal-deep)] py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Free Property Consultation
            </h1>
            <p className="text-xl md:text-2xl text-[var(--brand-yellow)] font-medium mb-3">
              15 minutes. No pressure. Just real numbers for your property.
            </p>
            <p className="text-gray-400 text-lg">
              Talk with a local St. Louis property specialist who knows your neighborhood.
            </p>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-14 bg-[var(--background-gray)]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Step 1 */}
              <div className="bg-white rounded-xl p-6 shadow-sm text-center">
                <div className="text-4xl mb-3">📋</div>
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">
                  1. We Prepare
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  Before the call, we pull comparable sales, analyze market
                  trends, and build a detailed property analysis report just for
                  you.
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-white rounded-xl p-6 shadow-sm text-center">
                <div className="text-4xl mb-3">📞</div>
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">
                  2. We Talk
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  We walk through the numbers together — your home&apos;s value,
                  what repairs (if any) would boost it, and what a cash offer
                  could look like.
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-white rounded-xl p-6 shadow-sm text-center">
                <div className="text-4xl mb-3">✅</div>
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">
                  3. You Decide
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  No obligation. You keep the report either way. If our offer
                  makes sense, great — if not, you&apos;re more informed for
                  whatever comes next.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Calendly Embed */}
        <section className="py-14 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-[var(--border-gray)]">
              {/* Yellow Header Bar */}
              <div className="bg-[var(--brand-yellow)] px-6 py-4 text-center">
                <h2 className="text-xl font-bold text-[var(--charcoal-deep)]">
                  Pick a Time That Works for You
                </h2>
              </div>
              <div className="p-2 sm:p-4">
                <CalendlyEmbed />
              </div>
            </div>
          </div>
        </section>

        {/* Trust Signals */}
        <section className="py-12 bg-[var(--background-gray)]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <p className="text-sm text-[var(--text-secondary)] flex items-center justify-center gap-2">
              <span>🔒</span>
              Your information is private and will never be shared with third
              parties.
            </p>

            <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-[var(--text-primary)]">
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                100% Free
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                No Obligation
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                15 Minutes
              </span>
            </div>
          </div>
        </section>

        {/* Prefer to Call */}
        <section className="py-12 bg-white">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">
              Prefer to call or text?
            </h3>
            <p className="text-[var(--text-secondary)] mb-4">
              Reach us directly — we respond fast.
            </p>
            <a
              href="tel:+13147363311"
              className="inline-flex items-center gap-3 bg-[var(--charcoal-deep)] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-800 transition-colors min-h-[44px]"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              (314) 736-3311
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
