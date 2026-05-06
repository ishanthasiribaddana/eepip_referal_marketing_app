# EEPIP Backend Structure — JavaEE (GAP-02 fix)

Aligned to existing TEMCO ERP patterns at `F:\TemcoERP`

## Package Structure

```
src/main/java/lk/temcobank/eepip/
├── dto/
│   ├── AiEngineerDTO.java
│   ├── EnrollmentRequestDTO.java
│   ├── PlacementRequestDTO.java
│   ├── CommissionDTO.java
│   ├── CommissionReportDTO.java
│   ├── BinaryPoolStatusDTO.java
│   ├── MemberBinaryDetailDTO.java
│   ├── DashboardDTO.java
│   ├── RankProgressDTO.java
│   ├── BinaryTreeResponseDTO.java
│   ├── PaymentDTO.java
│   ├── WithdrawalDTO.java
│   ├── AcademicEventDTO.java
│   ├── DocumentDTO.java
│   ├── ConfigDTO.java
│   ├── BankAuditViewDTO.java
│   ├── BankMemberViewDTO.java
│   ├── BankDisbursementRequestDTO.java
│   ├── AgentDTO.java
│   ├── AgentCommissionDTO.java
│   ├── AgentDashboardDTO.java
│   ├── AgentBinaryPoolStatusDTO.java
│   └── ProductDTO.java
├── entity/
│   ├── AiEngineer.java             // @Entity @Table(name = "eepip_ai_engineer")
│   ├── Commission.java             // @Entity @Table(name = "eepip_commission")
│   ├── Payment.java               // @Entity @Table(name = "eepip_payment")
│   ├── AcademicEvent.java          // @Entity @Table(name = "eepip_academic_event")
│   ├── AuditLog.java               // @Entity @Table(name = "eepip_audit_log")
│   ├── Withdrawal.java             // @Entity @Table(name = "eepip_withdrawal")
│   ├── Config.java                 // @Entity @Table(name = "eepip_config")
│   ├── Document.java               // @Entity @Table(name = "eepip_document")
│   ├── BinaryPool.java             // @Entity @Table(name = "eepip_binary_pool")
│   ├── RankHistory.java            // @Entity @Table(name = "eepip_rank_history")
│   ├── Agent.java                 // @Entity @Table(name = "agent")
│   ├── AgentCommission.java       // @Entity @Table(name = "agent_commission")
│   ├── AgentBinaryPool.java       // @Entity @Table(name = "agent_binary_pool")
│   └── Product.java               // @Entity @Table(name = "product")
├── service/
│   ├── AiEngineerService.java      // @Stateless EJB
│   ├── BinaryTreeService.java      // @Stateless EJB
│   ├── CommissionService.java      // @Stateless EJB
│   ├── BinaryPoolService.java      // @Stateless EJB
│   ├── RankService.java            // @Stateless EJB
│   ├── PaymentService.java         // @Stateless EJB
│   ├── WithdrawalService.java       // @Stateless EJB
│   ├── AcademicEventService.java    // @Stateless EJB
│   ├── DocumentService.java         // @Stateless EJB
│   ├── AuditLogService.java          // @Stateless EJB (cross-cutting)
│   ├── ConfigService.java           // @Stateless EJB
│   ├── BankIntegrationService.java // @Stateless EJB
│   ├── AgentService.java          // @Stateless EJB
│   ├── AgentBinaryPoolService.java // @Stateless EJB
│   └── ProductService.java        // @Stateless EJB
├── rest/
│   ├── AiEngineerResource.java     // @Path("/api/v3/ai-engineers")
│   ├── BinaryTreeResource.java     // @Path("/api/v3/tree")
│   ├── CommissionResource.java     // @Path("/api/v3/commissions")
│   ├── PaymentResource.java        // @Path("/api/v3/payments")
│   ├── WithdrawalResource.java      // @Path("/api/v3/withdrawals")
│   ├── AcademicEventResource.java   // @Path("/api/v3/academic-events")
│   ├── DocumentResource.java        // @Path("/api/v3/documents")
│   ├── ConfigResource.java          // @Path("/api/v3/admin/config")
│   ├── BankResource.java           // @Path("/api/v3/bank")
│   ├── AgentResource.java          // @Path("/api/v3/agents")
│   ├── ProductResource.java        // @Path("/api/v3/products")
│   └── HealthResource.java         // @Path("/api/health")
├── config/
│   ├── JaxRsApplication.java       // @ApplicationPath("/eepip-api")
│   └── CorsFilter.java             // CORS for *.temcobank.com
├── mapper/
│   ├── AiEngineerMapper.java       // Entity ↔ DTO
│   ├── CommissionMapper.java
│   ├── TreeMapper.java
│   ├── AgentMapper.java             // Entity ↔ DTO
│   └── ProductMapper.java           // Entity ↔ DTO
└── util/
    ├── EepipConstants.java          // mirrors EEPIP_CONSTANTS
    └── CommissionCalculator.java    // pool cap, pro-rating logic
```

## Database Schema (temco_system Integration)

EEPIP tables are deployed in the **temco_system** database with `eepip_` prefix.
All tables are children of the `member` table (SSO integration).

```sql
-- EEPIP Tables in temco_system database
-- All tables prefixed with eepip_ for namespace isolation
-- All tables link to member table for SSO integration

-- =========================================================================
-- PRODUCT CONFIGURATION — investment amount and commission rates are dynamic
-- All amounts are derived at runtime: product.investment_amount × rate
-- =========================================================================

CREATE TABLE eepip_product (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    product_code VARCHAR(50) UNIQUE NOT NULL,       -- e.g. 'EEPIP_BSC_MPHIL'
    product_name VARCHAR(200) NOT NULL,
    investment_amount DECIMAL(12,2) NOT NULL,       -- e.g. Rs. 1,800,000
    currency VARCHAR(3) DEFAULT 'LKR',

    -- Commission rates (percentages — amounts derived at runtime)
    direct_sponsor_rate DECIMAL(5,2) DEFAULT 2.00,  -- 2%
    binary_pool_rate DECIMAL(5,2) DEFAULT 5.00,     -- 5%
    matching_bonus_rate DECIMAL(5,2) DEFAULT 1.50,  -- 1.5%
    leadership_pool_rate DECIMAL(5,2) DEFAULT 1.50, -- 1.5%
    agent_direct_rate DECIMAL(5,2) DEFAULT 2.00,    -- 2%
    agent_pool_rate DECIMAL(5,2) DEFAULT 3.00,      -- 3%
    bank_margin_rate DECIMAL(5,2) DEFAULT 6.00,     -- 6%

    -- Payout caps
    max_binary_pairs_per_month INT(11) DEFAULT 3,
    max_agent_pairs_per_month INT(11) DEFAULT 2,

    -- Product lifecycle
    status ENUM('ACTIVE','DISCONTINUED','DRAFT') DEFAULT 'ACTIVE',
    effective_from DATE NOT NULL,
    effective_to DATE NULL,                         -- NULL = no end date

    -- Audit
    is_active TINYINT(1) DEFAULT 1,
    created_by INT(11),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by INT(11),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    deleted_by INT(11),
    deletion_reason TEXT NULL,

    KEY `idx_status` (`status`),
    KEY `idx_effective_from` (`effective_from`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Seed data
INSERT INTO eepip_product (product_code, product_name, investment_amount, effective_from)
VALUES ('EEPIP_BSC_MPHIL', 'BSc + MPhil Education Investment Plan', 1800000.00, '2026-01-01');

-- =========================================================================
-- AI ENGINEER — Earn While Learn Model (Every AI Engineer = Student)
-- Merged student fields into ai_engineer table (V29)
-- =========================================================================

CREATE TABLE eepip_ai_engineer (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    member_id INT(11) NOT NULL UNIQUE,             -- FK to member (SSO integration)

    -- Binary tree structure
    sponsor_id INT(11) NULL,                       -- Recruiter in AI Engineer tree
    parent_id INT(11) NULL,                        -- Placement parent in AI Engineer tree
    position ENUM('LEFT','RIGHT') NOT NULL,
    tree_level INT(11) DEFAULT 0,
    tree_path VARCHAR(500) NULL,

    -- Academic status (Earn While Learn - self-nomination only)
    member_state ENUM('WAITING_ENROLLMENT','ENROLLED','BSC_YEAR_1_IN_PROGRESS','BSC_YEAR_2_IN_PROGRESS',
                      'BSC_YEAR_3_IN_PROGRESS','BSC_COMPLETED','MPHIL_IN_PROGRESS','MPHIL_COMPLETED',
                      'DROPPED_OUT','FROZEN') NOT NULL DEFAULT 'WAITING_ENROLLMENT',
    academic_eligibility_verified TINYINT(1) DEFAULT 0,
    enrollment_date DATE NULL,
    expected_graduation DATE NULL,

    -- Product & Investment
    product_id INT(11) NOT NULL,                   -- FK to eepip_product
    investment_date DATE NOT NULL,
    bank_reference VARCHAR(100) NULL,
    introducing_agent_id INT(11) NULL,              -- FK to eepip_agent (optional)

    -- Education timeline
    activation_date DATE NULL,
    bsc_start_date DATE NULL,
    bsc_end_date DATE NULL,
    mphil_start_date DATE NULL,
    mphil_end_date DATE NULL,

    -- Binary volume & earnings
    left_bv INT(11) DEFAULT 0,
    right_bv INT(11) DEFAULT 0,
    carry_forward_left_bv INT(11) DEFAULT 0,
    carry_forward_right_bv INT(11) DEFAULT 0,
    rank_code ENUM('STARTER','BRONZE','SILVER','GOLD','PLATINUM','DIAMOND') DEFAULT 'STARTER',
    total_earnings DECIMAL(12,2) DEFAULT 0,
    monthly_earnings DECIMAL(12,2) DEFAULT 0,

    -- Team metrics
    team_size INT(11) DEFAULT 0,
    direct_recruits INT(11) DEFAULT 0,
    direct_recruits_left INT(11) DEFAULT 0,
    direct_recruits_right INT(11) DEFAULT 0,
    positions_held INT(11) DEFAULT 1,

    -- Audit
    is_active TINYINT(1) DEFAULT 1,
    created_by INT(11),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by INT(11),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_active TIMESTAMP NULL,
    deleted_at TIMESTAMP NULL,
    deleted_by INT(11),
    deletion_reason TEXT NULL,

    PRIMARY KEY (id),
    KEY `uk_member_id` (`member_id`),
    KEY `idx_sponsor` (`sponsor_id`),
    KEY `idx_parent` (`parent_id`),
    KEY `idx_member_state` (`member_state`),
    KEY `idx_rank` (`rank_code`),
    KEY `idx_introducing_agent` (`introducing_agent_id`),
    KEY `idx_product` (`product_id`),
    KEY `idx_composite_tree` (`sponsor_id`,`parent_id`,`position`),
    KEY `idx_composite_status_rank` (`member_state`,`rank_code`),
    CONSTRAINT `fk_ai_engineer_member` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`),
    CONSTRAINT `fk_ai_engineer_sponsor` FOREIGN KEY (`sponsor_id`) REFERENCES `eepip_ai_engineer` (`id`),
    CONSTRAINT `fk_ai_engineer_parent` FOREIGN KEY (`parent_id`) REFERENCES `eepip_ai_engineer` (`id`),
    CONSTRAINT `fk_ai_engineer_product` FOREIGN KEY (`product_id`) REFERENCES `eepip_product` (`id`),
    CONSTRAINT `fk_ai_engineer_agent` FOREIGN KEY (`introducing_agent_id`) REFERENCES `eepip_agent` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- =========================================================================
-- COMMISSION — AI Engineer earnings with approval workflow & tax tracking
-- =========================================================================

CREATE TABLE eepip_commission (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    ai_engineer_id INT(11) NOT NULL,
    type ENUM('DIRECT_SPONSOR','BINARY_PAIRING','MATCHING_BONUS','LEADERSHIP_POOL','RANK_ACHIEVEMENT') NOT NULL,
    amount DECIMAL(12,2) NOT NULL,
    original_amount DECIMAL(12,2) NOT NULL,
    tax_amount DECIMAL(12,2) DEFAULT 0,
    net_amount DECIMAL(12,2) NOT NULL,
    tds_rate DECIMAL(5,2) DEFAULT 0,
    currency VARCHAR(3) DEFAULT 'LKR',
    pro_ration_percentage DECIMAL(5,2) DEFAULT 100.00,
    description TEXT NULL,
    related_ai_engineer_id INT(11) NULL,
    transaction_id VARCHAR(100) NULL,
    commission_date DATE NOT NULL,
    status ENUM('PENDING','APPROVED','PAID','PRO_RATED','REJECTED','HELD') DEFAULT 'PENDING',
    approved_by INT(11) NULL,
    approved_at TIMESTAMP NULL,
    rejection_reason TEXT NULL,
    paid_date DATE NULL,
    cycle_month VARCHAR(7) NOT NULL,
    metadata_json TEXT NULL,
    is_active TINYINT(1) DEFAULT 1,
    created_by INT(11),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by INT(11),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    KEY `idx_ai_engineer` (`ai_engineer_id`),
    KEY `idx_type` (`type`),
    KEY `idx_status` (`status`),
    KEY `idx_cycle_month` (`cycle_month`),
    KEY `idx_composite_engineer_month_status` (`ai_engineer_id`,`cycle_month`,`status`),
    KEY `idx_composite_date_type` (`commission_date`,`type`),
    CONSTRAINT `fk_commission_ai_engineer` FOREIGN KEY (`ai_engineer_id`) REFERENCES `eepip_ai_engineer` (`id`),
    CONSTRAINT `fk_commission_related_engineer` FOREIGN KEY (`related_ai_engineer_id`) REFERENCES `eepip_ai_engineer` (`id`),
    CONSTRAINT `fk_commission_approved_by` FOREIGN KEY (`approved_by`) REFERENCES `member` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- =========================================================================
-- BINARY POOL — AI Engineer commission pool management
-- =========================================================================

CREATE TABLE eepip_binary_pool (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    cycle_month VARCHAR(7) NOT NULL UNIQUE,
    enrollments_this_month INT(11) DEFAULT 0,
    pool_amount DECIMAL(12,2) DEFAULT 0,
    carry_forward_from_last DECIMAL(12,2) DEFAULT 0,
    total_claims DECIMAL(12,2) DEFAULT 0,
    pro_ration_triggered TINYINT(1) DEFAULT 0,
    pro_ration_percentage DECIMAL(5,2) DEFAULT 100.00,
    surplus DECIMAL(12,2) DEFAULT 0,
    utilization DECIMAL(5,2) DEFAULT 0,
    calculated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    UNIQUE KEY `uk_cycle_month` (`cycle_month`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- =========================================================================
-- RANK HISTORY — AI Engineer rank promotion tracking
-- =========================================================================

CREATE TABLE eepip_rank_history (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    ai_engineer_id INT(11) NOT NULL,
    previous_rank ENUM('STARTER','BRONZE','SILVER','GOLD','PLATINUM','DIAMOND') NULL,
    new_rank ENUM('STARTER','BRONZE','SILVER','GOLD','PLATINUM','DIAMOND') NOT NULL,
    reward_amount DECIMAL(12,2) DEFAULT 0,
    achieved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    KEY `idx_ai_engineer` (`ai_engineer_id`),
    CONSTRAINT `fk_rank_history_ai_engineer` FOREIGN KEY (`ai_engineer_id`) REFERENCES `eepip_ai_engineer` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- =========================================================================
-- EPIN — Voucher/EPIN system
-- =========================================================================

CREATE TABLE eepip_epin (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    epin_no VARCHAR(6) UNIQUE NOT NULL,
    epin_name VARCHAR(100) NOT NULL,
    product_id INT(11) NOT NULL,
    type ENUM('REGULAR','PREMIUM') DEFAULT 'REGULAR',
    date_generated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_used TIMESTAMP NULL,
    date_expires TIMESTAMP NULL DEFAULT NULL,
    user_key INT(11) NULL,
    status ENUM('GENERATED','ASSIGNED','USED','EXPIRED') DEFAULT 'GENERATED',
    issued_by_member_id INT(11) NOT NULL,
    metadata_json TEXT NULL,
    is_active TINYINT(1) DEFAULT 1,
    created_by INT(11),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by INT(11),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    KEY `idx_epin_no` (`epin_no`),
    KEY `idx_user_key` (`user_key`),
    KEY `idx_status` (`status`),
    KEY `idx_issued_by` (`issued_by_member_id`),
    CONSTRAINT `fk_epin_product` FOREIGN KEY (`product_id`) REFERENCES `eepip_product` (`id`),
    CONSTRAINT `fk_epin_issued_by` FOREIGN KEY (`issued_by_member_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- =========================================================================
-- AGENT SYSTEM — Separate agent network for introducing AI Engineers
-- =========================================================================

CREATE TABLE eepip_agent (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    member_id INT(11) NOT NULL UNIQUE,             -- FK to member (SSO integration)
    ai_engineer_id INT(11) NULL,                   -- Optional: if agent also invests as AI Engineer

    -- Agent Binary Tree
    sponsor_agent_id INT(11) NULL,
    parent_agent_id INT(11) NULL,
    position ENUM('LEFT','RIGHT') NULL,
    tree_level INT(11) DEFAULT 0,

    -- Performance
    status ENUM('PENDING','ACTIVE','SUSPENDED','TERMINATED') DEFAULT 'PENDING',
    activation_date DATE NULL,
    total_referrals INT(11) DEFAULT 0,
    total_agent_recruits INT(11) DEFAULT 0,
    total_direct_earnings DECIMAL(12,2) DEFAULT 0,
    total_binary_earnings DECIMAL(12,2) DEFAULT 0,

    -- Admin
    appointed_by_member_id INT(11) NOT NULL,
    appointed_date DATE NOT NULL,

    -- Audit
    is_active TINYINT(1) DEFAULT 1,
    created_by INT(11),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by INT(11),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    deleted_by INT(11),
    deletion_reason TEXT NULL,

    PRIMARY KEY (id),
    KEY `uk_member_id` (`member_id`),
    KEY `idx_sponsor_agent` (`sponsor_agent_id`),
    KEY `idx_parent_agent` (`parent_agent_id`),
    KEY `idx_status` (`status`),
    KEY `idx_appointed_by` (`appointed_by_member_id`),
    KEY `idx_composite_agent_tree` (`sponsor_agent_id`,`parent_agent_id`,`position`),
    KEY `idx_composite_status_activation` (`status`,`activation_date`),
    CONSTRAINT `fk_agent_member` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`),
    CONSTRAINT `fk_agent_ai_engineer` FOREIGN KEY (`ai_engineer_id`) REFERENCES `eepip_ai_engineer` (`id`),
    CONSTRAINT `fk_agent_sponsor` FOREIGN KEY (`sponsor_agent_id`) REFERENCES `eepip_agent` (`id`),
    CONSTRAINT `fk_agent_parent` FOREIGN KEY (`parent_agent_id`) REFERENCES `eepip_agent` (`id`),
    CONSTRAINT `fk_agent_appointed_by` FOREIGN KEY (`appointed_by_member_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- =========================================================================
-- AGENT COMMISSION — Agent earnings with tax tracking
-- =========================================================================

CREATE TABLE eepip_agent_commission (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    agent_id INT(11) NOT NULL,
    type ENUM('DIRECT_REFERRAL','BINARY_PAIRING') NOT NULL,
    ai_engineer_id INT(11) NULL,
    amount DECIMAL(12,2) NOT NULL,
    tax_amount DECIMAL(12,2) DEFAULT 0,
    net_amount DECIMAL(12,2) NOT NULL,
    tds_rate DECIMAL(5,2) DEFAULT 0,
    currency VARCHAR(3) DEFAULT 'LKR',
    status ENUM('PENDING','APPROVED','PAID','REJECTED') DEFAULT 'PENDING',
    commission_date DATE NOT NULL,
    cycle_month VARCHAR(7) NULL,
    paid_date DATE NULL,
    is_active TINYINT(1) DEFAULT 1,
    created_by INT(11),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by INT(11),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    KEY `idx_agent` (`agent_id`),
    KEY `idx_type` (`type`),
    KEY `idx_status` (`status`),
    CONSTRAINT `fk_agent_commission_agent` FOREIGN KEY (`agent_id`) REFERENCES `eepip_agent` (`id`),
    CONSTRAINT `fk_agent_commission_ai_engineer` FOREIGN KEY (`ai_engineer_id`) REFERENCES `eepip_ai_engineer` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- =========================================================================
-- AGENT BINARY POOL — Agent commission pool management
-- =========================================================================

CREATE TABLE eepip_agent_binary_pool (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    cycle_month VARCHAR(7) NOT NULL UNIQUE,
    enrollments_this_month INT(11) DEFAULT 0,
    pool_amount DECIMAL(12,2) DEFAULT 0,
    carry_forward_from_last DECIMAL(12,2) DEFAULT 0,
    total_claims DECIMAL(12,2) DEFAULT 0,
    pro_ration_triggered TINYINT(1) DEFAULT 0,
    pro_ration_percentage DECIMAL(5,2) DEFAULT 100.00,
    surplus DECIMAL(12,2) DEFAULT 0,
    calculated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    UNIQUE KEY `uk_cycle_month` (`cycle_month`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- =========================================================================
-- PAYMENT — Transaction tracking (V31)
-- =========================================================================

CREATE TABLE eepip_payment (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    ai_engineer_id INT(11) NOT NULL,
    amount DECIMAL(12,2) NOT NULL,
    payment_method ENUM('BANK_TRANSFER','CHECK','EPIN','CARD','CASH') NOT NULL DEFAULT 'BANK_TRANSFER',
    bank_reference VARCHAR(100) NULL,
    transaction_id VARCHAR(100) NULL,
    payment_date DATE NOT NULL,
    payment_time TIME NULL,
    status ENUM('PENDING','CONFIRMED','FAILED','REFUNDED','PARTIALLY_REFUNDED') NOT NULL DEFAULT 'PENDING',
    currency VARCHAR(3) DEFAULT 'LKR',
    exchange_rate DECIMAL(10,6) NULL,
    bank_name VARCHAR(200) NULL,
    branch_name VARCHAR(200) NULL,
    check_number VARCHAR(50) NULL,
    epin_id INT(11) NULL,
    refund_amount DECIMAL(12,2) NULL,
    refund_date DATE NULL,
    refund_reason TEXT NULL,
    notes TEXT NULL,
    confirmed_by INT(11) NULL,
    confirmed_at TIMESTAMP NULL,
    verified_by INT(11) NULL,
    verified_at TIMESTAMP NULL,
    is_active TINYINT(1) DEFAULT 1,
    created_by INT(11),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by INT(11),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    KEY `idx_ai_engineer` (`ai_engineer_id`),
    KEY `idx_payment_date` (`payment_date`),
    KEY `idx_status` (`status`),
    KEY `idx_bank_reference` (`bank_reference`),
    KEY `idx_transaction_id` (`transaction_id`),
    CONSTRAINT `fk_payment_ai_engineer` FOREIGN KEY (`ai_engineer_id`) REFERENCES `eepip_ai_engineer` (`id`),
    CONSTRAINT `fk_payment_epin` FOREIGN KEY (`epin_id`) REFERENCES `eepip_epin` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- =========================================================================
-- ACADEMIC EVENT — Academic progress tracking (V32)
-- =========================================================================

CREATE TABLE eepip_academic_event (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    ai_engineer_id INT(11) NOT NULL,
    event_type ENUM('YEAR_PROMOTION','EXAM_RESULT','COURSE_REGISTRATION','THESIS_SUBMISSION','THESIS_APPROVED','GRADUATION_ELIGIBLE','CERTIFICATE_ISSUED') NOT NULL,
    event_date DATE NOT NULL,
    academic_year INT(4) NULL,
    semester TINYINT(1) NULL,
    course_code VARCHAR(50) NULL,
    course_name VARCHAR(200) NULL,
    grade VARCHAR(10) NULL,
    gpa DECIMAL(3,2) NULL,
    credits DECIMAL(4,1) NULL,
    passed TINYINT(1) NULL,
    description TEXT NULL,
    remarks TEXT NULL,
    verified_by INT(11) NULL,
    verified_at TIMESTAMP NULL,
    is_active TINYINT(1) DEFAULT 1,
    created_by INT(11),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by INT(11),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    KEY `idx_ai_engineer` (`ai_engineer_id`),
    KEY `idx_event_type` (`event_type`),
    KEY `idx_event_date` (`event_date`),
    KEY `idx_academic_year` (`academic_year`),
    CONSTRAINT `fk_academic_event_ai_engineer` FOREIGN KEY (`ai_engineer_id`) REFERENCES `eepip_ai_engineer` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- =========================================================================
-- AUDIT LOG — System-wide audit trail (V33)
-- =========================================================================

CREATE TABLE eepip_audit_log (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    entity_type ENUM('AI_ENGINEER','AGENT','COMMISSION','PAYMENT','WITHDRAWAL','EPIN','RANK','PRODUCT','SYSTEM') NOT NULL,
    entity_id INT(11) NULL,
    action_type ENUM('CREATE','UPDATE','DELETE','LOGIN','LOGOUT','APPROVE','REJECT','PROMOTE','DEMOTE','STATUS_CHANGE','PAYMENT_RECEIVED','WITHDRAWAL_REQUESTED','EPIN_GENERATED','EPIN_USED','RANK_ACHIEVED') NOT NULL,
    action_description TEXT NULL,
    previous_value TEXT NULL,
    new_value TEXT NULL,
    performed_by_member_id INT(11) NULL,
    performed_by_role ENUM('ADMIN','AGENT','AI_ENGINEER','SYSTEM','API') NULL,
    ip_address VARCHAR(45) NULL,
    user_agent TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    KEY `idx_entity_type` (`entity_type`),
    KEY `idx_entity_id` (`entity_id`),
    KEY `idx_action_type` (`action_type`),
    KEY `idx_created_at` (`created_at`),
    KEY `idx_performed_by` (`performed_by_member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- =========================================================================
-- WITHDRAWAL — Payout management (V36)
-- =========================================================================

CREATE TABLE eepip_withdrawal (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    member_id INT(11) NOT NULL,
    withdrawal_type ENUM('COMMISSION_EARNINGS','BONUS','REFUND') NOT NULL DEFAULT 'COMMISSION_EARNINGS',
    amount DECIMAL(12,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'LKR',
    bank_name VARCHAR(200) NULL,
    bank_branch VARCHAR(200) NULL,
    account_number VARCHAR(50) NOT NULL,
    account_holder_name VARCHAR(200) NOT NULL,
    account_type ENUM('SAVINGS','CURRENT') DEFAULT 'SAVINGS',
    request_date DATE NOT NULL,
    request_time TIME NULL,
    status ENUM('REQUESTED','PENDING_VERIFICATION','APPROVED','PROCESSING','PAID','REJECTED','CANCELLED') NOT NULL DEFAULT 'REQUESTED',
    approved_by INT(11) NULL,
    approved_at TIMESTAMP NULL,
    approved_notes TEXT NULL,
    rejection_reason TEXT NULL,
    processed_date DATE NULL,
    transaction_reference VARCHAR(100) NULL,
    fees DECIMAL(10,2) DEFAULT 0,
    net_amount DECIMAL(12,2) NULL,
    notes TEXT NULL,
    is_active TINYINT(1) DEFAULT 1,
    created_by INT(11),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by INT(11),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    KEY `idx_member_id` (`member_id`),
    KEY `idx_request_date` (`request_date`),
    KEY `idx_status` (`status`),
    KEY `idx_account_number` (`account_number`),
    CONSTRAINT `fk_withdrawal_member` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`),
    CONSTRAINT `fk_withdrawal_approved_by` FOREIGN KEY (`approved_by`) REFERENCES `member` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- =========================================================================
-- CONFIG — System configuration (V39)
-- =========================================================================

CREATE TABLE eepip_config (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    config_key VARCHAR(100) NOT NULL,
    config_value TEXT NULL,
    config_type ENUM('STRING','NUMBER','BOOLEAN','DATE','JSON') NOT NULL DEFAULT 'STRING',
    description TEXT NULL,
    category VARCHAR(50) NULL,
    is_encrypted TINYINT(1) DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    effective_from DATE NULL,
    effective_to DATE NULL,
    created_by INT(11),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by INT(11),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    UNIQUE KEY `uk_config_key` (`config_key`,`effective_from`),
    KEY `idx_category` (`category`),
    KEY `idx_is_active` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- =========================================================================
-- DOCUMENT — KYC/verification tracking (V41)
-- =========================================================================

CREATE TABLE eepip_document (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    member_id INT(11) NOT NULL,
    document_type ENUM('NIC','PASSPORT','ACADEMIC_CERTIFICATE','BANK_STATEMENT','PHOTO','SIGNATURE','PROOF_OF_ADDRESS','OTHER') NOT NULL,
    document_name VARCHAR(255) NULL,
    document_url VARCHAR(500) NOT NULL,
    document_number VARCHAR(100) NULL,
    issue_date DATE NULL,
    expiry_date DATE NULL,
    file_size BIGINT NULL,
    file_type VARCHAR(50) NULL,
    verification_status ENUM('PENDING','VERIFIED','REJECTED','EXPIRED','REUPLOAD_REQUIRED') NOT NULL DEFAULT 'PENDING',
    verified_by INT(11) NULL,
    verified_at TIMESTAMP NULL,
    rejection_reason TEXT NULL,
    notes TEXT NULL,
    is_primary TINYINT(1) DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    created_by INT(11),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by INT(11),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    KEY `idx_member_id` (`member_id`),
    KEY `idx_document_type` (`document_type`),
    KEY `idx_verification_status` (`verification_status`),
    KEY `idx_expiry_date` (`expiry_date`),
    CONSTRAINT `fk_document_member` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`),
    CONSTRAINT `fk_document_verified_by` FOREIGN KEY (`verified_by`) REFERENCES `member` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
```

## Investment Breakdown (Rate-Based, Configurable)

All amounts are derived from `product.investment_amount × rate`. Default product: Rs. 1,800,000.

```
product.investment_amount × Rates:
├── direct_sponsor_rate    2.0%  (default Rs.  36,000) → Direct Sponsor (immediate)
├── binary_pool_rate       5.0%  (default Rs.  90,000) → Binary Pairing Pool (monthly)
├── matching_bonus_rate    1.5%  (default Rs.  27,000) → Matching Bonus (monthly)
├── leadership_pool_rate   1.5%  (default Rs.  27,000) → Leadership Pool (monthly)
├── agent_direct_rate      2.0%  (default Rs.  36,000) → Agent Direct Referral (one-time)
├── agent_pool_rate        3.0%  (default Rs.  54,000) → Agent Binary Pool (monthly)
├── bank_margin_rate       6.0%  (default Rs. 108,000) → Bank Margin
└── (remainder)           79.0%  (default Rs.1,422,000) → Institute Transfer

Total commission rates: 10% (AI Eng) + 5% (Agent) + 6% (Bank) = 21%
Institute gets: 100% - 21% = 79%
```

If `investment_amount` changes to Rs. 2,000,000, all amounts recalculate automatically.

### Agent Binary Tree Rules
- **Activation:** Agent must have introduced at least 1 AI Engineer to be "active"
- **Pairing cap:** `product.max_agent_pairs_per_month` (default 2)
- **Payout per pair:** `product.investment_amount × product.agent_pool_rate / 100`
- **Pro-ration:** If total claims > pool, pro-rate all payouts proportionally
- **Carry-forward:** Surplus carries to next month
- **Agent-as-AI-Engineer:** Agent can invest and also join the AI Engineer tree (Earn While Learn Model — every AI Engineer is also a Student via self-nomination)

## Module Architecture (temco_system Integration)

EEPIP is deployed in the **temco_system** database with `eepip_` prefixed tables as children of the `member` table.

### Database Integration
- **Database:** Shared `temco_system` database (port 3306)
- **Table Prefix:** All EEPIP tables use `eepip_` prefix for namespace isolation
- **SSO Integration:** All tables link to `member` table via `member_id` FK
- **Foreign Keys:** Circular FKs for self-referencing trees (ai_engineer, agent)

### Module Dependencies
```
EEPIP Module
    ↓ (depends on)
├── TEMCO SSO (authentication via member table)
├── TEMCO Bank (payment processing)
└── External Email/SMS (notifications)
```

## Deployment Configuration

| Component | Port | WAR Name | Docker Container |
|-----------|------|----------|-----------------|
| EEPIP API (WildFly) | 8089 | eepip-api.war | eepip-wildfly |
| EEPIP Frontend (Vite) | 3004 | N/A (static) | eepip-frontend |
| TEMCO Database (MariaDB) | 3306 | N/A | temco-admin-mariadb (existing) |
| TEMCO SSO | 8085 | temco-api.war | ssoservice-temco-sso (existing) |
| TEMCO ERP | 8080 | temco-api.war | temco-wildfly (existing) |

## REST API Endpoints

```
/eepip-api/api/v3/ai-engineers
    GET    /                          List all (paginated)
    GET    /{id}                      Get by ID
    GET    /nic/{nic}                 Get by NIC
    POST   /enroll                    New enrollment
    GET    /{id}/dashboard            Dashboard data
    GET    /{id}/rank-progress        Rank progress
    POST   /{id}/activate             Activate member
    GET    /{id}/academic-events      Get academic progress

/eepip-api/api/v3/tree
    GET    /{id}?depth=4              Get binary tree
    GET    /{id}/subtree?depth=3      Get subtree
    POST   /place                     Place member in tree
    GET    /spillover?sponsorId=&leg= Find spillover position

/eepip-api/api/v3/commissions
    GET    /{id}?filters              List commissions (filtered)
    GET    /{id}/report?period=       Commission report
    GET    /pool-status?cycleMonth=   Binary pool status
    GET    /{id}/binary-detail?month= Member binary detail
    PUT    /{id}/approve              Approve commission (ADMIN)
    PUT    /{id}/reject               Reject commission (ADMIN)

/eepip-api/api/v3/payments
    GET    /{id}                      List payments for AI Engineer
    POST   /                          Create payment record
    PUT    /{id}/confirm              Confirm payment (ADMIN)
    PUT    /{id}/verify               Verify payment (ADMIN)
    GET    /{id}/status               Get payment status

/eepip-api/api/v3/withdrawals
    GET    /                          List withdrawals (paginated)
    GET    /{id}                      Get withdrawal by ID
    POST   /                          Request withdrawal
    PUT    /{id}/approve              Approve withdrawal (ADMIN)
    PUT    /{id}/reject               Reject withdrawal (ADMIN)
    GET    /{id}/status               Get withdrawal status

/eepip-api/api/v3/academic-events
    GET    /{id}                      Get academic events for AI Engineer
    POST   /                          Record academic event
    PUT    /{id}/verify               Verify event (ADMIN)

/eepip-api/api/v3/documents
    GET    /{id}                      Get documents for member
    POST   /upload                   Upload document
    PUT    /{id}/verify               Verify document (ADMIN)
    PUT    /{id}/reject               Reject document (ADMIN)

/eepip-api/api/v3/agents
    GET    /                          List all agents (paginated)
    GET    /{id}                      Get agent by ID
    POST   /appoint                   Appoint new agent (ADMIN only)
    PUT    /{id}/status               Activate/suspend/terminate
    GET    /{id}/dashboard            Agent dashboard data
    GET    /{id}/referrals            List AI Engineers introduced
    GET    /{id}/commissions          List agent commissions
    GET    /{id}/tree?depth=4         Agent binary tree view
    POST   /place                     Place agent in agent tree
    GET    /pool-status?cycleMonth=   Agent binary pool status

/eepip-api/api/v3/products
    GET    /                          List all products
    GET    /active                    Get currently active product
    GET    /{id}                      Get product by ID
    POST   /                          Create new product (ADMIN only)
    PUT    /{id}                      Update product (ADMIN only)
    PUT   /{id}/discontinue          Discontinue a product

/eepip-api/api/v3/admin/config      (ADMIN only)
    GET    /                          Get all config
    GET    /{key}                     Get config by key
    PUT    /{key}                     Update config value
    GET    /audit-log                 Get audit log

/eepip-api/api/v3/bank              (BANK_READONLY role only)
    GET    /audit/overview            Audit dashboard
    GET    /members/{id}              Member view
    GET    /members/search?q=         Search members
    GET    /disbursements/pending     Pending disbursements
    POST   /disbursements/confirm     Confirm disbursement

/eepip-api/api/health                Health check
```
