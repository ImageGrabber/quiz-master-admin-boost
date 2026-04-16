import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Award,
  Flame,
  Home,
  List,
  Menu,
  Quote,
  Settings,
  Sparkles,
  Trophy,
  Zap,
} from "lucide-react";

const challengeCards = [
  {
    title: "Dawn of Wisdom",
    description:
      "Test your knowledge of the Book of Proverbs in this timed event.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAhtb3hMFlEm60bx9sImjXMkHHgQLuq5-KOZMVbmWrUbuqPmRV7flmKs8U6q3iHJ_yPCC56O5kMLcZtM74JCXJIe2-6ycwfMHbKOXtyduw40yBIzQjBbaDauPgucZh999yXmaLUG0_9nY6ez_fyVIKftZWeNpcbS0T6UNAsOcOnAg9ryWCg-ZSBDuuQoX46hkRnlaqlB-mTZRUxIkHREt6yZF0CNxtqnGQl6YAMtPMpvWiVim7yYWtz4MUxyZXn8Q5Q0Z--DkuaOpd5",
    path: "/public-quiz/proverbs",
  },
  {
    title: "Echoes of the Sinai",
    description:
      "A deep dive into the Ten Commandments and their historical context.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBrJ-ONGuY2ocG889mU820AB8rXU-RHpWF4sM9u03eYLJDz0r8OYwle92dVR8yVuDPq__4mxRkku9tyRPryJwdOzneMTfqu7gtw0fLsdMCIOaaqS0X8nW5eIwKlywec5t1iJusWf-iW7j7drkAlzqKbvUEzjtTSJu8SrbJXb2mjG9I3JWo_DM9kcYt1qvht-Krtso7cEmEuumB_KcY-BYm3rpQnnAaF0MMYjJOSX2zwSQtu3X0Yvm9Kq8EDrw5RpSYEI6kJYcvHaTsn",
    path: "/public-quiz/exodus",
  },
];

const DevotionalHome = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen bg-[#f8f9fa] pb-36 text-[#191c1d]"
      style={{ fontFamily: "Manrope, sans-serif" }}
    >
      <Helmet>
        <title>The Devotional | Home Dashboard</title>
      </Helmet>

      <header className="fixed left-0 top-0 z-50 w-full bg-[#f8f9fa]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-md items-center justify-between px-6">
          <button
            type="button"
            aria-label="Open menu"
            className="text-[#03192e] transition hover:opacity-80 active:scale-95"
          >
            <Menu className="h-5 w-5" />
          </button>
          <h1
            className="text-2xl italic tracking-tight text-[#03192e]"
            style={{ fontFamily: "Newsreader, serif" }}
          >
            The Devotional
          </h1>
          <div className="h-8 w-8 overflow-hidden rounded-full border border-black/10 bg-[#e1e3e4]">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3T3RimvqwKDEhfLDpdyaSNez6ShtFjkn1lvXyN14PSlGVOPsbLhzIOpbFFwrfQwDsFfSyNoyUKQjXc3h46xV_0N8Qyi6DU4SFcPtxLWdjUo3uIBo3tP6Xi5bFkcPav22Xs99Ke_D54p4udHZGmSC6rDtcC6lZuNB8IzDtE-PsOEygVsMX66_qyOQcLmzHhYPaeH6bdfGLhCSPfMBXKWi_C9ew1ddLAQnURqkfMdKGViDAxbc5ufN8Ai_vI9efKiEh8ZAamPGcRZEX"
              alt="User profile"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-md space-y-10 px-6 pb-10 pt-24">
        <section>
          <div className="mb-4 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#775a19]">
              Daily Bread
            </span>
            <h2
              className="text-3xl leading-tight text-[#03192e]"
              style={{ fontFamily: "Newsreader, serif" }}
            >
              Wisdom for the Journey
            </h2>
          </div>
          <div className="relative overflow-hidden rounded-xl border-l-4 border-[#775a19] bg-white p-8 shadow-sm">
            <Quote className="absolute -right-3 -top-3 h-20 w-20 text-[#03192e]/10" />
            <blockquote
              className="relative z-10 text-xl italic leading-relaxed text-[#1a2e44]"
              style={{ fontFamily: "Newsreader, serif" }}
            >
              "Thy word is a lamp unto my feet, and a light unto my path."
            </blockquote>
            <cite className="mt-4 block text-xs uppercase tracking-[0.18em] text-[#43474d] not-italic">
              — Psalm 119:105
            </cite>
          </div>
        </section>

        <section className="grid grid-cols-2 gap-4">
          <div className="aspect-square rounded-xl bg-[#03192e] p-5 text-white">
            <div className="flex h-full flex-col justify-between">
              <Zap className="h-5 w-5 fill-[#fed488] text-[#fed488]" />
              <div>
                <div
                  className="text-3xl font-bold"
                  style={{ fontFamily: "Newsreader, serif" }}
                >
                  1,240
                </div>
                <div className="text-[10px] uppercase tracking-[0.15em] text-white/70">
                  Total XP
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-rows-2 gap-4">
            <div className="flex items-center gap-3 rounded-xl bg-[#f3f4f5] p-4">
              <Award className="h-5 w-5 text-[#775a19]" />
              <div>
                <div
                  className="text-lg font-bold text-[#03192e]"
                  style={{ fontFamily: "Newsreader, serif" }}
                >
                  8
                </div>
                <div className="text-[10px] uppercase tracking-[0.15em] text-[#43474d]">
                  Badges
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-[#f3f4f5] p-4">
              <Flame className="h-5 w-5 fill-[#775a19] text-[#775a19]" />
              <div>
                <div
                  className="text-lg font-bold text-[#03192e]"
                  style={{ fontFamily: "Newsreader, serif" }}
                >
                  12
                </div>
                <div className="text-[10px] uppercase tracking-[0.15em] text-[#43474d]">
                  Day Streak
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-end justify-between">
            <h3
              className="text-2xl text-[#03192e]"
              style={{ fontFamily: "Newsreader, serif" }}
            >
              Quick Start
            </h3>
            <button
              type="button"
              onClick={() => navigate("/bible-questions-and-answers-hub")}
              className="text-xs font-bold uppercase tracking-[0.15em] text-[#775a19]"
            >
              See All
            </button>
          </div>
          <button
            type="button"
            onClick={() => navigate("/todays-quiz")}
            className="group relative h-48 w-full overflow-hidden rounded-xl bg-[#03192e] text-left"
          >
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5wXKWKyyx0ejcy4j5NQeiBx5UpkaTw8mTH6B3Crl4mEBVZy1M2ipW4oSCtASN44bqftFk2-Ft9itPoRVkwUjGcYb2DWGgfhOxYrkA6pNrjP13AJsr2EbDF2QO92ZeQ2Y1eYv97PJ0UDRMiBdYY1AbuFhoPKPpKvWkkTqvwIQYS43xDrcH-DgBMQfZDxj0N9Rg5D_8UHRTB5-56a-CpPxbuYgUVxsQUci1qsGnmpMszoUgyWxwJo0vCzlMVUp-QFa3EnNGPtJpGAKo"
              alt="Bible Quiz"
              className="h-full w-full object-cover opacity-40 transition duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[#03192e]/90 to-transparent p-6">
              <div className="mb-1 text-[10px] uppercase tracking-[0.2em] text-[#fed488]">
                Current Series
              </div>
              <h4
                className="text-2xl text-white"
                style={{ fontFamily: "Newsreader, serif" }}
              >
                The Parables of Jesus
              </h4>
              <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-white/20">
                <div className="h-full w-[65%] rounded-full bg-[#fed488]" />
              </div>
              <div className="mt-2 flex justify-between text-[10px] tracking-[0.1em] text-white/70">
                <span>13/20 QUESTIONS</span>
                <span>65% COMPLETE</span>
              </div>
            </div>
          </button>
        </section>

        <section className="space-y-4">
          <h3
            className="text-2xl text-[#03192e]"
            style={{ fontFamily: "Newsreader, serif" }}
          >
            Sacred Challenges
          </h3>
          <div className="-mx-6 flex gap-4 overflow-x-auto px-6 pb-2">
            {challengeCards.map((challenge) => (
              <article
                key={challenge.title}
                className="min-w-[280px] rounded-xl border border-black/10 bg-white p-4 shadow-sm"
              >
                <div className="h-32 overflow-hidden rounded-lg">
                  <img
                    src={challenge.image}
                    alt={challenge.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="mt-4">
                  <h5
                    className="text-lg text-[#03192e]"
                    style={{ fontFamily: "Newsreader, serif" }}
                  >
                    {challenge.title}
                  </h5>
                  <p className="mt-1 text-sm leading-relaxed text-[#43474d]">
                    {challenge.description}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => navigate(challenge.path)}
                  className="mt-4 w-full rounded-full bg-[#e7e8e9] py-3 text-[10px] font-bold uppercase tracking-[0.16em] text-[#03192e] transition hover:bg-[#fed488]"
                >
                  Enter Challenge
                </button>
              </article>
            ))}
          </div>
        </section>
      </main>

      <nav className="fixed bottom-0 left-0 z-50 w-full bg-[#f8f9fa]/95 px-4 pb-8 pt-4 backdrop-blur-2xl shadow-[0_-8px_48px_rgba(0,0,0,0.05)]">
        <div className="mx-auto flex max-w-md items-center justify-around">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex flex-col items-center rounded-full bg-white p-3 text-[#775a19] shadow-sm"
          >
            <Home className="h-5 w-5 fill-[#775a19] text-[#775a19]" />
            <span className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em]">
              Home
            </span>
          </button>
          <button
            type="button"
            onClick={() => navigate("/bible-questions-and-answers-hub")}
            className="flex flex-col items-center text-slate-500 transition hover:text-[#775a19]"
          >
            <List className="h-5 w-5" />
            <span className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em]">
              Browse
            </span>
          </button>
          <button
            type="button"
            onClick={() => navigate("/public-leaderboard")}
            className="flex flex-col items-center text-slate-500 transition hover:text-[#775a19]"
          >
            <Trophy className="h-5 w-5" />
            <span className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em]">
              Leaders
            </span>
          </button>
          <button
            type="button"
            onClick={() => navigate("/help")}
            className="flex flex-col items-center text-slate-500 transition hover:text-[#775a19]"
          >
            <Settings className="h-5 w-5" />
            <span className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em]">
              Settings
            </span>
          </button>
        </div>
      </nav>

      <button
        type="button"
        onClick={() => navigate("/todays-quiz")}
        aria-label="Start quiz"
        className="fixed bottom-28 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#03192e] text-white shadow-[0_8px_32px_rgba(0,0,0,0.15)] transition active:scale-90"
      >
        <Sparkles className="h-5 w-5" />
      </button>
    </div>
  );
};

export default DevotionalHome;
