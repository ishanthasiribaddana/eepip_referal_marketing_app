export default function LoadingSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
  );
}

export function StatsCardSkeleton() {
  return (
    <div className="card p-5 flex items-start gap-4">
      <LoadingSkeleton className="w-12 h-12 rounded-lg" />
      <div className="flex-1">
        <LoadingSkeleton className="h-4 w-24 mb-2" />
        <LoadingSkeleton className="h-7 w-32" />
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="card overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <LoadingSkeleton className="h-6 w-40" />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <LoadingSkeleton className="h-10 w-full" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {Array.from({ length: rows }).map((_, i) => (
              <tr key={i}>
                <LoadingSkeleton className="h-12 w-full" />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
