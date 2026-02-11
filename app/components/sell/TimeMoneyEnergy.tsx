export default function TimeMoneyEnergy() {
  return (
    <section className="py-16 md:py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* TIME */}
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="text-4xl mb-4">&#9201;&#65039;</div>
            <h3 className="text-2xl font-bold mb-3 text-[var(--text-primary)]">Time</h3>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Week, not weeks. Move at your pace &mdash; but know that when
              you&apos;re ready, we&apos;re ready.
            </p>
          </div>

          {/* ENERGY */}
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="text-4xl mb-4">&#128267;</div>
            <h3 className="text-2xl font-bold mb-3 text-[var(--text-primary)]">Energy</h3>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Take what you want. Leave what you want. No staging. No open
              houses. Simple process.
            </p>
          </div>

          {/* MONEY */}
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="text-4xl mb-4">&#128176;</div>
            <h3 className="text-2xl font-bold mb-3 text-[var(--text-primary)]">Money</h3>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              No money out of pocket. No commissions. No hidden fees. You keep
              what&apos;s yours.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
