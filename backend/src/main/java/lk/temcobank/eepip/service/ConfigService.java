package lk.temcobank.eepip.service;

import lk.temcobank.eepip.entity.Config;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

/**
 * Config Service - Business logic for Config entity.
 */
@Stateless
public class ConfigService {

    @EJB
    private lk.temcobank.eepip.repository.ConfigRepository configRepository;

    public Config findById(Integer id) {
        return configRepository.findById(id);
    }

    public Config findByConfigKey(String configKey) {
        return configRepository.findByConfigKey(configKey);
    }

    public List<Config> findAll() {
        return configRepository.findAll();
    }

    public List<Config> findByCategory(String category) {
        return configRepository.findByCategory(category);
    }

    public List<Config> findByConfigType(Config.ConfigType configType) {
        return configRepository.findByConfigType(configType);
    }

    public List<Config> findActiveConfigs() {
        return configRepository.findActiveConfigs();
    }

    public List<Config> findActiveConfigsForDate(LocalDate date) {
        return configRepository.findActiveConfigsForDate(date);
    }

    public Config createConfig(Config config) {
        validateConfig(config);
        return configRepository.save(config);
    }

    public Config updateConfig(Config config) {
        if (config.getId() == null) {
            throw new IllegalArgumentException("Config ID is required for update");
        }
        validateConfig(config);
        return configRepository.save(config);
    }

    public void deleteConfig(Integer id) {
        Config config = configRepository.findById(id);
        if (config == null) {
            throw new IllegalArgumentException("Config not found with ID: " + id);
        }
        configRepository.delete(config);
    }

    public String getStringValue(String configKey) {
        Config config = configRepository.findByConfigKey(configKey);
        return config != null ? config.getConfigValue() : null;
    }

    public String getStringValue(String configKey, String defaultValue) {
        String value = getStringValue(configKey);
        return value != null ? value : defaultValue;
    }

    public Integer getIntValue(String configKey) {
        Config config = configRepository.findByConfigKey(configKey);
        return config != null ? Integer.parseInt(config.getConfigValue()) : null;
    }

    public Integer getIntValue(String configKey, Integer defaultValue) {
        Integer value = getIntValue(configKey);
        return value != null ? value : defaultValue;
    }

    public BigDecimal getDecimalValue(String configKey) {
        Config config = configRepository.findByConfigKey(configKey);
        return config != null ? new BigDecimal(config.getConfigValue()) : null;
    }

    public BigDecimal getDecimalValue(String configKey, BigDecimal defaultValue) {
        BigDecimal value = getDecimalValue(configKey);
        return value != null ? value : defaultValue;
    }

    public Boolean getBooleanValue(String configKey) {
        Config config = configRepository.findByConfigKey(configKey);
        return config != null ? Boolean.parseBoolean(config.getConfigValue()) : null;
    }

    public Boolean getBooleanValue(String configKey, Boolean defaultValue) {
        Boolean value = getBooleanValue(configKey);
        return value != null ? value : defaultValue;
    }

    private void validateConfig(Config config) {
        if (config.getConfigKey() == null || config.getConfigKey().trim().isEmpty()) {
            throw new IllegalArgumentException("Config key is required");
        }
        if (config.getConfigType() == null) {
            throw new IllegalArgumentException("Config type is required");
        }
        if (config.getEffectiveFrom() == null) {
            throw new IllegalArgumentException("Effective from date is required");
        }
        if (config.getEffectiveTo() != null && config.getEffectiveTo().isBefore(config.getEffectiveFrom())) {
            throw new IllegalArgumentException("Effective to date must be after effective from date");
        }

        // Check if key already exists
        Config existing = configRepository.findByConfigKey(config.getConfigKey());
        if (existing != null && !existing.getId().equals(config.getId())) {
            throw new IllegalArgumentException("Config key already exists: " + config.getConfigKey());
        }
    }
}
