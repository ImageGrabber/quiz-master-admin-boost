import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const nextQuizzes = [
  { title: "Ezra Quiz", description: "Learn about the return from exile.", link: "/bible-questions-and-answers-hub/ezra" },
  { title: "Nehemiah Quiz", description: "Discover the rebuilding of Jerusalem's walls.", link: "/bible-questions-and-answers-hub/nehemiah" },
  { title: "1 Chronicles Quiz", description: "Go back to David's reign.", link: "/bible-questions-and-answers-hub/1-chronicles" },
  { title: "2 Kings Quiz", description: "Review the end of the kingdom.", link: "/bible-questions-and-answers-hub/2-kings" }
];

const secondChroniclesQuestions = [
  { chapter: 1, question: "What did Solomon ask God for?", options: ["Wealth", "Wisdom", "Long life", "Victory"], answer: 1 },
  { chapter: 1, question: "How many burnt offerings did Solomon offer at Gibeon?", options: ["100", "500", "1000", "2000"], answer: 2 },
  { chapter: 2, question: "Who helped Solomon build the temple?", options: ["Hiram of Tyre", "Pharaoh", "The Philistines", "The Ammonites"], answer: 0 },
  { chapter: 3, question: "Where was the temple built?", options: ["Mount Sinai", "Mount Moriah", "Mount Carmel", "Mount Zion"], answer: 1 },
  { chapter: 4, question: "What was the Sea of cast metal used for?", options: ["Drinking", "Washing", "Sacrifices", "Decoration"], answer: 1 },
  { chapter: 5, question: "What happened when the Ark was brought into the temple?", options: ["Fire came down", "The cloud filled the temple", "Earthquake", "Nothing"], answer: 1 },
  { chapter: 6, question: "What did Solomon pray for in his dedication prayer?", options: ["Wealth", "Victory", "Forgiveness", "Wisdom"], answer: 2 },
  { chapter: 7, question: "What did God promise Solomon about the temple?", options: ["It would last forever", "His eyes would be there", "It would be destroyed", "It would be moved"], answer: 1 },
  { chapter: 8, question: "How many years did it take to build the temple?", options: ["5 years", "7 years", "10 years", "13 years"], answer: 1 },
  { chapter: 9, question: "Who came to test Solomon with hard questions?", options: ["The Queen of Sheba", "The Queen of Egypt", "The Queen of Ethiopia", "The Queen of Arabia"], answer: 0 },
  { chapter: 10, question: "Who succeeded Solomon as king?", options: ["Rehoboam", "Jeroboam", "Abijah", "Asa"], answer: 0 },
  { chapter: 10, question: "What did Rehoboam say to the people about his rule?", options: ["I will be kind", "I will be harsh", "I will be fair", "I will be weak"], answer: 1 },
  { chapter: 11, question: "Which tribes remained loyal to Rehoboam?", options: ["Judah and Benjamin", "Ephraim and Manasseh", "Dan and Naphtali", "All tribes"], answer: 0 },
  { chapter: 12, question: "Who invaded Judah during Rehoboam's reign?", options: ["Egypt", "Assyria", "Babylon", "Syria"], answer: 0 },
  { chapter: 13, question: "Who was Abijah's father?", options: ["Rehoboam", "Jeroboam", "Asa", "Jehoshaphat"], answer: 0 },
  { chapter: 14, question: "Who was Asa's father?", options: ["Rehoboam", "Abijah", "Jehoshaphat", "Jehoram"], answer: 1 },
  { chapter: 14, question: "What did Asa do that was good?", options: ["Removed idols", "Built temples", "Made alliances", "Collected taxes"], answer: 0 },
  { chapter: 15, question: "What did Asa remove from the land?", options: ["Foreign gods", "The high places", "The altars", "All of these"], answer: 3 },
  { chapter: 16, question: "What did Asa do when Baasha threatened him?", options: ["Prayed", "Made an alliance with Syria", "Fought", "Surrendered"], answer: 1 },
  { chapter: 17, question: "Who was Jehoshaphat's father?", options: ["Asa", "Abijah", "Rehoboam", "Solomon"], answer: 0 },
  { chapter: 17, question: "What did Jehoshaphat do to teach the people?", options: ["Built schools", "Sent teachers", "Wrote books", "Made laws"], answer: 1 },
  { chapter: 18, question: "Who was Ahab's wife?", options: ["Jezebel", "Athaliah", "Zibiah", "Abigail"], answer: 0 },
  { chapter: 19, question: "What did Jehoshaphat appoint in the cities?", options: ["Judges", "Priests", "Warriors", "Tax collectors"], answer: 0 },
  { chapter: 20, question: "What did Jehoshaphat do when enemies attacked?", options: ["Fought", "Prayed", "Fled", "Surrendered"], answer: 1 },
  { chapter: 20, question: "What happened to the enemies of Judah?", options: ["They were defeated", "They killed each other", "They fled", "They surrendered"], answer: 1 },
  { chapter: 21, question: "Who was Jehoram's father?", options: ["Jehoshaphat", "Asa", "Abijah", "Rehoboam"], answer: 0 },
  { chapter: 21, question: "What did Jehoram do to his brothers?", options: ["Killed them", "Exiled them", "Made them servants", "Shared power"], answer: 0 },
  { chapter: 22, question: "Who was Ahaziah's mother?", options: ["Jezebel", "Athaliah", "Zibiah", "Abigail"], answer: 1 },
  { chapter: 22, question: "How long did Ahaziah reign?", options: ["1 year", "2 years", "3 years", "4 years"], answer: 0 },
  { chapter: 23, question: "Who was Joash's father?", options: ["Ahaziah", "Jehoram", "Jehoshaphat", "Asa"], answer: 0 },
  { chapter: 23, question: "Who hid Joash from Athaliah?", options: ["Jehoiada", "Jehosheba", "The priests", "The people"], answer: 1 },
  { chapter: 24, question: "How old was Joash when he became king?", options: ["5 years", "6 years", "7 years", "8 years"], answer: 2 },
  { chapter: 24, question: "What did Joash do with the temple money?", options: ["Stole it", "Used it for repairs", "Gave it to the poor", "Buried it"], answer: 1 },
  { chapter: 25, question: "Who was Amaziah's father?", options: ["Joash", "Jehoash", "Ahaziah", "Jehoram"], answer: 0 },
  { chapter: 25, question: "What did Amaziah do to the Edomites?", options: ["Made peace", "Defeated them", "Married them", "Traded with them"], answer: 1 },
  { chapter: 26, question: "Who was Uzziah's father?", options: ["Amaziah", "Joash", "Ahaziah", "Jehoram"], answer: 0 },
  { chapter: 26, question: "What happened to Uzziah when he offered incense?", options: ["He was blessed", "He became leprous", "He died", "Nothing"], answer: 1 },
  { chapter: 27, question: "Who was Jotham's father?", options: ["Uzziah", "Amaziah", "Joash", "Ahaziah"], answer: 0 },
  { chapter: 28, question: "Who was Ahaz's father?", options: ["Jotham", "Uzziah", "Hezekiah", "Manasseh"], answer: 0 },
  { chapter: 28, question: "What did Ahaz do that was evil?", options: ["Worshiped idols", "Sacrificed children", "Closed the temple", "All of these"], answer: 3 },
  { chapter: 29, question: "Who was Hezekiah's father?", options: ["Ahaz", "Jotham", "Uzziah", "Manasseh"], answer: 0 },
  { chapter: 29, question: "What did Hezekiah do in the first month of his reign?", options: ["Opened the temple", "Removed idols", "Made sacrifices", "All of these"], answer: 3 },
  { chapter: 30, question: "What did Hezekiah invite people to celebrate?", options: ["Passover", "Tabernacles", "Pentecost", "Trumpets"], answer: 0 },
  { chapter: 31, question: "What did Hezekiah organize for the priests and Levites?", options: ["Their duties", "Their pay", "Their housing", "All of these"], answer: 3 },
  { chapter: 32, question: "Who threatened Jerusalem during Hezekiah's reign?", options: ["Assyria", "Babylon", "Egypt", "Syria"], answer: 0 },
  { chapter: 32, question: "What did Hezekiah do to prepare for the siege?", options: ["Built walls", "Stored water", "Made weapons", "All of these"], answer: 3 },
  { chapter: 33, question: "Who was Manasseh's father?", options: ["Hezekiah", "Ahaz", "Jotham", "Uzziah"], answer: 0 },
  { chapter: 33, question: "How long did Manasseh reign?", options: ["22 years", "35 years", "45 years", "55 years"], answer: 3 },
  { chapter: 34, question: "Who was Josiah's father?", options: ["Amon", "Manasseh", "Hezekiah", "Jehoahaz"], answer: 0 },
  { chapter: 34, question: "What was found in the temple during Josiah's reign?", options: ["Gold", "The Book of the Law", "Weapons", "Idols"], answer: 1 },
  { chapter: 35, question: "What did Josiah celebrate that had not been done since Samuel?", options: ["Passover", "Tabernacles", "Pentecost", "Trumpets"], answer: 0 },
  { chapter: 36, question: "Who was the last king of Judah?", options: ["Jehoiakim", "Jehoiachin", "Zedekiah", "Josiah"], answer: 2 },
  { chapter: 36, question: "What happened to the temple?", options: ["It was repaired", "It was destroyed", "It was moved", "It was expanded"], answer: 1 }
];

export default function SecondChroniclesQuiz() {
  const [selected, setSelected] = useState<(number | null)[]>(Array(secondChroniclesQuestions.length).fill(null));
  const [showAnswer, setShowAnswer] = useState<boolean[]>(Array(secondChroniclesQuestions.length).fill(false));
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

  const correctCount = selected.filter((sel, i) => sel !== null && sel === secondChroniclesQuestions[i].answer).length;
  const wrongCount = selected.filter((sel, i) => sel !== null && sel !== secondChroniclesQuestions[i].answer).length;
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
              <CardTitle>2 Chronicles Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {secondChroniclesQuestions.map((q, qIdx) => (
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