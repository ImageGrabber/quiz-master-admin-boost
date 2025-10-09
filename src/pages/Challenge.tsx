import React from 'react';
import { useParams } from 'react-router-dom';
import ChallengeInterface from '@/components/ChallengeInterface';
import ChallengeSession from '@/components/ChallengeSession';
import Header from '@/components/Header';

const Challenge: React.FC = () => {
  const { challengeSessionId } = useParams<{ challengeSessionId?: string }>();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        {challengeSessionId ? (
          <ChallengeSession challengeSessionId={challengeSessionId} />
        ) : (
          <ChallengeInterface />
        )}
      </main>
    </div>
  );
};

export default Challenge;
