package lk.temcobank.eepip.repository;

import lk.temcobank.eepip.entity.BinaryPool;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

/**
 * BinaryPool Repository - CRUD operations for BinaryPool entity.
 */
@Stateless
public class BinaryPoolRepository {

    @PersistenceContext(unitName = "eepipPU")
    private EntityManager em;

    public BinaryPool findById(Integer id) {
        return em.find(BinaryPool.class, id);
    }

    public BinaryPool findByCycleMonth(String cycleMonth) {
        try {
            return em.createQuery("SELECT bp FROM BinaryPool bp WHERE bp.cycleMonth = :cycleMonth", BinaryPool.class)
                    .setParameter("cycleMonth", cycleMonth)
                    .getSingleResult();
        } catch (Exception e) {
            return null;
        }
    }

    public List<BinaryPool> findAll() {
        return em.createQuery("SELECT bp FROM BinaryPool bp ORDER BY bp.cycleMonth DESC", BinaryPool.class)
                .getResultList();
    }

    public BinaryPool save(BinaryPool binaryPool) {
        if (binaryPool.getId() == null) {
            em.persist(binaryPool);
            return binaryPool;
        } else {
            return em.merge(binaryPool);
        }
    }

    public void delete(BinaryPool binaryPool) {
        em.remove(em.contains(binaryPool) ? binaryPool : em.merge(binaryPool));
    }
}
