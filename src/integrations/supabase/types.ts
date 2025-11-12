export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      attempts: {
        Row: {
          answers: Json | null
          completed: boolean | null
          created_at: string | null
          id: string
          quiz_id: number | null
          score: number
          seconds_used: number
          user_id: string | null
        }
        Insert: {
          answers?: Json | null
          completed?: boolean | null
          created_at?: string | null
          id?: string
          quiz_id?: number | null
          score: number
          seconds_used: number
          user_id?: string | null
        }
        Update: {
          answers?: Json | null
          completed?: boolean | null
          created_at?: string | null
          id?: string
          quiz_id?: number | null
          score?: number
          seconds_used?: number
          user_id?: string | null
        }
        Relationships: []
      }
      badges: {
        Row: {
          created_at: string | null
          description: string | null
          icon: string | null
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      challenge_answers: {
        Row: {
          answer_index: number
          answered_at: string | null
          challenge_session_id: string | null
          id: string
          is_correct: boolean
          participant_id: string | null
          question_id: number | null
          response_time: number
        }
        Insert: {
          answer_index: number
          answered_at?: string | null
          challenge_session_id?: string | null
          id?: string
          is_correct: boolean
          participant_id?: string | null
          question_id?: number | null
          response_time: number
        }
        Update: {
          answer_index?: number
          answered_at?: string | null
          challenge_session_id?: string | null
          id?: string
          is_correct?: boolean
          participant_id?: string | null
          question_id?: number | null
          response_time?: number
        }
        Relationships: []
      }
      challenge_participants: {
        Row: {
          challenge_session_id: string | null
          display_name: string
          id: string
          is_ready: boolean | null
          joined_at: string | null
          user_id: string
        }
        Insert: {
          challenge_session_id?: string | null
          display_name: string
          id?: string
          is_ready?: boolean | null
          joined_at?: string | null
          user_id: string
        }
        Update: {
          challenge_session_id?: string | null
          display_name?: string
          id?: string
          is_ready?: boolean | null
          joined_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      challenge_requests: {
        Row: {
          challenged_id: string
          challenger_id: string
          created_at: string | null
          expires_at: string | null
          id: string
          message: string | null
          quiz_id: number
          responded_at: string | null
          status: string | null
        }
        Insert: {
          challenged_id: string
          challenger_id: string
          created_at?: string | null
          expires_at?: string | null
          id?: string
          message?: string | null
          quiz_id: number
          responded_at?: string | null
          status?: string | null
        }
        Update: {
          challenged_id?: string
          challenger_id?: string
          created_at?: string | null
          expires_at?: string | null
          id?: string
          message?: string | null
          quiz_id?: number
          responded_at?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_challenge_requests_quiz_id"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quizzes"
            referencedColumns: ["id"]
          },
        ]
      }
      challenge_results: {
        Row: {
          average_response_time: number
          challenge_session_id: string | null
          completed_at: string | null
          correct_answers: number
          id: string
          participant_id: string | null
          participant_name: string | null
          rank: number
          total_questions: number
          total_score: number
        }
        Insert: {
          average_response_time: number
          challenge_session_id?: string | null
          completed_at?: string | null
          correct_answers: number
          id?: string
          participant_id?: string | null
          participant_name?: string | null
          rank: number
          total_questions: number
          total_score: number
        }
        Update: {
          average_response_time?: number
          challenge_session_id?: string | null
          completed_at?: string | null
          correct_answers?: number
          id?: string
          participant_id?: string | null
          participant_name?: string | null
          rank?: number
          total_questions?: number
          total_score?: number
        }
        Relationships: []
      }
      challenge_sessions: {
        Row: {
          challenge_request_id: string | null
          challenged_id: string
          challenger_id: string
          created_at: string | null
          current_question: number | null
          ended_at: string | null
          id: string
          quiz_id: string
          started_at: string | null
          status: string | null
          time_limit: number | null
          total_questions: number | null
        }
        Insert: {
          challenge_request_id?: string | null
          challenged_id: string
          challenger_id: string
          created_at?: string | null
          current_question?: number | null
          ended_at?: string | null
          id?: string
          quiz_id: string
          started_at?: string | null
          status?: string | null
          time_limit?: number | null
          total_questions?: number | null
        }
        Update: {
          challenge_request_id?: string | null
          challenged_id?: string
          challenger_id?: string
          created_at?: string | null
          current_question?: number | null
          ended_at?: string | null
          id?: string
          quiz_id?: string
          started_at?: string | null
          status?: string | null
          time_limit?: number | null
          total_questions?: number | null
        }
        Relationships: []
      }
      competition_entries: {
        Row: {
          competition_id: string | null
          created_at: string | null
          id: string
          paid: boolean | null
          payment_id: string | null
          score: number | null
          time_taken: number | null
          user_id: string | null
        }
        Insert: {
          competition_id?: string | null
          created_at?: string | null
          id?: string
          paid?: boolean | null
          payment_id?: string | null
          score?: number | null
          time_taken?: number | null
          user_id?: string | null
        }
        Update: {
          competition_id?: string | null
          created_at?: string | null
          id?: string
          paid?: boolean | null
          payment_id?: string | null
          score?: number | null
          time_taken?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "competition_entries_competition_id_fkey"
            columns: ["competition_id"]
            isOneToOne: false
            referencedRelation: "competitions"
            referencedColumns: ["id"]
          },
        ]
      }
      competition_results: {
        Row: {
          competition_id: string | null
          created_at: string | null
          id: string
          prize_amount: number | null
          rank: number | null
          score: number
          time_taken: number | null
          user_id: string | null
        }
        Insert: {
          competition_id?: string | null
          created_at?: string | null
          id?: string
          prize_amount?: number | null
          rank?: number | null
          score: number
          time_taken?: number | null
          user_id?: string | null
        }
        Update: {
          competition_id?: string | null
          created_at?: string | null
          id?: string
          prize_amount?: number | null
          rank?: number | null
          score?: number
          time_taken?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "competition_results_competition_id_fkey"
            columns: ["competition_id"]
            isOneToOne: false
            referencedRelation: "competitions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "competition_results_user_id_profiles_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      competitions: {
        Row: {
          created_at: string | null
          description: string | null
          end_date: string
          entry_fee: number
          id: string
          max_participants: number | null
          prize_pool: number
          quiz_id: number | null
          start_date: string
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          end_date: string
          entry_fee: number
          id?: string
          max_participants?: number | null
          prize_pool?: number
          quiz_id?: number | null
          start_date: string
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          end_date?: string
          entry_fee?: number
          id?: string
          max_participants?: number | null
          prize_pool?: number
          quiz_id?: number | null
          start_date?: string
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      devotional_reads: {
        Row: {
          created_at: string | null
          devotional_date: string
          devotional_title: string
          devotional_verse: string
          id: string
          read_date: string
          time_spent_seconds: number | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          devotional_date: string
          devotional_title: string
          devotional_verse: string
          id?: string
          read_date: string
          time_spent_seconds?: number | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          devotional_date?: string
          devotional_title?: string
          devotional_verse?: string
          id?: string
          read_date?: string
          time_spent_seconds?: number | null
          user_id?: string
        }
        Relationships: []
      }
      devotional_streaks: {
        Row: {
          created_at: string | null
          current_streak: number | null
          id: string
          last_read_date: string | null
          longest_streak: number | null
          total_days_read: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          current_streak?: number | null
          id?: string
          last_read_date?: string | null
          longest_streak?: number | null
          total_days_read?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          current_streak?: number | null
          id?: string
          last_read_date?: string | null
          longest_streak?: number | null
          total_days_read?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      devotionals: {
        Row: {
          application: string
          created_at: string | null
          date: string
          id: string
          prayer: string
          reflection: string
          scripture: string
          title: string
          updated_at: string | null
          verse: string
        }
        Insert: {
          application: string
          created_at?: string | null
          date: string
          id?: string
          prayer: string
          reflection: string
          scripture: string
          title: string
          updated_at?: string | null
          verse: string
        }
        Update: {
          application?: string
          created_at?: string | null
          date?: string
          id?: string
          prayer?: string
          reflection?: string
          scripture?: string
          title?: string
          updated_at?: string | null
          verse?: string
        }
        Relationships: []
      }
      feature_flags: {
        Row: {
          id: number
          key: string
          value: boolean
        }
        Insert: {
          id?: number
          key: string
          value?: boolean
        }
        Update: {
          id?: number
          key?: string
          value?: boolean
        }
        Relationships: []
      }
      live_quiz_answers: {
        Row: {
          answer_index: number
          answered_at: string | null
          id: string
          is_correct: boolean
          participant_id: string | null
          question_id: string | null
          response_time: number | null
          session_id: string | null
        }
        Insert: {
          answer_index: number
          answered_at?: string | null
          id?: string
          is_correct: boolean
          participant_id?: string | null
          question_id?: string | null
          response_time?: number | null
          session_id?: string | null
        }
        Update: {
          answer_index?: number
          answered_at?: string | null
          id?: string
          is_correct?: boolean
          participant_id?: string | null
          question_id?: string | null
          response_time?: number | null
          session_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "live_quiz_answers_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "live_quiz_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "live_quiz_answers_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "user_quiz_questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "live_quiz_answers_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "live_quiz_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      live_quiz_participants: {
        Row: {
          display_name: string
          id: string
          is_ready: boolean | null
          joined_at: string | null
          session_id: string | null
          user_id: string | null
        }
        Insert: {
          display_name: string
          id?: string
          is_ready?: boolean | null
          joined_at?: string | null
          session_id?: string | null
          user_id?: string | null
        }
        Update: {
          display_name?: string
          id?: string
          is_ready?: boolean | null
          joined_at?: string | null
          session_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "live_quiz_participants_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "live_quiz_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      live_quiz_results: {
        Row: {
          average_response_time: number | null
          completed_at: string | null
          correct_answers: number | null
          id: string
          participant_id: string | null
          participant_name: string
          score: number | null
          session_id: string | null
          total_questions: number | null
        }
        Insert: {
          average_response_time?: number | null
          completed_at?: string | null
          correct_answers?: number | null
          id?: string
          participant_id?: string | null
          participant_name: string
          score?: number | null
          session_id?: string | null
          total_questions?: number | null
        }
        Update: {
          average_response_time?: number | null
          completed_at?: string | null
          correct_answers?: number | null
          id?: string
          participant_id?: string | null
          participant_name?: string
          score?: number | null
          session_id?: string | null
          total_questions?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "live_quiz_results_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "live_quiz_participants"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "live_quiz_results_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "live_quiz_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      live_quiz_sessions: {
        Row: {
          created_at: string | null
          current_question: number | null
          ended_at: string | null
          host_id: string | null
          id: string
          max_participants: number | null
          quiz_id: string | null
          requires_login: boolean | null
          session_code: string
          show_participant_feedback: boolean
          started_at: string | null
          status: string | null
          time_limit: number | null
          title: string
          total_questions: number
        }
        Insert: {
          created_at?: string | null
          current_question?: number | null
          ended_at?: string | null
          host_id?: string | null
          id?: string
          max_participants?: number | null
          quiz_id?: string | null
          requires_login?: boolean | null
          session_code: string
          show_participant_feedback?: boolean
          started_at?: string | null
          status?: string | null
          time_limit?: number | null
          title: string
          total_questions: number
        }
        Update: {
          created_at?: string | null
          current_question?: number | null
          ended_at?: string | null
          host_id?: string | null
          id?: string
          max_participants?: number | null
          quiz_id?: string | null
          requires_login?: boolean | null
          session_code?: string
          show_participant_feedback?: boolean
          started_at?: string | null
          status?: string | null
          time_limit?: number | null
          title?: string
          total_questions?: number
        }
        Relationships: [
          {
            foreignKeyName: "live_quiz_sessions_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "user_created_quizzes"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_analytics: {
        Row: {
          event_timestamp: string | null
          event_type: string
          id: string
          metadata: Json | null
          notification_id: string
          subscription_id: string | null
          user_id: string | null
        }
        Insert: {
          event_timestamp?: string | null
          event_type: string
          id?: string
          metadata?: Json | null
          notification_id: string
          subscription_id?: string | null
          user_id?: string | null
        }
        Update: {
          event_timestamp?: string | null
          event_type?: string
          id?: string
          metadata?: Json | null
          notification_id?: string
          subscription_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notification_analytics_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "push_subscriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          body: string
          id: string
          metadata: Json | null
          sent_at: string | null
          sent_by: string | null
          target_users: Json | null
          title: string
          type: string
        }
        Insert: {
          body: string
          id?: string
          metadata?: Json | null
          sent_at?: string | null
          sent_by?: string | null
          target_users?: Json | null
          title: string
          type: string
        }
        Update: {
          body?: string
          id?: string
          metadata?: Json | null
          sent_at?: string | null
          sent_by?: string | null
          target_users?: Json | null
          title?: string
          type?: string
        }
        Relationships: []
      }
      online_users: {
        Row: {
          created_at: string | null
          current_activity: string | null
          display_name: string
          id: string
          is_available: boolean | null
          last_seen: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          current_activity?: string | null
          display_name: string
          id?: string
          is_available?: boolean | null
          last_seen?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          current_activity?: string | null
          display_name?: string
          id?: string
          is_available?: boolean | null
          last_seen?: string | null
          user_id?: string
        }
        Relationships: []
      }
      page_views: {
        Row: {
          id: string
          ip_address: unknown | null
          page: string
          viewed_at: string | null
        }
        Insert: {
          id?: string
          ip_address?: unknown | null
          page: string
          viewed_at?: string | null
        }
        Update: {
          id?: string
          ip_address?: unknown | null
          page?: string
          viewed_at?: string | null
        }
        Relationships: []
      }
      prayer_requests: {
        Row: {
          category: string
          created_at: string | null
          email: string | null
          id: string
          is_anonymous: boolean | null
          name: string | null
          request: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          email?: string | null
          id?: string
          is_anonymous?: boolean | null
          name?: string | null
          request: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          email?: string | null
          id?: string
          is_anonymous?: boolean | null
          name?: string | null
          request?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          plan: string | null
          role: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          plan?: string | null
          role?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          plan?: string | null
          role?: string | null
        }
        Relationships: []
      }
      feedback: {
        Row: {
          id: string
          name: string
          place: string
          feedback: string
          status: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          name: string
          place: string
          feedback: string
          status?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          place?: string
          feedback?: string
          status?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      push_subscriptions: {
        Row: {
          auth: string
          created_at: string | null
          endpoint: string
          id: string
          p256dh: string
          updated_at: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          auth: string
          created_at?: string | null
          endpoint: string
          id?: string
          p256dh: string
          updated_at?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          auth?: string
          created_at?: string | null
          endpoint?: string
          id?: string
          p256dh?: string
          updated_at?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      questions: {
        Row: {
          correct_index: number
          created_at: string | null
          id: number
          option_a: string
          option_b: string
          option_c: string
          option_d: string
          question: string
        }
        Insert: {
          correct_index: number
          created_at?: string | null
          id?: number
          option_a: string
          option_b: string
          option_c: string
          option_d: string
          question: string
        }
        Update: {
          correct_index?: number
          created_at?: string | null
          id?: number
          option_a?: string
          option_b?: string
          option_c?: string
          option_d?: string
          question?: string
        }
        Relationships: []
      }
      quiz_questions: {
        Row: {
          correct_index: number
          created_at: string | null
          id: number
          option_a: string
          option_b: string
          option_c: string
          option_d: string
          order_index: number
          question: string
          quiz_id: number
        }
        Insert: {
          correct_index: number
          created_at?: string | null
          id?: number
          option_a: string
          option_b: string
          option_c: string
          option_d: string
          order_index: number
          question: string
          quiz_id: number
        }
        Update: {
          correct_index?: number
          created_at?: string | null
          id?: number
          option_a?: string
          option_b?: string
          option_c?: string
          option_d?: string
          order_index?: number
          question?: string
          quiz_id?: number
        }
        Relationships: []
      }
      quizzes: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          is_public: boolean | null
          title: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          is_public?: boolean | null
          title: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          is_public?: boolean | null
          title?: string
        }
        Relationships: []
      }
      study_progress: {
        Row: {
          completed_at: string | null
          completed_lessons: number | null
          created_at: string | null
          id: string
          last_accessed: string | null
          plan_id: string
          started_at: string | null
          total_lessons: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          completed_lessons?: number | null
          created_at?: string | null
          id?: string
          last_accessed?: string | null
          plan_id: string
          started_at?: string | null
          total_lessons: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          completed_at?: string | null
          completed_lessons?: number | null
          created_at?: string | null
          id?: string
          last_accessed?: string | null
          plan_id?: string
          started_at?: string | null
          total_lessons?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_badges: {
        Row: {
          awarded_at: string | null
          badge_id: string
          id: string
          metadata: Json | null
          user_id: string
        }
        Insert: {
          awarded_at?: string | null
          badge_id: string
          id?: string
          metadata?: Json | null
          user_id: string
        }
        Update: {
          awarded_at?: string | null
          badge_id?: string
          id?: string
          metadata?: Json | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_badges_badge_id_fkey"
            columns: ["badge_id"]
            isOneToOne: false
            referencedRelation: "badges"
            referencedColumns: ["id"]
          },
        ]
      }
      user_created_quizzes: {
        Row: {
          created_at: string | null
          creator_id: string | null
          description: string | null
          id: string
          is_public: boolean | null
          requires_login: boolean | null
          share_code: string
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          creator_id?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          requires_login?: boolean | null
          share_code: string
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          creator_id?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          requires_login?: boolean | null
          share_code?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      user_quiz_questions: {
        Row: {
          correct_index: number
          created_at: string | null
          id: string
          option_a: string
          option_b: string
          option_c: string
          option_d: string
          order_index: number
          question: string
          quiz_id: string | null
        }
        Insert: {
          correct_index: number
          created_at?: string | null
          id?: string
          option_a: string
          option_b: string
          option_c: string
          option_d: string
          order_index: number
          question: string
          quiz_id?: string | null
        }
        Update: {
          correct_index?: number
          created_at?: string | null
          id?: string
          option_a?: string
          option_b?: string
          option_c?: string
          option_d?: string
          order_index?: number
          question?: string
          quiz_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_quiz_questions_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "user_created_quizzes"
            referencedColumns: ["id"]
          },
        ]
      }
      weekly_quiz_attempts: {
        Row: {
          answers: Json | null
          completed: boolean | null
          completed_at: string | null
          created_at: string | null
          id: string
          score: number
          seconds_used: number
          user_id: string | null
          weekly_quiz_id: number | null
        }
        Insert: {
          answers?: Json | null
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string | null
          id?: string
          score?: number
          seconds_used?: number
          user_id?: string | null
          weekly_quiz_id?: number | null
        }
        Update: {
          answers?: Json | null
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string | null
          id?: string
          score?: number
          seconds_used?: number
          user_id?: string | null
          weekly_quiz_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "weekly_quiz_attempts_weekly_quiz_id_fkey"
            columns: ["weekly_quiz_id"]
            isOneToOne: false
            referencedRelation: "weekly_quizzes"
            referencedColumns: ["id"]
          },
        ]
      }
      weekly_quiz_leaderboard: {
        Row: {
          created_at: string | null
          id: number
          rank: number
          score: number
          time_used: number
          user_id: string | null
          weekly_quiz_id: number | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          rank: number
          score: number
          time_used: number
          user_id?: string | null
          weekly_quiz_id?: number | null
        }
        Update: {
          created_at?: string | null
          id?: number
          rank?: number
          score?: number
          time_used?: number
          user_id?: string | null
          weekly_quiz_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "weekly_quiz_leaderboard_weekly_quiz_id_fkey"
            columns: ["weekly_quiz_id"]
            isOneToOne: false
            referencedRelation: "weekly_quizzes"
            referencedColumns: ["id"]
          },
        ]
      }
      weekly_quiz_questions: {
        Row: {
          correct_index: number
          created_at: string | null
          id: number
          option_a: string
          option_b: string
          option_c: string
          option_d: string
          order_index: number
          question: string
          weekly_quiz_id: number | null
        }
        Insert: {
          correct_index: number
          created_at?: string | null
          id?: number
          option_a: string
          option_b: string
          option_c: string
          option_d: string
          order_index: number
          question: string
          weekly_quiz_id?: number | null
        }
        Update: {
          correct_index?: number
          created_at?: string | null
          id?: number
          option_a?: string
          option_b?: string
          option_c?: string
          option_d?: string
          order_index?: number
          question?: string
          weekly_quiz_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "weekly_quiz_questions_weekly_quiz_id_fkey"
            columns: ["weekly_quiz_id"]
            isOneToOne: false
            referencedRelation: "weekly_quizzes"
            referencedColumns: ["id"]
          },
        ]
      }
      weekly_quizzes: {
        Row: {
          created_at: string | null
          description: string | null
          difficulty: string | null
          id: number
          is_active: boolean | null
          theme: string | null
          time_limit: number | null
          title: string
          total_questions: number | null
          updated_at: string | null
          week_end_date: string
          week_start_date: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          difficulty?: string | null
          id?: number
          is_active?: boolean | null
          theme?: string | null
          time_limit?: number | null
          title: string
          total_questions?: number | null
          updated_at?: string | null
          week_end_date: string
          week_start_date: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          difficulty?: string | null
          id?: number
          is_active?: boolean | null
          theme?: string | null
          time_limit?: number | null
          title?: string
          total_questions?: number | null
          updated_at?: string | null
          week_end_date?: string
          week_start_date?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_challenge_results: {
        Args: { p_challenge_session_id: string }
        Returns: undefined
      }
      calculate_quiz_results: {
        Args: { session_uuid: string }
        Returns: {
          average_response_time: number
          correct_answers: number
          participant_name: string
          score: number
          total_questions: number
        }[]
      }
      cleanup_expired_challenges: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      create_next_weekly_quiz: {
        Args: {
          p_description: string
          p_difficulty?: string
          p_theme?: string
          p_title: string
          p_total_questions?: number
        }
        Returns: number
      }
      generate_share_code: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_admin_attempts: {
        Args: Record<PropertyKey, never>
        Returns: Database["public"]["CompositeTypes"]["admin_attempt_row"][]
      }
      get_current_weekly_quiz: {
        Args: Record<PropertyKey, never>
        Returns: {
          description: string
          difficulty: string
          id: number
          theme: string
          time_limit: number
          title: string
          total_questions: number
          week_end_date: string
          week_start_date: string
        }[]
      }
      get_user_display_name: {
        Args: { p_user_id: string }
        Returns: string
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      record_devotional_read: {
        Args: {
          p_devotional_date: string
          p_devotional_title: string
          p_devotional_verse: string
          p_time_spent_seconds?: number
          p_user_id: string
        }
        Returns: Json
      }
      update_user_online_status: {
        Args: {
          p_activity?: string
          p_display_name: string
          p_is_available?: boolean
          p_user_id: string
        }
        Returns: undefined
      }
      update_weekly_leaderboard: {
        Args: { p_weekly_quiz_id: number }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      admin_attempt_row: {
        id: string | null
        user_id: string | null
        quiz_id: number | null
        score: number | null
        seconds_used: number | null
        created_at: string | null
      }
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
