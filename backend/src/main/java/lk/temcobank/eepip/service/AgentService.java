package lk.temcobank.eepip.service;

import lk.temcobank.eepip.entity.Agent;
import lk.temcobank.eepip.entity.AiEngineer;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import java.time.LocalDate;
import java.util.List;

/**
 * Agent Service - Business logic for Agent entity.
 */
@Stateless
public class AgentService {

    @EJB
    private lk.temcobank.eepip.repository.AgentRepository agentRepository;

    @EJB
    private AiEngineerService aiEngineerService;

    public Agent findById(Integer id) {
        return agentRepository.findById(id);
    }

    public Agent findByMemberId(Integer memberId) {
        return agentRepository.findByMemberId(memberId);
    }

    public List<Agent> findAll() {
        return agentRepository.findAll();
    }

    public List<Agent> findBySponsorAgentId(Integer sponsorAgentId) {
        return agentRepository.findBySponsorAgentId(sponsorAgentId);
    }

    public List<Agent> findByParentAgentId(Integer parentAgentId) {
        return agentRepository.findByParentAgentId(parentAgentId);
    }

    public List<Agent> findByStatus(Agent.AgentStatus status) {
        return agentRepository.findByStatus(status);
    }

    public List<Agent> findActiveAgents() {
        return agentRepository.findActiveAgents();
    }

    public Agent createAgent(Agent agent) {
        validateAgent(agent);
        initializeAgent(agent);
        return agentRepository.save(agent);
    }

    public Agent updateAgent(Agent agent) {
        if (agent.getId() == null) {
            throw new IllegalArgumentException("Agent ID is required for update");
        }
        validateAgent(agent);
        return agentRepository.save(agent);
    }

    public void deleteAgent(Integer id) {
        Agent agent = agentRepository.findById(id);
        if (agent == null) {
            throw new IllegalArgumentException("Agent not found with ID: " + id);
        }
        agentRepository.delete(agent);
    }

    public void softDeleteAgent(Integer id) {
        Agent agent = agentRepository.findById(id);
        if (agent == null) {
            throw new IllegalArgumentException("Agent not found with ID: " + id);
        }
        agentRepository.softDelete(agent);
    }

    public Agent appointAgent(Integer memberId, Integer sponsorAgentId, Integer parentAgentId, 
                               Agent.TreePosition position, Integer appointedByMemberId) {
        // Check if member is already an agent
        Agent existingAgent = agentRepository.findByMemberId(memberId);
        if (existingAgent != null) {
            throw new IllegalArgumentException("Member is already an agent");
        }

        Agent agent = new Agent(memberId, appointedByMemberId, LocalDate.now());
        if (sponsorAgentId != null) {
            Agent sponsor = agentRepository.findById(sponsorAgentId);
            agent.setSponsorAgent(sponsor);
        }
        if (parentAgentId != null) {
            Agent parent = agentRepository.findById(parentAgentId);
            agent.setParentAgent(parent);
        }
        agent.setPosition(position);
        agent.setStatus(Agent.AgentStatus.PENDING);
        agent.setTreeLevel(0);
        agent.setTotalReferrals(0);
        agent.setTotalAgentRecruits(0);
        agent.setTotalDirectEarnings(java.math.BigDecimal.ZERO);
        agent.setTotalBinaryEarnings(java.math.BigDecimal.ZERO);
        agent.setIsActive(true);

        return agentRepository.save(agent);
    }

    public void activateAgent(Integer agentId) {
        Agent agent = agentRepository.findById(agentId);
        if (agent == null) {
            throw new IllegalArgumentException("Agent not found with ID: " + agentId);
        }

        if (agent.getStatus() != Agent.AgentStatus.PENDING) {
            throw new IllegalArgumentException("Agent is not in PENDING status");
        }

        // Check if agent has introduced at least 1 AI Engineer
        if (agent.getTotalReferrals() == null || agent.getTotalReferrals() < 1) {
            throw new IllegalArgumentException("Agent must have introduced at least 1 AI Engineer to be activated");
        }

        agent.setStatus(Agent.AgentStatus.ACTIVE);
        agent.setActivationDate(LocalDate.now());

        agentRepository.save(agent);
    }

    public void suspendAgent(Integer agentId) {
        Agent agent = agentRepository.findById(agentId);
        if (agent == null) {
            throw new IllegalArgumentException("Agent not found with ID: " + agentId);
        }

        agent.setStatus(Agent.AgentStatus.SUSPENDED);
        agentRepository.save(agent);
    }

    public void terminateAgent(Integer agentId) {
        Agent agent = agentRepository.findById(agentId);
        if (agent == null) {
            throw new IllegalArgumentException("Agent not found with ID: " + agentId);
        }

        agent.setStatus(Agent.AgentStatus.TERMINATED);
        agent.setIsActive(false);
        agentRepository.save(agent);
    }

    public void recordReferral(Integer agentId, Integer aiEngineerId) {
        Agent agent = agentRepository.findById(agentId);
        if (agent == null) {
            throw new IllegalArgumentException("Agent not found with ID: " + agentId);
        }

        AiEngineer aiEngineer = aiEngineerService.findById(aiEngineerId);
        if (aiEngineer == null) {
            throw new IllegalArgumentException("AI Engineer not found with ID: " + aiEngineerId);
        }

        // Set the introducing agent on the AI Engineer
        aiEngineer.setIntroducingAgent(agent);
        aiEngineerService.updateAiEngineer(aiEngineer);

        // Update agent referral count
        agent.setTotalReferrals((agent.getTotalReferrals() != null ? agent.getTotalReferrals() : 0) + 1);
        agentRepository.save(agent);
    }

    public void updateEarnings(Integer agentId, java.math.BigDecimal directEarnings, java.math.BigDecimal binaryEarnings) {
        Agent agent = agentRepository.findById(agentId);
        if (agent == null) {
            throw new IllegalArgumentException("Agent not found with ID: " + agentId);
        }

        if (directEarnings != null) {
            agent.setTotalDirectEarnings(agent.getTotalDirectEarnings().add(directEarnings));
        }
        if (binaryEarnings != null) {
            agent.setTotalBinaryEarnings(agent.getTotalBinaryEarnings().add(binaryEarnings));
        }

        agentRepository.save(agent);
    }

    public Long countByStatus(Agent.AgentStatus status) {
        return agentRepository.countByStatus(status);
    }

    private void validateAgent(Agent agent) {
        if (agent.getMemberId() == null) {
            throw new IllegalArgumentException("Member ID is required");
        }
        if (agent.getAppointedByMemberId() == null) {
            throw new IllegalArgumentException("Appointed by member ID is required");
        }
        if (agent.getAppointedDate() == null) {
            throw new IllegalArgumentException("Appointed date is required");
        }

        // Check if member already exists as agent
        Agent existing = agentRepository.findByMemberId(agent.getMemberId());
        if (existing != null && !existing.getId().equals(agent.getId())) {
            throw new IllegalArgumentException("Member is already registered as agent");
        }
    }

    private void initializeAgent(Agent agent) {
        if (agent.getStatus() == null) {
            agent.setStatus(Agent.AgentStatus.PENDING);
        }
        if (agent.getTreeLevel() == null) {
            agent.setTreeLevel(0);
        }
        if (agent.getTotalReferrals() == null) {
            agent.setTotalReferrals(0);
        }
        if (agent.getTotalAgentRecruits() == null) {
            agent.setTotalAgentRecruits(0);
        }
        if (agent.getTotalDirectEarnings() == null) {
            agent.setTotalDirectEarnings(java.math.BigDecimal.ZERO);
        }
        if (agent.getTotalBinaryEarnings() == null) {
            agent.setTotalBinaryEarnings(java.math.BigDecimal.ZERO);
        }
        if (agent.getIsActive() == null) {
            agent.setIsActive(true);
        }
    }
}
