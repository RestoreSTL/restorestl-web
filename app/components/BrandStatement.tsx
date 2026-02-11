export default function BrandStatement() {
  return (
    <section className="py-16 md:py-24 bg-[var(--charcoal-deep)] text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main brand message */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Restoring Homes. Rebuilding Neighborhoods. Creating Opportunity.
          </h2>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
            RestoreSTL is a St. Louis team that buys distressed properties, puts
            local crews to work, and creates homes people are proud to own. This
            isn&apos;t a side hustle &mdash; it&apos;s a mission.
          </p>
        </div>

        {/* WMHW intro */}
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Your home has value. You should know what it is.
          </h3>
          <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
            Most companies lock this data behind commissions and callbacks. We
            believe you deserve access to real numbers &mdash; no strings
            attached. We built a tool that gives you an instant property estimate
            so you can explore your options on your own terms.
          </p>
        </div>

        {/* TIME / ENERGY / MONEY mini cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 rounded-xl p-6 text-center">
            <div className="text-[var(--brand-yellow)] text-3xl mb-3">&#9201;</div>
            <h4 className="text-lg font-bold text-[var(--brand-yellow)] mb-2">
              TIME
            </h4>
            <p className="text-gray-300 text-sm">
              Know where you stand in minutes, not weeks.
            </p>
          </div>

          <div className="bg-white/5 rounded-xl p-6 text-center">
            <div className="text-[var(--brand-yellow)] text-3xl mb-3">&#128267;</div>
            <h4 className="text-lg font-bold text-[var(--brand-yellow)] mb-2">
              ENERGY
            </h4>
            <p className="text-gray-300 text-sm">
              No showings. No staging. No strangers in your house.
            </p>
          </div>

          <div className="bg-white/5 rounded-xl p-6 text-center">
            <div className="text-[var(--brand-yellow)] text-3xl mb-3">&#128176;</div>
            <h4 className="text-lg font-bold text-[var(--brand-yellow)] mb-2">
              MONEY
            </h4>
            <p className="text-gray-300 text-sm">
              No money out of pocket. No commissions. No surprises.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
