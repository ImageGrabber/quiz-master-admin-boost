# Image Upload Setup for Daily Verses

This guide explains how to set up image upload functionality for the daily verses admin panel.

## Prerequisites

1. **Supabase Storage**: The system uses Supabase Storage for image uploads
2. **Database Migration**: Run the daily verses migration first
3. **Storage Bucket**: Create the images storage bucket

## Setup Steps

### 1. Run Database Migrations

```bash
# Run the daily verses migration
supabase db push

# Or run individual migrations
supabase migration up
```

### 2. Create Storage Bucket

The migration `20250125000001-create-images-storage-bucket.sql` will automatically create:
- A public `images` bucket
- Proper storage policies for authenticated users
- File size limit of 5MB
- Allowed image types: JPEG, PNG, GIF, WebP, SVG

### 3. Verify Storage Setup

Check that the storage bucket was created:

```sql
SELECT * FROM storage.buckets WHERE id = 'images';
```

### 4. Test Image Upload

1. Go to `/admin/daily-verses`
2. Click "Add New Verse"
3. Fill in the verse details
4. Use the "Choose File" button to select an image
5. The image will be uploaded to Supabase Storage automatically
6. Save the verse

## Features

### Image Upload Options

1. **File Upload**: Direct file selection from device
2. **URL Input**: Manual image URL entry (fallback)
3. **Image Preview**: Real-time preview before saving
4. **File Validation**: 
   - Only image files allowed
   - 5MB size limit
   - Automatic file type checking

### Storage Structure

```
images/
└── daily-verses/
    ├── 1706123456789-abc123.jpg
    ├── 1706123456790-def456.png
    └── ...
```

### Security

- **Public Read Access**: Images are publicly accessible via URL
- **Authenticated Upload**: Only authenticated users can upload
- **File Type Validation**: Only image files allowed
- **Size Limits**: 5MB maximum file size

## Troubleshooting

### Common Issues

1. **"Failed to upload image"**
   - Check if storage bucket exists
   - Verify storage policies are set correctly
   - Ensure user is authenticated

2. **"File size must be less than 5MB"**
   - Compress the image before uploading
   - Use a different image format (WebP is more efficient)

3. **"Please select an image file"**
   - Ensure the file is actually an image
   - Check file extension matches image type

### Manual Storage Setup

If the migration doesn't work, you can manually create the storage bucket:

1. Go to Supabase Dashboard
2. Navigate to Storage
3. Create a new bucket named "images"
4. Set it as public
5. Configure the policies as shown in the migration file

## Usage

### For Admins

1. **Upload Images**: Use the file picker to select images
2. **Preview**: See real-time preview of selected images
3. **Remove**: Click the X button to remove selected images
4. **URL Fallback**: Use URL input if file upload isn't preferred

### For Users

- Images are automatically displayed on the daily verse page
- Responsive design works on all devices
- Fallback placeholder if no image is provided

## File Management

- **Automatic Cleanup**: Old images are not automatically deleted
- **Manual Cleanup**: Remove unused images from Supabase Storage dashboard
- **Storage Monitoring**: Monitor storage usage in Supabase dashboard

## Best Practices

1. **Image Optimization**: Compress images before uploading
2. **Alt Text**: Always provide meaningful alt text for accessibility
3. **Consistent Sizing**: Use similar aspect ratios for better display
4. **File Naming**: The system generates unique filenames automatically

## Support

If you encounter issues:

1. Check the browser console for error messages
2. Verify Supabase Storage is properly configured
3. Ensure the user has admin permissions
4. Check network connectivity for large file uploads
