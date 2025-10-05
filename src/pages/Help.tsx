import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  Mail, 
  Phone, 
  Clock, 
  HelpCircle,
  BookOpen,
  Users,
  Zap
} from 'lucide-react';

const Help = () => {
  useEffect(() => {
    // Load Tidio chat script on this page
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-white">
      <Helmet>
        <title>Help & Support | Bible Quiz Competition</title>
        <meta name="description" content="Get help with Bible Quiz Competition. Find answers to common questions, contact support, and chat with our team." />
      </Helmet>

      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Help & Support
            </h1>
            <p className="text-xl text-gray-600">
              We're here to help you get the most out of Bible Quiz Competition
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Quick Help */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-blue-600" />
                  Quick Help
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <BookOpen className="w-4 h-4 text-green-600 mt-1" />
                    <div>
                      <h4 className="font-semibold">How to Create a Quiz</h4>
                      <p className="text-sm text-gray-600">Learn how to create your first live quiz session</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="w-4 h-4 text-blue-600 mt-1" />
                    <div>
                      <h4 className="font-semibold">Joining Live Quizzes</h4>
                      <p className="text-sm text-gray-600">How to participate in live quiz sessions</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Zap className="w-4 h-4 text-purple-600 mt-1" />
                    <div>
                      <h4 className="font-semibold">Real-time Features</h4>
                      <p className="text-sm text-gray-600">Understanding live quiz functionality</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Options */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-green-600" />
                  Get in Touch
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <MessageCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <h4 className="font-semibold">Live Chat</h4>
                      <p className="text-sm text-gray-600">Chat with our support team instantly</p>
                      <Badge variant="secondary" className="mt-1">Available Now</Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <Mail className="w-5 h-5 text-blue-600" />
                    <div>
                      <h4 className="font-semibold">Email Support</h4>
                      <p className="text-sm text-gray-600">support@biblequiz.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                    <Clock className="w-5 h-5 text-purple-600" />
                    <div>
                      <h4 className="font-semibold">Response Time</h4>
                      <p className="text-sm text-gray-600">Usually within 24 hours</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">How do I create a live quiz?</h4>
                  <p className="text-gray-600">Go to "Create Quiz" in your dashboard, add questions, and start a live session. Share the session code with participants.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Can I join a quiz without an account?</h4>
                  <p className="text-gray-600">Yes! When creating a quiz, you can choose to allow anonymous participation. Participants only need to enter a display name.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">How do I see quiz results?</h4>
                  <p className="text-gray-600">Results are automatically calculated and displayed when you finish a quiz. You'll see the top 3 participants with their scores.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Is there a limit on participants?</h4>
                  <p className="text-gray-600">Each live quiz session can accommodate up to 50 participants by default.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Chat Widget Notice */}
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardContent className="p-6 text-center">
              <MessageCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Need Immediate Help?
              </h3>
              <p className="text-gray-600 mb-4">
                Use the chat widget in the bottom right corner to get instant support from our team.
              </p>
              <Badge variant="outline" className="bg-white">
                Chat Available 24/7
              </Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Help;
