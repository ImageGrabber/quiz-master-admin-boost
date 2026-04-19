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

  const handleGoogleLogin = async () => {
    try {
      // Determine redirect URL based on environment
      const getRedirectUrl = () => {
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
          return `${window.location.origin}/dashboard`;
        }
        // Force the whitelisted production URL for all other environments (www, vercel, etc.)
        // This prevents the "redirect to root/#" issue when the origin doesn't match the whitelist exactly
        return 'https://biblequizcompetition.com/dashboard';
      };

      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: getRedirectUrl()
        }
      });
      if (error) throw error;
    } catch (error: any) {
      setDialogType('error');
      setDialogTitle("Google Login Failed");
      setDialogMessage(error.message || "Could not sign in with Google.");
      setDialogOpen(true);
    }
  };

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Login to Bible Quiz Competition 2026 | Sign In for Bible Quiz Results</title>
        <meta name="title" content="Login to Bible Quiz Competition 2026 | Sign In for Bible Quiz Results" />
        <meta name="description" content="Sign in to Bible Quiz Competition 2026 to access your account, view your Bible quiz results, track your progress on leaderboards, and continue your Bible learning journey. Free Bible quiz competition login." />
        <meta name="keywords" content="bible quiz competition 2026 login, bible quiz login, bible quiz competition sign in, bible quiz results login, bible quiz competition 2026 account, bible quiz leaderboard login, online bible quiz login, bible quiz competition 2026 sign in, christian quiz login, bible knowledge competition login" />
        <meta name="author" content="Bible Quiz Competition" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="language" content="English" />
        <meta name="theme-color" content="#6366f1" />
        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="United States" />
        <meta name="application-name" content="Bible Quiz Competition" />
        <meta name="apple-mobile-web-app-title" content="Bible Quiz 2026" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://biblequizcompetition.com/auth/login" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://biblequizcompetition.com/auth/login" />
        <meta property="og:title" content="Login to Bible Quiz Competition 2026 | Sign In for Bible Quiz Results" />
        <meta property="og:description" content="Sign in to Bible Quiz Competition 2026 to access your account, view Bible quiz results, and track your progress. Free to join!" />
        <meta property="og:site_name" content="Bible Quiz Competition" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image" content="https://biblequizcompetition.com/sword.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Bible Quiz Competition 2026 - Login Page" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://biblequizcompetition.com/auth/login" />
        <meta name="twitter:title" content="Login to Bible Quiz Competition 2026" />
        <meta name="twitter:description" content="Sign in to access your Bible quiz results, track progress, and continue your Bible learning journey. Free to join!" />
        <meta name="twitter:image" content="https://biblequizcompetition.com/sword.png" />
        <meta name="twitter:image:alt" content="Bible Quiz Competition 2026 Login" />

        {/* Structured Data - WebPage */}
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Login to Bible Quiz Competition 2026",
          "description": "Sign in to Bible Quiz Competition 2026 to access your account, view Bible quiz results, and track your progress on leaderboards.",
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

      <div className="min-h-screen bg-slate-50 font-urbanist relative overflow-hidden">
        <Navigation />

        {/* Background similar to Homepage */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[80vw] h-[80vw] bg-gradient-to-br from-blue-100/30 via-violet-100/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-[60vw] h-[60vw] bg-gradient-to-tr from-indigo-100/30 via-purple-100/20 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-6 py-20">
          <div className="text-center mb-10 max-w-2xl">
            <h1 className="text-4xl lg:text-5xl font-bold font-inter-tight text-slate-900 tracking-tight leading-[1.05] drop-shadow-sm mb-4">
              Welcome Back
            </h1>
            <p className="text-xl text-slate-500 font-light leading-relaxed">
              Sign in to continue your journey as a Bible Challenger.
            </p>
          </div>

          <Card className="w-full max-w-md bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100">
            <CardContent className="p-0">
              <form onSubmit={handleSubmit} className="space-y-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleGoogleLogin}
                  className="w-full h-14 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl font-semibold text-base shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Sign in with Google
                </Button>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-slate-200" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-slate-500 font-medium tracking-wider">Or sign in with email</span>
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm font-semibold text-slate-900 mb-2 block">
                    Email Address
                  </Label>
                  <div className="relative mt-2">
                    <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${focusedField === 'email' ? 'text-blue-600' : 'text-slate-400'}`} />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      className="pl-12 h-12 border-slate-200 rounded-xl font-light focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="password" className="text-sm font-semibold text-slate-900 mb-2 block">
                    Password
                  </Label>
                  <div className="relative mt-2">
                    <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${focusedField === 'password' ? 'text-blue-600' : 'text-slate-400'}`} />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setFocusedField('password')}
                      onBlur={() => setFocusedField(null)}
                      className="pl-12 h-12 border-slate-200 rounded-xl font-light focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-slate-600 font-light">Remember me</span>
                  </label>
                  <Link to="/auth/forgot-password" className="text-blue-600 hover:text-blue-700 font-medium">
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full h-14 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>



                <div className="text-center mt-6">
                  <p className="text-slate-600 font-light">
                    Don't have an account?{' '}
                    <Link to="/auth/register" className="text-blue-600 hover:text-blue-700 font-semibold">
                      Create account
                    </Link>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
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

