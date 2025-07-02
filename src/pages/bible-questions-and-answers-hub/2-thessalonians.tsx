import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const nextQuizzes = [
  { title: "1 Timothy Quiz", description: "Continue to Paul's letter to Timothy.", link: "/bible-questions-and-answers-hub/1-timothy" },
  { title: "1 Thessalonians Quiz", description: "Go back to Paul's first letter to the Thessalonians.", link: "/bible-questions-and-answers-hub/1-thessalonians" },
  { title: "2 Timothy Quiz", description: "Explore Paul's second letter to Timothy.", link: "/bible-questions-and-answers-hub/2-timothy" }
];

const secondThessaloniansQuestions = [
  { chapter: 1, question: "Who wrote the Book of 2 Thessalonians?", options: ["Peter", "Paul", "John", "Luke"], answer: 1 },
  { chapter: 1, question: "What does 2 Thessalonians 1:3 say about giving thanks?", options: ["We are bound to thank God always", "We never thank God", "We thank God sometimes", "We thank God rarely"], answer: 0 },
  { chapter: 1, question: "What does 2 Thessalonians 1:4 say about boasting?", options: ["We ourselves boast of you", "We never boast", "We boast of ourselves", "We boast of others"], answer: 0 },
  { chapter: 1, question: "What does 2 Thessalonians 1:5 say about being counted worthy?", options: ["Which is manifest evidence of the righteous judgment of God", "Which is evidence of failure", "Which is evidence of sin", "Which is evidence of nothing"], answer: 0 },
  { chapter: 1, question: "What does 2 Thessalonians 1:6 say about repaying?", options: ["It is a righteous thing with God to repay with tribulation", "It is wrong to repay", "It is optional to repay", "It is impossible to repay"], answer: 0 },
  { chapter: 1, question: "What does 2 Thessalonians 1:7 say about rest?", options: ["To give you who are troubled rest with us", "To give you more trouble", "To ignore you", "To reject you"], answer: 0 },
  { chapter: 1, question: "What does 2 Thessalonians 1:8 say about flaming fire?", options: ["In flaming fire taking vengeance", "In gentle fire", "In no fire", "In cold fire"], answer: 0 },
  { chapter: 1, question: "What does 2 Thessalonians 1:9 say about everlasting destruction?", options: ["Who shall be punished with everlasting destruction", "Who shall be rewarded", "Who shall be ignored", "Who shall be accepted"], answer: 0 },
  { chapter: 1, question: "What does 2 Thessalonians 1:10 say about being glorified?", options: ["When He comes, in that Day, to be glorified in His saints", "To be shamed", "To be ignored", "To be rejected"], answer: 0 },
  { chapter: 1, question: "What does 2 Thessalonians 1:11 say about being counted worthy?", options: ["That our God would count you worthy of this calling", "That you would be unworthy", "That you would be ignored", "That you would be rejected"], answer: 0 },
  { chapter: 1, question: "What does 2 Thessalonians 1:12 say about the name of Christ?", options: ["That the name of our Lord Jesus Christ may be glorified in you", "That His name may be shamed", "That His name may be ignored", "That His name may be forgotten"], answer: 0 },
  { chapter: 2, question: "What does 2 Thessalonians 2:1 say about the coming?", options: ["Concerning the coming of our Lord Jesus Christ", "Concerning His absence", "Concerning His rejection", "Concerning His ignorance"], answer: 0 },
  { chapter: 2, question: "What does 2 Thessalonians 2:2 say about being shaken?", options: ["That you not be soon shaken in mind", "That you be shaken", "That you be confused", "That you be afraid"], answer: 0 },
  { chapter: 2, question: "What does 2 Thessalonians 2:3 say about the falling away?", options: ["For that Day will not come unless the falling away comes first", "The falling away will never come", "The falling away is optional", "The falling away is impossible"], answer: 0 },
  { chapter: 2, question: "What does 2 Thessalonians 2:3 say about the man of sin?", options: ["And the man of sin is revealed", "The man of sin is hidden", "The man of sin doesn't exist", "The man of sin is good"], answer: 0 },
  { chapter: 2, question: "What does 2 Thessalonians 2:4 say about exalting himself?", options: ["Who opposes and exalts himself above all that is called God", "Who humbles himself", "Who ignores God", "Who rejects God"], answer: 0 },
  { chapter: 2, question: "What does 2 Thessalonians 2:7 say about the mystery of lawlessness?", options: ["The mystery of lawlessness is already at work", "The mystery of lawlessness doesn't exist", "The mystery of lawlessness is good", "The mystery of lawlessness is hidden"], answer: 0 },
  { chapter: 2, question: "What does 2 Thessalonians 2:8 say about the lawless one?", options: ["The lawless one will be revealed", "The lawless one will be hidden", "The lawless one doesn't exist", "The lawless one is good"], answer: 0 },
  { chapter: 2, question: "What does 2 Thessalonians 2:8 say about the breath of His mouth?", options: ["Whom the Lord will consume with the breath of His mouth", "Whom the Lord will ignore", "Whom the Lord will accept", "Whom the Lord will help"], answer: 0 },
  { chapter: 2, question: "What does 2 Thessalonians 2:10 say about the love of the truth?", options: ["Because they did not receive the love of the truth", "Because they received the truth", "Because they ignored the truth", "Because they rejected the truth"], answer: 0 },
  { chapter: 2, question: "What does 2 Thessalonians 2:11 say about strong delusion?", options: ["God will send them strong delusion", "God will send them truth", "God will ignore them", "God will help them"], answer: 0 },
  { chapter: 2, question: "What does 2 Thessalonians 2:13 say about being chosen?", options: ["God from the beginning chose you for salvation", "God rejected you", "God ignored you", "God forgot you"], answer: 0 },
  { chapter: 2, question: "What does 2 Thessalonians 2:14 say about calling?", options: ["To which He called you by our gospel", "To which He ignored you", "To which He rejected you", "To which He forgot you"], answer: 0 },
  { chapter: 2, question: "What does 2 Thessalonians 2:15 say about standing fast?", options: ["Therefore, brethren, stand fast", "Therefore, brethren, fall", "Therefore, brethren, ignore", "Therefore, brethren, reject"], answer: 0 },
  { chapter: 2, question: "What does 2 Thessalonians 2:16 say about love and comfort?", options: ["Now may our Lord Jesus Christ Himself, and our God and Father, who has loved us", "Who has hated us", "Who has ignored us", "Who has rejected us"], answer: 0 },
  { chapter: 3, question: "What does 2 Thessalonians 3:1 say about the word of the Lord?", options: ["That the word of the Lord may run swiftly", "That the word may stop", "That the word may slow down", "That the word may disappear"], answer: 0 },
  { chapter: 3, question: "What does 2 Thessalonians 3:2 say about unreasonable men?", options: ["And that we may be delivered from unreasonable and wicked men", "That we may join them", "That we may ignore them", "That we may accept them"], answer: 0 },
  { chapter: 3, question: "What does 2 Thessalonians 3:3 say about the Lord being faithful?", options: ["But the Lord is faithful", "But the Lord is unfaithful", "But the Lord is absent", "But the Lord is weak"], answer: 0 },
  { chapter: 3, question: "What does 2 Thessalonians 3:4 say about confidence?", options: ["We have confidence in the Lord concerning you", "We have no confidence", "We have doubt", "We have fear"], answer: 0 },
  { chapter: 3, question: "What does 2 Thessalonians 3:5 say about the love of God?", options: ["May the Lord direct your hearts into the love of God", "May the Lord direct you away from love", "May the Lord ignore you", "May the Lord reject you"], answer: 0 },
  { chapter: 3, question: "What does 2 Thessalonians 3:6 say about withdrawing?", options: ["Withdraw from every brother who walks disorderly", "Join every brother", "Ignore every brother", "Accept every brother"], answer: 0 },
  { chapter: 3, question: "What does 2 Thessalonians 3:7 say about following?", options: ["For you yourselves know how you ought to follow us", "How you ought to ignore us", "How you ought to reject us", "How you ought to hate us"], answer: 0 },
  { chapter: 3, question: "What does 2 Thessalonians 3:8 say about eating bread?", options: ["Nor did we eat anyone's bread free of charge", "We ate everyone's bread", "We stole bread", "We ignored bread"], answer: 0 },
  { chapter: 3, question: "What does 2 Thessalonians 3:9 say about being an example?", options: ["To make ourselves an example of how you should follow us", "To hide from you", "To ignore you", "To reject you"], answer: 0 },
  { chapter: 3, question: "What does 2 Thessalonians 3:10 say about working?", options: ["If anyone will not work, neither shall he eat", "If anyone will not work, he shall eat", "If anyone will not work, he shall be praised", "If anyone will not work, he shall be helped"], answer: 0 },
  { chapter: 3, question: "What does 2 Thessalonians 3:11 say about being busybodies?", options: ["For we hear that there are some who walk among you in a disorderly manner, not working at all, but are busybodies", "Who work hard", "Who are quiet", "Who are helpful"], answer: 0 },
  { chapter: 3, question: "What does 2 Thessalonians 3:12 say about working quietly?", options: ["That they also work in quietness and eat their own bread", "That they make noise", "That they steal bread", "That they ignore work"], answer: 0 },
  { chapter: 3, question: "What does 2 Thessalonians 3:13 say about not growing weary?", options: ["But as for you, brethren, do not grow weary in doing good", "Grow weary in doing good", "Ignore doing good", "Reject doing good"], answer: 0 },
  { chapter: 3, question: "What does 2 Thessalonians 3:14 say about noting someone?", options: ["And if anyone does not obey our word in this epistle, note that person", "Ignore that person", "Accept that person", "Praise that person"], answer: 0 },
  { chapter: 3, question: "What does 2 Thessalonians 3:15 say about counting?", options: ["Yet do not count him as an enemy", "Count him as an enemy", "Ignore him", "Reject him"], answer: 0 },
  { chapter: 3, question: "What does 2 Thessalonians 3:16 say about peace?", options: ["Now may the Lord of peace Himself give you peace", "May the Lord give you trouble", "May the Lord ignore you", "May the Lord reject you"], answer: 0 },
  { chapter: 3, question: "What does 2 Thessalonians 3:17 say about Paul's greeting?", options: ["The salutation of Paul with my own hand", "The salutation of someone else", "No salutation", "A fake salutation"], answer: 0 },
  { chapter: 3, question: "What does 2 Thessalonians 3:18 say about grace?", options: ["The grace of our Lord Jesus Christ be with you all", "The curse be with you", "The anger be with you", "The rejection be with you"], answer: 0 }
];

export default function SecondThessaloniansQuiz() {
  const [selected, setSelected] = useState<(number | null)[]>(Array(secondThessaloniansQuestions.length).fill(null));
  const [showAnswer, setShowAnswer] = useState<boolean[]>(Array(secondThessaloniansQuestions.length).fill(false));
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

  const correctCount = selected.filter((sel, i) => sel !== null && sel === secondThessaloniansQuestions[i].answer).length;
  const wrongCount = selected.filter((sel, i) => sel !== null && sel !== secondThessaloniansQuestions[i].answer).length;
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
              <CardTitle>2 Thessalonians Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {secondThessaloniansQuestions.map((q, qIdx) => (
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