import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Trophy, Users, Play, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RelatedContentProps {
  currentCategory?: string;
  items?: { title: string; path: string; icon?: any }[];
}

const RelatedContentWidget = ({ currentCategory, items }: RelatedContentProps) => {
  const navigate = useNavigate();

  const defaultItems = [
    { title: "Daily Bible Quiz", path: "/daily-bible-quiz", icon: Trophy },
    { title: "Bible Q&A Hub", path: "/bible-questions-and-answers-hub", icon: BookOpen },
    { title: "Hard Trivia Questions", path: "/hardest-bible-trivia-questions", icon: Trophy },
    { title: "Kids Bible Stories", path: "/kids-stories", icon: Users },
  ];

  const displayItems = items || defaultItems;

  return (
    <section className="mt-20 pt-12 border-t border-slate-200">
      <h2 className="text-3xl font-bold text-slate-900 mb-8 font-urbanist text-center">
        Explore More Bible Resources
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayItems.map((item, idx) => {
          const Icon = item.icon || BookOpen;
          return (
            <Card 
              key={idx}
              className="group hover:shadow-xl transition-all duration-300 border-slate-200 cursor-pointer overflow-hidden transform hover:-translate-y-1"
              onClick={() => navigate(item.path)}
            >
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="p-4 bg-blue-50 rounded-2xl group-hover:bg-blue-600 transition-colors duration-300">
                  <Icon className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">
                    Free learning resource
                  </p>
                </div>
                <div className="flex items-center text-blue-600 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  View Now <ArrowRight className="ml-1 w-4 h-4" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      <div className="mt-12 text-center">
        <Button 
          variant="outline" 
          size="lg" 
          className="rounded-full border-blue-200 text-blue-600 hover:bg-blue-50 font-bold"
          onClick={() => navigate('/quizzes')}
        >
          Browse All Bible Quizzes
        </Button>
      </div>
    </section>
  );
};

export default RelatedContentWidget;
