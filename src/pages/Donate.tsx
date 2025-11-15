import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Heart, Coffee, Sparkles, ArrowRight } from 'lucide-react';

const Donate = () => {
  useEffect(() => {
    // Load Buy Me a Coffee widget script
    const script = document.createElement('script');
    script.src = 'https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js';
    script.setAttribute('data-name', 'BMC-Widget');
    script.setAttribute('data-cfasync', 'false');
    script.setAttribute('data-id', 'steviemathew');
    script.setAttribute('data-description', 'Support me on Buy me a coffee!');
    script.setAttribute('data-message', 'Thank you for visiting. If you would like to support my work, you can buy me a coffee below!');
    script.setAttribute('data-color', '#FFDD00');
    script.setAttribute('data-position', 'Right');
    script.setAttribute('data-x_margin', '18');
    script.setAttribute('data-y_margin', '18');
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Clean up script when component unmounts
      const existingScript = document.querySelector('script[src*="buymeacoffee.com"]');
      if (existingScript) {
        existingScript.remove();
      }
      // Remove widget if it exists
      const widget = document.querySelector('#bmc-wbtn');
      if (widget) {
        widget.remove();
      }
    };
  }, []);

  const handleDonateClick = () => {
    window.open('https://buymeacoffee.com/steviemathew', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Support & Donate | Bible Quiz Competition</title>
        <meta name="description" content="Support Bible Quiz Competition and help us continue providing free Bible study resources and quizzes." />
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
              — Support Our Mission —
            </p>
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-4 rounded-full">
                <Coffee className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-urbanist font-medium text-gray-700 mb-3 md:mb-4 leading-tight">
              Support Our Mission
            </h1>
            <p className="text-lg md:text-xl font-urbanist font-light text-gray-500 mb-0 md:mb-1 max-w-xl mx-auto leading-relaxed">
              Help us continue providing free Bible study resources, quizzes, and educational content to thousands of users worldwide.
            </p>
          </div>

          {/* Main Donate Card */}
          <div className="bg-white rounded-lg p-5 md:p-8 border border-gray-200 hover:shadow-md transition-all duration-300 -mb-8">
            <div className="text-center space-y-6">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Heart className="w-8 h-8 text-red-500" />
                <h2 className="text-2xl md:text-3xl font-urbanist font-semibold text-gray-900">Buy Me a Coffee</h2>
                <Heart className="w-8 h-8 text-red-500" />
              </div>
              <p className="text-base md:text-lg font-urbanist font-light text-gray-600 leading-relaxed max-w-2xl mx-auto">
                Your support helps us maintain and improve Bible Quiz Competition, 
                add new features, keep server costs covered, make it ad-free, and keep all content free for everyone.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-6">
                <div className="bg-blue-50 rounded-lg p-4 border border-gray-200">
                  <Sparkles className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm md:text-base font-urbanist font-semibold text-gray-900">New Features</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 border border-gray-200">
                  <Coffee className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <p className="text-sm md:text-base font-urbanist font-semibold text-gray-900">Server Costs & Ad-Free</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 border border-gray-200">
                  <Heart className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                  <p className="text-sm md:text-base font-urbanist font-semibold text-gray-900">Free Content</p>
                </div>
              </div>
              <Button
                onClick={handleDonateClick}
                className="px-6 md:px-8 py-4 md:py-6 text-lg md:text-xl font-urbanist font-light text-white shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600"
              >
                <Coffee className="w-5 h-5 mr-2" />
                Support on Buy Me a Coffee
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Support Section */}
      <section className="relative pt-4 pb-12 md:pt-4 md:pb-20 bg-white overflow-hidden">
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
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {/* What Your Support Means */}
            <div className="bg-white rounded-lg p-5 border border-gray-200 hover:shadow-md transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-urbanist font-semibold text-gray-900 mb-2">What Your Support Means</h3>
                  <p className="text-base md:text-lg font-urbanist font-light text-gray-600 leading-relaxed mb-3">
                    Every contribution, no matter the size, helps us:
                  </p>
                  <ul className="space-y-2 text-base md:text-lg font-urbanist font-light text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>Keep the platform free for all users</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>Add new Bible study resources</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>Improve quiz features and functionality</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-1">✓</span>
                      <span>Keep server costs covered and maintain an ad-free experience</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Other Ways to Help */}
            <div className="bg-white rounded-lg p-5 border border-gray-200 hover:shadow-md transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-urbanist font-semibold text-gray-900 mb-2">Other Ways to Help</h3>
                  <p className="text-base md:text-lg font-urbanist font-light text-gray-600 leading-relaxed mb-3">
                    Not able to donate? You can still help:
                  </p>
                  <ul className="space-y-2 text-base md:text-lg font-urbanist font-light text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>Share Bible Quiz Competition with friends</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>Leave a positive review or feedback</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>Participate in quizzes and competitions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>Pray for our mission and community</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Thank You Message */}
      <section className="relative -mt-8 pb-12 md:-mt-8 md:pb-20 bg-white overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, black 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 md:p-8 border border-blue-200 text-center">
            <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl md:text-2xl font-urbanist font-semibold text-gray-900 mb-2">
              Thank You for Your Support!
            </h3>
            <p className="text-base md:text-lg font-urbanist font-light text-gray-600 leading-relaxed max-w-xl mx-auto">
              Your generosity helps us continue spreading God's word through interactive learning and community engagement.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Donate;
