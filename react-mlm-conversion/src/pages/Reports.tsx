import { useState } from 'react';
import ReportFilters from '../components/Reports/ReportFilters';
import ReportTable from '../components/Reports/ReportTable';
import ExportButton from '../components/Reports/ExportButton';
import ReportChart from '../components/Reports/ReportChart';
import ScheduleForm from '../components/Reports/ScheduleForm';
import { mockReportsData, mockCommissionTrendData, mockInvestmentByProductData, mockAgentRankingsData } from '../data/mockData';

type ReportType = 'commission' | 'investment' | 'disbursement' | 'agent_performance' | 'binary_tree' | 'epin_usage';

interface ReportTypeOption {
  id: ReportType;
  label: string;
  description: string;
  icon: string;
}

const reportTypes: ReportTypeOption[] = [
  {
    id: 'commission',
    label: 'Commission Report',
    description: 'View commission payouts across all levels and periods',
    icon: '💰',
  },
  {
    id: 'investment',
    label: 'Investment Report',
    description: 'Track investments by product, user, and date range',
    icon: '📊',
  },
  {
    id: 'disbursement',
    label: 'Disbursement Report',
    description: 'Bank disbursements and payment status',
    icon: '🏦',
  },
  {
    id: 'agent_performance',
    label: 'Agent Performance',
    description: 'Agent rankings, referral counts, and earnings',
    icon: '🎯',
  },
  {
    id: 'binary_tree',
    label: 'Binary Tree Report',
    description: 'Tree structure, pairing counts, and pool shares',
    icon: '🌳',
  },
  {
    id: 'epin_usage',
    label: 'EPIN Usage Report',
    description: 'EPIN generation, assignment, and redemption status',
    icon: '🔑',
  },
];

export default function Reports() {
  const [selectedReportType, setSelectedReportType] = useState<ReportType | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportData, setReportData] = useState<any[]>([]);
  const [generatedAt, setGeneratedAt] = useState<string | null>(null);
  const [showScheduleForm, setShowScheduleForm] = useState(false);

  const handleGenerateReport = () => {
    if (!selectedReportType) return;

    setIsGenerating(true);

    // Simulate report generation delay
    setTimeout(() => {
      setReportData(mockReportsData[selectedReportType] || []);
      setGeneratedAt(new Date().toISOString());
      setIsGenerating(false);
    }, 500);
  };

  const handleFilterChange = (filters: any) => {
    // Apply filters to report data (simplified for now)
    console.log('Filters applied:', filters);
  };

  const handleSchedule = (schedule: any) => {
    alert(`Report scheduled: ${JSON.stringify(schedule, null, 2)}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-600 mt-1">Generate and export business reports</p>
        </div>
        <button
          onClick={() => setShowScheduleForm(true)}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700"
        >
          Schedule Report
        </button>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ReportChart
          type="line"
          data={mockCommissionTrendData}
          xKey="name"
          yKey="value"
          title="Commission Trend (6 Months)"
          color="#6366f1"
        />
        <ReportChart
          type="bar"
          data={mockInvestmentByProductData}
          xKey="name"
          yKey="value"
          title="Investment by Product"
          color="#10b981"
        />
        <ReportChart
          type="horizontal-bar"
          data={mockAgentRankingsData}
          xKey="name"
          yKey="value"
          title="Agent Performance Rankings"
          color="#f59e0b"
        />
      </div>

      {/* Report Type Selection */}
      <div className="card p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Report Type</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reportTypes.map((reportType) => (
            <button
              key={reportType.id}
              onClick={() => setSelectedReportType(reportType.id)}
              className={`p-4 rounded-lg border-2 text-left transition-all ${
                selectedReportType === reportType.id
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="text-3xl mb-2">{reportType.icon}</div>
              <div className="font-semibold text-gray-900">{reportType.label}</div>
              <div className="text-sm text-gray-600 mt-1">{reportType.description}</div>
            </button>
          ))}
        </div>

        {selectedReportType && (
          <div className="mt-6 flex gap-3">
            <button
              onClick={handleGenerateReport}
              disabled={isGenerating}
              className="px-6 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {isGenerating ? 'Generating...' : 'Generate Report'}
            </button>
            <button
              onClick={() => {
                setSelectedReportType(null);
                setReportData([]);
                setGeneratedAt(null);
              }}
              className="px-6 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
            >
              Clear Selection
            </button>
          </div>
        )}
      </div>

      {/* Report Results */}
      {selectedReportType && (
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {reportTypes.find(r => r.id === selectedReportType)?.label}
              </h2>
              {generatedAt && (
                <p className="text-sm text-gray-600">
                  Generated at: {new Date(generatedAt).toLocaleString()}
                </p>
              )}
            </div>
            {reportData.length > 0 && (
              <ExportButton data={reportData} reportType={selectedReportType} />
            )}
          </div>

          <ReportFilters onFilterChange={handleFilterChange} />

          {reportData.length > 0 ? (
            <ReportTable reportType={selectedReportType} data={reportData} />
          ) : (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <p className="text-gray-500">
                {isGenerating ? 'Generating report...' : 'Click "Generate Report" to view data'}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Schedule Form Modal */}
      {showScheduleForm && (
        <ScheduleForm onClose={() => setShowScheduleForm(false)} onSchedule={handleSchedule} />
      )}
    </div>
  );
}
