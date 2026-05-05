package lk.temcobank.eepip.repository;

import lk.temcobank.eepip.entity.Agent;
import lk.temcobank.eepip.entity.AgentCommission;
import lk.temcobank.eepip.entity.AiEngineer;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

/**
 * AgentCommission Repository - CRUD operations for AgentCommission entity.
 */
@Stateless
public class AgentCommissionRepository {

    @PersistenceContext(unitName = "eepipPU")
    private EntityManager em;

    public AgentCommission findById(Integer id) {
        return em.find(AgentCommission.class, id);
    }

    public List<AgentCommission> findAll() {
        return em.createQuery("SELECT ac FROM AgentCommission ac ORDER BY ac.commissionDate DESC", AgentCommission.class)
                .getResultList();
    }

    public List<AgentCommission> findByAgent(Agent agent) {
        return em.createQuery("SELECT ac FROM AgentCommission ac WHERE ac.agent = :agent ORDER BY ac.commissionDate DESC", AgentCommission.class)
                .setParameter("agent", agent)
                .getResultList();
    }

    public List<AgentCommission> findByAgentId(Integer agentId) {
        return em.createQuery("SELECT ac FROM AgentCommission ac WHERE ac.agent.id = :agentId ORDER BY ac.commissionDate DESC", AgentCommission.class)
                .setParameter("agentId", agentId)
                .getResultList();
    }

    public List<AgentCommission> findByAiEngineer(AiEngineer aiEngineer) {
        return em.createQuery("SELECT ac FROM AgentCommission ac WHERE ac.aiEngineer = :aiEngineer ORDER BY ac.commissionDate DESC", AgentCommission.class)
                .setParameter("aiEngineer", aiEngineer)
                .getResultList();
    }

    public List<AgentCommission> findByType(AgentCommission.AgentCommissionType type) {
        return em.createQuery("SELECT ac FROM AgentCommission ac WHERE ac.type = :type ORDER BY ac.commissionDate DESC", AgentCommission.class)
                .setParameter("type", type)
                .getResultList();
    }

    public List<AgentCommission> findByStatus(AgentCommission.CommissionStatus status) {
        return em.createQuery("SELECT ac FROM AgentCommission ac WHERE ac.status = :status ORDER BY ac.commissionDate DESC", AgentCommission.class)
                .setParameter("status", status)
                .getResultList();
    }

    public List<AgentCommission> findByCycleMonth(String cycleMonth) {
        return em.createQuery("SELECT ac FROM AgentCommission ac WHERE ac.cycleMonth = :cycleMonth ORDER BY ac.commissionDate DESC", AgentCommission.class)
                .setParameter("cycleMonth", cycleMonth)
                .getResultList();
    }

    public List<AgentCommission> findByAgentAndCycleMonth(Integer agentId, String cycleMonth) {
        return em.createQuery("SELECT ac FROM AgentCommission ac WHERE ac.agent.id = :agentId AND ac.cycleMonth = :cycleMonth ORDER BY ac.commissionDate DESC", AgentCommission.class)
                .setParameter("agentId", agentId)
                .setParameter("cycleMonth", cycleMonth)
                .getResultList();
    }

    public List<AgentCommission> findPendingCommissions() {
        return em.createQuery("SELECT ac FROM AgentCommission ac WHERE ac.status = :status ORDER BY ac.commissionDate ASC", AgentCommission.class)
                .setParameter("status", AgentCommission.CommissionStatus.PENDING)
                .getResultList();
    }

    public AgentCommission save(AgentCommission agentCommission) {
        if (agentCommission.getId() == null) {
            em.persist(agentCommission);
            return agentCommission;
        } else {
            return em.merge(agentCommission);
        }
    }

    public void delete(AgentCommission agentCommission) {
        em.remove(em.contains(agentCommission) ? agentCommission : em.merge(agentCommission));
    }

    public BigDecimal sumByAgentAndCycleMonth(Integer agentId, String cycleMonth) {
        try {
            return em.createQuery("SELECT SUM(ac.netAmount) FROM AgentCommission ac WHERE ac.agent.id = :agentId AND ac.cycleMonth = :cycleMonth", BigDecimal.class)
                    .setParameter("agentId", agentId)
                    .setParameter("cycleMonth", cycleMonth)
                    .getSingleResult();
        } catch (Exception e) {
            return BigDecimal.ZERO;
        }
    }

    public BigDecimal sumByAgent(Integer agentId) {
        try {
            return em.createQuery("SELECT SUM(ac.netAmount) FROM AgentCommission ac WHERE ac.agent.id = :agentId", BigDecimal.class)
                    .setParameter("agentId", agentId)
                    .getSingleResult();
        } catch (Exception e) {
            return BigDecimal.ZERO;
        }
    }

    public Long countByStatus(AgentCommission.CommissionStatus status) {
        return em.createQuery("SELECT COUNT(ac) FROM AgentCommission ac WHERE ac.status = :status", Long.class)
                .setParameter("status", status)
                .getSingleResult();
    }
}
