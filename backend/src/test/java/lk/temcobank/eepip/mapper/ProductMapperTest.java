package lk.temcobank.eepip.mapper;

import lk.temcobank.eepip.dto.ProductDTO;
import lk.temcobank.eepip.entity.Product;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

public class ProductMapperTest {

    @Test
    public void testToDTO() {
        Product product = createTestProduct();
        ProductDTO dto = ProductMapper.toDTO(product);
        
        assertNotNull(dto);
        assertEquals(product.getId(), dto.getId());
        assertEquals(product.getProductCode(), dto.getProductCode());
        assertEquals(product.getProductName(), dto.getProductName());
        assertEquals(product.getInvestmentAmount(), dto.getInvestmentAmount());
        assertEquals(product.getCurrency(), dto.getCurrency());
        assertEquals(product.getDirectSponsorRate(), dto.getDirectSponsorRate());
    }

    @Test
    public void testToDTO_Null() {
        ProductDTO dto = ProductMapper.toDTO(null);
        assertNull(dto);
    }

    @Test
    public void testToEntity() {
        ProductDTO dto = createTestProductDTO();
        Product product = ProductMapper.toEntity(dto);
        
        assertNotNull(product);
        assertEquals(dto.getId(), product.getId());
        assertEquals(dto.getProductCode(), product.getProductCode());
        assertEquals(dto.getProductName(), product.getProductName());
        assertEquals(dto.getInvestmentAmount(), product.getInvestmentAmount());
        assertEquals(dto.getCurrency(), product.getCurrency());
        assertEquals(dto.getDirectSponsorRate(), product.getDirectSponsorRate());
    }

    @Test
    public void testToEntity_Null() {
        Product product = ProductMapper.toEntity(null);
        assertNull(product);
    }

    private Product createTestProduct() {
        Product product = new Product();
        product.setId(1);
        product.setProductCode("TEST-001");
        product.setProductName("Test Product");
        product.setInvestmentAmount(new BigDecimal("1800000.00"));
        product.setCurrency("LKR");
        product.setDirectSponsorRate(new BigDecimal("2.00"));
        product.setBinaryPoolRate(new BigDecimal("5.00"));
        product.setMatchingBonusRate(new BigDecimal("1.50"));
        product.setLeadershipPoolRate(new BigDecimal("1.50"));
        product.setAgentDirectRate(new BigDecimal("2.00"));
        product.setAgentPoolRate(new BigDecimal("3.00"));
        product.setBankMarginRate(new BigDecimal("6.00"));
        product.setMaxBinaryPairsPerMonth(3);
        product.setMaxAgentPairsPerMonth(2);
        product.setStatus("ACTIVE");
        product.setEffectiveFrom(LocalDate.now());
        product.setIsActive(true);
        return product;
    }

    private ProductDTO createTestProductDTO() {
        ProductDTO dto = new ProductDTO();
        dto.setId(1);
        dto.setProductCode("TEST-001");
        dto.setProductName("Test Product");
        dto.setInvestmentAmount(new BigDecimal("1800000.00"));
        dto.setCurrency("LKR");
        dto.setDirectSponsorRate(new BigDecimal("2.00"));
        dto.setBinaryPoolRate(new BigDecimal("5.00"));
        dto.setMatchingBonusRate(new BigDecimal("1.50"));
        dto.setLeadershipPoolRate(new BigDecimal("1.50"));
        dto.setAgentDirectRate(new BigDecimal("2.00"));
        dto.setAgentPoolRate(new BigDecimal("3.00"));
        dto.setBankMarginRate(new BigDecimal("6.00"));
        dto.setMaxBinaryPairsPerMonth(3);
        dto.setMaxAgentPairsPerMonth(2);
        dto.setStatus("ACTIVE");
        dto.setEffectiveFrom(LocalDate.now());
        dto.setIsActive(true);
        return dto;
    }
}
