package lk.temcobank.eepip.service;

import lk.temcobank.eepip.entity.Document;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

/**
 * Document Service - Business logic for Document entity.
 */
@Stateless
public class DocumentService {

    @EJB
    private lk.temcobank.eepip.repository.DocumentRepository documentRepository;

    public Document findById(Integer id) {
        return documentRepository.findById(id);
    }

    public List<Document> findAll() {
        return documentRepository.findAll();
    }

    public List<Document> findByMemberId(Integer memberId) {
        return documentRepository.findByMemberId(memberId);
    }

    public List<Document> findByDocumentType(Document.DocumentType documentType) {
        return documentRepository.findByDocumentType(documentType);
    }

    public List<Document> findByVerificationStatus(Document.DocumentVerificationStatus verificationStatus) {
        return documentRepository.findByVerificationStatus(verificationStatus);
    }

    public List<Document> findByMemberIdAndDocumentType(Integer memberId, Document.DocumentType documentType) {
        return documentRepository.findByMemberIdAndDocumentType(memberId, documentType);
    }

    public List<Document> findPrimaryDocuments(Integer memberId) {
        return documentRepository.findPrimaryDocuments(memberId);
    }

    public List<Document> findPendingVerificationDocuments() {
        return documentRepository.findPendingVerificationDocuments();
    }

    public List<Document> findExpiredDocuments() {
        return documentRepository.findExpiredDocuments();
    }

    public List<Document> findExpiringDocuments(int daysBeforeExpiry) {
        return documentRepository.findExpiringDocuments(daysBeforeExpiry);
    }

    public Document uploadDocument(Integer memberId, Document.DocumentType documentType, String documentName,
                                     String documentUrl, String documentNumber, LocalDate issueDate,
                                     LocalDate expiryDate, Long fileSize, String fileType) {
        Document document = new Document(memberId, documentType, documentUrl);
        document.setDocumentName(documentName);
        document.setDocumentNumber(documentNumber);
        document.setIssueDate(issueDate);
        document.setExpiryDate(expiryDate);
        document.setFileSize(fileSize);
        document.setFileType(fileType);
        document.setVerificationStatus(Document.DocumentVerificationStatus.PENDING);
        document.setIsPrimary(false);

        return documentRepository.save(document);
    }

    public Document verifyDocument(Integer documentId, Integer verifiedBy, Boolean isVerified, String rejectionReason) {
        Document document = documentRepository.findById(documentId);
        if (document == null) {
            throw new IllegalArgumentException("Document not found with ID: " + documentId);
        }

        document.setVerifiedAt(LocalDateTime.now());
        document.setVerifiedBy(verifiedBy);

        if (isVerified) {
            document.setVerificationStatus(Document.DocumentVerificationStatus.VERIFIED);
            document.setRejectionReason(null);
        } else {
            document.setVerificationStatus(Document.DocumentVerificationStatus.REJECTED);
            document.setRejectionReason(rejectionReason);
        }

        return documentRepository.save(document);
    }

    public Document markAsPrimary(Integer documentId) {
        Document document = documentRepository.findById(documentId);
        if (document == null) {
            throw new IllegalArgumentException("Document not found with ID: " + documentId);
        }

        // Remove primary flag from other documents of same type for this member
        List<Document> existingPrimary = documentRepository.findByMemberIdAndDocumentType(
                document.getMemberId(), document.getDocumentType());
        for (Document doc : existingPrimary) {
            if (doc.getIsPrimary() && !doc.getId().equals(documentId)) {
                doc.setIsPrimary(false);
                documentRepository.save(doc);
            }
        }

        document.setIsPrimary(true);
        return documentRepository.save(document);
    }

    public Document requestReupload(Integer documentId, String reason) {
        Document document = documentRepository.findById(documentId);
        if (document == null) {
            throw new IllegalArgumentException("Document not found with ID: " + documentId);
        }

        document.setVerificationStatus(Document.DocumentVerificationStatus.REUPLOAD_REQUIRED);
        document.setNotes(reason);

        return documentRepository.save(document);
    }

    public Long countByMemberId(Integer memberId) {
        return documentRepository.countByMemberId(memberId);
    }

    public Long countByVerificationStatus(Document.DocumentVerificationStatus verificationStatus) {
        return documentRepository.countByVerificationStatus(verificationStatus);
    }
}
