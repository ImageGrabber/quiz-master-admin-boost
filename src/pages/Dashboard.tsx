import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Brain, Trophy, Clock, Target, LogOut, User, Users, Filter, BookOpen, Calendar, Heart, CheckCircle, Play, Star, Lightbulb, TrendingUp, Flame, Award, Crown, Bolt, Sun, Moon, Book, Share, ArrowRight, Droplet, Plus, Gamepad2, Zap, Sparkles, AlertTriangle, Cloud, Meh, Smile } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Competition } from "@/integrations/supabase/types";
import Header from "@/components/Header";
import DashboardLayout from "@/components/DashboardLayout";
import { getTodaysReadings, getDayOfYear } from "@/lib/bibleReadingPlan";
import { emotionOptions, EmotionOption } from "@/data/emotions/emotionOptions";
import { thinkingTrapsInfo } from "@/data/emotions/thinkingTraps";

interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: string;
  plan?: string;
}

interface WellnessStats {
  currentStreak: number;
  daysTracked: number;
  weeklyAverage: number; // ml of water
  totalActivities: number;
  averageEmotion: string | null; // Average emotion from check-ins
}

interface Quiz {
  id: number;
  title: string;
}

interface CompetitionWithDetails extends Competition {
  quiz: {
    id: number;
    title: string;
    description: string | null;
  };
  entries_count: number;
  user_has_entered: boolean;
  user_payment_status?: 'pending' | 'completed' | 'failed' | 'refunded';
}

interface DailyQuestion {
  id: number;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_index: number;
}

const Dashboard = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [wellnessStats, setWellnessStats] = useState<WellnessStats>({
    currentStreak: 0,
    daysTracked: 0,
    weeklyAverage: 0,
    totalActivities: 0,
    averageEmotion: null
  });
  const [stats, setStats] = useState<AttemptStats>({
    totalAttempts: 0,
    averageScore: 0,
    bestScore: 0,
    totalTimeSpent: 0
  });
  const [recentAttempts, setRecentAttempts] = useState<any[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [competitions, setCompetitions] = useState<CompetitionWithDetails[]>([]);
  const [selectedQuizId, setSelectedQuizId] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [hideMembership, setHideMembership] = useState<boolean>(true);
  const [streakData, setStreakData] = useState<any>(null);
  const [userBadges, setUserBadges] = useState<any[]>([]);
  const [isRecordingRead, setIsRecordingRead] = useState(false);
  const [joinCode, setJoinCode] = useState<string>("");
  const [waterIntake, setWaterIntake] = useState(0); // ml
  const [isDragging, setIsDragging] = useState(false);
  const [isSavingWater, setIsSavingWater] = useState(false);
  const glassRef = useRef<HTMLDivElement>(null);
  const [todayBibleRead, setTodayBibleRead] = useState<any>(null);
  const [readingTime, setReadingTime] = useState(5); // minutes
  const [isReadingDialogOpen, setIsReadingDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [readingTitle, setReadingTitle] = useState("");
  const [readingVerse, setReadingVerse] = useState("");
  const [todayVerse, setTodayVerse] = useState<any>(null);
  const [isLoadingVerse, setIsLoadingVerse] = useState(false);
  const [bibleText, setBibleText] = useState<any>(null);
  const [bibleTextOT, setBibleTextOT] = useState<any>(null);
  const [bibleTextNT, setBibleTextNT] = useState<any>(null);
  const [isLoadingBibleText, setIsLoadingBibleText] = useState(false);
  const [selectedTranslation, setSelectedTranslation] = useState("web"); // Default to WEB
  const [todaysReadings, setTodaysReadings] = useState<any>(null);
  const [selectedReading, setSelectedReading] = useState<'ot' | 'nt' | null>(null);
  const [todayPrayed, setTodayPrayed] = useState(false);
  const [isLoadingPrayer, setIsLoadingPrayer] = useState(false);
  const [isRecordingPrayer, setIsRecordingPrayer] = useState(false);
  const [prayerStreak, setPrayerStreak] = useState<any>(null);
  const [currentWeeklyQuiz, setCurrentWeeklyQuiz] = useState<any>(null);
  const [weeklyQuizAttempt, setWeeklyQuizAttempt] = useState<any>(null);
  const [isLoadingWeeklyQuiz, setIsLoadingWeeklyQuiz] = useState(false);
  const [weeklyQuizLeaderboard, setWeeklyQuizLeaderboard] = useState<any[]>([]);
  const [weeklyQuizStats, setWeeklyQuizStats] = useState<any>(null);
  // Emotional check-in state
  const [showEmotionalCheckIn, setShowEmotionalCheckIn] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionOption | null>(null);
  const [showEncouragement, setShowEncouragement] = useState(false);
  const [selectedVerse, setSelectedVerse] = useState<{ reference: string; text: string; encouragement: string } | null>(null);
  const [sliderValue, setSliderValue] = useState(2.5);
  const [showQuestions, setShowQuestions] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [thinkingTrap, setThinkingTrap] = useState<string | null>(null);
  const [hasCheckedInToday, setHasCheckedInToday] = useState(false);

  // Daily Quiz State
  const [dailyQuestions, setDailyQuestions] = useState<DailyQuestion[]>([]);
  const [currentDailyIndex, setCurrentDailyIndex] = useState(0);
  const [dailyAnswers, setDailyAnswers] = useState<{ [key: number]: { selected: number; isCorrect: boolean } }>({});
  const [dailyQuizCompleted, setDailyQuizCompleted] = useState(false);
  const [dailyScore, setDailyScore] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  // Emotional check-in handlers
  const handleSliderChange = (value: number) => {
    setSliderValue(value);
    const emotionIndex = Math.round(value);
    setSelectedEmotion(emotionOptions[emotionIndex]);
  };

  const handleSliderConfirm = async () => {
    if (selectedEmotion) {
      // Get a random verse from the selected emotion
      const randomVerse = selectedEmotion.verses[Math.floor(Math.random() * selectedEmotion.verses.length)];
      setSelectedVerse({
        reference: randomVerse.reference,
        text: randomVerse.text,
        encouragement: randomVerse.encouragement
      });

      // Set a default thinking trap based on emotion
      let defaultTrap = 'wellness';
      const emotionId = selectedEmotion.id;
      if (emotionId === "very-anxious" || emotionId === "stressed") {
        defaultTrap = 'catastrophizing';
      } else if (emotionId === "sad") {
        defaultTrap = 'self-blame';
      }
      setThinkingTrap(defaultTrap);

      setShowEncouragement(true);

      // Save to database
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { error } = await supabase.rpc('upsert_emotional_check_in', {
            p_user_id: user.id,
            p_emotion: selectedEmotion.id,
            p_thinking_trap: defaultTrap,
            p_verse_reference: randomVerse.reference,
            p_check_in_date: new Date().toISOString().split('T')[0]
          });

          if (error) {
            console.error('Error saving emotional check-in:', error);
          } else {
            // Refresh wellness stats to update average emotion
            fetchWellnessStats();
            // Update check-in status
            setHasCheckedInToday(true);
          }
        }
      } catch (error) {
        console.error('Error saving emotional check-in:', error);
      }

      // Store check-in data in localStorage as backup
      const checkInData = {
        emotion: selectedEmotion.id,
        thinkingTrap: defaultTrap,
        date: new Date().toISOString(),
        verse: randomVerse.reference
      };
      localStorage.setItem('emotionalCheckIn', JSON.stringify(checkInData));
      localStorage.setItem('emotionalCheckInDate', new Date().toDateString());
    }
  };

  useEffect(() => {
    if (showEmotionalCheckIn) {
      const index = Math.round(sliderValue);
      setSelectedEmotion(emotionOptions[index]);
    }
  }, [sliderValue, showEmotionalCheckIn]);

  const getBorderColor = (colorClass: string) => {
    const colorMap: { [key: string]: string } = {
      'text-red-600': '#dc2626',
      'text-orange-600': '#ea580c',
      'text-blue-600': '#2563eb',
      'text-gray-600': '#4b5563',
      'text-green-600': '#16a34a',
      'text-purple-600': '#9333ea'
    };
    return colorMap[colorClass] || '#9333ea';
  };

  const resetEmotionalCheckIn = () => {
    setShowEmotionalCheckIn(false);
    setShowEncouragement(false);
    setShowQuestions(false);
    setSliderValue(2.5);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setThinkingTrap(null);
    setSelectedEmotion(null);
    setSelectedVerse(null);
  };

  useEffect(() => {
    fetchUserData();
    fetchQuizzes();
    fetchCompetitions();
    fetchQuizzes();
    fetchCompetitions();
    fetchDailyQuestions();
  }, []);

  const fetchDailyQuestions = async () => {
    try {
      const response = await fetch('/data/dailyQuizQuestions.json');
      const allQuestions: DailyQuestion[] = await response.json();

      if (allQuestions && allQuestions.length > 0) {
        // Select 5 questions based on day of year
        const dayOfYear = getDayOfYear();
        const questionsPerDay = 5;
        const startIndex = (dayOfYear * questionsPerDay) % allQuestions.length;

        const selectedQuestions: DailyQuestion[] = [];
        for (let i = 0; i < questionsPerDay; i++) {
          selectedQuestions.push(allQuestions[(startIndex + i) % allQuestions.length]);
        }

        setDailyQuestions(selectedQuestions);

        // Check local storage for today's progress
        const today = new Date().toISOString().split('T')[0];
        const savedProgress = localStorage.getItem(`daily_quiz_progress_${today}`);

        if (savedProgress) {
          const parsed = JSON.parse(savedProgress);
          setDailyAnswers(parsed.answers || {});
          setCurrentDailyIndex(parsed.currentIndex || 0);
          setDailyQuizCompleted(parsed.completed || false);
          setDailyScore(parsed.score || 0);
        }
      }
    } catch (error) {
      console.error('Error fetching daily questions:', error);
    }
  };

  const handleDailyAnswer = (questionId: number, answerIndex: number) => {
    if (dailyAnswers[questionId] || dailyQuizCompleted) return;

    const currentQuestion = dailyQuestions[currentDailyIndex];
    const isCorrect = answerIndex === currentQuestion.correct_index;

    const newAnswers = {
      ...dailyAnswers,
      [questionId]: { selected: answerIndex, isCorrect }
    };

    setDailyAnswers(newAnswers);

    if (isCorrect) {
      setDailyScore(prev => prev + 1);
      toast({
        title: "Correct!",
        description: "Great job!",
        variant: "default",
        className: "bg-green-50 border-green-200 text-green-800 duration-2000"
      });
    } else {
      toast({
        title: "Incorrect",
        description: `The correct answer was ${String.fromCharCode(65 + currentQuestion.correct_index)}`,
        variant: "destructive",
        duration: 2000
      });
    }

    // Save progress
    saveDailyProgress(newAnswers, currentDailyIndex, dailyQuizCompleted, isCorrect ? dailyScore + 1 : dailyScore);
  };

  const handleNextDailyQuestion = () => {
    if (currentDailyIndex < dailyQuestions.length - 1) {
      const nextIndex = currentDailyIndex + 1;
      setCurrentDailyIndex(nextIndex);
      saveDailyProgress(dailyAnswers, nextIndex, false, dailyScore);
    } else {
      setDailyQuizCompleted(true);
      saveDailyProgress(dailyAnswers, currentDailyIndex, true, dailyScore);
    }
  };

  const saveDailyProgress = (answers: any, index: number, completed: boolean, score: number) => {
    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem(`daily_quiz_progress_${today}`, JSON.stringify({
      answers,
      currentIndex: index,
      completed,
      score
    }));
  };

  // Check if user has checked in today
  const checkTodayCheckIn = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setHasCheckedInToday(false);
        return;
      }

      const today = new Date().toISOString().split('T')[0];
      const { data, error } = await supabase
        .from('emotional_check_ins')
        .select('id')
        .eq('user_id', user.id)
        .eq('check_in_date', today)
        .single();

      setHasCheckedInToday(!!data && !error);
    } catch (error) {
      console.error('Error checking today check-in:', error);
      setHasCheckedInToday(false);
    }
  };

  useEffect(() => {
    if (profile) {
      fetchUserStats();
      fetchUserBadges();
      fetchWaterIntake();
      fetchWellnessStats();
      fetchTodayBibleRead();
      fetchTodayVerse();
      fetchTodayPrayer();
      fetchCurrentWeeklyQuiz();
      checkTodayCheckIn();
      // Get today's readings from the 365-day plan based on calendar date
      const dayOfYear = getDayOfYear();
      const readings = getTodaysReadings(dayOfYear);
      setTodaysReadings(readings);
    }
  }, [profile, selectedQuizId]);

  // Auto-refresh daily data when date changes (for next day reset)
  useEffect(() => {
    if (!profile) return;

    // Check date every minute to detect day change
    const checkDateChange = () => {
      const today = new Date().toISOString().split('T')[0];
      const lastCheck = localStorage.getItem('lastDateCheck');

      if (lastCheck !== today) {
        // Date has changed, refresh daily data
        fetchWaterIntake();
        fetchTodayBibleRead();
        fetchTodayPrayer();
        checkTodayCheckIn();
        // Get today's readings
        const dayOfYear = getDayOfYear();
        const readings = getTodaysReadings(dayOfYear);
        setTodaysReadings(readings);
        // Update last check
        localStorage.setItem('lastDateCheck', today);
      }
    };

    // Check immediately
    checkDateChange();

    // Check every minute
    const interval = setInterval(checkDateChange, 60000);

    return () => clearInterval(interval);
  }, [profile]);

  // Auto-fetch Bible text when reading title changes in dialog
  useEffect(() => {
    if (isReadingDialogOpen && readingTitle && readingTitle.trim().length > 3) {
      const timeoutId = setTimeout(() => {
        fetchBibleText(readingTitle);
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [readingTitle, isReadingDialogOpen]);

  // Fetch today's daily verse
  const fetchTodayVerse = async () => {
    try {
      setIsLoadingVerse(true);
      const { data, error } = await supabase.rpc('get_todays_daily_verse');

      if (error) {
        console.error('Error fetching today verse:', error);
        return;
      }

      if (data && data.length > 0) {
        setTodayVerse(data[0]);
        // Pre-fill reading title with verse reference
        if (!readingTitle) {
          setReadingTitle(data[0].verse_reference);
        }
      }
    } catch (error) {
      console.error('Error fetching today verse:', error);
    } finally {
      setIsLoadingVerse(false);
    }
  };

  // Fetch Bible text from bible-api.com
  const fetchBibleText = async (reference: string, type?: 'ot' | 'nt') => {
    if (!reference) return;

    try {
      setIsLoadingBibleText(true);
      // Clean the reference for the API (remove any extra formatting)
      const cleanReference = reference.trim().replace(/\s+/g, ' ');
      const apiUrl = `https://bible-api.com/${encodeURIComponent(cleanReference)}?translation=${selectedTranslation}`;

      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch Bible text');
      }

      const data = await response.json();

      if (type === 'ot') {
        setBibleTextOT(data);
      } else if (type === 'nt') {
        setBibleTextNT(data);
      } else {
        setBibleText(data);
      }
    } catch (error) {
      console.error('Error fetching Bible text:', error);
      if (type === 'ot') {
        setBibleTextOT(null);
      } else if (type === 'nt') {
        setBibleTextNT(null);
      } else {
        setBibleText(null);
      }
    } finally {
      setIsLoadingBibleText(false);
    }
  };

  // Fetch current weekly quiz
  const fetchCurrentWeeklyQuiz = async () => {
    try {
      setIsLoadingWeeklyQuiz(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get current week's quiz
      const { data: quizData, error: quizError } = await supabase
        .from('weekly_quizzes')
        .select('*')
        .eq('is_active', true)
        .lte('week_start_date', new Date().toISOString().split('T')[0])
        .gte('week_end_date', new Date().toISOString().split('T')[0])
        .order('week_start_date', { ascending: false })
        .limit(1)
        .single();

      if (quizError && quizError.code !== 'PGRST116') {
        console.error('Error fetching weekly quiz:', quizError);
        setCurrentWeeklyQuiz(null);
        return;
      }

      if (quizData) {
        setCurrentWeeklyQuiz(quizData);
        // Fetch user attempt if quiz exists
        const { data: attemptData } = await supabase
          .from('weekly_quiz_attempts')
          .select('*')
          .eq('user_id', user.id)
          .eq('weekly_quiz_id', quizData.id)
          .single();
        setWeeklyQuizAttempt(attemptData || null);

        // Fetch leaderboard (top 5)
        const { data: leaderboardData } = await supabase
          .from('weekly_quiz_leaderboard')
          .select(`
            rank,
            score,
            time_used,
            user_id,
            profiles!inner(full_name)
          `)
          .eq('weekly_quiz_id', quizData.id)
          .order('rank')
          .limit(5);

        if (leaderboardData) {
          setWeeklyQuizLeaderboard(leaderboardData.map(entry => ({
            rank: entry.rank,
            user_id: entry.user_id,
            score: entry.score,
            time_used: entry.time_used,
            display_name: entry.profiles?.full_name || 'Anonymous'
          })));
        }

        // Fetch quiz stats
        const { data: attemptsData } = await supabase
          .from('weekly_quiz_attempts')
          .select('id, score, completed')
          .eq('weekly_quiz_id', quizData.id);

        if (attemptsData) {
          const totalParticipants = new Set(attemptsData.map(a => a.user_id)).size;
          const completedCount = attemptsData.filter(a => a.completed).length;
          const avgScore = attemptsData.length > 0
            ? attemptsData.reduce((sum, a) => sum + (a.score || 0), 0) / attemptsData.length
            : 0;

          setWeeklyQuizStats({
            totalParticipants,
            completedCount,
            averageScore: Math.round(avgScore * 10) / 10
          });
        }
      } else {
        setCurrentWeeklyQuiz(null);
        setWeeklyQuizAttempt(null);
        setWeeklyQuizLeaderboard([]);
        setWeeklyQuizStats(null);
      }
    } catch (error) {
      console.error('Error fetching weekly quiz:', error);
      setCurrentWeeklyQuiz(null);
    } finally {
      setIsLoadingWeeklyQuiz(false);
    }
  };

  // Fetch today's prayer status
  const fetchTodayPrayer = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      setIsLoadingPrayer(true);
      const today = new Date().toISOString().split('T')[0];

      // Check if prayer was recorded today from prayer_tracking table
      const { data, error } = await supabase
        .from('prayer_tracking')
        .select('*')
        .eq('user_id', user.id)
        .eq('prayer_date', today)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching prayer status:', error);
      }

      setTodayPrayed(!!data);

      // Fetch prayer streak from prayer_streaks table
      const { data: streakData } = await supabase
        .from('prayer_streaks')
        .select('current_streak, longest_streak, total_days_prayed')
        .eq('user_id', user.id)
        .single();

      setPrayerStreak(streakData);
    } catch (error) {
      console.error('Error fetching prayer status:', error);
      setTodayPrayed(false);
      setPrayerStreak(null);
    } finally {
      setIsLoadingPrayer(false);
    }
  };

  // Record prayer for today
  const recordPrayer = async () => {
    if (isRecordingPrayer) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      setIsRecordingPrayer(true);

      // Record prayer using prayer_tracking table and update streak
      const { data, error } = await supabase.rpc('record_prayer', {
        p_user_id: user.id,
        p_prayer_date: new Date().toISOString().split('T')[0]
      });

      if (error) throw error;

      setTodayPrayed(true);

      // Refresh prayer streak
      await fetchTodayPrayer();

      // Refresh wellness stats
      await fetchWellnessStats();

      toast({
        title: "Prayer Recorded!",
        description: data.message || "Your prayer has been recorded successfully.",
      });
    } catch (error) {
      console.error('Error recording prayer:', error);
      toast({
        title: "Error",
        description: "Failed to record prayer. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsRecordingPrayer(false);
    }
  };

  // Fetch today's bible reading status
  const fetchTodayBibleRead = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const today = new Date().toISOString().split('T')[0];
      const { data, error } = await supabase
        .from('devotional_reads')
        .select('*')
        .eq('user_id', user.id)
        .eq('read_date', today)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching today bible reading:', error);
        return;
      }

      if (data) {
        setTodayBibleRead(data);
      } else {
        setTodayBibleRead(null);
      }
    } catch (error) {
      console.error('Error fetching today bible reading:', error);
    }
  };

  // Record bible reading
  const recordBibleReading = async () => {
    if (isRecordingRead) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      setIsRecordingRead(true);
      const today = new Date();
      const readingDate = today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
      const dateString = today.toISOString().split('T')[0];

      // Use today's readings or fallback
      const title = todaysReadings
        ? `${todaysReadings.oldTestament.reference} & ${todaysReadings.newTestament.reference}`
        : readingTitle || 'Bible Reading';

      const { data, error } = await supabase.rpc('record_devotional_read', {
        p_user_id: user.id,
        p_devotional_date: readingDate,
        p_devotional_title: title,
        p_devotional_verse: '',
        p_time_spent_seconds: 0
      });

      if (error) throw error;

      // Update streak data
      setStreakData({
        current_streak: data.current_streak,
        longest_streak: data.longest_streak,
        total_days_read: data.total_days_read,
        last_read_date: dateString
      });

      // Refresh today's bible reading
      await fetchTodayBibleRead();

      // Refresh wellness stats
      await fetchWellnessStats();

      // Refresh today's readings (in case date changed)
      const dayOfYear = getDayOfYear();
      const readings = getTodaysReadings(dayOfYear);
      setTodaysReadings(readings);

      // Close dialog and reset form
      setIsReadingDialogOpen(false);
      setReadingTitle("");
      setReadingVerse("");

      toast({
        title: "Bible Reading Recorded!",
        description: data.message || `Your ${data.current_streak}-day streak continues!`,
      });
    } catch (error) {
      console.error('Error recording bible reading:', error);
      toast({
        title: "Error",
        description: "Failed to record bible reading. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsRecordingRead(false);
    }
  };

  // Fetch wellness statistics
  const fetchWellnessStats = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch devotional streak data
      const { data: streakData } = await supabase
        .from('devotional_streaks')
        .select('current_streak, total_days_read')
        .eq('user_id', user.id)
        .single();

      // Fetch water intake records count (days tracked)
      const { data: waterRecords } = await supabase
        .from('water_intake')
        .select('date, amount_ml')
        .eq('user_id', user.id)
        .order('date', { ascending: false });

      // Calculate weekly average water intake
      const today = new Date();
      const weekAgo = new Date(today);
      weekAgo.setDate(today.getDate() - 7);

      const weeklyWaterData = waterRecords?.filter(record => {
        const recordDate = new Date(record.date);
        return recordDate >= weekAgo;
      }) || [];

      const weeklyTotal = weeklyWaterData.reduce((sum, record) => sum + (record.amount_ml || 0), 0);
      const weeklyAverage = weeklyWaterData.length > 0 ? Math.round(weeklyTotal / weeklyWaterData.length) : 0;

      // Count total days tracked (water intake or devotional reads)
      const waterDays = new Set(waterRecords?.map(r => r.date) || []).size;
      const devotionalDays = streakData?.total_days_read || 0;
      const daysTracked = Math.max(waterDays, devotionalDays);

      // Count total activities (water intake entries + devotional reads)
      const waterActivities = waterRecords?.length || 0;
      const devotionalActivities = devotionalDays || 0;
      const totalActivities = waterActivities + devotionalActivities;

      // Fetch emotional check-ins and calculate average emotion
      const { data: emotionalCheckIns } = await supabase
        .from('emotional_check_ins')
        .select('emotion')
        .eq('user_id', user.id)
        .order('check_in_date', { ascending: false })
        .limit(30); // Last 30 check-ins

      // Map emotions to numbers for calculation
      const emotionToNumber: { [key: string]: number } = {
        'very-anxious': 1,
        'stressed': 2,
        'sad': 3,
        'okay': 4,
        'good': 5,
        'great': 6
      };

      const numberToEmotion: { [key: number]: string } = {
        1: 'very-anxious',
        2: 'stressed',
        3: 'sad',
        4: 'okay',
        5: 'good',
        6: 'great'
      };

      let averageEmotion: string | null = null;
      if (emotionalCheckIns && emotionalCheckIns.length > 0) {
        const emotionNumbers = emotionalCheckIns
          .map(checkIn => emotionToNumber[checkIn.emotion])
          .filter(num => num !== undefined);

        if (emotionNumbers.length > 0) {
          const average = emotionNumbers.reduce((sum, num) => sum + num, 0) / emotionNumbers.length;
          const roundedAverage = Math.round(average);
          averageEmotion = numberToEmotion[roundedAverage] || null;
        }
      }

      setWellnessStats({
        currentStreak: streakData?.current_streak || 0,
        daysTracked,
        weeklyAverage,
        totalActivities,
        averageEmotion
      });
    } catch (error) {
      console.error('Error fetching wellness stats:', error);
    }
  };

  // Fetch today's water intake
  const fetchWaterIntake = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setWaterIntake(0);
        return;
      }

      const today = new Date().toISOString().split('T')[0];
      const { data, error } = await supabase
        .from('water_intake')
        .select('amount_ml')
        .eq('user_id', user.id)
        .eq('date', today)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // No record found for today, set to 0
          setWaterIntake(0);
        } else {
          console.error('Error fetching water intake:', error);
          setWaterIntake(0);
        }
        return;
      }

      setWaterIntake(data?.amount_ml || 0);
    } catch (error) {
      console.error('Error fetching water intake:', error);
      setWaterIntake(0);
    }
  };

  // Save water intake to database
  const saveWaterIntake = async (amount: number) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      setIsSavingWater(true);
      const today = new Date().toISOString().split('T')[0];

      const { error } = await supabase.rpc('upsert_water_intake', {
        p_user_id: user.id,
        p_amount_ml: amount,
        p_date: today
      });

      if (error) throw error;

      toast({
        title: "Water intake saved!",
        description: `Your daily water intake has been updated to ${amount}ml.`,
      });

      // Refresh water intake display
      await fetchWaterIntake();

      // Refresh wellness stats after saving
      await fetchWellnessStats();
    } catch (error) {
      console.error('Error saving water intake:', error);
      toast({
        title: "Error",
        description: "Failed to save water intake. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSavingWater(false);
    }
  };

  // Water intake drag handlers
  const maxWater = 2250; // ml (9 cups)
  const waterPercentage = (waterIntake / maxWater) * 100;

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    e.preventDefault();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    e.preventDefault();
  };

  const handleMouseMoveRef = useRef<(e: MouseEvent | TouchEvent) => void>();
  handleMouseMoveRef.current = (e: MouseEvent | TouchEvent) => {
    if (!isDragging || !glassRef.current) return;

    const rect = glassRef.current.getBoundingClientRect();
    const clientY = 'touches' in e ? e.touches[0]?.clientY : e.clientY;
    if (clientY === undefined) return;

    const y = clientY - rect.top;
    const height = rect.height;
    const percentage = Math.max(0, Math.min(1, 1 - (y / height)));
    const newWater = Math.round(percentage * maxWater);
    setWaterIntake(newWater);
  };

  useEffect(() => {
    if (isDragging) {
      const handleMove = (e: MouseEvent | TouchEvent) => {
        e.preventDefault();
        handleMouseMoveRef.current?.(e);
      };
      const handleEnd = () => {
        setIsDragging(false);
      };

      document.addEventListener('mousemove', handleMove);
      document.addEventListener('mouseup', handleEnd);
      document.addEventListener('touchmove', handleMove, { passive: false });
      document.addEventListener('touchend', handleEnd);

      return () => {
        document.removeEventListener('mousemove', handleMove);
        document.removeEventListener('mouseup', handleEnd);
        document.removeEventListener('touchmove', handleMove);
        document.removeEventListener('touchend', handleEnd);
      };
    }
  }, [isDragging]);
  const fetchUserBadges = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      // Step 1: fetch user_badges for this user
      const { data: userBadgeRows, error: ubError } = await supabase
        .from('user_badges')
        .select('id, badge_id, awarded_at, metadata')
        .eq('user_id', user.id)
        .order('awarded_at', { ascending: false });
      if (ubError) return;

      if (!userBadgeRows || userBadgeRows.length === 0) {
        // Backfill historical badges if none exist
        const { ensureSeedBadges, evaluateBadgesForUserHistory } = await import("@/lib/badgeService");
        await ensureSeedBadges();
        await evaluateBadgesForUserHistory(user.id);
        const { data: refetchedUB } = await supabase
          .from('user_badges')
          .select('id, badge_id, awarded_at, metadata')
          .eq('user_id', user.id)
          .order('awarded_at', { ascending: false });
        if (!refetchedUB || refetchedUB.length === 0) {
          setUserBadges([]);
          return;
        }
        // Fetch badges for refetched rows
        const badgeIds = Array.from(new Set(refetchedUB.map((r: any) => r.badge_id)));
        const { data: badgeDefs } = await supabase
          .from('badges')
          .select('id, slug, name, description, icon')
          .in('id', badgeIds);
        const byId = new Map((badgeDefs || []).map((b: any) => [b.id, b]));
        let merged = refetchedUB.map((r: any) => ({ id: r.id, awarded_at: r.awarded_at, badges: byId.get(r.badge_id), metadata: r.metadata }));
        merged = await enrichMissingQuizTitles(user.id, merged);
        setUserBadges(merged);
        return;
      }

      // Step 2: fetch badge definitions and merge
      const badgeIds = Array.from(new Set(userBadgeRows.map((r: any) => r.badge_id)));
      const { data: badgeDefs } = await supabase
        .from('badges')
        .select('id, slug, name, description, icon')
        .in('id', badgeIds);
      const byId = new Map((badgeDefs || []).map((b: any) => [b.id, b]));
      let merged = userBadgeRows.map((r: any) => ({ id: r.id, awarded_at: r.awarded_at, badges: byId.get(r.badge_id), metadata: r.metadata }));
      merged = await enrichMissingQuizTitles(user.id, merged);
      setUserBadges(merged);
    } catch (e) {
      console.error('Error fetching badges', e);
    }
  };

  const enrichMissingQuizTitles = async (userId: string, rows: any[]) => {
    const needsQuiz = rows.filter((r) => (r.badges?.slug === 'fast-finisher' || r.badges?.slug === 'score-100') && (!r.metadata || !r.metadata.quizTitle));
    if (needsQuiz.length === 0) return rows;
    // Fetch attempts once
    const { data: attempts } = await supabase
      .from('attempts')
      .select('quiz_id, score, seconds_used')
      .eq('user_id', userId);
    const quizzesNeeded: number[] = [];
    let fastestQuizId: number | undefined;
    let perfectQuizId: number | undefined;
    if (attempts && attempts.length > 0) {
      const fastest = attempts.reduce((best: any, a: any) => (a.seconds_used || 999999) < (best?.seconds_used || 999999) ? a : best, null);
      fastestQuizId = fastest?.quiz_id;
      const best = attempts.reduce((prev: any, a: any) => (a.score || 0) > (prev?.score || 0) ? a : prev, null);
      perfectQuizId = best?.quiz_id;
      if (fastestQuizId) quizzesNeeded.push(fastestQuizId);
      if (perfectQuizId) quizzesNeeded.push(perfectQuizId);
    }
    if (quizzesNeeded.length === 0) return rows;
    const uniqueIds = Array.from(new Set(quizzesNeeded));
    const { data: quizDefs } = await supabase
      .from('quizzes')
      .select('id, title')
      .in('id', uniqueIds);
    const titleById = new Map((quizDefs || []).map((q: any) => [q.id, q.title]));

    // Update rows locally and persist metadata
    for (const r of rows) {
      if (r.badges?.slug === 'fast-finisher' && (!r.metadata || !r.metadata.quizTitle) && fastestQuizId) {
        const quizTitle = titleById.get(fastestQuizId);
        if (quizTitle) {
          const newMeta = { ...(r.metadata || {}), quizTitle };
          await supabase.from('user_badges').update({ metadata: newMeta }).eq('id', r.id);
          r.metadata = newMeta;
        }
      }
      if (r.badges?.slug === 'score-100' && (!r.metadata || !r.metadata.quizTitle) && perfectQuizId) {
        const quizTitle = titleById.get(perfectQuizId);
        if (quizTitle) {
          const newMeta = { ...(r.metadata || {}), quizTitle };
          await supabase.from('user_badges').update({ metadata: newMeta }).eq('id', r.id);
          r.metadata = newMeta;
        }
      }
    }
    return rows;
  };

  const renderBadgeIcon = (icon: string) => {
    switch (icon) {
      case 'Crown': return <Crown className="w-6 h-6 text-yellow-600" />;
      case 'Flame': return <Flame className="w-6 h-6 text-orange-600" />;
      case 'Star': return <Star className="w-6 h-6 text-yellow-500" />;
      case 'Bolt': return <Bolt className="w-6 h-6 text-blue-600" />;
      case 'Sun': return <Sun className="w-6 h-6 text-amber-500" />;
      case 'Moon': return <Moon className="w-6 h-6 text-indigo-500" />;
      case 'Book': return <Book className="w-6 h-6 text-emerald-600" />;
      case 'Share': return <Share className="w-6 h-6 text-purple-600" />;
      case 'Calendar': return <Calendar className="w-6 h-6 text-blue-600" />;
      case 'Trophy': return <Trophy className="w-6 h-6 text-yellow-600" />;
      default: return <Award className="w-6 h-6 text-purple-600" />;
    }
  };

  const getBadgeRingClass = (icon: string) => {
    switch (icon) {
      case 'Crown': return 'from-yellow-300 via-amber-500 to-yellow-600';
      case 'Flame': return 'from-orange-300 via-red-500 to-orange-600';
      case 'Star': return 'from-amber-300 via-yellow-500 to-pink-400';
      case 'Bolt': return 'from-blue-300 via-cyan-400 to-indigo-500';
      default: return 'from-purple-300 via-fuchsia-500 to-indigo-600';
    }
  };


  useEffect(() => {
    const fetchStreak = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data: streak } = await supabase
        .from('devotional_streaks')
        .select('*')
        .eq('user_id', user.id)
        .single();
      setStreakData(streak);
    };
    fetchStreak();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const { data, error } = await supabase
        .from('quizzes')
        .select('id, title')
        .order('title');

      if (error) throw error;
      setQuizzes(data || []);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  };

  const fetchUserData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        navigate("/auth/login");
        return;
      }

      // Fetch user profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      // Ensure 'plan' property is always present and type-safe
      setProfile(profileData ? {
        id: profileData.id,
        email: profileData.email,
        full_name: profileData.full_name,
        role: profileData.role,
        plan: typeof (profileData as any).plan === 'string' ? (profileData as any).plan : undefined
      } : null);
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast({
        title: "Error",
        description: "Failed to load user data.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserStats = async () => {
    try {
      let query = supabase
        .from('attempts')
        .select(`
          *,
          quizzes!inner(title)
        `)
        .eq('user_id', profile!.id);

      // Filter by specific quiz if selected
      if (selectedQuizId !== "all") {
        query = query.eq('quiz_id', parseInt(selectedQuizId));
      }

      const { data: attempts } = await query.order('created_at', { ascending: false });

      if (attempts) {
        const totalAttempts = attempts.length;
        const averageScore = totalAttempts > 0
          ? Math.round(attempts.reduce((sum, attempt) => sum + attempt.score, 0) / totalAttempts)
          : 0;
        const bestScore = totalAttempts > 0
          ? Math.max(...attempts.map(attempt => attempt.score))
          : 0;
        const totalTimeSpent = attempts.reduce((sum, attempt) => sum + attempt.seconds_used, 0);

        setStats({
          totalAttempts,
          averageScore,
          bestScore,
          totalTimeSpent
        });

        setRecentAttempts(attempts.slice(0, 5));
      }
    } catch (error) {
      console.error('Error fetching user stats:', error);
    }
  };

  const fetchCompetitions = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setCompetitions([]);
        return;
      }

      const { data, error } = await (supabase as any)
        .from('competitions')
        .select(`
          *,
          entries_count:competition_entries(count),
          competition_entries(user_id, paid)
        `)
        .order('start_date', { ascending: true })
        .limit(3);

      if (error) {
        console.warn('Competitions query error (non-critical):', error);
        // Don't throw error, just return empty array
        setCompetitions([]);
        return;
      }

      // Map competitions to include user_has_entered and user_payment_status
      const competitionsWithDetails = (data || []).map((competition: any) => {
        const userEntry = (competition.competition_entries || []).find((entry: any) => entry.user_id === user.id);
        return {
          ...competition,
          entries_count: competition.entries_count?.[0]?.count || 0,
          user_has_entered: !!userEntry,
          user_payment_status: userEntry ? (userEntry.paid ? 'completed' : 'pending') : undefined,
        };
      });

      setCompetitions(competitionsWithDetails);
    } catch (error: any) {
      console.warn('Competitions fetch error (non-critical):', error);
      // Silently handle the error without showing toast
      setCompetitions([]);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  // Add a function to handle upgrade navigation
  const handleUpgrade = () => {
    navigate("/dashboard/upgrade");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Brain className="w-12 h-12 text-gray-700 mx-auto mb-4 animate-pulse" strokeWidth={1} />
          <p className="text-gray-600 font-urbanist font-light">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout>
      {/* Header filter - HIDDEN */}
      {/* <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 bg-white/60 backdrop-blur rounded-2xl p-3 border border-white/50 shadow-sm">
        <div className="flex items-center space-x-3">
          <Filter className="w-5 h-5 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Filter by Quiz:</span>
          <Select value={selectedQuizId} onValueChange={setSelectedQuizId}>
            <SelectTrigger className="w-64 rounded-xl">
              <SelectValue placeholder="Select a quiz" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Quizzes</SelectItem>
              {quizzes.map((quiz) => (
                <SelectItem key={quiz.id} value={quiz.id.toString()}>
                  {quiz.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div> */}
      {/* Upgrade to Pro button hidden */}
      {/* {profile?.plan === "free" && (
          <button
            onClick={handleUpgrade}
            className="ml-2 px-4 py-2 rounded bg-purple-600 text-white font-semibold shadow hover:bg-purple-700 transition whitespace-nowrap"
          >
            Upgrade to Pro
          </button>
        )} */}
      {/* </div> */}

      {/* </div> */}

      {/* Weekly Bible Quiz - Full Width */}
      <Card className="relative border-0 shadow-lg hover:shadow-xl transition-all duration-500 rounded-3xl bg-white overflow-hidden mb-6 group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-50/50 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>

        <CardContent className="relative z-10 p-0">
          {isLoadingWeeklyQuiz ? (
            <div className="flex items-center justify-center py-16">
              <div className="flex flex-col items-center gap-3">
                <Brain className="w-8 h-8 text-indigo-600 animate-pulse" />
                <p className="text-sm font-urbanist font-medium text-slate-500">Loading weekly quiz...</p>
              </div>
            </div>
          ) : currentWeeklyQuiz ? (
            <div className="flex flex-col md:flex-row">
              {/* Left Side: Content */}
              <div className="flex-1 p-8 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 bg-indigo-100 rounded-xl">
                    <Calendar className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                      {(() => {
                        const endDate = new Date(currentWeeklyQuiz.week_end_date);
                        const now = new Date();
                        const diff = endDate.getTime() - now.getTime();
                        if (diff <= 0) return 'Ended';
                        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                        if (days > 0) return `${days}d ${hours}h left`;
                        return `${hours}h left`;
                      })()}
                    </span>
                  </div>
                </div>

                <h3 className="text-3xl font-bold text-slate-900 mb-3 leading-tight">
                  {currentWeeklyQuiz.title}
                </h3>

                {currentWeeklyQuiz.description && (
                  <p className="text-slate-600 text-lg mb-8 leading-relaxed max-w-2xl">
                    {currentWeeklyQuiz.description}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-x-8 gap-y-4 mb-8">
                  {currentWeeklyQuiz.theme && (
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center">
                        <BookOpen className="w-4 h-4 text-indigo-600" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Theme</p>
                        <p className="text-sm font-semibold text-slate-900">{currentWeeklyQuiz.theme}</p>
                      </div>
                    </div>
                  )}

                  {currentWeeklyQuiz.difficulty && (
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center">
                        <Target className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Difficulty</p>
                        <p className="text-sm font-semibold text-slate-900 capitalize">{currentWeeklyQuiz.difficulty}</p>
                      </div>
                    </div>
                  )}

                  {currentWeeklyQuiz.total_questions && (
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                        <Brain className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Questions</p>
                        <p className="text-sm font-semibold text-slate-900">{currentWeeklyQuiz.total_questions}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  <Button
                    size="lg"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 rounded-xl shadow-lg shadow-indigo-200 transition-all duration-300 hover:scale-105"
                    onClick={() => navigate(`/weekly-quiz/${currentWeeklyQuiz.id}`)}
                  >
                    <Play className="w-5 h-5 mr-2 fill-current" />
                    Start Quiz
                  </Button>
                  <div className="text-sm text-slate-500 font-medium">
                    {new Date(currentWeeklyQuiz.week_start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(currentWeeklyQuiz.week_end_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                </div>
              </div>

              {/* Right Side: Decorative / Illustration */}
              <div className="hidden md:block w-1/3 bg-gradient-to-br from-indigo-600 to-blue-700 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507434965515-61970f2bd7c6?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/50 to-transparent"></div>

                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                    <p className="text-indigo-100 text-sm font-medium mb-1">Weekly Challenge</p>
                    <p className="text-white font-semibold text-lg">
                      "Study to shew thyself approved unto God..."
                    </p>
                    <p className="text-indigo-200 text-xs mt-2 font-mono">2 Timothy 2:15</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-amber-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">No Active Quiz</h3>
              <p className="text-slate-500 max-w-md mx-auto mb-6">
                Check back next Monday for a new weekly challenge! In the meantime, explore our other quizzes.
              </p>
              <Button
                variant="outline"
                onClick={() => navigate('/weekly-quiz')}
                className="border-slate-200 text-slate-700"
              >
                View Past Quizzes
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Challenge / Bible Games Card - Full Width */}
      <Card className="relative border-0 shadow-lg hover:shadow-xl transition-all duration-500 rounded-3xl bg-white overflow-hidden mb-6 group cursor-pointer" onClick={() => navigate('/dashboard/bible-games')}>
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-50/50 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/3"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-50/50 rounded-full blur-3xl translate-y-1/3 translate-x-1/4"></div>

        <CardContent className="relative z-10 p-0">
          <div className="flex flex-col md:flex-row">
            {/* Left Side: Content */}
            <div className="flex-1 p-8 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 bg-purple-100 rounded-xl">
                  <Gamepad2 className="w-5 h-5 text-purple-600" />
                </div>
                <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100">
                  New Games Available
                </Badge>
              </div>

              <h3 className="text-3xl font-bold text-slate-900 mb-3 leading-tight">
                Bible Games & Challenges
              </h3>

              <p className="text-slate-600 text-lg mb-8 leading-relaxed max-w-2xl">
                Test your biblical knowledge through fun and interactive games. Play memory match, scripture matching with multiplayer, and more!
              </p>

              <div className="flex flex-wrap items-center gap-6 mb-8">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center">
                    <Users className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Multiplayer</p>
                    <p className="text-sm font-semibold text-slate-900">Compete Online</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center">
                    <Brain className="w-4 h-4 text-pink-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Memory</p>
                    <p className="text-sm font-semibold text-slate-900">Challenge Your Mind</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center">
                    <Trophy className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Rewards</p>
                    <p className="text-sm font-semibold text-slate-900">Earn Talents</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 rounded-xl shadow-lg shadow-purple-200 transition-all duration-300 hover:scale-105"
                  onClick={() => navigate('/dashboard/bible-games')}
                >
                  <Play className="w-5 h-5 mr-2 fill-current" />
                  Play Games
                </Button>
                <span className="text-sm text-slate-500 font-medium">
                  6 games available
                </span>
              </div>
            </div>

            {/* Right Side: Decorative / Game Icons */}
            <div className="hidden md:block w-1/3 bg-gradient-to-br from-purple-600 via-pink-600 to-purple-700 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent"></div>

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4 p-8">
                  <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 flex items-center justify-center transform hover:scale-110 transition-transform">
                    <Brain className="w-10 h-10 text-white" />
                  </div>
                  <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 flex items-center justify-center transform hover:scale-110 transition-transform">
                    <Trophy className="w-10 h-10 text-white" />
                  </div>
                  <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 flex items-center justify-center transform hover:scale-110 transition-transform">
                    <Target className="w-10 h-10 text-white" />
                  </div>
                  <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 flex items-center justify-center transform hover:scale-110 transition-transform">
                    <Zap className="w-10 h-10 text-white" />
                  </div>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                  <p className="text-purple-100 text-sm font-medium mb-1">🎮 Featured Game</p>
                  <p className="text-white font-semibold text-lg">
                    Scripture Match Multiplayer
                  </p>
                  <p className="text-purple-200 text-xs mt-2">
                    Match biblical words with random players online
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions & Featured Competitions */}
      {/* This section is now replaced by the above grid */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch"> ... </div> */}

      {/* Membership Tiers Section hidden */}
      {/* {!hideMembership && (
        <Card className="mb-8 mt-8 shadow-lg">
          <CardHeader>
            <CardTitle>Membership Tiers</CardTitle>
            <p className="text-sm text-gray-500 mt-1">Choose the plan that fits your quiz journey.</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 border rounded-lg">
                <h3 className="text-xl font-bold mb-2">Free Plan</h3>
                <ul className="list-disc ml-5 text-gray-700 space-y-1">
                  <li>1 quiz per day</li>
                  <li>Basic profile and stats</li>
                  <li>Access to standard quizzes</li>
                  <li>Participate in weekly leaderboard</li>
                  <li>Community support</li>
                </ul>
              </div>
              <div className="relative p-4 border rounded-lg bg-gradient-to-br from-purple-200 to-purple-100 text-gray-900">
                <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-purple-600 text-white text-xs font-bold shadow">Pro</span>
                <h3 className="text-xl font-bold mb-2 flex items-center">Pro Plan <span className="ml-3 text-base font-semibold text-purple-700">$6/month</span></h3>
                <ul className="list-disc ml-5 text-gray-700 space-y-1">
                  <li>Unlimited quizzes</li>
                  <li>Bonus content (verse memory, themed quizzes)</li>
                  <li>Detailed reports on strengths/weaknesses</li>
                  <li>Access to past attempts and analytics</li>
                </ul>
                <Button className="mt-4" variant="default">Upgrade Now</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )} */}

    </DashboardLayout>
  );
};

export default Dashboard;
