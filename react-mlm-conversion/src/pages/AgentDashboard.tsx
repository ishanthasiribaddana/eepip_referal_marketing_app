import { useState, useEffect } from 'react';
import AgentStatsCard from '../components/Agent/AgentStatsCard';
import ReferralTable from '../components/Agent/ReferralTable';
import PoolStatusCard from '../components/Agent/PoolStatusCard';
import CommissionBreakdown from '../components/Agent/CommissionBreakdown';
import { mockAgentData } from '../data/mockData';

export default function AgentDashboard() {
  const [loading, setLoading] = useState(true);
  const [agentData] = useState(mockAgentData);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="card p-5 animate-pulse">
              <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
              <div className="h-8 w-32 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Agent Dashboard</h1>
          <p className="text-gray-600 mt-1">
            {agentData.isDualRole ? 'Agent + AI Engineer' : 'Agent'}
          </p>
        </div>
        {agentData.isDualRole && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
            Dual Role
          </span>
        )}
      </div>

      {/* Activation Status */}
      {!agentData.isActive && (
        <div className="card p-4 bg-yellow-50 border-yellow-200">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="text-yellow-800">
              <strong>Activation Required:</strong> You must introduce at least 1 AI Engineer to activate your agent account.
            </p>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <AgentStatsCard
          label="Total Referrals"
          value={agentData.totalReferrals}
          subtitle="AI Engineers introduced"
          icon="users"
        />
        <AgentStatsCard
          label="Total Commission"
          value={`Rs. ${agentData.totalCommissionEarned.toLocaleString()}`}
          subtitle="5% of investments"
          icon="currency"
        />
        <AgentStatsCard
          label="Active Referrals"
          value={agentData.activeReferrals}
          subtitle="Currently active"
          icon="check-circle"
        />
        <AgentStatsCard
          label="Pairing Status"
          value={`${agentData.currentMonthPairs}/${agentData.pairingCap} pairs`}
          subtitle="This month"
          icon="link"
        />
      </div>

      {/* Commission Breakdown & Pool Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CommissionBreakdown
          directRate={2}
          poolRate={3}
          investmentAmount={1800000}
        />
        <PoolStatusCard
          currentPairs={agentData.currentMonthPairs}
          pairingCap={agentData.pairingCap}
          poolShareAmount={agentData.poolShareAmount}
        />
      </div>

      {/* Referrals Table */}
      <div className="card">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Direct Referrals</h2>
          <p className="text-sm text-gray-600 mt-1">AI Engineers you have introduced</p>
        </div>
        <ReferralTable referrals={agentData.referrals} />
      </div>

      {/* Commission History */}
      <div className="card">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Commission History</h2>
          <p className="text-sm text-gray-600 mt-1">Agent commission transactions</p>
        </div>
        <ReferralTable referrals={agentData.commissionHistory} isCommissionHistory />
      </div>
    </div>
  );
}
