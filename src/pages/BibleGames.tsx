import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Gamepad2, Search, TrendingUp, Users, Star, Play, Sparkles, Brain, Heart, Zap } from "lucide-react";

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
    title: "Flappy Bird",
    description: "Tap to fly! Navigate through obstacles and collect stars in this Bible-themed Flappy Bird game.",
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
    if (game.id === 'joy-runner') {
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
    <DashboardLayout>
      <div className="w-full">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Gamepad2 className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h1 className="text-2xl font-urbanist font-semibold text-gray-900">Bible Games</h1>
                <p className="text-sm font-urbanist font-light text-gray-600">{games.length} Games</p>
              </div>
            </div>
          </div>

          {/* Category Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                className={`font-urbanist font-light ${
                  selectedCategory === category
                    ? "bg-gray-900 text-white hover:bg-gray-800"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Search and Sort */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search game by name or description"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 font-urbanist font-light"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-urbanist font-light text-gray-600">Sort by:</span>
              <div className="flex gap-2">
                {sortOptions.map((option) => (
                  <Button
                    key={option}
                    variant={sortBy === option ? "default" : "ghost"}
                    size="sm"
                    className={`font-urbanist font-light text-xs ${
                      sortBy === option
                        ? "bg-gray-900 text-white hover:bg-gray-800"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                    onClick={() => setSortBy(option)}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {sortedGames.map((game) => (
            <Card
              key={game.id}
              className="border border-gray-200 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
              onClick={() => handlePlayGame(game)}
            >
              <CardContent className="p-0">
                {/* Game Thumbnail */}
                <div className="relative h-48 rounded-t-lg overflow-hidden bg-gradient-to-br from-purple-100 to-indigo-100">
                  {game.image ? (
                    <img
                      src={game.image}
                      alt={game.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to gradient if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        if (target.parentElement) {
                          target.parentElement.className = "relative h-48 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-t-lg flex items-center justify-center";
                        }
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                        <Gamepad2 className="w-10 h-10 text-white" />
                      </div>
                    </div>
                  )}
                  {/* Overlay gradient for better text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  {/* Badges */}
                  <div className="absolute top-2 left-2 flex flex-wrap gap-1 z-10">
                    {game.badges.map((badge, index) => (
                      <Badge
                        key={index}
                        className={`text-xs font-urbanist font-light ${
                          badge === "Hot"
                            ? "bg-red-500 text-white"
                            : badge === "Creators Love"
                            ? "bg-green-500 text-white"
                            : badge === "Popular"
                            ? "bg-blue-500 text-white"
                            : "bg-purple-500 text-white"
                        }`}
                      >
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Game Info */}
                <div className="p-4">
                  <h3 className="text-lg font-urbanist font-semibold text-gray-900 mb-2">
                    {game.title}
                  </h3>
                  <p className="text-xs font-urbanist font-light text-gray-600 mb-3 line-clamp-2">
                    {game.description}
                  </p>

                  {/* Stats */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Star className="w-3 h-3" />
                      <span className="font-urbanist font-light">
                        {game.rating}% {game.votes} Votes
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        <span className="font-urbanist font-light">{game.players.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        <span className="font-urbanist font-light">
                          {game.visits >= 1000 ? `${(game.visits / 1000).toFixed(1)}K` : game.visits} Visits
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Play Button */}
                  <Button
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-urbanist font-light"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlayGame(game);
                    }}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Play Game
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {sortedGames.length === 0 && (
          <div className="text-center py-12">
            <Gamepad2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 font-urbanist font-light">No games found matching your search.</p>
          </div>
        )}
      </div>

    </DashboardLayout>
  );
};

export default BibleGames;

