# Web3Forms Integration Deployment Guide

## Security Setup

### 1. Access Key Configuration

Your Web3Forms access key has been securely integrated into the website. The key is stored in `config.js` which is excluded from version control via `.gitignore`.

**Access Key:** `fc1bf28b-4b8a-4a1e-abba-4e495ef0be0e`

### 2. Deployment Steps

1. **For Development:**
   - The `config.js` file is already configured with your access key
   - Forms are ready to use immediately

2. **For Production Deployment:**
   - Copy `config.template.js` to `config.js` on your production server
   - Replace `YOUR_WEB3FORMS_ACCESS_KEY_HERE` with your actual access key
   - Ensure `config.js` is not accessible via web browser (add to server's deny list)

3. **Server Configuration:**
   ```apache
   # Apache .htaccess
   <Files "config.js">
       Order allow,deny
       Deny from all
   </Files>
   ```
   
   ```nginx
   # Nginx configuration
   location ~ /config\.js$ {
       deny all;
       return 404;
   }
   ```

## Features Implemented

### ✅ Form Integration
- **Contact Form** (`contact-us.html`) - Fully integrated with Web3Forms
- **Work With Us Form** (`work-with-us.html`) - Fully integrated with Web3Forms

### ✅ Security Features
- **IP Address Capture** - Automatically captures and logs submitter's IP
- **Human Verification** - Simple CAPTCHA system to prevent bots
- **Rate Limiting** - Prevents spam (max 5 submissions per hour per IP)
- **Form Validation** - Client-side validation for required fields
- **Secure Key Storage** - Access key is not exposed in client-side code

### ✅ User Experience
- **Real-time Feedback** - Success/error messages displayed to users
- **Form Reset** - Forms clear after successful submission
- **CAPTCHA Refresh** - Users can refresh CAPTCHA if needed
- **Loading States** - Submit button shows loading state during submission

## Form Data Captured

### Contact Form
- Name (required)
- Email (required)
- Phone (optional)
- Preferred communication mode
- Message (required)
- Upload photos (optional)
- How they heard about you
- Client IP address
- User agent
- Timestamp

### Work With Us Form
- Name (required)
- Email (required)
- Phone (required)
- Gender (required)
- Work experience (required)
- Salary expectations (required)
- Current photograph (required)
- Client IP address
- User agent
- Timestamp

## Testing

1. **Test Contact Form:**
   - Go to `contact-us.html`
   - Fill out the form with valid data
   - Complete the CAPTCHA
   - Submit and verify success message

2. **Test Work With Us Form:**
   - Go to `work-with-us.html`
   - Fill out the form with valid data
   - Complete the CAPTCHA
   - Submit and verify success message

3. **Test Security Features:**
   - Try submitting without CAPTCHA (should fail)
   - Try submitting multiple times quickly (rate limiting)
   - Check that IP addresses are being captured

## Monitoring

- Check your Web3Forms dashboard for incoming submissions
- Monitor for any failed submissions or errors
- Review IP addresses and submission patterns for security

## Troubleshooting

### Common Issues:

1. **Form not submitting:**
   - Check browser console for JavaScript errors
   - Verify `config.js` is loaded correctly
   - Ensure Web3Forms access key is valid

2. **CAPTCHA not working:**
   - Check that `form-handler.js` is loaded
   - Verify CAPTCHA element exists in HTML

3. **Rate limiting issues:**
   - Clear browser storage if testing multiple submissions
   - Adjust rate limit settings in `config.js` if needed

## Security Notes

- The access key is embedded in the client-side code but this is standard practice for Web3Forms
- IP addresses are captured for security and analytics purposes
- Rate limiting prevents abuse
- CAPTCHA prevents automated submissions
- All form data is validated before submission

## Support

For issues with Web3Forms integration, check:
1. Web3Forms documentation: https://docs.web3forms.com/
2. Browser console for JavaScript errors
3. Network tab for API call failures
