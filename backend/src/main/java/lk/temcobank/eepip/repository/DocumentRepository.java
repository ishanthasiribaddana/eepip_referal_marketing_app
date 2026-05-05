package lk.temcobank.eepip.repository;

import lk.temcobank.eepip.entity.Document;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.time.LocalDate;
import java.util.List;

/**
 * Document Repository - CRUD operations for Document entity.
 */
@Stateless
public class DocumentRepository {

    @PersistenceContext(unitName = "eepipPU")
    private EntityManager em;

    public Document findById(Integer id) {
        return em.find(Document.class, id);
    }

    public List<Document> findAll() {
        return em.createQuery("SELECT d FROM Document d ORDER BY d.createdAt DESC", Document.class)
                .getResultList();
    }

    public List<Document> findByMemberId(Integer memberId) {
        return em.createQuery("SELECT d FROM Document d WHERE d.memberId = :memberId ORDER BY d.createdAt DESC", Document.class)
                .setParameter("memberId", memberId)
                .getResultList();
    }

    public List<Document> findByDocumentType(Document.DocumentType documentType) {
        return em.createQuery("SELECT d FROM Document d WHERE d.documentType = :documentType ORDER BY d.createdAt DESC", Document.class)
                .setParameter("documentType", documentType)
                .getResultList();
    }

    public List<Document> findByVerificationStatus(Document.DocumentVerificationStatus verificationStatus) {
        return em.createQuery("SELECT d FROM Document d WHERE d.verificationStatus = :verificationStatus ORDER BY d.createdAt DESC", Document.class)
                .setParameter("verificationStatus", verificationStatus)
                .getResultList();
    }

    public List<Document> findByMemberIdAndDocumentType(Integer memberId, Document.DocumentType documentType) {
        return em.createQuery("SELECT d FROM Document d WHERE d.memberId = :memberId AND d.documentType = :documentType ORDER BY d.createdAt DESC", Document.class)
                .setParameter("memberId", memberId)
                .setParameter("documentType", documentType)
                .getResultList();
    }

    public List<Document> findPrimaryDocuments(Integer memberId) {
        return em.createQuery("SELECT d FROM Document d WHERE d.memberId = :memberId AND d.isPrimary = true ORDER BY d.createdAt DESC", Document.class)
                .setParameter("memberId", memberId)
                .getResultList();
    }

    public List<Document> findPendingVerificationDocuments() {
        return em.createQuery("SELECT d FROM Document d WHERE d.verificationStatus = :verificationStatus ORDER BY d.createdAt ASC", Document.class)
                .setParameter("verificationStatus", Document.DocumentVerificationStatus.PENDING)
                .getResultList();
    }

    public List<Document> findExpiredDocuments() {
        return em.createQuery("SELECT d FROM Document d WHERE d.expiryDate IS NOT NULL AND d.expiryDate < :today ORDER BY d.expiryDate ASC", Document.class)
                .setParameter("today", LocalDate.now())
                .getResultList();
    }

    public List<Document> findExpiringDocuments(int daysBeforeExpiry) {
        LocalDate expiryThreshold = LocalDate.now().plusDays(daysBeforeExpiry);
        return em.createQuery("SELECT d FROM Document d WHERE d.expiryDate IS NOT NULL AND d.expiryDate BETWEEN :today AND :threshold ORDER BY d.expiryDate ASC", Document.class)
                .setParameter("today", LocalDate.now())
                .setParameter("threshold", expiryThreshold)
                .getResultList();
    }

    public Document save(Document document) {
        if (document.getId() == null) {
            em.persist(document);
            return document;
        } else {
            return em.merge(document);
        }
    }

    public void delete(Document document) {
        em.remove(em.contains(document) ? document : em.merge(document));
    }

    public Long countByMemberId(Integer memberId) {
        return em.createQuery("SELECT COUNT(d) FROM Document d WHERE d.memberId = :memberId", Long.class)
                .setParameter("memberId", memberId)
                .getSingleResult();
    }

    public Long countByVerificationStatus(Document.DocumentVerificationStatus verificationStatus) {
        return em.createQuery("SELECT COUNT(d) FROM Document d WHERE d.verificationStatus = :verificationStatus", Long.class)
                .setParameter("verificationStatus", verificationStatus)
                .getSingleResult();
    }
}
