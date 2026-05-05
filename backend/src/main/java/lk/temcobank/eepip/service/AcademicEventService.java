package lk.temcobank.eepip.service;

import lk.temcobank.eepip.entity.AcademicEvent;
import lk.temcobank.eepip.entity.AiEngineer;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

/**
 * AcademicEvent Service - Business logic for AcademicEvent entity.
 */
@Stateless
public class AcademicEventService {

    @EJB
    private lk.temcobank.eepip.repository.AcademicEventRepository academicEventRepository;

    @EJB
    private AiEngineerService aiEngineerService;

    public AcademicEvent findById(Integer id) {
        return academicEventRepository.findById(id);
    }

    public List<AcademicEvent> findAll() {
        return academicEventRepository.findAll();
    }

    public List<AcademicEvent> findByAiEngineer(AiEngineer aiEngineer) {
        return academicEventRepository.findByAiEngineer(aiEngineer);
    }

    public List<AcademicEvent> findByAiEngineerId(Integer aiEngineerId) {
        return academicEventRepository.findByAiEngineerId(aiEngineerId);
    }

    public List<AcademicEvent> findByEventType(AcademicEvent.AcademicEventType eventType) {
        return academicEventRepository.findByEventType(eventType);
    }

    public List<AcademicEvent> findByAcademicYear(Integer academicYear) {
        return academicEventRepository.findByAcademicYear(academicYear);
    }

    public List<AcademicEvent> findUnverifiedEvents() {
        return academicEventRepository.findUnverifiedEvents();
    }

    public AcademicEvent recordAcademicEvent(Integer aiEngineerId, AcademicEvent.AcademicEventType eventType,
                                               Integer academicYear, LocalDate eventDate, String description) {
        AiEngineer aiEngineer = aiEngineerService.findById(aiEngineerId);
        if (aiEngineer == null) {
            throw new IllegalArgumentException("AI Engineer not found with ID: " + aiEngineerId);
        }

        AcademicEvent event = new AcademicEvent(aiEngineer, eventType, eventDate);
        event.setAcademicYear(academicYear);
        event.setDescription(description);

        return academicEventRepository.save(event);
    }

    public AcademicEvent recordCourseRegistration(Integer aiEngineerId, LocalDate registrationDate) {
        return recordAcademicEvent(aiEngineerId, AcademicEvent.AcademicEventType.COURSE_REGISTRATION,
                LocalDate.now().getYear(), registrationDate, "Initial course registration");
    }

    public AcademicEvent recordYearPromotion(Integer aiEngineerId, Integer academicYear, LocalDate promotionDate) {
        return recordAcademicEvent(aiEngineerId, AcademicEvent.AcademicEventType.YEAR_PROMOTION,
                academicYear, promotionDate, "Year " + academicYear + " promotion");
    }

    public AcademicEvent recordCertificateIssued(Integer aiEngineerId, LocalDate issueDate) {
        return recordAcademicEvent(aiEngineerId, AcademicEvent.AcademicEventType.CERTIFICATE_ISSUED,
                LocalDate.now().getYear(), issueDate, "Certificate issued");
    }

    public AcademicEvent verifyEvent(Integer eventId, Integer verifiedBy) {
        AcademicEvent event = academicEventRepository.findById(eventId);
        if (event == null) {
            throw new IllegalArgumentException("Academic Event not found with ID: " + eventId);
        }

        event.setVerifiedAt(LocalDateTime.now());
        event.setVerifiedBy(verifiedBy);

        return academicEventRepository.save(event);
    }

    public Long countByAiEngineer(Integer aiEngineerId) {
        return academicEventRepository.countByAiEngineer(aiEngineerId);
    }
}
