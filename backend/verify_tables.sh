#!/bin/bash
mysql -uroot -p6qZB6d@pIvj temco_system << 'EOF'
SHOW TABLES LIKE 'eepip%';
SELECT * FROM eepip_flyway_schema_history;
SELECT * FROM eepip_product;
EOF
