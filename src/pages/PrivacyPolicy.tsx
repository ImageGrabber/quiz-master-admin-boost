import SEO from "@/components/SEO";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-urbanist">
            <SEO
                title="Privacy Policy | Bible Quiz Competition Data Protection"
                description="Read our privacy policy to understand how we collect, use, and protect your personal data at Bible Quiz Competition."
                keywords="privacy policy, data protection, user privacy, bible quiz security"
                author="Bible Quiz Competition"
                url="/privacy-policy"
                robots="noindex, follow"
            />
            <Header />
            <main className="flex-1 container mx-auto px-4 py-16 max-w-3xl">
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 prose prose-slate">
                    <h1>Privacy Policy</h1>
                    <p>Last updated: January 1, 2025</p>
                    <p>At Bible Quiz Competition, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal data when you use our web application.</p>
                    
                    <h2>1. Information We Collect</h2>
                    <p>We only collect the information necessary to provide our services:</p>
                    <ul>
                        <li><strong>Account Information:</strong> Name, email address, and username when you register.</li>
                        <li><strong>Usage Data:</strong> Quiz scores, completion times, and leaderboard standing.</li>
                        <li><strong>Cookies:</strong> Essential cookies required for authentication and session management.</li>
                    </ul>

                    <h2>2. How We Use Your Information</h2>
                    <p>We use your data strictly to operator the platform:</p>
                    <ul>
                        <li>To maintain your account and track quiz progress.</li>
                        <li>To display your username and score on public leaderboards (if opted in).</li>
                        <li>To contact you regarding competition prizes or account security.</li>
                    </ul>

                    <h2>3. Data Protection</h2>
                    <p>We do not sell your personal data to third parties. All authentication and database records are securely managed through industry-standard encryption protocols (via Supabase).</p>
                    
                    <p>For any privacy-related questions, please contact <a href="mailto:support@biblequizcompetition.com">support@biblequizcompetition.com</a>.</p>
                </div>
            </main>
            <Footer />
        </div>
    );
}
