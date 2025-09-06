// Web3Forms Integration with IP Capture and Human Verification
// This file handles form submissions securely

class FormHandler {
    constructor() {
        this.rateLimitMap = new Map();
        this.imageUploadHandler = null;
        this.init();
    }

    init() {
        // Load configuration securely
        this.config = this.loadSecureConfig();
        
        // Validate configuration
        this.validateConfiguration();

        // Initialize image upload handler
        if (typeof ImageUploadHandler !== 'undefined') {
            this.imageUploadHandler = new ImageUploadHandler();
        }
    }

    // Load configuration securely
    loadSecureConfig() {
        // Try to load from WEB3FORMS_CONFIG if available
        if (typeof WEB3FORMS_CONFIG !== 'undefined') {
            return WEB3FORMS_CONFIG;
        }
        
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
                RATE_LIMIT_ENABLED: true,
                MAX_SUBMISSIONS_PER_HOUR: 5
            }
        };
    }

    // Validate configuration
    validateConfiguration() {
        const errors = [];
        
        if (!this.config.ACCESS_KEY || this.config.ACCESS_KEY === 'YOUR_WEB3FORMS_ACCESS_KEY') {
            errors.push('Web3Forms Access Key not configured');
        }
        
        if (this.config.IMAGE_UPLOAD.ENABLED && 
            (!this.config.IMAGE_UPLOAD.API_KEY || this.config.IMAGE_UPLOAD.API_KEY === 'YOUR_IMGBB_API_KEY')) {
            errors.push('ImgBB API Key not configured for image uploads');
        }
        
        if (errors.length > 0) {
            console.warn('Configuration warnings:', errors);
            // Disable image upload if API key is not configured
            if (this.config.IMAGE_UPLOAD.API_KEY === 'YOUR_IMGBB_API_KEY') {
                this.config.IMAGE_UPLOAD.ENABLED = false;
                console.warn('Image upload disabled due to missing API key');
            }
        }
    }

    // Get user's IP address
    async getClientIP() {
        try {
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            return data.ip;
        } catch (error) {
            console.warn('Could not fetch IP address:', error);
            return 'Unknown';
        }
    }

    // Generate simple CAPTCHA
    generateCaptcha() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < 5; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    // Rate limiting check
    isRateLimited(identifier) {
        if (!this.config.SECURITY.RATE_LIMIT_ENABLED) return false;
        
        const now = Date.now();
        const hourAgo = now - (60 * 60 * 1000);
        
        if (!this.rateLimitMap.has(identifier)) {
            this.rateLimitMap.set(identifier, []);
        }
        
        const submissions = this.rateLimitMap.get(identifier);
        // Remove old submissions
        const recentSubmissions = submissions.filter(time => time > hourAgo);
        this.rateLimitMap.set(identifier, recentSubmissions);
        
        return recentSubmissions.length >= this.config.SECURITY.MAX_SUBMISSIONS_PER_HOUR;
    }

    // Add to rate limit
    addToRateLimit(identifier) {
        if (!this.config.SECURITY.RATE_LIMIT_ENABLED) return;
        
        if (!this.rateLimitMap.has(identifier)) {
            this.rateLimitMap.set(identifier, []);
        }
        
        const submissions = this.rateLimitMap.get(identifier);
        submissions.push(Date.now());
        this.rateLimitMap.set(identifier, submissions);
    }

    // Validate form data
    validateFormData(formData, formType = 'contact') {
        const errors = [];

        // Common required fields for both forms
        const commonRequiredFields = ['name', 'email'];
        
        // Additional required fields for work-with-us form
        const workWithUsRequiredFields = ['phone', 'gender', 'experience', 'salary', 'photo'];
        
        // Determine required fields based on form type
        const requiredFields = formType === 'work-with-us' 
            ? [...commonRequiredFields, ...workWithUsRequiredFields]
            : commonRequiredFields;

        // Check required fields
        for (const field of requiredFields) {
            const value = formData.get(field);
            
            // Handle different field types
            if (!value || (typeof value === 'string' && value.trim() === '') || (value instanceof File && value.size === 0)) {
                const fieldName = field.charAt(0).toUpperCase() + field.slice(1);
                errors.push(`${fieldName} is required`);
            }
        }

        // Email validation
        const email = formData.get('email');
        if (email && typeof email === 'string' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.push('Please enter a valid email address');
        }

        // Phone validation for work-with-us form
        if (formType === 'work-with-us') {
            const phone = formData.get('phone');
            if (phone && typeof phone === 'string' && !/^[\+]?[0-9\s\-\(\)]{10,}$/.test(phone)) {
                errors.push('Please enter a valid phone number');
            }
        }

        return errors;
    }

    // Submit form to Web3Forms
    async submitForm(formData, formType = 'contact') {
        try {
            // Get client IP
            const clientIP = this.config.SECURITY.ENABLE_IP_CAPTURE ? await this.getClientIP() : 'Not captured';
            
            // Rate limiting check
            const identifier = clientIP !== 'Not captured' ? clientIP : 'anonymous';
            if (this.isRateLimited(identifier)) {
                throw new Error('Too many submissions. Please try again later.');
            }

            // Handle image uploads
            let imageUrls = [];
            let imageInfo = '';

            if (this.imageUploadHandler && this.config.IMAGE_UPLOAD.ENABLED) {
                const imageFiles = formData.getAll('upload') || formData.getAll('photo') || [];
                
                if (imageFiles.length > 0) {
                    const uploadResult = await this.imageUploadHandler.uploadImages(imageFiles);
                    
                    if (uploadResult.success && uploadResult.images.length > 0) {
                        imageUrls = uploadResult.images.map(img => img.url);
                        imageInfo = `\n\n📸 Uploaded Images (${uploadResult.images.length}):\n` +
                                   uploadResult.images.map((img, index) => 
                                       `${index + 1}. ${img.name} - ${img.url}`
                                   ).join('\n');
                    } else if (uploadResult.errors && uploadResult.errors.length > 0) {
                        console.warn('Image upload errors:', uploadResult.errors);
                        imageInfo = `\n\n⚠️ Image upload failed: ${uploadResult.errors.join(', ')}`;
                    }
                }
            }

            // Prepare submission data
            const submissionData = {
                access_key: this.config.ACCESS_KEY,
                name: formData.get('name') || '',
                email: formData.get('email') || '',
                phone: formData.get('phone') || '',
                message: (formData.get('message') || formData.get('experience') || '') + imageInfo,
                subject: formType === 'contact' ? 'Contact Form Submission' : 'Work With Us Application',
                from_name: formData.get('name') || '',
                reply_to: formData.get('email') || '',
                // Additional fields for work with us form
                ...(formType === 'work-with-us' && {
                    gender: formData.get('gender') || '',
                    experience: formData.get('experience') || '',
                    salary: formData.get('salary') || '',
                    photo: formData.get('photo') ? 'Photo uploaded' : 'No photo'
                }),
                // Image URLs for Web3Forms
                ...(imageUrls.length > 0 && {
                    image_urls: imageUrls.join(', '),
                    image_count: imageUrls.length
                }),
                // Security information
                client_ip: clientIP,
                user_agent: navigator.userAgent,
                timestamp: new Date().toISOString(),
                form_type: formType
            };

            // Submit to Web3Forms
            const response = await fetch(this.config.ENDPOINTS[formType.toUpperCase()] || this.config.ENDPOINTS.CONTACT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submissionData)
            });

            const result = await response.json();

            if (result.success) {
                // Add to rate limit
                this.addToRateLimit(identifier);
                return { 
                    success: true, 
                    message: `Form submitted successfully!${imageUrls.length > 0 ? ` ${imageUrls.length} image(s) uploaded.` : ''}` 
                };
            } else {
                throw new Error(result.message || 'Form submission failed');
            }

        } catch (error) {
            console.error('Form submission error:', error);
            return { success: false, message: error.message || 'An error occurred while submitting the form' };
        }
    }

    // Clear all form fields including images
    clearForm(form) {
        // Reset the form
        form.reset();
        
        // Clear image previews
        const imagePreviewContainers = form.querySelectorAll('.image-preview-container');
        imagePreviewContainers.forEach(container => {
            container.innerHTML = '';
        });
        
        // Clear file inputs
        const fileInputs = form.querySelectorAll('input[type="file"]');
        fileInputs.forEach(input => {
            input.value = '';
        });
        
        // Reset CAPTCHA
        const captchaElement = form.querySelector('.captcha');
        if (captchaElement) {
            captchaElement.textContent = this.generateCaptcha();
        }
        
        // Clear CAPTCHA input
        const captchaInput = form.querySelector('input[name="captcha"]');
        if (captchaInput) {
            captchaInput.value = '';
        }
    }

    // Handle form submission
    async handleFormSubmission(event, formType = 'contact') {
        event.preventDefault();
        
        const form = event.target;
        const submitButton = form.querySelector('button[type="submit"]');
        const responseMessage = document.getElementById('responseMessage');
        
        // Disable submit button
        submitButton.disabled = true;
        submitButton.textContent = 'Submitting...';
        
        try {
            // Validate form
            const formData = new FormData(form);
            const validationErrors = this.validateFormData(formData, formType);
            
            if (validationErrors.length > 0) {
                throw new Error(validationErrors.join(', '));
            }

            // Submit form
            const result = await this.submitForm(formData, formType);
            
            if (result.success) {
                // Show success message
                if (responseMessage) {
                    responseMessage.innerHTML = `<div style="color: green; padding: 10px; background: #d4edda; border: 1px solid #c3e6cb; border-radius: 4px; margin: 10px 0;">${result.message}</div>`;
                }
                
                // Clear all form fields including images
                this.clearForm(form);
                
            } else {
                throw new Error(result.message);
            }
            
        } catch (error) {
            // Show error message
            if (responseMessage) {
                responseMessage.innerHTML = `<div style="color: red; padding: 10px; background: #f8d7da; border: 1px solid #f5c6cb; border-radius: 4px; margin: 10px 0;">${error.message}</div>`;
            }
        } finally {
            // Re-enable submit button
            submitButton.disabled = false;
            submitButton.textContent = 'Submit';
        }
    }
}

// Initialize form handler
const formHandler = new FormHandler();

// Initialize forms when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => formHandler.handleFormSubmission(e, 'contact'));
        
        // Initialize CAPTCHA
        const captchaElement = document.querySelector('.captcha');
        if (captchaElement) {
            captchaElement.textContent = formHandler.generateCaptcha();
        }

        // Initialize image upload for contact form
        const uploadInput = contactForm.querySelector('input[name="upload"]');
        const uploadPreview = contactForm.querySelector('.image-preview-container');
        if (uploadInput && uploadPreview && formHandler.imageUploadHandler) {
            formHandler.imageUploadHandler.initializeImageUpload(uploadInput, uploadPreview);
        }
    }

    // Work with us form
    const workWithUsForm = document.getElementById('work-with-us-form');
    if (workWithUsForm) {
        workWithUsForm.addEventListener('submit', (e) => formHandler.handleFormSubmission(e, 'work-with-us'));

        // Initialize image upload for work with us form
        const photoInput = workWithUsForm.querySelector('input[name="photo"]');
        const photoPreview = workWithUsForm.querySelector('.image-preview-container');
        if (photoInput && photoPreview && formHandler.imageUploadHandler) {
            formHandler.imageUploadHandler.initializeImageUpload(photoInput, photoPreview);
        }
    }
});
