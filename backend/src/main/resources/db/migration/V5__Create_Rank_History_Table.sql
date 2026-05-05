-- =========================================================================
-- RANK HISTORY — AI Engineer rank promotion tracking
-- =========================================================================

CREATE TABLE eepip_rank_history (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    ai_engineer_id INT(11) NOT NULL,
    previous_rank ENUM('STARTER','BRONZE','SILVER','GOLD','PLATINUM','DIAMOND') NULL,
    new_rank ENUM('STARTER','BRONZE','SILVER','GOLD','PLATINUM','DIAMOND') NOT NULL,
    reward_amount DECIMAL(12,2) DEFAULT 0,
    achieved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    KEY `idx_ai_engineer` (`ai_engineer_id`),
    CONSTRAINT `fk_rank_history_ai_engineer` FOREIGN KEY (`ai_engineer_id`) REFERENCES `eepip_ai_engineer` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
