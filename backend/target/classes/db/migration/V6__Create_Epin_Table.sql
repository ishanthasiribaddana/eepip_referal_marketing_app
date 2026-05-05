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

    KEY `idx_epin_no` (`epin_no`),
    KEY `idx_user_key` (`user_key`),
    KEY `idx_status` (`status`),
    KEY `idx_issued_by` (`issued_by_member_id`),
    CONSTRAINT `fk_epin_product` FOREIGN KEY (`product_id`) REFERENCES `eepip_product` (`id`),
    CONSTRAINT `fk_epin_issued_by` FOREIGN KEY (`issued_by_member_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
