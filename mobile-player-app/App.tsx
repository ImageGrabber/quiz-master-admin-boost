import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import {
  ActivityIndicator,
  Alert,
  AppState,
  AppStateStatus,
  BackHandler,
  ImageBackground,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import * as AuthSession from 'expo-auth-session';
import { LinearGradient } from 'expo-linear-gradient';
import * as ScreenCapture from 'expo-screen-capture';
import { StatusBar } from 'expo-status-bar';
import * as WebBrowser from 'expo-web-browser';
import { supabase } from './src/lib/supabase';

type AuthMode = 'login' | 'signup';

interface MobileCompetition {
  id: string;
  title: string;
  description: string | null;
  start_date: string;
  end_date: string;
  entry_fee: number;
  prize_pool: number;
  status: 'upcoming' | 'active' | 'completed' | 'cancelled' | string;
  has_paid_entry: boolean;
  has_attempted: boolean;
}

interface QuizQuestion {
  id: number;
  order_index: number;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
}

interface QuizPayload {
  competition: {
    id: string;
    title: string;
    description: string | null;
    start_date: string;
    end_date: string;
  };
  quiz: {
    id: number;
    time_limit_seconds: number;
    question_count: number;
  };
  questions: QuizQuestion[];
}

interface QuizResultResponse {
  score: number;
  correct_answers: number;
  total_questions: number;
  disqualified: boolean;
}

interface QuizResultView extends QuizResultResponse {
  competitionTitle: string;
  timeTakenSeconds: number;
}

WebBrowser.maybeCompleteAuthSession();

const App = () => {
  const { width } = useWindowDimensions();
  const [booting, setBooting] = useState(true);
  const [session, setSession] = useState<Session | null>(null);

  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const [competitions, setCompetitions] = useState<MobileCompetition[]>([]);
  const [competitionsLoading, setCompetitionsLoading] = useState(false);

  const [activeQuiz, setActiveQuiz] = useState<QuizPayload | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [quizStartedAtMs, setQuizStartedAtMs] = useState<number | null>(null);
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [violationCount, setViolationCount] = useState(0);
  const [violationMessage, setViolationMessage] = useState<string | null>(null);

  const [result, setResult] = useState<QuizResultView | null>(null);

  const submitLockRef = useRef(false);
  const appStateRef = useRef<AppStateStatus>(AppState.currentState);
  const redirectUri = useMemo(
    () =>
      AuthSession.makeRedirectUri({
        scheme: process.env.EXPO_PUBLIC_APP_SCHEME || 'biblequizplayer',
        path: 'auth/callback',
      }),
    [],
  );
  const isEditorialDesktop = width >= 920;

  const fetchCompetitions = useCallback(async () => {
    if (!session?.user) return;

    setCompetitionsLoading(true);
    try {
      const { data, error } = await supabase.rpc('list_mobile_player_competitions');
      if (error) throw error;

      const normalized = (data || []).map((row: any) => ({
        ...row,
        entry_fee: Number(row.entry_fee || 0),
        prize_pool: Number(row.prize_pool || 0),
      })) as MobileCompetition[];

      setCompetitions(normalized);
    } catch (err: any) {
      Alert.alert('Unable to Load Competitions', parseError(err));
    } finally {
      setCompetitionsLoading(false);
    }
  }, [session?.user]);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      const {
        data: { session: currentSession },
      } = await supabase.auth.getSession();

      if (!mounted) return;
      setSession(currentSession);
      setBooting(false);
    };

    init();

    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setResult(null);
      setActiveQuiz(null);
      setAnswers({});
      setCurrentQuestionIndex(0);
      setViolationCount(0);
      setViolationMessage(null);
    });

    return () => {
      mounted = false;
      data.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (session?.user) {
      fetchCompetitions();
    } else {
      setCompetitions([]);
    }
  }, [session?.user, fetchCompetitions]);

  const submitQuiz = useCallback(
    async (leftApp: boolean, reason?: string) => {
      if (!activeQuiz || quizStartedAtMs === null || submitLockRef.current) return;

      submitLockRef.current = true;
      setIsSubmitting(true);

      try {
        const elapsed = Math.max(0, Math.floor((Date.now() - quizStartedAtMs) / 1000));
        const clampedElapsed = Math.min(elapsed, activeQuiz.quiz.time_limit_seconds);
        const focusViolations = leftApp ? 1 : violationCount;
        const answersPayload = activeQuiz.questions.map((question) => ({
          question_id: question.id,
          answer_index: answers[question.id] ?? -1,
        }));

        const { data, error } = await supabase.rpc('submit_mobile_competition_quiz', {
          p_competition_id: activeQuiz.competition.id,
          p_answers: answersPayload,
          p_time_taken: clampedElapsed,
          p_focus_violations: focusViolations,
          p_left_app: leftApp,
        });

        if (error) throw error;

        const row = Array.isArray(data) ? (data[0] as QuizResultResponse) : (data as QuizResultResponse);
        setResult({
          ...row,
          competitionTitle: activeQuiz.competition.title,
          timeTakenSeconds: clampedElapsed,
        });

        if (reason) {
          Alert.alert('Quiz Submitted', reason);
        }
      } catch (err: any) {
        Alert.alert('Submission Error', parseError(err));
      } finally {
        setActiveQuiz(null);
        setQuizStartedAtMs(null);
        setIsSubmitting(false);
        submitLockRef.current = false;
        setAnswers({});
        setCurrentQuestionIndex(0);
        await fetchCompetitions();
      }
    },
    [activeQuiz, answers, fetchCompetitions, quizStartedAtMs, violationCount],
  );

  useEffect(() => {
    if (!activeQuiz || quizStartedAtMs === null) return;

    setRemainingSeconds(activeQuiz.quiz.time_limit_seconds);
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - quizStartedAtMs) / 1000);
      const nextRemaining = Math.max(activeQuiz.quiz.time_limit_seconds - elapsed, 0);
      setRemainingSeconds(nextRemaining);

      if (nextRemaining <= 0) {
        clearInterval(interval);
        void submitQuiz(false, 'Time is up. Your quiz was auto-submitted.');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [activeQuiz, quizStartedAtMs, submitQuiz]);

  useEffect(() => {
    if (!activeQuiz || quizStartedAtMs === null) return;

    void ScreenCapture.preventScreenCaptureAsync().catch(() => undefined);
    const backSubscription = BackHandler.addEventListener('hardwareBackPress', () => true);

    const appStateSubscription = AppState.addEventListener('change', (nextState) => {
      const wasActive = appStateRef.current === 'active';
      const movedOut = nextState === 'background' || nextState === 'inactive';

      if (wasActive && movedOut) {
        setViolationCount(1);
        setViolationMessage('You left the quiz screen. This attempt has been disqualified.');
        void submitQuiz(true, 'Anti-cheat rule triggered: app focus was lost.');
      }

      appStateRef.current = nextState;
    });

    return () => {
      appStateSubscription.remove();
      backSubscription.remove();
      void ScreenCapture.allowScreenCaptureAsync().catch(() => undefined);
    };
  }, [activeQuiz, quizStartedAtMs, submitQuiz]);

  const handleAuth = useCallback(async () => {
    if (!email || !password) {
      Alert.alert('Missing Fields', 'Enter email and password.');
      return;
    }

    setAuthLoading(true);
    try {
      if (authMode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({ email: email.trim(), password });
        if (error) throw error;
        Alert.alert('Account Created', 'If email confirmation is enabled, verify your email and sign in.');
        setAuthMode('login');
      }
    } catch (err: any) {
      Alert.alert('Authentication Failed', parseError(err));
    } finally {
      setAuthLoading(false);
    }
  }, [authMode, email, password]);

  const handleGoogleAuth = useCallback(async () => {
    setGoogleLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUri,
          skipBrowserRedirect: true,
        },
      });
      if (error) throw error;
      if (!data?.url) throw new Error('Google login URL was not returned.');

      const result = await WebBrowser.openAuthSessionAsync(data.url, redirectUri);
      if (result.type === 'cancel' || result.type === 'dismiss') {
        return;
      }
      if (result.type !== 'success') {
        throw new Error('Google sign-in was not completed.');
      }

      const callbackUrl = new URL(result.url);
      const oauthError =
        callbackUrl.searchParams.get('error_description') || callbackUrl.searchParams.get('error');
      if (oauthError) {
        throw new Error(oauthError);
      }

      const authCode = callbackUrl.searchParams.get('code') || undefined;
      if (!authCode) {
        throw new Error('No authorization code received from Google.');
      }

      const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(authCode);
      if (exchangeError) throw exchangeError;
    } catch (err: any) {
      Alert.alert('Google Sign-In Failed', parseError(err));
    } finally {
      setGoogleLoading(false);
    }
  }, [redirectUri]);

  const handleAppleAuth = useCallback(() => {
    Alert.alert('Coming Soon', 'Apple sign-in can be added after enabling Apple provider in Supabase.');
  }, []);

  const handleLogout = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  const handleStartCompetition = useCallback(async (competitionId: string) => {
    setResult(null);
    setViolationCount(0);
    setViolationMessage(null);
    setIsSubmitting(false);

    try {
      const { data, error } = await supabase.rpc('get_mobile_competition_quiz', {
        p_competition_id: competitionId,
      });

      if (error) throw error;

      const payload = data as QuizPayload;
      if (!payload?.questions?.length) {
        Alert.alert('No Questions', 'This competition has no questions configured.');
        return;
      }

      setActiveQuiz(payload);
      setCurrentQuestionIndex(0);
      setAnswers({});
      setQuizStartedAtMs(Date.now());
      setRemainingSeconds(payload.quiz.time_limit_seconds);
    } catch (err: any) {
      Alert.alert('Cannot Start Quiz', parseError(err));
      await fetchCompetitions();
    }
  }, [fetchCompetitions]);

  const currentQuestion = useMemo(() => {
    if (!activeQuiz) return null;
    return activeQuiz.questions[currentQuestionIndex] ?? null;
  }, [activeQuiz, currentQuestionIndex]);

  const handleAnswerSelection = useCallback(
    (answerIndex: number) => {
      if (!activeQuiz || !currentQuestion || isSubmitting) return;
      if (answers[currentQuestion.id] !== undefined) return;

      setAnswers((prev) => ({ ...prev, [currentQuestion.id]: answerIndex }));

      const timeout = setTimeout(() => {
        if (currentQuestionIndex >= activeQuiz.questions.length - 1) {
          void submitQuiz(false);
        } else {
          setCurrentQuestionIndex((prev) => prev + 1);
        }
      }, 450);

      return () => clearTimeout(timeout);
    },
    [activeQuiz, answers, currentQuestion, currentQuestionIndex, isSubmitting, submitQuiz],
  );

  if (booting) {
    return (
      <SafeAreaView style={styles.centeredPage}>
        <StatusBar style="dark" />
        <ActivityIndicator size="large" color="#1f4b99" />
        <Text style={styles.loadingText}>Loading player app...</Text>
      </SafeAreaView>
    );
  }

  if (!session?.user) {
    return (
      <SafeAreaView style={styles.authPage}>
        <StatusBar style={isEditorialDesktop ? 'light' : 'dark'} />
        <View style={styles.authLayout}>
          {isEditorialDesktop ? (
            <View style={styles.editorialPane}>
              <ImageBackground
                source={{
                  uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiPVWxFtkS7fUKYJE2owd--tqTMmgbjwwP1xciwbxWmsIsRikOFBscedpcSJ3cnlOYiq8yH_cguxDwGvh5hX0kneWl1N3cnMUxZ_ZXkZqYvldFDxJsmFp5ltxCO6Kc7wJ5DNws1l9cjJYTm9J-IH5yzBNe8hHDMBsDkOUjYUeTrjQDX5RqnnGdqv8-9MUqPWwnl53JGI1gS-Sch4jcHyOEuIadazf7BSgvfOmaU_EKLljN-cedetaAiVGFtzS6t-8OlLrSmtYGiv0',
                }}
                style={styles.editorialImage}
              >
                <LinearGradient
                  colors={['rgba(0, 36, 70, 0.15)', 'rgba(0, 36, 70, 0.72)', 'rgba(0, 36, 70, 0.95)']}
                  style={styles.editorialOverlay}
                >
                  <View style={styles.editorialContent}>
                    <Text style={styles.editorialTitle}>The Illuminated Editorial</Text>
                    <View style={styles.editorialLine} />
                    <Text style={styles.editorialSubtitle}>
                      Step into a modern sanctuary of knowledge where tradition meets digital precision.
                    </Text>
                  </View>
                </LinearGradient>
              </ImageBackground>
            </View>
          ) : null}

          <View style={[styles.authPane, !isEditorialDesktop && styles.authPaneMobile]}>
            {!isEditorialDesktop ? (
              <LinearGradient colors={['#0b2045', '#1d4f96']} style={styles.mobileAuthTop}>
                <Text style={styles.mobileBrand}>The Illuminated Editorial</Text>
              </LinearGradient>
            ) : null}

            <ScrollView
              contentContainerStyle={[
                styles.authContainer,
                isEditorialDesktop ? styles.authContainerWide : styles.authContainerMobile,
              ]}
            >
              <Text style={styles.kicker}>{authMode === 'login' ? 'WELCOME BACK' : 'BEGIN YOUR JOURNEY'}</Text>
              <Text style={styles.authDisplayTitle}>
                {authMode === 'login' ? 'Continue Your Revelation' : 'Create Your Sanctuary Account'}
              </Text>
              <Text style={styles.authBodyText}>
                Enter your credentials to access your personalized study dashboard and competition rankings.
              </Text>

              <View style={styles.authSwitchRow}>
                <Pressable
                  style={[styles.authSwitch, authMode === 'login' && styles.authSwitchActive]}
                  onPress={() => setAuthMode('login')}
                >
                  <Text style={[styles.authSwitchText, authMode === 'login' && styles.authSwitchTextActive]}>
                    Login
                  </Text>
                </Pressable>
                <Pressable
                  style={[styles.authSwitch, authMode === 'signup' && styles.authSwitchActive]}
                  onPress={() => setAuthMode('signup')}
                >
                  <Text style={[styles.authSwitchText, authMode === 'signup' && styles.authSwitchTextActive]}>
                    Sign Up
                  </Text>
                </Pressable>
              </View>

              <View style={styles.fieldBlock}>
                <Text style={styles.fieldLabel}>EMAIL ADDRESS</Text>
                <TextInput
                  style={styles.ledgerInput}
                  placeholder="scribe@monastery.com"
                  placeholderTextColor="#96a2b4"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              <View style={styles.fieldBlock}>
                <View style={styles.passwordHeader}>
                  <Text style={styles.fieldLabel}>PASSWORD</Text>
                  {authMode === 'login' ? (
                    <Pressable onPress={() => Alert.alert('Reset Password', 'Password reset flow can be connected next.')}>
                      <Text style={styles.forgotLink}>Forgotten Path?</Text>
                    </Pressable>
                  ) : null}
                </View>
                <TextInput
                  style={styles.ledgerInput}
                  placeholder="••••••••"
                  placeholderTextColor="#96a2b4"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
              </View>

              <Pressable
                style={[styles.authPrimaryButton, (authLoading || googleLoading) && styles.authDisabledButton]}
                onPress={handleAuth}
                disabled={authLoading || googleLoading}
              >
                <LinearGradient colors={['#775a19', '#b18a41']} style={styles.authPrimaryButtonGradient}>
                  <Text style={styles.authPrimaryButtonText}>
                    {authLoading ? 'PLEASE WAIT...' : authMode === 'login' ? 'SIGN IN' : 'CREATE ACCOUNT'}
                  </Text>
                </LinearGradient>
              </Pressable>

              <View style={styles.authDividerRow}>
                <View style={styles.authDivider} />
                <Text style={styles.authDividerText}>Traditional Entry</Text>
                <View style={styles.authDivider} />
              </View>

              <View style={styles.socialGrid}>
                <Pressable
                  style={[styles.socialButton, googleLoading && styles.authDisabledButton]}
                  onPress={handleGoogleAuth}
                  disabled={googleLoading || authLoading}
                >
                  <Text style={styles.socialIconGoogle}>G</Text>
                  <Text style={styles.socialButtonText}>{googleLoading ? 'Google...' : 'Google'}</Text>
                </Pressable>
                <Pressable style={styles.socialButton} onPress={handleAppleAuth}>
                  <Text style={styles.socialIconApple}>A</Text>
                  <Text style={styles.socialButtonText}>Apple</Text>
                </Pressable>
              </View>

              <View style={styles.authFooter}>
                <Text style={styles.authFooterText}>
                  {authMode === 'login' ? 'New to the sanctuary?' : 'Already a member?'}
                </Text>
                <Pressable onPress={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}>
                  <Text style={styles.authFooterLink}>
                    {authMode === 'login' ? ' Request an Invitation (Sign Up)' : ' Return to Login'}
                  </Text>
                </Pressable>
              </View>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  if (activeQuiz && currentQuestion) {
    const options = [
      { label: 'A', text: currentQuestion.option_a, index: 0 },
      { label: 'B', text: currentQuestion.option_b, index: 1 },
      { label: 'C', text: currentQuestion.option_c, index: 2 },
      { label: 'D', text: currentQuestion.option_d, index: 3 },
    ];

    return (
      <SafeAreaView style={styles.page}>
        <StatusBar style="dark" />
        <View style={styles.quizHeader}>
          <Text style={styles.quizTitle}>{activeQuiz.competition.title}</Text>
          <Text style={styles.quizMeta}>
            Question {currentQuestionIndex + 1} / {activeQuiz.questions.length}
          </Text>
          <Text style={styles.timer}>Time Left: {formatSeconds(remainingSeconds)}</Text>
          <Text style={styles.rulesText}>Rules: one attempt, no backtracking, no app switching.</Text>
          {violationMessage ? <Text style={styles.violationText}>{violationMessage}</Text> : null}
        </View>

        <ScrollView contentContainerStyle={styles.quizBody}>
          <View style={styles.questionCard}>
            <Text style={styles.questionText}>{currentQuestion.question}</Text>

            {options.map((option) => {
              const selected = answers[currentQuestion.id] === option.index;
              return (
                <Pressable
                  key={option.index}
                  onPress={() => handleAnswerSelection(option.index)}
                  style={[styles.optionButton, selected && styles.optionButtonSelected]}
                  disabled={answers[currentQuestion.id] !== undefined || isSubmitting}
                >
                  <Text style={[styles.optionLabel, selected && styles.optionLabelSelected]}>
                    {option.label}. {option.text}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </ScrollView>

        {isSubmitting ? (
          <View style={styles.submittingOverlay}>
            <ActivityIndicator size="large" color="#ffffff" />
            <Text style={styles.submittingText}>Submitting result...</Text>
          </View>
        ) : null}
      </SafeAreaView>
    );
  }

  if (result) {
    return (
      <SafeAreaView style={styles.page}>
        <StatusBar style="dark" />
        <ScrollView contentContainerStyle={styles.resultContainer}>
          <Text style={styles.title}>Competition Submitted</Text>
          <Text style={styles.subtitle}>{result.competitionTitle}</Text>

          <View style={styles.resultCard}>
            <Text style={styles.resultValue}>{result.score}%</Text>
            <Text style={styles.resultLabel}>Final Score</Text>
          </View>

          <Text style={styles.resultLine}>
            Correct: {result.correct_answers} / {result.total_questions}
          </Text>
          <Text style={styles.resultLine}>Time Used: {formatSeconds(result.timeTakenSeconds)}</Text>
          <Text style={styles.resultLine}>
            Status: {result.disqualified ? 'Disqualified (focus violation)' : 'Valid'}
          </Text>

          <Pressable
            style={styles.primaryButton}
            onPress={() => {
              setResult(null);
            }}
          >
            <Text style={styles.primaryButtonText}>Back to Competitions</Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.page}>
      <StatusBar style="dark" />
      <View style={styles.competitionHeader}>
        <View>
          <Text style={styles.title}>My Paid Competitions</Text>
          <Text style={styles.subtitle}>Only competitions you are eligible to attempt.</Text>
        </View>
        <Pressable style={styles.secondaryButton} onPress={handleLogout}>
          <Text style={styles.secondaryButtonText}>Logout</Text>
        </Pressable>
      </View>

      {competitionsLoading ? (
        <View style={styles.centeredContent}>
          <ActivityIndicator size="large" color="#1f4b99" />
          <Text style={styles.loadingText}>Loading competitions...</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.competitionList}>
          {competitions.length === 0 ? (
            <Text style={styles.emptyText}>No paid competitions found for your account.</Text>
          ) : (
            competitions.map((competition) => {
              const isActiveNow = competition.status === 'active';
              const canStart = isActiveNow && !competition.has_attempted;

              return (
                <View key={competition.id} style={styles.competitionCard}>
                  <Text style={styles.competitionTitle}>{competition.title}</Text>
                  {competition.description ? <Text style={styles.competitionDescription}>{competition.description}</Text> : null}
                  <Text style={styles.competitionMeta}>Status: {competition.status}</Text>
                  <Text style={styles.competitionMeta}>Starts: {formatDate(competition.start_date)}</Text>
                  <Text style={styles.competitionMeta}>Ends: {formatDate(competition.end_date)}</Text>
                  <Text style={styles.competitionMeta}>
                    Entry: ${competition.entry_fee.toFixed(2)} | Prize: ${competition.prize_pool.toFixed(2)}
                  </Text>

                  <Pressable
                    style={[styles.primaryButton, !canStart && styles.disabledButton]}
                    onPress={() => handleStartCompetition(competition.id)}
                    disabled={!canStart}
                  >
                    <Text style={styles.primaryButtonText}>
                      {competition.has_attempted ? 'Already Attempted' : isActiveNow ? 'Start Quiz' : 'Not Active'}
                    </Text>
                  </Pressable>
                </View>
              );
            })
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

function formatSeconds(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toLocaleString();
}

function parseError(error: any): string {
  const raw = error?.message || error?.details || 'Unknown error';

  if (raw.includes('provider is not enabled')) return 'Google provider is not enabled in Supabase Auth settings.';
  if (raw.includes('ALREADY_ATTEMPTED')) return 'You already attempted this competition.';
  if (raw.includes('ENTRY_NOT_PAID')) return 'Paid entry is required before starting.';
  if (raw.includes('COMPETITION_NOT_ACTIVE')) return 'Competition is not active right now.';
  if (raw.includes('COMPETITION_OUTSIDE_WINDOW')) return 'Competition is outside its active time window.';
  if (raw.includes('AUTH_REQUIRED')) return 'Please login again.';

  return raw;
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#f4f7fc',
  },
  authPage: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  authLayout: {
    flex: 1,
    flexDirection: 'row',
  },
  editorialPane: {
    flex: 1,
    backgroundColor: '#002446',
  },
  editorialImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  editorialOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 42,
    paddingVertical: 58,
  },
  editorialContent: {
    maxWidth: 420,
  },
  editorialTitle: {
    fontSize: 56,
    lineHeight: 62,
    fontStyle: 'italic',
    color: '#ffdea5',
    fontFamily: 'serif',
  },
  editorialLine: {
    marginTop: 18,
    marginBottom: 22,
    width: 50,
    height: 2,
    backgroundColor: '#e9c176',
  },
  editorialSubtitle: {
    fontSize: 26,
    lineHeight: 35,
    color: '#87a4cf',
    fontFamily: 'serif',
  },
  authPane: {
    flex: 1.08,
    backgroundColor: '#f8f9fa',
  },
  authPaneMobile: {
    flex: 1,
  },
  mobileAuthTop: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 18,
  },
  mobileBrand: {
    color: '#ffdea5',
    fontFamily: 'serif',
    fontStyle: 'italic',
    fontSize: 30,
    lineHeight: 34,
  },
  authContainer: {
    flexGrow: 1,
  },
  authContainerMobile: {
    paddingTop: 24,
    paddingBottom: 34,
    paddingLeft: 22,
    paddingRight: 16,
  },
  authContainerWide: {
    paddingTop: 72,
    paddingBottom: 70,
    paddingLeft: '8%',
    paddingRight: '6%',
    maxWidth: 640,
  },
  kicker: {
    color: '#775a19',
    fontSize: 11,
    letterSpacing: 2.2,
    fontWeight: '700',
  },
  authDisplayTitle: {
    marginTop: 12,
    color: '#002446',
    fontFamily: 'serif',
    fontSize: 44,
    lineHeight: 52,
    fontWeight: '700',
  },
  authBodyText: {
    marginTop: 12,
    color: '#43474e',
    fontSize: 15,
    lineHeight: 24,
  },
  authSwitchRow: {
    marginTop: 24,
    marginBottom: 22,
    flexDirection: 'row',
    backgroundColor: '#edeeef',
    borderRadius: 10,
    overflow: 'hidden',
  },
  authSwitch: {
    flex: 1,
    paddingVertical: 11,
    alignItems: 'center',
  },
  authSwitchActive: {
    backgroundColor: '#002446',
  },
  authSwitchText: {
    color: '#2a486e',
    fontWeight: '700',
    fontSize: 13,
  },
  authSwitchTextActive: {
    color: '#ffffff',
  },
  fieldBlock: {
    marginBottom: 22,
  },
  fieldLabel: {
    color: '#73777f',
    fontSize: 11,
    letterSpacing: 1.9,
    fontWeight: '700',
    marginBottom: 7,
  },
  passwordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  forgotLink: {
    color: '#775a19',
    fontSize: 12,
    fontWeight: '600',
  },
  ledgerInput: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(195,198,207,0.4)',
    paddingVertical: 10,
    paddingHorizontal: 0,
    fontSize: 16,
    color: '#002446',
  },
  authPrimaryButton: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#775a19',
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  authPrimaryButtonGradient: {
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  authPrimaryButtonText: {
    color: '#ffffff',
    fontSize: 13,
    letterSpacing: 0.8,
    fontWeight: '800',
  },
  authDividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 24,
    marginBottom: 16,
  },
  authDivider: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(195,198,207,0.3)',
  },
  authDividerText: {
    color: '#73777f',
    fontStyle: 'italic',
    fontFamily: 'serif',
    fontSize: 13,
  },
  socialGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#f3f4f5',
    borderRadius: 10,
    paddingVertical: 12,
  },
  socialIconGoogle: {
    color: '#ea4335',
    fontWeight: '800',
    fontSize: 16,
  },
  socialIconApple: {
    color: '#101114',
    fontWeight: '700',
    fontSize: 16,
  },
  socialButtonText: {
    color: '#191c1d',
    fontSize: 14,
    fontWeight: '600',
  },
  authFooter: {
    marginTop: 18,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  authFooterText: {
    color: '#73777f',
    fontSize: 13,
  },
  authFooterLink: {
    color: '#775a19',
    fontSize: 13,
    fontWeight: '700',
  },
  authDisabledButton: {
    opacity: 0.72,
  },
  centeredPage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f7fc',
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  loadingText: {
    marginTop: 12,
    color: '#2f3d56',
    fontSize: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#12326b',
  },
  subtitle: {
    marginTop: 6,
    fontSize: 14,
    color: '#4f5d75',
  },
  primaryButton: {
    marginTop: 4,
    backgroundColor: '#1f4b99',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 15,
  },
  secondaryButton: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#c4d0e7',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  secondaryButtonText: {
    color: '#1f4b99',
    fontWeight: '700',
  },
  competitionHeader: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#d4deef',
    backgroundColor: '#ffffff',
  },
  competitionList: {
    padding: 14,
    gap: 12,
  },
  competitionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#d6e0f1',
    padding: 14,
    gap: 6,
  },
  competitionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1b3767',
  },
  competitionDescription: {
    color: '#47566f',
    fontSize: 14,
  },
  competitionMeta: {
    color: '#40516e',
    fontSize: 13,
  },
  emptyText: {
    textAlign: 'center',
    color: '#51617b',
    marginTop: 24,
  },
  disabledButton: {
    backgroundColor: '#9eb2d9',
  },
  quizHeader: {
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#d3deef',
    backgroundColor: '#ffffff',
  },
  quizTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#173971',
  },
  quizMeta: {
    marginTop: 4,
    color: '#425675',
    fontSize: 14,
  },
  timer: {
    marginTop: 5,
    color: '#b32020',
    fontSize: 15,
    fontWeight: '700',
  },
  rulesText: {
    marginTop: 5,
    color: '#55657d',
    fontSize: 12,
  },
  violationText: {
    marginTop: 5,
    color: '#b32020',
    fontSize: 12,
    fontWeight: '700',
  },
  quizBody: {
    padding: 14,
  },
  questionCard: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d4deef',
    borderRadius: 12,
    padding: 14,
    gap: 10,
  },
  questionText: {
    fontSize: 18,
    lineHeight: 25,
    color: '#132f5f',
    fontWeight: '700',
    marginBottom: 4,
  },
  optionButton: {
    borderWidth: 1,
    borderColor: '#c6d4ef',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: '#f7faff',
  },
  optionButtonSelected: {
    borderColor: '#1f4b99',
    backgroundColor: '#e7effd',
  },
  optionLabel: {
    color: '#23395d',
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 21,
  },
  optionLabelSelected: {
    color: '#133470',
    fontWeight: '800',
  },
  submittingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(19, 35, 66, 0.68)',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  submittingText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
  resultContainer: {
    flexGrow: 1,
    padding: 18,
    justifyContent: 'center',
    gap: 10,
  },
  resultCard: {
    marginTop: 10,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#c8d7f2',
    borderRadius: 12,
    alignItems: 'center',
    paddingVertical: 18,
  },
  resultValue: {
    color: '#173e81',
    fontWeight: '900',
    fontSize: 38,
  },
  resultLabel: {
    marginTop: 5,
    color: '#3a4f73',
    fontSize: 14,
  },
  resultLine: {
    color: '#2b4269',
    fontSize: 15,
    textAlign: 'center',
  },
});

export default App;
