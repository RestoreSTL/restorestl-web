import WMHWWidget from '../wmhw/WMHWWidget';

export default function WMHWSection() {
  return (
    <section className="py-16 md:py-24 bg-[var(--charcoal-deep)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            The Data Is Yours. The Decision Is Yours.
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Explore your home&apos;s value with our free tool. No login. No
            obligation. No gatekeeping. Just real numbers for your property.
          </p>
        </div>

        {/* WMHW Widget */}
        <WMHWWidget />
      </div>
    </section>
  );
}
