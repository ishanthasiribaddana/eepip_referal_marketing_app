#!/bin/bash
cd /tmp/eepip-backend/src/main/resources/db/migration/
for f in V3__Create_Commission_Table V4__Create_Binary_Pool_Table V5__Create_Rank_History_Table V6__Create_Epin_Table V7__Create_Agent_Tables V8__Create_Payment_Table V9__Create_Academic_Event_Table V10__Create_Audit_Log_Table V11__Create_Withdrawal_Table V12__Create_Config_Table V13__Create_Document_Table V14__Insert_Seed_Data V15__Add_Circular_FKs; do
  echo "=== Running $f ==="
  mysql -uroot -p'6qZB6d@pIvj' temco_system < "${f}.sql" 2>&1
done
echo "=== Recording in eepip_flyway_schema_history ==="
mysql -uroot -p'6qZB6d@pIvj' temco_system <<'EOF'
INSERT IGNORE INTO eepip_flyway_schema_history (installed_rank,version,description,type,script,installed_by,execution_time,success)
VALUES
 (3,'3','Create Commission Table','SQL','V3__Create_Commission_Table.sql','root',0,1),
 (4,'4','Create Binary Pool Table','SQL','V4__Create_Binary_Pool_Table.sql','root',0,1),
 (5,'5','Create Rank History Table','SQL','V5__Create_Rank_History_Table.sql','root',0,1),
 (6,'6','Create Epin Table','SQL','V6__Create_Epin_Table.sql','root',0,1),
 (7,'7','Create Agent Tables','SQL','V7__Create_Agent_Tables.sql','root',0,1),
 (8,'8','Create Payment Table','SQL','V8__Create_Payment_Table.sql','root',0,1),
 (9,'9','Create Academic Event Table','SQL','V9__Create_Academic_Event_Table.sql','root',0,1),
 (10,'10','Create Audit Log Table','SQL','V10__Create_Audit_Log_Table.sql','root',0,1),
 (11,'11','Create Withdrawal Table','SQL','V11__Create_Withdrawal_Table.sql','root',0,1),
 (12,'12','Create Config Table','SQL','V12__Create_Config_Table.sql','root',0,1),
 (13,'13','Create Document Table','SQL','V13__Create_Document_Table.sql','root',0,1),
 (14,'14','Insert Seed Data','SQL','V14__Insert_Seed_Data.sql','root',0,1),
 (15,'15','Add Circular FKs','SQL','V15__Add_Circular_FKs.sql','root',0,1);
EOF
