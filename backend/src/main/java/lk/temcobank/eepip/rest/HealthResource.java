package lk.temcobank.eepip.rest;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

/**
 * Health check endpoint.
 */
@Path("/health")
@Produces(MediaType.APPLICATION_JSON)
public class HealthResource {

    @GET
    public Response check() {
        Map<String, Object> body = new HashMap<>();
        body.put("status", "UP");
        body.put("service", "eepip-api");
        body.put("timestamp", LocalDateTime.now().toString());
        return Response.ok(body).build();
    }
}
