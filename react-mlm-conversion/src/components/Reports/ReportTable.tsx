interface ReportTableProps {
  reportType: string;
  data: any[];
}

export default function ReportTable({ reportType, data }: ReportTableProps) {
  const getColumns = () => {
    switch (reportType) {
      case 'commission':
        return ['Date', 'User', 'Type', 'Level', 'Amount', 'Status'];
      case 'investment':
        return ['Date', 'User', 'Product', 'Amount', 'Status'];
      case 'disbursement':
        return ['Date', 'User', 'Bank', 'Amount', 'Reference', 'Status'];
      case 'agent_performance':
        return ['Agent', 'Referrals', 'Earnings', 'Rank', 'Status'];
      case 'binary_tree':
        return ['User', 'Left Leg', 'Right Leg', 'Pairs', 'Pool Share'];
      case 'epin_usage':
        return ['EPIN Code', 'Product', 'Status', 'Assigned To', 'Created At'];
      default:
        return [];
    }
  };

  const formatCurrency = (amount: number) => `Rs. ${amount.toLocaleString()}`;

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
      case 'active':
      case 'assigned':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
      case 'inactive':
      case 'expired':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const columns = getColumns();

  if (data.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-500">No data available for this report.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border border-gray-200 rounded-lg">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th key={column} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.map((row, index) => (
            <tr key={index} className="hover:bg-gray-50">
              {Object.values(row).map((value: any, cellIndex) => (
                <td key={cellIndex} className="px-4 py-3 text-sm">
                  {typeof value === 'number' && !isNaN(value) && value > 1000
                    ? formatCurrency(value)
                    : typeof value === 'string' && ['paid', 'pending', 'failed', 'active', 'inactive', 'assigned', 'available'].includes(value.toLowerCase())
                    ? <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(value)}`}>
                        {value}
                      </span>
                    : value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
