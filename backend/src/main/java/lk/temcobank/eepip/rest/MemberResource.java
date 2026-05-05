package lk.temcobank.eepip.rest;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Member lookup REST endpoints for EEPIP integration with shared member table.
 * Base path: /api/v3/members
 */
@Path("/v3/members")
@Produces(MediaType.APPLICATION_JSON)
public class MemberResource {

    @PersistenceContext
    private EntityManager em;

    /**
     * Find member by NIC (National Identity Card)
     * Used for auto-complete in registration form
     * Queries general_user_profile first, then verifies in member table
     */
    @GET
    @Path("/lookup/{nic}")
    public Response lookupByNic(@PathParam("nic") String nic) {
        try {
            // Query general_user_profile and join with member to verify membership
            String query = "SELECT m.id, gup.nic, " +
                          "CONCAT(gup.first_name, ' ', gup.last_name) as full_name, " +
                          "gup.mobile_no, gup.email " +
                          "FROM member m " +
                          "JOIN general_user_profile gup ON m.general_user_profile_id = gup.id " +
                          "WHERE gup.nic = :nic";

            List<Object[]> results = em.createNativeQuery(query)
                    .setParameter("nic", nic)
                    .getResultList();

            if (results.isEmpty()) {
                return Response.status(Response.Status.NOT_FOUND)
                        .entity(Map.of("message", "Member not found with NIC: " + nic))
                        .build();
            }

            Object[] row = results.get(0);
            Map<String, Object> memberData = new HashMap<>();
            memberData.put("memberId", row[0]);
            memberData.put("nic", row[1]);
            memberData.put("fullName", row[2]);
            memberData.put("mobileNo", row[3]);
            memberData.put("email", row[4]);

            return Response.ok(memberData).build();

        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity(Map.of("error", "Failed to lookup member: " + e.getMessage()))
                    .build();
        }
    }

    /**
     * Search members by partial NIC or name
     * Used for auto-complete dropdown
     * Queries general_user_profile first, then verifies in member table
     */
    @GET
    @Path("/search")
    public Response search(@QueryParam("q") String query) {
        if (query == null || query.length() < 3) {
            return Response.ok(new ArrayList<>()).build();
        }

        String sql = "SELECT m.id, g.nic, CONCAT(g.first_name, ' ', g.last_name) as full_name, g.mobile_no, g.email " +
                     "FROM member m " +
                     "JOIN general_user_profile g ON m.general_user_profile_id = g.id " +
                     "WHERE g.nic LIKE ? OR CONCAT(g.first_name, ' ', g.last_name) LIKE ? " +
                     "ORDER BY g.first_name, g.last_name " +
                     "LIMIT 10";

        String searchPattern = "%" + query + "%";

        List<Object[]> results = em.createNativeQuery(sql)
                .setParameter(1, searchPattern)
                .setParameter(2, searchPattern)
                .getResultList();

        List<Map<String, Object>> members = results.stream()
                .map(row -> {
                    Map<String, Object> member = new HashMap<>();
                    member.put("memberId", row[0]);
                    member.put("nic", row[1]);
                    member.put("fullName", row[2]);
                    member.put("mobileNo", row[3]);
                    member.put("email", row[4]);
                    return member;
                })
                .collect(Collectors.toList());

        return Response.ok(members).build();
    }

    /**
     * Search AI Engineer sponsors by partial NIC or name
     * Used for sponsor selection in enrollment
     * Path: general_user_profile -> member -> ai_engineer
     */
    @GET
    @Path("/sponsors/search")
    public Response searchSponsors(@QueryParam("q") String query) {
        if (query == null || query.length() < 3) {
            return Response.ok(new ArrayList<>()).build();
        }

        String sql = "SELECT m.id, g.nic, CONCAT(g.first_name, ' ', g.last_name) as full_name, g.mobile_no, g.email, a.id as ai_engineer_id " +
                     "FROM ai_engineer a " +
                     "JOIN member m ON a.member_id = m.id " +
                     "JOIN general_user_profile g ON m.profile_id = g.id " +
                     "WHERE g.nic LIKE ? OR CONCAT(g.first_name, ' ', g.last_name) LIKE ? " +
                     "ORDER BY g.first_name, g.last_name " +
                     "LIMIT 10";

        String searchPattern = "%" + query + "%";

        List<Object[]> results = em.createNativeQuery(sql)
                .setParameter(1, searchPattern)
                .setParameter(2, searchPattern)
                .getResultList();

        List<Map<String, Object>> sponsors = results.stream()
                .map(row -> {
                    Map<String, Object> sponsor = new HashMap<>();
                    sponsor.put("memberId", row[0]);
                    sponsor.put("nic", row[1]);
                    sponsor.put("fullName", row[2]);
                    sponsor.put("mobileNo", row[3]);
                    sponsor.put("email", row[4]);
                    sponsor.put("aiEngineerId", row[5]);
                    return sponsor;
                })
                .collect(Collectors.toList());

        return Response.ok(sponsors).build();
    }
}
