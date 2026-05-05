package lk.temcobank.eepip.rest;

import lk.temcobank.eepip.entity.Config;
import lk.temcobank.eepip.service.ConfigService;

import javax.ejb.EJB;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

/**
 * Config REST endpoints (Admin only).
 * Base path: /api/v3/admin/config
 */
@Path("/v3/admin/config")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ConfigResource {

    @EJB
    private ConfigService configService;

    @GET
    public Response listAll(@QueryParam("category") String category,
                            @QueryParam("configType") String configType) {
        List<Config> configs;
        if (category != null) {
            configs = configService.findByCategory(category);
        } else if (configType != null) {
            configs = configService.findByConfigType(Config.ConfigType.valueOf(configType.toUpperCase()));
        } else {
            configs = configService.findAll();
        }
        return Response.ok(configs).build();
    }

    @GET
    @Path("/active")
    public Response getActive() {
        List<Config> configs = configService.findActiveConfigs();
        return Response.ok(configs).build();
    }

    @GET
    @Path("/{key}")
    public Response getByKey(@PathParam("key") String key) {
        Config config = configService.findByConfigKey(key);
        if (config == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(config).build();
    }

    @GET
    @Path("/{key}/value")
    public Response getValue(@PathParam("key") String key) {
        String value = configService.getStringValue(key);
        if (value == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(value).build();
    }

    @POST
    public Response create(Config config) {
        Config created = configService.createConfig(config);
        return Response.status(Response.Status.CREATED).entity(created).build();
    }

    @PUT
    @Path("/{id}")
    public Response update(@PathParam("id") Integer id, Config config) {
        config.setId(id);
        Config updated = configService.updateConfig(config);
        return Response.ok(updated).build();
    }

    @DELETE
    @Path("/{id}")
    public Response delete(@PathParam("id") Integer id) {
        configService.deleteConfig(id);
        return Response.ok().build();
    }
}
