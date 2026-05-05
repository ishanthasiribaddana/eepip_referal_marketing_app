package lk.temcobank.eepip.util;

import lk.temcobank.eepip.entity.Product;

import java.math.BigDecimal;
import java.math.RoundingMode;

/**
 * Commission Calculator - Pool cap, pro-rating logic, and commission calculations.
 * All commission amounts are derived at runtime: product.investment_amount × rate.
 */
public final class CommissionCalculator {

    // Private constructor to prevent instantiation
    private CommissionCalculator() {
        throw new AssertionError("Utility class should not be instantiated");
    }

    /**
     * Calculate commission amount based on investment amount and rate.
     * Formula: investment_amount × rate / 100
     */
    public static BigDecimal calculateCommissionAmount(BigDecimal investmentAmount, BigDecimal rate) {
        if (investmentAmount == null || rate == null) {
            return BigDecimal.ZERO;
        }
        return investmentAmount.multiply(rate).divide(new BigDecimal("100"), 2, RoundingMode.HALF_UP);
    }

    /**
     * Calculate direct sponsor commission.
     */
    public static BigDecimal calculateDirectSponsorCommission(Product product) {
        return calculateCommissionAmount(product.getInvestmentAmount(), product.getDirectSponsorRate());
    }

    /**
     * Calculate binary pairing commission per pair.
     */
    public static BigDecimal calculateBinaryPairingCommission(Product product) {
        return calculateCommissionAmount(product.getInvestmentAmount(), product.getBinaryPoolRate());
    }

    /**
     * Calculate matching bonus commission.
     */
    public static BigDecimal calculateMatchingBonusCommission(Product product) {
        return calculateCommissionAmount(product.getInvestmentAmount(), product.getMatchingBonusRate());
    }

    /**
     * Calculate leadership pool commission.
     */
    public static BigDecimal calculateLeadershipPoolCommission(Product product) {
        return calculateCommissionAmount(product.getInvestmentAmount(), product.getLeadershipPoolRate());
    }

    /**
     * Calculate agent direct referral commission.
     */
    public static BigDecimal calculateAgentDirectCommission(Product product) {
        return calculateCommissionAmount(product.getInvestmentAmount(), product.getAgentDirectRate());
    }

    /**
     * Calculate agent binary pairing commission per pair.
     */
    public static BigDecimal calculateAgentBinaryPairingCommission(Product product) {
        return calculateCommissionAmount(product.getInvestmentAmount(), product.getAgentPoolRate());
    }

    /**
     * Calculate bank margin amount.
     */
    public static BigDecimal calculateBankMargin(Product product) {
        return calculateCommissionAmount(product.getInvestmentAmount(), product.getBankMarginRate());
    }

    /**
     * Calculate institute transfer amount (remainder).
     * Formula: investment_amount - (all commissions + bank_margin)
     */
    public static BigDecimal calculateInstituteTransfer(Product product) {
        BigDecimal totalCommissionRates = product.getDirectSponsorRate()
                .add(product.getBinaryPoolRate())
                .add(product.getMatchingBonusRate())
                .add(product.getLeadershipPoolRate())
                .add(product.getAgentDirectRate())
                .add(product.getAgentPoolRate())
                .add(product.getBankMarginRate());
        
        BigDecimal instituteRate = new BigDecimal("100").subtract(totalCommissionRates);
        return calculateCommissionAmount(product.getInvestmentAmount(), instituteRate);
    }

    /**
     * Calculate maximum binary pairing payout for a month.
     * Formula: binary_pairing_commission × max_binary_pairs_per_month
     */
    public static BigDecimal calculateMaxBinaryPairingPayout(Product product, Integer pairs) {
        if (pairs == null || pairs < 0) {
            pairs = 0;
        }
        BigDecimal commissionPerPair = calculateBinaryPairingCommission(product);
        return commissionPerPair.multiply(new BigDecimal(pairs));
    }

    /**
     * Calculate maximum agent pairing payout for a month.
     * Formula: agent_binary_commission × max_agent_pairs_per_month
     */
    public static BigDecimal calculateMaxAgentPairingPayout(Product product, Integer pairs) {
        if (pairs == null || pairs < 0) {
            pairs = 0;
        }
        BigDecimal commissionPerPair = calculateAgentBinaryPairingCommission(product);
        return commissionPerPair.multiply(new BigDecimal(pairs));
    }

    /**
     * Calculate pro-ration percentage when pool is over-utilized.
     * Formula: (pool_amount / total_claims) × 100
     */
    public static BigDecimal calculateProRationPercentage(BigDecimal poolAmount, BigDecimal totalClaims) {
        if (poolAmount == null || totalClaims == null || totalClaims.compareTo(BigDecimal.ZERO) == 0) {
            return new BigDecimal("100.00");
        }
        
        if (poolAmount.compareTo(totalClaims) >= 0) {
            return new BigDecimal("100.00");  // No pro-ration needed
        }
        
        return poolAmount.divide(totalClaims, 4, RoundingMode.HALF_UP)
                .multiply(new BigDecimal("100"))
                .setScale(2, RoundingMode.HALF_UP);
    }

    /**
     * Apply pro-ration to a commission amount.
     * Formula: amount × pro_ration_percentage / 100
     */
    public static BigDecimal applyProRation(BigDecimal amount, BigDecimal proRationPercentage) {
        if (amount == null || proRationPercentage == null) {
            return amount;
        }
        return amount.multiply(proRationPercentage).divide(new BigDecimal("100"), 2, RoundingMode.HALF_UP);
    }

    /**
     * Calculate tax amount using TDS rate.
     * Formula: amount × tds_rate / 100
     */
    public static BigDecimal calculateTaxAmount(BigDecimal amount, BigDecimal tdsRate) {
        if (amount == null || tdsRate == null || tdsRate.compareTo(BigDecimal.ZERO) == 0) {
            return BigDecimal.ZERO;
        }
        return amount.multiply(tdsRate).divide(new BigDecimal("100"), 2, RoundingMode.HALF_UP);
    }

    /**
     * Calculate net amount after tax.
     * Formula: amount - tax_amount
     */
    public static BigDecimal calculateNetAmount(BigDecimal amount, BigDecimal taxAmount) {
        if (amount == null) {
            return BigDecimal.ZERO;
        }
        if (taxAmount == null) {
            taxAmount = BigDecimal.ZERO;
        }
        return amount.subtract(taxAmount);
    }

    /**
     * Calculate carry-forward amount for binary pool.
     * Formula: pool_amount - total_claims (if positive, else 0)
     */
    public static BigDecimal calculateCarryForward(BigDecimal poolAmount, BigDecimal totalClaims) {
        if (poolAmount == null) {
            poolAmount = BigDecimal.ZERO;
        }
        if (totalClaims == null) {
            totalClaims = BigDecimal.ZERO;
        }
        
        BigDecimal surplus = poolAmount.subtract(totalClaims);
        return surplus.compareTo(BigDecimal.ZERO) > 0 ? surplus : BigDecimal.ZERO;
    }

    /**
     * Calculate pool utilization percentage.
     * Formula: (total_claims / pool_amount) × 100
     */
    public static BigDecimal calculateUtilization(BigDecimal totalClaims, BigDecimal poolAmount) {
        if (poolAmount == null || poolAmount.compareTo(BigDecimal.ZERO) == 0) {
            return BigDecimal.ZERO;
        }
        if (totalClaims == null) {
            totalClaims = BigDecimal.ZERO;
        }
        return totalClaims.divide(poolAmount, 4, RoundingMode.HALF_UP)
                .multiply(new BigDecimal("100"))
                .setScale(2, RoundingMode.HALF_UP);
    }

    /**
     * Calculate number of binary pairs that can be paid out.
     * Formula: min(pairs, max_pairs_per_month)
     */
    public static Integer calculatePaidPairs(Integer pairs, Integer maxPairsPerMonth) {
        if (pairs == null) {
            pairs = 0;
        }
        if (maxPairsPerMonth == null) {
            maxPairsPerMonth = EepipConstants.DEFAULT_MAX_BINARY_PAIRS_PER_MONTH;
        }
        return Math.min(pairs, maxPairsPerMonth);
    }

    /**
     * Calculate total commission for a set of pairs.
     * Formula: commission_per_pair × paid_pairs
     */
    public static BigDecimal calculateTotalPairingCommission(BigDecimal commissionPerPair, Integer paidPairs) {
        if (commissionPerPair == null || paidPairs == null || paidPairs == 0) {
            return BigDecimal.ZERO;
        }
        return commissionPerPair.multiply(new BigDecimal(paidPairs));
    }
}
