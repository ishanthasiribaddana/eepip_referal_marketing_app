package lk.temcobank.eepip.repository;

import lk.temcobank.eepip.entity.Product;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

/**
 * Product Repository - CRUD operations for Product entity.
 */
@Stateless
public class ProductRepository {

    @PersistenceContext(unitName = "eepipPU")
    private EntityManager em;

    public Product findById(Integer id) {
        return em.find(Product.class, id);
    }

    public Product findByProductCode(String productCode) {
        try {
            return em.createQuery("SELECT p FROM Product p WHERE p.productCode = :productCode", Product.class)
                    .setParameter("productCode", productCode)
                    .getSingleResult();
        } catch (Exception e) {
            return null;
        }
    }

    public List<Product> findAll() {
        return em.createQuery("SELECT p FROM Product p ORDER BY p.productCode", Product.class)
                .getResultList();
    }

    public List<Product> findActiveProducts() {
        return em.createQuery("SELECT p FROM Product p WHERE p.isActive = true AND p.status = :status ORDER BY p.productCode", Product.class)
                .setParameter("status", Product.ProductStatus.ACTIVE)
                .getResultList();
    }

    public List<Product> findActiveProductsForDate(java.time.LocalDate date) {
        return em.createQuery(
                "SELECT p FROM Product p WHERE p.isActive = true AND p.status = :status " +
                        "AND p.effectiveFrom <= :date AND (p.effectiveTo IS NULL OR p.effectiveTo >= :date) " +
                        "ORDER BY p.productCode", Product.class)
                .setParameter("status", Product.ProductStatus.ACTIVE)
                .setParameter("date", date)
                .getResultList();
    }

    public Product save(Product product) {
        if (product.getId() == null) {
            em.persist(product);
            return product;
        } else {
            return em.merge(product);
        }
    }

    public void delete(Product product) {
        em.remove(em.contains(product) ? product : em.merge(product));
    }

    public void softDelete(Product product) {
        product.setDeletedAt(java.time.LocalDateTime.now());
        product.setIsActive(false);
        em.merge(product);
    }
}
