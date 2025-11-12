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
  }, []);

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
      } else {
        setCurrentWeeklyQuiz(null);
        setWeeklyQuizAttempt(null);
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

      {/* Wellness Stats Grid */}
      <div className="w-full overflow-x-auto mb-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 min-w-0">
          <Card className="border border-gray-200 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-center md:items-center space-y-3 md:space-y-0 md:space-x-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Flame className="w-5 h-5 text-orange-600" strokeWidth={1} />
                </div>
                <div className="text-center md:text-left">
                  <div className="text-3xl font-urbanist font-semibold text-gray-900">{wellnessStats.currentStreak}</div>
                  <div className="text-sm font-urbanist font-light text-gray-600">Current Streak</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-center md:items-center space-y-3 md:space-y-0 md:space-x-3">
                <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
                  <Droplet className="w-5 h-5 text-cyan-600" strokeWidth={1} />
                </div>
                <div className="text-center md:text-left">
                  <div className="text-3xl font-urbanist font-semibold text-gray-900">{wellnessStats.weeklyAverage}ml</div>
                  <div className="text-sm font-urbanist font-light text-gray-600">Weekly Avg Water</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-center md:items-center space-y-3 md:space-y-0 md:space-x-3">
                <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-pink-600" strokeWidth={1} />
                </div>
                <div className="text-center md:text-left">
                  {wellnessStats.averageEmotion ? (() => {
                    const emotion = emotionOptions.find(e => e.id === wellnessStats.averageEmotion);
                    return (
                      <>
                        <div className="flex items-center justify-center md:justify-start gap-2">
                          {emotion?.image ? (
                            <img 
                              src={emotion.image} 
                              alt={emotion.label}
                              className="w-8 h-8 object-contain"
                            />
                          ) : (
                            <span className="text-3xl">{emotion?.emoji || '😐'}</span>
                          )}
                          <span className="text-lg font-urbanist font-semibold text-gray-900">{emotion?.label || 'N/A'}</span>
                        </div>
                        <div className="text-sm font-urbanist font-light text-gray-600">Average Emotion</div>
                      </>
                    );
                  })() : (
                    <>
                      <div className="text-3xl font-urbanist font-semibold text-gray-900">—</div>
                      <div className="text-sm font-urbanist font-light text-gray-600">Average Emotion</div>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer" onClick={() => navigate('/dashboard/bible-games')}>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-center md:items-center space-y-3 md:space-y-0 md:space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                  <Gamepad2 className="w-6 h-6 text-white" strokeWidth={2} />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="text-base font-urbanist font-semibold text-gray-900 mb-1">Play Bible Games</div>
                  <div className="text-xs font-urbanist font-light text-purple-600 flex items-center justify-center md:justify-start gap-1">
                    <Sparkles className="w-3 h-3" />
                    Unlimited turns
                  </div>
                </div>
                <div className="text-purple-500">
                  <Play className="w-5 h-5" strokeWidth={2} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Emotional Tracker Widget */}
      <Card className="w-full border-2 border-pink-200 bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 mb-6">
        <CardHeader>
          <CardTitle className="text-xl font-urbanist font-semibold text-gray-900 flex items-center gap-2">
            <Heart className="w-5 h-5 text-pink-500" strokeWidth={2} />
            Emotional Tracker
          </CardTitle>
          <CardDescription className="font-urbanist font-light text-gray-600">
            Track your daily mood and emotional wellness
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!showEmotionalCheckIn && !showEncouragement && (
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-urbanist font-semibold text-gray-900 mb-2">
                  Daily Mood Check-In
                </h3>
                <p className="text-sm font-urbanist font-light text-gray-600 mb-4">
                  Take a moment to reflect on how you're feeling today. Track your emotions, receive personalized Bible verses, and access CBT tools for emotional wellness.
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-pink-500" />
                    <span className="font-urbanist font-light text-gray-600">Personalized verses</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Brain className="w-4 h-4 text-purple-500" />
                    <span className="font-urbanist font-light text-gray-600">CBT tools</span>
                  </div>
                </div>
              </div>
              {!hasCheckedInToday && (
                <Button
                  className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-urbanist font-light whitespace-nowrap shadow-md hover:shadow-lg transition-all duration-300"
                  onClick={() => setShowEmotionalCheckIn(true)}
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Check In Now
                </Button>
              )}
              {hasCheckedInToday && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="font-urbanist font-light">Checked in today</span>
                </div>
              )}
            </div>
          )}

          {/* Emotion Slider */}
          {showEmotionalCheckIn && !showEncouragement && selectedEmotion && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-urbanist font-semibold text-gray-900 mb-2">
                  How Are You Feeling Today?
                </h3>
                <p className="text-sm font-urbanist font-light text-gray-600">
                  Move the slider to select your current emotion
                </p>
              </div>
              
              {/* Emotion Display - matching homepage hero UI */}
              <div className={`${selectedEmotion.bgColor} rounded-lg p-6 md:p-8 transition-all duration-300`}>
                <div className="flex flex-col items-center justify-center">
                  <div className="mb-4 transition-all duration-300">
                    {selectedEmotion.image ? (
                      <img 
                        src={selectedEmotion.image} 
                        alt={selectedEmotion.label}
                        className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain"
                      />
                    ) : (
                      <div className="text-7xl md:text-6xl lg:text-7xl">{selectedEmotion.emoji}</div>
                    )}
                  </div>
                  <h3 className={`text-2xl md:text-3xl font-urbanist font-semibold ${selectedEmotion.color} mb-2`}>
                    {selectedEmotion.label}
                  </h3>
                </div>
              </div>

              {/* Slider - matching homepage hero UI */}
              <div className="w-full relative">
                <div className="relative px-2">
                  <div className="relative">
                    <input
                      type="range"
                      min="0"
                      max="5"
                      step="0.1"
                      value={sliderValue}
                      onChange={(e) => handleSliderChange(parseFloat(e.target.value))}
                      className="w-full h-3 md:h-4 bg-transparent rounded-full appearance-none cursor-pointer emotion-slider"
                      style={{
                        background: `linear-gradient(to right, 
                          #f97316 0%, 
                          #ef4444 25%, 
                          #6b7280 40%, 
                          #3b82f6 60%, 
                          #22c55e 85%, 
                          #22c55e 100%)`
                      }}
                    />
                    <style>{`
                      .emotion-slider {
                        background: linear-gradient(to right, 
                          #f97316 0%, 
                          #ef4444 25%, 
                          #6b7280 40%, 
                          #3b82f6 60%, 
                          #22c55e 85%, 
                          #22c55e 100%);
                        height: 8px;
                        border-radius: 9999px;
                        outline: none;
                      }
                      .emotion-slider::-webkit-slider-runnable-track {
                        width: 100%;
                        height: 8px;
                        border-radius: 9999px;
                        background: linear-gradient(to right, 
                          #f97316 0%, 
                          #ef4444 25%, 
                          #6b7280 40%, 
                          #3b82f6 60%, 
                          #22c55e 85%, 
                          #22c55e 100%);
                        box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
                      }
                      .emotion-slider::-webkit-slider-thumb {
                        appearance: none;
                        width: 24px;
                        height: 24px;
                        border-radius: 50%;
                        background: linear-gradient(135deg, #7b7ff0 0%, #6366f1 100%);
                        cursor: pointer;
                        border: 4px solid white;
                        box-shadow: 0 2px 8px rgba(123, 127, 240, 0.4), 0 4px 12px rgba(123, 127, 240, 0.2);
                        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                        margin-top: -8px;
                      }
                      .emotion-slider::-webkit-slider-thumb:hover {
                        transform: scale(1.15);
                        box-shadow: 0 4px 12px rgba(123, 127, 240, 0.5), 0 6px 16px rgba(123, 127, 240, 0.3);
                        background: linear-gradient(135deg, #6366f1 0%, #7b7ff0 100%);
                      }
                      .emotion-slider::-webkit-slider-thumb:active {
                        transform: scale(1.1);
                        box-shadow: 0 2px 6px rgba(123, 127, 240, 0.6);
                      }
                      .emotion-slider::-moz-range-track {
                        width: 100%;
                        height: 8px;
                        border-radius: 9999px;
                        background: linear-gradient(to right, 
                          #f97316 0%, 
                          #ef4444 25%, 
                          #6b7280 40%, 
                          #3b82f6 60%, 
                          #22c55e 85%, 
                          #22c55e 100%);
                        box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
                      }
                      .emotion-slider::-moz-range-thumb {
                        width: 24px;
                        height: 24px;
                        border-radius: 50%;
                        background: linear-gradient(135deg, #7b7ff0 0%, #6366f1 100%);
                        cursor: pointer;
                        border: 4px solid white;
                        box-shadow: 0 2px 8px rgba(123, 127, 240, 0.4), 0 4px 12px rgba(123, 127, 240, 0.2);
                        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                      }
                      .emotion-slider::-moz-range-thumb:hover {
                        transform: scale(1.15);
                        box-shadow: 0 4px 12px rgba(123, 127, 240, 0.5), 0 6px 16px rgba(123, 127, 240, 0.3);
                        background: linear-gradient(135deg, #6366f1 0%, #7b7ff0 100%);
                      }
                    `}</style>
                  </div>
                </div>
                <div className="flex justify-between text-xs font-urbanist font-light text-gray-500 mt-3">
                  <span>Very Anxious</span>
                  <span>Great/Peaceful</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={resetEmotionalCheckIn}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white"
                  onClick={handleSliderConfirm}
                >
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Encouragement Screen */}
          {showEncouragement && selectedVerse && thinkingTrap && selectedEmotion && (() => {
            const trapInfo = thinkingTrapsInfo[thinkingTrap];
            return (
              <div className="space-y-6">
                <div className="rounded-lg p-6 border border-amber-200 bg-white">
                  <div className="flex items-start gap-3">
                    <Heart className="w-6 h-6 text-pink-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-urbanist font-light text-gray-700 leading-relaxed">
                        {selectedVerse.encouragement}
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white"
                  onClick={resetEmotionalCheckIn}
                >
                  Done
                  <CheckCircle className="w-4 h-4 ml-2" />
                </Button>
              </div>
            );
          })()}
        </CardContent>
      </Card>

      {/* 2x2 Grid Dashboard Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* First Section: Water Intake Widget */}
        <Card className="border border-gray-200 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-xl font-urbanist font-semibold text-gray-900 flex items-center gap-2">
              <Droplet className="w-5 h-5 text-blue-500" />
              Water Intake Tracker
            </CardTitle>
            <CardDescription className="font-urbanist font-light text-gray-600">
              Track your daily hydration
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full">
              {/* 2 Column Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 relative">
                {/* Left Column: Animated Water Glass */}
                <div className="flex justify-center items-center relative">
                  <div 
                    ref={glassRef}
                    className="relative w-32 h-48 md:w-40 md:h-56 cursor-pointer select-none touch-none"
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleTouchStart}
                  >
                    {/* Glass outline */}
                    <svg 
                      className="absolute inset-0 w-full h-full"
                      viewBox="0 0 100 150"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M 20 10 L 20 140 Q 20 145 25 145 L 75 145 Q 80 145 80 140 L 80 10 Q 80 5 75 5 L 25 5 Q 20 5 20 10 Z"
                        fill="none"
                        stroke="#cbd5e1"
                        strokeWidth="2"
                      />
                      <ellipse cx="50" cy="10" rx="30" ry="3" fill="#e2e8f0" />
                    </svg>

                    {/* Water fill */}
                    <div 
                      className="absolute bottom-0 left-0 right-0 transition-all duration-500 ease-out overflow-hidden"
                      style={{
                        height: `${waterPercentage}%`,
                        background: `linear-gradient(to top, 
                          rgba(59, 130, 246, 0.9) 0%,
                          rgba(96, 165, 250, 0.8) 50%,
                          rgba(147, 197, 253, 0.7) 100%
                        )`,
                        clipPath: 'inset(0 20% 0 20% round 0 0 8px 8px)',
                      }}
                    >
                      <div 
                        className="absolute inset-0 opacity-30"
                        style={{
                          background: `repeating-linear-gradient(
                            90deg,
                            transparent,
                            transparent 10px,
                            rgba(255, 255, 255, 0.3) 10px,
                            rgba(255, 255, 255, 0.3) 20px
                          )`,
                          animation: 'wave 3s linear infinite',
                        }}
                      />
                      <div className="absolute inset-0">
                        {[0, 1, 2, 3, 4].map((i) => (
                          <div
                            key={i}
                            className="absolute rounded-full bg-white/40"
                            style={{
                              width: `${4 + (i * 0.8)}px`,
                              height: `${4 + (i * 0.8)}px`,
                              left: `${25 + (i * 12)}%`,
                              bottom: `${5 + (i * 5)}%`,
                              animation: `bubble ${2 + (i * 0.4)}s ease-in-out infinite`,
                              animationDelay: `${i * 0.5}s`,
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Small glasses next to the glass - Left side */}
                    {(() => {
                      const totalGlasses = Math.min(Math.ceil(waterIntake / 250), 9);
                      const leftGlasses = Math.ceil(totalGlasses / 2);
                      return (
                        <div 
                          className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-12 md:-translate-x-16 flex flex-col gap-2 items-center z-10 pointer-events-none"
                        >
                          {Array.from({ length: leftGlasses }).map((_, i) => (
                            <div
                              key={i}
                              className="w-6 h-8 md:w-8 md:h-10 rounded-b-lg border-2 border-blue-300 bg-blue-100/60 flex items-end justify-center overflow-hidden shadow-md"
                              style={{
                                animation: `glassAppear 0.3s ease-out ${i * 0.05}s both`,
                              }}
                            >
                              <div 
                                className="w-full bg-blue-400 transition-all duration-300"
                                style={{ height: '85%' }}
                              />
                            </div>
                          ))}
                        </div>
                      );
                    })()}

                    {/* Small glasses next to the glass - Right side */}
                    {(() => {
                      const totalGlasses = Math.min(Math.ceil(waterIntake / 250), 9);
                      const rightGlasses = Math.floor(totalGlasses / 2);
                      return (
                        <div 
                          className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-12 md:translate-x-16 flex flex-col gap-2 items-center z-10 pointer-events-none"
                        >
                          {Array.from({ length: rightGlasses }).map((_, i) => (
                            <div
                              key={i}
                              className="w-6 h-8 md:w-8 md:h-10 rounded-b-lg border-2 border-blue-300 bg-blue-100/60 flex items-end justify-center overflow-hidden shadow-md"
                              style={{
                                animation: `glassAppear 0.3s ease-out ${i * 0.05}s both`,
                              }}
                            >
                              <div 
                                className="w-full bg-blue-400 transition-all duration-300"
                                style={{ height: '85%' }}
                              />
                            </div>
                          ))}
                        </div>
                      );
                    })()}

                    {isDragging && (
                      <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white text-xs px-2 py-1 rounded shadow-lg">
                        {waterIntake}ml
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Column: Details */}
                <div className="flex flex-col justify-center">
                  <div className="mb-4">
                    <p className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
                      {waterIntake}ml <span className="text-lg md:text-xl font-normal text-gray-500 relative" style={{ top: '-4px' }}>({Math.round(waterPercentage)}% completed)</span>
                    </p>
                    <p className="text-base text-gray-600 mb-4">
                      {Math.round(waterIntake / 250)} cups
                    </p>
                    
                    {/* Progress bar */}
                    <div className="w-full bg-gray-100 rounded-full h-2.5 mb-2">
                      <div 
                        className="bg-gradient-to-r from-blue-400 to-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${waterPercentage}%` }}
                      />
                    </div>
                    
                    <p className="text-sm text-gray-500">
                      {Math.round(waterPercentage)}% of daily goal (2250ml / 9 cups)
                    </p>
                  </div>

                  {/* Water Intake Information */}
                  <div className="hidden md:block bg-blue-50 rounded-lg p-4 border border-blue-100">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Daily Water Recommendations</h4>
                    <ul className="text-xs text-gray-700 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-0.5">•</span>
                        <span>Average adult: <strong>2,000-3,000ml</strong> (8-12 cups) per day</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-0.5">•</span>
                        <span>Staying hydrated supports mental clarity and emotional wellness</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-center">
                <Button
                  onClick={() => saveWaterIntake(waterIntake)}
                  disabled={isSavingWater}
                  className="px-6 md:px-8 py-4 md:py-6 text-base md:text-lg font-urbanist font-light text-white shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50"
                >
                  {isSavingWater ? 'Saving...' : 'Save Water Intake'}
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
                </Button>
              </div>

              <style>{`
                @keyframes wave {
                  0% { transform: translateX(0); }
                  100% { transform: translateX(20px); }
                }
                @keyframes bubble {
                  0%, 100% { transform: translateY(0) scale(1); opacity: 0.4; }
                  50% { transform: translateY(-10px) scale(1.2); opacity: 0.8; }
                }
                @keyframes glassAppear {
                  0% { 
                    opacity: 0; 
                    transform: translateY(10px) scale(0.8); 
                  }
                  100% { 
                    opacity: 1; 
                    transform: translateY(0) scale(1); 
                  }
                }
              `}</style>
            </div>
          </CardContent>
        </Card>

        {/* Second Section: Bible Reading/Devotional Tracker */}
        <Card className="border border-gray-200 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-xl font-urbanist font-semibold text-gray-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-500" />
              Bible Reading Tracker
            </CardTitle>
            <CardDescription className="font-urbanist font-light text-gray-600">
              Track your daily Bible reading
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full">
              {/* Streak Display */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm font-urbanist font-light text-gray-600">Current Streak</p>
                    <p className="text-4xl font-urbanist font-semibold text-gray-900">
                      {streakData?.current_streak || 0} <span className="text-lg text-gray-500">days</span>
                    </p>
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center">
                    <Flame className="w-8 h-8 text-orange-500" strokeWidth={2} />
                  </div>
                </div>
                
                {streakData?.longest_streak && streakData.longest_streak > 0 && (
                  <div className="bg-purple-50 rounded-lg p-3 border border-purple-100">
                    <p className="text-base font-urbanist font-light text-gray-600">
                      Longest streak: <span className="font-semibold text-purple-700">{streakData.longest_streak} days</span>
                    </p>
                  </div>
                )}
              </div>

              {/* Today's Bible Reading */}
              <div className="mb-6">
                {todayBibleRead ? (
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <div className="flex items-center gap-3 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-600" strokeWidth={2} />
                      <p className="font-urbanist font-semibold text-green-900">Today's Reading Complete!</p>
                    </div>
                    <p className="text-sm font-urbanist font-light text-green-700">
                      You read {todayBibleRead.time_spent_seconds ? Math.round(todayBibleRead.time_spent_seconds / 60) : 5} minutes today
                    </p>
                    {todayBibleRead.devotional_title && (
                      <p className="text-xs font-urbanist font-light text-green-600 mt-1">
                        {todayBibleRead.devotional_title}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg p-4 border border-purple-200">
                    {isLoadingVerse ? (
                      <div className="text-center py-4">
                        <p className="text-sm font-urbanist font-light text-gray-600">Loading today's reading...</p>
                      </div>
                    ) : todaysReadings ? (
                      <>
                        <div className="mb-4">
                          <p className="text-xs font-urbanist font-medium text-purple-700 mb-2 text-center">
                            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                          </p>
                          <div className="space-y-2">
                            <div className="bg-orange-50 rounded-lg p-3 border border-orange-200">
                              <p className="text-xs font-urbanist font-medium text-orange-700 mb-1">Old Testament</p>
                              <p className="text-sm font-urbanist font-semibold text-gray-900">
                                {todaysReadings.oldTestament.reference}
                              </p>
                            </div>
                            <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                              <p className="text-xs font-urbanist font-medium text-blue-700 mb-1">New Testament</p>
                              <p className="text-sm font-urbanist font-semibold text-gray-900">
                                {todaysReadings.newTestament.reference}
                              </p>
                            </div>
                          </div>
                        </div>
                        <Button
                          onClick={() => {
                            setSelectedDate(new Date());
                            setReadingTitle(`${todaysReadings.oldTestament.reference} & ${todaysReadings.newTestament.reference}`);
                            setReadingVerse('');
                            setSelectedReading(null);
                            // Fetch both readings
                            fetchBibleText(todaysReadings.oldTestament.reference, 'ot');
                            fetchBibleText(todaysReadings.newTestament.reference, 'nt');
                            setIsReadingDialogOpen(true);
                          }}
                          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-urbanist font-light"
                        >
                          <BookOpen className="w-4 h-4 mr-2" />
                          Read Today's Chapters
                        </Button>
                      </>
                    ) : todayVerse ? (
                      <>
                        <div className="mb-4 text-center">
                          <p className="text-xs font-urbanist font-medium text-purple-700 mb-1">Today's Reading</p>
                          <p className="text-lg font-urbanist font-semibold text-gray-900">
                            {todayVerse.verse_reference}
                          </p>
                        </div>
                        <Button
                          onClick={() => {
                            setSelectedDate(new Date());
                            setReadingTitle(todayVerse.verse_reference);
                            setReadingVerse(todayVerse.verse_reference);
                            fetchBibleText(todayVerse.verse_reference);
                            setIsReadingDialogOpen(true);
                          }}
                          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-urbanist font-light"
                        >
                          <BookOpen className="w-4 h-4 mr-2" />
                          Read Today's Chapter
                        </Button>
                      </>
                    ) : (
                      <div className="text-center py-4">
                        <p className="text-sm font-urbanist font-light text-gray-600 mb-4">
                          No reading available for today
                        </p>
                        <Button
                          onClick={() => {
                            setSelectedDate(new Date());
                            setIsReadingDialogOpen(true);
                          }}
                          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-urbanist font-light"
                        >
                          <BookOpen className="w-4 h-4 mr-2" />
                          Record Reading
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Bible Reading Dialog */}
              <Dialog open={isReadingDialogOpen} onOpenChange={setIsReadingDialogOpen}>
                <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="font-urbanist font-semibold">
                      Read Bible & Record
                    </DialogTitle>
                    <DialogDescription className="font-urbanist font-light">
                      Read today's Bible passage and mark it as complete
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-4 mt-4">
                    {/* Translation Selector */}
                    <div className="flex items-center justify-end">
                      <Select value={selectedTranslation} onValueChange={(value) => {
                        setSelectedTranslation(value);
                        if (todaysReadings) {
                          fetchBibleText(todaysReadings.oldTestament.reference, 'ot');
                          fetchBibleText(todaysReadings.newTestament.reference, 'nt');
                        } else if (readingTitle) {
                          fetchBibleText(readingTitle);
                        }
                      }}>
                        <SelectTrigger className="w-32 h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="web">WEB</SelectItem>
                          <SelectItem value="kjv">KJV</SelectItem>
                          <SelectItem value="asv">ASV</SelectItem>
                          <SelectItem value="bbe">BBE</SelectItem>
                          <SelectItem value="darby">Darby</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Bible Text Display in Dialog - Show both OT and NT if available */}
                    {todaysReadings ? (
                      <div className="space-y-4">
                        {/* Old Testament Reading */}
                        <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg p-4 border border-orange-200">
                          <div className="flex items-center justify-between mb-3">
                            <p className="text-lg font-urbanist font-semibold text-gray-900">
                              {todaysReadings.oldTestament.reference}
                            </p>
                            <Badge className="bg-orange-100 text-orange-700">Old Testament</Badge>
                          </div>
                          
                          {isLoadingBibleText && !bibleTextOT ? (
                            <div className="text-center py-8">
                              <p className="text-sm font-urbanist font-light text-gray-500">Loading...</p>
                            </div>
                          ) : bibleTextOT ? (
                            <div className="bg-white rounded-lg p-4 border border-orange-100 max-h-64 overflow-y-auto">
                              <p className="text-xs font-urbanist font-semibold text-orange-700 mb-3">
                                {bibleTextOT.reference} ({bibleTextOT.translation_name || selectedTranslation.toUpperCase()})
                              </p>
                              <div className="space-y-2">
                                {bibleTextOT.verses?.map((verse: any, index: number) => (
                                  <p key={index} className="text-sm font-urbanist font-light text-gray-800 leading-relaxed">
                                    <span className="font-semibold text-orange-600">{verse.verse}</span> {verse.text}
                                  </p>
                                )) || (
                                  <p className="text-sm font-urbanist font-light text-gray-800 leading-relaxed whitespace-pre-wrap">
                                    {bibleTextOT.text}
                                  </p>
                                )}
                              </div>
                            </div>
                          ) : null}
                        </div>

                        {/* New Testament Reading */}
                        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-4 border border-blue-200">
                          <div className="flex items-center justify-between mb-3">
                            <p className="text-lg font-urbanist font-semibold text-gray-900">
                              {todaysReadings.newTestament.reference}
                            </p>
                            <Badge className="bg-blue-100 text-blue-700">New Testament</Badge>
                          </div>
                          
                          {isLoadingBibleText && !bibleTextNT ? (
                            <div className="text-center py-8">
                              <p className="text-sm font-urbanist font-light text-gray-500">Loading...</p>
                            </div>
                          ) : bibleTextNT ? (
                            <div className="bg-white rounded-lg p-4 border border-blue-100 max-h-64 overflow-y-auto">
                              <p className="text-xs font-urbanist font-semibold text-blue-700 mb-3">
                                {bibleTextNT.reference} ({bibleTextNT.translation_name || selectedTranslation.toUpperCase()})
                              </p>
                              <div className="space-y-2">
                                {bibleTextNT.verses?.map((verse: any, index: number) => (
                                  <p key={index} className="text-sm font-urbanist font-light text-gray-800 leading-relaxed">
                                    <span className="font-semibold text-blue-600">{verse.verse}</span> {verse.text}
                                  </p>
                                )) || (
                                  <p className="text-sm font-urbanist font-light text-gray-800 leading-relaxed whitespace-pre-wrap">
                                    {bibleTextNT.text}
                                  </p>
                                )}
                              </div>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    ) : readingTitle ? (
                      /* Fallback for manual entry */
                      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg p-4 border border-purple-200">
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-lg font-urbanist font-semibold text-gray-900">
                            {readingTitle}
                          </p>
                        </div>
                        
                        {isLoadingBibleText ? (
                          <div className="text-center py-8">
                            <p className="text-sm font-urbanist font-light text-gray-500">Loading Bible text...</p>
                          </div>
                        ) : bibleText ? (
                          <div className="bg-white rounded-lg p-4 border border-purple-100 max-h-96 overflow-y-auto">
                            <p className="text-xs font-urbanist font-semibold text-purple-700 mb-3">
                              {bibleText.reference} ({bibleText.translation_name || selectedTranslation.toUpperCase()})
                            </p>
                            <div className="space-y-3">
                              {bibleText.verses?.map((verse: any, index: number) => (
                                <p key={index} className="text-sm font-urbanist font-light text-gray-800 leading-relaxed">
                                  <span className="font-semibold text-purple-600">{verse.verse}</span> {verse.text}
                                </p>
                              )) || (
                                <p className="text-sm font-urbanist font-light text-gray-800 leading-relaxed whitespace-pre-wrap">
                                  {bibleText.text}
                                </p>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="bg-white rounded-lg p-4 border border-gray-200">
                            <p className="text-sm font-urbanist font-light text-gray-600 italic">
                              Enter a Bible reference above to load the text
                            </p>
                          </div>
                        )}
                      </div>
                    ) : null}

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setIsReadingDialogOpen(false);
                          setReadingTitle("");
                          setReadingVerse("");
                        }}
                        className="flex-1 font-urbanist font-light"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={recordBibleReading}
                        disabled={isRecordingRead || (todaysReadings && (!bibleTextOT || !bibleTextNT)) || (!todaysReadings && !bibleText)}
                        className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-urbanist font-light disabled:opacity-50"
                      >
                        {isRecordingRead ? (
                          <>Recording...</>
                        ) : (
                          <>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Mark as Read
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

            </div>
          </CardContent>
        </Card>
      </div>

      {/* Second Row of 2x2 Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Third Section: Prayer Tracker Widget */}
        <Card className="border border-gray-200 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-xl font-urbanist font-semibold text-gray-900 flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500" />
              Prayer Tracker
            </CardTitle>
            <CardDescription className="font-urbanist font-light text-gray-600">
              Track your daily prayer
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full">
              {/* Prayer Streak */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm font-urbanist font-light text-gray-600">Prayer Streak</p>
                    <p className="text-4xl font-urbanist font-semibold text-gray-900">
                      {prayerStreak?.current_streak || 0} <span className="text-lg text-gray-500">days</span>
                    </p>
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-pink-200 rounded-full flex items-center justify-center">
                    <Flame className="w-8 h-8 text-orange-500" strokeWidth={2} />
                  </div>
                </div>
                
                {prayerStreak?.longest_streak && prayerStreak.longest_streak > 0 && (
                  <div className="bg-red-50 rounded-lg p-3 border border-red-100 mb-4">
                    <p className="text-base font-urbanist font-light text-gray-600">
                      Longest streak: <span className="font-semibold text-red-700">{prayerStreak.longest_streak} days</span>
                    </p>
                  </div>
                )}

                {/* Prayer Status */}
                {isLoadingPrayer ? (
                  <div className="text-center py-4">
                    <p className="text-sm font-urbanist font-light text-gray-500">Loading...</p>
                  </div>
                ) : todayPrayed ? (
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <div className="flex items-center gap-3 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-600" strokeWidth={2} />
                      <p className="font-urbanist font-semibold text-green-900">Prayer Complete Today!</p>
                    </div>
                    <p className="text-sm font-urbanist font-light text-green-700">
                      You've prayed today. Keep up the good work!
                    </p>
                  </div>
                ) : (
                  <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                    <div className="flex items-center gap-3 mb-2">
                      <Heart className="w-5 h-5 text-red-600" strokeWidth={2} />
                      <p className="font-urbanist font-semibold text-red-900">Haven't Prayed Today</p>
                    </div>
                    <p className="text-sm font-urbanist font-light text-red-700">
                      Take a moment to pray and mark it complete.
                    </p>
                  </div>
                )}
              </div>

              {/* Mark Prayer Button */}
              <Button
                onClick={recordPrayer}
                disabled={isRecordingPrayer || todayPrayed}
                className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-urbanist font-light disabled:opacity-50"
              >
                {isRecordingPrayer ? (
                  <>Recording...</>
                ) : todayPrayed ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Prayer Complete
                  </>
                ) : (
                  <>
                    <Heart className="w-4 h-4 mr-2" />
                    Mark Prayer Complete
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Fourth Section: Weekly Bible Quiz */}
        <Card className="border border-gray-200 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-xl font-urbanist font-semibold text-gray-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-500" />
              Weekly Bible Quiz
            </CardTitle>
            <CardDescription className="font-urbanist font-light text-gray-600">
              Test your knowledge with this week's challenge
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoadingWeeklyQuiz ? (
              <div className="flex items-center justify-center py-8">
                <p className="text-sm font-urbanist font-light text-gray-500">Loading...</p>
              </div>
            ) : currentWeeklyQuiz ? (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-urbanist font-semibold text-gray-900 mb-2">
                    {currentWeeklyQuiz.title}
                  </h3>
                  {currentWeeklyQuiz.description && (
                    <p className="text-sm font-urbanist font-light text-gray-600 mb-3">
                      {currentWeeklyQuiz.description}
                    </p>
                  )}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                    {currentWeeklyQuiz.theme && (
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        <span className="font-urbanist font-light">{currentWeeklyQuiz.theme}</span>
                      </div>
                    )}
                    {currentWeeklyQuiz.difficulty && (
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4" />
                        <span className="font-urbanist font-light capitalize">{currentWeeklyQuiz.difficulty}</span>
                      </div>
                    )}
                    {currentWeeklyQuiz.total_questions && (
                      <div className="flex items-center gap-2">
                        <Brain className="w-4 h-4" />
                        <span className="font-urbanist font-light">{currentWeeklyQuiz.total_questions} questions</span>
                      </div>
                    )}
                    {currentWeeklyQuiz.time_limit && (
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span className="font-urbanist font-light">{Math.floor(currentWeeklyQuiz.time_limit / 60)} min</span>
                      </div>
                    )}
                  </div>
                </div>
                {weeklyQuizAttempt?.completed ? (
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <div className="flex items-center gap-3 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-600" strokeWidth={2} />
                      <p className="font-urbanist font-semibold text-green-900">Quiz Completed</p>
                    </div>
                    <p className="text-sm font-urbanist font-light text-green-700 mb-3">
                      You've completed this week's quiz! Check back next week for a new challenge.
                    </p>
                    <Button
                      variant="outline"
                      className="w-full border-green-300 text-green-700 hover:bg-green-50 font-urbanist font-light"
                      onClick={() => navigate('/weekly-quiz')}
                    >
                      View Leaderboard
                    </Button>
                  </div>
                ) : (
                  <Button
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-urbanist font-light"
                    onClick={() => navigate(`/weekly-quiz/${currentWeeklyQuiz.id}`)}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start Quiz
                  </Button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                  <div className="flex items-start gap-3 mb-3">
                    <Calendar className="w-5 h-5 text-amber-600 mt-0.5" strokeWidth={2} />
                    <div>
                      <h3 className="text-base font-urbanist font-semibold text-amber-900 mb-1">
                        No Weekly Quiz Available
                      </h3>
                      <p className="text-sm font-urbanist font-light text-amber-700 mb-2">
                        There's no active weekly quiz for this week. Weekly quizzes are typically available from Monday to Sunday.
                      </p>
                      <ul className="text-xs font-urbanist font-light text-amber-700 space-y-1 ml-4 list-disc">
                        <li>Check back on Monday for the new week's quiz</li>
                        <li>Weekly quizzes test your Bible knowledge with timed challenges</li>
                        <li>Compete on the leaderboard and track your progress</li>
                        <li>Each quiz includes multiple questions with varying difficulty</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-urbanist font-light"
                    onClick={() => navigate('/weekly-quiz')}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Attempt Weekly Quiz
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-gray-300 font-urbanist font-light"
                    onClick={() => navigate('/weekly-quiz')}
                  >
                    View All Quizzes
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Progress & Streak Section */}
      {stats.totalAttempts > 0 && (
        <Card className="border border-gray-200 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow mb-6">
          <CardHeader>
            <CardTitle className="text-xl font-urbanist font-semibold text-gray-900">Your Progress</CardTitle>
            <CardDescription className="font-urbanist font-light text-gray-600">Track your learning journey</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Progress towards next level */}
              <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-5 h-5 text-gray-700" strokeWidth={1} />
                  <span className="font-urbanist font-semibold text-gray-900 text-sm">Level Progress</span>
                </div>
                <div className="mb-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-urbanist font-light text-gray-600">Next milestone</span>
                    <span className="text-xs font-urbanist font-medium text-gray-900">
                      {stats.totalAttempts < 10 ? `${10 - stats.totalAttempts} more` : 'Achieved!'}
                    </span>
                  </div>
                  <Progress 
                    value={Math.min((stats.totalAttempts / 10) * 100, 100)} 
                    className="h-2 bg-gray-200"
                  />
                </div>
                <p className="text-xs font-urbanist font-light text-gray-500 mt-2">
                  {stats.totalAttempts < 10 
                    ? `Complete ${10 - stats.totalAttempts} more quiz${10 - stats.totalAttempts === 1 ? '' : 'zes'} to unlock new features`
                    : 'Great progress! Keep learning'}
                </p>
              </div>

              {/* Improvement indicator */}
              <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="w-5 h-5 text-gray-700" strokeWidth={1} />
                  <span className="font-urbanist font-semibold text-gray-900 text-sm">Performance</span>
                </div>
                <div className="mb-2">
                  <div className="text-2xl font-urbanist font-semibold text-gray-900 mb-1">
                    {stats.averageScore > 0 ? `${Math.round((stats.bestScore / stats.averageScore - 1) * 100)}%` : '0%'}
                  </div>
                  <p className="text-xs font-urbanist font-light text-gray-600">
                    {stats.averageScore > 0 && stats.bestScore > stats.averageScore
                      ? 'Above your average'
                      : 'Getting started'}
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <div className="text-xs font-urbanist font-light text-gray-500">
                    Best: {stats.bestScore} pts
                  </div>
                </div>
              </div>

              {/* Activity summary */}
              <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-5 h-5 text-gray-700" strokeWidth={1} />
                  <span className="font-urbanist font-semibold text-gray-900 text-sm">Activity</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-urbanist font-light text-gray-600">Total quizzes</span>
                    <span className="text-sm font-urbanist font-semibold text-gray-900">{stats.totalAttempts}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-urbanist font-light text-gray-600">Time spent</span>
                    <span className="text-sm font-urbanist font-semibold text-gray-900">{formatTime(stats.totalTimeSpent)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-urbanist font-light text-gray-600">Avg. score</span>
                    <span className="text-sm font-urbanist font-semibold text-gray-900">{stats.averageScore}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Activity - Simple */}
      {recentAttempts.length > 0 && (
        <Card className="border border-gray-200 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-urbanist font-semibold text-gray-900">Recent Activity</CardTitle>
                <CardDescription className="font-urbanist font-light text-gray-600">Your latest quiz attempts</CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="font-urbanist font-light text-gray-600"
                onClick={() => navigate('/dashboard/recent-attempts')}
              >
                View All
                <ArrowRight className="w-4 h-4 ml-1" strokeWidth={1} />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentAttempts.slice(0, 3).map((attempt: any, index: number) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => navigate('/dashboard/recent-attempts')}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Trophy className="w-4 h-4 text-gray-700" strokeWidth={1} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-urbanist font-medium text-gray-900 text-sm truncate">
                        {(attempt.quizzes as any)?.title || 'Quiz'}
                      </div>
                      <div className="text-xs font-urbanist font-light text-gray-500">
                        {new Date(attempt.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-urbanist font-semibold text-gray-900 text-sm">{attempt.score || 0}</div>
                      <div className="text-xs font-urbanist font-light text-gray-500">points</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

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
