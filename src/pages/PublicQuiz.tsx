import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock, Brain, CheckCircle, AlertTriangle, Trophy, Home } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import SocialShare from "@/components/SocialShare";

interface Question {
  id: number | string;
  question: string;
  options: string[];
  answer: number;
  explanation?: string;
  referenceVerse?: string;
}

interface PublicQuizProps {
  title: string;
  questions: Question[];
  bookName: string;
  chapter?: string;
  seoDescription?: string;
  prevChapterUrl?: string;
  nextChapterUrl?: string;
  canonicalPath?: string;
}

const toSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const normalizePath = (value: string) => (value.startsWith("/") ? value : `/${value}`);

const PublicQuiz = ({ title, questions, bookName, chapter, seoDescription, prevChapterUrl, nextChapterUrl, canonicalPath }: PublicQuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showTimeWarning, setShowTimeWarning] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");
  const fallbackPath = `/public-quiz/${toSlug(bookName)}${chapter ? `/chapter-${chapter}` : ""}`;
  const resolvedPath = normalizePath(
    canonicalPath || (typeof window !== "undefined" ? window.location.pathname : fallbackPath)
  );
  const canonicalUrl = `https://biblequizcompetition.com${resolvedPath}`;

  // Timer effect with enhanced warnings
  useEffect(() => {
    if (timeLeft > 0 && !isCompleted && !isLoading) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);

      // Show time warnings
      if (timeLeft === 180) { // 3 minutes left
        setDialogTitle("⚠️ Time Warning");
        setDialogMessage("You have 3 minutes remaining!");
        setDialogOpen(true);
        setShowTimeWarning(true);
        setTimeout(() => setShowTimeWarning(false), 5000);
      } else if (timeLeft === 60) { // 1 minute left
        setDialogTitle("🚨 Final Warning");
        setDialogMessage("Only 1 minute remaining! Hurry up!");
        setDialogOpen(true);
        setShowTimeWarning(true);
        setTimeout(() => setShowTimeWarning(false), 5000);
      } else if (timeLeft === 30) { // 30 seconds left
        setDialogTitle("⏰ Almost Time's Up!");
        setDialogMessage("Only 30 seconds left!");
        setDialogOpen(true);
      }

      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleQuizComplete();
    }
  }, [timeLeft, isCompleted, isLoading]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = selectedAnswer;
      setAnswers(newAnswers);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(answers[currentQuestion + 1] ?? null);
      } else {
        handleQuizComplete();
      }
    }
  };

  const handleQuizComplete = () => {
    setIsCompleted(true);
    setIsLoading(false);
  };

  const calculateScore = () => {
    let correct = 0;
    answers.forEach((answer, index) => {
      if (answer === questions[index].answer) {
        correct++;
      }
    });
    return Math.round((correct / questions.length) * 100);
  };

  const getScoreMessage = (score: number) => {
    if (score >= 90) return "Excellent! You're a Bible expert!";
    if (score >= 80) return "Great job! You know your Bible well!";
    if (score >= 70) return "Good work! Keep studying!";
    if (score >= 60) return "Not bad! Room for improvement!";
    return "Keep studying the Bible!";
  };

  if (isCompleted) {
    const score = calculateScore();
    const correctAnswers = answers.filter((answer, index) => answer === questions[index].answer).length;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-white">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-6xl mx-auto shadow-2xl border-0">
            <CardHeader className="text-center bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-t-xl">
              <CardTitle className="text-3xl font-bold">Quiz Complete!</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-2">{score}%</h2>
                <p className="text-xl text-gray-600 mb-4">{getScoreMessage(score)}</p>
                <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{correctAnswers}</div>
                    <div className="text-sm text-blue-600">Correct</div>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">{questions.length - correctAnswers}</div>
                    <div className="text-sm text-red-600">Incorrect</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{formatTime(600 - timeLeft)}</div>
                    <div className="text-sm text-green-600">Time Used</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Question Review</h3>
                {questions.map((q, index) => {
                  const userAnswer = answers[index];
                  const isCorrect = userAnswer === q.answer;
                  return (
                    <div key={q.id} className={`p-4 rounded-lg border-2 ${isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                      <div className="flex items-start justify-between mb-2">
                        <span className="font-semibold text-gray-900">Question {index + 1}</span>
                        {isCorrect ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <AlertTriangle className="w-5 h-5 text-red-500" />
                        )}
                      </div>
                      <p className="text-gray-700 mb-2">{q.question}</p>
                      {q.referenceVerse && (
                        <p className="text-sm font-medium text-blue-800 mb-3 bg-blue-100/50 inline-block px-2 py-1 rounded">
                          Reference: 📖 {q.referenceVerse}
                        </p>
                      )}
                      {q.explanation && (
                        <p className="text-sm text-gray-600 mb-3 italic">
                          {q.explanation}
                        </p>
                      )}
                      <div className="space-y-1">
                        {q.options.map((option, optionIndex) => (
                          <div
                            key={optionIndex}
                            className={`p-2 rounded text-sm ${optionIndex === q.answer
                              ? 'bg-green-100 text-green-800 font-semibold'
                              : optionIndex === userAnswer && !isCorrect
                                ? 'bg-red-100 text-red-800'
                                : 'bg-gray-100 text-gray-700'
                              }`}
                          >
                            {String.fromCharCode(65 + optionIndex)}. {option}
                            {optionIndex === q.answer && <span className="ml-2">✓ Correct</span>}
                            {optionIndex === userAnswer && !isCorrect && <span className="ml-2">✗ Your Answer</span>}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Social Share Section for Quiz Results */}
              <div className="mb-8">
                <SocialShare
                  url={canonicalUrl}
                  title={`I scored ${score}% on the ${bookName} Bible Quiz!`}
                  description={`I just took the ${bookName} Bible quiz and scored ${score}%! Test your knowledge too with this free interactive Bible quiz.`}
                  variant="inline"
                  showTitle={true}
                  showDescription={true}
                  showUrl={false}
                  platforms={["facebook", "twitter", "linkedin", "whatsapp", "email"]}
                  className="mb-6"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={() => window.location.reload()}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Retake Quiz
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate('/')}
                  className="border-2 border-gray-300 hover:border-gray-400"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate('/auth/register')}
                  className="border-2 border-green-300 text-green-600 hover:border-green-400 hover:bg-green-50"
                >
                  Sign Up for More Quizzes
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-white">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-4xl mx-auto shadow-2xl border-0">
            <CardContent className="p-8 text-center">
              <AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">No Questions Available</h2>
              <p className="text-gray-600 mb-6">This quiz doesn't have any questions yet.</p>
              <Button onClick={() => navigate('/')} variant="outline">
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const generateStructuredData = () => {
    return {
      "@context": "https://schema.org",
      "@type": "Quiz",
      "name": title,
      "description": `Test your knowledge of ${bookName} with this interactive Bible quiz. ${questions.length} questions to challenge your understanding.`,
      "numberOfQuestions": questions.length,
      "timeRequired": "PT10M",
      "educationalLevel": "Beginner to Advanced",
      "learningResourceType": "Quiz",
      "about": {
        "@type": "Thing",
        "name": bookName
      },
      "provider": {
        "@type": "Organization",
        "name": "Bible Quiz Competition",
        "url": "https://biblequizcompetition.com"
      },
      "mainEntityOfPage": canonicalUrl
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-white">
      <Helmet>
        <title>{title} - Free Bible Quiz | Bible Quiz Competition</title>
        <meta name="description" content={seoDescription || `Test your knowledge of ${bookName} with this free interactive Bible quiz. ${questions.length} questions to challenge your understanding of the Bible. No registration required!`} />
        <meta name="keywords" content={`${bookName} quiz, Bible quiz, ${bookName} questions, Bible study, Christian quiz, free Bible quiz, ${bookName} test, Bible knowledge`} />
        <meta name="author" content="Bible Quiz Competition" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${title} - Free Bible Quiz`} />
        <meta property="og:description" content={seoDescription || `Test your knowledge of ${bookName} with this free interactive Bible quiz. ${questions.length} questions to challenge your understanding.`} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="Bible Quiz Competition" />
        <meta property="og:image" content="https://biblequizcompetition.com/og-image-bible-quiz.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${title} - Free Bible Quiz`} />
        <meta name="twitter:description" content={seoDescription || `Test your knowledge of ${bookName} with this free interactive Bible quiz. ${questions.length} questions to challenge your understanding.`} />
        <meta name="twitter:image" content="https://biblequizcompetition.com/og-image-bible-quiz.jpg" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(generateStructuredData())}
        </script>
      </Helmet>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-6xl mx-auto shadow-2xl border-0">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-xl">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold">{title}</CardTitle>
                <p className="text-blue-100 mt-1">Question {currentQuestion + 1} of {questions.length}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="w-5 h-5" />
                  <span className="text-lg font-semibold">{formatTime(timeLeft)}</span>
                </div>
                <Badge variant="secondary" className="bg-white/20 text-white">
                  {timeLeft > 300 ? 'Plenty of time' : timeLeft > 60 ? 'Hurry up!' : 'Almost done!'}
                </Badge>
              </div>
            </div>
            <Progress value={progress} className="mt-4 bg-white/20" />
          </CardHeader>

          <CardContent className="p-8">
            {/* SEO-friendly content section */}
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
              <p className="text-gray-700 mb-2">
                {seoDescription || `Test your knowledge of ${bookName}${chapter ? ` Chapter ${chapter}` : ''} with this comprehensive Bible quiz. This interactive quiz contains ${questions.length} carefully crafted questions covering key events, characters, and teachings from ${bookName}${chapter ? ` Chapter ${chapter}` : ''}.`}
              </p>
              <div className="flex flex-wrap gap-2 text-sm text-blue-600">
                <span className="bg-blue-100 px-2 py-1 rounded">Free Bible Quiz</span>
                <span className="bg-blue-100 px-2 py-1 rounded">{questions.length} Questions</span>
                <span className="bg-blue-100 px-2 py-1 rounded">10 Minutes</span>
                <span className="bg-blue-100 px-2 py-1 rounded">No Registration Required</span>
              </div>
            </div>

            {/* Social Share Section */}
            <div className="mb-8">
              <SocialShare
                url={canonicalUrl}
                title={`${title} - Free Bible Quiz`}
                description={`Test your knowledge of ${bookName} with this free interactive Bible quiz. ${questions.length} questions to challenge your understanding.`}
                variant="card"
                showTitle={true}
                showDescription={true}
                showUrl={false}
                platforms={["facebook", "twitter", "linkedin", "whatsapp", "email"]}
                className="mb-6"
              />
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">{currentQ.question}</h2>
              <div className="space-y-3">
                {currentQ.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${selectedAnswer === index
                      ? 'border-blue-500 bg-blue-50 text-blue-900'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                      }`}
                  >
                    <span className="font-medium">{String.fromCharCode(65 + index)}. {option}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                {currentQuestion + 1} of {questions.length} questions
              </div>
              <Button
                onClick={handleNext}
                disabled={selectedAnswer === null}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Next / Prev Links (SEO Internal Interlinking) */}
        {(prevChapterUrl || nextChapterUrl) && (
          <div className="mt-8 max-w-6xl mx-auto flex justify-between items-center px-4">
            {prevChapterUrl ? (
              <Link to={prevChapterUrl} className="text-blue-700 hover:text-blue-900 hover:underline font-semibold flex items-center bg-white p-3 rounded-lg shadow-sm border border-blue-100">
                ← Previous Chapter
              </Link>
            ) : <div />}
            {nextChapterUrl && (
              <Link to={nextChapterUrl} className="text-blue-700 hover:text-blue-900 hover:underline font-semibold flex items-center bg-white p-3 rounded-lg shadow-sm border border-blue-100">
                Next Chapter →
              </Link>
            )}
          </div>
        )}

        {/* SEO-friendly footer content */}
        <div className="mt-8 max-w-6xl mx-auto">
          <Card className="shadow-lg border-0">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">About This {bookName}{chapter ? ` Chapter ${chapter}` : ''} Quiz</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">What You'll Learn</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Key events and stories from {bookName}{chapter ? ` Chapter ${chapter}` : ''}</li>
                    <li>• Important characters and their roles</li>
                    <li>• Biblical teachings and principles</li>
                    <li>• Historical context and significance</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Quiz Features</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• {questions.length} carefully selected questions</li>
                    <li>• 10-minute time limit</li>
                    <li>• Instant feedback and explanations</li>
                    <li>• No registration required</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>Perfect for:</strong> Bible study groups, Sunday school classes, personal study,
                  and anyone wanting to test their knowledge of {bookName}. This quiz is designed to
                  challenge both beginners and advanced Bible students.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Time Warning Dialog */}
      {dialogOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="max-w-md mx-4 shadow-2xl border-0">
            <CardHeader className="text-center">
              <CardTitle className="text-xl">{dialogTitle}</CardTitle>
            </CardHeader>
            <CardContent className="text-center pb-6">
              <p className="text-gray-600 mb-4">{dialogMessage}</p>
              <Button onClick={() => setDialogOpen(false)} className="w-full">
                Continue Quiz
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default PublicQuiz;
