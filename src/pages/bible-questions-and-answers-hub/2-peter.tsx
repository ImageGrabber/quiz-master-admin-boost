import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const nextQuizzes = [
  { title: "1 Peter Quiz", description: "Go back to Peter's first letter.", link: "/bible-questions-and-answers-hub/1-peter" },
  { title: "1 John Quiz", description: "Continue to John's first letter.", link: "/bible-questions-and-answers-hub/1-john" },
  { title: "James Quiz", description: "Review the Book of James.", link: "/bible-questions-and-answers-hub/james" }
];

const secondPeterQuestions = [
  { chapter: 1, question: "Who wrote the Book of 2 Peter?", options: ["Peter", "Paul", "John", "James"], answer: 0 },
  { chapter: 1, question: "What does Peter say God has given us?", options: ["All things that pertain to life and godliness", "Riches", "Fame", "Power"], answer: 0 },
  { chapter: 1, question: "What are believers called to add to their faith?", options: ["Virtue, knowledge, self-control, perseverance, godliness, brotherly kindness, love", "Money", "Fame", "Power"], answer: 0 },
  { chapter: 1, question: "What does Peter say about being nearsighted?", options: ["They have forgotten they were cleansed from past sins", "They are wise", "They are blessed", "They are strong"], answer: 0 },
  { chapter: 1, question: "What does Peter say about prophecy?", options: ["No prophecy of Scripture comes from someone's own interpretation", "It is private", "It is secret", "It is lost"], answer: 0 },
  { chapter: 2, question: "What does Peter warn about false prophets?", options: ["They will secretly bring in destructive heresies", "They will bless the church", "They will help everyone", "They will be ignored"], answer: 0 },
  { chapter: 2, question: "What does Peter say about the angels who sinned?", options: ["They were cast into hell", "They were forgiven", "They were ignored", "They were blessed"], answer: 0 },
  { chapter: 2, question: "Who was rescued from Sodom and Gomorrah?", options: ["Lot", "Abraham", "Moses", "David"], answer: 0 },
  { chapter: 2, question: "What does Peter say about Balaam?", options: ["He loved the wages of unrighteousness", "He was faithful", "He was wise", "He was a prophet"], answer: 0 },
  { chapter: 2, question: "What does Peter say about those who escape the defilements of the world?", options: ["If they are entangled again, their last state is worse than the first", "They are always safe", "They are always blessed", "They are always strong"], answer: 0 },
  { chapter: 3, question: "What does Peter say about the last days?", options: ["Scoffers will come, following their own sinful desires", "It will be peaceful", "It will be easy", "It will be joyful"], answer: 0 },
  { chapter: 3, question: "What do scoffers say about Christ's coming?", options: ["Where is the promise of his coming?", "He is coming soon", "He is already here", "He will never come"], answer: 0 },
  { chapter: 3, question: "What does Peter say about the Lord's timing?", options: ["With the Lord one day is as a thousand years, and a thousand years as one day", "He is always on time", "He is late", "He is early"], answer: 0 },
  { chapter: 3, question: "Why has the Lord not returned yet?", options: ["He is patient, not wishing any should perish", "He is slow", "He is busy", "He is waiting for a sign"], answer: 0 },
  { chapter: 3, question: "What will happen to the heavens and earth?", options: ["They will pass away with a roar", "They will last forever", "They will be renewed", "They will be ignored"], answer: 0 },
  { chapter: 3, question: "What kind of people ought believers to be?", options: ["Lives of holiness and godliness", "Worldly", "Careless", "Indifferent"], answer: 0 },
  { chapter: 3, question: "What does Peter say about the day of the Lord?", options: ["It will come like a thief", "It will be announced", "It will be delayed", "It will be ignored"], answer: 0 },
  { chapter: 3, question: "What are believers waiting for?", options: ["New heavens and a new earth", "Old earth", "Old heavens", "Nothing"], answer: 0 },
  { chapter: 3, question: "What does Peter say about Paul's letters?", options: ["Some things are hard to understand", "They are easy", "They are short", "They are confusing"], answer: 0 },
  { chapter: 3, question: "What does Peter warn about being carried away?", options: ["By the error of lawless people", "By the truth", "By the wise", "By the strong"], answer: 0 },
  { chapter: 3, question: "What does Peter encourage believers to grow in?", options: ["Grace and knowledge of our Lord and Savior Jesus Christ", "Wealth", "Fame", "Power"], answer: 0 },
  { chapter: 1, question: "What does Peter say about making your calling and election sure?", options: ["If you do these things you will never stumble", "It is impossible", "It is easy", "It is unnecessary"], answer: 0 },
  { chapter: 1, question: "What does Peter say about the prophetic word?", options: ["It is more fully confirmed", "It is less confirmed", "It is confusing", "It is ignored"], answer: 0 },
  { chapter: 2, question: "What does Peter say about false teachers?", options: ["They will exploit you with false words", "They will bless you", "They will help you", "They will ignore you"], answer: 0 },
  { chapter: 2, question: "What does Peter say about the righteous?", options: ["The Lord knows how to rescue the godly from trials", "They are always safe", "They are always strong", "They are always wise"], answer: 0 }
];

export default function SecondPeterQuiz() {
  const [selected, setSelected] = useState<(number | null)[]>(Array(secondPeterQuestions.length).fill(null));
  const [showAnswer, setShowAnswer] = useState<boolean[]>(Array(secondPeterQuestions.length).fill(false));
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

  const correctCount = selected.filter((sel, i) => sel !== null && sel === secondPeterQuestions[i].answer).length;
  const wrongCount = selected.filter((sel, i) => sel !== null && sel !== secondPeterQuestions[i].answer).length;
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
              <CardTitle>2 Peter Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {secondPeterQuestions.map((q, qIdx) => (
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