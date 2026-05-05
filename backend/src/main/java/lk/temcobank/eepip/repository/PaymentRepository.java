package lk.temcobank.eepip.repository;

import lk.temcobank.eepip.entity.AiEngineer;
import lk.temcobank.eepip.entity.Epin;
import lk.temcobank.eepip.entity.Payment;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

/**
 * Payment Repository - CRUD operations for Payment entity.
 */
@Stateless
public class PaymentRepository {

    @PersistenceContext(unitName = "eepipPU")
    private EntityManager em;

    public Payment findById(Integer id) {
        return em.find(Payment.class, id);
    }

    public List<Payment> findAll() {
        return em.createQuery("SELECT p FROM Payment p ORDER BY p.paymentDate DESC", Payment.class)
                .getResultList();
    }

    public List<Payment> findByAiEngineer(AiEngineer aiEngineer) {
        return em.createQuery("SELECT p FROM Payment p WHERE p.aiEngineer = :aiEngineer ORDER BY p.paymentDate DESC", Payment.class)
                .setParameter("aiEngineer", aiEngineer)
                .getResultList();
    }

    public List<Payment> findByAiEngineerId(Integer aiEngineerId) {
        return em.createQuery("SELECT p FROM Payment p WHERE p.aiEngineer.id = :aiEngineerId ORDER BY p.paymentDate DESC", Payment.class)
                .setParameter("aiEngineerId", aiEngineerId)
                .getResultList();
    }

    public List<Payment> findByPaymentMethod(Payment.PaymentMethod paymentMethod) {
        return em.createQuery("SELECT p FROM Payment p WHERE p.paymentMethod = :paymentMethod ORDER BY p.paymentDate DESC", Payment.class)
                .setParameter("paymentMethod", paymentMethod)
                .getResultList();
    }

    public List<Payment> findByStatus(Payment.PaymentStatus status) {
        return em.createQuery("SELECT p FROM Payment p WHERE p.status = :status ORDER BY p.paymentDate DESC", Payment.class)
                .setParameter("status", status)
                .getResultList();
    }

    public List<Payment> findByPaymentDate(LocalDate paymentDate) {
        return em.createQuery("SELECT p FROM Payment p WHERE p.paymentDate = :paymentDate", Payment.class)
                .setParameter("paymentDate", paymentDate)
                .getResultList();
    }

    public List<Payment> findByBankReference(String bankReference) {
        return em.createQuery("SELECT p FROM Payment p WHERE p.bankReference = :bankReference", Payment.class)
                .setParameter("bankReference", bankReference)
                .getResultList();
    }

    public List<Payment> findByTransactionId(String transactionId) {
        return em.createQuery("SELECT p FROM Payment p WHERE p.transactionId = :transactionId", Payment.class)
                .setParameter("transactionId", transactionId)
                .getResultList();
    }

    public List<Payment> findByEpin(Epin epin) {
        return em.createQuery("SELECT p FROM Payment p WHERE p.epin = :epin ORDER BY p.paymentDate DESC", Payment.class)
                .setParameter("epin", epin)
                .getResultList();
    }

    public List<Payment> findPendingPayments() {
        return em.createQuery("SELECT p FROM Payment p WHERE p.status = :status ORDER BY p.paymentDate ASC", Payment.class)
                .setParameter("status", Payment.PaymentStatus.PENDING)
                .getResultList();
    }

    public Payment save(Payment payment) {
        if (payment.getId() == null) {
            em.persist(payment);
            return payment;
        } else {
            return em.merge(payment);
        }
    }

    public void delete(Payment payment) {
        em.remove(em.contains(payment) ? payment : em.merge(payment));
    }

    public BigDecimal sumByAiEngineer(Integer aiEngineerId) {
        try {
            return em.createQuery("SELECT SUM(p.amount) FROM Payment p WHERE p.aiEngineer.id = :aiEngineerId AND p.status = :status", BigDecimal.class)
                    .setParameter("aiEngineerId", aiEngineerId)
                    .setParameter("status", Payment.PaymentStatus.CONFIRMED)
                    .getSingleResult();
        } catch (Exception e) {
            return BigDecimal.ZERO;
        }
    }

    public Long countByStatus(Payment.PaymentStatus status) {
        return em.createQuery("SELECT COUNT(p) FROM Payment p WHERE p.status = :status", Long.class)
                .setParameter("status", status)
                .getSingleResult();
    }
}
