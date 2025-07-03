import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import DashboardLayout from "@/components/DashboardLayout";
import { CheckCircle, Star, BookOpen, Trophy, Flame, Layers, Book, Users, Shield, Zap, Globe, Award, XCircle } from "lucide-react";

const PRO_PRICE_ID = "price_1RgX1dJDfOx2FLR6rKfvRSkb";
const SUPABASE_FUNCTION_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1`;

const quizCategories = [
  { icon: BookOpen, name: "Pentateuch", count: 5, desc: "The first five books", border: "border-yellow-400", iconColor: "text-yellow-600" },
  { icon: Layers, name: "Historical Books", count: 12, desc: "Israel's history", border: "border-blue-400", iconColor: "text-blue-600" },
  { icon: Trophy, name: "Wisdom Literature", count: 5, desc: "Poetry and wisdom", border: "border-pink-400", iconColor: "text-pink-600" },
  { icon: Flame, name: "Major Prophets", count: 5, desc: "Major prophetic books", border: "border-orange-400", iconColor: "text-orange-600" },
  { icon: Zap, name: "Minor Prophets", count: 12, desc: "Minor prophetic books", border: "border-green-400", iconColor: "text-green-600" },
  { icon: Star, name: "Gospels", count: 4, desc: "The life of Jesus", border: "border-purple-400", iconColor: "text-purple-600" },
  { icon: Users, name: "Pauline Epistles", count: 13, desc: "Paul's letters", border: "border-indigo-400", iconColor: "text-indigo-600" },
  { icon: Shield, name: "General Epistles", count: 8, desc: "Other letters", border: "border-gray-400", iconColor: "text-gray-600" },
  { icon: Globe, name: "Apocalyptic", count: 1, desc: "End times and prophecy", border: "border-red-400", iconColor: "text-red-600" },
];

const proFeatures = [
  "Unlimited quizzes every week",
  "Memory verse & themed quizzes",
  "Bible devotions & study plans",
  "Access to all quiz categories",
  "Priority support",
  "Detailed reports & analytics",
  "Access to past attempts",
  "Personalized recommendations",
  "Early access to new features",
  "Ad-free experience",
  "Downloadable study resources",
  "Invite friends & family",
  "Exclusive seasonal quizzes",
  "Custom quiz creation",
  "Create and join groups for collaborative quizzes",
];

const freeFeatures = [
  "1 quiz per week",
  "Basic quiz categories",
  "Basic stats",
  "Community support",
];

const featureComparison = [
  { label: "Quizzes per week", free: "1", pro: "Unlimited" },
  { label: "Quiz categories", free: "Basic", pro: "All (Pentateuch, Gospels, etc.)" },
  { label: "Memory verse quizzes", free: false, pro: true },
  { label: "Themed quizzes", free: false, pro: true },
  { label: "Bible devotions & plans", free: false, pro: true },
  { label: "Detailed stats & analytics", free: false, pro: true },
  { label: "Priority support", free: false, pro: true },
  { label: "Community support", free: true, pro: true },
];

const testimonials = [
  { quote: "The Pro plan made Bible study fun for my whole family!", name: "Sarah, Texas" },
  { quote: "Unlimited quizzes and memory verses helped me grow spiritually.", name: "John, California" },
  { quote: "Themed quizzes and devotions are worth every penny!", name: "Priya, India" },
];

const Upgrade = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handlePayment = async () => {
    setLoading(true);
    setError("");
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setError("You must be logged in to upgrade.");
        setLoading(false);
        return;
      }
      const res = await fetch(`${SUPABASE_FUNCTION_URL}/create-upgrade-checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          price_id: PRO_PRICE_ID,
          user_id: user.id,
        }),
      });
      const result = await res.json();
      if (!result.url) throw new Error(result.error || "Failed to create checkout session.");
      window.location.href = result.url;
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen py-10 relative" style={{ background: 'transparent' }}>
        {/* Pricing Section */}
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8 mb-12 justify-center items-stretch">
          {/* Free Plan Card */}
          <Card className="flex-1 bg-white border border-gray-200 shadow-sm flex flex-col justify-between">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-700">Free</CardTitle>
              <CardDescription>Get started with basic quizzes and stats</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold text-gray-800 mb-2">$0</div>
              <div className="mb-4 text-gray-500">per month</div>
              <ul className="mb-4 space-y-2">
                {freeFeatures.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-700 min-h-[28px]">
                    <CheckCircle className="w-4 h-4 text-green-500" /> {f}
                  </li>
                ))}
                {/* Add empty li's to balance height with Pro card */}
                {Array.from({ length: proFeatures.length - freeFeatures.length }).map((_, i) => (
                  <li key={`empty-${i}`} className="min-h-[28px]">&nbsp;</li>
                ))}
              </ul>
              <Button variant="outline" className="w-full" disabled>Current plan</Button>
            </CardContent>
          </Card>
          {/* Pro Plan Card */}
          <Card className="flex-1 bg-white border-2 border-purple-400 shadow-lg flex flex-col justify-between relative">
            <div className="absolute -top-4 right-4 bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">Most popular</div>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-purple-700">Pro</CardTitle>
              <CardDescription>Unlock all quizzes, features, and reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold text-purple-800 mb-1">$3.99</div>
              <div className="mb-2 text-gray-500">per month</div>
              <ul className="mb-2 space-y-2">
                {proFeatures.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-800">
                    <CheckCircle className="w-4 h-4 text-purple-500" /> {f}
                  </li>
                ))}
              </ul>
              {error && <div className="mb-4 text-red-600 font-medium">{error}</div>}
              <Button
                onClick={handlePayment}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-lg py-3 mb-2"
                disabled={loading}
              >
                {loading ? "Redirecting to Payment..." : "Upgrade to Pro"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Upgrade; 