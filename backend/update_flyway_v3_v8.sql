INSERT INTO flyway_schema_history (installed_rank, version, description, type, script, checksum, installed_by, installed_on, execution_time, success) VALUES 
(4, '3', 'add unique constraints and contact_messages', 'SQL', 'V3__add_unique_constraints_and_contact_messages.sql', NULL, 'root', NOW(), 0, 1),
(5, '4', 'add unique membership no', 'SQL', 'V4__add_unique_membership_no.sql', NULL, 'root', NOW(), 0, 1),
(6, '5', 'create membership no generator', 'SQL', 'V5__create_membership_no_generator.sql', NULL, 'root', NOW(), 0, 1),
(7, '6', 'create permission tables', 'SQL', 'V6__create_permission_tables.sql', NULL, 'root', NOW(), 0, 1),
(8, '7', 'member category tables', 'SQL', 'V7__member_category_tables.sql', NULL, 'root', NOW(), 0, 1),
(9, '8', 'fix user login composite unique', 'SQL', 'V8__fix_user_login_composite_unique.sql', NULL, 'root', NOW(), 0, 1);
