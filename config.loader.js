// Secure Configuration Loader
// This file handles loading configuration securely for different environments

class ConfigLoader {
    constructor() {
        this.config = null;
        this.loadConfig();
    }

    loadConfig() {
        // Try to load from environment variables first (for platforms that support it)
        const envConfig = this.loadFromEnvironment();
        
        // Try to load from external config file
        const fileConfig = this.loadFromFile();
        
        // Use environment config if available, otherwise fall back to file config
        this.config = envConfig || fileConfig || this.getDefaultConfig();
    }

    loadFromEnvironment() {
        // Check if we're in a browser environment with environment variables
        if (typeof window !== 'undefined' && window.ENV) {
            return {
                ACCESS_KEY: window.ENV.WEB3FORMS_ACCESS_KEY,
                ENDPOINTS: {
                    CONTACT: 'https://api.web3forms.com/submit',
                    WORK_WITH_US: 'https://api.web3forms.com/submit'
                },
                IMAGE_UPLOAD: {
                    ENABLED: window.ENV.IMAGE_UPLOAD_ENABLED !== 'false',
                    API_KEY: window.ENV.IMGBB_API_KEY,
                    UPLOAD_URL: 'https://api.imgbb.com/1/upload',
                    MAX_FILE_SIZE: 32 * 1024 * 1024,
                    ALLOWED_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
                },
                SECURITY: {
                    ENABLE_IP_CAPTURE: window.ENV.ENABLE_IP_CAPTURE !== 'false',
                    ENABLE_HUMAN_VERIFICATION: window.ENV.ENABLE_HUMAN_VERIFICATION !== 'false',
                    CAPTCHA_SITE_KEY: window.ENV.RECAPTCHA_SITE_KEY || 'YOUR_RECAPTCHA_SITE_KEY',
                    RATE_LIMIT_ENABLED: window.ENV.RATE_LIMIT_ENABLED !== 'false',
                    MAX_SUBMISSIONS_PER_HOUR: parseInt(window.ENV.MAX_SUBMISSIONS_PER_HOUR) || 5
                }
            };
        }
        return null;
    }

    loadFromFile() {
        // Check if WEB3FORMS_CONFIG is already loaded
        if (typeof WEB3FORMS_CONFIG !== 'undefined') {
            return WEB3FORMS_CONFIG;
        }
        return null;
    }

    getDefaultConfig() {
        // Fallback configuration with placeholders
        return {
            ACCESS_KEY: 'YOUR_WEB3FORMS_ACCESS_KEY',
            ENDPOINTS: {
                CONTACT: 'https://api.web3forms.com/submit',
                WORK_WITH_US: 'https://api.web3forms.com/submit'
            },
            IMAGE_UPLOAD: {
                ENABLED: false, // Disabled by default for security
                API_KEY: 'YOUR_IMGBB_API_KEY',
                UPLOAD_URL: 'https://api.imgbb.com/1/upload',
                MAX_FILE_SIZE: 32 * 1024 * 1024,
                ALLOWED_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
            },
            SECURITY: {
                ENABLE_IP_CAPTURE: true,
                ENABLE_HUMAN_VERIFICATION: true,
                CAPTCHA_SITE_KEY: 'YOUR_RECAPTCHA_SITE_KEY',
                RATE_LIMIT_ENABLED: true,
                MAX_SUBMISSIONS_PER_HOUR: 5
            }
        };
    }

    getConfig() {
        return this.config;
    }

    // Method to validate configuration
    validateConfig() {
        const errors = [];
        
        if (!this.config.ACCESS_KEY || this.config.ACCESS_KEY === 'YOUR_WEB3FORMS_ACCESS_KEY') {
            errors.push('Web3Forms Access Key not configured');
        }
        
        if (this.config.IMAGE_UPLOAD.ENABLED && 
            (!this.config.IMAGE_UPLOAD.API_KEY || this.config.IMAGE_UPLOAD.API_KEY === 'YOUR_IMGBB_API_KEY')) {
            errors.push('ImgBB API Key not configured for image uploads');
        }
        
        return {
            valid: errors.length === 0,
            errors: errors
        };
    }
}

// Create global instance
const configLoader = new ConfigLoader();

// Export the configuration
const WEB3FORMS_CONFIG = configLoader.getConfig();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { WEB3FORMS_CONFIG, ConfigLoader };
}
