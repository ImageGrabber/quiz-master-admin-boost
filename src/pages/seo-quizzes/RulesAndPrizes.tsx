import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Star, BookOpen, AlertCircle, CheckCircle2, Crown, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';

const RulesAndPrizes = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-50 font-urbanist">
            <Helmet>
                <title>Bible Quiz Competition Rules & Prizes 2025 | Scoring System Explained</title>
                <meta name="description" content="Official rules and scoring system explanation for the 2025 Bible Quiz Competition. Learn how points are calculated, view the prize breakdown, and start competing today." />
                <meta name="keywords" content="bible quiz prize, quiz scoring system explanation, bible competition rules, daily bible quiz prizes, bible quiz 2025" />
                <link rel="canonical" href="https://biblequizcompetition.com/rules-and-prizes" />

                {/* Structured Data for Rules */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Article",
                        "headline": "Bible Quiz Competition Rules and Prizes 2025",
                        "datePublished": "2025-01-01",
                        "dateModified": "2025-01-01",
                        "author": {
                            "@type": "Organization",
                            "name": "Bible Quiz Competition"
                        },
                        "publisher": {
                            "@type": "Organization",
                            "name": "Bible Quiz Competition",
                            "logo": {
                                "@type": "ImageObject",
                                "url": "https://biblequizcompetition.com/logo.png" // Placeholder
                            }
                        },
                        "description": "Comprehensive guide to the 2025 Bible Quiz Competition rules, scoring system, and prizes."
                    })}
                </script>
            </Helmet>

            <Navigation />

            <main className="container mx-auto px-4 py-8 pt-24">
                {/* Header */}
                <header className="text-center mb-16 max-w-4xl mx-auto">
                    <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-6">
                        <Trophy className="w-8 h-8 text-blue-600" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
                        Rules & Prizes 2025
                    </h1>
                    <p className="text-xl text-slate-600 leading-relaxed">
                        Everything you need to know about the <strong>Bible Quiz Competition 2025</strong>.
                        Understand the scoring system, qualify for prizes, and master the Word.
                    </p>
                </header>

                {/* Scoring System Section - Keyword Target: "quiz scoring system explanation" */}
                <section className="mb-20" id="scoring-system">
                    <div className="flex items-center gap-3 mb-8 justify-center md:justify-start">
                        <Zap className="h-8 w-8 text-amber-500" />
                        <h2 className="text-3xl font-bold text-slate-900">Quiz Scoring System Explanation</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 items-start">
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">How Points Are Calculated</h3>
                            <p className="text-slate-600 mb-6">
                                Our dynamic scoring algorithm rewards both knowledge and speed. Here is the exact formula used for every question:
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
                                    <div>
                                        <strong className="text-slate-900 block">Base Points</strong>
                                        <span className="text-slate-600">Every correct answer awards <strong>100 points</strong>.</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
                                    <div>
                                        <strong className="text-slate-900 block">Speed Bonus</strong>
                                        <span className="text-slate-600">Earn up to <strong>50 bonus points</strong> for answering quickly. The faster you answer, the higher your bonus.</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
                                    <div>
                                        <strong className="text-slate-900 block">Streak Multiplier</strong>
                                        <span className="text-slate-600">Answer 3 questions in a row correctly to trigger a <strong>1.5x Multiplier</strong> on subsequent questions.</span>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-slate-900 p-8 rounded-3xl text-white">
                            <h3 className="text-2xl font-bold mb-4">Example Scenario</h3>
                            <div className="space-y-6">
                                <div className="bg-white/10 p-4 rounded-xl">
                                    <div className="text-sm text-slate-300 mb-1">Question 1 (Correct in 2s)</div>
                                    <div className="font-mono text-xl text-green-400">100 Base + 48 Speed = 148 pts</div>
                                </div>
                                <div className="bg-white/10 p-4 rounded-xl">
                                    <div className="text-sm text-slate-300 mb-1">Question 2 (Correct in 5s)</div>
                                    <div className="font-mono text-xl text-green-400">100 Base + 35 Speed = 135 pts</div>
                                </div>
                                <div className="bg-blue-600/20 border border-blue-500/50 p-4 rounded-xl">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-sm text-blue-200">Question 3 (Streak Active!)</span>
                                        <span className="px-2 py-0.5 bg-blue-500 text-xs rounded-full font-bold">1.5x</span>
                                    </div>
                                    <div className="font-mono text-xl text-blue-300">(100 + 40) × 1.5 = 210 pts</div>
                                </div>
                            </div>
                            <div className="mt-6 pt-6 border-t border-white/10">
                                <p className="text-slate-300 text-sm">
                                    *Incorrect answers receive 0 points and reset your streak to zero.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Prizes Section - Keyword Target: "bible quiz prize" */}
                <section className="mb-20" id="prizes">
                    <div className="flex items-center gap-3 mb-8 justify-center md:justify-start">
                        <Crown className="h-8 w-8 text-amber-500" />
                        <h2 className="text-3xl font-bold text-slate-900">Bible Quiz Prizes & Rewards</h2>
                    </div>
                    <p className="text-lg text-slate-600 max-w-3xl mb-10">
                        We believe in rewarding dedication to God's Word. Participate in the <strong>Bible Quiz Competition 2025</strong> for a chance to win spiritual resources and recognition.
                    </p>

                    <div className="grid md:grid-cols-3 gap-6">
                        <Card className="border-blue-100 bg-blue-50 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Trophy className="w-24 h-24 text-blue-600" />
                            </div>
                            <CardHeader>
                                <CardTitle className="text-blue-700">Daily Winner</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-4xl font-bold text-slate-900 mb-2">XP Badge</div>
                                <p className="text-slate-600 mb-4">Top the daily leaderboard.</p>
                                <ul className="space-y-2 text-sm text-slate-700">
                                    <li className="flex gap-2"><Star className="w-4 h-4 text-blue-500" /> "Daily Champion" Profile Badge</li>
                                    <li className="flex gap-2"><Star className="w-4 h-4 text-blue-500" /> 500 Bonus XP</li>
                                    <li className="flex gap-2"><Star className="w-4 h-4 text-blue-500" /> Feature on Homepage</li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card className="border-amber-100 bg-gradient-to-br from-amber-50 to-orange-50 shadow-md transform md:-translate-y-4">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Crown className="w-24 h-24 text-amber-600" />
                            </div>
                            <CardHeader>
                                <div className="inline-block px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold mb-2 w-fit">Most Popular</div>
                                <CardTitle className="text-amber-800 text-2xl">Monthly Grand Prize</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-4xl font-bold text-slate-900 mb-2">$50 Gift Card</div>
                                <p className="text-slate-600 mb-4">For the highest cumulative score.</p>
                                <ul className="space-y-3 text-sm text-slate-800 font-medium">
                                    <li className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-amber-600" /> Amazon or Christianbook.com Gift Card</li>
                                    <li className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-amber-600" /> "Bible Scholar" Digital Certificate</li>
                                    <li className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-amber-600" /> Exclusive Interview Article</li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card className="border-purple-100 bg-purple-50 shadow-sm">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <BookOpen className="w-24 h-24 text-purple-600" />
                            </div>
                            <CardHeader>
                                <CardTitle className="text-purple-700">Annual Champion</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-4xl font-bold text-slate-900 mb-2">Study Bible Package</div>
                                <p className="text-slate-600 mb-4">The ultimate 2025 winner.</p>
                                <ul className="space-y-2 text-sm text-slate-700">
                                    <li className="flex gap-2"><Star className="w-4 h-4 text-purple-500" /> Premium Leather Study Bible</li>
                                    <li className="flex gap-2"><Star className="w-4 h-4 text-purple-500" /> Full Commentary Set</li>
                                    <li className="flex gap-2"><Star className="w-4 h-4 text-purple-500" /> Hall of Fame Induction</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* Rules Section */}
                <section className="max-w-3xl mx-auto bg-white rounded-3xl p-8 border border-slate-200">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                        <AlertCircle className="w-6 h-6 text-slate-400" />
                        Official Competition Rules
                    </h2>
                    <div className="space-y-6 text-slate-600">
                        <p>
                            To ensure fairness in the <strong>online bible quiz competition</strong>, all participants must adhere to the following rules:
                        </p>
                        <ol className="list-decimal pl-5 space-y-3">
                            <li><strong>One Account Per Person:</strong> Multiple accounts to manipulate the leaderboard will result in disqualification.</li>
                            <li><strong>No External Help:</strong> During timed quizzes, looking up answers is prohibited. Test your true knowledge!</li>
                            <li><strong>Respectful Conduct:</strong> Any inappropriate usernames or comments in the community section will be banned.</li>
                            <li><strong>Prize Eligibility:</strong> Winners will be contacted via the email provided at registration. Failure to respond within 7 days may result in forfeiture.</li>
                        </ol>
                    </div>
                </section>

                <div className="mt-16 text-center">
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">Ready to win?</h3>
                    <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200" onClick={() => navigate('/todays-quiz')}>
                        Start Today's Quiz <Trophy className="ml-2 w-5 h-5" />
                    </Button>
                </div>

            </main>
        </div>
    );
};

export default RulesAndPrizes;
