import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../integrations/supabase/client';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { toast } from '../hooks/use-toast';
import { Clock, CheckCircle, XCircle, ArrowRight, Trophy } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_index: number;
}

interface CompetitionQuiz {
  id: string;
  title: string;
  description: string | null;
  entry_fee: number;
  prize_pool: number;
  start_date: string;
  end_date: string;
  status: string;
  quiz: {
    id: number;
    title: string;
    description: string | null;
  };
}

export default function CompetitionQuiz() {
  const { competitionId } = useParams<{ competitionId: string }>();
  const navigate = useNavigate();
  const [competition, setCompetition] = useState<CompetitionQuiz | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | undefined)[]>([]);
  const [timeLeft, setTimeLeft] = useState(30 * 60);
  const [timeUsed, setTimeUsed] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (competitionId) {
      fetchCompetition();
    }
  }, [competitionId]);

  useEffect(() => {
    if (isStarted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleFinish();
            return 0;
          }
          return prev - 1;
        });
        setTimeUsed((prev) => prev + 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isStarted, timeLeft]);

  const fetchCompetition = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/auth/login');
        return;
      }

      // Fetch competition details
      const { data: competitionData, error: competitionError } = await supabase
        .from('competitions')
        .select(`
          *,
          quiz:quizzes(*)
        `)
        .eq('id', competitionId)
        .single();

      if (competitionError) throw competitionError;

      // Check if user has paid entry
      const { data: entryData, error: entryError } = await (supabase as any)
        .from('competition_entries')
        .select('paid')
        .eq('competition_id', competitionId)
        .eq('user_id', user.id)
        .single();

      if (entryError || !entryData?.paid) {
        toast({
          title: "Access Denied",
          description: "You must complete payment to access this competition",
          variant: "destructive",
        });
        navigate('/competitions');
        return;
      }

      // Check if user has already attempted this competition
      const { data: existingResult, error: resultCheckError } = await (supabase as any)
        .from('competition_results')
        .select('id, score, time_taken')
        .eq('competition_id', competitionId)
        .eq('user_id', user.id)
        .single();

      // If there's an error that's not "no rows found", log it
      if (resultCheckError && resultCheckError.code !== 'PGRST116') {
        console.error('Error checking existing result:', resultCheckError);
      }

      if (existingResult) {
        toast({
          title: "Already Attempted",
          description: `You have already completed this competition with a score of ${existingResult.score}%`,
          variant: "destructive",
        });
        navigate(`/competition-leaderboard/${competitionId}`);
        return;
      }

      // Check if competition is active
      const now = new Date();
      const startDate = new Date(competitionData.start_date);
      const endDate = new Date(competitionData.end_date);

      if (now < startDate || now > endDate || competitionData.status !== 'active') {
        toast({
          title: "Competition Not Active",
          description: "This competition is not currently active",
          variant: "destructive",
        });
        navigate('/competitions');
        return;
      }

      setCompetition(competitionData);

      // Fetch questions
      const { data: questionsData, error: questionsError } = await supabase
        .from('quiz_questions')
        .select(`
          order_index,
          question:questions(*)
        `)
        .eq('quiz_id', competitionData.quiz.id)
        .order('order_index');

      if (questionsError) throw questionsError;

      const formattedQuestions = questionsData.map(q => q.question);
      setQuestions(formattedQuestions);

      // Set time limit (30 minutes for competition)
      setTimeLeft(30 * 60);

    } catch (error) {
      console.error('Error fetching competition:', error);
      toast({
        title: "Error",
        description: "Failed to load competition",
        variant: "destructive",
      });
      navigate('/competitions');
    } finally {
      setLoading(false);
    }
  };

  const handleStart = () => {
    setIsStarted(true);
  };

  const handleAnswer = (answerIndex: number) => {
    if (!isStarted || isFinished) return;

    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setAnswers(newAnswers);

    // Auto-advance to next question after 2 seconds
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        handleFinish();
      }
    }, 2000);
  };

  const handleFinish = async () => {
    if (isFinished || isSubmitting) return;
    setIsFinished(true);
    setIsSubmitting(true);

    // Calculate score
    let correctAnswers = 0;
    answers.forEach((answer, index) => {
      if (answer === questions[index].correct_index) {
        correctAnswers++;
      }
    });

    const finalScore = Math.round((correctAnswers / questions.length) * 100);
    setScore(finalScore);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || !competitionId) return;

      // Save competition result
      const { error: resultError } = await (supabase as any)
        .from('competition_results')
        .insert({
          competition_id: competitionId,
          user_id: user.id,
          score: finalScore,
          time_taken: timeUsed
        });

      if (resultError) {
        console.error('Error saving result:', resultError);
        
        // Check if it's a duplicate key error
        if (resultError.code === '23505') {
          toast({
            title: "Already Submitted",
            description: "You have already submitted a result for this competition",
            variant: "destructive",
          });
          navigate(`/competition-leaderboard/${competitionId}`);
          return;
        }
        
        toast({
          title: "Error",
          description: "Failed to save your result. Please try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Quiz Completed!",
          description: `Your score: ${finalScore}%`,
        });
      }

    } catch (error) {
      console.error('Error finishing quiz:', error);
      toast({
        title: "Error",
        description: "Failed to complete the quiz. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading competition...</div>
        </div>
      </div>
    );
  }

  if (!competition) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Competition Not Found</h1>
          <Button onClick={() => navigate('/competitions')} className="mt-4">
            Back to Competitions
          </Button>
        </div>
      </div>
    );
  }

  if (!isStarted) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-6 h-6 text-yellow-600" />
              {competition.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Competition Rules:</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• You have 30 minutes to complete all questions</li>
                <li>• Questions will auto-advance after 2 seconds</li>
                <li>• You cannot go back to previous questions</li>
                <li>• Your score and time will be recorded for ranking</li>
                <li>• Prize distribution based on final rankings</li>
              </ul>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Prize Pool: ${competition.prize_pool}</h3>
              <p className="text-sm text-gray-600">
                Top performers will receive prizes based on their final ranking.
              </p>
            </div>
            <div className="flex justify-center">
              <Button onClick={handleStart} size="lg">
                Start Competition
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Competition Complete!</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="text-4xl font-bold text-blue-600">{score}%</div>
            <div className="text-gray-600">
              Time used: {formatTime(timeUsed)}
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm">
                Your result has been recorded. Check the leaderboard to see your ranking!
              </p>
            </div>
            <div className="flex gap-4 justify-center">
              <Button onClick={() => navigate('/competitions')}>
                Back to Competitions
              </Button>
              <Button onClick={() => navigate(`/competition-leaderboard/${competitionId}`)}>
                View Leaderboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">{competition.title}</h1>
          <p className="text-gray-600">Question {currentQuestionIndex + 1} of {questions.length}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-red-600">
            <Clock className="w-5 h-5" />
            <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <Progress value={progress} className="mb-6" />

      {/* Question */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-6">{currentQuestion.question}</h2>
          <div className="space-y-3">
            {[
              { label: 'A', text: currentQuestion.option_a, index: 0 },
              { label: 'B', text: currentQuestion.option_b, index: 1 },
              { label: 'C', text: currentQuestion.option_c, index: 2 },
              { label: 'D', text: currentQuestion.option_d, index: 3 }
            ].map((option) => {
              const isSelected = answers[currentQuestionIndex] === option.index;
              const isCorrect = option.index === currentQuestion.correct_index;
              const showResult = isSelected || (answers[currentQuestionIndex] !== undefined);

              return (
                <Button
                  key={option.index}
                  variant={showResult ? (isCorrect ? "default" : (isSelected ? "destructive" : "outline")) : "outline"}
                  className={`w-full justify-start h-auto p-4 text-left ${
                    showResult && isCorrect ? 'bg-green-600 hover:bg-green-700' : ''
                  }`}
                  onClick={() => handleAnswer(option.index)}
                  disabled={answers[currentQuestionIndex] !== undefined}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      showResult && isCorrect ? 'bg-green-700' : 'bg-gray-200'
                    }`}>
                      {showResult && isCorrect ? <CheckCircle className="w-4 h-4" /> : option.label}
                    </div>
                    <span>{option.text}</span>
                    {showResult && isSelected && !isCorrect && (
                      <XCircle className="w-4 h-4 ml-auto" />
                    )}
                  </div>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={() => navigate('/competitions')}
        >
          Exit Competition
        </Button>
        <div className="text-sm text-gray-600">
          {currentQuestionIndex + 1} of {questions.length} questions
        </div>
      </div>
    </div>
  );
} 