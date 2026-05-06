// =============================================================================
// Mock Data — Milestone 4+
// Will be replaced with real API calls in Milestone 8
// =============================================================================

export interface MockDashboardData {
  user: MockUser;
  stats: MockStats;
  investment: MockInvestment;
  recentCommissions: MockCommission[];
  rankProgress: MockRankProgress;
  bvSummary: MockBVSummary;
}

export interface MockUser {
  id: number;
  username: string;
  fullName: string;
  email: string;
  rank: string;
  memberState: string;
  joinDate: string;
}

export interface MockStats {
  totalEarnings: number;
  thisMonthEarnings: number;
  teamSize: number;
  directRecruits: number;
  activePairs: number;
  currentRank: string;
}

export interface MockInvestment {
  productName: string;
  investmentAmount: number;
  monthlyInterest: number;
  studentName: string;
  studentStatus: string;
  programProgress: string;
  investmentDate: string;
}

export interface MockCommission {
  id: number;
  date: string;
  type: 'DIRECT_SPONSOR' | 'BINARY_PAIRING' | 'MATCHING_BONUS' | 'LEADERSHIP_POOL';
  description: string;
  amount: number;
  status: 'PENDING' | 'APPROVED' | 'PAID';
}

export interface MockRankProgress {
  currentRank: string;
  nextRank: string;
  progress: number;
  requirements: {
    label: string;
    current: number;
    required: number;
  }[];
}

export interface MockBVSummary {
  leftBV: number;
  rightBV: number;
  totalBV: number;
  carryForwardLeft: number;
  carryForwardRight: number;
  pairsThisMonth: number;
  maxPairsPerMonth: number;
}

// ---------------------------------------------------------------------------
// Dashboard mock data
// ---------------------------------------------------------------------------

export const mockDashboardData: MockDashboardData = {
  user: {
    id: 1,
    username: 'AI001',
    fullName: 'John Smith',
    email: 'john.smith@temcobank.com',
    rank: 'Silver',
    memberState: 'BSC_IN_PROGRESS',
    joinDate: '2025-01-15',
  },

  stats: {
    totalEarnings: 654000,
    thisMonthEarnings: 270000,
    teamSize: 47,
    directRecruits: 4,
    activePairs: 12,
    currentRank: 'Silver',
  },

  investment: {
    productName: 'BSc + MPhil Education Plan',
    investmentAmount: 1800000,
    monthlyInterest: 24000,
    studentName: 'Sarah Smith',
    studentStatus: 'BSc In Progress',
    programProgress: 'Year 2 — Semester 1',
    investmentDate: '2025-01-15',
  },

  recentCommissions: [
    {
      id: 1,
      date: '2026-04-28',
      type: 'DIRECT_SPONSOR',
      description: 'New enrollment — Mary Johnson',
      amount: 36000,
      status: 'PAID',
    },
    {
      id: 2,
      date: '2026-04-25',
      type: 'BINARY_PAIRING',
      description: '3 pairs formed this cycle',
      amount: 90000,
      status: 'PAID',
    },
    {
      id: 3,
      date: '2026-04-20',
      type: 'MATCHING_BONUS',
      description: 'Gen 1 matching — Robert Lee',
      amount: 9000,
      status: 'PAID',
    },
    {
      id: 4,
      date: '2026-04-18',
      type: 'LEADERSHIP_POOL',
      description: 'Silver rank pool share',
      amount: 27000,
      status: 'APPROVED',
    },
    {
      id: 5,
      date: '2026-04-15',
      type: 'BINARY_PAIRING',
      description: '2 pairs formed this cycle',
      amount: 60000,
      status: 'PAID',
    },
    {
      id: 6,
      date: '2026-04-10',
      type: 'DIRECT_SPONSOR',
      description: 'New enrollment — Lisa Chen',
      amount: 36000,
      status: 'PAID',
    },
    {
      id: 7,
      date: '2026-04-08',
      type: 'BINARY_PAIRING',
      description: '1 pair formed this cycle',
      amount: 30000,
      status: 'PAID',
    },
    {
      id: 8,
      date: '2026-04-05',
      type: 'MATCHING_BONUS',
      description: 'Gen 2 matching — David Wilson',
      amount: 4500,
      status: 'PAID',
    },
    {
      id: 9,
      date: '2026-04-02',
      type: 'DIRECT_SPONSOR',
      description: 'New enrollment — James Taylor',
      amount: 36000,
      status: 'PENDING',
    },
    {
      id: 10,
      date: '2026-03-28',
      type: 'BINARY_PAIRING',
      description: '2 pairs formed this cycle',
      amount: 60000,
      status: 'PAID',
    },
    {
      id: 11,
      date: '2026-03-25',
      type: 'LEADERSHIP_POOL',
      description: 'Bronze rank pool share',
      amount: 15000,
      status: 'PAID',
    },
    {
      id: 12,
      date: '2026-03-20',
      type: 'MATCHING_BONUS',
      description: 'Gen 1 matching — Sophie Brown',
      amount: 9000,
      status: 'PAID',
    },
    {
      id: 13,
      date: '2026-03-15',
      type: 'BINARY_PAIRING',
      description: '3 pairs formed this cycle',
      amount: 90000,
      status: 'PAID',
    },
    {
      id: 14,
      date: '2026-03-10',
      type: 'DIRECT_SPONSOR',
      description: 'New enrollment — Raj Fernando',
      amount: 36000,
      status: 'PAID',
    },
    {
      id: 15,
      date: '2026-03-05',
      type: 'BINARY_PAIRING',
      description: '1 pair formed this cycle',
      amount: 30000,
      status: 'PAID',
    },
  ],

  rankProgress: {
    currentRank: 'Silver',
    nextRank: 'Gold',
    progress: 65,
    requirements: [
      { label: 'Direct Recruits', current: 4, required: 6 },
      { label: 'Team Enrollments', current: 32, required: 50 },
      { label: 'Left Balance', current: 15, required: 20 },
      { label: 'Right Balance', current: 17, required: 20 },
    ],
  },

  bvSummary: {
    leftBV: 15,
    rightBV: 12,
    totalBV: 27,
    carryForwardLeft: 3,
    carryForwardRight: 0,
    pairsThisMonth: 12,
    maxPairsPerMonth: 3,
  },
};

// ---------------------------------------------------------------------------
// Binary tree mock data
// ---------------------------------------------------------------------------

export interface MockTreeNode {
  id: number;
  name: string;
  rank: string;
  status: 'ACTIVE' | 'PENDING' | 'INACTIVE' | 'FROZEN';
  leftBV: number;
  rightBV: number;
  teamSize: number;
  directRecruits: number;
  joinDate: string;
  position: 'LEFT' | 'RIGHT' | 'ROOT';
  left?: MockTreeNode;
  right?: MockTreeNode;
}

export interface MockTreeStats {
  totalNodes: number;
  activeNodes: number;
  pendingNodes: number;
  maxDepth: number;
  leftSubtreeSize: number;
  rightSubtreeSize: number;
}

export const mockTreeData: MockTreeNode = {
  id: 1, name: 'John Smith', rank: 'Silver', status: 'ACTIVE',
  leftBV: 15, rightBV: 12, teamSize: 47, directRecruits: 4,
  joinDate: '2025-01-15', position: 'ROOT',
  left: {
    id: 2, name: 'Mary Johnson', rank: 'Bronze', status: 'ACTIVE',
    leftBV: 8, rightBV: 7, teamSize: 23, directRecruits: 2,
    joinDate: '2025-02-01', position: 'LEFT',
    left: {
      id: 5, name: 'David Wilson', rank: 'Starter', status: 'ACTIVE',
      leftBV: 3, rightBV: 2, teamSize: 8, directRecruits: 1,
      joinDate: '2025-03-01', position: 'LEFT',
      left: {
        id: 9, name: 'Kevin Adams', rank: 'Starter', status: 'ACTIVE',
        leftBV: 1, rightBV: 1, teamSize: 2, directRecruits: 0,
        joinDate: '2025-04-15', position: 'LEFT',
      },
      right: {
        id: 10, name: 'Nina Patel', rank: 'Starter', status: 'PENDING',
        leftBV: 0, rightBV: 0, teamSize: 0, directRecruits: 0,
        joinDate: '2025-05-01', position: 'RIGHT',
      },
    },
    right: {
      id: 6, name: 'Lisa Chen', rank: 'Bronze', status: 'ACTIVE',
      leftBV: 5, rightBV: 4, teamSize: 15, directRecruits: 2,
      joinDate: '2025-03-05', position: 'RIGHT',
      left: {
        id: 11, name: 'Raj Fernando', rank: 'Starter', status: 'ACTIVE',
        leftBV: 2, rightBV: 1, teamSize: 4, directRecruits: 1,
        joinDate: '2025-04-01', position: 'LEFT',
      },
      right: {
        id: 12, name: 'Amara Silva', rank: 'Starter', status: 'ACTIVE',
        leftBV: 1, rightBV: 2, teamSize: 3, directRecruits: 0,
        joinDate: '2025-04-10', position: 'RIGHT',
      },
    },
  },
  right: {
    id: 3, name: 'Robert Lee', rank: 'Silver', status: 'ACTIVE',
    leftBV: 7, rightBV: 5, teamSize: 24, directRecruits: 3,
    joinDate: '2025-02-10', position: 'RIGHT',
    left: {
      id: 7, name: 'James Taylor', rank: 'Starter', status: 'PENDING',
      leftBV: 0, rightBV: 0, teamSize: 0, directRecruits: 0,
      joinDate: '2025-04-01', position: 'LEFT',
    },
    right: {
      id: 8, name: 'Sophie Brown', rank: 'Bronze', status: 'ACTIVE',
      leftBV: 4, rightBV: 3, teamSize: 9, directRecruits: 2,
      joinDate: '2025-03-15', position: 'RIGHT',
      left: {
        id: 13, name: 'Hassan Ali', rank: 'Starter', status: 'ACTIVE',
        leftBV: 1, rightBV: 1, teamSize: 2, directRecruits: 0,
        joinDate: '2025-05-01', position: 'LEFT',
      },
      right: {
        id: 14, name: 'Priya Kumari', rank: 'Starter', status: 'INACTIVE',
        leftBV: 0, rightBV: 0, teamSize: 0, directRecruits: 0,
        joinDate: '2025-05-10', position: 'RIGHT',
      },
    },
  },
};

export const mockTreeStats: MockTreeStats = {
  totalNodes: 14,
  activeNodes: 11,
  pendingNodes: 2,
  maxDepth: 3,
  leftSubtreeSize: 7,
  rightSubtreeSize: 6,
};

// ---------------------------------------------------------------------------
// Helper: format LKR currency
// ---------------------------------------------------------------------------

export function formatLKR(amount: number): string {
  return new Intl.NumberFormat('en-LK', {
    style: 'currency',
    currency: 'LKR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// ---------------------------------------------------------------------------
// Helper: commission type display labels & colors
// ---------------------------------------------------------------------------

export const COMMISSION_TYPE_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  DIRECT_SPONSOR:  { label: 'Direct Sponsor',  color: 'text-green-700',  bg: 'bg-green-50' },
  BINARY_PAIRING:  { label: 'Binary Pairing',  color: 'text-blue-700',   bg: 'bg-blue-50' },
  MATCHING_BONUS:  { label: 'Matching Bonus',   color: 'text-yellow-700', bg: 'bg-yellow-50' },
  LEADERSHIP_POOL: { label: 'Leadership Pool',  color: 'text-red-700',    bg: 'bg-red-50' },
};

export const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  PENDING:  { label: 'Pending',  color: 'text-yellow-700', bg: 'bg-yellow-50' },
  APPROVED: { label: 'Approved', color: 'text-blue-700',   bg: 'bg-blue-50' },
  PAID:     { label: 'Paid',     color: 'text-green-700',  bg: 'bg-green-50' },
};

// ---------------------------------------------------------------------------
// Mock Student Candidates for Student Matching
// ---------------------------------------------------------------------------

export interface StudentCandidate {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  university: string;
  degree: string;
  academicScore: number;
  eligibilityStatus: 'ELIGIBLE' | 'PENDING' | 'NOT_ELIGIBLE';
  graduationYear: number;
  specialization: string;
}

export const mockStudentCandidates: StudentCandidate[] = [
  {
    id: 1,
    fullName: 'Sarah Perera',
    email: 'sarah.perera@uni.lk',
    phone: '+94 77 123 4567',
    university: 'University of Colombo',
    degree: 'BSc Computer Science',
    academicScore: 88,
    eligibilityStatus: 'ELIGIBLE',
    graduationYear: 2026,
    specialization: 'Software Engineering',
  },
  {
    id: 2,
    fullName: 'Kamal Jayasinghe',
    email: 'kamal.j@slit.lk',
    phone: '+94 71 234 5678',
    university: 'Sri Lanka Institute of Information Technology',
    degree: 'BSc Information Technology',
    academicScore: 75,
    eligibilityStatus: 'ELIGIBLE',
    graduationYear: 2027,
    specialization: 'Data Science',
  },
  {
    id: 3,
    fullName: 'Nimal Fernando',
    email: 'nimal.f@kln.ac.lk',
    phone: '+94 76 345 6789',
    university: 'University of Kelaniya',
    degree: 'BSc Physical Science',
    academicScore: 68,
    eligibilityStatus: 'PENDING',
    graduationYear: 2027,
    specialization: 'Mathematics',
  },
  {
    id: 4,
    fullName: 'Priya Wickramasinghe',
    email: 'priya.w@moratuwa.lk',
    phone: '+94 77 456 7890',
    university: 'University of Moratuwa',
    degree: 'BSc Engineering',
    academicScore: 92,
    eligibilityStatus: 'ELIGIBLE',
    graduationYear: 2026,
    specialization: 'Computer Engineering',
  },
  {
    id: 5,
    fullName: 'Tharaka Silva',
    email: 'tharaka.s@jpiet.lk',
    phone: '+94 78 567 8901',
    university: 'Java Institute',
    degree: 'BSc in Software Engineering',
    academicScore: 58,
    eligibilityStatus: 'NOT_ELIGIBLE',
    graduationYear: 2027,
    specialization: 'Web Development',
  },
  {
    id: 6,
    fullName: 'Anusha Rajapaksa',
    email: 'anusha.r@peradeniya.lk',
    phone: '+94 71 678 9012',
    university: 'University of Peradeniya',
    degree: 'BSc Statistics',
    academicScore: 82,
    eligibilityStatus: 'ELIGIBLE',
    graduationYear: 2026,
    specialization: 'Data Analytics',
  },
];

// ---------------------------------------------------------------------------
// Mock Bank Data for Bank Dashboard
// ---------------------------------------------------------------------------

export interface BankDisbursement {
  id: number;
  memberName: string;
  memberId: string;
  amount: number;
  type: 'COMMISSION' | 'WITHDRAWAL';
  requestDate: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  bankAccount: string;
}

export const mockBankDisbursements: BankDisbursement[] = [
  {
    id: 1,
    memberName: 'John Smith',
    memberId: 'AI001',
    amount: 45000,
    type: 'COMMISSION',
    requestDate: '2025-12-15',
    status: 'PENDING',
    bankAccount: '1234-5678-9012',
  },
  {
    id: 2,
    memberName: 'Lisa Chen',
    memberId: 'AI006',
    amount: 32000,
    type: 'COMMISSION',
    requestDate: '2025-12-14',
    status: 'PENDING',
    bankAccount: '2345-6789-0123',
  },
  {
    id: 3,
    memberName: 'Robert Lee',
    memberId: 'AI003',
    amount: 28000,
    type: 'WITHDRAWAL',
    requestDate: '2025-12-13',
    status: 'PENDING',
    bankAccount: '3456-7890-1234',
  },
  {
    id: 4,
    memberName: 'Sophie Brown',
    memberId: 'AI008',
    amount: 51000,
    type: 'COMMISSION',
    requestDate: '2025-12-12',
    status: 'APPROVED',
    bankAccount: '4567-8901-2345',
  },
  {
    id: 5,
    memberName: 'James Taylor',
    memberId: 'AI007',
    amount: 15000,
    type: 'WITHDRAWAL',
    requestDate: '2025-12-11',
    status: 'REJECTED',
    bankAccount: '5678-9012-3456',
  },
];

export const mockBankStats = {
  totalAIEngineers: 156,
  totalInvestment: 280800000, // Rs. 280.8M
  totalCommissionsPaid: 12500000, // Rs. 12.5M
  pendingDisbursements: 3,
};

// ---------------------------------------------------------------------------
// Mock Agent Data for Agent Dashboard
// ---------------------------------------------------------------------------

export interface MockAgentData {
  isActive: boolean;
  isDualRole: boolean;
  totalReferrals: number;
  activeReferrals: number;
  totalCommissionEarned: number;
  currentMonthPairs: number;
  pairingCap: number;
  poolShareAmount: number;
  referrals: Array<{
    id: number;
    name: string;
    investment: number;
    commissionEarned: number;
    status: 'ACTIVE' | 'PENDING' | 'INACTIVE';
    date: string;
  }>;
  commissionHistory: Array<{
    id: number;
    name: string;
    investment: number;
    commissionEarned: number;
    status: 'PAID' | 'PENDING' | 'FAILED';
    date: string;
  }>;
}

export const mockAgentData: MockAgentData = {
  isActive: true, // Has introduced at least 1 AI Engineer
  isDualRole: true, // Agent + AI Engineer
  totalReferrals: 8,
  activeReferrals: 6,
  totalCommissionEarned: 720000, // Rs. 720,000 total
  currentMonthPairs: 1,
  pairingCap: 2, // 2 pairs/month max
  poolShareAmount: 54000, // Rs. 54,000 this month
  referrals: [
    {
      id: 1,
      name: 'Mary Johnson',
      investment: 1800000,
      commissionEarned: 36000, // 2% direct referral
      status: 'ACTIVE',
      date: '2026-01-15',
    },
    {
      id: 2,
      name: 'Robert Lee',
      investment: 1800000,
      commissionEarned: 36000,
      status: 'ACTIVE',
      date: '2026-02-10',
    },
    {
      id: 3,
      name: 'Lisa Chen',
      investment: 1800000,
      commissionEarned: 36000,
      status: 'ACTIVE',
      date: '2026-03-05',
    },
    {
      id: 4,
      name: 'James Taylor',
      investment: 1800000,
      commissionEarned: 36000,
      status: 'PENDING',
      date: '2026-04-01',
    },
    {
      id: 5,
      name: 'Sophie Brown',
      investment: 1800000,
      commissionEarned: 36000,
      status: 'ACTIVE',
      date: '2026-03-15',
    },
    {
      id: 6,
      name: 'David Wilson',
      investment: 1800000,
      commissionEarned: 36000,
      status: 'ACTIVE',
      date: '2026-03-01',
    },
    {
      id: 7,
      name: 'Sarah Williams',
      investment: 1800000,
      commissionEarned: 36000,
      status: 'INACTIVE',
      date: '2026-02-20',
    },
    {
      id: 8,
      name: 'Michael Anderson',
      investment: 1800000,
      commissionEarned: 36000,
      status: 'ACTIVE',
      date: '2026-04-15',
    },
  ],
  commissionHistory: [
    {
      id: 1,
      name: 'DIRECT',
      investment: 1800000,
      commissionEarned: 36000,
      status: 'PAID',
      date: '2026-04-28',
    },
    {
      id: 2,
      name: 'BINARY_POOL',
      investment: 1800000,
      commissionEarned: 54000,
      status: 'PAID',
      date: '2026-04-25',
    },
    {
      id: 3,
      name: 'DIRECT',
      investment: 1800000,
      commissionEarned: 36000,
      status: 'PAID',
      date: '2026-04-15',
    },
    {
      id: 4,
      name: 'BINARY_POOL',
      investment: 1800000,
      commissionEarned: 54000,
      status: 'PAID',
      date: '2026-04-10',
    },
    {
      id: 5,
      name: 'DIRECT',
      investment: 1800000,
      commissionEarned: 36000,
      status: 'PENDING',
      date: '2026-04-05',
    },
  ],
};

// ---------------------------------------------------------------------------
// Mock Users for Admin Panel
// ---------------------------------------------------------------------------

export interface AdminUser {
  id: number;
  username: string;
  fullName: string;
  email: string;
  phone: string;
  nic: string;
  role: 'AI_ENGINEER' | 'AGENT' | 'BANK_ADMIN' | 'SYSTEM_ADMIN';
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING';
  joinDate: string;
}

export const mockUsers: AdminUser[] = [
  {
    id: 1,
    username: 'johnsmith',
    fullName: 'John Smith',
    email: 'john.smith@temcobank.com',
    phone: '+94 71 123 4567',
    nic: '901234567V',
    role: 'AI_ENGINEER',
    status: 'ACTIVE',
    joinDate: '2025-01-15',
  },
  {
    id: 2,
    username: 'maryjohnson',
    fullName: 'Mary Johnson',
    email: 'mary.johnson@temcobank.com',
    phone: '+94 72 234 5678',
    nic: '912345678V',
    role: 'AI_ENGINEER',
    status: 'ACTIVE',
    joinDate: '2025-02-01',
  },
  {
    id: 3,
    username: 'robertlee',
    fullName: 'Robert Lee',
    email: 'robert.lee@temcobank.com',
    phone: '+94 77 345 6789',
    nic: '883456789V',
    role: 'AGENT',
    status: 'ACTIVE',
    joinDate: '2025-02-10',
  },
  {
    id: 4,
    username: 'lisachen',
    fullName: 'Lisa Chen',
    email: 'lisa.chen@temcobank.com',
    phone: '+94 71 456 7890',
    nic: '924567890V',
    role: 'AI_ENGINEER',
    status: 'ACTIVE',
    joinDate: '2025-03-05',
  },
  {
    id: 5,
    username: 'jamestaylor',
    fullName: 'James Taylor',
    email: 'james.taylor@temcobank.com',
    phone: '+94 76 567 8901',
    nic: '935678901V',
    role: 'AI_ENGINEER',
    status: 'PENDING',
    joinDate: '2025-04-01',
  },
  {
    id: 6,
    username: 'sophiebrown',
    fullName: 'Sophie Brown',
    email: 'sophie.brown@temcobank.com',
    phone: '+94 78 678 9012',
    nic: '946789012V',
    role: 'AI_ENGINEER',
    status: 'ACTIVE',
    joinDate: '2025-03-15',
  },
  {
    id: 7,
    username: 'davidwilson',
    fullName: 'David Wilson',
    email: 'david.wilson@temcobank.com',
    phone: '+94 71 789 0123',
    nic: '957890123V',
    role: 'AI_ENGINEER',
    status: 'ACTIVE',
    joinDate: '2025-03-01',
  },
  {
    id: 8,
    username: 'adminuser',
    fullName: 'Admin User',
    email: 'admin@temcobank.com',
    phone: '+94 77 890 1234',
    nic: '968901234V',
    role: 'SYSTEM_ADMIN',
    status: 'ACTIVE',
    joinDate: '2024-12-01',
  },
  {
    id: 9,
    username: 'bankadmin',
    fullName: 'Bank Admin',
    email: 'bank.admin@temcobank.com',
    phone: '+94 72 901 2345',
    nic: '979012345V',
    role: 'BANK_ADMIN',
    status: 'ACTIVE',
    joinDate: '2024-12-15',
  },
  {
    id: 10,
    username: 'sarahwilliams',
    fullName: 'Sarah Williams',
    email: 'sarah.williams@temcobank.com',
    phone: '+94 76 012 3456',
    nic: '980123456V',
    role: 'AI_ENGINEER',
    status: 'INACTIVE',
    joinDate: '2025-02-20',
  },
];

// ---------------------------------------------------------------------------
// Mock Agents for Admin Panel
// ---------------------------------------------------------------------------

export interface Agent {
  id: number;
  userId: number;
  userName: string;
  appointmentDate: string;
  status: 'ACTIVE' | 'INACTIVE';
  isDualRole: boolean;
  educationExempt: boolean;
}

export const mockAgents: Agent[] = [
  {
    id: 1,
    userId: 3,
    userName: 'Robert Lee',
    appointmentDate: '2025-02-10',
    status: 'ACTIVE',
    isDualRole: true,
    educationExempt: false,
  },
  {
    id: 2,
    userId: 1,
    userName: 'John Smith',
    appointmentDate: '2025-03-01',
    status: 'ACTIVE',
    isDualRole: true,
    educationExempt: true,
  },
  {
    id: 3,
    userId: 4,
    userName: 'Lisa Chen',
    appointmentDate: '2025-04-15',
    status: 'ACTIVE',
    isDualRole: false,
    educationExempt: false,
  },
];

// ---------------------------------------------------------------------------
// Mock Products for Admin Panel
// ---------------------------------------------------------------------------

export interface Product {
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

export const mockProducts: Product[] = [
  {
    id: 1,
    productCode: 'EEPIP_BSC_MPHIL',
    productName: 'BSc + MPhil Education Plan',
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
    effectiveFrom: '2024-01-01',
    status: 'ACTIVE',
  },
  {
    id: 2,
    productCode: 'EEPIP_DIPLOMA',
    productName: 'Diploma in AI Engineering',
    investmentAmount: 500000,
    directSponsorRate: 2,
    binaryPairingRate: 3,
    matchingBonusRate: 0.5,
    leadershipPoolRate: 1.5,
    rankAdvancementRate: 0.5,
    rankMaintenanceRate: 0.5,
    educationFundRate: 2,
    maxPayoutCap: 200000,
    monthlyPayoutCap: 50000,
    effectiveFrom: '2024-01-01',
    status: 'ACTIVE',
  },
  {
    id: 3,
    productCode: 'EEPIP_CERTIFICATE',
    productName: 'Certificate Program',
    investmentAmount: 200000,
    directSponsorRate: 2,
    binaryPairingRate: 3,
    matchingBonusRate: 0.5,
    leadershipPoolRate: 1.5,
    rankAdvancementRate: 0.5,
    rankMaintenanceRate: 0.5,
    educationFundRate: 2,
    maxPayoutCap: 100000,
    monthlyPayoutCap: 25000,
    effectiveFrom: '2024-06-01',
    status: 'ACTIVE',
  },
];

// ---------------------------------------------------------------------------
// Mock System Config for Admin Panel
// ---------------------------------------------------------------------------

export interface SystemConfig {
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

export const mockSystemConfig: SystemConfig = {
  id: 1,
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
  updatedAt: new Date().toISOString(),
};

// ---------------------------------------------------------------------------
// Mock Audit Logs for Admin Panel
// ---------------------------------------------------------------------------

export interface AuditLog {
  id: number;
  timestamp: string;
  userId: number;
  userName: string;
  action: string;
  entity: string;
  entityId: number;
  details: string;
  ipAddress: string;
}

export const mockAuditLogs: AuditLog[] = [
  {
    id: 1,
    timestamp: '2026-04-28T10:30:00Z',
    userId: 8,
    userName: 'Admin User',
    action: 'CREATE',
    entity: 'User',
    entityId: 10,
    details: 'Created new user Sarah Williams',
    ipAddress: '192.168.1.100',
  },
  {
    id: 2,
    timestamp: '2026-04-28T11:15:00Z',
    userId: 8,
    userName: 'Admin User',
    action: 'UPDATE',
    entity: 'Product',
    entityId: 1,
    details: 'Updated commission rates for EEPIP_BSC_MPHIL',
    ipAddress: '192.168.1.100',
  },
  {
    id: 3,
    timestamp: '2026-04-28T12:00:00Z',
    userId: 1,
    userName: 'John Smith',
    action: 'LOGIN',
    entity: 'Session',
    entityId: 101,
    details: 'User logged in successfully',
    ipAddress: '192.168.1.105',
  },
  {
    id: 4,
    timestamp: '2026-04-28T13:45:00Z',
    userId: 8,
    userName: 'Admin User',
    action: 'CREATE',
    entity: 'Agent',
    entityId: 3,
    details: 'Appointed Lisa Chen as agent',
    ipAddress: '192.168.1.100',
  },
  {
    id: 5,
    timestamp: '2026-04-28T14:30:00Z',
    userId: 3,
    userName: 'Robert Lee',
    action: 'LOGIN',
    entity: 'Session',
    entityId: 102,
    details: 'User logged in successfully',
    ipAddress: '192.168.1.110',
  },
  {
    id: 6,
    timestamp: '2026-04-28T15:00:00Z',
    userId: 8,
    userName: 'Admin User',
    action: 'UPDATE',
    entity: 'SystemConfig',
    entityId: 1,
    details: 'Updated pairing cap to 2 pairs/month',
    ipAddress: '192.168.1.100',
  },
  {
    id: 7,
    timestamp: '2026-04-28T16:20:00Z',
    userId: 2,
    userName: 'Mary Johnson',
    action: 'LOGIN',
    entity: 'Session',
    entityId: 103,
    details: 'User logged in successfully',
    ipAddress: '192.168.1.115',
  },
  {
    id: 8,
    timestamp: '2026-04-28T17:00:00Z',
    userId: 8,
    userName: 'Admin User',
    action: 'DELETE',
    entity: 'User',
    entityId: 5,
    details: 'Deactivated user James Taylor',
    ipAddress: '192.168.1.100',
  },
];

// ---------------------------------------------------------------------------
// Mock Report Data for Reports Module
// ---------------------------------------------------------------------------

export interface CommissionReport {
  date: string;
  user: string;
  type: string;
  level: number;
  amount: number;
  status: string;
}

export interface InvestmentReport {
  date: string;
  user: string;
  product: string;
  amount: number;
  status: string;
}

export interface DisbursementReport {
  date: string;
  user: string;
  bank: string;
  amount: number;
  reference: string;
  status: string;
}

export interface AgentPerformanceReport {
  agent: string;
  referrals: number;
  earnings: number;
  rank: string;
  status: string;
}

export interface BinaryTreeReport {
  user: string;
  leftLeg: number;
  rightLeg: number;
  pairs: number;
  poolShare: number;
}

export interface EPINUsageReport {
  epinCode: string;
  product: string;
  status: string;
  assignedTo: string;
  createdAt: string;
}

export const mockCommissionReport: CommissionReport[] = [
  { date: '2026-04-01', user: 'John Smith', type: 'Direct', level: 1, amount: 36000, status: 'Paid' },
  { date: '2026-04-02', user: 'Mary Johnson', type: 'Binary', level: 2, amount: 54000, status: 'Paid' },
  { date: '2026-04-03', user: 'Robert Lee', type: 'Matching', level: 1, amount: 9000, status: 'Pending' },
  { date: '2026-04-04', user: 'Lisa Chen', type: 'Direct', level: 1, amount: 36000, status: 'Paid' },
  { date: '2026-04-05', user: 'Sophie Brown', type: 'Binary', level: 3, amount: 54000, status: 'Paid' },
];

export const mockInvestmentReport: InvestmentReport[] = [
  { date: '2026-03-15', user: 'John Smith', product: 'BSc + MPhil', amount: 1800000, status: 'Active' },
  { date: '2026-03-20', user: 'Mary Johnson', product: 'BSc + MPhil', amount: 1800000, status: 'Active' },
  { date: '2026-04-01', user: 'Robert Lee', product: 'Diploma', amount: 500000, status: 'Active' },
  { date: '2026-04-10', user: 'Lisa Chen', product: 'Certificate', amount: 200000, status: 'Active' },
];

export const mockDisbursementReport: DisbursementReport[] = [
  { date: '2026-04-01', user: 'John Smith', bank: 'Temco Bank', amount: 36000, reference: 'TXN001', status: 'Paid' },
  { date: '2026-04-02', user: 'Mary Johnson', bank: 'Temco Bank', amount: 54000, reference: 'TXN002', status: 'Paid' },
  { date: '2026-04-05', user: 'Sophie Brown', bank: 'Temco Bank', amount: 54000, reference: 'TXN003', status: 'Pending' },
];

export const mockAgentPerformanceReport: AgentPerformanceReport[] = [
  { agent: 'Robert Lee', referrals: 5, earnings: 180000, rank: 'Gold', status: 'Active' },
  { agent: 'John Smith', referrals: 3, earnings: 108000, rank: 'Silver', status: 'Active' },
  { agent: 'Lisa Chen', referrals: 2, earnings: 72000, rank: 'Bronze', status: 'Active' },
];

export const mockBinaryTreeReport: BinaryTreeReport[] = [
  { user: 'John Smith', leftLeg: 3, rightLeg: 2, pairs: 2, poolShare: 54000 },
  { user: 'Mary Johnson', leftLeg: 4, rightLeg: 3, pairs: 3, poolShare: 81000 },
  { user: 'Robert Lee', leftLeg: 2, rightLeg: 2, pairs: 2, poolShare: 54000 },
];

export const mockEPINUsageReport: EPINUsageReport[] = [
  { epinCode: 'EEPIP-ABC123XYZ', product: 'BSc + MPhil', status: 'Assigned', assignedTo: 'John Smith', createdAt: '2026-04-01' },
  { epinCode: 'EEPIP-DEF456UVW', product: 'Diploma', status: 'Available', assignedTo: '-', createdAt: '2026-04-05' },
  { epinCode: 'EEPIP-GHI789RST', product: 'Certificate', status: 'Used', assignedTo: 'Mary Johnson', createdAt: '2026-03-20' },
];

export const mockReportsData: Record<string, any[]> = {
  commission: mockCommissionReport,
  investment: mockInvestmentReport,
  disbursement: mockDisbursementReport,
  agent_performance: mockAgentPerformanceReport,
  binary_tree: mockBinaryTreeReport,
  epin_usage: mockEPINUsageReport,
};

// ---------------------------------------------------------------------------
// Mock Chart Data for Reports Module
// ---------------------------------------------------------------------------

export interface ChartDataPoint {
  name: string;
  value: number;
  [key: string]: string | number;
}

export const mockCommissionTrendData: ChartDataPoint[] = [
  { name: 'Jan', value: 45000 },
  { name: 'Feb', value: 52000 },
  { name: 'Mar', value: 48000 },
  { name: 'Apr', value: 61000 },
  { name: 'May', value: 55000 },
  { name: 'Jun', value: 67000 },
];

export const mockInvestmentByProductData: ChartDataPoint[] = [
  { name: 'BSc + MPhil', value: 5400000 },
  { name: 'Diploma', value: 1500000 },
  { name: 'Certificate', value: 600000 },
];

export const mockAgentRankingsData: ChartDataPoint[] = [
  { name: 'Robert Lee', value: 180000 },
  { name: 'John Smith', value: 108000 },
  { name: 'Lisa Chen', value: 72000 },
  { name: 'Mary Johnson', value: 54000 },
  { name: 'Sophie Brown', value: 36000 },
];
