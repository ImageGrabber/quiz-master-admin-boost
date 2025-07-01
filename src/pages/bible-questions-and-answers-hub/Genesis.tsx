import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const nextQuizzes = [
  {
    title: "Exodus Quiz",
    description: "Test your knowledge of Exodus!",
    link: "/bible-questions-and-answers-hub/exodus"
  },
  {
    title: "Leviticus Quiz",
    description: "Challenge yourself with Leviticus questions.",
    link: "/bible-questions-and-answers-hub/leviticus"
  },
  {
    title: "Numbers Quiz",
    description: "Explore the Book of Numbers in quiz form.",
    link: "/bible-questions-and-answers-hub/numbers"
  },
  {
    title: "Deuteronomy Quiz",
    description: "How well do you know Deuteronomy?",
    link: "/bible-questions-and-answers-hub/deuteronomy"
  }
];

// Sample MCQs for Genesis (1-2 per chapter, 25 total)
const genesisQuestions = [
  {
    chapter: 1,
    question: "What did God create on the first day?",
    options: [
      "The sun, moon, and stars",
      "Light",
      "Land and seas",
      "Animals"
    ],
    answer: 1
  },
  {
    chapter: 1,
    question: "On which day did God create humans?",
    options: [
      "Second day",
      "Fourth day",
      "Sixth day",
      "Seventh day"
    ],
    answer: 2
  },
  {
    chapter: 2,
    question: "What was the name of the garden where God placed Adam?",
    options: [
      "Eden",
      "Bethel",
      "Hebron",
      "Sinai"
    ],
    answer: 0
  },
  {
    chapter: 2,
    question: "From what did God create woman?",
    options: [
      "Dust of the ground",
      "Adam's rib",
      "A tree",
      "A stone"
    ],
    answer: 1
  },
  {
    chapter: 3,
    question: "Who tempted Eve to eat the forbidden fruit?",
    options: [
      "A lion",
      "A serpent",
      "Adam",
      "An angel"
    ],
    answer: 1
  },
  {
    chapter: 3,
    question: "What did Adam and Eve do after eating the fruit?",
    options: [
      "Ran away",
      "Hid from God",
      "Built an altar",
      "Left the garden"
    ],
    answer: 1
  },
  {
    chapter: 4,
    question: "Who was the first murderer in the Bible?",
    options: [
      "Cain",
      "Abel",
      "Lamech",
      "Seth"
    ],
    answer: 0
  },
  {
    chapter: 4,
    question: "What was Cain's occupation?",
    options: [
      "Shepherd",
      "Farmer",
      "Fisherman",
      "Carpenter"
    ],
    answer: 1
  },
  {
    chapter: 5,
    question: "Who was the oldest man mentioned in Genesis?",
    options: [
      "Noah",
      "Methuselah",
      "Adam",
      "Enoch"
    ],
    answer: 1
  },
  {
    chapter: 6,
    question: "Who built the ark?",
    options: [
      "Abraham",
      "Moses",
      "Noah",
      "Jacob"
    ],
    answer: 2
  },
  {
    chapter: 7,
    question: "How many days did it rain during the flood?",
    options: [
      "7 days",
      "20 days",
      "40 days",
      "100 days"
    ],
    answer: 2
  },
  {
    chapter: 8,
    question: "What sign did God give as a promise after the flood?",
    options: [
      "A dove",
      "A rainbow",
      "A star",
      "A pillar of fire"
    ],
    answer: 1
  },
  {
    chapter: 9,
    question: "What was the sign of God's covenant with Noah?",
    options: [
      "Circumcision",
      "Rainbow",
      "Sacrifice",
      "Olive branch"
    ],
    answer: 1
  },
  {
    chapter: 11,
    question: "What did people try to build in Babel?",
    options: [
      "A temple",
      "A city",
      "A tower to heaven",
      "A ship"
    ],
    answer: 2
  },
  {
    chapter: 12,
    question: "Who was called by God to leave his country?",
    options: [
      "Noah",
      "Abraham",
      "Isaac",
      "Jacob"
    ],
    answer: 1
  },
  {
    chapter: 13,
    question: "Who was Abraham's nephew?",
    options: [
      "Esau",
      "Lot",
      "Ishmael",
      "Laban"
    ],
    answer: 1
  },
  {
    chapter: 15,
    question: "What did God promise Abraham?",
    options: [
      "A great nation",
      "A new language",
      "A rainbow",
      "A golden calf"
    ],
    answer: 0
  },
  {
    chapter: 17,
    question: "What was the sign of the covenant with Abraham?",
    options: [
      "Rainbow",
      "Circumcision",
      "Sacrifice",
      "Stone tablets"
    ],
    answer: 1
  },
  {
    chapter: 19,
    question: "Which city was destroyed by fire and brimstone?",
    options: [
      "Jericho",
      "Sodom",
      "Nineveh",
      "Bethel"
    ],
    answer: 1
  },
  {
    chapter: 22,
    question: "Who did Abraham almost sacrifice?",
    options: [
      "Ishmael",
      "Isaac",
      "Jacob",
      "Joseph"
    ],
    answer: 1
  },
  {
    chapter: 25,
    question: "Who were the twin sons of Isaac?",
    options: [
      "Jacob and Esau",
      "Joseph and Benjamin",
      "Cain and Abel",
      "Ephraim and Manasseh"
    ],
    answer: 0
  },
  {
    chapter: 27,
    question: "Who tricked Isaac into giving the blessing?",
    options: [
      "Esau",
      "Jacob",
      "Rebekah",
      "Laban"
    ],
    answer: 1
  },
  {
    chapter: 28,
    question: "What did Jacob see in his dream at Bethel?",
    options: [
      "A burning bush",
      "A ladder to heaven",
      "A rainbow",
      "A golden calf"
    ],
    answer: 1
  },
  {
    chapter: 37,
    question: "Who was sold by his brothers into slavery?",
    options: [
      "Benjamin",
      "Joseph",
      "Judah",
      "Levi"
    ],
    answer: 1
  },
  {
    chapter: 39,
    question: "Who was Joseph falsely accused by?",
    options: [
      "Pharaoh",
      "Potiphar's wife",
      "His brothers",
      "A baker"
    ],
    answer: 1
  },
  {
    chapter: 41,
    question: "What did Joseph interpret for Pharaoh?",
    options: [
      "A dream",
      "A law",
      "A prophecy",
      "A vision"
    ],
    answer: 0
  },
  {
    chapter: 50,
    question: "Who said, 'You meant evil against me, but God meant it for good'?",
    options: [
      "Jacob",
      "Joseph",
      "Pharaoh",
      "Benjamin"
    ],
    answer: 1
  }
];

export default function GenesisQuiz() {
  const [selected, setSelected] = useState<(number | null)[]>(Array(genesisQuestions.length).fill(null));
  const [showAnswer, setShowAnswer] = useState<boolean[]>(Array(genesisQuestions.length).fill(false));
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

  const correctCount = selected.filter((sel, i) => sel !== null && sel === genesisQuestions[i].answer).length;
  const wrongCount = selected.filter((sel, i) => sel !== null && sel !== genesisQuestions[i].answer).length;
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
              <CardTitle>Genesis Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {genesisQuestions.map((q, qIdx) => (
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