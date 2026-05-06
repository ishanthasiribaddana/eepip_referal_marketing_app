-- ============================================
-- EEPIP Database Tables for temco_system
-- MariaDB 10.6.24
-- Prefix: eepip_ for all EEPIP tables
-- ============================================

USE temco_system;

-- =========================================================================
-- PRODUCT CONFIGURATION — investment amount and commission rates are dynamic
-- All amounts are derived at runtime: product.investment_amount × rate
-- SCOPE: Single product at a time. Multi-product deferred to v4.0.
-- =========================================================================

CREATE TABLE IF NOT EXISTS eepip_product (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    product_code VARCHAR(50) UNIQUE NOT NULL,
    product_name VARCHAR(200) NOT NULL,
    investment_amount DECIMAL(12,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'LKR',

    -- Commission rates (percentages — amounts derived at runtime)
    direct_sponsor_rate DECIMAL(5,2) DEFAULT 2.00,
    binary_pool_rate DECIMAL(5,2) DEFAULT 5.00,
    matching_bonus_rate DECIMAL(5,2) DEFAULT 1.50,
    leadership_pool_rate DECIMAL(5,2) DEFAULT 1.50,
    agent_direct_rate DECIMAL(5,2) DEFAULT 2.00,
    agent_pool_rate DECIMAL(5,2) DEFAULT 3.00,
    bank_margin_rate DECIMAL(5,2) DEFAULT 6.00,

    -- Payout caps
    max_binary_pairs_per_month INT DEFAULT 3,
    max_agent_pairs_per_month INT DEFAULT 2,

    -- Product lifecycle
    status ENUM('ACTIVE','DISCONTINUED','DRAFT') DEFAULT 'ACTIVE',
    effective_from DATE NOT NULL,
    effective_to DATE NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed data
INSERT INTO eepip_product (product_code, product_name, investment_amount, effective_from)
VALUES ('EEPIP_BSC_MPHIL', 'BSc + MPhil Education Investment Plan', 1800000.00, '2026-01-01')
ON DUPLICATE KEY UPDATE product_name=VALUES(product_name);

-- =========================================================================
-- AI ENGINEER TABLE — Main member table
-- =========================================================================

CREATE TABLE IF NOT EXISTS eepip_ai_engineer (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    general_user_profile_id INT(11),
    username VARCHAR(100) UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    nic_number VARCHAR(20) NOT NULL,
    address TEXT,
    city VARCHAR(100),
    country VARCHAR(100) DEFAULT 'Sri Lanka',
    date_of_birth DATE,
    gender ENUM('MALE','FEMALE','OTHER'),
    sponsor_id BIGINT,
    parent_id BIGINT,
    position ENUM('LEFT','RIGHT') NOT NULL,
    tree_level INT DEFAULT 0,
    tree_path VARCHAR(500),
    member_state ENUM('INVESTED','STUDENT_NOMINATED','ACTIVATED',
                      'BSC_IN_PROGRESS','BSC_COMPLETED',
                      'MPHIL_IN_PROGRESS','MPHIL_COMPLETED',
                      'DROPOUT','FROZEN') NOT NULL DEFAULT 'INVESTED',
    product_id BIGINT NOT NULL,
    investment_date DATE NOT NULL,
    bank_reference VARCHAR(100),
    introducing_agent_id BIGINT,
    education_exempt BOOLEAN DEFAULT FALSE,
    student_nomination_deadline DATE,
    activation_date DATE,
    bsc_start_date DATE,
    bsc_end_date DATE,
    mphil_start_date DATE,
    mphil_end_date DATE,
    left_bv INT DEFAULT 0,
    right_bv INT DEFAULT 0,
    carry_forward_left_bv INT DEFAULT 0,
    carry_forward_right_bv INT DEFAULT 0,
    rank_code ENUM('STARTER','BRONZE','SILVER','GOLD','PLATINUM','DIAMOND')
              DEFAULT 'STARTER',
    total_earnings DECIMAL(12,2) DEFAULT 0,
    monthly_earnings DECIMAL(12,2) DEFAULT 0,
    team_size INT DEFAULT 0,
    direct_recruits INT DEFAULT 0,
    direct_recruits_left INT DEFAULT 0,
    direct_recruits_right INT DEFAULT 0,
    positions_held INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_active TIMESTAMP,
    FOREIGN KEY (sponsor_id) REFERENCES eepip_ai_engineer(id),
    FOREIGN KEY (parent_id) REFERENCES eepip_ai_engineer(id),
    FOREIGN KEY (product_id) REFERENCES eepip_product(id),
    FOREIGN KEY (general_user_profile_id) REFERENCES general_user_profile(id)
    -- FOREIGN KEY (introducing_agent_id) REFERENCES eepip_agent(id) -- Added after agent table exists
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =========================================================================
-- STUDENT BENEFICIARY TABLE
-- =========================================================================

CREATE TABLE IF NOT EXISTS eepip_student (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    ai_engineer_id BIGINT NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20),
    nic_number VARCHAR(20) NOT NULL,
    date_of_birth DATE,
    gender ENUM('MALE','FEMALE','OTHER'),
    academic_eligibility_verified BOOLEAN DEFAULT FALSE,
    status ENUM('WAITING_NOMINATION','NOMINATED','ELIGIBILITY_VERIFIED',
                'ENROLLED','BSC_IN_PROGRESS','BSC_COMPLETED',
                'MPHIL_IN_PROGRESS','MPHIL_COMPLETED',
                'DROPPED_OUT','SUSPENDED') NOT NULL DEFAULT 'WAITING_NOMINATION',
    nomination_date DATE,
    enrollment_date DATE,
    expected_graduation DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ai_engineer_id) REFERENCES eepip_ai_engineer(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =========================================================================
-- COMMISSION TABLE
-- =========================================================================

CREATE TABLE IF NOT EXISTS eepip_commission (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    ai_engineer_id BIGINT NOT NULL,
    type ENUM('DIRECT_SPONSOR','BINARY_PAIRING','MATCHING_BONUS',
              'LEADERSHIP_POOL','RANK_ACHIEVEMENT') NOT NULL,
    amount DECIMAL(12,2) NOT NULL,
    original_amount DECIMAL(12,2) NOT NULL,
    pro_ration_percentage DECIMAL(5,2) DEFAULT 100.00,
    description TEXT,
    related_ai_engineer_id BIGINT,
    transaction_id VARCHAR(100),
    commission_date DATE NOT NULL,
    status ENUM('PENDING','APPROVED','PAID','PRO_RATED','REJECTED','HELD')
           DEFAULT 'PENDING',
    paid_date DATE,
    cycle_month VARCHAR(7) NOT NULL,
    metadata_json TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ai_engineer_id) REFERENCES eepip_ai_engineer(id),
    FOREIGN KEY (related_ai_engineer_id) REFERENCES eepip_ai_engineer(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =========================================================================
-- BINARY POOL TABLE
-- =========================================================================

CREATE TABLE IF NOT EXISTS eepip_binary_pool (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    cycle_month VARCHAR(7) NOT NULL UNIQUE,
    enrollments_this_month INT DEFAULT 0,
    pool_amount DECIMAL(12,2) DEFAULT 0,
    carry_forward_from_last DECIMAL(12,2) DEFAULT 0,
    total_claims DECIMAL(12,2) DEFAULT 0,
    pro_ration_triggered BOOLEAN DEFAULT FALSE,
    pro_ration_percentage DECIMAL(5,2) DEFAULT 100.00,
    surplus DECIMAL(12,2) DEFAULT 0,
    utilization DECIMAL(5,2) DEFAULT 0,
    calculated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =========================================================================
-- RANK HISTORY TABLE
-- =========================================================================

CREATE TABLE IF NOT EXISTS eepip_rank_history (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    ai_engineer_id BIGINT NOT NULL,
    previous_rank ENUM('STARTER','BRONZE','SILVER','GOLD','PLATINUM','DIAMOND'),
    new_rank ENUM('STARTER','BRONZE','SILVER','GOLD','PLATINUM','DIAMOND') NOT NULL,
    reward_amount DECIMAL(12,2) DEFAULT 0,
    achieved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ai_engineer_id) REFERENCES eepip_ai_engineer(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =========================================================================
-- TRI-PARTY AGREEMENT TABLE
-- =========================================================================

CREATE TABLE IF NOT EXISTS eepip_tri_party_agreement (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    ai_engineer_id BIGINT NOT NULL,
    student_id BIGINT NOT NULL,
    bank_reference VARCHAR(100),
    agreement_date DATE,
    status ENUM('DRAFT','PENDING_SIGNATURES','SIGNED','ACTIVE','TERMINATED')
           DEFAULT 'DRAFT',
    document_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ai_engineer_id) REFERENCES eepip_ai_engineer(id),
    FOREIGN KEY (student_id) REFERENCES eepip_student(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =========================================================================
-- EPIN TABLE
-- =========================================================================

CREATE TABLE IF NOT EXISTS eepip_epin (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    epin_no VARCHAR(6) UNIQUE NOT NULL,
    epin_name VARCHAR(100) NOT NULL,
    product_id BIGINT NOT NULL,
    type ENUM('REGULAR','PREMIUM') DEFAULT 'REGULAR',
    date_generated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_used TIMESTAMP NULL,
    date_expires TIMESTAMP NOT NULL,
    user_key BIGINT NULL,
    status ENUM('GENERATED','ASSIGNED','USED','EXPIRED') DEFAULT 'GENERATED',
    issued_by INT(11) NOT NULL,
    metadata_json TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_key) REFERENCES eepip_ai_engineer(id),
    FOREIGN KEY (product_id) REFERENCES eepip_product(id),
    FOREIGN KEY (issued_by) REFERENCES general_user_profile(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =========================================================================
-- AGENT SYSTEM TABLES
-- =========================================================================

CREATE TABLE IF NOT EXISTS eepip_agent (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    general_user_profile_id INT(11),
    ai_engineer_id BIGINT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    nic_number VARCHAR(20) NOT NULL,
    address TEXT,
    city VARCHAR(100),

    -- Agent Binary Tree
    sponsor_agent_id BIGINT NULL,
    parent_agent_id BIGINT NULL,
    position ENUM('LEFT','RIGHT') NULL,
    tree_level INT DEFAULT 0,

    -- Performance
    status ENUM('PENDING','ACTIVE','SUSPENDED','TERMINATED') DEFAULT 'PENDING',
    activation_date DATE,
    total_referrals INT DEFAULT 0,
    total_agent_recruits INT DEFAULT 0,
    total_direct_earnings DECIMAL(12,2) DEFAULT 0,
    total_binary_earnings DECIMAL(12,2) DEFAULT 0,

    -- Admin
    appointed_by INT(11) NOT NULL,
    appointed_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (general_user_profile_id) REFERENCES general_user_profile(id),
    FOREIGN KEY (appointed_by) REFERENCES general_user_profile(id)
    -- FOREIGN KEY (ai_engineer_id) REFERENCES eepip_ai_engineer(id) -- Added after ai_engineer table exists
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS eepip_agent_commission (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    agent_id BIGINT NOT NULL,
    type ENUM('DIRECT_REFERRAL','BINARY_PAIRING') NOT NULL,
    ai_engineer_id BIGINT NULL,
    amount DECIMAL(12,2) NOT NULL,
    status ENUM('PENDING','APPROVED','PAID','REJECTED') DEFAULT 'PENDING',
    commission_date DATE NOT NULL,
    cycle_month VARCHAR(7),
    paid_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (agent_id) REFERENCES eepip_agent(id),
    FOREIGN KEY (ai_engineer_id) REFERENCES eepip_ai_engineer(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS eepip_agent_binary_pool (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    cycle_month VARCHAR(7) NOT NULL UNIQUE,
    enrollments_this_month INT DEFAULT 0,
    pool_amount DECIMAL(12,2) DEFAULT 0,
    carry_forward_from_last DECIMAL(12,2) DEFAULT 0,
    total_claims DECIMAL(12,2) DEFAULT 0,
    pro_ration_triggered BOOLEAN DEFAULT FALSE,
    pro_ration_percentage DECIMAL(5,2) DEFAULT 100.00,
    surplus DECIMAL(12,2) DEFAULT 0,
    calculated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =========================================================================
-- INDEXES FOR PERFORMANCE
-- =========================================================================

-- AI Engineer indexes
CREATE INDEX idx_ai_engineer_sponsor ON eepip_ai_engineer(sponsor_id);
CREATE INDEX idx_ai_engineer_parent ON eepip_ai_engineer(parent_id);
CREATE INDEX idx_ai_engineer_state ON eepip_ai_engineer(member_state);
CREATE INDEX idx_ai_engineer_rank ON eepip_ai_engineer(rank_code);
CREATE INDEX idx_ai_engineer_agent ON eepip_ai_engineer(introducing_agent_id);

-- Commission indexes
CREATE INDEX idx_commission_ai_engineer ON eepip_commission(ai_engineer_id);
CREATE INDEX idx_commission_type ON eepip_commission(type);
CREATE INDEX idx_commission_cycle_month ON eepip_commission(cycle_month);
CREATE INDEX idx_commission_status ON eepip_commission(status);

-- Agent indexes
CREATE INDEX idx_agent_sponsor ON eepip_agent(sponsor_agent_id);
CREATE INDEX idx_agent_parent ON eepip_agent(parent_agent_id);
CREATE INDEX idx_agent_status ON eepip_agent(status);

-- Agent Commission indexes
CREATE INDEX idx_agent_commission_agent ON eepip_agent_commission(agent_id);
CREATE INDEX idx_agent_commission_type ON eepip_agent_commission(type);
CREATE INDEX idx_agent_commission_cycle_month ON eepip_agent_commission(cycle_month);

-- =========================================================================
-- ADD CIRCULAR FOREIGN KEY CONSTRAINTS (after tables exist)
-- =========================================================================

-- Add foreign key from ai_engineer to agent
ALTER TABLE eepip_ai_engineer
ADD CONSTRAINT fk_ai_engineer_agent
FOREIGN KEY (introducing_agent_id) REFERENCES eepip_agent(id);

-- Add foreign key from agent to ai_engineer
ALTER TABLE eepip_agent
ADD CONSTRAINT fk_agent_ai_engineer
FOREIGN KEY (ai_engineer_id) REFERENCES eepip_ai_engineer(id);
