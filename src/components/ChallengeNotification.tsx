import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Trophy, Clock, User, X } from 'lucide-react';

interface ChallengeNotificationProps {
  challengeRequest: any;
  onAccept: (challengeId: string) => void;
  onDecline: (challengeId: string) => void;
  onClose: () => void;
}

const ChallengeNotification: React.FC<ChallengeNotificationProps> = ({
  challengeRequest,
  onAccept,
  onDecline,
  onClose
}) => {
  const { toast } = useToast();
  const [challengerInfo, setChallengerInfo] = useState<any>(null);
  const [quizInfo, setQuizInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadChallengeDetails = async () => {
      try {
        // Get challenger info
        const { data: challengerData } = await supabase
          .from('profiles')
          .select('full_name, display_name')
          .eq('id', challengeRequest.challenger_id)
          .single();

        // Get quiz info
        const { data: quizData } = await supabase
          .from('user_created_quizzes')
          .select('title, description')
          .eq('id', challengeRequest.quiz_id)
          .single();

        setChallengerInfo(challengerData);
        setQuizInfo(quizData);
      } catch (error) {
        console.error('Error loading challenge details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadChallengeDetails();
  }, [challengeRequest]);

  const handleAccept = () => {
    onAccept(challengeRequest.id);
    toast({
      title: "Challenge Accepted!",
      description: "You've accepted the challenge. Get ready for battle!",
    });
  };

  const handleDecline = () => {
    onDecline(challengeRequest.id);
    toast({
      title: "Challenge Declined",
      description: "You've declined the challenge.",
    });
  };

  const getChallengerName = () => {
    if (challengerInfo) {
      return challengerInfo.display_name || challengerInfo.full_name || 'Unknown Player';
    }
    // Try to get name from challenge request data
    if (challengeRequest.challenger?.display_name) {
      return challengeRequest.challenger.display_name;
    }
    if (challengeRequest.challenger_id) {
      return `Player ${challengeRequest.challenger_id.substring(0, 8)}`;
    }
    return 'Unknown Player';
  };

  const getQuizTitle = () => {
    if (quizInfo?.title) {
      return quizInfo.title;
    }
    // Try to get quiz title from challenge request data
    if (challengeRequest.quiz?.title) {
      return challengeRequest.quiz.title;
    }
    return 'Quiz Challenge';
  };

  if (isLoading) {
    return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading challenge details...</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
              <Trophy className="h-6 w-6 text-white" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold text-gray-900">
                Challenge Received!
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                Someone wants to challenge you to a quiz battle
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          {/* Challenger Info */}
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <Avatar>
              <AvatarFallback>
                {getChallengerName().charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="font-medium text-gray-900">{getChallengerName()}</div>
              <div className="text-sm text-gray-600">wants to challenge you!</div>
            </div>
          </div>

          {/* Quiz Info */}
          <div className="p-4 border rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="h-4 w-4 text-blue-600" />
              <span className="font-medium text-gray-900">Quiz: {getQuizTitle()}</span>
            </div>
            {quizInfo?.description && (
              <p className="text-sm text-gray-600">{quizInfo.description}</p>
            )}
          </div>

          {/* Challenge Message */}
          {challengeRequest.message && (
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <User className="h-4 w-4 text-blue-600" />
                <span className="font-medium text-gray-900">Message:</span>
              </div>
              <p className="text-sm text-gray-700 italic">"{challengeRequest.message}"</p>
            </div>
          )}

          {/* Expiry Info */}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock className="h-4 w-4" />
            <span>This challenge expires in 5 minutes</span>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={handleDecline}
            className="flex-1"
          >
            <X className="h-4 w-4 mr-2" />
            Decline
          </Button>
          <Button
            onClick={handleAccept}
            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
          >
            <Trophy className="h-4 w-4 mr-2" />
            Accept Challenge
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChallengeNotification;
