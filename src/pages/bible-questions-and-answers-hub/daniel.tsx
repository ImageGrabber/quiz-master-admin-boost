import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const nextQuizzes = [
  { title: "Isaiah Quiz", description: "Go back to the prince of prophets.", link: "/bible-questions-and-answers-hub/isaiah" },
  { title: "Jeremiah Quiz", description: "Continue to the weeping prophet.", link: "/bible-questions-and-answers-hub/jeremiah" },
  { title: "Ezekiel Quiz", description: "Review the prophet of visions.", link: "/bible-questions-and-answers-hub/ezekiel" },
  { title: "Lamentations Quiz", description: "Discover the book of sorrows.", link: "/bible-questions-and-answers-hub/lamentations" }
];

const danielQuestions = [
  { chapter: 1, question: "Who took Daniel and his friends captive?", options: ["Nebuchadnezzar", "Belshazzar", "Darius", "Cyrus"], answer: 0 },
  { chapter: 1, question: "What did Nebuchadnezzar want Daniel and his friends to learn?", options: ["The language of the Chaldeans", "The law of Moses", "The wisdom of Egypt", "The ways of Babylon"], answer: 0 },
  { chapter: 1, question: "What did Daniel refuse to eat?", options: ["The king's food", "Vegetables", "Water", "Bread"], answer: 0 },
  { chapter: 1, question: "What did Daniel ask to eat instead?", options: ["Vegetables and water", "Meat and wine", "Bread and water", "Fruit and milk"], answer: 0 },
  { chapter: 1, question: "How did Daniel and his friends look after 10 days?", options: ["Worse", "Better", "The same", "Sick"], answer: 1 },
  { chapter: 1, question: "What did God give Daniel and his friends?", options: ["Knowledge", "Skill", "Understanding", "All of these"], answer: 3 },
  { chapter: 2, question: "What did Nebuchadnezzar dream about?", options: ["A tree", "A statue", "A beast", "A mountain"], answer: 1 },
  { chapter: 2, question: "What was the statue's head made of?", options: ["Gold", "Silver", "Bronze", "Iron"], answer: 0 },
  { chapter: 2, question: "What was the statue's chest made of?", options: ["Gold", "Silver", "Bronze", "Iron"], answer: 1 },
  { chapter: 2, question: "What was the statue's belly made of?", options: ["Gold", "Silver", "Bronze", "Iron"], answer: 2 },
  { chapter: 2, question: "What was the statue's legs made of?", options: ["Gold", "Silver", "Bronze", "Iron"], answer: 3 },
  { chapter: 2, question: "What was the statue's feet made of?", options: ["Iron and clay", "Gold and silver", "Bronze and iron", "Clay and stone"], answer: 0 },
  { chapter: 2, question: "What did the stone do to the statue?", options: ["Built it", "Destroyed it", "Moved it", "Ignored it"], answer: 1 },
  { chapter: 2, question: "What did the stone become?", options: ["A mountain", "A hill", "A rock", "A boulder"], answer: 0 },
  { chapter: 2, question: "What did Daniel say about the dream?", options: ["It was about the past", "It was about the present", "It was about the future", "It was about nothing"], answer: 2 },
  { chapter: 2, question: "What did Daniel say about the interpretation?", options: ["It was from man", "It was from God", "It was from the stars", "It was from nature"], answer: 1 },
  { chapter: 3, question: "What did Nebuchadnezzar build?", options: ["A temple", "A palace", "A golden image", "A wall"], answer: 2 },
  { chapter: 3, question: "How tall was the image?", options: ["30 cubits", "60 cubits", "90 cubits", "120 cubits"], answer: 1 },
  { chapter: 3, question: "What did Nebuchadnezzar command everyone to do?", options: ["Worship the image", "Destroy the image", "Ignore the image", "Move the image"], answer: 0 },
  { chapter: 3, question: "Who refused to worship the image?", options: ["Shadrach", "Meshach", "Abednego", "All of these"], answer: 3 },
  { chapter: 3, question: "What did Nebuchadnezzar do to them?", options: ["Blessed them", "Threw them into a furnace", "Imprisoned them", "Killed them"], answer: 1 },
  { chapter: 3, question: "How hot was the furnace?", options: ["3 times hotter", "5 times hotter", "7 times hotter", "10 times hotter"], answer: 2 },
  { chapter: 3, question: "How many men did Nebuchadnezzar see in the furnace?", options: ["1", "2", "3", "4"], answer: 3 },
  { chapter: 3, question: "What did the fourth man look like?", options: ["A man", "A son of the gods", "An angel", "A king"], answer: 1 },
  { chapter: 3, question: "What happened to the three men?", options: ["They died", "They were burned", "They were unharmed", "They were injured"], answer: 2 },
  { chapter: 4, question: "What did Nebuchadnezzar dream about?", options: ["A tree", "A statue", "A beast", "A mountain"], answer: 0 },
  { chapter: 4, question: "What happened to the tree?", options: ["It grew", "It was cut down", "It bore fruit", "It died"], answer: 1 },
  { chapter: 4, question: "What did the tree represent?", options: ["Nebuchadnezzar", "Babylon", "The kingdom", "All of these"], answer: 0 },
  { chapter: 4, question: "What did Daniel tell Nebuchadnezzar to do?", options: ["Repent", "Fight", "Flee", "Pray"], answer: 0 },
  { chapter: 4, question: "What happened to Nebuchadnezzar?", options: ["He was blessed", "He was cursed", "He was driven away", "He was killed"], answer: 2 },
  { chapter: 4, question: "What did Nebuchadnezzar become like?", options: ["A man", "An animal", "A bird", "A fish"], answer: 1 },
  { chapter: 4, question: "How long did this last?", options: ["3 years", "5 years", "7 years", "10 years"], answer: 2 },
  { chapter: 4, question: "What did Nebuchadnezzar do when he was restored?", options: ["Praised God", "Cursed God", "Ignored God", "Fought God"], answer: 0 },
  { chapter: 5, question: "Who was Belshazzar?", options: ["Nebuchadnezzar's son", "Nebuchadnezzar's grandson", "Nebuchadnezzar's brother", "Nebuchadnezzar's father"], answer: 1 },
  { chapter: 5, question: "What did Belshazzar do with the vessels from the temple?", options: ["Worshiped them", "Used them for drinking", "Destroyed them", "Returned them"], answer: 1 },
  { chapter: 5, question: "What appeared on the wall?", options: ["A hand", "A foot", "A face", "A body"], answer: 0 },
  { chapter: 5, question: "What did the hand write?", options: ["MENE", "TEKEL", "PARSIN", "All of these"], answer: 3 },
  { chapter: 5, question: "What did Daniel say MENE meant?", options: ["God has numbered", "God has weighed", "God has divided", "God has blessed"], answer: 0 },
  { chapter: 5, question: "What did Daniel say TEKEL meant?", options: ["God has numbered", "God has weighed", "God has divided", "God has blessed"], answer: 1 },
  { chapter: 5, question: "What did Daniel say PARSIN meant?", options: ["God has numbered", "God has weighed", "God has divided", "God has blessed"], answer: 2 },
  { chapter: 5, question: "What happened to Belshazzar that night?", options: ["He was blessed", "He was killed", "He was imprisoned", "He was exiled"], answer: 1 },
  { chapter: 6, question: "Who was Darius?", options: ["King of Babylon", "King of Media", "King of Persia", "King of Greece"], answer: 2 },
  { chapter: 6, question: "What did Darius plan to do with Daniel?", options: ["Kill him", "Imprison him", "Promote him", "Exile him"], answer: 2 },
  { chapter: 6, question: "What did the other officials do?", options: ["Helped Daniel", "Plotted against Daniel", "Ignored Daniel", "Praised Daniel"], answer: 1 },
  { chapter: 6, question: "What did they trick Darius into doing?", options: ["Blessing Daniel", "Cursing Daniel", "Making a decree", "Killing Daniel"], answer: 2 },
  { chapter: 6, question: "What did the decree say?", options: ["Pray to God", "Pray to the king", "Pray to no one", "Pray to idols"], answer: 1 },
  { chapter: 6, question: "What did Daniel do?", options: ["Obeyed the decree", "Disobeyed the decree", "Ignored the decree", "Changed the decree"], answer: 1 },
  { chapter: 6, question: "What did Daniel do three times a day?", options: ["Ate", "Slept", "Prayed", "Worked"], answer: 2 },
  { chapter: 6, question: "What did Darius do to Daniel?", options: ["Blessed him", "Threw him to the lions", "Imprisoned him", "Killed him"], answer: 1 },
  { chapter: 6, question: "What did Darius say to Daniel?", options: ["May your God save you", "May the lions save you", "May the king save you", "May nothing save you"], answer: 0 },
  { chapter: 6, question: "What happened to Daniel in the lions' den?", options: ["He was killed", "He was injured", "He was unharmed", "He was scared"], answer: 2 },
  { chapter: 6, question: "What did God do?", options: ["Sent an angel", "Closed the lions' mouths", "Both", "Neither"], answer: 2 },
  { chapter: 6, question: "What happened to Daniel's accusers?", options: ["They were blessed", "They were killed by lions", "They were imprisoned", "They were exiled"], answer: 1 },
  { chapter: 7, question: "What did Daniel see in his vision?", options: ["Four beasts", "Four angels", "Four kings", "Four kingdoms"], answer: 0 },
  { chapter: 7, question: "What was the first beast like?", options: ["A lion", "A bear", "A leopard", "A dragon"], answer: 0 },
  { chapter: 7, question: "What was the second beast like?", options: ["A lion", "A bear", "A leopard", "A dragon"], answer: 1 },
  { chapter: 7, question: "What was the third beast like?", options: ["A lion", "A bear", "A leopard", "A dragon"], answer: 2 },
  { chapter: 7, question: "What was the fourth beast like?", options: ["A lion", "A bear", "A leopard", "A dragon"], answer: 3 },
  { chapter: 7, question: "What did the fourth beast have?", options: ["One horn", "Two horns", "Three horns", "Ten horns"], answer: 3 },
  { chapter: 7, question: "What did Daniel see coming?", options: ["A beast", "A man", "A son of man", "An angel"], answer: 2 },
  { chapter: 7, question: "What did the son of man receive?", options: ["A kingdom", "A sword", "A crown", "A throne"], answer: 0 },
  { chapter: 8, question: "What did Daniel see in his vision?", options: ["A ram", "A goat", "Both", "Neither"], answer: 2 },
  { chapter: 8, question: "What did the ram have?", options: ["One horn", "Two horns", "Three horns", "No horns"], answer: 1 },
  { chapter: 8, question: "What did the goat have?", options: ["One horn", "Two horns", "Three horns", "No horns"], answer: 0 },
  { chapter: 8, question: "What happened to the goat's horn?", options: ["It grew", "It was broken", "It fell off", "It was replaced"], answer: 1 },
  { chapter: 8, question: "What grew in its place?", options: ["One horn", "Two horns", "Three horns", "Four horns"], answer: 3 },
  { chapter: 8, question: "What did the little horn do?", options: ["Grew great", "Became small", "Disappeared", "Changed color"], answer: 0 },
  { chapter: 8, question: "What did the little horn do to the sanctuary?", options: ["Built it", "Destroyed it", "Cleaned it", "Moved it"], answer: 1 },
  { chapter: 9, question: "What did Daniel do when he read Jeremiah's prophecy?", options: ["Rejoiced", "Prayed", "Wept", "Laughed"], answer: 1 },
  { chapter: 9, question: "How long was the captivity to last?", options: ["50 years", "60 years", "70 years", "80 years"], answer: 2 },
  { chapter: 9, question: "What did Daniel confess?", options: ["His sins", "His righteousness", "His wisdom", "His strength"], answer: 0 },
  { chapter: 9, question: "What did Daniel confess?", options: ["His people's sins", "His people's righteousness", "His people's wisdom", "His people's strength"], answer: 0 },
  { chapter: 9, question: "What did Daniel ask God to do?", options: ["Curse them", "Bless them", "Forgive them", "Ignore them"], answer: 2 },
  { chapter: 9, question: "What did Gabriel tell Daniel?", options: ["The captivity would end", "The captivity would continue", "The captivity would get worse", "The captivity would be forgotten"], answer: 0 },
  { chapter: 9, question: "What did Gabriel tell Daniel about the Messiah?", options: ["He would come soon", "He would come in 70 weeks", "He would never come", "He would come later"], answer: 1 },
  { chapter: 10, question: "What did Daniel see?", options: ["A man", "An angel", "A vision", "All of these"], answer: 3 },
  { chapter: 10, question: "What did the man look like?", options: ["Ordinary", "Extraordinary", "Terrible", "Beautiful"], answer: 1 },
  { chapter: 10, question: "What did the man tell Daniel?", options: ["He was loved", "He was hated", "He was ignored", "He was cursed"], answer: 0 },
  { chapter: 10, question: "What did the man tell Daniel about the future?", options: ["It would be good", "It would be bad", "It would be revealed", "It would be hidden"], answer: 2 },
  { chapter: 11, question: "What did the angel tell Daniel about?", options: ["The past", "The present", "The future", "All of these"], answer: 2 },
  { chapter: 11, question: "What did the angel tell Daniel about the kings?", options: ["They would be good", "They would be bad", "They would fight", "They would be peaceful"], answer: 2 },
  { chapter: 11, question: "What did the angel tell Daniel about the temple?", options: ["It would be built", "It would be destroyed", "It would be cleansed", "It would be moved"], answer: 1 },
  { chapter: 11, question: "What did the angel tell Daniel about the abomination?", options: ["It would be set up", "It would be destroyed", "It would be ignored", "It would be blessed"], answer: 0 },
  { chapter: 12, question: "What did the angel tell Daniel about the end?", options: ["It would be good", "It would be bad", "It would be terrible", "It would be wonderful"], answer: 2 },
  { chapter: 12, question: "What did the angel tell Daniel about the wise?", options: ["They would be cursed", "They would be blessed", "They would shine", "They would be hidden"], answer: 2 },
  { chapter: 12, question: "What did the angel tell Daniel about the resurrection?", options: ["It would not happen", "It would happen", "It would be partial", "It would be complete"], answer: 1 },
  { chapter: 12, question: "What did the angel tell Daniel about the book?", options: ["It would be closed", "It would be opened", "It would be sealed", "It would be destroyed"], answer: 1 },
  { chapter: 12, question: "What did the angel tell Daniel about the time?", options: ["It was near", "It was far", "It was delayed", "It was cancelled"], answer: 0 },
  { chapter: 12, question: "What did the angel tell Daniel about his rest?", options: ["It would be short", "It would be long", "It would be eternal", "It would be temporary"], answer: 1 }
];

export default function DanielQuiz() {
  const [selected, setSelected] = useState<(number | null)[]>(Array(danielQuestions.length).fill(null));
  const [showAnswer, setShowAnswer] = useState<boolean[]>(Array(danielQuestions.length).fill(false));
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

  const correctCount = selected.filter((sel, i) => sel !== null && sel === danielQuestions[i].answer).length;
  const wrongCount = selected.filter((sel, i) => sel !== null && sel !== danielQuestions[i].answer).length;
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
              <CardTitle>Daniel Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {danielQuestions.map((q, qIdx) => (
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