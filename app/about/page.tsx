import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Restore STL | St. Louis Real Estate Team',
  description:
    'Meet the Restore STL team. Local St. Louis real estate professionals restoring neighborhoods one home at a time with honest numbers and real options.',
};

const TEAM = [
  {
    initials: 'CO',
    name: 'Chris O\u2019Keefe',
    role: 'First Point of Contact',
    description:
      'Your first call. Chris walks you through the numbers \u2014 what your property is worth, what your options are, and what each path actually costs.',
  },
  {
    initials: 'KD',
    name: 'Kevin Dairaghi',
    role: 'Investment Advisor & Consultant',
    description:
      '25+ years in St. Louis real estate. Kevin visits your property, evaluates the deal, and makes the offer. He trains other investors on this exact process.',
  },
  {
    initials: 'JJ',
    name: 'Jake Jakubisin',
    role: 'Creative Director',
    description:
      'Jake runs the KD Podcast and creates the content that brought you here. If you saw a Restore STL video or ad \u2014 that was Jake.',
  },
];

const TRUST_SIGNALS = [
  {
    icon: '\uD83C\uDFE0',
    headline: '25+ Years in St. Louis',
    subtext: 'Local experience across South City, Dutchtown, Bevo Mill, and beyond.',
  },
  {
    icon: '\u2696\uFE0F',
    headline: 'Two Paths, Your Choice',
    subtext: 'Cash offer or MLS listing. We show you the numbers on both.',
  },
  {
    icon: '\uD83E\uDD1D',
    headline: 'One Call. One Team.',
    subtext: 'Your info stays with us. No investor lists. No strangers calling.',
  },
];

const DIFFERENTIATORS = [
  {
    icon: '\u2696\uFE0F',
    headline: 'Every Option on the Table',
    description:
      'Cash offer, MLS listing, or something in between. We show you the math on every path and let you decide.',
  },
  {
    icon: '\uD83D\uDD12',
    headline: 'Your Data Stays With Us',
    description:
      'Your information never gets sold to an investor list. You talk to us \u2014 that\u2019s it. No spam, no strangers.',
  },
  {
    icon: '\uD83D\uDCCD',
    headline: 'Local Team, Not a Call Center',
    description:
      'We live and invest in St. Louis. Anyone who contacts you from Restore STL is vetted by our team.',
  },
];

const PROMISES = [
  'A good agent is worth every dollar. We work with agents every day. But you shouldn\u2019t need one just to get information about your own property.',
  'We don\u2019t hide numbers to push you toward the option that makes us the most money.',
  'Sometimes the right answer isn\u2019t a cash offer. Sometimes it is. Either way, you\u2019ll know where you stand.',
];

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main>
        {/* ── Section 1: Hero ─────────────────────────────────────── */}
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
              Honest information. Real options. A local team that shows you
              every path &mdash; even when it&apos;s not the most profitable one
              for us.
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
        </section>

        {/* ── Section 2: Our Story (SHORT) ────────────────────────── */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-6">
              Our Story
            </h2>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
              Kevin Dairaghi founded Restore STL to give St. Louis homeowners
              something the industry won&apos;t &mdash; honest information and
              real options, not a sales pitch. Today we&apos;re a growing team
              of investors, agents, and professionals who believe you
              shouldn&apos;t have to enter someone&apos;s funnel just to
              understand your own property.
            </p>
          </div>
        </section>

        {/* ── Section 3: Trust Signals ──────────────────────────────── */}
        <section className="py-12 md:py-16 bg-[#f8f8f8]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {TRUST_SIGNALS.map((item) => (
                <div
                  key={item.headline}
                  className="flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-full bg-[var(--brand-yellow)]/10 flex items-center justify-center flex-shrink-0 text-xl">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[var(--text-primary)] leading-snug">
                      {item.headline}
                    </p>
                    <p className="text-xs text-[var(--text-secondary)] leading-snug mt-0.5">
                      {item.subtext}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Section 4: The Team ─────────────────────────────────── */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-12 text-center">
              The Team
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {TEAM.map((member) => (
                <div
                  key={member.initials}
                  className="bg-white rounded-xl p-8 text-center"
                >
                  {/* TODO: Replace monogram with actual photo */}
                  <div className="flex justify-center mb-6">
                    <div className="w-28 h-28 rounded-full bg-[var(--charcoal-deep)] flex items-center justify-center ring-4 ring-[var(--brand-yellow)]/20">
                      <span className="text-4xl font-bold text-[var(--brand-yellow)]">
                        {member.initials}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-[var(--text-primary)] mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm font-medium text-[var(--brand-yellow)] mb-4">
                    {member.role}
                  </p>
                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                    {member.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Section 5: Mid-Page CTA ─────────────────────────────── */}
        <section className="py-12 md:py-16 bg-[var(--brand-yellow)]/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-lg font-medium text-[var(--text-primary)] mb-5">
              Have questions about your property?
            </p>
            <Link
              href="/sell"
              className="inline-block bg-[var(--brand-yellow)] hover:bg-[var(--brand-yellow-hover)] text-[var(--charcoal-deep)] font-bold text-lg px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl min-h-[44px]"
            >
              Get Your Free Estimate
            </Link>
          </div>
        </section>

        {/* ── Section 6: How We're Different ──────────────────────── */}
        <section className="py-16 md:py-24 bg-[var(--charcoal-deep)] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              How We&apos;re Different
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {DIFFERENTIATORS.map((item) => (
                <div
                  key={item.headline}
                  className="bg-white/5 rounded-xl p-8 text-center"
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-lg font-bold mb-3">{item.headline}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Section 7: Our Promise ──────────────────────────────── */}
        <section className="py-16 md:py-20 bg-[#111827]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="border-l-4 border-[var(--brand-yellow)] bg-white/5 rounded-r-lg p-6 md:p-8">
              <h3 className="text-xl font-bold text-white mb-6">
                Our Promise
              </h3>
              <ul className="space-y-5">
                {PROMISES.map((text, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <svg
                      className="w-6 h-6 text-[var(--brand-yellow)] flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-300 leading-relaxed text-sm">
                      {text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── Section 8: Kevin Quote ──────────────────────────────── */}
        <section className="py-16 md:py-24 bg-[#1a1a2e]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <blockquote>
              <p className="text-2xl md:text-3xl font-medium italic text-white mb-6 leading-relaxed">
                <span className="text-[var(--brand-yellow)]">&ldquo;</span>I
                started flipping houses because I wanted to restore
                neighborhoods. What I realized is that what I was actually
                rehabbing was myself.
                <span className="text-[var(--brand-yellow)]">&rdquo;</span>
              </p>
              <footer className="text-lg text-gray-400 font-medium">
                &mdash; Kevin Dairaghi, Founder
              </footer>
            </blockquote>
          </div>
        </section>

        {/* ── Section 9: Bottom CTA ───────────────────────────────── */}
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
                href="tel:+13147363311"
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
                (314) 736-3311
              </a>
            </div>

            <div className="mt-10 pt-8 border-t border-[var(--border-gray)]">
              <p className="text-sm text-[var(--text-secondary)] mb-2">
                Need to sell ASAP?
              </p>
              <Link
                href="/book"
                className="text-[var(--text-primary)] hover:text-[var(--brand-yellow)] font-semibold transition-colors duration-200 underline underline-offset-2"
              >
                Book a time to chat.
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
