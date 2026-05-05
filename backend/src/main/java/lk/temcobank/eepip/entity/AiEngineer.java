package lk.temcobank.eepip.entity;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * AI Engineer entity - Earn While Learn Model.
 * Every AI Engineer is also a Student via self-nomination (no third-party student nominations).
 */
@Entity
@Table(name = "eepip_ai_engineer")
public class AiEngineer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "member_id", unique = true, nullable = false)
    private Integer memberId;

    @Column(name = "sponsor_id")
    private Integer sponsorId;

    @Column(name = "parent_id")
    private Integer parentId;

    @Enumerated(EnumType.STRING)
    @Column(name = "position", length = 10)
    private TreePosition position;

    @Column(name = "tree_level")
    private Integer treeLevel = 0;

    @Column(name = "tree_path", length = 500)
    private String treePath;

    @Enumerated(EnumType.STRING)
    @Column(name = "member_state", nullable = false, length = 30)
    private MemberState memberState = MemberState.WAITING_ENROLLMENT;

    @Column(name = "academic_eligibility_verified")
    private Boolean academicEligibilityVerified = false;

    @Column(name = "enrollment_date")
    private LocalDate enrollmentDate;

    @Column(name = "expected_graduation")
    private LocalDate expectedGraduation;

    @ManyToOne
    @JoinColumn(name = "product_id", foreignKey = @ForeignKey(name = "fk_ai_engineer_product"))
    private Product product;

    @Column(name = "investment_date")
    private LocalDate investmentDate;

    @Column(name = "bank_reference", length = 100)
    private String bankReference;

    @ManyToOne
    @JoinColumn(name = "introducing_agent_id", foreignKey = @ForeignKey(name = "fk_ai_engineer_agent"))
    private Agent introducingAgent;

    @Column(name = "activation_date")
    private LocalDate activationDate;

    @Column(name = "bsc_start_date")
    private LocalDate bscStartDate;

    @Column(name = "bsc_end_date")
    private LocalDate bscEndDate;

    @Column(name = "mphil_start_date")
    private LocalDate mphilStartDate;

    @Column(name = "mphil_end_date")
    private LocalDate mphilEndDate;

    @Column(name = "left_bv")
    private Integer leftBv = 0;

    @Column(name = "right_bv")
    private Integer rightBv = 0;

    @Column(name = "carry_forward_left_bv")
    private Integer carryForwardLeftBv = 0;

    @Column(name = "carry_forward_right_bv")
    private Integer carryForwardRightBv = 0;

    @Enumerated(EnumType.STRING)
    @Column(name = "rank_code", length = 20)
    private Rank rankCode = Rank.STARTER;

    @Column(name = "total_earnings", precision = 12, scale = 2)
    private BigDecimal totalEarnings = BigDecimal.ZERO;

    @Column(name = "monthly_earnings", precision = 12, scale = 2)
    private BigDecimal monthlyEarnings = BigDecimal.ZERO;

    @Column(name = "team_size")
    private Integer teamSize = 0;

    @Column(name = "direct_recruits")
    private Integer directRecruits = 0;

    @Column(name = "direct_recruits_left")
    private Integer directRecruitsLeft = 0;

    @Column(name = "direct_recruits_right")
    private Integer directRecruitsRight = 0;

    @Column(name = "positions_held")
    private Integer positionsHeld = 1;

    @Column(name = "is_active")
    private Boolean isActive = true;

    @Column(name = "created_by")
    private Integer createdBy;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_by")
    private Integer updatedBy;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt = LocalDateTime.now();

    @Column(name = "last_active")
    private LocalDateTime lastActive;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

    @Column(name = "deleted_by")
    private Integer deletedBy;

    @Column(name = "deletion_reason", columnDefinition = "TEXT")
    private String deletionReason;

    // Enums
    public enum MemberState {
        WAITING_ENROLLMENT,
        ENROLLED,
        BSC_YEAR_1_IN_PROGRESS,
        BSC_YEAR_2_IN_PROGRESS,
        BSC_YEAR_3_IN_PROGRESS,
        BSC_COMPLETED,
        MPHIL_IN_PROGRESS,
        MPHIL_COMPLETED,
        DROPPED_OUT,
        FROZEN
    }

    public enum TreePosition {
        LEFT,
        RIGHT
    }

    public enum Rank {
        STARTER,
        BRONZE,
        SILVER,
        GOLD,
        PLATINUM,
        DIAMOND
    }

    // Constructors
    public AiEngineer() {
    }

    public AiEngineer(Integer memberId, Integer sponsorId, Integer parentId, TreePosition position) {
        this.memberId = memberId;
        this.sponsorId = sponsorId;
        this.parentId = parentId;
        this.position = position;
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

    public TreePosition getPosition() {
        return position;
    }

    public void setPosition(TreePosition position) {
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

    public MemberState getMemberState() {
        return memberState;
    }

    public void setMemberState(MemberState memberState) {
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

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
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

    public Agent getIntroducingAgent() {
        return introducingAgent;
    }

    public void setIntroducingAgent(Agent introducingAgent) {
        this.introducingAgent = introducingAgent;
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

    public Rank getRankCode() {
        return rankCode;
    }

    public void setRankCode(Rank rankCode) {
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

    public Integer getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(Integer createdBy) {
        this.createdBy = createdBy;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public Integer getUpdatedBy() {
        return updatedBy;
    }

    public void setUpdatedBy(Integer updatedBy) {
        this.updatedBy = updatedBy;
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

    public LocalDateTime getDeletedAt() {
        return deletedAt;
    }

    public void setDeletedAt(LocalDateTime deletedAt) {
        this.deletedAt = deletedAt;
    }

    public Integer getDeletedBy() {
        return deletedBy;
    }

    public void setDeletedBy(Integer deletedBy) {
        this.deletedBy = deletedBy;
    }

    public String getDeletionReason() {
        return deletionReason;
    }

    public void setDeletionReason(String deletionReason) {
        this.deletionReason = deletionReason;
    }

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    @PrePersist
    public void prePersist() {
        if (this.createdAt == null) {
            this.createdAt = LocalDateTime.now();
        }
        this.updatedAt = LocalDateTime.now();
    }
}
