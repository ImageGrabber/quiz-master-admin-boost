import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { VerseMaster as VerseMasterGame } from "@/components/games/VerseMaster";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const VerseMaster = () => {
  const navigate = useNavigate();

  // Bible verses for fill-in-the-blank (blanks array contains word indices to blank out)
  const verses = [
    {
      reference: "John 3:16",
      text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
      blanks: [3, 8, 16] // "loved", "gave", "believes"
    },
    {
      reference: "Philippians 4:13",
      text: "I can do all this through him who gives me strength.",
      blanks: [4, 7] // "this", "gives"
    },
    {
      reference: "Jeremiah 29:11",
      text: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.",
      blanks: [2, 6, 10] // "know", "for", "prosper"
    },
    {
      reference: "Proverbs 3:5-6",
      text: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
      blanks: [0, 5, 9] // "Trust", "heart", "understanding"
    },
    {
      reference: "Romans 8:28",
      text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
      blanks: [2, 5, 9] // "know", "things", "works"
    },
    {
      reference: "Isaiah 41:10",
      text: "So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand.",
      blanks: [3, 7, 11] // "fear", "with", "dismayed"
    },
    {
      reference: "Matthew 11:28",
      text: "Come to me, all you who are weary and burdened, and I will give you rest.",
      blanks: [5, 7] // "weary", "burdened"
    },
    {
      reference: "Joshua 1:9",
      text: "Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.",
      blanks: [3, 5, 7] // "commanded", "strong", "courageous"
    }
  ];

  const [gameCompleted, setGameCompleted] = useState(false);

  const handleGameComplete = () => {
    setGameCompleted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="w-full max-w-6xl mx-auto">
        {/* Header with back button */}
        <div className="mb-6 flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/dashboard/bible-games')}
            className="font-urbanist font-light"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Games
          </Button>
        </div>

        {/* Game Component */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6">
            <VerseMasterGame
              verses={verses}
              onComplete={handleGameComplete}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerseMaster;

