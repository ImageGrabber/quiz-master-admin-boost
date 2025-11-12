import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { FaithBuilder as FaithBuilderGame } from "@/components/games/FaithBuilder";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const FaithBuilder = () => {
  const navigate = useNavigate();

  // Faith-building questions based on biblical principles
  const questions = [
    {
      question: "What does the Bible say is the foundation of faith?",
      options: [
        "Trusting in our own abilities",
        "Believing in what we can see",
        "Faith is confidence in what we hope for and assurance about what we do not see",
        "Following the crowd"
      ],
      correctAnswer: 2,
      explanation: "Hebrews 11:1 defines faith as 'confidence in what we hope for and assurance about what we do not see.' True faith is based on trust in God's promises, not on what we can physically see or prove.",
      verse: "Hebrews 11:1 - 'Now faith is confidence in what we hope for and assurance about what we do not see.'"
    },
    {
      question: "How should we respond when facing trials and difficulties?",
      options: [
        "Complain and give up",
        "Blame God for our problems",
        "Consider it pure joy because trials produce perseverance and maturity",
        "Avoid all challenges"
      ],
      correctAnswer: 2,
      explanation: "James 1:2-4 teaches us to consider trials as joy because they test our faith and produce perseverance, making us mature and complete. Challenges help build our character and strengthen our faith.",
      verse: "James 1:2-4 - 'Consider it pure joy, my brothers and sisters, whenever you face trials of many kinds, because you know that the testing of your faith produces perseverance.'"
    },
    {
      question: "What is the greatest commandment according to Jesus?",
      options: [
        "Love yourself above all",
        "Love your neighbor as yourself",
        "Love the Lord your God with all your heart, soul, and mind",
        "Follow all the rules perfectly"
      ],
      correctAnswer: 2,
      explanation: "Jesus said the greatest commandment is to love God with all our heart, soul, and mind. This is the foundation of our relationship with God and guides all other aspects of our faith.",
      verse: "Matthew 22:37-38 - 'Jesus replied: Love the Lord your God with all your heart and with all your soul and with all your mind. This is the first and greatest commandment.'"
    },
    {
      question: "How can we grow in faith?",
      options: [
        "By avoiding difficult situations",
        "By hearing and studying God's Word",
        "By only praying when we need something",
        "By comparing ourselves to others"
      ],
      correctAnswer: 1,
      explanation: "Romans 10:17 tells us that 'faith comes from hearing the message, and the message is heard through the word about Christ.' Regular study of Scripture and hearing God's Word strengthens our faith.",
      verse: "Romans 10:17 - 'Consequently, faith comes from hearing the message, and the message is heard through the word about Christ.'"
    },
    {
      question: "What should we do when we feel weak in faith?",
      options: [
        "Give up and stop trying",
        "Hide our struggles from others",
        "Pray and ask God to help our unbelief",
        "Pretend everything is fine"
      ],
      correctAnswer: 2,
      explanation: "Mark 9:24 shows us that even when we struggle with doubt, we can pray 'I do believe; help me overcome my unbelief!' God is patient with us and helps strengthen our faith when we ask Him.",
      verse: "Mark 9:24 - 'Immediately the boy's father exclaimed, I do believe; help me overcome my unbelief!'"
    },
    {
      question: "How does love relate to faith?",
      options: [
        "Love and faith are unrelated",
        "Faith without love is meaningless",
        "Love is more important than faith",
        "We only need one or the other"
      ],
      correctAnswer: 1,
      explanation: "1 Corinthians 13:2 teaches that even if we have great faith but don't have love, we are nothing. Faith must be expressed through love for God and others to be meaningful.",
      verse: "1 Corinthians 13:2 - 'If I have a faith that can move mountains, but do not have love, I am nothing.'"
    },
    {
      question: "What does it mean to walk by faith?",
      options: [
        "Following our feelings",
        "Trusting God's guidance even when we can't see the path ahead",
        "Only making decisions we're 100% sure about",
        "Waiting for perfect circumstances"
      ],
      correctAnswer: 1,
      explanation: "2 Corinthians 5:7 tells us to 'walk by faith, not by sight.' This means trusting God's promises and guidance even when we can't see how things will work out, relying on His wisdom rather than our limited understanding.",
      verse: "2 Corinthians 5:7 - 'For we live by faith, not by sight.'"
    },
    {
      question: "How should we handle worry and anxiety?",
      options: [
        "Keep worrying until we solve everything",
        "Ignore our problems",
        "Present our requests to God with thanksgiving and trust His peace",
        "Try to control everything ourselves"
      ],
      correctAnswer: 2,
      explanation: "Philippians 4:6-7 teaches us to present our requests to God with thanksgiving, and His peace will guard our hearts. We build faith by trusting God with our concerns instead of carrying them alone.",
      verse: "Philippians 4:6-7 - 'Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.'"
    }
  ];

  const [gameCompleted, setGameCompleted] = useState(false);

  const handleGameComplete = () => {
    setGameCompleted(true);
  };

  return (
    <DashboardLayout>
      <div className="w-full max-w-4xl mx-auto">
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
            <FaithBuilderGame
              questions={questions}
              onComplete={handleGameComplete}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FaithBuilder;

