import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const nextQuizzes = [
  { title: "Jeremiah Quiz", description: "Learn about the weeping prophet.", link: "/bible-questions-and-answers-hub/jeremiah" },
  { title: "Lamentations Quiz", description: "Discover the book of sorrows.", link: "/bible-questions-and-answers-hub/lamentations" },
  { title: "Song of Solomon Quiz", description: "Go back to love poetry and allegory.", link: "/bible-questions-and-answers-hub/song-of-solomon" },
  { title: "Ecclesiastes Quiz", description: "Review the meaning of life and wisdom.", link: "/bible-questions-and-answers-hub/ecclesiastes" }
];

const isaiahQuestions = [
  { chapter: 1, question: "What did Isaiah see concerning Judah and Jerusalem?", options: ["A vision", "A dream", "A prophecy", "A message"], answer: 0 },
  { chapter: 1, question: "What did God say about Israel?", options: ["They were faithful", "They were rebellious", "They were wise", "They were strong"], answer: 1 },
  { chapter: 1, question: "What did God say about their sacrifices?", options: ["They were pleasing", "They were worthless", "They were necessary", "They were optional"], answer: 1 },
  { chapter: 2, question: "What will happen in the last days?", options: ["The mountain will be destroyed", "The mountain of the Lord will be established", "The mountain will move", "The mountain will disappear"], answer: 1 },
  { chapter: 2, question: "What will nations do?", options: ["Fight each other", "Stream to the mountain", "Ignore the mountain", "Destroy the mountain"], answer: 1 },
  { chapter: 3, question: "What will God take away from Jerusalem?", options: ["The temple", "The walls", "Supply and support", "The people"], answer: 2 },
  { chapter: 4, question: "What will the branch of the Lord be?", options: ["Beautiful", "Glorious", "Both", "Neither"], answer: 2 },
  { chapter: 5, question: "What did Isaiah sing about?", options: ["His beloved", "His vineyard", "His garden", "His field"], answer: 1 },
  { chapter: 5, question: "What did the vineyard produce?", options: ["Good grapes", "Wild grapes", "No grapes", "Rotten grapes"], answer: 1 },
  { chapter: 6, question: "In what year did Isaiah see the Lord?", options: ["The year King Uzziah died", "The year King Ahaz died", "The year King Hezekiah died", "The year King Josiah died"], answer: 0 },
  { chapter: 6, question: "What did Isaiah see?", options: ["The Lord sitting on a throne", "The Lord standing", "The Lord walking", "The Lord sleeping"], answer: 0 },
  { chapter: 6, question: "What did the seraphim call to each other?", options: ["Holy, holy, holy", "Glory, glory, glory", "Praise, praise, praise", "Worthy, worthy, worthy"], answer: 0 },
  { chapter: 6, question: "What did Isaiah say about himself?", options: ["I am clean", "I am holy", "I am ruined", "I am blessed"], answer: 2 },
  { chapter: 7, question: "Who was Ahaz?", options: ["King of Judah", "King of Israel", "King of Syria", "King of Assyria"], answer: 0 },
  { chapter: 7, question: "What sign did God offer Ahaz?", options: ["A child", "A star", "A miracle", "A victory"], answer: 0 },
  { chapter: 7, question: "What will the virgin conceive and bear?", options: ["A son", "A daughter", "A prophet", "A king"], answer: 0 },
  { chapter: 7, question: "What will the child be called?", options: ["Immanuel", "Jesus", "Messiah", "Savior"], answer: 0 },
  { chapter: 8, question: "What did Isaiah name his son?", options: ["Immanuel", "Maher-Shalal-Hash-Baz", "Shear-Jashub", "None of these"], answer: 1 },
  { chapter: 8, question: "What does Maher-Shalal-Hash-Baz mean?", options: ["God with us", "Quick to the plunder", "A remnant will return", "None of these"], answer: 1 },
  { chapter: 9, question: "What will the people who walked in darkness see?", options: ["A great light", "A great darkness", "A great storm", "A great fire"], answer: 0 },
  { chapter: 9, question: "What will be called Wonderful Counselor?", options: ["A child", "A son", "Both", "Neither"], answer: 2 },
  { chapter: 9, question: "What will be upon his shoulders?", options: ["The government", "The burden", "The glory", "The power"], answer: 0 },
  { chapter: 11, question: "What will come from the stump of Jesse?", options: ["A branch", "A shoot", "A sprout", "All of these"], answer: 3 },
  { chapter: 11, question: "What will rest on him?", options: ["The Spirit of the Lord", "The Spirit of wisdom", "The Spirit of understanding", "All of these"], answer: 3 },
  { chapter: 11, question: "What will the wolf do with the lamb?", options: ["Eat it", "Dwell with it", "Chase it", "Ignore it"], answer: 1 },
  { chapter: 12, question: "What will you say in that day?", options: ["I will praise you", "I will thank you", "I will sing to you", "All of these"], answer: 3 },
  { chapter: 12, question: "What is God's salvation?", options: ["My strength", "My song", "Both", "Neither"], answer: 2 },
  { chapter: 13, question: "What is the burden concerning Babylon?", options: ["A light message", "A heavy message", "A joyful message", "A peaceful message"], answer: 1 },
  { chapter: 13, question: "What will happen to Babylon?", options: ["It will prosper", "It will be destroyed", "It will grow", "It will move"], answer: 1 },
  { chapter: 14, question: "What will happen to the king of Babylon?", options: ["He will rise", "He will fall", "He will stay the same", "He will disappear"], answer: 1 },
  { chapter: 14, question: "What did the king say in his heart?", options: ["I will be humble", "I will ascend to heaven", "I will serve God", "I will be kind"], answer: 1 },
  { chapter: 20, question: "What did God tell Isaiah to do?", options: ["Go naked", "Go barefoot", "Both", "Neither"], answer: 2 },
  { chapter: 20, question: "How long did Isaiah go naked and barefoot?", options: ["1 year", "2 years", "3 years", "4 years"], answer: 2 },
  { chapter: 25, question: "What will God do to death?", options: ["Ignore it", "Accept it", "Swallow it up", "Fear it"], answer: 2 },
  { chapter: 25, question: "What will God wipe away?", options: ["Tears", "Sins", "Memories", "Fears"], answer: 0 },
  { chapter: 26, question: "What will the righteous nation do?", options: ["Enter", "Stay out", "Go around", "Ignore"], answer: 0 },
  { chapter: 26, question: "What will the dead do?", options: ["Stay dead", "Live", "Rise", "Disappear"], answer: 2 },
  { chapter: 35, question: "What will the desert do?", options: ["Stay dry", "Bloom", "Disappear", "Grow larger"], answer: 1 },
  { chapter: 35, question: "What will the lame do?", options: ["Stay lame", "Walk", "Run", "Leap"], answer: 3 },
  { chapter: 35, question: "What will the mute do?", options: ["Stay mute", "Whisper", "Speak", "Shout"], answer: 2 },
  { chapter: 40, question: "What did the voice say to cry out?", options: ["Comfort", "War", "Peace", "Joy"], answer: 0 },
  { chapter: 40, question: "What will every valley be?", options: ["Deeper", "Exalted", "Filled", "Wider"], answer: 1 },
  { chapter: 40, question: "What will every mountain be?", options: ["Higher", "Lower", "Moved", "Destroyed"], answer: 1 },
  { chapter: 40, question: "What is the grass like?", options: ["Strong", "Weak", "Eternal", "Temporary"], answer: 3 },
  { chapter: 40, question: "What is the word of our God like?", options: ["Weak", "Strong", "Temporary", "Eternal"], answer: 3 },
  { chapter: 42, question: "Who is God's servant?", options: ["Isaiah", "Jeremiah", "The Messiah", "David"], answer: 2 },
  { chapter: 42, question: "What will the servant not do?", options: ["Cry out", "Raise his voice", "Both", "Neither"], answer: 2 },
  { chapter: 42, question: "What will the servant not break?", options: ["A bruised reed", "A sword", "A shield", "A wall"], answer: 0 },
  { chapter: 49, question: "What did the Lord call the servant from the womb?", options: ["My son", "My servant", "My prophet", "My king"], answer: 1 },
  { chapter: 49, question: "What will the servant be?", options: ["A light to the nations", "A sword to the nations", "A shield to the nations", "A wall to the nations"], answer: 0 },
  { chapter: 50, question: "What did the servant not do?", options: ["Rebel", "Turn back", "Both", "Neither"], answer: 2 },
  { chapter: 50, question: "What did the servant give to his back?", options: ["Clothes", "Protection", "Strikes", "Comfort"], answer: 2 },
  { chapter: 52, question: "What will the watchmen do?", options: ["Sleep", "Sing", "Fight", "Run"], answer: 1 },
  { chapter: 52, question: "What will they see?", options: ["The Lord returning", "The Lord leaving", "The Lord sleeping", "The Lord hiding"], answer: 0 },
  { chapter: 53, question: "What did the servant have no beauty or majesty to attract us to him?", options: ["Nothing", "Something", "Everything", "Anything"], answer: 0 },
  { chapter: 53, question: "What was the servant like?", options: ["A lamb", "A sheep", "Both", "Neither"], answer: 1 },
  { chapter: 53, question: "What did the servant bear?", options: ["Our sins", "Our burdens", "Our sorrows", "All of these"], answer: 3 },
  { chapter: 53, question: "What did we consider the servant?", options: ["Blessed", "Cursed", "Stricken by God", "Favored by God"], answer: 2 },
  { chapter: 53, question: "What did the servant do for our transgressions?", options: ["Nothing", "Something", "Everything", "Was pierced"], answer: 3 },
  { chapter: 53, question: "What did the servant do for our iniquities?", options: ["Nothing", "Something", "Everything", "Was crushed"], answer: 3 },
  { chapter: 53, question: "What did the servant make?", options: ["Many rich", "Many poor", "Many angry", "Many sad"], answer: 0 },
  { chapter: 55, question: "What did God invite people to come and buy?", options: ["Wine", "Milk", "Both", "Neither"], answer: 2 },
  { chapter: 55, question: "What did God say about his thoughts?", options: ["They are like man's", "They are higher than man's", "They are lower than man's", "They are the same as man's"], answer: 1 },
  { chapter: 55, question: "What will God's word not return to him?", options: ["Empty", "Full", "Strong", "Weak"], answer: 0 },
  { chapter: 60, question: "What will arise?", options: ["Darkness", "Light", "Storm", "Cloud"], answer: 1 },
  { chapter: 60, question: "What will the glory of the Lord be?", options: ["Hidden", "Revealed", "Destroyed", "Forgotten"], answer: 1 },
  { chapter: 61, question: "What did the Spirit of the Lord anoint the servant to do?", options: ["Preach good news", "Bind up the brokenhearted", "Proclaim freedom", "All of these"], answer: 3 },
  { chapter: 61, question: "What will the Lord provide?", options: ["Beauty for ashes", "Joy for mourning", "Praise for despair", "All of these"], answer: 3 },
  { chapter: 65, question: "What will God create?", options: ["New heavens", "New earth", "Both", "Neither"], answer: 2 },
  { chapter: 65, question: "What will not be remembered?", options: ["The past", "The future", "The present", "Nothing"], answer: 0 },
  { chapter: 66, question: "What did God say about heaven?", options: ["It is my throne", "It is my footstool", "Both", "Neither"], answer: 2 },
  { chapter: 66, question: "What did God say about earth?", options: ["It is my throne", "It is my footstool", "Both", "Neither"], answer: 1 }
];

export default function IsaiahQuiz() {
  const [selected, setSelected] = useState<(number | null)[]>(Array(isaiahQuestions.length).fill(null));
  const [showAnswer, setShowAnswer] = useState<boolean[]>(Array(isaiahQuestions.length).fill(false));
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

  const correctCount = selected.filter((sel, i) => sel !== null && sel === isaiahQuestions[i].answer).length;
  const wrongCount = selected.filter((sel, i) => sel !== null && sel !== isaiahQuestions[i].answer).length;
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
              <CardTitle>Isaiah Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {isaiahQuestions.map((q, qIdx) => (
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