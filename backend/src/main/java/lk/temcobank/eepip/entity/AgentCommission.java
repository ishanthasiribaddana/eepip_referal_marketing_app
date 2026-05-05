package lk.temcobank.eepip.entity;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * AgentCommission entity - Agent earnings with tax tracking.
 */
@Entity
@Table(name = "eepip_agent_commission")
public class AgentCommission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "agent_id", nullable = false, foreignKey = @ForeignKey(name = "fk_agent_commission_agent"))
    private Agent agent;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false, length = 30)
    private AgentCommissionType type;

    @ManyToOne
    @JoinColumn(name = "ai_engineer_id", foreignKey = @ForeignKey(name = "fk_agent_commission_ai_engineer"))
    private AiEngineer aiEngineer;

    @Column(name = "amount", nullable = false, precision = 12, scale = 2)
    private BigDecimal amount;

    @Column(name = "tax_amount", precision = 12, scale = 2)
    private BigDecimal taxAmount = BigDecimal.ZERO;

    @Column(name = "net_amount", nullable = false, precision = 12, scale = 2)
    private BigDecimal netAmount;

    @Column(name = "tds_rate", precision = 5, scale = 2)
    private BigDecimal tdsRate = BigDecimal.ZERO;

    @Column(name = "currency", length = 3)
    private String currency = "LKR";

    @Enumerated(EnumType.STRING)
    @Column(name = "status", length = 20)
    private CommissionStatus status = CommissionStatus.PENDING;

    @Column(name = "commission_date", nullable = false)
    private LocalDate commissionDate;

    @Column(name = "cycle_month", length = 7)
    private String cycleMonth;

    @Column(name = "paid_date")
    private LocalDate paidDate;

    @Column(name = "is_active")
    private Boolean isActive = true;

    @Column(name = "created_by")
    private Integer createdBy;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_by")
    private Integer updatedBy;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt = LocalDateTime.now();

    // Enums
    public enum AgentCommissionType {
        DIRECT_REFERRAL,
        BINARY_PAIRING
    }

    public enum CommissionStatus {
        PENDING,
        APPROVED,
        PAID,
        REJECTED
    }

    public AgentCommission() {
    }

    public AgentCommission(Agent agent, AgentCommissionType type, BigDecimal amount, LocalDate commissionDate) {
        this.agent = agent;
        this.type = type;
        this.amount = amount;
        this.netAmount = amount;
        this.commissionDate = commissionDate;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Agent getAgent() {
        return agent;
    }

    public void setAgent(Agent agent) {
        this.agent = agent;
    }

    public AgentCommissionType getType() {
        return type;
    }

    public void setType(AgentCommissionType type) {
        this.type = type;
    }

    public AiEngineer getAiEngineer() {
        return aiEngineer;
    }

    public void setAiEngineer(AiEngineer aiEngineer) {
        this.aiEngineer = aiEngineer;
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

    public CommissionStatus getStatus() {
        return status;
    }

    public void setStatus(CommissionStatus status) {
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

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public Integer getUpdatedBy() {
        return updatedBy;
    }

    public void setUpdatedBy(Integer updatedBy) {
        this.updatedBy = updatedBy;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    @PrePersist
    public void prePersist() {
        if (this.createdAt == null) {
            this.createdAt = LocalDateTime.now();
        }
        this.updatedAt = LocalDateTime.now();
    }
}
