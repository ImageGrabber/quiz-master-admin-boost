import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, CheckCircle, Brain, Menu, ArrowRight, Shield, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });
      if (error) throw error;
      setIsSuccess(true);
    } catch (error: any) {
      setIsSuccess(false);
      alert(error.message || "Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <>
        <div className="min-h-screen bg-white">
          {/* Header */}
          <header className="relative flex items-center justify-between p-6 w-full px-6 md:px-8 lg:px-12">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate("/")}>
                <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                  <Brain className="w-3 h-3 text-white" />
                </div>
                <span className="text-lg font-urbanist font-semibold text-gray-900">Bible Quiz Competition</span>
              </div>
              <nav className="hidden md:flex items-center space-x-6">
                <button onClick={() => navigate("/bible-questions-and-answers-hub")} className="text-gray-600 hover:text-gray-900 font-urbanist font-light">Bible Q&A</button>
                <button onClick={() => navigate("/articles")} className="text-gray-600 hover:text-gray-900 font-urbanist font-light">Articles</button>
                <button onClick={() => navigate("/help")} className="text-gray-600 hover:text-gray-900 font-urbanist font-light">Help</button>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                className="bg-black hover:bg-gray-800 font-urbanist font-light"
                onClick={() => navigate("/auth/login")}
              >
                Sign In
              </Button>
              <button className="md:hidden" onClick={() => setMobileMenuOpen((open) => !open)}>
                <Menu className="w-6 h-6" />
              </button>
            </div>
            {/* Mobile dropdown menu */}
            {mobileMenuOpen && (
              <div className="md:hidden absolute top-full left-6 right-6 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50 flex flex-col">
                <button className="text-gray-600 hover:text-gray-900 px-4 py-3 text-left font-urbanist font-light" onClick={() => { setMobileMenuOpen(false); navigate("/bible-questions-and-answers-hub"); }}>Bible Q&A Hub</button>
                <button className="text-gray-600 hover:text-gray-900 px-4 py-3 text-left font-urbanist font-light" onClick={() => { setMobileMenuOpen(false); navigate("/articles"); }}>Articles</button>
                <button className="text-gray-600 hover:text-gray-900 px-4 py-3 text-left font-urbanist font-light" onClick={() => { setMobileMenuOpen(false); navigate("/help"); }}>Help</button>
                <button className="text-gray-600 hover:text-gray-900 px-4 py-3 text-left font-urbanist font-light border-t border-gray-200" onClick={() => { setMobileMenuOpen(false); navigate("/auth/login"); }}>Sign In</button>
              </div>
            )}
          </header>

          {/* Success State */}
          <main className="flex flex-col md:flex-row items-center justify-center px-6 py-12 md:py-16 min-h-[calc(100vh-100px)] max-w-7xl mx-auto">
            <div className="w-full max-w-md text-center">
              <div className="mb-6 flex justify-center">
                <CheckCircle className="w-16 h-16 text-gray-900" strokeWidth={1} />
              </div>
              <h2 className="text-3xl font-urbanist font-semibold text-gray-900 mb-4">Check Your Email</h2>
              <p className="text-lg font-urbanist font-light text-gray-600 mb-2">
                We've sent a password reset link to
              </p>
              <p className="text-lg font-urbanist font-medium text-gray-900 mb-6">{email}</p>
              <p className="text-sm font-urbanist font-light text-gray-600 mb-8">
                Didn't receive the email? Check your spam folder or{' '}
                <button 
                  onClick={() => setIsSuccess(false)} 
                  className="text-gray-900 hover:text-gray-700 hover:underline font-urbanist font-medium"
                >
                  try again
                </button>
              </p>
              <Button 
                className="w-full h-14 bg-black hover:bg-gray-800 text-white font-urbanist font-light rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg hover:shadow-xl"
                onClick={() => navigate('/auth/login')}
              >
                <span>Back to Login</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={1} />
              </Button>
            </div>
          </main>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="relative flex items-center justify-between p-6 w-full px-6 md:px-8 lg:px-12">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate("/")}>
              <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                <Brain className="w-3 h-3 text-white" />
              </div>
              <span className="text-lg font-urbanist font-semibold text-gray-900">Bible Quiz Competition</span>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <button onClick={() => navigate("/bible-questions-and-answers-hub")} className="text-gray-600 hover:text-gray-900 font-urbanist font-light">Bible Q&A</button>
              <button onClick={() => navigate("/articles")} className="text-gray-600 hover:text-gray-900 font-urbanist font-light">Articles</button>
              <button onClick={() => navigate("/help")} className="text-gray-600 hover:text-gray-900 font-urbanist font-light">Help</button>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Button 
              className="bg-black hover:bg-gray-800 font-urbanist font-light"
              onClick={() => navigate("/auth/login")}
            >
              Sign In
            </Button>
            <button className="md:hidden" onClick={() => setMobileMenuOpen((open) => !open)}>
              <Menu className="w-6 h-6" />
            </button>
          </div>
          {/* Mobile dropdown menu */}
          {mobileMenuOpen && (
            <div className="md:hidden absolute top-full left-6 right-6 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50 flex flex-col">
              <button className="text-gray-600 hover:text-gray-900 px-4 py-3 text-left font-urbanist font-light" onClick={() => { setMobileMenuOpen(false); navigate("/bible-questions-and-answers-hub"); }}>Bible Q&A Hub</button>
              <button className="text-gray-600 hover:text-gray-900 px-4 py-3 text-left font-urbanist font-light" onClick={() => { setMobileMenuOpen(false); navigate("/articles"); }}>Articles</button>
              <button className="text-gray-600 hover:text-gray-900 px-4 py-3 text-left font-urbanist font-light" onClick={() => { setMobileMenuOpen(false); navigate("/help"); }}>Help</button>
              <button className="text-gray-600 hover:text-gray-900 px-4 py-3 text-left font-urbanist font-light border-t border-gray-200" onClick={() => { setMobileMenuOpen(false); navigate("/auth/login"); }}>Sign In</button>
            </div>
          )}
        </header>

        {/* Forgot Password Form */}
        <main className="flex flex-col md:flex-row items-center justify-center px-6 py-12 md:py-16 min-h-[calc(100vh-100px)] max-w-7xl mx-auto">
          {/* Left Side - Heading and Benefits */}
          <div className="w-full md:w-1/2 max-w-lg mb-12 md:mb-0 md:pr-16 lg:pr-20">
            <div className="mb-10">
              <div className="mb-6">
                <h1 className="text-4xl md:text-5xl font-urbanist font-semibold text-gray-900 whitespace-nowrap">Reset your password</h1>
              </div>
              <p className="text-xl font-urbanist font-light text-gray-600 leading-relaxed">Enter your email address and we'll send you a link to reset your password.</p>
            </div>

            {/* Benefits Cards */}
            <div className="space-y-4">
              <div className="bg-white border border-gray-200 rounded-lg p-4 hover:border-gray-400 transition-colors duration-300 group">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                    <Shield className="w-5 h-5 text-gray-700" strokeWidth={1} />
                  </div>
                  <div>
                    <h3 className="font-urbanist font-medium text-gray-900 mb-1">Secure Reset Process</h3>
                    <p className="text-sm font-urbanist font-light text-gray-600">Your password reset link is encrypted and secure</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-4 hover:border-gray-400 transition-colors duration-300 group">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                    <Lock className="w-5 h-5 text-gray-700" strokeWidth={1} />
                  </div>
                  <div>
                    <h3 className="font-urbanist font-medium text-gray-900 mb-1">Quick Access</h3>
                    <p className="text-sm font-urbanist font-light text-gray-600">Get back to your account in just a few clicks</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Forgot Password Form */}
          <div className="w-full md:w-1/2 max-w-md">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="email" className="font-urbanist font-medium text-gray-900 text-sm mb-2 block">
                  Email Address<span className="text-gray-500 ml-1">*</span>
                </Label>
                <div className="relative mt-2 group">
                  <Mail className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${focusedField === 'email' ? 'text-gray-900' : 'text-gray-400'}`} strokeWidth={1} />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    className={`pl-12 h-14 border-gray-300 focus:border-gray-900 focus:ring-2 focus:ring-gray-900 rounded-lg font-urbanist font-light transition-all duration-200 ${
                      focusedField === 'email' ? 'border-gray-900' : ''
                    }`}
                    required
                  />
                </div>
              </div>
              
              <Button
                type="submit"
                className="w-full h-14 bg-black hover:bg-gray-800 text-white font-urbanist font-light rounded-lg transition-all duration-300 mt-8 flex items-center justify-center gap-2 group shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading || !email}
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending reset link...</span>
                  </>
                ) : (
                  <>
                    <span>Send Reset Link</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={1} />
                  </>
                )}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="font-urbanist font-light text-gray-600">
                Remember your password?{' '}
                <Link to="/auth/login" className="text-gray-900 hover:text-gray-700 hover:underline font-urbanist font-medium">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ForgotPassword;