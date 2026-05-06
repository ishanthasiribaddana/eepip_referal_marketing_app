import { useState } from 'react';

interface ReportFiltersProps {
  onFilterChange: (filters: any) => void;
}

export default function ReportFilters({ onFilterChange }: ReportFiltersProps) {
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const handleFilterChange = () => {
    onFilterChange({
      dateFrom,
      dateTo,
      selectedUser,
      selectedType,
      selectedStatus,
    });
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4 mb-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Date From</label>
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Date To</label>
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">User</label>
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">All Users</option>
            <option value="1">John Smith</option>
            <option value="2">Mary Johnson</option>
            <option value="3">Robert Lee</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Type</label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="direct">Direct</option>
            <option value="binary">Binary</option>
            <option value="matching">Matching</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Status</label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">All Statuses</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>

      <div className="flex gap-2 mt-3">
        <button
          onClick={handleFilterChange}
          className="px-4 py-1.5 bg-primary-600 text-white rounded text-sm hover:bg-primary-700"
        >
          Apply Filters
        </button>
        <button
          onClick={() => {
            setDateFrom('');
            setDateTo('');
            setSelectedUser('');
            setSelectedType('all');
            setSelectedStatus('all');
            onFilterChange({});
          }}
          className="px-4 py-1.5 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
