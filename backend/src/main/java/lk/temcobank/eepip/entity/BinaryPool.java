package lk.temcobank.eepip.entity;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * BinaryPool entity - AI Engineer commission pool management with pro-ration.
 */
@Entity
@Table(name = "eepip_binary_pool")
public class BinaryPool {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "cycle_month", unique = true, nullable = false, length = 7)
    private String cycleMonth;

    @Column(name = "enrollments_this_month")
    private Integer enrollmentsThisMonth = 0;

    @Column(name = "pool_amount", precision = 12, scale = 2)
    private BigDecimal poolAmount = BigDecimal.ZERO;

    @Column(name = "carry_forward_from_last", precision = 12, scale = 2)
    private BigDecimal carryForwardFromLast = BigDecimal.ZERO;

    @Column(name = "total_claims", precision = 12, scale = 2)
    private BigDecimal totalClaims = BigDecimal.ZERO;

    @Column(name = "pro_ration_triggered")
    private Boolean proRationTriggered = false;

    @Column(name = "pro_ration_percentage", precision = 5, scale = 2)
    private BigDecimal proRationPercentage = new BigDecimal("100.00");

    @Column(name = "surplus", precision = 12, scale = 2)
    private BigDecimal surplus = BigDecimal.ZERO;

    @Column(name = "utilization", precision = 5, scale = 2)
    private BigDecimal utilization = BigDecimal.ZERO;

    @Column(name = "calculated_at", nullable = false)
    private LocalDateTime calculatedAt = LocalDateTime.now();

    public BinaryPool() {
    }

    public BinaryPool(String cycleMonth) {
        this.cycleMonth = cycleMonth;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

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

    public LocalDateTime getCalculatedAt() {
        return calculatedAt;
    }

    public void setCalculatedAt(LocalDateTime calculatedAt) {
        this.calculatedAt = calculatedAt;
    }
}
