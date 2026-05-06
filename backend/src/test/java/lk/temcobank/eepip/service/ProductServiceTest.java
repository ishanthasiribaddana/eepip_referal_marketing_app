package lk.temcobank.eepip.service;

import lk.temcobank.eepip.entity.Product;
import lk.temcobank.eepip.repository.ProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductService productService;

    private Product testProduct;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        testProduct = createTestProduct();
    }

    @Test
    public void testFindById() {
        when(productRepository.findById(1)).thenReturn(testProduct);
        
        Product result = productService.findById(1);
        
        assertNotNull(result);
        assertEquals(testProduct.getId(), result.getId());
        assertEquals(testProduct.getProductCode(), result.getProductCode());
        verify(productRepository, times(1)).findById(1);
    }

    @Test
    public void testFindByProductCode() {
        when(productRepository.findByProductCode("TEST-001")).thenReturn(testProduct);
        
        Product result = productService.findByProductCode("TEST-001");
        
        assertNotNull(result);
        assertEquals(testProduct.getProductCode(), result.getProductCode());
        verify(productRepository, times(1)).findByProductCode("TEST-001");
    }

    @Test
    public void testFindAll() {
        List<Product> products = Arrays.asList(testProduct);
        when(productRepository.findAll()).thenReturn(products);
        
        List<Product> result = productService.findAll();
        
        assertNotNull(result);
        assertEquals(1, result.size());
        verify(productRepository, times(1)).findAll();
    }

    @Test
    public void testFindActiveProducts() {
        List<Product> products = Arrays.asList(testProduct);
        when(productRepository.findActiveProducts()).thenReturn(products);
        
        List<Product> result = productService.findActiveProducts();
        
        assertNotNull(result);
        assertEquals(1, result.size());
        verify(productRepository, times(1)).findActiveProducts();
    }

    @Test
    public void testGetActiveProductForDate() {
        List<Product> products = Arrays.asList(testProduct);
        when(productRepository.findActiveProductsForDate(LocalDate.now())).thenReturn(products);
        
        Product result = productService.getActiveProductForDate(LocalDate.now());
        
        assertNotNull(result);
        assertEquals(testProduct.getId(), result.getId());
        verify(productRepository, times(1)).findActiveProductsForDate(LocalDate.now());
    }

    @Test
    public void testGetActiveProductForDate_NoProducts() {
        when(productRepository.findActiveProductsForDate(LocalDate.now())).thenReturn(Collections.emptyList());
        
        Product result = productService.getActiveProductForDate(LocalDate.now());
        
        assertNull(result);
        verify(productRepository, times(1)).findActiveProductsForDate(LocalDate.now());
    }

    @Test
    public void testCreateProduct() {
        when(productRepository.save(any(Product.class))).thenReturn(testProduct);
        
        Product result = productService.createProduct(testProduct);
        
        assertNotNull(result);
        assertEquals(testProduct.getProductCode(), result.getProductCode());
        verify(productRepository, times(1)).save(any(Product.class));
    }

    @Test
    public void testCreateProduct_InvalidCode() {
        testProduct.setProductCode(null);
        
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            productService.createProduct(testProduct);
        });
        
        assertEquals("Product code is required", exception.getMessage());
        verify(productRepository, never()).save(any(Product.class));
    }

    @Test
    public void testCreateProduct_InvalidInvestmentAmount() {
        testProduct.setInvestmentAmount(BigDecimal.ZERO);
        
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            productService.createProduct(testProduct);
        });
        
        assertEquals("Investment amount must be positive", exception.getMessage());
        verify(productRepository, never()).save(any(Product.class));
    }

    @Test
    public void testCreateProduct_InvalidEffectiveFrom() {
        testProduct.setEffectiveFrom(null);
        
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            productService.createProduct(testProduct);
        });
        
        assertEquals("Effective from date is required", exception.getMessage());
        verify(productRepository, never()).save(any(Product.class));
    }

    @Test
    public void testCreateProduct_InvalidEffectiveTo() {
        testProduct.setEffectiveTo(LocalDate.now().minusDays(1));
        
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            productService.createProduct(testProduct);
        });
        
        assertEquals("Effective to date must be after effective from date", exception.getMessage());
        verify(productRepository, never()).save(any(Product.class));
    }

    @Test
    public void testUpdateProduct() {
        testProduct.setId(1);
        when(productRepository.save(any(Product.class))).thenReturn(testProduct);
        
        Product result = productService.updateProduct(testProduct);
        
        assertNotNull(result);
        assertEquals(testProduct.getId(), result.getId());
        verify(productRepository, times(1)).save(any(Product.class));
    }

    @Test
    public void testUpdateProduct_NoId() {
        testProduct.setId(null);
        
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            productService.updateProduct(testProduct);
        });
        
        assertEquals("Product ID is required for update", exception.getMessage());
        verify(productRepository, never()).save(any(Product.class));
    }

    @Test
    public void testDeleteProduct() {
        when(productRepository.findById(1)).thenReturn(testProduct);
        doNothing().when(productRepository).delete(any(Product.class));
        
        productService.deleteProduct(1);
        
        verify(productRepository, times(1)).findById(1);
        verify(productRepository, times(1)).delete(testProduct);
    }

    @Test
    public void testDeleteProduct_NotFound() {
        when(productRepository.findById(999)).thenReturn(null);
        
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            productService.deleteProduct(999);
        });
        
        assertEquals("Product not found with ID: 999", exception.getMessage());
        verify(productRepository, times(1)).findById(999);
        verify(productRepository, never()).delete(any(Product.class));
    }

    @Test
    public void testSoftDeleteProduct() {
        when(productRepository.findById(1)).thenReturn(testProduct);
        doNothing().when(productRepository).softDelete(any(Product.class));
        
        productService.softDeleteProduct(1);
        
        verify(productRepository, times(1)).findById(1);
        verify(productRepository, times(1)).softDelete(testProduct);
    }

    @Test
    public void testSoftDeleteProduct_NotFound() {
        when(productRepository.findById(999)).thenReturn(null);
        
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            productService.softDeleteProduct(999);
        });
        
        assertEquals("Product not found with ID: 999", exception.getMessage());
        verify(productRepository, times(1)).findById(999);
        verify(productRepository, never()).softDelete(any(Product.class));
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
        product.setStatus(Product.ProductStatus.ACTIVE);
        product.setEffectiveFrom(LocalDate.now());
        product.setEffectiveTo(LocalDate.now().plusYears(5));
        product.setIsActive(true);
        return product;
    }
}
