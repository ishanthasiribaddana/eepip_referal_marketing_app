package lk.temcobank.eepip.dto;

import lk.temcobank.eepip.entity.Agent;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * Agent DTO - Data Transfer Object for Agent entity.
 */
public class AgentDTO {
    private Integer id;
    private Integer memberId;
    private Integer aiEngineerId;
    private Integer sponsorAgentId;
    private Integer parentAgentId;
    private Agent.TreePosition position;
    private Integer treeLevel;
    private Agent.AgentStatus status;
    private LocalDate activationDate;
    private Integer totalReferrals;
    private Integer totalAgentRecruits;
    private BigDecimal totalDirectEarnings;
    private BigDecimal totalBinaryEarnings;
    private Integer appointedByMemberId;
    private LocalDate appointedDate;
    private Boolean isActive;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public AgentDTO() {
    }

    public AgentDTO(Agent agent) {
        this.id = agent.getId();
        this.memberId = agent.getMemberId();
        this.aiEngineerId = agent.getAiEngineer() != null ? agent.getAiEngineer().getId() : null;
        this.sponsorAgentId = agent.getSponsorAgent() != null ? agent.getSponsorAgent().getId() : null;
        this.parentAgentId = agent.getParentAgent() != null ? agent.getParentAgent().getId() : null;
        this.position = agent.getPosition();
        this.treeLevel = agent.getTreeLevel();
        this.status = agent.getStatus();
        this.activationDate = agent.getActivationDate();
        this.totalReferrals = agent.getTotalReferrals();
        this.totalAgentRecruits = agent.getTotalAgentRecruits();
        this.totalDirectEarnings = agent.getTotalDirectEarnings();
        this.totalBinaryEarnings = agent.getTotalBinaryEarnings();
        this.appointedByMemberId = agent.getAppointedByMemberId();
        this.appointedDate = agent.getAppointedDate();
        this.isActive = agent.getIsActive();
        this.createdAt = agent.getCreatedAt();
        this.updatedAt = agent.getUpdatedAt();
    }

    // Getters and Setters
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

    public Integer getAiEngineerId() {
        return aiEngineerId;
    }

    public void setAiEngineerId(Integer aiEngineerId) {
        this.aiEngineerId = aiEngineerId;
    }

    public Integer getSponsorAgentId() {
        return sponsorAgentId;
    }

    public void setSponsorAgentId(Integer sponsorAgentId) {
        this.sponsorAgentId = sponsorAgentId;
    }

    public Integer getParentAgentId() {
        return parentAgentId;
    }

    public void setParentAgentId(Integer parentAgentId) {
        this.parentAgentId = parentAgentId;
    }

    public Agent.TreePosition getPosition() {
        return position;
    }

    public void setPosition(Agent.TreePosition position) {
        this.position = position;
    }

    public Integer getTreeLevel() {
        return treeLevel;
    }

    public void setTreeLevel(Integer treeLevel) {
        this.treeLevel = treeLevel;
    }

    public Agent.AgentStatus getStatus() {
        return status;
    }

    public void setStatus(Agent.AgentStatus status) {
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
