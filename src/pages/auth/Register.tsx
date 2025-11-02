
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, User, CheckCircle, Brain, Menu, ArrowRight, Shield, Trophy, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

        {/* Registration Form */}
        <main className="flex flex-col md:flex-row items-center justify-center px-6 py-12 md:py-16 min-h-[calc(100vh-100px)] max-w-7xl mx-auto">
          {/* Left Side - Heading and Notice */}
          <div className="w-full md:w-1/2 max-w-lg mb-12 md:mb-0 md:pr-16 lg:pr-20">
            <div className="mb-10">
              <div className="mb-6">
                <h1 className="text-4xl md:text-5xl font-urbanist font-semibold text-gray-900 whitespace-nowrap">Create your account</h1>
              </div>
              <p className="text-xl font-urbanist font-light text-gray-600 leading-relaxed">Sign up to access quizzes, track your progress, and compete for prizes.</p>
            </div>

            {/* Benefits Cards */}
            <div className="space-y-4">
              <div className="bg-white border border-gray-200 rounded-lg p-4 hover:border-gray-400 transition-colors duration-300 group">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                    <Trophy className="w-5 h-5 text-gray-700" strokeWidth={1} />
                  </div>
                  <div>
                    <h3 className="font-urbanist font-medium text-gray-900 mb-1">Compete & Win</h3>
                    <p className="text-sm font-urbanist font-light text-gray-600">Join competitions and climb the leaderboard</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-4 hover:border-gray-400 transition-colors duration-300 group">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                    <Shield className="w-5 h-5 text-gray-700" strokeWidth={1} />
                  </div>
                  <div>
                    <h3 className="font-urbanist font-medium text-gray-900 mb-1">Secure & Free</h3>
                    <p className="text-sm font-urbanist font-light text-gray-600">Your data is protected, and it's completely free</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Registration Form */}
          <div className="w-full md:w-1/2 max-w-md">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="font-urbanist font-medium text-gray-900 text-sm mb-2 block">
                  Full Name<span className="text-gray-500 ml-1">*</span>
                </Label>
                <div className="relative mt-2 group">
                  <User className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${focusedField === 'name' ? 'text-gray-900' : 'text-gray-400'}`} strokeWidth={1} />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    className={`pl-12 h-14 border-gray-300 focus:border-gray-900 focus:ring-2 focus:ring-gray-900 rounded-lg font-urbanist font-light transition-all duration-200 ${
                      focusedField === 'name' ? 'border-gray-900' : ''
                    }`}
                    required
                  />
                </div>
              </div>
              
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
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
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
                    placeholder="Create a password (min. 8 characters)"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                    className={`pl-12 h-14 border-gray-300 focus:border-gray-900 focus:ring-2 focus:ring-gray-900 rounded-lg font-urbanist font-light transition-all duration-200 ${
                      focusedField === 'password' ? 'border-gray-900' : ''
                    }`}
                    required
                  />
                </div>
                {formData.password && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-urbanist font-light text-gray-600">Password strength</span>
                      <span className={`text-xs font-urbanist font-medium ${passwordStrength.strength >= 3 ? 'text-green-600' : passwordStrength.strength === 2 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {passwordStrength.label}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className={`${passwordStrength.color} h-1.5 rounded-full transition-all duration-300`}
                        style={{ width: `${(passwordStrength.strength / 4) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
              
              <div>
                <Label htmlFor="confirmPassword" className="font-urbanist font-medium text-gray-900 text-sm mb-2 block">
                  Confirm Password<span className="text-gray-500 ml-1">*</span>
                </Label>
                <div className="relative mt-2 group">
                  <Lock className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${focusedField === 'confirmPassword' ? 'text-gray-900' : 'text-gray-400'}`} strokeWidth={1} />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    onFocus={() => setFocusedField('confirmPassword')}
                    onBlur={() => setFocusedField(null)}
                    className={`pl-12 h-14 border-gray-300 focus:border-gray-900 focus:ring-2 focus:ring-gray-900 rounded-lg font-urbanist font-light transition-all duration-200 ${
                      focusedField === 'confirmPassword' ? 'border-gray-900' : ''
                    } ${
                      formData.confirmPassword && passwordsMatch ? 'border-green-500 focus:border-green-600' : 
                      formData.confirmPassword && !passwordsMatch ? 'border-red-500 focus:border-red-600' : ''
                    }`}
                    required
                  />
                  {formData.confirmPassword && (
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      {passwordsMatch ? (
                        <CheckCircle className="w-5 h-5 text-green-600" strokeWidth={1.5} />
                      ) : (
                        <span className="text-red-600 text-xs font-urbanist font-medium">!</span>
                      )}
                    </div>
                  )}
                </div>
                {formData.confirmPassword && !passwordsMatch && (
                  <p className="mt-2 text-xs font-urbanist font-light text-red-600">Passwords don't match</p>
                )}
              </div>
              
              <Button
                type="submit"
                className="w-full h-14 bg-black hover:bg-gray-800 text-white font-urbanist font-light rounded-lg transition-all duration-300 mt-8 flex items-center justify-center gap-2 group shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading || !formData.name || !formData.email || !formData.password || !formData.confirmPassword || !passwordsMatch}
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <span>Create Account</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={1} />
                  </>
                )}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="font-urbanist font-light text-gray-600">
                Already have an account?{' '}
                <Link to="/auth/login" className="text-gray-900 hover:text-gray-700 hover:underline font-urbanist font-medium">
                  Sign in here
                </Link>
              </p>
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
            <h3 className="text-xl font-urbanist font-semibold text-gray-900 mb-2">Registration Successful!</h3>
            <p className="font-urbanist font-light text-gray-600 text-center">Your account has been created successfully</p>
          </div>
        </div>
      )}
      
      {/* Verification Dialog */}
      <Dialog open={showVerifyDialog} onOpenChange={setShowVerifyDialog}>
        <DialogContent className="font-urbanist">
          <DialogHeader>
            <DialogTitle className="font-urbanist font-semibold text-gray-900">Email Verification Sent</DialogTitle>
            <DialogDescription className="font-urbanist font-light text-gray-600">
              A verification email has been sent to <b>{formData.email}</b>.<br />
              Please check your inbox and follow the link to verify your account before logging in.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => navigate('/auth/login')} className="w-full bg-black hover:bg-gray-800 text-white font-urbanist font-light mt-4">Go to Login</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Register;
