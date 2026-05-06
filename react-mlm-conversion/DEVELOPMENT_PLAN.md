# EEPIP Development Plan — Step-by-Step with Browser Preview Milestones

**Tech Stack:** React + TypeScript + TailwindCSS (Frontend) / JavaEE EJB + JPA + JAX-RS + WildFly + MariaDB (Backend)
**Frontend Port:** 3004
**Backend Port:** 8089
**SSO Port:** 8085

---

## 🎯 Overview

This plan builds the EEPIP MLM application incrementally. Each milestone produces a **browser-visible result** you can preview.

**Prerequisites:**
- Node.js 18+ installed
- Docker Desktop running
- MariaDB accessible (localhost:3306, database: `temco_system`)

---

## MILESTONE 1: Project Foundation (Browser Preview: Blank React App)

**Goal:** Set up the Vite project with basic routing and verify it runs.

**Steps:**
1. Navigate to `f:/Exon/Java_Holdings_MLM/react-mlm-conversion`
2. Run: `npm install`
3. Create `index.html` (entry point)
4. Create `src/main.tsx` (React entry)
5. Create `src/App.tsx` (root component)
6. Create `src/pages/Login.tsx` (placeholder)
7. Create `src/router.tsx` (React Router setup)
8. Run: `npm run dev`

**Browser Preview:** http://localhost:3004
- Should see a blank page with "EEPIP MLM" header
- No functionality yet, just verifies Vite + React works

**Files to create:**
- `index.html`
- `src/main.tsx`
- `src/App.tsx`
- `src/router.tsx`
- `src/pages/Login.tsx`

**Success Criteria:** ✅ Page loads at http://localhost:3004 without errors

---

## MILESTONE 2: Login Page (Browser Preview: Login Form)

**Goal:** Build the SSO login page.

**Steps:**
1. Update `src/pages/Login.tsx` with login form
2. Use existing `components/common/Button.tsx`
3. Add TailwindCSS classes for styling
4. Connect to `api/authService.ts` (mock response first)
5. Test form submission

**Browser Preview:** http://localhost:3004/login
- Username/password fields
- Login button
- Shows "Login successful" alert on submit (mock)

**Files to create/update:**
- `src/pages/Login.tsx` (update)
- `tailwind.config.js` (create)
- `src/index.css` (create — Tailwind directives)

**Success Criteria:** ✅ Form renders, button clickable, alert shows on submit

---

## MILESTONE 3: Dashboard Shell (Browser Preview: Dashboard Layout)

**Goal:** Build the main dashboard layout with navigation.

**Steps:**
1. Create `src/layouts/MainLayout.tsx` (sidebar + header)
2. Create `src/pages/Dashboard.tsx` (stats cards placeholder)
3. Create `src/pages/Tree.tsx` (placeholder)
4. Create `src/pages/Commissions.tsx` (placeholder)
5. Update router with all pages
6. Add navigation logic

**Browser Preview:** http://localhost:3004/dashboard
- Sidebar with navigation: Dashboard, Tree, Commissions, Profile
- Header with user name (mock)
- Main content area with "Dashboard" heading
- Empty stats cards (placeholders)

**Files to create:**
- `src/layouts/MainLayout.tsx`
- `src/pages/Dashboard.tsx`
- `src/pages/Tree.tsx`
- `src/pages/Commissions.tsx`
- `src/pages/Profile.tsx`

**Success Criteria:** ✅ Navigation works, pages switch without reload

---

## MILESTONE 4: Mock Dashboard Data (Browser Preview: Dashboard with Stats)

**Goal:** Display dashboard stats using mock data.

**Steps:**
1. Create `src/data/mockData.ts` (sample AI Engineer data)
2. Update `src/pages/Dashboard.tsx` to display:
   - Total earnings: Rs. 654,000
   - This month: Rs. 270,000
   - Left BV: 15, Right BV: 12
   - Rank: Silver
   - Team size: 47
3. Add TailwindCSS card styling

**Browser Preview:** http://localhost:3004/dashboard
- 4-6 stat cards with numbers
- Rank badge
- Recent commissions table (mock data)

**Files to create/update:**
- `src/data/mockData.ts`
- `src/pages/Dashboard.tsx` (update)
- `src/components/Dashboard/StatsCard.tsx` (create)

**Success Criteria:** ✅ Stats display with correct formatting (LKR currency)

---

## MILESTONE 5: Binary Tree Visualization (Browser Preview: Interactive Tree)

**Goal:** Display the binary tree using existing `BinaryTree.tsx`.

**Steps:**
1. Move `components/mlm/BinaryTree.tsx` to `src/components/BinaryTree.tsx`
2. Update to use `AIEngineer` type (not `MLMMember`)
3. Connect mock tree data from `mockData.ts`
4. Implement expand/collapse functionality
5. Add node styling based on status

**Browser Preview:** http://localhost:3004/tree
- Tree visualization with nodes
- Click node to expand/collapse
- Color coding: Active (green), Pending (yellow), Inactive (gray)
- BV displayed on each node
- Tree statistics: Total nodes, active nodes, depth

**Files to update:**
- `src/components/BinaryTree.tsx` (move and update)
- `src/pages/Tree.tsx` (update)
- `src/data/mockData.ts` (add tree data)

**Success Criteria:** ✅ Tree renders, nodes clickable, expand/collapse works

---

## MILESTONE 6: Commission Table (Browser Preview: Commission List)

**Goal:** Display commission history table.

**Steps:**
1. Create `src/components/Commissions/CommissionTable.tsx`
2. Add mock commission data to `mockData.ts`
3. Display columns: Date, Type, Amount, Status
4. Add filter dropdown (Type, Status)
5. Add pagination (mock)

**Browser Preview:** http://localhost:3004/commissions
- Table with 10 mock commissions
- Type filter: Direct Sponsor, Binary, Matching, Leadership
- Status filter: Pending, Approved, Paid
- Pagination controls

**Files to create:**
- `src/components/Commissions/CommissionTable.tsx`
- `src/pages/Commissions.tsx` (update)
- `src/data/mockData.ts` (add commissions)

**Success Criteria:** ✅ Table displays, filters work, pagination visible

---

## MILESTONE 7: Registration Form (Browser Preview: Multi-step Enrollment)

**Goal:** Build the new enrollment form.

**Steps:**
1. Create `src/pages/Register.tsx`
2. Create multi-step wizard:
   - Step 1: AI Engineer personal info
   - Step 2: Student nomination (optional)
   - Step 3: Placement (sponsor + leg)
   - Step 4: Payment details
   - Step 5: Review & submit
3. Add form validation
4. Use `Button.tsx` for navigation

**Browser Preview:** http://localhost:3004/register
- Multi-step form with progress indicator
- Form fields for each step
- Back/Next buttons
- Submit on final step
- Success message on completion

**Files to create:**
- `src/pages/Register.tsx`
- `src/components/Register/StepIndicator.tsx`
- `src/components/Register/PersonalInfoForm.tsx`
- `src/components/Register/StudentForm.tsx`
- `src/components/Register/PlacementForm.tsx`

**Success Criteria:** ✅ Form navigates through all steps, validation works

---

## MILESTONE 8: Connect to Backend API (Browser Preview: Real Data)

**Goal:** Connect frontend to JavaEE backend (requires backend to be running).

**Prerequisites:** Backend WildFly server running on port 8089

**Steps:**
1. Update `api/apiClient.ts` to point to actual backend
2. Replace mock data with real API calls in services
3. Update Dashboard to fetch from `aiEngineerService.getDashboard()`
4. Update Tree to fetch from `treeService.getTree()`
5. Update Commissions to fetch from `commissionService.getCommissions()`
6. Add loading states and error handling

**Browser Preview:** http://localhost:3004/dashboard
- Real data from backend
- Loading spinners during fetch
- Error messages if backend unavailable

**Files to update:**
- `api/apiClient.ts` (verify BASE_URL)
- `src/pages/Dashboard.tsx` (real API call)
- `src/pages/Tree.tsx` (real API call)
- `src/pages/Commissions.tsx` (real API call)

**Success Criteria:** ✅ Displays real data from backend, handles errors gracefully

---

## MILESTONE 9: SSO Integration (Browser Preview: Real Login)

**Goal:** Connect to TEMCO SSO service.

**Prerequisites:** SSO service running on port 8085

**Steps:**
1. Update `api/authService.ts` to call actual SSO endpoint
2. Implement session validation on page load
3. Redirect to login if not authenticated
4. Store JWT token in localStorage
5. Add logout functionality

**Browser Preview:** http://localhost:3004
- Redirects to /login if not authenticated
- Login sends request to SSO
- Successful login stores token and redirects to dashboard
- Logout clears token and redirects to login

**Files to update:**
- `src/pages/Login.tsx` (real SSO call)
- `src/router.tsx` (add auth guard)
- `src/layouts/MainLayout.tsx` (add logout button)

**Success Criteria:** ✅ Real SSO authentication works

---

## MILESTONE 10: Student Matching UI (Browser Preview: Student Matching)

**Goal:** Build the student matching service interface.

**Steps:**
1. Create `src/pages/StudentMatch.tsx`
2. Display student candidate list
3. Add "Request Match" button
4. Add candidate cards with academic score
5. Add tri-party agreement preview

**Browser Preview:** http://localhost:3004/student-match
- List of eligible students
- Academic eligibility status
- "Select" button on each candidate
- Confirmation modal
- Success message after match

**Files to create:**
- `src/pages/StudentMatch.tsx`
- `src/components/StudentMatch/CandidateCard.tsx`
- `src/components/StudentMatch/AgreementPreview.tsx`

**Success Criteria:** ✅ Student list displays, selection works

---

## MILESTONE 11: Bank Admin View (Browser Preview: Bank Dashboard)

**Goal:** Build bank read-only dashboard.

**Steps:**
1. Create `src/pages/BankDashboard.tsx`
2. Display audit overview stats
3. Add member search
4. Add disbursement list
5. Add "Confirm Disbursement" action

**Browser Preview:** http://localhost:3004/bank
- Total AI Engineers, Total Investment, Total Commissions Paid
- Search input for member lookup
- Pending disbursements table
- Approve/Reject buttons

**Files to create:**
- `src/pages/BankDashboard.tsx`
- `src/components/Bank/OverviewStats.tsx`
- `src/components/Bank/MemberSearch.tsx`
- `src/components/Bank/DisbursementTable.tsx`

**Success Criteria:** ✅ Bank dashboard displays, search works

---

## MILESTONE 12: Responsive Design & Polish (Browser Preview: Mobile-Ready)

**Goal:** Ensure app works on mobile devices.

**Steps:**
1. Add mobile sidebar toggle
2. Adjust layouts for small screens
3. Add touch-friendly interactions
4. Test on viewport sizes: 375px (mobile), 768px (tablet), 1024px (desktop)
5. Add loading skeletons

**Browser Preview:** http://localhost:3004 (on mobile viewport)
- Sidebar collapses to hamburger menu
- Tables scroll horizontally
- Cards stack vertically
- Touch targets are 44px minimum

**Files to update:**
- `src/layouts/MainLayout.tsx` (mobile menu)
- All components (responsive Tailwind classes)
- `tailwind.config.js` (mobile-first config)

**Success Criteria:** ✅ App works on mobile viewport

---

## MILESTONE 13: Production Build (Browser Preview: Production Build)

**Goal:** Build for production and verify.

**Steps:**
1. Run: `npm run build`
2. Run: `npm run preview`
3. Test production build locally
4. Verify all assets load
5. Verify API calls work

**Browser Preview:** http://localhost:4173 (Vite preview server)
- Production-optimized build
- Minified CSS/JS
- All functionality works

**Success Criteria:** ✅ Production build runs without errors

---

## MILESTONE 14: Docker Deployment (Browser Preview: Docker Container)

**Goal:** Deploy frontend as Docker container.

**Steps:**
1. Create `Dockerfile` (multi-stage: build → nginx)
2. Create `nginx.conf`
3. Build Docker image
4. Run container
5. Test in browser

**Browser Preview:** http://localhost:8092 (or configured port)
- Running in Docker
- Static files served by nginx
- API proxy configured

**Files to create:**
- `Dockerfile`
- `nginx.conf`
- `.dockerignore`

**Success Criteria:** ✅ App runs in Docker container

---

## MILESTONE 15: Agent Dashboard (Browser Preview: Agent Dashboard)

**Goal:** Build agent-specific dashboard with referral tracking and commission breakdown.

**Steps:**
1. Create `src/pages/AgentDashboard.tsx`
2. Create `src/components/Agent/AgentStatsCard.tsx` (Total Referrals, Total Commission, Active Referrals, Pairing Status)
3. Create `src/components/Agent/ReferralTable.tsx` (List of directly introduced AI Engineers)
4. Create `src/components/Agent/PoolStatusCard.tsx` (Binary pool status, monthly pairs, pairing cap)
5. Create `src/components/Agent/CommissionBreakdown.tsx` (2% direct + 3% pool split visualization)
6. Add mock agent data to `src/data/mockData.ts`
7. Add agent route to router
8. Add "Agent Dashboard" nav link (visible only for Agent role)

**Browser Preview:** http://localhost:3004/agent-dashboard
- 4 stat cards: Total Referrals, Total Commission (5% budget), Active Referrals, Pairing Status
- Referral table with: Name, ID, Investment, Commission Earned, Status
- Pool status card with: Current Month Pairs, Pairing Cap (2/month), Pool Share Amount
- Commission breakdown visual: 2% Direct (Rs. 36,000) + 3% Pool (Rs. 54,000) per Rs. 1.8M
- Activation status indicator (Active if ≥1 referral)
- Dual role badge (Agent + AI Engineer)
- Monthly pairing progress bar (max 2 pairs = Rs. 108,000)

**Files to create:**
- `src/pages/AgentDashboard.tsx`
- `src/components/Agent/AgentStatsCard.tsx`
- `src/components/Agent/ReferralTable.tsx`
- `src/components/Agent/PoolStatusCard.tsx`
- `src/components/Agent/CommissionBreakdown.tsx`

**Files to update:**
- `src/router.tsx` (add /agent-dashboard route)
- `src/layouts/MainLayout.tsx` (add Agent Dashboard nav link, role-based)
- `src/data/mockData.ts` (add mock agent data)

**Success Criteria:** ✅ Agent dashboard displays all stats, tables show data, role-based access works

---

## MILESTONE 16: Admin Panel - User Management (Browser Preview: Admin Users)

**Goal:** Build admin panel for user management (list, create, edit, deactivate users).

**Steps:**
1. Create `src/pages/AdminPanel.tsx` (admin panel shell with tabs)
2. Create `src/components/Admin/UserTable.tsx` (List all users with filters)
3. Create `src/components/Admin/UserForm.tsx` (Create/Edit user modal)
4. Create `src/components/Admin/RoleBadge.tsx` (Role indicator: AI_ENGINEER, AGENT, BANK_ADMIN, SYSTEM_ADMIN)
5. Add mock users data to `src/data/mockData.ts`
6. Implement user search by name, ID, email, NIC, role, status
7. Implement bulk actions (activate/deactivate)
8. Add admin route to router (protected: SYSTEM_ADMIN only)

**Browser Preview:** http://localhost:3004/admin/users
- User table with: Name, Email, Phone, NIC, Role, Status, Join Date, Actions
- Search bar with filters (Role, Status)
- "Add User" button
- Edit/Delete actions per row
- Bulk selection checkboxes
- Bulk Activate/Deactivate buttons
- Pagination

**Files to create:**
- `src/pages/AdminPanel.tsx`
- `src/components/Admin/UserTable.tsx`
- `src/components/Admin/UserForm.tsx`
- `src/components/Admin/RoleBadge.tsx`
- `src/components/Admin/SearchBar.tsx`

**Files to update:**
- `src/router.tsx` (add /admin/* routes with admin guard)
- `src/layouts/MainLayout.tsx` (add Admin Panel nav link, SYSTEM_ADMIN only)
- `src/data/mockData.ts` (add mock users with roles)

**Success Criteria:** ✅ User table displays, search/filter works, create/edit/deactivate actions work, admin-only access

---

## MILESTONE 17: Admin Panel - Agent Appointment & Product Management (Browser Preview: Admin Agent/Product)

**Goal:** Add agent appointment and product management to admin panel.

**Steps:**
1. Create `src/components/Admin/AgentAppointmentForm.tsx` (Appoint new agent modal)
2. Create `src/components/Admin/ProductTable.tsx` (List products)
3. Create `src/components/Admin/ProductForm.tsx` (Create/Edit product modal)
4. Add mock products data to `src/data/mockData.ts`
5. Implement product fields: Product Code, Name, Investment Amount, 7 Commission Rates, 2 Payout Caps, Lifecycle Dates
6. Add tabs to AdminPanel.tsx: Users, Agents, Products, Config, Logs

**Browser Preview:** http://localhost:3004/admin/agents and http://localhost:3004/admin/products
- Agent Appointment tab: Select user, appoint as agent, view appointment history
- Product Management tab: Table with Product Code, Name, Investment, Status
- Add/Edit Product modal with all commission rate fields
- Product activation/deactivation toggle

**Files to create:**
- `src/components/Admin/AgentAppointmentForm.tsx`
- `src/components/Admin/ProductTable.tsx`
- `src/components/Admin/ProductForm.tsx`
- `src/components/Admin/TabNavigation.tsx`

**Files to update:**
- `src/pages/AdminPanel.tsx` (add tabs)
- `src/data/mockData.ts` (add mock products)

**Success Criteria:** ✅ Agent appointment works, product CRUD works, tabs navigate correctly

---

## MILESTONE 18: Admin Panel - System Configuration & Audit Logs (Browser Preview: Admin Config/Logs)

**Goal:** Add system configuration and audit logs to admin panel.

**Steps:**
1. Create `src/components/Admin/ConfigForm.tsx` (System configuration form)
2. Create `src/components/Admin/AuditLogTable.tsx` (Audit log viewer)
3. Create `src/components/Admin/EPINGenerator.tsx` (Bulk EPIN generation)
4. Add mock config and audit log data to `src/data/mockData.ts`
5. Implement config fields: Commission rates, Pairing caps, Payout caps
6. Implement audit log columns: Timestamp, User, Action, Entity, Details
7. Implement EPIN generation: Select product, quantity, generate codes

**Browser Preview:** http://localhost:3004/admin/config and http://localhost:3004/admin/logs
- Config tab: Form with all commission rates and caps, Save button
- Audit Logs tab: Table with filters (User, Action, Date range)
- EPIN Generation tab: Product selector, Quantity input, Generate button, Results list

**Files to create:**
- `src/components/Admin/ConfigForm.tsx`
- `src/components/Admin/AuditLogTable.tsx`
- `src/components/Admin/EPINGenerator.tsx`

**Files to update:**
- `src/pages/AdminPanel.tsx` (add Config, Logs, EPIN tabs)
- `src/data/mockData.ts` (add config and audit logs)

**Success Criteria:** ✅ Config saves, audit logs display and filter, EPIN generation works

---

## MILESTONE 19: Reports - Report Generator (Browser Preview: Reports)

**Goal:** Build report generation interface with filters and export.

**Steps:**
1. Create `src/pages/Reports.tsx` (Reports shell with report type selector)
2. Create `src/components/Reports/ReportGenerator.tsx` (Report form with filters)
3. Create `src/components/Reports/ReportFilters.tsx` (Date range, user, type, status filters)
4. Create `src/components/Reports/ReportTable.tsx` (Report results display)
5. Create `src/components/Reports/ExportButton.tsx` (CSV/PDF/Excel export)
6. Add mock report data to `src/data/mockData.ts`
7. Implement report types: Commission, Investment, Disbursement, Agent Performance, Binary Tree, EPIN Usage

**Browser Preview:** http://localhost:3004/reports
- Report type selector (dropdown)
- Filter panel: Date range, User selector, Type filter, Status filter
- "Generate Report" button
- Results table with report-specific columns
- Export buttons: CSV, PDF, Excel
- Schedule report checkbox (future: implement scheduling)

**Files to create:**
- `src/pages/Reports.tsx`
- `src/components/Reports/ReportGenerator.tsx`
- `src/components/Reports/ReportFilters.tsx`
- `src/components/Reports/ReportTable.tsx`
- `src/components/Reports/ExportButton.tsx`

**Files to update:**
- `src/router.tsx` (add /reports route)
- `src/layouts/MainLayout.tsx` (add Reports nav link)
- `src/data/mockData.ts` (add mock report data)

**Success Criteria:** ✅ Report type selection works, filters apply, results display, export buttons trigger download

---

## MILESTONE 20: Reports - Dashboard Charts & Scheduling (Browser Preview: Reports Charts)

**Goal:** Add visual charts and report scheduling to reports module.

**Steps:**
1. Install charting library (recharts or chart.js)
2. Create `src/components/Reports/ReportChart.tsx` (Bar/Line/Pie charts)
3. Create `src/components/Reports/ScheduleForm.tsx` (Schedule automated report)
4. Implement charts for: Commission trends, Investment by product, Agent rankings
5. Implement scheduling: Daily/Weekly/Monthly, Email recipients
6. Add mock chart data to `src/data/mockData.ts`

**Browser Preview:** http://localhost:3004/reports
- Commission trend chart (line chart over time)
- Investment by product (bar chart)
- Agent performance rankings (horizontal bar chart)
- "Schedule Report" button
- Schedule modal: Frequency, Recipients, Report Type

**Files to create:**
- `src/components/Reports/ReportChart.tsx`
- `src/components/Reports/ScheduleForm.tsx`

**Files to update:**
- `src/pages/Reports.tsx` (add chart sections)
- `src/data/mockData.ts` (add chart data)
- `package.json` (add charting library)

**Success Criteria:** ✅ Charts render with data, scheduling form submits

---

## MILESTONE 21: Performance - Code Splitting (Browser Preview: Optimized Build)

**Goal:** Implement route-based code splitting with React.lazy().

**Steps:**
1. Update `src/router.tsx` to use React.lazy() for all routes
2. Create `src/components/common/SuspenseFallback.tsx` (Loading component)
3. Wrap lazy routes with React.Suspense
4. Update `vite.config.ts` to enable manual chunks if needed
5. Run `npm run build` and analyze bundle size
6. Verify initial bundle < 100 KB

**Browser Preview:** http://localhost:3004 (dev mode with network tab)
- Open Network tab in DevTools
- Navigate between routes
- Observe lazy-loaded chunks loading on demand
- Initial JS bundle should be smaller

**Files to create:**
- `src/components/common/SuspenseFallback.tsx`

**Files to update:**
- `src/router.tsx` (implement React.lazy for all routes)
- `vite.config.ts` (optional: manual chunk configuration)

**Success Criteria:** ✅ Initial bundle < 100 KB, chunks load on route navigation, no errors

---

## MILESTONE 22: Performance - Lazy Loading (Browser Preview: Lazy Components)

**Goal:** Implement lazy loading for components below fold and images.

**Steps:**
1. Identify components below fold (CommissionTable, Tree, large tables)
2. Wrap heavy components with React.lazy()
3. Add `loading="lazy"` to all `<img>` tags
4. Implement Intersection Observer for lazy loading images
5. Create `src/utils/lazyImage.ts` (utility for lazy images)
6. Test Lighthouse score before and after

**Browser Preview:** http://localhost:3004/dashboard
- Scroll down to see components load
- Images load as they enter viewport
- Lighthouse Performance score should improve

**Files to create:**
- `src/utils/lazyImage.ts`

**Files to update:**
- All pages with images (add loading="lazy")
- Heavy components (wrap with React.lazy)
- `src/pages/Dashboard.tsx` (lazy load CommissionTable)
- `src/pages/Tree.tsx` (lazy load TreeVisualization)

**Success Criteria:** ✅ Images lazy load, components lazy load, Lighthouse score improves

---

## MILESTONE 23: Performance - Caching Strategy (Browser Preview: Cached Data)

**Goal:** Implement service worker for offline support and API response caching.

**Steps:**
1. Install Workbox (Vite PWA plugin)
2. Create `vite.config.ts` PWA configuration
3. Register service worker in `src/main.tsx`
4. Implement API response caching with SWR or React Query
5. Add localStorage caching for user data
6. Create `src/utils/cache.ts` (cache utilities)
7. Test offline functionality

**Browser Preview:** http://localhost:3004
- Open DevTools Application tab
- Verify service worker registered
- Go offline, app should still load
- API responses cached, subsequent loads faster

**Files to create:**
- `src/utils/cache.ts`
- `public/sw.js` (Workbox generated)

**Files to update:**
- `src/main.tsx` (register service worker)
- `package.json` (add vite-plugin-pwa)
- `vite.config.ts` (PWA config)
- API services (implement caching)

**Success Criteria:** ✅ Service worker registered, app works offline, API responses cached

---

## MILESTONE 24: Performance - Image Optimization & Bundle Analysis (Browser Preview: Optimized Assets)

**Goal:** Optimize images (WebP, responsive) and set up bundle analysis.

**Steps:**
1. Install image optimization plugin (vite-plugin-imagemin)
2. Convert all images to WebP format with fallbacks
3. Implement responsive images (srcset, sizes)
4. Install bundle analyzer (rollup-plugin-visualizer)
5. Run bundle analysis and identify optimization opportunities
6. Optimize based on analysis results

**Browser Preview:** http://localhost:3004
- Images load as WebP (check Network tab)
- Images are responsive (check DevTools)
- Bundle analyzer report generated

**Files to create:**
- `vite.config.ts` (add image optimization and bundle analyzer)

**Files to update:**
- All image usages (use WebP with fallback)
- `package.json` (add vite-plugin-imagemin, rollup-plugin-visualizer)

**Success Criteria:** ✅ Images served as WebP, responsive images work, bundle analysis report generated

---

## MILESTONE 25: Performance - Route Preloading (Browser Preview: Preloaded Routes)

**Goal:** Implement route preloading on hover/intent for faster navigation.

**Steps:**
1. Create `src/utils/preloadRoute.ts` (route preloading utility)
2. Add hover listeners to nav links in MainLayout
3. Preload routes on mouse hover or touch
4. Test navigation speed improvement
5. Measure Time to Interactive (TTI)

**Browser Preview:** http://localhost:3004
- Hover over nav links
- Observe preloading in Network tab
- Click link, navigation should be instant

**Files to create:**
- `src/utils/preloadRoute.ts`

**Files to update:**
- `src/layouts/MainLayout.tsx` (add hover preloading to nav links)

**Success Criteria:** ✅ Routes preload on hover, navigation is instant, TTI improves

---

## MILESTONE 26: Final Testing & Documentation (Browser Preview: Production Ready)

**Goal:** Final testing, Lighthouse audit, and documentation update.

**Steps:**
1. Run Lighthouse audit (Performance, Accessibility, Best Practices, SEO)
2. Fix any Lighthouse issues (target: 90+ scores)
3. Test all new features: Agent Dashboard, Admin Panel, Reports
4. Test performance optimizations: code splitting, lazy loading, caching
5. Update spec.md with completed features
6. Update DEVELOPMENT_PLAN.md with completion status
7. Create user guide for new features

**Browser Preview:** http://localhost:4173 (production build)
- Lighthouse scores: Performance 90+, Accessibility 95+, Best Practices 90+, SEO 90+
- All features functional
- Performance optimizations verified

**Files to update:**
- `spec.md` (update version to 2.0, mark features as implemented)
- `DEVELOPMENT_PLAN.md` (mark all milestones complete)
- Create `USER_GUIDE.md` (guide for Agent Dashboard, Admin Panel, Reports)

**Success Criteria:** ✅ Lighthouse scores 90+, all features work, documentation complete

---

## 📋 Quick Start Commands

```bash
# Navigate to project
cd f:/Exon/Java_Holdings_MLM/react-mlm-conversion

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🔍 Browser Preview Checklist

At each milestone, verify:
- [ ] Page loads without console errors
- [ ] UI renders correctly
- [ ] Buttons are clickable
- [ ] Forms accept input
- [ ] Navigation works
- [ ] Data displays (mock or real)
- [ ] Responsive layout (test multiple viewports)

---

## 📁 File Structure After Milestone 14 (Phase 1 Complete)

```
react-mlm-conversion/
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── router.tsx
│   ├── index.css
│   ├── api/                    (existing)
│   │   ├── apiClient.ts
│   │   ├── authService.ts
│   │   ├── aiEngineerService.ts
│   │   ├── treeService.ts
│   │   ├── commissionService.ts
│   │   └── bankService.ts
│   ├── components/
│   │   ├── common/
│   │   │   └── Button.tsx      (existing)
│   │   ├── BinaryTree.tsx      (moved from components/mlm)
│   │   ├── Dashboard/
│   │   │   └── StatsCard.tsx
│   │   ├── Commissions/
│   │   │   └── CommissionTable.tsx
│   │   ├── Register/
│   │   │   ├── StepIndicator.tsx
│   │   │   ├── PersonalInfoForm.tsx
│   │   │   ├── StudentForm.tsx
│   │   │   └── PlacementForm.tsx
│   │   ├── StudentMatch/
│   │   │   ├── CandidateCard.tsx
│   │   │   └── AgreementPreview.tsx
│   │   └── Bank/
│   │       ├── OverviewStats.tsx
│   │       ├── MemberSearch.tsx
│   │       └── DisbursementTable.tsx
│   ├── layouts/
│   │   └── MainLayout.tsx
│   ├── pages/
│   │   ├── Login.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Tree.tsx
│   │   ├── Commissions.tsx
│   │   ├── Profile.tsx
│   │   ├── Register.tsx
│   │   ├── StudentMatch.tsx
│   │   └── BankDashboard.tsx
│   └── data/
│       └── mockData.ts
├── types/
│   └── mlm.types.ts             (existing)
├── utils/
│   └── cn-simple.ts             (existing)
├── styles/
│   └── conversion-reference.md  (existing)
├── index.html
├── vite.config.ts               (existing)
├── tailwind.config.js
├── tsconfig.json                (existing)
├── package.json                 (existing)
├── Dockerfile
├── nginx.conf
└── .env.example                 (existing)
```

## 📁 File Structure After Milestone 26 (Phase 2 Complete)

```
react-mlm-conversion/
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── router.tsx
│   ├── index.css
│   ├── api/                    (existing + new)
│   │   ├── apiClient.ts
│   │   ├── authService.ts
│   │   ├── aiEngineerService.ts
│   │   ├── treeService.ts
│   │   ├── commissionService.ts
│   │   ├── bankService.ts
│   │   ├── agentService.ts      (new - M15)
│   │   ├── adminService.ts      (new - M16-18)
│   │   └── reportService.ts     (new - M19-20)
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.tsx
│   │   │   ├── LoadingSkeleton.tsx
│   │   │   └── SuspenseFallback.tsx  (new - M21)
│   │   ├── BinaryTree.tsx
│   │   ├── Dashboard/
│   │   │   └── StatsCard.tsx
│   │   ├── Commissions/
│   │   │   └── CommissionTable.tsx
│   │   ├── Register/
│   │   │   ├── StepIndicator.tsx
│   │   │   ├── PersonalInfoForm.tsx
│   │   │   ├── StudentForm.tsx
│   │   │   └── PlacementForm.tsx
│   │   ├── StudentMatch/
│   │   │   ├── CandidateCard.tsx
│   │   │   └── AgreementPreview.tsx
│   │   ├── Bank/
│   │   │   ├── OverviewStats.tsx
│   │   │   ├── MemberSearch.tsx
│   │   │   └── DisbursementTable.tsx
│   │   ├── Agent/               (new - M15)
│   │   │   ├── AgentStatsCard.tsx
│   │   │   ├── ReferralTable.tsx
│   │   │   ├── PoolStatusCard.tsx
│   │   │   └── CommissionBreakdown.tsx
│   │   ├── Admin/               (new - M16-18)
│   │   │   ├── UserTable.tsx
│   │   │   ├── UserForm.tsx
│   │   │   ├── RoleBadge.tsx
│   │   │   ├── SearchBar.tsx
│   │   │   ├── AgentAppointmentForm.tsx
│   │   │   ├── ProductTable.tsx
│   │   │   ├── ProductForm.tsx
│   │   │   ├── TabNavigation.tsx
│   │   │   ├── ConfigForm.tsx
│   │   │   ├── AuditLogTable.tsx
│   │   │   └── EPINGenerator.tsx
│   │   └── Reports/             (new - M19-20)
│   │       ├── ReportGenerator.tsx
│   │       ├── ReportFilters.tsx
│   │       ├── ReportTable.tsx
│   │       ├── ExportButton.tsx
│   │       ├── ReportChart.tsx
│   │       └── ScheduleForm.tsx
│   ├── layouts/
│   │   └── MainLayout.tsx
│   ├── pages/
│   │   ├── Login.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Tree.tsx
│   │   ├── Commissions.tsx
│   │   ├── Profile.tsx
│   │   ├── Register.tsx
│   │   ├── StudentMatch.tsx
│   │   ├── BankDashboard.tsx
│   │   ├── AgentDashboard.tsx   (new - M15)
│   │   ├── AdminPanel.tsx       (new - M16-18)
│   │   └── Reports.tsx          (new - M19-20)
│   ├── data/
│   │   └── mockData.ts
│   └── utils/                   (new - M22-25)
│       ├── cn-simple.ts
│       ├── lazyImage.ts
│       ├── cache.ts
│       └── preloadRoute.ts
├── types/
│   └── mlm.types.ts
├── styles/
│   └── conversion-reference.md
├── public/
│   └── sw.js                   (new - M23, Workbox generated)
├── index.html
├── vite.config.ts              (updated - M21, M23, M24)
├── tailwind.config.js
├── tsconfig.json
├── package.json                (updated - M20, M23, M24)
├── Dockerfile
├── nginx.conf
├── .env.example
├── spec.md                     (updated - M26)
└── USER_GUIDE.md               (new - M26)
```

---

## ⏱️ Estimated Timeline

### Phase 1: Core Application (Milestones 1-14) - COMPLETED ✅

| Milestone | Time | Browser Preview | Status |
|-----------|------|-----------------|--------|
| 1 | 30 min | Blank app | ✅ |
| 2 | 1 hour | Login form | ✅ |
| 3 | 1.5 hours | Dashboard layout | ✅ |
| 4 | 1 hour | Dashboard with stats | ✅ |
| 5 | 2 hours | Binary tree | ✅ |
| 6 | 1.5 hours | Commission table | ✅ |
| 7 | 2.5 hours | Registration form | ✅ |
| 8 | 2 hours | Real API integration | ✅ |
| 9 | 1.5 hours | SSO integration | ✅ |
| 10 | 2 hours | Student matching | ✅ |
| 11 | 1.5 hours | Bank dashboard | ✅ |
| 12 | 2 hours | Responsive design | ✅ |
| 13 | 1 hour | Production build | ✅ |
| 14 | 1.5 hours | Docker deployment | ✅ |
| **Phase 1 Total** | **~21 hours** | **14 milestones** | **Complete** |

### Phase 2: Advanced Features (Milestones 15-26) - PENDING

| Milestone | Time | Browser Preview | Deliverables |
|-----------|------|-----------------|--------------|
| 15 | 3 hours | Agent Dashboard | Agent stats, referrals, pool status, commission breakdown |
| 16 | 3 hours | Admin Users | User management, CRUD, search, bulk actions |
| 17 | 3 hours | Admin Agent/Product | Agent appointment, product management |
| 18 | 3 hours | Admin Config/Logs | System config, audit logs, EPIN generation |
| 19 | 3 hours | Reports Generator | Report filters, table, export (CSV/PDF/Excel) |
| 20 | 3 hours | Reports Charts | Visual charts, scheduling |
| 21 | 2 hours | Code Splitting | React.lazy(), Suspense, bundle < 100 KB |
| 22 | 2 hours | Lazy Loading | Component lazy load, image lazy load |
| 23 | 3 hours | Caching Strategy | Service worker, PWA, API caching |
| 24 | 2 hours | Image Optimization | WebP, responsive images, bundle analysis |
| 25 | 1.5 hours | Route Preloading | Hover preloading, TTI improvement |
| 26 | 2 hours | Final Testing | Lighthouse audit, documentation |
| **Phase 2 Total** | **~31.5 hours** | **12 milestones** | **Pending** |

### Overall Timeline

| Phase | Hours | Milestones | Status |
|-------|-------|-----------|--------|
| Phase 1 (Core) | 21 | 14 | ✅ Complete |
| Phase 2 (Advanced) | 31.5 | 12 | ⏳ Pending |
| **Grand Total** | **~52.5 hours** | **26 milestones** | **In Progress** |

---

## 🚀 Ready to Start?

**Phase 1 (Milestones 1-14) is COMPLETE ✅**

Begin with **Milestone 15** (Agent Dashboard). I can implement each milestone step-by-step. Just say "Start Milestone 15" and I'll create the files.

**Phase 2 Overview:**
- **Milestones 15-18:** Agent Dashboard & Admin Panel (12 hours)
- **Milestones 19-20:** Reports Module (6 hours)
- **Milestones 21-25:** Performance Optimization (13.5 hours)
- **Milestone 26:** Final Testing & Documentation (2 hours)
