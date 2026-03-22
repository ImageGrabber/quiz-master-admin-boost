import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Mail, MapPin, MessageSquare } from "lucide-react";

export default function Contact() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-urbanist">
            <Helmet>
                <title>Contact Us | Bible Quiz Competition</title>
                <meta name="description" content="Get in touch with the Bible Quiz Competition team for support, partnership inquiries, or general questions." />
            </Helmet>
            
            <Header />

            <main className="flex-1 container mx-auto px-4 py-16 max-w-4xl">
                <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
                        Contact & Support
                    </h1>
                    <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto">
                        Have a question about our leaderboards, live hosting features, or your account? We're here to help.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto text-left">
                        <div className="p-8 bg-blue-50 rounded-2xl border border-blue-100">
                            <Mail className="w-8 h-8 text-blue-600 mb-4" />
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Email Support</h3>
                            <p className="text-slate-600 mb-4">For general inquiries, account support, and technical issues:</p>
                            <a href="mailto:support@biblequizcompetition.com" className="text-blue-700 font-semibold hover:underline bg-white px-4 py-2 rounded-lg inline-block shadow-sm">
                                support@biblequizcompetition.com
                            </a>
                        </div>

                        <div className="p-8 bg-slate-50 rounded-2xl border border-slate-200">
                            <MessageSquare className="w-8 h-8 text-slate-600 mb-4" />
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Community Feedback</h3>
                            <p className="text-slate-600 mb-4">Find a bug in a question? Have a feature request? Let us know!</p>
                            <p className="text-slate-500 text-sm">Response time: Usually within 24-48 business hours.</p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
