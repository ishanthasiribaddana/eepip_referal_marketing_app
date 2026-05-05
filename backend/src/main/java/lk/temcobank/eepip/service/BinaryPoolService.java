package lk.temcobank.eepip.service;

import lk.temcobank.eepip.entity.BinaryPool;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.YearMonth;

/**
 * BinaryPool Service - Business logic for BinaryPool entity.
 */
@Stateless
public class BinaryPoolService {

    @EJB
    private lk.temcobank.eepip.repository.BinaryPoolRepository binaryPoolRepository;

    @EJB
    private ProductService productService;

    public BinaryPool findById(Integer id) {
        return binaryPoolRepository.findById(id);
    }

    public BinaryPool findByCycleMonth(String cycleMonth) {
        return binaryPoolRepository.findByCycleMonth(cycleMonth);
    }

    public java.util.List<BinaryPool> findAll() {
        return binaryPoolRepository.findAll();
    }

    public BinaryPool createOrGetBinaryPool(String cycleMonth) {
        BinaryPool pool = binaryPoolRepository.findByCycleMonth(cycleMonth);
        if (pool == null) {
            pool = createBinaryPool(cycleMonth);
        }
        return pool;
    }

    public BinaryPool createBinaryPool(String cycleMonth) {
        if (binaryPoolRepository.findByCycleMonth(cycleMonth) != null) {
            throw new IllegalArgumentException("Binary pool already exists for cycle: " + cycleMonth);
        }

        BinaryPool pool = new BinaryPool(cycleMonth);
        pool.setEnrollmentsThisMonth(0);
        pool.setPoolAmount(BigDecimal.ZERO);
        pool.setCarryForwardFromLast(BigDecimal.ZERO);
        pool.setTotalClaims(BigDecimal.ZERO);
        pool.setProRationTriggered(false);
        pool.setProRationPercentage(new BigDecimal("100.00"));
        pool.setSurplus(BigDecimal.ZERO);
        pool.setUtilization(BigDecimal.ZERO);
        pool.setCalculatedAt(java.time.LocalDateTime.now());

        return binaryPoolRepository.save(pool);
    }

    public BinaryPool updateBinaryPool(String cycleMonth, Integer enrollmentsCount, BigDecimal poolAmount) {
        BinaryPool pool = binaryPoolRepository.findByCycleMonth(cycleMonth);
        if (pool == null) {
            throw new IllegalArgumentException("Binary pool not found for cycle: " + cycleMonth);
        }

        pool.setEnrollmentsThisMonth(enrollmentsCount);
        pool.setPoolAmount(poolAmount);
        pool.setCalculatedAt(java.time.LocalDateTime.now());

        return binaryPoolRepository.save(pool);
    }

    public BinaryPool addClaim(String cycleMonth, BigDecimal claimAmount) {
        BinaryPool pool = binaryPoolRepository.findByCycleMonth(cycleMonth);
        if (pool == null) {
            throw new IllegalArgumentException("Binary pool not found for cycle: " + cycleMonth);
        }

        BigDecimal newTotalClaims = pool.getTotalClaims().add(claimAmount);
        BigDecimal utilization = newTotalClaims.multiply(new BigDecimal("100"))
                .divide(pool.getPoolAmount(), 2, java.math.RoundingMode.HALF_UP);

        pool.setTotalClaims(newTotalClaims);
        pool.setUtilization(utilization);
        pool.setCalculatedAt(java.time.LocalDateTime.now());

        return binaryPoolRepository.save(pool);
    }

    public BinaryPool applyProRation(String cycleMonth, BigDecimal proRationPercentage) {
        BinaryPool pool = binaryPoolRepository.findByCycleMonth(cycleMonth);
        if (pool == null) {
            throw new IllegalArgumentException("Binary pool not found for cycle: " + cycleMonth);
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

        return binaryPoolRepository.save(pool);
    }

    public BinaryPool carryForwardToNextCycle(String currentCycle, String nextCycle) {
        BinaryPool currentPool = binaryPoolRepository.findByCycleMonth(currentCycle);
        if (currentPool == null) {
            throw new IllegalArgumentException("Binary pool not found for cycle: " + currentCycle);
        }

        BigDecimal surplus = currentPool.getSurplus();
        if (surplus.compareTo(BigDecimal.ZERO) > 0) {
            BinaryPool nextPool = binaryPoolRepository.findByCycleMonth(nextCycle);
            if (nextPool == null) {
                nextPool = createBinaryPool(nextCycle);
            }

            BigDecimal newCarryForward = nextPool.getCarryForwardFromLast().add(surplus);
            BigDecimal newPoolAmount = nextPool.getPoolAmount().add(surplus);

            nextPool.setCarryForwardFromLast(newCarryForward);
            nextPool.setPoolAmount(newPoolAmount);
            nextPool.setCalculatedAt(java.time.LocalDateTime.now());

            binaryPoolRepository.save(nextPool);
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
