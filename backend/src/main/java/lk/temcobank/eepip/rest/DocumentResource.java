package lk.temcobank.eepip.rest;

import lk.temcobank.eepip.entity.Document;
import lk.temcobank.eepip.service.DocumentService;

import javax.ejb.EJB;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.time.LocalDate;
import java.util.List;

/**
 * Document REST endpoints.
 * Base path: /api/v3/documents
 */
@Path("/v3/documents")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class DocumentResource {

    @EJB
    private DocumentService documentService;

    @GET
    public Response listAll(@QueryParam("memberId") Integer memberId,
                            @QueryParam("documentType") String documentType,
                            @QueryParam("verificationStatus") String verificationStatus) {
        List<Document> documents;
        if (memberId != null && documentType != null) {
            documents = documentService.findByMemberIdAndDocumentType(memberId, Document.DocumentType.valueOf(documentType.toUpperCase()));
        } else if (memberId != null) {
            documents = documentService.findByMemberId(memberId);
        } else if (verificationStatus != null) {
            documents = documentService.findByVerificationStatus(Document.DocumentVerificationStatus.valueOf(verificationStatus.toUpperCase()));
        } else {
            documents = documentService.findAll();
        }
        return Response.ok(documents).build();
    }

    @GET
    @Path("/pending-verification")
    public Response getPendingVerification() {
        List<Document> documents = documentService.findPendingVerificationDocuments();
        return Response.ok(documents).build();
    }

    @GET
    @Path("/primary/{memberId}")
    public Response getPrimaryDocuments(@PathParam("memberId") Integer memberId) {
        List<Document> documents = documentService.findPrimaryDocuments(memberId);
        return Response.ok(documents).build();
    }

    @GET
    @Path("/{id}")
    public Response getById(@PathParam("id") Integer id) {
        Document document = documentService.findById(id);
        if (document == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(document).build();
    }

    @POST
    public Response upload(Document document) {
        Document uploaded = documentService.uploadDocument(
                document.getMemberId(),
                document.getDocumentType(),
                document.getDocumentName(),
                document.getDocumentUrl(),
                document.getDocumentNumber(),
                document.getIssueDate(),
                document.getExpiryDate(),
                document.getFileSize(),
                document.getFileType()
        );
        return Response.status(Response.Status.CREATED).entity(uploaded).build();
    }

    @PUT
    @Path("/{id}/verify")
    public Response verify(@PathParam("id") Integer id,
                          @QueryParam("verifiedBy") Integer verifiedBy,
                          @FormParam("isVerified") Boolean isVerified,
                          @FormParam("rejectionReason") String rejectionReason) {
        Document verified = documentService.verifyDocument(id, verifiedBy, isVerified, rejectionReason);
        return Response.ok(verified).build();
    }

    @PUT
    @Path("/{id}/primary")
    public Response markAsPrimary(@PathParam("id") Integer id) {
        Document primary = documentService.markAsPrimary(id);
        return Response.ok(primary).build();
    }

    @PUT
    @Path("/{id}/request-reupload")
    public Response requestReupload(@PathParam("id") Integer id, @FormParam("reason") String reason) {
        Document updated = documentService.requestReupload(id, reason);
        return Response.ok(updated).build();
    }
}
