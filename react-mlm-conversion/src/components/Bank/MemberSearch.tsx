interface MemberSearchProps {
  onSearch: (query: string) => void;
  searchQuery: string;
  onStatusFilter?: (status: string) => void;
  onRankFilter?: (rank: string) => void;
}

export default function MemberSearch({ onSearch, searchQuery, onStatusFilter, onRankFilter }: MemberSearchProps) {
  return (
    <div className="card p-4">
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-xs font-medium text-gray-500 mb-1">Search Member</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name, ID, or email..."
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              className="input-field w-full pl-10"
            />
            <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        <div className="min-w-[150px]">
          <label className="block text-xs font-medium text-gray-500 mb-1">Member Status</label>
          <select className="input-field w-full" onChange={(e) => onStatusFilter?.(e.target.value)}>
            <option value="">All Status</option>
            <option value="ACTIVE">Active</option>
            <option value="PENDING">Pending</option>
            <option value="INACTIVE">Inactive</option>
          </select>
        </div>
        <div className="min-w-[150px]">
          <label className="block text-xs font-medium text-gray-500 mb-1">Rank</label>
          <select className="input-field w-full" onChange={(e) => onRankFilter?.(e.target.value)}>
            <option value="">All Ranks</option>
            <option value="STARTER">Starter</option>
            <option value="BRONZE">Bronze</option>
            <option value="SILVER">Silver</option>
            <option value="GOLD">Gold</option>
            <option value="PLATINUM">Platinum</option>
            <option value="DIAMOND">Diamond</option>
          </select>
        </div>
      </div>
    </div>
  );
}
