
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, User, CheckCircle } from "lucide-react";
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

  // Right panel (same as login)
  const RightPanel = () => (
    <div className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 flex flex-col justify-center items-center p-8 min-h-screen">
      <div className="flex flex-col gap-6 w-full max-w-xs">
        <div className="bg-white/10 rounded-xl p-8 md:-mr-32 -mr-16 shadow-lg">
          <span className="text-white text-lg font-semibold mb-2">Upcoming Event</span>
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-6 h-6 text-yellow-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            <span className="text-yellow-100 font-semibold">Next Quiz: Saturday, 8 AM – 8 PM</span>
          </div>
          <span className="text-purple-100 text-xs">Don't miss our weekly live event!</span>
        </div>
        <div className="bg-white/10 rounded-xl p-8 -ml-16 md:-ml-32 shadow-lg">
          <span className="text-white text-lg font-semibold mb-2">Why Register?</span>
          <ul className="list-disc list-inside text-purple-100 text-sm mt-2 space-y-1">
            <li>Track your quiz progress</li>
            <li>Earn badges & win prizes</li>
            <li>Access exclusive events</li>
            <li>Join a vibrant community</li>
          </ul>
        </div>
        <div className="bg-white/10 rounded-xl p-8 md:-mr-32 -mr-16 shadow-lg">
          <div className="flex items-center mb-2">
            <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Testimonial" className="w-8 h-8 rounded-full mr-2" />
            <span className="text-white font-semibold">Sarah K.</span>
            <span className="ml-2 text-purple-200 text-xs">★★★★★</span>
          </div>
          <span className="text-purple-50 text-sm">"Bible Quiz Competition helped me learn more about the Bible and connect with others. The quizzes are fun and challenging!"</span>
          <span className="block text-purple-100 text-xs mt-1">2 days ago</span>
        </div>
      </div>
      <div className="mt-10 text-center text-white text-lg font-semibold">
        Compete, Learn, and Win!<br />
        <span className="text-purple-100 text-base font-normal">Join thousands of members testing their Bible knowledge every week.</span>
      </div>
    </div>
  );

  return (
    <>
      <div className="min-h-screen flex flex-col md:flex-row">
        {/* Left: Registration Form */}
        <div className="flex-1 flex flex-col justify-center items-center bg-white p-8 min-h-screen">
                  <div className="w-full max-w-md">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">Important Notice</h3>
                <div className="mt-1 text-sm text-blue-700">
                  <p>We've created a new and efficient platform! Even if you've registered before, you'll need to register again and verify your email to access the improved features.</p>
                </div>
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create your account</h1>
          <p className="text-gray-600 mb-8 text-lg">Sign up to access quizzes, track your progress, and compete for prizes.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-gray-700 font-medium text-base">Full Name<span className="text-purple-600">*</span></Label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="pl-10 h-12 border-gray-200 rounded-full focus:outline-none"
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="email" className="text-gray-700 font-medium text-base">Email Address<span className="text-purple-600">*</span></Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="pl-10 h-12 border-gray-200 rounded-full focus:outline-none"
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="password" className="text-gray-700 font-medium text-base">Password<span className="text-purple-600">*</span></Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className="pl-10 h-12 border-gray-200 rounded-full focus:outline-none"
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="confirmPassword" className="text-gray-700 font-medium text-base">Confirm Password<span className="text-purple-600">*</span></Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    className="pl-10 h-12 border-gray-200 rounded-full focus:outline-none"
                    required
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-full shadow-lg transition-all duration-300 mt-20"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
            <div className="mt-6 text-center mb-4">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link to="/auth/login" className="text-purple-600 hover:text-purple-700 hover:underline font-semibold">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
        {/* Right: Themed Panel */}
        <div className="hidden md:flex flex-1">
          <RightPanel />
        </div>
      </div>
      
      {/* Success Preloader */}
      {isSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 flex flex-col items-center shadow-2xl">
            <div className="relative w-16 h-16 mb-4">
              {/* Spinning circle */}
              <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
              {/* Checkmark that appears after animation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-green-500 opacity-0 animate-pulse" style={{ animationDelay: '1s', animationFillMode: 'forwards' }} />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Registration Successful!</h3>
            <p className="text-gray-600 text-center">Your account has been created successfully</p>
          </div>
        </div>
      )}
      
      {/* Verification Dialog */}
      <Dialog open={showVerifyDialog} onOpenChange={setShowVerifyDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Email Verification Sent</DialogTitle>
            <DialogDescription>
              A verification email has been sent to <b>{formData.email}</b>.<br />
              Please check your inbox and follow the link to verify your account before logging in.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => navigate('/auth/login')} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold mt-4">Go to Login</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Register;
