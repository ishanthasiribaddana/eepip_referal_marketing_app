package lk.temcobank.eepip.mapper;

import lk.temcobank.eepip.dto.AiEngineerDTO;
import lk.temcobank.eepip.entity.AiEngineer;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

public class AiEngineerMapperTest {

    @Test
    public void testToDTO() {
        AiEngineer engineer = createTestAiEngineer();
        AiEngineerDTO dto = AiEngineerMapper.toDTO(engineer);
        
        assertNotNull(dto);
        assertEquals(engineer.getId(), dto.getId());
        assertEquals(engineer.getMemberId(), dto.getMemberId());
        assertEquals(engineer.getSponsorId(), dto.getSponsorId());
        assertEquals(engineer.getParentId(), dto.getParentId());
        assertEquals(engineer.getPosition(), dto.getPosition());
        assertEquals(engineer.getTreeLevel(), dto.getTreeLevel());
        assertEquals(engineer.getMemberState(), dto.getMemberState());
        assertEquals(engineer.getLeftBv(), dto.getLeftBv());
        assertEquals(engineer.getRightBv(), dto.getRightBv());
    }

    @Test
    public void testToDTO_Null() {
        AiEngineerDTO dto = AiEngineerMapper.toDTO(null);
        assertNull(dto);
    }

    @Test
    public void testToEntity() {
        AiEngineerDTO dto = createTestAiEngineerDTO();
        AiEngineer engineer = AiEngineerMapper.toEntity(dto);
        
        assertNotNull(engineer);
        assertEquals(dto.getId(), engineer.getId());
        assertEquals(dto.getMemberId(), engineer.getMemberId());
        assertEquals(dto.getSponsorId(), engineer.getSponsorId());
        assertEquals(dto.getParentId(), engineer.getParentId());
        assertEquals(dto.getPosition(), engineer.getPosition());
        assertEquals(dto.getTreeLevel(), engineer.getTreeLevel());
        assertEquals(dto.getMemberState(), engineer.getMemberState());
        assertEquals(dto.getLeftBv(), engineer.getLeftBv());
        assertEquals(dto.getRightBv(), engineer.getRightBv());
    }

    @Test
    public void testToEntity_Null() {
        AiEngineer engineer = AiEngineerMapper.toEntity(null);
        assertNull(engineer);
    }

    private AiEngineer createTestAiEngineer() {
        AiEngineer engineer = new AiEngineer();
        engineer.setId(1);
        engineer.setMemberId(100);
        engineer.setSponsorId(50);
        engineer.setParentId(50);
        engineer.setPosition(AiEngineer.TreePosition.LEFT);
        engineer.setTreeLevel(1);
        engineer.setTreePath("/50/1");
        engineer.setMemberState(AiEngineer.MemberState.ENROLLED);
        engineer.setAcademicEligibilityVerified(true);
        engineer.setEnrollmentDate(LocalDate.now());
        engineer.setExpectedGraduation(LocalDate.now().plusYears(4));
        engineer.setInvestmentDate(LocalDate.now());
        engineer.setBankReference("BANK-001");
        engineer.setActivationDate(LocalDate.now());
        engineer.setBscStartDate(LocalDate.now());
        engineer.setBscEndDate(LocalDate.now().plusYears(3));
        engineer.setMphilStartDate(LocalDate.now().plusYears(3));
        engineer.setMphilEndDate(LocalDate.now().plusYears(5));
        engineer.setLeftBv(1000);
        engineer.setRightBv(1500);
        engineer.setCarryForwardLeftBv(200);
        engineer.setCarryForwardRightBv(300);
        engineer.setRankCode(AiEngineer.Rank.BRONZE);
        engineer.setTotalEarnings(new BigDecimal("50000.00"));
        engineer.setMonthlyEarnings(new BigDecimal("10000.00"));
        engineer.setTeamSize(10);
        engineer.setDirectRecruits(3);
        engineer.setDirectRecruitsLeft(2);
        engineer.setDirectRecruitsRight(1);
        engineer.setPositionsHeld(1);
        engineer.setIsActive(true);
        return engineer;
    }

    private AiEngineerDTO createTestAiEngineerDTO() {
        AiEngineerDTO dto = new AiEngineerDTO();
        dto.setId(1);
        dto.setMemberId(100);
        dto.setSponsorId(50);
        dto.setParentId(50);
        dto.setPosition(AiEngineer.TreePosition.LEFT);
        dto.setTreeLevel(1);
        dto.setTreePath("/50/1");
        dto.setMemberState(AiEngineer.MemberState.ENROLLED);
        dto.setAcademicEligibilityVerified(true);
        dto.setEnrollmentDate(LocalDate.now());
        dto.setExpectedGraduation(LocalDate.now().plusYears(4));
        dto.setInvestmentDate(LocalDate.now());
        dto.setBankReference("BANK-001");
        dto.setActivationDate(LocalDate.now());
        dto.setBscStartDate(LocalDate.now());
        dto.setBscEndDate(LocalDate.now().plusYears(3));
        dto.setMphilStartDate(LocalDate.now().plusYears(3));
        dto.setMphilEndDate(LocalDate.now().plusYears(5));
        dto.setLeftBv(1000);
        dto.setRightBv(1500);
        dto.setCarryForwardLeftBv(200);
        dto.setCarryForwardRightBv(300);
        dto.setRankCode(AiEngineer.Rank.BRONZE);
        dto.setTotalEarnings(new BigDecimal("50000.00"));
        dto.setMonthlyEarnings(new BigDecimal("10000.00"));
        dto.setTeamSize(10);
        dto.setDirectRecruits(3);
        dto.setDirectRecruitsLeft(2);
        dto.setDirectRecruitsRight(1);
        dto.setPositionsHeld(1);
        dto.setIsActive(true);
        return dto;
    }
}
