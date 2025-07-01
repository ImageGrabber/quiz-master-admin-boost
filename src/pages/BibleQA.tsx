import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

const bibleBooks = {
  oldTestament: {
    Pentateuch: ["Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy"],
    Historical: [
      "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel", "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra", "Nehemiah", "Esther"
    ],
    Wisdom: ["Job", "Psalms", "Proverbs", "Ecclesiastes", "Song of Solomon"],
    MajorProphets: ["Isaiah", "Jeremiah", "Lamentations", "Ezekiel", "Daniel"],
    MinorProphets: [
      "Hosea", "Joel", "Amos", "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi"
    ]
  },
  newTestament: {
    Gospels: ["Matthew", "Mark", "Luke", "John"],
    Historical: ["Acts"],
    PaulineEpistles: [
      "Romans", "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians", "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians", "1 Timothy", "2 Timothy", "Titus", "Philemon"
    ],
    GeneralEpistles: [
      "Hebrews", "James", "1 Peter", "2 Peter", "1 John", "2 John", "3 John", "Jude"
    ],
    Apocalyptic: ["Revelation"]
  }
};

const characters = {
  oldTestament: [
    "Adam and Eve", "Noah", "Abraham", "Isaac", "Jacob", "Joseph", "Moses", "Joshua", "Ruth", "Samuel", "Saul", "David", "Solomon", "Elijah", "Elisha", "Daniel", "Esther", "Nehemiah", "Job", "Isaiah", "Jeremiah"
  ],
  newTestament: [
    "Jesus Christ", "John the Baptist", "Peter", "Paul", "Mary", "Martha", "Lazarus", "James", "John the Apostle", "Timothy", "Barnabas", "Stephen", "Philip", "Judas Iscariot"
  ]
};

const categories = [
  "Faith", "Hope", "Love", "Grace", "Salvation", "Covenant", "Prophecy", "Parables", "Miracles", "Beatitudes", "Fruits of the Spirit", "Armor of God", "End Times"
];

const events = [
  "Creation", "The Flood", "Exodus", "Conquest of Canaan", "Kingdom of Israel", "Babylonian Exile", "Life of Jesus", "Crucifixion and Resurrection", "Early Church", "Missionary Journeys of Paul", "Revelation Events", "Holy Land Geography"
];

const holidays = ["Christmas", "Easter", "Pentecost", "Passover"];
const kids = ["Bible Stories for Kids", "Animals in the Bible", "Heroes of the Bible", "Bible Verses for Kids"];
const advanced = ["Biblical Languages", "Historical Context", "Doctrinal Beliefs", "Church History"];

export default function BibleQA() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-white flex flex-col">
      {/* Navbar */}
      <header className="bg-white/70 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate("/")}> 
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

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-blue-100 via-purple-50 to-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Bible Quiz Question and Answers</h1>
          <p className="text-lg text-gray-700 mb-6">
            Welcome to the Bible quiz question and answers hub! This is your gateway to a comprehensive collection of quizzes covering every book of the Bible. Whether you're preparing for a competition, studying for personal growth, or just testing your knowledge, our quizzes are designed to challenge and inspire you. Click on any book below to start your quiz journey.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">Genesis Quiz</span>
            <span className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">Matthew Quiz</span>
            <span className="inline-block bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-semibold">Moses Quiz</span>
            <span className="inline-block bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold">Faith Quiz</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-10">
        {/* Old Testament Section */}
        <Card className="mb-8 shadow-lg border-0">
          <CardHeader>
            <CardTitle>Old Testament Quizzes</CardTitle>
            <CardDescription>Bible Quiz Question and Answers for Old Testament Books</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-gray-600">
              The Old Testament is the first section of the Christian Bible, consisting of religious texts sacred in both Judaism and Christianity. It is composed of a collection of books that include historical accounts, laws, prophecies, and poetry. The Old Testament lays the foundation for the beliefs and practices of the Jewish faith and introduces key figures such as Abraham, Moses, David, and the prophets. It also outlines the covenant between God and the people of Israel, detailing their history, struggles, and relationship with God.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Pentateuch (Torah):</h3>
                <ul className="list-disc ml-6 mb-4">
                  {bibleBooks.oldTestament.Pentateuch.map(book => (
                    <li key={book}><Link to={`/bible-questions-and-answers-hub/${book.toLowerCase()}`} className="text-blue-700 hover:underline">{book} Quiz</Link></li>
                  ))}
                </ul>
                <h3 className="font-semibold mb-2">Historical Books:</h3>
                <ul className="list-disc ml-6 mb-4">
                  {bibleBooks.oldTestament.Historical.map(book => (
                    <li key={book}><Link to={`/bible-questions-and-answers-hub/${book.toLowerCase().replace(/ /g, '-')}`} className="text-blue-700 hover:underline">{book} Quiz</Link></li>
                  ))}
                </ul>
                <h3 className="font-semibold mb-2">Wisdom Literature:</h3>
                <ul className="list-disc ml-6 mb-4">
                  {bibleBooks.oldTestament.Wisdom.map(book => (
                    <li key={book}><Link to={`/bible-questions-and-answers-hub/${book.toLowerCase()}`} className="text-blue-700 hover:underline">{book} Quiz</Link></li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Major Prophets:</h3>
                <ul className="list-disc ml-6 mb-4">
                  {bibleBooks.oldTestament.MajorProphets.map(book => (
                    <li key={book}><Link to={`/bible-questions-and-answers-hub/${book.toLowerCase()}`} className="text-blue-700 hover:underline">{book} Quiz</Link></li>
                  ))}
                </ul>
                <h3 className="font-semibold mb-2">Minor Prophets:</h3>
                <ul className="list-disc ml-6 mb-4">
                  {bibleBooks.oldTestament.MinorProphets.map(book => (
                    <li key={book}><Link to={`/bible-questions-and-answers-hub/${book.toLowerCase()}`} className="text-blue-700 hover:underline">{book} Quiz</Link></li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* New Testament Section */}
        <Card className="mb-8 shadow-lg border-0">
          <CardHeader>
            <CardTitle>New Testament Quizzes</CardTitle>
            <CardDescription>Bible Quiz Question and Answers for New Testament Books</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-gray-600">
              The New Testament is the second section of the Christian Bible, focusing on the life, teachings, death, and resurrection of Jesus Christ, as well as the early Christian Church's formation and spread. It consists of the Gospels, which recount the story of Jesus, the Acts of the Apostles, various Epistles (letters) written by early Christian leaders, and the Book of Revelation, which contains apocalyptic visions. The New Testament is central to Christian theology, emphasizing the new covenant between God and humanity through Jesus Christ and offering guidance for Christian living.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Gospels:</h3>
                <ul className="list-disc ml-6 mb-4">
                  {bibleBooks.newTestament.Gospels.map(book => (
                    <li key={book}><Link to={`/bible-questions-and-answers-hub/${book.toLowerCase()}`} className="text-blue-700 hover:underline">{book} Quiz</Link></li>
                  ))}
                </ul>
                <h3 className="font-semibold mb-2">Historical Books:</h3>
                <ul className="list-disc ml-6 mb-4">
                  {bibleBooks.newTestament.Historical.map(book => (
                    <li key={book}><Link to={`/bible-questions-and-answers-hub/${book.toLowerCase()}`} className="text-blue-700 hover:underline">{book} Quiz</Link></li>
                  ))}
                </ul>
                <h3 className="font-semibold mb-2">Pauline Epistles:</h3>
                <ul className="list-disc ml-6 mb-4">
                  {bibleBooks.newTestament.PaulineEpistles.map(book => (
                    <li key={book}><Link to={`/bible-questions-and-answers-hub/${book.toLowerCase().replace(/ /g, '-')}`} className="text-blue-700 hover:underline">{book} Quiz</Link></li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">General Epistles:</h3>
                <ul className="list-disc ml-6 mb-4">
                  {bibleBooks.newTestament.GeneralEpistles.map(book => (
                    <li key={book}><Link to={`/bible-questions-and-answers-hub/${book.toLowerCase().replace(/ /g, '-')}`} className="text-blue-700 hover:underline">{book} Quiz</Link></li>
                  ))}
                </ul>
                <h3 className="font-semibold mb-2">Apocalyptic Literature:</h3>
                <ul className="list-disc ml-6 mb-4">
                  {bibleBooks.newTestament.Apocalyptic.map(book => (
                    <li key={book}><Link to={`/bible-questions-and-answers-hub/${book.toLowerCase()}`} className="text-blue-700 hover:underline">{book} Quiz</Link></li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Characters Section */}
        <Card className="mb-8 shadow-lg border-0">
          <CardHeader>
            <CardTitle>Bible Characters Quizzes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-gray-600">
              Bible Characters Quizzes are engaging and educational quizzes that test your knowledge of the many individuals featured throughout the Bible. These quizzes cover a wide range of biblical figures, from well-known personalities like Adam, Moses, and Jesus to lesser-known characters such as Deborah, Barnabas, and Lydia. Each quiz provides questions that delve into the lives, actions, and significance of these characters, offering a fun way to learn more about their roles in biblical narratives and their impact on faith and history. Whether you're a beginner or an experienced reader of the Bible, these quizzes will challenge your understanding and deepen your connection to the stories and teachings found in the scriptures.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Old Testament Characters:</h3>
                <ul className="list-disc ml-6 mb-4">
                  {characters.oldTestament.map(name => (
                    <li key={name}><Link to={`/bible-questions-and-answers-hub/character/${name.toLowerCase().replace(/ /g, '-')}`} className="text-blue-700 hover:underline">{name} Quiz</Link></li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">New Testament Characters:</h3>
                <ul className="list-disc ml-6 mb-4">
                  {characters.newTestament.map(name => (
                    <li key={name}><Link to={`/bible-questions-and-answers-hub/character/${name.toLowerCase().replace(/ /g, '-')}`} className="text-blue-700 hover:underline">{name} Quiz</Link></li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Categories Section */}
        <Card className="mb-8 shadow-lg border-0">
          <CardHeader>
            <CardTitle>Quizzes by Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Themes and Concepts:</h3>
                <ul className="list-disc ml-6 mb-4">
                  {categories.map(cat => (
                    <li key={cat}><Link to={`/bible-questions-and-answers-hub/category/${cat.toLowerCase().replace(/ /g, '-')}`} className="text-blue-700 hover:underline">{cat} Quiz</Link></li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Events and Locations:</h3>
                <ul className="list-disc ml-6 mb-4">
                  {events.map(ev => (
                    <li key={ev}><Link to={`/bible-questions-and-answers-hub/event/${ev.toLowerCase().replace(/ /g, '-')}`} className="text-blue-700 hover:underline">{ev} Quiz</Link></li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Special Quizzes Section */}
        <Card className="mb-8 shadow-lg border-0">
          <CardHeader>
            <CardTitle>Special Quizzes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Holiday Quizzes:</h3>
                <ul className="list-disc ml-6 mb-4">
                  {holidays.map(h => (
                    <li key={h}><Link to={`/bible-questions-and-answers-hub/holiday/${h.toLowerCase().replace(/ /g, '-')}`} className="text-blue-700 hover:underline">{h} Quiz</Link></li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Children's Quizzes:</h3>
                <ul className="list-disc ml-6 mb-4">
                  {kids.map(k => (
                    <li key={k}><Link to={`/bible-questions-and-answers-hub/kids/${k.toLowerCase().replace(/ /g, '-')}`} className="text-blue-700 hover:underline">{k} Quiz</Link></li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Advanced Quizzes:</h3>
                <ul className="list-disc ml-6 mb-4">
                  {advanced.map(a => (
                    <li key={a}><Link to={`/bible-questions-and-answers-hub/advanced/${a.toLowerCase().replace(/ /g, '-')}`} className="text-blue-700 hover:underline">{a} Quiz</Link></li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

            {/* Footer */}
      <footer className="bg-[#181c3a] text-gray-200 pt-16 pb-8 mt-0">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row md:justify-between md:items-start gap-12">
          {/* Left: Logo and description */}
          <div className="flex-1 min-w-[220px] flex flex-col items-start mb-8 md:mb-0">
            <div className="flex items-center mb-4">
              <img src="/sword.png" alt="BibleBattles Logo" className="w-10 h-10 mr-2" />
              <span className="text-xl font-bold text-white">BibleBattles</span>
            </div>
            <p className="mb-4 text-gray-300 max-w-xs">Empower your faith with fun, challenging Bible quizzes for all ages. Compete, learn, and grow in your knowledge of Scripture!</p>
            <p className="text-gray-400 text-sm">Need help? Email <a href="mailto:info@biblequizcompeition.com" className="underline">info@biblequizcompeition.com</a></p>
          </div>
          {/* Center/Right: Links */}
          <div className="flex flex-1 flex-col sm:flex-row justify-end gap-12">
            <div>
              <h4 className="font-bold text-white mb-3">Company</h4>
              <ul className="space-y-2">
                <li><a href="/" className="hover:underline text-gray-300">Home</a></li>
                <li><a href="/bible-questions-and-answers-hub" className="hover:underline text-gray-300">Bible Q&amp;A</a></li>
                <li><a href="/public-leaderboard" className="hover:underline text-gray-300">Leaderboard</a></li>
                <li><a href="/auth/login" className="hover:underline text-gray-300">Sign In</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-3">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#privacy" className="hover:underline text-gray-300">Privacy</a></li>
                <li><a href="#terms" className="hover:underline text-gray-300">Terms</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-12 border-t border-blue-900 pt-6 text-center text-white text-sm">
          © 2024 BibleBattles. All rights reserved.
        </div>
      </footer>
    </div>
  );
} 