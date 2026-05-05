DROP TABLE IF EXISTS eepip_config;
CREATE TABLE eepip_config (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    config_key VARCHAR(100) NOT NULL UNIQUE,
    config_value TEXT,
    config_type VARCHAR(20) NOT NULL DEFAULT 'STRING',
    description TEXT,
    category VARCHAR(50),
    is_encrypted TINYINT(1) DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    effective_from DATE NULL,
    effective_to DATE NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    KEY idx_category (category),
    KEY idx_is_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
