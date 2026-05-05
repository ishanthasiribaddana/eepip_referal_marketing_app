package lk.temcobank.eepip.repository;

import lk.temcobank.eepip.entity.AiEngineer;
import lk.temcobank.eepip.entity.RankHistory;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

/**
 * RankHistory Repository - CRUD operations for RankHistory entity.
 */
@Stateless
public class RankHistoryRepository {

    @PersistenceContext(unitName = "eepipPU")
    private EntityManager em;

    public RankHistory findById(Integer id) {
        return em.find(RankHistory.class, id);
    }

    public List<RankHistory> findAll() {
        return em.createQuery("SELECT rh FROM RankHistory rh ORDER BY rh.achievedAt DESC", RankHistory.class)
                .getResultList();
    }

    public List<RankHistory> findByAiEngineer(AiEngineer aiEngineer) {
        return em.createQuery("SELECT rh FROM RankHistory rh WHERE rh.aiEngineer = :aiEngineer ORDER BY rh.achievedAt DESC", RankHistory.class)
                .setParameter("aiEngineer", aiEngineer)
                .getResultList();
    }

    public List<RankHistory> findByAiEngineerId(Integer aiEngineerId) {
        return em.createQuery("SELECT rh FROM RankHistory rh WHERE rh.aiEngineer.id = :aiEngineerId ORDER BY rh.achievedAt DESC", RankHistory.class)
                .setParameter("aiEngineerId", aiEngineerId)
                .getResultList();
    }

    public List<RankHistory> findByRank(AiEngineer.Rank rank) {
        return em.createQuery("SELECT rh FROM RankHistory rh WHERE rh.newRank = :rank ORDER BY rh.achievedAt DESC", RankHistory.class)
                .setParameter("rank", rank)
                .getResultList();
    }

    public RankHistory save(RankHistory rankHistory) {
        if (rankHistory.getId() == null) {
            em.persist(rankHistory);
            return rankHistory;
        } else {
            return em.merge(rankHistory);
        }
    }

    public void delete(RankHistory rankHistory) {
        em.remove(em.contains(rankHistory) ? rankHistory : em.merge(rankHistory));
    }

    public Long countByAiEngineer(Integer aiEngineerId) {
        return em.createQuery("SELECT COUNT(rh) FROM RankHistory rh WHERE rh.aiEngineer.id = :aiEngineerId", Long.class)
                .setParameter("aiEngineerId", aiEngineerId)
                .getSingleResult();
    }
}
