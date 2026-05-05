package lk.temcobank.eepip.rest;

import lk.temcobank.eepip.entity.Agent;
import lk.temcobank.eepip.service.AgentService;

import javax.ejb.EJB;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

/**
 * Agent REST endpoints.
 * Base path: /api/v3/agents
 */
@Path("/v3/agents")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AgentResource {

    @EJB
    private AgentService agentService;

    @GET
    public Response listAll(@QueryParam("status") String status,
                            @QueryParam("sponsorId") Integer sponsorId,
                            @QueryParam("parentId") Integer parentId) {
        List<Agent> agents;
        if (sponsorId != null) {
            agents = agentService.findBySponsorAgentId(sponsorId);
        } else if (parentId != null) {
            agents = agentService.findByParentAgentId(parentId);
        } else if (status != null) {
            agents = agentService.findByStatus(Agent.AgentStatus.valueOf(status.toUpperCase()));
        } else {
            agents = agentService.findAll();
        }
        return Response.ok(agents).build();
    }

    @GET
    @Path("/active")
    public Response getActive() {
        List<Agent> agents = agentService.findActiveAgents();
        return Response.ok(agents).build();
    }

    @GET
    @Path("/{id}")
    public Response getById(@PathParam("id") Integer id) {
        Agent agent = agentService.findById(id);
        if (agent == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(agent).build();
    }

    @GET
    @Path("/member/{memberId}")
    public Response getByMemberId(@PathParam("memberId") Integer memberId) {
        Agent agent = agentService.findByMemberId(memberId);
        if (agent == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(agent).build();
    }

    @POST
    public Response create(Agent agent) {
        Agent created = agentService.createAgent(agent);
        return Response.status(Response.Status.CREATED).entity(created).build();
    }

    @POST
    @Path("/appoint")
    public Response appoint(@FormParam("memberId") Integer memberId,
                           @FormParam("sponsorAgentId") Integer sponsorAgentId,
                           @FormParam("parentAgentId") Integer parentAgentId,
                           @FormParam("position") String position,
                           @FormParam("appointedByMemberId") Integer appointedByMemberId) {
        Agent.TreePosition pos = Agent.TreePosition.valueOf(position.toUpperCase());
        Agent appointed = agentService.appointAgent(memberId, sponsorAgentId, parentAgentId, pos, appointedByMemberId);
        return Response.status(Response.Status.CREATED).entity(appointed).build();
    }

    @PUT
    @Path("/{id}")
    public Response update(@PathParam("id") Integer id, Agent agent) {
        agent.setId(id);
        Agent updated = agentService.updateAgent(agent);
        return Response.ok(updated).build();
    }

    @PUT
    @Path("/{id}/activate")
    public Response activate(@PathParam("id") Integer id) {
        agentService.activateAgent(id);
        return Response.ok().build();
    }

    @PUT
    @Path("/{id}/suspend")
    public Response suspend(@PathParam("id") Integer id) {
        agentService.suspendAgent(id);
        return Response.ok().build();
    }

    @PUT
    @Path("/{id}/terminate")
    public Response terminate(@PathParam("id") Integer id) {
        agentService.terminateAgent(id);
        return Response.ok().build();
    }

    @POST
    @Path("/{id}/referral")
    public Response recordReferral(@PathParam("id") Integer id, @FormParam("aiEngineerId") Integer aiEngineerId) {
        agentService.recordReferral(id, aiEngineerId);
        return Response.ok().build();
    }

    @PUT
    @Path("/{id}/earnings")
    public Response updateEarnings(@PathParam("id") Integer id,
                                   @FormParam("directEarnings") BigDecimal directEarnings,
                                   @FormParam("binaryEarnings") BigDecimal binaryEarnings) {
        agentService.updateEarnings(id, directEarnings, binaryEarnings);
        return Response.ok().build();
    }

    @DELETE
    @Path("/{id}")
    public Response delete(@PathParam("id") Integer id) {
        agentService.deleteAgent(id);
        return Response.ok().build();
    }
}
