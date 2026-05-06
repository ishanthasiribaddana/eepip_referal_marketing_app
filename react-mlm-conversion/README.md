# EEPIP MLM Frontend

**Education Easy-Pay Investment Plan** - Binary MLM Frontend Application

**Version:** v3.2  
**Status:** Production Ready (All 26 Milestones Complete)  
**Tech Stack:** React 18 + TypeScript + TailwindCSS + Vite  
**Bundle Size:** 15.43 KB (app shell) + 164 KB (React vendor) + 380 KB (Recharts lazy)

---

## Overview

EEPIP MLM is a binary multi-level marketing system for educational investment plans. This React frontend provides a modern, responsive UI for AI Engineers (investors), Agents, Bank users, and Admins to manage their MLM activities, view commissions, track binary trees, and generate reports.

**Key Features:**
- 🎯 Binary tree visualization with interactive nodes
- 💰 Commission tracking and reporting
- 📊 Dashboard with real-time stats
- 👥 User management (Admin)
- 🤖 Agent appointment and tracking
- 📈 Reports with charts and scheduling
- 🔒 SSO authentication integration
- 📱 PWA support (offline capable)
- ⚡ Performance optimized (code splitting, lazy loading, caching)

---

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Backend API running on `http://localhost:8089` (EEPIP API)
- SSO service running on `http://localhost:8085` (TEMCO SSO)

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

**Dev Server:** http://localhost:3006  
**API Proxy:** `/eepip-api` → `http://localhost:8089`  
**SSO Proxy:** `/temco-api` → `http://localhost:8085`

---

## Project Structure

```
react-mlm-conversion/
├── src/
│   ├── components/          # React components
│   │   ├── Admin/          # Admin panel components
│   │   ├── Agent/          # Agent dashboard components
│   │   ├── Bank/           # Bank dashboard components
│   │   ├── Commissions/    # Commission table & filters
│   │   ├── Dashboard/      # Stats cards
│   │   ├── Register/       # Multi-step registration forms
│   │   ├── Reports/        # Reports, charts, scheduling
│   │   ├── StudentMatch/   # Student matching service
│   │   ├── common/         # Shared components (Button, Skeletons)
│   │   └── BinaryTree.tsx  # Binary tree visualization
│   ├── data/
│   │   └── mockData.ts     # Mock data for development
│   ├── layouts/
│   │   └── MainLayout.tsx  # Main app layout with sidebar
│   ├── pages/              # Page-level components (lazy-loaded)
│   │   ├── AdminPanel.tsx
│   │   ├── AgentDashboard.tsx
│   │   ├── BankDashboard.tsx
│   │   ├── Commissions.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Login.tsx
│   │   ├── Profile.tsx
│   │   ├── Register.tsx
│   │   ├── Reports.tsx
│   │   ├── StudentMatch.tsx
│   │   └── Tree.tsx
│   ├── utils/
│   │   ├── cache.ts        # Caching utilities (localStorage + memory)
│   │   └── lazyImage.ts    # Image lazy loading utilities
│   ├── App.tsx             # Main app with routing
│   ├── main.tsx            # Entry point + service worker
│   └── index.css           # Global styles
├── api/                    # API service layer
│   ├── apiClient.ts        # Base HTTP client with SSO cookie auth
│   ├── authService.ts      # SSO login/logout
│   ├── aiEngineerService.ts
│   ├── treeService.ts
│   ├── commissionService.ts
│   ├── bankService.ts
│   └── epinService.ts
├── types/
│   └── mlm.types.ts        # TypeScript interfaces (785 lines)
├── vite.config.ts          # Vite config + PWA + bundle optimization
├── tailwind.config.js      # TailwindCSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json
```

---

## Pages & Routes

| Route | Page | Description | Access |
|-------|------|-------------|--------|
| `/login` | Login | SSO authentication | Public |
| `/register` | Register | Multi-step enrollment | Authenticated |
| `/dashboard` | Dashboard | Stats cards, activity feed | Authenticated |
| `/tree` | Binary Tree | Interactive tree visualization | Authenticated |
| `/commissions` | Commissions | Commission table with filters | Authenticated |
| `/student-match` | Student Match | Student nomination service | Authenticated |
| `/agent-dashboard` | Agent Dashboard | Agent stats, referrals | Agent |
| `/admin` | Admin Panel | User management, products, settings | Admin |
| `/bank` | Bank Dashboard | Audit, member search, disbursements | Bank |
| `/reports` | Reports | Charts, scheduling, export | Authenticated |
| `/profile` | Profile | User settings | Authenticated |

---

## Performance Optimizations

### Code Splitting
- All pages lazy-loaded with `React.lazy()`
- Manual chunks: `react-vendor` (React, Router), `recharts-vendor` (Charts)
- Initial bundle: **15.43 KB** (gzipped: 5.27 KB)

### Lazy Loading
- Below-fold components: CommissionTable, BinaryTree
- Image lazy loading utility ready for future assets

### Caching
- **Service Worker:** PWA with Workbox (offline support)
- **API Caching:** NetworkFirst strategy, 24h expiration
- **LocalStorage + Memory:** Dual-layer cache with TTL

### Bundle Analysis
- `dist/bundle-analysis.html` - Visual treemap
- Gzip + Brotli sizes tracked

### Route Preloading
- Prefetch: `/dashboard`, `/tree`, `/commissions`, `/profile`
- 2-second idle delay, non-blocking

---

## Configuration

### Environment Variables

Create `.env` file (see `.env.example`):

```env
VITE_API_BASE_URL=http://localhost:8089
VITE_SSO_BASE_URL=http://localhost:8085
```

### Vite Configuration

`vite.config.ts` includes:
- PWA plugin with manifest
- Manual chunks for vendors
- Image optimization (vite-plugin-imagemin)
- Bundle visualizer (rollup-plugin-visualizer)
- Proxy to backend APIs

### TailwindCSS Configuration

`tailwind.config.js` includes:
- Custom color palette (primary colors)
- Font families
- Responsive breakpoints

---

## API Integration

### SSO Authentication

The app uses TEMCO Bank's SSO service for authentication:

```typescript
import { authService } from './api/authService';

// Login
const response = await authService.login(username, password);

// Logout
await authService.logout();

// Validate session
const user = await authService.validateSession();
```

### Backend API

All API calls go through the proxy:

```typescript
import { aiEngineerService } from './api/aiEngineerService';

// Get AI Engineer data
const data = await aiEngineerService.getProfile(aiEngineerId);
```

**API Endpoints:**
- `/eepip-api/api/v3/*` - EEPIP MLM API (port 8089)
- `/temco-api/api/v1/*` - TEMCO SSO API (port 8085)

---

## Mock Data

For development without backend, the app uses mock data from `src/data/mockData.ts`:

- Mock users (AI Engineers, Agents, Bank, Admin)
- Mock binary tree data
- Mock commission data
- Mock dashboard stats
- Mock report data

Mock data is automatically used when backend is unavailable.

---

## PWA Features

### Installation

The app is installable as a PWA:
- Manifest: `dist/manifest.webmanifest`
- Service Worker: `dist/sw.js`
- Workbox: `dist/workbox-*.js`

### Offline Support

- Static assets precached (23 entries)
- API responses cached (NetworkFirst)
- Fallback to stale cache on network failure

---

## Development

### TypeScript

- Strict mode enabled
- All components typed
- Interfaces in `types/mlm.types.ts`

### Code Style

- ESLint configured
- Prettier configured
- 4-space indentation

### Git Hooks

Pre-commit hooks can be added via Husky (not currently configured).

---

## Deployment

### Build

```bash
npm run build
```

Output: `dist/` directory

### Docker

```bash
# Build image
docker build -t eepip-mlm-frontend .

# Run container
docker run -p 3004:80 eepip-mlm-frontend
```

### Nginx

Use provided `nginx.conf` for production deployment.

---

## Troubleshooting

### Port Already in Use

Change port in `vite.config.ts`:

```typescript
server: {
  port: 3006, // Change to available port
}
```

### Backend Connection Failed

Verify:
1. Backend API running on `http://localhost:8089`
2. SSO service running on `http://localhost:8085`
3. Proxy configuration correct in `vite.config.ts`

### TypeScript Errors

```bash
# Check TypeScript errors
npx tsc --noEmit
```

### Build Failures

```bash
# Clean build
rm -rf dist node_modules
npm install
npm run build
```

---

## License

Copyright © 2026 Java Institute Holdings. All rights reserved.

---

## Support

For issues or questions, contact the development team at Java Institute Holdings.

---

## Version History

- **v3.2** (May 2, 2026) - Product configuration table, dynamic investment amounts
- **v3.1** (May 1, 2026) - Agent system, separate agent binary tree
- **v3.0** (Apr 29, 2026) - Partnership structure (Bank 6%, Java Institute 94%)
- **v2.1** (Apr 29, 2026) - AI Engineer model, open participation
- **v2.0** (Apr 29, 2026) - Price increase to Rs. 1,800,000, pool-based binary
- **v1.0** (Apr 29, 2026) - Initial model
