import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[var(--charcoal-deep)] py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* CTA Section */}
        <div className="mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Need to sell ASAP?
          </h3>
          <Link
            href="/sell"
            className="inline-block text-[var(--brand-yellow)] hover:text-[var(--brand-yellow-hover)] font-medium text-lg underline underline-offset-4 transition-colors duration-200"
          >
            Book a time to chat.
          </Link>
        </div>

        {/* Divider */}
        <div className="w-24 h-px bg-white/20 mx-auto mb-8" />

        {/* Copyright */}
        <p className="text-gray-400 text-sm">
          Restore STL &copy; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
