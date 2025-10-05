import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Users, BookOpen, Clock, Star, ArrowRight, BookMarked } from "lucide-react";
import { Button } from "@/components/ui/button";

const paulineEpistles = [
  {
    title: "Romans",
    description: "The gospel of God's righteousness - Justification by faith, sin and grace, God's plan for Israel",
    difficulty: "Advanced",
    questions: 10,
    icon: BookOpen,
    color: "bg-blue-500",
    link: "/bible-questions-and-answers-hub/romans",
    status: "available"
  },
  {
    title: "1 Corinthians",
    description: "Addressing church problems - Love, spiritual gifts, resurrection, Christian conduct",
    difficulty: "Intermediate",
    questions: 10,
    icon: BookOpen,
    color: "bg-green-500",
    link: "/bible-questions-and-answers-hub/1-corinthians",
    status: "available"
  },
  {
    title: "2 Corinthians",
    description: "Paul's defense and ministry - Apostolic authority, suffering, giving, reconciliation",
    difficulty: "Intermediate",
    questions: 10,
    icon: BookOpen,
    color: "bg-purple-500",
    link: "/bible-questions-and-answers-hub/2-corinthians",
    status: "available"
  },
  {
    title: "Galatians",
    description: "Freedom in Christ - Justification by faith alone, law vs. grace, Christian liberty",
    difficulty: "Intermediate",
    questions: 10,
    icon: BookOpen,
    color: "bg-orange-500",
    link: "/bible-questions-and-answers-hub/galatians",
    status: "available"
  },
  {
    title: "Ephesians",
    description: "The church as Christ's body - Unity, spiritual warfare, Christian living, God's eternal plan",
    difficulty: "Intermediate",
    questions: 10,
    icon: BookOpen,
    color: "bg-pink-500",
    link: "/bible-questions-and-answers-hub/ephesians",
    status: "available"
  },
  {
    title: "Philippians",
    description: "Joy in Christ - Paul's gratitude, Christ's humility, pressing toward the goal",
    difficulty: "Beginner",
    questions: 10,
    icon: BookOpen,
    color: "bg-yellow-500",
    link: "/bible-questions-and-answers-hub/philippians",
    status: "available"
  },
  {
    title: "Colossians",
    description: "The supremacy of Christ - Christ's preeminence, Christian conduct, false teachings",
    difficulty: "Intermediate",
    questions: 10,
    icon: BookOpen,
    color: "bg-teal-500",
    link: "/bible-questions-and-answers-hub/colossians",
    status: "available"
  },
  {
    title: "1 Thessalonians",
    description: "The Lord's return - Paul's ministry, Christian living, the rapture, end times",
    difficulty: "Beginner",
    questions: 10,
    icon: BookOpen,
    color: "bg-indigo-500",
    link: "/bible-questions-and-answers-hub/1-thessalonians",
    status: "available"
  },
  {
    title: "2 Thessalonians",
    description: "The day of the Lord - End times, the man of lawlessness, Christian discipline",
    difficulty: "Intermediate",
    questions: 10,
    icon: BookOpen,
    color: "bg-red-500",
    link: "/bible-questions-and-answers-hub/2-thessalonians",
    status: "available"
  },
  {
    title: "1 Timothy",
    description: "Pastoral leadership - Church order, qualifications for leaders, false teachings",
    difficulty: "Intermediate",
    questions: 10,
    icon: BookOpen,
    color: "bg-cyan-500",
    link: "/bible-questions-and-answers-hub/1-timothy",
    status: "available"
  },
  {
    title: "2 Timothy",
    description: "Paul's final words - Endurance, sound doctrine, finishing the race, God's faithfulness",
    difficulty: "Intermediate",
    questions: 10,
    icon: BookOpen,
    color: "bg-lime-500",
    link: "/bible-questions-and-answers-hub/2-timothy",
    status: "available"
  },
  {
    title: "Titus",
    description: "Church organization - Qualifications for elders, sound doctrine, good works",
    difficulty: "Intermediate",
    questions: 10,
    icon: BookOpen,
    color: "bg-emerald-500",
    link: "/bible-questions-and-answers-hub/titus",
    status: "available"
  },
  {
    title: "Philemon",
    description: "A personal appeal - Forgiveness, Christian brotherhood, Paul's intercession",
    difficulty: "Beginner",
    questions: 10,
    icon: BookOpen,
    color: "bg-violet-500",
    link: "/bible-questions-and-answers-hub/philemon",
    status: "available"
  }
];

export default function PaulineEpistles() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 mb-6">
            <Users className="w-8 h-8 text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Pauline Epistles</h1>
          <p className="text-xl text-gray-600 mb-2">Paul's letters</p>
          <p className="text-lg text-gray-500 max-w-3xl mx-auto">
            Explore the profound teachings of the Apostle Paul through his 13 epistles. 
            These letters contain foundational Christian doctrine, practical guidance for living, 
            and deep theological insights that continue to shape Christian faith today.
          </p>
        </div>

        {/* Coming Soon Notice */}
        <div className="bg-gradient-to-r from-indigo-100 to-purple-100 border border-indigo-200 rounded-xl p-6 mb-8">
          <div className="flex items-center justify-center">
            <Clock className="w-6 h-6 text-indigo-600 mr-3" />
            <p className="text-lg font-semibold text-indigo-800">
              Quizzes for this category coming soon...
            </p>
          </div>
        </div>

        {/* Epistles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {paulineEpistles.map((epistle, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-12 h-12 rounded-xl ${epistle.color} flex items-center justify-center`}>
                    <epistle.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      epistle.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                      epistle.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {epistle.difficulty}
                    </span>
                  </div>
                </div>
                <CardTitle className="text-xl font-bold text-gray-900 mb-2">
                  {epistle.title}
                </CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  {epistle.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <BookMarked className="w-4 h-4 mr-1" />
                      {epistle.questions} questions
                    </div>
                  </div>
                  <Button 
                    asChild 
                    className="group-hover:bg-indigo-600 transition-colors duration-200"
                    disabled={epistle.status !== "available"}
                  >
                    <Link to={epistle.link} className="flex items-center">
                      {epistle.status === "available" ? "Take Quiz" : "Coming Soon"}
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Information */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">About Pauline Epistles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Theological Themes</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• Justification by faith</li>
                <li>• The nature of the church</li>
                <li>• Christian living and ethics</li>
                <li>• The resurrection and end times</li>
                <li>• Spiritual gifts and ministry</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Historical Context</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• Written between 50-67 AD</li>
                <li>• Addressed to churches and individuals</li>
                <li>• Cover Paul's missionary journeys</li>
                <li>• Address specific church issues</li>
                <li>• Provide pastoral guidance</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
