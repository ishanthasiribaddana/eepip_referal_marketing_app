# EEPIP Backend API

Education Easy-Pay Investment Plan - Java EE backend with JAX-RS, JPA, EJB, and Flyway migrations.

## Tech Stack

- **Java**: 11 (configured for 17 in pom.xml - reconcile as needed)
- **Framework**: Java EE 8 (JAX-RS, EJB, JPA, CDI)
- **Application Server**: WildFly 26
- **Database**: MariaDB (MySQL-compatible)
- **ORM**: Hibernate
- **Migration**: Flyway 9.22.3
- **Build Tool**: Maven 3
- **Testing**: JUnit 5 + Mockito 5

## Project Structure

```
backend/
├── src/
│   ├── main/
│   │   ├── java/lk/temcobank/eepip/
│   │   │   ├── entity/          # JPA entities (15 tables)
│   │   │   ├── repository/      # JPA repositories
│   │   │   ├── service/         # EJB services (15 services)
│   │   │   ├── resource/        # JAX-RS REST endpoints (14 resource groups)
│   │   │   ├── dto/             # Data Transfer Objects
│   │   │   ├── mapper/          # Entity-DTO mappers
│   │   │   ├── util/            # Utility classes
│   │   │   └── config/         # Application configuration
│   │   ├── resources/
│   │   │   ├── META-INF/
│   │   │   │   ├── persistence.xml    # JPA datasource config
│   │   │   │   └── beans.xml          # CDI configuration
│   │   │   ├── db/migration/          # Flyway SQL migrations (V1-V15)
│   │   │   └── application.properties # Flyway configuration
│   │   └── webapp/
│   │       └── WEB-INF/
│   │           ├── web.xml                           # Servlet config
│   │           └── jboss-deployment-structure.xml     # WildFly deployment
│   └── test/
│       └── java/lk/temcobank/eepip/
│           ├── util/            # Unit tests (CommissionCalculator)
│           ├── mapper/          # Mapper tests (5 test classes)
│           └── service/         # Service integration tests (2 test classes)
└── pom.xml                     # Maven build configuration
```

## Database Schema

15 tables organized into core and agent systems:

**Core Tables:**
- `eepip_product` - Investment products with dynamic commission rates
- `eepip_ai_engineer` - AI Engineer enrollment and binary tree
- `eepip_commission` - Commission tracking with approval workflow
- `eepip_binary_pool` - Binary pool management
- `eepip_rank_history` - Rank promotion history
- `eepip_epin` - EPIN voucher system
- `eepip_payment` - Payment transaction tracking
- `eepip_academic_event` - Academic progress tracking
- `eepip_audit_log` - System-wide audit trail
- `eepip_withdrawal` - Earnings withdrawal requests
- `eepip_config` - System configuration parameters
- `eepip_document` - Document storage and verification

**Agent System Tables:**
- `eepip_agent` - Agent network structure
- `eepip_agent_commission` - Agent commission tracking
- `eepip_agent_binary_pool` - Agent binary pool management

## Database Setup

1. **Create MariaDB database:**
```sql
CREATE DATABASE eepip_db CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci;
CREATE USER 'eepip_user'@'localhost' IDENTIFIED BY 'eepip_password';
GRANT ALL PRIVILEGES ON eepip_db.* TO 'eepip_user'@'localhost';
FLUSH PRIVILEGES;
```

2. **Configure datasource in WildFly:**
```xml
<datasource jndi-name="java:/EepipDS" pool-name="EepipDS">
    <connection-url>jdbc:mariadb://localhost:3306/eepip_db</connection-url>
    <driver>mariadb</driver>
    <security>
        <user-name>eepip_user</user-name>
        <password>eepip_password</password>
    </security>
</datasource>
```

3. **Run Flyway migrations:**
```bash
mvn flyway:migrate
```

Or use the Flyway CLI:
```bash
flyway -url=jdbc:mariadb://localhost:3306/eepip_db \
       -user=eepip_user \
       -password=eepip_password \
       -locations=classpath:db/migration \
       migrate
```

## Build & Deploy

**Build the WAR file:**
```bash
mvn clean package
```

This creates `target/eepip-api.war`.

**Deploy to WildFly:**
```bash
# Copy WAR to WildFly deployments directory
cp target/eepip-api.war $WILDFLY_HOME/standalone/deployments/

# Or use WildFly CLI
$WILDFLY_HOME/bin/jboss-cli.sh --connect --command="deploy target/eepip-api.war"
```

## Docker Deployment

### Prerequisites

- Docker 20.10+
- Docker Compose 2.0+
- External MariaDB `temco_system` database

### Quick Start with Docker Compose

1. **Copy environment configuration:**
```bash
cp .env.example .env
```

2. **Customize environment variables in `.env`** if connecting to remote database:
```env
DB_HOST=host.docker.internal
DB_PORT=3306
DB_NAME=temco_system
DB_USER=root
DB_PASSWORD=6qZB6d@pIvj
```

3. **Build and start container:**
```bash
docker-compose up --build
```

This starts the EEPIP backend connecting to the external `temco_system` database:
- **backend** - Builds WAR, deploys to WildFly 26, registers MariaDB JDBC driver and `EepipDS` datasource via offline `embed-server` CLI configuration. Uses `network_mode: host` to connect to external database.
- **Flyway migrations run automatically on startup** via `FlywayStartup` EJB bean. If the database already has EEPIP tables, Flyway will automatically baseline the schema (no manual intervention needed).

4. **Verify deployment:**
```bash
# Check container status
docker-compose ps

# Check health endpoint
curl http://localhost:8080/eepip-api/api/health
```

5. **View logs:**
```bash
docker-compose logs -f backend
```

6. **Stop container:**
```bash
docker-compose down
```

### Docker Commands

**Build image only:**
```bash
docker build -t eepip-backend:latest .
```

**Run container manually:**
```bash
docker run -d \
  -p 8080:8080 \
  -p 9990:9990 \
  --network host \
  -e DB_HOST=localhost \
  -e DB_PORT=3306 \
  -e DB_NAME=temco_system \
  -e DB_USER=root \
  -e DB_PASSWORD=6qZB6d@pIvj \
  eepip-backend:latest
```

**Access WildFly management console:**
```
http://localhost:9990/console
```

### Docker Compose Services

| Service | Image | Ports | Description |
|---------|-------|-------|-------------|
| backend | custom (WildFly 26) | 8080, 9990 | EEPIP API (connects to external temco_system) |

### Database Connection

The backend connects to an external MariaDB `temco_system` database:
- Database must exist with EEPIP tables migrated via Flyway before container start
- Uses `network_mode: host` for direct host network access to database
- Credentials configured via environment variables (DB_HOST, DB_USER, DB_PASSWORD)

### Health Checks

Backend health check:
- HTTP health check every 30s (after 90s startup grace period)
- Endpoint: `http://localhost:8080/eepip-api/api/health`

## Running Tests

```bash
# Run all tests
mvn test

# Run specific test class
mvn test -Dtest=CommissionCalculatorTest

# Run integration tests only
mvn test -Dtest=*ServiceTest
```

## API Endpoints

Base URL: `http://localhost:8080/eepip-api/api`

| Resource | Endpoints | Description |
|----------|-----------|-------------|
| `/health` | GET | Health check |
| `/products` | GET, POST, PUT, DELETE | Product management |
| `/ai-engineers` | GET, POST, PUT, DELETE | AI Engineer CRUD |
| `/binary-tree` | GET | Binary tree views |
| `/commissions` | GET, POST, PUT | Commission management |
| `/payments` | GET, POST | Payment tracking |
| `/withdrawals` | GET, POST, PUT | Withdrawal requests |
| `/academic-events` | GET, POST | Academic progress |
| `/documents` | GET, POST, PUT | Document management |
| `/agents` | GET, POST, PUT | Agent management |
| `/config` | GET, POST, PUT | System configuration |
| `/bank` | GET | Bank views (audit, members) |

## Configuration

**Application properties** (`src/main/resources/application.properties`):
```properties
flyway.url=jdbc:mariadb://localhost:3306/eepip_db
flyway.user=eepip_user
flyway.password=eepip_password
flyway.locations=classpath:db/migration
flyway.baselineOnMigrate=true
flyway.table=flyway_schema_history
```

**JPA Configuration** (`src/main/resources/META-INF/persistence.xml`):
- Persistence unit: `eepipPU`
- Datasource: `java:/EepipDS`
- Dialect: `MariaDBDialect`
- Connection pool: HikariCP (min 5, max 20)
- Second-level cache: EhCache

## CORS Configuration

CORS filter configured for `*.temcobank.com` origins. Modify `CorsFilter.java` for different origin requirements.

## Commission Calculation

Commission amounts are derived at runtime: `product.investment_amount × rate`

- Direct Sponsor: 2%
- Binary Pool: 5%
- Matching Bonus: 1.5%
- Leadership Pool: 1.5%
- Agent Direct: 2%
- Agent Binary Pool: 3%
- Bank Margin: 6%
- Institute Transfer: Remainder (79%)

## Seed Data

Default product `EEPIP_BSC_MPHIL`:
- Investment: Rs. 1,800,000
- Currency: LKR
- Max binary pairs/month: 3
- Max agent pairs/month: 2

Default config keys: TDS_RATE, WITHDRAWAL_FEE_PERCENTAGE, MIN_WITHDRAWAL_AMOUNT, MAX_WITHDRAWAL_AMOUNT, etc.

## Known Issues

- **Java version mismatch**: pom.xml properties specify Java 11, compiler plugin specifies 17. Reconcile based on target environment.
- **AiEngineerService.java**: Missing `java.time.LocalDate` import (used at lines 89, 120). Fix needed.

## Troubleshooting

**Flyway migration fails:**
- Verify database connection in `application.properties`
- Check MariaDB version compatibility (10.6+ recommended)
- Ensure `flyway_schema_history` table doesn't exist (Flyway creates it)

**Deployment fails:**
- Verify datasource JNDI name matches WildFly configuration
- Check WildFly logs for datasource connection errors
- Ensure MariaDB JDBC driver is in WildFly modules

**Tests fail to compile:**
- Ensure JUnit 5 and Mockito dependencies are in pom.xml
- Run `mvn clean install` to download dependencies

## License

Proprietary - TEMCO Bank
