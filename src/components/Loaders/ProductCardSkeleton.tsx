export default function ProductCardSkeleton() {
  return (
    <div className="rounded-2xl border bg-white overflow-hidden animate-pulse shadow-sm">
      {/* Image */}
      <div className="relative w-full aspect-square bg-gray-200">
        {/* Wishlist icon */}
        <div className="absolute top-3 right-3 h-10 w-10 rounded-full bg-gray-300" />
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Product name */}
        <div className="h-5 w-3/4 rounded bg-gray-200" />

        {/* Price + CTA */}
        <div className="flex items-center justify-between gap-3">
          <div className="h-6 w-24 rounded bg-gray-200" />
          <div className="h-11 w-32 rounded-lg bg-gray-200" />
        </div>

        {/* Units sold */}
        <div className="h-4 w-32 rounded bg-gray-200" />
      </div>
    </div>
  );
}
