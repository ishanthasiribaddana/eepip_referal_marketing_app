interface OverviewStatsProps {
  totalAIEngineers: number;
  totalInvestment: number;
  totalCommissionsPaid: number;
  pendingDisbursements: number;
}

export default function OverviewStats({
  totalAIEngineers,
  totalInvestment,
  totalCommissionsPaid,
  pendingDisbursements,
}: OverviewStatsProps) {
  const stats = [
    {
      label: 'Total AI Engineers',
      value: totalAIEngineers.toLocaleString(),
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
    {
      label: 'Total Investment',
      value: `Rs. ${totalInvestment.toLocaleString()}`,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      label: 'Total Commissions Paid',
      value: `Rs. ${totalCommissionsPaid.toLocaleString()}`,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      label: 'Pending Disbursements',
      value: pendingDisbursements.toLocaleString(),
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div key={stat.label} className="card p-5 flex items-start gap-4">
          <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center shrink-0`}>
            <span className={stat.color}>{stat.icon}</span>
          </div>
          <div>
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
