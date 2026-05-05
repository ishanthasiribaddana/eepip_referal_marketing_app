package lk.temcobank.eepip.service;

import lk.temcobank.eepip.entity.AiEngineer;
import lk.temcobank.eepip.entity.Commission;
import lk.temcobank.eepip.entity.Product;
import lk.temcobank.eepip.repository.CommissionRepository;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

/**
 * Commission Service - Business logic for Commission entity.
 */
@Stateless
public class CommissionService {

    @EJB
    private CommissionRepository commissionRepository;

    @EJB
    private AiEngineerService aiEngineerService;

    @EJB
    private ProductService productService;

    public Commission findById(Integer id) {
        return commissionRepository.findById(id);
    }

    public List<Commission> findAll() {
        return commissionRepository.findAll();
    }

    public List<Commission> findByAiEngineer(AiEngineer aiEngineer) {
        return commissionRepository.findByAiEngineer(aiEngineer);
    }

    public List<Commission> findByAiEngineerId(Integer aiEngineerId) {
        return commissionRepository.findByAiEngineerId(aiEngineerId);
    }

    public List<Commission> findByType(Commission.CommissionType type) {
        return commissionRepository.findByType(type);
    }

    public List<Commission> findByStatus(Commission.CommissionStatus status) {
        return commissionRepository.findByStatus(status);
    }

    public List<Commission> findByCycleMonth(String cycleMonth) {
        return commissionRepository.findByCycleMonth(cycleMonth);
    }

    public List<Commission> findPendingCommissions() {
        return commissionRepository.findPendingCommissions();
    }

    public Commission createCommission(Commission commission) {
        validateCommission(commission);
        calculateTaxAndNetAmount(commission);
        return commissionRepository.save(commission);
    }

    public Commission approveCommission(Integer commissionId, Integer approvedBy) {
        Commission commission = commissionRepository.findById(commissionId);
        if (commission == null) {
            throw new IllegalArgumentException("Commission not found with ID: " + commissionId);
        }
        
        if (commission.getStatus() != Commission.CommissionStatus.PENDING) {
            throw new IllegalArgumentException("Commission is not in PENDING status");
        }
        
        commission.setStatus(Commission.CommissionStatus.APPROVED);
        commission.setApprovedBy(approvedBy);
        commission.setApprovedAt(java.time.LocalDateTime.now());
        
        return commissionRepository.save(commission);
    }

    public Commission rejectCommission(Integer commissionId, Integer approvedBy, String rejectionReason) {
        Commission commission = commissionRepository.findById(commissionId);
        if (commission == null) {
            throw new IllegalArgumentException("Commission not found with ID: " + commissionId);
        }
        
        if (commission.getStatus() != Commission.CommissionStatus.PENDING) {
            throw new IllegalArgumentException("Commission is not in PENDING status");
        }
        
        commission.setStatus(Commission.CommissionStatus.REJECTED);
        commission.setApprovedBy(approvedBy);
        commission.setApprovedAt(java.time.LocalDateTime.now());
        commission.setRejectionReason(rejectionReason);
        
        return commissionRepository.save(commission);
    }

    public Commission markAsPaid(Integer commissionId, LocalDate paidDate) {
        Commission commission = commissionRepository.findById(commissionId);
        if (commission == null) {
            throw new IllegalArgumentException("Commission not found with ID: " + commissionId);
        }
        
        if (commission.getStatus() != Commission.CommissionStatus.APPROVED) {
            throw new IllegalArgumentException("Commission is not APPROVED");
        }
        
        commission.setStatus(Commission.CommissionStatus.PAID);
        commission.setPaidDate(paidDate);
        
        return commissionRepository.save(commission);
    }

    public Commission applyProRation(Integer commissionId, BigDecimal proRationPercentage) {
        Commission commission = commissionRepository.findById(commissionId);
        if (commission == null) {
            throw new IllegalArgumentException("Commission not found with ID: " + commissionId);
        }
        
        if (proRationPercentage.compareTo(BigDecimal.ZERO) < 0 || proRationPercentage.compareTo(new BigDecimal("100")) > 0) {
            throw new IllegalArgumentException("Pro-ration percentage must be between 0 and 100");
        }
        
        BigDecimal proRatedAmount = commission.getOriginalAmount()
                .multiply(proRationPercentage)
                .divide(new BigDecimal("100"), 2, java.math.RoundingMode.HALF_UP);
        
        commission.setAmount(proRatedAmount);
        commission.setProRationPercentage(proRationPercentage);
        calculateTaxAndNetAmount(commission);
        commission.setStatus(Commission.CommissionStatus.PRO_RATED);
        
        return commissionRepository.save(commission);
    }

    public BigDecimal getAiEngineerEarnings(Integer aiEngineerId, String cycleMonth) {
        return commissionRepository.sumByAiEngineerAndCycleMonth(aiEngineerId, cycleMonth);
    }

    public BigDecimal getTotalAiEngineerEarnings(Integer aiEngineerId) {
        return commissionRepository.sumByAiEngineer(aiEngineerId);
    }

    private void validateCommission(Commission commission) {
        if (commission.getAiEngineer() == null) {
            throw new IllegalArgumentException("AI Engineer is required");
        }
        if (commission.getType() == null) {
            throw new IllegalArgumentException("Commission type is required");
        }
        if (commission.getAmount() == null || commission.getAmount().compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Commission amount must be positive");
        }
        if (commission.getCommissionDate() == null) {
            throw new IllegalArgumentException("Commission date is required");
        }
        if (commission.getCycleMonth() == null) {
            throw new IllegalArgumentException("Cycle month is required");
        }
    }

    private void calculateTaxAndNetAmount(Commission commission) {
        BigDecimal taxRate = commission.getTdsRate() != null ? commission.getTdsRate() : BigDecimal.ZERO;
        BigDecimal taxAmount = commission.getAmount()
                .multiply(taxRate)
                .divide(new BigDecimal("100"), 2, java.math.RoundingMode.HALF_UP);
        
        commission.setTaxAmount(taxAmount);
        commission.setNetAmount(commission.getAmount().subtract(taxAmount));
    }
}
