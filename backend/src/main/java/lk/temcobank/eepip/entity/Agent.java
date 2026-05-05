package lk.temcobank.eepip.entity;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * Agent entity - Agent (introduces AI Engineers, separate binary tree).
 */
@Entity
@Table(name = "eepip_agent")
public class Agent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "member_id", unique = true, nullable = false)
    private Integer memberId;

    @ManyToOne
    @JoinColumn(name = "ai_engineer_id", foreignKey = @ForeignKey(name = "fk_agent_ai_engineer"))
    private AiEngineer aiEngineer;

    @ManyToOne
    @JoinColumn(name = "sponsor_agent_id", foreignKey = @ForeignKey(name = "fk_agent_sponsor"))
    private Agent sponsorAgent;

    @ManyToOne
    @JoinColumn(name = "parent_agent_id", foreignKey = @ForeignKey(name = "fk_agent_parent"))
    private Agent parentAgent;

    @Enumerated(EnumType.STRING)
    @Column(name = "position", length = 10)
    private TreePosition position;

    @Column(name = "tree_level")
    private Integer treeLevel = 0;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", length = 20)
    private AgentStatus status = AgentStatus.PENDING;

    @Column(name = "activation_date")
    private LocalDate activationDate;

    @Column(name = "total_referrals")
    private Integer totalReferrals = 0;

    @Column(name = "total_agent_recruits")
    private Integer totalAgentRecruits = 0;

    @Column(name = "total_direct_earnings", precision = 12, scale = 2)
    private BigDecimal totalDirectEarnings = BigDecimal.ZERO;

    @Column(name = "total_binary_earnings", precision = 12, scale = 2)
    private BigDecimal totalBinaryEarnings = BigDecimal.ZERO;

    @Column(name = "appointed_by_member_id", nullable = false)
    private Integer appointedByMemberId;

    @Column(name = "appointed_date", nullable = false)
    private LocalDate appointedDate;

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

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

    @Column(name = "deleted_by")
    private Integer deletedBy;

    @Column(name = "deletion_reason", columnDefinition = "TEXT")
    private String deletionReason;

    // Enums
    public enum AgentStatus {
        PENDING,
        ACTIVE,
        SUSPENDED,
        TERMINATED
    }

    public enum TreePosition {
        LEFT,
        RIGHT
    }

    public Agent() {
    }

    public Agent(Integer memberId, Integer appointedByMemberId, LocalDate appointedDate) {
        this.memberId = memberId;
        this.appointedByMemberId = appointedByMemberId;
        this.appointedDate = appointedDate;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getMemberId() {
        return memberId;
    }

    public void setMemberId(Integer memberId) {
        this.memberId = memberId;
    }

    public AiEngineer getAiEngineer() {
        return aiEngineer;
    }

    public void setAiEngineer(AiEngineer aiEngineer) {
        this.aiEngineer = aiEngineer;
    }

    public Agent getSponsorAgent() {
        return sponsorAgent;
    }

    public void setSponsorAgent(Agent sponsorAgent) {
        this.sponsorAgent = sponsorAgent;
    }

    public Agent getParentAgent() {
        return parentAgent;
    }

    public void setParentAgent(Agent parentAgent) {
        this.parentAgent = parentAgent;
    }

    public TreePosition getPosition() {
        return position;
    }

    public void setPosition(TreePosition position) {
        this.position = position;
    }

    public Integer getTreeLevel() {
        return treeLevel;
    }

    public void setTreeLevel(Integer treeLevel) {
        this.treeLevel = treeLevel;
    }

    public AgentStatus getStatus() {
        return status;
    }

    public void setStatus(AgentStatus status) {
        this.status = status;
    }

    public LocalDate getActivationDate() {
        return activationDate;
    }

    public void setActivationDate(LocalDate activationDate) {
        this.activationDate = activationDate;
    }

    public Integer getTotalReferrals() {
        return totalReferrals;
    }

    public void setTotalReferrals(Integer totalReferrals) {
        this.totalReferrals = totalReferrals;
    }

    public Integer getTotalAgentRecruits() {
        return totalAgentRecruits;
    }

    public void setTotalAgentRecruits(Integer totalAgentRecruits) {
        this.totalAgentRecruits = totalAgentRecruits;
    }

    public BigDecimal getTotalDirectEarnings() {
        return totalDirectEarnings;
    }

    public void setTotalDirectEarnings(BigDecimal totalDirectEarnings) {
        this.totalDirectEarnings = totalDirectEarnings;
    }

    public BigDecimal getTotalBinaryEarnings() {
        return totalBinaryEarnings;
    }

    public void setTotalBinaryEarnings(BigDecimal totalBinaryEarnings) {
        this.totalBinaryEarnings = totalBinaryEarnings;
    }

    public Integer getAppointedByMemberId() {
        return appointedByMemberId;
    }

    public void setAppointedByMemberId(Integer appointedByMemberId) {
        this.appointedByMemberId = appointedByMemberId;
    }

    public LocalDate getAppointedDate() {
        return appointedDate;
    }

    public void setAppointedDate(LocalDate appointedDate) {
        this.appointedDate = appointedDate;
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

    public LocalDateTime getDeletedAt() {
        return deletedAt;
    }

    public void setDeletedAt(LocalDateTime deletedAt) {
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
