interface CommissionBreakdownProps {
  directRate: number;
  poolRate: number;
  investmentAmount: number;
}

export default function CommissionBreakdown({ directRate, poolRate, investmentAmount }: CommissionBreakdownProps) {
  const directAmount = (investmentAmount * directRate) / 100;
  const poolAmount = (investmentAmount * poolRate) / 100;
  const totalAmount = directAmount + poolAmount;

  const formatLKR = (amount: number) => `Rs. ${amount.toLocaleString()}`;

  return (
    <div className="card p-5">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Commission Breakdown</h3>
      
      <div className="space-y-4">
        {/* Total Commission */}
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg p-4 text-white">
          <p className="text-sm font-medium opacity-90">Total Commission (5% of Investment)</p>
          <p className="text-3xl font-bold mt-1">{formatLKR(totalAmount)}</p>
          <p className="text-xs opacity-75 mt-1">Per Rs. {investmentAmount.toLocaleString()} investment</p>
        </div>

        {/* Breakdown */}
        <div className="space-y-3">
          {/* Direct Referral */}
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Direct Referral</p>
                <p className="text-xs text-gray-600">{directRate}% of investment</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-green-700">{formatLKR(directAmount)}</p>
            </div>
          </div>

          {/* Binary Pool */}
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Binary Pool</p>
                <p className="text-xs text-gray-600">{poolRate}% of investment</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-blue-700">{formatLKR(poolAmount)}</p>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-start gap-2">
            <svg className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-xs text-gray-600">
              Agent commission is a <strong>separate 5% budget</strong> from the investment amount, split between direct referral ({directRate}%) and binary pool ({poolRate}%).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
