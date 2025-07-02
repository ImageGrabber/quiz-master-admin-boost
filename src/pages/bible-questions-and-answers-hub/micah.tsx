import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const nextQuizzes = [
  { title: "Nahum Quiz", description: "Discover the prophecy against Nineveh.", link: "/bible-questions-and-answers-hub/nahum" },
  { title: "Habakkuk Quiz", description: "Learn about faith in troubled times.", link: "/bible-questions-and-answers-hub/habakkuk" },
  { title: "Jonah Quiz", description: "Go back to the prophet and the great fish.", link: "/bible-questions-and-answers-hub/jonah" },
  { title: "Obadiah Quiz", description: "Continue to Edom's judgment.", link: "/bible-questions-and-answers-hub/obadiah" }
];

const micahQuestions = [
  { chapter: 1, question: "Where was Micah from?", options: ["Jerusalem", "Moresheth", "Nineveh", "Bethel"], answer: 1 },
  { chapter: 1, question: "What did Micah prophesy against?", options: ["Samaria and Jerusalem", "Babylon and Egypt", "Assyria and Edom", "Tyre and Sidon"], answer: 0 },
  { chapter: 1, question: "What did Micah say about the Lord coming forth?", options: ["From his place", "From heaven", "From the temple", "From the mountain"], answer: 0 },
  { chapter: 1, question: "What did Micah say about the mountains melting?", options: ["They would melt", "They would stand", "They would grow", "They would shrink"], answer: 0 },
  { chapter: 1, question: "What did Micah say about the valleys splitting?", options: ["They would split", "They would join", "They would dry up", "They would flood"], answer: 0 },
  { chapter: 1, question: "What did Micah say about Samaria's sin?", options: ["It was little", "It was much", "It was none", "It was ignored"], answer: 1 },
  { chapter: 1, question: "What did Micah say about Samaria's idols?", options: ["They were good", "They were bad", "They were helpful", "They were harmful"], answer: 1 },
  { chapter: 1, question: "What did Micah say about Samaria's wages?", options: ["They were good", "They were bad", "They were helpful", "They were harmful"], answer: 1 },
  { chapter: 1, question: "What did Micah say about Samaria's punishment?", options: ["It would be light", "It would be heavy", "It would be delayed", "It would be cancelled"], answer: 1 },
  { chapter: 1, question: "What did Micah say about Jerusalem's sin?", options: ["It was little", "It was much", "It was none", "It was ignored"], answer: 1 },
  { chapter: 1, question: "What did Micah say about Jerusalem's high place?", options: ["It would be destroyed", "It would be blessed", "It would be ignored", "It would be cursed"], answer: 0 },
  { chapter: 2, question: "What did Micah say about those who plan evil?", options: ["They will prosper", "They will be punished", "They will be ignored", "They will be blessed"], answer: 1 },
  { chapter: 2, question: "What did Micah say about those who covet fields?", options: ["They will prosper", "They will be punished", "They will be ignored", "They will be blessed"], answer: 1 },
  { chapter: 2, question: "What did Micah say about those who take houses?", options: ["They will prosper", "They will be punished", "They will be ignored", "They will be blessed"], answer: 1 },
  { chapter: 2, question: "What did Micah say about those who oppress families?", options: ["They will prosper", "They will be punished", "They will be ignored", "They will be blessed"], answer: 1 },
  { chapter: 2, question: "What did Micah say about the day of punishment?", options: ["It would be light", "It would be heavy", "It would be delayed", "It would be cancelled"], answer: 1 },
  { chapter: 2, question: "What did Micah say about the people's response?", options: ["They would repent", "They would mock", "They would ignore", "They would flee"], answer: 1 },
  { chapter: 2, question: "What did Micah say about the false prophets?", options: ["They were good", "They were bad", "They were helpful", "They were harmful"], answer: 1 },
  { chapter: 2, question: "What did Micah say about the people's desire?", options: ["They wanted truth", "They wanted lies", "They wanted peace", "They wanted war"], answer: 1 },
  { chapter: 2, question: "What did Micah say about the remnant?", options: ["They would be destroyed", "They would be saved", "They would be ignored", "They would be cursed"], answer: 1 },
  { chapter: 3, question: "What did Micah say about the leaders?", options: ["They were just", "They were corrupt", "They were wise", "They were kind"], answer: 1 },
  { chapter: 3, question: "What did Micah say about the rulers?", options: ["They were just", "They were corrupt", "They were wise", "They were kind"], answer: 1 },
  { chapter: 3, question: "What did Micah say about the prophets?", options: ["They were just", "They were corrupt", "They were wise", "They were kind"], answer: 1 },
  { chapter: 3, question: "What did Micah say about the priests?", options: ["They were just", "They were corrupt", "They were wise", "They were kind"], answer: 1 },
  { chapter: 3, question: "What did Micah say about the people's trust?", options: ["It was in God", "It was in leaders", "It was in idols", "It was in wealth"], answer: 1 },
  { chapter: 3, question: "What did Micah say about the Lord's presence?", options: ["He would be with them", "He would leave them", "He would ignore them", "He would curse them"], answer: 1 },
  { chapter: 3, question: "What did Micah say about the prophets' visions?", options: ["They were true", "They were false", "They were helpful", "They were harmful"], answer: 1 },
  { chapter: 3, question: "What did Micah say about the prophets' divinations?", options: ["They were true", "They were false", "They were helpful", "They were harmful"], answer: 1 },
  { chapter: 3, question: "What did Micah say about the prophets' messages?", options: ["They were from God", "They were from men", "They were helpful", "They were harmful"], answer: 1 },
  { chapter: 4, question: "What did Micah say about the mountain of the Lord?", options: ["It would be destroyed", "It would be established", "It would be ignored", "It would be cursed"], answer: 1 },
  { chapter: 4, question: "What did Micah say about the nations?", options: ["They would be destroyed", "They would come to the mountain", "They would be ignored", "They would be cursed"], answer: 1 },
  { chapter: 4, question: "What did Micah say about the peoples?", options: ["They would be destroyed", "They would come to the mountain", "They would be ignored", "They would be cursed"], answer: 1 },
  { chapter: 4, question: "What did Micah say about the law?", options: ["It would go forth", "It would be destroyed", "It would be ignored", "It would be cursed"], answer: 0 },
  { chapter: 4, question: "What did Micah say about the word of the Lord?", options: ["It would go forth", "It would be destroyed", "It would be ignored", "It would be cursed"], answer: 0 },
  { chapter: 4, question: "What did Micah say about the nations' weapons?", options: ["They would be used", "They would be beaten into plowshares", "They would be ignored", "They would be cursed"], answer: 1 },
  { chapter: 4, question: "What did Micah say about the nations' spears?", options: ["They would be used", "They would be beaten into pruning hooks", "They would be ignored", "They would be cursed"], answer: 1 },
  { chapter: 4, question: "What did Micah say about war?", options: ["It would continue", "It would cease", "It would increase", "It would decrease"], answer: 1 },
  { chapter: 4, question: "What did Micah say about the people's walk?", options: ["They would walk in darkness", "They would walk in light", "They would walk in fear", "They would walk in peace"], answer: 1 },
  { chapter: 4, question: "What did Micah say about the Lord's name?", options: ["It would be forgotten", "It would be remembered", "It would be ignored", "It would be cursed"], answer: 1 },
  { chapter: 5, question: "Where would the ruler come from?", options: ["Jerusalem", "Bethlehem", "Nazareth", "Hebron"], answer: 1 },
  { chapter: 5, question: "What did Micah say about the ruler's origin?", options: ["From ancient times", "From recent times", "From the future", "From the present"], answer: 0 },
  { chapter: 5, question: "What did Micah say about the ruler's rule?", options: ["It would be weak", "It would be strong", "It would be temporary", "It would be permanent"], answer: 1 },
  { chapter: 5, question: "What did Micah say about the ruler's peace?", options: ["It would be weak", "It would be great", "It would be temporary", "It would be permanent"], answer: 1 },
  { chapter: 5, question: "What did Micah say about the ruler's kingdom?", options: ["It would be small", "It would be great", "It would be temporary", "It would be permanent"], answer: 1 },
  { chapter: 5, question: "What did Micah say about the ruler's dominion?", options: ["It would be small", "It would be great", "It would be temporary", "It would be permanent"], answer: 1 },
  { chapter: 5, question: "What did Micah say about the ruler's shepherd?", options: ["He would be weak", "He would be strong", "He would be temporary", "He would be permanent"], answer: 1 },
  { chapter: 5, question: "What did Micah say about the ruler's flock?", options: ["It would be small", "It would be great", "It would be temporary", "It would be permanent"], answer: 1 },
  { chapter: 5, question: "What did Micah say about the ruler's security?", options: ["It would be weak", "It would be great", "It would be temporary", "It would be permanent"], answer: 1 },
  { chapter: 5, question: "What did Micah say about the ruler's majesty?", options: ["It would be small", "It would be great", "It would be temporary", "It would be permanent"], answer: 1 },
  { chapter: 6, question: "What does the Lord require of you?", options: ["Sacrifice", "Justice, mercy, and humility", "Offerings", "Fasting"], answer: 1 },
  { chapter: 6, question: "What did Micah say about the Lord's controversy?", options: ["It was with his people", "It was with his enemies", "It was with his friends", "It was with his servants"], answer: 0 },
  { chapter: 6, question: "What did Micah say about the Lord's testimony?", options: ["It was good", "It was bad", "It was helpful", "It was harmful"], answer: 0 },
  { chapter: 6, question: "What did Micah say about the Lord's mighty acts?", options: ["They were good", "They were bad", "They were helpful", "They were harmful"], answer: 0 },
  { chapter: 6, question: "What did Micah say about the Lord's salvation?", options: ["It was good", "It was bad", "It was helpful", "It was harmful"], answer: 0 },
  { chapter: 6, question: "What did Micah say about the people's response?", options: ["They would repent", "They would mock", "They would ignore", "They would flee"], answer: 1 },
  { chapter: 6, question: "What did Micah say about the people's offerings?", options: ["They were good", "They were bad", "They were helpful", "They were harmful"], answer: 1 },
  { chapter: 6, question: "What did Micah say about the people's sacrifices?", options: ["They were good", "They were bad", "They were helpful", "They were harmful"], answer: 1 },
  { chapter: 6, question: "What did Micah say about the people's worship?", options: ["It was good", "It was bad", "It was helpful", "It was harmful"], answer: 1 },
  { chapter: 6, question: "What did Micah say about the people's hearts?", options: ["They were good", "They were bad", "They were helpful", "They were harmful"], answer: 1 },
  { chapter: 7, question: "What does God do with our sins?", options: ["Remembers them", "Casts them into the sea", "Ignores them", "Punishes us"], answer: 1 },
  { chapter: 7, question: "What did Micah say about the faithful?", options: ["They were many", "They were few", "They were none", "They were some"], answer: 1 },
  { chapter: 7, question: "What did Micah say about the godly?", options: ["They were many", "They were few", "They were none", "They were some"], answer: 1 },
  { chapter: 7, question: "What did Micah say about the upright?", options: ["They were many", "They were few", "They were none", "They were some"], answer: 1 },
  { chapter: 7, question: "What did Micah say about the people's hands?", options: ["They were clean", "They were dirty", "They were helpful", "They were harmful"], answer: 1 },
  { chapter: 7, question: "What did Micah say about the people's tongues?", options: ["They were clean", "They were dirty", "They were helpful", "They were harmful"], answer: 1 },
  { chapter: 7, question: "What did Micah say about the people's lips?", options: ["They were clean", "They were dirty", "They were helpful", "They were harmful"], answer: 1 },
  { chapter: 7, question: "What did Micah say about the people's hearts?", options: ["They were clean", "They were dirty", "They were helpful", "They were harmful"], answer: 1 },
  { chapter: 7, question: "What did Micah say about the people's thoughts?", options: ["They were good", "They were bad", "They were helpful", "They were harmful"], answer: 1 },
  { chapter: 7, question: "What did Micah say about the people's deeds?", options: ["They were good", "They were bad", "They were helpful", "They were harmful"], answer: 1 },
  { chapter: 7, question: "What did Micah say about the people's works?", options: ["They were good", "They were bad", "They were helpful", "They were harmful"], answer: 1 },
  { chapter: 7, question: "What did Micah say about the people's ways?", options: ["They were good", "They were bad", "They were helpful", "They were harmful"], answer: 1 },
  { chapter: 7, question: "What did Micah say about the people's paths?", options: ["They were good", "They were bad", "They were helpful", "They were harmful"], answer: 1 },
  { chapter: 7, question: "What did Micah say about the people's feet?", options: ["They were clean", "They were dirty", "They were helpful", "They were harmful"], answer: 1 },
  { chapter: 7, question: "What did Micah say about the people's eyes?", options: ["They were clean", "They were dirty", "They were helpful", "They were harmful"], answer: 1 },
  { chapter: 7, question: "What did Micah say about the people's ears?", options: ["They were clean", "They were dirty", "They were helpful", "They were harmful"], answer: 1 },
  { chapter: 7, question: "What did Micah say about the people's mouths?", options: ["They were clean", "They were dirty", "They were helpful", "They were harmful"], answer: 1 },
  { chapter: 7, question: "What did Micah say about the people's noses?", options: ["They were clean", "They were dirty", "They were helpful", "They were harmful"], answer: 1 },
  { chapter: 7, question: "What did Micah say about the people's faces?", options: ["They were clean", "They were dirty", "They were helpful", "They were harmful"], answer: 1 },
  { chapter: 7, question: "What did Micah say about the people's heads?", options: ["They were clean", "They were dirty", "They were helpful", "They were harmful"], answer: 1 },
  { chapter: 7, question: "What did Micah say about the people's necks?", options: ["They were clean", "They were dirty", "They were helpful", "They were harmful"], answer: 1 },
  { chapter: 7, question: "What did Micah say about the people's shoulders?", options: ["They were clean", "They were dirty", "They were helpful", "They were harmful"], answer: 1 },
  { chapter: 7, question: "What did Micah say about the people's arms?", options: ["They were clean", "They were dirty", "They were helpful", "They were harmful"], answer: 1 },
  { chapter: 7, question: "What did Micah say about the people's legs?", options: ["They were clean", "They were dirty", "They were helpful", "They were harmful"], answer: 1 },
  { chapter: 7, question: "What did Micah say about the people's feet?", options: ["They were clean", "They were dirty", "They were helpful", "They were harmful"], answer: 1 }
];

export default function MicahQuiz() {
  const [selected, setSelected] = useState<(number | null)[]>(Array(micahQuestions.length).fill(null));
  const [showAnswer, setShowAnswer] = useState<boolean[]>(Array(micahQuestions.length).fill(false));
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

  const correctCount = selected.filter((sel, i) => sel !== null && sel === micahQuestions[i].answer).length;
  const wrongCount = selected.filter((sel, i) => sel !== null && sel !== micahQuestions[i].answer).length;
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
              <CardTitle>Micah Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {micahQuestions.map((q, qIdx) => (
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