import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
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

  // Right panel (same as register/login)
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

  if (isSuccess) {
    return (
      <div className="min-h-screen flex flex-col md:flex-row">
        <div className="flex-1 flex flex-col justify-center items-center bg-white p-8 min-h-screen">
          <div className="w-full max-w-md text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Check Your Email</h2>
            <p className="text-gray-700 mb-6">We've sent a password reset link to <span className="font-semibold">{email}</span></p>
            <p className="text-gray-600 mb-8 text-base">Didn't receive the email? Check your spam folder or <button onClick={() => setIsSuccess(false)} className="text-purple-600 hover:text-purple-700 hover:underline font-medium">try again</button></p>
            <Button className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-full shadow-lg transition-all duration-300 mt-2" onClick={() => navigate('/auth/login')}>Back to Login</Button>
          </div>
        </div>
        <div className="hidden md:flex flex-1">
          <RightPanel />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="flex-1 flex flex-col justify-center items-center bg-white p-8 min-h-screen">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Forgot Password?</h1>
          <p className="text-gray-600 mb-10 text-lg">Enter your email to receive a reset link.</p>
          <form onSubmit={handleSubmit} className="space-y-6">
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
            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-full shadow-lg transition-all duration-300 mt-2"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send Reset Link"}
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
      <div className="hidden md:flex flex-1">
        <RightPanel />
      </div>
    </div>
  );
};

export default ForgotPassword; 