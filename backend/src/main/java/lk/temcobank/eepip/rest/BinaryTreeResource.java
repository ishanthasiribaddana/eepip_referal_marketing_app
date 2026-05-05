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
 * Binary Tree REST endpoints.
 * Base path: /api/v3/tree
 */
@Path("/v3/tree")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class BinaryTreeResource {

    @EJB
    private AiEngineerService aiEngineerService;

    @GET
    @Path("/{memberId}/downline")
    public Response getDownline(@PathParam("memberId") Integer memberId,
                                 @QueryParam("depth") @DefaultValue("3") int depth) {
        List<AiEngineer> downline = aiEngineerService.findByParentId(memberId);
        return Response.ok(downline).build();
    }

    @GET
    @Path("/{memberId}/left-leg")
    public Response getLeftLeg(@PathParam("memberId") Integer memberId) {
        List<AiEngineer> leftLeg = aiEngineerService.findByParentId(memberId);
        leftLeg.removeIf(e -> e.getPosition() != AiEngineer.TreePosition.LEFT);
        return Response.ok(leftLeg).build();
    }

    @GET
    @Path("/{memberId}/right-leg")
    public Response getRightLeg(@PathParam("memberId") Integer memberId) {
        List<AiEngineer> rightLeg = aiEngineerService.findByParentId(memberId);
        rightLeg.removeIf(e -> e.getPosition() != AiEngineer.TreePosition.RIGHT);
        return Response.ok(rightLeg).build();
    }

    @GET
    @Path("/{memberId}/volume")
    public Response getVolume(@PathParam("memberId") Integer memberId) {
        AiEngineer engineer = aiEngineerService.findByMemberId(memberId);
        if (engineer == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        Map<String, Object> volume = Map.of(
                "leftBv", engineer.getLeftBv(),
                "rightBv", engineer.getRightBv(),
                "carryForwardLeftBv", engineer.getCarryForwardLeftBv(),
                "carryForwardRightBv", engineer.getCarryForwardRightBv(),
                "totalLeft", engineer.getLeftBv() + engineer.getCarryForwardLeftBv(),
                "totalRight", engineer.getRightBv() + engineer.getCarryForwardRightBv()
        );
        return Response.ok(volume).build();
    }
}
