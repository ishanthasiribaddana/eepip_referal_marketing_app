package lk.temcobank.eepip.service;

import lk.temcobank.eepip.entity.AuditLog;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import java.time.LocalDateTime;
import java.util.List;

/**
 * AuditLog Service - Business logic for AuditLog entity.
 */
@Stateless
public class AuditLogService {

    @EJB
    private lk.temcobank.eepip.repository.AuditLogRepository auditLogRepository;

    public AuditLog findById(Integer id) {
        return auditLogRepository.findById(id);
    }

    public List<AuditLog> findAll() {
        return auditLogRepository.findAll();
    }

    public List<AuditLog> findByEntityType(AuditLog.EntityType entityType) {
        return auditLogRepository.findByEntityType(entityType);
    }

    public List<AuditLog> findByEntityId(Integer entityId) {
        return auditLogRepository.findByEntityId(entityId);
    }

    public List<AuditLog> findByEntityTypeAndId(AuditLog.EntityType entityType, Integer entityId) {
        return auditLogRepository.findByEntityTypeAndId(entityType, entityId);
    }

    public List<AuditLog> findByActionType(AuditLog.ActionType actionType) {
        return auditLogRepository.findByActionType(actionType);
    }

    public List<AuditLog> findByPerformedBy(Integer performedByMemberId) {
        return auditLogRepository.findByPerformedBy(performedByMemberId);
    }

    public List<AuditLog> findByDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        return auditLogRepository.findByDateRange(startDate, endDate);
    }

    public List<AuditLog> findRecentLogs(int limit) {
        return auditLogRepository.findRecentLogs(limit);
    }

    public AuditLog createAuditLog(AuditLog.EntityType entityType, Integer entityId, AuditLog.ActionType actionType,
                                    Integer performedByMemberId, AuditLog.PerformedByRole performedByRole,
                                    String details, String ipAddress) {
        AuditLog auditLog = new AuditLog(entityType, actionType, performedByMemberId);
        auditLog.setEntityId(entityId);
        auditLog.setPerformedByRole(performedByRole);
        auditLog.setActionDescription(details);
        auditLog.setIpAddress(ipAddress);
        auditLog.setCreatedAt(LocalDateTime.now());

        return auditLogRepository.save(auditLog);
    }

    public AuditLog logEntityCreate(AuditLog.EntityType entityType, Integer entityId, Integer performedByMemberId,
                                    AuditLog.PerformedByRole performedByRole, String ipAddress) {
        return createAuditLog(entityType, entityId, AuditLog.ActionType.CREATE,
                performedByMemberId, performedByRole, "Entity created", ipAddress);
    }

    public AuditLog logEntityUpdate(AuditLog.EntityType entityType, Integer entityId, Integer performedByMemberId,
                                    AuditLog.PerformedByRole performedByRole, String details, String ipAddress) {
        return createAuditLog(entityType, entityId, AuditLog.ActionType.UPDATE,
                performedByMemberId, performedByRole, details, ipAddress);
    }

    public AuditLog logEntityDelete(AuditLog.EntityType entityType, Integer entityId, Integer performedByMemberId,
                                    AuditLog.PerformedByRole performedByRole, String ipAddress) {
        return createAuditLog(entityType, entityId, AuditLog.ActionType.DELETE,
                performedByMemberId, performedByRole, "Entity deleted", ipAddress);
    }

    public AuditLog logCustomAction(AuditLog.EntityType entityType, Integer entityId, AuditLog.ActionType actionType,
                                     Integer performedByMemberId, AuditLog.PerformedByRole performedByRole,
                                     String details, String ipAddress) {
        return createAuditLog(entityType, entityId, actionType,
                performedByMemberId, performedByRole, details, ipAddress);
    }

    public Long countByActionType(AuditLog.ActionType actionType) {
        return auditLogRepository.countByActionType(actionType);
    }
}
