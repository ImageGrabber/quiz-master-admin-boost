export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      attempts: {
        Row: {
          answers: Json | null
          created_at: string | null
          id: string
          quiz_id: number | null
          score: number
          seconds_used: number
          user_id: string | null
        }
        Insert: {
          answers?: Json | null
          created_at?: string | null
          id?: string
          quiz_id?: number | null
          score: number
          seconds_used: number
          user_id?: string | null
        }
        Update: {
          answers?: Json | null
          created_at?: string | null
          id?: string
          quiz_id?: number | null
          score?: number
          seconds_used?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "attempts_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quizzes"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          role: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          role?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          role?: string | null
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
          order_index: number
          question_id: number
          quiz_id: number
        }
        Insert: {
          order_index: number
          question_id: number
          quiz_id: number
        }
        Update: {
          order_index?: number
          question_id?: number
          quiz_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "quiz_questions_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quiz_questions_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "quizzes"
            referencedColumns: ["id"]
          },
        ]
      }
      quizzes: {
        Row: {
          created_at: string | null
          description: string | null
          id: number
          title: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: number
          title: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: number
          title?: string
        }
        Relationships: []
      }
      devotional_streaks: {
        Row: {
          id: string;
          user_id: string;
          current_streak: number;
          longest_streak: number;
          last_read_date: string | null;
          total_days_read: number;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          current_streak?: number;
          longest_streak?: number;
          last_read_date?: string | null;
          total_days_read?: number;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          current_streak?: number;
          longest_streak?: number;
          last_read_date?: string | null;
          total_days_read?: number;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Relationships: [];
      }
      page_views: {
        Row: {
          id: string;
          page: string;
          viewed_at: string;
        };
        Insert: {
          id?: string;
          page: string;
          viewed_at?: string;
        };
        Update: {
          id?: string;
          page?: string;
          viewed_at?: string;
        };
        Relationships: [];
      };
      user_created_quizzes: {
        Row: {
          id: string;
          creator_id: string;
          title: string;
          description: string | null;
          is_public: boolean;
          share_code: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          creator_id: string;
          title: string;
          description?: string | null;
          is_public?: boolean;
          share_code?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          creator_id?: string;
          title?: string;
          description?: string | null;
          is_public?: boolean;
          share_code?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_created_quizzes_creator_id_fkey";
            columns: ["creator_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      user_quiz_questions: {
        Row: {
          id: string;
          quiz_id: string;
          question: string;
          option_a: string;
          option_b: string;
          option_c: string;
          option_d: string;
          correct_index: number;
          order_index: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          quiz_id: string;
          question: string;
          option_a: string;
          option_b: string;
          option_c: string;
          option_d: string;
          correct_index: number;
          order_index: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          quiz_id?: string;
          question?: string;
          option_a?: string;
          option_b?: string;
          option_c?: string;
          option_d?: string;
          correct_index?: number;
          order_index?: number;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_quiz_questions_quiz_id_fkey";
            columns: ["quiz_id"];
            isOneToOne: false;
            referencedRelation: "user_created_quizzes";
            referencedColumns: ["id"];
          },
        ];
      };
      live_quiz_sessions: {
        Row: {
          id: string;
          quiz_id: string;
          host_id: string;
          session_code: string;
          title: string;
          status: string;
          max_participants: number;
          time_limit: number;
          current_question: number;
          total_questions: number;
          started_at: string | null;
          ended_at: string | null;
          created_at: string;
          show_participant_feedback?: boolean;
        };
        Insert: {
          id?: string;
          quiz_id: string;
          host_id: string;
          session_code?: string;
          title: string;
          status?: string;
          max_participants?: number;
          time_limit?: number;
          current_question?: number;
          total_questions: number;
          started_at?: string | null;
          ended_at?: string | null;
          created_at?: string;
          show_participant_feedback?: boolean;
        };
        Update: {
          id?: string;
          quiz_id?: string;
          host_id?: string;
          session_code?: string;
          title?: string;
          status?: string;
          max_participants?: number;
          time_limit?: number;
          current_question?: number;
          total_questions?: number;
          started_at?: string | null;
          ended_at?: string | null;
          created_at?: string;
          show_participant_feedback?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: "live_quiz_sessions_quiz_id_fkey";
            columns: ["quiz_id"];
            isOneToOne: false;
            referencedRelation: "user_created_quizzes";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "live_quiz_sessions_host_id_fkey";
            columns: ["host_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      live_quiz_participants: {
        Row: {
          id: string;
          session_id: string;
          user_id: string;
          display_name: string;
          joined_at: string;
          is_ready: boolean;
        };
        Insert: {
          id?: string;
          session_id: string;
          user_id: string;
          display_name: string;
          joined_at?: string;
          is_ready?: boolean;
        };
        Update: {
          id?: string;
          session_id?: string;
          user_id?: string;
          display_name?: string;
          joined_at?: string;
          is_ready?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: "live_quiz_participants_session_id_fkey";
            columns: ["session_id"];
            isOneToOne: false;
            referencedRelation: "live_quiz_sessions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "live_quiz_participants_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      live_quiz_answers: {
        Row: {
          id: string;
          session_id: string;
          participant_id: string;
          question_id: string;
          answer_index: number;
          is_correct: boolean;
          answered_at: string;
          response_time: number | null;
        };
        Insert: {
          id?: string;
          session_id: string;
          participant_id: string;
          question_id: string;
          answer_index: number;
          is_correct: boolean;
          answered_at?: string;
          response_time?: number | null;
        };
        Update: {
          id?: string;
          session_id?: string;
          participant_id?: string;
          question_id?: string;
          answer_index?: number;
          is_correct?: boolean;
          answered_at?: string;
          response_time?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "live_quiz_answers_session_id_fkey";
            columns: ["session_id"];
            isOneToOne: false;
            referencedRelation: "live_quiz_sessions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "live_quiz_answers_participant_id_fkey";
            columns: ["participant_id"];
            isOneToOne: false;
            referencedRelation: "live_quiz_participants";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "live_quiz_answers_question_id_fkey";
            columns: ["question_id"];
            isOneToOne: false;
            referencedRelation: "user_quiz_questions";
            referencedColumns: ["id"];
          },
        ];
      };
      live_quiz_results: {
        Row: {
          id: string;
          session_id: string;
          participant_id: string;
          total_score: number;
          correct_answers: number;
          total_questions: number;
          average_response_time: number | null;
          rank: number | null;
          completed_at: string;
        };
        Insert: {
          id?: string;
          session_id: string;
          participant_id: string;
          total_score: number;
          correct_answers: number;
          total_questions: number;
          average_response_time?: number | null;
          rank?: number | null;
          completed_at?: string;
        };
        Update: {
          id?: string;
          session_id?: string;
          participant_id?: string;
          total_score?: number;
          correct_answers?: number;
          total_questions?: number;
          average_response_time?: number | null;
          rank?: number | null;
          completed_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "live_quiz_results_session_id_fkey";
            columns: ["session_id"];
            isOneToOne: false;
            referencedRelation: "live_quiz_sessions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "live_quiz_results_participant_id_fkey";
            columns: ["participant_id"];
            isOneToOne: false;
            referencedRelation: "live_quiz_participants";
            referencedColumns: ["id"];
          },
        ];
      };
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      record_devotional_read: {
        Args: {
          p_user_id: string;
          p_devotional_date: string;
          p_devotional_title: string;
          p_devotional_verse: string;
          p_time_spent_seconds?: number;
        };
        Returns: {
          current_streak: number;
          longest_streak: number;
          total_days_read: number;
          message: string;
        };
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

export interface Competition {
  id: string;
  title: string;
  description: string | null;
  entry_fee: number;
  prize_pool: number;
  max_participants: number | null;
  start_date: string;
  end_date: string;
  quiz_id: string;
  status: 'upcoming' | 'active' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface CompetitionEntry {
  id: string;
  competition_id: string;
  user_id: string;
  stripe_payment_intent_id: string | null;
  payment_status: 'pending' | 'completed' | 'failed' | 'refunded';
  entry_date: string;
  paid: boolean;
}

export interface CompetitionResult {
  id: string;
  competition_id: string;
  user_id: string;
  score: number;
  time_taken: number | null;
  rank: number | null;
  prize_amount: number | null;
  created_at: string;
}

export interface CompetitionWithDetails extends Competition {
  quiz: Tables<'quizzes'>;
  entries_count: number;
  results_count: number;
}

export interface CompetitionEntryWithUser extends CompetitionEntry {
  user: Tables<'profiles'>;
}

export interface CompetitionResultWithUser extends CompetitionResult {
  user: Tables<'profiles'>;
}
