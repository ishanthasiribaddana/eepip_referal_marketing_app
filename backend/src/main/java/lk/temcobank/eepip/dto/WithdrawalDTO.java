package lk.temcobank.eepip.dto;

import lk.temcobank.eepip.entity.Withdrawal;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

/**
 * Withdrawal DTO - Data Transfer Object for Withdrawal entity.
 */
public class WithdrawalDTO {
    private Integer id;
    private Integer memberId;
    private Withdrawal.WithdrawalType withdrawalType;
    private BigDecimal amount;
    private String currency;
    private String bankName;
    private String bankBranch;
    private String accountNumber;
    private String accountHolderName;
    private Withdrawal.AccountType accountType;
    private LocalDate requestDate;
    private LocalTime requestTime;
    private Withdrawal.WithdrawalStatus status;
    private Integer approvedBy;
    private LocalDateTime approvedAt;
    private String approvedNotes;
    private String rejectionReason;
    private LocalDate processedDate;
    private String transactionReference;
    private BigDecimal fees;
    private BigDecimal netAmount;
    private String notes;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public WithdrawalDTO() {
    }

    public WithdrawalDTO(Withdrawal withdrawal) {
        this.id = withdrawal.getId();
        this.memberId = withdrawal.getMemberId();
        this.withdrawalType = withdrawal.getWithdrawalType();
        this.amount = withdrawal.getAmount();
        this.currency = withdrawal.getCurrency();
        this.bankName = withdrawal.getBankName();
        this.bankBranch = withdrawal.getBankBranch();
        this.accountNumber = withdrawal.getAccountNumber();
        this.accountHolderName = withdrawal.getAccountHolderName();
        this.accountType = withdrawal.getAccountType();
        this.requestDate = withdrawal.getRequestDate();
        this.requestTime = withdrawal.getRequestTime();
        this.status = withdrawal.getStatus();
        this.approvedBy = withdrawal.getApprovedBy();
        this.approvedAt = withdrawal.getApprovedAt();
        this.approvedNotes = withdrawal.getApprovedNotes();
        this.rejectionReason = withdrawal.getRejectionReason();
        this.processedDate = withdrawal.getProcessedDate();
        this.transactionReference = withdrawal.getTransactionReference();
        this.fees = withdrawal.getFees();
        this.netAmount = withdrawal.getNetAmount();
        this.notes = withdrawal.getNotes();
        this.createdAt = withdrawal.getCreatedAt();
        this.updatedAt = withdrawal.getUpdatedAt();
    }

    // Getters and Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getMemberId() {
        return memberId;
    }

    public void setMemberId(Integer memberId) {
        this.memberId = memberId;
    }

    public Withdrawal.WithdrawalType getWithdrawalType() {
        return withdrawalType;
    }

    public void setWithdrawalType(Withdrawal.WithdrawalType withdrawalType) {
        this.withdrawalType = withdrawalType;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getBankName() {
        return bankName;
    }

    public void setBankName(String bankName) {
        this.bankName = bankName;
    }

    public String getBankBranch() {
        return bankBranch;
    }

    public void setBankBranch(String bankBranch) {
        this.bankBranch = bankBranch;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public String getAccountHolderName() {
        return accountHolderName;
    }

    public void setAccountHolderName(String accountHolderName) {
        this.accountHolderName = accountHolderName;
    }

    public Withdrawal.AccountType getAccountType() {
        return accountType;
    }

    public void setAccountType(Withdrawal.AccountType accountType) {
        this.accountType = accountType;
    }

    public LocalDate getRequestDate() {
        return requestDate;
    }

    public void setRequestDate(LocalDate requestDate) {
        this.requestDate = requestDate;
    }

    public LocalTime getRequestTime() {
        return requestTime;
    }

    public void setRequestTime(LocalTime requestTime) {
        this.requestTime = requestTime;
    }

    public Withdrawal.WithdrawalStatus getStatus() {
        return status;
    }

    public void setStatus(Withdrawal.WithdrawalStatus status) {
        this.status = status;
    }

    public Integer getApprovedBy() {
        return approvedBy;
    }

    public void setApprovedBy(Integer approvedBy) {
        this.approvedBy = approvedBy;
    }

    public LocalDateTime getApprovedAt() {
        return approvedAt;
    }

    public void setApprovedAt(LocalDateTime approvedAt) {
        this.approvedAt = approvedAt;
    }

    public String getApprovedNotes() {
        return approvedNotes;
    }

    public void setApprovedNotes(String approvedNotes) {
        this.approvedNotes = approvedNotes;
    }

    public String getRejectionReason() {
        return rejectionReason;
    }

    public void setRejectionReason(String rejectionReason) {
        this.rejectionReason = rejectionReason;
    }

    public LocalDate getProcessedDate() {
        return processedDate;
    }

    public void setProcessedDate(LocalDate processedDate) {
        this.processedDate = processedDate;
    }

    public String getTransactionReference() {
        return transactionReference;
    }

    public void setTransactionReference(String transactionReference) {
        this.transactionReference = transactionReference;
    }

    public BigDecimal getFees() {
        return fees;
    }

    public void setFees(BigDecimal fees) {
        this.fees = fees;
    }

    public BigDecimal getNetAmount() {
        return netAmount;
    }

    public void setNetAmount(BigDecimal netAmount) {
        this.netAmount = netAmount;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
