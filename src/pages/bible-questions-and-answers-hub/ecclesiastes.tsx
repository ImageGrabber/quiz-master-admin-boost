import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const nextQuizzes = [
  { title: "Song of Solomon Quiz", description: "Learn about love poetry and allegory.", link: "/bible-questions-and-answers-hub/song-of-solomon" },
  { title: "Proverbs Quiz", description: "Go back to wisdom sayings and teachings.", link: "/bible-questions-and-answers-hub/proverbs" },
  { title: "Psalms Quiz", description: "Review the book of prayers and songs.", link: "/bible-questions-and-answers-hub/psalms" },
  { title: "Job Quiz", description: "Review the story of suffering and faith.", link: "/bible-questions-and-answers-hub/job" }
];

const ecclesiastesQuestions = [
  { chapter: 1, question: "Who was the Teacher?", options: ["David", "Solomon", "Moses", "Isaiah"], answer: 1 },
  { chapter: 1, question: "What did the Teacher say about everything?", options: ["Everything is meaningful", "Everything is meaningless", "Everything is good", "Everything is bad"], answer: 1 },
  { chapter: 1, question: "What does the sun do?", options: ["Stays still", "Rises and sets", "Shines constantly", "Never shines"], answer: 1 },
  { chapter: 1, question: "What do the streams do?", options: ["Stay in one place", "Flow to the sea", "Dry up", "Change direction"], answer: 1 },
  { chapter: 2, question: "What did the Teacher test with pleasure?", options: ["His mind", "His body", "His heart", "All of these"], answer: 3 },
  { chapter: 2, question: "What did the Teacher find about laughter?", options: ["It was good", "It was meaningless", "It was harmful", "It was necessary"], answer: 1 },
  { chapter: 2, question: "What did the Teacher do with wine?", options: ["Avoided it", "Tested it", "Sold it", "Gave it away"], answer: 1 },
  { chapter: 2, question: "What did the Teacher build?", options: ["Houses", "Vineyards", "Gardens", "All of these"], answer: 3 },
  { chapter: 3, question: "What is there a time for?", options: ["Everything", "Nothing", "Some things", "Most things"], answer: 0 },
  { chapter: 3, question: "What is there a time to be born and a time to?", options: ["Live", "Die", "Grow", "Learn"], answer: 1 },
  { chapter: 3, question: "What is there a time to plant and a time to?", options: ["Water", "Harvest", "Uproot", "Fertilize"], answer: 2 },
  { chapter: 3, question: "What is there a time to kill and a time to?", options: ["Live", "Die", "Heal", "Suffer"], answer: 2 },
  { chapter: 3, question: "What is there a time to tear down and a time to?", options: ["Destroy", "Build", "Repair", "Abandon"], answer: 1 },
  { chapter: 4, question: "What did the Teacher see about the oppressed?", options: ["They were happy", "They had no comforter", "They were free", "They were wealthy"], answer: 1 },
  { chapter: 4, question: "What is better than one?", options: ["Two", "Three", "Many", "None"], answer: 0 },
  { chapter: 4, question: "What can a cord of three strands not easily do?", options: ["Be strong", "Be broken", "Be made", "Be seen"], answer: 1 },
  { chapter: 5, question: "What should you do when you go to the house of God?", options: ["Talk a lot", "Listen", "Sleep", "Eat"], answer: 1 },
  { chapter: 5, question: "What should you not be hasty to do?", options: ["Speak", "Listen", "Think", "Act"], answer: 0 },
  { chapter: 5, question: "What should you not make rash vows to?", options: ["God", "Man", "Yourself", "Others"], answer: 0 },
  { chapter: 6, question: "What did the Teacher see under the sun?", options: ["Good things", "Bad things", "An evil", "Nothing"], answer: 2 },
  { chapter: 6, question: "What happens to the man who has everything but no enjoyment?", options: ["He is blessed", "He is cursed", "He is average", "He is unknown"], answer: 1 },
  { chapter: 7, question: "What is better than fine perfume?", options: ["A good name", "Wealth", "Power", "Fame"], answer: 0 },
  { chapter: 7, question: "What is better than the day of birth?", options: ["The day of death", "The day of marriage", "The day of success", "The day of wealth"], answer: 0 },
  { chapter: 7, question: "What is better than a house of feasting?", options: ["A house of mourning", "A house of wealth", "A house of power", "A house of fame"], answer: 0 },
  { chapter: 8, question: "What should you keep?", options: ["The king's command", "Your money", "Your secrets", "Your friends"], answer: 0 },
  { chapter: 8, question: "What does the wise heart know?", options: ["The proper time", "The future", "The past", "Nothing"], answer: 0 },
  { chapter: 8, question: "What did the Teacher see about the wicked?", options: ["They always suffer", "They often prosper", "They never prosper", "They always die young"], answer: 1 },
  { chapter: 9, question: "What happens to the righteous and the wicked?", options: ["The same thing", "Different things", "Nothing", "Everything"], answer: 0 },
  { chapter: 9, question: "What is the fate of all?", options: ["Life", "Death", "Wealth", "Poverty"], answer: 1 },
  { chapter: 9, question: "What is better than a dead lion?", options: ["A living dog", "A dead dog", "A living lion", "A dead cat"], answer: 0 },
  { chapter: 10, question: "What does a little folly outweigh?", options: ["Wisdom", "Understanding", "Knowledge", "Honor"], answer: 3 },
  { chapter: 10, question: "What does a wise man's heart incline him toward?", options: ["Right", "Left", "Forward", "Backward"], answer: 0 },
  { chapter: 10, question: "What does a fool's heart incline him toward?", options: ["Right", "Left", "Forward", "Backward"], answer: 1 },
  { chapter: 11, question: "What should you cast your bread upon?", options: ["The waters", "The land", "The fire", "The wind"], answer: 0 },
  { chapter: 11, question: "What should you give portions to?", options: ["Seven", "Eight", "Nine", "Ten"], answer: 0 },
  { chapter: 11, question: "What should you not know?", options: ["The path of the wind", "The way of life", "The future", "The past"], answer: 0 },
  { chapter: 12, question: "What should you remember in the days of your youth?", options: ["Your Creator", "Your wealth", "Your power", "Your fame"], answer: 0 },
  { chapter: 12, question: "What happens to the sun, moon, and stars?", options: ["They grow brighter", "They grow dimmer", "They stay the same", "They disappear"], answer: 1 },
  { chapter: 12, question: "What happens to the dust?", options: ["It returns to the ground", "It becomes air", "It becomes water", "It disappears"], answer: 0 },
  { chapter: 12, question: "What happens to the spirit?", options: ["It returns to God", "It disappears", "It becomes dust", "It becomes air"], answer: 0 },
  { chapter: 12, question: "What is the conclusion of the matter?", options: ["Fear God", "Get wealth", "Get power", "Get fame"], answer: 0 },
  { chapter: 12, question: "What should you keep?", options: ["God's commands", "Your money", "Your secrets", "Your friends"], answer: 0 },
  { chapter: 12, question: "What will God bring into judgment?", options: ["Everything", "Nothing", "Some things", "Most things"], answer: 0 }
];

export default function EcclesiastesQuiz() {
  const [selected, setSelected] = useState<(number | null)[]>(Array(ecclesiastesQuestions.length).fill(null));
  const [showAnswer, setShowAnswer] = useState<boolean[]>(Array(ecclesiastesQuestions.length).fill(false));
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

  const correctCount = selected.filter((sel, i) => sel !== null && sel === ecclesiastesQuestions[i].answer).length;
  const wrongCount = selected.filter((sel, i) => sel !== null && sel !== ecclesiastesQuestions[i].answer).length;
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
              <CardTitle>Ecclesiastes Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {ecclesiastesQuestions.map((q, qIdx) => (
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