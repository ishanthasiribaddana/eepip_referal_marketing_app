import { User, ChevronDown } from 'lucide-react'
import { treeData } from '../data/mockData.ts'

interface TreeNode {
  id: number
  name: string
  rank: string
  position: string
  bv: number
  paid: boolean
  left: TreeNode | null
  right: TreeNode | null
}

const rankColors: Record<string, string> = {
  STARTER: 'border-gray-300 bg-gray-50',
  BRONZE: 'border-amber-400 bg-amber-50',
  SILVER: 'border-gray-400 bg-gray-100',
  GOLD: 'border-yellow-400 bg-yellow-50',
  PLATINUM: 'border-blue-400 bg-blue-50',
  DIAMOND: 'border-purple-400 bg-purple-50',
}

function TreeNodeCard({ node }: { node: TreeNode }) {
  return (
    <div className={`inline-flex flex-col items-center rounded-xl border-2 px-4 py-3 min-w-[120px] shadow-sm ${rankColors[node.rank] || rankColors.STARTER}`}>
      <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 ${
        node.paid ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-500'
      }`}>
        <User size={18} />
      </div>
      <p className="text-sm font-semibold text-gray-900">{node.name}</p>
      <p className="text-xs text-gray-500">{node.rank}</p>
      <p className="text-xs text-gray-400">BV: {node.bv}</p>
      {!node.paid && <span className="text-xs text-red-500 font-medium mt-0.5">Unpaid</span>}
    </div>
  )
}

function EmptySlot({ side }: { side: string }) {
  return (
    <div className="inline-flex flex-col items-center rounded-xl border-2 border-dashed border-gray-300 px-4 py-3 min-w-[120px] bg-white">
      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mb-1">
        <User size={18} className="text-gray-300" />
      </div>
      <p className="text-xs text-gray-400">Empty ({side})</p>
    </div>
  )
}

function TreeLevel({ node }: { node: TreeNode }) {
  return (
    <div className="flex flex-col items-center">
      <TreeNodeCard node={node} />

      {(node.left || node.right) && (
        <>
          <div className="flex items-center justify-center my-2">
            <ChevronDown size={16} className="text-gray-300" />
          </div>

          <div className="flex gap-8">
            <div className="flex flex-col items-center">
              {node.left ? <TreeLevel node={node.left} /> : <EmptySlot side="L" />}
            </div>
            <div className="flex flex-col items-center">
              {node.right ? <TreeLevel node={node.right} /> : <EmptySlot side="R" />}
            </div>
          </div>
        </>
      )}

      {!node.left && !node.right && (
        <>
          <div className="flex items-center justify-center my-2">
            <ChevronDown size={16} className="text-gray-300" />
          </div>
          <div className="flex gap-8">
            <EmptySlot side="L" />
            <EmptySlot side="R" />
          </div>
        </>
      )}
    </div>
  )
}

function countNodes(node: TreeNode | null): { total: number; paid: number; depth: number } {
  if (!node) return { total: 0, paid: 0, depth: 0 }
  const left = countNodes(node.left)
  const right = countNodes(node.right)
  return {
    total: 1 + left.total + right.total,
    paid: (node.paid ? 1 : 0) + left.paid + right.paid,
    depth: 1 + Math.max(left.depth, right.depth),
  }
}

export default function BinaryTree() {
  const stats = countNodes(treeData)

  return (
    <div className="p-4 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Binary Tree</h1>
          <p className="text-gray-500 text-sm mt-1">Genealogy view of your downline network</p>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <div className="w-3 h-3 rounded-full bg-blue-100 border border-blue-300"></div>Paid
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <div className="w-3 h-3 rounded-full bg-red-100 border border-red-300"></div>Unpaid
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <div className="w-3 h-3 rounded border-2 border-dashed border-gray-300"></div>Empty
          </div>
        </div>
      </div>

      {/* Tree Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          <p className="text-xs text-gray-500">Total Members</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-green-600">{stats.paid}</p>
          <p className="text-xs text-gray-500">Active (Paid)</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-blue-600">{stats.depth}</p>
          <p className="text-xs text-gray-500">Tree Depth</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-8 overflow-x-auto">
        <div className="flex justify-center min-w-[600px]">
          <TreeLevel node={treeData} />
        </div>
      </div>
    </div>
  )
}
