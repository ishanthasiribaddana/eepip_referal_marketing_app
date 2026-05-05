package lk.temcobank.eepip.util;

import lk.temcobank.eepip.entity.Product;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.*;

public class CommissionCalculatorTest {

    @Test
    public void testCalculateCommissionAmount() {
        BigDecimal investment = new BigDecimal("1800000.00");
        BigDecimal rate = new BigDecimal("2.00");
        BigDecimal result = CommissionCalculator.calculateCommissionAmount(investment, rate);
        assertEquals(new BigDecimal("36000.00"), result);
    }

    @Test
    public void testCalculateCommissionAmount_NullInputs() {
        assertEquals(BigDecimal.ZERO, CommissionCalculator.calculateCommissionAmount(null, new BigDecimal("2.00")));
        assertEquals(BigDecimal.ZERO, CommissionCalculator.calculateCommissionAmount(new BigDecimal("1000"), null));
    }

    @Test
    public void testCalculateDirectSponsorCommission() {
        Product product = createTestProduct();
        BigDecimal result = CommissionCalculator.calculateDirectSponsorCommission(product);
        assertEquals(new BigDecimal("36000.00"), result);
    }

    @Test
    public void testCalculateBinaryPairingCommission() {
        Product product = createTestProduct();
        BigDecimal result = CommissionCalculator.calculateBinaryPairingCommission(product);
        assertEquals(new BigDecimal("90000.00"), result);
    }

    @Test
    public void testCalculateMatchingBonusCommission() {
        Product product = createTestProduct();
        BigDecimal result = CommissionCalculator.calculateMatchingBonusCommission(product);
        assertEquals(new BigDecimal("27000.00"), result);
    }

    @Test
    public void testCalculateLeadershipPoolCommission() {
        Product product = createTestProduct();
        BigDecimal result = CommissionCalculator.calculateLeadershipPoolCommission(product);
        assertEquals(new BigDecimal("27000.00"), result);
    }

    @Test
    public void testCalculateAgentDirectCommission() {
        Product product = createTestProduct();
        BigDecimal result = CommissionCalculator.calculateAgentDirectCommission(product);
        assertEquals(new BigDecimal("36000.00"), result);
    }

    @Test
    public void testCalculateAgentBinaryPairingCommission() {
        Product product = createTestProduct();
        BigDecimal result = CommissionCalculator.calculateAgentBinaryPairingCommission(product);
        assertEquals(new BigDecimal("54000.00"), result);
    }

    @Test
    public void testCalculateBankMargin() {
        Product product = createTestProduct();
        BigDecimal result = CommissionCalculator.calculateBankMargin(product);
        assertEquals(new BigDecimal("108000.00"), result);
    }

    @Test
    public void testCalculateInstituteTransfer() {
        Product product = createTestProduct();
        BigDecimal result = CommissionCalculator.calculateInstituteTransfer(product);
        assertEquals(new BigDecimal("1422000.00"), result);
    }

    @Test
    public void testCalculateMaxBinaryPairingPayout() {
        Product product = createTestProduct();
        BigDecimal result = CommissionCalculator.calculateMaxBinaryPairingPayout(product, 3);
        assertEquals(new BigDecimal("270000.00"), result);
    }

    @Test
    public void testCalculateMaxBinaryPairingPayout_NullPairs() {
        Product product = createTestProduct();
        BigDecimal result = CommissionCalculator.calculateMaxBinaryPairingPayout(product, null);
        assertEquals(BigDecimal.ZERO, result);
    }

    @Test
    public void testCalculateMaxAgentPairingPayout() {
        Product product = createTestProduct();
        BigDecimal result = CommissionCalculator.calculateMaxAgentPairingPayout(product, 2);
        assertEquals(new BigDecimal("108000.00"), result);
    }

    @Test
    public void testCalculateProRationPercentage_NoProRationNeeded() {
        BigDecimal poolAmount = new BigDecimal("100000.00");
        BigDecimal totalClaims = new BigDecimal("90000.00");
        BigDecimal result = CommissionCalculator.calculateProRationPercentage(poolAmount, totalClaims);
        assertEquals(new BigDecimal("100.00"), result);
    }

    @Test
    public void testCalculateProRationPercentage_WithProRation() {
        BigDecimal poolAmount = new BigDecimal("100000.00");
        BigDecimal totalClaims = new BigDecimal("200000.00");
        BigDecimal result = CommissionCalculator.calculateProRationPercentage(poolAmount, totalClaims);
        assertEquals(new BigDecimal("50.00"), result);
    }

    @Test
    public void testCalculateProRationPercentage_NullInputs() {
        assertEquals(new BigDecimal("100.00"), CommissionCalculator.calculateProRationPercentage(null, new BigDecimal("100")));
        assertEquals(new BigDecimal("100.00"), CommissionCalculator.calculateProRationPercentage(new BigDecimal("100"), null));
        assertEquals(new BigDecimal("100.00"), CommissionCalculator.calculateProRationPercentage(new BigDecimal("100"), BigDecimal.ZERO));
    }

    @Test
    public void testApplyProRation() {
        BigDecimal amount = new BigDecimal("10000.00");
        BigDecimal proRation = new BigDecimal("50.00");
        BigDecimal result = CommissionCalculator.applyProRation(amount, proRation);
        assertEquals(new BigDecimal("5000.00"), result);
    }

    @Test
    public void testCalculateTaxAmount() {
        BigDecimal amount = new BigDecimal("10000.00");
        BigDecimal tdsRate = new BigDecimal("5.00");
        BigDecimal result = CommissionCalculator.calculateTaxAmount(amount, tdsRate);
        assertEquals(new BigDecimal("500.00"), result);
    }

    @Test
    public void testCalculateTaxAmount_ZeroRate() {
        BigDecimal amount = new BigDecimal("10000.00");
        BigDecimal result = CommissionCalculator.calculateTaxAmount(amount, BigDecimal.ZERO);
        assertEquals(BigDecimal.ZERO, result);
    }

    @Test
    public void testCalculateNetAmount() {
        BigDecimal amount = new BigDecimal("10000.00");
        BigDecimal taxAmount = new BigDecimal("500.00");
        BigDecimal result = CommissionCalculator.calculateNetAmount(amount, taxAmount);
        assertEquals(new BigDecimal("9500.00"), result);
    }

    @Test
    public void testCalculateCarryForward_PositiveSurplus() {
        BigDecimal poolAmount = new BigDecimal("100000.00");
        BigDecimal totalClaims = new BigDecimal("80000.00");
        BigDecimal result = CommissionCalculator.calculateCarryForward(poolAmount, totalClaims);
        assertEquals(new BigDecimal("20000.00"), result);
    }

    @Test
    public void testCalculateCarryForward_NoSurplus() {
        BigDecimal poolAmount = new BigDecimal("100000.00");
        BigDecimal totalClaims = new BigDecimal("100000.00");
        BigDecimal result = CommissionCalculator.calculateCarryForward(poolAmount, totalClaims);
        assertEquals(BigDecimal.ZERO, result);
    }

    @Test
    public void testCalculateCarryForward_Deficit() {
        BigDecimal poolAmount = new BigDecimal("80000.00");
        BigDecimal totalClaims = new BigDecimal("100000.00");
        BigDecimal result = CommissionCalculator.calculateCarryForward(poolAmount, totalClaims);
        assertEquals(BigDecimal.ZERO, result);
    }

    @Test
    public void testCalculateUtilization() {
        BigDecimal totalClaims = new BigDecimal("80000.00");
        BigDecimal poolAmount = new BigDecimal("100000.00");
        BigDecimal result = CommissionCalculator.calculateUtilization(totalClaims, poolAmount);
        assertEquals(new BigDecimal("80.00"), result);
    }

    @Test
    public void testCalculatePaidPairs() {
        Integer result = CommissionCalculator.calculatePaidPairs(5, 3);
        assertEquals(3, result);
    }

    @Test
    public void testCalculatePaidPairs_UnderLimit() {
        Integer result = CommissionCalculator.calculatePaidPairs(2, 5);
        assertEquals(2, result);
    }

    @Test
    public void testCalculateTotalPairingCommission() {
        BigDecimal commissionPerPair = new BigDecimal("1000.00");
        Integer paidPairs = 3;
        BigDecimal result = CommissionCalculator.calculateTotalPairingCommission(commissionPerPair, paidPairs);
        assertEquals(new BigDecimal("3000.00"), result);
    }

    @Test
    public void testCalculateTotalPairingCommission_ZeroPairs() {
        BigDecimal commissionPerPair = new BigDecimal("1000.00");
        BigDecimal result = CommissionCalculator.calculateTotalPairingCommission(commissionPerPair, 0);
        assertEquals(BigDecimal.ZERO, result);
    }

    private Product createTestProduct() {
        Product product = new Product();
        product.setProductCode("TEST");
        product.setProductName("Test Product");
        product.setInvestmentAmount(new BigDecimal("1800000.00"));
        product.setDirectSponsorRate(new BigDecimal("2.00"));
        product.setBinaryPoolRate(new BigDecimal("5.00"));
        product.setMatchingBonusRate(new BigDecimal("1.50"));
        product.setLeadershipPoolRate(new BigDecimal("1.50"));
        product.setAgentDirectRate(new BigDecimal("2.00"));
        product.setAgentPoolRate(new BigDecimal("3.00"));
        product.setBankMarginRate(new BigDecimal("6.00"));
        product.setMaxBinaryPairsPerMonth(3);
        product.setMaxAgentPairsPerMonth(2);
        return product;
    }
}
