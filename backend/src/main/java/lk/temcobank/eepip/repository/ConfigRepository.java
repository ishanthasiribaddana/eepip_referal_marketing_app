package lk.temcobank.eepip.repository;

import lk.temcobank.eepip.entity.Config;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.time.LocalDate;
import java.util.List;

/**
 * Config Repository - CRUD operations for Config entity.
 */
@Stateless
public class ConfigRepository {

    @PersistenceContext(unitName = "eepipPU")
    private EntityManager em;

    public Config findById(Integer id) {
        return em.find(Config.class, id);
    }

    public Config findByConfigKey(String configKey) {
        try {
            return em.createQuery("SELECT c FROM Config c WHERE c.configKey = :configKey AND c.isActive = true", Config.class)
                    .setParameter("configKey", configKey)
                    .getSingleResult();
        } catch (Exception e) {
            return null;
        }
    }

    public List<Config> findAll() {
        return em.createQuery("SELECT c FROM Config c ORDER BY c.configKey", Config.class)
                .getResultList();
    }

    public List<Config> findByCategory(String category) {
        return em.createQuery("SELECT c FROM Config c WHERE c.category = :category ORDER BY c.configKey", Config.class)
                .setParameter("category", category)
                .getResultList();
    }

    public List<Config> findByConfigType(Config.ConfigType configType) {
        return em.createQuery("SELECT c FROM Config c WHERE c.configType = :configType ORDER BY c.configKey", Config.class)
                .setParameter("configType", configType)
                .getResultList();
    }

    public List<Config> findActiveConfigs() {
        return em.createQuery("SELECT c FROM Config c WHERE c.isActive = true ORDER BY c.configKey", Config.class)
                .getResultList();
    }

    public List<Config> findActiveConfigsForDate(LocalDate date) {
        return em.createQuery(
                "SELECT c FROM Config c WHERE c.isActive = true " +
                        "AND c.effectiveFrom <= :date AND (c.effectiveTo IS NULL OR c.effectiveTo >= :date) " +
                        "ORDER BY c.configKey", Config.class)
                .setParameter("date", date)
                .getResultList();
    }

    public Config save(Config config) {
        if (config.getId() == null) {
            em.persist(config);
            return config;
        } else {
            return em.merge(config);
        }
    }

    public void delete(Config config) {
        em.remove(em.contains(config) ? config : em.merge(config));
    }
}
