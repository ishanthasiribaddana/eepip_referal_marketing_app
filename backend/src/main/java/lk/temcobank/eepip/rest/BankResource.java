package lk.temcobank.eepip.rest;

import lk.temcobank.eepip.entity.AiEngineer;
import lk.temcobank.eepip.entity.Withdrawal;
import lk.temcobank.eepip.service.AiEngineerService;
import lk.temcobank.eepip.service.WithdrawalService;

import javax.ejb.EJB;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Bank REST endpoints (Bank read-only access).
 * Base path: /api/v3/bank
 */
@Path("/v3/bank")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class BankResource {

    @EJB
    private AiEngineerService aiEngineerService;

    @EJB
    private WithdrawalService withdrawalService;

    @GET
    @Path("/audit/overview")
    public Response getAuditOverview() {
        List<AiEngineer> allEngineers = aiEngineerService.findAll();
        List<Withdrawal> pendingWithdrawals = withdrawalService.findPendingWithdrawals();
        List<Withdrawal> pendingVerification = withdrawalService.findPendingVerificationWithdrawals();
        
        Map<String, Object> overview = Map.of(
                "totalAiEngineers", allEngineers.size(),
                "activeAiEngineers", allEngineers.stream().filter(e -> e.getMemberState() == AiEngineer.MemberState.ENROLLED).count(),
                "pendingWithdrawals", pendingWithdrawals.size(),
                "pendingVerification", pendingVerification.size(),
                "totalWithdrawalsPendingAmount", pendingWithdrawals.stream().map(Withdrawal::getAmount).reduce(BigDecimal.ZERO, BigDecimal::add)
        );
        return Response.ok(overview).build();
    }

    @GET
    @Path("/members/{id}")
    public Response getMemberView(@PathParam("id") Integer memberId) {
        AiEngineer engineer = aiEngineerService.findByMemberId(memberId);
        if (engineer == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        
        List<Withdrawal> withdrawals = withdrawalService.findByMemberId(memberId);
        
        Map<String, Object> memberView = Map.of(
                "memberId", engineer.getMemberId(),
                "memberState", engineer.getMemberState(),
                "rank", engineer.getRankCode(),
                "totalEarnings", engineer.getTotalEarnings(),
                "leftBv", engineer.getLeftBv(),
                "rightBv", engineer.getRightBv(),
                "withdrawals", withdrawals,
                "totalWithdrawals", withdrawals.stream().map(Withdrawal::getAmount).reduce(BigDecimal.ZERO, BigDecimal::add)
        );
        return Response.ok(memberView).build();
    }

    @GET
    @Path("/members/search")
    public Response searchMembers(@QueryParam("q") String query) {
        if (query == null || query.trim().isEmpty()) {
            return Response.status(Response.Status.BAD_REQUEST).entity("Query parameter 'q' is required").build();
        }
        
        List<AiEngineer> allEngineers = aiEngineerService.findAll();
        List<AiEngineer> filtered = allEngineers.stream()
                .filter(e -> e.getMemberId().toString().contains(query) || 
                           (e.getMemberState() != null && e.getMemberState().name().toLowerCase().contains(query.toLowerCase())))
                .collect(Collectors.toList());
        
        return Response.ok(filtered).build();
    }

    @GET
    @Path("/disbursements/pending")
    public Response getPendingDisbursements() {
        List<Withdrawal> pending = withdrawalService.findPendingVerificationWithdrawals();
        return Response.ok(pending).build();
    }

    @POST
    @Path("/disbursements/confirm")
    public Response confirmDisbursement(@FormParam("withdrawalId") Integer withdrawalId,
                                        @FormParam("transactionReference") String transactionReference) {
        Withdrawal withdrawal = withdrawalService.findById(withdrawalId);
        if (withdrawal == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        
        if (withdrawal.getStatus() != Withdrawal.WithdrawalStatus.APPROVED) {
            return Response.status(Response.Status.BAD_REQUEST).entity("Withdrawal must be APPROVED before confirmation").build();
        }
        
        Withdrawal confirmed = withdrawalService.markAsPaid(withdrawalId, java.time.LocalDate.now(), transactionReference);
        return Response.ok(confirmed).build();
    }
}
