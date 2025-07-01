import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const nextQuizzes = [
  { title: "Psalms Quiz", description: "Explore the book of prayers and songs.", link: "/bible-questions-and-answers-hub/psalms" },
  { title: "Proverbs Quiz", description: "Learn wisdom sayings and teachings.", link: "/bible-questions-and-answers-hub/proverbs" },
  { title: "Esther Quiz", description: "Go back to the Jewish queen in Persia.", link: "/bible-questions-and-answers-hub/esther" },
  { title: "Nehemiah Quiz", description: "Review rebuilding Jerusalem's walls.", link: "/bible-questions-and-answers-hub/nehemiah" }
];

const jobQuestions = [
  { chapter: 1, question: "Where did Job live?", options: ["Uz", "Edom", "Midian", "Canaan"], answer: 0 },
  { chapter: 1, question: "What was Job's character like?", options: ["Blameless and upright", "Sinful and wicked", "Average and normal", "Unknown"], answer: 0 },
  { chapter: 1, question: "How many sons did Job have?", options: ["5", "7", "10", "12"], answer: 1 },
  { chapter: 1, question: "How many daughters did Job have?", options: ["3", "5", "7", "10"], answer: 0 },
  { chapter: 1, question: "What did Satan accuse Job of?", options: ["Serving God for nothing", "Being sinful", "Being rich", "Being poor"], answer: 0 },
  { chapter: 1, question: "What did God allow Satan to take from Job?", options: ["His wealth", "His children", "His health", "His wealth and children"], answer: 3 },
  { chapter: 2, question: "What did Satan ask to do to Job next?", options: ["Take his wife", "Take his health", "Take his friends", "Take his servants"], answer: 1 },
  { chapter: 2, question: "What did Job's wife tell him to do?", options: ["Curse God and die", "Pray harder", "Sacrifice more", "Move away"], answer: 0 },
  { chapter: 2, question: "What did Job say about receiving good and evil?", options: ["Only good", "Only evil", "Both good and evil", "Neither"], answer: 2 },
  { chapter: 3, question: "What did Job curse?", options: ["God", "His friends", "The day of his birth", "His wealth"], answer: 2 },
  { chapter: 4, question: "Who was Eliphaz?", options: ["Job's son", "Job's friend", "Job's servant", "Job's priest"], answer: 1 },
  { chapter: 4, question: "What did Eliphaz say about the innocent?", options: ["They never perish", "They always prosper", "They sometimes suffer", "They are never tested"], answer: 0 },
  { chapter: 5, question: "What did Eliphaz say God does to the foolish?", options: ["Blesses them", "Curses them", "Ignores them", "Teaches them"], answer: 1 },
  { chapter: 6, question: "What did Job say his words were like?", options: ["Wind", "Water", "Fire", "Earth"], answer: 0 },
  { chapter: 6, question: "What did Job ask his friends for?", options: ["Money", "Food", "Kindness", "Advice"], answer: 2 },
  { chapter: 7, question: "What did Job compare his life to?", options: ["A shadow", "A breath", "A flower", "All of these"], answer: 3 },
  { chapter: 8, question: "Who was Bildad?", options: ["Job's son", "Job's friend", "Job's servant", "Job's priest"], answer: 1 },
  { chapter: 8, question: "What did Bildad say about God's justice?", options: ["It's slow", "It's perfect", "It's harsh", "It's unfair"], answer: 1 },
  { chapter: 9, question: "What did Job say about God's power?", options: ["It's limited", "It's great", "It's weak", "It's unknown"], answer: 1 },
  { chapter: 9, question: "What did Job say about arguing with God?", options: ["It's easy", "It's impossible", "It's foolish", "It's necessary"], answer: 1 },
  { chapter: 10, question: "What did Job ask God not to do?", options: ["Bless him", "Curse him", "Condemn him", "Ignore him"], answer: 2 },
  { chapter: 11, question: "Who was Zophar?", options: ["Job's son", "Job's friend", "Job's servant", "Job's priest"], answer: 1 },
  { chapter: 11, question: "What did Zophar say about Job's sin?", options: ["It was small", "It was great", "It was none", "It was unknown"], answer: 1 },
  { chapter: 12, question: "What did Job say about wisdom?", options: ["It comes with age", "It comes from God", "It comes from experience", "It comes from books"], answer: 0 },
  { chapter: 13, question: "What did Job want to do with God?", options: ["Argue", "Pray", "Sacrifice", "Worship"], answer: 0 },
  { chapter: 14, question: "What did Job say about man's days?", options: ["They are few", "They are many", "They are eternal", "They are unknown"], answer: 0 },
  { chapter: 15, question: "What did Eliphaz accuse Job of?", options: ["Being wise", "Being foolish", "Being righteous", "Being sinful"], answer: 1 },
  { chapter: 16, question: "What did Job call his friends?", options: ["Worthless physicians", "Wise counselors", "Good friends", "True comforters"], answer: 0 },
  { chapter: 17, question: "What did Job say about his hope?", options: ["It was strong", "It was weak", "It was gone", "It was renewed"], answer: 2 },
  { chapter: 18, question: "What did Bildad say happens to the wicked?", options: ["They prosper", "They suffer", "They are forgotten", "They are remembered"], answer: 1 },
  { chapter: 19, question: "What did Job say his redeemer would do?", options: ["Punish him", "Save him", "Ignore him", "Curse him"], answer: 1 },
  { chapter: 19, question: "What did Job say he would see?", options: ["God", "His friends", "His family", "His wealth"], answer: 0 },
  { chapter: 20, question: "What did Zophar say about the triumph of the wicked?", options: ["It's long", "It's short", "It's eternal", "It's unknown"], answer: 1 },
  { chapter: 21, question: "What did Job say about the wicked?", options: ["They always suffer", "They often prosper", "They never prosper", "They always die young"], answer: 1 },
  { chapter: 22, question: "What did Eliphaz accuse Job of doing?", options: ["Being righteous", "Being sinful", "Being wise", "Being foolish"], answer: 1 },
  { chapter: 23, question: "What did Job say about God's presence?", options: ["He was always near", "He was far away", "He was everywhere", "He was nowhere"], answer: 1 },
  { chapter: 24, question: "What did Job say about the wicked?", options: ["They are always punished", "They often escape", "They never escape", "They always repent"], answer: 1 },
  { chapter: 25, question: "What did Bildad say about man?", options: ["He is pure", "He is righteous", "He is a maggot", "He is wise"], answer: 2 },
  { chapter: 26, question: "What did Job say about God's power?", options: ["It's limited", "It's great", "It's weak", "It's unknown"], answer: 1 },
  { chapter: 27, question: "What did Job swear by?", options: ["God", "His life", "His integrity", "His wealth"], answer: 1 },
  { chapter: 27, question: "What did Job say about the wicked?", options: ["They prosper", "They suffer", "They are blessed", "They are saved"], answer: 1 },
  { chapter: 28, question: "What did Job say about wisdom?", options: ["It's easy to find", "It's hard to find", "It's worthless", "It's everywhere"], answer: 1 },
  { chapter: 28, question: "Where does wisdom come from?", options: ["Man", "God", "Nature", "Books"], answer: 1 },
  { chapter: 29, question: "What did Job remember about his past?", options: ["His suffering", "His prosperity", "His friends", "His family"], answer: 1 },
  { chapter: 30, question: "What did Job say about his present?", options: ["He was blessed", "He was cursed", "He was ignored", "He was honored"], answer: 1 },
  { chapter: 31, question: "What did Job say about his integrity?", options: ["He had none", "He had some", "He had much", "He had complete"], answer: 3 },
  { chapter: 32, question: "Who was Elihu?", options: ["Job's son", "Job's friend", "A young man", "Job's servant"], answer: 2 },
  { chapter: 32, question: "Why was Elihu angry?", options: ["At Job", "At Job's friends", "At God", "At himself"], answer: 1 },
  { chapter: 33, question: "What did Elihu say about God's ways?", options: ["They are mysterious", "They are clear", "They are harsh", "They are unfair"], answer: 0 },
  { chapter: 34, question: "What did Elihu say about God's justice?", options: ["It's slow", "It's perfect", "It's harsh", "It's unfair"], answer: 1 },
  { chapter: 35, question: "What did Elihu say about righteousness?", options: ["It benefits God", "It benefits man", "It benefits both", "It benefits neither"], answer: 1 },
  { chapter: 36, question: "What did Elihu say about God's greatness?", options: ["It's limited", "It's great", "It's weak", "It's unknown"], answer: 1 },
  { chapter: 37, question: "What did Elihu say about God's voice?", options: ["It's quiet", "It's loud", "It's thunder", "It's silent"], answer: 2 },
  { chapter: 38, question: "Who finally spoke to Job?", options: ["Elihu", "Eliphaz", "God", "Satan"], answer: 2 },
  { chapter: 38, question: "What did God ask Job about?", options: ["His suffering", "His wealth", "The earth's foundation", "His friends"], answer: 2 },
  { chapter: 39, question: "What did God ask Job about?", options: ["Wild animals", "His suffering", "His friends", "His wealth"], answer: 0 },
  { chapter: 40, question: "What did Job say to God?", options: ["I will speak", "I will be quiet", "I will argue", "I will complain"], answer: 1 },
  { chapter: 40, question: "What did God ask Job about?", options: ["Behemoth", "His suffering", "His friends", "His wealth"], answer: 0 },
  { chapter: 41, question: "What did God ask Job about?", options: ["Leviathan", "His suffering", "His friends", "His wealth"], answer: 0 },
  { chapter: 42, question: "What did Job say about God?", options: ["I know everything", "I know nothing", "I know some things", "I know enough"], answer: 1 },
  { chapter: 42, question: "What did God restore to Job?", options: ["His wealth", "His family", "His health", "All of these"], answer: 3 },
  { chapter: 42, question: "How many years did Job live after his restoration?", options: ["70 years", "100 years", "120 years", "140 years"], answer: 3 }
];

export default function JobQuiz() {
  const [selected, setSelected] = useState<(number | null)[]>(Array(jobQuestions.length).fill(null));
  const [showAnswer, setShowAnswer] = useState<boolean[]>(Array(jobQuestions.length).fill(false));
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

  const correctCount = selected.filter((sel, i) => sel !== null && sel === jobQuestions[i].answer).length;
  const wrongCount = selected.filter((sel, i) => sel !== null && sel !== jobQuestions[i].answer).length;
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
              <CardTitle>Job Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {jobQuestions.map((q, qIdx) => (
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