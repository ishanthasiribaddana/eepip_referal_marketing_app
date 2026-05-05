import {
  TrendingUp,
  Users,
  Coins,
  Award,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react'
import { currentUser, commissions } from '../data/mockData.ts'

const rankColors: Record<string, string> = {
  STARTER: 'bg-gray-100 text-gray-700',
  BRONZE: 'bg-amber-100 text-amber-800',
  SILVER: 'bg-gray-200 text-gray-800',
  GOLD: 'bg-yellow-100 text-yellow-800',
  PLATINUM: 'bg-blue-100 text-blue-800',
  DIAMOND: 'bg-purple-100 text-purple-800',
}

function StatCard({ label, value, icon: Icon, trend, color }: {
  label: string
  value: string
  icon: React.ElementType
  trend?: string
  color: string
}) {
  const isPositive = trend?.startsWith('+')
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-gray-500">{label}</span>
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${color}`}>
          <Icon size={18} />
        </div>
      </div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      {trend && (
        <div className={`flex items-center gap-1 mt-1 text-xs font-medium ${isPositive ? 'text-green-600' : 'text-red-500'}`}>
          {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {trend}
        </div>
      )}
    </div>
  )
}

export default function Dashboard() {
  const recentCommissions = commissions.slice(-4).reverse()
  const u = currentUser

  return (
    <div className="p-4 sm:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Welcome back, {u.firstName}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${rankColors[u.rank]}`}>
          {u.rank}
        </span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="Total Earnings"
          value={`Rs. ${u.totalEarnings.toLocaleString()}`}
          icon={Coins}
          trend="+Rs. 36,000 this month"
          color="bg-green-50 text-green-600"
        />
        <StatCard
          label="Team Size"
          value={u.teamSize.toString()}
          icon={Users}
          trend="+2 this month"
          color="bg-blue-50 text-blue-600"
        />
        <StatCard
          label="Direct Recruits"
          value={`${u.directRecruits} (L:${u.directRecruitsLeft} R:${u.directRecruitsRight})`}
          icon={TrendingUp}
          color="bg-amber-50 text-amber-600"
        />
        <StatCard
          label="Rank"
          value={u.rank}
          icon={Award}
          trend="Next: SILVER (8 directs, 30 team)"
          color="bg-purple-50 text-purple-600"
        />
      </div>

      {/* BV & Commissions Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* BV Summary */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Business Volume (BV)</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-blue-600 font-medium">Left Leg BV</p>
              <p className="text-3xl font-bold text-blue-800 mt-1">{u.leftBV}</p>
              <p className="text-xs text-blue-500 mt-1">Carry: {u.carryForwardLeftBV}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-sm text-green-600 font-medium">Right Leg BV</p>
              <p className="text-3xl font-bold text-green-800 mt-1">{u.rightBV}</p>
              <p className="text-xs text-green-500 mt-1">Carry: {u.carryForwardRightBV}</p>
            </div>
          </div>
          <div className="mt-4 bg-gray-50 rounded-lg p-3 text-center">
            <p className="text-sm text-gray-500">Matched Pairs This Month</p>
            <p className="text-2xl font-bold text-gray-900">{Math.min(u.leftBV, u.rightBV)}</p>
            <p className="text-xs text-gray-400">Max 3 pairs/month</p>
          </div>
        </div>

        {/* Recent Commissions */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Commissions</h2>
          <div className="space-y-3">
            {recentCommissions.map((c) => (
              <div key={c.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-900">{c.type.replaceAll('_', ' ')}</p>
                  <p className="text-xs text-gray-500">{c.relatedName}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">Rs. {c.amount.toLocaleString()}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    c.status === 'PAID' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
                  }`}>
                    {c.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Investment Summary */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Investment Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-gray-500">Investment Amount</p>
            <p className="text-lg font-bold text-gray-900">Rs. {u.investmentAmount.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Interest Rate</p>
            <p className="text-lg font-bold text-gray-900">16% p.a.</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Monthly Interest</p>
            <p className="text-lg font-bold text-gray-900">Rs. 24,000</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Investment Date</p>
            <p className="text-lg font-bold text-gray-900">{u.investmentDate}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
