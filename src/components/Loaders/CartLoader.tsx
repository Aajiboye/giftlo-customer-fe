export default function CartLoader() {
  return (
    <div className="rounded-2xl border p-4 md:p-6 animate-pulse">
      <div className="flex gap-4 md:gap-6">
        {/* Image */}
        <div className="h-24 w-24 md:h-28 md:w-28 rounded-xl bg-gray-200 shrink-0" />

        {/* Content */}
        <div className="flex flex-1 justify-between">
          {/* Left content */}
          <div className="space-y-3">
            {/* Title */}
            <div className="h-5 w-56 rounded bg-gray-200" />

            {/* Seller + badge */}
            <div className="flex items-center gap-2">
              <div className="h-4 w-32 rounded bg-gray-200" />
              <div className="h-6 w-24 rounded-full bg-gray-200" />
            </div>

            {/* Price */}
            <div className="h-6 w-24 rounded bg-gray-200" />
          </div>

          {/* Quantity controls */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-gray-200" />
            <div className="h-5 w-6 rounded bg-gray-200" />
            <div className="h-10 w-10 rounded-lg bg-gray-200" />
          </div>
        </div>
      </div>

      {/* Remove item */}
      <div className="mt-4">
        <div className="h-4 w-32 rounded bg-gray-200" />
      </div>
    </div>
  );
}
