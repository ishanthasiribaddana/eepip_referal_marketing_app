package lk.temcobank.eepip.mapper;

import lk.temcobank.eepip.dto.CommissionDTO;
import lk.temcobank.eepip.entity.Commission;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

public class CommissionMapperTest {

    @Test
    public void testToDTO() {
        Commission commission = createTestCommission();
        CommissionDTO dto = CommissionMapper.toDTO(commission);
        
        assertNotNull(dto);
        assertEquals(commission.getId(), dto.getId());
        assertEquals(commission.getType(), dto.getType());
        assertEquals(commission.getAmount(), dto.getAmount());
        assertEquals(commission.getOriginalAmount(), dto.getOriginalAmount());
        assertEquals(commission.getTaxAmount(), dto.getTaxAmount());
        assertEquals(commission.getNetAmount(), dto.getNetAmount());
        assertEquals(commission.getStatus(), dto.getStatus());
    }

    @Test
    public void testToDTO_Null() {
        CommissionDTO dto = CommissionMapper.toDTO(null);
        assertNull(dto);
    }

    @Test
    public void testToEntity() {
        CommissionDTO dto = createTestCommissionDTO();
        Commission commission = CommissionMapper.toEntity(dto);
        
        assertNotNull(commission);
        assertEquals(dto.getId(), commission.getId());
        assertEquals(dto.getType(), commission.getType());
        assertEquals(dto.getAmount(), commission.getAmount());
        assertEquals(dto.getOriginalAmount(), commission.getOriginalAmount());
        assertEquals(dto.getTaxAmount(), commission.getTaxAmount());
        assertEquals(dto.getNetAmount(), commission.getNetAmount());
        assertEquals(dto.getStatus(), commission.getStatus());
    }

    @Test
    public void testToEntity_Null() {
        Commission commission = CommissionMapper.toEntity(null);
        assertNull(commission);
    }

    private Commission createTestCommission() {
        Commission commission = new Commission();
        commission.setId(1);
        commission.setAiEngineer(null);
        commission.setType(Commission.CommissionType.DIRECT_SPONSOR);
        commission.setAmount(new BigDecimal("36000.00"));
        commission.setOriginalAmount(new BigDecimal("36000.00"));
        commission.setTaxAmount(BigDecimal.ZERO);
        commission.setNetAmount(new BigDecimal("36000.00"));
        commission.setTdsRate(BigDecimal.ZERO);
        commission.setCurrency("LKR");
        commission.setProRationPercentage(new BigDecimal("100.00"));
        commission.setDescription("Direct sponsor commission");
        commission.setTransactionId("TXN-001");
        commission.setCommissionDate(LocalDate.now());
        commission.setStatus(Commission.CommissionStatus.PENDING);
        commission.setApprovedBy(null);
        commission.setApprovedAt(null);
        commission.setRejectionReason(null);
        commission.setPaidDate(null);
        commission.setCycleMonth("2026-05");
        commission.setMetadataJson("{}");
        return commission;
    }

    private CommissionDTO createTestCommissionDTO() {
        CommissionDTO dto = new CommissionDTO();
        dto.setId(1);
        dto.setAiEngineerId(100);
        dto.setType(Commission.CommissionType.DIRECT_SPONSOR);
        dto.setAmount(new BigDecimal("36000.00"));
        dto.setOriginalAmount(new BigDecimal("36000.00"));
        dto.setTaxAmount(BigDecimal.ZERO);
        dto.setNetAmount(new BigDecimal("36000.00"));
        dto.setTdsRate(BigDecimal.ZERO);
        dto.setCurrency("LKR");
        dto.setProRationPercentage(new BigDecimal("100.00"));
        dto.setDescription("Direct sponsor commission");
        dto.setTransactionId("TXN-001");
        dto.setCommissionDate(LocalDate.now());
        dto.setStatus(Commission.CommissionStatus.PENDING);
        dto.setApprovedBy(null);
        dto.setApprovedAt(null);
        dto.setRejectionReason(null);
        dto.setPaidDate(null);
        dto.setCycleMonth("2026-05");
        dto.setMetadataJson("{}");
        return dto;
    }
}
