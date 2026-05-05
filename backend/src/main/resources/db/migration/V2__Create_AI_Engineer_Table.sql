-- =========================================================================
-- AI ENGINEER — Earn While Learn Model (Every AI Engineer = Student)
-- Merged student fields into ai_engineer table (V39)
-- =========================================================================

CREATE TABLE eepip_ai_engineer (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    member_id INT(11) NOT NULL UNIQUE,

    -- Binary tree structure
    sponsor_id INT(11) NULL,
    parent_id INT(11) NULL,
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
    product_id INT(11) NOT NULL,
    investment_date DATE NOT NULL,
    bank_reference VARCHAR(100) NULL,
    introducing_agent_id INT(11) NULL,
    education_exempt TINYINT(1) DEFAULT 0,

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
    CONSTRAINT `fk_ai_engineer_product` FOREIGN KEY (`product_id`) REFERENCES `eepip_product` (`id`)
    -- Note: FK to eepip_agent added in V39 to avoid circular dependency
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
