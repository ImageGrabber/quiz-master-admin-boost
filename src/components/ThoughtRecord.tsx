import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X, ArrowRight, ArrowLeft, Check } from 'lucide-react';

export type ThoughtRecordData = {
  id: string;
  date: string;
  step1: string; // Situation
  step2: { emotion: string; intensity: number }[]; // Emotions with intensity
  step3: string; // Automatic Negative Thought
  step4: string[]; // Distortions
  step5: string; // Challenge answers
  step6: string; // Alternative thought
  step7: { emotion: string; originalIntensity: number; newIntensity: number }[]; // Re-rated emotions
  thinkingPattern?: string; // The identified thinking pattern
};

type ThoughtRecordProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (record: ThoughtRecordData) => void;
  identifiedPattern?: string; // Pre-identified thinking pattern
  userEmotion?: string; // User's emotion from homepage
};

const DISTORTIONS = [
  'Catastrophizing',
  'Self-Blame',
  'Overgeneralization',
  'Mind Reading',
  'Fortune Telling',
  'All-or-Nothing Thinking',
  'Labeling',
  'Mental Filter',
  'Comparison',
  'Jumping to Conclusions',
  'Personalization'
];

const CHALLENGE_QUESTIONS = [
  'What is the evidence for this thought?',
  'What is the evidence against this thought?',
  'What would I tell a friend if they had this exact thought?',
  'What is a more balanced or realistic way of looking at this?'
];

export default function ThoughtRecord({ isOpen, onClose, onSave, identifiedPattern, userEmotion }: ThoughtRecordProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [step1, setStep1] = useState('');
  const [step2, setStep2] = useState<{ emotion: string; intensity: number }[]>([
    { emotion: userEmotion || 'Anxious', intensity: 80 }
  ]);
  const [step3, setStep3] = useState('');
  const [step4, setStep4] = useState<string[]>(identifiedPattern ? [identifiedPattern] : []);
  const [step5, setStep5] = useState('');
  const [step6, setStep6] = useState('');
  const [step7, setStep7] = useState<{ emotion: string; originalIntensity: number; newIntensity: number }[]>([]);

  useEffect(() => {
    if (isOpen) {
      console.log('ThoughtRecord modal is open, current step:', currentStep);
    }
  }, [isOpen, currentStep]);

  useEffect(() => {
    if (isOpen && userEmotion) {
      setStep2([{ emotion: userEmotion, intensity: 80 }]);
    }
    if (isOpen && identifiedPattern) {
      setStep4([identifiedPattern]);
    }
  }, [isOpen, userEmotion, identifiedPattern]);

  useEffect(() => {
    // Initialize step7 with step2 data when moving to step 7
    if (currentStep === 7 && step7.length === 0) {
      setStep7(step2.map(e => ({ emotion: e.emotion, originalIntensity: e.intensity, newIntensity: e.intensity })));
    }
  }, [currentStep, step2, step7.length]);

  const handleAddEmotion = () => {
    setStep2([...step2, { emotion: '', intensity: 50 }]);
  };

  const handleUpdateEmotion = (index: number, field: 'emotion' | 'intensity', value: string | number) => {
    const updated = [...step2];
    updated[index] = { ...updated[index], [field]: value };
    setStep2(updated);
  };

  const handleRemoveEmotion = (index: number) => {
    setStep2(step2.filter((_, i) => i !== index));
  };

  const handleToggleDistortion = (distortion: string) => {
    if (step4.includes(distortion)) {
      setStep4(step4.filter(d => d !== distortion));
    } else {
      setStep4([...step4, distortion]);
    }
  };

  const handleUpdateStep7Intensity = (index: number, newIntensity: number) => {
    const updated = [...step7];
    updated[index] = { ...updated[index], newIntensity };
    setStep7(updated);
  };

  const handleNext = () => {
    if (currentStep < 7) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSave = () => {
    const record: ThoughtRecordData = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      step1,
      step2,
      step3,
      step4,
      step5,
      step6,
      step7,
      thinkingPattern: identifiedPattern
    };
    onSave(record);
    handleReset();
    onClose();
  };

  const handleReset = () => {
    setCurrentStep(1);
    setStep1('');
    setStep2([{ emotion: userEmotion || 'Anxious', intensity: 80 }]);
    setStep3('');
    setStep4(identifiedPattern ? [identifiedPattern] : []);
    setStep5('');
    setStep6('');
    setStep7([]);
  };

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    console.log('ThoughtRecord component - isOpen:', isOpen);
  }, []);

  useEffect(() => {
    console.log('ThoughtRecord component - isOpen:', isOpen);
  }, [isOpen]);

  if (!isOpen || !mounted) {
    console.log('ThoughtRecord: Modal is closed or not mounted, returning null');
    return null;
  }

  console.log('ThoughtRecord: Rendering modal with portal');

  const modalContent = (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4" 
      style={{ zIndex: 99999, position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col relative" style={{ zIndex: 100000 }}>
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-1">Cognitive Restructuring</h2>
            <p className="text-sm text-purple-100">Step {currentStep} of 7</p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="h-2 bg-gray-100">
          <div
            className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 transition-all duration-300"
            style={{ width: `${(currentStep / 7) * 100}%` }}
          />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 min-h-[400px]">
          {/* Step 1: The Situation */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Step 1: The Situation</h3>
              <p className="text-gray-600 mb-4">What situation or event triggered this feeling?</p>
              <Input
                type="text"
                placeholder="e.g., Thinking about my work meeting tomorrow"
                value={step1}
                onChange={(e) => setStep1(e.target.value)}
                className="w-full"
              />
            </div>
          )}

          {/* Step 2: The Emotion(s) */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Step 2: The Emotion(s)</h3>
              <p className="text-gray-600 mb-4">What emotions are you feeling? Rate their intensity (0-100%).</p>
              {step2.map((emotion, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <Input
                      type="text"
                      placeholder="Emotion (e.g., Anxious, Fear)"
                      value={emotion.emotion}
                      onChange={(e) => handleUpdateEmotion(index, 'emotion', e.target.value)}
                      className="flex-1"
                    />
                    {step2.length > 1 && (
                      <button
                        onClick={() => handleRemoveEmotion(index)}
                        className="text-red-500 hover:text-red-700 px-2"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Intensity</span>
                      <span className="text-sm font-semibold text-gray-900">{emotion.intensity}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={emotion.intensity}
                      onChange={(e) => handleUpdateEmotion(index, 'intensity', parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
              ))}
              <Button
                onClick={handleAddEmotion}
                variant="outline"
                className="w-full"
              >
                + Add Another Emotion
              </Button>
            </div>
          )}

          {/* Step 3: The Automatic Negative Thought */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Step 3: The Automatic Negative Thought (ANT)</h3>
              <p className="text-gray-600 mb-4">What exact thought or image went through your mind?</p>
              <textarea
                placeholder="e.g., I'm going to say the wrong thing and everyone will think I'm incompetent."
                value={step3}
                onChange={(e) => setStep3(e.target.value)}
                className="w-full p-4 text-base border-2 border-gray-400 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                style={{ 
                  minHeight: '120px', 
                  display: 'block', 
                  visibility: 'visible', 
                  opacity: 1,
                  resize: 'vertical',
                  fontFamily: 'inherit'
                }}
              />
            </div>
          )}

          {/* Step 4: Identify the Distortion(s) */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Step 4: Identify the Distortion(s)</h3>
              <p className="text-gray-600 mb-4">Let's identify the thinking pattern. Which of these apply?</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {DISTORTIONS.map((distortion) => (
                  <button
                    key={distortion}
                    onClick={() => handleToggleDistortion(distortion)}
                    className={`p-3 rounded-lg border-2 text-left transition-all ${
                      step4.includes(distortion)
                        ? 'border-purple-500 bg-purple-50 text-purple-900'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {step4.includes(distortion) && (
                        <Check className="w-5 h-5 text-purple-600" />
                      )}
                      <span className="text-sm font-medium">{distortion}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Challenge the Thought */}
          {currentStep === 5 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Step 5: Challenge the Thought</h3>
              <p className="text-gray-600 mb-4">Let's find the evidence. Answer these questions:</p>
              <div className="space-y-4">
                {CHALLENGE_QUESTIONS.map((question, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">{question}</p>
                  </div>
                ))}
              </div>
              <textarea
                placeholder="Write your answers to all the questions above..."
                value={step5}
                onChange={(e) => setStep5(e.target.value)}
                className="w-full p-4 text-base border-2 border-gray-400 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                style={{ 
                  minHeight: '200px', 
                  display: 'block', 
                  visibility: 'visible', 
                  opacity: 1,
                  resize: 'vertical',
                  fontFamily: 'inherit'
                }}
              />
            </div>
          )}

          {/* Step 6: The Alternative (Balanced) Thought */}
          {currentStep === 6 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Step 6: The Alternative (Balanced) Thought</h3>
              <p className="text-gray-600 mb-4">Now, write a new, more balanced thought based on your answers.</p>
              <textarea
                placeholder="e.g., I am feeling nervous about the meeting, but I am prepared. Even if I stumble on a few words, it doesn't mean I'm incompetent. I will do my best."
                value={step6}
                onChange={(e) => setStep6(e.target.value)}
                className="w-full p-4 text-base border-2 border-gray-400 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                style={{ 
                  minHeight: '150px', 
                  display: 'block', 
                  visibility: 'visible', 
                  opacity: 1,
                  resize: 'vertical',
                  fontFamily: 'inherit'
                }}
              />
            </div>
          )}

          {/* Step 7: Re-Rate Emotion */}
          {currentStep === 7 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Step 7: Re-Rate Emotion</h3>
              <p className="text-gray-600 mb-4">How do you feel now? Rate your original emotion(s) again.</p>
              {step7.map((emotion, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">{emotion.emotion}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-600">
                        Was: <span className="font-semibold">{emotion.originalIntensity}%</span>
                      </span>
                      <span className="text-sm text-gray-600">
                        Now: <span className="font-semibold text-purple-600">{emotion.newIntensity}%</span>
                      </span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={emotion.newIntensity}
                    onChange={(e) => handleUpdateStep7Intensity(index, parseInt(e.target.value))}
                    className="w-full"
                  />
                  {emotion.newIntensity < emotion.originalIntensity && (
                    <p className="text-sm text-green-600 font-medium">
                      ✓ Great progress! Your intensity decreased by {emotion.originalIntensity - emotion.newIntensity}%
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 flex items-center justify-between gap-4">
          <Button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>
          <div className="flex gap-2">
            {currentStep < 7 ? (
              <Button
                onClick={handleNext}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              >
                Next
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSave}
                className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              >
                <Check className="w-4 h-4" />
                Save Thought Record
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

