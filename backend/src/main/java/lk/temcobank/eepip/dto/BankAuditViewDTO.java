package lk.temcobank.eepip.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * Bank Audit View DTO - Composite DTO for bank audit dashboard.
 */
public class BankAuditViewDTO {
    private Integer totalAiEngineers;
    private Integer activeAiEngineers;
    private Integer pendingWithdrawals;
    private Integer pendingVerification;
    private BigDecimal totalWithdrawalsPendingAmount;
    private BigDecimal totalPaidThisMonth;
    private BigDecimal totalPaidYearToDate;
    private LocalDateTime lastUpdated;

    public BankAuditViewDTO() {
    }

    // Getters and Setters
    public Integer getTotalAiEngineers() {
        return totalAiEngineers;
    }

    public void setTotalAiEngineers(Integer totalAiEngineers) {
        this.totalAiEngineers = totalAiEngineers;
    }

    public Integer getActiveAiEngineers() {
        return activeAiEngineers;
    }

    public void setActiveAiEngineers(Integer activeAiEngineers) {
        this.activeAiEngineers = activeAiEngineers;
    }

    public Integer getPendingWithdrawals() {
        return pendingWithdrawals;
    }

    public void setPendingWithdrawals(Integer pendingWithdrawals) {
        this.pendingWithdrawals = pendingWithdrawals;
    }

    public Integer getPendingVerification() {
        return pendingVerification;
    }

    public void setPendingVerification(Integer pendingVerification) {
        this.pendingVerification = pendingVerification;
    }

    public BigDecimal getTotalWithdrawalsPendingAmount() {
        return totalWithdrawalsPendingAmount;
    }

    public void setTotalWithdrawalsPendingAmount(BigDecimal totalWithdrawalsPendingAmount) {
        this.totalWithdrawalsPendingAmount = totalWithdrawalsPendingAmount;
    }

    public BigDecimal getTotalPaidThisMonth() {
        return totalPaidThisMonth;
    }

    public void setTotalPaidThisMonth(BigDecimal totalPaidThisMonth) {
        this.totalPaidThisMonth = totalPaidThisMonth;
    }

    public BigDecimal getTotalPaidYearToDate() {
        return totalPaidYearToDate;
    }

    public void setTotalPaidYearToDate(BigDecimal totalPaidYearToDate) {
        this.totalPaidYearToDate = totalPaidYearToDate;
    }

    public LocalDateTime getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(LocalDateTime lastUpdated) {
        this.lastUpdated = lastUpdated;
    }
}
