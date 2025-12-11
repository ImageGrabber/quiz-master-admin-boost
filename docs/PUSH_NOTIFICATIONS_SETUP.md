# Push Notifications Setup Guide

This guide explains how to set up push notifications for mobile devices in your QuizMaster application.

## Overview

Push notifications work on mobile devices by using:
1. **Service Workers** - Background scripts that handle notifications
2. **Web Push Protocol** - Standard for sending push messages
3. **VAPID Keys** - Authentication for push services

## Setup Steps

### 1. Generate VAPID Keys

```bash
# Install web-push globally
npm install -g web-push

# Generate VAPID keys
web-push generate-vapid-keys
```

This will output:
```
Public Key: <your-public-key>
Private Key: <your-private-key>
```

### 2. Environment Variables

Add to your `.env` file:
```
REACT_APP_VAPID_PUBLIC_KEY=<your-public-key>
VAPID_PRIVATE_KEY=<your-private-key>
```

### 3. Install Dependencies

```bash
npm install web-push
npm install @types/web-push --save-dev
```

### 4. Server Setup

Create API endpoint to handle push subscriptions:

```typescript
// api/push-subscription.ts
import { NextApiRequest, NextApiResponse } from 'next';
import webpush from 'web-push';

webpush.setVapidDetails(
  'mailto:your-email@example.com',
  process.env.VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { subscription } = req.body;
    
    // Store subscription in database
    // Send test notification
    await webpush.sendNotification(subscription, JSON.stringify({
      title: 'Welcome to QuizMaster!',
      body: 'Push notifications are now enabled.'
    }));
    
    res.status(200).json({ success: true });
  }
}
```

### 5. Database Schema

Create table for push subscriptions:

```sql
CREATE TABLE push_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  endpoint TEXT NOT NULL,
  p256dh TEXT NOT NULL,
  auth TEXT NOT NULL,
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## Usage

### Enable Push Notifications

```typescript
import { usePushNotifications } from '@/hooks/usePushNotifications';

const MyComponent = () => {
  const { subscribe, isSubscribed } = usePushNotifications();
  
  const handleEnable = async () => {
    await subscribe();
  };
  
  return (
    <button onClick={handleEnable}>
      {isSubscribed ? 'Enabled' : 'Enable Push Notifications'}
    </button>
  );
};
```

### Send Notifications

```typescript
import { pushNotificationServer } from '@/lib/pushNotificationServer';

// Send challenge notification
await pushNotificationServer.sendChallengeNotification(
  'user-id',
  'John Doe',
  'Bible Quiz',
  'Ready for a challenge?'
);
```

## Mobile Support

Push notifications work on:
- **Android Chrome** - Full support
- **iOS Safari** - Limited support (iOS 16.4+)
- **Desktop Chrome/Firefox** - Full support

## Testing

1. Enable push notifications in your app
2. Close the browser tab
3. Send a test notification from your server
4. Check if notification appears on device

## Troubleshooting

### Common Issues:
1. **HTTPS Required** - Push notifications only work over HTTPS
2. **Service Worker** - Must be registered and active
3. **VAPID Keys** - Must be correctly configured
4. **User Permission** - User must grant notification permission

### Debug Steps:
1. Check browser console for errors
2. Verify service worker is registered
3. Test with different browsers
4. Check network requests for subscription

## Production Deployment

1. Set up HTTPS certificate
2. Configure VAPID keys in production
3. Set up database for subscriptions
4. Implement server-side notification sending
5. Test on real mobile devices

## Security Considerations

1. **VAPID Keys** - Keep private key secure
2. **User Data** - Don't store sensitive data in notifications
3. **Rate Limiting** - Implement to prevent spam
4. **User Consent** - Always request permission first

## Next Steps

1. Set up VAPID keys
2. Configure environment variables
3. Install dependencies
4. Test on mobile device
5. Deploy to production
