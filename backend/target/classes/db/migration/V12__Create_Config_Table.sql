-- =========================================================================
-- CONFIG — System configuration (V12)
-- =========================================================================

CREATE TABLE eepip_config (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    config_key VARCHAR(100) UNIQUE NOT NULL,
    config_value TEXT NOT NULL,
    config_type ENUM('STRING','NUMBER','BOOLEAN','DATE','JSON') NOT NULL DEFAULT 'STRING',
    description TEXT NULL,
    category VARCHAR(50) NULL,
    is_encrypted TINYINT(1) DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    effective_from DATE NULL,
    effective_to DATE NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    UNIQUE KEY `uk_config_key` (`config_key`),
    KEY `idx_category` (`category`),
    KEY `idx_is_active` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
