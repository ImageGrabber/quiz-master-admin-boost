import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const nextQuizzes = [
  { title: "Numbers Quiz", description: "Explore the Book of Numbers in quiz form.", link: "/bible-questions-and-answers-hub/numbers" },
  { title: "Deuteronomy Quiz", description: "How well do you know Deuteronomy?", link: "/bible-questions-and-answers-hub/deuteronomy" },
  { title: "Genesis Quiz", description: "Go back to the beginning with Genesis!", link: "/bible-questions-and-answers-hub/genesis" },
  { title: "Exodus Quiz", description: "Test your knowledge of Exodus!", link: "/bible-questions-and-answers-hub/exodus" }
];

const leviticusQuestions = [
  { chapter: 1, question: "What type of offering is described in Leviticus 1?", options: ["Grain offering", "Burnt offering", "Peace offering", "Sin offering"], answer: 1 },
  { chapter: 2, question: "What was not to be included in grain offerings?", options: ["Salt", "Oil", "Yeast", "Incense"], answer: 2 },
  { chapter: 3, question: "Which offering was a symbol of fellowship?", options: ["Burnt offering", "Peace offering", "Guilt offering", "Grain offering"], answer: 1 },
  { chapter: 4, question: "What did the priest do with the blood of the sin offering?", options: ["Poured it on the altar", "Sprinkled it before the Lord", "Drank it", "Burned it"], answer: 1 },
  { chapter: 5, question: "What animal could be offered for a sin offering by the poor?", options: ["Bull", "Goat", "Dove or pigeon", "Sheep"], answer: 2 },
  { chapter: 6, question: "What must be restored if someone deceived a neighbor?", options: ["Double the amount", "The full amount plus a fifth", "Nothing", "Half the amount"], answer: 1 },
  { chapter: 8, question: "Who was the first high priest?", options: ["Moses", "Aaron", "Eleazar", "Joshua"], answer: 1 },
  { chapter: 9, question: "What happened when Aaron blessed the people?", options: ["Fire came from the Lord", "Rain fell", "The ground shook", "A rainbow appeared"], answer: 0 },
  { chapter: 10, question: "Who offered unauthorized fire before the Lord?", options: ["Nadab and Abihu", "Moses and Aaron", "Eleazar and Ithamar", "Joshua and Caleb"], answer: 0 },
  { chapter: 11, question: "Leviticus 11 lists laws about what?", options: ["Sacrifices", "Clean and unclean animals", "Priesthood", "Festivals"], answer: 1 },
  { chapter: 12, question: "What was required after childbirth?", options: ["A burnt offering", "A sin offering", "Both a burnt and a sin offering", "No offering"], answer: 2 },
  { chapter: 13, question: "What disease is discussed in Leviticus 13?", options: ["Leprosy", "Blindness", "Fever", "Plague"], answer: 0 },
  { chapter: 14, question: "What was used in the cleansing of a leper?", options: ["Blood and oil", "Water and ashes", "Hyssop and blood", "Salt and incense"], answer: 2 },
  { chapter: 16, question: "What is the Day of Atonement called?", options: ["Passover", "Yom Kippur", "Pentecost", "Tabernacles"], answer: 1 },
  { chapter: 17, question: "What is forbidden regarding blood?", options: ["Eating it", "Touching it", "Looking at it", "Offering it"], answer: 0 },
  { chapter: 18, question: "Leviticus 18 contains laws about what?", options: ["Clean food", "Sexual relations", "Priesthood", "Sacrifices"], answer: 1 },
  { chapter: 19, question: "What command is found in Leviticus 19:18?", options: ["Love your neighbor as yourself", "Honor your parents", "Keep the Sabbath", "Do not steal"], answer: 0 },
  { chapter: 20, question: "What was the penalty for child sacrifice?", options: ["Exile", "Death", "Fines", "Imprisonment"], answer: 1 },
  { chapter: 23, question: "What are listed in Leviticus 23?", options: ["Sacrifices", "Festivals and feasts", "Priests", "Clean animals"], answer: 1 },
  { chapter: 24, question: "What was to be kept burning continually?", options: ["The altar fire", "The lampstand light", "The incense", "The bread"], answer: 1 },
  { chapter: 25, question: "What is the Year of Jubilee?", options: ["Every 7 years", "Every 50 years", "Every 100 years", "Every 12 years"], answer: 1 },
  { chapter: 26, question: "What would happen if Israel disobeyed God?", options: ["Blessings", "Curses", "Nothing", "Riches"], answer: 1 },
  { chapter: 27, question: "Leviticus 27 deals with what?", options: ["Vows and dedications", "Sacrifices", "Priesthood", "Festivals"], answer: 0 }
];

export default function LeviticusQuiz() {
  const [selected, setSelected] = useState<(number | null)[]>(Array(leviticusQuestions.length).fill(null));
  const [showAnswer, setShowAnswer] = useState<boolean[]>(Array(leviticusQuestions.length).fill(false));
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

  const correctCount = selected.filter((sel, i) => sel !== null && sel === leviticusQuestions[i].answer).length;
  const wrongCount = selected.filter((sel, i) => sel !== null && sel !== leviticusQuestions[i].answer).length;
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
              <CardTitle>Leviticus Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {leviticusQuestions.map((q, qIdx) => (
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