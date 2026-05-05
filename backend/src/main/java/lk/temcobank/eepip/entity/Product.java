package lk.temcobank.eepip.entity;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * Product entity - stores product configuration including investment amount and commission rates.
 * All commission amounts are derived at runtime: investment_amount × rate.
 */
@Entity
@Table(name = "eepip_product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "product_code", unique = true, nullable = false, length = 50)
    private String productCode;

    @Column(name = "product_name", nullable = false, length = 200)
    private String productName;

    @Column(name = "investment_amount", nullable = false, precision = 12, scale = 2)
    private BigDecimal investmentAmount;

    @Column(name = "currency", nullable = false, length = 3)
    private String currency = "LKR";

    @Column(name = "direct_sponsor_rate", nullable = false, precision = 5, scale = 2)
    private BigDecimal directSponsorRate = new BigDecimal("2.00");

    @Column(name = "binary_pool_rate", nullable = false, precision = 5, scale = 2)
    private BigDecimal binaryPoolRate = new BigDecimal("5.00");

    @Column(name = "matching_bonus_rate", nullable = false, precision = 5, scale = 2)
    private BigDecimal matchingBonusRate = new BigDecimal("1.50");

    @Column(name = "leadership_pool_rate", nullable = false, precision = 5, scale = 2)
    private BigDecimal leadershipPoolRate = new BigDecimal("1.50");

    @Column(name = "agent_direct_rate", nullable = false, precision = 5, scale = 2)
    private BigDecimal agentDirectRate = new BigDecimal("2.00");

    @Column(name = "agent_pool_rate", nullable = false, precision = 5, scale = 2)
    private BigDecimal agentPoolRate = new BigDecimal("3.00");

    @Column(name = "bank_margin_rate", nullable = false, precision = 5, scale = 2)
    private BigDecimal bankMarginRate = new BigDecimal("6.00");

    @Column(name = "max_binary_pairs_per_month", nullable = false)
    private Integer maxBinaryPairsPerMonth = 3;

    @Column(name = "max_agent_pairs_per_month", nullable = false)
    private Integer maxAgentPairsPerMonth = 2;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 20)
    private ProductStatus status = ProductStatus.ACTIVE;

    @Column(name = "effective_from", nullable = false)
    private LocalDate effectiveFrom;

    @Column(name = "effective_to")
    private LocalDate effectiveTo;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;

    @Column(name = "created_by")
    private Integer createdBy;

    @Column(name = "created_at", nullable = false, updatable = false)
    private java.time.LocalDateTime createdAt = java.time.LocalDateTime.now();

    @Column(name = "updated_by")
    private Integer updatedBy;

    @Column(name = "updated_at", nullable = false)
    private java.time.LocalDateTime updatedAt = java.time.LocalDateTime.now();

    @Column(name = "deleted_at")
    private java.time.LocalDateTime deletedAt;

    @Column(name = "deleted_by")
    private Integer deletedBy;

    @Column(name = "deletion_reason", columnDefinition = "TEXT")
    private String deletionReason;

    // Enums
    public enum ProductStatus {
        ACTIVE,
        DISCONTINUED,
        DRAFT
    }

    // Constructors
    public Product() {
    }

    public Product(String productCode, String productName, BigDecimal investmentAmount, LocalDate effectiveFrom) {
        this.productCode = productCode;
        this.productName = productName;
        this.investmentAmount = investmentAmount;
        this.effectiveFrom = effectiveFrom;
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

    public ProductStatus getStatus() {
        return status;
    }

    public void setStatus(ProductStatus status) {
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

    public Integer getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(Integer createdBy) {
        this.createdBy = createdBy;
    }

    public java.time.LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(java.time.LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public Integer getUpdatedBy() {
        return updatedBy;
    }

    public void setUpdatedBy(Integer updatedBy) {
        this.updatedBy = updatedBy;
    }

    public java.time.LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(java.time.LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public java.time.LocalDateTime getDeletedAt() {
        return deletedAt;
    }

    public void setDeletedAt(java.time.LocalDateTime deletedAt) {
        this.deletedAt = deletedAt;
    }

    public Integer getDeletedBy() {
        return deletedBy;
    }

    public void setDeletedBy(Integer deletedBy) {
        this.deletedBy = deletedBy;
    }

    public String getDeletionReason() {
        return deletionReason;
    }

    public void setDeletionReason(String deletionReason) {
        this.deletionReason = deletionReason;
    }

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = java.time.LocalDateTime.now();
    }

    @PrePersist
    public void prePersist() {
        if (this.createdAt == null) {
            this.createdAt = java.time.LocalDateTime.now();
        }
        this.updatedAt = java.time.LocalDateTime.now();
    }
}
