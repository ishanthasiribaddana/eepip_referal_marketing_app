import { useState, useEffect } from 'react';
import StatsCard from '../components/Dashboard/StatsCard';
import { StatsCardSkeleton } from '../components/common/LoadingSkeleton';
import {
  mockDashboardData as mockData,
  formatLKR,
  COMMISSION_TYPE_CONFIG,
  STATUS_CONFIG,
} from '../data/mockData';
import { aiEngineerService } from '../../api/aiEngineerService';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState(mockData);

  const userStr = localStorage.getItem('eepip_user');
  const user = userStr ? JSON.parse(userStr) : null;
  const aiEngineerId = user?.id || 1; // fallback to ID 1 for demo

  useEffect(() => {
    async function fetchDashboard() {
      try {
        setLoading(true);
        setError(null);
        // Attempt to fetch from backend
        await aiEngineerService.getDashboard(aiEngineerId);
        // If successful, would map data here (backend type structure differs)
        // For now, since backend isn't running, we fall through to catch
      } catch (err) {
        console.warn('Backend unavailable, using mock data:', err);
        setError('Backend unavailable — using demo data');
        setData(mockData);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboard();
  }, [aiEngineerId]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCardSkeleton />
          <StatsCardSkeleton />
          <StatsCardSkeleton />
          <StatsCardSkeleton />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card p-5">
            <StatsCardSkeleton />
          </div>
          <div className="card p-5">
            <StatsCardSkeleton />
          </div>
        </div>
      </div>
    );
  }

  const { stats, investment, recentCommissions, rankProgress, bvSummary } = data;

  return (
    <div className="space-y-6">
      {/* Backend status banner */}
      {error && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-center gap-2 text-sm text-yellow-800">
          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          Welcome, {user?.fullName || data.user.fullName}!
        </h2>
        <p className="text-gray-500 mt-1 text-sm">
          Here's your investment and network overview.
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatsCard
          label="Total Earnings"
          value={formatLKR(stats.totalEarnings)}
          subtitle="All time"
          color="text-green-600"
          bgColor="bg-green-50"
          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
        />
        <StatsCard
          label="This Month"
          value={formatLKR(stats.thisMonthEarnings)}
          subtitle="Apr 2026"
          color="text-emerald-600"
          bgColor="bg-emerald-50"
          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
        />
        <StatsCard
          label="Team Size"
          value={String(stats.teamSize)}
          subtitle={`${stats.directRecruits} direct`}
          color="text-blue-600"
          bgColor="bg-blue-50"
          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
        />
        <StatsCard
          label="Current Rank"
          value={stats.currentRank}
          subtitle={`Next: ${rankProgress.nextRank}`}
          color="text-purple-600"
          bgColor="bg-purple-50"
          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>}
        />
        <StatsCard
          label="BV (L / R)"
          value={`${bvSummary.leftBV} / ${bvSummary.rightBV}`}
          subtitle={`CF: ${bvSummary.carryForwardLeft}L / ${bvSummary.carryForwardRight}R`}
          color="text-orange-600"
          bgColor="bg-orange-50"
          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>}
        />
        <StatsCard
          label="Pairs / Month"
          value={`${bvSummary.pairsThisMonth} / ${bvSummary.maxPairsPerMonth}`}
          subtitle="Apr 2026"
          color="text-cyan-600"
          bgColor="bg-cyan-50"
          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>}
        />
      </div>

      {/* Investment + Recent Commissions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Investment Status */}
        <div className="card">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Investment Status</h3>
          <div className="space-y-3">
            {[
              { label: 'Product', value: investment.productName },
              { label: 'Investment', value: formatLKR(investment.investmentAmount) },
              { label: 'Monthly Interest', value: formatLKR(investment.monthlyInterest) },
              { label: 'Invested On', value: new Date(investment.investmentDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) },
              { label: 'Student', value: investment.studentName },
              { label: 'Program', value: investment.studentStatus },
              { label: 'Progress', value: investment.programProgress },
            ].map((row) => (
              <div key={row.label} className="flex justify-between text-sm">
                <span className="text-gray-500">{row.label}</span>
                <span className="text-gray-800 font-medium text-right">{row.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Commissions */}
        <div className="card">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Recent Commissions</h3>
          <div className="space-y-3">
            {recentCommissions.slice(0, 5).map((c) => {
              const typeConfig = COMMISSION_TYPE_CONFIG[c.type];
              const statusConfig = STATUS_CONFIG[c.status];
              return (
                <div key={c.id} className="flex items-center justify-between py-1.5">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded ${typeConfig.bg} ${typeConfig.color}`}>
                      {typeConfig.label}
                    </span>
                    <span className="text-sm text-gray-600 truncate hidden sm:block">
                      {c.description}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-sm font-semibold text-gray-800">
                      {formatLKR(c.amount)}
                    </span>
                    <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${statusConfig.bg} ${statusConfig.color}`}>
                      {statusConfig.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Rank Progress */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-700">
            Rank Progress: {rankProgress.currentRank} → {rankProgress.nextRank}
          </h3>
          <span className="text-sm font-bold text-primary-600">{rankProgress.progress}%</span>
        </div>

        {/* Progress bar */}
        <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden mb-5">
          <div
            className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full transition-all duration-500"
            style={{ width: `${rankProgress.progress}%` }}
          />
        </div>

        {/* Requirement bars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {rankProgress.requirements.map((req) => {
            const pct = Math.min(100, Math.round((req.current / req.required) * 100));
            return (
              <div key={req.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-500">{req.label}</span>
                  <span className="text-gray-700 font-medium">{req.current} / {req.required}</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      pct >= 100 ? 'bg-green-500' : 'bg-primary-400'
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
