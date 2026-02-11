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
    initials: 'KD',
    name: 'Kevin Dairaghi',
    role: 'Founder',
    description:
      'Real estate has been a part of Kevin\u2019s life in a lot of different ways for many years. He founded RestoreSTL to give St. Louis homeowners something the industry won\u2019t \u2014 honest information and real options.',
  },
  {
    initials: 'CO',
    name: 'Chris O\u2019Keefe',
    role: 'Technology Director',
    description:
      'Your first call. Chris walks you through the numbers \u2014 what your property is worth, what your options are, and what each path actually costs.',
  },
  {
    initials: 'JJ',
    name: 'Jake Jakubisin',
    role: 'Creative Director',
    description:
      'Jake runs the KD Podcast and creates the content that brought you here. If you saw a Restore STL video or ad \u2014 that was Jake.',
  },
];

const PILLARS = [
  {
    icon: '\uD83E\uDDE0',
    quote: 'The most important real estate is between your ears.',
    theme: 'Mindset',
  },
  {
    icon: '\u2696\uFE0F',
    quote: 'Personal drives professional.',
    theme: 'Balance',
  },
  {
    icon: '\uD83E\uDD1D',
    quote: 'It\u2019s all about relationships.',
    theme: 'Connection',
  },
];

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main>
        {/* ── Section 1: Hero ─────────────────────────────────────── */}
        <section className="relative min-h-[400px] md:min-h-[500px] flex items-center justify-center text-white overflow-hidden">
          <div className="absolute inset-0 bg-black" />
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              People First
            </h1>
            <p className="text-xl md:text-2xl text-gray-300">
              Small team, big impact.
            </p>
          </div>
        </section>

        {/* ── Section 2: The Team ─────────────────────────────────── */}
        <section className="py-16 md:py-24 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
              The Team
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {TEAM.map((member) => (
                <div
                  key={member.initials}
                  className="bg-[#1a1a1a] rounded-xl p-8 text-center"
                >
                  <div className="flex justify-center mb-6">
                    <div className="w-28 h-28 rounded-full bg-[var(--charcoal-deep)] flex items-center justify-center ring-4 ring-[var(--brand-yellow)]/20">
                      <span className="text-4xl font-bold text-[var(--brand-yellow)]">
                        {member.initials}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm font-medium text-[var(--brand-yellow)] mb-4">
                    {member.role}
                  </p>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {member.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Section 3: Three Pillars ────────────────────────────── */}
        <section className="py-16 md:py-24 bg-[#0a0a0a]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {PILLARS.map((pillar) => (
                <div
                  key={pillar.theme}
                  className="bg-white/5 border border-white/10 rounded-xl p-8 text-center"
                >
                  <div className="text-4xl mb-4">{pillar.icon}</div>
                  <p className="text-white text-lg italic mb-4 leading-relaxed">
                    &ldquo;{pillar.quote}&rdquo;
                  </p>
                  <p className="text-[var(--brand-yellow)] font-bold text-sm uppercase tracking-wider">
                    {pillar.theme}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Section 4: Kevin Quote ──────────────────────────────── */}
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

        {/* ── Section 5: Join the Team + Sign-off ─────────────────── */}
        <section className="py-16 md:py-24 bg-black text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Are you exceptional? Want to join our team?
            </h2>
            <Link
              href="/book"
              className="inline-block bg-[var(--brand-yellow)] hover:bg-[var(--brand-yellow-hover)] text-[var(--charcoal-deep)] font-bold text-lg px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl min-h-[44px] mb-16"
            >
              Time to Talk
            </Link>

            <p className="text-2xl md:text-3xl font-bold text-[var(--brand-yellow)]">
              People over profit. Every time.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
