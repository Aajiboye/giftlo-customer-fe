import { Sparkles } from "lucide-react";

export default function HeroBanner() {
  return (
    <section
      className="relative overflow-hidden bg-cover bg-center bg-no-repeat px-6 py-16 text-white sm:px-12 lg:py-24"
      style={{
        backgroundImage: 'url(/images/heroBanner.svg)',
      }}
    >
      {/* Gradient Overlay */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-[#32005B]/90 via-[#6A00C1]/85 to-[#32005B]/90"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <div className="mb-4 flex justify-center">
          <Sparkles className="h-8 w-8 text-violet-200" />
        </div>

        <h1 className="text-balance text-3xl leading-tight sm:text-4xl lg:text-5xl">
          Gifting Redefined: AI-Powered Suggestions
          <br className="hidden sm:block" />
          Crafted with Care and Precision.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base text-violet-100 sm:text-lg">
          Find the perfect gift effortlessly with personalized
          recommendations for every celebration.
        </p>

        <div className="mt-10 flex justify-center">
          <button className="rounded-lg bg-white px-6 py-3 text-sm text-secondary_400 shadow-md transition hover:scale-[1.02] hover:bg-violet-50 focus:outline-none focus:ring-2 focus:ring-white/60">
            Get Gift Recommendation
          </button>
        </div>
      </div>
    </section>
  );
}
