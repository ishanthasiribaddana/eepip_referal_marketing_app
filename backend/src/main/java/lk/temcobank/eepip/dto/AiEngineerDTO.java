package lk.temcobank.eepip.dto;

import lk.temcobank.eepip.entity.AiEngineer;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * AI Engineer DTO - Data Transfer Object for AiEngineer entity.
 */
public class AiEngineerDTO {
    private Integer id;
    private Integer memberId;
    private Integer sponsorId;
    private Integer parentId;
    private AiEngineer.TreePosition position;
    private Integer treeLevel;
    private String treePath;
    private AiEngineer.MemberState memberState;
    private Boolean academicEligibilityVerified;
    private LocalDate enrollmentDate;
    private LocalDate expectedGraduation;
    private Integer productId;
    private String productName;
    private BigDecimal investmentAmount;
    private LocalDate investmentDate;
    private String bankReference;
    private Integer introducingAgentId;
    private LocalDate activationDate;
    private LocalDate bscStartDate;
    private LocalDate bscEndDate;
    private LocalDate mphilStartDate;
    private LocalDate mphilEndDate;
    private Integer leftBv;
    private Integer rightBv;
    private Integer carryForwardLeftBv;
    private Integer carryForwardRightBv;
    private AiEngineer.Rank rankCode;
    private BigDecimal totalEarnings;
    private BigDecimal monthlyEarnings;
    private Integer teamSize;
    private Integer directRecruits;
    private Integer directRecruitsLeft;
    private Integer directRecruitsRight;
    private Integer positionsHeld;
    private Boolean isActive;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime lastActive;

    public AiEngineerDTO() {
    }

    public AiEngineerDTO(AiEngineer engineer) {
        this.id = engineer.getId();
        this.memberId = engineer.getMemberId();
        this.sponsorId = engineer.getSponsorId();
        this.parentId = engineer.getParentId();
        this.position = engineer.getPosition();
        this.treeLevel = engineer.getTreeLevel();
        this.treePath = engineer.getTreePath();
        this.memberState = engineer.getMemberState();
        this.academicEligibilityVerified = engineer.getAcademicEligibilityVerified();
        this.enrollmentDate = engineer.getEnrollmentDate();
        this.expectedGraduation = engineer.getExpectedGraduation();
        this.productId = engineer.getProduct() != null ? engineer.getProduct().getId() : null;
        this.productName = engineer.getProduct() != null ? engineer.getProduct().getProductName() : null;
        this.investmentAmount = engineer.getProduct() != null ? engineer.getProduct().getInvestmentAmount() : null;
        this.investmentDate = engineer.getInvestmentDate();
        this.bankReference = engineer.getBankReference();
        this.introducingAgentId = engineer.getIntroducingAgent() != null ? engineer.getIntroducingAgent().getId() : null;
        this.activationDate = engineer.getActivationDate();
        this.bscStartDate = engineer.getBscStartDate();
        this.bscEndDate = engineer.getBscEndDate();
        this.mphilStartDate = engineer.getMphilStartDate();
        this.mphilEndDate = engineer.getMphilEndDate();
        this.leftBv = engineer.getLeftBv();
        this.rightBv = engineer.getRightBv();
        this.carryForwardLeftBv = engineer.getCarryForwardLeftBv();
        this.carryForwardRightBv = engineer.getCarryForwardRightBv();
        this.rankCode = engineer.getRankCode();
        this.totalEarnings = engineer.getTotalEarnings();
        this.monthlyEarnings = engineer.getMonthlyEarnings();
        this.teamSize = engineer.getTeamSize();
        this.directRecruits = engineer.getDirectRecruits();
        this.directRecruitsLeft = engineer.getDirectRecruitsLeft();
        this.directRecruitsRight = engineer.getDirectRecruitsRight();
        this.positionsHeld = engineer.getPositionsHeld();
        this.isActive = engineer.getIsActive();
        this.createdAt = engineer.getCreatedAt();
        this.updatedAt = engineer.getUpdatedAt();
        this.lastActive = engineer.getLastActive();
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

    public Integer getSponsorId() {
        return sponsorId;
    }

    public void setSponsorId(Integer sponsorId) {
        this.sponsorId = sponsorId;
    }

    public Integer getParentId() {
        return parentId;
    }

    public void setParentId(Integer parentId) {
        this.parentId = parentId;
    }

    public AiEngineer.TreePosition getPosition() {
        return position;
    }

    public void setPosition(AiEngineer.TreePosition position) {
        this.position = position;
    }

    public Integer getTreeLevel() {
        return treeLevel;
    }

    public void setTreeLevel(Integer treeLevel) {
        this.treeLevel = treeLevel;
    }

    public String getTreePath() {
        return treePath;
    }

    public void setTreePath(String treePath) {
        this.treePath = treePath;
    }

    public AiEngineer.MemberState getMemberState() {
        return memberState;
    }

    public void setMemberState(AiEngineer.MemberState memberState) {
        this.memberState = memberState;
    }

    public Boolean getAcademicEligibilityVerified() {
        return academicEligibilityVerified;
    }

    public void setAcademicEligibilityVerified(Boolean academicEligibilityVerified) {
        this.academicEligibilityVerified = academicEligibilityVerified;
    }

    public LocalDate getEnrollmentDate() {
        return enrollmentDate;
    }

    public void setEnrollmentDate(LocalDate enrollmentDate) {
        this.enrollmentDate = enrollmentDate;
    }

    public LocalDate getExpectedGraduation() {
        return expectedGraduation;
    }

    public void setExpectedGraduation(LocalDate expectedGraduation) {
        this.expectedGraduation = expectedGraduation;
    }

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public BigDecimal getInvestmentAmount() {
        return investmentAmount;
    }

    public void setInvestmentAmount(BigDecimal investmentAmount) {
        this.investmentAmount = investmentAmount;
    }

    public LocalDate getInvestmentDate() {
        return investmentDate;
    }

    public void setInvestmentDate(LocalDate investmentDate) {
        this.investmentDate = investmentDate;
    }

    public String getBankReference() {
        return bankReference;
    }

    public void setBankReference(String bankReference) {
        this.bankReference = bankReference;
    }

    public Integer getIntroducingAgentId() {
        return introducingAgentId;
    }

    public void setIntroducingAgentId(Integer introducingAgentId) {
        this.introducingAgentId = introducingAgentId;
    }

    public LocalDate getActivationDate() {
        return activationDate;
    }

    public void setActivationDate(LocalDate activationDate) {
        this.activationDate = activationDate;
    }

    public LocalDate getBscStartDate() {
        return bscStartDate;
    }

    public void setBscStartDate(LocalDate bscStartDate) {
        this.bscStartDate = bscStartDate;
    }

    public LocalDate getBscEndDate() {
        return bscEndDate;
    }

    public void setBscEndDate(LocalDate bscEndDate) {
        this.bscEndDate = bscEndDate;
    }

    public LocalDate getMphilStartDate() {
        return mphilStartDate;
    }

    public void setMphilStartDate(LocalDate mphilStartDate) {
        this.mphilStartDate = mphilStartDate;
    }

    public LocalDate getMphilEndDate() {
        return mphilEndDate;
    }

    public void setMphilEndDate(LocalDate mphilEndDate) {
        this.mphilEndDate = mphilEndDate;
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

    public Integer getCarryForwardLeftBv() {
        return carryForwardLeftBv;
    }

    public void setCarryForwardLeftBv(Integer carryForwardLeftBv) {
        this.carryForwardLeftBv = carryForwardLeftBv;
    }

    public Integer getCarryForwardRightBv() {
        return carryForwardRightBv;
    }

    public void setCarryForwardRightBv(Integer carryForwardRightBv) {
        this.carryForwardRightBv = carryForwardRightBv;
    }

    public AiEngineer.Rank getRankCode() {
        return rankCode;
    }

    public void setRankCode(AiEngineer.Rank rankCode) {
        this.rankCode = rankCode;
    }

    public BigDecimal getTotalEarnings() {
        return totalEarnings;
    }

    public void setTotalEarnings(BigDecimal totalEarnings) {
        this.totalEarnings = totalEarnings;
    }

    public BigDecimal getMonthlyEarnings() {
        return monthlyEarnings;
    }

    public void setMonthlyEarnings(BigDecimal monthlyEarnings) {
        this.monthlyEarnings = monthlyEarnings;
    }

    public Integer getTeamSize() {
        return teamSize;
    }

    public void setTeamSize(Integer teamSize) {
        this.teamSize = teamSize;
    }

    public Integer getDirectRecruits() {
        return directRecruits;
    }

    public void setDirectRecruits(Integer directRecruits) {
        this.directRecruits = directRecruits;
    }

    public Integer getDirectRecruitsLeft() {
        return directRecruitsLeft;
    }

    public void setDirectRecruitsLeft(Integer directRecruitsLeft) {
        this.directRecruitsLeft = directRecruitsLeft;
    }

    public Integer getDirectRecruitsRight() {
        return directRecruitsRight;
    }

    public void setDirectRecruitsRight(Integer directRecruitsRight) {
        this.directRecruitsRight = directRecruitsRight;
    }

    public Integer getPositionsHeld() {
        return positionsHeld;
    }

    public void setPositionsHeld(Integer positionsHeld) {
        this.positionsHeld = positionsHeld;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public LocalDateTime getLastActive() {
        return lastActive;
    }

    public void setLastActive(LocalDateTime lastActive) {
        this.lastActive = lastActive;
    }
}
