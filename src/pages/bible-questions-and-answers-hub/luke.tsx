import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const nextQuizzes = [
  { title: "John Quiz", description: "Continue to the fourth Gospel!", link: "/bible-questions-and-answers-hub/john" },
  { title: "Mark Quiz", description: "Go back to the second Gospel.", link: "/bible-questions-and-answers-hub/mark" },
  { title: "Matthew Quiz", description: "Read the first Gospel account.", link: "/bible-questions-and-answers-hub/matthew" }
];

const lukeQuestions = [
  { chapter: 1, question: "Who was Luke's Gospel addressed to?", options: ["Theophilus", "Timothy", "Titus", "Thessalonians"], answer: 0 },
  { chapter: 1, question: "Who appeared to Zechariah in the temple?", options: ["Gabriel", "Michael", "Jesus", "Moses"], answer: 0 },
  { chapter: 1, question: "What did the angel Gabriel tell Mary?", options: ["You will have a son", "Hail, thou that art highly favoured", "Fear not", "All of the above"], answer: 3 },
  { chapter: 1, question: "What did Mary say in response to the angel?", options: ["Be it unto me according to thy word", "I am the handmaid of the Lord", "Let it be done to me", "All of the above"], answer: 3 },
  { chapter: 2, question: "Where was Jesus born?", options: ["Nazareth", "Bethlehem", "Jerusalem", "Jericho"], answer: 1 },
  { chapter: 2, question: "What did the shepherds see in the sky?", options: ["A bright star", "A host of angels", "A cloud", "A rainbow"], answer: 1 },
  { chapter: 2, question: "Who blessed Jesus in the temple?", options: ["Anna and Simeon", "Zechariah and Elizabeth", "Mary and Joseph", "Peter and John"], answer: 0 },
  { chapter: 3, question: "Who was the forerunner of Jesus?", options: ["Peter", "John the Baptist", "James", "Paul"], answer: 1 },
  { chapter: 4, question: "Where was Jesus tempted by the devil?", options: ["In the city", "In the wilderness", "In the temple", "On the mountain"], answer: 1 },
  { chapter: 5, question: "What miracle did Jesus perform for Simon Peter?", options: ["Healed his mother-in-law", "Caught many fish", "Walked on water", "Fed 5,000"], answer: 1 },
  { chapter: 6, question: "What did Jesus say about the poor?", options: ["Blessed be ye poor", "The poor will always be with you", "Give to the poor", "All of the above"], answer: 3 },
  { chapter: 7, question: "Who did Jesus raise from the dead in Nain?", options: ["Jairus' daughter", "Widow's son", "Lazarus", "Tabitha"], answer: 1 },
  { chapter: 8, question: "What parable is found in Luke 8?", options: ["The Sower", "The Good Samaritan", "The Lost Coin", "The Prodigal Son"], answer: 0 },
  { chapter: 9, question: "Who was with Jesus at the Transfiguration?", options: ["Moses and Elijah", "Abraham and Moses", "David and Solomon", "Isaiah and Jeremiah"], answer: 0 },
  { chapter: 10, question: "Which parable is unique to Luke 10?", options: ["The Good Samaritan", "The Sower", "The Lost Sheep", "The Prodigal Son"], answer: 0 },
  { chapter: 12, question: "What does Jesus warn against in Luke 12?", options: ["Greed", "Pride", "Laziness", "Anger"], answer: 0 },
  { chapter: 13, question: "What does the parable of the fig tree teach?", options: ["Patience and repentance", "Wealth", "Power", "Judgment"], answer: 0 },
  { chapter: 15, question: "Which parable is found in Luke 15?", options: ["The Prodigal Son", "The Sower", "The Mustard Seed", "The Talents"], answer: 0 },
  { chapter: 16, question: "Who is the rich man contrasted with in a parable?", options: ["Lazarus", "Bartimaeus", "Simon", "Nicodemus"], answer: 0 },
  { chapter: 18, question: "What does the parable of the Pharisee and the tax collector teach?", options: ["Humility in prayer", "Generosity", "Courage", "Wisdom"], answer: 0 },
  { chapter: 19, question: "Who climbed a sycamore tree to see Jesus?", options: ["Peter", "Zacchaeus", "Bartimaeus", "Matthew"], answer: 1 },
  { chapter: 22, question: "Who betrayed Jesus?", options: ["Peter", "Judas", "John", "Thomas"], answer: 1 },
  { chapter: 23, question: "Who confessed, 'Truly this man was innocent'?", options: ["A centurion", "Pilate", "Peter", "Mary Magdalene"], answer: 0 },
  { chapter: 24, question: "What happened on the road to Emmaus?", options: ["Jesus appeared to two disciples", "They did not recognize him at first", "He explained the scriptures to them", "All of the above"], answer: 3 }
];

export default function LukeQuiz() {
  const [selected, setSelected] = useState<(number | null)[]>(Array(lukeQuestions.length).fill(null));
  const [showAnswer, setShowAnswer] = useState<boolean[]>(Array(lukeQuestions.length).fill(false));
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

  const correctCount = selected.filter((sel, i) => sel !== null && sel === lukeQuestions[i].answer).length;
  const wrongCount = selected.filter((sel, i) => sel !== null && sel !== lukeQuestions[i].answer).length;
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
              <CardTitle>Luke Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {lukeQuestions.map((q, qIdx) => (
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