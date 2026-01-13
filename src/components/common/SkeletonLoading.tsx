import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="border rounded-lg overflow-hidden mb-4 w-full">
      <Skeleton className="w-full h-64" />

      <div className="p-4 space-y-3">
        <Skeleton className="h-5 w-3/4" />

        <Skeleton className="h-4 w-1/2" />

        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
        </div>

        <Skeleton className="h-10 w-28 mt-4 rounded-md" />
      </div>
    </div>
  );
}

export function SkeletonCardGrid({ count = 6 }: { count: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
      {Array.from({ length: count }).map((_, index) => {
        return <SkeletonCard key={index} />;
      })}
    </div>
  );
}

export function DynamicSkeletone() {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="rounded-lg overflow-hidden w-full lg:h-160 mb-4">
        <Skeleton className="w-full h-80 md:h-120 lg:h-160 object-cover" />
      </div>

      <div className="py-5 w-full space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-5 w-1/2" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    </div>
  );
}
