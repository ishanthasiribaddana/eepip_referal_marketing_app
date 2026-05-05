package lk.temcobank.eepip.dto;

import lk.temcobank.eepip.entity.AiEngineer;
import lk.temcobank.eepip.entity.Withdrawal;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

/**
 * Bank Member View DTO - Composite DTO for bank member view.
 */
public class BankMemberViewDTO {
    private Integer memberId;
    private AiEngineerDTO aiEngineer;
    private AiEngineer.MemberState memberState;
    private AiEngineer.Rank rank;
    private BigDecimal totalEarnings;
    private BigDecimal monthlyEarnings;
    private Integer leftBv;
    private Integer rightBv;
    private List<WithdrawalDTO> withdrawals;
    private BigDecimal totalWithdrawals;
    private LocalDateTime lastActive;

    public BankMemberViewDTO() {
    }

    // Getters and Setters
    public Integer getMemberId() {
        return memberId;
    }

    public void setMemberId(Integer memberId) {
        this.memberId = memberId;
    }

    public AiEngineerDTO getAiEngineer() {
        return aiEngineer;
    }

    public void setAiEngineer(AiEngineerDTO aiEngineer) {
        this.aiEngineer = aiEngineer;
    }

    public AiEngineer.MemberState getMemberState() {
        return memberState;
    }

    public void setMemberState(AiEngineer.MemberState memberState) {
        this.memberState = memberState;
    }

    public AiEngineer.Rank getRank() {
        return rank;
    }

    public void setRank(AiEngineer.Rank rank) {
        this.rank = rank;
    }

    public BigDecimal getTotalEarnings() {
        return totalEarnings;
    }

    public void setTotalEarnings(BigDecimal totalEarnings) {
        this.totalEarnings = totalEarnings;
    }

    public BigDecimal getMonthlyEarnings() {
        return monthlyEarnings;
    }

    public void setMonthlyEarnings(BigDecimal monthlyEarnings) {
        this.monthlyEarnings = monthlyEarnings;
    }

    public Integer getLeftBv() {
        return leftBv;
    }

    public void setLeftBv(Integer leftBv) {
        this.leftBv = leftBv;
    }

    public Integer getRightBv() {
        return rightBv;
    }

    public void setRightBv(Integer rightBv) {
        this.rightBv = rightBv;
    }

    public List<WithdrawalDTO> getWithdrawals() {
        return withdrawals;
    }

    public void setWithdrawals(List<WithdrawalDTO> withdrawals) {
        this.withdrawals = withdrawals;
    }

    public BigDecimal getTotalWithdrawals() {
        return totalWithdrawals;
    }

    public void setTotalWithdrawals(BigDecimal totalWithdrawals) {
        this.totalWithdrawals = totalWithdrawals;
    }

    public LocalDateTime getLastActive() {
        return lastActive;
    }

    public void setLastActive(LocalDateTime lastActive) {
        this.lastActive = lastActive;
    }
}
