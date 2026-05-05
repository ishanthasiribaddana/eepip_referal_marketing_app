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

    UNIQUE KEY `uk_cycle_month` (`cycle_month`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
