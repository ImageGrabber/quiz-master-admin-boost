import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const nextQuizzes = [
  { title: "Jude Quiz", description: "Go back to the Book of Jude.", link: "/bible-questions-and-answers-hub/jude" },
  { title: "Daniel Quiz", description: "Explore another apocalyptic book.", link: "/bible-questions-and-answers-hub/daniel" },
  { title: "Ezekiel Quiz", description: "Continue with prophetic literature.", link: "/bible-questions-and-answers-hub/ezekiel" }
];

const revelationQuestions = [
  { chapter: 1, question: "Who wrote the Book of Revelation?", options: ["John", "Peter", "Paul", "James"], answer: 0 },
  { chapter: 1, question: "Where was John when he received the revelation?", options: ["The island of Patmos", "Jerusalem", "Ephesus", "Rome"], answer: 0 },
  { chapter: 1, question: "Why was John on the island of Patmos?", options: ["For the word of God and for the testimony of Jesus Christ", "For vacation", "For business", "For safety"], answer: 0 },
  { chapter: 1, question: "What day was John in the Spirit?", options: ["The Lord's Day", "The Sabbath", "The first day", "The last day"], answer: 0 },
  { chapter: 1, question: "What did John hear behind him?", options: ["A loud voice, as of a trumpet", "Thunder", "Music", "Silence"], answer: 0 },
  { chapter: 1, question: "What did the voice tell John to write?", options: ["What you see, and what is, and what will take place after this", "Everything", "Nothing", "Only the past"], answer: 0 },
  { chapter: 1, question: "What did John see in the midst of the seven lampstands?", options: ["One like the Son of Man", "An angel", "A beast", "A dragon"], answer: 0 },
  { chapter: 1, question: "What was in the right hand of the One like the Son of Man?", options: ["Seven stars", "A sword", "A scroll", "A crown"], answer: 0 },
  { chapter: 1, question: "What came out of His mouth?", options: ["A sharp two-edged sword", "Fire", "Water", "Wind"], answer: 0 },
  { chapter: 1, question: "What does the mystery of the seven stars represent?", options: ["The angels of the seven churches", "The planets", "The days", "The months"], answer: 0 },
  { chapter: 2, question: "What does the mystery of the seven golden lampstands represent?", options: ["The seven churches", "The seven days", "The seven angels", "The seven spirits"], answer: 0 },
  { chapter: 2, question: "Which church had left their first love?", options: ["Ephesus", "Smyrna", "Pergamos", "Thyatira"], answer: 0 },
  { chapter: 2, question: "What church was rich but poor spiritually?", options: ["Laodicea", "Philadelphia", "Sardis", "Smyrna"], answer: 0 },
  { chapter: 2, question: "Which church was faithful unto death?", options: ["Smyrna", "Ephesus", "Pergamos", "Thyatira"], answer: 0 },
  { chapter: 2, question: "What church had the doctrine of Balaam?", options: ["Pergamos", "Thyatira", "Sardis", "Philadelphia"], answer: 0 },
  { chapter: 3, question: "What church was dead but had a name that it was alive?", options: ["Sardis", "Philadelphia", "Laodicea", "Smyrna"], answer: 0 },
  { chapter: 3, question: "Which church had an open door that no one could shut?", options: ["Philadelphia", "Laodicea", "Sardis", "Smyrna"], answer: 0 },
  { chapter: 3, question: "What church was neither cold nor hot?", options: ["Laodicea", "Philadelphia", "Sardis", "Smyrna"], answer: 0 },
  { chapter: 4, question: "What did John see in heaven?", options: ["A throne set in heaven", "A temple", "A city", "A mountain"], answer: 0 },
  { chapter: 4, question: "Who was sitting on the throne?", options: ["One sat on the throne", "An angel", "A beast", "A dragon"], answer: 0 },
  { chapter: 4, question: "What were around the throne?", options: ["Twenty-four elders", "Twelve apostles", "Seven angels", "Four beasts"], answer: 0 },
  { chapter: 4, question: "What were the four living creatures full of?", options: ["Eyes in front and in back", "Wings", "Horns", "Crowns"], answer: 0 },
  { chapter: 5, question: "What was in the right hand of Him who sat on the throne?", options: ["A scroll written inside and on the back", "A sword", "A crown", "A scepter"], answer: 0 },
  { chapter: 5, question: "Who was worthy to open the scroll?", options: ["The Lion of the tribe of Judah", "An angel", "An elder", "A beast"], answer: 0 },
  { chapter: 5, question: "What did the Lamb have?", options: ["Seven horns and seven eyes", "Ten horns", "One eye", "No horns"], answer: 0 }
];

export default function RevelationQuiz() {
  const [selected, setSelected] = useState<(number | null)[]>(Array(revelationQuestions.length).fill(null));
  const [showAnswer, setShowAnswer] = useState<boolean[]>(Array(revelationQuestions.length).fill(false));
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

  const correctCount = selected.filter((sel, i) => sel !== null && sel === revelationQuestions[i].answer).length;
  const wrongCount = selected.filter((sel, i) => sel !== null && sel !== revelationQuestions[i].answer).length;
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
              <CardTitle>Revelation Quiz - Apocalyptic Literature</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {revelationQuestions.map((q, qIdx) => (
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
              <CardTitle className="text-lg">Apocalyptic Literature</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4 text-gray-700 text-sm">
                Explore the rich symbolism and prophetic visions of Revelation, the final book of the Bible. 
                Test your knowledge of the seven churches, heavenly visions, and end-time prophecies.
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