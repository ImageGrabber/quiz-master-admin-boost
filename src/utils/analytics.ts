// Analytics utility functions for tracking custom events

// Declare gtag function for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// Google Analytics 4 (GA4) event tracking
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
};

// Vercel Analytics event tracking
export const trackVercelEvent = (eventName: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.va) {
    window.va('track', eventName, properties);
  }
};

// Quiz-specific analytics events
export const trackQuizStart = (quizId: string, quizTitle: string, difficulty?: string) => {
  trackEvent('quiz_start', {
    quiz_id: quizId,
    quiz_title: quizTitle,
    difficulty: difficulty,
    timestamp: new Date().toISOString(),
  });
};

export const trackQuizComplete = (
  quizId: string, 
  quizTitle: string, 
  score: number, 
  totalQuestions: number, 
  timeSpent: number,
  difficulty?: string
) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  trackEvent('quiz_complete', {
    quiz_id: quizId,
    quiz_title: quizTitle,
    score: score,
    total_questions: totalQuestions,
    percentage: percentage,
    time_spent: timeSpent,
    difficulty: difficulty,
    timestamp: new Date().toISOString(),
  });
};

export const trackQuizAbandon = (quizId: string, quizTitle: string, questionNumber: number) => {
  trackEvent('quiz_abandon', {
    quiz_id: quizId,
    quiz_title: quizTitle,
    question_number: questionNumber,
    timestamp: new Date().toISOString(),
  });
};

export const trackQuestionAnswer = (
  quizId: string, 
  questionId: string, 
  isCorrect: boolean, 
  timeSpent: number
) => {
  trackEvent('question_answer', {
    quiz_id: quizId,
    question_id: questionId,
    is_correct: isCorrect,
    time_spent: timeSpent,
    timestamp: new Date().toISOString(),
  });
};

export const trackPageView = (pagePath: string, pageTitle: string) => {
  trackEvent('page_view', {
    page_path: pagePath,
    page_title: pageTitle,
    timestamp: new Date().toISOString(),
  });
};

export const trackUserRegistration = (method: string) => {
  trackEvent('user_registration', {
    registration_method: method,
    timestamp: new Date().toISOString(),
  });
};

export const trackUserLogin = (method: string) => {
  trackEvent('user_login', {
    login_method: method,
    timestamp: new Date().toISOString(),
  });
};

export const trackLiveQuizJoin = (sessionCode: string, quizId: string) => {
  trackEvent('live_quiz_join', {
    session_code: sessionCode,
    quiz_id: quizId,
    timestamp: new Date().toISOString(),
  });
};

export const trackLiveQuizHost = (quizId: string, sessionCode: string) => {
  trackEvent('live_quiz_host', {
    quiz_id: quizId,
    session_code: sessionCode,
    timestamp: new Date().toISOString(),
  });
};

export const trackCompetitionJoin = (competitionId: string, competitionName: string) => {
  trackEvent('competition_join', {
    competition_id: competitionId,
    competition_name: competitionName,
    timestamp: new Date().toISOString(),
  });
};

export const trackWeeklyQuizComplete = (quizId: string, week: string, score: number) => {
  trackEvent('weekly_quiz_complete', {
    quiz_id: quizId,
    week: week,
    score: score,
    timestamp: new Date().toISOString(),
  });
};

export const trackLeaderboardView = (leaderboardType: string) => {
  trackEvent('leaderboard_view', {
    leaderboard_type: leaderboardType,
    timestamp: new Date().toISOString(),
  });
};

export const trackBibleStudyAccess = (book: string, chapter?: string) => {
  trackEvent('bible_study_access', {
    book: book,
    chapter: chapter,
    timestamp: new Date().toISOString(),
  });
};

export const trackSearchQuery = (query: string, resultsCount: number) => {
  trackEvent('search', {
    search_term: query,
    results_count: resultsCount,
    timestamp: new Date().toISOString(),
  });
};

export const trackError = (errorType: string, errorMessage: string, pagePath: string) => {
  trackEvent('error', {
    error_type: errorType,
    error_message: errorMessage,
    page_path: pagePath,
    timestamp: new Date().toISOString(),
  });
};

// Enhanced e-commerce tracking for quiz results
export const trackQuizPurchase = (quizId: string, quizTitle: string, value: number) => {
  trackEvent('purchase', {
    transaction_id: `quiz_${quizId}_${Date.now()}`,
    value: value,
    currency: 'USD',
    items: [{
      item_id: quizId,
      item_name: quizTitle,
      category: 'Quiz',
      quantity: 1,
      price: value,
    }],
  });
};

// Social sharing tracking
export const trackSocialShare = (platform: string, content: string, url: string) => {
  trackEvent('share', {
    method: platform,
    content_type: content,
    item_id: url,
    timestamp: new Date().toISOString(),
  });
};

// Performance tracking
export const trackPerformance = (metric: string, value: number, unit: string) => {
  trackEvent('performance', {
    metric_name: metric,
    metric_value: value,
    metric_unit: unit,
    timestamp: new Date().toISOString(),
  });
};
