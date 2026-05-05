package lk.temcobank.eepip.mapper;

import lk.temcobank.eepip.dto.AiEngineerDTO;
import lk.temcobank.eepip.entity.AiEngineer;

/**
 * AI Engineer Mapper - Maps between AiEngineer entity and AiEngineerDTO.
 */
public class AiEngineerMapper {

    public static AiEngineerDTO toDTO(AiEngineer engineer) {
        if (engineer == null) {
            return null;
        }
        return new AiEngineerDTO(engineer);
    }

    public static AiEngineer toEntity(AiEngineerDTO dto) {
        if (dto == null) {
            return null;
        }
        AiEngineer engineer = new AiEngineer();
        engineer.setId(dto.getId());
        engineer.setMemberId(dto.getMemberId());
        engineer.setSponsorId(dto.getSponsorId());
        engineer.setParentId(dto.getParentId());
        engineer.setPosition(dto.getPosition());
        engineer.setTreeLevel(dto.getTreeLevel());
        engineer.setTreePath(dto.getTreePath());
        engineer.setMemberState(dto.getMemberState());
        engineer.setAcademicEligibilityVerified(dto.getAcademicEligibilityVerified());
        engineer.setEnrollmentDate(dto.getEnrollmentDate());
        engineer.setExpectedGraduation(dto.getExpectedGraduation());
        engineer.setInvestmentDate(dto.getInvestmentDate());
        engineer.setBankReference(dto.getBankReference());
        engineer.setActivationDate(dto.getActivationDate());
        engineer.setBscStartDate(dto.getBscStartDate());
        engineer.setBscEndDate(dto.getBscEndDate());
        engineer.setMphilStartDate(dto.getMphilStartDate());
        engineer.setMphilEndDate(dto.getMphilEndDate());
        engineer.setLeftBv(dto.getLeftBv());
        engineer.setRightBv(dto.getRightBv());
        engineer.setCarryForwardLeftBv(dto.getCarryForwardLeftBv());
        engineer.setCarryForwardRightBv(dto.getCarryForwardRightBv());
        engineer.setRankCode(dto.getRankCode());
        engineer.setTotalEarnings(dto.getTotalEarnings());
        engineer.setMonthlyEarnings(dto.getMonthlyEarnings());
        engineer.setTeamSize(dto.getTeamSize());
        engineer.setDirectRecruits(dto.getDirectRecruits());
        engineer.setDirectRecruitsLeft(dto.getDirectRecruitsLeft());
        engineer.setDirectRecruitsRight(dto.getDirectRecruitsRight());
        engineer.setPositionsHeld(dto.getPositionsHeld());
        engineer.setIsActive(dto.getIsActive());
        return engineer;
    }
}
