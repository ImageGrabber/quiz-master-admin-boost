import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const nextQuizzes = [
  { title: "Malachi Quiz", description: "Learn about the last prophet.", link: "/bible-questions-and-answers-hub/malachi" },
  { title: "Haggai Quiz", description: "Go back to rebuilding the temple.", link: "/bible-questions-and-answers-hub/haggai" },
  { title: "Zephaniah Quiz", description: "Continue to the day of the Lord.", link: "/bible-questions-and-answers-hub/zephaniah" }
];

const zechariahQuestions = [
  { chapter: 1, question: "What did Zechariah see among the myrtle trees?", options: ["A man on a red horse", "A golden lampstand", "A flying scroll", "A chariot"], answer: 0 },
  { chapter: 1, question: "What did the man on the red horse say about the earth?", options: ["It was at rest", "It was in turmoil", "It was blessed", "It was cursed"], answer: 0 },
  { chapter: 1, question: "What did the Lord say about His anger with the nations?", options: ["It was great", "It was little", "It was justified", "It was wrong"], answer: 0 },
  { chapter: 1, question: "What did the Lord say about His anger with Jerusalem?", options: ["It was great", "It was little", "It was justified", "It was wrong"], answer: 0 },
  { chapter: 1, question: "What did the Lord say about the nations that helped?", options: ["They would be blessed", "They would be punished", "They would be ignored", "They would be saved"], answer: 1 },
  { chapter: 1, question: "What did the Lord say about His house?", options: ["It would be built", "It would be destroyed", "It would be ignored", "It would be cursed"], answer: 0 },
  { chapter: 1, question: "What did the Lord say about His cities?", options: ["They would prosper", "They would be destroyed", "They would be ignored", "They would be cursed"], answer: 0 },
  { chapter: 1, question: "What did the Lord say about His comfort?", options: ["It would be given", "It would be withheld", "It would be ignored", "It would be cursed"], answer: 0 },
  { chapter: 2, question: "What did Zechariah see in his second vision?", options: ["Four horns and four craftsmen", "A flying scroll", "A woman in a basket", "A golden lampstand"], answer: 0 },
  { chapter: 2, question: "What did the four horns represent?", options: ["The nations that scattered Judah", "The four winds", "The four corners", "The four seasons"], answer: 0 },
  { chapter: 2, question: "What did the four craftsmen represent?", options: ["Those who would destroy the horns", "Those who would build", "Those who would ignore", "Those who would curse"], answer: 0 },
  { chapter: 2, question: "What did the man with the measuring line say about Jerusalem?", options: ["It would be measured", "It would be destroyed", "It would be ignored", "It would be cursed"], answer: 0 },
  { chapter: 2, question: "What did the Lord say about Jerusalem?", options: ["It would be a city without walls", "It would be fortified", "It would be destroyed", "It would be ignored"], answer: 0 },
  { chapter: 2, question: "What did the Lord say about His glory?", options: ["It would be in Jerusalem", "It would be elsewhere", "It would be ignored", "It would be cursed"], answer: 0 },
  { chapter: 2, question: "What did the Lord say about the nations?", options: ["They would be His people", "They would be destroyed", "They would be ignored", "They would be cursed"], answer: 0 },
  { chapter: 2, question: "What did the Lord say about His dwelling?", options: ["It would be in Zion", "It would be elsewhere", "It would be ignored", "It would be cursed"], answer: 0 },
  { chapter: 3, question: "Who was standing before the angel of the Lord?", options: ["Joshua the high priest", "Zerubbabel", "Nehemiah", "Ezra"], answer: 0 },
  { chapter: 3, question: "What was Joshua wearing?", options: ["Filthy garments", "Clean garments", "Royal garments", "Priestly garments"], answer: 0 },
  { chapter: 3, question: "What did the Lord say about Joshua?", options: ["He was a brand plucked from the fire", "He was cursed", "He was ignored", "He was blessed"], answer: 0 },
  { chapter: 3, question: "What did the Lord command to be done to Joshua?", options: ["Remove his filthy garments", "Give him clean garments", "Both", "Neither"], answer: 2 },
  { chapter: 3, question: "What did the Lord say about Joshua's iniquity?", options: ["It was removed", "It remained", "It was ignored", "It was cursed"], answer: 0 },
  { chapter: 3, question: "What did the Lord say about Joshua's garments?", options: ["They were rich", "They were poor", "They were ignored", "They were cursed"], answer: 0 },
  { chapter: 3, question: "What did the Lord say about Joshua's turban?", options: ["It was put on his head", "It was removed", "It was ignored", "It was cursed"], answer: 0 },
  { chapter: 3, question: "What did the Lord say about Joshua's access?", options: ["He would have access to His courts", "He would be denied", "He would be ignored", "He would be cursed"], answer: 0 },
  { chapter: 3, question: "What did the Lord say about the Branch?", options: ["He would come", "He would not come", "He would be ignored", "He would be cursed"], answer: 0 },
  { chapter: 4, question: "What did Zechariah see in his vision?", options: ["A golden lampstand and two olive trees", "A flying scroll", "A woman in a basket", "A chariot"], answer: 0 },
  { chapter: 4, question: "What did the angel ask Zechariah about the lampstand?", options: ["What do you see?", "What is it?", "What does it mean?", "What will happen?"], answer: 0 },
  { chapter: 4, question: "What did the Lord say about Zerubbabel?", options: ["Not by might nor by power", "By might and power", "By wisdom", "By strength"], answer: 0 },
  { chapter: 4, question: "What did the Lord say about the mountain?", options: ["It would become a plain", "It would grow", "It would be destroyed", "It would be ignored"], answer: 0 },
  { chapter: 4, question: "What did the Lord say about the capstone?", options: ["It would be brought out", "It would be hidden", "It would be destroyed", "It would be ignored"], answer: 0 },
  { chapter: 4, question: "What did the Lord say about the seven eyes?", options: ["They would rejoice", "They would mourn", "They would ignore", "They would curse"], answer: 0 },
  { chapter: 4, question: "What did the Lord say about the two olive trees?", options: ["They were the two anointed ones", "They were two kings", "They were two prophets", "They were two priests"], answer: 0 },
  { chapter: 4, question: "What did the Lord say about the olive branches?", options: ["They were the two anointed ones", "They were two kings", "They were two prophets", "They were two priests"], answer: 0 },
  { chapter: 6, question: "What did Zechariah see coming between two mountains?", options: ["Four chariots", "Four horns", "Four craftsmen", "Four angels"], answer: 0 },
  { chapter: 6, question: "What color were the horses in the first chariot?", options: ["Red", "Black", "White", "Dappled"], answer: 0 },
  { chapter: 6, question: "What color were the horses in the second chariot?", options: ["Red", "Black", "White", "Dappled"], answer: 1 },
  { chapter: 6, question: "What color were the horses in the third chariot?", options: ["Red", "Black", "White", "Dappled"], answer: 2 },
  { chapter: 6, question: "What color were the horses in the fourth chariot?", options: ["Red", "Black", "White", "Dappled"], answer: 3 },
  { chapter: 6, question: "What did the angel say about the chariots?", options: ["They were the four spirits of heaven", "They were four kings", "They were four prophets", "They were four priests"], answer: 0 },
  { chapter: 6, question: "What did the Lord say about the Branch?", options: ["He would build the temple", "He would destroy the temple", "He would ignore the temple", "He would curse the temple"], answer: 0 },
  { chapter: 6, question: "What did the Lord say about the Branch's throne?", options: ["It would be established", "It would be destroyed", "It would be ignored", "It would be cursed"], answer: 0 },
  { chapter: 6, question: "What did the Lord say about the Branch's kingdom?", options: ["It would be established", "It would be destroyed", "It would be ignored", "It would be cursed"], answer: 0 },
  { chapter: 9, question: "How does Zechariah describe the coming king?", options: ["Riding on a donkey", "Riding on a horse", "Riding on a chariot", "Riding on a camel"], answer: 0 },
  { chapter: 9, question: "What did Zechariah say about the king's righteousness?", options: ["He would have salvation", "He would be poor", "He would be lowly", "He would be meek"], answer: 0 },
  { chapter: 9, question: "What did Zechariah say about the king's peace?", options: ["It would be to the nations", "It would be to Israel only", "It would be ignored", "It would be cursed"], answer: 0 },
  { chapter: 9, question: "What did Zechariah say about the king's dominion?", options: ["It would be from sea to sea", "It would be limited", "It would be ignored", "It would be cursed"], answer: 0 },
  { chapter: 12, question: "What will God do for Jerusalem?", options: ["Make it a cup of trembling", "Make it a blessing", "Make it a curse", "Make it a city of peace"], answer: 0 },
  { chapter: 12, question: "What will happen to those who burden themselves with Jerusalem?", options: ["They will be cut in pieces", "They will be blessed", "They will be ignored", "They will be saved"], answer: 0 },
  { chapter: 12, question: "What will God do for the house of David?", options: ["Make them like God", "Destroy them", "Ignore them", "Curse them"], answer: 0 },
  { chapter: 12, question: "What will God do for the inhabitants of Jerusalem?", options: ["Make them like David", "Destroy them", "Ignore them", "Curse them"], answer: 0 },
  { chapter: 12, question: "What will God do for the house of David?", options: ["Make them like the angel of the Lord", "Destroy them", "Ignore them", "Curse them"], answer: 0 },
  { chapter: 12, question: "What will God pour out on Jerusalem?", options: ["The spirit of grace and supplication", "The spirit of wrath", "The spirit of fear", "The spirit of confusion"], answer: 0 },
  { chapter: 12, question: "What will the people look upon?", options: ["Him whom they pierced", "The temple", "The city", "The mountain"], answer: 0 },
  { chapter: 12, question: "What will the people do when they look upon Him?", options: ["Mourn for Him", "Rejoice", "Ignore Him", "Curse Him"], answer: 0 },
  { chapter: 14, question: "What will happen on the day of the Lord?", options: ["The Lord will be king over all the earth", "Jerusalem will be destroyed", "The nations will be blessed", "The temple will be rebuilt"], answer: 0 },
  { chapter: 14, question: "What will happen to the Mount of Olives?", options: ["It will split in two", "It will be destroyed", "It will be ignored", "It will be cursed"], answer: 0 },
  { chapter: 14, question: "What will happen to the people?", options: ["They will flee", "They will stay", "They will fight", "They will hide"], answer: 0 },
  { chapter: 14, question: "What will the Lord do with the nations?", options: ["Fight against them", "Bless them", "Ignore them", "Save them"], answer: 0 },
  { chapter: 14, question: "What will happen to the Lord's feet?", options: ["They will stand on the Mount of Olives", "They will be hidden", "They will be ignored", "They will be cursed"], answer: 0 },
  { chapter: 14, question: "What will happen to the living waters?", options: ["They will flow from Jerusalem", "They will dry up", "They will be ignored", "They will be cursed"], answer: 0 },
  { chapter: 14, question: "What will happen to the Lord's name?", options: ["It will be one", "It will be many", "It will be ignored", "It will be cursed"], answer: 0 },
  { chapter: 14, question: "What will happen to the land?", options: ["It will be turned into a plain", "It will be destroyed", "It will be ignored", "It will be cursed"], answer: 0 },
  { chapter: 14, question: "What will happen to Jerusalem?", options: ["It will be raised up", "It will be destroyed", "It will be ignored", "It will be cursed"], answer: 0 },
  { chapter: 14, question: "What will happen to the people?", options: ["They will dwell in Jerusalem", "They will be destroyed", "They will be ignored", "They will be cursed"], answer: 0 },
  { chapter: 14, question: "What will happen to the plague?", options: ["It will be on those who fought against Jerusalem", "It will be on Jerusalem", "It will be ignored", "It will be cursed"], answer: 0 },
  { chapter: 14, question: "What will happen to the nations?", options: ["They will come to worship", "They will be destroyed", "They will be ignored", "They will be cursed"], answer: 0 },
  { chapter: 14, question: "What will happen to the temple?", options: ["It will be holy to the Lord", "It will be destroyed", "It will be ignored", "It will be cursed"], answer: 0 },
  { chapter: 14, question: "What will happen to the pots?", options: ["They will be holy to the Lord", "They will be destroyed", "They will be ignored", "They will be cursed"], answer: 0 },
  { chapter: 14, question: "What will happen to the bells?", options: ["They will be holy to the Lord", "They will be destroyed", "They will be ignored", "They will be cursed"], answer: 0 },
  { chapter: 14, question: "What will happen to the Canaanite?", options: ["There will be none in the house of the Lord", "There will be many", "There will be some", "There will be all"], answer: 0 }
];

export default function ZechariahQuiz() {
  const [selected, setSelected] = useState<(number | null)[]>(Array(zechariahQuestions.length).fill(null));
  const [showAnswer, setShowAnswer] = useState<boolean[]>(Array(zechariahQuestions.length).fill(false));
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

  const correctCount = selected.filter((sel, i) => sel !== null && sel === zechariahQuestions[i].answer).length;
  const wrongCount = selected.filter((sel, i) => sel !== null && sel !== zechariahQuestions[i].answer).length;
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
              <CardTitle>Zechariah Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {zechariahQuestions.map((q, qIdx) => (
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