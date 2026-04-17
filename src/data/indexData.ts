import { Brain, Clock, Users, Trophy, BookOpen, Play, Globe, Calendar } from "lucide-react";
import { allSongs } from "./songs";
import englishSongs from "./english-songs.json";
import hindiSongs from "./hindi-songs.json";
import kidsStories from "./kids-stories.json";
import { articles } from "./articles";
import { featuredQuizzes, bibleBooks } from "./bible-data";


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
  { title: "Competition Hub", path: "/competitions", category: "Competition" },
  { title: "Selah Space", path: "/selah-space", category: "Spiritual" },
  { title: "Bible Games", path: "/bible-games", category: "Games" },
  
  // Games
  { title: "Joy Runner", path: "/joy-runner", category: "Games" },
  { title: "Match 3 Game", path: "/match-3-game", category: "Games" },
  { title: "Word Search", path: "/word-search-game", category: "Games" },
  { title: "Memory Match", path: "/memory-match-game", category: "Games" },
  { title: "Flappy Bird", path: "/flappy-bird-game", category: "Games" },
  { title: "Verse Master", path: "/verse-master-game", category: "Games" },
  { title: "Faith Builder", path: "/faith-builder-game", category: "Games" },

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

  // Bible Book Hubs (Dynamic mapping)
  ...Object.values(bibleBooks).flatMap(testament => 
    Object.values(testament).flatMap(categories => 
      categories.map(book => ({
        title: `${book} Hub & Quizzes`,
        path: `/bible-questions-and-answers-hub/${book.toLowerCase().replace(/ /g, "-")}`,
        category: "Bible Study"
      }))
    )
  ),

  // Featured Quizzes (Dynamic mapping)
  ...featuredQuizzes.map(quiz => ({
    title: quiz.title,
    path: quiz.link,
    category: "Quiz"
  })),

  // Articles (Dynamic mapping)
  ...articles.map(article => ({
    title: article.title,
    path: `/articles/${article.id}`,
    category: "Article"
  })),

  // Kids Stories (Dynamic mapping)
  ...kidsStories.map((story: any) => ({
    title: story.title,
    path: `/kids-stories/${story.slug}`,
    category: "Kids Stories"
  })),

  // Malayalam Songs (Dynamic mapping)
  ...allSongs.map(song => ({
    title: song.title,
    path: `/songs/${song.slug}`,
    category: "Malayalam Song"
  })),

  // English Songs (Dynamic mapping)
  ...(englishSongs as any[]).map(song => ({
    title: song.title,
    path: `/english-songs/${song.slug}`,
    category: "English Hymn"
  })),

  // Hindi Songs (Dynamic mapping)
  ...(hindiSongs as any[]).map(song => ({
    title: song.title,
    path: `/hindi-songs/${song.slug}`,
    category: "Hindi Song"
  }))
];

