package lk.temcobank.eepip.dto;

import lk.temcobank.eepip.entity.Payment;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

/**
 * Payment DTO - Data Transfer Object for Payment entity.
 */
public class PaymentDTO {
    private Integer id;
    private Integer aiEngineerId;
    private String aiEngineerName;
    private BigDecimal amount;
    private Payment.PaymentMethod paymentMethod;
    private String bankReference;
    private String transactionId;
    private LocalDate paymentDate;
    private LocalTime paymentTime;
    private Payment.PaymentStatus status;
    private String currency;
    private BigDecimal exchangeRate;
    private String bankName;
    private String branchName;
    private String checkNumber;
    private Integer epinId;
    private String epinNo;
    private BigDecimal refundAmount;
    private LocalDate refundDate;
    private String refundReason;
    private String notes;
    private Integer confirmedBy;
    private LocalDateTime confirmedAt;
    private Integer verifiedBy;
    private LocalDateTime verifiedAt;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public PaymentDTO() {
    }

    public PaymentDTO(Payment payment) {
        this.id = payment.getId();
        this.aiEngineerId = payment.getAiEngineer() != null ? payment.getAiEngineer().getId() : null;
        this.aiEngineerName = payment.getAiEngineer() != null ? payment.getAiEngineer().getMemberId().toString() : null;
        this.amount = payment.getAmount();
        this.paymentMethod = payment.getPaymentMethod();
        this.bankReference = payment.getBankReference();
        this.transactionId = payment.getTransactionId();
        this.paymentDate = payment.getPaymentDate();
        this.paymentTime = payment.getPaymentTime();
        this.status = payment.getStatus();
        this.currency = payment.getCurrency();
        this.exchangeRate = payment.getExchangeRate();
        this.bankName = payment.getBankName();
        this.branchName = payment.getBranchName();
        this.checkNumber = payment.getCheckNumber();
        this.epinId = payment.getEpin() != null ? payment.getEpin().getId() : null;
        this.epinNo = payment.getEpin() != null ? payment.getEpin().getEpinNo() : null;
        this.refundAmount = payment.getRefundAmount();
        this.refundDate = payment.getRefundDate();
        this.refundReason = payment.getRefundReason();
        this.notes = payment.getNotes();
        this.confirmedBy = payment.getConfirmedBy();
        this.confirmedAt = payment.getConfirmedAt();
        this.verifiedBy = payment.getVerifiedBy();
        this.verifiedAt = payment.getVerifiedAt();
        this.createdAt = payment.getCreatedAt();
        this.updatedAt = payment.getUpdatedAt();
    }

    // Getters and Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getAiEngineerId() {
        return aiEngineerId;
    }

    public void setAiEngineerId(Integer aiEngineerId) {
        this.aiEngineerId = aiEngineerId;
    }

    public String getAiEngineerName() {
        return aiEngineerName;
    }

    public void setAiEngineerName(String aiEngineerName) {
        this.aiEngineerName = aiEngineerName;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public Payment.PaymentMethod getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(Payment.PaymentMethod paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public String getBankReference() {
        return bankReference;
    }

    public void setBankReference(String bankReference) {
        this.bankReference = bankReference;
    }

    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }

    public LocalDate getPaymentDate() {
        return paymentDate;
    }

    public void setPaymentDate(LocalDate paymentDate) {
        this.paymentDate = paymentDate;
    }

    public LocalTime getPaymentTime() {
        return paymentTime;
    }

    public void setPaymentTime(LocalTime paymentTime) {
        this.paymentTime = paymentTime;
    }

    public Payment.PaymentStatus getStatus() {
        return status;
    }

    public void setStatus(Payment.PaymentStatus status) {
        this.status = status;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public BigDecimal getExchangeRate() {
        return exchangeRate;
    }

    public void setExchangeRate(BigDecimal exchangeRate) {
        this.exchangeRate = exchangeRate;
    }

    public String getBankName() {
        return bankName;
    }

    public void setBankName(String bankName) {
        this.bankName = bankName;
    }

    public String getBranchName() {
        return branchName;
    }

    public void setBranchName(String branchName) {
        this.branchName = branchName;
    }

    public String getCheckNumber() {
        return checkNumber;
    }

    public void setCheckNumber(String checkNumber) {
        this.checkNumber = checkNumber;
    }

    public Integer getEpinId() {
        return epinId;
    }

    public void setEpinId(Integer epinId) {
        this.epinId = epinId;
    }

    public String getEpinNo() {
        return epinNo;
    }

    public void setEpinNo(String epinNo) {
        this.epinNo = epinNo;
    }

    public BigDecimal getRefundAmount() {
        return refundAmount;
    }

    public void setRefundAmount(BigDecimal refundAmount) {
        this.refundAmount = refundAmount;
    }

    public LocalDate getRefundDate() {
        return refundDate;
    }

    public void setRefundDate(LocalDate refundDate) {
        this.refundDate = refundDate;
    }

    public String getRefundReason() {
        return refundReason;
    }

    public void setRefundReason(String refundReason) {
        this.refundReason = refundReason;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public Integer getConfirmedBy() {
        return confirmedBy;
    }

    public void setConfirmedBy(Integer confirmedBy) {
        this.confirmedBy = confirmedBy;
    }

    public LocalDateTime getConfirmedAt() {
        return confirmedAt;
    }

    public void setConfirmedAt(LocalDateTime confirmedAt) {
        this.confirmedAt = confirmedAt;
    }

    public Integer getVerifiedBy() {
        return verifiedBy;
    }

    public void setVerifiedBy(Integer verifiedBy) {
        this.verifiedBy = verifiedBy;
    }

    public LocalDateTime getVerifiedAt() {
        return verifiedAt;
    }

    public void setVerifiedAt(LocalDateTime verifiedAt) {
        this.verifiedAt = verifiedAt;
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
