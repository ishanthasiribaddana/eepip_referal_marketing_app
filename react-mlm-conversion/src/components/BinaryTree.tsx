import { useState } from 'react';
import type { MockTreeNode } from '../data/mockData';

// ---------------------------------------------------------------------------
// Status color config
// ---------------------------------------------------------------------------

const STATUS_COLORS: Record<string, { node: string; dot: string; label: string }> = {
  ACTIVE:   { node: 'from-green-500 to-teal-500',    dot: 'bg-green-400', label: 'Active' },
  PENDING:  { node: 'from-yellow-400 to-orange-400',  dot: 'bg-yellow-400', label: 'Pending' },
  INACTIVE: { node: 'from-gray-400 to-gray-500',      dot: 'bg-gray-400', label: 'Inactive' },
  FROZEN:   { node: 'from-red-400 to-pink-500',       dot: 'bg-red-400', label: 'Frozen' },
};

const RANK_COLORS: Record<string, string> = {
  Starter: 'text-gray-200',
  Bronze: 'text-amber-300',
  Silver: 'text-gray-100',
  Gold: 'text-yellow-300',
  Platinum: 'text-cyan-200',
  Diamond: 'text-purple-200',
};

// ---------------------------------------------------------------------------
// Single tree node
// ---------------------------------------------------------------------------

interface TreeNodeProps {
  node: MockTreeNode;
  level: number;
  maxDepth: number;
  selectedId: number | null;
  onSelect: (node: MockTreeNode) => void;
}

function TreeNodeCard({ node, level, maxDepth, selectedId, onSelect }: TreeNodeProps) {
  const [expanded, setExpanded] = useState(level < 2);
  const colors = STATUS_COLORS[node.status] || STATUS_COLORS.INACTIVE;
  const hasChildren = !!(node.left || node.right);
  const canExpand = hasChildren && level < maxDepth;

  // Scale sizes by level
  const sizes = level === 0
    ? 'w-28 h-28 text-sm'
    : level === 1
      ? 'w-24 h-24 text-xs'
      : 'w-20 h-20 text-[11px]';

  return (
    <div className="flex flex-col items-center">
      {/* Node circle */}
      <div
        className={`
          ${sizes} rounded-full flex flex-col items-center justify-center
          bg-gradient-to-br ${colors.node} text-white font-semibold
          shadow-lg border-2 border-white/60 cursor-pointer
          transition-all duration-200 hover:scale-105 hover:shadow-xl
          ${selectedId === node.id ? 'ring-4 ring-primary-400 ring-offset-2' : ''}
        `}
        onClick={() => onSelect(node)}
        title={`${node.name} — ${node.rank} (${node.status})`}
      >
        <span className="font-bold truncate max-w-[90%] leading-tight text-center px-1">
          {node.name.split(' ')[0]}
        </span>
        <span className={`text-[10px] mt-0.5 ${RANK_COLORS[node.rank] || 'opacity-80'}`}>
          {node.rank}
        </span>
        {/* Status dot */}
        <div className={`absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${colors.dot}`} />
      </div>

      {/* BV info */}
      <div className="text-center mt-1.5 text-[10px] text-gray-500 leading-tight">
        <div className="font-medium text-gray-700">{node.name}</div>
        <div>L:{node.leftBV} R:{node.rightBV}</div>
        <div>Team: {node.teamSize}</div>
      </div>

      {/* Expand/collapse */}
      {canExpand && (
        <button
          onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}
          className="mt-1 w-5 h-5 flex items-center justify-center text-xs bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 transition-colors"
        >
          {expanded ? '−' : '+'}
        </button>
      )}

      {/* Children */}
      {expanded && canExpand && (
        <div className="mt-3 relative">
          {/* Vertical connector from parent */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-3 bg-gray-300 -translate-y-3" />

          {/* Horizontal bar */}
          {(node.left && node.right) && (
            <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gray-300" />
          )}

          <div className="flex gap-4 sm:gap-8">
            {/* Left child */}
            <div className="flex flex-col items-center relative">
              {node.left && (
                <>
                  <div className="w-px h-3 bg-gray-300 mb-0" />
                  <TreeNodeCard
                    node={node.left}
                    level={level + 1}
                    maxDepth={maxDepth}
                    selectedId={selectedId}
                    onSelect={onSelect}
                  />
                </>
              )}
              {!node.left && (
                <div className="w-20 h-20 rounded-full border-2 border-dashed border-gray-200 flex items-center justify-center text-xs text-gray-300">
                  Empty
                </div>
              )}
              <span className="text-[9px] text-gray-400 mt-1 font-medium">LEFT</span>
            </div>

            {/* Right child */}
            <div className="flex flex-col items-center relative">
              {node.right && (
                <>
                  <div className="w-px h-3 bg-gray-300 mb-0" />
                  <TreeNodeCard
                    node={node.right}
                    level={level + 1}
                    maxDepth={maxDepth}
                    selectedId={selectedId}
                    onSelect={onSelect}
                  />
                </>
              )}
              {!node.right && (
                <div className="w-20 h-20 rounded-full border-2 border-dashed border-gray-200 flex items-center justify-center text-xs text-gray-300">
                  Empty
                </div>
              )}
              <span className="text-[9px] text-gray-400 mt-1 font-medium">RIGHT</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Node detail panel
// ---------------------------------------------------------------------------

function NodeDetailPanel({ node, onClose }: { node: MockTreeNode; onClose: () => void }) {
  const colors = STATUS_COLORS[node.status];
  return (
    <div className="card border-l-4 border-primary-500">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="font-semibold text-gray-800">{node.name}</h4>
          <p className="text-xs text-gray-500">ID: AI{String(node.id).padStart(3, '0')} · Joined {node.joinDate}</p>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-lg leading-none">&times;</button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
        <div>
          <span className="text-xs text-gray-500">Rank</span>
          <p className="font-semibold">{node.rank}</p>
        </div>
        <div>
          <span className="text-xs text-gray-500">Status</span>
          <p className={`font-semibold`}>
            <span className={`inline-block w-2 h-2 rounded-full ${colors.dot} mr-1`} />
            {colors.label}
          </p>
        </div>
        <div>
          <span className="text-xs text-gray-500">Left BV</span>
          <p className="font-semibold">{node.leftBV}</p>
        </div>
        <div>
          <span className="text-xs text-gray-500">Right BV</span>
          <p className="font-semibold">{node.rightBV}</p>
        </div>
        <div>
          <span className="text-xs text-gray-500">Team Size</span>
          <p className="font-semibold">{node.teamSize}</p>
        </div>
        <div>
          <span className="text-xs text-gray-500">Direct Recruits</span>
          <p className="font-semibold">{node.directRecruits}</p>
        </div>
        <div>
          <span className="text-xs text-gray-500">Position</span>
          <p className="font-semibold">{node.position}</p>
        </div>
        <div>
          <span className="text-xs text-gray-500">Pairs</span>
          <p className="font-semibold">{Math.min(node.leftBV, node.rightBV)}</p>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main BinaryTree component
// ---------------------------------------------------------------------------

interface BinaryTreeProps {
  root: MockTreeNode;
  stats: {
    totalNodes: number;
    activeNodes: number;
    pendingNodes: number;
    maxDepth: number;
    leftSubtreeSize: number;
    rightSubtreeSize: number;
  };
}

export default function BinaryTree({ root, stats }: BinaryTreeProps) {
  const [selectedNode, setSelectedNode] = useState<MockTreeNode | null>(null);
  const [maxDepth, setMaxDepth] = useState(4);

  return (
    <div className="space-y-4">
      {/* Stats bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: 'Total Nodes', value: stats.totalNodes, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Active', value: stats.activeNodes, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Pending', value: stats.pendingNodes, color: 'text-yellow-600', bg: 'bg-yellow-50' },
          { label: 'Left BV', value: root.leftBV, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Right BV', value: root.rightBV, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'Pairs', value: Math.min(root.leftBV, root.rightBV), color: 'text-orange-600', bg: 'bg-orange-50' },
        ].map((s) => (
          <div key={s.label} className={`${s.bg} p-3 rounded-lg text-center`}>
            <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-[10px] text-gray-600 font-medium">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Depth:</span>
          {[2, 3, 4, 5].map((d) => (
            <button
              key={d}
              onClick={() => setMaxDepth(d)}
              className={`px-2 py-1 text-xs rounded transition-colors ${
                maxDepth === d
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
        {selectedNode && (
          <button
            onClick={() => setSelectedNode(null)}
            className="text-xs text-gray-500 hover:text-gray-700"
          >
            Clear selection
          </button>
        )}
      </div>

      {/* Tree visualization */}
      <div className="card overflow-x-auto">
        <div className="min-w-[600px] flex justify-center py-6">
          <TreeNodeCard
            node={root}
            level={0}
            maxDepth={maxDepth}
            selectedId={selectedNode?.id ?? null}
            onSelect={setSelectedNode}
          />
        </div>
      </div>

      {/* Selected node detail */}
      {selectedNode && (
        <NodeDetailPanel node={selectedNode} onClose={() => setSelectedNode(null)} />
      )}

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-xs text-gray-600">
        {Object.entries(STATUS_COLORS).map(([key, val]) => (
          <div key={key} className="flex items-center gap-1.5">
            <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${val.node}`} />
            <span>{val.label}</span>
          </div>
        ))}
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full border-2 border-dashed border-gray-300" />
          <span>Empty slot</span>
        </div>
      </div>
    </div>
  );
}
