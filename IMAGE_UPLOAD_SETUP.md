# Image Upload Setup Guide

## Free Image Upload Service - ImgBB

Your forms now support image uploads using ImgBB, a completely free image hosting service. Here's how to set it up:

### 1. Get Your Free ImgBB API Key

1. **Visit ImgBB API**: Go to https://api.imgbb.com/
2. **Sign Up**: Create a free account (no credit card required)
3. **Get API Key**: After signing up, you'll receive your API key
4. **Update Configuration**: Replace `YOUR_IMGBB_API_KEY` in `config.js` with your actual API key

### 2. Update Your Configuration

Open `config.js` and replace this line:
```javascript
API_KEY: 'YOUR_IMGBB_API_KEY', // Get free API key from https://api.imgbb.com/
```

With your actual API key:
```javascript
API_KEY: 'your_actual_api_key_here',
```

### 3. Features Included

✅ **Free Service**: No cost, no limits on uploads
✅ **Multiple Images**: Contact form supports multiple image uploads
✅ **Image Preview**: Users can see uploaded images before submitting
✅ **File Validation**: Only allows image files (JPEG, PNG, GIF, WebP)
✅ **Size Limits**: Maximum 32MB per image
✅ **Email Integration**: Images are included in Web3Forms emails as links
✅ **Error Handling**: Graceful handling of upload failures

### 4. How It Works

1. **User selects images** in the form
2. **Images are previewed** immediately
3. **On form submission**, images are uploaded to ImgBB
4. **Image URLs are included** in the Web3Forms email
5. **You receive the email** with both form data and image links

### 5. Email Format

When someone submits a form with images, you'll receive an email like this:

```
Subject: Contact Form Submission

Name: John Doe
Email: john@example.com
Phone: +1234567890
Message: I need dental consultation

📸 Uploaded Images (2):
1. tooth_xray.jpg - https://ibb.co/abc123
2. smile_photo.png - https://ibb.co/def456

Client IP: 192.168.1.1
Timestamp: 2024-01-15T10:30:00Z
```

### 6. Image Management

- **Automatic Hosting**: Images are automatically hosted on ImgBB
- **Direct Links**: You can click the links to view images
- **No Storage Needed**: No need to store images on your server
- **Permanent Links**: Images remain accessible indefinitely

### 7. Security Features

- **File Type Validation**: Only image files are allowed
- **Size Limits**: Prevents large file uploads
- **Client-Side Preview**: Users can see what they're uploading
- **Error Handling**: Failed uploads don't break form submission

### 8. Testing

1. **Update your API key** in `config.js`
2. **Open the forms** in your browser
3. **Select an image** and verify preview appears
4. **Submit the form** and check your email for image links

### 9. Troubleshooting

**Images not uploading?**
- Check that your ImgBB API key is correct
- Verify internet connection
- Check browser console for errors

**Images not appearing in email?**
- Ensure images uploaded successfully (check console)
- Verify Web3Forms is receiving the image URLs
- Check spam folder for emails

**File size errors?**
- Images must be under 32MB
- Try compressing large images
- Use supported formats only (JPEG, PNG, GIF, WebP)

### 10. Alternative Services

If you prefer other free image hosting services, you can modify the `image-upload-handler.js` file to use:
- **Imgur API** (free tier available)
- **Cloudinary** (free tier available)
- **Your own server** (if you have one)

### 11. Production Deployment

For production deployment:
1. **Never commit** your actual API key to version control
2. **Use environment variables** or server-side configuration
3. **Test thoroughly** before going live
4. **Monitor upload success rates**

## Support

- **ImgBB Documentation**: https://api.imgbb.com/
- **Web3Forms Documentation**: https://docs.web3forms.com/
- **Browser Console**: Check for JavaScript errors

Your image upload functionality is now ready to use! 🎉
