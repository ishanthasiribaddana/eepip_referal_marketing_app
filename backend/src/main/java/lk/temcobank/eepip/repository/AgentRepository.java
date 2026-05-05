package lk.temcobank.eepip.repository;

import lk.temcobank.eepip.entity.Agent;
import lk.temcobank.eepip.entity.AiEngineer;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

/**
 * Agent Repository - CRUD operations for Agent entity.
 */
@Stateless
public class AgentRepository {

    @PersistenceContext(unitName = "eepipPU")
    private EntityManager em;

    public Agent findById(Integer id) {
        return em.find(Agent.class, id);
    }

    public Agent findByMemberId(Integer memberId) {
        try {
            return em.createQuery("SELECT a FROM Agent a WHERE a.memberId = :memberId", Agent.class)
                    .setParameter("memberId", memberId)
                    .getSingleResult();
        } catch (Exception e) {
            return null;
        }
    }

    public List<Agent> findAll() {
        return em.createQuery("SELECT a FROM Agent a ORDER BY a.memberId", Agent.class)
                .getResultList();
    }

    public List<Agent> findBySponsorAgentId(Integer sponsorAgentId) {
        return em.createQuery("SELECT a FROM Agent a WHERE a.sponsorAgent.id = :sponsorAgentId ORDER BY a.memberId", Agent.class)
                .setParameter("sponsorAgentId", sponsorAgentId)
                .getResultList();
    }

    public List<Agent> findByParentAgentId(Integer parentAgentId) {
        return em.createQuery("SELECT a FROM Agent a WHERE a.parentAgent.id = :parentAgentId ORDER BY a.position, a.memberId", Agent.class)
                .setParameter("parentAgentId", parentAgentId)
                .getResultList();
    }

    public List<Agent> findByParentAgentIdAndPosition(Integer parentAgentId, Agent.TreePosition position) {
        return em.createQuery("SELECT a FROM Agent a WHERE a.parentAgent.id = :parentAgentId AND a.position = :position", Agent.class)
                .setParameter("parentAgentId", parentAgentId)
                .setParameter("position", position)
                .getResultList();
    }

    public List<Agent> findByStatus(Agent.AgentStatus status) {
        return em.createQuery("SELECT a FROM Agent a WHERE a.status = :status ORDER BY a.memberId", Agent.class)
                .setParameter("status", status)
                .getResultList();
    }

    public List<Agent> findByAiEngineer(AiEngineer aiEngineer) {
        return em.createQuery("SELECT a FROM Agent a WHERE a.aiEngineer = :aiEngineer", Agent.class)
                .setParameter("aiEngineer", aiEngineer)
                .getResultList();
    }

    public List<Agent> findActiveAgents() {
        return em.createQuery("SELECT a FROM Agent a WHERE a.isActive = true ORDER BY a.memberId", Agent.class)
                .getResultList();
    }

    public Agent save(Agent agent) {
        if (agent.getId() == null) {
            em.persist(agent);
            return agent;
        } else {
            return em.merge(agent);
        }
    }

    public void delete(Agent agent) {
        em.remove(em.contains(agent) ? agent : em.merge(agent));
    }

    public void softDelete(Agent agent) {
        agent.setDeletedAt(java.time.LocalDateTime.now());
        agent.setIsActive(false);
        em.merge(agent);
    }

    public Long countBySponsorAgentId(Integer sponsorAgentId) {
        return em.createQuery("SELECT COUNT(a) FROM Agent a WHERE a.sponsorAgent.id = :sponsorAgentId", Long.class)
                .setParameter("sponsorAgentId", sponsorAgentId)
                .getSingleResult();
    }

    public Long countByParentAgentIdAndPosition(Integer parentAgentId, Agent.TreePosition position) {
        return em.createQuery("SELECT COUNT(a) FROM Agent a WHERE a.parentAgent.id = :parentAgentId AND a.position = :position", Long.class)
                .setParameter("parentAgentId", parentAgentId)
                .setParameter("position", position)
                .getSingleResult();
    }

    public Long countByStatus(Agent.AgentStatus status) {
        return em.createQuery("SELECT COUNT(a) FROM Agent a WHERE a.status = :status", Long.class)
                .setParameter("status", status)
                .getSingleResult();
    }
}
