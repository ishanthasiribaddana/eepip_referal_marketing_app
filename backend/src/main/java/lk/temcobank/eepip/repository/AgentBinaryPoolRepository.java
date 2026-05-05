package lk.temcobank.eepip.repository;

import lk.temcobank.eepip.entity.AgentBinaryPool;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

/**
 * AgentBinaryPool Repository - CRUD operations for AgentBinaryPool entity.
 */
@Stateless
public class AgentBinaryPoolRepository {

    @PersistenceContext(unitName = "eepipPU")
    private EntityManager em;

    public AgentBinaryPool findById(Integer id) {
        return em.find(AgentBinaryPool.class, id);
    }

    public AgentBinaryPool findByCycleMonth(String cycleMonth) {
        try {
            return em.createQuery("SELECT abp FROM AgentBinaryPool abp WHERE abp.cycleMonth = :cycleMonth", AgentBinaryPool.class)
                    .setParameter("cycleMonth", cycleMonth)
                    .getSingleResult();
        } catch (Exception e) {
            return null;
        }
    }

    public List<AgentBinaryPool> findAll() {
        return em.createQuery("SELECT abp FROM AgentBinaryPool abp ORDER BY abp.cycleMonth DESC", AgentBinaryPool.class)
                .getResultList();
    }

    public AgentBinaryPool save(AgentBinaryPool agentBinaryPool) {
        if (agentBinaryPool.getId() == null) {
            em.persist(agentBinaryPool);
            return agentBinaryPool;
        } else {
            return em.merge(agentBinaryPool);
        }
    }

    public void delete(AgentBinaryPool agentBinaryPool) {
        em.remove(em.contains(agentBinaryPool) ? agentBinaryPool : em.merge(agentBinaryPool));
    }
}
