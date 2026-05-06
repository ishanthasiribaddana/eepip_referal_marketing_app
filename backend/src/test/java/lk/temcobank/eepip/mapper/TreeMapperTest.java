package lk.temcobank.eepip.mapper;

import lk.temcobank.eepip.dto.BinaryTreeResponseDTO;
import lk.temcobank.eepip.entity.AiEngineer;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class TreeMapperTest {

    @Test
    public void testToTreeDTO() {
        AiEngineer engineer = createTestAiEngineer();
        BinaryTreeResponseDTO dto = TreeMapper.toTreeDTO(engineer);
        
        assertNotNull(dto);
        assertEquals(engineer.getId(), dto.getId());
        assertEquals(engineer.getMemberId(), dto.getMemberId());
        assertEquals(engineer.getPosition(), dto.getPosition());
    }

    @Test
    public void testToTreeDTO_WithDepth() {
        AiEngineer engineer = createTestAiEngineer();
        BinaryTreeResponseDTO dto = TreeMapper.toTreeDTO(engineer, 2);
        
        assertNotNull(dto);
        assertEquals(engineer.getId(), dto.getId());
    }

    @Test
    public void testToTreeDTO_Null() {
        BinaryTreeResponseDTO dto = TreeMapper.toTreeDTO(null);
        assertNull(dto);
    }

    private AiEngineer createTestAiEngineer() {
        AiEngineer engineer = new AiEngineer();
        engineer.setId(1);
        engineer.setMemberId(100);
        engineer.setPosition(AiEngineer.TreePosition.LEFT);
        engineer.setTreeLevel(1);
        return engineer;
    }
}
