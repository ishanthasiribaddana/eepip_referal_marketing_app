import { useState, useEffect } from 'react';
import { Product } from '../../data/mockData';

interface ProductFormProps {
  product: Product | null;
  onClose: () => void;
  onSave: (productData: Product) => void;
}

export default function ProductForm({ product, onClose, onSave }: ProductFormProps) {
  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    productCode: '',
    productName: '',
    investmentAmount: 1800000,
    directSponsorRate: 2,
    binaryPairingRate: 3,
    matchingBonusRate: 0.5,
    leadershipPoolRate: 1.5,
    rankAdvancementRate: 0.5,
    rankMaintenanceRate: 0.5,
    educationFundRate: 2,
    maxPayoutCap: 500000,
    monthlyPayoutCap: 100000,
    effectiveFrom: new Date().toISOString().split('T')[0],
    effectiveTo: undefined,
    status: 'ACTIVE',
  });

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData as Product);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">
            {product ? 'Edit Product' : 'Add New Product'}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Configure investment amount, commission rates, and payout caps
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Code *
              </label>
              <input
                type="text"
                required
                value={formData.productCode || ''}
                onChange={(e) => setFormData({ ...formData, productCode: e.target.value })}
                placeholder="e.g., EEPIP_BSC_MPHIL"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Name *
              </label>
              <input
                type="text"
                required
                value={formData.productName || ''}
                onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                placeholder="e.g., BSc + MPhil Education Plan"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Investment Amount (LKR) *
            </label>
            <input
              type="number"
              required
              min="0"
              value={formData.investmentAmount || ''}
              onChange={(e) => setFormData({ ...formData, investmentAmount: parseFloat(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Commission Rates */}
          <div className="border-t border-gray-200 pt-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Commission Rates (%)</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Direct Sponsor
                </label>
                <input
                  type="number"
                  required
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
                  required
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
                  required
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
                  required
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
                  required
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
                  required
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
                  required
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

          {/* Payout Caps */}
          <div className="border-t border-gray-200 pt-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Payout Caps (LKR)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Max Payout Cap
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  value={formData.maxPayoutCap || ''}
                  onChange={(e) => setFormData({ ...formData, maxPayoutCap: parseFloat(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Monthly Payout Cap
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  value={formData.monthlyPayoutCap || ''}
                  onChange={(e) => setFormData({ ...formData, monthlyPayoutCap: parseFloat(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Effective Period */}
          <div className="border-t border-gray-200 pt-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Effective Period</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Effective From *
                </label>
                <input
                  type="date"
                  required
                  value={formData.effectiveFrom || ''}
                  onChange={(e) => setFormData({ ...formData, effectiveFrom: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Effective To (Optional)
                </label>
                <input
                  type="date"
                  value={formData.effectiveTo || ''}
                  onChange={(e) => setFormData({ ...formData, effectiveTo: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="border-t border-gray-200 pt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status *
            </label>
            <select
              required
              value={formData.status || 'ACTIVE'}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              {product ? 'Update' : 'Create'} Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
