import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const nextQuizzes = [
  { title: "Haggai Quiz", description: "Learn about rebuilding the temple.", link: "/bible-questions-and-answers-hub/haggai" },
  { title: "Zechariah Quiz", description: "Discover the prophet of visions.", link: "/bible-questions-and-answers-hub/zechariah" },
  { title: "Habakkuk Quiz", description: "Go back to faith in troubled times.", link: "/bible-questions-and-answers-hub/habakkuk" },
  { title: "Nahum Quiz", description: "Continue to the prophecy against Nineveh.", link: "/bible-questions-and-answers-hub/nahum" }
];

const zephaniahQuestions = [
  { chapter: 1, question: "What is the main theme of Zephaniah?", options: ["The day of the Lord", "The exile", "The return", "The temple"], answer: 0 },
  { chapter: 1, question: "What will happen on the day of the Lord?", options: ["Blessing", "Judgment", "Peace", "Restoration"], answer: 1 },
  { chapter: 1, question: "Who will be punished?", options: ["Only Israel", "Only Judah", "All nations", "Only the wicked"], answer: 2 },
  { chapter: 1, question: "What does Zephaniah say about the day of the Lord?", options: ["It is near", "It is far", "It is delayed", "It is cancelled"], answer: 0 },
  { chapter: 1, question: "What does Zephaniah say about the day of the Lord?", options: ["It is bitter", "It is sweet", "It is good", "It is bad"], answer: 0 },
  { chapter: 1, question: "What does Zephaniah say about the day of the Lord?", options: ["It is a day of wrath", "It is a day of peace", "It is a day of joy", "It is a day of rest"], answer: 0 },
  { chapter: 1, question: "What does Zephaniah say about the day of the Lord?", options: ["It is a day of trouble", "It is a day of blessing", "It is a day of hope", "It is a day of love"], answer: 0 },
  { chapter: 1, question: "What does Zephaniah say about the day of the Lord?", options: ["It is a day of distress", "It is a day of comfort", "It is a day of peace", "It is a day of joy"], answer: 0 },
  { chapter: 1, question: "What does Zephaniah say about the day of the Lord?", options: ["It is a day of devastation", "It is a day of building", "It is a day of blessing", "It is a day of hope"], answer: 0 },
  { chapter: 1, question: "What does Zephaniah say about the day of the Lord?", options: ["It is a day of darkness", "It is a day of light", "It is a day of peace", "It is a day of joy"], answer: 0 },
  { chapter: 1, question: "What does Zephaniah say about the day of the Lord?", options: ["It is a day of gloom", "It is a day of brightness", "It is a day of hope", "It is a day of love"], answer: 0 },
  { chapter: 1, question: "What does Zephaniah say about the day of the Lord?", options: ["It is a day of clouds", "It is a day of sunshine", "It is a day of peace", "It is a day of joy"], answer: 0 },
  { chapter: 1, question: "What does Zephaniah say about the day of the Lord?", options: ["It is a day of thick darkness", "It is a day of light", "It is a day of hope", "It is a day of love"], answer: 0 },
  { chapter: 1, question: "What does Zephaniah say about the day of the Lord?", options: ["It is a day of trumpet", "It is a day of silence", "It is a day of peace", "It is a day of joy"], answer: 0 },
  { chapter: 1, question: "What does Zephaniah say about the day of the Lord?", options: ["It is a day of alarm", "It is a day of calm", "It is a day of hope", "It is a day of love"], answer: 0 },
  { chapter: 1, question: "What does Zephaniah say about the day of the Lord?", options: ["It is a day of battle cry", "It is a day of peace", "It is a day of hope", "It is a day of love"], answer: 0 },
  { chapter: 1, question: "What does Zephaniah say about the day of the Lord?", options: ["It is a day of destruction", "It is a day of building", "It is a day of hope", "It is a day of love"], answer: 0 },
  { chapter: 1, question: "What does Zephaniah say about the day of the Lord?", options: ["It is a day of desolation", "It is a day of prosperity", "It is a day of hope", "It is a day of love"], answer: 0 },
  { chapter: 1, question: "What does Zephaniah say about the day of the Lord?", options: ["It is a day of waste", "It is a day of plenty", "It is a day of hope", "It is a day of love"], answer: 0 },
  { chapter: 1, question: "What does Zephaniah say about the day of the Lord?", options: ["It is a day of emptiness", "It is a day of fullness", "It is a day of hope", "It is a day of love"], answer: 0 },
  { chapter: 1, question: "What does Zephaniah say about the day of the Lord?", options: ["It is a day of void", "It is a day of abundance", "It is a day of hope", "It is a day of love"], answer: 0 },
  { chapter: 2, question: "What does Zephaniah call the people to do?", options: ["Rejoice", "Repent", "Fight", "Flee"], answer: 1 },
  { chapter: 2, question: "Which nations are mentioned for judgment?", options: ["Philistia, Moab, Ammon, Cush, Assyria", "Egypt, Babylon, Persia, Greece", "Israel, Judah, Edom, Tyre", "Rome, Greece, Egypt, Babylon"], answer: 0 },
  { chapter: 2, question: "What does Zephaniah say about Philistia?", options: ["It will be destroyed", "It will be blessed", "It will be ignored", "It will be saved"], answer: 0 },
  { chapter: 2, question: "What does Zephaniah say about Moab?", options: ["It will be destroyed", "It will be blessed", "It will be ignored", "It will be saved"], answer: 0 },
  { chapter: 2, question: "What does Zephaniah say about Ammon?", options: ["It will be destroyed", "It will be blessed", "It will be ignored", "It will be saved"], answer: 0 },
  { chapter: 2, question: "What does Zephaniah say about Cush?", options: ["It will be destroyed", "It will be blessed", "It will be ignored", "It will be saved"], answer: 0 },
  { chapter: 2, question: "What does Zephaniah say about Assyria?", options: ["It will be destroyed", "It will be blessed", "It will be ignored", "It will be saved"], answer: 0 },
  { chapter: 3, question: "What does Zephaniah say about Jerusalem?", options: ["It will be destroyed", "It will be restored", "It will be ignored", "It will be cursed"], answer: 1 },
  { chapter: 3, question: "What does God promise to do for the nations?", options: ["Destroy them", "Restore them", "Ignore them", "Curse them"], answer: 1 },
  { chapter: 3, question: "What does God promise to do for his people?", options: ["Destroy them", "Restore them", "Ignore them", "Curse them"], answer: 1 },
  { chapter: 3, question: "What does Zephaniah say about the remnant?", options: ["They will be humble", "They will be proud", "They will be ignored", "They will be cursed"], answer: 0 },
  { chapter: 3, question: "What does Zephaniah say about the remnant?", options: ["They will trust in the Lord", "They will trust in idols", "They will be ignored", "They will be cursed"], answer: 0 },
  { chapter: 3, question: "What does Zephaniah say about the remnant?", options: ["They will do no wrong", "They will do wrong", "They will be ignored", "They will be cursed"], answer: 0 },
  { chapter: 3, question: "What does Zephaniah say about the remnant?", options: ["They will speak no lies", "They will speak lies", "They will be ignored", "They will be cursed"], answer: 0 },
  { chapter: 3, question: "What does Zephaniah say about the remnant?", options: ["They will feed in peace", "They will feed in war", "They will be ignored", "They will be cursed"], answer: 0 },
  { chapter: 3, question: "What does Zephaniah say about the remnant?", options: ["They will lie down", "They will stand up", "They will be ignored", "They will be cursed"], answer: 0 },
  { chapter: 3, question: "What does Zephaniah say about the remnant?", options: ["No one will make them afraid", "They will be afraid", "They will be ignored", "They will be cursed"], answer: 0 },
  { chapter: 3, question: "What does Zephaniah say about the Lord's singing?", options: ["He will sing over them", "He will be silent", "He will ignore them", "He will curse them"], answer: 0 },
  { chapter: 3, question: "What does Zephaniah say about the Lord's rejoicing?", options: ["He will rejoice over them", "He will mourn", "He will ignore them", "He will curse them"], answer: 0 },
  { chapter: 3, question: "What does Zephaniah say about the Lord's quieting?", options: ["He will quiet them with his love", "He will disturb them", "He will ignore them", "He will curse them"], answer: 0 },
  { chapter: 3, question: "What does Zephaniah say about the Lord's exultation?", options: ["He will exult over them with loud singing", "He will be silent", "He will ignore them", "He will curse them"], answer: 0 }
];

export default function ZephaniahQuiz() {
  const [selected, setSelected] = useState<(number | null)[]>(Array(zephaniahQuestions.length).fill(null));
  const [showAnswer, setShowAnswer] = useState<boolean[]>(Array(zephaniahQuestions.length).fill(false));
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

  const correctCount = selected.filter((sel, i) => sel !== null && sel === zephaniahQuestions[i].answer).length;
  const wrongCount = selected.filter((sel, i) => sel !== null && sel !== zephaniahQuestions[i].answer).length;
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
        <div className="flex-1 min-w-0">
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
              <CardTitle>Zephaniah Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {zephaniahQuestions.map((q, qIdx) => (
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