package lk.temcobank.eepip.service;

import lk.temcobank.eepip.entity.Agent;
import lk.temcobank.eepip.entity.AiEngineer;
import lk.temcobank.eepip.entity.Product;
import lk.temcobank.eepip.repository.AiEngineerRepository;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import java.time.LocalDate;
import java.util.List;

/**
 * AI Engineer Service - Business logic for AiEngineer entity.
 */
@Stateless
public class AiEngineerService {

    @EJB
    private AiEngineerRepository aiEngineerRepository;

    @EJB
    private ProductService productService;

    @EJB
    private AgentService agentService;

    public AiEngineer findById(Integer id) {
        return aiEngineerRepository.findById(id);
    }

    public AiEngineer findByMemberId(Integer memberId) {
        return aiEngineerRepository.findByMemberId(memberId);
    }

    public List<AiEngineer> findAll() {
        return aiEngineerRepository.findAll();
    }

    public List<AiEngineer> findBySponsorId(Integer sponsorId) {
        return aiEngineerRepository.findBySponsorId(sponsorId);
    }

    public List<AiEngineer> findByParentId(Integer parentId) {
        return aiEngineerRepository.findByParentId(parentId);
    }

    public List<AiEngineer> findByMemberState(AiEngineer.MemberState memberState) {
        return aiEngineerRepository.findByMemberState(memberState);
    }

    public List<AiEngineer> findByRank(AiEngineer.Rank rankCode) {
        return aiEngineerRepository.findByRank(rankCode);
    }

    public List<AiEngineer> findActiveAiEngineers() {
        return aiEngineerRepository.findActiveAiEngineers();
    }

    public AiEngineer createAiEngineer(AiEngineer aiEngineer) {
        validateAiEngineer(aiEngineer);
        initializeAiEngineer(aiEngineer);
        return aiEngineerRepository.save(aiEngineer);
    }

    public AiEngineer updateAiEngineer(AiEngineer aiEngineer) {
        if (aiEngineer.getId() == null) {
            throw new IllegalArgumentException("AI Engineer ID is required for update");
        }
        validateAiEngineer(aiEngineer);
        return aiEngineerRepository.save(aiEngineer);
    }

    public void deleteAiEngineer(Integer id) {
        AiEngineer aiEngineer = aiEngineerRepository.findById(id);
        if (aiEngineer == null) {
            throw new IllegalArgumentException("AI Engineer not found with ID: " + id);
        }
        aiEngineerRepository.delete(aiEngineer);
    }

    public void softDeleteAiEngineer(Integer id) {
        AiEngineer aiEngineer = aiEngineerRepository.findById(id);
        if (aiEngineer == null) {
            throw new IllegalArgumentException("AI Engineer not found with ID: " + id);
        }
        aiEngineerRepository.softDelete(aiEngineer);
    }

    public void enrollAiEngineer(Integer aiEngineerId, Integer productId, LocalDate investmentDate, String bankReference) {
        AiEngineer aiEngineer = aiEngineerRepository.findById(aiEngineerId);
        if (aiEngineer == null) {
            throw new IllegalArgumentException("AI Engineer not found with ID: " + aiEngineerId);
        }
        
        Product product = productService.findById(productId);
        if (product == null) {
            throw new IllegalArgumentException("Product not found with ID: " + productId);
        }
        
        aiEngineer.setProduct(product);
        aiEngineer.setInvestmentDate(investmentDate);
        aiEngineer.setBankReference(bankReference);
        aiEngineer.setMemberState(AiEngineer.MemberState.ENROLLED);
        aiEngineer.setActivationDate(investmentDate);
        
        aiEngineerRepository.save(aiEngineer);
    }

    public void updateAiEngineerState(Integer aiEngineerId, AiEngineer.MemberState newState) {
        AiEngineer aiEngineer = aiEngineerRepository.findById(aiEngineerId);
        if (aiEngineer == null) {
            throw new IllegalArgumentException("AI Engineer not found with ID: " + aiEngineerId);
        }
        
        validateStateTransition(aiEngineer.getMemberState(), newState);
        aiEngineer.setMemberState(newState);
        aiEngineerRepository.save(aiEngineer);
    }

    public void updateAcademicProgress(Integer aiEngineerId, AiEngineer.MemberState newState, 
                                       LocalDate bscStartDate, LocalDate mphilStartDate) {
        AiEngineer aiEngineer = aiEngineerRepository.findById(aiEngineerId);
        if (aiEngineer == null) {
            throw new IllegalArgumentException("AI Engineer not found with ID: " + aiEngineerId);
        }
        
        validateStateTransition(aiEngineer.getMemberState(), newState);
        aiEngineer.setMemberState(newState);
        
        if (bscStartDate != null) {
            aiEngineer.setBscStartDate(bscStartDate);
        }
        if (mphilStartDate != null) {
            aiEngineer.setMphilStartDate(mphilStartDate);
        }
        
        aiEngineerRepository.save(aiEngineer);
    }

    public void updateBinaryVolume(Integer aiEngineerId, Integer leftBv, Integer rightBv) {
        AiEngineer aiEngineer = aiEngineerRepository.findById(aiEngineerId);
        if (aiEngineer == null) {
            throw new IllegalArgumentException("AI Engineer not found with ID: " + aiEngineerId);
        }
        
        aiEngineer.setLeftBv(leftBv);
        aiEngineer.setRightBv(rightBv);
        aiEngineerRepository.save(aiEngineer);
    }

    public void updateRank(Integer aiEngineerId, AiEngineer.Rank newRank) {
        AiEngineer aiEngineer = aiEngineerRepository.findById(aiEngineerId);
        if (aiEngineer == null) {
            throw new IllegalArgumentException("AI Engineer not found with ID: " + aiEngineerId);
        }
        
        aiEngineer.setRankCode(newRank);
        aiEngineerRepository.save(aiEngineer);
    }

    private void validateAiEngineer(AiEngineer aiEngineer) {
        if (aiEngineer.getMemberId() == null) {
            throw new IllegalArgumentException("Member ID is required");
        }
        if (aiEngineer.getSponsorId() == null) {
            throw new IllegalArgumentException("Sponsor ID is required");
        }
        if (aiEngineer.getParentId() == null) {
            throw new IllegalArgumentException("Parent ID is required");
        }
        if (aiEngineer.getPosition() == null) {
            throw new IllegalArgumentException("Position is required");
        }
        if (aiEngineer.getProduct() == null) {
            throw new IllegalArgumentException("Product is required");
        }
        
        // Check if member already exists as AI Engineer
        AiEngineer existing = aiEngineerRepository.findByMemberId(aiEngineer.getMemberId());
        if (existing != null && !existing.getId().equals(aiEngineer.getId())) {
            throw new IllegalArgumentException("Member is already registered as AI Engineer");
        }
    }

    private void initializeAiEngineer(AiEngineer aiEngineer) {
        aiEngineer.setMemberState(AiEngineer.MemberState.WAITING_ENROLLMENT);
        aiEngineer.setRankCode(AiEngineer.Rank.STARTER);
        aiEngineer.setLeftBv(0);
        aiEngineer.setRightBv(0);
        aiEngineer.setCarryForwardLeftBv(0);
        aiEngineer.setCarryForwardRightBv(0);
        aiEngineer.setTotalEarnings(java.math.BigDecimal.ZERO);
        aiEngineer.setMonthlyEarnings(java.math.BigDecimal.ZERO);
        aiEngineer.setTeamSize(0);
        aiEngineer.setDirectRecruits(0);
        aiEngineer.setDirectRecruitsLeft(0);
        aiEngineer.setDirectRecruitsRight(0);
        aiEngineer.setTreeLevel(0);
        aiEngineer.setIsActive(true);
    }

    private void validateStateTransition(AiEngineer.MemberState currentState, AiEngineer.MemberState newState) {
        // Add state transition validation logic as needed
        // For now, allow all transitions
    }
}
