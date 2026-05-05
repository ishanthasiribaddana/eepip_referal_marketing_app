package lk.temcobank.eepip.mapper;

import lk.temcobank.eepip.dto.CommissionDTO;
import lk.temcobank.eepip.entity.Commission;

/**
 * Commission Mapper - Maps between Commission entity and CommissionDTO.
 */
public class CommissionMapper {

    public static CommissionDTO toDTO(Commission commission) {
        if (commission == null) {
            return null;
        }
        return new CommissionDTO(commission);
    }

    public static Commission toEntity(CommissionDTO dto) {
        if (dto == null) {
            return null;
        }
        Commission commission = new Commission();
        commission.setId(dto.getId());
        commission.setType(dto.getType());
        commission.setAmount(dto.getAmount());
        commission.setOriginalAmount(dto.getOriginalAmount());
        commission.setTaxAmount(dto.getTaxAmount());
        commission.setNetAmount(dto.getNetAmount());
        commission.setTdsRate(dto.getTdsRate());
        commission.setCurrency(dto.getCurrency());
        commission.setProRationPercentage(dto.getProRationPercentage());
        commission.setDescription(dto.getDescription());
        commission.setTransactionId(dto.getTransactionId());
        commission.setCommissionDate(dto.getCommissionDate());
        commission.setStatus(dto.getStatus());
        commission.setApprovedBy(dto.getApprovedBy());
        commission.setApprovedAt(dto.getApprovedAt());
        commission.setRejectionReason(dto.getRejectionReason());
        commission.setPaidDate(dto.getPaidDate());
        commission.setCycleMonth(dto.getCycleMonth());
        commission.setMetadataJson(dto.getMetadataJson());
        return commission;
    }
}
