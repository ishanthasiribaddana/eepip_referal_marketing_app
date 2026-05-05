package lk.temcobank.eepip.repository;

import lk.temcobank.eepip.entity.AcademicEvent;
import lk.temcobank.eepip.entity.AiEngineer;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.time.LocalDate;
import java.util.List;

/**
 * AcademicEvent Repository - CRUD operations for AcademicEvent entity.
 */
@Stateless
public class AcademicEventRepository {

    @PersistenceContext(unitName = "eepipPU")
    private EntityManager em;

    public AcademicEvent findById(Integer id) {
        return em.find(AcademicEvent.class, id);
    }

    public List<AcademicEvent> findAll() {
        return em.createQuery("SELECT ae FROM AcademicEvent ae ORDER BY ae.eventDate DESC", AcademicEvent.class)
                .getResultList();
    }

    public List<AcademicEvent> findByAiEngineer(AiEngineer aiEngineer) {
        return em.createQuery("SELECT ae FROM AcademicEvent ae WHERE ae.aiEngineer = :aiEngineer ORDER BY ae.eventDate DESC", AcademicEvent.class)
                .setParameter("aiEngineer", aiEngineer)
                .getResultList();
    }

    public List<AcademicEvent> findByAiEngineerId(Integer aiEngineerId) {
        return em.createQuery("SELECT ae FROM AcademicEvent ae WHERE ae.aiEngineer.id = :aiEngineerId ORDER BY ae.eventDate DESC", AcademicEvent.class)
                .setParameter("aiEngineerId", aiEngineerId)
                .getResultList();
    }

    public List<AcademicEvent> findByEventType(AcademicEvent.AcademicEventType eventType) {
        return em.createQuery("SELECT ae FROM AcademicEvent ae WHERE ae.eventType = :eventType ORDER BY ae.eventDate DESC", AcademicEvent.class)
                .setParameter("eventType", eventType)
                .getResultList();
    }

    public List<AcademicEvent> findByEventDate(LocalDate eventDate) {
        return em.createQuery("SELECT ae FROM AcademicEvent ae WHERE ae.eventDate = :eventDate", AcademicEvent.class)
                .setParameter("eventDate", eventDate)
                .getResultList();
    }

    public List<AcademicEvent> findByAcademicYear(Integer academicYear) {
        return em.createQuery("SELECT ae FROM AcademicEvent ae WHERE ae.academicYear = :academicYear ORDER BY ae.eventDate DESC", AcademicEvent.class)
                .setParameter("academicYear", academicYear)
                .getResultList();
    }

    public List<AcademicEvent> findByAiEngineerAndAcademicYear(Integer aiEngineerId, Integer academicYear) {
        return em.createQuery("SELECT ae FROM AcademicEvent ae WHERE ae.aiEngineer.id = :aiEngineerId AND ae.academicYear = :academicYear ORDER BY ae.eventDate DESC", AcademicEvent.class)
                .setParameter("aiEngineerId", aiEngineerId)
                .setParameter("academicYear", academicYear)
                .getResultList();
    }

    public List<AcademicEvent> findUnverifiedEvents() {
        return em.createQuery("SELECT ae FROM AcademicEvent ae WHERE ae.verifiedAt IS NULL ORDER BY ae.eventDate ASC", AcademicEvent.class)
                .getResultList();
    }

    public AcademicEvent save(AcademicEvent academicEvent) {
        if (academicEvent.getId() == null) {
            em.persist(academicEvent);
            return academicEvent;
        } else {
            return em.merge(academicEvent);
        }
    }

    public void delete(AcademicEvent academicEvent) {
        em.remove(em.contains(academicEvent) ? academicEvent : em.merge(academicEvent));
    }

    public Long countByAiEngineer(Integer aiEngineerId) {
        return em.createQuery("SELECT COUNT(ae) FROM AcademicEvent ae WHERE ae.aiEngineer.id = :aiEngineerId", Long.class)
                .setParameter("aiEngineerId", aiEngineerId)
                .getSingleResult();
    }
}
