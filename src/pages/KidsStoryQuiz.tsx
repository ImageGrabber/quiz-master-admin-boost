import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import PublicQuiz from "./PublicQuiz";
import storiesData from "@/data/kids-stories.json";
import { Button } from "@/components/ui/button";
import { BookOpen, ArrowLeft } from "lucide-react";

const KidsStoryQuiz = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const story = storiesData.find((s) => s.slug === slug);

  if (!story || !story.quiz || story.quiz.length === 0) {
    return (
      <div className="min-h-screen bg-[#fafaf9] flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-orange-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-10 h-10 text-orange-600" />
          </div>
          <h2 className="text-2xl font-bold text-stone-900 mb-4 font-urbanist">Quiz Coming Soon!</h2>
          <p className="text-stone-600 mb-8">We're still preparing the questions for this story. Check back soon!</p>
          <Button 
            onClick={() => navigate(-1)}
            className="rounded-2xl px-8 h-14 bg-stone-900 text-white font-bold uppercase tracking-widest text-xs"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  // Format questions for PublicQuiz if needed (they already match the interface)
  return (
    <PublicQuiz
      title={`Fun Quiz: ${story.title}`}
      questions={story.quiz}
      bookName="Kids Bible Stories"
      chapter={story.title}
      seoDescription={`Test your knowledge of the story "${story.title}" with this fun Bible quiz for kids!`}
      canonicalPath={`/kids-stories/${slug}/quiz`}
      isKidsStory={true}
    />
  );
};

export default KidsStoryQuiz;
