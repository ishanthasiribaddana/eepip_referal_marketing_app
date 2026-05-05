package lk.temcobank.eepip.mapper;

import lk.temcobank.eepip.dto.AgentDTO;
import lk.temcobank.eepip.entity.Agent;

/**
 * Agent Mapper - Maps between Agent entity and AgentDTO.
 */
public class AgentMapper {

    public static AgentDTO toDTO(Agent agent) {
        if (agent == null) {
            return null;
        }
        return new AgentDTO(agent);
    }

    public static Agent toEntity(AgentDTO dto) {
        if (dto == null) {
            return null;
        }
        Agent agent = new Agent();
        agent.setId(dto.getId());
        agent.setMemberId(dto.getMemberId());
        agent.setPosition(dto.getPosition());
        agent.setTreeLevel(dto.getTreeLevel());
        agent.setStatus(dto.getStatus());
        agent.setActivationDate(dto.getActivationDate());
        agent.setTotalReferrals(dto.getTotalReferrals());
        agent.setTotalAgentRecruits(dto.getTotalAgentRecruits());
        agent.setTotalDirectEarnings(dto.getTotalDirectEarnings());
        agent.setTotalBinaryEarnings(dto.getTotalBinaryEarnings());
        agent.setAppointedByMemberId(dto.getAppointedByMemberId());
        agent.setAppointedDate(dto.getAppointedDate());
        agent.setIsActive(dto.getIsActive());
        return agent;
    }
}
