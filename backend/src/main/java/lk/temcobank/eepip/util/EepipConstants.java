package lk.temcobank.eepip.util;

import java.math.BigDecimal;
import java.math.RoundingMode;

/**
 * EEPIP Constants - Mirrors EEPIP_CONSTANTS from frontend.
 * Contains default values and configuration constants for the EEPIP system.
 */
public final class EepipConstants {

    // Default Product Configuration
    public static final String DEFAULT_PRODUCT_CODE = "EEPIP_BSC_MPHIL";
    public static final String DEFAULT_PRODUCT_NAME = "BSc + MPhil Education Investment Plan";
    public static final BigDecimal DEFAULT_INVESTMENT_AMOUNT = new BigDecimal("1800000.00");
    public static final String DEFAULT_CURRENCY = "LKR";

    // Default Commission Rates (percentages - amounts derived at runtime)
    public static final BigDecimal DEFAULT_DIRECT_SPONSOR_RATE = new BigDecimal("2.00");      // 2%
    public static final BigDecimal DEFAULT_BINARY_POOL_RATE = new BigDecimal("5.00");         // 5%
    public static final BigDecimal DEFAULT_MATCHING_BONUS_RATE = new BigDecimal("1.50");      // 1.5%
    public static final BigDecimal DEFAULT_LEADERSHIP_POOL_RATE = new BigDecimal("1.50");    // 1.5%
    public static final BigDecimal DEFAULT_AGENT_DIRECT_RATE = new BigDecimal("2.00");        // 2%
    public static final BigDecimal DEFAULT_AGENT_POOL_RATE = new BigDecimal("3.00");          // 3%
    public static final BigDecimal DEFAULT_BANK_MARGIN_RATE = new BigDecimal("6.00");       // 6%

    // Default Payout Caps
    public static final Integer DEFAULT_MAX_BINARY_PAIRS_PER_MONTH = 3;
    public static final Integer DEFAULT_MAX_AGENT_PAIRS_PER_MONTH = 2;

    // Binary Volume Values
    public static final Integer BV_PER_ENROLLMENT = 1;
    public static final Integer DEFAULT_CARRY_FORWARD_LEFT_BV = 0;
    public static final Integer DEFAULT_CARRY_FORWARD_RIGHT_BV = 0;

    // Pro-Ration Thresholds
    public static final BigDecimal PRO_RATION_THRESHOLD = new BigDecimal("100.00");  // 100% utilization
    public static final BigDecimal DEFAULT_PRO_RATION_PERCENTAGE = new BigDecimal("100.00");

    // Tax Configuration
    public static final BigDecimal DEFAULT_TDS_RATE = new BigDecimal("0.00");  // 0% by default
    public static final String DEFAULT_TDS_CONFIG_KEY = "TDS_RATE";

    // Rank Thresholds (based on team size and earnings)
    public static final Integer STARTER_TEAM_SIZE_THRESHOLD = 0;
    public static final Integer BRONZE_TEAM_SIZE_THRESHOLD = 10;
    public static final Integer SILVER_TEAM_SIZE_THRESHOLD = 50;
    public static final Integer GOLD_TEAM_SIZE_THRESHOLD = 200;
    public static final Integer PLATINUM_TEAM_SIZE_THRESHOLD = 1000;
    public static final Integer DIAMOND_TEAM_SIZE_THRESHOLD = 5000;

    // Academic Timeline (in years)
    public static final Integer BSC_DURATION_YEARS = 3;
    public static final Integer MPHIL_DURATION_YEARS = 2;
    public static final Integer TOTAL_EDUCATION_DURATION_YEARS = 5;

    // Withdrawal Configuration
    public static final BigDecimal DEFAULT_WITHDRAWAL_FEE_PERCENTAGE = new BigDecimal("0.00");  // 0% by default
    public static final BigDecimal MIN_WITHDRAWAL_AMOUNT = new BigDecimal("1000.00");
    public static final BigDecimal MAX_WITHDRAWAL_AMOUNT = new BigDecimal("500000.00");

    // Agent Configuration
    public static final Integer MIN_REFERRALS_FOR_ACTIVATION = 1;
    public static final String DEFAULT_AGENT_STATUS = "PENDING";
    public static final String ACTIVE_AGENT_STATUS = "ACTIVE";

    // Document Configuration
    public static final Long MAX_FILE_SIZE_BYTES = 5242880L;  // 5MB
    public static final String[] ALLOWED_FILE_TYPES = {"PDF", "JPG", "JPEG", "PNG"};
    public static final Integer DOCUMENT_VERIFICATION_DAYS = 7;

    // Pagination Defaults
    public static final Integer DEFAULT_PAGE_SIZE = 20;
    public static final Integer MAX_PAGE_SIZE = 100;

    // API Configuration
    public static final String API_BASE_PATH = "/eepip-api/api/v3";
    public static final String CORS_ALLOWED_ORIGINS = "*.temcobank.com";

    // Cycle Month Format
    public static final String CYCLE_MONTH_FORMAT = "yyyy-MM";

    // Private constructor to prevent instantiation
    private EepipConstants() {
        throw new AssertionError("Utility class should not be instantiated");
    }

    // Helper Methods
    public static BigDecimal calculateCommissionAmount(BigDecimal investmentAmount, BigDecimal rate) {
        if (investmentAmount == null || rate == null) {
            return BigDecimal.ZERO;
        }
        return investmentAmount.multiply(rate).divide(new BigDecimal("100"), 2, RoundingMode.HALF_UP);
    }

    public static String formatCycleMonth(int year, int month) {
        return String.format("%d-%02d", year, month);
    }
}
