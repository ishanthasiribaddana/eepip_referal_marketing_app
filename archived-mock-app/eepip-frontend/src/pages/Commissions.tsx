import { useState } from 'react'
import { Filter } from 'lucide-react'
import { commissions } from '../data/mockData.ts'

const typeLabels: Record<string, string> = {
  DIRECT_SPONSOR: 'Direct Sponsor (2%)',
  BINARY_PAIRING: 'Binary Pairing (5%)',
  MATCHING_BONUS: 'Matching Bonus (1.5%)',
  LEADERSHIP_POOL: 'Leadership Pool (1.5%)',
  RANK_ACHIEVEMENT: 'Rank Achievement',
}

const typeColors: Record<string, string> = {
  DIRECT_SPONSOR: 'bg-blue-50 text-blue-700',
  BINARY_PAIRING: 'bg-green-50 text-green-700',
  MATCHING_BONUS: 'bg-purple-50 text-purple-700',
  LEADERSHIP_POOL: 'bg-amber-50 text-amber-700',
  RANK_ACHIEVEMENT: 'bg-pink-50 text-pink-700',
}

const statusColors: Record<string, string> = {
  PAID: 'bg-green-50 text-green-700',
  PENDING: 'bg-amber-50 text-amber-700',
  APPROVED: 'bg-blue-50 text-blue-700',
  REJECTED: 'bg-red-50 text-red-700',
}

const selectClass = 'border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none'

export default function Commissions() {
  const [typeFilter, setTypeFilter] = useState('ALL')
  const [statusFilter, setStatusFilter] = useState('ALL')

  const filtered = commissions.filter((c) => {
    if (typeFilter !== 'ALL' && c.type !== typeFilter) return false
    if (statusFilter !== 'ALL' && c.status !== statusFilter) return false
    return true
  })

  const totalPaid = filtered.filter((c) => c.status === 'PAID').reduce((sum, c) => sum + c.amount, 0)
  const totalPending = filtered.filter((c) => c.status === 'PENDING').reduce((sum, c) => sum + c.amount, 0)

  const uniqueTypes = [...new Set(commissions.map((c) => c.type))]
  const uniqueStatuses = [...new Set(commissions.map((c) => c.status))]

  return (
    <div className="p-4 sm:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Commissions</h1>
        <p className="text-gray-500 text-sm mt-1">Track your earnings across all commission types</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm text-gray-500">Total Paid</p>
          <p className="text-2xl font-bold text-green-600">Rs. {totalPaid.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm text-gray-500">Pending</p>
          <p className="text-2xl font-bold text-amber-600">Rs. {totalPending.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm text-gray-500">Total</p>
          <p className="text-2xl font-bold text-gray-900">Rs. {(totalPaid + totalPending).toLocaleString()}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <Filter size={16} className="text-gray-400" />
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className={selectClass}>
          <option value="ALL">All Types</option>
          {uniqueTypes.map((t) => (
            <option key={t} value={t}>{typeLabels[t] || t}</option>
          ))}
        </select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className={selectClass}>
          <option value="ALL">All Statuses</option>
          {uniqueStatuses.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        {(typeFilter !== 'ALL' || statusFilter !== 'ALL') && (
          <button
            onClick={() => { setTypeFilter('ALL'); setStatusFilter('ALL') }}
            className="text-xs text-blue-600 hover:text-blue-800 font-medium"
          >
            Clear filters
          </button>
        )}
        <span className="text-xs text-gray-400 ml-auto">{filtered.length} record{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      {/* Commissions Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Type</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Related To</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Cycle</th>
              <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase">Amount</th>
              <th className="text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-sm text-gray-400">
                  No commissions match the selected filters.
                </td>
              </tr>
            ) : (
              filtered.map((c) => (
                <tr key={c.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-900">{c.date}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${typeColors[c.type]}`}>
                      {typeLabels[c.type]}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{c.relatedName}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{c.cycleMonth}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900 text-right">
                    Rs. {c.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[c.status]}`}>
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
