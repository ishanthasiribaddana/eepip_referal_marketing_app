package lk.temcobank.eepip.service;

import lk.temcobank.eepip.entity.AiEngineer;
import lk.temcobank.eepip.entity.Epin;
import lk.temcobank.eepip.entity.Product;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

/**
 * Epin Service - Business logic for Epin entity.
 */
@Stateless
public class EpinService {

    @EJB
    private lk.temcobank.eepip.repository.EpinRepository epinRepository;

    @EJB
    private ProductService productService;

    public Epin findById(Integer id) {
        return epinRepository.findById(id);
    }

    public Epin findByEpinNo(String epinNo) {
        return epinRepository.findByEpinNo(epinNo);
    }

    public List<Epin> findAll() {
        return epinRepository.findAll();
    }

    public List<Epin> findByProduct(Product product) {
        return epinRepository.findByProduct(product);
    }

    public List<Epin> findByStatus(Epin.EpinStatus status) {
        return epinRepository.findByStatus(status);
    }

    public List<Epin> findAvailableEpins() {
        return epinRepository.findAvailableEpins();
    }

    public List<Epin> findExpiredEpins() {
        return epinRepository.findExpiredEpins();
    }

    public Epin generateEpin(Integer productId, String epinName, Integer issuedByMemberId, Integer expiryDays) {
        Product product = productService.findById(productId);
        if (product == null) {
            throw new IllegalArgumentException("Product not found with ID: " + productId);
        }

        String epinNo = generateEpinNo();
        
        Epin epin = new Epin(epinNo, epinName, product, issuedByMemberId);
        epin.setStatus(Epin.EpinStatus.GENERATED);
        
        if (expiryDays != null && expiryDays > 0) {
            LocalDateTime expiryDate = LocalDateTime.now().plusDays(expiryDays);
            epin.setDateExpires(expiryDate);
        }

        return epinRepository.save(epin);
    }

    public Epin assignEpin(Integer epinId, Integer aiEngineerId) {
        Epin epin = epinRepository.findById(epinId);
        if (epin == null) {
            throw new IllegalArgumentException("Epin not found with ID: " + epinId);
        }

        if (epin.getStatus() != Epin.EpinStatus.GENERATED) {
            throw new IllegalArgumentException("Epin is not in GENERATED status");
        }

        if (epin.getDateExpires() != null && epin.getDateExpires().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("Epin has expired");
        }

        AiEngineer aiEngineer = new AiEngineer();
        aiEngineer.setId(aiEngineerId);
        epin.setUser(aiEngineer);
        epin.setStatus(Epin.EpinStatus.ASSIGNED);

        return epinRepository.save(epin);
    }

    public Epin useEpin(String epinNo, Integer aiEngineerId) {
        Epin epin = epinRepository.findByEpinNo(epinNo);
        if (epin == null) {
            throw new IllegalArgumentException("Epin not found with number: " + epinNo);
        }

        if (epin.getStatus() != Epin.EpinStatus.ASSIGNED) {
            throw new IllegalArgumentException("Epin is not in ASSIGNED status");
        }

        if (epin.getDateExpires() != null && epin.getDateExpires().isBefore(LocalDateTime.now())) {
            epin.setStatus(Epin.EpinStatus.EXPIRED);
            epinRepository.save(epin);
            throw new IllegalArgumentException("Epin has expired");
        }

        AiEngineer aiEngineer = new AiEngineer();
        aiEngineer.setId(aiEngineerId);
        epin.setUser(aiEngineer);
        epin.setStatus(Epin.EpinStatus.USED);
        epin.setDateUsed(LocalDateTime.now());

        return epinRepository.save(epin);
    }

    public void markExpiredEpins() {
        List<Epin> expiredEpins = epinRepository.findExpiredEpins();
        for (Epin epin : expiredEpins) {
            if (epin.getStatus() != Epin.EpinStatus.EXPIRED && epin.getStatus() != Epin.EpinStatus.USED) {
                epin.setStatus(Epin.EpinStatus.EXPIRED);
                epinRepository.save(epin);
            }
        }
    }

    public Long countByStatus(Epin.EpinStatus status) {
        return epinRepository.countByStatus(status);
    }

    private String generateEpinNo() {
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        StringBuilder epinNo = new StringBuilder();
        Random random = new Random();
        
        for (int i = 0; i < 6; i++) {
            epinNo.append(chars.charAt(random.nextInt(chars.length())));
        }
        
        // Ensure uniqueness
        if (epinRepository.findByEpinNo(epinNo.toString()) != null) {
            return generateEpinNo();
        }
        
        return epinNo.toString();
    }
}
