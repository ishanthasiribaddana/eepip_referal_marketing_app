-- =========================================================================
-- SEED DATA — Default product and configuration
-- =========================================================================

-- Insert default product
INSERT INTO eepip_product (
    product_code,
    product_name,
    investment_amount,
    currency,
    direct_sponsor_rate,
    binary_pool_rate,
    matching_bonus_rate,
    leadership_pool_rate,
    agent_direct_rate,
    agent_pool_rate,
    bank_margin_rate,
    max_binary_pairs_per_month,
    max_agent_pairs_per_month,
    status,
    effective_from,
    is_active,
    created_by
) VALUES (
    'EEPIP_BSC_MPHIL',
    'BSc + MPhil Education Investment Plan',
    1800000.00,
    'LKR',
    2.00,
    5.00,
    1.50,
    1.50,
    2.00,
    3.00,
    6.00,
    3,
    2,
    'ACTIVE',
    CURDATE(),
    1,
    1
);

-- Insert default configuration values
INSERT INTO eepip_config (config_key, config_value, description, category, is_active, created_by) VALUES
('TDS_RATE', '0.00', 'Tax Deducted at Source rate (%)', 'TAX', 1, 1),
('WITHDRAWAL_FEE_PERCENTAGE', '0.00', 'Withdrawal processing fee (%)', 'PAYOUT', 1, 1),
('MIN_WITHDRAWAL_AMOUNT', '1000.00', 'Minimum withdrawal amount (LKR)', 'PAYOUT', 1, 1),
('MAX_WITHDRAWAL_AMOUNT', '500000.00', 'Maximum withdrawal amount (LKR)', 'PAYOUT', 1, 1),
('MIN_REFERRALS_FOR_ACTIVATION', '1', 'Minimum referrals required for agent activation', 'COMMISSION', 1, 1),
('MAX_FILE_SIZE_BYTES', '5242880', 'Maximum file upload size (5MB)', 'SYSTEM', 1, 1),
('DOCUMENT_VERIFICATION_DAYS', '7', 'Days allowed for document verification', 'SYSTEM', 1, 1),
('DEFAULT_PAGE_SIZE', '20', 'Default pagination page size', 'SYSTEM', 1, 1),
('MAX_PAGE_SIZE', '100', 'Maximum pagination page size', 'SYSTEM', 1, 1);
