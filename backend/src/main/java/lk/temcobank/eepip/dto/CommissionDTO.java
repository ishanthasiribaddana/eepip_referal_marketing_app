package lk.temcobank.eepip.dto;

import lk.temcobank.eepip.entity.Commission;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * Commission DTO - Data Transfer Object for Commission entity.
 */
public class CommissionDTO {
    private Integer id;
    private Integer aiEngineerId;
    private String aiEngineerName;
    private Commission.CommissionType type;
    private BigDecimal amount;
    private BigDecimal originalAmount;
    private BigDecimal taxAmount;
    private BigDecimal netAmount;
    private BigDecimal tdsRate;
    private String currency;
    private BigDecimal proRationPercentage;
    private String description;
    private Integer relatedAiEngineerId;
    private String relatedAiEngineerName;
    private String transactionId;
    private LocalDate commissionDate;
    private Commission.CommissionStatus status;
    private Integer approvedBy;
    private LocalDateTime approvedAt;
    private String rejectionReason;
    private LocalDate paidDate;
    private String cycleMonth;
    private String metadataJson;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public CommissionDTO() {
    }

    public CommissionDTO(Commission commission) {
        this.id = commission.getId();
        this.aiEngineerId = commission.getAiEngineer() != null ? commission.getAiEngineer().getId() : null;
        this.aiEngineerName = commission.getAiEngineer() != null ? commission.getAiEngineer().getMemberId().toString() : null;
        this.type = commission.getType();
        this.amount = commission.getAmount();
        this.originalAmount = commission.getOriginalAmount();
        this.taxAmount = commission.getTaxAmount();
        this.netAmount = commission.getNetAmount();
        this.tdsRate = commission.getTdsRate();
        this.currency = commission.getCurrency();
        this.proRationPercentage = commission.getProRationPercentage();
        this.description = commission.getDescription();
        this.relatedAiEngineerId = commission.getRelatedAiEngineer() != null ? commission.getRelatedAiEngineer().getId() : null;
        this.relatedAiEngineerName = commission.getRelatedAiEngineer() != null ? commission.getRelatedAiEngineer().getMemberId().toString() : null;
        this.transactionId = commission.getTransactionId();
        this.commissionDate = commission.getCommissionDate();
        this.status = commission.getStatus();
        this.approvedBy = commission.getApprovedBy();
        this.approvedAt = commission.getApprovedAt();
        this.rejectionReason = commission.getRejectionReason();
        this.paidDate = commission.getPaidDate();
        this.cycleMonth = commission.getCycleMonth();
        this.metadataJson = commission.getMetadataJson();
        this.createdAt = commission.getCreatedAt();
        this.updatedAt = commission.getUpdatedAt();
    }

    // Getters and Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getAiEngineerId() {
        return aiEngineerId;
    }

    public void setAiEngineerId(Integer aiEngineerId) {
        this.aiEngineerId = aiEngineerId;
    }

    public String getAiEngineerName() {
        return aiEngineerName;
    }

    public void setAiEngineerName(String aiEngineerName) {
        this.aiEngineerName = aiEngineerName;
    }

    public Commission.CommissionType getType() {
        return type;
    }

    public void setType(Commission.CommissionType type) {
        this.type = type;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public BigDecimal getOriginalAmount() {
        return originalAmount;
    }

    public void setOriginalAmount(BigDecimal originalAmount) {
        this.originalAmount = originalAmount;
    }

    public BigDecimal getTaxAmount() {
        return taxAmount;
    }

    public void setTaxAmount(BigDecimal taxAmount) {
        this.taxAmount = taxAmount;
    }

    public BigDecimal getNetAmount() {
        return netAmount;
    }

    public void setNetAmount(BigDecimal netAmount) {
        this.netAmount = netAmount;
    }

    public BigDecimal getTdsRate() {
        return tdsRate;
    }

    public void setTdsRate(BigDecimal tdsRate) {
        this.tdsRate = tdsRate;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public BigDecimal getProRationPercentage() {
        return proRationPercentage;
    }

    public void setProRationPercentage(BigDecimal proRationPercentage) {
        this.proRationPercentage = proRationPercentage;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getRelatedAiEngineerId() {
        return relatedAiEngineerId;
    }

    public void setRelatedAiEngineerId(Integer relatedAiEngineerId) {
        this.relatedAiEngineerId = relatedAiEngineerId;
    }

    public String getRelatedAiEngineerName() {
        return relatedAiEngineerName;
    }

    public void setRelatedAiEngineerName(String relatedAiEngineerName) {
        this.relatedAiEngineerName = relatedAiEngineerName;
    }

    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }

    public LocalDate getCommissionDate() {
        return commissionDate;
    }

    public void setCommissionDate(LocalDate commissionDate) {
        this.commissionDate = commissionDate;
    }

    public Commission.CommissionStatus getStatus() {
        return status;
    }

    public void setStatus(Commission.CommissionStatus status) {
        this.status = status;
    }

    public Integer getApprovedBy() {
        return approvedBy;
    }

    public void setApprovedBy(Integer approvedBy) {
        this.approvedBy = approvedBy;
    }

    public LocalDateTime getApprovedAt() {
        return approvedAt;
    }

    public void setApprovedAt(LocalDateTime approvedAt) {
        this.approvedAt = approvedAt;
    }

    public String getRejectionReason() {
        return rejectionReason;
    }

    public void setRejectionReason(String rejectionReason) {
        this.rejectionReason = rejectionReason;
    }

    public LocalDate getPaidDate() {
        return paidDate;
    }

    public void setPaidDate(LocalDate paidDate) {
        this.paidDate = paidDate;
    }

    public String getCycleMonth() {
        return cycleMonth;
    }

    public void setCycleMonth(String cycleMonth) {
        this.cycleMonth = cycleMonth;
    }

    public String getMetadataJson() {
        return metadataJson;
    }

    public void setMetadataJson(String metadataJson) {
        this.metadataJson = metadataJson;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
