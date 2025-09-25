# Admin Email Feature Documentation

This document explains the admin email functionality that allows administrators to send custom emails to participants.

## Overview

The admin email feature provides a comprehensive solution for sending personalized emails to users from the admin panel. It supports both individual and bulk email sending with different email templates.

## Components

### 1. Supabase Edge Function
- **File**: `supabase/functions/send-admin-email/index.ts`
- **Purpose**: Handles sending custom emails via Resend API
- **Features**:
  - Multiple email templates (Custom, Announcement, Reminder, Congratulations)
  - Beautiful HTML email design
  - Personalized content with user names
  - Error handling and validation

### 2. Admin Email Service
- **File**: `src/lib/adminEmailService.ts`
- **Purpose**: Provides utilities for sending admin emails
- **Features**:
  - Single email sending
  - Bulk email sending with progress tracking
  - Error handling and fallbacks

### 3. Admin UI Integration
- **File**: `src/pages/admin/Users.tsx`
- **Purpose**: Admin interface for managing users and sending emails
- **Features**:
  - User selection (individual or multiple)
  - Email composition dialog
  - Progress tracking for bulk emails
  - Real-time feedback

## Email Templates

### 1. Custom Message
- **Purpose**: General communication
- **Design**: Clean, professional layout
- **Use Case**: Personal messages, general updates

### 2. Announcement
- **Purpose**: Important announcements
- **Design**: Eye-catching with announcement styling
- **Use Case**: New features, policy changes, important updates

### 3. Reminder
- **Purpose**: Gentle reminders
- **Design**: Friendly, encouraging tone
- **Use Case**: Quiz reminders, engagement prompts

### 4. Congratulations
- **Purpose**: Celebratory messages
- **Design**: Festive with celebration elements
- **Use Case**: Achievements, milestones, special occasions

## Admin Interface Features

### User Management
- **User List**: View all registered users
- **Selection**: Checkbox selection for individual or multiple users
- **Bulk Actions**: Select all/deselect all functionality
- **Individual Actions**: Quick email button for each user

### Email Composition
- **Email Type Selection**: Choose from 4 different templates
- **Subject Line**: Custom subject for each email
- **Message Content**: Rich text area for email body
- **Preview**: Real-time preview of selected users

### Sending Process
- **Single Email**: Immediate sending with success/error feedback
- **Bulk Email**: Progress tracking with completion summary
- **Error Handling**: Graceful handling of failed sends
- **Rate Limiting**: Built-in delays to prevent API rate limits

## Technical Implementation

### Email Service Architecture
```
Admin Panel → AdminEmailService → Supabase Edge Function → Resend API → User Email
```

### Data Flow
1. Admin selects users and composes email
2. Frontend validates input and calls email service
3. Email service formats data and calls Supabase function
4. Edge function creates HTML email and sends via Resend
5. Success/failure feedback returned to admin

### Error Handling
- **Network Errors**: Retry logic with exponential backoff
- **API Errors**: Detailed error messages for debugging
- **Validation Errors**: Client-side validation before sending
- **Rate Limiting**: Automatic delays between bulk sends

## Setup Requirements

### Environment Variables
```bash
RESEND_API_KEY=your_resend_api_key_here
SITE_URL=https://your-domain.com
```

### Database Requirements
- `profiles` table with user information
- Admin role verification
- Email preference tracking

### Resend Configuration
1. Sign up for Resend account
2. Verify your domain
3. Get API key and add to Supabase secrets
4. Configure sender email address

## Usage Guide

### Sending Individual Emails
1. Navigate to Admin → Users
2. Click "Email" button next to desired user
3. Select email type and compose message
4. Click "Send Email"

### Sending Bulk Emails
1. Navigate to Admin → Users
2. Select multiple users using checkboxes
3. Click "Send Email" button in header
4. Compose message and select template
5. Monitor progress during sending

### Email Template Selection
- **Custom**: For general communication
- **Announcement**: For important updates
- **Reminder**: For engagement prompts
- **Congratulations**: For celebratory messages

## Email Design Features

### Visual Elements
- **Responsive Design**: Works on all devices
- **Professional Typography**: Clean, readable fonts
- **Color Coding**: Template-specific color schemes
- **Interactive Elements**: Call-to-action buttons

### Content Structure
- **Header**: Template-specific branding
- **Personalization**: User name integration
- **Message Body**: Custom content area
- **Footer**: Links to preferences and dashboard

### Template Variations
Each template includes:
- Unique header styling
- Appropriate iconography
- Template-specific messaging
- Relevant call-to-action buttons

## Security Considerations

### Access Control
- Admin role verification required
- User authentication for all operations
- Secure API key storage

### Data Protection
- No sensitive data in email content
- User consent through preferences
- Secure email transmission

### Rate Limiting
- Built-in delays for bulk operations
- API rate limit compliance
- Graceful error handling

## Monitoring and Analytics

### Success Tracking
- Email delivery confirmation
- Success/failure counts
- Error logging for debugging

### Performance Metrics
- Send time tracking
- Bulk operation progress
- API response times

## Troubleshooting

### Common Issues

1. **Emails not sending**
   - Check RESEND_API_KEY configuration
   - Verify domain verification in Resend
   - Check Supabase function logs

2. **Bulk email failures**
   - Check rate limiting settings
   - Verify user email addresses
   - Review error logs

3. **Template rendering issues**
   - Validate HTML content
   - Check for missing variables
   - Test with different email clients

### Debug Steps
1. Check browser console for errors
2. Review Supabase function logs
3. Test with single email first
4. Verify all required data is present

## Future Enhancements

### Planned Features
- **Email Templates**: Custom template creation
- **Scheduling**: Send emails at specific times
- **Segmentation**: Target specific user groups
- **Analytics**: Open rates and engagement tracking
- **A/B Testing**: Test different email versions

### Advanced Features
- **Rich Text Editor**: WYSIWYG email composition
- **Image Support**: Attach images to emails
- **Personalization**: Dynamic content based on user data
- **Automation**: Trigger emails based on user actions

## Best Practices

### Email Content
- Keep subject lines concise and clear
- Use personalization when possible
- Include clear call-to-action buttons
- Test emails before bulk sending

### User Experience
- Provide clear feedback during sending
- Show progress for bulk operations
- Handle errors gracefully
- Respect user email preferences

### Performance
- Use appropriate delays for bulk sends
- Monitor API rate limits
- Implement retry logic for failures
- Track success/failure rates

## Support and Maintenance

### Regular Tasks
- Monitor email delivery rates
- Update email templates as needed
- Review and update user preferences
- Check for API changes

### Monitoring
- Set up alerts for failed sends
- Track email engagement metrics
- Monitor API usage and costs
- Review user feedback

This admin email feature provides a powerful tool for engaging with users while maintaining professional standards and user experience.
