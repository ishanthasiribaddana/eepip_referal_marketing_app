package lk.temcobank.eepip.service;

import lk.temcobank.eepip.entity.AgentBinaryPool;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import java.math.BigDecimal;
import java.time.YearMonth;

/**
 * AgentBinaryPool Service - Business logic for AgentBinaryPool entity.
 */
@Stateless
public class AgentBinaryPoolService {

    @EJB
    private lk.temcobank.eepip.repository.AgentBinaryPoolRepository agentBinaryPoolRepository;

    public AgentBinaryPool findById(Integer id) {
        return agentBinaryPoolRepository.findById(id);
    }

    public AgentBinaryPool findByCycleMonth(String cycleMonth) {
        return agentBinaryPoolRepository.findByCycleMonth(cycleMonth);
    }

    public java.util.List<AgentBinaryPool> findAll() {
        return agentBinaryPoolRepository.findAll();
    }

    public AgentBinaryPool createOrGetAgentBinaryPool(String cycleMonth) {
        AgentBinaryPool pool = agentBinaryPoolRepository.findByCycleMonth(cycleMonth);
        if (pool == null) {
            pool = createAgentBinaryPool(cycleMonth);
        }
        return pool;
    }

    public AgentBinaryPool createAgentBinaryPool(String cycleMonth) {
        if (agentBinaryPoolRepository.findByCycleMonth(cycleMonth) != null) {
            throw new IllegalArgumentException("Agent binary pool already exists for cycle: " + cycleMonth);
        }

        AgentBinaryPool pool = new AgentBinaryPool(cycleMonth);
        pool.setEnrollmentsThisMonth(0);
        pool.setPoolAmount(BigDecimal.ZERO);
        pool.setCarryForwardFromLast(BigDecimal.ZERO);
        pool.setTotalClaims(BigDecimal.ZERO);
        pool.setProRationTriggered(false);
        pool.setProRationPercentage(new BigDecimal("100.00"));
        pool.setSurplus(BigDecimal.ZERO);
        pool.setCalculatedAt(java.time.LocalDateTime.now());

        return agentBinaryPoolRepository.save(pool);
    }

    public AgentBinaryPool updateAgentBinaryPool(String cycleMonth, Integer enrollmentsCount, BigDecimal poolAmount) {
        AgentBinaryPool pool = agentBinaryPoolRepository.findByCycleMonth(cycleMonth);
        if (pool == null) {
            throw new IllegalArgumentException("Agent binary pool not found for cycle: " + cycleMonth);
        }

        pool.setEnrollmentsThisMonth(enrollmentsCount);
        pool.setPoolAmount(poolAmount);
        pool.setCalculatedAt(java.time.LocalDateTime.now());

        return agentBinaryPoolRepository.save(pool);
    }

    public AgentBinaryPool addClaim(String cycleMonth, BigDecimal claimAmount) {
        AgentBinaryPool pool = agentBinaryPoolRepository.findByCycleMonth(cycleMonth);
        if (pool == null) {
            throw new IllegalArgumentException("Agent binary pool not found for cycle: " + cycleMonth);
        }

        BigDecimal newTotalClaims = pool.getTotalClaims().add(claimAmount);

        pool.setTotalClaims(newTotalClaims);
        pool.setCalculatedAt(java.time.LocalDateTime.now());

        return agentBinaryPoolRepository.save(pool);
    }

    public AgentBinaryPool applyProRation(String cycleMonth, BigDecimal proRationPercentage) {
        AgentBinaryPool pool = agentBinaryPoolRepository.findByCycleMonth(cycleMonth);
        if (pool == null) {
            throw new IllegalArgumentException("Agent binary pool not found for cycle: " + cycleMonth);
        }

        if (proRationPercentage.compareTo(BigDecimal.ZERO) < 0 || proRationPercentage.compareTo(new BigDecimal("100")) > 0) {
            throw new IllegalArgumentException("Pro-ration percentage must be between 0 and 100");
        }

        pool.setProRationTriggered(true);
        pool.setProRationPercentage(proRationPercentage);

        BigDecimal surplus = pool.getPoolAmount()
                .subtract(pool.getTotalClaims())
                .multiply(new BigDecimal("100").subtract(proRationPercentage))
                .divide(new BigDecimal("100"), 2, java.math.RoundingMode.HALF_UP);

        pool.setSurplus(surplus);
        pool.setCalculatedAt(java.time.LocalDateTime.now());

        return agentBinaryPoolRepository.save(pool);
    }

    public AgentBinaryPool carryForwardToNextCycle(String currentCycle, String nextCycle) {
        AgentBinaryPool currentPool = agentBinaryPoolRepository.findByCycleMonth(currentCycle);
        if (currentPool == null) {
            throw new IllegalArgumentException("Agent binary pool not found for cycle: " + currentCycle);
        }

        BigDecimal surplus = currentPool.getSurplus();
        if (surplus.compareTo(BigDecimal.ZERO) > 0) {
            AgentBinaryPool nextPool = agentBinaryPoolRepository.findByCycleMonth(nextCycle);
            if (nextPool == null) {
                nextPool = createAgentBinaryPool(nextCycle);
            }

            BigDecimal newCarryForward = nextPool.getCarryForwardFromLast().add(surplus);
            BigDecimal newPoolAmount = nextPool.getPoolAmount().add(surplus);

            nextPool.setCarryForwardFromLast(newCarryForward);
            nextPool.setPoolAmount(newPoolAmount);
            nextPool.setCalculatedAt(java.time.LocalDateTime.now());

            agentBinaryPoolRepository.save(nextPool);
        }

        return currentPool;
    }

    public String getCurrentCycleMonth() {
        YearMonth currentYearMonth = YearMonth.now();
        return currentYearMonth.toString();
    }

    public String getPreviousCycleMonth() {
        YearMonth previousYearMonth = YearMonth.now().minusMonths(1);
        return previousYearMonth.toString();
    }
}
