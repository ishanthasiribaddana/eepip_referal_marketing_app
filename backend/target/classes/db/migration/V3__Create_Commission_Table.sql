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
