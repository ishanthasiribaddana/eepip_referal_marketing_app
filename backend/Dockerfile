# EEPIP Backend - Dockerfile
# Multi-stage build: Maven build -> WildFly 27 runtime with MariaDB datasource

# ---------- Stage 1: Build ----------
FROM maven:3.9-eclipse-temurin-17 AS builder
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests -B

# ---------- Stage 2: Runtime ----------
FROM jboss/wildfly:latest

ARG MARIADB_DRIVER_VERSION=3.3.2
ENV WILDFLY_HOME=/opt/jboss/wildfly \
    MARIADB_MODULE_DIR=/opt/jboss/wildfly/modules/org/mariadb/main

USER root

# Install curl for container healthcheck
RUN yum install -y curl || true

# Create MariaDB JBoss module (filesystem layout: modules/org/mariadb/main/)
RUN mkdir -p ${MARIADB_MODULE_DIR}
ADD https://repo1.maven.org/maven2/org/mariadb/jdbc/mariadb-java-client/${MARIADB_DRIVER_VERSION}/mariadb-java-client-${MARIADB_DRIVER_VERSION}.jar \
    ${MARIADB_MODULE_DIR}/mariadb-java-client.jar
COPY docker/mariadb-module.xml ${MARIADB_MODULE_DIR}/module.xml

# Deploy WAR
COPY --from=builder /app/target/eepip-api.war ${WILDFLY_HOME}/standalone/deployments/

# Configure datasource using CLI script
COPY docker/configure-wildfly.cli /tmp/configure-wildfly.cli
RUN ${WILDFLY_HOME}/bin/jboss-cli.sh --file=/tmp/configure-wildfly.cli

# Restore ownership for non-root jboss user at runtime
RUN chown -R jboss:jboss ${WILDFLY_HOME}

USER jboss

# Default datasource env vars (override via docker-compose / -e at runtime)
ENV DB_HOST=localhost \
    DB_PORT=3306 \
    DB_NAME=eepip_db \
    DB_USER=eepip_user \
    DB_PASSWORD=eepip_password

EXPOSE 8080 9990

HEALTHCHECK --interval=30s --timeout=10s --start-period=120s --retries=3 \
    CMD curl -fsS http://localhost:8080/eepip-api/api/health || exit 1
