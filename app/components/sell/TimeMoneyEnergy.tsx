function ResourceCard({
  icon,
  title,
  description,
  cashPath,
  listingPath,
}: {
  icon: string;
  title: string;
  description: string;
  cashPath: string;
  listingPath: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="text-4xl mb-3 text-center">{icon}</div>
      <h3 className="text-xl font-bold mb-3 text-center text-[var(--text-primary)]">{title}</h3>
      <p className="text-[var(--text-secondary)] mb-4 text-sm">{description}</p>
      <div className="space-y-2 text-sm">
        <div className="bg-yellow-50 border border-yellow-200 rounded p-2">
          <div className="font-semibold text-yellow-800">Cash Offer:</div>
          <div className="text-[var(--text-secondary)]">{cashPath}</div>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded p-2">
          <div className="font-semibold text-slate-800">Traditional:</div>
          <div className="text-[var(--text-secondary)]">{listingPath}</div>
        </div>
      </div>
    </div>
  );
}

export default function TimeMoneyEnergy() {
  return (
    <section className="py-16 bg-[var(--background-gray)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 text-[var(--text-primary)]">
          The Time, Money, Energy Framework
        </h2>
        <p className="text-xl text-[var(--text-secondary)] text-center mb-12 max-w-3xl mx-auto">
          We believe every seller has three resources: Time, Money, and Energy.
          The path you choose depends on which resources you have available.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <ResourceCard
            icon="⏱️"
            title="Time"
            description="Do you have 60-90 days to wait for the right buyer? Or do you need to close in weeks?"
            cashPath="7-30 days to close"
            listingPath="60-90+ days average"
          />
          <ResourceCard
            icon="💰"
            title="Money"
            description="Can you afford $5-15k in repairs, staging, and closing costs? Or do you need zero out-of-pocket?"
            cashPath="$0 - We pay all costs"
            listingPath="$5-15k typical investment"
          />
          <ResourceCard
            icon="🔋"
            title="Energy"
            description="Can you handle showings, open houses, and the stress of listing? Or do you want a simple, one-step process?"
            cashPath="One walkthrough, done"
            listingPath="Multiple showings, negotiations"
          />
        </div>

        <div className="bg-[var(--charcoal-deep)] text-white rounded-2xl p-8 md:p-12">
          <h3 className="text-2xl font-bold mb-4 text-center">
            The Honest Truth About Selling
          </h3>
          <div className="max-w-3xl mx-auto space-y-4 text-lg">
            <p>
              <strong>If you have all three resources</strong> (time, money, and energy),
              listing your home traditionally will likely get you the highest sale price.
              We&apos;ll help you do that through our EXP Realty partnership.
            </p>
            <p>
              <strong>If you&apos;re missing any one of these resources</strong>, a cash offer
              might be your best option. You&apos;ll get a fair price, close quickly, and avoid
              the costs and stress of a traditional sale.
            </p>
            <p className="text-[var(--brand-yellow)] font-bold">
              Either way, we win—and more importantly, so do you. We&apos;re here to show you
              both paths honestly and let you decide what&apos;s best for your situation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
