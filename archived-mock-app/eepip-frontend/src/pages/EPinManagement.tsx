import { useState } from 'react'
import { KeyRound, Plus, X, AlertCircle } from 'lucide-react'
import { epins as initialEpins } from '../data/mockData.ts'

const statusColors: Record<string, string> = {
  GENERATED: 'bg-blue-50 text-blue-700',
  ASSIGNED: 'bg-amber-50 text-amber-700',
  USED: 'bg-green-50 text-green-700',
  EXPIRED: 'bg-red-50 text-red-700',
}

function randomPin(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}

export default function EPinManagement() {
  const [epins, setEpins] = useState(initialEpins)
  const [showModal, setShowModal] = useState(false)
  const [genCount, setGenCount] = useState(1)
  const [genError, setGenError] = useState('')

  const stats = {
    total: epins.length,
    available: epins.filter((e) => e.status === 'GENERATED').length,
    used: epins.filter((e) => e.status === 'USED').length,
    expired: epins.filter((e) => e.status === 'EXPIRED').length,
  }

  function handleGenerate() {
    if (genCount < 1 || genCount > 10) {
      setGenError('Enter a number between 1 and 10')
      return
    }
    const today = new Date().toISOString().split('T')[0]
    const newPins = Array.from({ length: genCount }, (_, i) => ({
      id: epins.length + i + 1,
      epinNo: randomPin(),
      status: 'GENERATED' as const,
      issuedBy: 'Bank Staff',
      dateGenerated: today,
      dateUsed: null,
      assignedTo: null,
    }))
    setEpins([...newPins, ...epins])
    setShowModal(false)
    setGenCount(1)
    setGenError('')
  }

  return (
    <div className="p-4 sm:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">ePin Management</h1>
          <p className="text-gray-500 text-sm mt-1">Generate and track ePins for enrollment verification</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={16} />
          Generate ePins
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm text-gray-500">Total</p>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm text-gray-500">Available</p>
          <p className="text-2xl font-bold text-blue-600">{stats.available}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm text-gray-500">Used</p>
          <p className="text-2xl font-bold text-green-600">{stats.used}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm text-gray-500">Expired</p>
          <p className="text-2xl font-bold text-red-600">{stats.expired}</p>
        </div>
      </div>

      {/* ePin Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">ePin Code</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Generated</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Used Date</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Assigned To</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Issued By</th>
              <th className="text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody>
            {epins.map((e) => (
              <tr key={e.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <KeyRound size={14} className="text-gray-400" />
                    <span className="font-mono text-sm font-semibold text-gray-900">{e.epinNo}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{e.dateGenerated}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{e.dateUsed || '—'}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{e.assignedTo || '—'}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{e.issuedBy}</td>
                <td className="px-6 py-4 text-center">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[e.status]}`}>
                    {e.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Generate Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Generate ePins</h2>
              <button onClick={() => { setShowModal(false); setGenError('') }} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              New ePins will be linked to Rs. 1,800,000 investment amount with 30-day validity.
            </p>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Number of ePins (1–10)</label>
              <input
                type="number"
                min={1}
                max={10}
                value={genCount}
                onChange={(e) => { setGenCount(Number(e.target.value)); setGenError('') }}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
              {genError && (
                <p className="flex items-center gap-1 text-xs text-red-600 mt-1">
                  <AlertCircle size={12} />{genError}
                </p>
              )}
            </div>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => { setShowModal(false); setGenError('') }}
                className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleGenerate}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm"
              >
                Generate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
