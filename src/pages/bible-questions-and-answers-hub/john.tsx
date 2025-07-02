import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const nextQuizzes = [
  { title: "Matthew Quiz", description: "Go back to the first Gospel!", link: "/bible-questions-and-answers-hub/matthew" },
  { title: "Luke Quiz", description: "Go back to the third Gospel.", link: "/bible-questions-and-answers-hub/luke" },
  { title: "Mark Quiz", description: "Read the second Gospel account.", link: "/bible-questions-and-answers-hub/mark" }
];

const johnQuestions = [
  { chapter: 1, question: "How does John's Gospel begin?", options: ["In the beginning was the Word", "The beginning of the gospel", "The book of the generation", "In the beginning God created"], answer: 0 },
  { chapter: 1, question: "What did John the Baptist say about Jesus?", options: ["Behold the Lamb of God", "This is the Messiah", "He is a great teacher", "He is a prophet"], answer: 0 },
  { chapter: 2, question: "What was Jesus' first miracle in John's Gospel?", options: ["Healing a leper", "Turning water into wine", "Casting out demons", "Raising the dead"], answer: 1 },
  { chapter: 3, question: "What did Jesus say to Nicodemus?", options: ["Ye must be born again", "Follow me", "Repent and believe", "Love your neighbor"], answer: 0 },
  { chapter: 3, question: "What is the most famous verse in the Bible?", options: ["John 3:16", "Genesis 1:1", "Psalm 23:1", "Matthew 6:9"], answer: 0 },
  { chapter: 4, question: "What did Jesus say to the woman at the well?", options: ["Give me to drink", "I am the living water", "Whosoever drinketh of this water shall thirst again", "All of the above"], answer: 3 },
  { chapter: 5, question: "What miracle did Jesus perform at the pool of Bethesda?", options: ["Healed a lame man", "Fed 5,000", "Walked on water", "Healed a blind man"], answer: 0 },
  { chapter: 6, question: "What is the first 'I am' statement in John's Gospel?", options: ["I am the bread of life", "I am the light of the world", "I am the door", "I am the good shepherd"], answer: 0 },
  { chapter: 6, question: "What miracle did Jesus perform with five loaves and two fish?", options: ["Fed 4,000", "Fed 5,000", "Fed 7,000", "Fed 10,000"], answer: 1 },
  { chapter: 8, question: "What did Jesus say to the woman caught in adultery?", options: ["Go and sin no more", "You are forgiven", "Repent and believe", "Your faith has made you well"], answer: 0 },
  { chapter: 8, question: "What did Jesus say about the truth?", options: ["Ye shall know the truth", "The truth shall make you free", "I am the way, the truth, and the life", "All of the above"], answer: 3 },
  { chapter: 9, question: "What miracle did Jesus perform in John 9?", options: ["Healed a blind man", "Raised Lazarus", "Fed 5,000", "Walked on water"], answer: 0 },
  { chapter: 10, question: "What did Jesus say about the good shepherd?", options: ["I am the good shepherd", "The good shepherd gives his life for the sheep", "I know my sheep", "All of the above"], answer: 3 },
  { chapter: 11, question: "Who did Jesus raise from the dead?", options: ["Jairus' daughter", "Widow's son", "Lazarus", "Tabitha"], answer: 2 },
  { chapter: 12, question: "Who anointed Jesus' feet with perfume?", options: ["Mary", "Martha", "Lazarus", "Salome"], answer: 0 },
  { chapter: 13, question: "What did Jesus do for his disciples at the Last Supper?", options: ["Washed their feet", "Fed them fish", "Gave them wine only", "Taught them the Lord's Prayer"], answer: 0 },
  { chapter: 13, question: "What did Jesus say about love?", options: ["A new commandment I give unto you", "That ye love one another", "As I have loved you", "All of the above"], answer: 3 },
  { chapter: 14, question: "What did Jesus say about the way to the Father?", options: ["I am the way, the truth, and the life", "Pray to the Father", "Follow the commandments", "Love your neighbor"], answer: 0 },
  { chapter: 15, question: "What does Jesus call himself in John 15?", options: ["The vine", "The shepherd", "The door", "The light"], answer: 0 },
  { chapter: 18, question: "Who betrayed Jesus?", options: ["Peter", "Judas", "John", "Thomas"], answer: 1 },
  { chapter: 19, question: "Who stood at the cross with Jesus' mother?", options: ["Mary Magdalene", "John", "Both", "Peter"], answer: 2 },
  { chapter: 20, question: "Who was the first to see the risen Jesus?", options: ["Peter", "John", "Mary Magdalene", "Thomas"], answer: 2 },
  { chapter: 21, question: "What did Jesus ask Peter three times?", options: ["Do you love me?", "Will you follow me?", "Do you believe?", "Will you feed my sheep?"], answer: 0 }
];

export default function JohnQuiz() {
  const [selected, setSelected] = useState<(number | null)[]>(Array(johnQuestions.length).fill(null));
  const [showAnswer, setShowAnswer] = useState<boolean[]>(Array(johnQuestions.length).fill(false));
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

  const correctCount = selected.filter((sel, i) => sel !== null && sel === johnQuestions[i].answer).length;
  const wrongCount = selected.filter((sel, i) => sel !== null && sel !== johnQuestions[i].answer).length;
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
              <CardTitle>John Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {johnQuestions.map((q, qIdx) => (
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