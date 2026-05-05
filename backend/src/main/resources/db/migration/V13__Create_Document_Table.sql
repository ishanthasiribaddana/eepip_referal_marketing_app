-- =========================================================================
-- DOCUMENT — Document storage and verification (V13)
-- =========================================================================

CREATE TABLE eepip_document (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    member_id INT(11) NOT NULL,
    document_type ENUM('NIC','PASSPORT','ACADEMIC_CERTIFICATE','BANK_STATEMENT','PHOTO','SIGNATURE','PROOF_OF_ADDRESS','OTHER') NOT NULL,
    document_name VARCHAR(255) NULL,
    document_url VARCHAR(500) NOT NULL,
    document_number VARCHAR(100) NULL,
    issue_date DATE NULL,
    expiry_date DATE NULL,
    file_size BIGINT NULL,
    file_type VARCHAR(50) NULL,
    verification_status ENUM('PENDING','VERIFIED','REJECTED','EXPIRED','REUPLOAD_REQUIRED') DEFAULT 'PENDING',
    verified_by INT(11) NULL,
    verified_at TIMESTAMP NULL,
    rejection_reason TEXT NULL,
    notes TEXT NULL,
    is_primary TINYINT(1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    KEY `idx_member` (`member_id`),
    KEY `idx_document_type` (`document_type`),
    KEY `idx_verification_status` (`verification_status`),
    KEY `idx_expiry_date` (`expiry_date`),
    CONSTRAINT `fk_document_member` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`),
    CONSTRAINT `fk_document_verified_by` FOREIGN KEY (`verified_by`) REFERENCES `member` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
