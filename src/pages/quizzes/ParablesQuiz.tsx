import { useState } from "react";
import BibleBookQuiz from "../BibleBookQuiz";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ChevronRight, Sparkles, BookOpen, Brain, Trophy } from "lucide-react";
import SEO from "@/components/SEO";

const PARABLES_QUESTIONS = [
  {
    chapter: 15,
    question: "In the Parable of the Prodigal Son, what did the father do when he saw his son returning from a long way off?",
    options: ["He waited for the son to apologize", "He ran to his son, threw his arms around him and kissed him", "He sent a servant to check if it was really him", "He locked the doors in anger"],
    answer: 1,
    explanation: "Luke 15:20 - 'But while he was still a long way off, his father saw him and was filled with compassion for him; he ran to his son, threw his arms around him and kissed him.'"
  },
  {
    chapter: 10,
    question: "In the Parable of the Good Samaritan, who were the two people who passed by the injured man before the Samaritan stopped?",
    options: ["A Pharisee and a Scribe", "A Priest and a Levite", "A Soldier and a Merchant", "A Shepherd and a Tax Collector"],
    answer: 1,
    explanation: "Luke 10:31-32 - A priest and a Levite both saw the man but passed by on the other side."
  },
  {
    chapter: 13,
    question: "In the Parable of the Sower, what does the seed represent?",
    options: ["Money", "Faith", "The Word of God", "The People"],
    answer: 2,
    explanation: "Luke 8:11 - 'The seed is the word of God.'"
  },
  {
    chapter: 18,
    question: "In the Parable of the Pharisee and the Tax Collector, what was the prayer of the tax collector?",
    options: ["Lord, I thank you that I am not like other men", "God, have mercy on me, a sinner", "God, bless my family and house", "Lord, remember me in your kingdom"],
    answer: 1,
    explanation: "Luke 18:13 - 'But the tax collector stood at a distance. He would not even look up to heaven, but beat his breast and said, \"God, have mercy on me, a sinner.\"'"
  },
  {
    chapter: 25,
    question: "In the Parable of the Talents, what did the servant who received one talent do with it?",
    options: ["He invested it in trade", "He gave it to the poor", "He hid it in the ground", "He lost it in a wager"],
    answer: 2,
    explanation: "Matthew 25:18 - 'But the man who had received one talent went off, dug a hole in the ground and hid his master’s money.'"
  }
];

export default function ParablesQuiz() {
  const [showQuiz, setShowQuiz] = useState(false);

  if (showQuiz) {
    return (
      <BibleBookQuiz 
        title="Parables of Jesus Quiz"
        questions={PARABLES_QUESTIONS}
        bookName="Parables"
        difficulty="intermediate"
        useLandingShell={true}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 font-urbanist selection:bg-amber-100/50 selection:text-amber-900">
      <SEO 
        title="Parables of Jesus Quiz | Test Your Knowledge of Christ's Teachings"
        description="Challenge yourself with our interactive Parables of Jesus quiz. Explore the deep meanings behind the Good Samaritan, the Prodigal Son, and other iconic teachings."
        keywords="parables of jesus quiz, parables quiz, prodigal son quiz, good samaritan quiz, jesus teachings quiz, bible parables test"
        url="/quizzes/parables-of-jesus"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Quiz",
          "name": "Parables of Jesus Quiz",
          "description": "An interactive quiz testing knowledge of the parables told by Jesus Christ.",
          "educationalAlignment": [
            {
              "@type": "AlignmentObject",
              "alignmentType": "educationalLevel",
              "educationalFramework": "Christian Education",
              "targetName": "All Ages"
            }
          ],
          "hasPart": PARABLES_QUESTIONS.map((q, i) => ({
            "@type": "Question",
            "name": q.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": q.options[q.answer]
            }
          }))
        }}
      />
      <Navigation />

      {/* Cinematic Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <img 
            src="/parables_quiz_hero_1776466016516.png" 
            alt="Jesus Telling Parables Cinematic" 
            className="w-full h-full object-cover brightness-[0.4] scale-105 transition-transform duration-[20000ms] hover:scale-100"
          />
          <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-white via-white/50 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center text-white">
          <div className="inline-flex items-center space-x-3 px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-10 animate-in fade-in slide-in-from-top-6 duration-1000">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span className="text-xs font-bold tracking-[0.4em] uppercase text-white/80">Interactive Wisdom</span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-[8rem] font-normal mb-8 leading-[0.9] tracking-tighter animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
            The <span className="italic font-serif block mt-2 text-white/90">Parables</span>
          </h1>
          <p className="text-lg sm:text-2xl font-light text-white/70 mb-16 max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-400">
            "He who has ears to hear, let him hear." Step into the stories of Jesus and discover the timeless truths hidden within the simplicity of the parables.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-black hover:bg-gray-100 px-12 py-8 text-sm sm:text-xl rounded-2xl font-bold shadow-2xl transition-all active:scale-95 group flex items-center mx-auto" 
            onClick={() => setShowQuiz(true)}
          >
            Begin the Challenge <ChevronRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      <div className="w-full max-w-7xl mx-auto px-8 py-24">
        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center mb-40">
          <div className="space-y-6">
            <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto text-amber-600 shadow-inner">
              <BookOpen className="w-8 h-8" strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-normal italic serif">Deep Insights</h3>
            <p className="text-lg font-light text-gray-500 leading-relaxed">
              Explore the cultural and theological context behind each story.
            </p>
          </div>
          <div className="space-y-6">
            <div className="w-16 h-16 bg-sky-50 rounded-2xl flex items-center justify-center mx-auto text-sky-600 shadow-inner">
              <Brain className="w-8 h-8" strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-normal italic serif">Critical Thinking</h3>
            <p className="text-lg font-light text-gray-500 leading-relaxed">
              Test your ability to apply parabolic truths to modern life scenarios.
            </p>
          </div>
          <div className="space-y-6">
            <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto text-indigo-600 shadow-inner">
              <Trophy className="w-8 h-8" strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-normal italic serif">Global Ranking</h3>
            <p className="text-lg font-light text-gray-500 leading-relaxed">
              Compete with believers worldwide and climb the spiritual leaderboard.
            </p>
          </div>
        </div>

        {/* Narrative Section */}
        <section className="mb-40 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-10">
            <h2 className="text-sm font-semibold uppercase tracking-[0.4em] text-gray-400">The Teaching Style of Christ</h2>
            <h3 className="text-5xl font-normal leading-tight italic serif">Truth Wrapped in Story</h3>
            <p className="text-2xl font-light text-gray-600 leading-relaxed">
              Jesus utilized parables to reveal the secrets of the Kingdom of Heaven to those with open hearts, while simultaneously concealing them from the proud. These stories are not just moral fables; they are radical invitations to a new way of being.
            </p>
            <Button variant="outline" className="border-gray-200 rounded-2xl px-10 py-6 font-light text-sm uppercase tracking-widest hover:bg-gray-50 transition-all" onClick={() => navigate("/articles/the-art-of-the-parable")}>
              Read Study Guide
            </Button>
          </div>
          <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border border-gray-100">
             <div className="aspect-square bg-gray-50 flex items-center justify-center p-20">
                <div className="text-center space-y-8">
                   <div className="text-8xl text-amber-200 font-serif">"</div>
                   <p className="text-3xl font-light italic text-gray-700 leading-relaxed">
                      "I will open my mouth in parables, I will utter things hidden since the creation of the world."
                   </p>
                   <p className="text-sm font-bold uppercase tracking-[0.3em] text-gray-400">— Matthew 13:35</p>
                </div>
             </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
