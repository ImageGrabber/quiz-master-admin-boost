import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogType, setDialogType] = useState<'success' | 'error' | 'warning'>('error');
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
        setDialogType('success');
        setDialogTitle("Login successful!");
        setDialogMessage("Welcome back to Bible Quiz Competition.");
        setDialogOpen(true);
        // Fetch the user's profile to check their role
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .single();
        setTimeout(() => {
          setDialogOpen(false);
          if (profile?.role === 'admin') {
            navigate("/admin");
          } else {
            navigate("/dashboard");
          }
        }, 1500);
      }
    } catch (error: any) {
      // Check for email not confirmed error
      if (error.message && error.message.toLowerCase().includes('email') && error.message.toLowerCase().includes('confirm')) {
        setDialogType('warning');
        setDialogTitle("Email Not Confirmed");
        setDialogMessage("Your email address has not been confirmed. Please check your inbox (and spam folder) for a verification email, and follow the link to activate your account before logging in.");
      } else {
        setDialogType('error');
        setDialogTitle("Login failed");
        setDialogMessage(error.message || "Please check your credentials and try again.");
      }
      setDialogOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Right panel with Bible Quiz Competition content and purple theme
  const RightPanel = () => (
    <div className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 flex flex-col justify-center items-center p-8 min-h-screen">
      <div className="flex flex-col gap-6 w-full max-w-xs">
        <div className="flex flex-col items-center bg-white/10 rounded-xl p-8 mb-4 -ml-16 md:-ml-32 shadow-lg">
          <span className="text-white text-lg font-semibold">Quiz Stats</span>
          <span className="text-purple-100 text-sm mt-2">Total Quizzes Taken</span>
          <span className="text-2xl font-bold text-white">48,300+</span>
          <span className="text-purple-100 text-sm mt-2">Top Scorer</span>
          <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Top Scorer" className="w-12 h-12 rounded-full border-2 border-white my-2" />
          <span className="text-white font-semibold">John D.</span>
          <span className="text-purple-100 text-xs">1,250 pts</span>
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
    <div className="min-h-screen flex flex-col md:flex-row font-[Jost,sans-serif]">
      {/* Left: Login Form */}
      <div className="flex-1 flex flex-col justify-center items-center bg-white p-8 min-h-screen">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Login to Bible Quiz Competition</h1>
          <p className="text-gray-600 mb-10 text-lg">Sign in to access quizzes, track your progress, and compete for prizes.</p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="email" className="block text-gray-700 font-semibold mb-2 text-base">Email Address<span className="text-purple-600">*</span></Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-12 h-12 border-gray-200 rounded-full bg-gray-50 focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition placeholder-gray-400"
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="password" className="block text-gray-700 font-semibold mb-2 text-base">Password<span className="text-purple-600">*</span></Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-12 h-12 border-gray-200 rounded-full bg-gray-50 focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition placeholder-gray-400"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm mt-2 mb-6">
              <label className="flex items-center gap-2 select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="accent-purple-600 rounded"
                />
                Remember me
              </label>
              <Link to="/auth/forgot-password" className="text-purple-600 hover:text-purple-700 hover:underline font-medium">Forgot password?</Link>
            </div>
            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-full shadow-lg transition-all duration-300 mt-2"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login to Bible Quiz Competition"}
            </Button>
          </form>
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/auth/register" className="text-purple-600 hover:text-purple-700 hover:underline font-semibold">
                Register Now
              </Link>
            </p>
          </div>
        </div>
      </div>
      {/* Right: Green Panel */}
      <RightPanel />
      {/* Dialog for login result */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader className="flex flex-col items-center">
            {dialogType === 'success' ? (
              <CheckCircle className="w-12 h-12 text-green-500 mb-2" />
            ) : dialogType === 'warning' ? (
              <AlertTriangle className="w-12 h-12 text-yellow-500 mb-2" />
            ) : (
              <XCircle className="w-12 h-12 text-red-500 mb-2" />
            )}
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogDescription>{dialogMessage}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Login;
