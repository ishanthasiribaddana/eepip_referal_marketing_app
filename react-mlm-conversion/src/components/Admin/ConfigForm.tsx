import { useState, useEffect } from 'react';

interface SystemConfig {
  id: number;
  directSponsorRate: number;
  binaryPairingRate: number;
  matchingBonusRate: number;
  leadershipPoolRate: number;
  rankAdvancementRate: number;
  rankMaintenanceRate: number;
  educationFundRate: number;
  agentDirectRate: number;
  agentPoolRate: number;
  pairingCap: number;
  maxPayoutCap: number;
  monthlyPayoutCap: number;
  instituteTransferRate: number;
  updatedAt: string;
}

interface ConfigFormProps {
  config: SystemConfig | null;
  onSave: (config: SystemConfig) => void;
}

export default function ConfigForm({ config, onSave }: ConfigFormProps) {
  const [formData, setFormData] = useState<Partial<SystemConfig>>({
    directSponsorRate: 2,
    binaryPairingRate: 3,
    matchingBonusRate: 0.5,
    leadershipPoolRate: 1.5,
    rankAdvancementRate: 0.5,
    rankMaintenanceRate: 0.5,
    educationFundRate: 2,
    agentDirectRate: 2,
    agentPoolRate: 3,
    pairingCap: 2,
    maxPayoutCap: 500000,
    monthlyPayoutCap: 100000,
    instituteTransferRate: 79,
  });

  useEffect(() => {
    if (config) {
      setFormData(config);
    }
  }, [config]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newConfig: SystemConfig = {
      id: config?.id || 1,
      ...formData as Omit<SystemConfig, 'id' | 'updatedAt'>,
      updatedAt: new Date().toISOString(),
    };
    onSave(newConfig);
  };

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">System Configuration</h2>
          <p className="text-sm text-gray-600">Configure commission rates and payout caps</p>
        </div>
        {config && (
          <p className="text-xs text-gray-500">
            Last updated: {new Date(config.updatedAt).toLocaleString()}
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* AI Engineer Commission Rates */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">AI Engineer Commission Rates (%)</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Direct Sponsor
              </label>
              <input
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={formData.directSponsorRate || ''}
                onChange={(e) => setFormData({ ...formData, directSponsorRate: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Binary Pairing
              </label>
              <input
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={formData.binaryPairingRate || ''}
                onChange={(e) => setFormData({ ...formData, binaryPairingRate: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Matching Bonus
              </label>
              <input
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={formData.matchingBonusRate || ''}
                onChange={(e) => setFormData({ ...formData, matchingBonusRate: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Leadership Pool
              </label>
              <input
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={formData.leadershipPoolRate || ''}
                onChange={(e) => setFormData({ ...formData, leadershipPoolRate: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Rank Advancement
              </label>
              <input
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={formData.rankAdvancementRate || ''}
                onChange={(e) => setFormData({ ...formData, rankAdvancementRate: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Rank Maintenance
              </label>
              <input
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={formData.rankMaintenanceRate || ''}
                onChange={(e) => setFormData({ ...formData, rankMaintenanceRate: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Education Fund
              </label>
              <input
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={formData.educationFundRate || ''}
                onChange={(e) => setFormData({ ...formData, educationFundRate: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Agent Commission Rates */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Agent Commission Rates (%)</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Direct Referral (2%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={formData.agentDirectRate || ''}
                onChange={(e) => setFormData({ ...formData, agentDirectRate: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Binary Pool (3%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={formData.agentPoolRate || ''}
                onChange={(e) => setFormData({ ...formData, agentPoolRate: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Payout Caps */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Payout Caps (LKR)</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Pairing Cap (pairs/month)
              </label>
              <input
                type="number"
                min="0"
                value={formData.pairingCap || ''}
                onChange={(e) => setFormData({ ...formData, pairingCap: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Max Payout Cap
              </label>
              <input
                type="number"
                min="0"
                value={formData.maxPayoutCap || ''}
                onChange={(e) => setFormData({ ...formData, maxPayoutCap: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Monthly Payout Cap
              </label>
              <input
                type="number"
                min="0"
                value={formData.monthlyPayoutCap || ''}
                onChange={(e) => setFormData({ ...formData, monthlyPayoutCap: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Institute Transfer Rate */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Institute Transfer (%)</h3>
          <div className="max-w-xs">
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Transfer Rate (currently 79%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={formData.instituteTransferRate || ''}
              onChange={(e) => setFormData({ ...formData, instituteTransferRate: parseFloat(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">
              Percentage of investment transferred to education institute
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <button
            type="submit"
            className="px-6 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700"
          >
            Save Configuration
          </button>
          <button
            type="button"
            onClick={() => {
              if (config) {
                setFormData(config);
              }
            }}
            className="px-6 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
