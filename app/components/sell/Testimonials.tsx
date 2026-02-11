const testimonials = [
  {
    quote: '[Sara Ceti testimonial — coming soon]',
    name: 'Sara C.',
    context: 'St. Louis Homeowner',
  },
  {
    quote: '[Listing client testimonial — coming soon]',
    name: 'Coming Soon',
    context: 'Listed with RestoreSTL',
  },
  {
    quote: '[Cash offer client testimonial — coming soon]',
    name: 'Coming Soon',
    context: 'Cash Offer Client',
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-[var(--charcoal-deep)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Tired of Getting the Wrong Answer?
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Kevin has been in real estate since 2005. RestoreSTL has been
            restoring St. Louis neighborhoods since 2015. Here&apos;s what
            people say about working with us.
          </p>
        </div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-white/5 border border-white/10 rounded-xl p-8"
            >
              <div className="text-[var(--brand-yellow)] text-4xl mb-4">
                &ldquo;
              </div>
              <p className="text-gray-300 italic mb-6 leading-relaxed">
                {testimonial.quote}
              </p>
              <div>
                <p className="text-white font-bold text-[var(--brand-yellow)]">
                  {testimonial.name}
                </p>
                <p className="text-gray-400 text-sm">{testimonial.context}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
