import { Brain, Clock, Users, Trophy, BookOpen, Play, Globe, Calendar } from "lucide-react";

export const features = [
  {
    icon: Brain,
    title: "Bible Knowledge",
    description: "1,000+ questions across all categories"
  },
  {
    icon: Clock,
    title: "Time-Based Scoring",
    description: "Fast-paced quizzes with time bonuses"
  },
  {
    icon: Trophy,
    title: "Leaderboards",
    description: "Compete and track your progress"
  },
  {
    icon: Users,
    title: "Live Events",
    description: "Join weekly competitions"
  }
];

export const howItWorks = [
  {
    icon: BookOpen,
    title: "Sign Up",
    description: "Create your free account to access all quiz features and track your progress."
  },
  {
    icon: Play,
    title: "Take Quizzes",
    description: "Choose from Today's Quiz, Weekly Challenges, or create your own custom quizzes."
  },
  {
    icon: Trophy,
    title: "Compete & Win",
    description: "Climb the leaderboard, earn prizes, and compete with believers worldwide."
  }
];

export const bibleTestimonials = [
  {
    name: "Pastor Grace Williams",
    role: "Youth Pastor",
    content: "The Bible Quiz helped our youth group learn and have fun together. Highly recommended!"
  },
  {
    name: "Samuel Lee",
    role: "College Student",
    content: "I love competing in the weekly Bible quizzes. The questions are challenging and fun!"
  },
  {
    name: "Anita Joseph",
    role: "Sunday School Teacher",
    content: "A wonderful way to test and grow my Bible knowledge. The leaderboard keeps me motivated!"
  },
  {
    name: "Michael Thompson",
    role: "Bible Study Leader",
    content: "This platform has transformed how our study group prepares. The variety of quizzes is incredible!"
  },
  {
    name: "Sarah Chen",
    role: "Ministry Coordinator",
    content: "Perfect for keeping our congregation engaged with Scripture. The weekly quizzes are a highlight!"
  },
  {
    name: "David Rodriguez",
    role: "Seminary Student",
    content: "An excellent tool for reviewing Bible knowledge. The timed quizzes really test your understanding."
  },
  {
    name: "Emily Johnson",
    role: "Children's Ministry Director",
    content: "Our kids love the interactive quizzes! It's made learning Bible stories so much more engaging."
  },
  {
    name: "James Wilson",
    role: "Retired Pastor",
    content: "Even after decades of ministry, I learn something new with each quiz. Wonderful resource!"
  },
  {
    name: "Maria Garcia",
    role: "Small Group Leader",
    content: "We use these quizzes in our weekly meetings. Great way to encourage friendly competition!"
  },
  {
    name: "Robert Kim",
    role: "Theology Student",
    content: "The comprehensive coverage of all 66 books helps me stay sharp on my biblical studies."
  }
];

export const stats = [
  { label: "Participants", value: "1,250+", icon: Users },
  { label: "Questions", value: "500+", icon: BookOpen },
  { label: "Countries", value: "45", icon: Globe },
  { label: "Weekly Quizzes", value: "52+", icon: Calendar }
];

// Public pages searchable content - comprehensive list
export const publicPages = [
  // Main pages
  { title: "Bible Q&A Hub", path: "/bible-questions-and-answers-hub", category: "Bible Study" },
  { title: "Articles", path: "/articles", category: "Resources" },
  { title: "Help & Support", path: "/help", category: "Support" },
  { title: "Leaderboard", path: "/public-leaderboard", category: "Competition" },
  { title: "Daily Verse", path: "/daily-verse", category: "Bible Study" },
  { title: "Prayer Requests", path: "/prayer-requests", category: "Community" },
  { title: "Today's Quiz", path: "/todays-quiz", category: "Quizzes" },
  { title: "Weekly Quiz", path: "/weekly-quiz", category: "Quizzes" },
  
  // Genesis Hub sub-pages
  { title: "Genesis Hub", path: "/bible-questions-and-answers-hub/genesis", category: "Bible Study" },
  { title: "Genesis Beginner", path: "/bible-questions-and-answers-hub/genesis/beginner", category: "Bible Study" },
  { title: "Genesis Intermediate", path: "/bible-questions-and-answers-hub/genesis/intermediate", category: "Bible Study" },
  { title: "Genesis Advanced", path: "/bible-questions-and-answers-hub/genesis/advanced", category: "Bible Study" },
  { title: "Genesis Chapters 1-11", path: "/bible-questions-and-answers-hub/genesis/chapters-1-11", category: "Bible Study" },
  { title: "Genesis Chapters 12-25", path: "/bible-questions-and-answers-hub/genesis/chapters-12-25", category: "Bible Study" },
  { title: "Genesis Chapters 26-36", path: "/bible-questions-and-answers-hub/genesis/chapters-26-36", category: "Bible Study" },
  { title: "Genesis Chapters 37-50", path: "/bible-questions-and-answers-hub/genesis/chapters-37-50", category: "Bible Study" },
  { title: "Genesis True/False", path: "/bible-questions-and-answers-hub/genesis/true-false", category: "Bible Study" },
  { title: "Genesis Characters", path: "/bible-questions-and-answers-hub/genesis/characters", category: "Bible Study" },
  
  // Public Quiz - Old Testament Pentateuch
  { title: "Genesis Quiz", path: "/public-quiz/genesis", category: "Quiz" },
  { title: "Exodus Quiz", path: "/public-quiz/exodus", category: "Quiz" },
  { title: "Leviticus Quiz", path: "/public-quiz/leviticus", category: "Quiz" },
  { title: "Numbers Quiz", path: "/public-quiz/numbers", category: "Quiz" },
  { title: "Deuteronomy Quiz", path: "/public-quiz/deuteronomy", category: "Quiz" },
  
  // Public Quiz - Historical Books
  { title: "Joshua Quiz", path: "/public-quiz/joshua", category: "Quiz" },
  { title: "Judges Quiz", path: "/public-quiz/judges", category: "Quiz" },
  { title: "Ruth Quiz", path: "/public-quiz/ruth", category: "Quiz" },
  { title: "1 Samuel Quiz", path: "/public-quiz/1-samuel", category: "Quiz" },
  { title: "2 Samuel Quiz", path: "/public-quiz/2-samuel", category: "Quiz" },
  { title: "1 Kings Quiz", path: "/public-quiz/1-kings", category: "Quiz" },
  { title: "2 Kings Quiz", path: "/public-quiz/2-kings", category: "Quiz" },
  { title: "1 Chronicles Quiz", path: "/public-quiz/1-chronicles", category: "Quiz" },
  { title: "2 Chronicles Quiz", path: "/public-quiz/2-chronicles", category: "Quiz" },
  { title: "Ezra Quiz", path: "/public-quiz/ezra", category: "Quiz" },
  { title: "Nehemiah Quiz", path: "/public-quiz/nehemiah", category: "Quiz" },
  { title: "Esther Quiz", path: "/public-quiz/esther", category: "Quiz" },
  
  // Public Quiz - Wisdom Literature
  { title: "Job Quiz", path: "/public-quiz/job", category: "Quiz" },
  { title: "Psalms Quiz", path: "/public-quiz/psalms", category: "Quiz" },
  { title: "Proverbs Quiz", path: "/public-quiz/proverbs", category: "Quiz" },
  { title: "Ecclesiastes Quiz", path: "/public-quiz/ecclesiastes", category: "Quiz" },
  { title: "Song of Solomon Quiz", path: "/public-quiz/song-of-solomon", category: "Quiz" },
  
  // Public Quiz - Major Prophets
  { title: "Isaiah Quiz", path: "/public-quiz/isaiah", category: "Quiz" },
  { title: "Jeremiah Quiz", path: "/public-quiz/jeremiah", category: "Quiz" },
  { title: "Lamentations Quiz", path: "/public-quiz/lamentations", category: "Quiz" },
  { title: "Ezekiel Quiz", path: "/public-quiz/ezekiel", category: "Quiz" },
  { title: "Daniel Quiz", path: "/public-quiz/daniel", category: "Quiz" },
  
  // Public Quiz - Minor Prophets
  { title: "Hosea Quiz", path: "/public-quiz/hosea", category: "Quiz" },
  { title: "Joel Quiz", path: "/public-quiz/joel", category: "Quiz" },
  { title: "Amos Quiz", path: "/public-quiz/amos", category: "Quiz" },
  { title: "Obadiah Quiz", path: "/public-quiz/obadiah", category: "Quiz" },
  { title: "Jonah Quiz", path: "/public-quiz/jonah", category: "Quiz" },
  { title: "Micah Quiz", path: "/public-quiz/micah", category: "Quiz" },
  { title: "Nahum Quiz", path: "/public-quiz/nahum", category: "Quiz" },
  { title: "Habakkuk Quiz", path: "/public-quiz/habakkuk", category: "Quiz" },
  { title: "Zephaniah Quiz", path: "/public-quiz/zephaniah", category: "Quiz" },
  { title: "Haggai Quiz", path: "/public-quiz/haggai", category: "Quiz" },
  { title: "Zechariah Quiz", path: "/public-quiz/zechariah", category: "Quiz" },
  { title: "Malachi Quiz", path: "/public-quiz/malachi", category: "Quiz" },
  
  // Public Quiz - Gospels
  { title: "Matthew Quiz", path: "/public-quiz/matthew", category: "Quiz" },
  { title: "Mark Quiz", path: "/public-quiz/mark", category: "Quiz" },
  { title: "Luke Quiz", path: "/public-quiz/luke", category: "Quiz" },
  { title: "John Quiz", path: "/public-quiz/john", category: "Quiz" },
  
  // Public Quiz - Acts and Pauline Epistles
  { title: "Acts Quiz", path: "/public-quiz/acts", category: "Quiz" },
  { title: "Romans Quiz", path: "/public-quiz/romans", category: "Quiz" },
  { title: "1 Corinthians Quiz", path: "/public-quiz/1-corinthians", category: "Quiz" },
  { title: "2 Corinthians Quiz", path: "/public-quiz/2-corinthians", category: "Quiz" },
  { title: "Galatians Quiz", path: "/public-quiz/galatians", category: "Quiz" },
  { title: "Ephesians Quiz", path: "/public-quiz/ephesians", category: "Quiz" },
  { title: "Philippians Quiz", path: "/public-quiz/philippians", category: "Quiz" },
  { title: "Colossians Quiz", path: "/public-quiz/colossians", category: "Quiz" },
  { title: "1 Thessalonians Quiz", path: "/public-quiz/1-thessalonians", category: "Quiz" },
  { title: "2 Thessalonians Quiz", path: "/public-quiz/2-thessalonians", category: "Quiz" },
  { title: "1 Timothy Quiz", path: "/public-quiz/1-timothy", category: "Quiz" },
  { title: "2 Timothy Quiz", path: "/public-quiz/2-timothy", category: "Quiz" },
  { title: "Titus Quiz", path: "/public-quiz/titus", category: "Quiz" },
  { title: "Philemon Quiz", path: "/public-quiz/philemon", category: "Quiz" },
  
  // Public Quiz - General Epistles
  { title: "Hebrews Quiz", path: "/public-quiz/hebrews", category: "Quiz" },
  { title: "James Quiz", path: "/public-quiz/james", category: "Quiz" },
  { title: "1 Peter Quiz", path: "/public-quiz/1-peter", category: "Quiz" },
  { title: "2 Peter Quiz", path: "/public-quiz/2-peter", category: "Quiz" },
  { title: "1 John Quiz", path: "/public-quiz/1-john", category: "Quiz" },
  { title: "2 John Quiz", path: "/public-quiz/2-john", category: "Quiz" },
  { title: "3 John Quiz", path: "/public-quiz/3-john", category: "Quiz" },
  { title: "Jude Quiz", path: "/public-quiz/jude", category: "Quiz" },
  { title: "Revelation Quiz", path: "/public-quiz/revelation", category: "Quiz" },
  
  // Articles
  { title: "Complete Quiz Guide", path: "/articles/complete-quiz-guide", category: "Article" },
  { title: "Quiz Strategies", path: "/articles/quiz-strategies", category: "Article" },
  { title: "David King of Israel", path: "/articles/david-king-israel", category: "Article" },
  { title: "Leaderboard Tips", path: "/articles/leaderboard-tips", category: "Article" },
  { title: "Moses and Exodus", path: "/articles/moses-exodus-story", category: "Article" },
  { title: "Esther's Courage", path: "/articles/esther-courage-story", category: "Article" },
  { title: "Understanding Grace", path: "/articles/understanding-grace", category: "Article" },
  { title: "Prayer Life Guide", path: "/articles/prayer-life-guide", category: "Article" },
  { title: "Quiz Time Management", path: "/articles/quiz-time-management", category: "Article" },
  { title: "Bible Study Methods", path: "/articles/bible-study-methods", category: "Article" },
  { title: "Quiz Navigation Guide", path: "/articles/quiz-navigation-guide", category: "Article" },
  { title: "Quiz Scoring Explained", path: "/articles/quiz-scoring-explained", category: "Article" },
  { title: "Quiz Difficulty Levels", path: "/articles/quiz-difficulty-levels", category: "Article" },
  { title: "Quiz Feedback System", path: "/articles/quiz-feedback-system", category: "Article" },
  { title: "Quiz Progress Tracking", path: "/articles/quiz-progress-tracking", category: "Article" },
  { title: "Memory Techniques", path: "/articles/memory-techniques-quiz", category: "Article" },
  { title: "Abraham's Faith Journey", path: "/articles/abraham-faith-journey", category: "Article" },
  { title: "Joseph's Forgiveness Story", path: "/articles/joseph-forgiveness-story", category: "Article" },
  { title: "Quiz Anxiety Management", path: "/articles/quiz-anxiety-management", category: "Article" },
  { title: "Question Pattern Recognition", path: "/articles/question-pattern-recognition", category: "Article" },
  { title: "Quiz Concentration Techniques", path: "/articles/quiz-concentration-techniques", category: "Article" },
  { title: "Quiz Recovery Strategies", path: "/articles/quiz-recovery-strategies", category: "Article" },
  { title: "Competition Preparation", path: "/articles/competition-preparation", category: "Article" },
  { title: "Ruth's Loyalty and Devotion", path: "/articles/ruth-loyalty-devotion", category: "Article" },
  { title: "Forgiveness and Healing", path: "/articles/forgiveness-healing-power", category: "Article" },
  { title: "Hope: Biblical Perspective", path: "/articles/hope-biblical-perspective", category: "Article" },
  { title: "Scripture Memorization", path: "/articles/scripture-memorization-techniques", category: "Article" },
  { title: "Team Quiz Strategies", path: "/articles/team-quiz-strategies", category: "Article" },
  { title: "Moses Leadership Lessons", path: "/articles/moses-leadership-lessons", category: "Article" },
];

