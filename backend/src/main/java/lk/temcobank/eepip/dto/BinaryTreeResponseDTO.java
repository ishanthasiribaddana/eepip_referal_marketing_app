package lk.temcobank.eepip.dto;

import lk.temcobank.eepip.entity.AiEngineer;

import java.util.List;

/**
 * Binary Tree Response DTO - Composite DTO for binary tree structure.
 */
public class BinaryTreeResponseDTO {
    private Integer id;
    private Integer memberId;
    private AiEngineer.TreePosition position;
    private Integer leftBv;
    private Integer rightBv;
    private AiEngineer.Rank rankCode;
    private AiEngineer.MemberState memberState;
    private Integer teamSize;
    private BinaryTreeResponseDTO leftChild;
    private BinaryTreeResponseDTO rightChild;
    private List<BinaryTreeResponseDTO> downline;

    public BinaryTreeResponseDTO() {
    }

    public BinaryTreeResponseDTO(AiEngineer engineer) {
        this.id = engineer.getId();
        this.memberId = engineer.getMemberId();
        this.position = engineer.getPosition();
        this.leftBv = engineer.getLeftBv();
        this.rightBv = engineer.getRightBv();
        this.rankCode = engineer.getRankCode();
        this.memberState = engineer.getMemberState();
        this.teamSize = engineer.getTeamSize();
    }

    // Getters and Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getMemberId() {
        return memberId;
    }

    public void setMemberId(Integer memberId) {
        this.memberId = memberId;
    }

    public AiEngineer.TreePosition getPosition() {
        return position;
    }

    public void setPosition(AiEngineer.TreePosition position) {
        this.position = position;
    }

    public Integer getLeftBv() {
        return leftBv;
    }

    public void setLeftBv(Integer leftBv) {
        this.leftBv = leftBv;
    }

    public Integer getRightBv() {
        return rightBv;
    }

    public void setRightBv(Integer rightBv) {
        this.rightBv = rightBv;
    }

    public AiEngineer.Rank getRankCode() {
        return rankCode;
    }

    public void setRankCode(AiEngineer.Rank rankCode) {
        this.rankCode = rankCode;
    }

    public AiEngineer.MemberState getMemberState() {
        return memberState;
    }

    public void setMemberState(AiEngineer.MemberState memberState) {
        this.memberState = memberState;
    }

    public Integer getTeamSize() {
        return teamSize;
    }

    public void setTeamSize(Integer teamSize) {
        this.teamSize = teamSize;
    }

    public BinaryTreeResponseDTO getLeftChild() {
        return leftChild;
    }

    public void setLeftChild(BinaryTreeResponseDTO leftChild) {
        this.leftChild = leftChild;
    }

    public BinaryTreeResponseDTO getRightChild() {
        return rightChild;
    }

    public void setRightChild(BinaryTreeResponseDTO rightChild) {
        this.rightChild = rightChild;
    }

    public List<BinaryTreeResponseDTO> getDownline() {
        return downline;
    }

    public void setDownline(List<BinaryTreeResponseDTO> downline) {
        this.downline = downline;
    }
}
