// =============================================================================
// EEPIP v3.0 — TypeScript Interfaces
// Aligned to: chat_summary.md, current_status.md, TEMCO ERP patterns
// Package mirror: lk.temcobank.eepip.dto.*
// =============================================================================

// ---------------------------------------------------------------------------
// 1. AUTHENTICATION & SSO (mirrors TEMCO SSO at :8085)
// ---------------------------------------------------------------------------

export interface SSOLoginRequest {
  username: string;
  password: string;
}

export interface SSOLoginResponse {
  token: string;
  sessionId: string;
  user: AuthenticatedUser;
  expiresAt: string;
}

export interface AuthenticatedUser {
  id: number;
  username: string;
  memberId: number;
  role: SystemRole;
  permissions: string[];
  lastLogin: string;
}

export enum SystemRole {
  AI_ENGINEER = 'AI_ENGINEER',
  AGENT = 'AGENT',
  ADMIN = 'ADMIN',
  BANK_READONLY = 'BANK_READONLY',
  SUPER_ADMIN = 'SUPER_ADMIN'
}

// ---------------------------------------------------------------------------
// 2. EPIN SYSTEM (Optional Payment Confirmation)
// ---------------------------------------------------------------------------

export enum EPinStatus {
  GENERATED = 'GENERATED',
  ASSIGNED = 'ASSIGNED',
  USED = 'USED',
  EXPIRED = 'EXPIRED'
}

export interface EPin {
  id: number;
  epinNo: string; // 6-character alphanumeric
  epinName: string; // e.g., "EEPIP Enrollment"
  productId: number; // links to Product for price
  type: 'regular' | 'premium';
  price: number; // derived from product.investmentAmount (read-only)
  dateGenerated: string; // ISO datetime
  dateUsed: string | null; // ISO datetime when used
  dateExpires: string | null; // ISO datetime (nullable - can be NULL)
  userKey: number | null; // null when generated, assigned when used
  status: EPinStatus;
  issuedByMemberId: number; // Bank staff member ID
}

export interface EPinGenerationRequest {
  epinName: string;
  productId: number; // which product this ePin is for
  type: 'regular' | 'premium';
  quantity: number;
}

export interface EPinValidationRequest {
  epinNo: string;
}

export interface EPinValidationResponse {
  valid: boolean;
  epin: EPin | null;
  message: string;
}

// ---------------------------------------------------------------------------
// 2. AI ENGINEER (Member) — mirrors AiEngineerDTO.java
// ---------------------------------------------------------------------------

export interface AIEngineer {
  id: number;
  memberId: number;
  username: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  nicNumber: string;
  address: string;
  city: string;
  country: string;
  dateOfBirth: string;
  gender: Gender;
  avatar?: string;

  // MLM position
  sponsorId?: number;
  parentId?: number;            // placement parent (can differ from sponsor)
  position: TreePosition;       // which leg sponsor placed them in
  treeLevel: number;
  treePath: string;             // e.g. "1.3.7.15"

  // EEPIP state machine
  memberState: AIEngineerState;

  // Investment
  productId: number;            // links to Product for investment amount & rates
  investmentAmount: number;     // derived from product.investmentAmount (read-only)
  investmentDate: string;
  bankReference: string;
  introducingAgentId?: number;  // agent who introduced this AI Engineer

  // Academic status (Earn While Learn - self-nomination only)
  academicEligibilityVerified: boolean;
  enrollmentDate?: string;
  expectedGraduation?: string;
  activationDate?: string;

  // Education tracking
  bscStartDate?: string;
  bscEndDate?: string;          // bscStartDate + 36 months
  mphilStartDate?: string;
  mphilEndDate?: string;

  // BV tracking
  leftBV: number;
  rightBV: number;
  totalBV: number;
  carryForwardLeftBV: number;   // unmatched BV carried to next cycle
  carryForwardRightBV: number;

  // Performance
  rank: Rank;
  totalEarnings: number;
  monthlyEarnings: number;
  teamSize: number;
  directRecruits: number;
  directRecruitsLeft: number;
  directRecruitsRight: number;

  // Multiple positions
  positionsHeld: number;        // 1 investment = 1 position; can hold N

  // Timestamps
  createdAt: string;
  updatedAt: string;
  lastActive: string;
}

// ---------------------------------------------------------------------------
// 3. AI ENGINEER STATE MACHINE (GAP-03 fix)
//    INVESTED → STUDENT_NOMINATED → ACTIVATED → BSc_IN_PROGRESS (36 mo)
//        → BSc_COMPLETED → MPhil_IN_PROGRESS → MPhil_COMPLETED
//    Commissions active from ACTIVATED until MPhil_COMPLETED or DROPOUT
// ---------------------------------------------------------------------------

export enum AIEngineerState {
  WAITING_ENROLLMENT = 'WAITING_ENROLLMENT',
  ENROLLED = 'ENROLLED',
  BSC_YEAR_1_IN_PROGRESS = 'BSC_YEAR_1_IN_PROGRESS',
  BSC_YEAR_2_IN_PROGRESS = 'BSC_YEAR_2_IN_PROGRESS',
  BSC_YEAR_3_IN_PROGRESS = 'BSC_YEAR_3_IN_PROGRESS',
  BSC_COMPLETED = 'BSC_COMPLETED',
  MPHIL_IN_PROGRESS = 'MPHIL_IN_PROGRESS',
  MPHIL_COMPLETED = 'MPHIL_COMPLETED',
  DROPPED_OUT = 'DROPPED_OUT',
  FROZEN = 'FROZEN'
}

export enum TreePosition {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT'
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER'
}

// ---------------------------------------------------------------------------
// 4. RANK SYSTEM — exact values from EEPIP v3.0 design
// ---------------------------------------------------------------------------

export enum Rank {
  STARTER = 'STARTER',
  BRONZE = 'BRONZE',
  SILVER = 'SILVER',
  GOLD = 'GOLD',
  PLATINUM = 'PLATINUM',
  DIAMOND = 'DIAMOND'
}

export interface RankRequirements {
  rank: Rank;
  directRecruits: number;
  directRecruitsLeft: number;   // Bronze needs 1L+1R specifically
  directRecruitsRight: number;
  teamEnrollments: number;
  minLeftBalance: number;
  minRightBalance: number;
  leadershipShares: number;
  rewardAmount: number;         // one-time reward in LKR
  isPermanent: boolean;         // always true — no demotion
}

// Exact rank requirements as constants (mirrors Java enum/config)
export const RANK_REQUIREMENTS: RankRequirements[] = [
  { rank: Rank.STARTER,  directRecruits: 0,  directRecruitsLeft: 0,   directRecruitsRight: 0,   teamEnrollments: 1,   minLeftBalance: 0,   minRightBalance: 0,   leadershipShares: 0, rewardAmount: 0,       isPermanent: true },
  { rank: Rank.BRONZE,   directRecruits: 2,  directRecruitsLeft: 1,   directRecruitsRight: 1,   teamEnrollments: 6,   minLeftBalance: 2,   minRightBalance: 2,   leadershipShares: 0, rewardAmount: 10000,   isPermanent: true },
  { rank: Rank.SILVER,   directRecruits: 4,  directRecruitsLeft: 2,   directRecruitsRight: 2,   teamEnrollments: 20,  minLeftBalance: 8,   minRightBalance: 8,   leadershipShares: 0, rewardAmount: 25000,   isPermanent: true },
  { rank: Rank.GOLD,     directRecruits: 6,  directRecruitsLeft: 3,   directRecruitsRight: 3,   teamEnrollments: 50,  minLeftBalance: 20,  minRightBalance: 20,  leadershipShares: 1, rewardAmount: 75000,   isPermanent: true },
  { rank: Rank.PLATINUM, directRecruits: 8,  directRecruitsLeft: 4,   directRecruitsRight: 4,   teamEnrollments: 100, minLeftBalance: 40,  minRightBalance: 40,  leadershipShares: 2, rewardAmount: 200000,  isPermanent: true },
  { rank: Rank.DIAMOND,  directRecruits: 12, directRecruitsLeft: 6,   directRecruitsRight: 6,   teamEnrollments: 250, minLeftBalance: 100, minRightBalance: 100, leadershipShares: 5, rewardAmount: 500000,  isPermanent: true },
];

export interface RankProgress {
  currentRank: Rank;
  nextRank?: Rank;
  progress: number; // 0-100
  current: {
    directRecruits: number;
    directRecruitsLeft: number;
    directRecruitsRight: number;
    teamEnrollments: number;
    leftBalance: number;
    rightBalance: number;
  };
  required: RankRequirements;
}

// ---------------------------------------------------------------------------
// 5. STUDENT BENEFICIARY — REMOVED (V29: merged into AI Engineer)
//    Every AI Engineer is now a Student via self-nomination (Earn While Learn Model)
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// 6. BINARY TREE — mirrors BinaryTreeDTO.java
// ---------------------------------------------------------------------------

export interface BinaryTreeResponse {
  rootNode: TreeNode;
  totalNodes: number;
  activeNodes: number;
  maxDepth: number;
  leftSubtreeSize: number;
  rightSubtreeSize: number;
}

export interface TreeNode {
  aiEngineer: AIEngineer;
  left?: TreeNode;
  right?: TreeNode;
  level: number;
  position: TreePosition;
  isExpanded?: boolean;
}

// ---------------------------------------------------------------------------
// 7. COMMISSIONS — mirrors Commission*DTO.java
//    Direct Sponsor: 2% = Rs. 36,000 (immediate)
//    Binary Pairing: 5% = Rs. 90,000/enrollment into pool (monthly)
//    Matching Bonus: 1.5% = Rs. 27,000 (monthly)
//    Leadership Pool: 1.5% = Rs. 27,000 (monthly)
// ---------------------------------------------------------------------------

export enum CommissionType {
  DIRECT_SPONSOR = 'DIRECT_SPONSOR',
  BINARY_PAIRING = 'BINARY_PAIRING',
  MATCHING_BONUS = 'MATCHING_BONUS',
  LEADERSHIP_POOL = 'LEADERSHIP_POOL',
  RANK_ACHIEVEMENT = 'RANK_ACHIEVEMENT'
}

// EEPIP commission rate DEFAULTS (fallback when product config is unavailable)
// At runtime, use product.directSponsorRate etc. from Product API
export const COMMISSION_RATES = {
  DIRECT_SPONSOR_RATE: 0.02,        // default 2%
  BINARY_POOL_RATE: 0.05,           // default 5%
  MATCHING_BONUS_RATE: 0.015,       // default 1.5%
  LEADERSHIP_POOL_RATE: 0.015,      // default 1.5%
  AGENT_DIRECT_RATE: 0.02,          // default 2%
  AGENT_POOL_RATE: 0.03,            // default 3%
  BANK_MARGIN_RATE: 0.06,           // default 6%
  TOTAL_MLM_COMMISSION_RATE: 0.10,  // sum of 4 AI Engineer rates
  TOTAL_AGENT_RATE: 0.05,           // sum of 2 agent rates
  DEFAULT_INVESTMENT_AMOUNT: 1800000, // fallback if product not loaded
} as const;

// Matching bonus generation rates (GAP-07 fix)
export const MATCHING_GENERATION_RATES = {
  GEN_1: 0.10,   // 10% of direct recruits' binary earnings
  GEN_2: 0.05,   // 5% of recruits' recruits' binary earnings
  GEN_3: 0.03,   // 3% of 3 levels deep binary earnings
  MAX_DEPTH: 3,   // Gen 4+: nothing
} as const;

// Binary payout constraints (GAP-04 fix)
export const BINARY_PAYOUT_RULES = {
  MAX_PAIRS_PER_MONTH: 3,
  MAX_BINARY_PER_MONTH: 270000,     // 3 × 90,000
  MINIMUM_PAYOUT: 500,
  PAYOUT_CYCLE: 'MONTHLY',
  CARRY_FORWARD: true,             // stronger leg BV carries forward
} as const;

export enum CommissionStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  PAID = 'PAID',
  PRO_RATED = 'PRO_RATED',         // when pool cap triggers
  REJECTED = 'REJECTED',
  HELD = 'HELD'
}

export interface Commission {
  id: number;
  aiEngineerId: number;
  type: CommissionType;
  amount: number;                   // actual paid amount (may be pro-rated)
  originalAmount: number;           // before pro-rating
  taxAmount: number;                // tax deducted
  netAmount: number;                // amount after tax
  tdsRate: number;                  // TDS rate percentage
  currency: string;                 // currency code
  proRationPercentage?: number;     // e.g. 90.9% when pool exceeded
  description: string;
  relatedAiEngineerId?: number;
  transactionId?: string;
  date: string;
  status: CommissionStatus;
  approvedBy?: number;              // member ID who approved
  approvedAt?: string;              // approval timestamp
  rejectionReason?: string;         // reason for rejection
  paidDate?: string;
  paymentMethod?: string;
  cycleMonth: string;               // e.g. "2026-05"
  metadata: CommissionMetadata;
}

export interface CommissionMetadata {
  bv?: number;
  pairs?: number;
  rate?: number;
  generation?: number;              // for matching bonus (1, 2, or 3)
  rank?: Rank;
  poolShare?: number;
  proRated?: boolean;
}

// ---------------------------------------------------------------------------
// 8. BINARY POOL CAP (GAP-04 fix)
// ---------------------------------------------------------------------------

export interface BinaryPoolStatus {
  cycleMonth: string;               // e.g. "2026-05"
  enrollmentsThisMonth: number;
  poolAmount: number;               // enrollments × 90,000
  carryForwardFromLastMonth: number;
  // totalAvailable removed: always = poolAmount + carryForwardFromLastMonth
  totalClaims: number;              // sum of all binary claims
  proRationTriggered: boolean;
  proRationPercentage: number;      // 100 if no pro-rating
  surplus: number;                  // (poolAmount + carryForwardFromLastMonth) - totalClaims
  utilization: number;              // totalClaims / (poolAmount + carryForwardFromLastMonth) × 100
}

export interface MemberBinaryDetail {
  aiEngineerId: number;
  cycleMonth: string;
  leftBV: number;
  rightBV: number;
  pairedBV: number;                 // min(leftBV, rightBV)
  pairsUsed: number;               // capped at 3
  carryForwardLeftBV: number;
  carryForwardRightBV: number;
  claimAmount: number;              // before pro-rating
  actualPayout: number;             // after pro-rating
  proRationPercentage: number;
}

// ---------------------------------------------------------------------------
// 9. DASHBOARD — mirrors DashboardDTO.java
// ---------------------------------------------------------------------------

export interface DashboardData {
  aiEngineer: AIEngineer;
  overview: {
    totalEarnings: number;
    thisMonthEarnings: number;
    lastMonthEarnings: number;
    pendingCommissions: number;
    investmentAmount: number;
    monthlyInterest: number;        // Rs. 24,000 (tuition installment)
  };
  bvStats: {
    leftBV: number;
    rightBV: number;
    carryForwardLeftBV: number;
    carryForwardRightBV: number;
    pairsThisMonth: number;
    maxPairsPerMonth: number;       // 3
  };
  recentCommissions: Commission[];
  rankProgress: RankProgress;
  memberState: AIEngineerState;
  notifications: AppNotification[];
}

// ---------------------------------------------------------------------------
// 10. COMMISSION REPORTS
// ---------------------------------------------------------------------------

export interface CommissionReport {
  period: ReportPeriod;
  overview: {
    totalEarnings: number;
    thisMonth: number;
    lastMonth: number;
    breakdown: CommissionBreakdown[];
  };
  detailed: Commission[];
  binaryDetail: MemberBinaryDetail;
  poolStatus: BinaryPoolStatus;
  matchingDetail: MatchingCommissionData;
  leadershipDetail: LeadershipCommissionData;
}

export interface CommissionBreakdown {
  type: CommissionType;
  amount: number;
  percentage: number;
  transactions: number;
}

export interface MatchingCommissionData {
  totalMatching: number;
  generations: MatchingGeneration[];
  details: MatchingDetail[];
}

export interface MatchingGeneration {
  level: number;                    // 1, 2, or 3
  rate: number;                     // 0.10, 0.05, 0.03
  earnings: number;
  membersInGeneration: number;
  activeMembers: number;
}

export interface MatchingDetail {
  date: string;
  generation: number;
  fromAiEngineerId: number;
  fromAiEngineerName: string;
  fromAiEngineerRank: Rank;
  theirBinaryEarnings: number;
  rate: number;
  amount: number;
}

export interface LeadershipCommissionData {
  totalLeadership: number;
  currentRank: Rank;
  shares: number;
  shareValue: number;
  poolDistribution: LeadershipPoolEntry[];
  history: LeadershipHistory[];
}

export interface LeadershipPoolEntry {
  rank: Rank;
  qualifiedMembers: number;
  totalShares: number;
  poolAmount: number;
  perShareAmount: number;
}

export interface LeadershipHistory {
  cycleMonth: string;
  rank: Rank;
  shares: number;
  amount: number;
  totalPoolSize: number;
}

export enum ReportPeriod {
  CURRENT = 'CURRENT',
  LAST_MONTH = 'LAST_MONTH',
  LAST_3_MONTHS = 'LAST_3_MONTHS',
  LAST_6_MONTHS = 'LAST_6_MONTHS',
  THIS_YEAR = 'THIS_YEAR',
  CUSTOM = 'CUSTOM'
}

// ---------------------------------------------------------------------------
// 11. REGISTRATION — mirrors EnrollmentDTO.java
// ---------------------------------------------------------------------------

export interface EnrollmentRequest {
  aiEngineer: AIEngineerRegistration;
  placement: PlacementRequest;
  paymentMethod: PaymentMethod;
  bankDetails?: BankDetails;
  termsAccepted: boolean;
  privacyAccepted: boolean;
}

export interface AIEngineerRegistration {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nicNumber: string;
  address: string;
  city: string;
  country: string;
  dateOfBirth: string;
  gender: Gender;
}

export interface PlacementRequest {
  sponsorId: number;
  preferredLeg: TreePosition;       // LEFT or RIGHT
}

export interface BankDetails {
  bankName: string;
  accountNumber: string;
  accountType: string;
  branch: string;
}

// ---------------------------------------------------------------------------
// 12. NOTIFICATIONS
// ---------------------------------------------------------------------------

export interface AppNotification {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  date: string;
  read: boolean;
  actionUrl?: string;
}

export enum NotificationType {
  COMMISSION_EARNED = 'COMMISSION_EARNED',
  COMMISSION_PAID = 'COMMISSION_PAID',
  RANK_ACHIEVED = 'RANK_ACHIEVED',
  NEW_RECRUIT = 'NEW_RECRUIT',
  ACADEMIC_EVENT = 'ACADEMIC_EVENT',
  POOL_PRO_RATED = 'POOL_PRO_RATED',
  WITHDRAWAL_APPROVED = 'WITHDRAWAL_APPROVED',
  WITHDRAWAL_REJECTED = 'WITHDRAWAL_REJECTED',
  SYSTEM_ANNOUNCEMENT = 'SYSTEM_ANNOUNCEMENT'
}

// ---------------------------------------------------------------------------
// 13. BANK READ-ONLY ACCESS (GAP-05 fix)
// ---------------------------------------------------------------------------

export interface BankAuditView {
  totalAiEngineers: number;
  totalActiveMembers: number;
  totalInvestmentCollected: number;
  totalCommissionsPaid: number;
  currentMonthEnrollments: number;
  poolUtilization: number;
}

export interface BankMemberView {
  aiEngineerId: number;
  fullName: string;
  nicNumber: string;
  investmentDate: string;
  investmentAmount: number;
  memberState: AIEngineerState;
  totalCommissionsEarned: number;
  totalCommissionsPaid: number;
  pendingDisbursements: number;
}

export interface BankDisbursementRequest {
  cycleMonth: string;
  commissions: DisbursementItem[];
  totalAmount: number;
  approvedBy: string;
  approvalDate: string;
}

export interface DisbursementItem {
  commissionId: number;
  aiEngineerId: number;
  aiEngineerName: string;
  nicNumber: string;
  bankAccountNumber: string;
  amount: number;
  commissionType: CommissionType;
}

// ---------------------------------------------------------------------------
// 14. API RESPONSE TYPES (follows TEMCO ERP pattern)
// ---------------------------------------------------------------------------

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: APIError;
  message?: string;
  pagination?: Pagination;
  timestamp: string;
}

export interface APIError {
  code: string;
  message: string;
  field?: string;
  details?: Record<string, string>;
}

export interface Pagination {
  page: number;
  size: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// ---------------------------------------------------------------------------
// 15. DOCUMENT TYPES
// ---------------------------------------------------------------------------

export interface DocumentUpload {
  id: number;
  type: DocumentType;
  fileName: string;
  fileUrl: string;
  uploadDate: string;
  status: DocumentVerificationStatus;
  fileSize: number;
  mimeType: string;
}

// ---------------------------------------------------------------------------
// 16. COMPONENT PROPS (React-specific)
// ---------------------------------------------------------------------------

export interface DashboardProps {
  user: AIEngineer;
  onNavigate: (page: string) => void;
}

export interface BinaryTreeProps {
  user: AIEngineer;
  onNavigate: (page: string) => void;
  onNodeSelect?: (node: TreeNode) => void;
}

export interface CommissionTableProps {
  commissions: Commission[];
  type?: CommissionType;
  loading?: boolean;
  onPageChange?: (page: number) => void;
  onFilterChange?: (filters: CommissionFilters) => void;
}

export interface RegistrationFormProps {
  sponsorId?: number;
  onSubmit: (data: EnrollmentRequest) => void;
  onStepChange?: (step: number) => void;
}

export interface CommissionFilters {
  type?: CommissionType;
  status?: CommissionStatus;
  dateFrom?: string;
  dateTo?: string;
  amountMin?: number;
  amountMax?: number;
  cycleMonth?: string;
}

// ---------------------------------------------------------------------------
// 17. PRODUCT CONFIGURATION (v3.2 — dynamic, loaded from API)
// ---------------------------------------------------------------------------

export enum ProductStatus {
  ACTIVE = 'ACTIVE',
  DISCONTINUED = 'DISCONTINUED',
  DRAFT = 'DRAFT'
}

export interface Product {
  id: number;
  productCode: string;              // e.g. 'EEPIP_BSC_MPHIL'
  productName: string;
  investmentAmount: number;         // e.g. 1,800,000 (configurable)
  currency: string;

  // Commission rates (percentages — amounts derived at runtime)
  directSponsorRate: number;        // default 2.00
  binaryPoolRate: number;           // default 5.00
  matchingBonusRate: number;        // default 1.50
  leadershipPoolRate: number;       // default 1.50
  agentDirectRate: number;          // default 2.00
  agentPoolRate: number;            // default 3.00
  bankMarginRate: number;           // default 6.00

  // Payout caps
  maxBinaryPairsPerMonth: number;   // default 3
  maxAgentPairsPerMonth: number;    // default 2

  // Product lifecycle
  status: ProductStatus;
  effectiveFrom: string;            // ISO date
  effectiveTo?: string;             // ISO date, null = no end

  createdAt: string;
  updatedAt: string;
}

// Helper: derive commission amount from product
export function deriveAmount(product: Product, rateFieldPercent: number): number {
  return Math.round(product.investmentAmount * rateFieldPercent / 100);
}

// ---------------------------------------------------------------------------
// 18. FINANCIAL CONSTANTS (FALLBACK DEFAULTS — use Product API at runtime)
// ---------------------------------------------------------------------------

export const EEPIP_CONSTANTS = {
  // These are FALLBACK values used when product config hasn't loaded yet.
  // At runtime, always prefer values from the Product API.
  DEFAULT_INVESTMENT_AMOUNT: 1800000,
  INTEREST_RATE: 0.16,              // 16% p.a.
  MONTHLY_INTEREST: 24000,          // Rs. 24,000/month
  BSC_DURATION_MONTHS: 36,
  STUDENT_NOMINATION_DAYS: 60,
  ACTIVE_STATUS_MONTHS: 12,
  UNIVERSITY_CERT_FEE: 500000,
  BSC_DELIVERY_COST: 300000,        // approx
  MPHIL_DELIVERY_COST: 100000,      // approx (free internally)
  CURRENCY: 'LKR',
} as const;

// ---------------------------------------------------------------------------
// 19. AGENT SYSTEM
// ---------------------------------------------------------------------------

export enum AgentStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  TERMINATED = 'TERMINATED'
}

export enum AgentCommissionType {
  DIRECT_REFERRAL = 'DIRECT_REFERRAL',
  BINARY_PAIRING = 'BINARY_PAIRING'
}

export interface Agent {
  id: number;
  memberId: number;
  aiEngineerId?: number;              // if agent also joined as AI Engineer
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  nicNumber: string;
  address?: string;
  city?: string;

  // Agent Binary Tree
  sponsorAgentId?: number;            // agent who recruited this agent
  parentAgentId?: number;             // placement parent in agent tree
  position?: TreePosition;
  treeLevel: number;

  // Performance
  status: AgentStatus;
  activationDate?: string;            // date of first AI Engineer intro
  totalReferrals: number;
  totalAgentRecruits: number;
  totalDirectEarnings: number;
  totalBinaryEarnings: number;

  // Admin
  appointedByMemberId: number;
  appointedDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface AgentCommission {
  id: number;
  agentId: number;
  type: AgentCommissionType;
  aiEngineerId?: number;              // for DIRECT_REFERRAL
  aiEngineerName?: string;
  amount: number;
  taxAmount: number;                // tax deducted
  netAmount: number;                // amount after tax
  tdsRate: number;                  // TDS rate percentage
  currency: string;                 // currency code
  status: CommissionStatus;
  commissionDate: string;
  cycleMonth?: string;                // for BINARY_PAIRING
  paidDate?: string;
}

export interface AgentBinaryPoolStatus {
  cycleMonth: string;
  enrollmentsThisMonth: number;
  poolAmount: number;                 // 3% contributions
  carryForwardFromLastMonth: number;
  totalClaims: number;
  proRationTriggered: boolean;
  proRationPercentage: number;
  surplus: number;
}

export interface AgentDashboard {
  agent: Agent;
  overview: {
    totalDirectEarnings: number;
    totalBinaryEarnings: number;
    totalEarnings: number;
    referralsThisMonth: number;
    pendingCommissions: number;
  };
  recentReferrals: {
    aiEngineerId: number;
    aiEngineerName: string;
    enrollmentDate: string;
    commission: number;
  }[];
  recentCommissions: AgentCommission[];
  agentBinaryTree?: AgentTreeNode;
  poolStatus?: AgentBinaryPoolStatus;
}

export interface AgentTreeNode {
  agent: Agent;
  left?: AgentTreeNode;
  right?: AgentTreeNode;
  level: number;
  position?: TreePosition;
  isActive: boolean;                  // has introduced ≥1 AI Engineer
}

export interface AgentAppointmentRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  nicNumber: string;
  address?: string;
  city?: string;
  sponsorAgentId?: number;            // who recruited this agent
  preferredLeg?: TreePosition;        // preferred position in agent tree
}

// Agent Binary Pairing Rules (mirrors AGENT constants in EEPIP_CONSTANTS)
export const AGENT_BINARY_RULES = {
  MAX_PAIRS_PER_MONTH: 2,
  PAYOUT_PER_PAIR: 54000,            // Rs. 54,000 per pair
  MAX_BINARY_PER_MONTH: 108000,      // 2 × 54,000
  ACTIVATION_MIN_REFERRALS: 1,       // must introduce ≥1 AI Engineer
  PAYOUT_CYCLE: 'MONTHLY',
  CARRY_FORWARD: true,
} as const;

// ---------------------------------------------------------------------------
// 21. PAYMENT (V31) — Transaction tracking
// ---------------------------------------------------------------------------

export enum PaymentMethod {
  BANK_TRANSFER = 'BANK_TRANSFER',
  CHECK = 'CHECK',
  EPIN = 'EPIN',
  CARD = 'CARD',
  CASH = 'CASH'
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
  PARTIALLY_REFUNDED = 'PARTIALLY_REFUNDED'
}

export interface Payment {
  id: number;
  aiEngineerId: number;
  amount: number;
  paymentMethod: PaymentMethod;
  bankReference?: string;
  transactionId?: string;
  paymentDate: string;
  paymentTime?: string;
  status: PaymentStatus;
  currency: string;
  exchangeRate?: number;
  bankName?: string;
  branchName?: string;
  checkNumber?: string;
  epinId?: number;
  refundAmount?: number;
  refundDate?: string;
  refundReason?: string;
  notes?: string;
  confirmedBy?: number;
  confirmedAt?: string;
  verifiedBy?: number;
  verifiedAt?: string;
  createdAt: string;
  updatedAt: string;
}

// ---------------------------------------------------------------------------
// 22. ACADEMIC EVENT (V32) — Academic progress tracking
// ---------------------------------------------------------------------------

export enum AcademicEventType {
  YEAR_PROMOTION = 'YEAR_PROMOTION',
  EXAM_RESULT = 'EXAM_RESULT',
  COURSE_REGISTRATION = 'COURSE_REGISTRATION',
  THESIS_SUBMISSION = 'THESIS_SUBMISSION',
  THESIS_APPROVED = 'THESIS_APPROVED',
  GRADUATION_ELIGIBLE = 'GRADUATION_ELIGIBLE',
  CERTIFICATE_ISSUED = 'CERTIFICATE_ISSUED'
}

export interface AcademicEvent {
  id: number;
  aiEngineerId: number;
  eventType: AcademicEventType;
  eventDate: string;
  academicYear?: number;
  semester?: number;
  courseCode?: string;
  courseName?: string;
  grade?: string;
  gpa?: number;
  credits?: number;
  passed?: boolean;
  description?: string;
  remarks?: string;
  verifiedBy?: number;
  verifiedAt?: string;
  createdAt: string;
  updatedAt: string;
}

// ---------------------------------------------------------------------------
// 23. AUDIT LOG (V33) — System-wide audit trail
// ---------------------------------------------------------------------------

export enum EntityType {
  AI_ENGINEER = 'AI_ENGINEER',
  AGENT = 'AGENT',
  COMMISSION = 'COMMISSION',
  PAYMENT = 'PAYMENT',
  WITHDRAWAL = 'WITHDRAWAL',
  EPIN = 'EPIN',
  RANK = 'RANK',
  PRODUCT = 'PRODUCT',
  SYSTEM = 'SYSTEM'
}

export enum ActionType {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  APPROVE = 'APPROVE',
  REJECT = 'REJECT',
  PROMOTE = 'PROMOTE',
  DEMOTE = 'DEMOTE',
  STATUS_CHANGE = 'STATUS_CHANGE',
  PAYMENT_RECEIVED = 'PAYMENT_RECEIVED',
  WITHDRAWAL_REQUESTED = 'WITHDRAWAL_REQUESTED',
  EPIN_GENERATED = 'EPIN_GENERATED',
  EPIN_USED = 'EPIN_USED',
  RANK_ACHIEVED = 'RANK_ACHIEVED'
}

export enum PerformedByRole {
  ADMIN = 'ADMIN',
  AGENT = 'AGENT',
  AI_ENGINEER = 'AI_ENGINEER',
  SYSTEM = 'SYSTEM',
  API = 'API'
}

export interface AuditLog {
  id: number;
  entityType: EntityType;
  entityId?: number;
  actionType: ActionType;
  actionDescription?: string;
  previousValue?: string;
  newValue?: string;
  performedByMemberId?: number;
  performedByRole?: PerformedByRole;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
}

// ---------------------------------------------------------------------------
// 24. WITHDRAWAL (V36) — Payout management
// ---------------------------------------------------------------------------

export enum WithdrawalType {
  COMMISSION_EARNINGS = 'COMMISSION_EARNINGS',
  BONUS = 'BONUS',
  REFUND = 'REFUND'
}

export enum WithdrawalStatus {
  REQUESTED = 'REQUESTED',
  PENDING_VERIFICATION = 'PENDING_VERIFICATION',
  APPROVED = 'APPROVED',
  PROCESSING = 'PROCESSING',
  PAID = 'PAID',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED'
}

export enum AccountType {
  SAVINGS = 'SAVINGS',
  CURRENT = 'CURRENT'
}

export interface Withdrawal {
  id: number;
  memberId: number;
  withdrawalType: WithdrawalType;
  amount: number;
  currency: string;
  bankName?: string;
  bankBranch?: string;
  accountNumber: string;
  accountHolderName: string;
  accountType: AccountType;
  requestDate: string;
  requestTime?: string;
  status: WithdrawalStatus;
  approvedBy?: number;
  approvedAt?: string;
  approvedNotes?: string;
  rejectionReason?: string;
  processedDate?: string;
  transactionReference?: string;
  fees: number;
  netAmount?: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// ---------------------------------------------------------------------------
// 25. CONFIG (V39) — System configuration
// ---------------------------------------------------------------------------

export enum ConfigType {
  STRING = 'STRING',
  NUMBER = 'NUMBER',
  BOOLEAN = 'BOOLEAN',
  DATE = 'DATE',
  JSON = 'JSON'
}

export interface Config {
  id: number;
  configKey: string;
  configValue?: string;
  configType: ConfigType;
  description?: string;
  category?: string;
  isEncrypted: boolean;
  isActive: boolean;
  effectiveFrom?: string;
  effectiveTo?: string;
  createdAt: string;
  updatedAt: string;
}

// ---------------------------------------------------------------------------
// 26. DOCUMENT (V41) — KYC/verification tracking
// ---------------------------------------------------------------------------

export enum DocumentType {
  NIC = 'NIC',
  PASSPORT = 'PASSPORT',
  ACADEMIC_CERTIFICATE = 'ACADEMIC_CERTIFICATE',
  BANK_STATEMENT = 'BANK_STATEMENT',
  PHOTO = 'PHOTO',
  SIGNATURE = 'SIGNATURE',
  PROOF_OF_ADDRESS = 'PROOF_OF_ADDRESS',
  OTHER = 'OTHER'
}

export enum DocumentVerificationStatus {
  PENDING = 'PENDING',
  VERIFIED = 'VERIFIED',
  REJECTED = 'REJECTED',
  EXPIRED = 'EXPIRED',
  REUPLOAD_REQUIRED = 'REUPLOAD_REQUIRED'
}

export interface Document {
  id: number;
  memberId: number;
  documentType: DocumentType;
  documentName?: string;
  documentUrl: string;
  documentNumber?: string;
  issueDate?: string;
  expiryDate?: string;
  fileSize?: number;
  fileType?: string;
  verificationStatus: DocumentVerificationStatus;
  verifiedBy?: number;
  verifiedAt?: string;
  rejectionReason?: string;
  notes?: string;
  isPrimary: boolean;
  createdAt: string;
  updatedAt: string;
}

// ---------------------------------------------------------------------------
// 27. UTILITY TYPES
// ---------------------------------------------------------------------------

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
