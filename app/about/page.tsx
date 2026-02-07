import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Restore STL | St. Louis Real Estate Investment Team',
  description:
    'Meet the Restore STL team. Local St. Louis investors restoring neighborhoods through homeownership.',
};

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="relative min-h-[400px] md:min-h-[500px] flex items-center justify-center text-white overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at center, #2d5a8f 0%, #1e3a5f 50%, #0f172a 100%)',
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            }}
          />
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              People First. Neighborhoods Next.
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto">
              Restore STL is a St. Louis real estate investment team restoring
              neighborhoods one home at a time.
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
        </section>

        {/* Our Story Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-8 text-center">
              Our Story
            </h2>
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
              <div className="w-full md:w-2/5 flex-shrink-0">
                <Image
                  src="/images/kevin-dairaghi.jpeg"
                  alt="Kevin Dairaghi, Founder of Restore STL"
                  width={400}
                  height={500}
                  className="rounded-xl shadow-lg object-cover w-full"
                />
              </div>
              <div className="md:w-3/5 text-lg text-[var(--text-secondary)] leading-relaxed space-y-6">
                <p>
                  Kevin Dairaghi started his career as an engineer before moving
                  into construction in 2005, where he rehabbed his first home for
                  an investor. He saw firsthand how restoring one property could
                  change an entire block. That conviction grew into Restore STL
                  &mdash; a team of local investors, contractors, and real estate
                  professionals who buy distressed houses so owners can move
                  forward and neighborhoods can come back to life.
                </p>
                <p>
                  Today, Restore STL focuses on South St. Louis neighborhoods
                  including Dutchtown, Bevo Mill, Marine Villa, and Carondelet. We
                  work with homeowners facing tough situations &mdash; inherited
                  properties, costly repairs, sudden life changes &mdash; and
                  provide honest, straightforward solutions. No pressure, no fees,
                  no runaround.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How We Work Section */}
        <section className="py-16 md:py-24 bg-[var(--background-gray)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-6 text-center">
              How We Work
            </h2>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed max-w-3xl mx-auto text-center mb-12 md:mb-16">
              We&apos;re not a faceless corporation. When you reach out to
              Restore STL, you&apos;re talking to real people who live and invest
              in your neighborhood. Our team includes experienced investors,
              licensed contractors, and local real estate professionals who
              understand St. Louis.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Zero Repairs */}
              <div className="bg-white rounded-xl p-8 text-center shadow-sm hover:shadow-lg transition-shadow duration-200">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--brand-yellow)] to-[#f59e0b] flex items-center justify-center shadow-lg">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">
                  Zero Repairs Required
                </h3>
                <p className="text-[var(--text-secondary)]">
                  We buy as-is. No cleanouts, no fix-ups.
                </p>
              </div>

              {/* Close On Your Timeline */}
              <div className="bg-white rounded-xl p-8 text-center shadow-sm hover:shadow-lg transition-shadow duration-200">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--brand-yellow)] to-[#f59e0b] flex items-center justify-center shadow-lg">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">
                  Close On Your Timeline
                </h3>
                <p className="text-[var(--text-secondary)]">
                  7 days or 90 days. Your choice.
                </p>
              </div>

              {/* No Fees or Commissions */}
              <div className="bg-white rounded-xl p-8 text-center shadow-sm hover:shadow-lg transition-shadow duration-200">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--brand-yellow)] to-[#f59e0b] flex items-center justify-center shadow-lg">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">
                  No Fees or Commissions
                </h3>
                <p className="text-[var(--text-secondary)]">
                  Keep more of what&apos;s yours.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Kevin Quote Block */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <blockquote>
              <p className="text-2xl md:text-3xl font-medium italic text-[var(--text-primary)] mb-6 leading-relaxed">
                &ldquo;I started flipping houses because I wanted to restore
                neighborhoods. What I realized is that what I was actually
                rehabbing was myself.&rdquo;
              </p>
              <footer className="text-lg text-[var(--text-secondary)] font-medium">
                &mdash; Kevin Dairaghi, Founder
              </footer>
            </blockquote>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
              Ready to talk?
            </h2>
            <p className="text-lg text-[var(--text-secondary)] mb-8">
              We&apos;ll give you an honest assessment &mdash; no obligation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/sell"
                className="inline-block bg-[var(--brand-yellow)] hover:bg-[var(--brand-yellow-hover)] text-[var(--charcoal-deep)] font-bold text-lg px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl min-h-[44px]"
              >
                Get Your Cash Offer
              </Link>
              <span className="text-[var(--text-secondary)]">or</span>
              <a
                href="tel:+13147508211"
                className="inline-flex items-center gap-2 text-[var(--text-primary)] hover:text-[var(--brand-yellow)] font-semibold text-lg transition-colors duration-200"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                (314) 750-8211
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
