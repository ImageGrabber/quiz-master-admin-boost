import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const nextQuizzes = [
  { title: "Ecclesiastes Quiz", description: "Explore the meaning of life and wisdom.", link: "/bible-questions-and-answers-hub/ecclesiastes" },
  { title: "Song of Solomon Quiz", description: "Learn about love poetry and allegory.", link: "/bible-questions-and-answers-hub/song-of-solomon" },
  { title: "Psalms Quiz", description: "Go back to the book of prayers and songs.", link: "/bible-questions-and-answers-hub/psalms" },
  { title: "Job Quiz", description: "Review the story of suffering and faith.", link: "/bible-questions-and-answers-hub/job" }
];

const proverbsQuestions = [
  { chapter: 1, question: "What is the beginning of knowledge?", options: ["Wisdom", "The fear of the Lord", "Understanding", "Learning"], answer: 1 },
  { chapter: 1, question: "What do fools despise?", options: ["Wisdom", "Instruction", "Knowledge", "All of these"], answer: 3 },
  { chapter: 1, question: "What does wisdom call out in the streets?", options: ["Silently", "Loudly", "Softly", "Never"], answer: 1 },
  { chapter: 2, question: "What should you seek like silver?", options: ["Wisdom", "Wealth", "Power", "Fame"], answer: 0 },
  { chapter: 2, question: "What does the Lord give?", options: ["Wealth", "Power", "Wisdom", "Fame"], answer: 2 },
  { chapter: 3, question: "What should you trust in with all your heart?", options: ["Yourself", "Others", "The Lord", "Money"], answer: 2 },
  { chapter: 3, question: "What should you not lean on?", options: ["Your own understanding", "God", "Wisdom", "Others"], answer: 0 },
  { chapter: 3, question: "What is more precious than rubies?", options: ["Gold", "Silver", "Wisdom", "Pearls"], answer: 2 },
  { chapter: 4, question: "What should you get?", options: ["Wealth", "Wisdom", "Power", "Fame"], answer: 1 },
  { chapter: 4, question: "What should you guard above all else?", options: ["Your heart", "Your money", "Your house", "Your car"], answer: 0 },
  { chapter: 5, question: "What should you avoid?", options: ["The adulterous woman", "The foolish man", "The wicked", "All of these"], answer: 3 },
  { chapter: 5, question: "What leads to death?", options: ["Wisdom", "Folly", "Understanding", "Knowledge"], answer: 1 },
  { chapter: 6, question: "What does the Lord hate?", options: ["Pride", "Lying", "Shedding innocent blood", "All of these"], answer: 3 },
  { chapter: 6, question: "What are the six things the Lord hates?", options: ["Pride, lying, murder, wicked plans, false witness, discord", "Wealth, power, fame, beauty, strength, intelligence", "Poverty, weakness, ugliness, sickness, old age, death", "None of these"], answer: 0 },
  { chapter: 7, question: "What should you keep?", options: ["Your money", "Your house", "My words", "Your secrets"], answer: 2 },
  { chapter: 7, question: "What leads to the chambers of death?", options: ["Wisdom", "The adulterous woman", "Understanding", "Knowledge"], answer: 1 },
  { chapter: 8, question: "What does wisdom call out?", options: ["Silently", "Loudly", "Softly", "Never"], answer: 1 },
  { chapter: 8, question: "What was wisdom present at?", options: ["The creation", "The flood", "The exodus", "The conquest"], answer: 0 },
  { chapter: 9, question: "What has wisdom built?", options: ["A house", "A temple", "A palace", "A tower"], answer: 0 },
  { chapter: 9, question: "What is the beginning of wisdom?", options: ["Knowledge", "Understanding", "The fear of the Lord", "Learning"], answer: 2 },
  { chapter: 10, question: "What does a wise son bring?", options: ["Joy to his father", "Sorrow to his mother", "Wealth to his family", "All of these"], answer: 0 },
  { chapter: 10, question: "What does a foolish son bring?", options: ["Joy to his father", "Grief to his mother", "Wealth to his family", "Peace to his home"], answer: 1 },
  { chapter: 10, question: "What does the blessing of the Lord bring?", options: ["Wealth", "Poverty", "Sorrow", "Death"], answer: 0 },
  { chapter: 11, question: "What does the Lord detest?", options: ["Honest scales", "Dishonest scales", "Fair weights", "Just measures"], answer: 1 },
  { chapter: 11, question: "What does pride lead to?", options: ["Honor", "Shame", "Wealth", "Wisdom"], answer: 1 },
  { chapter: 12, question: "What does the Lord approve of?", options: ["Righteousness", "Wickedness", "Folly", "Pride"], answer: 0 },
  { chapter: 12, question: "What does a fool show?", options: ["Wisdom", "Understanding", "His annoyance", "His joy"], answer: 2 },
  { chapter: 13, question: "What does a wise son heed?", options: ["His father's instruction", "His mother's rebuke", "His teacher's words", "All of these"], answer: 3 },
  { chapter: 13, question: "What does a mocker not heed?", options: ["A rebuke", "Praise", "Advice", "Warning"], answer: 0 },
  { chapter: 14, question: "What does the wise woman build?", options: ["Her house", "Her wealth", "Her reputation", "Her family"], answer: 0 },
  { chapter: 14, question: "What does the foolish woman tear down?", options: ["Her house", "Her wealth", "Her reputation", "All of these"], answer: 3 },
  { chapter: 15, question: "What does a gentle answer turn away?", options: ["Joy", "Peace", "Wrath", "Love"], answer: 2 },
  { chapter: 15, question: "What does a harsh word stir up?", options: ["Peace", "Anger", "Joy", "Love"], answer: 1 },
  { chapter: 16, question: "What does the Lord establish?", options: ["A man's steps", "A man's wealth", "A man's fame", "A man's power"], answer: 0 },
  { chapter: 16, question: "What is better than gold?", options: ["Silver", "Wisdom", "Understanding", "Both wisdom and understanding"], answer: 3 },
  { chapter: 17, question: "What is better than a house full of feasting?", options: ["A house full of wealth", "A house full of wisdom", "A dry morsel with quiet", "A house full of servants"], answer: 2 },
  { chapter: 17, question: "What does a friend love at all times?", options: ["Wealth", "Power", "Fame", "At all times"], answer: 3 },
  { chapter: 18, question: "What is like a fortified city?", options: ["Wealth", "Power", "A brother", "Wisdom"], answer: 2 },
  { chapter: 18, question: "What does a fool's mouth invite?", options: ["Praise", "Honor", "Ruin", "Wealth"], answer: 2 },
  { chapter: 19, question: "What is better than wealth?", options: ["Power", "Fame", "A good name", "Beauty"], answer: 2 },
  { chapter: 19, question: "What does a foolish child bring?", options: ["Joy", "Grief", "Wealth", "Honor"], answer: 1 },
  { chapter: 20, question: "What is a mocker?", options: ["Wine", "Beer", "Wisdom", "Understanding"], answer: 0 },
  { chapter: 20, question: "What does the Lord detest?", options: ["Honest scales", "Dishonest scales", "Fair weights", "Just measures"], answer: 1 },
  { chapter: 21, question: "What does the Lord weigh?", options: ["The heart", "The mind", "The soul", "The body"], answer: 0 },
  { chapter: 21, question: "What is better than sacrifice?", options: ["Wealth", "Power", "To do what is right", "Fame"], answer: 2 },
  { chapter: 22, question: "What is a good name worth?", options: ["Little", "Much", "Great riches", "Nothing"], answer: 2 },
  { chapter: 22, question: "What should you train up a child in?", options: ["The way he should go", "The way you want him to go", "The way of the world", "The way of wealth"], answer: 0 },
  { chapter: 23, question: "What should you not crave?", options: ["Wisdom", "Understanding", "Rulers' delicacies", "Knowledge"], answer: 2 },
  { chapter: 23, question: "What should you not envy?", options: ["Sinners", "The righteous", "The wise", "The foolish"], answer: 0 },
  { chapter: 24, question: "What should you not envy?", options: ["The wicked", "The righteous", "The wise", "The foolish"], answer: 0 },
  { chapter: 24, question: "What should you not desire?", options: ["Their company", "Their wealth", "Their power", "All of these"], answer: 3 },
  { chapter: 25, question: "What is it like to remove a garment on a cold day?", options: ["Vinegar on soda", "A song sung to a heavy heart", "Both", "Neither"], answer: 0 },
  { chapter: 25, question: "What is like a broken tooth?", options: ["A fool", "A wise man", "A wicked man", "A righteous man"], answer: 0 },
  { chapter: 26, question: "What should you not answer a fool according to?", options: ["His folly", "His wisdom", "His understanding", "His knowledge"], answer: 0 },
  { chapter: 26, question: "What is like a dog returning to its vomit?", options: ["A fool", "A wise man", "A wicked man", "A righteous man"], answer: 0 },
  { chapter: 27, question: "What should you not boast about?", options: ["Tomorrow", "Today", "Yesterday", "The future"], answer: 0 },
  { chapter: 27, question: "What is better than hidden love?", options: ["Open rebuke", "Secret praise", "Silent approval", "Public honor"], answer: 0 },
  { chapter: 28, question: "What does the wicked flee when no one pursues?", options: ["The righteous", "The wise", "The foolish", "No one"], answer: 3 },
  { chapter: 28, question: "What does the righteous have?", options: ["Confidence", "Fear", "Doubt", "Uncertainty"], answer: 0 },
  { chapter: 29, question: "What does a man who remains stiff-necked after many rebukes come to?", options: ["Wisdom", "Understanding", "Sudden destruction", "Great wealth"], answer: 2 },
  { chapter: 29, question: "What does the fear of man bring?", options: ["A snare", "Freedom", "Wisdom", "Understanding"], answer: 0 },
  { chapter: 30, question: "Who wrote Proverbs 30?", options: ["Solomon", "David", "Agur", "Lemuel"], answer: 2 },
  { chapter: 30, question: "What did Agur ask God not to give him?", options: ["Wealth", "Poverty", "Wisdom", "Understanding"], answer: 1 },
  { chapter: 31, question: "Who wrote Proverbs 31?", options: ["Solomon", "David", "Agur", "King Lemuel"], answer: 3 },
  { chapter: 31, question: "What is a wife of noble character worth?", options: ["Little", "Much", "Far more than rubies", "Nothing"], answer: 2 },
  { chapter: 31, question: "What does a wife of noble character do?", options: ["She works with eager hands", "She brings food from afar", "She considers a field and buys it", "All of these"], answer: 3 }
];

export default function ProverbsQuiz() {
  const [selected, setSelected] = useState<(number | null)[]>(Array(proverbsQuestions.length).fill(null));
  const [showAnswer, setShowAnswer] = useState<boolean[]>(Array(proverbsQuestions.length).fill(false));
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

  const correctCount = selected.filter((sel, i) => sel !== null && sel === proverbsQuestions[i].answer).length;
  const wrongCount = selected.filter((sel, i) => sel !== null && sel !== proverbsQuestions[i].answer).length;
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
              <CardTitle>Proverbs Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {proverbsQuestions.map((q, qIdx) => (
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