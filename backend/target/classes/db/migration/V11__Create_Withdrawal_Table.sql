-- =========================================================================
-- WITHDRAWAL — Member earnings withdrawal (V11)
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
    status ENUM('REQUESTED','PENDING_VERIFICATION','APPROVED','PROCESSING','PAID','REJECTED','CANCELLED') DEFAULT 'REQUESTED',
    approved_by INT(11) NULL,
    approved_at TIMESTAMP NULL,
    approved_notes TEXT NULL,
    rejection_reason TEXT NULL,
    processed_date DATE NULL,
    transaction_reference VARCHAR(100) NULL,
    fees DECIMAL(10,2) DEFAULT 0,
    net_amount DECIMAL(12,2) NOT NULL,
    notes TEXT NULL,
    is_active TINYINT(1) DEFAULT 1,
    created_by INT(11),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by INT(11),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    KEY `idx_member` (`member_id`),
    KEY `idx_status` (`status`),
    KEY `idx_request_date` (`request_date`),
    KEY `idx_withdrawal_type` (`withdrawal_type`),
    KEY `idx_account_number` (`account_number`),
    CONSTRAINT `fk_withdrawal_member` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`),
    CONSTRAINT `fk_withdrawal_approved_by` FOREIGN KEY (`approved_by`) REFERENCES `member` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
