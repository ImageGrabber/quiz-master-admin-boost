import { useEffect } from "react";
import SEO from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import {
  MessageCircle,
  Mail,
  Clock,
  HelpCircle,
  BookOpen,
  Users,
  Zap,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";

const quickHelpItems = [
  {
    title: "How to Create a Quiz",
    description: "Learn how to create your first live quiz session with smooth host controls.",
    href: "/help/create-quiz",
    icon: BookOpen,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50",
  },
  {
    title: "Joining Live Quizzes",
    description: "Understand how participants can join quickly with code and display name.",
    href: "/help/join-live-quizzes",
    icon: Users,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
  },
  {
    title: "Real-time Features",
    description: "Explore leaderboard updates, scoring flow, and live quiz behavior.",
    href: "/help/realtime-features",
    icon: Zap,
    iconColor: "text-amber-600",
    iconBg: "bg-amber-50",
  },
];

const faqItems = [
  {
    q: "How do I create a live quiz?",
    a: "Go to Create Quiz in your dashboard, add questions, and start a live session. Share the session code with participants.",
  },
  {
    q: "Can I join a quiz without an account?",
    a: "Yes. If the host allows anonymous participation, participants only need a display name.",
  },
  {
    q: "How do I see quiz results?",
    a: "Results are calculated automatically after a quiz ends, including top participants and scores.",
  },
  {
    q: "Is there a limit on participants?",
    a: "Each live quiz session can accommodate up to 50 participants by default.",
  },
];

const Help = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//code.tidio.co/enkm7pw3z2k1zidnow6e2wj9fdt7jwo2.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      const existingScript = document.querySelector('script[src*="tidio.co"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFDFF] font-urbanist selection:bg-blue-100 selection:text-blue-900">
      <SEO
        title="Help & Support | Bible Quiz Competition Center"
        description="Get help with Bible Quiz Competition. Find answers about creating quizzes, joining live sessions, and account management. Contact support quickly."
        keywords="bible quiz help, quiz support, bible trivia troubleshooting, how to create bible quiz, live chat support"
        author="Bible Quiz Competition"
        url="/help"
      />

      <Navigation />

      <main className="relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-50/60 to-transparent -z-10" />
        <div className="absolute top-[-10%] right-[-10%] w-[460px] h-[460px] bg-blue-100/30 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-[20%] left-[-5%] w-[360px] h-[360px] bg-indigo-100/20 rounded-full blur-3xl -z-10" />

        <div className="mx-auto max-w-7xl px-4 pb-20 pt-12 md:px-8">
          <section className="mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Help Center</span>
            </div>
            <h1 className="mt-4 text-4xl md:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
              Premium Support for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Every Quiz Journey</span>
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-3xl leading-relaxed">
              Find quick answers, learn the essentials, and contact support without friction. We are here to help you host and play with confidence.
            </p>
          </section>

          <section className="grid gap-6 lg:grid-cols-2 mb-14">
            <div className="rounded-[2rem] border border-slate-100 bg-white p-6 md:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-2xl bg-blue-100 flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-2xl font-black text-slate-900">Quick Help</h2>
              </div>
              <div className="space-y-4">
                {quickHelpItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.title}
                      to={item.href}
                      className="block rounded-2xl border border-slate-200 p-4 bg-slate-50/60 transition-all hover:shadow-md hover:-translate-y-0.5"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-9 h-9 rounded-xl ${item.iconBg} flex items-center justify-center flex-shrink-0`}>
                          <Icon className={`w-4 h-4 ${item.iconColor}`} />
                        </div>
                        <div>
                          <h3 className="text-base md:text-lg font-extrabold text-slate-900">{item.title}</h3>
                          <p className="text-sm md:text-base text-slate-600 leading-relaxed">{item.description}</p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-100 bg-white p-6 md:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-2xl bg-emerald-100 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-emerald-600" />
                </div>
                <h2 className="text-2xl font-black text-slate-900">Get in Touch</h2>
              </div>
              <div className="space-y-4">
                <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-5 h-5 text-emerald-600" />
                    <div>
                      <h3 className="text-base md:text-lg font-extrabold text-slate-900">Live Chat</h3>
                      <p className="text-sm md:text-base text-slate-600">Chat with our support team instantly.</p>
                      <Badge className="mt-2 bg-white text-emerald-700 border border-emerald-200">Available Now</Badge>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-blue-600" />
                    <div>
                      <h3 className="text-base md:text-lg font-extrabold text-slate-900">Email Support</h3>
                      <p className="text-sm md:text-base text-slate-600">info@biblequizcompetition.com</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-violet-100 bg-violet-50 p-4">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-violet-600" />
                    <div>
                      <h3 className="text-base md:text-lg font-extrabold text-slate-900">Response Time</h3>
                      <p className="text-sm md:text-base text-slate-600">Usually within 24 hours.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-[2.5rem] border border-slate-100 bg-white p-6 md:p-10 shadow-sm mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">Frequently Asked Questions</h2>
            <div className="grid gap-4">
              {faqItems.map((item) => (
                <div key={item.q} className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5">
                  <h3 className="text-lg font-extrabold text-slate-900">{item.q}</h3>
                  <p className="mt-2 text-slate-600 leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[2.5rem] bg-slate-900 p-8 md:p-12 text-white shadow-2xl shadow-slate-900/20">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 text-blue-300 mb-3">
                <ShieldCheck className="w-5 h-5" />
                <span className="font-bold uppercase tracking-widest text-xs">Always Available</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black leading-tight">Need Immediate Help?</h2>
              <p className="mt-3 text-slate-300 leading-relaxed">
                Use the chat widget at the bottom-right to talk with support right away. We prioritize live-quiz and access issues first.
              </p>
              <div className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white/10 border border-white/20 px-4 py-2 text-sm font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                Chat Available 24/7
              </div>
              <div className="mt-6 inline-flex items-center gap-2 text-blue-200 text-sm font-bold uppercase tracking-wider">
                Open chat now <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Help;
