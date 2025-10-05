# Debug Session Not Found Issue

## 🔍 **Step-by-Step Debugging Process**

### **Step 1: Temporarily Disable RLS (For Testing)**

Run this SQL to disable RLS temporarily and test if the issue is policy-related:

```sql
-- Copy and run the contents of disable-rls-temporarily.sql
```

### **Step 2: Test Session Lookup**

Run this SQL to test if sessions can be found:

```sql
-- Copy and run the contents of test-session-lookup.sql
```

### **Step 3: Check Browser Console**

1. **Open Browser Developer Tools** (F12)
2. **Go to Console tab**
3. **Try to access a live quiz session**
4. **Look for error messages** - the updated component now logs detailed error information

### **Step 4: Common Issues & Solutions**

#### **Issue 1: No Sessions Exist**
- **Symptom**: "Session Not Found" with PGRST116 error
- **Solution**: Create a test session using the test-session-lookup.sql script

#### **Issue 2: RLS Policy Issues**
- **Symptom**: "Permission Denied" or "infinite recursion" errors
- **Solution**: Run the disable-rls-temporarily.sql script

#### **Issue 3: Database Connection Issues**
- **Symptom**: "relation does not exist" errors
- **Solution**: Verify all tables exist using the health check

### **Step 5: Test with a Real Session**

1. **Create a Quiz**:
   - Go to `/create-quiz`
   - Create a simple quiz with 1-2 questions
   - Save the quiz

2. **Start a Live Session**:
   - Go to `/dashboard/quizzes`
   - Click "Host Live" on your quiz
   - Copy the session code

3. **Test Access**:
   - Open another browser/incognito window
   - Go to `/live-quiz/join/YOUR_SESSION_CODE`
   - Check browser console for detailed error messages

### **Step 6: Re-enable RLS (After Testing)**

Once you've identified the issue, re-enable RLS with proper policies:

```sql
-- Re-enable RLS
ALTER TABLE live_quiz_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE live_quiz_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE live_quiz_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE live_quiz_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_created_quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_quiz_questions ENABLE ROW LEVEL SECURITY;

-- Then run the fix-rls-policies.sql script
```

## 🚨 **Quick Fix for Testing**

If you want to test the live quiz feature immediately:

1. **Run the disable RLS script** (disable-rls-temporarily.sql)
2. **Test the live quiz feature**
3. **Check if it works**
4. **If it works, the issue is RLS policies**
5. **If it doesn't work, the issue is something else**

## 📋 **What to Check**

- [ ] Are the database tables created?
- [ ] Are there any sessions in the database?
- [ ] What specific error appears in the browser console?
- [ ] Does disabling RLS fix the issue?
- [ ] Are there any authentication issues?

## 🔧 **Next Steps Based on Results**

**If disabling RLS fixes it**: The issue is RLS policies - run the fix-rls-policies.sql script

**If disabling RLS doesn't fix it**: The issue is something else - check the browser console for specific error messages

**If no sessions exist**: Create a test session using the test-session-lookup.sql script

Let me know what you find in the browser console and I'll help you fix the specific issue!
