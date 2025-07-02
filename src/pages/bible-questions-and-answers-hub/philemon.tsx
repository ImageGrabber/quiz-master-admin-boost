import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const nextQuizzes = [
  { title: "Hebrews Quiz", description: "Continue to the Book of Hebrews.", link: "/bible-questions-and-answers-hub/hebrews" },
  { title: "Titus Quiz", description: "Go back to Paul's letter to Titus.", link: "/bible-questions-and-answers-hub/titus" },
  { title: "2 Timothy Quiz", description: "Explore Paul's second letter to Timothy.", link: "/bible-questions-and-answers-hub/2-timothy" }
];

const philemonQuestions = [
  { chapter: 1, question: "Who wrote the Book of Philemon?", options: ["Peter", "Paul", "John", "Luke"], answer: 1 },
  { chapter: 1, question: "What does Philemon 1:1 say about Paul being a prisoner?", options: ["Paul, a prisoner of Jesus Christ", "A free man", "A teacher", "A disciple"], answer: 0 },
  { chapter: 1, question: "What does Philemon 1:1 say about Timothy being a brother?", options: ["And Timothy our brother", "Our friend", "Our student", "Our teacher"], answer: 0 },
  { chapter: 1, question: "What does Philemon 1:2 say about Apphia?", options: ["And to our beloved Apphia", "Our enemy", "Our stranger", "Our acquaintance"], answer: 0 },
  { chapter: 1, question: "What does Philemon 1:2 say about Archippus?", options: ["And Archippus our fellowsoldier", "Our enemy", "Our stranger", "Our acquaintance"], answer: 0 },
  { chapter: 1, question: "What does Philemon 1:2 say about the church in Philemon's house?", options: ["And to the church in thy house", "In the temple", "In the synagogue", "In the street"], answer: 0 },
  { chapter: 1, question: "What does Philemon 1:3 say about grace and peace?", options: ["Grace to you, and peace", "Curse and war", "No grace", "Some grace"], answer: 0 },
  { chapter: 1, question: "What does Philemon 1:4 say about giving thanks?", options: ["I thank my God", "I thank myself", "I thank others", "I thank no one"], answer: 0 },
  { chapter: 1, question: "What does Philemon 1:5 say about hearing of Philemon's love?", options: ["Hearing of thy love and faith", "Hearing of thy hate", "Hearing of thy doubt", "Hearing of thy fear"], answer: 0 },
  { chapter: 1, question: "What does Philemon 1:5 say about Philemon's faith toward the Lord Jesus?", options: ["Which thou hast toward the Lord Jesus", "Toward men", "Toward angels", "Toward nothing"], answer: 0 },
  { chapter: 1, question: "What does Philemon 1:6 say about the communication of Philemon's faith?", options: ["That the communication of thy faith may become effectual", "Ineffectual", "No effect", "Some effect"], answer: 0 },
  { chapter: 1, question: "What does Philemon 1:7 say about Philemon's love?", options: ["For we have great joy and consolation in thy love", "Great sorrow", "No joy", "Some joy"], answer: 0 },
  { chapter: 1, question: "What does Philemon 1:7 say about the bowels of the saints being refreshed?", options: ["Because the bowels of the saints are refreshed by thee", "Not refreshed", "Sometimes refreshed", "Rarely refreshed"], answer: 0 },
  { chapter: 1, question: "What does Philemon 1:8 say about Paul having confidence?", options: ["Wherefore, though I might be much bold in Christ to enjoin thee", "No boldness", "Some boldness", "Little boldness"], answer: 0 },
  { chapter: 1, question: "What does Philemon 1:9 say about Paul being an old man?", options: ["Yet for love's sake I rather beseech thee, being such an one as Paul the aged", "Young", "Middle-aged", "Unknown age"], answer: 0 },
  { chapter: 1, question: "What does Philemon 1:9 say about Paul being a prisoner of Jesus Christ?", options: ["And now also a prisoner of Jesus Christ", "A free man", "A teacher", "A disciple"], answer: 0 },
  { chapter: 1, question: "What does Philemon 1:10 say about Onesimus?", options: ["I beseech thee for my son Onesimus", "My enemy", "My stranger", "My acquaintance"], answer: 0 },
  { chapter: 1, question: "What does Philemon 1:10 say about Onesimus being begotten in Paul's bonds?", options: ["Whom I have begotten in my bonds", "In freedom", "In joy", "In peace"], answer: 0 },
  { chapter: 1, question: "What does Philemon 1:11 say about Onesimus being unprofitable?", options: ["Which in time past was to thee unprofitable", "Profitable", "Sometimes profitable", "Rarely profitable"], answer: 0 },
  { chapter: 1, question: "What does Philemon 1:11 say about Onesimus being profitable now?", options: ["But now profitable to thee and to me", "Still unprofitable", "Sometimes profitable", "Rarely profitable"], answer: 0 },
  { chapter: 1, question: "What does Philemon 1:12 say about Paul sending Onesimus back?", options: ["Whom I have sent again", "Kept him", "Ignored him", "Rejected him"], answer: 0 },
  { chapter: 1, question: "What does Philemon 1:12 say about receiving Onesimus as Paul's own bowels?", options: ["Thou therefore receive him, that is, mine own bowels", "As a stranger", "As an enemy", "As nothing"], answer: 0 },
  { chapter: 1, question: "What does Philemon 1:13 say about Paul desiring to keep Onesimus?", options: ["Whom I would have retained with me", "Sent away", "Ignored", "Rejected"], answer: 0 },
  { chapter: 1, question: "What does Philemon 1:13 say about Onesimus ministering to Paul?", options: ["That in thy stead he might have ministered unto me", "Not ministered", "Sometimes ministered", "Rarely ministered"], answer: 0 },
  { chapter: 1, question: "What does Philemon 1:14 say about Paul not doing anything without Philemon's mind?", options: ["But without thy mind would I do nothing", "Everything", "Something", "Little"], answer: 0 },
  { chapter: 1, question: "What does Philemon 1:14 say about Philemon's benefit being not as it were of necessity?", options: ["That thy benefit should not be as it were of necessity", "Of necessity", "Sometimes necessity", "Rarely necessity"], answer: 0 },
  { chapter: 1, question: "What does Philemon 1:15 say about Onesimus departing for a season?", options: ["For perhaps he therefore departed for a season", "Forever", "Never", "Sometimes"], answer: 0 },
  { chapter: 1, question: "What does Philemon 1:15 say about receiving Onesimus for ever?", options: ["That thou shouldest receive him for ever", "For a time", "Never", "Sometimes"], answer: 0 },
  { chapter: 1, question: "What does Philemon 1:16 say about Onesimus being a brother?", options: ["Not now as a servant, but above a servant, a brother beloved", "An enemy", "A stranger", "An acquaintance"], answer: 0 },
  { chapter: 1, question: "What does Philemon 1:16 say about Onesimus being beloved?", options: ["Specially to me, but how much more unto thee", "Hated", "Ignored", "Rejected"], answer: 0 },
  { chapter: 1, question: "What does Philemon 1:16 say about Onesimus being in the flesh and in the Lord?", options: ["Both in the flesh, and in the Lord", "Only in the flesh", "Only in the Lord", "Neither"], answer: 0 },
  { chapter: 1, question: "What does Philemon 1:17 say about receiving Paul as a partner?", options: ["If thou count me therefore a partner", "An enemy", "A stranger", "An acquaintance"], answer: 0 },
  { chapter: 1, question: "What does Philemon 1:17 say about receiving Onesimus as Paul?", options: ["Receive him as myself", "As a stranger", "As an enemy", "As nothing"], answer: 0 },
  { chapter: 1, question: "What does Philemon 1:18 say about Onesimus owing anything?", options: ["If he hath wronged thee, or oweth thee ought", "Owes nothing", "Owes little", "Owes some"], answer: 0 },
  { chapter: 1, question: "What does Philemon 1:18 say about Paul putting it on his account?", options: ["Put that on mine account", "Not put it", "Sometimes put it", "Rarely put it"], answer: 0 },
  { chapter: 1, question: "What does Philemon 1:19 say about Paul writing with his own hand?", options: ["I Paul have written it with mine own hand", "With another's hand", "Not written", "Sometimes written"], answer: 0 },
  { chapter: 1, question: "What does Philemon 1:19 say about Paul not saying that Philemon owes him?", options: ["I will repay it", "Will not repay", "Sometimes repay", "Rarely repay"], answer: 0 },
  { chapter: 1, question: "What does Philemon 1:19 say about Philemon owing Paul his own self?", options: ["Albeit I do not say to thee how thou owest unto me even thine own self", "Owes nothing", "Owes little", "Owes some"], answer: 0 },
  { chapter: 1, question: "What does Philemon 1:20 say about Paul having joy and consolation?", options: ["Yea, brother, let me have joy of thee in the Lord", "Sorrow", "No joy", "Some joy"], answer: 0 },
  { chapter: 1, question: "What does Philemon 1:20 say about refreshing Paul's bowels?", options: ["Refresh my bowels in the Lord", "Not refresh", "Sometimes refresh", "Rarely refresh"], answer: 0 },
  { chapter: 1, question: "What does Philemon 1:21 say about Paul having confidence in Philemon's obedience?", options: ["Having confidence in thy obedience I wrote unto thee", "No confidence", "Some confidence", "Little confidence"], answer: 0 },
  { chapter: 1, question: "What does Philemon 1:21 say about Philemon doing more than Paul says?", options: ["Knowing that thou wilt also do more than I say", "Less than I say", "Exactly what I say", "Nothing"], answer: 0 },
  { chapter: 1, question: "What does Philemon 1:22 say about Paul preparing a lodging?", options: ["But withal prepare me also a lodging", "No lodging", "Some lodging", "Little lodging"], answer: 0 },
  { chapter: 1, question: "What does Philemon 1:22 say about Paul hoping to come to Philemon?", options: ["For I trust that through your prayers I shall be given unto you", "Not come", "Sometimes come", "Rarely come"], answer: 0 },
  { chapter: 1, question: "What does Philemon 1:23 say about Epaphras being a fellowprisoner?", options: ["There salute thee Epaphras, my fellowprisoner", "Not a prisoner", "Sometimes a prisoner", "Rarely a prisoner"], answer: 0 },
  { chapter: 1, question: "What does Philemon 1:23 say about Epaphras being a fellowprisoner in Christ Jesus?", options: ["My fellowprisoner in Christ Jesus", "In prison", "In freedom", "In joy"], answer: 0 },
  { chapter: 1, question: "What does Philemon 1:24 say about Marcus, Aristarchus, Demas, and Lucas?", options: ["Marcus, Aristarchus, Demas, Lucas, my fellowlabourers", "Enemies", "Strangers", "Acquaintances"], answer: 0 },
  { chapter: 1, question: "What does Philemon 1:25 say about the grace of the Lord Jesus Christ?", options: ["The grace of our Lord Jesus Christ be with your spirit", "Curse", "No grace", "Some grace"], answer: 0 }
];

export default function PhilemonQuiz() {
  const [selected, setSelected] = useState<(number | null)[]>(Array(philemonQuestions.length).fill(null));
  const [showAnswer, setShowAnswer] = useState<boolean[]>(Array(philemonQuestions.length).fill(false));
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

  const correctCount = selected.filter((sel, i) => sel !== null && sel === philemonQuestions[i].answer).length;
  const wrongCount = selected.filter((sel, i) => sel !== null && sel !== philemonQuestions[i].answer).length;
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
              <CardTitle>Philemon Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {philemonQuestions.map((q, qIdx) => (
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