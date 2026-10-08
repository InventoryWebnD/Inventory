export default function ConceptLoading() {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-8 shimmer">
      {/* Breadcrumb Skeleton */}
      <div className="h-4 bg-muted rounded-lg w-48 mb-8" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-10 items-start">
        {/* Left TOC Skeleton */}
        <div className="hidden lg:block lg:col-span-3 xl:col-span-2 space-y-3">
          <div className="h-3 bg-muted rounded-lg w-24 mb-4" />
          <div className="h-3 bg-muted/70 rounded-lg w-32" />
          <div className="h-3 bg-muted/70 rounded-lg w-28" />
          <div className="h-3 bg-muted/70 rounded-lg w-36" />
          <div className="h-3 bg-muted/70 rounded-lg w-20" />
        </div>

        {/* Center Main Article Skeleton */}
        <div className="lg:col-span-6 xl:col-span-7 2xl:col-span-8 space-y-6">
          <div className="space-y-3 pb-8 border-b border-border">
            <div className="h-3 bg-muted rounded-lg w-20" />
            <div className="h-8 sm:h-10 bg-muted rounded-lg w-3/4" />
            <div className="h-4 bg-muted/80 rounded-lg w-full" />
            <div className="h-4 bg-muted/80 rounded-lg w-2/3" />
            <div className="flex gap-2 pt-2">
              <div className="h-5 bg-muted rounded-lg w-20 border border-border" />
              <div className="h-5 bg-muted rounded-lg w-16 border border-border" />
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <div className="h-6 bg-muted rounded-lg w-1/3" />
            <div className="h-4 bg-muted/70 rounded-lg w-full" />
            <div className="h-4 bg-muted/70 rounded-lg w-5/6" />
            <div className="h-28 bg-muted/50 rounded-lg border border-border w-full" />
            <div className="h-4 bg-muted/70 rounded-lg w-4/5" />
          </div>
        </div>

        {/* Right Related Concepts Skeleton */}
        <div className="lg:col-span-3 xl:col-span-3 2xl:col-span-2 space-y-3">
          <div className="h-3 bg-muted rounded-lg w-28 mb-4" />
          <div className="h-20 bg-muted/50 rounded-lg border border-border w-full" />
          <div className="h-20 bg-muted/50 rounded-lg border border-border w-full" />
        </div>
      </div>
    </div>
  );
}
