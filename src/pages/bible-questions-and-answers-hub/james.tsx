import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const nextQuizzes = [
  { title: "1 Peter Quiz", description: "Continue to Peter's first letter.", link: "/bible-questions-and-answers-hub/1-peter" },
  { title: "Hebrews Quiz", description: "Go back to the Book of Hebrews.", link: "/bible-questions-and-answers-hub/hebrews" },
  { title: "2 Peter Quiz", description: "Explore Peter's second letter.", link: "/bible-questions-and-answers-hub/2-peter" }
];

const jamesQuestions = [
  { chapter: 1, question: "Who wrote the Book of James?", options: ["James, the brother of John", "James, the son of Alphaeus", "James, the brother of Jesus", "James, the father of Judas"], answer: 2 },
  { chapter: 1, question: "What does James say about trials?", options: ["Consider it pure joy", "Avoid them", "Complain about them", "Ignore them"], answer: 0 },
  { chapter: 1, question: "What does James say about asking God for wisdom?", options: ["He gives generously to all", "He gives only to the wise", "He gives only to the rich", "He gives only to the poor"], answer: 0 },
  { chapter: 1, question: "What is said about being double-minded?", options: ["Unstable in all they do", "Blessed", "Wise", "Rich"], answer: 0 },
  { chapter: 1, question: "What does James say about hearing and doing?", options: ["Be doers of the word", "Only hear the word", "Ignore the word", "Forget the word"], answer: 0 },
  { chapter: 1, question: "What is pure and undefiled religion?", options: ["To visit orphans and widows", "To pray often", "To fast regularly", "To give tithes"], answer: 0 },
  { chapter: 2, question: "What does James say about favoritism?", options: ["It is a sin", "It is wise", "It is good", "It is necessary"], answer: 0 },
  { chapter: 2, question: "What example does James use to show faith and works?", options: ["Abraham offering Isaac", "Moses parting the sea", "David and Goliath", "Solomon's wisdom"], answer: 0 },
  { chapter: 2, question: "What is said about faith without works?", options: ["It is dead", "It is strong", "It is enough", "It is powerful"], answer: 0 },
  { chapter: 2, question: "Who was justified by works when she hid the spies?", options: ["Rahab", "Deborah", "Esther", "Ruth"], answer: 0 },
  { chapter: 3, question: "What does James compare the tongue to?", options: ["A fire", "A sword", "A river", "A tree"], answer: 0 },
  { chapter: 3, question: "What is said about taming the tongue?", options: ["No human can tame it", "It is easy", "It is impossible", "It is unnecessary"], answer: 0 },
  { chapter: 3, question: "What does James say about wisdom from above?", options: ["Pure, peace-loving, considerate", "Harsh and bitter", "Earthly and unspiritual", "Foolish and proud"], answer: 0 },
  { chapter: 4, question: "What causes fights and quarrels among you?", options: ["Desires that battle within you", "The devil", "God's will", "Other people"], answer: 0 },
  { chapter: 4, question: "What does James say about friendship with the world?", options: ["Enmity with God", "Blessed by God", "Wisdom", "Peace"], answer: 0 },
  { chapter: 4, question: "What does James say about boasting about tomorrow?", options: ["It is evil", "It is wise", "It is good", "It is necessary"], answer: 0 },
  { chapter: 4, question: "What should you say instead of boasting?", options: ["If it is the Lord's will", "If I want to", "If I can", "If I must"], answer: 0 },
  { chapter: 5, question: "What does James say to the rich who oppress others?", options: ["Weep and howl for your miseries", "Rejoice", "Continue", "Ignore the poor"], answer: 0 },
  { chapter: 5, question: "What example of patience does James give?", options: ["The prophets", "The kings", "The priests", "The judges"], answer: 0 },
  { chapter: 5, question: "What does James say about swearing oaths?", options: ["Let your yes be yes and your no be no", "Swear by heaven", "Swear by earth", "Swear by Jerusalem"], answer: 0 },
  { chapter: 5, question: "What should the sick do?", options: ["Call the elders to pray over them", "Ignore it", "Complain", "Hide it"], answer: 0 },
  { chapter: 5, question: "What does James say about confessing sins?", options: ["Confess to one another", "Keep it secret", "Ignore it", "Forget it"], answer: 0 },
  { chapter: 5, question: "Who is said to be righteous and effective in prayer?", options: ["Elijah", "Moses", "David", "Solomon"], answer: 0 },
  { chapter: 5, question: "What does James say about turning a sinner from error?", options: ["It saves them from death", "It is pointless", "It is wrong", "It is unnecessary"], answer: 0 },
  { chapter: 5, question: "How does James describe life?", options: ["A mist that appears for a little while and then vanishes", "A tree", "A river", "A mountain"], answer: 0 }
];

export default function JamesQuiz() {
  const [selected, setSelected] = useState<(number | null)[]>(Array(jamesQuestions.length).fill(null));
  const [showAnswer, setShowAnswer] = useState<boolean[]>(Array(jamesQuestions.length).fill(false));
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

  const correctCount = selected.filter((sel, i) => sel !== null && sel === jamesQuestions[i].answer).length;
  const wrongCount = selected.filter((sel, i) => sel !== null && sel !== jamesQuestions[i].answer).length;
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
              <CardTitle>James Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {jamesQuestions.map((q, qIdx) => (
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