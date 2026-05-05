package lk.temcobank.eepip.rest;

import lk.temcobank.eepip.entity.Commission;
import lk.temcobank.eepip.service.CommissionService;

import javax.ejb.EJB;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

/**
 * Commission REST endpoints.
 * Base path: /api/v3/commissions
 */
@Path("/v3/commissions")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class CommissionResource {

    @EJB
    private CommissionService commissionService;

    @GET
    public Response listAll(@QueryParam("status") String status,
                            @QueryParam("cycleMonth") String cycleMonth,
                            @QueryParam("aiEngineerId") Integer aiEngineerId) {
        List<Commission> commissions;
        if (aiEngineerId != null) {
            commissions = commissionService.findByAiEngineerId(aiEngineerId);
        } else if (status != null) {
            commissions = commissionService.findByStatus(Commission.CommissionStatus.valueOf(status.toUpperCase()));
        } else if (cycleMonth != null) {
            commissions = commissionService.findByCycleMonth(cycleMonth);
        } else {
            commissions = commissionService.findAll();
        }
        return Response.ok(commissions).build();
    }

    @GET
    @Path("/pending")
    public Response getPending() {
        List<Commission> commissions = commissionService.findPendingCommissions();
        return Response.ok(commissions).build();
    }

    @GET
    @Path("/{id}")
    public Response getById(@PathParam("id") Integer id) {
        Commission commission = commissionService.findById(id);
        if (commission == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(commission).build();
    }

    @GET
    @Path("/ai-engineer/{aiEngineerId}")
    public Response getByAiEngineer(@PathParam("aiEngineerId") Integer aiEngineerId,
                                     @QueryParam("cycleMonth") String cycleMonth) {
        if (cycleMonth != null) {
            BigDecimal earnings = commissionService.getAiEngineerEarnings(aiEngineerId, cycleMonth);
            Map<String, Object> result = Map.of("aiEngineerId", aiEngineerId, "cycleMonth", cycleMonth, "earnings", earnings);
            return Response.ok(result).build();
        } else {
            List<Commission> commissions = commissionService.findByAiEngineerId(aiEngineerId);
            return Response.ok(commissions).build();
        }
    }

    @POST
    public Response create(Commission commission) {
        Commission created = commissionService.createCommission(commission);
        return Response.status(Response.Status.CREATED).entity(created).build();
    }

    @PUT
    @Path("/{id}/approve")
    public Response approve(@PathParam("id") Integer id, @QueryParam("approvedBy") Integer approvedBy) {
        Commission approved = commissionService.approveCommission(id, approvedBy);
        return Response.ok(approved).build();
    }

    @PUT
    @Path("/{id}/reject")
    public Response reject(@PathParam("id") Integer id, 
                           @QueryParam("approvedBy") Integer approvedBy,
                           @FormParam("rejectionReason") String rejectionReason) {
        Commission rejected = commissionService.rejectCommission(id, approvedBy, rejectionReason);
        return Response.ok(rejected).build();
    }

    @PUT
    @Path("/{id}/paid")
    public Response markAsPaid(@PathParam("id") Integer id, @QueryParam("paidDate") String paidDate) {
        LocalDate date = paidDate != null ? LocalDate.parse(paidDate) : LocalDate.now();
        Commission paid = commissionService.markAsPaid(id, date);
        return Response.ok(paid).build();
    }

    @GET
    @Path("/ai-engineer/{aiEngineerId}/total")
    public Response getTotalEarnings(@PathParam("aiEngineerId") Integer aiEngineerId) {
        BigDecimal total = commissionService.getTotalAiEngineerEarnings(aiEngineerId);
        Map<String, Object> result = Map.of("aiEngineerId", aiEngineerId, "totalEarnings", total);
        return Response.ok(result).build();
    }
}
