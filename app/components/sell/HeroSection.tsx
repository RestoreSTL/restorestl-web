export default function HeroSection() {
  return (
    <section className="relative min-h-[500px] md:min-h-[600px] flex items-center justify-center text-white overflow-hidden">
      {/* Video placeholder — swap for <video> when TICKET-017 delivers */}
      <div className="absolute inset-0 bg-black" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight">
          You&apos;ve Got Enough Going On.
        </h1>
        <p className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight text-[var(--brand-yellow)]">
          Now You&apos;ve Got Us.
        </p>
        <p className="text-xl md:text-2xl text-gray-300">
          Your friends in real estate.
        </p>
      </div>
    </section>
  );
}
