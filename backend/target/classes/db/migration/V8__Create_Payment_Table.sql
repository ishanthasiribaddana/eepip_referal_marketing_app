-- =========================================================================
-- PAYMENT — Transaction tracking (V32)
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

    KEY `idx_ai_engineer` (`ai_engineer_id`),
    KEY `idx_payment_date` (`payment_date`),
    KEY `idx_status` (`status`),
    KEY `idx_bank_reference` (`bank_reference`),
    KEY `idx_transaction_id` (`transaction_id`),
    CONSTRAINT `fk_payment_ai_engineer` FOREIGN KEY (`ai_engineer_id`) REFERENCES `eepip_ai_engineer` (`id`),
    CONSTRAINT `fk_payment_epin` FOREIGN KEY (`epin_id`) REFERENCES `eepip_epin` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
