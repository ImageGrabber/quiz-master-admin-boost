import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const nextQuizzes = [
  { title: "Proverbs Quiz", description: "Learn wisdom sayings and teachings.", link: "/bible-questions-and-answers-hub/proverbs" },
  { title: "Ecclesiastes Quiz", description: "Explore the meaning of life and wisdom.", link: "/bible-questions-and-answers-hub/ecclesiastes" },
  { title: "Job Quiz", description: "Go back to the story of suffering and faith.", link: "/bible-questions-and-answers-hub/job" },
  { title: "Esther Quiz", description: "Review the Jewish queen in Persia.", link: "/bible-questions-and-answers-hub/esther" }
];

const psalmsQuestions = [
  { chapter: 1, question: "What does the blessed man not do?", options: ["Walk in counsel of wicked", "Stand in way of sinners", "Sit in seat of mockers", "All of these"], answer: 3 },
  { chapter: 1, question: "What is the blessed man like?", options: ["A tree by water", "A rock in desert", "A flower in field", "A bird in sky"], answer: 0 },
  { chapter: 2, question: "What do the nations do against the Lord?", options: ["Rage", "Plot", "Rebel", "All of these"], answer: 3 },
  { chapter: 2, question: "What does God say to the nations?", options: ["Be wise", "Be warned", "Be afraid", "Be strong"], answer: 1 },
  { chapter: 3, question: "Who wrote Psalm 3?", options: ["David", "Solomon", "Moses", "Asaph"], answer: 0 },
  { chapter: 3, question: "What did David say about his enemies?", options: ["They were few", "They were many", "They were gone", "They were friends"], answer: 1 },
  { chapter: 4, question: "What did David ask God to do?", options: ["Hear his prayer", "Answer him", "Be gracious", "All of these"], answer: 3 },
  { chapter: 4, question: "What did David say about sleep?", options: ["It was hard", "It was easy", "It was peaceful", "It was troubled"], answer: 2 },
  { chapter: 8, question: "What did David marvel at?", options: ["God's creation", "God's power", "God's love", "All of these"], answer: 3 },
  { chapter: 8, question: "What did God make man to be?", options: ["A little lower than angels", "Higher than angels", "Equal to angels", "Lower than animals"], answer: 0 },
  { chapter: 11, question: "What did David say about the Lord?", options: ["He was his refuge", "He was his enemy", "He was far away", "He was sleeping"], answer: 0 },
  { chapter: 14, question: "What did the fool say in his heart?", options: ["There is no God", "There is no good", "There is no hope", "There is no love"], answer: 0 },
  { chapter: 15, question: "Who may dwell in God's sanctuary?", options: ["The rich", "The powerful", "The blameless", "The famous"], answer: 2 },
  { chapter: 16, question: "What did David say about the Lord?", options: ["He was his portion", "He was his enemy", "He was far away", "He was sleeping"], answer: 0 },
  { chapter: 19, question: "What do the heavens declare?", options: ["God's glory", "God's wrath", "God's silence", "God's absence"], answer: 0 },
  { chapter: 19, question: "What is the law of the Lord like?", options: ["Perfect", "Imperfect", "Unclear", "Unimportant"], answer: 0 },
  { chapter: 22, question: "What did David cry out?", options: ["My God, my God, why have you forsaken me?", "Help me, Lord", "Save me, Lord", "Hear me, Lord"], answer: 0 },
  { chapter: 22, question: "What did David say about God?", options: ["He was far away", "He was near", "He was sleeping", "He was angry"], answer: 0 },
  { chapter: 23, question: "What did David say the Lord was?", options: ["His shepherd", "His king", "His friend", "His father"], answer: 0 },
  { chapter: 23, question: "What did David say he would not want?", options: ["Food", "Water", "Rest", "Nothing"], answer: 3 },
  { chapter: 24, question: "What belongs to the Lord?", options: ["The earth", "The heavens", "Everything", "Nothing"], answer: 2 },
  { chapter: 24, question: "Who may ascend the hill of the Lord?", options: ["The rich", "The powerful", "The clean", "The famous"], answer: 2 },
  { chapter: 27, question: "What did David say about the Lord?", options: ["He was his light", "He was his salvation", "He was his stronghold", "All of these"], answer: 3 },
  { chapter: 27, question: "What did David ask to see?", options: ["God's face", "God's power", "God's glory", "God's wrath"], answer: 0 },
  { chapter: 32, question: "What is the person whose sin is forgiven like?", options: ["Blessed", "Cursed", "Average", "Unknown"], answer: 0 },
  { chapter: 32, question: "What did David say about keeping silent?", options: ["It was good", "It was bad", "It was necessary", "It was optional"], answer: 1 },
  { chapter: 37, question: "What did David say about the wicked?", options: ["They prosper", "They perish", "They live forever", "They are blessed"], answer: 1 },
  { chapter: 37, question: "What did David say about the righteous?", options: ["They suffer", "They inherit the land", "They die young", "They are cursed"], answer: 1 },
  { chapter: 42, question: "What did the psalmist thirst for?", options: ["Water", "God", "Food", "Rest"], answer: 1 },
  { chapter: 42, question: "What did the psalmist ask his soul?", options: ["Why are you downcast?", "Why are you happy?", "Why are you angry?", "Why are you afraid?"], answer: 0 },
  { chapter: 46, question: "What did the psalmist say about God?", options: ["He was their refuge", "He was their strength", "He was their help", "All of these"], answer: 3 },
  { chapter: 46, question: "What did the psalmist say about the earth?", options: ["It would last forever", "It would be removed", "It would be destroyed", "It would be renewed"], answer: 1 },
  { chapter: 51, question: "What did David ask God to do?", options: ["Have mercy", "Blot out his sin", "Wash him clean", "All of these"], answer: 3 },
  { chapter: 51, question: "What did David say about his sin?", options: ["It was small", "It was great", "It was none", "It was unknown"], answer: 1 },
  { chapter: 63, question: "What did David thirst for?", options: ["Water", "God", "Food", "Rest"], answer: 1 },
  { chapter: 63, question: "What did David say about God's love?", options: ["It was better than life", "It was worse than death", "It was equal to life", "It was unknown"], answer: 0 },
  { chapter: 73, question: "What did Asaph say about the wicked?", options: ["They always suffer", "They often prosper", "They never prosper", "They always die young"], answer: 1 },
  { chapter: 73, question: "What did Asaph say about the righteous?", options: ["They always prosper", "They often suffer", "They never suffer", "They always die young"], answer: 1 },
  { chapter: 84, question: "What did the psalmist say about God's dwelling?", options: ["It was lovely", "It was ugly", "It was far away", "It was unknown"], answer: 0 },
  { chapter: 84, question: "What did the psalmist prefer?", options: ["A day in God's courts", "A thousand elsewhere", "Both", "Neither"], answer: 0 },
  { chapter: 90, question: "Who wrote Psalm 90?", options: ["David", "Solomon", "Moses", "Asaph"], answer: 2 },
  { chapter: 90, question: "What did Moses say about man's days?", options: ["They are many", "They are few", "They are eternal", "They are unknown"], answer: 1 },
  { chapter: 91, question: "What did the psalmist say about dwelling in God's shelter?", options: ["It was dangerous", "It was safe", "It was unknown", "It was temporary"], answer: 1 },
  { chapter: 91, question: "What did God promise to those who love Him?", options: ["Wealth", "Power", "Deliverance", "Fame"], answer: 2 },
  { chapter: 100, question: "What did the psalmist call people to do?", options: ["Shout for joy", "Serve the Lord", "Come before Him", "All of these"], answer: 3 },
  { chapter: 100, question: "What did the psalmist say about the Lord?", options: ["He is good", "He is angry", "He is far away", "He is sleeping"], answer: 0 },
  { chapter: 103, question: "What did David say about the Lord?", options: ["He was his enemy", "He was his friend", "He was far away", "He was sleeping"], answer: 1 },
  { chapter: 103, question: "What did David say God does with our sins?", options: ["Remembers them", "Forgets them", "Punishes them", "Ignores them"], answer: 1 },
  { chapter: 119, question: "What is Psalm 119 about?", options: ["God's love", "God's law", "God's power", "God's wrath"], answer: 1 },
  { chapter: 119, question: "How many verses are in Psalm 119?", options: ["100", "150", "176", "200"], answer: 2 },
  { chapter: 121, question: "Where did the psalmist lift his eyes?", options: ["To the hills", "To the sky", "To the ground", "To the sea"], answer: 0 },
  { chapter: 121, question: "Where did the psalmist say his help comes from?", options: ["The hills", "The Lord", "Himself", "Others"], answer: 1 },
  { chapter: 127, question: "Who wrote Psalm 127?", options: ["David", "Solomon", "Moses", "Asaph"], answer: 1 },
  { chapter: 127, question: "What did Solomon say about building a house?", options: ["It's easy", "It's hard", "It's worthless without the Lord", "It's always successful"], answer: 2 },
  { chapter: 139, question: "What did David say about God's knowledge?", options: ["It was limited", "It was great", "It was complete", "It was unknown"], answer: 2 },
  { chapter: 139, question: "What did David say about God's presence?", options: ["It was limited", "It was everywhere", "It was nowhere", "It was unknown"], answer: 1 },
  { chapter: 150, question: "What did the psalmist call everything to do?", options: ["Praise the Lord", "Fear the Lord", "Serve the Lord", "Love the Lord"], answer: 0 },
  { chapter: 150, question: "What did the psalmist say about praising God?", options: ["It was optional", "It was required", "It was forbidden", "It was unknown"], answer: 1 }
];

export default function PsalmsQuiz() {
  const [selected, setSelected] = useState<(number | null)[]>(Array(psalmsQuestions.length).fill(null));
  const [showAnswer, setShowAnswer] = useState<boolean[]>(Array(psalmsQuestions.length).fill(false));
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

  const correctCount = selected.filter((sel, i) => sel !== null && sel === psalmsQuestions[i].answer).length;
  const wrongCount = selected.filter((sel, i) => sel !== null && sel !== psalmsQuestions[i].answer).length;
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
              <CardTitle>Psalms Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {psalmsQuestions.map((q, qIdx) => (
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