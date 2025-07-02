import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const nextQuizzes = [
  { title: "Lamentations Quiz", description: "Discover the book of sorrows.", link: "/bible-questions-and-answers-hub/lamentations" },
  { title: "Ezekiel Quiz", description: "Learn about the prophet of visions.", link: "/bible-questions-and-answers-hub/ezekiel" },
  { title: "Isaiah Quiz", description: "Go back to the prince of prophets.", link: "/bible-questions-and-answers-hub/isaiah" },
  { title: "Daniel Quiz", description: "Continue to the prophet of dreams.", link: "/bible-questions-and-answers-hub/daniel" }
];

const jeremiahQuestions = [
  { chapter: 1, question: "When did the word of the Lord come to Jeremiah?", options: ["In the days of Josiah", "In the days of Jehoiakim", "In the days of Zedekiah", "In the days of Jehoiachin"], answer: 0 },
  { chapter: 1, question: "What did the Lord say to Jeremiah before he was formed?", options: ["I knew you", "I loved you", "I chose you", "I called you"], answer: 0 },
  { chapter: 1, question: "What did the Lord appoint Jeremiah to be?", options: ["A prophet to the nations", "A king to the nations", "A priest to the nations", "A judge to the nations"], answer: 0 },
  { chapter: 1, question: "What did Jeremiah say about his ability to speak?", options: ["I am eloquent", "I am young", "I am wise", "I am old"], answer: 1 },
  { chapter: 2, question: "What did God remember about Israel?", options: ["Their kindness", "Their devotion", "Their love", "Their faithfulness"], answer: 1 },
  { chapter: 2, question: "What did Israel do with their glory?", options: ["Exchanged it", "Kept it", "Increased it", "Shared it"], answer: 0 },
  { chapter: 2, question: "What did Israel exchange their glory for?", options: ["Gold", "Silver", "Worthless idols", "Land"], answer: 2 },
  { chapter: 3, question: "What did God call Israel?", options: ["Faithful", "Unfaithful", "Wise", "Strong"], answer: 1 },
  { chapter: 3, question: "What did God say about Israel's backsliding?", options: ["It was minor", "It was major", "It was temporary", "It was permanent"], answer: 1 },
  { chapter: 4, question: "What did God tell Israel to do?", options: ["Return to me", "Leave me", "Ignore me", "Fight me"], answer: 0 },
  { chapter: 4, question: "What did God say would come from the north?", options: ["Peace", "War", "Prosperity", "Destruction"], answer: 3 },
  { chapter: 5, question: "What did God say about the people?", options: ["They were righteous", "They were wicked", "They were wise", "They were foolish"], answer: 1 },
  { chapter: 5, question: "What did God say about finding a righteous person?", options: ["There were many", "There were few", "There was one", "There was none"], answer: 2 },
  { chapter: 6, question: "What did God tell the people to do?", options: ["Flee", "Fight", "Stay", "Hide"], answer: 0 },
  { chapter: 6, question: "What was coming from the north?", options: ["Peace", "War", "Prosperity", "Destruction"], answer: 1 },
  { chapter: 7, question: "What did God say about the temple?", options: ["It would save them", "It would not save them", "It would protect them", "It would bless them"], answer: 1 },
  { chapter: 7, question: "What did God require of the people?", options: ["Sacrifices", "Justice", "Temple attendance", "Prayers"], answer: 1 },
  { chapter: 8, question: "What did God say about the people's repentance?", options: ["They would repent", "They would not repent", "They would delay", "They would forget"], answer: 1 },
  { chapter: 8, question: "What did the people say about peace?", options: ["There is no peace", "There is peace", "There will be peace", "There might be peace"], answer: 1 },
  { chapter: 9, question: "What did Jeremiah wish for?", options: ["A head of water", "A head of tears", "A head of wisdom", "A head of strength"], answer: 1 },
  { chapter: 9, question: "What did God say about the people's deceit?", options: ["It was minor", "It was major", "It was temporary", "It was permanent"], answer: 1 },
  { chapter: 10, question: "What did God say about idols?", options: ["They were powerful", "They were worthless", "They were helpful", "They were beautiful"], answer: 1 },
  { chapter: 10, question: "What did God say about himself?", options: ["He was like idols", "He was different from idols", "He was weaker than idols", "He was equal to idols"], answer: 1 },
  { chapter: 11, question: "What did God say about the covenant?", options: ["It was broken", "It was kept", "It was renewed", "It was forgotten"], answer: 0 },
  { chapter: 11, question: "What did the people do with the covenant?", options: ["Kept it", "Broke it", "Renewed it", "Forgot it"], answer: 1 },
  { chapter: 12, question: "What did Jeremiah ask God?", options: ["Why do the wicked prosper?", "Why do the righteous suffer?", "Why do the poor suffer?", "Why do the rich prosper?"], answer: 0 },
  { chapter: 12, question: "What did God say about Jeremiah's future?", options: ["It would be easy", "It would be hard", "It would be prosperous", "It would be peaceful"], answer: 1 },
  { chapter: 13, question: "What did God tell Jeremiah to do with the loincloth?", options: ["Wear it", "Hide it", "Wash it", "Destroy it"], answer: 1 },
  { chapter: 13, question: "What happened to the loincloth?", options: ["It was preserved", "It was ruined", "It was cleaned", "It was lost"], answer: 1 },
  { chapter: 14, question: "What did God say about the drought?", options: ["It would end soon", "It would continue", "It would get worse", "It would be replaced by rain"], answer: 1 },
  { chapter: 14, question: "What did the people do during the drought?", options: ["Prayed", "Repented", "Sought other gods", "All of these"], answer: 3 },
  { chapter: 15, question: "What did God say about Moses and Samuel?", options: ["They would intercede", "They would not intercede", "They would be ignored", "They would be punished"], answer: 1 },
  { chapter: 15, question: "What did God say about the people?", options: ["They would be saved", "They would be destroyed", "They would be exiled", "They would be blessed"], answer: 2 },
  { chapter: 16, question: "What did God tell Jeremiah not to do?", options: ["Marry", "Have children", "Both", "Neither"], answer: 2 },
  { chapter: 16, question: "What did God say about the people's future?", options: ["They would prosper", "They would suffer", "They would be exiled", "They would be destroyed"], answer: 2 },
  { chapter: 17, question: "What did God say about the heart?", options: ["It was pure", "It was deceitful", "It was wise", "It was foolish"], answer: 1 },
  { chapter: 17, question: "What did God say about the heart?", options: ["It was trustworthy", "It was untrustworthy", "It was strong", "It was weak"], answer: 1 },
  { chapter: 18, question: "What did God compare himself to?", options: ["A potter", "A farmer", "A shepherd", "A king"], answer: 0 },
  { chapter: 18, question: "What did God say about the clay?", options: ["It was in his hand", "It was on the wheel", "It was being shaped", "All of these"], answer: 3 },
  { chapter: 19, question: "What did God tell Jeremiah to buy?", options: ["A pot", "A jar", "A vessel", "A container"], answer: 1 },
  { chapter: 19, question: "What did God say would happen to the jar?", options: ["It would be preserved", "It would be broken", "It would be filled", "It would be empty"], answer: 1 },
  { chapter: 20, question: "What did Pashhur do to Jeremiah?", options: ["Beat him", "Imprisoned him", "Both", "Neither"], answer: 2 },
  { chapter: 20, question: "What did Jeremiah say about God's word?", options: ["It was easy to speak", "It was hard to speak", "It was forbidden to speak", "It was optional to speak"], answer: 1 },
  { chapter: 20, question: "What did Jeremiah say about God's word?", options: ["It was like fire", "It was like water", "It was like wind", "It was like earth"], answer: 0 },
  { chapter: 23, question: "What did God promise to raise up?", options: ["A righteous Branch", "A mighty king", "A powerful army", "A wise counselor"], answer: 0 },
  { chapter: 23, question: "What will the Branch be called?", options: ["The Lord Our Righteousness", "The Lord Our Savior", "The Lord Our King", "The Lord Our God"], answer: 0 },
  { chapter: 25, question: "How many years did Jeremiah prophesy?", options: ["20 years", "23 years", "25 years", "30 years"], answer: 1 },
  { chapter: 25, question: "What did God say about the nations?", options: ["They would prosper", "They would be destroyed", "They would be blessed", "They would be saved"], answer: 1 },
  { chapter: 26, question: "What did the priests and prophets want to do to Jeremiah?", options: ["Praise him", "Kill him", "Ignore him", "Follow him"], answer: 1 },
  { chapter: 26, question: "What did the officials say about Jeremiah?", options: ["He deserved death", "He did not deserve death", "He should be imprisoned", "He should be exiled"], answer: 1 },
  { chapter: 29, question: "What did God tell the exiles to do?", options: ["Rebel", "Build houses", "Plant gardens", "All of these"], answer: 3 },
  { chapter: 29, question: "What did God say about the exiles' future?", options: ["They would never return", "They would return after 70 years", "They would return soon", "They would return when they wanted"], answer: 1 },
  { chapter: 31, question: "What did God promise to make with Israel?", options: ["A new covenant", "A new law", "A new temple", "A new kingdom"], answer: 0 },
  { chapter: 31, question: "What did God say about the new covenant?", options: ["It would be like the old", "It would be different", "It would be written on stone", "It would be written on hearts"], answer: 3 },
  { chapter: 32, question: "What did Jeremiah buy?", options: ["A house", "A field", "A vineyard", "A garden"], answer: 1 },
  { chapter: 32, question: "Why did Jeremiah buy the field?", options: ["For profit", "For investment", "As a sign", "For farming"], answer: 2 },
  { chapter: 33, question: "What did God promise to restore?", options: ["The fortunes of Judah", "The fortunes of Israel", "Both", "Neither"], answer: 2 },
  { chapter: 33, question: "What did God promise to raise up?", options: ["A righteous Branch", "A mighty king", "A powerful army", "A wise counselor"], answer: 0 },
  { chapter: 36, question: "What did God tell Jeremiah to do?", options: ["Write a scroll", "Speak to the people", "Go to the temple", "All of these"], answer: 3 },
  { chapter: 36, question: "What did Jehoiakim do with the scroll?", options: ["Read it", "Burned it", "Kept it", "Lost it"], answer: 1 },
  { chapter: 38, question: "What did the officials want to do to Jeremiah?", options: ["Praise him", "Kill him", "Ignore him", "Follow him"], answer: 1 },
  { chapter: 38, question: "Where did they put Jeremiah?", options: ["In prison", "In a cistern", "In exile", "In hiding"], answer: 1 },
  { chapter: 39, question: "What happened to Jerusalem?", options: ["It was saved", "It was captured", "It was destroyed", "It was rebuilt"], answer: 1 },
  { chapter: 39, question: "What happened to Zedekiah?", options: ["He escaped", "He was killed", "He was captured", "He surrendered"], answer: 2 },
  { chapter: 40, question: "What did Nebuzaradan offer Jeremiah?", options: ["Death", "Freedom", "Imprisonment", "Exile"], answer: 1 },
  { chapter: 40, question: "Where did Jeremiah choose to go?", options: ["Babylon", "Egypt", "Stay in Judah", "Another country"], answer: 2 },
  { chapter: 42, question: "What did the people ask Jeremiah to do?", options: ["Pray for them", "Lead them", "Leave them", "Curse them"], answer: 0 },
  { chapter: 42, question: "What did God tell them to do?", options: ["Stay in Judah", "Go to Egypt", "Go to Babylon", "Go anywhere"], answer: 0 },
  { chapter: 44, question: "What did the people do?", options: ["Stayed in Judah", "Went to Egypt", "Went to Babylon", "Went to another country"], answer: 1 },
  { chapter: 44, question: "What did they continue to do in Egypt?", options: ["Worship God", "Worship idols", "Both", "Neither"], answer: 1 },
  { chapter: 46, question: "What did God say about Egypt?", options: ["It would prosper", "It would be defeated", "It would be blessed", "It would be saved"], answer: 1 },
  { chapter: 46, question: "What did God say about Babylon?", options: ["It would be defeated", "It would conquer Egypt", "It would be destroyed", "It would be blessed"], answer: 1 },
  { chapter: 50, question: "What did God say about Babylon?", options: ["It would prosper", "It would be destroyed", "It would be blessed", "It would be saved"], answer: 1 },
  { chapter: 50, question: "What did God promise to do for Israel?", options: ["Destroy them", "Save them", "Ignore them", "Curse them"], answer: 1 },
  { chapter: 51, question: "What did God say about Babylon's destruction?", options: ["It would be partial", "It would be complete", "It would be temporary", "It would be delayed"], answer: 1 },
  { chapter: 51, question: "What did God say about Babylon's gods?", options: ["They would save Babylon", "They would be destroyed", "They would be ignored", "They would be worshiped"], answer: 1 },
  { chapter: 52, question: "What happened to Jerusalem?", options: ["It was saved", "It was captured", "It was destroyed", "It was rebuilt"], answer: 2 },
  { chapter: 52, question: "What happened to the temple?", options: ["It was preserved", "It was burned", "It was looted", "It was destroyed"], answer: 1 }
];

export default function JeremiahQuiz() {
  const [selected, setSelected] = useState<(number | null)[]>(Array(jeremiahQuestions.length).fill(null));
  const [showAnswer, setShowAnswer] = useState<boolean[]>(Array(jeremiahQuestions.length).fill(false));
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

  const correctCount = selected.filter((sel, i) => sel !== null && sel === jeremiahQuestions[i].answer).length;
  const wrongCount = selected.filter((sel, i) => sel !== null && sel !== jeremiahQuestions[i].answer).length;
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
              <CardTitle>Jeremiah Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {jeremiahQuestions.map((q, qIdx) => (
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