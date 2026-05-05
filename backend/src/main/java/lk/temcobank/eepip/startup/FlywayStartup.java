package lk.temcobank.eepip.startup;

import org.flywaydb.core.Flyway;
import org.flywaydb.core.api.FlywayException;

import javax.annotation.PostConstruct;
import javax.ejb.Singleton;
import javax.ejb.Startup;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * Startup bean that automatically runs Flyway migrations on application deployment.
 * Uses the Flyway API to detect and apply any pending migrations.
 * With baselineOnMigrate=true, it will automatically baseline existing schemas.
 */
@Singleton
@Startup
public class FlywayStartup {

    private static final Logger LOGGER = Logger.getLogger(FlywayStartup.class.getName());

    @PostConstruct
    public void runMigrations() {
        String enabled = System.getProperty("flyway.enabled", "true");
        if (!Boolean.parseBoolean(enabled)) {
            LOGGER.info("Flyway migrations disabled via system property flyway.enabled=false. Skipping.");
            return;
        }
        try {
            LOGGER.info("Starting Flyway migration check...");

            // Read Flyway configuration from system properties or defaults
            String url = System.getProperty("flyway.url", "jdbc:mariadb://localhost:3306/temco_system");
            String user = System.getProperty("flyway.user", "root");
            String password = System.getProperty("flyway.password", "6qZB6d@pIvj");
            String locations = System.getProperty("flyway.locations", "classpath:db/migration");
            String baselineOnMigrate = System.getProperty("flyway.baselineOnMigrate", "true");
            String baselineVersion = System.getProperty("flyway.baselineVersion", "0");
            String validateOnMigrate = System.getProperty("flyway.validateOnMigrate", "true");

            LOGGER.info("Flyway configuration:");
            LOGGER.info("  URL: " + url);
            LOGGER.info("  User: " + user);
            LOGGER.info("  Locations: " + locations);
            LOGGER.info("  Baseline On Migrate: " + baselineOnMigrate);
            LOGGER.info("  Baseline Version: " + baselineVersion);
            LOGGER.info("  Validate On Migrate: " + validateOnMigrate);

            Flyway flyway = Flyway.configure()
                    .dataSource(url, user, password)
                    .locations(locations)
                    .baselineOnMigrate(Boolean.parseBoolean(baselineOnMigrate))
                    .baselineVersion(baselineVersion)
                    .table("eepip_flyway_schema_history")
                    .validateOnMigrate(Boolean.parseBoolean(validateOnMigrate))
                    .load();

            // Check migration status
            flyway.migrate();

            LOGGER.info("Flyway migration completed successfully.");
            LOGGER.info("EEPIP database schema is up to date.");

        } catch (FlywayException e) {
            LOGGER.log(Level.SEVERE, "Flyway migration failed", e);
            throw new RuntimeException("Failed to run Flyway migrations", e);
        } catch (Exception e) {
            LOGGER.log(Level.SEVERE, "Unexpected error during Flyway startup", e);
            throw new RuntimeException("Unexpected error during Flyway startup", e);
        }
    }
}
