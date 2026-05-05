package lk.temcobank.eepip.rest;

import lk.temcobank.eepip.entity.Product;
import lk.temcobank.eepip.service.ProductService;

import javax.ejb.EJB;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

/**
 * Product REST endpoints.
 * Base path: /api/v3/products
 */
@Path("/v3/products")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ProductResource {

    @EJB
    private ProductService productService;

    @GET
    public Response listAll() {
        List<Product> products = productService.findAll();
        return Response.ok(products).build();
    }

    @GET
    @Path("/active")
    public Response getActive() {
        List<Product> products = productService.findActiveProducts();
        return Response.ok(products).build();
    }

    @GET
    @Path("/active/current")
    public Response getCurrentActive() {
        Product product = productService.getActiveProductForDate(java.time.LocalDate.now());
        if (product == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(product).build();
    }

    @GET
    @Path("/{id}")
    public Response getById(@PathParam("id") Integer id) {
        Product product = productService.findById(id);
        if (product == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(product).build();
    }

    @POST
    public Response create(Product product) {
        Product created = productService.createProduct(product);
        return Response.status(Response.Status.CREATED).entity(created).build();
    }

    @PUT
    @Path("/{id}")
    public Response update(@PathParam("id") Integer id, Product product) {
        product.setId(id);
        Product updated = productService.updateProduct(product);
        return Response.ok(updated).build();
    }

    @PUT
    @Path("/{id}/discontinue")
    public Response discontinue(@PathParam("id") Integer id) {
        productService.softDeleteProduct(id);
        return Response.ok().build();
    }
}
