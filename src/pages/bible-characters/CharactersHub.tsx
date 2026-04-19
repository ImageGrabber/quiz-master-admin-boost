import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  User, 
  ChevronRight, 
  BookOpen, 
  Star, 
  ScrollText, 
  ShieldCheck, 
  Compass,
  Heart,
  Crown,
  Flame,
  Globe,
  Medal
} from 'lucide-react';
import SEO from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const CHARACTERS = [
  {
    id: "abraham",
    name: "Abraham",
    title: "Father of Many Nations",
    description: "The patriarch of the Jewish and Christian faiths, known for his radical obedience and faith in God's promises.",
    icon: Globe,
    color: "bg-amber-50",
    iconColor: "text-amber-600",
    link: "/bible-questions-and-answers-hub/genesis",
    era: "Patriarchal Age"
  },
  {
    id: "moses",
    name: "Moses",
    title: "The Great Liberator",
    description: "Led the Israelites out of Egyptian slavery and received the Ten Commandments on Mount Sinai.",
    icon: ScrollText,
    color: "bg-blue-50",
    iconColor: "text-blue-600",
    link: "/bible-questions-and-answers-hub/exodus",
    era: "The Exodus"
  },
  {
    id: "david",
    name: "David",
    title: "King & Psalmist",
    description: "A man after God's own heart, who rose from a shepherd boy to become the greatest king of Israel.",
    icon: Crown,
    color: "bg-purple-50",
    iconColor: "text-purple-600",
    link: "/bible-questions-and-answers-hub/1-samuel",
    era: "United Monarchy"
  },
  {
    id: "mary",
    name: "Mary",
    title: "Mother of Jesus",
    description: "The humble servant who was chosen to bear the Messiah, demonstrating absolute surrender to God's will.",
    icon: Heart,
    color: "bg-sky-50",
    iconColor: "text-sky-600",
    link: "/bible-questions-and-answers-hub/luke",
    era: "New Testament"
  },
  {
    id: "paul",
    name: "Paul",
    title: "Apostle to the Gentiles",
    description: "Transformed from a persecutor to the greatest missionary and author of many New Testament epistles.",
    icon: Flame,
    color: "bg-orange-50",
    iconColor: "text-orange-600",
    link: "/bible-questions-and-answers-hub/acts",
    era: "Early Church"
  },
  {
    id: "peter",
    name: "Peter",
    title: "The Rock",
    description: "The outspoken disciple who became a pillar of the early church despite his initial failures.",
    icon: ShieldCheck,
    color: "bg-indigo-50",
    iconColor: "text-indigo-600",
    link: "/bible-questions-and-answers-hub/acts",
    era: "Early Church"
  },
  {
    id: "noah",
    name: "Noah",
    title: "Hero of the Flood",
    description: "Built the ark in obedience to God, saving his family and every kind of animal from the Great Flood.",
    icon: Compass,
    color: "bg-green-50",
    iconColor: "text-green-600",
    link: "/bible-questions-and-answers-hub/genesis",
    era: "Ancient World"
  },
  {
    id: "esther",
    name: "Esther",
    title: "The Brave Queen",
    description: "A Jewish orphan who became Queen of Persia and risked her life to save her people from destruction.",
    icon: Star,
    color: "bg-rose-50",
    iconColor: "text-rose-600",
    link: "/bible-questions-and-answers-hub/esther",
    era: "Persian Period"
  },
  {
    id: "ruth",
    name: "Ruth",
    title: "Model of Loyalty",
    description: "A Moabite woman whose devotion to her mother-in-law and faith in God led her into the lineage of King David and Jesus.",
    icon: Heart,
    color: "bg-teal-50",
    iconColor: "text-teal-600",
    link: "/bible-questions-and-answers-hub/ruth",
    era: "The Judges"
  },
  {
    id: "daniel",
    name: "Daniel",
    title: "Prophet of Integrity",
    description: "Remained faithful to God in Babylonian exile, surviving the lions' den and receiving profound visions of the future.",
    icon: ShieldCheck,
    color: "bg-slate-50",
    iconColor: "text-slate-600",
    link: "/bible-questions-and-answers-hub/daniel",
    era: "The Exile"
  },
  {
    id: "elijah",
    name: "Elijah",
    title: "Prophet of Fire",
    description: "A bold prophet who confronted idolatry, performed miracles, and was taken to heaven in a whirlwind.",
    icon: Flame,
    color: "bg-red-50",
    iconColor: "text-red-600",
    link: "/bible-questions-and-answers-hub/1-kings",
    era: "Divided Monarchy"
  },
  {
    id: "john-the-baptist",
    name: "John the Baptist",
    title: "Voice in the Wilderness",
    description: "The precursor to Christ who preached repentance and baptized Jesus in the Jordan River.",
    icon: User,
    color: "bg-emerald-50",
    iconColor: "text-emerald-600",
    link: "/bible-questions-and-answers-hub/matthew",
    era: "New Testament"
  },
  {
    id: "sarah",
    name: "Sarah",
    title: "Mother of Prosperity",
    description: "Wife of Abraham who, though initially skeptical, gave birth to Isaac in her old age as promised by God.",
    icon: Star,
    color: "bg-pink-50",
    iconColor: "text-pink-600",
    link: "/bible-questions-and-answers-hub/genesis",
    era: "Patriarchal Age"
  },
  {
    id: "joseph",
    name: "Joseph",
    title: "Dreamer and Ruler",
    description: "Sold into slavery by his brothers, he rose to become the second most powerful man in Egypt, saving the region from famine.",
    icon: Medal,
    color: "bg-cyan-50",
    iconColor: "text-cyan-600",
    link: "/bible-questions-and-answers-hub/genesis",
    era: "Patriarchal Age"
  }
];

export default function CharactersHub() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-gray-900 font-urbanist selection:bg-black/5">
      <SEO 
        title="Bible Characters Hub | Study the Lives of Great Faith Figures"
        description="Explore the lives, faith, and legacy of major biblical characters. From Abraham and Moses to David and Paul, discover the people who shaped scriptural history."
        keywords="bible characters, abraham, moses, king david, apostle paul, mary mother of jesus, biblical figures, study bible characters"
        url="/bible-characters"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Bible Characters Hub",
          "description": "A comprehensive directory for studying major biblical figures and their faith journeys.",
          "mainEntity": {
            "@type": "ItemList",
            "itemListElement": CHARACTERS.map((char, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "name": char.name,
              "description": char.description
            }))
          }
        }}
      />
      <Navigation />

      {/* Cinematic Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <img 
            src="/bible_characters_hub_hero_1776465735326.png" 
            alt="Biblical Characters Cinematic" 
            className="w-full h-full object-cover brightness-[0.4] scale-105 transition-transform duration-[20000ms] hover:scale-100"
          />
          <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-white via-white/50 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center text-white">
          <div className="inline-flex items-center space-x-3 px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-10 animate-in fade-in slide-in-from-top-6 duration-1000">
            <Users className="w-5 h-5 text-amber-400" />
            <span className="text-xs font-bold tracking-[0.4em] uppercase text-white/80">The People of the Book</span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-[8rem] font-normal mb-8 leading-[0.9] tracking-tighter animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
            Bible <span className="italic font-serif block mt-2 text-white/90">Characters</span>
          </h1>
          <p className="text-lg sm:text-2xl font-light text-white/70 mb-16 max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-400">
            Study the lives of those who walked before us. Discover their triumphs, failures, and the radical faith that changed the course of history.
          </p>
        </div>
      </section>

      <div className="w-full max-w-7xl mx-auto px-8 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center text-xs font-light text-gray-400 mb-20 px-2 tracking-widest uppercase">
          <button className="hover:text-black transition-colors" onClick={() => navigate("/")}>Home</button>
          <ChevronRight className="w-3 h-3 mx-4 opacity-30" />
          <span className="text-black font-semibold">Bible Characters</span>
        </div>

        {/* Character Grid */}
        <section className="mb-40">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {CHARACTERS.map((char) => (
              <Card 
                key={char.id} 
                className="group relative border border-gray-100/60 hover:border-black/5 hover:-translate-y-2 transition-all duration-500 flex flex-col bg-white overflow-hidden shadow-2xl shadow-gray-200/40 cursor-pointer rounded-[2.5rem]" 
                onClick={() => navigate(char.link)}
              > 
                <CardHeader className="pt-12 pb-8 px-10 text-left">
                  <div className={`w-16 h-16 rounded-2xl ${char.color} flex items-center justify-center mb-8 transition-transform group-hover:scale-110 duration-500 shadow-inner`}>
                    <char.icon className={`w-8 h-8 ${char.iconColor}`} strokeWidth={1.5} />
                  </div>
                  <CardTitle className="text-4xl font-normal text-gray-900 italic serif mb-3">{char.name}</CardTitle>
                  <CardDescription className="text-sm font-semibold text-gray-400 uppercase tracking-[0.25em]">{char.era}</CardDescription>
                </CardHeader>
                <CardContent className="px-10 pb-12 flex-grow flex flex-col justify-between text-left">
                  <div className="space-y-4 mb-10">
                    <h4 className="text-xl font-medium text-gray-800 italic">{char.title}</h4>
                    <p className="text-xl font-light text-gray-500 leading-relaxed">{char.description}</p>
                  </div>
                  <Button className="w-full font-light bg-black text-white hover:bg-gray-800 rounded-2xl py-8 tracking-[0.2em] uppercase text-xs transition-all shadow-xl shadow-black/10">
                    Explore Study Materials
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="mb-40 py-24 bg-gray-900 rounded-[4rem] text-white px-10 lg:px-20 overflow-hidden relative shadow-2xl">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-amber-500/10 blur-[150px] rounded-full translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-1/3 h-full bg-sky-500/5 blur-[120px] rounded-full -translate-x-1/2" />
          
          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <h2 className="text-sm font-semibold uppercase tracking-[0.5em] text-white/30 mb-8">Ready to Deepen Your Study?</h2>
            <h3 className="text-4xl sm:text-6xl font-normal leading-tight mb-12 italic serif">"These things happened to them as examples and were written down as warnings for us."</h3>
            <p className="text-xl font-light text-white/50 leading-relaxed mb-12">
              Every biblical character offers unique lessons for our lives today. Join our community to access detailed study guides, character-specific quizzes, and reflective devotionals.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Button size="lg" className="bg-white text-black hover:bg-gray-200 px-10 py-8 text-sm sm:text-lg rounded-2xl font-light shadow-2xl transition-all active:scale-95" onClick={() => navigate("/auth/register")}>
                Join the Community
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white hover:text-black transition-all px-10 py-8 text-sm sm:text-lg rounded-2xl font-light active:scale-95" onClick={() => navigate("/bible-questions-and-answers-hub")}>
                Explore All Books
              </Button>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
