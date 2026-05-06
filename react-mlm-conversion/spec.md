# EEPIP MLM Frontend - Software Requirements Specification (SRS)

**Version:** 1.1  
**Date:** May 2, 2026  
**Project:** Education Easy-Pay Investment Plan (EEPIP) MLM Frontend  
**Technology Stack:** React 18 + TypeScript + TailwindCSS + Vite + Docker + nginx

---

## 1. System Overview

### 1.1 Purpose
The EEPIP MLM Frontend is a web-based application for AI Engineers, Agents, and Bank Administrators to manage their MLM (Multi-Level Marketing) investment network. The system enables users to track their binary tree, view commissions, register new members, manage EPINs, and monitor disbursements.

### 1.2 Scope
- **Primary Users:** AI Engineers, Agents, Bank Administrators, System Administrators
- **Core Modules:** Dashboard, Binary Tree, Commissions, EPIN Management, New Enrollment, Profile, Student Matching, Bank Dashboard, Agent Dashboard, Admin Panel, Reports
- **Authentication:** SSO-based with mock token fallback for development
- **Deployment:** Docker container with nginx reverse proxy
- **Performance:** Code splitting, lazy loading, caching strategy for optimal performance

### 1.3 Target Audience
- **AI Engineers:** Primary MLM participants who introduce new members and earn commissions
- **Agents:** Referral partners who earn separate commission budget (5% of investment)
- **Bank Administrators:** Staff who approve/reject disbursements and audit system activity
- **System Administrators:** Super users who manage users, products, system configuration, and generate reports

---

## 2. Architecture

### 2.1 System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Browser (Client)                         │
│                    React 18 + TypeScript                        │
│                    TailwindCSS + Vite                            │
└────────────────────────────────┬────────────────────────────────┘
                                 │ HTTPS/HTTP
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                      nginx (Port 80/443)                        │
│              - Static file serving (React SPA)                   │
│              - SPA routing fallback (index.html)                 │
│              - Gzip compression                                  │
│              - Security headers                                   │
│              - API proxy to backend (future)                     │
└────────────────────────────────┬────────────────────────────────┘
                                 │ HTTP
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                  Backend API (WildFly - Port 8089)               │
│              - /eepip-api/api/v3/* (REST endpoints)               │
│              - /temco-api/api/v1/* (SSO service)                  │
└─────────────────────────────────────────────────────────────────┘
```

### 2.2 Frontend Architecture

```
src/
├── api/                    # API service layer
│   ├── authService.ts      # SSO authentication
│   ├── aiEngineerService.ts
│   ├── treeService.ts
│   ├── commissionService.ts
│   └── epinService.ts
├── components/             # Reusable UI components
│   ├── Dashboard/
│   ├── BinaryTree/
│   ├── Commissions/
│   ├── Register/
│   ├── StudentMatch/
│   ├── Bank/
│   └── common/
├── data/                   # Mock data for development
│   └── mockData.ts
├── layouts/                # Page layouts
│   └── MainLayout.tsx      # Sidebar + Header + Content
├── pages/                  # Route pages
│   ├── Login.tsx
│   ├── Dashboard.tsx
│   ├── Tree.tsx
│   ├── Commissions.tsx
│   ├── EPIN.tsx
│   ├── Register.tsx
│   ├── Profile.tsx
│   ├── StudentMatch.tsx
│   └── BankDashboard.tsx
├── utils/                  # Utility functions
└── types/                  # TypeScript type definitions
```

### 2.3 State Management
- **Local State:** React hooks (`useState`, `useEffect`)
- **Session State:** `localStorage` for SSO token and user data
- **No Global State:** No Redux/Context API required (app scope limited)

---

## 3. Functional Requirements

### 3.1 Authentication (FR-001)

| ID | Requirement | Description |
|----|-------------|-------------|
| FR-001-01 | SSO Login | User authenticates via SSO service at `http://localhost:8089/temco-api/api/v1` |
| FR-001-02 | Mock Fallback | If SSO service unavailable, app accepts any username/password and generates mock JWT token |
| FR-001-03 | Session Validation | AuthGuard validates session on protected routes |
| FR-001-04 | Logout | Clears SSO token and user data from localStorage, redirects to login |
| FR-001-05 | Token Storage | SSO token stored in `localStorage` key `sso_token` |
| FR-001-06 | User Data Storage | User profile stored in `localStorage` key `eepip_user` |

### 3.2 Dashboard (FR-002)

| ID | Requirement | Description |
|----|-------------|-------------|
| FR-002-01 | Overview Stats | Display: Total Earnings, Active Members, Total BV, Rank Progress |
| FR-002-02 | Investment Summary | Show total investment amount and product details |
| FR-002-03 | Recent Commissions | Table of recent commission transactions with type, amount, status |
| FR-002-04 | Rank Progress | Visual progress bar showing progress to next rank |
| FR-002-05 | BV Summary | Display left/right Business Volume with pairing status |
| FR-002-06 | Backend Status Banner | Show warning if backend unavailable (using mock data) |

### 3.3 Binary Tree (FR-003)

| ID | Requirement | Description |
|----|-------------|-------------|
| FR-003-01 | Tree Visualization | Display hierarchical binary tree with nodes (up to 4 levels) |
| FR-003-02 | Node Details | Each node shows: Name, ID, Rank, BV, Status (Active/Pending) |
| FR-003-03 | Tree Stats | Summary: Total nodes, Active nodes, Max depth, Left/Right subtree sizes |
| FR-003-04 | Interactive | Click node to view member details (future) |
| FR-003-05 | Scrollable | Horizontal scroll for large trees (min-width 600px) |

### 3.4 Commissions (FR-004)

| ID | Requirement | Description |
|----|-------------|-------------|
| FR-004-01 | Commission Table | List all commission transactions with date, type, description, amount, status |
| FR-004-02 | Type Filtering | Filter by commission type (Direct, Binary Matching, Leadership, etc.) |
| FR-004-03 | Status Filtering | Filter by status (PAID, PENDING, FAILED) |
| FR-004-04 | Summary Totals | Show total commissions by type |
| FR-004-05 | Currency Formatting | Display amounts in LKR (Sri Lankan Rupee) |
| FR-004-06 | Export | Future: Export to CSV/PDF |

### 3.5 EPIN Management (FR-005)

| ID | Requirement | Description |
|----|-------------|-------------|
| FR-005-01 | EPIN List | Table of available EPINs with code, status, product, expiration |
| FR-005-02 | Generate EPIN | Generate new EPIN codes (future: admin only) |
| FR-005-03 | Validate EPIN | Check EPIN validity during registration |
| FR-005-04 | Status Indicators | Color-coded badges: AVAILABLE (green), USED (gray), EXPIRED (red) |
| FR-005-05 | Search | Search EPINs by code or product |

### 3.6 New Enrollment (FR-006)

| ID | Requirement | Description |
|----|-------------|-------------|
| FR-006-01 | Multi-Step Form | 5-step wizard: Personal Info → Student Info → Placement → Payment → Review |
| FR-006-02 | Personal Info | Full name, email, phone, NIC, address, city |
| FR-006-03 | Student Info | Optional: Student name, email, phone, NIC, program selection |
| FR-006-04 | Placement | Sponsor username, sponsor ID, preferred leg (LEFT/RIGHT) |
| FR-006-05 | Payment | Payment method: EPIN or Bank Transfer |
| FR-006-06 | EPIN Validation | Validate 6-digit EPIN code if selected |
| FR-006-07 | Bank Transfer Details | Display bank info if Bank Transfer selected |
| FR-006-08 | Form Validation | Real-time validation with error messages |
| FR-006-09 | Review & Submit | Summary of all data before submission |
| FR-006-10 | Success Message | Confirmation after successful registration |

### 3.7 Profile (FR-007)

| ID | Requirement | Description |
|----|-------------|-------------|
| FR-007-01 | Profile Display | Show user's full name, email, phone, NIC, address, rank |
| FR-007-02 | Edit Profile | Update personal information (future) |
| FR-007-03 | Change Password | Update password (future) |
| FR-007-04 | Account Status | Display account status (Active/Pending/Inactive) |
| FR-007-05 | Join Date | Show registration date |

### 3.8 Student Matching (FR-008)

| ID | Requirement | Description |
|----|-------------|-------------|
| FR-008-01 | Candidate List | Display list of student candidates with name, university, program, score |
| FR-008-02 | Filtering | Filter by eligibility status and minimum score |
| FR-008-03 | Search | Search by name or university |
| FR-008-04 | Selection | Select candidate for nomination |
| FR-008-05 | Agreement Preview | View commission agreement before confirmation |
| FR-008-06 | Confirm Nomination | Submit nomination with success message |
| FR-008-07 | Status Badges | ELIGIBLE (green), PENDING (yellow), NOT_ELIGIBLE (red) |

### 3.9 Bank Dashboard (FR-009)

| ID | Requirement | Description |
|----|-------------|-------------|
| FR-009-01 | Overview Stats | Total AI Engineers, Total Investment, Commissions Paid, Pending Disbursements |
| FR-009-02 | Member Search | Search members by name, ID, email with status/rank filters |
| FR-009-03 | Disbursement Table | List pending disbursements with member, amount, type, status, date |
| FR-009-04 | Approve Action | Approve pending disbursement (button only on PENDING status) |
| FR-009-05 | Reject Action | Reject pending disbursement (button only on PENDING status) |
| FR-009-06 | Status Updates | Real-time status update with notification |
| FR-009-07 | Notifications | Success/error messages auto-dismiss after 3 seconds |
| FR-009-08 | Summary Count | Count of APPROVED, REJECTED, PENDING disbursements |

### 3.10 Responsive Design (FR-010)

| ID | Requirement | Description |
|----|-------------|-------------|
| FR-010-01 | Mobile Sidebar | Collapsible sidebar with hamburger button (breakpoint: 1024px) |
| FR-010-02 | Overlay Backdrop | Dark overlay when sidebar open on mobile |
| FR-010-03 | Responsive Grids | Cards stack vertically on mobile, 2 cols on tablet, 3-4 cols on desktop |
| FR-010-04 | Touch Targets | Minimum 44px height for buttons and inputs |
| FR-010-05 | Horizontal Scroll | Tables scroll horizontally on mobile (`overflow-x-auto`) |
| FR-010-06 | Viewport Meta | Proper viewport meta tag for mobile scaling |

### 3.11 Agent Dashboard (FR-011)

| ID | Requirement | Description |
|----|-------------|-------------|
| FR-011-01 | Overview Stats | Total Referrals, Total Commission (5% budget), Active Referrals, Pairing Status |
| FR-011-02 | Direct Referral List | Table of directly introduced AI Engineers with status, investment, commission earned |
| FR-011-03 | Binary Pool Status | Current month pairs earned, pairing cap (2 pairs/month), pool share amount |
| FR-011-04 | Commission Breakdown | Split: 2% direct referral (Rs. 36,000) + 3% agent binary pool (Rs. 54,000) per Rs. 1.8M investment |
| FR-011-05 | Activation Status | Display if agent is active (must have introduced at least 1 AI Engineer) |
| FR-011-06 | Dual Role Indicator | Show if user is both Agent + AI Engineer |
| FR-011-07 | Commission History | Table of agent commissions with date, type, amount, status |
| FR-011-08 | Monthly Pairing Cap | Visual progress bar for monthly pairs (max 2 pairs = Rs. 108,000) |

### 3.12 Admin Panel (FR-012)

| ID | Requirement | Description |
|----|-------------|-------------|
| FR-012-01 | User Management | List, create, edit, deactivate users (AI Engineers, Agents, Bank Admins) |
| FR-012-02 | Role Assignment | Assign/modify user roles (AI_ENGINEER, AGENT, BANK_ADMIN, SYSTEM_ADMIN) |
| FR-012-03 | Agent Appointment | Appoint new agents (admin-only action) |
| FR-012-04 | Product Management | Create, edit, deactivate products with investment amount and commission rates |
| FR-012-05 | EPIN Generation | Generate bulk EPIN codes for specific products |
| FR-012-06 | System Configuration | Configure commission rates, pairing caps, payout caps |
| FR-012-07 | Audit Logs | View system activity logs (user actions, API calls, errors) |
| FR-012-08 | User Search | Search users by name, ID, email, NIC, role, status |
| FR-012-09 | Bulk Actions | Bulk activate/deactivate users, bulk generate EPINs |
| FR-012-10 | Permission Management | Granular permission control per role |

### 3.13 Reports (FR-013)

| ID | Requirement | Description |
|----|-------------|-------------|
| FR-013-01 | Commission Report | Generate commission reports by date range, user, type, status |
| FR-013-02 | Investment Report | Report on total investments by product, date range, region |
| FR-013-03 | Disbursement Report | Track all disbursements with approve/reject history |
| FR-013-04 | Agent Performance Report | Agent rankings, referral counts, commission earnings |
| FR-013-05 | Binary Tree Report | Tree depth analysis, active/inactive ratios, BV distribution |
| FR-013-06 | EPIN Usage Report | Track EPIN generation, usage, expiration |
| FR-013-07 | Export Formats | Export reports to CSV, PDF, Excel |
| FR-013-08 | Scheduling | Schedule automated report generation (daily/weekly/monthly) |
| FR-013-09 | Email Reports | Email reports to specified recipients |
| FR-013-10 | Dashboard Charts | Visual charts/graphs for report data |

---

## 4. Non-Functional Requirements

### 4.1 Performance (NFR-001)

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-001-01 | Page Load Time | < 3 seconds on 3G |
| NFR-001-02 | Time to Interactive | < 5 seconds |
| NFR-001-03 | Bundle Size | JS < 300 KB (gzip), CSS < 50 KB (gzip) |
| NFR-001-04 | Asset Caching | 1 year cache for static assets with content hash |
| NFR-001-05 | Gzip Compression | Enabled for JS, CSS, HTML, JSON |
| NFR-001-06 | Code Splitting | Route-based code splitting with React.lazy() |
| NFR-001-07 | Lazy Loading | Lazy load components below fold, images with loading="lazy" |
| NFR-001-08 | Initial JS Bundle | < 100 KB for initial render (critical path) |
| NFR-001-09 | Route Preloading | Preload routes on hover/intent |
| NFR-001-10 | Caching Strategy | Service Worker for offline, API response caching, localStorage for user data |
| NFR-001-11 | Image Optimization | WebP format with fallback, responsive images, lazy loading |
| NFR-001-12 | Bundle Analysis | Regular bundle analysis to identify optimization opportunities |

### 4.2 Usability (NFR-002)

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-002-01 | Touch Targets | Minimum 44x44 pixels |
| NFR-002-02 | Font Size | Minimum 16px for body text |
| NFR-002-03 | Color Contrast | WCAG AA compliant (4.5:1 for normal text) |
| NFR-002-04 | Error Messages | Clear, actionable error messages |
| NFR-002-05 | Loading States | Skeleton screens for async operations |

### 4.3 Security (NFR-003)

| ID | Requirement | Implementation |
|----|-------------|----------------|
| NFR-003-01 | Authentication | SSO-based with JWT tokens |
| NFR-003-02 | Authorization | Role-based access (AI Engineer, Agent, Bank Admin) |
| NFR-003-03 | Security Headers | X-Frame-Options, X-Content-Type-Options, X-XSS-Protection |
| NFR-003-04 | HTTPS | Required in production (nginx SSL termination) |
| NFR-003-05 | Token Storage | localStorage (consider HttpOnly cookies for production) |
| NFR-003-06 | Input Validation | Client-side validation + server-side validation |

### 4.4 Reliability (NFR-004)

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-004-01 | Uptime | 99.5% (planned) |
| NFR-004-02 | Error Handling | Graceful degradation with mock data fallback |
| NFR-004-03 | Health Check | Docker health check endpoint (`/health`) |
| NFR-004-04 | Logging | Browser console for errors (future: sentry/ELK) |

### 4.5 Scalability (NFR-005)

| ID | Requirement | Implementation |
|----|-------------|----------------|
| NFR-005-01 | Static Asset Serving | nginx for efficient static file delivery |
| NFR-005-02 | CDN Ready | Hash-based asset names for cache invalidation |
| NFR-005-03 | Horizontal Scaling | Stateless frontend, can scale horizontally |

### 4.6 Compatibility (NFR-006)

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-006-01 | Browsers | Chrome 90+, Firefox 88+, Safari 14+, Edge 90+ |
| NFR-006-02 | Mobile | iOS 14+, Android 10+ |
| NFR-006-03 | Screen Sizes | 375px (mobile), 768px (tablet), 1024px+ (desktop) |

---

## 5. User Roles

| Role | Description | Access Rights |
|------|-------------|---------------|
| **AI Engineer** | Primary MLM participant | Dashboard, Tree, Commissions, EPIN, Register, Profile, Student Match |
| **Agent** | Referral partner (5% commission budget) | Dashboard, Tree, Commissions, Profile, Agent Dashboard |
| **Bank Administrator** | Staff who manages disbursements | Bank Dashboard only |
| **System Administrator** | Super user for system management | Admin Panel, Reports, User Management, System Config |

---

## 6. Data Models

### 6.1 User Profile

```typescript
interface User {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  nic: string;
  address: string;
  city: string;
  rank: string;
  roles: string[];
  accountStatus: 'ACTIVE' | 'PENDING' | 'INACTIVE';
  joinDate: string;
}
```

### 6.2 Commission Transaction

```typescript
interface Commission {
  id: number;
  date: string;
  type: 'DIRECT' | 'BINARY_MATCHING' | 'LEADERSHIP' | 'PRODUCT_BONUS' | 'POOL_SHARE';
  description: string;
  amount: number;
  status: 'PAID' | 'PENDING' | 'FAILED';
}
```

### 6.3 Binary Tree Node

```typescript
interface TreeNode {
  id: number;
  name: string;
  rank: string;
  leftBV: number;
  rightBV: number;
  status: 'ACTIVE' | 'PENDING' | 'INACTIVE';
  leftChild?: TreeNode;
  rightChild?: TreeNode;
}
```

### 6.4 EPIN

```typescript
interface EPIN {
  id: number;
  code: string;
  status: 'AVAILABLE' | 'USED' | 'EXPIRED';
  productId: number;
  productName: string;
  expirationDate: string;
  usedBy?: number;
}
```

### 6.5 Student Candidate

```typescript
interface StudentCandidate {
  id: number;
  name: string;
  university: string;
  program: string;
  score: number;
  eligibility: 'ELIGIBLE' | 'PENDING' | 'NOT_ELIGIBLE';
}
```

### 6.6 Disbursement

```typescript
interface Disbursement {
  id: number;
  memberId: number;
  memberName: string;
  amount: number;
  type: 'COMMISSION' | 'REFUND' | 'BONUS';
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  date: string;
}
```

### 6.7 Agent Profile

```typescript
interface Agent {
  id: number;
  userId: number;
  status: 'ACTIVE' | 'INACTIVE';
  appointmentDate: string;
  totalReferrals: number;
  activeReferrals: number;
  totalCommissionEarned: number;
  currentMonthPairs: number;
  pairingCap: number; // 2 pairs/month
  isDualRole: boolean; // Agent + AI Engineer
}
```

### 6.8 Product

```typescript
interface Product {
  id: number;
  productCode: string;
  productName: string;
  investmentAmount: number;
  directReferralRate: number; // %
  binaryMatchingRate: number; // %
  leadershipRate: number; // %
  productBonusRate: number; // %
  poolShareRate: number; // %
  payoutCapDaily: number;
  payoutCapMonthly: number;
  effectiveDate: string;
  expiryDate: string;
  isActive: boolean;
}
```

### 6.9 Report

```typescript
interface Report {
  id: number;
  reportType: 'COMMISSION' | 'INVESTMENT' | 'DISBURSEMENT' | 'AGENT_PERFORMANCE' | 'BINARY_TREE' | 'EPIN_USAGE';
  title: string;
  generatedBy: number;
  generatedAt: string;
  dateRange: { start: string; end: string };
  filters: Record<string, any>;
  data: any;
  format: 'CSV' | 'PDF' | 'EXCEL';
}
```

---

## 7. API Specifications

### 7.1 Authentication API

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/temco-api/api/v1/auth/login` | POST | Login with username/password |
| `/temco-api/api/v1/auth/validate` | POST | Validate SSO session token |

### 7.2 AI Engineer API

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/eepip-api/api/v3/ai-engineers/{id}` | GET | Get AI Engineer profile |
| `/eepip-api/api/v3/ai-engineers/{id}/dashboard` | GET | Get dashboard data |
| `/eepip-api/api/v3/ai-engineers/{id}/tree` | GET | Get binary tree data |
| `/eepip-api/api/v3/ai-engineers/{id}/commissions` | GET | Get commission history |

### 7.3 Tree API

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/eepip-api/api/v3/tree/{id}` | GET | Get binary tree with depth |
| `/eepip-api/api/v3/tree/{id}/stats` | GET | Get tree statistics |

### 7.4 Commission API

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/eepip-api/api/v3/commissions/{aiEngineerId}` | GET | Get commission transactions |
| `/eepip-api/api/v3/commissions/{id}` | GET | Get commission by ID |

### 7.5 EPIN API

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/eepip-api/api/v3/epins` | GET | List all EPINs |
| `/eepip-api/api/v3/epins/{code}/validate` | POST | Validate EPIN code |
| `/eepip-api/api/v3/epins` | POST | Generate new EPIN (admin) |

### 7.6 Registration API

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/eepip-api/api/v3/registrations` | POST | Submit new enrollment |

### 7.7 Product API

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/eepip-api/api/v3/products` | GET | List all products |
| `/eepip-api/api/v3/products/{id}` | GET | Get product details |
| `/eepip-api/api/v3/products` | POST | Create product (admin) |
| `/eepip-api/api/v3/products/{id}` | PUT | Update product (admin) |
| `/eepip-api/api/v3/products/{id}` | DELETE | Deactivate product (admin) |

### 7.8 Agent API

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/eepip-api/api/v3/agents/{id}` | GET | Get agent profile |
| `/eepip-api/api/v3/agents/{id}/referrals` | GET | Get agent referrals |
| `/eepip-api/api/v3/agents/{id}/commissions` | GET | Get agent commission history |
| `/eepip-api/api/v3/agents/{id}/pool-status` | GET | Get binary pool status |

### 7.9 Admin API

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/eepip-api/api/v3/admin/users` | GET | List all users |
| `/eepip-api/api/v3/admin/users` | POST | Create user |
| `/eepip-api/api/v3/admin/users/{id}` | PUT | Update user |
| `/eepip-api/api/v3/admin/users/{id}/deactivate` | POST | Deactivate user |
| `/eepip-api/api/v3/admin/agents/appoint` | POST | Appoint new agent |
| `/eepip-api/api/v3/admin/epins/generate` | POST | Generate bulk EPINs |
| `/eepip-api/api/v3/admin/config` | GET | Get system configuration |
| `/eepip-api/api/v3/admin/config` | PUT | Update system configuration |
| `/eepip-api/api/v3/admin/audit-logs` | GET | Get audit logs |

### 7.10 Reports API

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/eepip-api/api/v3/reports/generate` | POST | Generate report |
| `/eepip-api/api/v3/reports/{id}` | GET | Get report by ID |
| `/eepip-api/api/v3/reports` | GET | List user reports |
| `/eepip-api/api/v3/reports/{id}/download` | GET | Download report (CSV/PDF/Excel) |
| `/eepip-api/api/v3/reports/schedule` | POST | Schedule automated report |

---

## 8. UI Components

### 8.1 Common Components

| Component | Description |
|-----------|-------------|
| `StatsCard` | Display metric with icon, label, value, subtitle |
| `LoadingSkeleton` | Skeleton loading screens (StatsCardSkeleton, TableSkeleton) |
| `Card` | Base card component with padding, border, shadow |
| `Button` | Primary/secondary buttons with variants |
| `Input` | Text input with validation states |
| `Select` | Dropdown select component |
| `Badge` | Status badge with color coding |
| `Modal` | Modal dialog with overlay |
| `Notification` | Toast notification with auto-dismiss |

### 8.2 Module-Specific Components

| Module | Components |
|--------|------------|
| Dashboard | `StatsCard`, `InvestmentCard`, `RankProgressBar`, `BVSummaryCard` |
| BinaryTree | `TreeNodeCard`, `TreeVisualization`, `TreeStats` |
| Commissions | `CommissionTable`, `CommissionFilter`, `CommissionSummary` |
| EPIN | `EPINTable`, `EPINStatusBadge`, `GenerateEPINModal` |
| Register | `MultiStepWizard`, `PersonalInfoForm`, `StudentForm`, `PlacementForm`, `PaymentForm`, `ReviewStep` |
| StudentMatch | `CandidateCard`, `AgreementPreview`, `CandidateList` |
| Bank | `OverviewStats`, `MemberSearch`, `DisbursementTable` |
| Agent Dashboard | `AgentStatsCard`, `ReferralTable`, `PoolStatusCard`, `CommissionBreakdown` |
| Admin Panel | `UserTable`, `UserForm`, `ProductTable`, `ProductForm`, `ConfigForm`, `AuditLogTable` |
| Reports | `ReportGenerator`, `ReportFilters`, `ReportChart`, `ReportExport` |

---

## 9. Technology Stack

### 9.1 Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.3.1 | UI framework with React.lazy() for code splitting |
| TypeScript | 5.7.2 | Type safety |
| Vite | 5.4.21 | Build tool with automatic code splitting |
| TailwindCSS | 3.4.17 | CSS framework |
| React Router DOM | 7.1.1 | Client-side routing with lazy loading |
| Axios | 1.7.9 | HTTP client with response caching |
| SWR / React Query | TBD | Data fetching and caching (future) |
| Workbox | TBD | Service Worker for offline support (future) |

### 9.2 Backend (Integration)

| Technology | Version | Purpose |
|------------|---------|---------|
| WildFly | - | Application server (REST API) |
| Java EE | - | Backend framework |
| SSO Service | - | Authentication service |

### 9.3 Deployment

| Technology | Version | Purpose |
|------------|---------|---------|
| Docker | Latest | Containerization |
| nginx | 1.29.5 | Web server / reverse proxy |
| Alpine Linux | Latest | Base OS for Docker images |

### 9.4 Development Tools

| Tool | Purpose |
|------|---------|
| npm | Package manager |
| TypeScript Compiler | Type checking |
| ESLint | Linting (future) |
| Prettier | Code formatting (future) |

---

## 10. Deployment

### 10.1 Docker Configuration

**Dockerfile (Multi-stage Build):**

```dockerfile
# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1/health || exit 1
CMD ["nginx", "-g", "daemon off;"]
```

### 10.2 nginx Configuration

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/javascript application/json;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Static assets caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Health check
    location /health {
        return 200 "healthy\n";
        add_header Content-Type text/plain;
    }
}
```

### 10.3 Build & Run Commands

```bash
# Build Docker image
docker build -t eepip-mlm-frontend:latest .

# Run container
docker run -d -p 8082:80 --name eepip-frontend eepip-mlm-frontend:latest

# View logs
docker logs eepip-frontend

# Stop container
docker stop eepip-frontend

# Remove container
docker rm eepip-frontend
```

### 10.4 Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Output: dist/
# - index.html
# - assets/
#   - index-[hash].js
#   - index-[hash].css
```

---

## 11. Security Considerations

### 11.1 Authentication Flow

```
1. User enters credentials → Login page
2. POST to /temco-api/api/v1/auth/login
3. Receive JWT token → Store in localStorage (sso_token)
4. Store user profile → localStorage (eepip_user)
5. AuthGuard validates token on protected routes
6. If SSO unavailable → Accept any credentials, generate mock token (dev mode)
```

### 11.2 Security Headers

| Header | Value |
|--------|-------|
| X-Frame-Options | SAMEORIGIN |
| X-Content-Type-Options | nosniff |
| X-XSS-Protection | 1; mode=block |

### 11.3 Future Security Enhancements

- [ ] HttpOnly cookies for token storage (prevent XSS)
- [ ] CSRF tokens for state-changing requests
- [ ] Content Security Policy (CSP)
- [ ] Rate limiting on API calls
- [ ] Input sanitization (DOMPurify for XSS prevention)
- [ ] Secure flag on cookies (HTTPS only)

---

## 12. Browser Compatibility

| Browser | Minimum Version | Notes |
|---------|----------------|-------|
| Chrome | 90+ | Primary target |
| Firefox | 88+ | Full support |
| Safari | 14+ | Full support |
| Edge | 90+ | Full support |

---

## 13. Internationalization (i18n)

**Current Status:** Not implemented (English only)

**Future Requirements:**
- Support for Sinhala and Tamil (Sri Lanka)
- Date/time localization
- Currency formatting (LKR)
- RTL support (if needed)

---

## 14. Testing Strategy

### 14.1 Unit Testing (Future)

- [ ] Component testing with React Testing Library
- [ ] Service layer testing with Jest
- [ ] Utility function testing

### 14.2 Integration Testing (Future)

- [ ] API integration tests
- [ ] End-to-end user flow tests

### 14.3 E2E Testing (Future)

- [ ] Playwright or Cypress for critical user flows
- [ ] Cross-browser testing
- [ ] Mobile viewport testing

---

## 15. Known Limitations

| Limitation | Impact | Mitigation |
|------------|--------|------------|
| Mock data fallback | Development mode only | Connect to real backend in production |
| localStorage for tokens | XSS vulnerability | Use HttpOnly cookies in production |
| No real-time updates | Manual refresh required | Implement WebSocket/SSE in future |
| No offline support | Requires internet | Implement PWA with service worker |

---

## 16. Future Enhancements

### 16.1 Short-term (Next Sprint)

- [ ] Connect to real backend API
- [ ] Implement Agent Dashboard
- [ ] Implement Admin Panel
- [ ] Implement Reports module
- [ ] Implement code splitting and lazy loading
- [ ] Add caching strategy (service worker, API caching)
- [ ] Implement real-time updates (WebSocket)
- [ ] Add export functionality (CSV/PDF)
- [ ] Add form validation improvements

### 16.2 Medium-term

- [ ] Add E2E tests (Playwright)
- [ ] Implement PWA (service worker, offline support)
- [ ] Add CI/CD pipeline (GitHub Actions)
- [ ] Add performance monitoring (Lighthouse CI)
- [ ] Implement image optimization (WebP, responsive images)
- [ ] Add bundle analysis and optimization
- [ ] Implement route preloading strategy

### 16.3 Long-term

- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard with real-time charts
- [ ] Multi-language support (i18n)
- [ ] AI-powered recommendations for member placement
- [ ] Advanced reporting with drill-down capabilities
- [ ] Integration with payment gateways

---

## 17. Appendix

### 17.1 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:8089/eepip-api/api/v3` |
| `VITE_SSO_BASE_URL` | SSO service base URL | `http://localhost:8089/temco-api/api/v1` |

### 17.2 Local Storage Keys

| Key | Description |
|-----|-------------|
| `sso_token` | JWT authentication token |
| `eepip_user` | User profile JSON |

### 17.3 Commission Types

| Type | Description |
|------|-------------|
| DIRECT | Direct referral commission (2% of investment) |
| BINARY_MATCHING | Binary pairing commission |
| LEADERSHIP | Leadership bonus |
| PRODUCT_BONUS | Product-specific bonus |
| POOL_SHARE | Pool share from binary system |

### 17.4 Ranks

| Rank | BV Requirement |
|------|----------------|
| STARTER | 0 BV |
| BRONZE | 1,000 BV |
| SILVER | 5,000 BV |
| GOLD | 15,000 BV |
| PLATINUM | 50,000 BV |
| DIAMOND | 150,000 BV |

---

## 18. Change History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | May 2, 2026 | Cascade | Initial SRS document based on implemented frontend |
| 1.1 | May 2, 2026 | Cascade | Added Agent Dashboard, Admin Panel, Reports, Performance Optimization requirements |

---

**Document Status:** Complete  
**Next Review:** Post-backend integration  
**Approved By:** Pending
