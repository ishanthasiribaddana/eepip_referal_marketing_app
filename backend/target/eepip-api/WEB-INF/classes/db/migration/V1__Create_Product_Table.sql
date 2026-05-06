-- =========================================================================
-- PRODUCT CONFIGURATION — investment amount and commission rates are dynamic
-- All amounts are derived at runtime: product.investment_amount × rate
-- =========================================================================

CREATE TABLE eepip_product (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
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
    max_binary_pairs_per_month INT(11) DEFAULT 3,
    max_agent_pairs_per_month INT(11) DEFAULT 2,

    -- Product lifecycle
    status ENUM('ACTIVE','DISCONTINUED','DRAFT') DEFAULT 'ACTIVE',
    effective_from DATE NOT NULL,
    effective_to DATE NULL,

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
