import { useState } from 'react';
import OverviewStats from '../components/Bank/OverviewStats';
import MemberSearch from '../components/Bank/MemberSearch';
import DisbursementTable from '../components/Bank/DisbursementTable';
import { mockBankDisbursements, mockBankStats } from '../data/mockData';

export default function BankDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [disbursements, setDisbursements] = useState(mockBankDisbursements);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Filter disbursements based on search query
    const filtered = mockBankDisbursements.filter(
      (d) =>
        d.memberName.toLowerCase().includes(query.toLowerCase()) ||
        d.memberId.toLowerCase().includes(query.toLowerCase())
    );
    setDisbursements(filtered);
  };

  const handleApprove = (id: number) => {
    setDisbursements((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, status: 'APPROVED' as const } : d
      )
    );
    setNotification({ type: 'success', message: 'Disbursement approved successfully' });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleReject = (id: number) => {
    setDisbursements((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, status: 'REJECTED' as const } : d
      )
    );
    setNotification({ type: 'error', message: 'Disbursement rejected' });
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Bank Dashboard</h2>
        <p className="text-gray-500 mt-1 text-sm">
          Overview and disbursement management for TEMCO Bank
        </p>
      </div>

      {/* Notification */}
      {notification && (
        <div
          className={`p-4 rounded-lg flex items-center gap-2 ${
            notification.type === 'success'
              ? 'bg-green-50 text-green-800 border border-green-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            {notification.type === 'success' ? (
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            ) : (
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            )}
          </svg>
          <span className="font-medium">{notification.message}</span>
        </div>
      )}

      {/* Overview Stats */}
      <OverviewStats
        totalAIEngineers={mockBankStats.totalAIEngineers}
        totalInvestment={mockBankStats.totalInvestment}
        totalCommissionsPaid={mockBankStats.totalCommissionsPaid}
        pendingDisbursements={mockBankStats.pendingDisbursements}
      />

      {/* Member Search */}
      <MemberSearch searchQuery={searchQuery} onSearch={handleSearch} />

      {/* Disbursement Table */}
      <DisbursementTable
        disbursements={disbursements}
        onApprove={handleApprove}
        onReject={handleReject}
      />

      {/* Summary */}
      <div className="card p-4 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Showing <span className="font-semibold">{disbursements.length}</span> disbursements
        </div>
        <div className="flex gap-4 text-sm">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
            Pending: {disbursements.filter((d) => d.status === 'PENDING').length}
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
            Approved: {disbursements.filter((d) => d.status === 'APPROVED').length}
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 bg-red-500 rounded-full"></span>
            Rejected: {disbursements.filter((d) => d.status === 'REJECTED').length}
          </span>
        </div>
      </div>
    </div>
  );
}
