import { useState } from 'react';

interface Product {
  id: number;
  productCode: string;
  productName: string;
  investmentAmount: number;
}

interface EPIN {
  code: string;
  productId: number;
  productName: string;
  status: 'AVAILABLE' | 'ASSIGNED' | 'USED';
  createdAt: string;
}

interface EPINGeneratorProps {
  products: Product[];
}

export default function EPINGenerator({ products }: EPINGeneratorProps) {
  const [selectedProductId, setSelectedProductId] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [generatedEPINs, setGeneratedEPINs] = useState<EPIN[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateEPIN = (): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = 'EEPIP-';
    for (let i = 0; i < 12; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const handleGenerate = () => {
    if (!selectedProductId) {
      alert('Please select a product');
      return;
    }

    setIsGenerating(true);
    setTimeout(() => {
      const product = products.find(p => p.id === selectedProductId);
      const newEPINs: EPIN[] = [];
      
      for (let i = 0; i < quantity; i++) {
        newEPINs.push({
          code: generateEPIN(),
          productId: selectedProductId,
          productName: product?.productName || '',
          status: 'AVAILABLE',
          createdAt: new Date().toISOString(),
        });
      }

      setGeneratedEPINs(newEPINs);
      setIsGenerating(false);
    }, 500);
  };

  const handleDownloadCSV = () => {
    if (generatedEPINs.length === 0) return;
    const headers = ['EPIN Code', 'Product', 'Status', 'Created At'];
    const rows = generatedEPINs.map(epin => [
      epin.code,
      epin.productName,
      epin.status,
      new Date(epin.createdAt).toLocaleString(),
    ]);
    const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `epins-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = () => {
    const codes = generatedEPINs.map(epin => epin.code).join('\n');
    navigator.clipboard.writeText(codes);
    alert('EPIN codes copied to clipboard');
  };

  return (
    <div className="card p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">EPIN Generator</h2>
        <p className="text-sm text-gray-600">Generate bulk EPIN codes for new registrations</p>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Product *</label>
            <select
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(parseInt(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value={0}>Select a product</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.productName} - Rs. {product.investmentAmount.toLocaleString()}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Quantity *</label>
            <input
              type="number"
              min="1"
              max="1000"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !selectedProductId || quantity < 1}
              className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {isGenerating ? 'Generating...' : 'Generate EPINs'}
            </button>
          </div>
        </div>
      </div>

      {generatedEPINs.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                Generated {generatedEPINs.length} EPIN Code{generatedEPINs.length > 1 ? 's' : ''}
              </h3>
              <p className="text-xs text-gray-600">Product: {generatedEPINs[0].productName}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={copyToClipboard} className="px-3 py-1.5 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50">
                Copy All
              </button>
              <button onClick={handleDownloadCSV} className="px-3 py-1.5 bg-green-600 text-white rounded text-sm hover:bg-green-700">
                Download CSV
              </button>
            </div>
          </div>

          <div className="overflow-x-auto border border-gray-200 rounded-lg">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">EPIN Code</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Created At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {generatedEPINs.map((epin, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-sm font-mono text-gray-900">{epin.code}</td>
                    <td className="px-4 py-2 text-sm text-gray-600">{epin.productName}</td>
                    <td className="px-4 py-2">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {epin.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-600">{new Date(epin.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {generatedEPINs.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">Select a product and quantity to generate EPIN codes</p>
        </div>
      )}
    </div>
  );
}
