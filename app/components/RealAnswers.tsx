import WMHWWidget from './wmhw/WMHWWidget';

export default function RealAnswers() {
  return (
    <section className="py-16 md:py-24 bg-[var(--charcoal-deep)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Real Answers. Real Life.
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Get educated. Know your options. Make the right call.
          </p>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Use our free tool to see what your property is worth. No login. No
            obligation. Just real numbers.
          </p>
        </div>

        {/* WMHW Widget */}
        <WMHWWidget />
      </div>
    </section>
  );
}
