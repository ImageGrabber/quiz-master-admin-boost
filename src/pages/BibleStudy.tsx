import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  Target, 
  Star, 
  Heart, 
  Lightbulb, 
  Users, 
  TrendingUp, 
  CheckCircle,
  Play,
  BookMarked,
  Award,
  Zap,
  User,
  LogOut,
  Flame,
  Trophy
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const dailyDevotional = {
  date: new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }),
  verse: "Philippians 4:6-7",
  scripture: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.",
  title: "Finding Peace in Prayer",
  reflection: "In today's fast-paced world, anxiety can easily overwhelm us. Paul reminds us that prayer is our direct line to God's peace. When we bring our concerns to Him with thanksgiving, He promises to guard our hearts and minds with His peace that goes beyond human understanding.",
  application: "Take time today to pray about your specific concerns. Instead of just asking for solutions, thank God for His presence and trust that He will provide peace regardless of the outcome.",
  prayer: "Lord, help me to bring all my worries to You in prayer. Teach me to trust in Your peace that surpasses all understanding. Amen."
};

const studyPlans = [
  {
    id: "30-day-foundations",
    title: "30-Day Bible Foundations",
    description: "Essential teachings and stories for new believers",
    duration: "30 days",
    difficulty: "Beginner",
    progress: 0,
    totalLessons: 30,
    completedLessons: 0,
    topics: ["Creation", "Faith", "Love", "Forgiveness", "Prayer"],
    icon: BookOpen,
    color: "bg-blue-500",
    featured: true
  },
  {
    id: "90-day-discipleship",
    title: "90-Day Discipleship Journey",
    description: "Deep dive into following Christ and spiritual growth",
    duration: "90 days",
    difficulty: "Intermediate",
    progress: 0,
    totalLessons: 90,
    completedLessons: 0,
    topics: ["Discipleship", "Spiritual Gifts", "Fruit of the Spirit", "Kingdom Living"],
    icon: Target,
    color: "bg-green-500",
    featured: true
  },
  {
    id: "30-day-wisdom",
    title: "30-Day Wisdom from Proverbs",
    description: "Daily wisdom for practical living",
    duration: "30 days",
    difficulty: "Beginner",
    progress: 0,
    totalLessons: 30,
    completedLessons: 0,
    topics: ["Wisdom", "Character", "Relationships", "Work", "Speech"],
    icon: Lightbulb,
    color: "bg-yellow-500",
    featured: false
  },
  {
    id: "90-day-character",
    title: "90-Day Character Building",
    description: "Developing Christ-like character through Scripture",
    duration: "90 days",
    difficulty: "Intermediate",
    progress: 0,
    totalLessons: 90,
    completedLessons: 0,
    topics: ["Integrity", "Humility", "Courage", "Compassion", "Perseverance"],
    icon: Award,
    color: "bg-purple-500",
    featured: false
  }
];

export default function BibleStudy() {
  return null;
} 