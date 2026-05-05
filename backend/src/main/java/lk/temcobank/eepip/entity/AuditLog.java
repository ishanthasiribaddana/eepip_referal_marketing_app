package lk.temcobank.eepip.entity;

import javax.persistence.*;
import java.time.LocalDateTime;

/**
 * AuditLog entity - System-wide audit trail (V33).
 */
@Entity
@Table(name = "eepip_audit_log")
public class AuditLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(name = "entity_type", nullable = false, length = 30)
    private EntityType entityType;

    @Column(name = "entity_id")
    private Integer entityId;

    @Enumerated(EnumType.STRING)
    @Column(name = "action_type", nullable = false, length = 30)
    private ActionType actionType;

    @Column(name = "action_description", columnDefinition = "TEXT")
    private String actionDescription;

    @Column(name = "previous_value", columnDefinition = "TEXT")
    private String previousValue;

    @Column(name = "new_value", columnDefinition = "TEXT")
    private String newValue;

    @Column(name = "performed_by_member_id")
    private Integer performedByMemberId;

    @Enumerated(EnumType.STRING)
    @Column(name = "performed_by_role", length = 20)
    private PerformedByRole performedByRole;

    @Column(name = "ip_address", length = 45)
    private String ipAddress;

    @Column(name = "user_agent", columnDefinition = "TEXT")
    private String userAgent;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    // Enums
    public enum EntityType {
        AI_ENGINEER,
        AGENT,
        COMMISSION,
        PAYMENT,
        WITHDRAWAL,
        EPIN,
        RANK,
        PRODUCT,
        SYSTEM
    }

    public enum ActionType {
        CREATE,
        UPDATE,
        DELETE,
        LOGIN,
        LOGOUT,
        APPROVE,
        REJECT,
        PROMOTE,
        DEMOTE,
        STATUS_CHANGE,
        PAYMENT_RECEIVED,
        WITHDRAWAL_REQUESTED,
        EPIN_GENERATED,
        EPIN_USED,
        RANK_ACHIEVED
    }

    public enum PerformedByRole {
        ADMIN,
        AGENT,
        AI_ENGINEER,
        SYSTEM,
        API
    }

    public AuditLog() {
    }

    public AuditLog(EntityType entityType, ActionType actionType, Integer performedByMemberId) {
        this.entityType = entityType;
        this.actionType = actionType;
        this.performedByMemberId = performedByMemberId;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public EntityType getEntityType() {
        return entityType;
    }

    public void setEntityType(EntityType entityType) {
        this.entityType = entityType;
    }

    public Integer getEntityId() {
        return entityId;
    }

    public void setEntityId(Integer entityId) {
        this.entityId = entityId;
    }

    public ActionType getActionType() {
        return actionType;
    }

    public void setActionType(ActionType actionType) {
        this.actionType = actionType;
    }

    public String getActionDescription() {
        return actionDescription;
    }

    public void setActionDescription(String actionDescription) {
        this.actionDescription = actionDescription;
    }

    public String getPreviousValue() {
        return previousValue;
    }

    public void setPreviousValue(String previousValue) {
        this.previousValue = previousValue;
    }

    public String getNewValue() {
        return newValue;
    }

    public void setNewValue(String newValue) {
        this.newValue = newValue;
    }

    public Integer getPerformedByMemberId() {
        return performedByMemberId;
    }

    public void setPerformedByMemberId(Integer performedByMemberId) {
        this.performedByMemberId = performedByMemberId;
    }

    public PerformedByRole getPerformedByRole() {
        return performedByRole;
    }

    public void setPerformedByRole(PerformedByRole performedByRole) {
        this.performedByRole = performedByRole;
    }

    public String getIpAddress() {
        return ipAddress;
    }

    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }

    public String getUserAgent() {
        return userAgent;
    }

    public void setUserAgent(String userAgent) {
        this.userAgent = userAgent;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    @PrePersist
    public void prePersist() {
        if (this.createdAt == null) {
            this.createdAt = LocalDateTime.now();
        }
    }
}
