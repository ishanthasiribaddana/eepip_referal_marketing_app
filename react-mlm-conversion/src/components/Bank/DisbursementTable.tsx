interface Disbursement {
  id: number;
  memberName: string;
  memberId: string;
  amount: number;
  type: 'COMMISSION' | 'WITHDRAWAL';
  requestDate: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  bankAccount: string;
}

interface DisbursementTableProps {
  disbursements: Disbursement[];
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
}

export default function DisbursementTable({ disbursements, onApprove, onReject }: DisbursementTableProps) {
  const statusColors = {
    PENDING: 'bg-yellow-100 text-yellow-800',
    APPROVED: 'bg-green-100 text-green-800',
    REJECTED: 'bg-red-100 text-red-800',
  };

  const typeColors = {
    COMMISSION: 'text-blue-700',
    WITHDRAWAL: 'text-purple-700',
  };

  return (
    <div className="card overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <h3 className="font-semibold text-gray-800">Pending Disbursements</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Member</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bank Account</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Request Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {disbursements.map((disbursement) => (
              <tr key={disbursement.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-600">{disbursement.memberId}</td>
                <td className="px-4 py-3 text-sm font-medium text-gray-800">{disbursement.memberName}</td>
                <td className="px-4 py-3 text-sm">
                  <span className={typeColors[disbursement.type]}>{disbursement.type}</span>
                </td>
                <td className="px-4 py-3 text-sm font-semibold text-gray-800">
                  Rs. {disbursement.amount.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">{disbursement.bankAccount}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{disbursement.requestDate}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[disbursement.status]}`}>
                    {disbursement.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  {disbursement.status === 'PENDING' && (
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => onApprove(disbursement.id)}
                        className="px-3 py-1.5 rounded-lg bg-green-500 text-white text-xs font-medium hover:bg-green-600 transition-colors"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => onReject(disbursement.id)}
                        className="px-3 py-1.5 rounded-lg bg-red-500 text-white text-xs font-medium hover:bg-red-600 transition-colors"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {disbursements.length === 0 && (
        <div className="p-8 text-center text-gray-500">
          <svg className="w-12 h-12 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-sm">No pending disbursements</p>
        </div>
      )}
    </div>
  );
}

export type { Disbursement };
