// Image Upload Handler for Form Submissions
// Handles image uploads using ImgBB free service

class ImageUploadHandler {
    constructor() {
        this.config = this.loadSecureConfig();
    }

    // Load configuration securely
    loadSecureConfig() {
        // Try to load from WEB3FORMS_CONFIG if available
        if (typeof WEB3FORMS_CONFIG !== 'undefined' && WEB3FORMS_CONFIG.IMAGE_UPLOAD) {
            return WEB3FORMS_CONFIG.IMAGE_UPLOAD;
        }
        
        // Fallback configuration with placeholders
        return {
            ENABLED: false, // Disabled by default for security
            API_KEY: 'YOUR_IMGBB_API_KEY',
            UPLOAD_URL: 'https://api.imgbb.com/1/upload',
            MAX_FILE_SIZE: 32 * 1024 * 1024,
            ALLOWED_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
        };
    }

    // Validate image file
    validateImageFile(file) {
        const errors = [];

        if (!file) {
            return { valid: true }; // No file is okay
        }

        // Check file size
        if (file.size > this.config.IMAGE_UPLOAD.MAX_FILE_SIZE) {
            errors.push(`File size must be less than ${Math.round(this.config.IMAGE_UPLOAD.MAX_FILE_SIZE / 1024 / 1024)}MB`);
        }

        // Check file type
        if (!this.config.IMAGE_UPLOAD.ALLOWED_TYPES.includes(file.type)) {
            errors.push('Only JPEG, PNG, GIF, and WebP images are allowed');
        }

        return {
            valid: errors.length === 0,
            errors: errors
        };
    }

    // Convert file to base64
    fileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                // Remove data:image/...;base64, prefix
                const base64 = reader.result.split(',')[1];
                resolve(base64);
            };
            reader.onerror = error => reject(error);
        });
    }

    // Upload image to ImgBB
    async uploadImage(file) {
        try {
            if (!this.config.IMAGE_UPLOAD.ENABLED || !file) {
                return { success: false, message: 'Image upload not enabled or no file provided' };
            }

            // Validate file
            const validation = this.validateImageFile(file);
            if (!validation.valid) {
                return { success: false, message: validation.errors.join(', ') };
            }

            // Convert to base64
            const base64 = await this.fileToBase64(file);

            // Upload to ImgBB
            const formData = new FormData();
            formData.append('key', this.config.IMAGE_UPLOAD.API_KEY);
            formData.append('image', base64);
            formData.append('name', file.name);

            const response = await fetch(this.config.IMAGE_UPLOAD.UPLOAD_URL, {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                return {
                    success: true,
                    url: result.data.url,
                    deleteUrl: result.data.delete_url,
                    thumb: result.data.thumb?.url || result.data.url,
                    name: file.name,
                    size: file.size
                };
            } else {
                return { success: false, message: result.error?.message || 'Image upload failed' };
            }

        } catch (error) {
            console.error('Image upload error:', error);
            return { success: false, message: 'Image upload failed: ' + error.message };
        }
    }

    // Upload multiple images
    async uploadImages(files) {
        if (!files || files.length === 0) {
            return { success: true, images: [] };
        }

        const uploadPromises = Array.from(files).map(file => this.uploadImage(file));
        const results = await Promise.all(uploadPromises);

        const successful = results.filter(result => result.success);
        const failed = results.filter(result => !result.success);

        return {
            success: failed.length === 0,
            images: successful,
            errors: failed.map(f => f.message)
        };
    }

    // Create image preview
    createImagePreview(file, container) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.createElement('div');
            preview.className = 'image-preview';
            preview.style.cssText = `
                position: relative;
                display: inline-block;
                margin: 5px;
                border: 1px solid #ddd;
                border-radius: 4px;
                overflow: hidden;
            `;

            const img = document.createElement('img');
            img.src = e.target.result;
            img.style.cssText = `
                width: 100px;
                height: 100px;
                object-fit: cover;
                display: block;
            `;

            const removeBtn = document.createElement('button');
            removeBtn.innerHTML = '×';
            removeBtn.type = 'button';
            removeBtn.style.cssText = `
                position: absolute;
                top: 2px;
                right: 2px;
                background: rgba(255,0,0,0.8);
                color: white;
                border: none;
                border-radius: 50%;
                width: 20px;
                height: 20px;
                cursor: pointer;
                font-size: 12px;
                line-height: 1;
            `;
            removeBtn.onclick = () => {
                preview.remove();
                // Remove file from input
                const input = container.querySelector('input[type="file"]');
                if (input) {
                    input.value = '';
                }
            };

            preview.appendChild(img);
            preview.appendChild(removeBtn);
            container.appendChild(preview);
        };
        reader.readAsDataURL(file);
    }

    // Initialize image upload functionality
    initializeImageUpload(inputElement, previewContainer) {
        if (!inputElement || !previewContainer) return;

        inputElement.addEventListener('change', (e) => {
            // Clear previous previews
            previewContainer.innerHTML = '';

            const files = e.target.files;
            if (files && files.length > 0) {
                Array.from(files).forEach(file => {
                    this.createImagePreview(file, previewContainer);
                });
            }
        });
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ImageUploadHandler;
}
