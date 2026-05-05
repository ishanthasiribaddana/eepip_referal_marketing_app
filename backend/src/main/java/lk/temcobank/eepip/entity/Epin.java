package lk.temcobank.eepip.entity;

import javax.persistence.*;
import java.time.LocalDateTime;

/**
 * Epin entity - Voucher/EPIN system for enrollment.
 */
@Entity
@Table(name = "eepip_epin")
public class Epin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "epin_no", unique = true, nullable = false, length = 6)
    private String epinNo;

    @Column(name = "epin_name", nullable = false, length = 100)
    private String epinName;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false, foreignKey = @ForeignKey(name = "fk_epin_product"))
    private Product product;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", length = 10)
    private EpinType type = EpinType.REGULAR;

    @Column(name = "date_generated", nullable = false, updatable = false)
    private LocalDateTime dateGenerated = LocalDateTime.now();

    @Column(name = "date_used")
    private LocalDateTime dateUsed;

    @Column(name = "date_expires")
    private LocalDateTime dateExpires;

    @ManyToOne
    @JoinColumn(name = "user_key", foreignKey = @ForeignKey(name = "fk_epin_user"))
    private AiEngineer user;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", length = 20)
    private EpinStatus status = EpinStatus.GENERATED;

    @Column(name = "issued_by_member_id", nullable = false)
    private Integer issuedByMemberId;

    @Column(name = "metadata_json", columnDefinition = "TEXT")
    private String metadataJson;

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

    // Enums
    public enum EpinType {
        REGULAR,
        PREMIUM
    }

    public enum EpinStatus {
        GENERATED,
        ASSIGNED,
        USED,
        EXPIRED
    }

    public Epin() {
    }

    public Epin(String epinNo, String epinName, Product product, Integer issuedByMemberId) {
        this.epinNo = epinNo;
        this.epinName = epinName;
        this.product = product;
        this.issuedByMemberId = issuedByMemberId;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getEpinNo() {
        return epinNo;
    }

    public void setEpinNo(String epinNo) {
        this.epinNo = epinNo;
    }

    public String getEpinName() {
        return epinName;
    }

    public void setEpinName(String epinName) {
        this.epinName = epinName;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public EpinType getType() {
        return type;
    }

    public void setType(EpinType type) {
        this.type = type;
    }

    public LocalDateTime getDateGenerated() {
        return dateGenerated;
    }

    public void setDateGenerated(LocalDateTime dateGenerated) {
        this.dateGenerated = dateGenerated;
    }

    public LocalDateTime getDateUsed() {
        return dateUsed;
    }

    public void setDateUsed(LocalDateTime dateUsed) {
        this.dateUsed = dateUsed;
    }

    public LocalDateTime getDateExpires() {
        return dateExpires;
    }

    public void setDateExpires(LocalDateTime dateExpires) {
        this.dateExpires = dateExpires;
    }

    public AiEngineer getUser() {
        return user;
    }

    public void setUser(AiEngineer user) {
        this.user = user;
    }

    public EpinStatus getStatus() {
        return status;
    }

    public void setStatus(EpinStatus status) {
        this.status = status;
    }

    public Integer getIssuedByMemberId() {
        return issuedByMemberId;
    }

    public void setIssuedByMemberId(Integer issuedByMemberId) {
        this.issuedByMemberId = issuedByMemberId;
    }

    public String getMetadataJson() {
        return metadataJson;
    }

    public void setMetadataJson(String metadataJson) {
        this.metadataJson = metadataJson;
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
