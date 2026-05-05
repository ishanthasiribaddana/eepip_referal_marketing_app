#!/bin/bash
# Execute EEPIP migrations directly
mysql -uroot -p6qZB6d@pIvj temco_system << 'EOF'
-- V1: Create Product Table
CREATE TABLE IF NOT EXISTS eepip_product (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    product_code VARCHAR(50) UNIQUE NOT NULL,
    product_name VARCHAR(200) NOT NULL,
    investment_amount DECIMAL(12,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'LKR',
    direct_sponsor_rate DECIMAL(5,2) DEFAULT 2.00,
    binary_pool_rate DECIMAL(5,2) DEFAULT 5.00,
    matching_bonus_rate DECIMAL(5,2) DEFAULT 1.50,
    leadership_pool_rate DECIMAL(5,2) DEFAULT 1.50,
    agent_direct_rate DECIMAL(5,2) DEFAULT 2.00,
    agent_pool_rate DECIMAL(5,2) DEFAULT 3.00,
    bank_margin_rate DECIMAL(5,2) DEFAULT 6.00,
    max_binary_pairs_per_month INT(11) DEFAULT 3,
    max_agent_pairs_per_month INT(11) DEFAULT 2,
    status ENUM('ACTIVE','DISCONTINUED','DRAFT') DEFAULT 'ACTIVE',
    effective_from DATE NOT NULL,
    effective_to DATE NULL,
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

-- V2: Create AI Engineer Table
CREATE TABLE IF NOT EXISTS eepip_ai_engineer (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    member_id INT(11) NOT NULL UNIQUE,
    sponsor_id INT(11) NULL,
    parent_id INT(11) NULL,
    position ENUM('LEFT','RIGHT') NOT NULL,
    tree_level INT(11) DEFAULT 0,
    tree_path VARCHAR(500) NULL,
    member_state ENUM('WAITING_ENROLLMENT','ENROLLED','BSC_YEAR_1_IN_PROGRESS','BSC_YEAR_2_IN_PROGRESS',
                      'BSC_YEAR_3_IN_PROGRESS','BSC_COMPLETED','MPHIL_IN_PROGRESS','MPHIL_COMPLETED',
                      'DROPPED_OUT','FROZEN') NOT NULL DEFAULT 'WAITING_ENROLLMENT',
    academic_eligibility_verified TINYINT(1) DEFAULT 0,
    enrollment_date DATE NULL,
    expected_graduation DATE NULL,
    product_id INT(11) NOT NULL,
    investment_date DATE NOT NULL,
    bank_reference VARCHAR(100) NULL,
    introducing_agent_id INT(11) NULL,
    education_exempt TINYINT(1) DEFAULT 0,
    activation_date DATE NULL,
    bsc_start_date DATE NULL,
    bsc_end_date DATE NULL,
    mphil_start_date DATE NULL,
    mphil_end_date DATE NULL,
    left_bv INT(11) DEFAULT 0,
    right_bv INT(11) DEFAULT 0,
    carry_forward_left_bv INT(11) DEFAULT 0,
    carry_forward_right_bv INT(11) DEFAULT 0,
    rank_code ENUM('STARTER','BRONZE','SILVER','GOLD','PLATINUM','DIAMOND') DEFAULT 'STARTER',
    total_earnings DECIMAL(12,2) DEFAULT 0,
    monthly_earnings DECIMAL(12,2) DEFAULT 0,
    team_size INT(11) DEFAULT 0,
    direct_recruits INT(11) DEFAULT 0,
    direct_recruits_left INT(11) DEFAULT 0,
    direct_recruits_right INT(11) DEFAULT 0,
    positions_held INT(11) DEFAULT 1,
    is_active TINYINT(1) DEFAULT 1,
    created_by INT(11),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by INT(11),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_active TIMESTAMP NULL,
    deleted_at TIMESTAMP NULL,
    deleted_by INT(11),
    deletion_reason TEXT NULL,
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
    CONSTRAINT `fk_ai_engineer_product` FOREIGN KEY (`product_id`) REFERENCES `eepip_product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Create Flyway history table
CREATE TABLE IF NOT EXISTS eepip_flyway_schema_history (
    installed_rank INT NOT NULL,
    version VARCHAR(50),
    description VARCHAR(200) NOT NULL,
    type VARCHAR(20) NOT NULL,
    script VARCHAR(1000) NOT NULL,
    checksum INT,
    installed_by VARCHAR(100) NOT NULL,
    installed_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    execution_time INT NOT NULL,
    success BOOLEAN NOT NULL,
    PRIMARY KEY (installed_rank),
    INDEX (success)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Insert migration records
INSERT INTO eepip_flyway_schema_history (installed_rank, version, description, type, script, checksum, installed_by, installed_on, execution_time, success) VALUES
(1, '1', 'Create Product Table', 'SQL', 'V1__create_product_table.sql', NULL, 'root', NOW(), 0, TRUE),
(2, '2', 'Create AI Engineer Table', 'SQL', 'V2__create_ai_engineer_table.sql', NULL, 'root', NOW(), 0, TRUE);

-- Insert seed data
INSERT INTO eepip_product (product_code, product_name, investment_amount, direct_sponsor_rate, binary_pool_rate, matching_bonus_rate, leadership_pool_rate, agent_direct_rate, agent_pool_rate, bank_margin_rate, max_binary_pairs_per_month, max_agent_pairs_per_month, status, effective_from) VALUES
('EEPIP_BSC_MPHIL', 'TEMCO Education Easy-Pay Investment Plan (EEPIP)', 1800000.00, 2.00, 5.00, 1.50, 1.50, 2.00, 3.00, 6.00, 3, 2, 'ACTIVE', CURDATE());

EOF
