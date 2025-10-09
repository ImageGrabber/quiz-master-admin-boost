import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Key } from 'lucide-react';
import { getVapidPublicKey, getVapidPrivateKey, getVapidSubject } from '@/config/vapid';

const VapidTest: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const publicKey = getVapidPublicKey();
  const privateKey = getVapidPrivateKey();
  const subject = getVapidSubject();

  const isConfigured = publicKey && privateKey && subject;

  if (!isVisible) {
    return (
      <Button
        onClick={() => setIsVisible(true)}
        variant="outline"
        size="sm"
        className="fixed bottom-4 right-4 z-50"
      >
        <Key className="h-4 w-4 mr-2" />
        Test VAPID
      </Button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-4">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            VAPID Keys Test
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              {publicKey ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <XCircle className="h-4 w-4 text-red-500" />
              )}
              <span className="text-sm">Public Key: {publicKey ? 'Loaded' : 'Missing'}</span>
            </div>
            
            <div className="flex items-center gap-2">
              {privateKey ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <XCircle className="h-4 w-4 text-red-500" />
              )}
              <span className="text-sm">Private Key: {privateKey ? 'Loaded' : 'Missing'}</span>
            </div>
            
            <div className="flex items-center gap-2">
              {subject ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <XCircle className="h-4 w-4 text-red-500" />
              )}
              <span className="text-sm">Subject: {subject ? 'Loaded' : 'Missing'}</span>
            </div>
          </div>

          <div className="text-xs text-gray-600 space-y-1">
            <p><strong>Public Key:</strong> {publicKey?.substring(0, 20)}...</p>
            <p><strong>Subject:</strong> {subject}</p>
            <p><strong>Status:</strong> {isConfigured ? '✅ Ready' : '❌ Not Configured'}</p>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={() => setIsVisible(false)}
              variant="outline"
              className="flex-1"
            >
              Close
            </Button>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(publicKey || '');
                alert('Public key copied to clipboard!');
              }}
              disabled={!publicKey}
              className="flex-1"
            >
              Copy Public Key
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VapidTest;
