import { useState, useEffect, lazy, Suspense } from 'react';
import SuspenseFallback from '../components/common/SuspenseFallback';
import { TableSkeleton } from '../components/common/LoadingSkeleton';
import { mockDashboardData, formatLKR } from '../data/mockData';
import { commissionService } from '../../api/commissionService';

const CommissionTable = lazy(() => import('../components/Commissions/CommissionTable'));

export default function Commissions() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [commissions, setCommissions] = useState(mockDashboardData.recentCommissions);

  const userStr = localStorage.getItem('eepip_user');
  const user = userStr ? JSON.parse(userStr) : null;
  const aiEngineerId = user?.id || 1;

  useEffect(() => {
    async function fetchCommissions() {
      try {
        setLoading(true);
        setError(null);
        const { data } = await commissionService.getCommissions(aiEngineerId);
        // Would map backend Commission type to our MockCommission structure here
        setCommissions(data.map((c: any) => ({
          id: c.id,
          date: c.date,
          type: c.type,
          description: c.description,
          amount: c.amount,
          status: c.status,
        })));
      } catch (err) {
        console.warn('Backend unavailable, using mock commission data:', err);
        setError('Backend unavailable — using demo data');
        setCommissions(mockDashboardData.recentCommissions);
      } finally {
        setLoading(false);
      }
    }

    fetchCommissions();
  }, [aiEngineerId]);

  if (loading) {
    return <TableSkeleton rows={5} />;
  }

  // Calculate summary totals by type
  const typeTotals = commissions.reduce((acc, c) => {
    if (!acc[c.type]) acc[c.type] = 0;
    acc[c.type] += c.amount;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-center gap-2 text-sm text-yellow-800">
          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      <div>
        <h2 className="text-2xl font-bold text-gray-800">Commissions</h2>
        <p className="text-gray-500 mt-1 text-sm">
          Track your earnings across all commission types.
        </p>
      </div>

      {/* Commission summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Direct Sponsor', value: typeTotals.DIRECT_SPONSOR || 0, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Binary Pairing', value: typeTotals.BINARY_PAIRING || 0, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Matching Bonus', value: typeTotals.MATCHING_BONUS || 0, color: 'text-yellow-600', bg: 'bg-yellow-50' },
          { label: 'Leadership Pool', value: typeTotals.LEADERSHIP_POOL || 0, color: 'text-red-600', bg: 'bg-red-50' },
        ].map((stat) => (
          <div key={stat.label} className={`${stat.bg} card`}>
            <p className="text-xs text-gray-600 font-medium">{stat.label}</p>
            <p className={`text-lg font-bold mt-1 ${stat.color}`}>{formatLKR(stat.value)}</p>
          </div>
        ))}
      </div>

      {/* Commission table */}
      <Suspense fallback={<SuspenseFallback />}>
        <CommissionTable commissions={commissions} />
      </Suspense>
    </div>
  );
}
