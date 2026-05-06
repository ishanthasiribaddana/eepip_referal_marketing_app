import { useState, useEffect, lazy, Suspense } from 'react';
import SuspenseFallback from '../components/common/SuspenseFallback';
import { StatsCardSkeleton } from '../components/common/LoadingSkeleton';
import { mockTreeData, mockTreeStats } from '../data/mockData';
import { treeService } from '../../api/treeService';

const BinaryTree = lazy(() => import('../components/BinaryTree'));

export default function Tree() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [treeData, setTreeData] = useState(mockTreeData);
  const [treeStats, setTreeStats] = useState(mockTreeStats);

  const userStr = localStorage.getItem('eepip_user');
  const user = userStr ? JSON.parse(userStr) : null;
  const aiEngineerId = user?.id || 1;

  useEffect(() => {
    async function fetchTree() {
      try {
        setLoading(true);
        setError(null);
        const response = await treeService.getTree(aiEngineerId, 4);
        // Would map backend TreeNode to our MockTreeNode structure here
        setTreeStats({
          totalNodes: response.totalNodes,
          activeNodes: response.activeNodes,
          pendingNodes: 0, // not in backend type
          maxDepth: response.maxDepth,
          leftSubtreeSize: response.leftSubtreeSize,
          rightSubtreeSize: response.rightSubtreeSize,
        });
      } catch (err) {
        console.warn('Backend unavailable, using mock tree data:', err);
        setError('Backend unavailable — using demo data');
        setTreeData(mockTreeData);
        setTreeStats(mockTreeStats);
      } finally {
        setLoading(false);
      }
    }

    fetchTree();
  }, [aiEngineerId]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCardSkeleton />
          <StatsCardSkeleton />
          <StatsCardSkeleton />
          <StatsCardSkeleton />
        </div>
        <div className="card p-5">
          <div className="h-96 animate-pulse bg-gray-200 rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-center gap-2 text-sm text-yellow-800">
          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      <div>
        <h2 className="text-2xl font-bold text-gray-800">Binary Tree</h2>
        <p className="text-gray-500 mt-1 text-sm">
          Visualize your downline network structure. Click any node to view details.
        </p>
      </div>

      <Suspense fallback={<SuspenseFallback />}>
        <BinaryTree root={treeData} stats={treeStats} />
      </Suspense>
    </div>
  );
}
