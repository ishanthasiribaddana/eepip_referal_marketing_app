package lk.temcobank.eepip.rest;

import lk.temcobank.eepip.entity.AcademicEvent;
import lk.temcobank.eepip.service.AcademicEventService;

import javax.ejb.EJB;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.time.LocalDate;
import java.util.List;

/**
 * Academic Event REST endpoints.
 * Base path: /api/v3/academic-events
 */
@Path("/v3/academic-events")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AcademicEventResource {

    @EJB
    private AcademicEventService academicEventService;

    @GET
    public Response listAll(@QueryParam("aiEngineerId") Integer aiEngineerId,
                            @QueryParam("eventType") String eventType) {
        List<AcademicEvent> events;
        if (aiEngineerId != null) {
            events = academicEventService.findByAiEngineerId(aiEngineerId);
        } else if (eventType != null) {
            events = academicEventService.findByEventType(AcademicEvent.AcademicEventType.valueOf(eventType.toUpperCase()));
        } else {
            events = academicEventService.findAll();
        }
        return Response.ok(events).build();
    }

    @GET
    @Path("/unverified")
    public Response getUnverified() {
        List<AcademicEvent> events = academicEventService.findUnverifiedEvents();
        return Response.ok(events).build();
    }

    @GET
    @Path("/{id}")
    public Response getById(@PathParam("id") Integer id) {
        AcademicEvent event = academicEventService.findById(id);
        if (event == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(event).build();
    }

    @POST
    public Response record(AcademicEvent event) {
        AcademicEvent created = academicEventService.recordAcademicEvent(
                event.getAiEngineer().getId(),
                event.getEventType(),
                event.getAcademicYear(),
                event.getEventDate(),
                event.getDescription()
        );
        return Response.status(Response.Status.CREATED).entity(created).build();
    }

    @POST
    @Path("/registration")
    public Response recordRegistration(@FormParam("aiEngineerId") Integer aiEngineerId,
                                       @FormParam("registrationDate") String registrationDate) {
        LocalDate date = registrationDate != null ? LocalDate.parse(registrationDate) : LocalDate.now();
        AcademicEvent created = academicEventService.recordCourseRegistration(aiEngineerId, date);
        return Response.status(Response.Status.CREATED).entity(created).build();
    }

    @POST
    @Path("/promotion")
    public Response recordPromotion(@FormParam("aiEngineerId") Integer aiEngineerId,
                                    @FormParam("academicYear") Integer academicYear,
                                    @FormParam("promotionDate") String promotionDate) {
        LocalDate date = promotionDate != null ? LocalDate.parse(promotionDate) : LocalDate.now();
        AcademicEvent created = academicEventService.recordYearPromotion(aiEngineerId, academicYear, date);
        return Response.status(Response.Status.CREATED).entity(created).build();
    }

    @POST
    @Path("/certificate")
    public Response recordCertificate(@FormParam("aiEngineerId") Integer aiEngineerId,
                                     @FormParam("issueDate") String issueDate) {
        LocalDate date = issueDate != null ? LocalDate.parse(issueDate) : LocalDate.now();
        AcademicEvent created = academicEventService.recordCertificateIssued(aiEngineerId, date);
        return Response.status(Response.Status.CREATED).entity(created).build();
    }

    @PUT
    @Path("/{id}/verify")
    public Response verify(@PathParam("id") Integer id, @QueryParam("verifiedBy") Integer verifiedBy) {
        AcademicEvent verified = academicEventService.verifyEvent(id, verifiedBy);
        return Response.ok(verified).build();
    }
}
