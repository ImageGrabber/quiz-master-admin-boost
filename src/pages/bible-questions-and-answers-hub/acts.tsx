import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const nextQuizzes = [
  { title: "Romans Quiz", description: "Continue to Paul's letter to the Romans.", link: "/bible-questions-and-answers-hub/romans" },
  { title: "John Quiz", description: "Go back to the Gospel of John.", link: "/bible-questions-and-answers-hub/john" },
  { title: "Luke Quiz", description: "Review the Gospel of Luke.", link: "/bible-questions-and-answers-hub/luke" }
];

const actsQuestions = [
  { chapter: 1, question: "Who wrote the Book of Acts?", options: ["Paul", "Luke", "Peter", "John"], answer: 1 },
  { chapter: 1, question: "To whom is the Book of Acts addressed?", options: ["Theophilus", "Timothy", "Titus", "Cornelius"], answer: 0 },
  { chapter: 1, question: "How did Jesus ascend to heaven?", options: ["In a chariot", "In a cloud", "On a horse", "By walking"], answer: 1 },
  { chapter: 2, question: "What happened on the day of Pentecost?", options: ["Jesus was crucified", "The Holy Spirit came", "Paul was converted", "Peter was arrested"], answer: 1 },
  { chapter: 2, question: "What sign accompanied the coming of the Holy Spirit?", options: ["Tongues of fire", "Earthquake", "Thunder", "Darkness"], answer: 0 },
  { chapter: 2, question: "Who preached the first sermon in Acts?", options: ["Peter", "Paul", "John", "Stephen"], answer: 0 },
  { chapter: 3, question: "Who was healed at the temple gate called Beautiful?", options: ["A blind man", "A lame man", "A leper", "A deaf man"], answer: 1 },
  { chapter: 4, question: "Who was arrested for preaching about Jesus' resurrection?", options: ["Peter and John", "Paul and Barnabas", "James and John", "Philip and Stephen"], answer: 0 },
  { chapter: 5, question: "Who lied about the price of their land and died?", options: ["Ananias and Sapphira", "Aquila and Priscilla", "Simon and Andrew", "Barnabas and Silas"], answer: 0 },
  { chapter: 6, question: "Who was chosen as the first Christian martyr?", options: ["Stephen", "Philip", "Barnabas", "James"], answer: 0 },
  { chapter: 7, question: "Who approved of Stephen's stoning?", options: ["Peter", "Paul (Saul)", "Barnabas", "James"], answer: 1 },
  { chapter: 8, question: "Who preached to the Ethiopian eunuch?", options: ["Peter", "Philip", "Paul", "Stephen"], answer: 1 },
  { chapter: 9, question: "What happened to Saul on the road to Damascus?", options: ["He was blinded", "He was healed", "He was arrested", "He was baptized"], answer: 0 },
  { chapter: 9, question: "Who restored Saul's sight?", options: ["Ananias", "Barnabas", "Peter", "Philip"], answer: 0 },
  { chapter: 10, question: "Who had a vision of a sheet with unclean animals?", options: ["Peter", "Paul", "Cornelius", "John"], answer: 0 },
  { chapter: 10, question: "Who was the first Gentile convert?", options: ["Cornelius", "Timothy", "Lydia", "Sergius Paulus"], answer: 0 },
  { chapter: 12, question: "Who was miraculously released from prison by an angel?", options: ["Peter", "Paul", "Silas", "Barnabas"], answer: 0 },
  { chapter: 13, question: "Who accompanied Paul on his first missionary journey?", options: ["Barnabas", "Silas", "Timothy", "Luke"], answer: 0 },
  { chapter: 15, question: "What was the main issue at the Jerusalem Council?", options: ["Circumcision for Gentiles", "Baptism", "Sabbath keeping", "Tithing"], answer: 0 },
  { chapter: 16, question: "Who was converted in Philippi after an earthquake?", options: ["The jailer", "Lydia", "Timothy", "Apollos"], answer: 0 },
  { chapter: 17, question: "Where did Paul preach about the 'unknown god'?", options: ["Athens", "Corinth", "Ephesus", "Rome"], answer: 0 },
  { chapter: 18, question: "Who were the tentmakers Paul stayed with in Corinth?", options: ["Aquila and Priscilla", "Ananias and Sapphira", "Barnabas and Silas", "Timothy and Eunice"], answer: 0 },
  { chapter: 19, question: "What happened in Ephesus when Paul preached?", options: ["A riot broke out", "A feast was held", "A temple was built", "A famine occurred"], answer: 0 },
  { chapter: 20, question: "Who fell asleep during Paul's sermon and was raised from the dead?", options: ["Eutychus", "Tychicus", "Timothy", "Silas"], answer: 0 },
  { chapter: 27, question: "What disaster happened to Paul on his way to Rome?", options: ["Shipwreck", "Earthquake", "Fire", "Flood"], answer: 0 },
  { chapter: 28, question: "What happened to Paul on the island of Malta?", options: ["He was bitten by a snake", "He was arrested", "He was crowned king", "He was ignored"], answer: 0 }
];

export default function ActsQuiz() {
  const [selected, setSelected] = useState<(number | null)[]>(Array(actsQuestions.length).fill(null));
  const [showAnswer, setShowAnswer] = useState<boolean[]>(Array(actsQuestions.length).fill(false));
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

  const correctCount = selected.filter((sel, i) => sel !== null && sel === actsQuestions[i].answer).length;
  const wrongCount = selected.filter((sel, i) => sel !== null && sel !== actsQuestions[i].answer).length;
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
              <CardTitle>Acts Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {actsQuestions.map((q, qIdx) => (
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