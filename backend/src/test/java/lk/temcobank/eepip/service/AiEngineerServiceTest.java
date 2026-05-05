package lk.temcobank.eepip.service;

import lk.temcobank.eepip.entity.AiEngineer;
import lk.temcobank.eepip.entity.Product;
import lk.temcobank.eepip.repository.AiEngineerRepository;
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

public class AiEngineerServiceTest {

    @Mock
    private AiEngineerRepository aiEngineerRepository;

    @Mock
    private ProductService productService;

    @Mock
    private AgentService agentService;

    @InjectMocks
    private AiEngineerService aiEngineerService;

    private AiEngineer testAiEngineer;
    private Product testProduct;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        testAiEngineer = createTestAiEngineer();
        testProduct = createTestProduct();
    }

    @Test
    public void testFindById() {
        when(aiEngineerRepository.findById(1)).thenReturn(testAiEngineer);
        
        AiEngineer result = aiEngineerService.findById(1);
        
        assertNotNull(result);
        assertEquals(testAiEngineer.getId(), result.getId());
        assertEquals(testAiEngineer.getMemberId(), result.getMemberId());
        verify(aiEngineerRepository, times(1)).findById(1);
    }

    @Test
    public void testFindByMemberId() {
        when(aiEngineerRepository.findByMemberId(100)).thenReturn(testAiEngineer);
        
        AiEngineer result = aiEngineerService.findByMemberId(100);
        
        assertNotNull(result);
        assertEquals(testAiEngineer.getMemberId(), result.getMemberId());
        verify(aiEngineerRepository, times(1)).findByMemberId(100);
    }

    @Test
    public void testFindAll() {
        List<AiEngineer> engineers = Arrays.asList(testAiEngineer);
        when(aiEngineerRepository.findAll()).thenReturn(engineers);
        
        List<AiEngineer> result = aiEngineerService.findAll();
        
        assertNotNull(result);
        assertEquals(1, result.size());
        verify(aiEngineerRepository, times(1)).findAll();
    }

    @Test
    public void testFindBySponsorId() {
        List<AiEngineer> engineers = Arrays.asList(testAiEngineer);
        when(aiEngineerRepository.findBySponsorId(50)).thenReturn(engineers);
        
        List<AiEngineer> result = aiEngineerService.findBySponsorId(50);
        
        assertNotNull(result);
        assertEquals(1, result.size());
        verify(aiEngineerRepository, times(1)).findBySponsorId(50);
    }

    @Test
    public void testFindByParentId() {
        List<AiEngineer> engineers = Arrays.asList(testAiEngineer);
        when(aiEngineerRepository.findByParentId(50)).thenReturn(engineers);
        
        List<AiEngineer> result = aiEngineerService.findByParentId(50);
        
        assertNotNull(result);
        assertEquals(1, result.size());
        verify(aiEngineerRepository, times(1)).findByParentId(50);
    }

    @Test
    public void testFindByMemberState() {
        List<AiEngineer> engineers = Arrays.asList(testAiEngineer);
        when(aiEngineerRepository.findByMemberState(AiEngineer.MemberState.ENROLLED)).thenReturn(engineers);
        
        List<AiEngineer> result = aiEngineerService.findByMemberState(AiEngineer.MemberState.ENROLLED);
        
        assertNotNull(result);
        assertEquals(1, result.size());
        verify(aiEngineerRepository, times(1)).findByMemberState(AiEngineer.MemberState.ENROLLED);
    }

    @Test
    public void testFindByRank() {
        List<AiEngineer> engineers = Arrays.asList(testAiEngineer);
        when(aiEngineerRepository.findByRank(AiEngineer.Rank.BRONZE)).thenReturn(engineers);
        
        List<AiEngineer> result = aiEngineerService.findByRank(AiEngineer.Rank.BRONZE);
        
        assertNotNull(result);
        assertEquals(1, result.size());
        verify(aiEngineerRepository, times(1)).findByRank(AiEngineer.Rank.BRONZE);
    }

    @Test
    public void testFindActiveAiEngineers() {
        List<AiEngineer> engineers = Arrays.asList(testAiEngineer);
        when(aiEngineerRepository.findActiveAiEngineers()).thenReturn(engineers);
        
        List<AiEngineer> result = aiEngineerService.findActiveAiEngineers();
        
        assertNotNull(result);
        assertEquals(1, result.size());
        verify(aiEngineerRepository, times(1)).findActiveAiEngineers();
    }

    @Test
    public void testCreateAiEngineer() {
        when(aiEngineerRepository.findByMemberId(100)).thenReturn(null);
        when(aiEngineerRepository.save(any(AiEngineer.class))).thenReturn(testAiEngineer);
        
        AiEngineer result = aiEngineerService.createAiEngineer(testAiEngineer);
        
        assertNotNull(result);
        assertEquals(testAiEngineer.getMemberId(), result.getMemberId());
        assertEquals(AiEngineer.MemberState.WAITING_ENROLLMENT, result.getMemberState());
        assertEquals(AiEngineer.Rank.STARTER, result.getRankCode());
        verify(aiEngineerRepository, times(1)).save(any(AiEngineer.class));
    }

    @Test
    public void testCreateAiEngineer_NoMemberId() {
        testAiEngineer.setMemberId(null);
        
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            aiEngineerService.createAiEngineer(testAiEngineer);
        });
        
        assertEquals("Member ID is required", exception.getMessage());
        verify(aiEngineerRepository, never()).save(any(AiEngineer.class));
    }

    @Test
    public void testCreateAiEngineer_NoSponsorId() {
        testAiEngineer.setSponsorId(null);
        
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            aiEngineerService.createAiEngineer(testAiEngineer);
        });
        
        assertEquals("Sponsor ID is required", exception.getMessage());
        verify(aiEngineerRepository, never()).save(any(AiEngineer.class));
    }

    @Test
    public void testCreateAiEngineer_NoParentId() {
        testAiEngineer.setParentId(null);
        
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            aiEngineerService.createAiEngineer(testAiEngineer);
        });
        
        assertEquals("Parent ID is required", exception.getMessage());
        verify(aiEngineerRepository, never()).save(any(AiEngineer.class));
    }

    @Test
    public void testCreateAiEngineer_NoPosition() {
        testAiEngineer.setPosition(null);
        
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            aiEngineerService.createAiEngineer(testAiEngineer);
        });
        
        assertEquals("Position is required", exception.getMessage());
        verify(aiEngineerRepository, never()).save(any(AiEngineer.class));
    }

    @Test
    public void testCreateAiEngineer_NoProduct() {
        testAiEngineer.setProduct(null);
        
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            aiEngineerService.createAiEngineer(testAiEngineer);
        });
        
        assertEquals("Product is required", exception.getMessage());
        verify(aiEngineerRepository, never()).save(any(AiEngineer.class));
    }

    @Test
    public void testCreateAiEngineer_MemberAlreadyExists() {
        when(aiEngineerRepository.findByMemberId(100)).thenReturn(testAiEngineer);
        
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            aiEngineerService.createAiEngineer(testAiEngineer);
        });
        
        assertEquals("Member is already registered as AI Engineer", exception.getMessage());
        verify(aiEngineerRepository, never()).save(any(AiEngineer.class));
    }

    @Test
    public void testUpdateAiEngineer() {
        testAiEngineer.setId(1);
        when(aiEngineerRepository.save(any(AiEngineer.class))).thenReturn(testAiEngineer);
        
        AiEngineer result = aiEngineerService.updateAiEngineer(testAiEngineer);
        
        assertNotNull(result);
        assertEquals(testAiEngineer.getId(), result.getId());
        verify(aiEngineerRepository, times(1)).save(any(AiEngineer.class));
    }

    @Test
    public void testUpdateAiEngineer_NoId() {
        testAiEngineer.setId(null);
        
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            aiEngineerService.updateAiEngineer(testAiEngineer);
        });
        
        assertEquals("AI Engineer ID is required for update", exception.getMessage());
        verify(aiEngineerRepository, never()).save(any(AiEngineer.class));
    }

    @Test
    public void testDeleteAiEngineer() {
        when(aiEngineerRepository.findById(1)).thenReturn(testAiEngineer);
        doNothing().when(aiEngineerRepository).delete(any(AiEngineer.class));
        
        aiEngineerService.deleteAiEngineer(1);
        
        verify(aiEngineerRepository, times(1)).findById(1);
        verify(aiEngineerRepository, times(1)).delete(testAiEngineer);
    }

    @Test
    public void testDeleteAiEngineer_NotFound() {
        when(aiEngineerRepository.findById(999)).thenReturn(null);
        
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            aiEngineerService.deleteAiEngineer(999);
        });
        
        assertEquals("AI Engineer not found with ID: 999", exception.getMessage());
        verify(aiEngineerRepository, times(1)).findById(999);
        verify(aiEngineerRepository, never()).delete(any(AiEngineer.class));
    }

    @Test
    public void testSoftDeleteAiEngineer() {
        when(aiEngineerRepository.findById(1)).thenReturn(testAiEngineer);
        doNothing().when(aiEngineerRepository).softDelete(any(AiEngineer.class));
        
        aiEngineerService.softDeleteAiEngineer(1);
        
        verify(aiEngineerRepository, times(1)).findById(1);
        verify(aiEngineerRepository, times(1)).softDelete(testAiEngineer);
    }

    @Test
    public void testSoftDeleteAiEngineer_NotFound() {
        when(aiEngineerRepository.findById(999)).thenReturn(null);
        
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            aiEngineerService.softDeleteAiEngineer(999);
        });
        
        assertEquals("AI Engineer not found with ID: 999", exception.getMessage());
        verify(aiEngineerRepository, times(1)).findById(999);
        verify(aiEngineerRepository, never()).softDelete(any(AiEngineer.class));
    }

    @Test
    public void testEnrollAiEngineer() {
        when(aiEngineerRepository.findById(1)).thenReturn(testAiEngineer);
        when(productService.findById(1)).thenReturn(testProduct);
        when(aiEngineerRepository.save(any(AiEngineer.class))).thenReturn(testAiEngineer);
        
        aiEngineerService.enrollAiEngineer(1, 1, LocalDate.now(), "BANK-001");
        
        verify(aiEngineerRepository, times(1)).findById(1);
        verify(productService, times(1)).findById(1);
        verify(aiEngineerRepository, times(1)).save(any(AiEngineer.class));
    }

    @Test
    public void testEnrollAiEngineer_AiEngineerNotFound() {
        when(aiEngineerRepository.findById(999)).thenReturn(null);
        
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            aiEngineerService.enrollAiEngineer(999, 1, LocalDate.now(), "BANK-001");
        });
        
        assertEquals("AI Engineer not found with ID: 999", exception.getMessage());
        verify(aiEngineerRepository, times(1)).findById(999);
        verify(productService, never()).findById(any(Integer.class));
    }

    @Test
    public void testEnrollAiEngineer_ProductNotFound() {
        when(aiEngineerRepository.findById(1)).thenReturn(testAiEngineer);
        when(productService.findById(999)).thenReturn(null);
        
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            aiEngineerService.enrollAiEngineer(1, 999, LocalDate.now(), "BANK-001");
        });
        
        assertEquals("Product not found with ID: 999", exception.getMessage());
        verify(aiEngineerRepository, times(1)).findById(1);
        verify(productService, times(1)).findById(999);
    }

    @Test
    public void testUpdateAiEngineerState() {
        when(aiEngineerRepository.findById(1)).thenReturn(testAiEngineer);
        when(aiEngineerRepository.save(any(AiEngineer.class))).thenReturn(testAiEngineer);
        
        aiEngineerService.updateAiEngineerState(1, AiEngineer.MemberState.ACTIVE);
        
        verify(aiEngineerRepository, times(1)).findById(1);
        verify(aiEngineerRepository, times(1)).save(any(AiEngineer.class));
    }

    @Test
    public void testUpdateBinaryVolume() {
        when(aiEngineerRepository.findById(1)).thenReturn(testAiEngineer);
        when(aiEngineerRepository.save(any(AiEngineer.class))).thenReturn(testAiEngineer);
        
        aiEngineerService.updateBinaryVolume(1, 100, 150);
        
        verify(aiEngineerRepository, times(1)).findById(1);
        verify(aiEngineerRepository, times(1)).save(any(AiEngineer.class));
    }

    @Test
    public void testUpdateRank() {
        when(aiEngineerRepository.findById(1)).thenReturn(testAiEngineer);
        when(aiEngineerRepository.save(any(AiEngineer.class))).thenReturn(testAiEngineer);
        
        aiEngineerService.updateRank(1, AiEngineer.Rank.SILVER);
        
        verify(aiEngineerRepository, times(1)).findById(1);
        verify(aiEngineerRepository, times(1)).save(any(AiEngineer.class));
    }

    private AiEngineer createTestAiEngineer() {
        AiEngineer engineer = new AiEngineer();
        engineer.setId(1);
        engineer.setMemberId(100);
        engineer.setSponsorId(50);
        engineer.setParentId(50);
        engineer.setPosition("LEFT");
        engineer.setTreeLevel(1);
        engineer.setTreePath("/50/1");
        engineer.setMemberState(AiEngineer.MemberState.WAITING_ENROLLMENT);
        engineer.setProduct(testProduct);
        engineer.setLeftBv(0);
        engineer.setRightBv(0);
        engineer.setRankCode(AiEngineer.Rank.STARTER);
        engineer.setIsActive(true);
        return engineer;
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
}
