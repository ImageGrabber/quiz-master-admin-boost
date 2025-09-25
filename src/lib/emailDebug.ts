// Debug utility for email functionality
export const debugEmailService = async () => {
  console.log('=== Email Service Debug ===');
  
  // Check environment variables
  console.log('VITE_SUPABASE_URL:', import.meta.env.VITE_SUPABASE_URL);
  console.log('VITE_SUPABASE_ANON_KEY:', import.meta.env.VITE_SUPABASE_ANON_KEY ? 'Present' : 'Missing');
  
  if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
    console.error('❌ Missing Supabase environment variables');
    return false;
  }
  
  // Test basic connectivity
  try {
    console.log('Testing Supabase connectivity...');
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
    });
    
    console.log('Supabase functions endpoint status:', response.status);
    
    if (response.status === 200 || response.status === 404) {
      console.log('✅ Supabase functions endpoint is reachable');
    } else {
      console.log('❌ Supabase functions endpoint returned:', response.status);
    }
  } catch (error) {
    console.error('❌ Failed to reach Supabase functions:', error);
    return false;
  }
  
  // Test admin email function
  try {
    console.log('Testing admin email function...');
    const testData = {
      email: 'test@example.com',
      userName: 'Test User',
      subject: 'Test Email',
      message: 'This is a test message',
      emailType: 'custom'
    };
    
    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-admin-email`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify(testData),
      }
    );
    
    console.log('Admin email function status:', response.status);
    
    if (response.status === 404) {
      console.log('⚠️ Admin email function not found - this is expected if not deployed');
      return 'function-not-deployed';
    } else if (response.ok) {
      console.log('✅ Admin email function is working');
      return true;
    } else {
      const errorText = await response.text();
      console.log('❌ Admin email function error:', response.status, errorText);
      return false;
    }
  } catch (error) {
    console.error('❌ Admin email function test failed:', error);
    return false;
  }
};

// Test quiz completion email function as fallback
export const debugQuizEmailService = async () => {
  try {
    console.log('Testing quiz completion email function...');
    const testData = {
      email: 'test@example.com',
      userName: 'Test User',
      quizTitle: 'Test Quiz',
      score: 100,
      correctAnswers: 1,
      totalQuestions: 1,
      timeUsed: 0,
      accuracy: 100
    };
    
    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-quiz-completion-email`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify(testData),
      }
    );
    
    console.log('Quiz completion email function status:', response.status);
    
    if (response.ok) {
      console.log('✅ Quiz completion email function is working');
      return true;
    } else {
      const errorText = await response.text();
      console.log('❌ Quiz completion email function error:', response.status, errorText);
      return false;
    }
  } catch (error) {
    console.error('❌ Quiz completion email function test failed:', error);
    return false;
  }
};
