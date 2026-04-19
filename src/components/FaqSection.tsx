import { useState } from "react";

export function FaqSection() {
  const faqs = [
    {
      q: "What is Bible Quiz Competition?",
      a: "Bible Quiz Competition is a comprehensive platform that combines Bible quizzes, wellness tools, and spiritual growth resources. Join the leading online Bible quiz competition 2026 and participate in Bible quiz competition 2026. We offer 1,000+ Bible questions across all 66 books, interactive games, emotional check-ins, CBT tools, water intake tracking, and daily records to support your complete wellness journey."
    },
    {
      q: "What types of quizzes are available?",
      a: "We offer public quizzes for all 66 Bible books, weekly Bible challenges, competition quizzes with leaderboards, and the ability to create and host your own live quizzes. Our Bible Q&A Hub includes 1,000+ questions organized by book, chapter, difficulty level, and category. Join our Bible quiz competition 2026 and check Bible quiz competition 2026 results in our online Bible quiz competition."
    },
    {
      q: "What wellness features do you offer?",
      a: "Our platform includes Daily Records for tracking your emotional journey, Water Intake Tracker for hydration monitoring, CBT Tools for thought records and mindfulness practices, Streak Maintenance for building daily habits, Emotional Check-In with personalized Bible verses, and Interactive Bible Games like Memory Match and Joy Runner."
    },
    {
      q: "How does the scoring system work?",
      a: "You earn 4 points for each correct answer, lose 1 point for wrong answers, and receive time bonuses for quick responses. The faster you answer correctly, the more points you earn! Your scores are tracked on leaderboards and in your personal dashboard."
    },
    {
      q: "What are the Interactive Bible Games?",
      a: "We offer engaging faith-based games including Memory Match (matching Bible words while avoiding sin cards), Joy Runner (collecting good words while avoiding sin bubbles), and other games that combine fun with spiritual growth. These games are available directly on the homepage."
    },
    {
      q: "How does the Emotional Check-In work?",
      a: "The Emotional Check-In allows you to track your daily mood and emotions. Based on your selection, you'll receive personalized CBT questions, thinking trap insights, and encouraging Bible verses to support your mental and spiritual wellness journey."
    },
    {
      q: "Can I create my own quizzes?",
      a: "Yes! You can create custom Bible quizzes with your own questions, choose between requiring login or allowing guest participation, and host live sessions that others can join with a simple 8-character code."
    },
    {
      q: "Is the platform suitable for all ages?",
      a: "Absolutely! Our content is designed for all ages, from children to adults, with questions and games covering every level of Bible knowledge. Perfect for families, youth groups, church communities, and individual study."
    },
    {
      q: "How do I track my progress?",
      a: "Create a free account to access your personal dashboard where you can view your quiz history, scores, daily records, emotional check-ins, water intake, streaks, and compete on global leaderboards. Track your improvement over time across all features. Check your Bible quiz competition 2026 results and see how you rank in Bible competition 2026 and Bible competitions."
    },
    {
      q: "Can I participate without creating an account?",
      a: "Yes! You can take public quizzes, play Bible games (with limited retries), and access many features as a guest. However, creating a free account gives you unlimited access to all features, progress tracking, the ability to create quizzes, and full wellness tools."
    }
  ];
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-3xl md:text-4xl font-urbanist font-semibold text-center text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-lg font-urbanist font-light text-gray-600 text-center max-w-2xl mb-2">
            Everything you need to know about Bible Quiz Competition. Can't find your answer?{' '}
            <a href="mailto:info@biblequizcompetition.com" className="font-urbanist font-light text-gray-900 hover:text-gray-700 underline">Contact our support team.</a>
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-lg border border-gray-200 bg-white p-0 overflow-hidden transition-all">
              <button
                className="w-full flex items-center justify-between px-6 py-5 text-lg font-urbanist font-medium text-gray-900 focus:outline-none hover:bg-gray-50 transition-colors"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                aria-controls={`faq-panel-${i}`}
              >
                <span className="text-left">{faq.q}</span>
                <span className={`ml-4 transition-transform flex-shrink-0 ${open === i ? 'rotate-45 text-gray-700' : 'text-gray-500'}`}>+</span>
              </button>
              <div
                id={`faq-panel-${i}`}
                className={`px-6 pb-5 font-urbanist font-light text-gray-600 text-base leading-relaxed transition-all duration-300 ${open === i ? 'block' : 'hidden'}`}
              >
                {faq.a}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

