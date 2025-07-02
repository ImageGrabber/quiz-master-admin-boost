import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const nextQuizzes = [
  { title: "2 John Quiz", description: "Continue to John's second letter.", link: "/bible-questions-and-answers-hub/2-john" },
  { title: "2 Peter Quiz", description: "Go back to Peter's second letter.", link: "/bible-questions-and-answers-hub/2-peter" },
  { title: "3 John Quiz", description: "Explore John's third letter.", link: "/bible-questions-and-answers-hub/3-john" }
];

const firstJohnQuestions = [
  { chapter: 1, question: "Who wrote the Book of 1 John?", options: ["John", "Peter", "Paul", "James"], answer: 0 },
  { chapter: 1, question: "What does John say about God in 1 John 1:5?", options: ["God is light", "God is love", "God is spirit", "God is judge"], answer: 0 },
  { chapter: 1, question: "What does John say about walking in darkness?", options: ["We lie and do not practice the truth", "We are saved", "We are wise", "We are blessed"], answer: 0 },
  { chapter: 1, question: "What cleanses us from all sin?", options: ["The blood of Jesus", "Good works", "The law", "Sacrifices"], answer: 0 },
  { chapter: 1, question: "What should we do if we confess our sins?", options: ["He is faithful and just to forgive us", "He will ignore us", "He will punish us", "He will forget us"], answer: 0 },
  { chapter: 2, question: "Who is our advocate with the Father?", options: ["Jesus Christ the righteous", "Moses", "Elijah", "David"], answer: 0 },
  { chapter: 2, question: "What is the new commandment John gives?", options: ["Love one another", "Pray always", "Fast often", "Give tithes"], answer: 0 },
  { chapter: 2, question: "Who is a liar according to John?", options: ["He who denies that Jesus is the Christ", "He who prays", "He who gives", "He who loves"], answer: 0 },
  { chapter: 2, question: "What does John say about the world?", options: ["The world is passing away", "The world is eternal", "The world is wise", "The world is good"], answer: 0 },
  { chapter: 2, question: "Who is the antichrist?", options: ["He who denies the Father and the Son", "He who loves", "He who prays", "He who gives"], answer: 0 },
  { chapter: 3, question: "What manner of love has the Father bestowed on us?", options: ["That we should be called children of God", "That we should be rich", "That we should be wise", "That we should be strong"], answer: 0 },
  { chapter: 3, question: "What does John say about sin?", options: ["Whoever abides in Him does not sin", "Everyone sins", "No one sins", "Sin is good"], answer: 0 },
  { chapter: 3, question: "What message have we heard from the beginning?", options: ["That we should love one another", "That we should hate", "That we should fear", "That we should doubt"], answer: 0 },
  { chapter: 3, question: "Who was of the wicked one and murdered his brother?", options: ["Cain", "Abel", "Seth", "Enoch"], answer: 0 },
  { chapter: 3, question: "How do we know love?", options: ["He laid down His life for us", "We are wise", "We are strong", "We are rich"], answer: 0 },
  { chapter: 3, question: "What does John say about loving in word or tongue?", options: ["Let us not love in word or tongue but in deed and in truth", "Love in word only", "Love in tongue only", "Do not love"], answer: 0 },
  { chapter: 4, question: "What does John say about testing spirits?", options: ["Test the spirits to see whether they are from God", "Ignore spirits", "Accept all spirits", "Fear spirits"], answer: 0 },
  { chapter: 4, question: "What is said about God in 1 John 4:8?", options: ["God is love", "God is light", "God is spirit", "God is judge"], answer: 0 },
  { chapter: 4, question: "How was the love of God manifested toward us?", options: ["God sent His only begotten Son into the world", "God gave us riches", "God gave us wisdom", "God gave us strength"], answer: 0 },
  { chapter: 4, question: "What does perfect love do?", options: ["Casts out fear", "Brings fear", "Brings doubt", "Brings anger"], answer: 0 },
  { chapter: 4, question: "Whoever claims to love God yet hates a brother or sister is what?", options: ["A liar", "A prophet", "A teacher", "A friend"], answer: 0 },
  { chapter: 5, question: "Whoever believes that Jesus is the Christ is what?", options: ["Born of God", "Wise", "Strong", "Rich"], answer: 0 },
  { chapter: 5, question: "What is the victory that has overcome the world?", options: ["Our faith", "Our works", "Our wisdom", "Our strength"], answer: 0 },
  { chapter: 5, question: "Who is he who overcomes the world?", options: ["He who believes that Jesus is the Son of God", "He who is wise", "He who is strong", "He who is rich"], answer: 0 },
  { chapter: 5, question: "What does John say about sin leading to death?", options: ["There is sin leading to death", "All sin leads to death", "No sin leads to death", "Sin is good"], answer: 0 }
];

export default function FirstJohnQuiz() {
  const [selected, setSelected] = useState<(number | null)[]>(Array(firstJohnQuestions.length).fill(null));
  const [showAnswer, setShowAnswer] = useState<boolean[]>(Array(firstJohnQuestions.length).fill(false));
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

  const correctCount = selected.filter((sel, i) => sel !== null && sel === firstJohnQuestions[i].answer).length;
  const wrongCount = selected.filter((sel, i) => sel !== null && sel !== firstJohnQuestions[i].answer).length;
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
              <CardTitle>1 John Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {firstJohnQuestions.map((q, qIdx) => (
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