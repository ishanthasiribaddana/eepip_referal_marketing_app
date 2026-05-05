package lk.temcobank.eepip.service;

import lk.temcobank.eepip.entity.Product;
import lk.temcobank.eepip.repository.ProductRepository;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

/**
 * Product Service - Business logic for Product entity.
 */
@Stateless
public class ProductService {

    @EJB
    private ProductRepository productRepository;

    public Product findById(Integer id) {
        return productRepository.findById(id);
    }

    public Product findByProductCode(String productCode) {
        return productRepository.findByProductCode(productCode);
    }

    public List<Product> findAll() {
        return productRepository.findAll();
    }

    public List<Product> findActiveProducts() {
        return productRepository.findActiveProducts();
    }

    public Product getActiveProductForDate(LocalDate date) {
        List<Product> products = productRepository.findActiveProductsForDate(date);
        return products.isEmpty() ? null : products.get(0);
    }

    public Product createProduct(Product product) {
        validateProduct(product);
        return productRepository.save(product);
    }

    public Product updateProduct(Product product) {
        if (product.getId() == null) {
            throw new IllegalArgumentException("Product ID is required for update");
        }
        validateProduct(product);
        return productRepository.save(product);
    }

    public void deleteProduct(Integer id) {
        Product product = productRepository.findById(id);
        if (product == null) {
            throw new IllegalArgumentException("Product not found with ID: " + id);
        }
        productRepository.delete(product);
    }

    public void softDeleteProduct(Integer id) {
        Product product = productRepository.findById(id);
        if (product == null) {
            throw new IllegalArgumentException("Product not found with ID: " + id);
        }
        productRepository.softDelete(product);
    }

    private void validateProduct(Product product) {
        if (product.getProductCode() == null || product.getProductCode().trim().isEmpty()) {
            throw new IllegalArgumentException("Product code is required");
        }
        if (product.getProductName() == null || product.getProductName().trim().isEmpty()) {
            throw new IllegalArgumentException("Product name is required");
        }
        if (product.getInvestmentAmount() == null || product.getInvestmentAmount().compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Investment amount must be positive");
        }
        if (product.getEffectiveFrom() == null) {
            throw new IllegalArgumentException("Effective from date is required");
        }
        if (product.getEffectiveTo() != null && product.getEffectiveTo().isBefore(product.getEffectiveFrom())) {
            throw new IllegalArgumentException("Effective to date must be after effective from date");
        }
        validateCommissionRates(product);
    }

    private void validateCommissionRates(Product product) {
        if (product.getDirectSponsorRate() == null || product.getDirectSponsorRate().compareTo(BigDecimal.ZERO) < 0) {
            throw new IllegalArgumentException("Direct sponsor rate must be non-negative");
        }
        if (product.getBinaryPoolRate() == null || product.getBinaryPoolRate().compareTo(BigDecimal.ZERO) < 0) {
            throw new IllegalArgumentException("Binary pool rate must be non-negative");
        }
        if (product.getMatchingBonusRate() == null || product.getMatchingBonusRate().compareTo(BigDecimal.ZERO) < 0) {
            throw new IllegalArgumentException("Matching bonus rate must be non-negative");
        }
        if (product.getLeadershipPoolRate() == null || product.getLeadershipPoolRate().compareTo(BigDecimal.ZERO) < 0) {
            throw new IllegalArgumentException("Leadership pool rate must be non-negative");
        }
        if (product.getAgentDirectRate() == null || product.getAgentDirectRate().compareTo(BigDecimal.ZERO) < 0) {
            throw new IllegalArgumentException("Agent direct rate must be non-negative");
        }
        if (product.getAgentPoolRate() == null || product.getAgentPoolRate().compareTo(BigDecimal.ZERO) < 0) {
            throw new IllegalArgumentException("Agent pool rate must be non-negative");
        }
        if (product.getBankMarginRate() == null || product.getBankMarginRate().compareTo(BigDecimal.ZERO) < 0) {
            throw new IllegalArgumentException("Bank margin rate must be non-negative");
        }
    }
}
