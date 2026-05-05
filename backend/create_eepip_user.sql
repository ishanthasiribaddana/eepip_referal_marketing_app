CREATE USER IF NOT EXISTS 'eepip_user'@'localhost' IDENTIFIED BY 'Eepip@2026';
CREATE USER IF NOT EXISTS 'eepip_user'@'127.0.0.1' IDENTIFIED BY 'Eepip@2026';
GRANT ALL PRIVILEGES ON temco_system.* TO 'eepip_user'@'localhost';
GRANT ALL PRIVILEGES ON temco_system.* TO 'eepip_user'@'127.0.0.1';
FLUSH PRIVILEGES;
