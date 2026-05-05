package lk.temcobank.eepip.service;

import lk.temcobank.eepip.entity.AiEngineer;
import lk.temcobank.eepip.entity.RankHistory;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import java.math.BigDecimal;
import java.util.List;

/**
 * RankHistory Service - Business logic for RankHistory entity.
 */
@Stateless
public class RankHistoryService {

    @EJB
    private lk.temcobank.eepip.repository.RankHistoryRepository rankHistoryRepository;

    @EJB
    private AiEngineerService aiEngineerService;

    public RankHistory findById(Integer id) {
        return rankHistoryRepository.findById(id);
    }

    public List<RankHistory> findAll() {
        return rankHistoryRepository.findAll();
    }

    public List<RankHistory> findByAiEngineer(AiEngineer aiEngineer) {
        return rankHistoryRepository.findByAiEngineer(aiEngineer);
    }

    public List<RankHistory> findByAiEngineerId(Integer aiEngineerId) {
        return rankHistoryRepository.findByAiEngineerId(aiEngineerId);
    }

    public List<RankHistory> findByRank(AiEngineer.Rank rank) {
        return rankHistoryRepository.findByRank(rank);
    }

    public RankHistory recordRankPromotion(Integer aiEngineerId, AiEngineer.Rank newRank, BigDecimal rewardAmount) {
        AiEngineer aiEngineer = aiEngineerService.findById(aiEngineerId);
        if (aiEngineer == null) {
            throw new IllegalArgumentException("AI Engineer not found with ID: " + aiEngineerId);
        }

        AiEngineer.Rank currentRank = aiEngineer.getRankCode();
        if (currentRank == newRank) {
            throw new IllegalArgumentException("AI Engineer already has rank: " + newRank);
        }

        RankHistory rankHistory = new RankHistory(aiEngineer, newRank);
        rankHistory.setPreviousRank(currentRank);
        rankHistory.setRewardAmount(rewardAmount != null ? rewardAmount : BigDecimal.ZERO);
        rankHistory.setAchievedAt(java.time.LocalDateTime.now());

        // Update the AI Engineer's current rank
        aiEngineerService.updateRank(aiEngineerId, newRank);

        return rankHistoryRepository.save(rankHistory);
    }

    public RankHistory recordRankAchievement(Integer aiEngineerId, AiEngineer.Rank newRank) {
        return recordRankPromotion(aiEngineerId, newRank, null);
    }

    public Long countPromotionsForAiEngineer(Integer aiEngineerId) {
        return rankHistoryRepository.countByAiEngineer(aiEngineerId);
    }
}
