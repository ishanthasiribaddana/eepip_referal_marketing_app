package lk.temcobank.eepip.rest;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

/**
 * JAX-RS Application configuration.
 * WildFly auto-discovers REST endpoints under this path.
 */
@ApplicationPath("/api")
public class ApplicationConfig extends Application {
}
