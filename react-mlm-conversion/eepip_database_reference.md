# EEPIP Database Reference — Complete Schema Documentation

**Database:** `temco_system`
**Table Prefix:** `eepip_`
**Total Tables:** 15
**Schema Version:** v3.4 (May 3, 2026)
**Migrations Applied:** V28-V41

---

## Table Overview

| # | Table Name | Purpose | Migration |
|---|------------|---------|-----------|
| 1 | eepip_product | Product configuration (investment amount, commission rates) | V28 |
| 2 | eepip_ai_engineer | AI Engineer (Earn While Learn — self-nomination only) | V29 |
| 3 | eepip_commission | AI Engineer earnings with approval & tax tracking | V34, V40 |
| 4 | eepip_binary_pool | AI Engineer commission pool management | V28 |
| 5 | eepip_rank_history | AI Engineer rank promotion tracking | V28 |
| 6 | eepip_epin | Voucher/EPIN system | V28, V35 |
| 7 | eepip_agent | Agent (introduces AI Engineers) | V28 |
| 8 | eepip_agent_commission | Agent earnings with tax tracking | V40 |
| 9 | eepip_agent_binary_pool | Agent commission pool management | V28 |
| 10 | eepip_payment | Transaction tracking | V31 |
| 11 | eepip_academic_event | Academic progress tracking | V32 |
| 12 | eepip_audit_log | System-wide audit trail | V33 |
| 13 | eepip_withdrawal | Payout management | V36 |
| 14 | eepip_config | System configuration | V39 |
| 15 | eepip_document | KYC/verification tracking | V41 |

---

## Core Tables

### 1. eepip_product

**Purpose:** Store product configuration including investment amount and commission rates. All commission amounts are derived at runtime: `investment_amount × rate`.

| Column | Type | Required | Default | Description |
|--------|------|----------|---------|-------------|
| id | INT(11) | PK | AUTO_INCREMENT | Primary key |
| product_code | VARCHAR(50) | YES | UNIQUE | e.g. 'EEPIP_BSC_MPHIL' |
| product_name | VARCHAR(200) | YES | - | Product name |
| investment_amount | DECIMAL(12,2) | YES | - | e.g. 1800000.00 |
| currency | VARCHAR(3) | NO | 'LKR' | Currency code |
| direct_sponsor_rate | DECIMAL(5,2) | NO | 2.00 | 2% of investment |
| binary_pool_rate | DECIMAL(5,2) | NO | 5.00 | 5% of investment |
| matching_bonus_rate | DECIMAL(5,2) | NO | 1.50 | 1.5% of investment |
| leadership_pool_rate | DECIMAL(5,2) | NO | 1.50 | 1.5% of investment |
| agent_direct_rate | DECIMAL(5,2) | NO | 2.00 | 2% of investment |
| agent_pool_rate | DECIMAL(5,2) | NO | 3.00 | 3% of investment |
| bank_margin_rate | DECIMAL(5,2) | NO | 6.00 | 6% of investment |
| max_binary_pairs_per_month | INT(11) | NO | 3 | AI Engineer pairing cap |
| max_agent_pairs_per_month | INT(11) | NO | 2 | Agent pairing cap |
| status | ENUM | NO | 'ACTIVE' | ACTIVE, DISCONTINUED, DRAFT |
| effective_from | DATE | YES | - | Effective start date |
| effective_to | DATE | NO | NULL | NULL = no end date |
| is_active | TINYINT(1) | NO | 1 | Soft delete flag |
| created_by | INT(11) | NO | NULL | FK to member |
| created_at | TIMESTAMP | NO | CURRENT_TIMESTAMP | Creation timestamp |
| updated_by | INT(11) | NO | NULL | FK to member |
| updated_at | TIMESTAMP | NO | CURRENT_TIMESTAMP ON UPDATE | Update timestamp |
| deleted_at | TIMESTAMP | NO | NULL | Soft delete timestamp |
| deleted_by | INT(11) | NO | NULL | FK to member |
| deletion_reason | TEXT | NO | NULL | Reason for deletion |

**Indexes:**
- PRIMARY KEY (id)
- UNIQUE KEY uk_product_code (product_code)
- KEY idx_status (status)
- KEY idx_effective_from (effective_from)

---

### 2. eepip_ai_engineer

**Purpose:** AI Engineer (Earn While Learn Model — every AI Engineer is also a Student, self-nomination mandatory, no third-party student nominations).

| Column | Type | Required | Default | Description |
|--------|------|----------|---------|-------------|
| id | INT(11) | PK | AUTO_INCREMENT | Primary key |
| member_id | INT(11) | YES | UNIQUE | FK to member (SSO integration) |
| sponsor_id | INT(11) | NO | NULL | Recruiter in AI Engineer tree |
| parent_id | INT(11) | NO | NULL | Placement parent in AI Engineer tree |
| position | ENUM | YES | - | LEFT or RIGHT |
| tree_level | INT(11) | NO | 0 | Depth in tree |
| tree_path | VARCHAR(500) | NO | NULL | Path in tree |
| member_state | ENUM | YES | 'WAITING_ENROLLMENT' | Academic status (see enum below) |
| academic_eligibility_verified | TINYINT(1) | NO | 0 | Academic eligibility verified |
| enrollment_date | DATE | NO | NULL | Date of enrollment |
| expected_graduation | DATE | NO | NULL | Expected graduation date |
| product_id | INT(11) | YES | - | FK to eepip_product |
| investment_date | DATE | YES | - | Date of investment |
| bank_reference | VARCHAR(100) | NO | NULL | Bank reference |
| introducing_agent_id | INT(11) | NO | NULL | FK to eepip_agent (optional) |
| activation_date | DATE | NO | NULL | Date activated |
| bsc_start_date | DATE | NO | NULL | BSc start date |
| bsc_end_date | DATE | NO | NULL | BSc end date |
| mphil_start_date | DATE | NO | NULL | MPhil start date |
| mphil_end_date | DATE | NO | NULL | MPhil end date |
| left_bv | INT(11) | NO | 0 | Left business volume |
| right_bv | INT(11) | NO | 0 | Right business volume |
| carry_forward_left_bv | INT(11) | NO | 0 | Carry forward left BV |
| carry_forward_right_bv | INT(11) | NO | 0 | Carry forward right BV |
| rank_code | ENUM | NO | 'STARTER' | Rank (see enum below) |
| total_earnings | DECIMAL(12,2) | NO | 0 | Total lifetime earnings |
| monthly_earnings | DECIMAL(12,2) | NO | 0 | Current month earnings |
| team_size | INT(11) | NO | 0 | Total team size |
| direct_recruits | INT(11) | NO | 0 | Direct recruits count |
| direct_recruits_left | INT(11) | NO | 0 | Direct recruits left leg |
| direct_recruits_right | INT(11) | NO | 0 | Direct recruits right leg |
| positions_held | INT(11) | NO | 1 | Number of positions |
| is_active | TINYINT(1) | NO | 1 | Soft delete flag |
| created_by | INT(11) | NO | NULL | FK to member |
| created_at | TIMESTAMP | NO | CURRENT_TIMESTAMP | Creation timestamp |
| updated_by | INT(11) | NO | NULL | FK to member |
| updated_at | TIMESTAMP | NO | CURRENT_TIMESTAMP ON UPDATE | Update timestamp |
| last_active | TIMESTAMP | NO | NULL | Last activity timestamp |
| deleted_at | TIMESTAMP | NO | NULL | Soft delete timestamp |
| deleted_by | INT(11) | NO | NULL | FK to member |
| deletion_reason | TEXT | NO | NULL | Reason for deletion |

**Enums:**
- `member_state`: WAITING_ENROLLMENT, ENROLLED, BSC_YEAR_1_IN_PROGRESS, BSC_YEAR_2_IN_PROGRESS, BSC_YEAR_3_IN_PROGRESS, BSC_COMPLETED, MPHIL_IN_PROGRESS, MPHIL_COMPLETED, DROPPED_OUT, FROZEN
- `rank_code`: STARTER, BRONZE, SILVER, GOLD, PLATINUM, DIAMOND
- `position`: LEFT, RIGHT

**Indexes:**
- PRIMARY KEY (id)
- UNIQUE KEY uk_member_id (member_id)
- KEY idx_sponsor (sponsor_id)
- KEY idx_parent (parent_id)
- KEY idx_member_state (member_state)
- KEY idx_rank (rank_code)
- KEY idx_introducing_agent (introducing_agent_id)
- KEY idx_product (product_id)
- KEY idx_composite_tree (sponsor_id, parent_id, position)
- KEY idx_composite_status_rank (member_state, rank_code)

**Foreign Keys:**
- fk_ai_engineer_member → member(id)
- fk_ai_engineer_sponsor → eepip_ai_engineer(id)
- fk_ai_engineer_parent → eepip_ai_engineer(id)
- fk_ai_engineer_product → eepip_product(id)
- fk_ai_engineer_agent → eepip_agent(id)

---

### 3. eepip_commission

**Purpose:** AI Engineer earnings with approval workflow and tax tracking.

| Column | Type | Required | Default | Description |
|--------|------|----------|---------|-------------|
| id | INT(11) | PK | AUTO_INCREMENT | Primary key |
| ai_engineer_id | INT(11) | YES | - | FK to eepip_ai_engineer |
| type | ENUM | YES | - | Commission type (see enum below) |
| amount | DECIMAL(12,2) | YES | - | Gross amount |
| original_amount | DECIMAL(12,2) | YES | - | Original amount before adjustments |
| tax_amount | DECIMAL(12,2) | NO | 0 | Tax amount deducted |
| net_amount | DECIMAL(12,2) | YES | - | Net amount after tax |
| tds_rate | DECIMAL(5,2) | NO | 0 | TDS rate percentage |
| currency | VARCHAR(3) | NO | 'LKR' | Currency code |
| pro_ration_percentage | DECIMAL(5,2) | NO | 100.00 | Pro-ration percentage |
| description | TEXT | NO | NULL | Description |
| related_ai_engineer_id | INT(11) | NO | NULL | Related AI Engineer ID |
| transaction_id | VARCHAR(100) | NO | NULL | Transaction ID |
| commission_date | DATE | YES | - | Date of commission |
| status | ENUM | NO | 'PENDING' | Commission status (see enum below) |
| approved_by | INT(11) | NO | NULL | FK to member who approved |
| approved_at | TIMESTAMP | NO | NULL | Approval timestamp |
| rejection_reason | TEXT | NO | NULL | Reason for rejection |
| paid_date | DATE | NO | NULL | Date paid |
| cycle_month | VARCHAR(7) | YES | - | e.g. '2026-05' |
| metadata_json | TEXT | NO | NULL | JSON metadata |
| is_active | TINYINT(1) | NO | 1 | Soft delete flag |
| created_by | INT(11) | NO | NULL | FK to member |
| created_at | TIMESTAMP | NO | CURRENT_TIMESTAMP | Creation timestamp |
| updated_by | INT(11) | NO | NULL | FK to member |
| updated_at | TIMESTAMP | NO | CURRENT_TIMESTAMP ON UPDATE | Update timestamp |

**Enums:**
- `type`: DIRECT_SPONSOR, BINARY_PAIRING, MATCHING_BONUS, LEADERSHIP_POOL, RANK_ACHIEVEMENT
- `status`: PENDING, APPROVED, PAID, PRO_RATED, REJECTED, HELD

**Indexes:**
- PRIMARY KEY (id)
- KEY idx_ai_engineer (ai_engineer_id)
- KEY idx_type (type)
- KEY idx_status (status)
- KEY idx_cycle_month (cycle_month)
- KEY idx_composite_engineer_month_status (ai_engineer_id, cycle_month, status)
- KEY idx_composite_date_type (commission_date, type)

**Foreign Keys:**
- fk_commission_ai_engineer → eepip_ai_engineer(id)
- fk_commission_related_engineer → eepip_ai_engineer(id)
- fk_commission_approved_by → member(id)

---

### 4. eepip_binary_pool

**Purpose:** AI Engineer commission pool management with pro-ration.

| Column | Type | Required | Default | Description |
|--------|------|----------|---------|-------------|
| id | INT(11) | PK | AUTO_INCREMENT | Primary key |
| cycle_month | VARCHAR(7) | YES | UNIQUE | e.g. '2026-05' |
| enrollments_this_month | INT(11) | NO | 0 | Enrollments this month |
| pool_amount | DECIMAL(12,2) | NO | 0 | Pool amount |
| carry_forward_from_last | DECIMAL(12,2) | NO | 0 | Carry forward from last month |
| total_claims | DECIMAL(12,2) | NO | 0 | Total claims |
| pro_ration_triggered | TINYINT(1) | NO | 0 | Pro-ration triggered flag |
| pro_ration_percentage | DECIMAL(5,2) | NO | 100.00 | Pro-ration percentage |
| surplus | DECIMAL(12,2) | NO | 0 | Surplus amount |
| utilization | DECIMAL(5,2) | NO | 0 | Pool utilization percentage |
| calculated_at | TIMESTAMP | NO | CURRENT_TIMESTAMP | Last calculation timestamp |

**Indexes:**
- PRIMARY KEY (id)
- UNIQUE KEY uk_cycle_month (cycle_month)

---

### 5. eepip_rank_history

**Purpose:** AI Engineer rank promotion tracking.

| Column | Type | Required | Default | Description |
|--------|------|----------|---------|-------------|
| id | INT(11) | PK | AUTO_INCREMENT | Primary key |
| ai_engineer_id | INT(11) | YES | - | FK to eepip_ai_engineer |
| previous_rank | ENUM | NO | NULL | Previous rank (see enum below) |
| new_rank | ENUM | YES | - | New rank (see enum below) |
| reward_amount | DECIMAL(12,2) | NO | 0 | Reward amount |
| achieved_at | TIMESTAMP | NO | CURRENT_TIMESTAMP | Achievement timestamp |

**Enums:**
- `previous_rank`, `new_rank`: STARTER, BRONZE, SILVER, GOLD, PLATINUM, DIAMOND

**Indexes:**
- PRIMARY KEY (id)
- KEY idx_ai_engineer (ai_engineer_id)

**Foreign Keys:**
- fk_rank_history_ai_engineer → eepip_ai_engineer(id)

---

### 6. eepip_epin

**Purpose:** Voucher/EPIN system for enrollment.

| Column | Type | Required | Default | Description |
|--------|------|----------|---------|-------------|
| id | INT(11) | PK | AUTO_INCREMENT | Primary key |
| epin_no | VARCHAR(6) | YES | UNIQUE | EPIN number |
| epin_name | VARCHAR(100) | YES | - | EPIN name |
| product_id | INT(11) | YES | - | FK to eepip_product |
| type | ENUM | NO | 'REGULAR' | REGULAR, PREMIUM |
| date_generated | TIMESTAMP | NO | CURRENT_TIMESTAMP | Generation timestamp |
| date_used | TIMESTAMP | NO | NULL | Usage timestamp |
| date_expires | TIMESTAMP | NO | NULL | Expiration timestamp (NULL default) |
| user_key | INT(11) | NO | NULL | FK to eepip_ai_engineer |
| status | ENUM | NO | 'GENERATED' | GENERATED, ASSIGNED, USED, EXPIRED |
| issued_by_member_id | INT(11) | YES | - | FK to member who issued |
| metadata_json | TEXT | NO | NULL | JSON metadata |
| is_active | TINYINT(1) | NO | 1 | Soft delete flag |
| created_by | INT(11) | NO | NULL | FK to member |
| created_at | TIMESTAMP | NO | CURRENT_TIMESTAMP | Creation timestamp |
| updated_by | INT(11) | NO | NULL | FK to member |
| updated_at | TIMESTAMP | NO | CURRENT_TIMESTAMP ON UPDATE | Update timestamp |

**Enums:**
- `type`: REGULAR, PREMIUM
- `status`: GENERATED, ASSIGNED, USED, EXPIRED

**Indexes:**
- PRIMARY KEY (id)
- UNIQUE KEY uk_epin_no (epin_no)
- KEY idx_user_key (user_key)
- KEY idx_status (status)
- KEY idx_issued_by (issued_by_member_id)

**Foreign Keys:**
- fk_epin_product → eepip_product(id)
- fk_epin_issued_by → member(id)

---

## Agent System Tables

### 7. eepip_agent

**Purpose:** Agent (introduces AI Engineers, separate binary tree).

| Column | Type | Required | Default | Description |
|--------|------|----------|---------|-------------|
| id | INT(11) | PK | AUTO_INCREMENT | Primary key |
| member_id | INT(11) | YES | UNIQUE | FK to member (SSO integration) |
| ai_engineer_id | INT(11) | NO | NULL | Optional: if agent invests as AI Engineer |
| sponsor_agent_id | INT(11) | NO | NULL | Agent who recruited this agent |
| parent_agent_id | INT(11) | NO | NULL | Placement parent in agent tree |
| position | ENUM | NO | NULL | LEFT or RIGHT |
| tree_level | INT(11) | NO | 0 | Depth in tree |
| status | ENUM | NO | 'PENDING' | PENDING, ACTIVE, SUSPENDED, TERMINATED |
| activation_date | DATE | NO | NULL | Date activated |
| total_referrals | INT(11) | NO | 0 | Total AI Engineers introduced |
| total_agent_recruits | INT(11) | NO | 0 | Total agents recruited |
| total_direct_earnings | DECIMAL(12,2) | NO | 0 | Total direct earnings |
| total_binary_earnings | DECIMAL(12,2) | NO | 0 | Total binary earnings |
| appointed_by_member_id | INT(11) | YES | - | FK to member who appointed |
| appointed_date | DATE | YES | - | Appointment date |
| is_active | TINYINT(1) | NO | 1 | Soft delete flag |
| created_by | INT(11) | NO | NULL | FK to member |
| created_at | TIMESTAMP | NO | CURRENT_TIMESTAMP | Creation timestamp |
| updated_by | INT(11) | NO | NULL | FK to member |
| updated_at | TIMESTAMP | NO | CURRENT_TIMESTAMP ON UPDATE | Update timestamp |
| deleted_at | TIMESTAMP | NO | NULL | Soft delete timestamp |
| deleted_by | INT(11) | NO | NULL | FK to member |
| deletion_reason | TEXT | NO | NULL | Reason for deletion |

**Enums:**
- `status`: PENDING, ACTIVE, SUSPENDED, TERMINATED
- `position`: LEFT, RIGHT

**Indexes:**
- PRIMARY KEY (id)
- UNIQUE KEY uk_member_id (member_id)
- KEY idx_sponsor_agent (sponsor_agent_id)
- KEY idx_parent_agent (parent_agent_id)
- KEY idx_status (status)
- KEY idx_appointed_by (appointed_by_member_id)
- KEY idx_composite_agent_tree (sponsor_agent_id, parent_agent_id, position)
- KEY idx_composite_status_activation (status, activation_date)

**Foreign Keys:**
- fk_agent_member → member(id)
- fk_agent_ai_engineer → eepip_ai_engineer(id)
- fk_agent_sponsor → eepip_agent(id)
- fk_agent_parent → eepip_agent(id)
- fk_agent_appointed_by → member(id)

---

### 8. eepip_agent_commission

**Purpose:** Agent earnings with tax tracking.

| Column | Type | Required | Default | Description |
|--------|------|----------|---------|-------------|
| id | INT(11) | PK | AUTO_INCREMENT | Primary key |
| agent_id | INT(11) | YES | - | FK to eepip_agent |
| type | ENUM | YES | - | DIRECT_REFERRAL, BINARY_PAIRING |
| ai_engineer_id | INT(11) | NO | NULL | AI Engineer introduced |
| amount | DECIMAL(12,2) | YES | - | Gross amount |
| tax_amount | DECIMAL(12,2) | NO | 0 | Tax amount deducted |
| net_amount | DECIMAL(12,2) | YES | - | Net amount after tax |
| tds_rate | DECIMAL(5,2) | NO | 0 | TDS rate percentage |
| currency | VARCHAR(3) | NO | 'LKR' | Currency code |
| status | ENUM | NO | 'PENDING' | PENDING, APPROVED, PAID, REJECTED |
| commission_date | DATE | YES | - | Date of commission |
| cycle_month | VARCHAR(7) | NO | NULL | e.g. '2026-05' |
| paid_date | DATE | NO | NULL | Date paid |
| is_active | TINYINT(1) | NO | 1 | Soft delete flag |
| created_by | INT(11) | NO | NULL | FK to member |
| created_at | TIMESTAMP | NO | CURRENT_TIMESTAMP | Creation timestamp |
| updated_by | INT(11) | NO | NULL | FK to member |
| updated_at | TIMESTAMP | NO | CURRENT_TIMESTAMP ON UPDATE | Update timestamp |

**Enums:**
- `type`: DIRECT_REFERRAL, BINARY_PAIRING
- `status`: PENDING, APPROVED, PAID, REJECTED

**Indexes:**
- PRIMARY KEY (id)
- KEY idx_agent (agent_id)
- KEY idx_type (type)
- KEY idx_status (status)

**Foreign Keys:**
- fk_agent_commission_agent → eepip_agent(id)
- fk_agent_commission_ai_engineer → eepip_ai_engineer(id)

---

### 9. eepip_agent_binary_pool

**Purpose:** Agent commission pool management.

| Column | Type | Required | Default | Description |
|--------|------|----------|---------|-------------|
| id | INT(11) | PK | AUTO_INCREMENT | Primary key |
| cycle_month | VARCHAR(7) | YES | UNIQUE | e.g. '2026-05' |
| enrollments_this_month | INT(11) | NO | 0 | Enrollments this month |
| pool_amount | DECIMAL(12,2) | NO | 0 | Pool amount |
| carry_forward_from_last | DECIMAL(12,2) | NO | 0 | Carry forward from last month |
| total_claims | DECIMAL(12,2) | NO | 0 | Total claims |
| pro_ration_triggered | TINYINT(1) | NO | 0 | Pro-ration triggered flag |
| pro_ration_percentage | DECIMAL(5,2) | NO | 100.00 | Pro-ration percentage |
| surplus | DECIMAL(12,2) | NO | 0 | Surplus amount |
| calculated_at | TIMESTAMP | NO | CURRENT_TIMESTAMP | Last calculation timestamp |

**Indexes:**
- PRIMARY KEY (id)
- UNIQUE KEY uk_cycle_month (cycle_month)

---

## New Tables (V31-V41)

### 10. eepip_payment (V31)

**Purpose:** Transaction tracking for investments.

| Column | Type | Required | Default | Description |
|--------|------|----------|---------|-------------|
| id | INT(11) | PK | AUTO_INCREMENT | Primary key |
| ai_engineer_id | INT(11) | YES | - | FK to eepip_ai_engineer |
| amount | DECIMAL(12,2) | YES | - | Payment amount |
| payment_method | ENUM | YES | 'BANK_TRANSFER' | BANK_TRANSFER, CHECK, EPIN, CARD, CASH |
| bank_reference | VARCHAR(100) | NO | NULL | Bank reference |
| transaction_id | VARCHAR(100) | NO | NULL | Transaction ID |
| payment_date | DATE | YES | - | Payment date |
| payment_time | TIME | NO | NULL | Payment time |
| status | ENUM | YES | 'PENDING' | PENDING, CONFIRMED, FAILED, REFUNDED, PARTIALLY_REFUNDED |
| currency | VARCHAR(3) | NO | 'LKR' | Currency code |
| exchange_rate | DECIMAL(10,6) | NO | NULL | Exchange rate |
| bank_name | VARCHAR(200) | NO | NULL | Bank name |
| branch_name | VARCHAR(200) | NO | NULL | Branch name |
| check_number | VARCHAR(50) | NO | NULL | Check number |
| epin_id | INT(11) | NO | NULL | FK to eepip_epin |
| refund_amount | DECIMAL(12,2) | NO | NULL | Refund amount |
| refund_date | DATE | NO | NULL | Refund date |
| refund_reason | TEXT | NO | NULL | Refund reason |
| notes | TEXT | NO | NULL | Notes |
| confirmed_by | INT(11) | NO | NULL | FK to member who confirmed |
| confirmed_at | TIMESTAMP | NO | NULL | Confirmation timestamp |
| verified_by | INT(11) | NO | NULL | FK to member who verified |
| verified_at | TIMESTAMP | NO | NULL | Verification timestamp |
| is_active | TINYINT(1) | NO | 1 | Soft delete flag |
| created_by | INT(11) | NO | NULL | FK to member |
| created_at | TIMESTAMP | NO | CURRENT_TIMESTAMP | Creation timestamp |
| updated_by | INT(11) | NO | NULL | FK to member |
| updated_at | TIMESTAMP | NO | CURRENT_TIMESTAMP ON UPDATE | Update timestamp |

**Indexes:**
- PRIMARY KEY (id)
- KEY idx_ai_engineer (ai_engineer_id)
- KEY idx_payment_date (payment_date)
- KEY idx_status (status)
- KEY idx_bank_reference (bank_reference)
- KEY idx_transaction_id (transaction_id)

**Foreign Keys:**
- fk_payment_ai_engineer → eepip_ai_engineer(id)
- fk_payment_epin → eepip_epin(id)

---

### 11. eepip_academic_event (V32)

**Purpose:** Academic progress tracking.

| Column | Type | Required | Default | Description |
|--------|------|----------|---------|-------------|
| id | INT(11) | PK | AUTO_INCREMENT | Primary key |
| ai_engineer_id | INT(11) | YES | - | FK to eepip_ai_engineer |
| event_type | ENUM | YES | - | YEAR_PROMOTION, EXAM_RESULT, COURSE_REGISTRATION, THESIS_SUBMISSION, THESIS_APPROVED, GRADUATION_ELIGIBLE, CERTIFICATE_ISSUED |
| event_date | DATE | YES | - | Event date |
| academic_year | INT(4) | NO | NULL | Academic year |
| semester | TINYINT(1) | NO | NULL | Semester number |
| course_code | VARCHAR(50) | NO | NULL | Course code |
| course_name | VARCHAR(200) | NO | NULL | Course name |
| grade | VARCHAR(10) | NO | NULL | Grade |
| gpa | DECIMAL(3,2) | NO | NULL | GPA |
| credits | DECIMAL(4,1) | NO | NULL | Credits |
| passed | TINYINT(1) | NO | NULL | Pass/fail |
| description | TEXT | NO | NULL | Description |
| remarks | TEXT | NO | NULL | Remarks |
| verified_by | INT(11) | NO | NULL | FK to member who verified |
| verified_at | TIMESTAMP | NO | NULL | Verification timestamp |
| is_active | TINYINT(1) | NO | 1 | Soft delete flag |
| created_by | INT(11) | NO | NULL | FK to member |
| created_at | TIMESTAMP | NO | CURRENT_TIMESTAMP | Creation timestamp |
| updated_by | INT(11) | NO | NULL | FK to member |
| updated_at | TIMESTAMP | NO | CURRENT_TIMESTAMP ON UPDATE | Update timestamp |

**Indexes:**
- PRIMARY KEY (id)
- KEY idx_ai_engineer (ai_engineer_id)
- KEY idx_event_type (event_type)
- KEY idx_event_date (event_date)
- KEY idx_academic_year (academic_year)

**Foreign Keys:**
- fk_academic_event_ai_engineer → eepip_ai_engineer(id)

---

### 12. eepip_audit_log (V33)

**Purpose:** System-wide audit trail.

| Column | Type | Required | Default | Description |
|--------|------|----------|---------|-------------|
| id | INT(11) | PK | AUTO_INCREMENT | Primary key |
| entity_type | ENUM | YES | - | AI_ENGINEER, AGENT, COMMISSION, PAYMENT, WITHDRAWAL, EPIN, RANK, PRODUCT, SYSTEM |
| entity_id | INT(11) | NO | NULL | Entity ID |
| action_type | ENUM | YES | - | CREATE, UPDATE, DELETE, LOGIN, LOGOUT, APPROVE, REJECT, PROMOTE, DEMOTE, STATUS_CHANGE, PAYMENT_RECEIVED, WITHDRAWAL_REQUESTED, EPIN_GENERATED, EPIN_USED, RANK_ACHIEVED |
| action_description | TEXT | NO | NULL | Action description |
| previous_value | TEXT | NO | NULL | Previous value |
| new_value | TEXT | NO | NULL | New value |
| performed_by_member_id | INT(11) | NO | NULL | FK to member |
| performed_by_role | ENUM | NO | NULL | ADMIN, AGENT, AI_ENGINEER, SYSTEM, API |
| ip_address | VARCHAR(45) | NO | NULL | IP address |
| user_agent | TEXT | NO | NULL | User agent |
| created_at | TIMESTAMP | NO | CURRENT_TIMESTAMP | Creation timestamp |

**Indexes:**
- PRIMARY KEY (id)
- KEY idx_entity_type (entity_type)
- KEY idx_entity_id (entity_id)
- KEY idx_action_type (action_type)
- KEY idx_created_at (created_at)
- KEY idx_performed_by (performed_by_member_id)

---

### 13. eepip_withdrawal (V36)

**Purpose:** Payout management.

| Column | Type | Required | Default | Description |
|--------|------|----------|---------|-------------|
| id | INT(11) | PK | AUTO_INCREMENT | Primary key |
| member_id | INT(11) | YES | - | FK to member |
| withdrawal_type | ENUM | YES | 'COMMISSION_EARNINGS' | COMMISSION_EARNINGS, BONUS, REFUND |
| amount | DECIMAL(12,2) | YES | - | Withdrawal amount |
| currency | VARCHAR(3) | NO | 'LKR' | Currency code |
| bank_name | VARCHAR(200) | NO | NULL | Bank name |
| bank_branch | VARCHAR(200) | NO | NULL | Branch name |
| account_number | VARCHAR(50) | YES | - | Account number |
| account_holder_name | VARCHAR(200) | YES | - | Account holder name |
| account_type | ENUM | NO | 'SAVINGS' | SAVINGS, CURRENT |
| request_date | DATE | YES | - | Request date |
| request_time | TIME | NO | NULL | Request time |
| status | ENUM | YES | 'REQUESTED' | REQUESTED, PENDING_VERIFICATION, APPROVED, PROCESSING, PAID, REJECTED, CANCELLED |
| approved_by | INT(11) | NO | NULL | FK to member who approved |
| approved_at | TIMESTAMP | NO | NULL | Approval timestamp |
| approved_notes | TEXT | NO | NULL | Approval notes |
| rejection_reason | TEXT | NO | NULL | Rejection reason |
| processed_date | DATE | NO | NULL | Processed date |
| transaction_reference | VARCHAR(100) | NO | NULL | Transaction reference |
| fees | DECIMAL(10,2) | NO | 0 | Processing fees |
| net_amount | DECIMAL(12,2) | NO | NULL | Net amount after fees |
| notes | TEXT | NO | NULL | Notes |
| is_active | TINYINT(1) | NO | 1 | Soft delete flag |
| created_by | INT(11) | NO | NULL | FK to member |
| created_at | TIMESTAMP | NO | CURRENT_TIMESTAMP | Creation timestamp |
| updated_by | INT(11) | NO | NULL | FK to member |
| updated_at | TIMESTAMP | NO | CURRENT_TIMESTAMP ON UPDATE | Update timestamp |

**Indexes:**
- PRIMARY KEY (id)
- KEY idx_member_id (member_id)
- KEY idx_request_date (request_date)
- KEY idx_status (status)
- KEY idx_account_number (account_number)

**Foreign Keys:**
- fk_withdrawal_member → member(id)
- fk_withdrawal_approved_by → member(id)

---

### 14. eepip_config (V39)

**Purpose:** System configuration.

| Column | Type | Required | Default | Description |
|--------|------|----------|---------|-------------|
| id | INT(11) | PK | AUTO_INCREMENT | Primary key |
| config_key | VARCHAR(100) | YES | - | Configuration key |
| config_value | TEXT | NO | NULL | Configuration value |
| config_type | ENUM | YES | 'STRING' | STRING, NUMBER, BOOLEAN, DATE, JSON |
| description | TEXT | NO | NULL | Description |
| category | VARCHAR(50) | NO | NULL | Category |
| is_encrypted | TINYINT(1) | NO | 0 | Encrypted flag |
| is_active | TINYINT(1) | NO | 1 | Active flag |
| effective_from | DATE | NO | NULL | Effective start date |
| effective_to | DATE | NO | NULL | Effective end date |
| created_by | INT(11) | NO | NULL | FK to member |
| created_at | TIMESTAMP | NO | CURRENT_TIMESTAMP | Creation timestamp |
| updated_by | INT(11) | NO | NULL | FK to member |
| updated_at | TIMESTAMP | NO | CURRENT_TIMESTAMP ON UPDATE | Update timestamp |

**Indexes:**
- PRIMARY KEY (id)
- UNIQUE KEY uk_config_key (config_key, effective_from)
- KEY idx_category (category)
- KEY idx_is_active (is_active)

**Default Configuration Keys:**
- commission_cycle_day: 25
- commission_cutoff_time: 23:59:59
- min_withdrawal_amount: 5000
- withdrawal_processing_days: 7
- epin_expiry_days: 180
- academic_year_start_month: 9
- binary_pair_calculation_method: DAILY
- tax_rate_commission: 5.00
- system_maintenance_mode: false

---

### 15. eepip_document (V41)

**Purpose:** KYC/verification tracking.

| Column | Type | Required | Default | Description |
|--------|------|----------|---------|-------------|
| id | INT(11) | PK | AUTO_INCREMENT | Primary key |
| member_id | INT(11) | YES | - | FK to member |
| document_type | ENUM | YES | - | NIC, PASSPORT, ACADEMIC_CERTIFICATE, BANK_STATEMENT, PHOTO, SIGNATURE, PROOF_OF_ADDRESS, OTHER |
| document_name | VARCHAR(255) | NO | NULL | Document name |
| document_url | VARCHAR(500) | YES | - | Document URL |
| document_number | VARCHAR(100) | NO | NULL | Document number |
| issue_date | DATE | NO | NULL | Issue date |
| expiry_date | DATE | NO | NULL | Expiry date |
| file_size | BIGINT | NO | NULL | File size |
| file_type | VARCHAR(50) | NO | NULL | File type |
| verification_status | ENUM | YES | 'PENDING' | PENDING, VERIFIED, REJECTED, EXPIRED, REUPLOAD_REQUIRED |
| verified_by | INT(11) | NO | NULL | FK to member who verified |
| verified_at | TIMESTAMP | NO | NULL | Verification timestamp |
| rejection_reason | TEXT | NO | NULL | Rejection reason |
| notes | TEXT | NO | NULL | Notes |
| is_primary | TINYINT(1) | NO | 0 | Primary document flag |
| is_active | TINYINT(1) | NO | 1 | Soft delete flag |
| created_by | INT(11) | NO | NULL | FK to member |
| created_at | TIMESTAMP | NO | CURRENT_TIMESTAMP | Creation timestamp |
| updated_by | INT(11) | NO | NULL | FK to member |
| updated_at | TIMESTAMP | NO | CURRENT_TIMESTAMP ON UPDATE | Update timestamp |

**Indexes:**
- PRIMARY KEY (id)
- KEY idx_member_id (member_id)
- KEY idx_document_type (document_type)
- KEY idx_verification_status (verification_status)
- KEY idx_expiry_date (expiry_date)

**Foreign Keys:**
- fk_document_member → member(id)
- fk_document_verified_by → member(id)

---

## Foreign Key Relationships

### Self-Referencing (Circular FKs)
- `eepip_ai_engineer.sponsor_id` → `eepip_ai_engineer(id)`
- `eepip_ai_engineer.parent_id` → `eepip_ai_engineer(id)`
- `eepip_agent.sponsor_agent_id` → `eepip_agent(id)`
- `eepip_agent.parent_agent_id` → `eepip_agent(id)`

### SSO Integration (member table)
- All main tables use `member_id` FK to `member` table
- Audit columns (`created_by`, `updated_by`, `deleted_by`) use FK to `member` table

### Product Integration
- `eepip_ai_engineer.product_id` → `eepip_product(id)`
- `eepip_epin.product_id` → `eepip_product(id)`

### Cross-Entity Relationships
- `eepip_ai_engineer.introducing_agent_id` → `eepip_agent(id)`
- `eepip_agent.ai_engineer_id` → `eepip_ai_engineer(id)` (optional)
- `eepip_commission.ai_engineer_id` → `eepip_ai_engineer(id)`
- `eepip_commission.related_ai_engineer_id` → `eepip_ai_engineer(id)`
- `eepip_agent_commission.agent_id` → `eepip_agent(id)`
- `eepip_agent_commission.ai_engineer_id` → `eepip_ai_engineer(id)`
- `eepip_payment.ai_engineer_id` → `eepip_ai_engineer(id)`
- `eepip_payment.epin_id` → `eepip_epin(id)`
- `eepip_academic_event.ai_engineer_id` → `eepip_ai_engineer(id)`
- `eepip_rank_history.ai_engineer_id` → `eepip_ai_engineer(id)`

---

## Performance Indexes

### Composite Indexes (V37)
| Table | Index Name | Columns | Purpose |
|-------|------------|---------|---------|
| eepip_commission | idx_composite_engineer_month_status | ai_engineer_id, cycle_month, status | Commission queries |
| eepip_commission | idx_composite_date_type | commission_date, type | Date/type filtering |
| eepip_ai_engineer | idx_composite_tree | sponsor_id, parent_id, position | Tree traversal |
| eepip_ai_engineer | idx_composite_status_rank | member_state, rank_code | Status/rank filtering |
| eepip_agent | idx_composite_agent_tree | sponsor_agent_id, parent_agent_id, position | Agent tree traversal |
| eepip_agent | idx_composite_status_activation | status, activation_date | Agent activation queries |

---

## Migration History

| Migration | Description | Date |
|-----------|-------------|------|
| V28 | Refactor EEPIP to member child | May 3, 2026 |
| V29 | Merge student into ai_engineer (Earn While Learn) | May 3, 2026 |
| V30 | Update ai_engineer member_state enum (year-level states) | May 3, 2026 |
| V31 | Create eepip_payment table | May 3, 2026 |
| V32 | Create eepip_academic_event table | May 3, 2026 |
| V33 | Create eepip_audit_log table | May 3, 2026 |
| V34 | Add approval workflow to eepip_commission | May 3, 2026 |
| V35 | Fix eepip_epin date_expires default | May 3, 2026 |
| V36 | Create eepip_withdrawal table | May 3, 2026 |
| V37 | Add performance indexes | May 3, 2026 |
| V38 | Add soft delete audit columns | May 3, 2026 |
| V39 | Create eepip_config table | May 3, 2026 |
| V40 | Add tax/deduction tracking to commissions | May 3, 2026 |
| V41 | Create eepip_document table | May 3, 2026 |

---

## Database Connection

- **Host:** localhost (production: 109.123.227.166)
- **Port:** 3306
- **Database:** temco_system
- **User:** root
- **Password:** 6qZB6d@pIvj (local), kn0h*GKvNl37rnbi (production)
- **Docker Container:** temco-admin-mariadb
- **Character Set:** utf8mb3
- **Collation:** utf8mb3_general_ci

---

## SSO Integration

All EEPIP tables link to the `member` table for SSO integration. The `member` table is managed by the TEMCO SSO Service.

Key SSO-related columns:
- `member_id` (FK to member) - Primary SSO linkage
- `created_by`, `updated_by`, `deleted_by` (FK to member) - Audit trail
- `issued_by_member_id` (FK to member) - Issuer tracking
- `appointed_by_member_id` (FK to member) - Appointment tracking
