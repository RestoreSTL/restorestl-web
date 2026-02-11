export default function Hero() {
  return (
    <section className="relative min-h-[350px] md:min-h-[450px] flex items-center justify-center text-white overflow-hidden">
      {/* Video placeholder — swap for <video> when TICKET-017 delivers */}
      <div className="absolute inset-0 bg-black" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight">
          RESTORE STL
        </h1>
        <p className="text-xl md:text-2xl text-gray-300">
          We buy houses to restore neighborhoods.
        </p>
      </div>
    </section>
  );
}
