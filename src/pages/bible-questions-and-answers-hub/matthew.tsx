import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const nextQuizzes = [
  { title: "Mark Quiz", description: "Continue to the second Gospel!", link: "/bible-questions-and-answers-hub/mark" },
  { title: "Malachi Quiz", description: "Go back to the last prophet.", link: "/bible-questions-and-answers-hub/malachi" },
  { title: "Luke Quiz", description: "Read the third Gospel account.", link: "/bible-questions-and-answers-hub/luke" }
];

const matthewQuestions = [
  { chapter: 1, question: "What is the first verse of Matthew's Gospel?", options: ["In the beginning was the Word", "The beginning of the gospel of Jesus Christ", "The book of the generation of Jesus Christ", "In the beginning God created"], answer: 2 },
  { chapter: 1, question: "How many generations are listed from Abraham to Christ?", options: ["42 generations", "40 generations", "14 generations", "12 generations"], answer: 0 },
  { chapter: 2, question: "What did the wise men follow to find Jesus?", options: ["A star", "A cloud", "An angel", "A voice from heaven"], answer: 0 },
  { chapter: 2, question: "Where did Joseph take Mary and Jesus to escape Herod?", options: ["Nazareth", "Bethlehem", "Egypt", "Jerusalem"], answer: 2 },
  { chapter: 3, question: "Who baptized Jesus?", options: ["Peter", "John the Baptist", "James", "Moses"], answer: 1 },
  { chapter: 4, question: "How many days was Jesus tempted in the wilderness?", options: ["30 days", "40 days", "50 days", "60 days"], answer: 1 },
  { chapter: 5, question: "What is the first beatitude in the Sermon on the Mount?", options: ["Blessed are the meek", "Blessed are the poor in spirit", "Blessed are the peacemakers", "Blessed are those who mourn"], answer: 1 },
  { chapter: 5, question: "What does Jesus say about the law and the prophets?", options: ["I came to destroy them", "I came to fulfill them", "I came to change them", "I came to ignore them"], answer: 1 },
  { chapter: 6, question: "How does Jesus teach his disciples to pray?", options: ["The Lord's Prayer", "The Shema", "The Hail Mary", "The Apostles' Creed"], answer: 0 },
  { chapter: 7, question: "What is the Golden Rule?", options: ["Do unto others as you would have them do unto you", "Love your neighbor as yourself", "Turn the other cheek", "Give to Caesar what is Caesar's"], answer: 0 },
  { chapter: 8, question: "What miracle did Jesus perform for the centurion?", options: ["Healed his servant", "Fed 5,000", "Walked on water", "Raised his daughter"], answer: 0 },
  { chapter: 9, question: "Who did Jesus call from the tax booth?", options: ["Peter", "Matthew", "James", "John"], answer: 1 },
  { chapter: 10, question: "How many disciples did Jesus send out?", options: ["10", "12", "70", "120"], answer: 1 },
  { chapter: 13, question: "Which parable is found in Matthew 13?", options: ["The Good Samaritan", "The Sower", "The Lost Sheep", "The Prodigal Son"], answer: 1 },
  { chapter: 14, question: "What miracle did Jesus perform with five loaves and two fish?", options: ["Fed 4,000", "Fed 5,000", "Fed 7,000", "Fed 10,000"], answer: 1 },
  { chapter: 14, question: "Who walked on water with Jesus?", options: ["James", "John", "Peter", "Andrew"], answer: 2 },
  { chapter: 16, question: "Who confessed, 'You are the Christ, the Son of the living God'?", options: ["John", "Peter", "James", "Matthew"], answer: 1 },
  { chapter: 17, question: "Who appeared with Jesus at the Transfiguration?", options: ["Abraham and Moses", "Moses and Elijah", "David and Solomon", "Isaiah and Jeremiah"], answer: 1 },
  { chapter: 18, question: "How many times should you forgive your brother?", options: ["7 times", "70 times 7", "10 times", "100 times"], answer: 1 },
  { chapter: 19, question: "What did Jesus say to the rich young ruler?", options: ["Sell your possessions and give to the poor", "Pray more", "Go to the temple", "Be baptized"], answer: 0 },
  { chapter: 21, question: "What did Jesus ride into Jerusalem?", options: ["A horse", "A donkey", "A camel", "A chariot"], answer: 1 },
  { chapter: 22, question: "What is the greatest commandment?", options: ["Love your neighbor as yourself", "Love the Lord your God with all your heart", "Do not steal", "Honor your parents"], answer: 1 },
  { chapter: 25, question: "Which parable is about being ready for the kingdom?", options: ["The Talents", "The Ten Virgins", "The Lost Coin", "The Mustard Seed"], answer: 1 },
  { chapter: 26, question: "Who betrayed Jesus?", options: ["Peter", "Judas", "John", "Thomas"], answer: 1 },
  { chapter: 28, question: "What was Jesus' final command to his disciples?", options: ["Go and sin no more", "Go ye therefore, and teach all nations", "Love one another", "Pray without ceasing"], answer: 1 }
];

export default function MatthewQuiz() {
  const [selected, setSelected] = useState<(number | null)[]>(Array(matthewQuestions.length).fill(null));
  const [showAnswer, setShowAnswer] = useState<boolean[]>(Array(matthewQuestions.length).fill(false));
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

  const correctCount = selected.filter((sel, i) => sel !== null && sel === matthewQuestions[i].answer).length;
  const wrongCount = selected.filter((sel, i) => sel !== null && sel !== matthewQuestions[i].answer).length;
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
              <CardTitle>Matthew Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {matthewQuestions.map((q, qIdx) => (
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