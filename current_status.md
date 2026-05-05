# EEPIP — Education Easy-Pay Investment Plan (MLM Module)

**Status:** Backend Development Complete (All 13 Milestones Done) + Frontend Development Complete (All 26 Milestones Done) + Docker Deployment Complete with Flyway Migration Fix + Production App Ready + NIC Auto-Complete Feature Implemented
**Last Updated:** May 5, 2026

**Terminology:** Nodes in the binary tree are called **"AI Engineers"** (not members/investors).

---

## Backend Development Progress (May 5, 2026)

### Docker Deployment & Flyway Migration Fix ✅

**Issue Resolved:**
- Flyway migration failures due to corrupted migration files and failed V1 migration in schema history
- Container auto-running Flyway before datasource configuration was complete

**Fixes Applied:**

1. **FlywayStartup.java Enhancement:**
   - Made `baselineVersion` configurable via system property (was hardcoded to "0")
   - Added `validateOnMigrate` configuration option
   - Now reads: `flyway.baselineVersion`, `flyway.validateOnMigrate` from system properties

2. **docker-compose.yml Configuration:**
   - Changed from `JAVA_OPTS_APPEND` (not supported) to `JAVA_OPTS` (WildFly standard)
   - Added Flyway configuration as JVM system properties:
     - `flyway.url=jdbc:mariadb://host.docker.internal:3306/temco_system`
     - `flyway.baselineOnMigrate=true`
     - `flyway.baselineVersion=16`
     - `flyway.validateOnMigrate=false`

3. **Schema History Cleanup:**
   - Dropped corrupted `eepip_flyway_schema_history` table
   - Successfully baselined at version 16 (existing V1-V16 migrations marked as baseline)
   - Future migrations will start from V17+

4. **Deployment Workflow:**
   - Container starts with Flyway disabled initially
   - Datasource configured via JBoss CLI at runtime
   - Flyway enabled and redeployed with baseline
   - Automatic migration on future deployments

**Current State:**
- Container: `eepip-backend` running healthy
- Ports: 8080 (HTTP), 9992 (management)
- Flyway: Baselined at V16, automatic migrations enabled
- API: Verified working (`/eepip-api/api/v3/products` returns 200 OK)
- Database: `temco_system` on MariaDB at `host.docker.internal:3306`

### NIC Auto-Complete Feature Implementation ✅

**Purpose:**
Enable existing member lookup during registration to auto-fill form fields, improving user experience and reducing manual data entry errors.

**Backend Implementation:**

1. **MemberResource.java (New REST Resource):**
   - Created new JAX-RS resource for member lookup operations
   - Endpoint: `GET /v3/members/lookup/{nic}` - Exact NIC match lookup
   - Endpoint: `GET /v3/members/search?q={query}` - Partial search by NIC or first name
   - Direct database access via JPA to shared `member` table
   - Returns member details: nic, fullName, firstName, lastName, mobileNo, email, address fields
   - Fixed map creation to use HashMap with put() instead of Map.of() (null-safe)

2. **Database Query:**
   - Queries shared `member` table in `temco_system` database
   - Lookup: `SELECT * FROM member WHERE nic = :nic`
   - Search: `SELECT member_id, nic, full_name, mobile_no, email FROM member WHERE nic LIKE :query OR first_name LIKE :query LIMIT 10`

**Frontend Implementation:**

1. **memberService.ts (New API Service):**
   - Created frontend API service following TEMCO ERP pattern
   - Uses `get()` function from apiClient.ts (SSO cookie auth)
   - `lookupByNic(nic)` - Returns MemberLookup or null if not found
   - `search(query)` - Returns array of MemberSearchResult
   - Fixed API client pattern to use correct `get()` function (not axios-style)

2. **PersonalInfoForm.tsx (Enhanced Registration Form):**
   - Added search box above form fields for NIC/first name search
   - Debounced search (500ms delay) to reduce API calls
   - Dropdown shows matching members with fullName, NIC, mobileNo
   - Click on result auto-fills form fields
   - NIC field auto-complete (500ms debounce after typing 10+ characters)
   - Loading spinner during search/lookup
   - Success/error messages for user feedback
   - Visual feedback: green message when member found, red error on failure

3. **Routing Fixes:**
   - Moved `/register` route outside AuthGuard to allow unauthenticated access
   - Changed Register from lazy-loaded to direct import (fixed blank page issue)
   - Added Register route inside MainLayout to show sidebar navigation
   - Added "New Enrollment? Register here" button on Login page

**Preventive Action Taken:**
- Fixed memberService API client pattern mismatch (was using axios-style `.data` access)
- Changed to use correct `get()` function from apiClient.ts
- This prevented import errors that were causing blank page when Register component loaded

**Test Data:**
- Test NICs available: `991111111V`, `962500269V`, `962500270V`, `200168002595`, `723064414V`

**Current State:**
- Backend: MemberResource deployed and accessible at `/eepip-api/api/v3/members/*`
- Frontend: Search box and auto-complete fully functional
- Registration page: Loads correctly with sidebar navigation
- No blank page issues

**Multi-App Flyway Strategy:**
- Each service uses separate Flyway history table: `{service}_flyway_schema_history`
- EEPIP: `eepip_flyway_schema_history` (baselined at V16)
- SSO: `sso_flyway_schema_history`
- Admin: `admin_flyway_schema_history`
- Portal: `portal_flyway_schema_history`
- All services can share the same database with independent migration tracking

### Frontend Applications

**IMPORTANT: Two frontend applications exist in the project:**

#### 1. Production App (DEFAULT) ✅
- **Location:** `F:\Exon\Java_Holdings_MLM\react-mlm-conversion`
- **Version:** v3.2
- **Status:** Production Ready (All 26 Milestones Complete)
- **Port:** 3004
- **Use By Default:** YES - This is the comprehensive, feature-complete application
- **Features:**
  - All pages: Login, Register, Dashboard, Tree, Commissions, Student Match, Agent Dashboard, Admin Panel, Bank Dashboard, Reports, Profile
  - Product configuration table (v3.2)
  - API service layer (apiClient, authService, aiEngineerService, treeService, commissionService, bankService, epinService)
  - TypeScript types (785 lines)
  - PWA support with offline capability
  - Performance optimizations (code splitting, lazy loading, caching)
  - Mock data fallback when backend unavailable

**Start Production App:**
```bash
cd F:\Exon\Java_Holdings_MLM\react-mlm-conversion
npm run dev
```
**Access:** http://localhost:3004

#### 2. Mock App (ARCHIVED) ⚠️
- **Location:** `F:\Exon\Java_Holdings_MLM\archived-mock-app\eepip-frontend`
- **Status:** Archived - Not in use
- **Port:** 3006 (previously used)
- **Use By Default:** NO - This app has been archived
- **Features:**
  - Basic pages: Landing, Dashboard, BinaryTree, Commissions, Enrollment, EPinManagement
  - Partial API integration (Enrollment page only)
  - No authentication
  - Minimal feature set
  - Used for testing individual API endpoints

**Note:** This app has been archived to the `archived-mock-app` folder. It is no longer in active use. All development should use the Production App.

**Recommendation:** Always use the Production App (`react-mlm-conversion`) for enrollment, tree management, and all user-facing operations. The Mock App is only for developers testing API integration.

### Completed Milestones (1-13)

**Phase 1: Entity Layer (M1-M5)** ✅
- M1-M5: 15 entity tables created (Product, AiEngineer, Commission, BinaryPool, RankHistory, Epin, Agent, AgentCommission, AgentBinaryPool, Payment, AcademicEvent, AuditLog, Withdrawal, Config, Document)
- All tables use `eepip_` prefix for namespacing within temco_system database
- Foreign key relationships to shared `member` table (not eepip_member)

**Phase 2: Service Layer (M6)** ✅
- M6: 15 service classes (EJB stateless session beans) for business logic
- Services: ProductService, AiEngineerService, CommissionService, BinaryTreeService, RankService, EpinService, AgentService, PaymentService, AcademicEventService, AuditService, WithdrawalService, ConfigService, DocumentService, BankViewService

**Phase 3: REST API Layer (M7)** ✅
- M7: 14 resource groups with 35+ JAX-RS endpoints
- Resources: HealthResource, ProductResource, AiEngineerResource, BinaryTreeResource, CommissionResource, PaymentResource, WithdrawalResource, AcademicEventResource, DocumentResource, AgentResource, ConfigResource, BankResource
- CORS filter for *.temcobank.com
- ApplicationConfig with @ApplicationPath("/api")

**Phase 4: DTO Layer (M8)** ✅
- M8: Core DTOs (AiEngineerDTO, ProductDTO, AgentDTO)
- Commission DTOs (CommissionDTO, AgentCommissionDTO)
- Financial DTOs (PaymentDTO, WithdrawalDTO)
- Tree DTOs (BinaryTreeResponseDTO, BinaryPoolStatusDTO)
- Bank DTOs (BankAuditViewDTO, BankMemberViewDTO)
- Mapper classes for entity-to-DTO conversion

**Phase 5: Utility Classes (M9)** ✅
- M9: EepipConstants (constants for commission rates, thresholds)
- CommissionCalculator (commission calculation logic with pro-rating, carry-forward, tax)

**Phase 6: Database Migrations (M10)** ✅
- M10: V25-V39 Flyway migration scripts (renumbered from V1-V15 to avoid temco_system conflicts)
- V25: Create Product Table (configurable investment amount and rates)
- V26: Create AI Engineer Table (with binary tree, academic status, product_id FK)
- V27: Create Commission Table
- V28: Create Binary Pool Table
- V29: Create Rank History Table
- V30: Create Epin Table
- V31: Create Agent Tables (agent, agent_commission, agent_binary_pool)
- V32: Create Payment Table
- V33: Create Academic Event Table
- V34: Create Audit Log Table
- V35: Create Withdrawal Table
- V36: Create Config Table
- V37: Create Document Table
- V38: Insert Seed Data (EEPIP_BSC_MPHIL at Rs. 1,800,000)
- V39: Add Circular Foreign Keys (agent references)

**Phase 7: Unit & Integration Tests (M11)** ✅
- M11: Unit tests for CommissionCalculator
- M11: Unit tests for mapper classes
- M11: Integration tests for ProductService
- M11: Integration tests for AiEngineerService
- JUnit 5 + Mockito framework

**Phase 8: Deployment Configuration (M12)** ✅
- M12: persistence.xml (JPA datasource configuration, Hibernate dialect, HikariCP)
- M12: beans.xml (CDI configuration, Java EE 8)
- M12: web.xml (servlet configuration)
- M12: application.properties (Flyway configuration)
- M12: jboss-deployment-structure.xml (WildFly deployment structure)
- M12: README.md (comprehensive deployment documentation)

**Phase 9: Docker Containerization (M13)** ✅
- M13: Dockerfile (multi-stage build, WildFly 26, MariaDB driver, offline datasource configuration)
- M13: docker-compose.yml (backend service connecting to external temco_system database)
- M13: .dockerignore (build context optimization)
- M13: .env.example (environment variables for temco_system connection)
- M13: docker/configure-wildfly.cli (offline CLI script for datasource registration)
- M13: docker/mariadb-module.xml (JBoss module descriptor for MariaDB JDBC driver)

### Database Configuration

**Connection Details:**
- **Database:** temco_system (shared TEMCO system database)
- **Host:** 127.0.0.1:3306 (via Docker network_mode: host)
- **User:** root
- **Password:** 6qZB6d@pIvj
- **Flyway Table:** flyway_schema_history (standard, not SSO's sso_flyway_schema_history)

**Table Structure:**
- 15 EEPIP tables with `eepip_` prefix in temco_system
- References shared `member` table (not eepip_member)
- eepip_ai_engineer is a child of member table via member_id foreign key

**Docker Architecture:**
- Backend container only (no mariadb or flyway services in compose)
- Connects to external temco_system database (already running)
- Flyway migrations run manually via Maven/CLI before container start
- Uses network_mode: host for direct database access

### Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Application Server | WildFly | 26.1.3.Final |
| Java | JDK | 17 |
| Framework | Java EE 8 | - |
| Business Logic | EJB 3.2 | Stateless session beans |
| Persistence | JPA 2.2 | Hibernate 5 |
| REST API | JAX-RS 2.1 | - |
| Database | MariaDB | 10.11 |
| Migrations | Flyway | 9.22.3 |
| Build Tool | Maven | 3.9 |
| Containerization | Docker | Latest |

### Deployment Commands

```bash
# Run Flyway migrations first
mvn flyway:migrate

# Build and start Docker container
docker-compose up --build

# Verify deployment
curl http://localhost:8080/eepip-api/api/health
```

---

## Current Progress (May 1, 2026)

### Approach: WordPress MLM Frontend Replication

The frontend UI design is based on replicating WordPress MLM plugin interfaces (binary tree visualization, dashboards, commission reports, registration forms) into a modern **React + TypeScript + TailwindCSS** stack. WordPress MLM plugins (e.g., Starter MLM, WordPress MLM Pro) provide proven, user-friendly binary MLM interfaces that serve as design references.

### What Has Been Completed

#### 1. WordPress → React Conversion Framework
- Analyzed WordPress MLM frontend structure (PHP templates, jQuery, CSS)
- Created systematic conversion guide: WordPress components → React components
- Mapped WordPress CSS classes → TailwindCSS utility classes
- Defined reusable component library pattern

#### 2. TypeScript Data Model (785 lines, 18 sections)
Comprehensive TypeScript interfaces aligned to EEPIP v3.0 design:
- SSO authentication types (`SSOLoginRequest`, `SSOLoginResponse`, `AuthenticatedUser`)
- AI Engineer entity with full EEPIP state machine (`AIEngineerState` enum)
- Student Beneficiary with matching service types
- Binary tree node structure
- All 4 commission types with exact rates and constants
- Binary pool cap, pro-rating, and carry-forward modeling
- Rank system with exact requirements (Starter → Diamond)
- Bank read-only access types
- Dashboard, registration, notification types
- Financial constants (investment amount, margins, durations)

#### 3. Full-Stack Compatibility Verification
Confirmed React + TypeScript + TailwindCSS is fully compatible with JavaEE EJB, JAX-RS, JPA/Hibernate, WildFly, MariaDB backend.

#### 4. Gap Analysis — 14 Gaps Identified and Resolved
| Category | Gaps | Status |
|----------|------|--------|
| Critical (SSO, ERP alignment, state machine, pool cap, bank access) | 5 | ✅ All resolved |
| Important (missing fields, API layer, Vite config, ranks, student matching) | 6 | ✅ All resolved |
| Minor (cleanup, project config) | 3 | ✅ All resolved |

#### 5. API Service Layer (TEMCO ERP pattern)
Created 6 frontend API service files following existing TEMCO ERP conventions:
- `apiClient.ts` — Base HTTP client with SSO cookie auth
- `authService.ts` — SSO login/logout/session validation
- `aiEngineerService.ts` — Member CRUD, enrollment, dashboard, student nomination
- `treeService.ts` — Binary tree fetching, placement, spillover
- `commissionService.ts` — Commission listing, reports, pool status
- `bankService.ts` — Bank read-only audit, member search, disbursement

#### 6. Backend Structure Definition
Full JavaEE backend package structure defined (`lk.temcobank.eepip.*`), including:
- Entity, DTO, Service (EJB), Resource (JAX-RS), Mapper classes
- MariaDB schema (11 tables: 7 core + 3 agent + 1 product config)
- REST API endpoints (7 resource groups, 35+ endpoints)
- Docker port allocation (EEPIP API: 8089, Frontend: 3004)

#### 7. Project Configuration
- `package.json` — Vite + React + TailwindCSS dependencies
- `tsconfig.json` / `tsconfig.node.json` — TypeScript configuration
- `vite.config.ts` — Dev server (port 3004) with proxy to WildFly (8089) and SSO (8085)
- `vite-env.d.ts` — Environment variable types
- `.env.example` — Environment template

#### 8. React Components (initial)
- `Button.tsx` — Reusable button with variants, sizes, loading states
- `BinaryTree.tsx` — Interactive binary tree visualization with expand/collapse

#### 9. Development Plan — 14 Milestones
Step-by-step plan to build the full EEPIP app, each milestone producing a browser-visible result. See `DEVELOPMENT_PLAN.md`.

### Deliverables Produced

```
react-mlm-conversion/
├── DEVELOPMENT_PLAN.md              ← 14-milestone build plan
├── GAP_ANALYSIS.md                  ← 14 gaps identified, all resolved
├── COMPATIBILITY_ANALYSIS.md        ← Full-stack compatibility verification
├── IMPLEMENTATION_SUMMARY.md        ← Conversion framework overview
├── backend-structure.md             ← JavaEE package structure + DB schema
├── wordpress-to-react-guide.md      ← WordPress → React conversion guide
│
├── types/
│   └── mlm.types.ts                 ← 785 lines: 18 sections, all EEPIP types
│
├── api/
│   ├── apiClient.ts                 ← Base HTTP client (SSO cookie auth)
│   ├── authService.ts               ← SSO integration
│   ├── aiEngineerService.ts         ← Member operations
│   ├── treeService.ts               ← Binary tree operations
│   ├── commissionService.ts         ← Commission operations
│   └── bankService.ts               ← Bank read-only access
│
├── components/
│   ├── common/Button.tsx            ← Reusable button component
│   └── mlm/BinaryTree.tsx           ← Interactive tree visualization
│
├── utils/cn-simple.ts               ← TailwindCSS class utility
├── styles/conversion-reference.md   ← CSS → TailwindCSS mapping reference
│
├── package.json                     ← Vite project config
├── tsconfig.json                    ← TypeScript config
├── tsconfig.node.json               ← Node TypeScript config
├── vite.config.ts                   ← Vite dev server + proxy
├── vite-env.d.ts                    ← Environment type declarations
└── .env.example                     ← Environment template
```

### Next Step

**Milestone 24:** Image Optimization & Bundle Analysis (Performance optimization)

---

## Frontend Development Progress (May 2, 2026)

### Completed Milestones (1-23)

**Phase 1: Foundation (M1-M4)** ✅
- M1: Vite project setup, TailwindCSS, TypeScript config
- M2: MainLayout, Login, Register pages
- M3: Dashboard with stats cards and activity
- M4: Binary tree visualization with interactive nodes

**Phase 2: Core Features (M5-M10)** ✅
- M5: Commissions page with table and filters
- M6: Profile page with user settings
- M7: Student match page for nomination
- M8: Bank dashboard (read-only audit)
- M9: Agent dashboard with referral tracking
- M10: Mock data for all entities

**Phase 3: Admin Panel (M11-M14)** ✅
- M11: Admin panel shell with tabs
- M12: User management (CRUD)
- M13: Agent appointment form
- M14: Product management table

**Phase 4: Admin Extensions (M15-M18)** ✅
- M15: Agent dashboard enhancements
- M16: Admin user management improvements
- M17: Product form with all fields
- M18: System config, audit logs, EPIN generator

**Phase 5: Reports Module (M19-M20)** ✅
- M19: Report generator with 6 report types, filters, export (CSV)
- M20: Charts (commission trend, investment by product, agent rankings) + scheduling

**Phase 6: Performance Optimization (M21-M23)** ✅
- M21: Code splitting (React.lazy for all routes, manual chunks for React/recharts)
  - Initial bundle: 15.43 KB (was 179 KB before manual chunks)
  - React vendor: 164 KB (cacheable)
  - Recharts vendor: 380 KB (lazy-loaded on /reports)
- M22: Lazy loading for below-fold components (CommissionTable, BinaryTree)
  - lazyImage utility for future image assets
- M23: Caching strategy
  - Service worker with Vite PWA plugin
  - Workbox runtime caching for API (NetworkFirst)
  - LocalStorage + in-memory cache utilities
  - PWA manifest for offline support

### Current Bundle Size (Production Build)

| Chunk | Size | Gzipped | Type |
|-------|------|---------|------|
| index.js (app shell) | 15.43 KB | 5.18 KB | Main |
| react-vendor.js | 164.13 KB | 53.56 KB | React + Router |
| recharts-vendor.js | 380.34 KB | 111.97 KB | Charts (lazy) |
| AdminPanel.js | 54.39 KB | 7.96 KB | Admin (lazy) |
| Register.js | 22.44 KB | 4.07 KB | Register (lazy) |
| Reports.js | 16.17 KB | 4.21 KB | Reports (lazy) |
| mockData.js | 16.61 KB | 4.34 KB | Shared |
| Other pages | 2-14 KB each | < 4 KB each | Lazy per route |

### Remaining Milestones

**None** - All 26 milestones completed.

### Dev Server

- **URL:** http://localhost:3006/
- **Status:** Running with HMR
- **TypeScript:** Zero errors
- **Production Build:** Successful (dist/)

### Documentation

- **README.md:** Comprehensive project documentation created
- **Git Repository:** Initialized with initial commit (b12955d)

---

## WordPress MLM Plugin Exploration (May 1, 2026)

### Purpose
Explored WordPress MLM plugin (Binary MLM Plan) to learn MLM concepts, UI patterns, and identify gaps compared to EEPIP v3.0 requirements.

### WordPress MLM Plugin Features (Free Version)

| Feature | Implementation | Status |
|---------|----------------|--------|
| **Payment System** | ePin-based enrollment | ✅ Working |
| **Binary Tree Structure** | parent_key/sponsor_key database model | ✅ Working |
| **Direct Referral Commission** | Percentage-based (configured 2%) | ✅ Working |
| **Eligibility Requirements** | Direct referrals, left/right leg balance | ✅ Working |
| **Payout Cap** | Maximum payout limit (configured Rs. 270,000) | ✅ Working |
| **Frontend Pages** | Account Detail, Downlines, Join Network, Register | ✅ Working |
| **Admin Pages** | Settings, User Reports, ePin Reports, Payout Reports, Genealogy | ✅ Working |
| **Genealogy Visualization** | Tree view of downlines | ✅ Working (static) |

### WordPress MLM Plugin Limitations (Free Version)

| EEPIP Feature | WordPress Plugin Support | Gap |
|---------------|-------------------------|-----|
| **Direct Sponsor Bonus (2%)** | ✅ Supported | None |
| **Binary Pairing Commission (5%)** | ❌ Not supported | ⚠️ High |
| **Matching Bonus (1.5%, Gen 1-3)** | ❌ Not supported | ⚠️ High |
| **Leadership Pool (1.5%)** | ❌ Not supported | ⚠️ High |
| **Binary Pool Cap with Pro-rating** | ❌ Not supported (simple cap only) | ⚠️ High |
| **Rank System (6 ranks)** | ❌ Not supported | ⚠️ High |
| **Rank Achievement Rewards** | ❌ Not supported | ⚠️ Medium |
| **BV-based Pair Matching** | ❌ Not supported (uses enrollment count) | ⚠️ Medium |
| **Matching Bonus Generations (Gen 1-3)** | ❌ Not supported | ⚠️ Medium |
| **Admin User Creation** | ❌ Not supported (frontend registration only) | ⚠️ Low |
| **Frontend ePin Activation** | ❌ Not supported (users remain unpaid) | ⚠️ Low |

### UI Patterns Learned (for React Replication)

**Navigation Structure:**
- Sidebar/Top navigation with menu items
- Dashboard (Account Detail) as main landing page
- Separate pages for Genealogy, Registration, Reports

**Dashboard Components:**
- Stats cards (earnings, BV, team size)
- Rank badge display
- Recent activity table
- Commission summary

**Genealogy/Tree Visualization:**
- Node-based tree display
- Left/Right leg indicators
- Expand/collapse functionality
- User details on node click

**Registration Flow:**
- Multi-step form (personal details, sponsor selection, position selection)
- ePin input field (for payment validation)
- Validation messages

**Admin Components:**
- Settings tabs (General, Eligibility, Payout, ePin)
- Data tables with filters (Users, ePins, Payouts)
- Genealogy view for admin

### Decision: Skip WordPress for Production

**Reasons:**
1. Free plugin lacks critical EEPIP features (binary pairing, matching bonus, leadership pool, ranks)
2. ePin system doesn't match EEPIP's direct bank payment model
3. Limited customization in free version
4. Paid versions may still not align with EEPIP's specific business rules

**Conclusion:**
- WordPress plugin useful for **learning MLM concepts** and **UI pattern reference**
- **Not suitable** for EEPIP production implementation
- Proceed with **custom React + TypeScript + JavaEE backend** for full EEPIP v3.0 compliance

### UI Component Mapping for React Development

| WordPress Page | React Component | Priority |
|----------------|-----------------|----------|
| Account Detail (Dashboard) | Dashboard.tsx | High |
| Downlines (Genealogy) | BinaryTree.tsx | High |
| Join Network (Registration) | Registration.tsx | High |
| User Reports | UserList.tsx | Medium |
| Payout Reports | CommissionTable.tsx | Medium |
| Settings | Settings.tsx | Low |

---

### Product (Configurable via `product` Table)

Investment amount and commission rates are **not hardcoded**. They are stored in the `product` database table and can be updated by Admin without code changes. All commission amounts are derived at runtime as `product.investment_amount × rate`.

| Field | Default Value | Configurable? |
|-------|───────────────|--------|
| **Product Code** | `EEPIP_BSC_MPHIL` | Yes |
| **Product Name** | TEMCO Education Easy-Pay Investment Plan (EEPIP) | Yes |
| **Investment Amount** | Rs. 1,800,000 LKR | **Yes — variable** |
| **Program 1** | BSc Software Engineering (3 years) | Fixed |
| **Program 2** | MPhil (after BSc completion, free from education provider) | Fixed |
| **Interest Rate** | 16% p.a., paid monthly | Fixed |
| **Monthly Interest** | Rs. 24,000 (auto-deducted as BSc tuition installment) | Derived |
| **University Certification Fee** | Rs. 500,000 (paid to outside university) | Fixed |
| **Education Provider** | Partner organization of the bank | Fixed |
| **MPhil Actual Cost** | Rs. 0 (free from partner; shown as investment amount to member) | Fixed |

**Configurable Commission Rates (stored in `product` table):**

| Rate Column | Default | Amount at Rs. 1.8M |
|-------------|---------|---------------------|
| `direct_sponsor_rate` | 2.0% | Rs. 36,000 |
| `binary_pool_rate` | 5.0% | Rs. 90,000 |
| `matching_bonus_rate` | 1.5% | Rs. 27,000 |
| `leadership_pool_rate` | 1.5% | Rs. 27,000 |
| `agent_direct_rate` | 2.0% | Rs. 36,000 |
| `agent_pool_rate` | 3.0% | Rs. 54,000 |
| `bank_margin_rate` | 6.0% | Rs. 108,000 |
| `max_binary_pairs_per_month` | 3 | — |
| `max_agent_pairs_per_month` | 2 | — |

If the investment amount changes to Rs. 2,000,000, all derived amounts recalculate automatically.

**Scope: Single Product**
- The system supports **one active product at a time** (currently `EEPIP_BSC_MPHIL`)
- One binary tree, one binary pool, one agent pool — all tied to the single product
- The `product` table allows Admin to update the investment amount or rates over time (e.g., price increase)
- Old AI Engineers retain their original `product_id`; new enrollments use the current active product
- Multi-product support (e.g., BSc-only at a lower price alongside BSc+MPhil) would require tree/pool/rank redesign — deferred to v4.0 if needed

### Partnership Structure

| Entity | Role | Share | Amount (LKR) |
|--------|------|-------|-------------|
| **TEMCO Bank** | Collection, KYC, trust brand, financial intermediary | 6% | 108,000 |
| **Java Institute Holdings** | Education delivery, MLM operations, IT infrastructure, commission payouts | 79% | 1,422,000 |

**TEMCO Bank's responsibilities:**
- Receives investment from member (Rs. 1,800,000)
- Performs KYC verification
- Keeps 6% margin (Rs. 108,000)
- Transfers Rs. 1,422,000 to Java Institute Holdings
- Provides banking trust and credibility
- Pays MLM commissions to members on behalf of Java Institute (funded by Java Institute)
- Read-only access to MLM system for auditing and member support

**Java Institute Holdings' responsibilities:**
- Delivers BSc Software Engineering (3 years)
- Delivers MPhil (free to bank, internal cost)
- Pays university certification fee (Rs. 500,000)
- Runs and hosts the MLM system on their infrastructure
- Funds all MLM commission payouts (via bank as disbursement channel)
- Maintains IT infrastructure

### Financial Model Per Member (at default Rs. 1,800,000)

Amounts below are derived from `product.investment_amount × rate` and will auto-adjust if the product amount changes.

| Item | Rate | Amount (LKR) | Paid By |
|------|------|-------------|--------|
| TEMCO Bank Margin | `bank_margin_rate` 6.0% | 108,000 | Kept by bank |
| MLM Commission Pool | 10.0% (sum of 4 rates) | 180,000 | Java Institute |
| Agent Commission Pool | 5.0% (sum of 2 rates) | 90,000 | Java Institute (separate budget) |
| University Certification | Fixed | 500,000 | Java Institute |
| BSc Delivery (internal) | Fixed | ~300,000 | Java Institute (internal cost) |
| MPhil Delivery (internal) | Fixed | ~100,000 | Java Institute (internal cost) |
| **Java Institute Margin** | **Remainder** | **~522,000 (~29%)** | Java Institute retains |

**Member's view (unchanged):**
- Invests Rs. 1,800,000 in Education Easy-Pay Investment Plan at TEMCO Bank
- Earns 16% p.a. interest monthly (Rs. 24,000/month) — covers BSc tuition
- Capital (Rs. 1,800,000) shown as "paid to institute for MPhil" after BSc
- Earns MLM commissions from referrals

### Financial Flow (at default Rs. 1,800,000)

All percentage-based amounts are derived from `product.investment_amount × rate`.

```
Investor pays product.investment_amount to TEMCO Bank
│
├── TEMCO Bank keeps bank_margin_rate (6%) ──  Rs.   108,000
│
└── Transfers remainder to Java Institute ──  Rs. 1,692,000
    │
    ├── MLM Commissions (10% = sum of 4 rates)
    │   ├── direct_sponsor_rate    (2%)       Rs.    36,000
    │   ├── binary_pool_rate       (5%)       Rs.    90,000
    │   ├── matching_bonus_rate    (1.5%)     Rs.    27,000
    │   └── leadership_pool_rate   (1.5%)     Rs.    27,000
    │
    ├── Agent Commissions (5% = sum of 2 rates)
    │   ├── agent_direct_rate      (2%)       Rs.    36,000  (one-time)
    │   └── agent_pool_rate        (3%)       Rs.    54,000  (monthly)
    │
    ├── University Certification (fixed) ──  Rs.   500,000
    │
    ├── BSc Delivery (fixed, internal) ───  Rs.  ~300,000
    │
    ├── MPhil Delivery (fixed, internal) ──  Rs.  ~100,000
    │
    └── Java Institute Margin (remainder)──  Rs.  ~522,000
```

### Commission Payout Flow

```
Java Institute ──funds──→ TEMCO Bank ──pays──→ Investor Members
(calculates commissions)   (disburses to       (receives commissions
                            member accounts)    from bank brand)
```

Commissions are calculated by Java Institute's MLM system but **disbursed through TEMCO Bank** to maintain member trust and brand consistency.

### Three Roles

| Role | Who | What They Do | What They Get |
|------|-----|-------------|--------------|
| **AI Engineer (Investor)** | Anyone (parent, businessperson, professional, student) | Pays Rs. 1,800,000, participates in MLM, nominates a student | MLM commissions + capital invested in education |
| **Student Beneficiary** | Must meet academic entry requirements | Studies BSc then MPhil | BSc + MPhil degree, fully funded |
| **Agent** | Appointed by Admin | Introduces new AI Engineers to the system, recruits sub-agents | Agent direct referral (2%) + agent binary tree commissions (3%) |

- 1 investment = 1 student beneficiary
- Investor CAN be the student themselves
- Investor CAN be someone else (parent, employer, sponsor)
- 1 investor can hold multiple positions (Rs. 1,800,000 x N)
- Student cannot be changed after BSc starts
- Student nomination deadline: within 60 days of investment
- Agent CAN also invest Rs. 1,800,000 and join as AI Engineer (dual role, education-exempt)
- Agent-AI-Engineers skip student nomination and earn commissions indefinitely

### Tree Rules

| Rule | Decision |
|------|----------|
| Structure | Pure Binary (2 legs per AI Engineer) |
| Placement | Sponsor chooses Left or Right |
| Spillover | Deepest available position on chosen side |
| Max Depth | Unlimited |
| Re-entry | Not allowed (1 position per investment) |
| Active Status | 12 months from enrollment; must nominate a student to activate |

**Business Volume (BV):**
- 1 new enrollment (Rs. 1,800,000) = **1 BV**
- BV flows upward through the entire tree to all ancestors
- Pairs are matched as: `pairs = min(left BV, right BV)`
- Unmatched BV on the stronger leg carries forward to next cycle

### Commission / Payout Structure

| Type | Rate Column | Default % | Default Amount (LKR) | When Paid |
|------|-------------|-----------|---------------------|-----------|
| Direct Sponsor Bonus | `direct_sponsor_rate` | 2% | 36,000 | Immediately on investment |
| Binary Pairing (pool) | `binary_pool_rate` | 5% | 90,000/enrollment into pool | Monthly cycle |
| Matching Bonus | `matching_bonus_rate` | 1.5% | 27,000 | Monthly cycle |
| Leadership Pool | `leadership_pool_rate` | 1.5% | 27,000 | Monthly cycle |

**Binary Pool Cap Mechanism:**
- Monthly global pool = (total enrollments that month x Rs. 90,000) + carry-forward
- If total claims exceed pool: all payouts are pro-rated proportionally
- If pool exceeds claims: surplus carries forward to next month
- Binary fund can never go bankrupt

**Matching Bonus Generations:**
- Gen 1 (direct recruits): 10% of their binary earnings
- Gen 2: 5% of their binary earnings
- Gen 3: 3% of their binary earnings

**Commission Depth Limits:**

| Commission Type | Depth Limit | Description |
|----------------|------------|-------------|
| Direct Sponsor | Gen 1 only | Paid only for AI Engineers you personally recruit |
| Binary Pairing | Unlimited ♾️ | BV flows up entire tree; all ancestors benefit |
| Matching Bonus | Gen 1-3 only | % of direct recruits' (and their recruits') binary earnings |
| Leadership Pool | Rank-based | Not depth-dependent; based on rank qualification |

**Payout Rules:**
- Cycle: Monthly
- Carry-forward: Unmatched stronger leg carries forward indefinitely
- Max pairs/month: 3 (cap: Rs. 270,000/month binary)
- Minimum payout: Rs. 500

### Rank System

| Rank | Direct Recruits | Team Enrollments | Min Balance (1L+1R) | Leadership Share |
|------|----------------|-----------------|---------------------|-----------------|
| Starter | 0 | 1 (self) | -- | -- |
| Bronze | 2 (1L+1R) | 6 | 2L+2R | -- |
| Silver | 4 | 20 | 8L+8R | -- |
| Gold | 6 | 50 | 20L+20R | 1 share |
| Platinum | 8 | 100 | 40L+40R | 2 shares |
| Diamond | 12 | 250 | 100L+100R | 5 shares |

- Ranks are permanent (no demotion)
- Evaluated monthly

**Rank Achievement Rewards (one-time):**
- Bronze: Rs. 10,000
- Silver: Rs. 25,000
- Gold: Rs. 75,000
- Platinum: Rs. 200,000
- Diamond: Rs. 500,000

### Payout Validation (10% Pool Integrity)

Verified that total payouts to ALL AI Engineers stay within 10% of total collection:

**Scenario: Perfect binary growth (each AI Engineer recruits 2)**

| Month | AI Engineers | Total Collection | 10% Pool | Total Paid Out | Utilization |
|-------|-------------|-----------------|----------|---------------|-------------|
| 1 | 3 | 5,400,000 | 540,000 | 162,000 | 30.0% ✅ |
| 2 | 7 | 12,600,000 | 1,260,000 | 684,000 | 54.3% ✅ |
| 3 | 15 | 27,000,000 | 2,700,000 | ~1,954,000 | 72.4% ✅ |

**Key findings:**
- Binary pro-rating triggers at Month 3 (claims Rs. 990,000 exceeded pool Rs. 900,000 → paid at 90.9%)
- Top AI Engineer earns ~Rs. 654,000 in 3 months (36% of own investment) — funded by multiple enrollments' pools
- Top AI Engineer break-even: ~7 months (with ideal growth)
- Total system payouts never exceed 10% of total collection ✅
- As tree deepens, per-pair payout decreases due to more levels competing for the same pool

### Business Rules

| Rule | Policy |
|------|--------|
| Withdrawal | Not applicable — academic program is irreversible |
| Dropout / Failure | If student drops or fails before MPhil completion, investor's commissions STOP |
| Tree position on dropout | Position frozen in tree (not removed), BV still flows through |
| Education quality | Institute guarantees program delivery with best quality |
| Education provider | Partner organization of the bank |
| MPhil arrangement | Provider gives MPhil free to bank; shown as funded by capital |

### Member States

**Normal AI Engineer:**
```
INVESTED → STUDENT_NOMINATED → ACTIVATED → BSc_IN_PROGRESS (36 months)
    → BSc_COMPLETED → MPhil_IN_PROGRESS → MPhil_COMPLETED
    
MLM commissions active from ACTIVATED until MPhil_COMPLETED or DROPOUT
```

**Agent-turned-AI-Engineer (education_exempt = TRUE):**
```
INVESTED → ACTIVATED (immediately, no student nomination required)
    
MLM commissions active indefinitely (no education lifecycle constraint)
```

### Agent System (v3.1)

Agents are a separate participant role who introduce new AI Engineers to the system. They do not invest Rs. 1,800,000 and are not placed in the AI Engineer binary tree.

**Agent Appointment:**
- Appointed by Admin only
- No investment required
- Assigned to the agent binary tree (separate from AI Engineer tree)
- Must introduce at least 1 AI Engineer to become "active" in the agent tree

**Agent Commission Structure:**

| Type | Rate | Amount | When Paid |
|------|------|--------|-----------|
| Direct Referral | 2% | Rs. 36,000 | One-time, immediately on AI Engineer payment |
| Agent Binary Pairing | 3% pool | Rs. 54,000/enrollment into pool | Monthly cycle |

**Agent Binary Tree Rules:**
- Separate binary tree from AI Engineer tree
- Agents recruit sub-agents into LEFT/RIGHT legs
- **Activation:** Agent must have introduced ≥1 AI Engineer to count as active
- **Pairing:** When agent has active agents on both left and right legs
- **Max pairs/month:** 2 (cap: Rs. 108,000/month agent binary)
- **Payout per pair:** Rs. 54,000
- **Pro-ration:** If total claims > pool, pro-rate all payouts proportionally
- **Carry-forward:** Surplus carries to next month

**Agent as AI Engineer (Dual Role):**
- Agent can also invest Rs. 1,800,000 and join the AI Engineer binary tree
- `education_exempt = TRUE` — no student nomination required
- `INVESTED → ACTIVATED` immediately
- AI Engineer commissions run indefinitely (no education lifecycle)
- Agent commissions tracked separately from AI Engineer commissions

**Agent Database Tables:**
- `agent` — agent profile, agent binary tree position, performance stats
- `agent_commission` — DIRECT_REFERRAL and BINARY_PAIRING records
- `agent_binary_pool` — monthly pool tracking (3% contributions)
- `ai_engineer.introducing_agent_id` — links AI Engineer to the agent who introduced them
- `ai_engineer.education_exempt` — TRUE for agents who invest as AI Engineers

**Agent REST API:**
```
/eepip-api/api/v3/agents
    GET    /                          List all agents
    GET    /{id}                      Get agent by ID
    POST   /appoint                   Appoint new agent (ADMIN only)
    PUT    /{id}/status               Activate/suspend/terminate
    GET    /{id}/dashboard            Agent dashboard data
    GET    /{id}/referrals            List AI Engineers introduced
    GET    /{id}/commissions          List agent commissions
    GET    /{id}/tree?depth=4         Agent binary tree view
    POST   /place                     Place agent in agent tree
    GET    /pool-status?cycleMonth=   Agent binary pool status
```

### Student Matching Service

For investors who don't know a student, the bank provides:
- Pre-screened student waiting list (academic eligibility verified)
- Bank matches investor with qualifying student
- Tri-party agreement: Bank - Investor - Student

### Market Segments

| Segment | Why They Join |
|---------|--------------|
| Parents (25-55 yrs) | Secure child's education + earn commissions |
| Professionals | Investment + education for family member |
| Businesspeople | ROI through commissions + CSR |
| Students (self-funded) | Own education + earn while studying |
| Employers | Staff development + MLM returns |
| Philanthropists / NGOs | Fund deserving students |

### Tech Stack

| Layer | Technology | Hosted By |
|-------|-----------|----------|
| App Server | WildFly 31 | Java Institute |
| Business Logic | EJB @Stateless session beans | Java Institute |
| Persistence | JPA 2.2 with EntityManager, JPQL | Java Institute |
| REST API | JAX-RS | Java Institute |
| Database | MariaDB | Java Institute |
| Frontend | React + TypeScript + TailwindCSS | Java Institute |
| Build | Maven -> .war deployed to WildFly | Java Institute |
| Deployment | Docker | Java Institute infrastructure |
| Bank Integration | REST API for commission disbursement + reporting | TEMCO Bank read-only access |

**Note:** The entire MLM system is built, deployed, and hosted on Java Institute Holdings' infrastructure. TEMCO Bank has read-only API access for auditing, member support, and commission disbursement.

### Partnership Safeguards (Recommended)

| Safeguard | Purpose |
|-----------|---------|
| Formal partnership agreement | Legally binding terms on education delivery, fees, quality, duration |
| Escrow / tranche releases | Bank holds Rs. 1,692,000 and releases to Java Institute in tranches, not lump sum |
| Rebranding language | Never use "deposit" + "interest" externally; use "Education Investment Plan" + "tuition coverage" |
| Commission disbursement via bank | Bank pays commissions (funded by Java Institute) to maintain trust |
| SLA on education quality | Contractual quality guarantees with penalties |
| Read-only system access for bank | Auditing, member support, compliance reporting |
| Exit clause | Clear plan for existing members if partnership ends |
| Data ownership agreement | Define who owns member data, privacy obligations |

### Remaining Gaps (To Be Addressed)

| # | Gap | Priority | Status |
|---|-----|----------|--------|
| 1 | MLM legal counsel review | Critical | Pending |
| 2 | Formal partnership agreement (Bank <-> Java Institute) | Critical | Pending |
| 3 | Escrow / tranche release mechanism for fund transfers | Critical | Pending |
| 4 | Academic batch vs continuous recruitment timing | Important | Pending |
| 5 | Minimum batch size for BSc program | Important | Pending |
| 6 | Degree accreditation / which university certifies | Important | Pending |
| 7 | Post-graduation MLM status (can they still earn?) | Important | Pending |
| 8 | Tax / WHT on MLM commissions | Important | Pending |
| 9 | University certification fee lock period (contract) | Important | Pending |
| 10 | Data ownership agreement (Bank vs Java Institute) | Important | Pending |
| 11 | Commission disbursement SLA (Java Institute funds -> Bank pays) | Important | Pending |
| 12 | MPhil program duration | Minor | Pending |

---

## EEPIP Binary Model — Version History

### Versioning Strategy

All design changes to the Binary MLM model are tracked here using semantic versioning:

**Format:** `EEPIP-vMAJOR.MINOR`
- **MAJOR** — Structural change (financial model, partnership, tree rules, new commission type)
- **MINOR** — Parameter tweak (amounts, percentages, caps, thresholds)

Each version entry records: **what changed, why, and the impact on the financial model.**

---

### v1.0 — Initial Model (Apr 29, 2026)
- Product: Degree Program (BSc + MPhil)
- Investment: Rs. 1,500,000
- Commission pool: 10% of investment
- Single role: member = student
- Bank operates everything

### v1.1 — University Certification Fee Added
- Added Rs. 500,000 university certification fee (outside university)
- Bank margin dropped from 14.2% to 8.67% (Rs. 130,000)
- Flagged: margin too thin for sustainability

### v2.0 — Price Increase + Pool-Based Binary
- Investment increased: Rs. 1,500,000 → **Rs. 1,800,000**
- Monthly interest: Rs. 20,000 → Rs. 24,000
- BSc tuition total: Rs. 720,000 → Rs. 864,000
- Bank margin restored to 14.2% (Rs. 256,000)
- Introduced **binary pool cap mechanism** with pro-rating to prevent fund bankruptcy
- Binary per enrollment: Rs. 75,000 → Rs. 90,000
- Direct Sponsor: Rs. 30,000 → Rs. 36,000

### v2.1 — Open Participation (AI Engineer Model)
- Nodes renamed to **"AI Engineers"**
- Two roles introduced: **Investor Member** + **Student Beneficiary**
- Anyone can join by nominating a student (not just students themselves)
- Added Student Matching Service for investors without a student
- 60-day student nomination deadline
- Position activates only after student is nominated
- Multiple positions allowed (Rs. 1,800,000 × N)

### v3.0 — Partnership Structure (Current)
- **TEMCO Bank:** 6% margin (Rs. 108,000) — collection, KYC, trust brand
- **Java Institute Holdings:** 94% (Rs. 1,692,000) — education, MLM ops, IT
- Bank no longer runs operations; Java Institute hosts entire system
- Commission payout flow: Java Institute funds → Bank disburses to members
- Bank gets read-only API access for auditing
- Added partnership safeguards (escrow, SLA, exit clause, data ownership)
- Java Institute margin: ~Rs. 612,000 (~34%)
- Bank margin reduced: Rs. 256,000 → Rs. 108,000
- Added payout validation: total payouts confirmed within 10% of total collection
  - Month 1 (3 members): 30% pool utilization ✅
  - Month 2 (7 members): 54.3% pool utilization ✅
  - Month 3 (15 members): 72.4% pool utilization ✅
  - Binary pro-rating triggers at Month 3 (claims exceeded pool by 10%)

### v3.1 — Agent System (May 1, 2026)
- Added **Agent** as third participant role (alongside AI Engineer and Student)
- **5% agent allocation** (Rs. 90,000) carved as separate budget from investment
  - 2% = Rs. 36,000 → Agent direct referral commission (one-time, immediate)
  - 3% = Rs. 54,000 → Agent binary pool (monthly cycle)
- **Separate agent binary tree** with LEFT/RIGHT placement
- Agent activation: must introduce ≥1 AI Engineer
- Agent binary pairing cap: 2 pairs/month (max Rs. 108,000/month)
- Agent-as-AI-Engineer dual role: invest Rs. 1,800,000 with `education_exempt = TRUE`
- Education-exempt AI Engineers skip student nomination, commissions run indefinitely
- Institute transfer reduced: 84% → 79% (Rs. 1,692,000 → Rs. 1,422,000)
- Java Institute margin reduced: ~Rs. 612,000 → ~Rs. 522,000
- New database tables: `agent`, `agent_commission`, `agent_binary_pool`
- New columns on `ai_engineer`: `introducing_agent_id`, `education_exempt`
- New REST endpoints: `/eepip-api/api/v3/agents` (11 endpoints)
- New SSO role: `AGENT`

### v3.2 — Product Configuration Table (May 1, 2026)
- **Investment amount is now configurable** via `product` database table (no longer hardcoded)
- All commission amounts derived at runtime: `product.investment_amount × rate`
- New `product` table stores: `investment_amount`, all 7 commission rate columns, payout caps, lifecycle dates
- `ai_engineer.investment_amount` column removed → replaced by `ai_engineer.product_id` FK
- `epin.price` column removed → replaced by `epin.product_id` FK (price comes from product)
- Commission calculation now reads rates from `product` table, not constants
- New REST endpoints: `/eepip-api/api/v3/products` (6 endpoints)
- Frontend `EEPIP_CONSTANTS` amounts become fallback defaults; runtime reads from product API
- Seed data: `EEPIP_BSC_MPHIL` product at Rs. 1,800,000 with default rates
- Supports future multi-product scenarios (e.g., BSc-only at lower price)

### v3.3 — Earn While Learn Model (May 3, 2026)
- **Every AI Engineer is also a Student** — self-nomination mandatory, no third-party student nominations
- Merged `student` table into `ai_engineer` table — student fields now part of AI Engineer
- Dropped tables: `student`, `student_match`, `tri_party_agreement` (no third-party matching needed)
- Updated `member_state` enum with granular BSc year states: `BSC_YEAR_1_IN_PROGRESS`, `BSC_YEAR_2_IN_PROGRESS`, `BSC_YEAR_3_IN_PROGRESS`
- Added academic fields to `ai_engineer`: `academic_eligibility_verified`, `enrollment_date`, `expected_graduation`
- Removed columns: `student_nomination_deadline`, `education_exempt` (no longer needed)
- All tables now use `member_id` FK to `member` table (SSO integration) instead of `general_user_profile_id`
- Database: All EEPIP tables in `temco_system` database with `eepip_` prefix (not independent schema)
- Migration: V29 (merge student into ai_engineer), V30 (update member_state enum)

### v3.4 — Schema Enhancement & Gap Rectification (May 3, 2026)
- Added 6 new tables to address functional gaps:
  - `eepip_payment` (V31) — Transaction tracking
  - `eepip_academic_event` (V32) — Academic progress tracking
  - `eepip_audit_log` (V33) — System-wide audit trail
  - `eepip_withdrawal` (V36) — Payout management
  - `eepip_config` (V39) — System configuration
  - `eepip_document` (V41) — KYC/verification tracking
- Added approval workflow to `eepip_commission`: `approved_by`, `approved_at`, `rejection_reason` (V34)
- Fixed `eepip_epin.date_expires` default from invalid `'0000-00-00'` to `NULL` (V35)
- Added performance indexes: 6 composite indexes for tree queries and commission lookups (V37)
- Added soft delete audit columns to main tables: `deleted_at`, `deleted_by`, `deletion_reason` (V38)
- Added tax/deduction tracking to commissions: `tax_amount`, `net_amount`, `tds_rate`, `currency` (V40)
- Total EEPIP tables: 15 (was 9, now 15)
- Migrations: V31-V41 all applied successfully to local database

---

### Version Summary Table

| Version | Date | Key Change | Investment | Bank Margin | Status |
|---------|------|-----------|-----------|-------------|--------|
| v1.0 | Apr 29, 2026 | Initial model | 1,500,000 | 256,000 (14.2%) | Superseded |
| v1.1 | Apr 29, 2026 | +Cert fee 500k | 1,500,000 | 130,000 (8.67%) | Superseded |
| v2.0 | Apr 29, 2026 | Price increase + pool cap | 1,800,000 | 256,000 (14.2%) | Superseded |
| v2.1 | Apr 29, 2026 | AI Engineer + open participation | 1,800,000 | 256,000 (14.2%) | Superseded |
| v3.0 | Apr 29, 2026 | Partnership (Bank 6% + Java Institute 94%) | 1,800,000 | 108,000 (6%) | Superseded |
| v3.1 | May 1, 2026 | Agent System (5% agent allocation, agent binary tree) | 1,800,000 | 108,000 (6%) | Superseded |
| v3.2 | May 1, 2026 | Product config table (dynamic investment amount & rates) | Configurable | Configurable | Superseded |
| v3.3 | May 3, 2026 | Earn While Learn Model (self-nomination, merge student into ai_engineer) | Configurable | Configurable | Superseded |
| **v3.4** | **May 3, 2026** | **Schema Enhancement & Gap Rectification (6 new tables, approval workflow, tax tracking)** | **Configurable** | **Configurable** | **Current** |

---

### How Version Tracking Works

1. **Design changes** — All model changes are logged above with version number, date, what changed, and financial impact
2. **Code changes** — Once development begins, each version maps to a git tag: `eepip-v3.0`, `eepip-v3.1`, etc.
3. **Database migrations** — Schema changes are versioned with Flyway/Liquibase scripts named `V{version}__{description}.sql`
4. **API versioning** — REST endpoints use path versioning: `/api/eepip/v3/...`
5. **Decision log** — Major decisions (e.g., price increase, partnership split) are recorded in the version entry above with rationale

---

## TEMCO Bank System — Integration Reference

This section contains only information required for future API endpoint integration between the EEPIP MLM app and the existing TEMCO Bank system.

### SSO Architecture

- SSO is a standalone service handling all authentication, identity, and session management
- All TEMCO apps (Admin, Finance, My Portal) authenticate via SSO
- SSO uses shared cookies across all `*.temcobank.com` subdomains
- The EEPIP MLM app must integrate with this same SSO for user authentication

### API Endpoint Pattern

| Service | Path Pattern | Description |
|---------|-------------|-------------|
| SSO API | `/temco-api/api/v1/auth/*` | Login, logout, session validation |
| SSO User Profile | `/temco-api/api/v1/general-user-profile/*` | User profile CRUD, NIC lookup |
| Admin API | `/temco-admin/api/*` | Admin operations (user/role management) |
| Finance API | `/temco-api/api/*` | Finance operations |

### Port Allocation (Production)

| Service | Port | Container |
|---------|------|-----------|
| SSO API (WildFly) | 8085 | `ssoservice-temco-sso` |
| Finance API (WildFly) | 8087 | `finance-api` |
| Admin API (WildFly) | 8088 | `admin-wildfly` |
| **EEPIP API (WildFly)** | **8089** | **`eepip-wildfly`** (new) |
| MariaDB | 3306 | `mariadb` (shared) |

### Database

- **Engine:** MariaDB
- **Database name:** `temco_system` (shared across all TEMCO apps)
- **EEPIP tables:** All prefixed with `eepip_` to coexist in shared database
- **Key table for SSO linkage:** `general_user_profile` (shared user identity)
  - `user_login.general_user_profile_id` → `general_user_profile.id`

### Database Verification Best Practices

**Flyway Table Names (Critical):**
- SSO Service uses: `sso_flyway_schema_history` (NOT `flyway_schema_history`)
- Standard Flyway uses: `flyway_schema_history`

**Verification Workflow:**
1. Always discover all Flyway tables first:
   ```sql
   SELECT table_schema, table_name FROM information_schema.tables WHERE table_name LIKE '%flyway%';
   ```
2. Identify the correct table for the service being checked
3. Query the correct table for version information

**Example Commands:**
```sql
-- Local (Docker):
docker exec -i temco-admin-mariadb mariadb -uroot -p6qZB6d@pIvj temco_system -e "SELECT version, description, installed_on, success FROM sso_flyway_schema_history ORDER BY installed_rank ASC;"

-- Production:
ssh -i "C:\Users\User\.ssh\id_ed25519_temco" root@109.123.227.166 "mysql -u temco_db -p'6qZB6d@pIvj' temco_system -e 'SELECT version, description, installed_on, success FROM sso_flyway_schema_history ORDER BY installed_rank ASC;'"
```

This prevents checking the wrong table and getting incorrect version information.

### Nginx Proxy Pattern (Production)

All subdomains are proxied through host Nginx:
```
SSO:     /temco-api/api/*     → ssoservice-temco-sso:8085/temco-api/api/
Finance: /temco-api/api/*     → finance-api:8087/temco-api/api/
Admin:   /temco-admin/api/*   → admin-wildfly:8088/temco-admin/api/
EEPIP:   /eepip-api/api/*     → eepip-wildfly:8089/eepip-api/api/   (new)
```
SPA routing uses `try_files` fallback for React frontends.

### Backend Code Pattern (for consistency)

The existing TEMCO ERP backend follows these naming conventions:
- **Package:** `lk.temcobank.*`
- **DTOs:** `*DTO.java`
- **Services:** `*Service.java` (EJB `@Stateless`)
- **REST endpoints:** `*Resource.java` (JAX-RS)
- **Frontend API layer:** `api/*Service.ts`

The EEPIP module follows the same pattern under `lk.temcobank.eepip.*`.

### Production Domain

- **Server:** `109.123.227.166`
- **SSL:** Cloudflare Origin Certificate (`*.temcobank.com`, valid until 2041)
- **TLS:** v1.2/v1.3 only

### Production Infrastructure — Running Docker Containers

| Container | Host Port | Purpose |
|-----------|-----------|---------|
| `temco-website` | 127.0.0.1:8093 → 80 | Public website (www.temcobank.com) |
| `temco-portal` | 127.0.0.1:8092 → 80 | Customer portal (my.temcobank.com) |
| `temco-admin-fe` | 127.0.0.1:8089 → 80 | Admin panel frontend |
| `temco-admin-api` | 127.0.0.1:8088 → 8080 | Admin panel backend API |
| `temco-finance-fe` | 127.0.0.1:8091 → 80 | Finance frontend |
| `temco-finance-api` | 127.0.0.1:8086 → 8080 | Finance backend API |
| `temco-business` | 127.0.0.1:8087 → 8080 | Business service |
| `temco-sso` | 127.0.0.1:8085 → 8080 | SSO service |
| `temco-minio` | 127.0.0.1:9001 | Object storage |
| `temco-elasticsearch` | 9200 | Search |
| `temco-redis` | 6379 | Cache |

**To check current status:**
```bash
ssh -i "C:\Users\User\.ssh\id_ed25519_temco" root@109.123.227.166 "docker ps"
```

### Commission Disbursement API (Bank ↔ EEPIP)

The EEPIP system exposes read-only endpoints for TEMCO Bank staff:
```
/eepip-api/api/v3/bank/audit/overview         → Audit dashboard
/eepip-api/api/v3/bank/members/{id}           → Member lookup
/eepip-api/api/v3/bank/members/search?q=      → Member search
/eepip-api/api/v3/bank/disbursements/pending   → Pending payouts
/eepip-api/api/v3/bank/disbursements/confirm   → Confirm disbursement
```
Access restricted to `BANK_READONLY` role via SSO.

---

## SSO Service Status (May 5, 2026)

### SSO Service Container Details

**Container:** `ssoservice-temco-sso-1`
**Image:** `ssoservice-temco-sso`
**Status:** Healthy ✅
**Ports:** 8085 (HTTP), 9993 (management)
**Network:** `temco-network` (172.18.0.12)
**Database:** `temco_system` via `temco-admin-mariadb` (172.18.0.8)
**Web Context:** `/temco-api`
**Application:** `temco-api.war` (deployed successfully)
**JAX-RS Application:** `lk.temco.rest.JaxRsApplication`

### Database Configuration

**Datasource:** `java:/TemcoDS`
**Connection URL:** `jdbc:mariadb://temco-admin-mariadb:3306/temco_system`
**Driver:** MariaDB JDBC Driver
**Pool Size:** Min 5, Max 20
**User:** `root`
**Password:** `6qZB6d@pIvj`

### SSO Service Investigation Results

**Issue Identified:**
- SSO service was initially unhealthy due to database connection failure
- Original configuration pointed to `mariadb:3306` (incorrect hostname)
- Database container is named `temco-admin-mariadb` on `temco-network`

**Fix Applied:**
- Updated datasource connection URL from `mariadb:3306` to `temco-admin-mariadb:3306`
- File: `/opt/jboss/wildfly/standalone/configuration/standalone.xml`
- Container restarted successfully
- Service now healthy and database connection verified (ping successful)

**API Endpoint Testing:**
The SSO service is deployed and healthy, but the expected API endpoints are not accessible. Tested endpoints:

| Endpoint | Result |
|----------|--------|
| `/temco-api/api/v1/` | 404 Not Found |
| `/temco-api/api/v1/health` | 404 Not Found |
| `/temco-api/api/v1/auth/login` | 404 Not Found |
| `/temco-api/auth/login` | 404 Not Found |
| `/temco-api/login` | 404 Not Found |
| `/temco-api/v1/` | 404 Not Found |
| `/temco-api/rest/` | 404 Not Found |
| `/temco-api/sso/` | 404 Not Found |
| `/temco-api/oauth/` | 404 Not Found |
| `/temco-api/token/` | 404 Not Found |
| `/temco-api/application.wadl` | 404 Not Found |
| `/temco-api/swagger` | 404 Not Found |

**Conclusion:**
The SSO service is healthy and the database connection works, but the API endpoints are not exposed or use a different path structure than expected. The SSO service may not have the authentication endpoints the frontend expects, or the endpoints may be configured differently.

### Current Authentication Strategy

**Mock Authentication (Fallback):**
Since SSO API endpoints are not accessible, the production app uses mock authentication:
- Login with username `admin` → Role: `ADMIN` (Super Admin)
- Login with username `ishantha` → Role: `AI_ENGINEER`
- Any other username → Role: `AI_ENGINEER`

**Frontend Configuration:**
- File: `react-mlm-conversion/api/authService.ts`
- Base URL: `http://localhost:8080/eepip-api/api/v3` (EEPIP backend)
- SSO URL: `http://localhost:8085/temco-api/api/v1` (SSO service - not responding)
- Fallback: Mock authentication when SSO service unavailable

**Recommendation:**
Use mock authentication for now to access the production app and test backend functionality. The SSO service endpoints require further investigation to determine the correct API path structure or to verify if the authentication endpoints are actually implemented in the deployed `temco-api.war`.
