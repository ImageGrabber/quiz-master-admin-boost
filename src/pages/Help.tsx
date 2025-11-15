import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  Mail, 
  Clock, 
  HelpCircle,
  BookOpen,
  Users,
  Zap
} from 'lucide-react';

const Help = () => {
  useEffect(() => {
    // Load Tidio chat script only on this page
    const script = document.createElement('script');
    script.src = '//code.tidio.co/enkm7pw3z2k1zidnow6e2wj9fdt7jwo2.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Clean up script when component unmounts
      const existingScript = document.querySelector('script[src*="tidio.co"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Help & Support | Bible Quiz Competition</title>
        <meta name="description" content="Get help with Bible Quiz Competition. Find answers to common questions, contact support, and chat with our team." />
      </Helmet>

      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 bg-white overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, black 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        {/* Decorative accent lines */}
        <div className="absolute top-0 left-1/4 w-24 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-50"></div>
        <div className="absolute top-0 right-1/4 w-24 h-px bg-gradient-to-l from-transparent via-gray-300 to-transparent opacity-50"></div>
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-base md:text-lg font-urbanist font-light text-purple-600 uppercase tracking-wider mb-3">
              — Help & Support —
            </p>
            <h1 className="text-4xl md:text-6xl font-urbanist font-medium text-gray-700 mb-3 md:mb-4 leading-tight">
              Help & Support
            </h1>
            <p className="text-lg md:text-xl font-urbanist font-light text-gray-500 mb-0 md:mb-1 max-w-xl mx-auto leading-relaxed">
              We're here to help you get the most out of Bible Quiz Competition
            </p>
          </div>

          {/* Quick Help and Contact Cards */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {/* Quick Help */}
            <div className="bg-white rounded-lg p-5 border border-gray-200 hover:shadow-md transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <HelpCircle className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-urbanist font-semibold text-gray-900 mb-2">Quick Help</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <BookOpen className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="text-base md:text-lg font-urbanist font-semibold text-gray-900">How to Create a Quiz</h4>
                        <p className="text-sm md:text-base font-urbanist font-light text-gray-600">Learn how to create your first live quiz session</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Users className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="text-base md:text-lg font-urbanist font-semibold text-gray-900">Joining Live Quizzes</h4>
                        <p className="text-sm md:text-base font-urbanist font-light text-gray-600">How to participate in live quiz sessions</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Zap className="w-4 h-4 text-purple-600 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="text-base md:text-lg font-urbanist font-semibold text-gray-900">Real-time Features</h4>
                        <p className="text-sm md:text-base font-urbanist font-light text-gray-600">Understanding live quiz functionality</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Options */}
            <div className="bg-white rounded-lg p-5 border border-gray-200 hover:shadow-md transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-urbanist font-semibold text-gray-900 mb-2">Get in Touch</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-gray-200">
                      <MessageCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <div>
                        <h4 className="text-base md:text-lg font-urbanist font-semibold text-gray-900">Live Chat</h4>
                        <p className="text-sm md:text-base font-urbanist font-light text-gray-600">Chat with our support team instantly</p>
                        <Badge variant="secondary" className="mt-1 font-urbanist font-light">Available Now</Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-gray-200">
                      <Mail className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      <div>
                        <h4 className="text-base md:text-lg font-urbanist font-semibold text-gray-900">Email Support</h4>
                        <p className="text-sm md:text-base font-urbanist font-light text-gray-600">info@biblequizcompetition.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg border border-gray-200">
                      <Clock className="w-5 h-5 text-purple-600 flex-shrink-0" />
                      <div>
                        <h4 className="text-base md:text-lg font-urbanist font-semibold text-gray-900">Response Time</h4>
                        <p className="text-sm md:text-base font-urbanist font-light text-gray-600">Usually within 24 hours</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-12 md:py-20 bg-white overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, black 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        {/* Decorative accent lines */}
        <div className="absolute top-0 left-1/4 w-24 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-50"></div>
        <div className="absolute top-0 right-1/4 w-24 h-px bg-gradient-to-l from-transparent via-gray-300 to-transparent opacity-50"></div>
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="bg-white rounded-lg p-5 md:p-8 border border-gray-200 hover:shadow-md transition-all duration-300 mb-8">
            <h2 className="text-2xl md:text-3xl font-urbanist font-semibold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h4 className="text-lg md:text-xl font-urbanist font-semibold text-gray-900 mb-2">How do I create a live quiz?</h4>
                <p className="text-base md:text-lg font-urbanist font-light text-gray-600 leading-relaxed">Go to "Create Quiz" in your dashboard, add questions, and start a live session. Share the session code with participants.</p>
              </div>
              <div>
                <h4 className="text-lg md:text-xl font-urbanist font-semibold text-gray-900 mb-2">Can I join a quiz without an account?</h4>
                <p className="text-base md:text-lg font-urbanist font-light text-gray-600 leading-relaxed">Yes! When creating a quiz, you can choose to allow anonymous participation. Participants only need to enter a display name.</p>
              </div>
              <div>
                <h4 className="text-lg md:text-xl font-urbanist font-semibold text-gray-900 mb-2">How do I see quiz results?</h4>
                <p className="text-base md:text-lg font-urbanist font-light text-gray-600 leading-relaxed">Results are automatically calculated and displayed when you finish a quiz. You'll see the top 3 participants with their scores.</p>
              </div>
              <div>
                <h4 className="text-lg md:text-xl font-urbanist font-semibold text-gray-900 mb-2">Is there a limit on participants?</h4>
                <p className="text-base md:text-lg font-urbanist font-light text-gray-600 leading-relaxed">Each live quiz session can accommodate up to 50 participants by default.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chat Widget Notice */}
      <section className="relative pt-0 pb-12 md:pt-0 md:pb-20 bg-white overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, black 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 md:p-8 border border-blue-200 text-center">
            <MessageCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl md:text-2xl font-urbanist font-semibold text-gray-900 mb-2">
              Need Immediate Help?
            </h3>
            <p className="text-base md:text-lg font-urbanist font-light text-gray-600 leading-relaxed max-w-xl mx-auto mb-4">
              Use the chat widget in the bottom right corner to get instant support from our team.
            </p>
            <Badge variant="outline" className="bg-white font-urbanist font-light">
              Chat Available 24/7
            </Badge>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Help;
