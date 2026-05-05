package lk.temcobank.eepip.rest;

import lk.temcobank.eepip.entity.Payment;
import lk.temcobank.eepip.service.PaymentService;

import javax.ejb.EJB;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

/**
 * Payment REST endpoints.
 * Base path: /api/v3/payments
 */
@Path("/v3/payments")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class PaymentResource {

    @EJB
    private PaymentService paymentService;

    @GET
    public Response listAll(@QueryParam("status") String status,
                            @QueryParam("aiEngineerId") Integer aiEngineerId) {
        List<Payment> payments;
        if (aiEngineerId != null) {
            payments = paymentService.findByAiEngineerId(aiEngineerId);
        } else if (status != null) {
            payments = paymentService.findByStatus(Payment.PaymentStatus.valueOf(status.toUpperCase()));
        } else {
            payments = paymentService.findAll();
        }
        return Response.ok(payments).build();
    }

    @GET
    @Path("/pending")
    public Response getPending() {
        List<Payment> payments = paymentService.findPendingPayments();
        return Response.ok(payments).build();
    }

    @GET
    @Path("/{id}")
    public Response getById(@PathParam("id") Integer id) {
        Payment payment = paymentService.findById(id);
        if (payment == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(payment).build();
    }

    @POST
    public Response record(Payment payment) {
        Payment created = paymentService.createPayment(payment);
        return Response.status(Response.Status.CREATED).entity(created).build();
    }

    @POST
    @Path("/record")
    public Response recordPayment(@FormParam("aiEngineerId") Integer aiEngineerId,
                                   @FormParam("amount") BigDecimal amount,
                                   @FormParam("paymentMethod") String paymentMethod,
                                   @FormParam("bankReference") String bankReference,
                                   @FormParam("transactionId") String transactionId,
                                   @FormParam("paymentDate") String paymentDate) {
        LocalDate date = paymentDate != null ? LocalDate.parse(paymentDate) : LocalDate.now();
        Payment.PaymentMethod method = Payment.PaymentMethod.valueOf(paymentMethod.toUpperCase());
        Payment created = paymentService.recordPayment(aiEngineerId, amount, method, bankReference, transactionId, date);
        return Response.status(Response.Status.CREATED).entity(created).build();
    }

    @PUT
    @Path("/{id}/confirm")
    public Response confirm(@PathParam("id") Integer id, @QueryParam("confirmedAt") String confirmedAt) {
        LocalDateTime confirmedAtTime = confirmedAt != null ? LocalDateTime.parse(confirmedAt) : LocalDateTime.now();
        Payment confirmed = paymentService.confirmPayment(id, confirmedAtTime);
        return Response.ok(confirmed).build();
    }

    @PUT
    @Path("/{id}/fail")
    public Response fail(@PathParam("id") Integer id, @FormParam("reason") String reason) {
        Payment failed = paymentService.failPayment(id, reason);
        return Response.ok(failed).build();
    }

    @PUT
    @Path("/{id}/link-epin")
    public Response linkEpin(@PathParam("id") Integer id, @FormParam("epinId") Integer epinId) {
        Payment linked = paymentService.linkEpin(id, epinId);
        return Response.ok(linked).build();
    }

    @GET
    @Path("/ai-engineer/{aiEngineerId}/total")
    public Response getTotal(@PathParam("aiEngineerId") Integer aiEngineerId) {
        BigDecimal total = paymentService.getTotalPaymentsByAiEngineer(aiEngineerId);
        Map<String, Object> result = Map.of("aiEngineerId", aiEngineerId, "totalPayments", total);
        return Response.ok(result).build();
    }
}
