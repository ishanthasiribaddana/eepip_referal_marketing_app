package lk.temcobank.eepip.rest;

import lk.temcobank.eepip.entity.Withdrawal;
import lk.temcobank.eepip.service.WithdrawalService;

import javax.ejb.EJB;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

/**
 * Withdrawal REST endpoints.
 * Base path: /api/v3/withdrawals
 */
@Path("/v3/withdrawals")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class WithdrawalResource {

    @EJB
    private WithdrawalService withdrawalService;

    @GET
    public Response listAll(@QueryParam("status") String status,
                            @QueryParam("memberId") Integer memberId) {
        List<Withdrawal> withdrawals;
        if (memberId != null) {
            withdrawals = withdrawalService.findByMemberId(memberId);
        } else if (status != null) {
            withdrawals = withdrawalService.findByStatus(Withdrawal.WithdrawalStatus.valueOf(status.toUpperCase()));
        } else {
            withdrawals = withdrawalService.findAll();
        }
        return Response.ok(withdrawals).build();
    }

    @GET
    @Path("/pending")
    public Response getPending() {
        List<Withdrawal> withdrawals = withdrawalService.findPendingWithdrawals();
        return Response.ok(withdrawals).build();
    }

    @GET
    @Path("/pending-verification")
    public Response getPendingVerification() {
        List<Withdrawal> withdrawals = withdrawalService.findPendingVerificationWithdrawals();
        return Response.ok(withdrawals).build();
    }

    @GET
    @Path("/{id}")
    public Response getById(@PathParam("id") Integer id) {
        Withdrawal withdrawal = withdrawalService.findById(id);
        if (withdrawal == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(withdrawal).build();
    }

    @POST
    public Response request(Withdrawal withdrawal) {
        Withdrawal created = withdrawalService.createWithdrawal(withdrawal);
        return Response.status(Response.Status.CREATED).entity(created).build();
    }

    @POST
    @Path("/request")
    public Response requestWithdrawal(@FormParam("memberId") Integer memberId,
                                       @FormParam("amount") BigDecimal amount,
                                       @FormParam("withdrawalType") String withdrawalType,
                                       @FormParam("accountType") String accountType,
                                       @FormParam("accountNumber") String accountNumber,
                                       @FormParam("accountHolderName") String accountHolderName,
                                       @FormParam("bankName") String bankName,
                                       @FormParam("bankBranch") String bankBranch) {
        Withdrawal.WithdrawalType type = Withdrawal.WithdrawalType.valueOf(withdrawalType.toUpperCase());
        Withdrawal.AccountType accType = Withdrawal.AccountType.valueOf(accountType.toUpperCase());
        Withdrawal created = withdrawalService.requestWithdrawal(memberId, amount, type, accType, accountNumber, accountHolderName, bankName, bankBranch);
        return Response.status(Response.Status.CREATED).entity(created).build();
    }

    @PUT
    @Path("/{id}/submit-verification")
    public Response submitVerification(@PathParam("id") Integer id) {
        Withdrawal submitted = withdrawalService.submitForVerification(id);
        return Response.ok(submitted).build();
    }

    @PUT
    @Path("/{id}/approve")
    public Response approve(@PathParam("id") Integer id, @QueryParam("approvedBy") Integer approvedBy) {
        Withdrawal approved = withdrawalService.approveWithdrawal(id, approvedBy);
        return Response.ok(approved).build();
    }

    @PUT
    @Path("/{id}/reject")
    public Response reject(@PathParam("id") Integer id, 
                           @QueryParam("approvedBy") Integer approvedBy,
                           @FormParam("rejectionReason") String rejectionReason) {
        Withdrawal rejected = withdrawalService.rejectWithdrawal(id, approvedBy, rejectionReason);
        return Response.ok(rejected).build();
    }

    @PUT
    @Path("/{id}/paid")
    public Response markAsPaid(@PathParam("id") Integer id,
                              @QueryParam("paidDate") String paidDate,
                              @FormParam("transactionReference") String transactionReference) {
        LocalDate date = paidDate != null ? LocalDate.parse(paidDate) : LocalDate.now();
        Withdrawal paid = withdrawalService.markAsPaid(id, date, transactionReference);
        return Response.ok(paid).build();
    }

    @PUT
    @Path("/{id}/cancel")
    public Response cancel(@PathParam("id") Integer id, @FormParam("reason") String reason) {
        Withdrawal cancelled = withdrawalService.markAsCancelled(id, reason);
        return Response.ok(cancelled).build();
    }

    @GET
    @Path("/member/{memberId}/total")
    public Response getTotal(@PathParam("memberId") Integer memberId) {
        BigDecimal total = withdrawalService.getTotalWithdrawalsByMember(memberId);
        Map<String, Object> result = Map.of("memberId", memberId, "totalWithdrawals", total);
        return Response.ok(result).build();
    }
}
