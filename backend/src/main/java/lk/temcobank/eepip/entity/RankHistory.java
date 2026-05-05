package lk.temcobank.eepip.entity;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * RankHistory entity - AI Engineer rank promotion tracking.
 */
@Entity
@Table(name = "eepip_rank_history")
public class RankHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "ai_engineer_id", nullable = false, foreignKey = @ForeignKey(name = "fk_rank_history_ai_engineer"))
    private AiEngineer aiEngineer;

    @Enumerated(EnumType.STRING)
    @Column(name = "previous_rank", length = 20)
    private AiEngineer.Rank previousRank;

    @Enumerated(EnumType.STRING)
    @Column(name = "new_rank", nullable = false, length = 20)
    private AiEngineer.Rank newRank;

    @Column(name = "reward_amount", precision = 12, scale = 2)
    private BigDecimal rewardAmount = BigDecimal.ZERO;

    @Column(name = "achieved_at", nullable = false)
    private LocalDateTime achievedAt = LocalDateTime.now();

    public RankHistory() {
    }

    public RankHistory(AiEngineer aiEngineer, AiEngineer.Rank newRank) {
        this.aiEngineer = aiEngineer;
        this.newRank = newRank;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public AiEngineer getAiEngineer() {
        return aiEngineer;
    }

    public void setAiEngineer(AiEngineer aiEngineer) {
        this.aiEngineer = aiEngineer;
    }

    public AiEngineer.Rank getPreviousRank() {
        return previousRank;
    }

    public void setPreviousRank(AiEngineer.Rank previousRank) {
        this.previousRank = previousRank;
    }

    public AiEngineer.Rank getNewRank() {
        return newRank;
    }

    public void setNewRank(AiEngineer.Rank newRank) {
        this.newRank = newRank;
    }

    public BigDecimal getRewardAmount() {
        return rewardAmount;
    }

    public void setRewardAmount(BigDecimal rewardAmount) {
        this.rewardAmount = rewardAmount;
    }

    public LocalDateTime getAchievedAt() {
        return achievedAt;
    }

    public void setAchievedAt(LocalDateTime achievedAt) {
        this.achievedAt = achievedAt;
    }
}
