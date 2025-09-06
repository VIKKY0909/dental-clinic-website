# Secure Deployment Guide

This guide explains how to securely deploy your dental clinic website to various hosting platforms while keeping your API keys safe.

## 🔐 Security Overview

Your website uses two main API services:
- **Web3Forms**: For form submissions (contact form, work with us form)
- **ImgBB**: For image uploads (optional)

## 📋 Pre-Deployment Checklist

1. **Get your API keys:**
   - Web3Forms: Sign up at [web3forms.com](https://web3forms.com) and get your access key
   - ImgBB (optional): Sign up at [api.imgbb.com](https://api.imgbb.com) for free image hosting

2. **Never commit real API keys to version control**

## 🚀 Platform-Specific Deployment Instructions

### 1. Vercel Deployment

#### Method A: Environment Variables (Recommended)
1. Go to your Vercel dashboard
2. Select your project → Settings → Environment Variables
3. Add these variables:
   ```
   WEB3FORMS_ACCESS_KEY=your_actual_web3forms_key
   IMGBB_API_KEY=your_actual_imgbb_key
   IMAGE_UPLOAD_ENABLED=true
   ```
4. Deploy your project
5. The website will automatically use these environment variables

#### Method B: Config File Replacement
1. Create a production config file:
   ```bash
   cp config.production.js config.js
   ```
2. Edit `config.js` with your actual API keys
3. Deploy to Vercel
4. **Important**: Add `config.js` to `.gitignore` to prevent accidental commits

### 2. Netlify Deployment

#### Method A: Environment Variables
1. Go to Netlify dashboard → Site settings → Environment variables
2. Add the same variables as Vercel
3. Redeploy your site

#### Method B: Config File Replacement
Same as Vercel Method B

### 3. GoDaddy Hosting

1. Upload your files to GoDaddy's file manager
2. Create `config.js` with your actual API keys:
   ```javascript
   const WEB3FORMS_CONFIG = {
       ACCESS_KEY: 'your_actual_web3forms_key',
       IMAGE_UPLOAD: {
           ENABLED: true,
           API_KEY: 'your_actual_imgbb_key',
           // ... rest of config
       }
   };
   ```
3. Upload this file to your hosting directory

### 4. Hostinger Deployment

1. Access your Hostinger control panel
2. Go to File Manager
3. Upload your website files
4. Create `config.js` with your actual API keys (same as GoDaddy)
5. Upload the config file

### 5. GitHub Pages

GitHub Pages doesn't support server-side environment variables, so you must use the config file method:

1. Create `config.js` with your actual API keys
2. Add `config.js` to `.gitignore`
3. Deploy using GitHub Actions or manually upload

## 🛡️ Security Best Practices

### 1. Never Commit Real Keys
Add these to your `.gitignore`:
```
config.js
*.env
.env.*
```

### 2. Use Placeholder Keys in Development
Keep using placeholder values like `YOUR_WEB3FORMS_ACCESS_KEY` in your development files.

### 3. Regular Key Rotation
- Rotate your API keys periodically
- Update the production config files when you do

### 4. Monitor Usage
- Check your Web3Forms dashboard for unusual activity
- Monitor ImgBB usage if using image uploads

## 🔧 Configuration Options

### Disable Image Uploads
If you don't need image uploads, set in your config:
```javascript
IMAGE_UPLOAD: {
    ENABLED: false
}
```

### Enable/Disable Features
You can control various features in your config:
```javascript
SECURITY: {
    ENABLE_IP_CAPTURE: true,        // Track user IPs
    ENABLE_HUMAN_VERIFICATION: true, // CAPTCHA
    RATE_LIMIT_ENABLED: true,       // Prevent spam
    MAX_SUBMISSIONS_PER_HOUR: 5     // Rate limit
}
```

## 🚨 Troubleshooting

### Forms Not Working
1. Check browser console for configuration errors
2. Verify your Web3Forms access key is correct
3. Ensure the key is properly set in your production config

### Image Uploads Not Working
1. Verify ImgBB API key is correct
2. Check that `IMAGE_UPLOAD.ENABLED` is set to `true`
3. Verify file size limits (default: 32MB)

### Environment Variables Not Working
1. Ensure variable names match exactly
2. Redeploy after adding environment variables
3. Check platform-specific documentation

## 📞 Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify your API keys are working on the service websites
3. Test with a simple form submission first

## 🔄 Quick Deployment Commands

### For Vercel (with environment variables):
```bash
vercel --prod
```

### For Netlify (with environment variables):
```bash
netlify deploy --prod
```

### For manual deployment:
1. Replace placeholders in `config.js` with real keys
2. Upload all files to your hosting provider
3. Test the contact form

Remember: **Never commit real API keys to your repository!**
