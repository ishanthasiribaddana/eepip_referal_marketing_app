package lk.temcobank.eepip.repository;

import lk.temcobank.eepip.entity.AuditLog;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.time.LocalDateTime;
import java.util.List;

/**
 * AuditLog Repository - CRUD operations for AuditLog entity.
 */
@Stateless
public class AuditLogRepository {

    @PersistenceContext(unitName = "eepipPU")
    private EntityManager em;

    public AuditLog findById(Integer id) {
        return em.find(AuditLog.class, id);
    }

    public List<AuditLog> findAll() {
        return em.createQuery("SELECT al FROM AuditLog al ORDER BY al.createdAt DESC", AuditLog.class)
                .getResultList();
    }

    public List<AuditLog> findByEntityType(AuditLog.EntityType entityType) {
        return em.createQuery("SELECT al FROM AuditLog al WHERE al.entityType = :entityType ORDER BY al.createdAt DESC", AuditLog.class)
                .setParameter("entityType", entityType)
                .getResultList();
    }

    public List<AuditLog> findByEntityId(Integer entityId) {
        return em.createQuery("SELECT al FROM AuditLog al WHERE al.entityId = :entityId ORDER BY al.createdAt DESC", AuditLog.class)
                .setParameter("entityId", entityId)
                .getResultList();
    }

    public List<AuditLog> findByEntityTypeAndId(AuditLog.EntityType entityType, Integer entityId) {
        return em.createQuery("SELECT al FROM AuditLog al WHERE al.entityType = :entityType AND al.entityId = :entityId ORDER BY al.createdAt DESC", AuditLog.class)
                .setParameter("entityType", entityType)
                .setParameter("entityId", entityId)
                .getResultList();
    }

    public List<AuditLog> findByActionType(AuditLog.ActionType actionType) {
        return em.createQuery("SELECT al FROM AuditLog al WHERE al.actionType = :actionType ORDER BY al.createdAt DESC", AuditLog.class)
                .setParameter("actionType", actionType)
                .getResultList();
    }

    public List<AuditLog> findByPerformedBy(Integer performedByMemberId) {
        return em.createQuery("SELECT al FROM AuditLog al WHERE al.performedByMemberId = :performedByMemberId ORDER BY al.createdAt DESC", AuditLog.class)
                .setParameter("performedByMemberId", performedByMemberId)
                .getResultList();
    }

    public List<AuditLog> findByDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        return em.createQuery("SELECT al FROM AuditLog al WHERE al.createdAt BETWEEN :startDate AND :endDate ORDER BY al.createdAt DESC", AuditLog.class)
                .setParameter("startDate", startDate)
                .setParameter("endDate", endDate)
                .getResultList();
    }

    public List<AuditLog> findRecentLogs(int limit) {
        return em.createQuery("SELECT al FROM AuditLog al ORDER BY al.createdAt DESC", AuditLog.class)
                .setMaxResults(limit)
                .getResultList();
    }

    public AuditLog save(AuditLog auditLog) {
        if (auditLog.getId() == null) {
            em.persist(auditLog);
            return auditLog;
        } else {
            return em.merge(auditLog);
        }
    }

    public void delete(AuditLog auditLog) {
        em.remove(em.contains(auditLog) ? auditLog : em.merge(auditLog));
    }

    public Long countByActionType(AuditLog.ActionType actionType) {
        return em.createQuery("SELECT COUNT(al) FROM AuditLog al WHERE al.actionType = :actionType", Long.class)
                .setParameter("actionType", actionType)
                .getSingleResult();
    }
}
