import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const nextQuizzes = [
  { title: "Micah Quiz", description: "Learn about justice and mercy.", link: "/bible-questions-and-answers-hub/micah" },
  { title: "Nahum Quiz", description: "Discover the prophecy against Nineveh.", link: "/bible-questions-and-answers-hub/nahum" },
  { title: "Obadiah Quiz", description: "Go back to Edom's judgment.", link: "/bible-questions-and-answers-hub/obadiah" },
  { title: "Amos Quiz", description: "Continue to the prophet of justice.", link: "/bible-questions-and-answers-hub/amos" }
];

const jonahQuestions = [
  { chapter: 1, question: "Where did God tell Jonah to go?", options: ["Jerusalem", "Nineveh", "Tarshish", "Babylon"], answer: 1 },
  { chapter: 1, question: "Where did Jonah try to flee?", options: ["Nineveh", "Tarshish", "Jerusalem", "Egypt"], answer: 1 },
  { chapter: 1, question: "What did Jonah do on the ship?", options: ["Prayed", "Slept", "Ate", "Sang"], answer: 1 },
  { chapter: 1, question: "What did the sailors do to Jonah?", options: ["Prayed for him", "Threw him overboard", "Ignored him", "Fed him"], answer: 1 },
  { chapter: 1, question: "What happened after Jonah was thrown overboard?", options: ["A storm came", "A fish swallowed him", "He drowned", "He swam to shore"], answer: 1 },
  { chapter: 1, question: "What did the sailors do before throwing Jonah overboard?", options: ["Prayed to their gods", "Tried to row to land", "Both", "Neither"], answer: 2 },
  { chapter: 1, question: "What did the captain ask Jonah to do?", options: ["Pray to his god", "Help row", "Jump overboard", "Be quiet"], answer: 0 },
  { chapter: 1, question: "What did the sailors ask Jonah?", options: ["What he had done", "Where he was from", "What his occupation was", "All of these"], answer: 3 },
  { chapter: 1, question: "What did Jonah tell the sailors about himself?", options: ["He was a Hebrew", "He feared the Lord", "He was fleeing from God", "All of these"], answer: 3 },
  { chapter: 1, question: "What did the sailors do when they heard Jonah's story?", options: ["Laughed at him", "Were afraid", "Ignored him", "Helped him"], answer: 1 },
  { chapter: 1, question: "What did the sailors do to try to save the ship?", options: ["Prayed to their gods", "Threw cargo overboard", "Both", "Neither"], answer: 2 },
  { chapter: 1, question: "What did the sailors say about Jonah's God?", options: ["He was weak", "He was strong", "He was merciful", "He was cruel"], answer: 1 },
  { chapter: 2, question: "How long was Jonah in the fish?", options: ["1 day", "2 days", "3 days", "4 days"], answer: 2 },
  { chapter: 2, question: "What did Jonah do in the fish?", options: ["Slept", "Prayed", "Ate", "Sang"], answer: 1 },
  { chapter: 2, question: "What did the fish do with Jonah?", options: ["Ate him", "Spit him onto dry land", "Kept him", "Ignored him"], answer: 1 },
  { chapter: 2, question: "What did Jonah say about being cast into the deep?", options: ["It was pleasant", "It was terrible", "It was peaceful", "It was exciting"], answer: 1 },
  { chapter: 2, question: "What did Jonah say about the waters?", options: ["They were calm", "They surrounded him", "They were warm", "They were shallow"], answer: 1 },
  { chapter: 2, question: "What did Jonah say about the currents?", options: ["They were gentle", "They were strong", "They were warm", "They were shallow"], answer: 1 },
  { chapter: 2, question: "What did Jonah say about the waves?", options: ["They were small", "They were large", "They were calm", "They were warm"], answer: 1 },
  { chapter: 2, question: "What did Jonah say about being driven from God's sight?", options: ["It was good", "It was bad", "It was peaceful", "It was exciting"], answer: 1 },
  { chapter: 2, question: "What did Jonah say about the temple?", options: ["He would never see it again", "He would see it again", "It was destroyed", "It was ignored"], answer: 1 },
  { chapter: 2, question: "What did Jonah say about the waters closing over him?", options: ["It was pleasant", "It was terrible", "It was peaceful", "It was exciting"], answer: 1 },
  { chapter: 2, question: "What did Jonah say about the weeds wrapping around his head?", options: ["It was pleasant", "It was terrible", "It was peaceful", "It was exciting"], answer: 1 },
  { chapter: 2, question: "What did Jonah say about going down to the mountains?", options: ["It was pleasant", "It was terrible", "It was peaceful", "It was exciting"], answer: 1 },
  { chapter: 2, question: "What did Jonah say about the earth's bars closing behind him?", options: ["It was pleasant", "It was terrible", "It was peaceful", "It was exciting"], answer: 1 },
  { chapter: 3, question: "What message did Jonah give Nineveh?", options: ["Repent or be destroyed", "Rejoice and be glad", "Fight your enemies", "Build a temple"], answer: 0 },
  { chapter: 3, question: "How did the people of Nineveh respond?", options: ["Ignored Jonah", "Repented", "Fought Jonah", "Laughed at Jonah"], answer: 1 },
  { chapter: 3, question: "What did the king of Nineveh do?", options: ["Ignored Jonah", "Repented", "Fought Jonah", "Laughed at Jonah"], answer: 1 },
  { chapter: 3, question: "What did God do for Nineveh?", options: ["Destroyed it", "Spared it", "Ignored it", "Blessed it"], answer: 1 },
  { chapter: 3, question: "How big was Nineveh?", options: ["A small city", "A large city", "A medium city", "A tiny village"], answer: 1 },
  { chapter: 3, question: "How long did it take to walk through Nineveh?", options: ["1 day", "2 days", "3 days", "4 days"], answer: 2 },
  { chapter: 3, question: "What did the king of Nineveh do when he heard Jonah's message?", options: ["Laughed", "Got angry", "Rose from his throne", "Ignored it"], answer: 2 },
  { chapter: 3, question: "What did the king of Nineveh do with his robe?", options: ["Wore it", "Tore it", "Sold it", "Gave it away"], answer: 1 },
  { chapter: 3, question: "What did the king of Nineveh do with his throne?", options: ["Sat on it", "Left it", "Destroyed it", "Gave it away"], answer: 1 },
  { chapter: 3, question: "What did the king of Nineveh do with his crown?", options: ["Wore it", "Took it off", "Destroyed it", "Gave it away"], answer: 1 },
  { chapter: 3, question: "What did the king of Nineveh decree for the people?", options: ["To fast", "To wear sackcloth", "To cry out to God", "All of these"], answer: 3 },
  { chapter: 3, question: "What did the king of Nineveh decree for the animals?", options: ["To eat", "To drink", "To fast", "To work"], answer: 2 },
  { chapter: 3, question: "What did the king of Nineveh decree for the animals?", options: ["To wear sackcloth", "To cry out", "To be quiet", "To work"], answer: 1 },
  { chapter: 3, question: "What did the king of Nineveh say about God?", options: ["He was angry", "He was merciful", "He was weak", "He was strong"], answer: 1 },
  { chapter: 3, question: "What did the king of Nineveh say about repentance?", options: ["It was useless", "It was helpful", "It was required", "It was optional"], answer: 1 },
  { chapter: 3, question: "What did the king of Nineveh say about God's anger?", options: ["It would continue", "It would turn away", "It would increase", "It would be ignored"], answer: 1 },
  { chapter: 4, question: "How did Jonah feel about God's mercy?", options: ["Happy", "Angry", "Sad", "Excited"], answer: 1 },
  { chapter: 4, question: "What did God provide for Jonah?", options: ["A plant", "A fish", "A house", "A boat"], answer: 0 },
  { chapter: 4, question: "What happened to the plant?", options: ["It grew", "It withered", "It was eaten", "It was moved"], answer: 1 },
  { chapter: 4, question: "What lesson did God teach Jonah?", options: ["Mercy", "Anger", "Pride", "Strength"], answer: 0 },
  { chapter: 4, question: "What did Jonah say about his anger?", options: ["It was justified", "It was wrong", "It was good", "It was bad"], answer: 0 },
  { chapter: 4, question: "What did Jonah say about death?", options: ["It was better than life", "It was worse than life", "It was the same as life", "It was ignored"], answer: 0 },
  { chapter: 4, question: "What did God ask Jonah about the plant?", options: ["Do you have a right to be angry?", "Do you like it?", "Do you want it?", "Do you need it?"], answer: 0 },
  { chapter: 4, question: "What did Jonah say about the plant?", options: ["He had a right to be angry", "He didn't care", "He was happy", "He was sad"], answer: 0 },
  { chapter: 4, question: "What did God say about the plant?", options: ["Jonah had a right to be angry", "Jonah didn't have a right to be angry", "Jonah should be happy", "Jonah should be sad"], answer: 1 },
  { chapter: 4, question: "What did God say about Nineveh?", options: ["It was a great city", "It was a small city", "It was a bad city", "It was a good city"], answer: 0 },
  { chapter: 4, question: "What did God say about the people of Nineveh?", options: ["They were wicked", "They were righteous", "They were ignorant", "They were wise"], answer: 2 },
  { chapter: 4, question: "What did God say about the animals in Nineveh?", options: ["They were many", "They were few", "They were none", "They were some"], answer: 0 },
  { chapter: 4, question: "What did God say about the plant that grew overnight?", options: ["Jonah had a right to be angry", "Jonah didn't have a right to be angry", "Jonah should be happy", "Jonah should be sad"], answer: 1 },
  { chapter: 4, question: "What did God say about the worm that destroyed the plant?", options: ["Jonah had a right to be angry", "Jonah didn't have a right to be angry", "Jonah should be happy", "Jonah should be sad"], answer: 1 },
  { chapter: 4, question: "What did God say about the scorching east wind?", options: ["Jonah had a right to be angry", "Jonah didn't have a right to be angry", "Jonah should be happy", "Jonah should be sad"], answer: 1 },
  { chapter: 4, question: "What did God say about Jonah's concern for the plant?", options: ["It was justified", "It was wrong", "It was good", "It was bad"], answer: 0 },
  { chapter: 4, question: "What did God say about his concern for Nineveh?", options: ["It was justified", "It was wrong", "It was good", "It was bad"], answer: 0 }
];

export default function JonahQuiz() {
  const [selected, setSelected] = useState<(number | null)[]>(Array(jonahQuestions.length).fill(null));
  const [showAnswer, setShowAnswer] = useState<boolean[]>(Array(jonahQuestions.length).fill(false));
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

  const correctCount = selected.filter((sel, i) => sel !== null && sel === jonahQuestions[i].answer).length;
  const wrongCount = selected.filter((sel, i) => sel !== null && sel !== jonahQuestions[i].answer).length;
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
              <CardTitle>Jonah Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {jonahQuestions.map((q, qIdx) => (
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