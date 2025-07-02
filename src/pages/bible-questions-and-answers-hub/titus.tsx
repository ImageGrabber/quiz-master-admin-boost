import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const nextQuizzes = [
  { title: "Philemon Quiz", description: "Continue to Paul's letter to Philemon.", link: "/bible-questions-and-answers-hub/philemon" },
  { title: "2 Timothy Quiz", description: "Go back to Paul's second letter to Timothy.", link: "/bible-questions-and-answers-hub/2-timothy" },
  { title: "1 Timothy Quiz", description: "Explore Paul's first letter to Timothy.", link: "/bible-questions-and-answers-hub/1-timothy" }
];

const titusQuestions = [
  { chapter: 1, question: "Who wrote the Book of Titus?", options: ["Peter", "Paul", "John", "Luke"], answer: 1 },
  { chapter: 1, question: "What does Titus 1:1 say about Paul being a servant?", options: ["Paul, a servant of God", "A master of God", "A friend of God", "A stranger to God"], answer: 0 },
  { chapter: 1, question: "What does Titus 1:2 say about eternal life?", options: ["In hope of eternal life", "In fear of eternal life", "In doubt of eternal life", "In ignorance of eternal life"], answer: 0 },
  { chapter: 1, question: "What does Titus 1:2 say about God that cannot lie?", options: ["Which God, that cannot lie", "That can lie", "That sometimes lies", "That rarely lies"], answer: 0 },
  { chapter: 1, question: "What does Titus 1:3 say about the word of God?", options: ["But hath in due times manifested his word", "Hidden his word", "Ignored his word", "Rejected his word"], answer: 0 },
  { chapter: 1, question: "What does Titus 1:4 say about Titus being a son?", options: ["To Titus, mine own son after the common faith", "My friend", "My brother", "My student"], answer: 0 },
  { chapter: 1, question: "What does Titus 1:5 say about setting things in order?", options: ["For this cause left I thee in Crete, that thou shouldest set in order the things that are wanting", "Ignore the things", "Reject the things", "Hate the things"], answer: 0 },
  { chapter: 1, question: "What does Titus 1:5 say about ordaining elders?", options: ["And ordain elders in every city", "In some cities", "In no cities", "In few cities"], answer: 0 },
  { chapter: 1, question: "What does Titus 1:6 say about a bishop being blameless?", options: ["If any be blameless", "If any be blameworthy", "If any be blamed", "If any be guilty"], answer: 0 },
  { chapter: 1, question: "What does Titus 1:6 say about the husband of one wife?", options: ["The husband of one wife", "Of many wives", "Of no wife", "Of some wives"], answer: 0 },
  { chapter: 1, question: "What does Titus 1:6 say about having faithful children?", options: ["Having faithful children", "Unfaithful children", "No children", "Some children"], answer: 0 },
  { chapter: 1, question: "What does Titus 1:7 say about a bishop being the steward of God?", options: ["For a bishop must be blameless, as the steward of God", "As the master of God", "As the friend of God", "As the stranger of God"], answer: 0 },
  { chapter: 1, question: "What does Titus 1:7 say about not being selfwilled?", options: ["Not selfwilled", "Selfwilled", "Sometimes selfwilled", "Rarely selfwilled"], answer: 0 },
  { chapter: 1, question: "What does Titus 1:7 say about not being soon angry?", options: ["Not soon angry", "Soon angry", "Sometimes angry", "Rarely angry"], answer: 0 },
  { chapter: 1, question: "What does Titus 1:8 say about being a lover of hospitality?", options: ["A lover of hospitality", "A hater of hospitality", "An ignorer of hospitality", "A rejecter of hospitality"], answer: 0 },
  { chapter: 1, question: "What does Titus 1:8 say about being a lover of good men?", options: ["A lover of good men", "A lover of bad men", "A lover of no men", "A lover of some men"], answer: 0 },
  { chapter: 1, question: "What does Titus 1:8 say about being sober?", options: ["Sober", "Drunk", "Sometimes sober", "Rarely sober"], answer: 0 },
  { chapter: 1, question: "What does Titus 1:8 say about being just?", options: ["Just", "Unjust", "Sometimes just", "Rarely just"], answer: 0 },
  { chapter: 1, question: "What does Titus 1:8 say about being holy?", options: ["Holy", "Unholy", "Sometimes holy", "Rarely holy"], answer: 0 },
  { chapter: 1, question: "What does Titus 1:8 say about being temperate?", options: ["Temperate", "Intemperate", "Sometimes temperate", "Rarely temperate"], answer: 0 },
  { chapter: 1, question: "What does Titus 1:9 say about holding fast the faithful word?", options: ["Holding fast the faithful word", "Letting go of the word", "Ignoring the word", "Rejecting the word"], answer: 0 },
  { chapter: 1, question: "What does Titus 1:10 say about unruly and vain talkers?", options: ["For there are many unruly and vain talkers", "Few unruly", "No unruly", "Some unruly"], answer: 0 },
  { chapter: 1, question: "What does Titus 1:11 say about stopping the mouths of deceivers?", options: ["Whose mouths must be stopped", "Whose mouths must be opened", "Whose mouths must be ignored", "Whose mouths must be accepted"], answer: 0 },
  { chapter: 1, question: "What does Titus 1:12 say about the Cretians being always liars?", options: ["The Cretians are always liars", "Sometimes liars", "Never liars", "Rarely liars"], answer: 0 },
  { chapter: 1, question: "What does Titus 1:13 say about rebuking them sharply?", options: ["Wherefore rebuke them sharply", "Gently", "Never", "Sometimes"], answer: 0 },
  { chapter: 1, question: "What does Titus 1:14 say about giving heed to Jewish fables?", options: ["Not giving heed to Jewish fables", "Giving heed", "Sometimes giving heed", "Rarely giving heed"], answer: 0 },
  { chapter: 1, question: "What does Titus 1:15 say about all things being pure to the pure?", options: ["Unto the pure all things are pure", "Impure", "Some pure", "Little pure"], answer: 0 },
  { chapter: 1, question: "What does Titus 1:16 say about professing to know God?", options: ["They profess that they know God", "Do not know God", "Sometimes know God", "Rarely know God"], answer: 0 },
  { chapter: 2, question: "What does Titus 2:1 say about speaking the things which become sound doctrine?", options: ["But speak thou the things which become sound doctrine", "Unsound doctrine", "No doctrine", "Some doctrine"], answer: 0 },
  { chapter: 2, question: "What does Titus 2:2 say about aged men being sober?", options: ["That the aged men be sober", "Drunk", "Sometimes sober", "Rarely sober"], answer: 0 },
  { chapter: 2, question: "What does Titus 2:2 say about aged men being grave?", options: ["Grave", "Light", "Sometimes grave", "Rarely grave"], answer: 0 },
  { chapter: 2, question: "What does Titus 2:2 say about aged men being temperate?", options: ["Temperate", "Intemperate", "Sometimes temperate", "Rarely temperate"], answer: 0 },
  { chapter: 2, question: "What does Titus 2:2 say about aged men being sound in faith?", options: ["Sound in faith", "Weak in faith", "No faith", "Some faith"], answer: 0 },
  { chapter: 2, question: "What does Titus 2:3 say about aged women being in behaviour as becometh holiness?", options: ["The aged women likewise, that they be in behaviour as becometh holiness", "Unholiness", "Sometimes holiness", "Rarely holiness"], answer: 0 },
  { chapter: 2, question: "What does Titus 2:3 say about aged women not being false accusers?", options: ["Not false accusers", "False accusers", "Sometimes false", "Rarely false"], answer: 0 },
  { chapter: 2, question: "What does Titus 2:4 say about teaching young women?", options: ["That they may teach the young women", "Ignore young women", "Reject young women", "Hate young women"], answer: 0 },
  { chapter: 2, question: "What does Titus 2:5 say about young women being discreet?", options: ["To be discreet", "Indiscreet", "Sometimes discreet", "Rarely discreet"], answer: 0 },
  { chapter: 2, question: "What does Titus 2:5 say about young women being chaste?", options: ["Chaste", "Unchaste", "Sometimes chaste", "Rarely chaste"], answer: 0 },
  { chapter: 2, question: "What does Titus 2:5 say about young women being keepers at home?", options: ["Keepers at home", "Away from home", "Sometimes at home", "Rarely at home"], answer: 0 },
  { chapter: 2, question: "What does Titus 2:6 say about exhorting young men?", options: ["Young men likewise exhort to be sober minded", "Not sober minded", "Sometimes sober", "Rarely sober"], answer: 0 },
  { chapter: 2, question: "What does Titus 2:7 say about shewing thyself a pattern of good works?", options: ["In all things shewing thyself a pattern of good works", "Bad works", "No works", "Some works"], answer: 0 },
  { chapter: 2, question: "What does Titus 2:8 say about sound speech?", options: ["Sound speech, that cannot be condemned", "Can be condemned", "Sometimes condemned", "Rarely condemned"], answer: 0 },
  { chapter: 2, question: "What does Titus 2:9 say about servants being obedient?", options: ["Exhort servants to be obedient unto their own masters", "Disobedient", "Sometimes obedient", "Rarely obedient"], answer: 0 },
  { chapter: 2, question: "What does Titus 2:10 say about not purloining?", options: ["Not purloining", "Purloining", "Sometimes purloining", "Rarely purloining"], answer: 0 },
  { chapter: 2, question: "What does Titus 2:10 say about shewing all good fidelity?", options: ["But shewing all good fidelity", "Bad fidelity", "No fidelity", "Some fidelity"], answer: 0 },
  { chapter: 2, question: "What does Titus 2:11 say about the grace of God appearing?", options: ["For the grace of God that bringeth salvation hath appeared to all men", "To some men", "To no men", "To few men"], answer: 0 },
  { chapter: 2, question: "What does Titus 2:12 say about denying ungodliness?", options: ["Teaching us that, denying ungodliness", "Accepting ungodliness", "Ignoring ungodliness", "Rejecting ungodliness"], answer: 0 },
  { chapter: 2, question: "What does Titus 2:12 say about living soberly?", options: ["And worldly lusts, we should live soberly", "Drunkenly", "Sometimes soberly", "Rarely soberly"], answer: 0 },
  { chapter: 2, question: "What does Titus 2:13 say about looking for the blessed hope?", options: ["Looking for that blessed hope", "Cursed hope", "No hope", "Some hope"], answer: 0 },
  { chapter: 2, question: "What does Titus 2:14 say about giving Himself for us?", options: ["Who gave himself for us", "For some", "For none", "For few"], answer: 0 },
  { chapter: 2, question: "What does Titus 2:14 say about purifying unto Himself a peculiar people?", options: ["That he might redeem us from all iniquity, and purify unto himself a peculiar people", "A common people", "No people", "Some people"], answer: 0 },
  { chapter: 2, question: "What does Titus 2:15 say about speaking and exhorting?", options: ["These things speak, and exhort", "Ignore", "Reject", "Hate"], answer: 0 },
  { chapter: 3, question: "What does Titus 3:1 say about being subject to principalities and powers?", options: ["Put them in mind to be subject to principalities and powers", "Not subject", "Sometimes subject", "Rarely subject"], answer: 0 },
  { chapter: 3, question: "What does Titus 3:1 say about being ready to every good work?", options: ["To be ready to every good work", "No good work", "Some good work", "Little good work"], answer: 0 },
  { chapter: 3, question: "What does Titus 3:2 say about speaking evil of no man?", options: ["To speak evil of no man", "Of some men", "Of all men", "Of few men"], answer: 0 },
  { chapter: 3, question: "What does Titus 3:2 say about being no brawlers?", options: ["To be no brawlers", "Brawlers", "Sometimes brawlers", "Rarely brawlers"], answer: 0 },
  { chapter: 3, question: "What does Titus 3:2 say about being gentle?", options: ["But gentle", "Harsh", "Sometimes gentle", "Rarely gentle"], answer: 0 },
  { chapter: 3, question: "What does Titus 3:2 say about shewing all meekness?", options: ["Shewing all meekness unto all men", "No meekness", "Some meekness", "Little meekness"], answer: 0 },
  { chapter: 3, question: "What does Titus 3:3 say about being foolish?", options: ["For we ourselves also were sometimes foolish", "Always wise", "Never foolish", "Rarely foolish"], answer: 0 },
  { chapter: 3, question: "What does Titus 3:3 say about being disobedient?", options: ["Disobedient", "Obedient", "Sometimes obedient", "Rarely obedient"], answer: 0 },
  { chapter: 3, question: "What does Titus 3:3 say about being deceived?", options: ["Deceived", "Not deceived", "Sometimes deceived", "Rarely deceived"], answer: 0 },
  { chapter: 3, question: "What does Titus 3:3 say about serving divers lusts and pleasures?", options: ["Serving divers lusts and pleasures", "No lusts", "Some lusts", "Little lusts"], answer: 0 },
  { chapter: 3, question: "What does Titus 3:4 say about the kindness and love of God appearing?", options: ["But after that the kindness and love of God our Saviour toward man appeared", "Disappeared", "Sometimes appeared", "Rarely appeared"], answer: 0 },
  { chapter: 3, question: "What does Titus 3:5 say about not by works of righteousness?", options: ["Not by works of righteousness which we have done", "By works", "By some works", "By few works"], answer: 0 },
  { chapter: 3, question: "What does Titus 3:5 say about the washing of regeneration?", options: ["But according to his mercy he saved us, by the washing of regeneration", "By works", "By law", "By tradition"], answer: 0 },
  { chapter: 3, question: "What does Titus 3:6 say about the Holy Ghost being shed on us abundantly?", options: ["Which he shed on us abundantly through Jesus Christ our Saviour", "Sparingly", "Sometimes", "Rarely"], answer: 0 },
  { chapter: 3, question: "What does Titus 3:7 say about being justified by his grace?", options: ["That being justified by his grace", "By works", "By law", "By tradition"], answer: 0 },
  { chapter: 3, question: "What does Titus 3:7 say about being made heirs?", options: ["We should be made heirs according to the hope of eternal life", "Not heirs", "Some heirs", "Few heirs"], answer: 0 },
  { chapter: 3, question: "What does Titus 3:8 say about a faithful saying?", options: ["This is a faithful saying", "A false saying", "No saying", "Some saying"], answer: 0 },
  { chapter: 3, question: "What does Titus 3:8 say about maintaining good works?", options: ["And these things I will that thou affirm constantly, that they which have believed in God might be careful to maintain good works", "Bad works", "No works", "Some works"], answer: 0 },
  { chapter: 3, question: "What does Titus 3:9 say about avoiding foolish questions?", options: ["But avoid foolish questions", "Accept them", "Ignore them", "Reject them"], answer: 0 },
  { chapter: 3, question: "What does Titus 3:9 say about avoiding genealogies?", options: ["And genealogies", "Accept them", "Ignore them", "Reject them"], answer: 0 },
  { chapter: 3, question: "What does Titus 3:9 say about avoiding contentions?", options: ["And contentions", "Accept them", "Ignore them", "Reject them"], answer: 0 },
  { chapter: 3, question: "What does Titus 3:10 say about a heretic?", options: ["A man that is an heretick after the first and second admonition reject", "Accept him", "Ignore him", "Help him"], answer: 0 },
  { chapter: 3, question: "What does Titus 3:11 say about being subverted?", options: ["Knowing that he that is such is subverted", "Not subverted", "Sometimes subverted", "Rarely subverted"], answer: 0 },
  { chapter: 3, question: "What does Titus 3:12 say about Artemas or Tychicus?", options: ["When I shall send Artemas unto thee, or Tychicus", "No one", "Many", "Some"], answer: 0 },
  { chapter: 3, question: "What does Titus 3:13 say about bringing Zenas and Apollos?", options: ["Bring Zenas the lawyer and Apollos on their journey diligently", "Ignore them", "Reject them", "Hate them"], answer: 0 },
  { chapter: 3, question: "What does Titus 3:14 say about learning to maintain good works?", options: ["And let our's also learn to maintain good works", "Bad works", "No works", "Some works"], answer: 0 },
  { chapter: 3, question: "What does Titus 3:15 say about greeting them that love us?", options: ["All that are with me salute thee. Greet them that love us in the faith", "Hate us", "Ignore us", "Reject us"], answer: 0 },
  { chapter: 3, question: "What does Titus 3:15 say about grace being with you all?", options: ["Grace be with you all", "Curse", "No grace", "Some grace"], answer: 0 }
];

export default function TitusQuiz() {
  const [selected, setSelected] = useState<(number | null)[]>(Array(titusQuestions.length).fill(null));
  const [showAnswer, setShowAnswer] = useState<boolean[]>(Array(titusQuestions.length).fill(false));
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

  const correctCount = selected.filter((sel, i) => sel !== null && sel === titusQuestions[i].answer).length;
  const wrongCount = selected.filter((sel, i) => sel !== null && sel !== titusQuestions[i].answer).length;
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
              <CardTitle>Titus Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {titusQuestions.map((q, qIdx) => (
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