import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const nextQuizzes = [
  { title: "Joel Quiz", description: "Learn about the day of the Lord.", link: "/bible-questions-and-answers-hub/joel" },
  { title: "Amos Quiz", description: "Discover the prophet of justice.", link: "/bible-questions-and-answers-hub/amos" },
  { title: "Isaiah Quiz", description: "Go back to the prince of prophets.", link: "/bible-questions-and-answers-hub/isaiah" },
  { title: "Jeremiah Quiz", description: "Continue to the weeping prophet.", link: "/bible-questions-and-answers-hub/jeremiah" }
];

const hoseaQuestions = [
  { chapter: 1, question: "What did God tell Hosea to do?", options: ["Marry a faithful woman", "Marry a promiscuous woman", "Stay single", "Leave the country"], answer: 1 },
  { chapter: 1, question: "What was Hosea's wife's name?", options: ["Gomer", "Ruth", "Esther", "Deborah"], answer: 0 },
  { chapter: 1, question: "What did God name Hosea's first son?", options: ["Jezreel", "Lo-Ruhamah", "Lo-Ammi", "Israel"], answer: 0 },
  { chapter: 1, question: "What does Jezreel mean?", options: ["God sows", "God scatters", "God plants", "God harvests"], answer: 1 },
  { chapter: 1, question: "What did God name Hosea's daughter?", options: ["Jezreel", "Lo-Ruhamah", "Lo-Ammi", "Israel"], answer: 1 },
  { chapter: 1, question: "What does Lo-Ruhamah mean?", options: ["Not loved", "Not pitied", "Not blessed", "Not saved"], answer: 1 },
  { chapter: 1, question: "What did God name Hosea's second son?", options: ["Jezreel", "Lo-Ruhamah", "Lo-Ammi", "Israel"], answer: 2 },
  { chapter: 1, question: "What does Lo-Ammi mean?", options: ["Not my people", "Not my son", "Not my child", "Not my servant"], answer: 0 },
  { chapter: 2, question: "What did God say about Israel?", options: ["She was faithful", "She was unfaithful", "She was wise", "She was foolish"], answer: 1 },
  { chapter: 2, question: "What did Israel say about her lovers?", options: ["They gave her food", "They gave her water", "They gave her wool", "All of these"], answer: 3 },
  { chapter: 2, question: "What did God say he would do to Israel?", options: ["Bless her", "Curse her", "Block her path", "Ignore her"], answer: 2 },
  { chapter: 2, question: "What did God say he would do to Israel's lovers?", options: ["Bless them", "Curse them", "Expose them", "Ignore them"], answer: 2 },
  { chapter: 2, question: "What did God promise to do for Israel?", options: ["Lead her into the wilderness", "Speak tenderly to her", "Give her vineyards", "All of these"], answer: 3 },
  { chapter: 2, question: "What did God promise to betroth Israel to him in?", options: ["Righteousness", "Justice", "Love", "All of these"], answer: 3 },
  { chapter: 3, question: "What did God tell Hosea to do again?", options: ["Love his wife", "Hate his wife", "Leave his wife", "Ignore his wife"], answer: 0 },
  { chapter: 3, question: "What did God say about Israel?", options: ["She was faithful", "She was unfaithful", "She was wise", "She was foolish"], answer: 1 },
  { chapter: 3, question: "What did God say Israel would do?", options: ["Stay with her lovers", "Return to God", "Stay away from God", "Ignore God"], answer: 1 },
  { chapter: 3, question: "What did God say Israel would seek?", options: ["Her lovers", "God", "Her idols", "Her wealth"], answer: 1 },
  { chapter: 4, question: "What did God say about the people?", options: ["They were faithful", "They were unfaithful", "They were wise", "They were foolish"], answer: 1 },
  { chapter: 4, question: "What did God say was lacking?", options: ["Faithfulness", "Love", "Knowledge", "All of these"], answer: 2 },
  { chapter: 4, question: "What did God say about the priests?", options: ["They were good", "They were bad", "They were wise", "They were foolish"], answer: 1 },
  { chapter: 4, question: "What did God say about the people's sins?", options: ["They were few", "They were many", "They were minor", "They were major"], answer: 1 },
  { chapter: 4, question: "What did God say about the people's understanding?", options: ["They had much", "They had little", "They had none", "They had some"], answer: 1 },
  { chapter: 5, question: "What did God say about the priests and Israel?", options: ["They were innocent", "They were guilty", "They were wise", "They were foolish"], answer: 1 },
  { chapter: 5, question: "What did God say about their deeds?", options: ["They were good", "They were bad", "They were hidden", "They were visible"], answer: 1 },
  { chapter: 5, question: "What did God say about their pride?", options: ["It was good", "It was bad", "It was justified", "It was wrong"], answer: 1 },
  { chapter: 5, question: "What did God say about their stumbling?", options: ["It was accidental", "It was intentional", "It was minor", "It was major"], answer: 1 },
  { chapter: 6, question: "What did God say about the people's love?", options: ["It was like the morning mist", "It was like the dew", "Both", "Neither"], answer: 2 },
  { chapter: 6, question: "What did God say about the people's love?", options: ["It was lasting", "It was temporary", "It was deep", "It was shallow"], answer: 1 },
  { chapter: 6, question: "What did God say about the people's knowledge?", options: ["They had much", "They had little", "They had none", "They had some"], answer: 1 },
  { chapter: 6, question: "What did God say about the people's love?", options: ["It was like the morning mist", "It was like the dew", "Both", "Neither"], answer: 2 },
  { chapter: 7, question: "What did God say about Israel's iniquity?", options: ["It was few", "It was many", "It was minor", "It was major"], answer: 1 },
  { chapter: 7, question: "What did God say about Israel's sins?", options: ["They were few", "They were many", "They were minor", "They were major"], answer: 1 },
  { chapter: 7, question: "What did God say about Israel's kings?", options: ["They were good", "They were bad", "They were wise", "They were foolish"], answer: 1 },
  { chapter: 7, question: "What did God say about Israel's princes?", options: ["They were good", "They were bad", "They were wise", "They were foolish"], answer: 1 },
  { chapter: 8, question: "What did God say about Israel's sin?", options: ["It was few", "It was many", "It was minor", "It was major"], answer: 1 },
  { chapter: 8, question: "What did God say about Israel's idols?", options: ["They were good", "They were bad", "They were helpful", "They were harmful"], answer: 1 },
  { chapter: 8, question: "What did God say about Israel's altars?", options: ["They were good", "They were bad", "They were helpful", "They were harmful"], answer: 1 },
  { chapter: 8, question: "What did God say about Israel's kings?", options: ["They were good", "They were bad", "They were wise", "They were foolish"], answer: 1 },
  { chapter: 9, question: "What did God say about Israel's joy?", options: ["It would increase", "It would decrease", "It would end", "It would continue"], answer: 2 },
  { chapter: 9, question: "What did God say about Israel's feasts?", options: ["They would continue", "They would end", "They would increase", "They would decrease"], answer: 1 },
  { chapter: 9, question: "What did God say about Israel's children?", options: ["They would prosper", "They would suffer", "They would be blessed", "They would be cursed"], answer: 1 },
  { chapter: 9, question: "What did God say about Israel's future?", options: ["It would be good", "It would be bad", "It would be uncertain", "It would be bright"], answer: 1 },
  { chapter: 10, question: "What did God say about Israel's vine?", options: ["It was fruitful", "It was unfruitful", "It was good", "It was bad"], answer: 0 },
  { chapter: 10, question: "What did God say about Israel's fruit?", options: ["It was good", "It was bad", "It was plentiful", "It was scarce"], answer: 1 },
  { chapter: 10, question: "What did God say about Israel's heart?", options: ["It was good", "It was bad", "It was divided", "It was whole"], answer: 2 },
  { chapter: 10, question: "What did God say about Israel's altars?", options: ["They would be built", "They would be destroyed", "They would be ignored", "They would be blessed"], answer: 1 },
  { chapter: 11, question: "What did God say about Israel when he was young?", options: ["He loved him", "He hated him", "He ignored him", "He cursed him"], answer: 0 },
  { chapter: 11, question: "What did God say about calling Israel out of Egypt?", options: ["He did it", "He didn't do it", "He planned to do it", "He forgot to do it"], answer: 0 },
  { chapter: 11, question: "What did God said about teaching Israel to walk?", options: ["He did it", "He didn't do it", "He planned to do it", "He forgot to do it"], answer: 0 },
  { chapter: 11, question: "What did God say about healing Israel?", options: ["He did it", "He didn't do it", "He planned to do it", "He forgot to do it"], answer: 0 },
  { chapter: 11, question: "What did God say about his compassion?", options: ["It was stirred", "It was not stirred", "It was gone", "It was weak"], answer: 0 },
  { chapter: 11, question: "What did God say about his anger?", options: ["It was great", "It was not great", "It was gone", "It was weak"], answer: 1 },
  { chapter: 12, question: "What did God say about Ephraim?", options: ["He was good", "He was bad", "He was wise", "He was foolish"], answer: 1 },
  { chapter: 12, question: "What did God say about Judah?", options: ["He was good", "He was bad", "He was wise", "He was foolish"], answer: 1 },
  { chapter: 12, question: "What did God say about Jacob?", options: ["He was good", "He was bad", "He was wise", "He was foolish"], answer: 1 },
  { chapter: 12, question: "What did God say about Israel's deceit?", options: ["It was few", "It was many", "It was minor", "It was major"], answer: 1 },
  { chapter: 13, question: "What did God say about Ephraim's speaking?", options: ["It was good", "It was bad", "It was wise", "It was foolish"], answer: 1 },
  { chapter: 13, question: "What did God say about Ephraim's exaltation?", options: ["It was good", "It was bad", "It was justified", "It was wrong"], answer: 1 },
  { chapter: 13, question: "What did God say about Ephraim's sin?", options: ["It was few", "It was many", "It was minor", "It was major"], answer: 1 },
  { chapter: 13, question: "What did God say about Ephraim's guilt?", options: ["It was few", "It was many", "It was minor", "It was major"], answer: 1 },
  { chapter: 13, question: "What did God say about Ephraim's death?", options: ["It would not happen", "It would happen", "It would be delayed", "It would be quick"], answer: 1 },
  { chapter: 14, question: "What did God tell Israel to do?", options: ["Return to him", "Stay away from him", "Ignore him", "Fight him"], answer: 0 },
  { chapter: 14, question: "What did God say about Israel's iniquity?", options: ["It was few", "It was many", "It was minor", "It was major"], answer: 1 },
  { chapter: 14, question: "What did God promise to heal?", options: ["Their sickness", "Their waywardness", "Their wounds", "All of these"], answer: 3 },
  { chapter: 14, question: "What did God promise to love?", options: ["Them freely", "Them conditionally", "Them temporarily", "Them partially"], answer: 0 },
  { chapter: 14, question: "What did God promise to turn from?", options: ["His anger", "His love", "His mercy", "His grace"], answer: 0 },
  { chapter: 14, question: "What did God promise to be like?", options: ["The dew", "The rain", "The sun", "The wind"], answer: 0 },
  { chapter: 14, question: "What did God promise Israel would blossom?", options: ["Like a lily", "Like a rose", "Like a flower", "Like a tree"], answer: 0 },
  { chapter: 14, question: "What did God promise Israel would be like?", options: ["An olive tree", "A cedar tree", "A palm tree", "A fig tree"], answer: 0 },
  { chapter: 14, question: "What did God promise Israel would have?", options: ["Fragrance", "Beauty", "Strength", "All of these"], answer: 3 }
];

export default function HoseaQuiz() {
  const [selected, setSelected] = useState<(number | null)[]>(Array(hoseaQuestions.length).fill(null));
  const [showAnswer, setShowAnswer] = useState<boolean[]>(Array(hoseaQuestions.length).fill(false));
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

  const correctCount = selected.filter((sel, i) => sel !== null && sel === hoseaQuestions[i].answer).length;
  const wrongCount = selected.filter((sel, i) => sel !== null && sel !== hoseaQuestions[i].answer).length;
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
              <CardTitle>Hosea Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {hoseaQuestions.map((q, qIdx) => (
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