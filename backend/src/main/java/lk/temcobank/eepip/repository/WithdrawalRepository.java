package lk.temcobank.eepip.repository;

import lk.temcobank.eepip.entity.Withdrawal;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

/**
 * Withdrawal Repository - CRUD operations for Withdrawal entity.
 */
@Stateless
public class WithdrawalRepository {

    @PersistenceContext(unitName = "eepipPU")
    private EntityManager em;

    public Withdrawal findById(Integer id) {
        return em.find(Withdrawal.class, id);
    }

    public List<Withdrawal> findAll() {
        return em.createQuery("SELECT w FROM Withdrawal w ORDER BY w.requestDate DESC", Withdrawal.class)
                .getResultList();
    }

    public List<Withdrawal> findByMemberId(Integer memberId) {
        return em.createQuery("SELECT w FROM Withdrawal w WHERE w.memberId = :memberId ORDER BY w.requestDate DESC", Withdrawal.class)
                .setParameter("memberId", memberId)
                .getResultList();
    }

    public List<Withdrawal> findByStatus(Withdrawal.WithdrawalStatus status) {
        return em.createQuery("SELECT w FROM Withdrawal w WHERE w.status = :status ORDER BY w.requestDate DESC", Withdrawal.class)
                .setParameter("status", status)
                .getResultList();
    }

    public List<Withdrawal> findByWithdrawalType(Withdrawal.WithdrawalType withdrawalType) {
        return em.createQuery("SELECT w FROM Withdrawal w WHERE w.withdrawalType = :withdrawalType ORDER BY w.requestDate DESC", Withdrawal.class)
                .setParameter("withdrawalType", withdrawalType)
                .getResultList();
    }

    public List<Withdrawal> findByRequestDate(LocalDate requestDate) {
        return em.createQuery("SELECT w FROM Withdrawal w WHERE w.requestDate = :requestDate", Withdrawal.class)
                .setParameter("requestDate", requestDate)
                .getResultList();
    }

    public List<Withdrawal> findByProcessedDate(LocalDate processedDate) {
        return em.createQuery("SELECT w FROM Withdrawal w WHERE w.processedDate = :processedDate", Withdrawal.class)
                .setParameter("processedDate", processedDate)
                .getResultList();
    }

    public List<Withdrawal> findPendingWithdrawals() {
        return em.createQuery("SELECT w FROM Withdrawal w WHERE w.status = :status ORDER BY w.requestDate ASC", Withdrawal.class)
                .setParameter("status", Withdrawal.WithdrawalStatus.REQUESTED)
                .getResultList();
    }

    public List<Withdrawal> findPendingVerificationWithdrawals() {
        return em.createQuery("SELECT w FROM Withdrawal w WHERE w.status = :status ORDER BY w.requestDate ASC", Withdrawal.class)
                .setParameter("status", Withdrawal.WithdrawalStatus.PENDING_VERIFICATION)
                .getResultList();
    }

    public List<Withdrawal> findApprovedWithdrawals() {
        return em.createQuery("SELECT w FROM Withdrawal w WHERE w.status = :status ORDER BY w.requestDate ASC", Withdrawal.class)
                .setParameter("status", Withdrawal.WithdrawalStatus.APPROVED)
                .getResultList();
    }

    public Withdrawal save(Withdrawal withdrawal) {
        if (withdrawal.getId() == null) {
            em.persist(withdrawal);
            return withdrawal;
        } else {
            return em.merge(withdrawal);
        }
    }

    public void delete(Withdrawal withdrawal) {
        em.remove(em.contains(withdrawal) ? withdrawal : em.merge(withdrawal));
    }

    public BigDecimal sumByMemberId(Integer memberId) {
        try {
            return em.createQuery("SELECT SUM(w.amount) FROM Withdrawal w WHERE w.memberId = :memberId AND w.status = :status", BigDecimal.class)
                    .setParameter("memberId", memberId)
                    .setParameter("status", Withdrawal.WithdrawalStatus.PAID)
                    .getSingleResult();
        } catch (Exception e) {
            return BigDecimal.ZERO;
        }
    }

    public Long countByStatus(Withdrawal.WithdrawalStatus status) {
        return em.createQuery("SELECT COUNT(w) FROM Withdrawal w WHERE w.status = :status", Long.class)
                .setParameter("status", status)
                .getSingleResult();
    }
}
