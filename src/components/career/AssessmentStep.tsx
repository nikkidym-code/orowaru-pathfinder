import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { useState } from 'react';
import { useCareer } from '@/contexts/CareerContext';

export const AssessmentStep = () => {
  const { userProfile, setCurrentStep } = useCareer();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  // Dynamic questions based on user profile
  const getQuestions = () => {
    if (!userProfile) return [];

    const baseQuestions = [
      "Describe your experience with complex problem-solving in your current or recent role.",
      "How do you approach learning new technologies or skills relevant to your field?",
      "Tell us about a time when you had to work effectively in a team environment."
    ];

    // Add specific questions based on user profile
    if (userProfile.hasGoal && userProfile.targetRole) {
      baseQuestions.push(
        `What specific experience do you have that relates to your target role as a ${userProfile.targetRole}?`,
        `What skills do you think you need to develop most to succeed as a ${userProfile.targetRole}?`
      );
    }

    if (userProfile.careerStage === 'shifter') {
      baseQuestions.push(
        "What transferable skills from your current field would be valuable in your target industry?",
        "What motivated your decision to change career direction?"
      );
    }

    if (userProfile.careerStage === 'advancer') {
      baseQuestions.push(
        "Describe your experience with leadership or mentoring others.",
        "What organizational outcomes have you been responsible for in your role?"
      );
    }

    return baseQuestions.slice(0, 6); // Limit to 6 questions max
  };

  const questions = getQuestions();

  const handleAnswerChange = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // All questions completed, move to Te Orowaru evaluation
      setCurrentStep(5);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Quick Assessment</h2>
        <p className="text-muted-foreground">
          A few questions to better understand your experience and goals
        </p>
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <Progress value={progress} className="w-full" />
      </div>

      <Card className="p-8">
        <div className="space-y-6">
          <div>
            <Label className="text-lg font-medium mb-4 block">
              {questions[currentQuestion]}
            </Label>
            <Textarea
              placeholder="Share your experience and thoughts..."
              value={answers[currentQuestion] || ''}
              onChange={(e) => handleAnswerChange(e.target.value)}
              rows={6}
              className="w-full"
            />
          </div>

          <div className="flex justify-between pt-4">
            <Button 
              variant="outline" 
              onClick={currentQuestion === 0 ? () => setCurrentStep(3) : handlePrevious}
            >
              {currentQuestion === 0 ? 'Back to Resume' : 'Previous Question'}
            </Button>
            <Button 
              onClick={handleNext}
              disabled={!answers[currentQuestion]?.trim()}
            >
              {currentQuestion === questions.length - 1 ? 'Complete Assessment' : 'Next Question'}
            </Button>
          </div>
        </div>
      </Card>

      {/* Answer Summary */}
      {answers.length > 0 && (
        <Card className="mt-6 p-6">
          <h3 className="font-semibold mb-4">Your Progress</h3>
          <div className="space-y-2">
            {questions.map((question, index) => (
              <div 
                key={index} 
                className={`flex items-center text-sm ${
                  index === currentQuestion ? 'text-primary font-medium' : 
                  answers[index] ? 'text-success' : 'text-muted-foreground'
                }`}
              >
                <div className={`w-2 h-2 rounded-full mr-3 ${
                  index === currentQuestion ? 'bg-primary' :
                  answers[index] ? 'bg-success' : 'bg-muted'
                }`} />
                Question {index + 1}
                {index === currentQuestion && ' (Current)'}
                {answers[index] && index !== currentQuestion && ' ✓'}
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};