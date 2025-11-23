import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Gamepad2, Search, TrendingUp, Users, Star, Play, Sparkles, Brain, Heart, Zap, Flame, Trophy, Target, ArrowRight } from "lucide-react";

interface Game {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  players: number;
  visits: number;
  rating: number;
  votes: number;
  badges: string[];
  image?: string;
  type: 'runner' | 'memory';
}

const games: Game[] = [
  {
    id: "scripture-match-multiplayer",
    title: "Scripture Match",
    description: "Memory card game with random players online! Match virtues and vices to win.",
    category: "Puzzle",
    difficulty: "Intermediate",
    players: 1543,
    visits: 52000,
    rating: 95,
    votes: 1012,
    badges: ["Hot", "New", "Multiplayer"],
    image: "/assets/matching.png",
    type: 'memory'
  },
  {
    id: "lost-sheep",
    title: "Lost Sheep",
    description: "Biblical card game! Avoid being left with the Lost Sheep card. Match pairs to win.",
    category: "Puzzle",
    difficulty: "Intermediate",
    players: 892,
    visits: 28000,
    rating: 93,
    votes: 567,
    badges: ["New"],
    image: "/assets/matching.png",
    type: 'memory'
  },
  {
    id: "joy-runner",
    title: "Joy Runner",
    description: "Catch good bubbles and avoid sins! Test your reflexes while learning biblical virtues.",
    category: "Action",
    difficulty: "Beginner",
    players: 1258,
    visits: 45000,
    rating: 96,
    votes: 873,
    badges: ["Hot", "Creators Love"],
    image: "/assets/joy-runner.png",
    type: 'runner'
  },
  {
    id: "memory-match",
    title: "Memory Match",
    description: "Match pairs of Bible words! Improve your memory while learning biblical concepts.",
    category: "Puzzle",
    difficulty: "Beginner",
    players: 892,
    visits: 32000,
    rating: 94,
    votes: 642,
    badges: ["Hot"],
    image: "/assets/matching.png",
    type: 'memory'
  },
  {
    id: "verse-master",
    title: "Verse Master",
    description: "Memorize and match Bible verses. Perfect for daily devotion and scripture study.",
    category: "Memory",
    difficulty: "Intermediate",
    players: 678,
    visits: 28000,
    rating: 88,
    votes: 456,
    badges: [],
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&h=600&fit=crop&q=80", // Bible scripture
    type: 'memory'
  },
  {
    id: "faith-builder",
    title: "Faith Builder",
    description: "Build your faith through interactive challenges based on biblical principles.",
    category: "Adventure",
    difficulty: "Advanced",
    players: 432,
    visits: 15000,
    rating: 85,
    votes: 234,
    badges: ["New"],
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop&q=80", // Cross/faith
    type: 'runner'
  },
  {
    id: "word-search",
    title: "Bible Word Search",
    description: "Find hidden biblical words in challenging word search puzzles.",
    category: "Puzzle",
    difficulty: "Beginner",
    players: 1105,
    visits: 41000,
    rating: 90,
    votes: 789,
    badges: [],
    image: "/assets/word-search.png",
    type: 'memory'
  },
  {
    id: "flappy-bird",
    title: "Noah's Dove",
    description: "Tap to fly! Navigate through obstacles and collect stars in this Bible-themed game.",
    category: "Action",
    difficulty: "Intermediate",
    players: 923,
    visits: 35000,
    rating: 91,
    votes: 612,
    badges: ["New"],
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=800&h=600&fit=crop&q=80",
    type: 'runner'
  }
];

const categories = [
  "All Games",
  "Action",
  "Puzzle",
  "Quiz",
  "Memory",
  "Adventure"
];

const sortOptions = [
  "Popularity",
  "Rating",
  "Players",
  "Alphabet"
];

const BibleGames = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Games");
  const [sortBy, setSortBy] = useState("Popularity");

  const filteredGames = games.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All Games" || game.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedGames = [...filteredGames].sort((a, b) => {
    switch (sortBy) {
      case "Rating":
        return b.rating - a.rating;
      case "Players":
        return b.players - a.players;
      case "Alphabet":
        return a.title.localeCompare(b.title);
      default: // Popularity
        return b.visits - a.visits;
    }
  });

  const handlePlayGame = (game: Game) => {
    if (game.id === 'scripture-match-multiplayer') {
      navigate('/scripture-match-multiplayer');
    } else if (game.id === 'joy-runner') {
      navigate('/joy-runner');
    } else if (game.id === 'memory-match') {
      navigate('/memory-match');
    } else if (game.id === 'word-search') {
      navigate('/word-search');
    } else if (game.id === 'verse-master') {
      navigate('/verse-master');
    } else if (game.id === 'faith-builder') {
      navigate('/faith-builder');
    } else if (game.id === 'flappy-bird') {
      navigate('/flappy-bird');
    } else if (game.type === 'runner') {
      navigate('/joy-runner');
    } else if (game.type === 'memory') {
      navigate('/memory-match');
    }
  };

  return (
  <div className="min-h-screen w-full bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex flex-col pt-6 px-2 pb-4 m-0 overflow-x-hidden box-border">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Hero Header */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-xl opacity-75 animate-pulse"></div>
                  <div className="relative w-16 h-16 bg-gradient-to-br from-purple-600 via-pink-600 to-purple-700 rounded-2xl flex items-center justify-center shadow-2xl">
                    <Gamepad2 className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-urbanist font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                    Bible Games
                  </h1>
                  <p className="text-purple-300 font-urbanist font-light mt-1 flex items-center gap-2">
                    <Flame className="w-4 h-4 text-orange-400" />
                    {games.length} Epic Games • Play, Learn, Win
                  </p>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="flex gap-4">
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-3">
                  <p className="text-xs text-purple-300 font-urbanist uppercase tracking-wider mb-1">Players Online</p>
                  <p className="text-2xl font-urbanist font-bold text-white">2.5K+</p>
                </div>
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-3">
                  <p className="text-xs text-purple-300 font-urbanist uppercase tracking-wider mb-1">Games Played</p>
                  <p className="text-2xl font-urbanist font-bold text-white">45K+</p>
                </div>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 w-full max-w-full overflow-x-hidden">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-300" />
                  <Input
                    type="text"
                    placeholder="Search games..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-12 bg-white/5 border-white/10 text-white placeholder:text-purple-300/50 font-urbanist font-light focus:bg-white/10 focus:border-purple-500/50"
                  />
                </div>

                {/* Sort */}
                <div className="flex gap-2">
                  {sortOptions.map((option) => (
                    <Button
                      key={option}
                      variant="ghost"
                      size="sm"
                      className={`font-urbanist font-light h-12 px-6 ${sortBy === option
                          ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700"
                          : "bg-white/5 text-purple-200 hover:bg-white/10 hover:text-white border border-white/10"
                        }`}
                      onClick={() => setSortBy(option)}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap gap-2 mt-4">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant="ghost"
                    size="sm"
                    className={`font-urbanist font-light rounded-full px-4 py-2 ${selectedCategory === category
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700"
                        : "bg-white/5 text-purple-200 hover:bg-white/10 hover:text-white border border-white/10"
                      }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Games Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedGames.map((game) => (
              <div
                key={game.id}
                className="group relative"
                onClick={() => handlePlayGame(game)}
              >
                {/* Game Card */}
                <div className="relative bg-slate-900 border-4 border-purple-500 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/30 animate-pulse-slow w-full max-w-full">
                  {/* Only Difficulty Badge remains, now on top right */}
                  <div className="absolute top-3 right-3 z-10">
                    <div className={`px-3 py-1 rounded-lg text-xs font-urbanist font-semibold backdrop-blur-xl ${game.difficulty === "Beginner"
                        ? "bg-green-500/20 text-green-300 border border-green-500/30"
                        : game.difficulty === "Intermediate"
                          ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
                          : "bg-red-500/20 text-red-300 border border-red-500/30"
                      }`}>
                      {game.difficulty}
                    </div>
                  </div>

                  {/* Removed duplicate difficulty badge on right */}

                  {/* Game Info */}
                  <div className="p-3 md:p-5">
                    <h3 className="text-lg md:text-xl font-urbanist font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                      {game.title}
                    </h3>
                    <p className="text-xs md:text-sm font-urbanist font-light text-purple-200/70 mb-3 md:mb-4 line-clamp-2">
                      {game.description}
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-2 md:gap-3 mb-3 md:mb-4">
                      <div className="bg-white/5 rounded-lg p-2 text-center border border-white/5">
                        <Star className="w-4 h-4 text-yellow-400 mx-auto mb-1" />
                        <p className="text-xs md:text-xs font-urbanist font-bold text-white">{game.rating}%</p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-2 text-center border border-white/5">
                        <Users className="w-4 h-4 text-purple-400 mx-auto mb-1" />
                        <p className="text-xs md:text-xs font-urbanist font-bold text-white">{(game.players / 1000).toFixed(1)}K</p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-2 text-center border border-white/5">
                        <TrendingUp className="w-4 h-4 text-green-400 mx-auto mb-1" />
                        <p className="text-xs md:text-xs font-urbanist font-bold text-white">{(game.visits / 1000).toFixed(0)}K</p>
                      </div>
                    </div>

                    {/* Play Button */}
                    <Button
                      className="w-full h-10 md:h-12 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 hover:from-purple-700 hover:via-pink-700 hover:to-purple-800 text-white font-urbanist font-semibold text-sm md:text-base shadow-lg shadow-purple-500/20 transition-all duration-300 group-hover:shadow-purple-500/40"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlayGame(game);
                      }}
                    >
                      <Play className="w-5 h-5 mr-2 fill-current" />
                      Play Now
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-pink-600/0 to-purple-600/0 group-hover:from-purple-600/10 group-hover:via-pink-600/10 group-hover:to-purple-600/10 transition-all duration-500 rounded-2xl pointer-events-none"></div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {sortedGames.length === 0 && (
            <div className="text-center py-20">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-2xl opacity-20 animate-pulse"></div>
                <Gamepad2 className="relative w-20 h-20 text-purple-400 mx-auto mb-6" />
              </div>
              <h3 className="text-2xl font-urbanist font-bold text-white mb-2">No Games Found</h3>
              <p className="text-purple-300 font-urbanist font-light">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    );
};

export default BibleGames;

