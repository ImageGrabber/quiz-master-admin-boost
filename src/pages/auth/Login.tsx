import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Lock, CheckCircle, XCircle, AlertTriangle, ArrowRight, Trophy, BookOpen, Heart } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Helmet } from 'react-helmet';
import { supabase } from "@/integrations/supabase/client";
import { Navigation } from "@/components/Navigation";

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
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Login to Bible Quiz Competition 2025 | Sign In for Bible Quiz Results</title>
        <meta name="title" content="Login to Bible Quiz Competition 2025 | Sign In for Bible Quiz Results" />
        <meta name="description" content="Sign in to Bible Quiz Competition 2025 to access your account, view your Bible quiz results, track your progress on leaderboards, and continue your Bible learning journey. Free Bible quiz competition login." />
        <meta name="keywords" content="bible quiz competition 2025 login, bible quiz login, bible quiz competition sign in, bible quiz results login, bible quiz competition 2025 account, bible quiz leaderboard login, online bible quiz login, bible quiz competition 2025 sign in, christian quiz login, bible knowledge competition login" />
        <meta name="author" content="Bible Quiz Competition" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="language" content="English" />
        <meta name="theme-color" content="#6366f1" />
        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="United States" />
        <meta name="application-name" content="Bible Quiz Competition" />
        <meta name="apple-mobile-web-app-title" content="Bible Quiz 2025" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://biblequizcompetition.com/auth/login" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://biblequizcompetition.com/auth/login" />
        <meta property="og:title" content="Login to Bible Quiz Competition 2025 | Sign In for Bible Quiz Results" />
        <meta property="og:description" content="Sign in to Bible Quiz Competition 2025 to access your account, view Bible quiz results, and track your progress. Free to join!" />
        <meta property="og:site_name" content="Bible Quiz Competition" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image" content="https://biblequizcompetition.com/sword.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Bible Quiz Competition 2025 - Login Page" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://biblequizcompetition.com/auth/login" />
        <meta name="twitter:title" content="Login to Bible Quiz Competition 2025" />
        <meta name="twitter:description" content="Sign in to access your Bible quiz results, track progress, and continue your Bible learning journey. Free to join!" />
        <meta name="twitter:image" content="https://biblequizcompetition.com/sword.png" />
        <meta name="twitter:image:alt" content="Bible Quiz Competition 2025 Login" />
        
        {/* Structured Data - WebPage */}
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Login to Bible Quiz Competition 2025",
          "description": "Sign in to Bible Quiz Competition 2025 to access your account, view Bible quiz results, and track your progress on leaderboards.",
          "url": "https://biblequizcompetition.com/auth/login",
          "inLanguage": "en-US",
          "isPartOf": {
            "@type": "WebSite",
            "name": "Bible Quiz Competition",
            "url": "https://biblequizcompetition.com"
          },
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://biblequizcompetition.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Login",
                "item": "https://biblequizcompetition.com/auth/login"
              }
            ]
          }
        })}</script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-blue-50/30 via-indigo-50/20 to-white">
        <Navigation />

        {/* Login Section - Modern & Stylish */}
        <section className="relative py-20 md:py-32 px-6 bg-gradient-to-br from-indigo-50 via-purple-50/80 to-pink-50 overflow-hidden">
          {/* Animated background orbs */}
          <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-blue-400/30 to-cyan-400/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-tr from-purple-400/30 to-pink-400/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
          
          <div className="max-w-6xl mx-auto relative z-10">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-900 mb-6 leading-[1.1] tracking-tight">
                Welcome <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-medium">Back</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-600 font-light max-w-2xl mx-auto leading-relaxed">
                Sign in to access your quizzes, track your progress, and continue your Bible learning journey
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-start">
              {/* Login Form Card - First on mobile, right on desktop */}
              <Card className="relative border-0 shadow-2xl hover:shadow-[0_25px_50px_rgba(99,102,241,0.3)] transition-all duration-500 rounded-3xl bg-gradient-to-br from-white via-indigo-50/30 to-purple-50/30 backdrop-blur-xl border-2 border-indigo-200/60 overflow-hidden group order-1 md:order-2">
                {/* Decorative gradient overlay */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-indigo-400/30 via-purple-400/25 to-pink-400/20 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-cyan-400/25 to-blue-400/20 rounded-full blur-2xl"></div>
                
                <CardContent className="p-8 relative z-10">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="email" className="text-sm font-semibold text-slate-900 mb-2 block">
                        Email Address<span className="text-slate-500 ml-1">*</span>
                      </Label>
                      <div className="relative mt-2 group">
                        <Mail className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${focusedField === 'email' ? 'text-indigo-600' : 'text-slate-400'}`} />
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          onFocus={() => setFocusedField('email')}
                          onBlur={() => setFocusedField(null)}
                          className={`pl-12 h-12 border-2 rounded-xl font-light transition-all duration-200 ${
                            focusedField === 'email' 
                              ? 'border-indigo-500 focus:ring-2 focus:ring-indigo-500/20' 
                              : 'border-slate-200 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-500/20'
                          }`}
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="password" className="text-sm font-semibold text-slate-900 mb-2 block">
                        Password<span className="text-slate-500 ml-1">*</span>
                      </Label>
                      <div className="relative mt-2 group">
                        <Lock className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${focusedField === 'password' ? 'text-indigo-600' : 'text-slate-400'}`} />
                        <Input
                          id="password"
                          type="password"
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          onFocus={() => setFocusedField('password')}
                          onBlur={() => setFocusedField(null)}
                          className={`pl-12 h-12 border-2 rounded-xl font-light transition-all duration-200 ${
                            focusedField === 'password' 
                              ? 'border-indigo-500 focus:ring-2 focus:ring-indigo-500/20' 
                              : 'border-slate-200 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-500/20'
                          }`}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <label className="flex items-center gap-2 select-none cursor-pointer">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={() => setRememberMe(!rememberMe)}
                          className="accent-indigo-600 rounded cursor-pointer"
                        />
                        <span className="text-slate-600 font-light">Remember me</span>
                      </label>
                      <Link to="/auth/forgot-password" className="text-indigo-600 hover:text-indigo-700 hover:underline font-medium">
                        Forgot password?
                      </Link>
                    </div>
                    
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 font-semibold py-6 text-base group relative overflow-hidden"
                      disabled={isLoading || !email || !password}
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>
                      {isLoading ? (
                        <span className="relative flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Signing in...</span>
                        </span>
                      ) : (
                        <span className="relative flex items-center justify-center gap-2">
                          <span>Sign In</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      )}
                    </Button>
                  </form>
                  
                  <div className="mt-6 text-center">
                    <p className="text-slate-600 font-light">
                      Don't have an account?{' '}
                      <Link to="/auth/register" className="text-indigo-600 hover:text-indigo-700 hover:underline font-semibold">
                        Create account
                      </Link>
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Benefits Cards - Second on mobile, left on desktop */}
              <div className="space-y-6 order-2 md:order-1">
                <Card className="relative border-0 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-3xl bg-gradient-to-br from-white via-blue-50/40 to-cyan-50/30 backdrop-blur-xl border border-blue-100/50 hover:scale-105 group overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl"></div>
                  <CardContent className="p-6 relative z-10">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-all duration-300">
                        <Trophy className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-2">Track Your Progress</h3>
                        <p className="text-sm text-slate-600 font-light leading-relaxed">View your quiz history and see how you rank on the leaderboard</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="relative border-0 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-3xl bg-gradient-to-br from-white via-purple-50/40 to-pink-50/30 backdrop-blur-xl border border-purple-100/50 hover:scale-105 group overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
                  <CardContent className="p-6 relative z-10">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-all duration-300">
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-2">Continue Learning</h3>
                        <p className="text-sm text-slate-600 font-light leading-relaxed">Access Bible Q&A Hub and educational articles</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="relative border-0 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-3xl bg-gradient-to-br from-white via-pink-50/40 to-rose-50/30 backdrop-blur-xl border border-pink-100/50 hover:scale-105 group overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-pink-400/10 to-rose-400/10 rounded-full blur-3xl"></div>
                  <CardContent className="p-6 relative z-10">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-all duration-300">
                        <Heart className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-2">Emotional Wellness</h3>
                        <p className="text-sm text-slate-600 font-light leading-relaxed">Track your mood, use CBT tools, and find peace through God's word</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>
      
      {/* Success Preloader */}
      {isSuccess && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-10 flex flex-col items-center shadow-2xl border border-slate-200 max-w-md w-full mx-4">
            <div className="relative w-20 h-20 mb-6">
              {/* Spinning circle */}
              <div className="w-20 h-20 border-4 border-slate-200 border-t-indigo-600 rounded-full animate-spin"></div>
              {/* Checkmark that appears after animation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <CheckCircle className="w-14 h-14 text-emerald-600 opacity-0 animate-pulse" strokeWidth={2.5} style={{ animationDelay: '1s', animationFillMode: 'forwards' }} />
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-slate-900 mb-3">Login Successful!</h3>
            <p className="text-slate-600 font-light text-center text-base mb-6">Welcome back to Bible Quiz Competition</p>
            <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full animate-pulse" style={{ width: '100%' }}></div>
            </div>
          </div>
        </div>
      )}
      
      {/* Dialog for login result */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-gradient-to-br from-white via-indigo-50/30 to-purple-50/30 backdrop-blur-xl border-2 border-indigo-200/60 rounded-3xl shadow-2xl">
          <DialogHeader className="flex flex-col items-center">
            {dialogType === 'success' ? (
              <CheckCircle className="w-12 h-12 text-emerald-500 mb-2" strokeWidth={2} />
            ) : dialogType === 'warning' ? (
              <AlertTriangle className="w-12 h-12 text-amber-500 mb-2" strokeWidth={2} />
            ) : (
              <XCircle className="w-12 h-12 text-rose-500 mb-2" strokeWidth={2} />
            )}
            <DialogTitle className="font-semibold text-slate-900 text-xl">{dialogTitle}</DialogTitle>
            <DialogDescription className="font-light text-slate-600 text-center mt-2">{dialogMessage}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              onClick={() => setDialogOpen(false)} 
              className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Login;

