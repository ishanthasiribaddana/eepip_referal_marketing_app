# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.6] - 2026-05-06

### Added
- **Release Workflow** — Automated CI/CD deployment workflow
  - Added .windsurf/workflows/release.md for one-command release
  - Version bump automation
  - Build validation for backend and frontend
  - Automated commit, tag, and push to GitHub
  - CI/CD pipeline triggers production deployment

### Changed
- **Sponsor NIC Search** — Added auto-fill with debounce in PlacementForm
  - Changed sponsor field from username to NIC
  - Added 500ms debounce search for AI Engineer sponsors
  - Auto-fills sponsor ID when NIC is entered
  - Input locks and shows green border when sponsor found

- **Student NIC Search** — Converted to search box with dropdown
  - Changed from simple NIC input to search box
  - Added 500ms debounce search for students
  - Dropdown shows matching members from general_user_profile
  - Auto-fills Name, Email, Phone when student selected
  - Moved student NIC to first field position

### Services Affected
- Backend (WildFly)
- Frontend (React)

### Files Changed
- `.windsurf/workflows/release.md` — New release workflow
- `react-mlm-conversion/src/version.js` — Version tracking
- `react-mlm-conversion/api/memberService.ts` — API service layer
- `react-mlm-conversion/src/components/Register/PlacementForm.tsx` — Sponsor search
- `react-mlm-conversion/src/components/Register/StudentForm.tsx` — Student search
- `react-mlm-conversion/src/pages/Register.tsx` — Validation updates
- `react-mlm-conversion/src/components/Register/PersonalInfoForm.tsx` — Member lookup

---
