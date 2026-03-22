import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function TermsOfService() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-urbanist">
            <Helmet>
                <title>Terms of Service | Bible Quiz Competition</title>
                <meta name="robots" content="noindex, follow" />
            </Helmet>
            <Header />
            <main className="flex-1 container mx-auto px-4 py-16 max-w-3xl">
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 prose prose-slate">
                    <h1>Terms of Service</h1>
                    <p>Last updated: January 1, 2025</p>
                    <p>By using Bible Quiz Competition ("the Platform"), you agree to the following terms.</p>
                    
                    <h2>1. Fair Play & Integrity</h2>
                    <p>The core of our platform relies on honesty:</p>
                    <ul>
                        <li>Users must not use automated scripts, multiple accounts, or external study aids during timed competitive quizzes.</li>
                        <li>Violations of fair play will result in account suspension and disqualification from any prizes or leaderboards.</li>
                    </ul>

                    <h2>2. Account Responsibility</h2>
                    <p>You are responsible for maintaining the confidentiality of your login credentials. We reserve the right to ban accounts displaying inappropriate usernames or participating in abusive behavior in any community features.</p>

                    <h2>3. Prizes and Competitions</h2>
                    <p>All prizes, rewards, and competition leaderboards are subject to verification. Bible Quiz Competition reserves the right to withhold prizes if foul play is detected, or to substitute advertised prizes with items of equal or greater value.</p>
                    
                    <p>For a detailed breakdown of competition rules, please review our <a href="/rules-and-prizes">Official Rules & Prizes</a> page.</p>
                </div>
            </main>
            <Footer />
        </div>
    );
}
