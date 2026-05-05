-- =========================================================================
-- ADD CIRCULAR FOREIGN KEYS — Added after both tables exist
-- =========================================================================

-- Add FK from eepip_ai_engineer.introducing_agent_id to eepip_agent
ALTER TABLE eepip_ai_engineer
ADD CONSTRAINT fk_ai_engineer_agent
FOREIGN KEY (introducing_agent_id) REFERENCES eepip_agent (id);

-- Add FK from eepip_agent.ai_engineer_id to eepip_ai_engineer
ALTER TABLE eepip_agent
ADD CONSTRAINT fk_agent_ai_engineer
FOREIGN KEY (ai_engineer_id) REFERENCES eepip_ai_engineer (id);
