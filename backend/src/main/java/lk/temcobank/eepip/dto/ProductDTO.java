package lk.temcobank.eepip.dto;

import lk.temcobank.eepip.entity.Product;

import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * Product DTO - Data Transfer Object for Product entity.
 */
public class ProductDTO {
    private Integer id;
    private String productCode;
    private String productName;
    private BigDecimal investmentAmount;
    private String currency;
    private BigDecimal directSponsorRate;
    private BigDecimal binaryPoolRate;
    private BigDecimal matchingBonusRate;
    private BigDecimal leadershipPoolRate;
    private BigDecimal agentDirectRate;
    private BigDecimal agentPoolRate;
    private BigDecimal bankMarginRate;
    private Integer maxBinaryPairsPerMonth;
    private Integer maxAgentPairsPerMonth;
    private Product.ProductStatus status;
    private LocalDate effectiveFrom;
    private LocalDate effectiveTo;
    private Boolean isActive;

    public ProductDTO() {
    }

    public ProductDTO(Product product) {
        this.id = product.getId();
        this.productCode = product.getProductCode();
        this.productName = product.getProductName();
        this.investmentAmount = product.getInvestmentAmount();
        this.currency = product.getCurrency();
        this.directSponsorRate = product.getDirectSponsorRate();
        this.binaryPoolRate = product.getBinaryPoolRate();
        this.matchingBonusRate = product.getMatchingBonusRate();
        this.leadershipPoolRate = product.getLeadershipPoolRate();
        this.agentDirectRate = product.getAgentDirectRate();
        this.agentPoolRate = product.getAgentPoolRate();
        this.bankMarginRate = product.getBankMarginRate();
        this.maxBinaryPairsPerMonth = product.getMaxBinaryPairsPerMonth();
        this.maxAgentPairsPerMonth = product.getMaxAgentPairsPerMonth();
        this.status = product.getStatus();
        this.effectiveFrom = product.getEffectiveFrom();
        this.effectiveTo = product.getEffectiveTo();
        this.isActive = product.getIsActive();
    }

    // Getters and Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getProductCode() {
        return productCode;
    }

    public void setProductCode(String productCode) {
        this.productCode = productCode;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public BigDecimal getInvestmentAmount() {
        return investmentAmount;
    }

    public void setInvestmentAmount(BigDecimal investmentAmount) {
        this.investmentAmount = investmentAmount;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public BigDecimal getDirectSponsorRate() {
        return directSponsorRate;
    }

    public void setDirectSponsorRate(BigDecimal directSponsorRate) {
        this.directSponsorRate = directSponsorRate;
    }

    public BigDecimal getBinaryPoolRate() {
        return binaryPoolRate;
    }

    public void setBinaryPoolRate(BigDecimal binaryPoolRate) {
        this.binaryPoolRate = binaryPoolRate;
    }

    public BigDecimal getMatchingBonusRate() {
        return matchingBonusRate;
    }

    public void setMatchingBonusRate(BigDecimal matchingBonusRate) {
        this.matchingBonusRate = matchingBonusRate;
    }

    public BigDecimal getLeadershipPoolRate() {
        return leadershipPoolRate;
    }

    public void setLeadershipPoolRate(BigDecimal leadershipPoolRate) {
        this.leadershipPoolRate = leadershipPoolRate;
    }

    public BigDecimal getAgentDirectRate() {
        return agentDirectRate;
    }

    public void setAgentDirectRate(BigDecimal agentDirectRate) {
        this.agentDirectRate = agentDirectRate;
    }

    public BigDecimal getAgentPoolRate() {
        return agentPoolRate;
    }

    public void setAgentPoolRate(BigDecimal agentPoolRate) {
        this.agentPoolRate = agentPoolRate;
    }

    public BigDecimal getBankMarginRate() {
        return bankMarginRate;
    }

    public void setBankMarginRate(BigDecimal bankMarginRate) {
        this.bankMarginRate = bankMarginRate;
    }

    public Integer getMaxBinaryPairsPerMonth() {
        return maxBinaryPairsPerMonth;
    }

    public void setMaxBinaryPairsPerMonth(Integer maxBinaryPairsPerMonth) {
        this.maxBinaryPairsPerMonth = maxBinaryPairsPerMonth;
    }

    public Integer getMaxAgentPairsPerMonth() {
        return maxAgentPairsPerMonth;
    }

    public void setMaxAgentPairsPerMonth(Integer maxAgentPairsPerMonth) {
        this.maxAgentPairsPerMonth = maxAgentPairsPerMonth;
    }

    public Product.ProductStatus getStatus() {
        return status;
    }

    public void setStatus(Product.ProductStatus status) {
        this.status = status;
    }

    public LocalDate getEffectiveFrom() {
        return effectiveFrom;
    }

    public void setEffectiveFrom(LocalDate effectiveFrom) {
        this.effectiveFrom = effectiveFrom;
    }

    public LocalDate getEffectiveTo() {
        return effectiveTo;
    }

    public void setEffectiveTo(LocalDate effectiveTo) {
        this.effectiveTo = effectiveTo;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }
}
