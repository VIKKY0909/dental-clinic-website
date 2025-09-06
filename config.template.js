// Configuration template for Web3Forms
// Copy this file to config.js and replace the placeholder values with your actual credentials
// DO NOT commit config.js to version control

const WEB3FORMS_CONFIG = {
    // Web3Forms Access Key - Replace with your actual access key
    ACCESS_KEY: 'YOUR_WEB3FORMS_ACCESS_KEY_HERE',
    
    // Form endpoints
    ENDPOINTS: {
        CONTACT: 'https://api.web3forms.com/submit',
        WORK_WITH_US: 'https://api.web3forms.com/submit'
    },
    
    // Image upload settings (using ImgBB - free service)
    IMAGE_UPLOAD: {
        ENABLED: true,
        API_KEY: 'YOUR_IMGBB_API_KEY', // Get free API key from https://api.imgbb.com/
        UPLOAD_URL: 'https://api.imgbb.com/1/upload',
        MAX_FILE_SIZE: 32 * 1024 * 1024, // 32MB max file size
        ALLOWED_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
    },
    
    // Security settings
    SECURITY: {
        ENABLE_IP_CAPTURE: true,
        ENABLE_HUMAN_VERIFICATION: true,
        CAPTCHA_SITE_KEY: 'YOUR_RECAPTCHA_SITE_KEY', // Replace with your reCAPTCHA site key if using Google reCAPTCHA
        RATE_LIMIT_ENABLED: true,
        MAX_SUBMISSIONS_PER_HOUR: 5
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WEB3FORMS_CONFIG;
}
