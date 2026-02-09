import Link from 'next/link';

const situations = [
  {
    title: 'Inherited Property',
    description:
      'Dealing with an inherited home? We understand the emotional and logistical challenges.',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    ),
  },
  {
    title: 'Senior Living Transition',
    description:
      'Moving to assisted living or downsizing? We make the process simple and stress-free.',
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    ),
  },
  {
    title: 'Sudden Life Change',
    description:
      "Life happens. Divorce, job loss, health issues—we're here to help, no judgment.",
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
  },
];

export default function SituationsSection() {
  return (
    <section className="py-16 md:py-24 bg-[var(--background-gray)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[var(--text-primary)] mb-12 md:mb-16">
          Real Answers for Real Life
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
          {situations.map((situation, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm p-6 md:p-8 text-center hover:shadow-md transition-all duration-200"
            >
              {/* Icon */}
              <div className="flex justify-center text-[var(--brand-yellow)] mb-6">
                {situation.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-bold text-[var(--text-primary)] mb-4">
                {situation.title}
              </h3>

              {/* Description */}
              <p className="text-[var(--text-secondary)] leading-relaxed">
                {situation.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/book"
            className="inline-block bg-[var(--brand-yellow)] hover:bg-[var(--brand-yellow-hover)] text-[var(--charcoal-deep)] font-bold text-lg px-8 py-4 rounded-lg transition-all duration-200 hover:shadow-lg min-h-[44px]"
          >
            Schedule a Quick Chat
          </Link>
        </div>
      </div>
    </section>
  );
}
