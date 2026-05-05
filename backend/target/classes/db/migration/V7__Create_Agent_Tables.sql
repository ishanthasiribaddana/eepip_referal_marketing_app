-- =========================================================================
-- AGENT SYSTEM — Separate agent network for introducing AI Engineers
-- =========================================================================

CREATE TABLE eepip_agent (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    member_id INT(11) NOT NULL UNIQUE,
    ai_engineer_id INT(11) NULL,

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

    KEY `uk_member_id` (`member_id`),
    KEY `idx_sponsor_agent` (`sponsor_agent_id`),
    KEY `idx_parent_agent` (`parent_agent_id`),
    KEY `idx_status` (`status`),
    KEY `idx_appointed_by` (`appointed_by_member_id`),
    KEY `idx_composite_agent_tree` (`sponsor_agent_id`,`parent_agent_id`,`position`),
    KEY `idx_composite_status_activation` (`status`,`activation_date`),
    CONSTRAINT `fk_agent_member` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`),
    CONSTRAINT `fk_agent_sponsor` FOREIGN KEY (`sponsor_agent_id`) REFERENCES `eepip_agent` (`id`),
    CONSTRAINT `fk_agent_parent` FOREIGN KEY (`parent_agent_id`) REFERENCES `eepip_agent` (`id`),
    CONSTRAINT `fk_agent_appointed_by` FOREIGN KEY (`appointed_by_member_id`) REFERENCES `member` (`id`)
    -- Note: FK to eepip_ai_engineer on ai_engineer_id added in V39 to avoid circular dependency
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
) EN