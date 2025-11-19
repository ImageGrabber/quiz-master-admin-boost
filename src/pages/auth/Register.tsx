
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Lock, User, CheckCircle, ArrowRight, Shield, Trophy, Heart, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from 'react-helmet';
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Navigation } from "@/components/Navigation";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showVerifyDialog, setShowVerifyDialog] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  
  // Password strength indicator
  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, label: '', color: '' };
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/\d/)) strength++;
    if (password.match(/[^a-zA-Z\d]/)) strength++;
    
    if (strength <= 1) return { strength, label: 'Weak', color: 'bg-red-500' };
    if (strength === 2) return { strength, label: 'Fair', color: 'bg-yellow-500' };
    if (strength === 3) return { strength, label: 'Good', color: 'bg-blue-500' };
    return { strength, label: 'Strong', color: 'bg-green-500' };
  };
  
  const passwordStrength = getPasswordStrength(formData.password);
  const passwordsMatch = formData.password && formData.confirmPassword && formData.password === formData.confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.name,
          }
        }
      });
      if (error) throw error;
      if (data.user) {
        setIsSuccess(true);
        // Show success preloader for 2 seconds
        setTimeout(() => {
          setIsSuccess(false);
          setShowVerifyDialog(true);
        }, 2000);
      }
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };


  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Register for Bible Quiz Competition 2025 | Sign Up for Free Bible Quiz</title>
        <meta name="title" content="Register for Bible Quiz Competition 2025 | Sign Up for Free Bible Quiz" />
        <meta name="description" content="Join Bible Quiz Competition 2025 for free! Create your account to participate in daily Bible quiz challenges, compete for prizes, track your Bible quiz results, and climb leaderboards. Start your Bible learning journey today." />
        <meta name="keywords" content="bible quiz competition 2025 sign up, bible quiz competition 2025 register, bible quiz competition 2025 free, bible quiz sign up, bible quiz competition registration, bible quiz competition 2025 account, free bible quiz competition, bible quiz competition 2025 join, christian quiz competition sign up, bible knowledge competition register" />
        <meta name="author" content="Bible Quiz Competition" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="language" content="English" />
        <meta name="theme-color" content="#6366f1" />
        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="United States" />
        <meta name="application-name" content="Bible Quiz Competition" />
        <meta name="apple-mobile-web-app-title" content="Bible Quiz 2025" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://biblequizcompetition.com/auth/register" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://biblequizcompetition.com/auth/register" />
        <meta property="og:title" content="Register for Bible Quiz Competition 2025 | Sign Up for Free Bible Quiz" />
        <meta property="og:description" content="Join Bible Quiz Competition 2025 for free! Create your account to participate in daily Bible quiz challenges, compete for prizes, and track your progress. Free to join!" />
        <meta property="og:site_name" content="Bible Quiz Competition" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image" content="https://biblequizcompetition.com/sword.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Bible Quiz Competition 2025 - Registration Page" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://biblequizcompetition.com/auth/register" />
        <meta name="twitter:title" content="Register for Bible Quiz Competition 2025" />
        <meta name="twitter:description" content="Join Bible Quiz Competition 2025 for free! Participate in daily challenges, compete for prizes, and track your Bible quiz results." />
        <meta name="twitter:image" content="https://biblequizcompetition.com/sword.png" />
        <meta name="twitter:image:alt" content="Bible Quiz Competition 2025 Registration" />
        
        {/* Structured Data - WebPage */}
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Register for Bible Quiz Competition 2025",
          "description": "Join Bible Quiz Competition 2025 for free! Create your account to participate in daily Bible quiz challenges, compete for prizes, and track your progress on leaderboards.",
          "url": "https://biblequizcompetition.com/auth/register",
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
                "name": "Register",
                "item": "https://biblequizcompetition.com/auth/register"
              }
            ]
          }
        })}</script>
        
        {/* Structured Data - Offer */}
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Offer",
          "name": "Free Bible Quiz Competition 2025 Registration",
          "description": "Join Bible Quiz Competition 2025 completely free. No credit card required. Participate in daily Bible quiz challenges and compete for prizes.",
          "price": "0",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "url": "https://biblequizcompetition.com/auth/register",
          "seller": {
            "@type": "Organization",
            "name": "Bible Quiz Competition"
          }
        })}</script>
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-blue-50/30 via-indigo-50/20 to-white">
        <Navigation />

        {/* Registration Section - Modern & Stylish */}
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
                Start Your <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-medium">Journey</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-600 font-light max-w-2xl mx-auto leading-relaxed">
                Create your account to access quizzes, track your progress, and begin your Bible learning journey
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-start">
              {/* Registration Form Card - First on mobile, right on desktop */}
              <Card className="relative border-0 shadow-2xl hover:shadow-[0_25px_50px_rgba(99,102,241,0.3)] transition-all duration-500 rounded-3xl bg-gradient-to-br from-white via-indigo-50/30 to-purple-50/30 backdrop-blur-xl border-2 border-indigo-200/60 overflow-hidden group order-1 md:order-2">
                {/* Decorative gradient overlay */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-indigo-400/30 via-purple-400/25 to-pink-400/20 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-cyan-400/25 to-blue-400/20 rounded-full blur-2xl"></div>
                
                <CardContent className="p-8 relative z-10">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="name" className="text-sm font-semibold text-slate-900 mb-2 block">
                        Full Name<span className="text-slate-500 ml-1">*</span>
                      </Label>
                      <div className="relative mt-2 group">
                        <User className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${focusedField === 'name' ? 'text-indigo-600' : 'text-slate-400'}`} />
                        <Input
                          id="name"
                          type="text"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          onFocus={() => setFocusedField('name')}
                          onBlur={() => setFocusedField(null)}
                          className={`pl-12 h-12 border-2 rounded-xl font-light transition-all duration-200 ${
                            focusedField === 'name' 
                              ? 'border-indigo-500 focus:ring-2 focus:ring-indigo-500/20' 
                              : 'border-slate-200 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-500/20'
                          }`}
                          required
                        />
                      </div>
                    </div>
                    
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
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
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
                          placeholder="Create a password (min. 8 characters)"
                          value={formData.password}
                          onChange={(e) => handleInputChange("password", e.target.value)}
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
                      {formData.password && (
                        <div className="mt-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-light text-slate-600">Password strength</span>
                            <span className={`text-xs font-medium ${passwordStrength.strength >= 3 ? 'text-emerald-600' : passwordStrength.strength === 2 ? 'text-amber-600' : 'text-rose-600'}`}>
                              {passwordStrength.label}
                            </span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-1.5">
                            <div 
                              className={`${passwordStrength.color} h-1.5 rounded-full transition-all duration-300`}
                              style={{ width: `${(passwordStrength.strength / 4) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="confirmPassword" className="text-sm font-semibold text-slate-900 mb-2 block">
                        Confirm Password<span className="text-slate-500 ml-1">*</span>
                      </Label>
                      <div className="relative mt-2 group">
                        <Lock className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${focusedField === 'confirmPassword' ? 'text-indigo-600' : 'text-slate-400'}`} />
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="Confirm your password"
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                          onFocus={() => setFocusedField('confirmPassword')}
                          onBlur={() => setFocusedField(null)}
                          className={`pl-12 pr-12 h-12 border-2 rounded-xl font-light transition-all duration-200 ${
                            focusedField === 'confirmPassword' 
                              ? 'border-indigo-500 focus:ring-2 focus:ring-indigo-500/20' 
                              : 'border-slate-200 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-500/20'
                          } ${
                            formData.confirmPassword && passwordsMatch ? 'border-emerald-500 focus:border-emerald-600' : 
                            formData.confirmPassword && !passwordsMatch ? 'border-rose-500 focus:border-rose-600' : ''
                          }`}
                          required
                        />
                        {formData.confirmPassword && (
                          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                            {passwordsMatch ? (
                              <CheckCircle className="w-5 h-5 text-emerald-600" strokeWidth={2} />
                            ) : (
                              <span className="text-rose-600 text-xs font-medium">!</span>
                            )}
                          </div>
                        )}
                      </div>
                      {formData.confirmPassword && !passwordsMatch && (
                        <p className="mt-2 text-xs font-light text-rose-600">Passwords don't match</p>
                      )}
                    </div>
                    
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 font-semibold py-6 text-base group relative overflow-hidden"
                      disabled={isLoading || !formData.name || !formData.email || !formData.password || !formData.confirmPassword || !passwordsMatch}
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>
                      {isLoading ? (
                        <span className="relative flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Creating Account...</span>
                        </span>
                      ) : (
                        <span className="relative flex items-center justify-center gap-2">
                          <span>Create Account</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      )}
                    </Button>
                  </form>
                  
                  <div className="mt-6 text-center">
                    <p className="text-slate-600 font-light">
                      Already have an account?{' '}
                      <Link to="/auth/login" className="text-indigo-600 hover:text-indigo-700 hover:underline font-semibold">
                        Sign in here
                      </Link>
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Benefits Cards - Second on mobile, left on desktop */}
              <div className="space-y-6 order-2 md:order-1">
                <Card className="relative border-0 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-3xl bg-gradient-to-br from-white via-amber-50/40 to-orange-50/30 backdrop-blur-xl border border-amber-100/50 hover:scale-105 group overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-amber-400/10 to-orange-400/10 rounded-full blur-3xl"></div>
                  <CardContent className="p-6 relative z-10">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-all duration-300">
                        <Trophy className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-2">Compete & Win</h3>
                        <p className="text-sm text-slate-600 font-light leading-relaxed">Join competitions and climb the leaderboard</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="relative border-0 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-3xl bg-gradient-to-br from-white via-emerald-50/40 to-teal-50/30 backdrop-blur-xl border border-emerald-100/50 hover:scale-105 group overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-emerald-400/10 to-teal-400/10 rounded-full blur-3xl"></div>
                  <CardContent className="p-6 relative z-10">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-all duration-300">
                        <Shield className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-2">Secure & Free</h3>
                        <p className="text-sm text-slate-600 font-light leading-relaxed">Your data is protected, and it's completely free</p>
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

                <Card className="relative border-0 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-3xl bg-gradient-to-br from-white via-blue-50/40 to-cyan-50/30 backdrop-blur-xl border border-blue-100/50 hover:scale-105 group overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl"></div>
                  <CardContent className="p-6 relative z-10">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-all duration-300">
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-2">Bible Learning</h3>
                        <p className="text-sm text-slate-600 font-light leading-relaxed">Access Bible Q&A Hub and educational resources</p>
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
          <div className="bg-gradient-to-br from-white via-indigo-50/30 to-purple-50/30 backdrop-blur-xl rounded-3xl p-8 flex flex-col items-center shadow-2xl border-2 border-indigo-200/60">
            <div className="relative w-16 h-16 mb-4">
              {/* Spinning circle */}
              <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
              {/* Checkmark that appears after animation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-indigo-600 opacity-0 animate-pulse" strokeWidth={2} style={{ animationDelay: '1s', animationFillMode: 'forwards' }} />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Registration Successful!</h3>
            <p className="text-slate-600 font-light text-center">Your account has been created successfully</p>
          </div>
        </div>
      )}
      
      {/* Verification Dialog */}
      <Dialog open={showVerifyDialog} onOpenChange={setShowVerifyDialog}>
        <DialogContent className="bg-gradient-to-br from-white via-indigo-50/30 to-purple-50/30 backdrop-blur-xl border-2 border-indigo-200/60 rounded-3xl shadow-2xl">
          <DialogHeader>
            <DialogTitle className="font-semibold text-slate-900 text-xl">Email Verification Sent</DialogTitle>
            <DialogDescription className="font-light text-slate-600 text-center mt-2">
              A verification email has been sent to <b>{formData.email}</b>.<br />
              Please check your inbox and follow the link to verify your account before logging in.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              onClick={() => navigate('/auth/login')} 
              className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 mt-4"
            >
              Go to Login
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Register;
