import { useState } from 'react';

interface Product {
  id: number;
  productCode: string;
  productName: string;
  investmentAmount: number;
  directSponsorRate: number;
  binaryPairingRate: number;
  matchingBonusRate: number;
  leadershipPoolRate: number;
  rankAdvancementRate: number;
  rankMaintenanceRate: number;
  educationFundRate: number;
  maxPayoutCap: number;
  monthlyPayoutCap: number;
  effectiveFrom: string;
  effectiveTo?: string;
  status: 'ACTIVE' | 'INACTIVE';
}

interface ProductTableProps {
  products: Product[];
  onAdd: () => void;
  onEdit: (product: Product) => void;
  onDelete: (productId: number) => void;
}

export default function ProductTable({ products, onAdd, onEdit, onDelete }: ProductTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.productCode.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const formatLKR = (amount: number) => `Rs. ${amount.toLocaleString()}`;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-800';
      case 'INACTIVE':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="card">
      {/* Header with Search and Filters */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex gap-3 flex-1">
            <input
              type="text"
              placeholder="Search by name or code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </div>
          <button
            onClick={onAdd}
            className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Product
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Investment
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rates (%)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payout Caps
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Effective Period
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{product.productName}</div>
                    <div className="text-xs text-gray-500">{product.productCode}</div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                  {formatLKR(product.investmentAmount)}
                </td>
                <td className="px-6 py-4">
                  <div className="text-xs text-gray-600 space-y-1">
                    <div>Direct: {product.directSponsorRate}%</div>
                    <div>Binary: {product.binaryPairingRate}%</div>
                    <div>Matching: {product.matchingBonusRate}%</div>
                    <div>Leadership: {product.leadershipPoolRate}%</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-xs text-gray-600 space-y-1">
                    <div>Max: {formatLKR(product.maxPayoutCap)}</div>
                    <div>Monthly: {formatLKR(product.monthlyPayoutCap)}</div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  <div className="text-xs">
                    <div>{new Date(product.effectiveFrom).toLocaleDateString()}</div>
                    {product.effectiveTo && (
                      <div className="text-gray-400">to {new Date(product.effectiveTo).toLocaleDateString()}</div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                    {product.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onEdit(product)}
                      className="p-1.5 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded"
                      title="Edit"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => onDelete(product.id)}
                      className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded"
                      title="Delete"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No products found matching your filters.</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {filteredProducts.length} of {products.length} products
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
