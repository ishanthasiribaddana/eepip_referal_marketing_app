package lk.temcobank.eepip.service;

import lk.temcobank.eepip.entity.AiEngineer;
import lk.temcobank.eepip.entity.Epin;
import lk.temcobank.eepip.entity.Payment;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

/**
 * Payment Service - Business logic for Payment entity.
 */
@Stateless
public class PaymentService {

    @EJB
    private lk.temcobank.eepip.repository.PaymentRepository paymentRepository;

    @EJB
    private AiEngineerService aiEngineerService;

    @EJB
    private EpinService epinService;

    public Payment findById(Integer id) {
        return paymentRepository.findById(id);
    }

    public List<Payment> findAll() {
        return paymentRepository.findAll();
    }

    public List<Payment> findByAiEngineer(AiEngineer aiEngineer) {
        return paymentRepository.findByAiEngineer(aiEngineer);
    }

    public List<Payment> findByAiEngineerId(Integer aiEngineerId) {
        return paymentRepository.findByAiEngineerId(aiEngineerId);
    }

    public List<Payment> findByPaymentMethod(Payment.PaymentMethod paymentMethod) {
        return paymentRepository.findByPaymentMethod(paymentMethod);
    }

    public List<Payment> findByStatus(Payment.PaymentStatus status) {
        return paymentRepository.findByStatus(status);
    }

    public List<Payment> findByPaymentDate(LocalDate paymentDate) {
        return paymentRepository.findByPaymentDate(paymentDate);
    }

    public List<Payment> findByBankReference(String bankReference) {
        return paymentRepository.findByBankReference(bankReference);
    }

    public List<Payment> findPendingPayments() {
        return paymentRepository.findPendingPayments();
    }

    public Payment createPayment(Payment payment) {
        validatePayment(payment);
        return paymentRepository.save(payment);
    }

    public Payment recordPayment(Integer aiEngineerId, BigDecimal amount, Payment.PaymentMethod paymentMethod,
                                  String bankReference, String transactionId, LocalDate paymentDate) {
        AiEngineer aiEngineer = aiEngineerService.findById(aiEngineerId);
        if (aiEngineer == null) {
            throw new IllegalArgumentException("AI Engineer not found with ID: " + aiEngineerId);
        }

        Payment payment = new Payment(aiEngineer, amount, paymentMethod, paymentDate);
        payment.setBankReference(bankReference);
        payment.setTransactionId(transactionId);
        payment.setStatus(Payment.PaymentStatus.PENDING);

        return paymentRepository.save(payment);
    }

    public Payment confirmPayment(Integer paymentId, java.time.LocalDateTime confirmedAt) {
        Payment payment = paymentRepository.findById(paymentId);
        if (payment == null) {
            throw new IllegalArgumentException("Payment not found with ID: " + paymentId);
        }

        if (payment.getStatus() != Payment.PaymentStatus.PENDING) {
            throw new IllegalArgumentException("Payment is not in PENDING status");
        }

        payment.setStatus(Payment.PaymentStatus.CONFIRMED);
        payment.setConfirmedAt(confirmedAt);

        return paymentRepository.save(payment);
    }

    public Payment failPayment(Integer paymentId, String reason) {
        Payment payment = paymentRepository.findById(paymentId);
        if (payment == null) {
            throw new IllegalArgumentException("Payment not found with ID: " + paymentId);
        }

        if (payment.getStatus() != Payment.PaymentStatus.PENDING) {
            throw new IllegalArgumentException("Payment is not in PENDING status");
        }

        payment.setStatus(Payment.PaymentStatus.FAILED);
        payment.setNotes(reason);

        return paymentRepository.save(payment);
    }

    public Payment linkEpin(Integer paymentId, Integer epinId) {
        Payment payment = paymentRepository.findById(paymentId);
        if (payment == null) {
            throw new IllegalArgumentException("Payment not found with ID: " + paymentId);
        }

        Epin epin = epinService.findById(epinId);
        if (epin == null) {
            throw new IllegalArgumentException("Epin not found with ID: " + epinId);
        }

        payment.setEpin(epin);
        return paymentRepository.save(payment);
    }

    public BigDecimal getTotalPaymentsByAiEngineer(Integer aiEngineerId) {
        return paymentRepository.sumByAiEngineer(aiEngineerId);
    }

    private void validatePayment(Payment payment) {
        if (payment.getAiEngineer() == null) {
            throw new IllegalArgumentException("AI Engineer is required");
        }
        if (payment.getAmount() == null || payment.getAmount().compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Payment amount must be positive");
        }
        if (payment.getPaymentMethod() == null) {
            throw new IllegalArgumentException("Payment method is required");
        }
        if (payment.getPaymentDate() == null) {
            throw new IllegalArgumentException("Payment date is required");
        }
    }
}
