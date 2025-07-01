import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const nextQuizzes = [
  { title: "Ruth Quiz", description: "Explore the beautiful story of Ruth.", link: "/bible-questions-and-answers-hub/ruth" },
  { title: "1 Samuel Quiz", description: "Learn about Samuel, Saul, and David.", link: "/bible-questions-and-answers-hub/1-samuel" },
  { title: "Joshua Quiz", description: "Go back to the conquest of Canaan.", link: "/bible-questions-and-answers-hub/joshua" },
  { title: "Deuteronomy Quiz", description: "Review the Law before the conquest.", link: "/bible-questions-and-answers-hub/deuteronomy" }
];

const judgesQuestions = [
  { chapter: 1, question: "Who asked for a blessing and received springs of water?", options: ["Caleb", "Othniel", "Achsah", "Deborah"], answer: 2 },
  { chapter: 2, question: "What did the Israelites do after Joshua died?", options: ["Served the Lord", "Forsook the Lord", "Built cities", "Made peace"], answer: 1 },
  { chapter: 3, question: "Who was the first judge of Israel?", options: ["Ehud", "Othniel", "Shamgar", "Deborah"], answer: 1 },
  { chapter: 3, question: "How did Ehud kill Eglon king of Moab?", options: ["With a sword", "With a dagger", "With poison", "With a spear"], answer: 1 },
  { chapter: 4, question: "Who was the only female judge mentioned in Judges?", options: ["Jael", "Deborah", "Ruth", "Esther"], answer: 1 },
  { chapter: 4, question: "Who killed Sisera with a tent peg?", options: ["Deborah", "Jael", "Barak", "Heber"], answer: 1 },
  { chapter: 5, question: "What is Judges 5 called?", options: ["The Song of Deborah", "The Song of Moses", "The Song of David", "The Song of Miriam"], answer: 0 },
  { chapter: 6, question: "Who was called by an angel while threshing wheat?", options: ["Gideon", "Samson", "Jephthah", "Barak"], answer: 0 },
  { chapter: 6, question: "What sign did Gideon ask for with the fleece?", options: ["Rain", "Dew", "Fire", "Wind"], answer: 1 },
  { chapter: 7, question: "How many men did God reduce Gideon's army to?", options: ["300", "3,000", "30,000", "300,000"], answer: 0 },
  { chapter: 8, question: "What did Gideon make that became a snare to Israel?", options: ["A golden calf", "An ephod", "A tower", "A temple"], answer: 1 },
  { chapter: 9, question: "Who was Abimelech's father?", options: ["Gideon", "Jotham", "Jephthah", "Samson"], answer: 0 },
  { chapter: 10, question: "Who was the judge after Abimelech?", options: ["Tola", "Jair", "Jephthah", "Ibzan"], answer: 0 },
  { chapter: 11, question: "Who made a rash vow about his daughter?", options: ["Jephthah", "Ibzan", "Elon", "Abdon"], answer: 0 },
  { chapter: 12, question: "What was the shibboleth test for?", options: ["Identifying spies", "Testing loyalty", "Distinguishing tribes", "Proving strength"], answer: 2 },
  { chapter: 13, question: "Who was Samson's father?", options: ["Manoah", "Dan", "Zorah", "Eshtaol"], answer: 0 },
  { chapter: 13, question: "What was Samson's Nazirite vow about?", options: ["Not cutting his hair", "Not drinking wine", "Not touching dead bodies", "All of these"], answer: 3 },
  { chapter: 14, question: "What did Samson kill with his bare hands?", options: ["A bear", "A lion", "A bear and a lion", "A giant"], answer: 1 },
  { chapter: 15, question: "What weapon did Samson use to kill 1,000 Philistines?", options: ["A sword", "A jawbone", "A sling", "A spear"], answer: 1 },
  { chapter: 16, question: "Who betrayed Samson to the Philistines?", options: ["Delilah", "His wife", "His mother", "His sister"], answer: 0 },
  { chapter: 16, question: "How did Samson die?", options: ["In battle", "Of old age", "Pulling down a temple", "In prison"], answer: 2 },
  { chapter: 17, question: "Who made a graven image and an ephod?", options: ["Micah", "Dan", "Levi", "Ephraim"], answer: 0 },
  { chapter: 18, question: "Which tribe stole Micah's idols?", options: ["Dan", "Benjamin", "Judah", "Ephraim"], answer: 0 },
  { chapter: 19, question: "What happened to the Levite's concubine?", options: ["She died", "She ran away", "She was kidnapped", "She was sold"], answer: 0 },
  { chapter: 20, question: "Which tribe was almost wiped out in civil war?", options: ["Benjamin", "Dan", "Ephraim", "Judah"], answer: 0 },
  { chapter: 21, question: "How did the other tribes provide wives for Benjamin?", options: ["They kidnapped them", "They made peace", "They gave their daughters", "They found foreigners"], answer: 0 }
];

export default function JudgesQuiz() {
  const [selected, setSelected] = useState<(number | null)[]>(Array(judgesQuestions.length).fill(null));
  const [showAnswer, setShowAnswer] = useState<boolean[]>(Array(judgesQuestions.length).fill(false));
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

  const correctCount = selected.filter((sel, i) => sel !== null && sel === judgesQuestions[i].answer).length;
  const wrongCount = selected.filter((sel, i) => sel !== null && sel !== judgesQuestions[i].answer).length;
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
              <CardTitle>Judges Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {judgesQuestions.map((q, qIdx) => (
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