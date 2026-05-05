package lk.temcobank.eepip.dto;

import java.math.BigDecimal;

/**
 * Binary Pool Status DTO - Composite DTO for binary pool status information.
 */
public class BinaryPoolStatusDTO {
    private String cycleMonth;
    private Integer enrollmentsThisMonth;
    private BigDecimal poolAmount;
    private BigDecimal carryForwardFromLast;
    private BigDecimal totalClaims;
    private Boolean proRationTriggered;
    private BigDecimal proRationPercentage;
    private BigDecimal surplus;
    private BigDecimal utilization;
    private Integer totalAiEngineers;
    private Integer activeAiEngineers;

    public BinaryPoolStatusDTO() {
    }

    // Getters and Setters
    public String getCycleMonth() {
        return cycleMonth;
    }

    public void setCycleMonth(String cycleMonth) {
        this.cycleMonth = cycleMonth;
    }

    public Integer getEnrollmentsThisMonth() {
        return enrollmentsThisMonth;
    }

    public void setEnrollmentsThisMonth(Integer enrollmentsThisMonth) {
        this.enrollmentsThisMonth = enrollmentsThisMonth;
    }

    public BigDecimal getPoolAmount() {
        return poolAmount;
    }

    public void setPoolAmount(BigDecimal poolAmount) {
        this.poolAmount = poolAmount;
    }

    public BigDecimal getCarryForwardFromLast() {
        return carryForwardFromLast;
    }

    public void setCarryForwardFromLast(BigDecimal carryForwardFromLast) {
        this.carryForwardFromLast = carryForwardFromLast;
    }

    public BigDecimal getTotalClaims() {
        return totalClaims;
    }

    public void setTotalClaims(BigDecimal totalClaims) {
        this.totalClaims = totalClaims;
    }

    public Boolean getProRationTriggered() {
        return proRationTriggered;
    }

    public void setProRationTriggered(Boolean proRationTriggered) {
        this.proRationTriggered = proRationTriggered;
    }

    public BigDecimal getProRationPercentage() {
        return proRationPercentage;
    }

    public void setProRationPercentage(BigDecimal proRationPercentage) {
        this.proRationPercentage = proRationPercentage;
    }

    public BigDecimal getSurplus() {
        return surplus;
    }

    public void setSurplus(BigDecimal surplus) {
        this.surplus = surplus;
    }

    public BigDecimal getUtilization() {
        return utilization;
    }

    public void setUtilization(BigDecimal utilization) {
        this.utilization = utilization;
    }

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
}
