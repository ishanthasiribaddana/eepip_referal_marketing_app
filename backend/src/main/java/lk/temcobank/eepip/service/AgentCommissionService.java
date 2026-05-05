package lk.temcobank.eepip.service;

import lk.temcobank.eepip.entity.Agent;
import lk.temcobank.eepip.entity.AgentCommission;
import lk.temcobank.eepip.entity.AiEngineer;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

/**
 * AgentCommission Service - Business logic for AgentCommission entity.
 */
@Stateless
public class AgentCommissionService {

    @EJB
    private lk.temcobank.eepip.repository.AgentCommissionRepository agentCommissionRepository;

    @EJB
    private AgentService agentService;

    public AgentCommission findById(Integer id) {
        return agentCommissionRepository.findById(id);
    }

    public List<AgentCommission> findAll() {
        return agentCommissionRepository.findAll();
    }

    public List<AgentCommission> findByAgent(Agent agent) {
        return agentCommissionRepository.findByAgent(agent);
    }

    public List<AgentCommission> findByAgentId(Integer agentId) {
        return agentCommissionRepository.findByAgentId(agentId);
    }

    public List<AgentCommission> findByAiEngineer(AiEngineer aiEngineer) {
        return agentCommissionRepository.findByAiEngineer(aiEngineer);
    }

    public List<AgentCommission> findByType(AgentCommission.AgentCommissionType type) {
        return agentCommissionRepository.findByType(type);
    }

    public List<AgentCommission> findByStatus(AgentCommission.CommissionStatus status) {
        return agentCommissionRepository.findByStatus(status);
    }

    public List<AgentCommission> findByCycleMonth(String cycleMonth) {
        return agentCommissionRepository.findByCycleMonth(cycleMonth);
    }

    public List<AgentCommission> findPendingCommissions() {
        return agentCommissionRepository.findPendingCommissions();
    }

    public AgentCommission createAgentCommission(AgentCommission agentCommission) {
        validateAgentCommission(agentCommission);
        calculateTaxAndNetAmount(agentCommission);
        return agentCommissionRepository.save(agentCommission);
    }

    public AgentCommission approveCommission(Integer commissionId, Integer approvedBy) {
        AgentCommission commission = agentCommissionRepository.findById(commissionId);
        if (commission == null) {
            throw new IllegalArgumentException("Agent Commission not found with ID: " + commissionId);
        }

        if (commission.getStatus() != AgentCommission.CommissionStatus.PENDING) {
            throw new IllegalArgumentException("Commission is not in PENDING status");
        }

        commission.setStatus(AgentCommission.CommissionStatus.APPROVED);

        return agentCommissionRepository.save(commission);
    }

    public AgentCommission rejectCommission(Integer commissionId, Integer approvedBy, String rejectionReason) {
        AgentCommission commission = agentCommissionRepository.findById(commissionId);
        if (commission == null) {
            throw new IllegalArgumentException("Agent Commission not found with ID: " + commissionId);
        }

        if (commission.getStatus() != AgentCommission.CommissionStatus.PENDING) {
            throw new IllegalArgumentException("Commission is not in PENDING status");
        }

        commission.setStatus(AgentCommission.CommissionStatus.REJECTED);

        return agentCommissionRepository.save(commission);
    }

    public AgentCommission markAsPaid(Integer commissionId, LocalDate paidDate) {
        AgentCommission commission = agentCommissionRepository.findById(commissionId);
        if (commission == null) {
            throw new IllegalArgumentException("Agent Commission not found with ID: " + commissionId);
        }

        if (commission.getStatus() != AgentCommission.CommissionStatus.APPROVED) {
            throw new IllegalArgumentException("Commission is not APPROVED");
        }

        commission.setStatus(AgentCommission.CommissionStatus.PAID);
        commission.setPaidDate(paidDate);

        return agentCommissionRepository.save(commission);
    }

    public BigDecimal getAgentEarnings(Integer agentId, String cycleMonth) {
        return agentCommissionRepository.sumByAgentAndCycleMonth(agentId, cycleMonth);
    }

    public BigDecimal getTotalAgentEarnings(Integer agentId) {
        return agentCommissionRepository.sumByAgent(agentId);
    }

    private void validateAgentCommission(AgentCommission agentCommission) {
        if (agentCommission.getAgent() == null) {
            throw new IllegalArgumentException("Agent is required");
        }
        if (agentCommission.getType() == null) {
            throw new IllegalArgumentException("Commission type is required");
        }
        if (agentCommission.getAmount() == null || agentCommission.getAmount().compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Commission amount must be positive");
        }
        if (agentCommission.getCommissionDate() == null) {
            throw new IllegalArgumentException("Commission date is required");
        }
        if (agentCommission.getCycleMonth() == null) {
            throw new IllegalArgumentException("Cycle month is required");
        }
    }

    private void calculateTaxAndNetAmount(AgentCommission agentCommission) {
        BigDecimal taxRate = agentCommission.getTdsRate() != null ? agentCommission.getTdsRate() : BigDecimal.ZERO;
        BigDecimal taxAmount = agentCommission.getAmount()
                .multiply(taxRate)
                .divide(new BigDecimal("100"), 2, java.math.RoundingMode.HALF_UP);

        agentCommission.setTaxAmount(taxAmount);
        agentCommission.setNetAmount(agentCommission.getAmount().subtract(taxAmount));
    }
}
