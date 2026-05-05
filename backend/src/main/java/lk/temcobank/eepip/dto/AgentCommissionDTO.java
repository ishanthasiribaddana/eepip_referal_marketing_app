package lk.temcobank.eepip.dto;

import lk.temcobank.eepip.entity.AgentCommission;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * Agent Commission DTO - Data Transfer Object for AgentCommission entity.
 */
public class AgentCommissionDTO {
    private Integer id;
    private Integer agentId;
    private String agentName;
    private AgentCommission.AgentCommissionType type;
    private Integer aiEngineerId;
    private String aiEngineerName;
    private BigDecimal amount;
    private BigDecimal taxAmount;
    private BigDecimal netAmount;
    private BigDecimal tdsRate;
    private String currency;
    private AgentCommission.CommissionStatus status;
    private LocalDate commissionDate;
    private String cycleMonth;
    private LocalDate paidDate;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public AgentCommissionDTO() {
    }

    public AgentCommissionDTO(AgentCommission commission) {
        this.id = commission.getId();
        this.agentId = commission.getAgent() != null ? commission.getAgent().getId() : null;
        this.agentName = commission.getAgent() != null ? commission.getAgent().getMemberId().toString() : null;
        this.type = commission.getType();
        this.aiEngineerId = commission.getAiEngineer() != null ? commission.getAiEngineer().getId() : null;
        this.aiEngineerName = commission.getAiEngineer() != null ? commission.getAiEngineer().getMemberId().toString() : null;
        this.amount = commission.getAmount();
        this.taxAmount = commission.getTaxAmount();
        this.netAmount = commission.getNetAmount();
        this.tdsRate = commission.getTdsRate();
        this.currency = commission.getCurrency();
        this.status = commission.getStatus();
        this.commissionDate = commission.getCommissionDate();
        this.cycleMonth = commission.getCycleMonth();
        this.paidDate = commission.getPaidDate();
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

    public Integer getAgentId() {
        return agentId;
    }

    public void setAgentId(Integer agentId) {
        this.agentId = agentId;
    }

    public String getAgentName() {
        return agentName;
    }

    public void setAgentName(String agentName) {
        this.agentName = agentName;
    }

    public AgentCommission.AgentCommissionType getType() {
        return type;
    }

    public void setType(AgentCommission.AgentCommissionType type) {
        this.type = type;
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

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
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

    public AgentCommission.CommissionStatus getStatus() {
        return status;
    }

    public void setStatus(AgentCommission.CommissionStatus status) {
        this.status = status;
    }

    public LocalDate getCommissionDate() {
        return commissionDate;
    }

    public void setCommissionDate(LocalDate commissionDate) {
        this.commissionDate = commissionDate;
    }

    public String getCycleMonth() {
        return cycleMonth;
    }

    public void setCycleMonth(String cycleMonth) {
        this.cycleMonth = cycleMonth;
    }

    public LocalDate getPaidDate() {
        return paidDate;
    }

    public void setPaidDate(LocalDate paidDate) {
        this.paidDate = paidDate;
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
