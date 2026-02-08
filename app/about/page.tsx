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
      'Chris is who you talk to when you reach out. He walks you through the numbers \u2014 what your property is worth, what your options look like, and what each path actually costs. He got into real estate over a decade ago, learned the industry from the inside, and realized that technology could put real information in homeowners\u2019 hands without the games. That\u2019s why he built the tools behind Restore STL.',
  },
  {
    initials: 'KD',
    name: 'Kevin Dairaghi',
    role: 'Deal Strategist & Closer',
    description:
      'Kevin has been in St. Louis real estate for over 25 years. He started in engineering, moved into construction, and rehabbed his first home for an investor in 2005. He saw firsthand how restoring one property could change an entire block. Kevin is a licensed agent with eXp Realty, trains other investors on deal evaluation, and has active relationships with private lenders and banks. When Kevin visits your property, you\u2019re getting the person who wrote the playbook.',
  },
  {
    initials: 'JJ',
    name: 'Jake Jakubisin',
    role: 'Creative Director',
    description:
      'Jake runs the KD Podcast and turns our campaigns into the content that brought you here. If you saw a video, an ad, or a post from Restore STL \u2014 that was Jake. He\u2019s the reason you\u2019re on this page right now.',
  },
];

const PROMISES = [
  'Your information stays with Restore STL. We never sell your data to investor lists.',
  'Every person who contacts you is vetted by our team. One call. One team.',
  'We show you both paths \u2014 cash and MLS \u2014 honestly. Even when it costs us the deal.',
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
              Restore STL is a St. Louis real estate team restoring
              neighborhoods one home at a time. We help homeowners navigate
              tough situations with honest numbers and real options.
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
        </section>

        {/* ── Section 2: Our Story ────────────────────────────────── */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-8 text-center">
              Our Story
            </h2>
            <div className="text-lg text-[var(--text-secondary)] leading-relaxed space-y-6">
              <p>
                Kevin Dairaghi founded Restore STL with a straightforward
                belief: homeowners facing tough decisions deserve honest
                information and real options &mdash; not a sales pitch.
              </p>
              <p>
                In real estate, the largest asset of most people&apos;s lives is
                locked behind gatekeepers. Want to know your home&apos;s value?
                Talk to an agent. Want to see your options? Sign a contract.
                Want honest numbers? Good luck.
              </p>
              <p>
                We operate differently. Our tools give you real data &mdash;
                property values, repair estimates, comparable sales &mdash;
                before anyone asks for a dime. Then we show you every option:
                cash offer, MLS listing, or something in between. Even when the
                honest answer isn&apos;t the most profitable one for us.
              </p>
              <p>
                A good real estate agent is worth every dollar of their
                commission. We work with agents every day. But you shouldn&apos;t
                need one just to get information about your own property.
              </p>
              <p>
                Today, Restore STL is driven by a growing team of investors,
                agents, and professionals who share that same belief. The three
                people below are who you&apos;ll work with directly &mdash; but
                there&apos;s a bigger crew behind the scenes making it all
                happen.
              </p>
            </div>
          </div>
        </section>

        {/* ── Section 3: The Team ─────────────────────────────────── */}
        <section className="py-16 md:py-24 bg-[#f8f8f8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-12 text-center">
              The Team
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {TEAM.map((member) => (
                <div
                  key={member.initials}
                  className="bg-white rounded-xl p-8 text-center shadow-sm hover:shadow-lg transition-shadow duration-200"
                >
                  {/* TODO: Replace monogram with actual photo */}
                  <div className="flex justify-center mb-5">
                    <div className="w-[120px] h-[120px] rounded-full bg-[var(--charcoal-deep)] flex items-center justify-center ring-4 ring-[var(--brand-yellow)]/20">
                      <span className="text-3xl font-bold text-[var(--brand-yellow)]">
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

        {/* ── Section 4: How We're Different ──────────────────────── */}
        <section className="py-16 md:py-24 bg-[var(--charcoal-deep)] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              How We&apos;re Different
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
              {/* Left column — body copy */}
              <div className="text-lg text-gray-300 leading-relaxed space-y-6">
                <p>
                  Most real estate companies want to be your only option. We
                  want to show you all of them.
                </p>
                <p>
                  When you reach out to Restore STL, we pull real data on your
                  property &mdash; comparable sales, repair estimates, market
                  trends &mdash; and walk you through what each path actually
                  looks like. Cash offer. MLS listing. Something in between.
                </p>
                <p>
                  We don&apos;t hide numbers to push you toward the option that
                  makes us the most money. We show you the math and let you
                  decide. Sometimes the right answer for you isn&apos;t a cash
                  offer. Sometimes it is. Either way, you&apos;ll know exactly
                  where you stand.
                </p>
              </div>

              {/* Right column — Our Promise callout */}
              <div className="border-l-4 border-[var(--brand-yellow)] bg-white/5 rounded-r-lg p-6 md:p-8">
                <h3 className="text-xl font-bold mb-6">Our Promise</h3>
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
                      <span className="text-gray-300 leading-relaxed">
                        {text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 5: Kevin Quote ──────────────────────────────── */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <blockquote>
              <p className="text-2xl md:text-3xl font-medium italic text-[var(--text-primary)] mb-6 leading-relaxed">
                <span className="text-[var(--brand-yellow)]">&ldquo;</span>I
                started flipping houses because I wanted to restore
                neighborhoods. What I realized is that what I was actually
                rehabbing was myself.<span className="text-[var(--brand-yellow)]">&rdquo;</span>
              </p>
              <footer className="text-lg text-[var(--text-secondary)] font-medium">
                &mdash; Kevin Dairaghi, Founder
              </footer>
            </blockquote>
          </div>
        </section>

        {/* ── Section 6: CTA — Ready to Talk? ─────────────────────── */}
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
