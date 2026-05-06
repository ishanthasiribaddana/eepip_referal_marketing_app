import { useState, useMemo } from 'react';
import type { MockCommission } from '../../data/mockData';
import { formatLKR, COMMISSION_TYPE_CONFIG, STATUS_CONFIG } from '../../data/mockData';

interface CommissionTableProps {
  commissions: MockCommission[];
}

export default function CommissionTable({ commissions }: CommissionTableProps) {
  const [typeFilter, setTypeFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter commissions
  const filteredCommissions = useMemo(() => {
    return commissions.filter((c) => {
      const typeMatch = typeFilter === 'ALL' || c.type === typeFilter;
      const statusMatch = statusFilter === 'ALL' || c.status === statusFilter;
      return typeMatch && statusMatch;
    });
  }, [commissions, typeFilter, statusFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredCommissions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCommissions = filteredCommissions.slice(startIndex, startIndex + itemsPerPage);

  // Reset page on filter change
  const handleTypeFilterChange = (value: string) => {
    setTypeFilter(value);
    setCurrentPage(1);
  };

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <label className="text-xs font-medium text-gray-600">Type:</label>
          <select
            value={typeFilter}
            onChange={(e) => handleTypeFilterChange(e.target.value)}
            className="input-field text-xs py-1.5 px-3 w-auto"
          >
            <option value="ALL">All Types</option>
            <option value="DIRECT_SPONSOR">Direct Sponsor</option>
            <option value="BINARY_PAIRING">Binary Pairing</option>
            <option value="MATCHING_BONUS">Matching Bonus</option>
            <option value="LEADERSHIP_POOL">Leadership Pool</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs font-medium text-gray-600">Status:</label>
          <select
            value={statusFilter}
            onChange={(e) => handleStatusFilterChange(e.target.value)}
            className="input-field text-xs py-1.5 px-3 w-auto"
          >
            <option value="ALL">All Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="PAID">Paid</option>
          </select>
        </div>

        <div className="ml-auto text-xs text-gray-500">
          Showing {filteredCommissions.length} of {commissions.length} commissions
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Type
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Description
                </th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Amount
                </th>
                <th className="text-center py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedCommissions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-gray-400 text-sm">
                    No commissions match the selected filters.
                  </td>
                </tr>
              ) : (
                paginatedCommissions.map((c) => {
                  const typeConfig = COMMISSION_TYPE_CONFIG[c.type];
                  const statusConfig = STATUS_CONFIG[c.status];
                  return (
                    <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4 text-gray-600 whitespace-nowrap">
                        {new Date(c.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded ${typeConfig.bg} ${typeConfig.color}`}>
                          {typeConfig.label}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {c.description}
                      </td>
                      <td className="py-3 px-4 text-right font-semibold text-gray-800">
                        {formatLKR(c.amount)}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded ${statusConfig.bg} ${statusConfig.color}`}>
                          {statusConfig.label}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
            <div className="text-xs text-gray-500">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-2 py-1 text-xs border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-2 py-1 text-xs rounded transition-colors ${
                    currentPage === page
                      ? 'bg-primary-500 text-white'
                      : 'border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-2 py-1 text-xs border border-gray-200 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
