const PricingCardLoader = () => {
  return (
    <div className="border border-sidebar rounded-2xl bg-white shadow-xl overflow-hidden animate-pulse">
      <div className="px-6 pt-6 pb-9 space-y-8">
        <div className="space-y-4">
          <div className="h-6 w-3/4 bg-gray-200 rounded" />

          <div className="flex items-baseline gap-2">
            <div className="h-10 w-32 bg-gray-300 rounded" />
            <div className="h-4 w-12 bg-gray-200 rounded" />
          </div>

          <div className="h-4 w-1/2 bg-gray-100 rounded" />
        </div>

        <ul className="space-y-3">
          {[1, 2].map((i) => (
            <li key={i} className="flex items-start gap-3">
              <div className="size-5 shrink-0 rounded-full bg-gray-200" />
              <div className="h-4 w-full bg-gray-100 rounded" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PricingCardLoader;
