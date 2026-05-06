-- =========================================================================
-- AUDIT LOG — System-wide audit trail (V34)
-- =========================================================================

CREATE TABLE eepip_audit_log (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    entity_type ENUM('AI_ENGINEER','AGENT','COMMISSION','PAYMENT','WITHDRAWAL','EPIN','RANK','PRODUCT','SYSTEM') NOT NULL,
    entity_id INT(11) NULL,
    action_type ENUM('CREATE','UPDATE','DELETE','LOGIN','LOGOUT','APPROVE','REJECT','PROMOTE','DEMOTE','STATUS_CHANGE','PAYMENT_RECEIVED','WITHDRAWAL_REQUESTED','EPIN_GENERATED','EPIN_USED','RANK_ACHIEVED') NOT NULL,
    action_description TEXT NULL,
    previous_value TEXT NULL,
    new_value TEXT NULL,
    performed_by_member_id INT(11) NULL,
    performed_by_role ENUM('ADMIN','AGENT','AI_ENGINEER','SYSTEM','API') NULL,
    ip_address VARCHAR(45) NULL,
    user_agent TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    KEY `idx_entity_type` (`entity_type`),
    KEY `idx_entity_id` (`entity_id`),
    KEY `idx_action_type` (`action_type`),
    KEY `idx_created_at` (`created_at`),
    KEY `idx_performed_by` (`performed_by_member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
