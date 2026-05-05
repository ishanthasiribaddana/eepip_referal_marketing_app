package lk.temcobank.eepip.repository;

import lk.temcobank.eepip.entity.AiEngineer;
import lk.temcobank.eepip.entity.Epin;
import lk.temcobank.eepip.entity.Product;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

/**
 * Epin Repository - CRUD operations for Epin entity.
 */
@Stateless
public class EpinRepository {

    @PersistenceContext(unitName = "eepipPU")
    private EntityManager em;

    public Epin findById(Integer id) {
        return em.find(Epin.class, id);
    }

    public Epin findByEpinNo(String epinNo) {
        try {
            return em.createQuery("SELECT e FROM Epin e WHERE e.epinNo = :epinNo", Epin.class)
                    .setParameter("epinNo", epinNo)
                    .getSingleResult();
        } catch (Exception e) {
            return null;
        }
    }

    public List<Epin> findAll() {
        return em.createQuery("SELECT e FROM Epin e ORDER BY e.dateGenerated DESC", Epin.class)
                .getResultList();
    }

    public List<Epin> findByProduct(Product product) {
        return em.createQuery("SELECT e FROM Epin e WHERE e.product = :product ORDER BY e.dateGenerated DESC", Epin.class)
                .setParameter("product", product)
                .getResultList();
    }

    public List<Epin> findByStatus(Epin.EpinStatus status) {
        return em.createQuery("SELECT e FROM Epin e WHERE e.status = :status ORDER BY e.dateGenerated DESC", Epin.class)
                .setParameter("status", status)
                .getResultList();
    }

    public List<Epin> findByIssuedBy(Integer issuedByMemberId) {
        return em.createQuery("SELECT e FROM Epin e WHERE e.issuedByMemberId = :issuedByMemberId ORDER BY e.dateGenerated DESC", Epin.class)
                .setParameter("issuedByMemberId", issuedByMemberId)
                .getResultList();
    }

    public List<Epin> findByUser(AiEngineer user) {
        return em.createQuery("SELECT e FROM Epin e WHERE e.user = :user ORDER BY e.dateGenerated DESC", Epin.class)
                .setParameter("user", user)
                .getResultList();
    }

    public List<Epin> findAvailableEpins() {
        return em.createQuery("SELECT e FROM Epin e WHERE e.status = :status AND e.isActive = true ORDER BY e.dateGenerated DESC", Epin.class)
                .setParameter("status", Epin.EpinStatus.GENERATED)
                .getResultList();
    }

    public List<Epin> findExpiredEpins() {
        return em.createQuery("SELECT e FROM Epin e WHERE e.status = :status OR (e.dateExpires IS NOT NULL AND e.dateExpires < :now)", Epin.class)
                .setParameter("status", Epin.EpinStatus.EXPIRED)
                .setParameter("now", java.time.LocalDateTime.now())
                .getResultList();
    }

    public Epin save(Epin epin) {
        if (epin.getId() == null) {
            em.persist(epin);
            return epin;
        } else {
            return em.merge(epin);
        }
    }

    public void delete(Epin epin) {
        em.remove(em.contains(epin) ? epin : em.merge(epin));
    }

    public Long countByStatus(Epin.EpinStatus status) {
        return em.createQuery("SELECT COUNT(e) FROM Epin e WHERE e.status = :status", Long.class)
                .setParameter("status", status)
                .getSingleResult();
    }
}
