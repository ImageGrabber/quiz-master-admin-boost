import React from 'react';
import * as Sentry from '@sentry/react';
import { Helmet } from 'react-helmet';

// Add this button component to your app to test Sentry's error tracking
function ErrorButton() {
  return (
    <button
      onClick={() => {
        try {
          throw new Error('This is your first error!');
        } catch (error) {
          Sentry.captureException(error);
          console.error('Error captured and sent to Sentry:', error);
        }
      }}
      className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
    >
      Break the world
    </button>
  );
}

const SentryTest = () => {
  const handleTestMessage = () => {
    Sentry.captureMessage('Test message from Sentry test page', 'info');
    alert('Test message sent to Sentry! Check your Sentry dashboard.');
  };

  const handleTestException = () => {
    try {
      throw new Error('This is your first error!');
    } catch (error) {
      Sentry.captureException(error);
      alert('Error sent to Sentry! Check your Sentry dashboard.');
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <Helmet>
        <title>Sentry Test</title>
      </Helmet>
      <div className="text-center space-y-6 max-w-md">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Sentry Error Test
        </h1>
        <p className="text-gray-600 mb-8">
          Test your Sentry integration by sending a message or triggering an error.
        </p>
        <div className="space-y-4">
          <button
            onClick={handleTestMessage}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Send Test Message
          </button>
          <ErrorButton />
          <button
            onClick={handleTestException}
            className="w-full px-6 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors"
          >
            Send Test Exception
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-8">
          Check your browser console and Sentry dashboard for results.
        </p>
      </div>
    </div>
  );
};

export default SentryTest;

