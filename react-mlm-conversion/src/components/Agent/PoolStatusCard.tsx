interface PoolStatusCardProps {
  currentPairs: number;
  pairingCap: number;
  poolShareAmount: number;
}

export default function PoolStatusCard({ currentPairs, pairingCap, poolShareAmount }: PoolStatusCardProps) {
  const progressPercentage = (currentPairs / pairingCap) * 100;
  const formatLKR = (amount: number) => `Rs. ${amount.toLocaleString()}`;

  return (
    <div className="card p-5">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Binary Pool Status</h3>
      
      <div className="space-y-4">
        {/* Pairs Progress */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Monthly Pairs</span>
            <span className="text-sm font-medium text-gray-900">
              {currentPairs} / {pairingCap}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-primary-500 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {currentPairs >= pairingCap ? 'Cap reached for this month' : `${pairingCap - currentPairs} pairs remaining`}
          </p>
        </div>

        {/* Pool Share Amount */}
        <div className="pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Pool Share This Month</span>
            <span className="text-xl font-bold text-primary-600">
              {formatLKR(poolShareAmount)}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            3% of investments from your binary tree
          </p>
        </div>

        {/* Cap Info */}
        <div className="pt-4 border-t border-gray-100 bg-blue-50 p-3 rounded-lg">
          <div className="flex items-start gap-2">
            <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-sm font-medium text-blue-900">Pairing Cap</p>
              <p className="text-xs text-blue-700">
                Maximum {pairingCap} pairs/month = {formatLKR(108000)} max earnings
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
