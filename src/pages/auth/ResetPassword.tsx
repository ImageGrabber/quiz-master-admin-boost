import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, CheckCircle, Eye, EyeOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user has a valid session (came from reset link)
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        alert("Invalid reset link. Please request a new password reset link.");
        navigate("/auth/forgot-password");
      }
    };
    checkSession();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match. Please make sure both passwords are the same.");
      return;
    }
    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      setIsSuccess(true);
    } catch (error: any) {
      alert(error.message || "Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Right panel with unique 'Password Tips' card and others
  const RightPanel = () => (
    <div className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 flex flex-col justify-center items-center p-8 min-h-screen">
      <div className="flex flex-col gap-6 w-full max-w-xs">
        <div className="bg-white/10 rounded-xl p-8 -ml-16 md:-ml-32 shadow-lg">
          <span className="text-white text-lg font-semibold mb-2">Password Tips</span>
          <ul className="list-disc list-inside text-purple-100 text-sm mt-2 space-y-1">
            <li>Use at least 6 characters</li>
            <li>Include numbers and letters</li>
            <li>Avoid common words</li>
            <li>Keep your password private</li>
          </ul>
        </div>
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
      </div>
      <div className="mt-10 text-center text-white text-lg font-semibold">
        Compete, Learn, and Win!<br />
        <span className="text-purple-100 text-base font-normal">Join thousands of members testing their Bible knowledge every week.</span>
      </div>
    </div>
  );

  if (isSuccess) {
    return (
      <div className="min-h-screen flex flex-col md:flex-row">
        <div className="flex-1 flex flex-col justify-center items-center bg-white p-8 min-h-screen">
          <div className="w-full max-w-md text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Password Reset Successfully!</h2>
            <p className="text-gray-700 mb-6">Your password has been updated. You can now sign in with your new password.</p>
            <Button className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-full shadow-lg transition-all duration-300 mt-2" onClick={() => navigate('/auth/login')}>Sign In</Button>
          </div>
        </div>
        <RightPanel />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="flex-1 flex flex-col justify-center items-center bg-white p-8 min-h-screen">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Reset Your Password</h1>
          <p className="text-gray-600 mb-10 text-lg">Enter your new password below.</p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="password" className="block text-gray-700 font-semibold mb-2 text-base">New Password<span className="text-purple-600">*</span></Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-12 pr-10 h-12 border-gray-200 rounded-full bg-gray-50 focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition placeholder-gray-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div>
              <Label htmlFor="confirmPassword" className="block text-gray-700 font-semibold mb-2 text-base">Confirm New Password<span className="text-purple-600">*</span></Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-12 pr-10 h-12 border-gray-200 rounded-full bg-gray-50 focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition placeholder-gray-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-full shadow-lg transition-all duration-300 mt-2"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update Password"}
            </Button>
          </form>
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Remember your password?{' '}
              <Link to="/auth/login" className="text-purple-600 hover:text-purple-700 hover:underline font-semibold">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
      <RightPanel />
    </div>
  );
};

export default ResetPassword; 