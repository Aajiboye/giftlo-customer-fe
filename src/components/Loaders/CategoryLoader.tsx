export function CategoryLoader() {
  return (
    <div className="rounded-2xl border bg-white p-5 md:p-6 animate-pulse">
      {/* Title */}
      <div className="h-5 w-48 rounded bg-gray-200 mb-2" />

      {/* Subtitle */}
      <div className="h-4 w-20 rounded bg-gray-200 mb-8" />

      {/* Image placeholder */}
      <div className="mx-auto h-32 w-32 rounded-xl bg-gray-200" />
    </div>
  );
}


export default function CategoryGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <CategoryLoader key={i} />
      ))}
    </div>
  );
}

