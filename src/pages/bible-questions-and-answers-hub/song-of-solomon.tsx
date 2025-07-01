import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const nextQuizzes = [
  { title: "Ecclesiastes Quiz", description: "Go back to the meaning of life and wisdom.", link: "/bible-questions-and-answers-hub/ecclesiastes" },
  { title: "Proverbs Quiz", description: "Review wisdom sayings and teachings.", link: "/bible-questions-and-answers-hub/proverbs" },
  { title: "Psalms Quiz", description: "Review the book of prayers and songs.", link: "/bible-questions-and-answers-hub/psalms" },
  { title: "Job Quiz", description: "Review the story of suffering and faith.", link: "/bible-questions-and-answers-hub/job" }
];

const songOfSolomonQuestions = [
  { chapter: 1, question: "What is the Song of Songs?", options: ["A song about God", "A song about love", "A song about wisdom", "A song about war"], answer: 1 },
  { chapter: 1, question: "Who is the main male character?", options: ["Solomon", "David", "The beloved", "The shepherd"], answer: 2 },
  { chapter: 1, question: "Who is the main female character?", options: ["The Shulamite", "The queen", "The princess", "The maiden"], answer: 0 },
  { chapter: 1, question: "What does the woman say about her lover's love?", options: ["It is better than wine", "It is worse than wine", "It is like wine", "It is nothing"], answer: 0 },
  { chapter: 1, question: "What does the woman say about her own appearance?", options: ["She is beautiful", "She is dark", "She is fair", "She is ugly"], answer: 1 },
  { chapter: 2, question: "What does the woman compare her lover to?", options: ["A rose", "A lily", "An apple tree", "A cedar"], answer: 2 },
  { chapter: 2, question: "What does the woman say about her lover's banner?", options: ["It is love", "It is war", "It is peace", "It is nothing"], answer: 0 },
  { chapter: 2, question: "What does the woman say about love?", options: ["It is weak", "It is strong", "It is nothing", "It is everything"], answer: 1 },
  { chapter: 3, question: "What did the woman seek at night?", options: ["Her lover", "Her family", "Her friends", "Her home"], answer: 0 },
  { chapter: 3, question: "What did the woman find?", options: ["Her lover", "Nothing", "Her family", "Her friends"], answer: 0 },
  { chapter: 3, question: "What did Solomon's carriage look like?", options: ["It was plain", "It was made of gold", "It was made of silver", "It was made of wood"], answer: 1 },
  { chapter: 4, question: "What does the man call the woman?", options: ["My sister", "My bride", "My love", "All of these"], answer: 3 },
  { chapter: 4, question: "What does the man say about the woman's eyes?", options: ["They are like doves", "They are like stars", "They are like fire", "They are like water"], answer: 0 },
  { chapter: 4, question: "What does the man say about the woman's hair?", options: ["It is like a flock of goats", "It is like silk", "It is like gold", "It is like silver"], answer: 0 },
  { chapter: 4, question: "What does the man say about the woman's teeth?", options: ["They are like pearls", "They are like ivory", "They are like gold", "They are like silver"], answer: 1 },
  { chapter: 5, question: "What did the woman say about her lover?", options: ["He was sleeping", "He was gone", "He was knocking", "He was calling"], answer: 2 },
  { chapter: 5, question: "What did the woman do when her lover knocked?", options: ["She opened immediately", "She refused to open", "She was slow to open", "She never opened"], answer: 2 },
  { chapter: 5, question: "What happened to her lover?", options: ["He left", "He stayed", "He died", "He slept"], answer: 0 },
  { chapter: 6, question: "What did the daughters of Jerusalem ask?", options: ["Where has your lover gone?", "Who is your lover?", "What is your lover like?", "When will your lover return?"], answer: 0 },
  { chapter: 6, question: "What did the woman say about her lover?", options: ["He was gone", "He was in his garden", "He was with his friends", "He was sleeping"], answer: 1 },
  { chapter: 6, question: "What does the man say about the woman?", options: ["She is beautiful", "She is perfect", "She is unique", "All of these"], answer: 3 },
  { chapter: 7, question: "What does the man describe about the woman?", options: ["Her feet", "Her legs", "Her body", "All of these"], answer: 3 },
  { chapter: 7, question: "What does the man say about the woman's stature?", options: ["It is like a palm tree", "It is like a cedar", "It is like a rose", "It is like a lily"], answer: 0 },
  { chapter: 7, question: "What does the man say about the woman's breasts?", options: ["They are like clusters of grapes", "They are like apples", "They are like pomegranates", "They are like figs"], answer: 1 },
  { chapter: 8, question: "What does the woman wish about her lover?", options: ["He was her brother", "He was her father", "He was her friend", "He was her servant"], answer: 0 },
  { chapter: 8, question: "What does the woman say about love?", options: ["It is weak", "It is strong as death", "It is nothing", "It is everything"], answer: 1 },
  { chapter: 8, question: "What does the woman say about jealousy?", options: ["It is weak", "It is strong", "It is cruel", "It is kind"], answer: 2 },
  { chapter: 8, question: "What does the woman say about many waters?", options: ["They cannot quench love", "They can quench love", "They are like love", "They are nothing"], answer: 0 },
  { chapter: 8, question: "What does the woman say about rivers?", options: ["They cannot sweep love away", "They can sweep love away", "They are like love", "They are nothing"], answer: 0 },
  { chapter: 8, question: "What does the woman say about wealth?", options: ["It can buy love", "It cannot buy love", "It is like love", "It is nothing"], answer: 1 },
  { chapter: 8, question: "What does the woman ask her lover to do?", options: ["Come away", "Stay here", "Go home", "Wait"], answer: 0 },
  { chapter: 8, question: "What does the woman say about her lover?", options: ["He is like a gazelle", "He is like a deer", "He is like a lion", "All of these"], answer: 3 },
  { chapter: 8, question: "What does the woman say about her lover's voice?", options: ["It is sweet", "It is loud", "It is soft", "It is nothing"], answer: 0 },
  { chapter: 8, question: "What does the woman say about her lover's appearance?", options: ["It is lovely", "It is ugly", "It is average", "It is nothing"], answer: 0 }
];

export default function SongOfSolomonQuiz() {
  const [selected, setSelected] = useState<(number | null)[]>(Array(songOfSolomonQuestions.length).fill(null));
  const [showAnswer, setShowAnswer] = useState<boolean[]>(Array(songOfSolomonQuestions.length).fill(false));
  const navigate = useNavigate();

  const handleSelect = (qIdx: number, oIdx: number) => {
    if (showAnswer[qIdx]) return;
    const newSelected = [...selected];
    newSelected[qIdx] = oIdx;
    setSelected(newSelected);
    const newShow = [...showAnswer];
    newShow[qIdx] = true;
    setShowAnswer(newShow);
  };

  const correctCount = selected.filter((sel, i) => sel !== null && sel === songOfSolomonQuestions[i].answer).length;
  const wrongCount = selected.filter((sel, i) => sel !== null && sel !== songOfSolomonQuestions[i].answer).length;
  const notAttemptedCount = selected.filter((sel) => sel === null).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-white flex flex-col">
      <header className="bg-white/70 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/bible-questions-and-answers-hub')}> 
            <img src="/sword.png" alt="BibleBattles Logo" className="w-7 h-7 mr-2 inline-block align-middle" />
            <span className="text-lg font-semibold text-gray-900">BibleBattles</span>
          </div>
          <nav className="flex items-center space-x-2">
            <a href="/" className="text-gray-700 hover:text-blue-700 font-medium px-3 py-2 rounded transition">Home</a>
            <a href="/bible-questions-and-answers-hub" className="text-blue-700 font-semibold px-3 py-2 rounded transition">Bible Q&amp;A</a>
            <a href="/public-leaderboard" className="text-gray-700 hover:text-blue-700 font-medium px-3 py-2 rounded transition">Leaderboard</a>
            <Button variant="ghost" onClick={() => navigate("/auth/register")}>Sign Up</Button>
            <Button onClick={() => navigate("/auth/login")}>Sign In</Button>
          </nav>
        </div>
      </header>
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row gap-8">
        {/* Left: Quiz */}
        <div className="flex-1 min-w-0">
          {/* Summary Bar */}
          <div className="flex flex-wrap gap-4 mb-8 justify-center md:justify-start">
            <div className="px-4 py-2 rounded-lg bg-green-100 text-green-800 font-semibold flex items-center">
              <span className="w-3 h-3 rounded-full bg-green-500 inline-block mr-2"></span>
              Correct: {correctCount}
            </div>
            <div className="px-4 py-2 rounded-lg bg-red-100 text-red-800 font-semibold flex items-center">
              <span className="w-3 h-3 rounded-full bg-red-500 inline-block mr-2"></span>
              Wrong: {wrongCount}
            </div>
            <div className="px-4 py-2 rounded-lg bg-gray-100 text-gray-800 font-semibold flex items-center">
              <span className="w-3 h-3 rounded-full bg-gray-400 inline-block mr-2"></span>
              Not Attempted: {notAttemptedCount}
            </div>
          </div>
          <Card className="mb-8 shadow-lg border-0">
            <CardHeader>
              <CardTitle>Song of Solomon Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {songOfSolomonQuestions.map((q, qIdx) => (
                  <div key={qIdx} className="bg-white/80 rounded-xl p-6 shadow border border-blue-100">
                    <div className="mb-2 text-sm text-blue-600 font-semibold">Chapter {q.chapter}</div>
                    <div className="font-bold text-lg mb-4">{qIdx + 1}. {q.question}</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {q.options.map((opt, oIdx) => {
                        const isSelected = selected[qIdx] === oIdx;
                        const isCorrect = q.answer === oIdx;
                        const show = showAnswer[qIdx];
                        return (
                          <button
                            key={oIdx}
                            className={`text-left px-4 py-3 rounded-lg border transition-all font-medium text-base
                              ${show
                                ? isCorrect
                                  ? 'bg-green-100 border-green-400 text-green-800'
                                  : isSelected
                                    ? 'bg-red-100 border-red-400 text-red-700'
                                    : 'bg-gray-100 border-gray-200 text-gray-700'
                                : 'bg-white border-gray-200 hover:bg-blue-50 hover:border-blue-300'}
                            `}
                            disabled={show}
                            onClick={() => handleSelect(qIdx, oIdx)}
                          >
                            {opt}
                            {show && isCorrect && (
                              <span className="ml-2 font-bold text-green-600">✓</span>
                            )}
                            {show && isSelected && !isCorrect && (
                              <span className="ml-2 font-bold text-red-600">✗</span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                    {showAnswer[qIdx] && (
                      <div className="mt-3 text-sm font-semibold text-green-700">
                        Correct answer: {q.options[q.answer]}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Right: Sidebar */}
        <aside className="w-full md:w-80 flex-shrink-0 space-y-8">
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-lg">Next Quizzes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {nextQuizzes.map((quiz) => (
                  <div key={quiz.title} className="bg-blue-50 rounded-lg p-4 flex flex-col gap-1 border border-blue-100 hover:shadow-md transition cursor-pointer" onClick={() => navigate(quiz.link)}>
                    <div className="font-semibold text-blue-800">{quiz.title}</div>
                    <div className="text-sm text-blue-600">{quiz.description}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-lg">Compete for Prizes!</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4 text-gray-700 text-sm">Sign in or sign up to join Bible quiz competitions, track your progress, and win exciting rewards.</div>
              <div className="flex gap-2">
                <Button className="flex-1" onClick={() => navigate('/auth/login')}>Sign In</Button>
                <Button className="flex-1" variant="outline" onClick={() => navigate('/auth/register')}>Sign Up</Button>
              </div>
            </CardContent>
          </Card>
        </aside>
      </main>
    </div>
  );
} 