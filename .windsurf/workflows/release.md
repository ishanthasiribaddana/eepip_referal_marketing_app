description: One-command release for EEPIP — Education Easy-Pay Investment Plan (MLM Module). Auto-detects changes, bumps version, updates version.js + CHANGELOG.md, builds backend (WildFly) + frontend (React), commits, tags, and pushes to trigger CI/CD pipeline that deploys to production.
---

# Release Workflow — EEPIP (Education Easy-Pay Investment Plan)

> **Template Version:** 1.0 (Multi-App Monorepo)
> **Project:** EEPIP — Education Easy-Pay Investment Plan (MLM Module)
> **Usage:** When the user says `/release` or asks to release/deploy, execute ALL of the following steps automatically.

**⚠️ MANDATORY RULE: ALL releases MUST go through this workflow. NEVER manually commit + tag + push outside of `/release`, even for "backend-only" or "one-file" hotfixes. Every release — no matter how small — MUST include steps 6 (version bump), 7 (CHANGELOG), 8 (build validation). Skipping any step causes version mismatches between local git, production backend, and production frontend.**

---

## Project Configuration

### General
- **Project Name**: EEPIP — Education Easy-Pay Investment Plan (MLM Module)
- **Local Project Path**: F:\Exon\Java_Holdings_MLM
- **GitHub Repo**: ishanthasiribaddana/eepip_referal_marketing_app
- **Default Branch**: main
- **Starting Version**: v0.1.6 (last local version)

### Production Server
- **IP**: 109.123.227.166
- **User**: root (SSH key auth)
- **SSH Alias**: `ssh temco-prod` (configured in `~/.ssh/config`)
- **SSH Key**: `~/.ssh/id_ed25519_temco` (Ed25519)
- **Project path on server**: /opt/temco/apps/eepip
- **Database**: temco_system (MariaDB)
- **SSL**: Cloudflare Origin Certificate (*.temcobank.com, valid until 2041)
- **Firewall**: UFW — ports 22, 80, 443 open

### GitHub Secrets Required
| Secret | Description |
|--------|-------------|
| `PROD_SSH_KEY` | Contents of `~/.ssh/id_ed25519_temco` (private key) |
| `PROD_HOST` | `109.123.227.166` |
| `PROD_USER` | `root` |
| `DB_PASSWORD` | `6qZB6d@pIvj` (temco_system database password) |

---

## Services (ALL deployed on every release)

| Service | Backend Build | Frontend Build | Container Name | Prod Port | Health Check |
|---------|--------------|----------------|----------------|-----------|-------------|
| EEPIP Backend | `mvn clean package -DskipTests` | N/A | `temco-eepip` | 127.0.0.1:8089 → 8080 | `/eepip-api/api/health` |
| EEPIP Frontend | N/A | `npm run build` | `temco-eepip-fe` | 127.0.0.1:3005 → 80 | `/` (HTTP 200) |
| SSO Service | (Existing - temco-sso) | N/A | `temco-sso` | 127.0.0.1:8085 → 8080 | `/temco-api/api/v1/health` |

**Note:** SSO Service is provisioned for future implementation. Current releases deploy Backend + Frontend only.

---

## Production URLs

> Public-facing URLs routed via Cloudflare. Initially use IP proxy for development preview.

| App | Public URL | Status |
|-----|-----------|--------|
| EEPIP Backend API | `https://eepip-api.temcobank.com` | Provisional |
| EEPIP Frontend | `https://eepip.temcobank.com` | Provisional |
| Development Preview | `http://109.123.227.166:3005` | Current |

---

## Docker Architecture

> List all containers expected on the production server.

| Container | Image/Base | Internal Port | Production Port |
|-----------|-----------|---------------|-----------------|
| temco-eepip | WildFly 26.1.3.Final + WAR | 8080 | 127.0.0.1:8089 |
| temco-eepip-fe | Nginx + React dist | 80 | 127.0.0.1:3005 |
| temco-sso | WildFly 31 + WAR (existing) | 8080 | 127.0.0.1:8085 |

**Database Connection:**
- Shared MariaDB: temco_system database (hosted on existing TEMCO infrastructure)
- Database: temco_system
- Flyway Table: eepip_flyway_schema_history (baselined at V16)

---

## CI/CD Pipeline Overview

Pushing a tag (`v*`) to GitHub triggers the GitHub Actions workflow (`.github/workflows/deploy.yml`):
1. **Build** — Builds Docker images (backend, frontend) on GitHub runners
2. **Package** — Saves images as compressed tarballs
3. **Transfer** — SCPs tarballs to production server
4. **Deploy** — Loads images on server via `docker load`, tags as latest, restarts containers
5. **Migrate** — Auto-executes any `scripts/migrations/vX.Y.Z_*.sql` files
6. **Verify** — Runs health checks on all endpoints

**No container registry (GHCR) needed** — repo stays private, no PAT tokens that expire.

### Database Migration Strategy
**Primary:** Flyway — auto-runs on application startup via `FlywayStartup.java`
- Flyway reads: `flyway.url`, `flyway.baselineOnMigrate`, `flyway.baselineVersion`, `flyway.validateOnMigrate` from system properties
- Baseline version: V16 (existing migrations V1-V16 marked as baseline)
- Future migrations start from V17+

**Secondary (CI/CD):** Raw SQL migrations for non-Flyway schema changes
- Place SQL files in `scripts/migrations/` as `v<version>_<description>.sql`
- If no migration file exists for this version, the pipeline skips gracefully

**CRITICAL:** Every migration SQL file MUST start with `USE temco_system;` after the header comment block. The CI/CD pipeline runs `mysql < file.sql` without specifying a database, so missing this will cause `ERROR 1046: No database selected`.

**CRITICAL:** Use idempotent SQL (`IF NOT EXISTS`, `ON DUPLICATE KEY UPDATE`) to avoid conflicts with other services sharing temco_system database.

**Migration Discipline:** Since EEPIP shares temco_system with other TEMCO apps, ALL migration SQL must use idempotent statements:
- `CREATE TABLE IF NOT EXISTS ...`
- `ALTER TABLE ... ADD COLUMN IF NOT EXISTS ...`
- `INSERT ... ON DUPLICATE KEY UPDATE ...`
This ensures migrations run safely without conflicts with other services.

---

## 1. Detect the current version
// turbo
Run: `git tag --sort=-v:refname | Select-Object -First 1` in `F:\Exon\Java_Holdings_MLM` to get the latest tag.
If no tags exist, the current version is `v0.0.0` (first release will be `v1.0.0`).

## 2. Calculate the next version
Parse the latest tag (e.g., `v0.1.6`) and increment the patch number by 1 (e.g., `v0.1.7`).
If the user specifies a version, use that instead.
If the user specifies `minor`, bump the minor version (e.g., `v0.2.0`).
If the user specifies `major`, bump the major version (e.g., `v1.0.0`).

## 3. Auto-detect changes
// turbo
Run: `git diff --name-only HEAD` and `git diff --name-only --cached HEAD` and `git ls-files --others --exclude-standard` in `F:\Exon\Java_Holdings_MLM` to list all modified, staged, and new files.

## 4. Generate a commit message
Based on the changed files, generate a conventional commit message:
- If new features: `feat: <summary>`
- If bug fixes: `fix: <summary>`
- If refactoring: `refactor: <summary>`
- Include bullet points for each significant change
- Group by **Backend / Frontend / Database / Config**

## 5. Generate a release summary (one-line)
Create a short one-line summary for the tag annotation (max 80 chars).

## 6. Update `version.js`
Edit `F:\Exon\Java_Holdings_MLM\react-mlm-conversion\src\version.js`:
Replace the version string with the new version:
```js
export const APP_VERSION = 'vX.Y.Z'
```

This file is the source of truth for the frontend version display.

## 7. Update `CHANGELOG.md`
Edit `F:\Exon\Java_Holdings_MLM\CHANGELOG.md`:
Add a new section at the TOP (after the header) following the Keep a Changelog format:
```markdown
## [X.Y.Z] - YYYY-MM-DD

### Added/Changed/Fixed
- **Feature Name** — Description
  - Detail 1
  - Detail 2

### Services Affected
- Backend (WildFly)
- Frontend (React)

### Files Changed
- `path/to/file1` — what changed
- `path/to/file2` — what changed

---
```

## 8. Local build validation (ALL services)

### 8a. Backend build
// turbo
Run: `mvn clean package -DskipTests` in `F:\Exon\Java_Holdings_MLM`
If build fails, STOP and report the error.

### 8b. Frontend build
// turbo
Run: `npm run build` in `F:\Exon\Java_Holdings_MLM\react-mlm-conversion`
If build fails, STOP and report the error.

## 9. Pre-commit validation (GATE — do NOT skip)
Before staging, verify version consistency:

// turbo
Run: `Select-String -Path "react-mlm-conversion\src\version.js" -Pattern "v<TARGET_VERSION>"` in `F:\Exon\Java_Holdings_MLM`
- If the target version string (e.g., `v0.1.7`) appears in `version.js` → PASS, continue.
- If NOT found → **STOP the release**. Step 6 was skipped. Go back and fix before continuing.

Also verify the CHANGELOG:
// turbo
Run: `Select-String -Path "CHANGELOG.md" -Pattern "<TARGET_VERSION_WITHOUT_V>"` in `F:\Exon\Java_Holdings_MLM`
- If found → PASS. If NOT → **STOP**.

## 10. Stage all changes
Run: `git add -A` in `F:\Exon\Java_Holdings_MLM`

## 11. Commit
Run: `git commit -m "<commit message from step 4>"` in `F:\Exon\Java_Holdings_MLM`

## 12. Push to main
Run: `git push origin main` in `F:\Exon\Java_Holdings_MLM`

## 13. Create annotated tag
Run: `git tag -a vX.Y.Z -m "vX.Y.Z - <release summary from step 5>"` in `F:\Exon\Java_Holdings_MLM`

## 14. Push tag (triggers CI/CD)
Run: `git push origin vX.Y.Z` in `F:\Exon\Java_Holdings_MLM`

This triggers the full production CI/CD pipeline which auto-deploys all services:
1. **Backend Docker image** → Built on GitHub runners, saved as tarball, SCP'd to production, loaded via `docker load`
2. **Frontend Docker image** → Built on GitHub runners, saved as tarball, SCP'd to production, loaded via `docker load`
3. **Docker restart** → Containers restarted with new images
4. **Database migrations** → Any `scripts/migrations/vX.Y.Z_*.sql` files are auto-executed on production MariaDB

**Migration naming convention:** Place SQL files in `scripts/migrations/` as `v<version>_<description>.sql`.

## 15. Report
// turbo
Run: `git remote get-url origin` in `F:\Exon\Java_Holdings_MLM` to get the repo URL.
Strip the `.git` suffix and append `/actions` to build the CI/CD link dynamically.

// turbo
Run: `git log -1 --format="%H"` in `F:\Exon\Java_Holdings_MLM` to get the commit hash.

Print a summary:
- Version released
- Commit hash
- Number of files changed
- CI/CD pipeline link (derived from git remote, NOT hardcoded)
- Deployment layers:
  - Backend (WildFly) 
  - Frontend (Nginx) 
  - Database migration: Flyway (auto on startup)

## 16. Post-deploy verification

Wait for CI/CD to complete (check the Actions link from step 15), then run these automated health checks via SSH:

### a. Backend health
Run: `ssh temco-prod "curl -s http://localhost:8089/eepip-api/api/health"` — expect `{"status":"UP"}`.

### b. Frontend health
Run: `ssh temco-prod "curl -s -o /dev/null -w '%{http_code}' http://localhost:3005/"` — expect `200`.

### c. Docker container status
Run: `ssh temco-prod "docker ps --filter name=temco-eepip --format 'table {{.Names}}\t{{.Status}}'"` — expect 2 containers running (backend, frontend).

### d. Database connectivity
Run: `ssh temco-prod "mysql -u root -p'6qZB6d@pIvj' -e 'SELECT COUNT(*) AS count FROM eepip_ai_engineer;' temco_system"` — expect a count >= 0.

### e. Public URL verification (Development Preview)
Run: `Invoke-WebRequest -Uri "http://109.123.227.166:3005" -UseBasicParsing -TimeoutSec 15 | Select-Object StatusCode` — expect `200`.

### f. Authentication test (optional - for future SSO implementation)
Run: `ssh temco-prod "curl -s -X POST 'http://localhost:8085/temco-api/api/v1/auth/login' -H 'Content-Type: application/json' -d '{\"username\":\"admin\",\"password\":\"test123\"}'"` — expect `{"success":true, ...}`.
**Note:** Currently using mock authentication. Skip this test until SSO is fully implemented.

### g. Manual spot-checks
Remind the user to verify the following on the production site:
- **Login** — Can you log in with test credentials?
- **Dashboard** — Do stats and tree load?
- **Registration** — Can you register a new AI Engineer?
- **Binary Tree** — Does the tree visualization work?
- **Commissions** — Do commission reports load?
- **Browser console** — Any JavaScript errors?

## 17. Rollback (if needed)

If any check fails:

### a. Full rollback (re-deploy previous version)
Re-trigger the CI/CD pipeline for the previous tag:
```bash
git tag -d v<PREVIOUS_VERSION>
git tag -a v<PREVIOUS_VERSION> -m "rollback to v<PREVIOUS_VERSION>"
git push origin v<PREVIOUS_VERSION> --force
```
This rebuilds and re-deploys ALL services from the previous version's code.

### b. Manual per-service rollback (if only one service is broken)
SSH into the server and restore the previous Docker image:
```bash
# Example: rollback backend only
ssh temco-prod "docker tag temco-eepip:v<PREVIOUS_VERSION> temco-eepip:latest"
ssh temco-prod "cd /opt/temco/apps/eepip && docker-compose restart backend"

# Example: rollback frontend only
ssh temco-prod "docker tag temco-eepip-fe:v<PREVIOUS_VERSION> temco-eepip-fe:latest"
ssh temco-prod "cd /opt/temco/apps/eepip && docker-compose restart frontend"
```

### c. Database rollback
Database rollback must be done manually — Flyway does not auto-rollback.
If a migration caused issues, write a reverse migration and apply it:
```bash
ssh temco-prod "mysql -u root -p'6qZB6d@pIvj' temco_system < /tmp/rollback.sql"
```

---

## First-Time Server Setup

Only needed if `/opt/apps/eepip` does not exist on the production server:

```bash
ssh temco-prod "sudo docker network create temco-network 2>/dev/null || true"
ssh temco-prod "sudo mkdir -p /opt/temco/apps/eepip/backend/deployments"
ssh temco-prod "sudo mkdir -p /opt/temco/apps/eepip/frontend/dist"
ssh temco-prod "sudo chown -R root:root /opt/temco/apps/eepip"
```

SCP the docker-compose file and environment config:
```powershell
scp F:\Exon\Java_Holdings_MLM\docker-compose.yml root@109.123.227.166:/opt/temco/apps/eepip/
scp F:\Exon\Java_Holdings_MLM\.env.production root@109.123.227.166:/opt/temco/apps/eepip/.env
```

Then push a tag to trigger CI/CD — it will build, SCP, and deploy automatically.

---

## Production Server Directory Structure

```
/opt/temco/apps/eepip/
├── .env                            # Shared secrets
├── docker-compose.yml              # Docker compose configuration
├── backend/
│   ├── deployments/                # WAR artifacts
│   │   └── eepip-api.war
│   └── docker-compose.base.yml
├── frontend/
│   ├── dist/                      # React build
│   │   ├── index.html
│   │   └── assets/
│   └── docker-compose.base.yml
```

---

## Windsurf Workflow Integration

Create `.windsurf/workflows/release.md` in the project root:
```markdown
---
description: One-command release for EEPIP — bumps version, builds backend + frontend, deploys to production
---

When the user says `/release`, read and execute the full release workflow defined in `F:\My Dev Tool Kit\CI-CD Pipeline\eepip_app\release.md`.

Follow every step in that document sequentially. Do not skip any step.
```

---

## Development Preview Setup

For initial development preview using IP proxy (before Cloudflare domain setup):

1. **Backend Access:** `http://109.123.227.166:8089/eepip-api/api/v3/*`
2. **Frontend Access:** `http://109.123.227.166:3005/`

**Note:** These are temporary for development. Production will use Cloudflare domains:
- Backend API: `https://eepip-api.temcobank.com`
- Frontend: `https://eepip.temcobank.com`

**Existing TEMCO Apps on Server:**
- temco-website (127.0.0.1:8093)
- temco-portal (127.0.0.1:8092)
- temco-admin-fe (127.0.0.1:8089)
- temco-admin-api (127.0.0.1:8088)
- temco-finance-fe (127.0.0.1:8091)
- temco-finance-api (127.0.0.1:8086)
- temco-business (127.0.0.1:8087)
- temco-sso (127.0.0.1:8085)
- temco-minio (127.0.0.1:9000/9001)
- temco-elasticsearch (9200)
- temco-redis (6379)
- temco-eepip (existing backend container - Up 42 hours)

---

## SSO Integration (Provisional)

SSO service is provisioned for future implementation. Current releases use mock authentication.

**SSO Configuration (Future):**
- Container: `eepip-sso`
- Port: 127.0.0.1:8085 → 8080
- Health Check: `/temco-api/api/v1/health`
- Integration: EEPIP backend will authenticate via SSO cookies
- Role: `AGENT` (new SSO role for EEPIP agents)

**Current Fallback:**
- Mock authentication in `authService.ts`
- Login with `admin` → Role: `ADMIN`
- Login with any other username → Role: `AI_ENGINEER`

---

## Database Schema

**Database:** temco_system (shared with other TEMCO apps)
**EEPIP Tables:** All prefixed with `eepip_` (15 tables total)
**Flyway Table:** eepip_flyway_schema_history (baselined at V16)

**Key Tables:**
- eepip_product (configurable investment amount & rates)
- eepip_ai_engineer (MLM participants)
- eepip_commission (commission records)
- eepip_binary_pool (monthly pool tracking)
- eepip_agent (agent profiles)
- eepip_agent_commission (agent commissions)
- eepip_epin (e-PIN management)
- eepip_payment (transaction tracking)
- eepip_withdrawal (payout management)
- eepip_config (system configuration)

**Shared Table:**
- member (shared user identity, SSO integration)

---

## Tech Stack

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
| Frontend Framework | React | 18 |
| Frontend Language | TypeScript | 5 |
| Frontend Styling | TailwindCSS | 3 |
| Frontend Build | Vite | 5 |
| Containerization | Docker | Latest |
