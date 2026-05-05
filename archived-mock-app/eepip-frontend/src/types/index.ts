// AI Engineer Types
export interface AiEngineer {
  id?: number;
  memberId: number;
  productId: number;
  parentId?: number;
  position?: 'LEFT' | 'RIGHT';
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  investmentAmount: number;
  status: 'INVESTED' | 'STUDENT_NOMINATED' | 'ACTIVATED' | 'BSc_IN_PROGRESS' | 'BSc_COMPLETED' | 'MPhil_IN_PROGRESS' | 'MPhil_COMPLETED' | 'DROPOUT';
  enrollmentDate?: string;
  activationDate?: string;
  introducingAgentId?: number;
  educationExempt?: boolean;
}

export interface AiEngineerDTO {
  id?: number;
  memberId: number;
  productId: number;
  parentId?: number;
  position?: 'LEFT' | 'RIGHT';
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  investmentAmount: number;
  status?: string;
  enrollmentDate?: string;
  activationDate?: string;
  introducingAgentId?: number;
  educationExempt?: boolean;
}

// Product Types
export interface Product {
  id?: number;
  productCode: string;
  productName: string;
  investmentAmount: number;
  currency: string;
  directSponsorRate: number;
  binaryPoolRate: number;
  matchingBonusRate: number;
  leadershipPoolRate: number;
  agentDirectRate: number;
  agentPoolRate: number;
  bankMarginRate: number;
  maxBinaryPairsPerMonth: number;
  maxAgentPairsPerMonth: number;
  effectiveFrom?: string;
  effectiveTo?: string;
}

// Agent Types
export interface Agent {
  id?: number;
  memberId: number;
  parentId?: number;
  position?: 'LEFT' | 'RIGHT';
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
  appointmentDate?: string;
  activationDate?: string;
  leftChildCount: number;
  rightChildCount: number;
  totalReferrals: number;
}

export interface AgentDTO {
  id?: number;
  memberId: number;
  parentId?: number;
  position?: 'LEFT' | 'RIGHT';
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status?: string;
  appointmentDate?: string;
  activationDate?: string;
}

// Commission Types
export interface Commission {
  id?: number;
  aiEngineerId: number;
  type: 'DIRECT_SPONSOR' | 'BINARY_PAIRING' | 'MATCHING_BONUS' | 'LEADERSHIP_POOL';
  amount: number;
  cycleMonth: string;
  paid: boolean;
  paidDate?: string;
  createdAt?: string;
}

export interface AgentCommission {
  id?: number;
  agentId: number;
  type: 'DIRECT_REFERRAL' | 'BINARY_PAIRING';
  amount: number;
  cycleMonth: string;
  paid: boolean;
  paidDate?: string;
  createdAt?: string;
}

// Binary Tree Types
export interface BinaryTreeNode {
  id: number;
  memberId: number;
  firstName: string;
  lastName: string;
  position?: 'LEFT' | 'RIGHT';
  leftChild?: BinaryTreeNode;
  rightChild?: BinaryTreeNode;
  status: string;
  level: number;
}

// Common Response Types
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}
