import React, { useState, useMemo } from 'react';
import { MLMMember, TreeNode, MLMStatus, TreePosition } from '../../types/mlm.types';
import { cn } from '../../utils/cn-simple';

interface BinaryTreeProps {
  rootNode: MLMMember;
  onNodeSelect?: (node: TreeNode) => void;
  selectedNodeId?: string;
  maxDepth?: number;
  showConnections?: boolean;
  className?: string;
}

interface TreeNodeComponentProps {
  node: TreeNode;
  level: number;
  position: TreePosition;
  onNodeClick?: (node: TreeNode) => void;
  isSelected?: boolean;
  maxDepth?: number;
  showConnections?: boolean;
}

const TreeNodeComponent: React.FC<TreeNodeComponentProps> = ({
  node,
  level,
  position,
  onNodeClick,
  isSelected,
  maxDepth = 5,
  showConnections = true
}) => {
  const [isExpanded, setIsExpanded] = useState(level < 2); // Auto-expand first 2 levels

  const getNodeStatusColor = (status: MLMStatus): string => {
    switch (status) {
      case 'active':
        return 'bg-gradient-to-r from-green-500 to-teal-500';
      case 'pending':
        return 'bg-gradient-to-r from-yellow-400 to-orange-500';
      case 'inactive':
        return 'bg-gradient-to-r from-gray-500 to-gray-600';
      case 'suspended':
        return 'bg-gradient-to-r from-red-500 to-pink-500';
      default:
        return 'bg-gradient-to-r from-gray-400 to-gray-500';
    }
  };

  const getNodeSize = (level: number): string => {
    if (level === 0) return 'w-32 h-32 text-base';
    if (level === 1) return 'w-28 h-28 text-sm';
    if (level === 2) return 'w-24 h-24 text-xs';
    return 'w-20 h-20 text-xs';
  };

  const hasChildren = node.left || node.right;
  const shouldShow = level < maxDepth;

  return (
    <div className={cn('inline-block text-center relative', `level-${level}`)}>
      {/* Node Circle */}
      <div
        className={cn(
          'rounded-full flex flex-col items-center justify-center font-semibold text-white mb-2 relative cursor-pointer transition-all duration-300 hover:scale-105 shadow-lg',
          getNodeSize(level),
          getNodeStatusColor(node.member.status),
          isSelected && 'ring-4 ring-indigo-400 ring-offset-2',
          'border-2 border-white'
        )}
        onClick={() => onNodeClick?.(node)}
        title={`${node.member.name} - ${node.member.rank} - ${node.member.status}`}
      >
        <div className="text-center px-1">
          <div className="font-bold truncate max-w-[100px]">
            {node.member.name}
          </div>
          <div className="text-xs opacity-90 mt-1">
            {node.member.rank}
          </div>
        </div>
        
        {/* Status Indicator */}
        <div className={cn(
          'absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white',
          node.member.status === 'active' && 'bg-green-400',
          node.member.status === 'pending' && 'bg-yellow-400',
          node.member.status === 'inactive' && 'bg-gray-400'
        )} />
      </div>

      {/* Node Info */}
      <div className="text-xs text-gray-600 mb-2">
        <div className="font-medium">{node.member.name}</div>
        <div className="text-gray-500">L:{node.member.leftBV} R:{node.member.rightBV}</div>
        <div className="text-gray-400">Team: {node.member.teamSize}</div>
      </div>

      {/* Expand/Collapse Button */}
      {hasChildren && shouldShow && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
          className="mb-2 px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
        >
          {isExpanded ? '−' : '+'}
        </button>
      )}

      {/* Children */}
      {isExpanded && shouldShow && (
        <div className="flex justify-center gap-4 relative">
          {/* Connection Lines */}
          {showConnections && (
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-gray-300 -translate-y-8" />
          )}
          
          {/* Left Child */}
          {node.left && (
            <div className="relative">
              {showConnections && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-gray-300 -translate-y-8" />
              )}
              <TreeNodeComponent
                node={node.left}
                level={level + 1}
                position="left"
                onNodeClick={onNodeClick}
                isSelected={isSelected}
                maxDepth={maxDepth}
                showConnections={showConnections}
              />
            </div>
          )}
          
          {/* Right Child */}
          {node.right && (
            <div className="relative">
              {showConnections && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-gray-300 -translate-y-8" />
              )}
              <TreeNodeComponent
                node={node.right}
                level={level + 1}
                position="right"
                onNodeClick={onNodeClick}
                isSelected={isSelected}
                maxDepth={maxDepth}
                showConnections={showConnections}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const BinaryTree: React.FC<BinaryTreeProps> = ({
  rootNode,
  onNodeSelect,
  selectedNodeId,
  maxDepth = 4,
  showConnections = true,
  className
}) => {
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);
  const [treeStats, setTreeStats] = useState({
    totalNodes: 0,
    activeNodes: 0,
    maxDepth: 0,
    leftDepth: 0,
    rightDepth: 0
  });

  // Convert MLMMember to TreeNode structure
  const convertToTreeNode = (member: MLMMember, level = 0): TreeNode => {
    const leftChild = member.children.left ? convertToTreeNode(member.children.left, level + 1) : undefined;
    const rightChild = member.children.right ? convertToTreeNode(member.children.right, level + 1) : undefined;
    
    return {
      member,
      left: leftChild,
      right: rightChild,
      level,
      position: member.position,
      isExpanded: level < 2,
      isVisible: level <= maxDepth
    };
  };

  // Calculate tree statistics
  const calculateTreeStats = (node: TreeNode): void => {
    let stats = {
      totalNodes: 0,
      activeNodes: 0,
      maxDepth: 0,
      leftDepth: 0,
      rightDepth: 0
    };

    const traverse = (n: TreeNode, depth: number): void => {
      if (!n) return;
      
      stats.totalNodes++;
      if (n.member.status === 'active') stats.activeNodes++;
      stats.maxDepth = Math.max(stats.maxDepth, depth);
      
      if (n.position === 'left') {
        stats.leftDepth = Math.max(stats.leftDepth, depth);
      } else if (n.position === 'right') {
        stats.rightDepth = Math.max(stats.rightDepth, depth);
      }
      
      if (n.left) traverse(n.left, depth + 1);
      if (n.right) traverse(n.right, depth + 1);
    };

    traverse(node, 0);
    setTreeStats(stats);
  };

  const treeRoot = useMemo(() => convertToTreeNode(rootNode), [rootNode]);

  React.useEffect(() => {
    calculateTreeStats(treeRoot);
  }, [treeRoot]);

  const handleNodeSelect = (node: TreeNode) => {
    setSelectedNode(node);
    onNodeSelect?.(node);
  };

  const handleExpandAll = () => {
    // Implementation for expanding all nodes
    console.log('Expand all nodes');
  };

  const handleCollapseAll = () => {
    // Implementation for collapsing all nodes
    console.log('Collapse all nodes');
  };

  const handleResetView = () => {
    setSelectedNode(null);
    onNodeSelect?.(null as any);
  };

  return (
    <div className={cn('bg-white rounded-2xl p-8 overflow-x-auto shadow-lg', className)}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Binary Tree Structure</h2>
        <div className="flex gap-2">
          <button
            onClick={handleExpandAll}
            className="px-3 py-1 text-sm bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-lg transition-colors"
          >
            Expand All
          </button>
          <button
            onClick={handleCollapseAll}
            className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
          >
            Collapse All
          </button>
          <button
            onClick={handleResetView}
            className="px-3 py-1 text-sm bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors"
          >
            Reset View
          </button>
        </div>
      </div>

      {/* Tree Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <div className="text-2xl font-bold text-indigo-600">{treeStats.totalNodes}</div>
          <div className="text-xs text-gray-600">Total Members</div>
        </div>
        <div className="bg-green-50 p-3 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-600">{treeStats.activeNodes}</div>
          <div className="text-xs text-gray-600">Active</div>
        </div>
        <div className="bg-blue-50 p-3 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-600">{rootNode.leftBV}</div>
          <div className="text-xs text-gray-600">Left BV</div>
        </div>
        <div className="bg-purple-50 p-3 rounded-lg text-center">
          <div className="text-2xl font-bold text-purple-600">{rootNode.rightBV}</div>
          <div className="text-xs text-gray-600">Right BV</div>
        </div>
        <div className="bg-orange-50 p-3 rounded-lg text-center">
          <div className="text-2xl font-bold text-orange-600">{Math.min(rootNode.leftBV, rootNode.rightBV)}</div>
          <div className="text-xs text-gray-600">Pairs</div>
        </div>
      </div>

      {/* Tree Visualization */}
      <div className="overflow-x-auto pb-8">
        <div className="inline-block min-w-full">
          <TreeNodeComponent
            node={treeRoot}
            level={0}
            position={rootNode.position}
            onNodeClick={handleNodeSelect}
            isSelected={selectedNode?.member.id === selectedNodeId}
            maxDepth={maxDepth}
            showConnections={showConnections}
          />
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-gradient-to-r from-green-500 to-teal-500" />
          <span className="text-sm text-gray-600">Active</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500" />
          <span className="text-sm text-gray-600">Pending</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-gradient-to-r from-gray-500 to-gray-600" />
          <span className="text-sm text-gray-600">Inactive</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-gradient-to-r from-red-500 to-pink-500" />
          <span className="text-sm text-gray-600">Suspended</span>
        </div>
      </div>
    </div>
  );
};

export default BinaryTree;
