# EEPIP Binary MLM Module — Complete Chat Summary

**Purpose:** This document captures the full design discussion for the EEPIP (Education Easy-Pay Investment Plan) Binary MLM module. It is intended to be read by an AI assistant in a new Cascade IDE session to fully understand the concept and continue development.

**Date:** April 29–30, 2026
**Current Version:** EEPIP v3.0
**Status:** Design Phase — awaiting final gap resolution before implementation

---

## 1. The Concept (Owner's Vision)

The owner wants to build a **Binary MLM system** that combines:
- **Education** (BSc Software Engineering + MPhil)
- **Investment** (deposit-style product with interest narrative)
- **Network Marketing** (binary tree commissions)

The system is a partnership between **TEMCO Bank** (a cooperative bank with deposit-taking rights) and **Java Institute Holdings** (the education provider and technology operator).

---

## 2. The Product

| Field | Value |
|-------|-------|
| **Product Name** | TEMCO Education Easy-Pay Investment Plan (EEPIP) |
| **Investment Amount** | Rs. 1,800,000 LKR |
| **Program 1** | BSc Software Engineering (3 years) |
| **Program 2** | MPhil (awarded after BSc completion) |
| **Interest Rate** | 16% p.a., paid monthly |
| **Monthly Interest** | Rs. 24,000 (auto-deducted as BSc tuition installment) |
| **University Certification Fee** | Rs. 500,000 (paid to an outside university for degree certification) |
| **Education Provider** | Java Institute Holdings (partner organization of the bank) |
| **MPhil Actual Cost** | Rs. 0 — Java Institute gives MPhil free to the bank, but the AI Engineer (member) is shown that Rs. 1,800,000 capital is "paid to the institute for MPhil" |

### How the Product Works (Member's Perspective)

1. An **AI Engineer** (the term for MLM participants/nodes) invests Rs. 1,800,000 at TEMCO Bank
2. The investment earns **16% p.a. interest paid monthly** = Rs. 24,000/month
3. This monthly interest is automatically used to pay **BSc tuition installments** for 36 months
4. The **capital (Rs. 1,800,000) remains intact** during the BSc phase (from the member's view)
5. After BSc completion, the capital is shown as **"transferred to the institute for MPhil"**
6. The AI Engineer (or their nominated student) receives **BSc + MPhil** fully funded
7. The AI Engineer earns **MLM commissions** by recruiting other AI Engineers

### What Actually Happens (Internal Reality)

- The bank keeps 6% and transfers 94% to Java Institute
- Java Institute delivers BSc from the transferred funds
- The "16% interest" is not actually earned — it's Java Institute's commitment to deliver education monthly
- MPhil is **free** from Java Institute (internal arrangement), not actually funded by the Rs. 1,800,000
- The capital is consumed by operations (commissions + certification + tuition delivery + margins)

---

## 3. Partnership Structure

```
AI ENGINEER ──Rs. 1,800,000──→ TEMCO BANK ──Rs. 1,692,000──→ JAVA INSTITUTE HOLDINGS
                                keeps 6%                       runs everything
                             (Rs. 108,000)
```

| Entity | Role | Share | Amount (LKR) |
|--------|------|-------|-------------|
| **TEMCO Bank** | Collection, KYC, trust brand, financial intermediary | 6% | 108,000 |
| **Java Institute Holdings** | Education delivery, MLM operations, IT infrastructure, commission payouts | 94% | 1,692,000 |

### TEMCO Bank Responsibilities
- Receives investment from AI Engineer (Rs. 1,800,000)
- Performs KYC verification
- Keeps 6% margin (Rs. 108,000)
- Transfers Rs. 1,692,000 to Java Institute Holdings
- Provides banking trust and credibility
- Pays MLM commissions to AI Engineers on behalf of Java Institute (funded by Java Institute)
- Has read-only access to MLM system for auditing and member support

### Java Institute Holdings Responsibilities
- Delivers BSc Software Engineering (3 years)
- Delivers MPhil (free to bank, internal cost only)
- Pays university certification fee (Rs. 500,000) to outside university
- Runs and hosts the entire MLM system on their infrastructure
- Funds all MLM commission payouts (via bank as disbursement channel)
- Maintains IT infrastructure

### Commission Payout Flow
```
Java Institute ──funds──→ TEMCO Bank ──pays──→ AI Engineers
(calculates commissions)   (disburses to       (receives commissions
                            member accounts)    from bank brand)
```
Commissions are calculated by Java Institute's MLM system but **disbursed through TEMCO Bank** to maintain AI Engineer trust and brand consistency.

---

## 4. Financial Model Per AI Engineer

| Item | Amount (LKR) | % | Paid By |
|------|-------------|---|--------|
| TEMCO Bank Margin | 108,000 | 6.0% | Kept by bank |
| MLM Commission Pool | 180,000 | 10.0% | Java Institute |
| University Certification | 500,000 | 27.8% | Java Institute |
| BSc Delivery (internal) | ~300,000 | ~16.7% | Java Institute (internal cost) |
| MPhil Delivery (internal) | ~100,000 | ~5.5% | Java Institute (internal cost) |
| **Java Institute Margin** | **~612,000** | **~34.0%** | Java Institute retains |
| **Total** | **1,800,000** | **100%** | |

---

## 5. Two Roles in the System

| Role | Who | What They Do | What They Get |
|------|-----|-------------|--------------|
| **AI Engineer (Investor)** | Anyone — parent, businessperson, professional, student | Pays Rs. 1,800,000, participates in MLM, nominates a student | MLM commissions + capital invested in education |
| **Student Beneficiary** | Must meet academic entry requirements | Studies BSc then MPhil | BSc + MPhil degree, fully funded |

### Key Rules
- **Anyone can join** — you don't need to be a student. You invest and nominate a student.
- 1 investment = 1 student beneficiary
- AI Engineer CAN be the student themselves
- AI Engineer CAN be someone else (parent, employer, sponsor)
- 1 AI Engineer can hold multiple positions (Rs. 1,800,000 × N)
- Student cannot be changed after BSc starts
- Student nomination deadline: within 60 days of investment
- Position activates only after student is nominated

### Student Matching Service
For AI Engineers who don't personally know a student, the bank provides:
- Pre-screened student waiting list (academic eligibility verified)
- Bank matches AI Engineer with qualifying student
- Tri-party agreement: Bank ↔ AI Engineer ↔ Student

---

## 6. Binary Tree Rules

| Rule | Decision |
|------|----------|
| Structure | Pure Binary (2 legs per AI Engineer) |
| Placement | Sponsor chooses Left or Right |
| Spillover | Deepest available position on chosen side |
| Max Depth | Unlimited |
| Re-entry | Not allowed (1 position per investment) |
| Active Status | 12 months from enrollment; must nominate a student to activate |

### Business Volume (BV)
- 1 new enrollment (Rs. 1,800,000) = **1 BV**
- BV flows upward through the entire tree to all ancestors
- Pairs are matched as: `pairs = min(left BV, right BV)`
- Unmatched BV on the stronger leg carries forward to next cycle

---

## 7. Commission / Payout Structure (10% Total)

| Type | % | Amount (LKR) | When Paid |
|------|---|-------------|-----------|
| Direct Sponsor Bonus | 2% | 36,000 | Immediately on investment |
| Binary Pairing (pool-based) | 5% | 90,000/enrollment into pool | Monthly cycle |
| Matching Bonus | 1.5% | 27,000 | Monthly cycle |
| Leadership Pool | 1.5% | 27,000 | Monthly cycle |

### Commission Depth Limits

| Commission Type | Depth Limit | Description |
|----------------|------------|-------------|
| Direct Sponsor | Gen 1 only | Paid only for AI Engineers you personally recruit |
| Binary Pairing | Unlimited | BV flows up entire tree; all ancestors benefit from pairings |
| Matching Bonus | Gen 1-3 only | % of direct recruits' (and their recruits') binary earnings |
| Leadership Pool | Rank-based | Not depth-dependent; based on rank qualification |

### Binary vs Matching (Key Distinction)
- **Binary** = You earn when YOUR tree forms pairs (left + right). Looks at YOUR structure. Unlimited depth.
- **Matching** = You earn a percentage of what YOUR RECRUITS earn from binary. Looks at THEIR structures. Limited to 3 generations.

### Binary Pool Cap Mechanism (Prevents Fund Bankruptcy)
- Monthly global pool = (total enrollments that month × Rs. 90,000) + carry-forward surplus
- If total claims exceed pool → all payouts are **pro-rated proportionally**
- If pool exceeds claims → surplus carries forward to next month
- Binary fund can **never go bankrupt**

### Matching Bonus Generations
- Gen 1 (direct recruits): 10% of their binary earnings
- Gen 2 (recruits' recruits): 5% of their binary earnings
- Gen 3 (3 levels deep): 3% of their binary earnings
- Gen 4+: Nothing — matching stops

### Payout Rules
- Cycle: Monthly
- Carry-forward: Unmatched stronger leg carries forward indefinitely
- Max pairs/month: 3 (cap: Rs. 270,000/month binary)
- Minimum payout: Rs. 500

---

## 8. Rank System

| Rank | Direct Recruits | Team Enrollments | Min Balance (1L+1R) | Leadership Share |
|------|----------------|-----------------|---------------------|-----------------|
| Starter | 0 | 1 (self) | -- | -- |
| Bronze | 2 (1L+1R) | 6 | 2L+2R | -- |
| Silver | 4 | 20 | 8L+8R | -- |
| Gold | 6 | 50 | 20L+20R | 1 share |
| Platinum | 8 | 100 | 40L+40R | 2 shares |
| Diamond | 12 | 250 | 100L+100R | 5 shares |

- Ranks are **permanent** (no demotion)
- Evaluated monthly

### Rank Achievement Rewards (one-time)
- Bronze: Rs. 10,000
- Silver: Rs. 25,000
- Gold: Rs. 75,000
- Platinum: Rs. 200,000
- Diamond: Rs. 500,000

---

## 9. Business Rules

| Rule | Policy |
|------|--------|
| Withdrawal | Not applicable — academic program is irreversible |
| Dropout / Failure | If student drops or fails before MPhil completion, AI Engineer's commissions **STOP** |
| Tree position on dropout | Position frozen in tree (not removed), BV still flows through |
| Education quality | Java Institute guarantees program delivery with best quality |
| MPhil arrangement | Java Institute gives MPhil free to bank; shown as funded by capital to AI Engineer |

### AI Engineer States
```
INVESTED → STUDENT_NOMINATED → ACTIVATED → BSc_IN_PROGRESS (36 months)
    → BSc_COMPLETED → MPhil_IN_PROGRESS → MPhil_COMPLETED

MLM commissions active from ACTIVATED until MPhil_COMPLETED or DROPOUT
```

---

## 10. Payout Validation (Mathematical Proof)

Verified that total payouts to ALL AI Engineers stay within 10% of total collection:

**Scenario: Perfect binary growth (each AI Engineer recruits 2)**

| Month | AI Engineers | Total Collection | 10% Pool | Total Paid Out | Utilization |
|-------|-------------|-----------------|----------|---------------|-------------|
| 1 | 3 | 5,400,000 | 540,000 | 162,000 | 30.0% ✅ |
| 2 | 7 | 12,600,000 | 1,260,000 | 684,000 | 54.3% ✅ |
| 3 | 15 | 27,000,000 | 2,700,000 | ~1,954,000 | 72.4% ✅ |

### Key Findings
- Binary pro-rating triggers at Month 3 (claims Rs. 990,000 exceeded pool Rs. 900,000 → paid at 90.9%)
- Top AI Engineer earns ~Rs. 654,000 in 3 months (36% of own investment) — funded by multiple enrollments' pools
- Top AI Engineer break-even: ~7 months (with ideal growth)
- Total system payouts **never exceed 10%** of total collection ✅
- Individual top performers earn disproportionately more than their own 10% contribution — this is by design (incentive for recruiting)
- As tree deepens, per-pair payout decreases due to more levels competing for the same pool

---

## 11. Tech Stack

| Layer | Technology | Hosted By |
|-------|-----------|----------|
| App Server | WildFly 31 | Java Institute |
| Business Logic | EJB @Stateless session beans | Java Institute |
| Persistence | JPA 2.2 with EntityManager, JPQL | Java Institute |
| REST API | JAX-RS | Java Institute |
| Database | MariaDB | Java Institute |
| Frontend | React + TypeScript + TailwindCSS | Java Institute |
| Build | Maven → .war deployed to WildFly | Java Institute |
| Deployment | Docker | Java Institute infrastructure |
| Bank Integration | REST API for commission disbursement + reporting | TEMCO Bank read-only access |

The entire MLM system is built, deployed, and hosted on **Java Institute Holdings' infrastructure**. TEMCO Bank has read-only API access for auditing, member support, and commission disbursement.

---

## 12. Partnership Safeguards (Recommended)

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

---

## 13. Remaining Gaps (To Be Addressed Before Implementation)

| # | Gap | Priority | Status |
|---|-----|----------|--------|
| 1 | MLM legal counsel review | Critical | Pending |
| 2 | Formal partnership agreement (Bank ↔ Java Institute) | Critical | Pending |
| 3 | Escrow / tranche release mechanism for fund transfers | Critical | Pending |
| 4 | Academic batch vs continuous recruitment timing | Important | Pending |
| 5 | Minimum batch size for BSc program | Important | Pending |
| 6 | Degree accreditation / which university certifies | Important | Pending |
| 7 | Post-graduation MLM status (can they still earn?) | Important | Pending |
| 8 | Tax / WHT on MLM commissions | Important | Pending |
| 9 | University certification fee lock period (contract) | Important | Pending |
| 10 | Data ownership agreement (Bank vs Java Institute) | Important | Pending |
| 11 | Commission disbursement SLA (Java Institute funds → Bank pays) | Important | Pending |
| 12 | MPhil program duration | Minor | Pending |

---

## 14. Version History

| Version | Date | Key Change | Investment | Bank Margin | Status |
|---------|------|-----------|-----------|-------------|--------|
| v1.0 | Apr 29, 2026 | Initial model — single product, bank runs everything | 1,500,000 | 256,000 (14.2%) | Superseded |
| v1.1 | Apr 29, 2026 | Added Rs. 500,000 university certification fee | 1,500,000 | 130,000 (8.67%) | Superseded |
| v2.0 | Apr 29, 2026 | Price increase to 1.8M + binary pool cap mechanism | 1,800,000 | 256,000 (14.2%) | Superseded |
| v2.1 | Apr 29, 2026 | AI Engineer terminology + open participation (anyone can join by nominating a student) | 1,800,000 | 256,000 (14.2%) | Superseded |
| **v3.0** | **Apr 29, 2026** | **Partnership: Bank 6% + Java Institute 94%. System hosted by Java Institute.** | **1,800,000** | **108,000 (6%)** | **Current** |

### Versioning Strategy
- **Format:** `EEPIP-vMAJOR.MINOR`
- **MAJOR** — Structural change (financial model, partnership, tree rules, new commission type)
- **MINOR** — Parameter tweak (amounts, percentages, caps, thresholds)
- **Code:** Git tags matching design version (`eepip-v3.0`)
- **Database:** Versioned migration scripts (`V3_0__description.sql`)
- **API:** Path-versioned REST endpoints (`/api/eepip/v3/...`)

---

## 15. Design Decisions Log

| Decision | Rationale |
|----------|-----------|
| Price increased from 1.5M to 1.8M | Original margin (8.67%) was too thin after adding Rs. 500K cert fee |
| Binary pool cap with pro-rating | Without it, binary payouts could exceed the pool and bankrupt the commission fund |
| Nodes called "AI Engineers" | Owner's branding choice for MLM participants |
| Open participation (not just students) | Expands market from "students aged 18-25" to "any adult with Rs. 1.8M" — 10x larger market |
| Bank keeps only 6% | Bank's role is minimal (collection + trust). Java Institute does all operations. |
| System hosted by Java Institute | Full operation runs on Java Institute's computers, not the bank |
| Commissions disbursed through bank | Maintains trust — AI Engineers see payments from a bank, not an education company |
| No withdrawal policy | Academic programs are irreversible; this is not a savings deposit |
| Commissions stop on dropout | Prevents gaming — AI Engineer must ensure student completes program |
| MPhil free from Java Institute | Bank-provider arrangement; member is shown Rs. 1.8M "pays for MPhil" |

---

## 16. Next Steps

1. Resolve remaining gaps (Section 13) with the owner
2. Design database schema (JPA entities)
3. Build EJB service layer
4. Build JAX-RS REST API
5. Build React frontend (tree visualization, dashboard, commission reports)
6. Deploy on Docker (Java Institute infrastructure)

---

## 17. Key Context for New AI Session

- The existing TEMCO ERP codebase is at `f:\TemcoERP`
- The ERP already has an SSO service, Admin service, and Finance service using the same tech stack (WildFly + EJB + JPA + JAX-RS + MariaDB + Docker)
- The MLM module should follow the **exact same patterns** as existing services
- The full design is also documented in `f:\TemcoERP\docs\current_status.md` (appended at the end)
- The owner may still provide additional concept changes — always ask before implementing
- Never start implementation until the owner explicitly approves the final model
