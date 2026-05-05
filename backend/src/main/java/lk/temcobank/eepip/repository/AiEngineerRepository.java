package lk.temcobank.eepip.repository;

import lk.temcobank.eepip.entity.AiEngineer;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

/**
 * AI Engineer Repository - CRUD operations for AiEngineer entity.
 */
@Stateless
public class AiEngineerRepository {

    @PersistenceContext(unitName = "eepipPU")
    private EntityManager em;

    public AiEngineer findById(Integer id) {
        return em.find(AiEngineer.class, id);
    }

    public AiEngineer findByMemberId(Integer memberId) {
        try {
            return em.createQuery("SELECT a FROM AiEngineer a WHERE a.memberId = :memberId", AiEngineer.class)
                    .setParameter("memberId", memberId)
                    .getSingleResult();
        } catch (Exception e) {
            return null;
        }
    }

    public List<AiEngineer> findAll() {
        return em.createQuery("SELECT a FROM AiEngineer a ORDER BY a.memberId", AiEngineer.class)
                .getResultList();
    }

    public List<AiEngineer> findBySponsorId(Integer sponsorId) {
        return em.createQuery("SELECT a FROM AiEngineer a WHERE a.sponsorId = :sponsorId ORDER BY a.memberId", AiEngineer.class)
                .setParameter("sponsorId", sponsorId)
                .getResultList();
    }

    public List<AiEngineer> findByParentId(Integer parentId) {
        return em.createQuery("SELECT a FROM AiEngineer a WHERE a.parentId = :parentId ORDER BY a.position, a.memberId", AiEngineer.class)
                .setParameter("parentId", parentId)
                .getResultList();
    }

    public List<AiEngineer> findByParentIdAndPosition(Integer parentId, AiEngineer.TreePosition position) {
        return em.createQuery("SELECT a FROM AiEngineer a WHERE a.parentId = :parentId AND a.position = :position", AiEngineer.class)
                .setParameter("parentId", parentId)
                .setParameter("position", position)
                .getResultList();
    }

    public List<AiEngineer> findByMemberState(AiEngineer.MemberState memberState) {
        return em.createQuery("SELECT a FROM AiEngineer a WHERE a.memberState = :memberState ORDER BY a.memberId", AiEngineer.class)
                .setParameter("memberState", memberState)
                .getResultList();
    }

    public List<AiEngineer> findByRank(AiEngineer.Rank rankCode) {
        return em.createQuery("SELECT a FROM AiEngineer a WHERE a.rankCode = :rankCode ORDER BY a.memberId", AiEngineer.class)
                .setParameter("rankCode", rankCode)
                .getResultList();
    }

    public List<AiEngineer> findActiveAiEngineers() {
        return em.createQuery("SELECT a FROM AiEngineer a WHERE a.isActive = true ORDER BY a.memberId", AiEngineer.class)
                .getResultList();
    }

    public AiEngineer save(AiEngineer aiEngineer) {
        if (aiEngineer.getId() == null) {
            em.persist(aiEngineer);
            return aiEngineer;
        } else {
            return em.merge(aiEngineer);
        }
    }

    public void delete(AiEngineer aiEngineer) {
        em.remove(em.contains(aiEngineer) ? aiEngineer : em.merge(aiEngineer));
    }

    public void softDelete(AiEngineer aiEngineer) {
        aiEngineer.setDeletedAt(java.time.LocalDateTime.now());
        aiEngineer.setIsActive(false);
        em.merge(aiEngineer);
    }

    public Long countBySponsorId(Integer sponsorId) {
        return em.createQuery("SELECT COUNT(a) FROM AiEngineer a WHERE a.sponsorId = :sponsorId", Long.class)
                .setParameter("sponsorId", sponsorId)
                .getSingleResult();
    }

    public Long countByParentIdAndPosition(Integer parentId, AiEngineer.TreePosition position) {
        return em.createQuery("SELECT COUNT(a) FROM AiEngineer a WHERE a.parentId = :parentId AND a.position = :position", Long.class)
                .setParameter("parentId", parentId)
                .setParameter("position", position)
                .getSingleResult();
    }
}
