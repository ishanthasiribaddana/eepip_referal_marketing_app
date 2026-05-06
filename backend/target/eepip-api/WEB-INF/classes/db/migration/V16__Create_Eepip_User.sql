-- =========================================================================
-- CREATE EPIP USER — Dedicated MariaDB user for EEPIP application (V16)
-- =========================================================================

-- Create eepip_user with appropriate grants
CREATE USER IF NOT EXISTS 'eepip_user'@'%' IDENTIFIED BY 'Eepip@2026';

-- Grant all privileges on temco_system database
GRANT ALL PRIVILEGES ON temco_system.* TO 'eepip_user'@'%';

-- Grant SELECT on mysql database for some system queries
GRANT SELECT ON mysql.* TO 'eepip_user'@'%';

-- Flush privileges to ensure changes take effect immediately
FLUSH PRIVILEGES;
