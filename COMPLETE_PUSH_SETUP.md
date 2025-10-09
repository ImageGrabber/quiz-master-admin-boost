# Complete Push Notifications Setup Guide

This guide covers the complete setup of push notifications for your QuizMaster application.

## ✅ What's Already Done

### 1. **Dependencies Installed**
- ✅ `web-push` library installed
- ✅ VAPID keys configured
- ✅ Service worker created

### 2. **Database Setup**
- ✅ SQL script created: `create-push-subscriptions-table.sql`
- ✅ Table structure defined
- ✅ Indexes and policies configured

### 3. **API Endpoints**
- ✅ `/api/push-subscription` - Store subscriptions
- ✅ `/api/send-notification` - Send notifications
- ✅ Authentication integrated

### 4. **Client Components**
- ✅ Push notification service
- ✅ React hooks
- ✅ Test components
- ✅ Dialog interface

## 🚀 Next Steps

### 1. **Run Database Migration**
```sql
-- Execute this in your Supabase SQL editor
-- Copy and paste the contents of create-push-subscriptions-table.sql
```

### 2. **Environment Variables**
Add to your `.env.local` file:
```env
# VAPID Keys (already configured in code)
REACT_APP_VAPID_PUBLIC_KEY=BBjjoVX9FVeKlSy_iiXl5b2leCyyW46rzgGu_rJY-Y68kyWIekl19_o_yt9Gd2GOvFoib6INIuvajq4I7wtvq1Q
VAPID_PRIVATE_KEY=X6mzoezY-HPqDqLOdHp5lMzNsBt-RIa5zER17mXxGl4
VAPID_SUBJECT=mailto:mathewsteven1996@gmail.com

# Supabase (if not already set)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 3. **Test the Setup**

#### **Test Components Available:**
1. **VAPID Test** - Bottom-right corner button
2. **Push Notification Test** - Full test interface
3. **Dialog Setup** - Auto-appears for new users

#### **Testing Steps:**
1. **Open the app** - Look for test buttons
2. **Click "Test VAPID"** - Verify keys are loaded
3. **Click "Push Notification Test"** - Full test interface
4. **Enable notifications** - Grant permission
5. **Test local notification** - Browser test
6. **Test server notification** - Server test

### 4. **Mobile Testing**

#### **Android Chrome:**
1. Open app in Chrome
2. Grant notification permission
3. Subscribe to push notifications
4. Close browser tab
5. Send test notification from server
6. Check if notification appears

#### **iOS Safari (16.4+):**
1. Open app in Safari
2. Grant notification permission
3. Subscribe to push notifications
4. Close browser tab
5. Send test notification
6. Check if notification appears

## 📱 How It Works

### **User Flow:**
1. **User visits site** → Dialog appears
2. **User clicks "Enable Notifications"** → Permission requested
3. **User grants permission** → Subscription created
4. **Subscription sent to server** → Stored in database
5. **Notifications work** → Even when app is closed

### **Server Flow:**
1. **Event occurs** → Challenge, quiz complete, etc.
2. **Server gets user ID** → From database
3. **Server sends notification** → Using web-push
4. **User receives notification** → On device
5. **User taps notification** → App opens

## 🔧 API Usage

### **Send Test Notification:**
```javascript
const response = await fetch('/api/send-notification', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${userToken}`
  },
  body: JSON.stringify({
    type: 'test',
    userId: 'user-id'
  })
});
```

### **Send Challenge:**
```javascript
const response = await fetch('/api/send-notification', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${userToken}`
  },
  body: JSON.stringify({
    type: 'challenge',
    userId: 'challenged-user-id',
    data: {
      challengerName: 'John Doe',
      quizTitle: 'Bible Quiz',
      message: 'Ready for a challenge?'
    }
  })
});
```

## 🐛 Troubleshooting

### **Common Issues:**

1. **"VAPID keys not loaded"**
   - Check if keys are in `src/config/vapid.ts`
   - Verify environment variables

2. **"Service worker not registered"**
   - Check if `public/sw.js` exists
   - Verify HTTPS in production

3. **"Subscription failed"**
   - Check user authentication
   - Verify API endpoints

4. **"Notifications not received"**
   - Check browser permission
   - Verify subscription in database
   - Test on mobile device

### **Debug Steps:**
1. **Check browser console** for errors
2. **Verify VAPID keys** with test component
3. **Test local notifications** first
4. **Check database** for stored subscriptions
5. **Test server notifications** last

## 📊 Monitoring

### **Database Queries:**
```sql
-- Check stored subscriptions
SELECT * FROM push_subscriptions;

-- Check user subscriptions
SELECT * FROM push_subscriptions WHERE user_id = 'user-id';

-- Check subscription count
SELECT COUNT(*) FROM push_subscriptions;
```

### **Logs to Monitor:**
- Service worker registration
- Push subscription creation
- Notification sending
- Error messages

## 🎉 Success Indicators

### **Everything Working:**
- ✅ VAPID keys loaded
- ✅ Service worker registered
- ✅ User subscribed
- ✅ Local notifications work
- ✅ Server notifications work
- ✅ Mobile notifications work

### **Test Checklist:**
- [ ] Dialog appears for new users
- [ ] Permission granted successfully
- [ ] Subscription stored in database
- [ ] Local test notification works
- [ ] Server test notification works
- [ ] Mobile device receives notifications
- [ ] Notification opens app when tapped

## 🚀 Production Deployment

### **Before Going Live:**
1. **Remove test components** from App.tsx
2. **Set up monitoring** for failed notifications
3. **Configure rate limiting** to prevent spam
4. **Test on real devices** thoroughly
5. **Set up error tracking** for notification failures

### **Environment Setup:**
1. **Production VAPID keys** (if different)
2. **HTTPS certificate** (required for push)
3. **Database permissions** configured
4. **API rate limiting** enabled
5. **Error monitoring** set up

Your push notification system is now fully set up and ready for testing! 🎉
