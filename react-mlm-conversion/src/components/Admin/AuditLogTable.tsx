import { useState } from 'react';

interface AuditLog {
  id: number;
  timestamp: string;
  userId: number;
  userName: string;
  action: string;
  entity: string;
  entityId: number;
  details: string;
  ipAddress: string;
}

interface AuditLogTableProps {
  logs: AuditLog[];
}

export default function AuditLogTable({ logs }: AuditLogTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState<string>('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const filteredLogs = logs.filter(log => {
    const matchesSearch = 
      log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.entity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesAction = actionFilter === 'all' || log.action === actionFilter;
    
    let matchesDateRange = true;
    if (dateFrom) {
      matchesDateRange = matchesDateRange && new Date(log.timestamp) >= new Date(dateFrom);
    }
    if (dateTo) {
      matchesDateRange = matchesDateRange && new Date(log.timestamp) <= new Date(dateTo);
    }

    return matchesSearch && matchesAction && matchesDateRange;
  });

  const getActionColor = (action: string) => {
    const actionColors: Record<string, string> = {
      CREATE: 'bg-green-100 text-green-800',
      UPDATE: 'bg-blue-100 text-blue-800',
      DELETE: 'bg-red-100 text-red-800',
      LOGIN: 'bg-purple-100 text-purple-800',
      LOGOUT: 'bg-gray-100 text-gray-800',
      APPROVE: 'bg-yellow-100 text-yellow-800',
      REJECT: 'bg-red-100 text-red-800',
    };
    return actionColors[action] || 'bg-gray-100 text-gray-800';
  };

  const uniqueActions = Array.from(new Set(logs.map(log => log.action)));

  return (
    <div className="card">
      {/* Header with Filters */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex gap-3 flex-1">
            <input
              type="text"
              placeholder="Search by user, action, entity, or details..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <select
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Actions</option>
              {uniqueActions.map(action => (
                <option key={action} value={action}>{action}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-2">
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Timestamp
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Entity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                IP Address
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredLogs.map((log) => (
              <tr key={log.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-600">
                  {new Date(log.timestamp).toLocaleString()}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {log.userName}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getActionColor(log.action)}`}>
                    {log.action}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {log.entity}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                  {log.details}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {log.ipAddress}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredLogs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No audit logs found matching your filters.</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {filteredLogs.length} of {logs.length} logs
        </p>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50">
            Previous
          </button>
          <button className="px-3 py-1.5 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
