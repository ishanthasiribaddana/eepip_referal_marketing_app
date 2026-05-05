package lk.temcobank.eepip.rest;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;
import java.util.Map;

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
     */
    @GET
    @Path("/lookup/{nic}")
    public Response lookupByNic(@PathParam("nic") String nic) {
        try {
            // Query member and general_user_profile tables
            String query = "SELECT m.id, gup.nic, gup.first_name, gup.last_name, gup.full_name, " +
                          "gup.mobile_no, gup.email, gup.address1, gup.address2, gup.address3 " +
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
            Map<String, Object> memberData = new java.util.HashMap<>();
            memberData.put("memberId", row[0]);
            memberData.put("nic", row[1]);
            memberData.put("firstName", row[2]);
            memberData.put("lastName", row[3]);
            memberData.put("fullName", row[4]);
            memberData.put("mobileNo", row[5]);
            memberData.put("email", row[6]);
            memberData.put("address1", row[7]);
            memberData.put("address2", row[8]);
            memberData.put("address3", row[9]);

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
     */
    @GET
    @Path("/search")
    public Response search(@QueryParam("q") String query) {
        try {
            if (query == null || query.length() < 3) {
                return Response.status(Response.Status.BAD_REQUEST)
                        .entity(Map.of("message", "Query must be at least 3 characters"))
                        .build();
            }

            String searchQuery = "SELECT m.id, gup.nic, gup.full_name, gup.mobile_no, gup.email " +
                               "FROM member m " +
                               "JOIN general_user_profile gup ON m.general_user_profile_id = gup.id " +
                               "WHERE gup.nic LIKE :query OR gup.full_name LIKE :query " +
                               "LIMIT 10";

            List<Object[]> results = em.createNativeQuery(searchQuery)
                    .setParameter("query", "%" + query + "%")
                    .getResultList();

            return Response.ok(results.stream().map(row -> Map.of(
                    "memberId", row[0],
                    "nic", row[1],
                    "fullName", row[2],
                    "mobileNo", row[3],
                    "email", row[4]
            )).toList()).build();

        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity(Map.of("error", "Failed to search members: " + e.getMessage()))
                    .build();
        }
    }
}
