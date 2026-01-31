export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-[var(--charcoal-deep)] text-white py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">RestoreSTL</h1>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-bold mb-6 text-[var(--text-primary)]">
            Simple, Fast Cash for Houses
          </h1>
          <p className="text-xl text-[var(--text-secondary)] mb-8">
            Click below to find out how much your house is worth.
          </p>
          
          <button className="bg-[var(--brand-yellow)] hover:bg-[var(--brand-yellow-hover)] text-[var(--charcoal-deep)] font-semibold px-8 py-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg">
            What's my house worth?
          </button>
        </div>
      </section>

      {/* Color Test */}
      <section className="py-16 px-4 bg-[var(--background-gray)]">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold mb-8 text-center">Brand Colors Test</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="h-24 rounded-lg bg-[var(--brand-yellow)] mb-2"></div>
              <p className="text-sm font-mono">Brand Yellow</p>
            </div>

            <div className="text-center">
              <div className="h-24 rounded-lg bg-[var(--brand-green)] mb-2"></div>
              <p className="text-sm font-mono">Brand Green</p>
            </div>

            <div className="text-center">
              <div className="h-24 rounded-lg bg-[var(--charcoal-deep)] mb-2"></div>
              <p className="text-sm font-mono">Deep Charcoal</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[var(--charcoal-deep)] text-white py-8 text-center">
        <p>RestoreSTL - Next.js Test</p>
      </footer>
    </main>
  );
}
