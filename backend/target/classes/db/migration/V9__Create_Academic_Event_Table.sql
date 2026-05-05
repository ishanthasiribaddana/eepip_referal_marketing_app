-- =========================================================================
-- ACADEMIC EVENT — Academic progress tracking (V33)
-- =========================================================================

CREATE TABLE eepip_academic_event (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    ai_engineer_id INT(11) NOT NULL,
    event_type ENUM('YEAR_PROMOTION','EXAM_RESULT','COURSE_REGISTRATION','THESIS_SUBMISSION','THESIS_APPROVED','GRADUATION_ELIGIBLE','CERTIFICATE_ISSUED') NOT NULL,
    event_date DATE NOT NULL,
    academic_year INT(4) NULL,
    semester TINYINT(1) NULL,
    course_code VARCHAR(50) NULL,
    course_name VARCHAR(200) NULL,
    grade VARCHAR(10) NULL,
    gpa DECIMAL(3,2) NULL,
    credits DECIMAL(4,1) NULL,
    passed TINYINT(1) NULL,
    description TEXT NULL,
    remarks TEXT NULL,
    verified_by INT(11) NULL,
    verified_at TIMESTAMP NULL,
    is_active TINYINT(1) DEFAULT 1,
    created_by INT(11),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by INT(11),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    KEY `idx_ai_engineer` (`ai_engineer_id`),
    KEY `idx_event_type` (`event_type`),
    KEY `idx_event_date` (`event_date`),
    KEY `idx_academic_year` (`academic_year`),
    CONSTRAINT `fk_academic_event_ai_engineer` FOREIGN KEY (`ai_engineer_id`) REFERENCES `eepip_ai_engineer` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
