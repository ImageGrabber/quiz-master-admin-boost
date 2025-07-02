import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const nextQuizzes = [
  { title: "Luke Quiz", description: "Continue to the third Gospel!", link: "/bible-questions-and-answers-hub/luke" },
  { title: "Matthew Quiz", description: "Go back to the first Gospel.", link: "/bible-questions-and-answers-hub/matthew" },
  { title: "John Quiz", description: "Read the fourth Gospel account.", link: "/bible-questions-and-answers-hub/john" }
];

const markQuestions = [
  { chapter: 1, question: "How does Mark's Gospel begin?", options: ["In the beginning was the Word", "The beginning of the gospel of Jesus Christ", "The book of the generation of Jesus Christ", "In the beginning God created"], answer: 1 },
  { chapter: 1, question: "What did John the Baptist wear in the wilderness?", options: ["Fine linen", "Camel's hair with a leather belt", "Purple robes", "White garments"], answer: 1 },
  { chapter: 1, question: "What was Jesus' first miracle in Mark's Gospel?", options: ["Healing a leper", "Casting out an unclean spirit", "Turning water into wine", "Raising the dead"], answer: 1 },
  { chapter: 2, question: "What did Jesus say to the paralytic man?", options: ["Your faith has made you well", "Son, thy sins be forgiven thee", "Rise up and walk", "Be healed"], answer: 1 },
  { chapter: 2, question: "What did Jesus say about the Sabbath?", options: ["The Sabbath was made for man", "The Sabbath should be abolished", "The Sabbath is only for Jews", "The Sabbath is not important"], answer: 0 },
  { chapter: 3, question: "Who are Jesus' true family according to Mark 3?", options: ["Those who do God's will", "His relatives", "His disciples", "The Pharisees"], answer: 0 },
  { chapter: 4, question: "Which parable is found in Mark 4?", options: ["The Good Samaritan", "The Sower", "The Lost Sheep", "The Prodigal Son"], answer: 1 },
  { chapter: 4, question: "What did Jesus calm in Mark 4?", options: ["A storm", "A crowd", "A demon", "A famine"], answer: 0 },
  { chapter: 5, question: "Who did Jesus heal among the tombs?", options: ["A leper", "A blind man", "A demon-possessed man", "A paralytic"], answer: 2 },
  { chapter: 5, question: "Who did Jesus raise from the dead?", options: ["Lazarus", "Jairus' daughter", "Widow's son", "Tabitha"], answer: 1 },
  { chapter: 6, question: "What miracle did Jesus perform with five loaves and two fish?", options: ["Fed 4,000", "Fed 5,000", "Fed 7,000", "Fed 10,000"], answer: 1 },
  { chapter: 6, question: "Who walked on water with Jesus?", options: ["James", "John", "Peter", "No one in Mark"], answer: 3 },
  { chapter: 7, question: "What did Jesus say defiles a person?", options: ["What goes into them", "What comes out of them", "Their clothes", "Their family"], answer: 1 },
  { chapter: 8, question: "What did Peter confess about Jesus?", options: ["You are a great teacher", "You are the Christ", "You are a prophet", "You are John the Baptist"], answer: 1 },
  { chapter: 9, question: "Who appeared with Jesus at the Transfiguration?", options: ["Abraham and Moses", "Moses and Elijah", "David and Solomon", "Isaiah and Jeremiah"], answer: 1 },
  { chapter: 10, question: "What did Jesus say about children?", options: ["Let the children come to me", "Children should be silent", "Children must work", "Children are a burden"], answer: 0 },
  { chapter: 10, question: "What did Jesus say to the rich young ruler?", options: ["Sell your possessions and give to the poor", "Pray more", "Go to the temple", "Be baptized"], answer: 0 },
  { chapter: 11, question: "What did Jesus curse in Mark 11?", options: ["A fig tree", "A vineyard", "A city", "A mountain"], answer: 0 },
  { chapter: 12, question: "What is the greatest commandment?", options: ["Love your neighbor as yourself", "Love the Lord your God with all your heart", "Do not steal", "Honor your parents"], answer: 1 },
  { chapter: 14, question: "Who betrayed Jesus?", options: ["Peter", "Judas", "John", "Thomas"], answer: 1 },
  { chapter: 15, question: "Who confessed, 'Truly this man was the Son of God'?", options: ["Peter", "A centurion", "Pilate", "Mary Magdalene"], answer: 1 },
  { chapter: 16, question: "What was Jesus' final command in Mark's Gospel?", options: ["Go ye into all the world", "Love one another", "Pray without ceasing", "Be perfect"], answer: 0 }
];

export default function MarkQuiz() {
  const [selected, setSelected] = useState<(number | null)[]>(Array(markQuestions.length).fill(null));
  const [showAnswer, setShowAnswer] = useState<boolean[]>(Array(markQuestions.length).fill(false));
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

  const correctCount = selected.filter((sel, i) => sel !== null && sel === markQuestions[i].answer).length;
  const wrongCount = selected.filter((sel, i) => sel !== null && sel !== markQuestions[i].answer).length;
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
              <CardTitle>Mark Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {markQuestions.map((q, qIdx) => (
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