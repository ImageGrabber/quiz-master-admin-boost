import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, CheckCircle, XCircle, AlertTriangle, Brain, Menu, ArrowRight, Trophy, BookOpen, Heart, Droplet } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogType, setDialogType] = useState<'success' | 'error' | 'warning'>('error');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for auth errors in the URL hash (e.g. #error=access_denied&error_code=otp_expired&error_description=...)
    if (window.location.hash && window.location.hash.includes('error')) {
      const params = new URLSearchParams(window.location.hash.replace('#', ''));
      const errorCode = params.get('error_code');
      const errorDesc = params.get('error_description');
      if (errorCode === 'otp_expired' || errorCode === 'access_denied') {
        setDialogType('error');
        setDialogTitle('Email Link Invalid or Expired');
        setDialogMessage(
          errorDesc?.replace(/\+/g, ' ') ||
          'The email link you used is invalid or has expired. Please request a new verification or password reset email.'
        );
        setDialogOpen(true);
        // Clear the hash so it doesn't show again
        window.location.hash = '';
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      if (data.user) {
        setIsSuccess(true);
        // Fetch the user's profile to check their role
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .single();
        
        // Show success preloader for 2 seconds
        setTimeout(() => {
          setIsSuccess(false);
          if (profile?.role === 'admin') {
            navigate("/admin");
          } else {
            navigate("/dashboard");
          }
        }, 2000);
      }
    } catch (error: any) {
      setDialogType('error');
      setDialogTitle("Login failed");
      setDialogMessage(error.message || "Please check your credentials and try again.");
      setDialogOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

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
              onClick={() => navigate("/auth/register")}
            >
              Sign Up
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
              <button className="text-gray-600 hover:text-gray-900 px-4 py-3 text-left font-urbanist font-light border-t border-gray-200" onClick={() => { setMobileMenuOpen(false); navigate("/auth/register"); }}>Sign Up</button>
            </div>
          )}
        </header>

        {/* Login Form */}
        <main className="relative py-12 md:py-20 bg-white overflow-hidden">
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
          
          <div className="max-w-4xl mx-auto px-6 relative z-10">
            {/* Header */}
            <div className="text-center mb-8">
              <p className="text-sm font-urbanist font-light text-purple-600 uppercase tracking-wider mb-3">
                — Welcome Back —
              </p>
              <h1 className="text-3xl md:text-5xl font-urbanist font-medium text-gray-700 mb-3 md:mb-4 leading-tight">
                Sign In to Your Account
              </h1>
              <p className="text-base md:text-base font-urbanist font-light text-gray-500 mb-0 md:mb-1 max-w-xl mx-auto leading-relaxed">
                Access quizzes, track your progress, and continue your wellness journey
              </p>
            </div>

            {/* Main Content Card */}
            <div className="w-full max-w-4xl mx-auto mb-6 md:mb-8 relative z-10">
              <div className="bg-white rounded-lg p-6 md:p-8 shadow-lg border border-gray-200">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  {/* Left Side - Benefits */}
                  <div className="space-y-4 order-2 md:order-1">
                    <div className="bg-white rounded-lg p-5 border border-gray-200 hover:shadow-md transition-all duration-300">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                          <Trophy className="w-5 h-5 text-gray-700" strokeWidth={1} />
                        </div>
                        <div>
                          <h3 className="text-base font-urbanist font-semibold text-gray-900 mb-2">Track Your Progress</h3>
                          <p className="text-sm font-urbanist font-light text-gray-600 leading-relaxed">View your quiz history and see how you rank</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg p-5 border border-gray-200 hover:shadow-md transition-all duration-300">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <BookOpen className="w-5 h-5 text-gray-700" strokeWidth={1} />
                        </div>
                        <div>
                          <h3 className="text-base font-urbanist font-semibold text-gray-900 mb-2">Continue Learning</h3>
                          <p className="text-sm font-urbanist font-light text-gray-600 leading-relaxed">Access Bible Q&A Hub and educational articles</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-5 border border-gray-200 hover:shadow-md transition-all duration-300">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                          <Heart className="w-5 h-5 text-gray-700" strokeWidth={1} />
                        </div>
                        <div>
                          <h3 className="text-base font-urbanist font-semibold text-gray-900 mb-2">Emotional Wellness</h3>
                          <p className="text-sm font-urbanist font-light text-gray-600 leading-relaxed">Track your mood, use CBT tools, and find peace through God's word</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-5 border border-gray-200 hover:shadow-md transition-all duration-300">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-cyan-100 flex items-center justify-center flex-shrink-0">
                          <Droplet className="w-5 h-5 text-gray-700" strokeWidth={1} />
                        </div>
                        <div>
                          <h3 className="text-base font-urbanist font-semibold text-gray-900 mb-2">Water Intake Tracking</h3>
                          <p className="text-sm font-urbanist font-light text-gray-600 leading-relaxed">Monitor your daily hydration and maintain optimal wellness</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Login Form */}
                  <div className="order-1 md:order-2 flex flex-col md:items-center">
            <form onSubmit={handleSubmit} className="space-y-6 w-full">
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
              
              <div>
                <Label htmlFor="password" className="font-urbanist font-medium text-gray-900 text-sm mb-2 block">
                  Password<span className="text-gray-500 ml-1">*</span>
                </Label>
                <div className="relative mt-2 group">
                  <Lock className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${focusedField === 'password' ? 'text-gray-900' : 'text-gray-400'}`} strokeWidth={1} />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                    className={`pl-12 h-14 border-gray-300 focus:border-gray-900 focus:ring-2 focus:ring-gray-900 rounded-lg font-urbanist font-light transition-all duration-200 ${
                      focusedField === 'password' ? 'border-gray-900' : ''
                    }`}
                    required
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm mt-2">
                <label className="flex items-center gap-2 select-none cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    className="accent-black rounded cursor-pointer"
                  />
                  <span className="font-urbanist font-light text-gray-600">Remember me</span>
                </label>
                <Link to="/auth/forgot-password" className="text-gray-900 hover:text-gray-700 hover:underline font-urbanist font-medium">
                  Forgot password?
                </Link>
              </div>
              
              <Button
                type="submit"
                className="w-full px-6 md:px-8 py-4 md:py-6 text-base md:text-lg font-urbanist font-light text-white shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                disabled={isLoading || !email || !password}
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={1} />
                  </>
                )}
              </Button>
            </form>
            
            <div className="mt-6 text-center w-full">
              <p className="font-urbanist font-light text-gray-600">
                Don't have an account?{' '}
                <Link to="/auth/register" className="text-gray-900 hover:text-gray-700 hover:underline font-urbanist font-medium">
                  Create account
                </Link>
              </p>
            </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      
      {/* Success Preloader */}
      {isSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 flex flex-col items-center shadow-lg border border-gray-200">
            <div className="relative w-16 h-16 mb-4">
              {/* Spinning circle */}
              <div className="w-16 h-16 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
              {/* Checkmark that appears after animation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-gray-900 opacity-0 animate-pulse" strokeWidth={1} style={{ animationDelay: '1s', animationFillMode: 'forwards' }} />
              </div>
            </div>
            <h3 className="text-xl font-urbanist font-semibold text-gray-900 mb-2">Login Successful!</h3>
            <p className="font-urbanist font-light text-gray-600 text-center">Welcome back to Bible Quiz Competition</p>
          </div>
        </div>
      )}
      
      {/* Dialog for login result */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="font-urbanist">
          <DialogHeader className="flex flex-col items-center">
            {dialogType === 'success' ? (
              <CheckCircle className="w-12 h-12 text-green-500 mb-2" strokeWidth={1} />
            ) : dialogType === 'warning' ? (
              <AlertTriangle className="w-12 h-12 text-yellow-500 mb-2" strokeWidth={1} />
            ) : (
              <XCircle className="w-12 h-12 text-red-500 mb-2" strokeWidth={1} />
            )}
            <DialogTitle className="font-urbanist font-semibold text-gray-900">{dialogTitle}</DialogTitle>
            <DialogDescription className="font-urbanist font-light text-gray-600">{dialogMessage}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setDialogOpen(false)} className="w-full bg-black hover:bg-gray-800 text-white font-urbanist font-light">Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Login;
