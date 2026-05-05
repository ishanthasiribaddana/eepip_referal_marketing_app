package lk.temcobank.eepip.repository;

import lk.temcobank.eepip.entity.AiEngineer;
import lk.temcobank.eepip.entity.Commission;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

/**
 * Commission Repository - CRUD operations for Commission entity.
 */
@Stateless
public class CommissionRepository {

    @PersistenceContext(unitName = "eepipPU")
    private EntityManager em;

    public Commission findById(Integer id) {
        return em.find(Commission.class, id);
    }

    public List<Commission> findAll() {
        return em.createQuery("SELECT c FROM Commission c ORDER BY c.commissionDate DESC", Commission.class)
                .getResultList();
    }

    public List<Commission> findByAiEngineer(AiEngineer aiEngineer) {
        return em.createQuery("SELECT c FROM Commission c WHERE c.aiEngineer = :aiEngineer ORDER BY c.commissionDate DESC", Commission.class)
                .setParameter("aiEngineer", aiEngineer)
                .getResultList();
    }

    public List<Commission> findByAiEngineerId(Integer aiEngineerId) {
        return em.createQuery("SELECT c FROM Commission c WHERE c.aiEngineer.id = :aiEngineerId ORDER BY c.commissionDate DESC", Commission.class)
                .setParameter("aiEngineerId", aiEngineerId)
                .getResultList();
    }

    public List<Commission> findByType(Commission.CommissionType type) {
        return em.createQuery("SELECT c FROM Commission c WHERE c.type = :type ORDER BY c.commissionDate DESC", Commission.class)
                .setParameter("type", type)
                .getResultList();
    }

    public List<Commission> findByStatus(Commission.CommissionStatus status) {
        return em.createQuery("SELECT c FROM Commission c WHERE c.status = :status ORDER BY c.commissionDate DESC", Commission.class)
                .setParameter("status", status)
                .getResultList();
    }

    public List<Commission> findByCommissionDate(LocalDate commissionDate) {
        return em.createQuery("SELECT c FROM Commission c WHERE c.commissionDate = :commissionDate", Commission.class)
                .setParameter("commissionDate", commissionDate)
                .getResultList();
    }

    public List<Commission> findByCycleMonth(String cycleMonth) {
        return em.createQuery("SELECT c FROM Commission c WHERE c.cycleMonth = :cycleMonth ORDER BY c.commissionDate DESC", Commission.class)
                .setParameter("cycleMonth", cycleMonth)
                .getResultList();
    }

    public List<Commission> findByAiEngineerAndCycleMonth(Integer aiEngineerId, String cycleMonth) {
        return em.createQuery("SELECT c FROM Commission c WHERE c.aiEngineer.id = :aiEngineerId AND c.cycleMonth = :cycleMonth ORDER BY c.commissionDate DESC", Commission.class)
                .setParameter("aiEngineerId", aiEngineerId)
                .setParameter("cycleMonth", cycleMonth)
                .getResultList();
    }

    public List<Commission> findByAiEngineerAndStatus(Integer aiEngineerId, Commission.CommissionStatus status) {
        return em.createQuery("SELECT c FROM Commission c WHERE c.aiEngineer.id = :aiEngineerId AND c.status = :status ORDER BY c.commissionDate DESC", Commission.class)
                .setParameter("aiEngineerId", aiEngineerId)
                .setParameter("status", status)
                .getResultList();
    }

    public List<Commission> findPendingCommissions() {
        return em.createQuery("SELECT c FROM Commission c WHERE c.status = :status ORDER BY c.commissionDate ASC", Commission.class)
                .setParameter("status", Commission.CommissionStatus.PENDING)
                .getResultList();
    }

    public Commission save(Commission commission) {
        if (commission.getId() == null) {
            em.persist(commission);
            return commission;
        } else {
            return em.merge(commission);
        }
    }

    public void delete(Commission commission) {
        em.remove(em.contains(commission) ? commission : em.merge(commission));
    }

    public BigDecimal sumByAiEngineerAndCycleMonth(Integer aiEngineerId, String cycleMonth) {
        try {
            return em.createQuery("SELECT SUM(c.netAmount) FROM Commission c WHERE c.aiEngineer.id = :aiEngineerId AND c.cycleMonth = :cycleMonth", BigDecimal.class)
                    .setParameter("aiEngineerId", aiEngineerId)
                    .setParameter("cycleMonth", cycleMonth)
                    .getSingleResult();
        } catch (Exception e) {
            return BigDecimal.ZERO;
        }
    }

    public BigDecimal sumByAiEngineer(Integer aiEngineerId) {
        try {
            return em.createQuery("SELECT SUM(c.netAmount) FROM Commission c WHERE c.aiEngineer.id = :aiEngineerId", BigDecimal.class)
                    .setParameter("aiEngineerId", aiEngineerId)
                    .getSingleResult();
        } catch (Exception e) {
            return BigDecimal.ZERO;
        }
    }

    public Long countByStatus(Commission.CommissionStatus status) {
        return em.createQuery("SELECT COUNT(c) FROM Commission c WHERE c.status = :status", Long.class)
                .setParameter("status", status)
                .getSingleResult();
    }
}
