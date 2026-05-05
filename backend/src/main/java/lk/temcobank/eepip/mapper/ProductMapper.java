package lk.temcobank.eepip.mapper;

import lk.temcobank.eepip.dto.ProductDTO;
import lk.temcobank.eepip.entity.Product;

/**
 * Product Mapper - Maps between Product entity and ProductDTO.
 */
public class ProductMapper {

    public static ProductDTO toDTO(Product product) {
        if (product == null) {
            return null;
        }
        return new ProductDTO(product);
    }

    public static Product toEntity(ProductDTO dto) {
        if (dto == null) {
            return null;
        }
        Product product = new Product();
        product.setId(dto.getId());
        product.setProductCode(dto.getProductCode());
        product.setProductName(dto.getProductName());
        product.setInvestmentAmount(dto.getInvestmentAmount());
        product.setCurrency(dto.getCurrency());
        product.setDirectSponsorRate(dto.getDirectSponsorRate());
        product.setBinaryPoolRate(dto.getBinaryPoolRate());
        product.setMatchingBonusRate(dto.getMatchingBonusRate());
        product.setLeadershipPoolRate(dto.getLeadershipPoolRate());
        product.setAgentDirectRate(dto.getAgentDirectRate());
        product.setAgentPoolRate(dto.getAgentPoolRate());
        product.setBankMarginRate(dto.getBankMarginRate());
        product.setMaxBinaryPairsPerMonth(dto.getMaxBinaryPairsPerMonth());
        product.setMaxAgentPairsPerMonth(dto.getMaxAgentPairsPerMonth());
        product.setStatus(dto.getStatus());
        product.setEffectiveFrom(dto.getEffectiveFrom());
        product.setEffectiveTo(dto.getEffectiveTo());
        product.setIsActive(dto.getIsActive());
        return product;
    }
}
