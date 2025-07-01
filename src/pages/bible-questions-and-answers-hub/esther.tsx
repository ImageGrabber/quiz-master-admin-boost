import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const nextQuizzes = [
  { title: "Nehemiah Quiz", description: "Learn about rebuilding Jerusalem's walls.", link: "/bible-questions-and-answers-hub/nehemiah" },
  { title: "Ezra Quiz", description: "Go back to the return from exile.", link: "/bible-questions-and-answers-hub/ezra" },
  { title: "2 Chronicles Quiz", description: "Review the end of the kingdom.", link: "/bible-questions-and-answers-hub/2-chronicles" },
  { title: "1 Chronicles Quiz", description: "Review David's reign.", link: "/bible-questions-and-answers-hub/1-chronicles" }
];

const estherQuestions = [
  { chapter: 1, question: "Who was King Ahasuerus?", options: ["King of Persia", "King of Babylon", "King of Assyria", "King of Egypt"], answer: 0 },
  { chapter: 1, question: "What did Queen Vashti refuse to do?", options: ["Come to the banquet", "Wear her crown", "Dance", "Speak"], answer: 0 },
  { chapter: 1, question: "What happened to Vashti?", options: ["She was killed", "She was divorced", "She was imprisoned", "She was forgiven"], answer: 1 },
  { chapter: 2, question: "Who was Esther's cousin?", options: ["Mordecai", "Haman", "Hegai", "Zeresh"], answer: 0 },
  { chapter: 2, question: "What was Esther's original name?", options: ["Hadassah", "Vashti", "Zeresh", "Hegai"], answer: 0 },
  { chapter: 2, question: "What did Mordecai tell Esther not to reveal?", options: ["Her nationality", "Her family", "Her age", "Her religion"], answer: 0 },
  { chapter: 2, question: "Who became the new queen?", options: ["Vashti", "Esther", "Zeresh", "Hegai"], answer: 1 },
  { chapter: 3, question: "Who was Haman?", options: ["A prince", "A general", "An Agagite", "All of these"], answer: 3 },
  { chapter: 3, question: "Why did Haman hate Mordecai?", options: ["Mordecai wouldn't bow", "Mordecai was poor", "Mordecai was old", "Mordecai was ugly"], answer: 0 },
  { chapter: 3, question: "What did Haman plan to do to all Jews?", options: ["Tax them", "Enslave them", "Kill them", "Exile them"], answer: 2 },
  { chapter: 4, question: "What did Mordecai do when he heard the decree?", options: ["Celebrated", "Prayed", "Tore his clothes", "Fled"], answer: 2 },
  { chapter: 4, question: "What did Esther say about going to the king?", options: ["She would go immediately", "She was afraid", "She refused", "She asked for time"], answer: 1 },
  { chapter: 4, question: "What did Mordecai say would happen if Esther didn't help?", options: ["Nothing", "She would be safe", "Deliverance would come from elsewhere", "The Jews would be saved"], answer: 2 },
  { chapter: 5, question: "What did Esther do when she went to the king?", options: ["Asked for help immediately", "Invited him to a banquet", "Accused Haman", "Cried"], answer: 1 },
  { chapter: 5, question: "What did Haman do when he left the banquet?", options: ["Went home", "Planned revenge", "Was happy", "All of these"], answer: 3 },
  { chapter: 6, question: "What did the king read that night?", options: ["The law", "The chronicles", "A letter", "A prophecy"], answer: 1 },
  { chapter: 6, question: "What did the king discover about Mordecai?", options: ["He was a traitor", "He had saved the king", "He was poor", "He was old"], answer: 1 },
  { chapter: 6, question: "What did Haman think the king wanted to honor?", options: ["Mordecai", "Himself", "Esther", "The Jews"], answer: 1 },
  { chapter: 6, question: "What did Haman have to do for Mordecai?", options: ["Lead him on a horse", "Bow to him", "Give him money", "All of these"], answer: 0 },
  { chapter: 7, question: "What did Esther reveal at the second banquet?", options: ["Her nationality", "Haman's plot", "Mordecai's identity", "The king's secret"], answer: 1 },
  { chapter: 7, question: "What happened to Haman?", options: ["He was forgiven", "He was exiled", "He was hanged", "He was imprisoned"], answer: 2 },
  { chapter: 8, question: "What did Esther ask the king for?", options: ["Money", "Land", "To reverse the decree", "Power"], answer: 2 },
  { chapter: 8, question: "What did the king give Mordecai?", options: ["Haman's house", "Haman's position", "Haman's wealth", "All of these"], answer: 3 },
  { chapter: 9, question: "What did the Jews do on the 13th day?", options: ["Fasted", "Fought their enemies", "Celebrated", "Prayed"], answer: 1 },
  { chapter: 9, question: "What did they do on the 14th and 15th days?", options: ["Fought", "Celebrated", "Fasted", "Worked"], answer: 1 },
  { chapter: 9, question: "What did they call these days?", options: ["Purim", "Passover", "Tabernacles", "Trumpets"], answer: 0 },
  { chapter: 10, question: "What did Mordecai become?", options: ["King", "Prime minister", "Priest", "Prophet"], answer: 1 },
  { chapter: 10, question: "What was Mordecai known for?", options: ["His wealth", "His wisdom", "Seeking the good of his people", "His beauty"], answer: 2 }
];

export default function EstherQuiz() {
  const [selected, setSelected] = useState<(number | null)[]>(Array(estherQuestions.length).fill(null));
  const [showAnswer, setShowAnswer] = useState<boolean[]>(Array(estherQuestions.length).fill(false));
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

  const correctCount = selected.filter((sel, i) => sel !== null && sel === estherQuestions[i].answer).length;
  const wrongCount = selected.filter((sel, i) => sel !== null && sel !== estherQuestions[i].answer).length;
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
              <CardTitle>Esther Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {estherQuestions.map((q, qIdx) => (
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