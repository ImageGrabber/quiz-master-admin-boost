import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ShieldCheck, Users, BookOpen } from "lucide-react";

export default function AboutUs() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-urbanist">
            <Helmet>
                <title>About Us | Bible Quiz Competition</title>
                <meta name="description" content="Learn about Bible Quiz Competition, our mission to spread biblical literacy, and our vibrant online community of players." />
                
                {/* Organization Schema for Google Trust Signals */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Organization",
                        "name": "Bible Quiz Competition",
                        "url": "https://biblequizcompetition.com",
                        "logo": "https://biblequizcompetition.com/logo.png",
                        "description": "An interactive platform dedicated to promoting Biblical literacy through fun, engaging, and competitive Bible quizzes.",
                        "sameAs": [
                            "https://twitter.com/biblequizcomp",
                            "https://facebook.com/biblequizcompetition"
                        ],
                        "contactPoint": {
                            "@type": "ContactPoint",
                            "email": "support@biblequizcompetition.com",
                            "contactType": "customer service"
                        }
                    })}
                </script>
            </Helmet>
            
            <Header />

            <main className="flex-1 container mx-auto px-4 py-16 max-w-4xl">
                <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
                        About Bible Quiz Competition
                    </h1>
                    
                    <p className="text-xl text-slate-600 mb-10 leading-relaxed">
                        Welcome to Bible Quiz Competition, a premier online platform dedicated to helping individuals, youth groups, and churches deepen their understanding of God's Word through engaging, interactive quizzes.
                    </p>

                    <div className="grid md:grid-cols-3 gap-8 mb-12">
                        <div className="bg-blue-50 p-6 rounded-2xl">
                            <BookOpen className="w-8 h-8 text-blue-600 mb-4" />
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Our Mission</h3>
                            <p className="text-slate-600">To make Biblical literacy accessible, highly engaging, and fun for all ages through gamified learning.</p>
                        </div>
                        <div className="bg-amber-50 p-6 rounded-2xl">
                            <Users className="w-8 h-8 text-amber-600 mb-4" />
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Community Driven</h3>
                            <p className="text-slate-600">Built for individuals, study groups, and church ministries to host live quizzes and track spiritual growth.</p>
                        </div>
                        <div className="bg-green-50 p-6 rounded-2xl">
                            <ShieldCheck className="w-8 h-8 text-green-600 mb-4" />
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Our Commitment</h3>
                            <p className="text-slate-600">We are an independent, non-denominational organization committed to theological accuracy and safe online competition.</p>
                        </div>
                    </div>

                    <div className="prose prose-slate max-w-none">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Who We Are</h2>
                        <p className="text-slate-600 mb-6">
                            Bible Quiz Competition was founded by a team of developers and Bible scholars who saw a need for modern, high-quality digital tools in Christian education. Today, we serve thousands of users participating in daily quizzes, weekly live competitions, and personal study journeys.
                        </p>
                        
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Verified Competitions</h2>
                        <p className="text-slate-600 mb-6">
                            Unlike unverified platforms, we maintain a strict <a href="/rules-and-prizes" className="text-blue-600 hover:underline">Rules & Prizes policy</a> to ensure fair play. Our monthly and annual leaderboards are actively moderated to guarantee the integrity of our rewards system.
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
