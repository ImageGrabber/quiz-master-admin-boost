import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, ArrowLeft, Menu, Globe, Send, CheckCircle, AlertCircle, Clock } from "lucide-react";
import { Helmet } from 'react-helmet';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface PrayerRequest {
  id: string;
  name: string;
  email: string;
  request: string;
  category: string;
  isAnonymous: boolean;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

const categories = [
  { value: 'healing', label: 'Healing & Health' },
  { value: 'family', label: 'Family & Relationships' },
  { value: 'work', label: 'Work & Career' },
  { value: 'spiritual', label: 'Spiritual Growth' },
  { value: 'financial', label: 'Financial Needs' },
  { value: 'guidance', label: 'Guidance & Direction' },
  { value: 'protection', label: 'Protection & Safety' },
  { value: 'other', label: 'Other' }
];

export default function PrayerRequests() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState<'english' | 'hindi'>('english');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    request: '',
    category: '',
    isAnonymous: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuOpen && !(event.target as Element).closest('header')) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [mobileMenuOpen]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Submit prayer request to Supabase
      const { data, error } = await supabase
        .from('prayer_requests')
        .insert([
          {
            name: formData.name || null,
            email: formData.email || null,
            request: formData.request,
            category: formData.category,
            is_anonymous: formData.isAnonymous,
            status: 'approved'
          }
        ])
        .select();

      if (error) {
        throw error;
      }
      
      setSubmitted(true);
      toast({
        title: language === 'hindi' ? 'प्रार्थना अनुरोध सफलतापूर्वक भेजा गया' : 'Prayer Request Submitted',
        description: language === 'hindi' 
          ? 'आपका प्रार्थना अनुरोध सफलतापूर्वक भेजा गया है। हम आपके लिए प्रार्थना करेंगे।'
          : 'Your prayer request has been submitted successfully. We will pray for you.',
      });
    } catch (error) {
      console.error('Error submitting prayer request:', error);
      toast({
        title: language === 'hindi' ? 'त्रुटि' : 'Error',
        description: language === 'hindi' 
          ? 'प्रार्थना अनुरोध भेजने में त्रुटि हुई। कृपया पुनः प्रयास करें।'
          : 'There was an error submitting your prayer request. Please try again.',
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      request: '',
      category: '',
      isAnonymous: false
    });
    setSubmitted(false);
  };

  return (
    <>
      <Helmet>
        <title>{language === 'hindi' ? 'प्रार्थना अनुरोध' : 'Prayer Requests'} | Bible Quiz Competition</title>
        <meta name="description" content={language === 'hindi' 
          ? 'अपने प्रार्थना अनुरोध साझा करें और हमारे समुदाय के साथ प्रार्थना में शामिल हों।'
          : 'Share your prayer requests and join our community in prayer.'} />
        <meta name="keywords" content={language === 'hindi' 
          ? "प्रार्थना अनुरोध, प्रार्थना, ईसाई समुदाय, आध्यात्मिक सहायता"
          : "prayer requests, prayer, christian community, spiritual support"} />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-white">
        {/* Navbar */}
        <header className="bg-white/70 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-3 sm:py-4 flex flex-row justify-between items-center relative">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate("/")}> 
              <img src="/sword.png" alt="Bible Quiz Competition Logo" className="w-6 h-6 sm:w-7 sm:h-7 mr-2 inline-block align-middle" />
              <span className="text-base sm:text-lg font-semibold text-gray-900">Bible Quiz Competition</span>
            </div>
            {/* Hamburger for mobile */}
            <button
              className="md:hidden p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 transition-colors"
              aria-label="Open navigation menu"
              onClick={() => setMobileMenuOpen((open) => !open)}
            >
              <Menu className="w-6 h-6 sm:w-7 sm:h-7 text-gray-900" />
            </button>
            {/* Nav links for desktop */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 xl:space-x-3">
              <button className="text-black font-semibold px-2 md:px-3 lg:px-4 py-2 bg-transparent border-none shadow-none hover:underline transition-all duration-200 text-sm lg:text-base" onClick={() => navigate("/bible-questions-and-answers-hub")}>
                <span className="hidden lg:inline">Bible Q&A Hub</span>
                <span className="lg:hidden">Q&A Hub</span>
              </button>
              <button className="text-black font-semibold px-2 md:px-3 lg:px-4 py-2 bg-transparent border-none shadow-none hover:underline transition-all duration-200 text-sm lg:text-base" onClick={() => navigate("/articles")}>Articles</button>
              <button className="text-black font-semibold px-2 md:px-3 lg:px-4 py-2 bg-transparent border-none shadow-none hover:underline transition-all duration-200 text-sm lg:text-base" onClick={() => navigate("/host-live-bible-quizzes-with-confidence")}>
                <span className="hidden lg:inline">Hosting Guide</span>
                <span className="lg:hidden">Hosting</span>
              </button>
              <button className="text-black font-semibold px-2 md:px-3 lg:px-4 py-2 bg-transparent border-none shadow-none hover:underline transition-all duration-200 text-sm lg:text-base" onClick={() => navigate("/auth/login")}>Sign In</button>
              <Button variant="ghost" className="bg-black text-white font-semibold px-2 md:px-3 lg:px-4 py-2 rounded hover:bg-gray-800 transition-all duration-200 text-sm lg:text-base" onClick={() => navigate("/auth/register")}>Sign Up</Button>
            </nav>
            {/* Mobile dropdown menu */}
            {mobileMenuOpen && (
              <div className="md:hidden absolute top-full left-0 right-0 mt-2 mx-4 bg-white rounded-xl shadow-xl border border-blue-100 z-50 flex flex-col items-stretch overflow-hidden animate-in slide-in-from-top-2 duration-200">
                <button className="text-black font-semibold px-4 py-4 text-left hover:bg-blue-50 active:bg-blue-100 transition-colors duration-200 border-b border-gray-100 touch-manipulation" onClick={() => { setMobileMenuOpen(false); navigate("/bible-questions-and-answers-hub"); }}>Bible Q&A Hub</button>
                <button className="text-black font-semibold px-4 py-4 text-left hover:bg-blue-50 active:bg-blue-100 transition-colors duration-200 border-b border-gray-100 touch-manipulation" onClick={() => { setMobileMenuOpen(false); navigate("/articles"); }}>Articles</button>
                <button className="text-black font-semibold px-4 py-4 text-left hover:bg-blue-50 active:bg-blue-100 transition-colors duration-200 border-b border-gray-100 touch-manipulation" onClick={() => { setMobileMenuOpen(false); navigate("/host-live-bible-quizzes-with-confidence"); }}>Hosting Guide</button>
                <button className="text-black font-semibold px-4 py-4 text-left hover:bg-blue-50 active:bg-blue-100 transition-colors duration-200 border-b border-gray-100 touch-manipulation" onClick={() => { setMobileMenuOpen(false); navigate("/auth/login"); }}>Sign In</button>
                <button className="bg-black text-white font-semibold px-4 py-4 text-left hover:bg-gray-900 active:bg-gray-800 transition-colors duration-200 touch-manipulation" onClick={() => { setMobileMenuOpen(false); navigate("/auth/register"); }}>Sign Up</button>
              </div>
            )}
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {/* Back Button */}
          <div className="mb-6">
            <Button 
              variant="ghost" 
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Button>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Heart className="w-8 h-8 text-red-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-900">
                {language === 'hindi' ? 'प्रार्थना अनुरोध' : 'Prayer Requests'}
              </h1>
            </div>
            <div className="flex items-center justify-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setLanguage(language === 'english' ? 'hindi' : 'english')}
                className="flex items-center space-x-1"
              >
                <Globe className="w-4 h-4" />
                <span>{language === 'english' ? 'हिंदी' : 'English'}</span>
              </Button>
            </div>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              {language === 'hindi' 
                ? 'अपने प्रार्थना अनुरोध साझा करें और हमारे समुदाय के साथ प्रार्थना में शामिल हों। हम आपके लिए प्रार्थना करेंगे।'
                : 'Share your prayer requests and join our community in prayer. We will pray for you.'}
            </p>
          </div>

          {!submitted ? (
            /* Prayer Request Form */
            <Card className="shadow-xl border-0 max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="w-5 h-5 mr-2 text-red-600" />
                  {language === 'hindi' ? 'प्रार्थना अनुरोध सबमिट करें' : 'Submit Prayer Request'}
                </CardTitle>
                <CardDescription>
                  {language === 'hindi' 
                    ? 'अपना प्रार्थना अनुरोध साझा करें। सभी अनुरोध गोपनीय रखे जाते हैं।'
                    : 'Share your prayer request. All requests are kept confidential.'}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      {language === 'hindi' ? 'नाम (वैकल्पिक)' : 'Name (Optional)'}
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder={language === 'hindi' ? 'आपका नाम' : 'Your name'}
                      className="w-full"
                    />
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      {language === 'hindi' ? 'ईमेल (वैकल्पिक)' : 'Email (Optional)'}
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder={language === 'hindi' ? 'आपका ईमेल' : 'Your email'}
                      className="w-full"
                    />
                  </div>

                  {/* Category Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="category">
                      {language === 'hindi' ? 'श्रेणी' : 'Category'}
                    </Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder={language === 'hindi' ? 'श्रेणी चुनें' : 'Select a category'} />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Prayer Request */}
                  <div className="space-y-2">
                    <Label htmlFor="request">
                      {language === 'hindi' ? 'प्रार्थना अनुरोध' : 'Prayer Request'} *
                    </Label>
                    <Textarea
                      id="request"
                      value={formData.request}
                      onChange={(e) => handleInputChange('request', e.target.value)}
                      placeholder={language === 'hindi' 
                        ? 'अपना प्रार्थना अनुरोध यहाँ लिखें...'
                        : 'Please share your prayer request here...'}
                      className="w-full min-h-[120px]"
                      required
                    />
                  </div>

                  {/* Anonymous Option */}
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="anonymous"
                      checked={formData.isAnonymous}
                      onChange={(e) => handleInputChange('isAnonymous', e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    <Label htmlFor="anonymous" className="text-sm">
                      {language === 'hindi' ? 'गुमनाम रूप से सबमिट करें' : 'Submit anonymously'}
                    </Label>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting || !formData.request.trim()}
                    className="w-full bg-red-600 hover:bg-red-700"
                  >
                    {isSubmitting ? (
                      <>
                        <Clock className="w-4 h-4 mr-2 animate-spin" />
                        {language === 'hindi' ? 'सबमिट हो रहा है...' : 'Submitting...'}
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        {language === 'hindi' ? 'प्रार्थना अनुरोध सबमिट करें' : 'Submit Prayer Request'}
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          ) : (
            /* Success Message */
            <Card className="shadow-xl border-0 max-w-2xl mx-auto">
              <CardContent className="text-center py-12">
                <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {language === 'hindi' ? 'धन्यवाद!' : 'Thank You!'}
                </h2>
                <p className="text-gray-600 mb-6">
                  {language === 'hindi' 
                    ? 'आपका प्रार्थना अनुरोध सफलतापूर्वक सबमिट हो गया है। हम आपके लिए प्रार्थना करेंगे।'
                    : 'Your prayer request has been submitted successfully. We will pray for you.'}
                </p>
                <div className="space-y-3">
                  <Button onClick={resetForm} className="w-full">
                    {language === 'hindi' ? 'एक और अनुरोध सबमिट करें' : 'Submit Another Request'}
                  </Button>
                  <Button variant="outline" onClick={() => navigate('/daily-verse')} className="w-full">
                    {language === 'hindi' ? 'दैनिक पद देखें' : 'View Daily Verse'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Prayer Guidelines */}
          <Card className="shadow-lg border-0 mt-8 max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="w-5 h-5 mr-2 text-red-600" />
                {language === 'hindi' ? 'प्रार्थना दिशानिर्देश' : 'Prayer Guidelines'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {language === 'hindi' ? 'हमारे लिए प्रार्थना करें:' : 'Pray for us:'}
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">•</span>
                      {language === 'hindi' ? 'स्वास्थ्य और चंगाई' : 'Health and healing'}
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">•</span>
                      {language === 'hindi' ? 'पारिवारिक रिश्ते' : 'Family relationships'}
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">•</span>
                      {language === 'hindi' ? 'काम और करियर' : 'Work and career'}
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-600 mr-2">•</span>
                      {language === 'hindi' ? 'आध्यात्मिक विकास' : 'Spiritual growth'}
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {language === 'hindi' ? 'गोपनीयता' : 'Confidentiality'}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {language === 'hindi' 
                      ? 'सभी प्रार्थना अनुरोध गोपनीय रखे जाते हैं। आपका व्यक्तिगत विवरण साझा नहीं किया जाएगा।'
                      : 'All prayer requests are kept confidential. Your personal details will not be shared.'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </>
  );
}
