package lk.temcobank.eepip.rest;

import lk.temcobank.eepip.entity.AiEngineer;
import lk.temcobank.eepip.service.AiEngineerService;

import javax.ejb.EJB;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;
import java.util.Map;

/**
 * AI Engineer REST endpoints.
 * Base path: /api/v3/ai-engineers
 */
@Path("/v3/ai-engineers")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AiEngineerResource {

    @EJB
    private AiEngineerService aiEngineerService;

    @GET
    public Response listAll(@QueryParam("page") @DefaultValue("0") int page,
                            @QueryParam("size") @DefaultValue("20") int size) {
        List<AiEngineer> engineers = aiEngineerService.findAll();
        return Response.ok(engineers).build();
    }

    @GET
    @Path("/{id}")
    public Response getById(@PathParam("id") Integer id) {
        AiEngineer engineer = aiEngineerService.findById(id);
        if (engineer == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(engineer).build();
    }

    @GET
    @Path("/member-id/{memberId}")
    public Response getByMemberId(@PathParam("memberId") Integer memberId) {
        AiEngineer engineer = aiEngineerService.findByMemberId(memberId);
        if (engineer == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(engineer).build();
    }

    @POST
    @Path("/enroll")
    public Response enroll(AiEngineer engineer) {
        AiEngineer created = aiEngineerService.createAiEngineer(engineer);
        return Response.status(Response.Status.CREATED).entity(created).build();
    }

    @GET
    @Path("/{id}/dashboard")
    public Response getDashboard(@PathParam("id") Integer id) {
        AiEngineer engineer = aiEngineerService.findById(id);
        if (engineer == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        Map<String, Object> dashboard = Map.of(
                "engineer", engineer,
                "leftBv", engineer.getLeftBv(),
                "rightBv", engineer.getRightBv(),
                "rank", engineer.getRankCode(),
                "memberState", engineer.getMemberState()
        );
        return Response.ok(dashboard).build();
    }

    @GET
    @Path("/{id}/rank-progress")
    public Response getRankProgress(@PathParam("id") Integer id) {
        AiEngineer engineer = aiEngineerService.findById(id);
        if (engineer == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        Map<String, Object> progress = Map.of(
                "currentRank", engineer.getRankCode(),
                "leftBv", engineer.getLeftBv(),
                "rightBv", engineer.getRightBv(),
                "totalVolume", engineer.getLeftBv() + engineer.getRightBv()
        );
        return Response.ok(progress).build();
    }

    @POST
    @Path("/{id}/activate")
    public Response activate(@PathParam("id") Integer id) {
        aiEngineerService.updateAiEngineerState(id, AiEngineer.MemberState.ENROLLED);
        return Response.ok().build();
    }

    @GET
    @Path("/{id}/academic-events")
    public Response getAcademicEvents(@PathParam("id") Integer id) {
        AiEngineer engineer = aiEngineerService.findById(id);
        if (engineer == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        Map<String, Object> academic = Map.of(
                "memberState", engineer.getMemberState(),
                "bscStartDate", engineer.getBscStartDate(),
                "mphilStartDate", engineer.getMphilStartDate(),
                "academicEligibilityVerified", engineer.getAcademicEligibilityVerified()
        );
        return Response.ok(academic).build();
    }
}
