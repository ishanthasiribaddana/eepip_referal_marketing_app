package lk.temcobank.eepip.service;

import lk.temcobank.eepip.entity.Withdrawal;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

/**
 * Withdrawal Service - Business logic for Withdrawal entity.
 */
@Stateless
public class WithdrawalService {

    @EJB
    private lk.temcobank.eepip.repository.WithdrawalRepository withdrawalRepository;

    public Withdrawal findById(Integer id) {
        return withdrawalRepository.findById(id);
    }

    public List<Withdrawal> findAll() {
        return withdrawalRepository.findAll();
    }

    public List<Withdrawal> findByMemberId(Integer memberId) {
        return withdrawalRepository.findByMemberId(memberId);
    }

    public List<Withdrawal> findByStatus(Withdrawal.WithdrawalStatus status) {
        return withdrawalRepository.findByStatus(status);
    }

    public List<Withdrawal> findByWithdrawalType(Withdrawal.WithdrawalType withdrawalType) {
        return withdrawalRepository.findByWithdrawalType(withdrawalType);
    }

    public List<Withdrawal> findPendingWithdrawals() {
        return withdrawalRepository.findPendingWithdrawals();
    }

    public List<Withdrawal> findPendingVerificationWithdrawals() {
        return withdrawalRepository.findPendingVerificationWithdrawals();
    }

    public List<Withdrawal> findApprovedWithdrawals() {
        return withdrawalRepository.findApprovedWithdrawals();
    }

    public Withdrawal createWithdrawal(Withdrawal withdrawal) {
        validateWithdrawal(withdrawal);
        withdrawal.setStatus(Withdrawal.WithdrawalStatus.REQUESTED);
        return withdrawalRepository.save(withdrawal);
    }

    public Withdrawal requestWithdrawal(Integer memberId, BigDecimal amount, Withdrawal.WithdrawalType withdrawalType,
                                          Withdrawal.AccountType accountType, String accountNumber, String accountHolderName,
                                          String bankName, String bankBranch) {
        Withdrawal withdrawal = new Withdrawal(memberId, withdrawalType, amount, LocalDate.now());
        withdrawal.setAccountType(accountType);
        withdrawal.setAccountNumber(accountNumber);
        withdrawal.setAccountHolderName(accountHolderName);
        withdrawal.setBankName(bankName);
        withdrawal.setBankBranch(bankBranch);
        withdrawal.setStatus(Withdrawal.WithdrawalStatus.REQUESTED);

        return withdrawalRepository.save(withdrawal);
    }

    public Withdrawal submitForVerification(Integer withdrawalId) {
        Withdrawal withdrawal = withdrawalRepository.findById(withdrawalId);
        if (withdrawal == null) {
            throw new IllegalArgumentException("Withdrawal not found with ID: " + withdrawalId);
        }

        if (withdrawal.getStatus() != Withdrawal.WithdrawalStatus.REQUESTED) {
            throw new IllegalArgumentException("Withdrawal is not in REQUESTED status");
        }

        withdrawal.setStatus(Withdrawal.WithdrawalStatus.PENDING_VERIFICATION);
        return withdrawalRepository.save(withdrawal);
    }

    public Withdrawal approveWithdrawal(Integer withdrawalId, Integer approvedBy) {
        Withdrawal withdrawal = withdrawalRepository.findById(withdrawalId);
        if (withdrawal == null) {
            throw new IllegalArgumentException("Withdrawal not found with ID: " + withdrawalId);
        }

        if (withdrawal.getStatus() != Withdrawal.WithdrawalStatus.PENDING_VERIFICATION) {
            throw new IllegalArgumentException("Withdrawal is not in PENDING_VERIFICATION status");
        }

        withdrawal.setStatus(Withdrawal.WithdrawalStatus.APPROVED);
        withdrawal.setApprovedBy(approvedBy);
        withdrawal.setApprovedAt(java.time.LocalDateTime.now());

        return withdrawalRepository.save(withdrawal);
    }

    public Withdrawal rejectWithdrawal(Integer withdrawalId, Integer approvedBy, String rejectionReason) {
        Withdrawal withdrawal = withdrawalRepository.findById(withdrawalId);
        if (withdrawal == null) {
            throw new IllegalArgumentException("Withdrawal not found with ID: " + withdrawalId);
        }

        if (withdrawal.getStatus() != Withdrawal.WithdrawalStatus.PENDING_VERIFICATION &&
            withdrawal.getStatus() != Withdrawal.WithdrawalStatus.REQUESTED) {
            throw new IllegalArgumentException("Withdrawal is not in a status that can be rejected");
        }

        withdrawal.setStatus(Withdrawal.WithdrawalStatus.REJECTED);
        withdrawal.setApprovedBy(approvedBy);
        withdrawal.setApprovedAt(java.time.LocalDateTime.now());
        withdrawal.setRejectionReason(rejectionReason);

        return withdrawalRepository.save(withdrawal);
    }

    public Withdrawal markAsPaid(Integer withdrawalId, LocalDate paidDate, String transactionReference) {
        Withdrawal withdrawal = withdrawalRepository.findById(withdrawalId);
        if (withdrawal == null) {
            throw new IllegalArgumentException("Withdrawal not found with ID: " + withdrawalId);
        }

        if (withdrawal.getStatus() != Withdrawal.WithdrawalStatus.APPROVED) {
            throw new IllegalArgumentException("Withdrawal is not APPROVED");
        }

        withdrawal.setStatus(Withdrawal.WithdrawalStatus.PAID);
        withdrawal.setProcessedDate(paidDate);
        withdrawal.setTransactionReference(transactionReference);

        return withdrawalRepository.save(withdrawal);
    }

    public Withdrawal markAsCancelled(Integer withdrawalId, String reason) {
        Withdrawal withdrawal = withdrawalRepository.findById(withdrawalId);
        if (withdrawal == null) {
            throw new IllegalArgumentException("Withdrawal not found with ID: " + withdrawalId);
        }

        withdrawal.setStatus(Withdrawal.WithdrawalStatus.CANCELLED);
        withdrawal.setRejectionReason(reason);

        return withdrawalRepository.save(withdrawal);
    }

    public BigDecimal getTotalWithdrawalsByMember(Integer memberId) {
        return withdrawalRepository.sumByMemberId(memberId);
    }

    private void validateWithdrawal(Withdrawal withdrawal) {
        if (withdrawal.getMemberId() == null) {
            throw new IllegalArgumentException("Member ID is required");
        }
        if (withdrawal.getAmount() == null || withdrawal.getAmount().compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Withdrawal amount must be positive");
        }
        if (withdrawal.getWithdrawalType() == null) {
            throw new IllegalArgumentException("Withdrawal type is required");
        }
        if (withdrawal.getAccountNumber() == null || withdrawal.getAccountNumber().trim().isEmpty()) {
            throw new IllegalArgumentException("Account number is required");
        }
        if (withdrawal.getAccountHolderName() == null || withdrawal.getAccountHolderName().trim().isEmpty()) {
            throw new IllegalArgumentException("Account holder name is required");
        }
    }
}
