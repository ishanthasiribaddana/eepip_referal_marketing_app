package lk.temcobank.eepip.mapper;

import lk.temcobank.eepip.dto.AgentDTO;
import lk.temcobank.eepip.entity.Agent;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

public class AgentMapperTest {

    @Test
    public void testToDTO() {
        Agent agent = createTestAgent();
        AgentDTO dto = AgentMapper.toDTO(agent);
        
        assertNotNull(dto);
        assertEquals(agent.getId(), dto.getId());
        assertEquals(agent.getMemberId(), dto.getMemberId());
        assertEquals(agent.getPosition(), dto.getPosition());
        assertEquals(agent.getTreeLevel(), dto.getTreeLevel());
        assertEquals(agent.getStatus(), dto.getStatus());
        assertEquals(agent.getTotalReferrals(), dto.getTotalReferrals());
    }

    @Test
    public void testToDTO_Null() {
        AgentDTO dto = AgentMapper.toDTO(null);
        assertNull(dto);
    }

    @Test
    public void testToEntity() {
        AgentDTO dto = createTestAgentDTO();
        Agent agent = AgentMapper.toEntity(dto);
        
        assertNotNull(agent);
        assertEquals(dto.getId(), agent.getId());
        assertEquals(dto.getMemberId(), agent.getMemberId());
        assertEquals(dto.getPosition(), agent.getPosition());
        assertEquals(dto.getTreeLevel(), agent.getTreeLevel());
        assertEquals(dto.getStatus(), agent.getStatus());
        assertEquals(dto.getTotalReferrals(), agent.getTotalReferrals());
    }

    @Test
    public void testToEntity_Null() {
        Agent agent = AgentMapper.toEntity(null);
        assertNull(agent);
    }

    private Agent createTestAgent() {
        Agent agent = new Agent();
        agent.setId(1);
        agent.setMemberId(100);
        agent.setPosition(Agent.TreePosition.LEFT);
        agent.setTreeLevel(1);
        agent.setStatus(Agent.AgentStatus.ACTIVE);
        agent.setActivationDate(LocalDate.now());
        agent.setTotalReferrals(5);
        agent.setTotalAgentRecruits(3);
        agent.setTotalDirectEarnings(new BigDecimal("50000.00"));
        agent.setTotalBinaryEarnings(new BigDecimal("30000.00"));
        agent.setAppointedByMemberId(1);
        agent.setAppointedDate(LocalDate.now());
        agent.setIsActive(true);
        return agent;
    }

    private AgentDTO createTestAgentDTO() {
        AgentDTO dto = new AgentDTO();
        dto.setId(1);
        dto.setMemberId(100);
        dto.setPosition(Agent.TreePosition.LEFT);
        dto.setTreeLevel(1);
        dto.setStatus(Agent.AgentStatus.ACTIVE);
        dto.setActivationDate(LocalDate.now());
        dto.setTotalReferrals(5);
        dto.setTotalAgentRecruits(3);
        dto.setTotalDirectEarnings(new BigDecimal("50000.00"));
        dto.setTotalBinaryEarnings(new BigDecimal("30000.00"));
        dto.setAppointedByMemberId(1);
        dto.setAppointedDate(LocalDate.now());
        dto.setIsActive(true);
        return dto;
    }
}
