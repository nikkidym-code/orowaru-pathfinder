import { useCareer } from '@/contexts/CareerContext';
import { ProgressIndicator } from './career/ProgressIndicator';
import { WelcomeStep } from './career/WelcomeStep';
import { ValuesStep } from './career/ValuesStep';
import { ProfileStep } from './career/ProfileStep';
import { ResumeStep } from './career/ResumeStep';
import { AssessmentStep } from './career/AssessmentStep';
import { TeOrowaruReport } from './career/TeOrowaruReport';
import { ActionPlanStep } from './career/ActionPlanStep';
import { Dashboard } from './career/Dashboard';

const stepTitles = [
  'Welcome',
  'Values',
  'Profile',
  'Resume',
  'Assessment',
  'Report',
  'Plan',
  'Dashboard'
];

export const CareerJourney = () => {
  const { currentStep } = useCareer();

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <WelcomeStep />;
      case 1:
        return <ValuesStep />;
      case 2:
        return <ProfileStep />;
      case 3:
        return <ResumeStep />;
      case 4:
        return <AssessmentStep />;
      case 5:
        return <TeOrowaruReport />;
      case 6:
        return <ActionPlanStep />;
      case 7:
        return <Dashboard />;
      default:
        return <WelcomeStep />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {currentStep > 0 && currentStep < 7 && (
        <ProgressIndicator
          currentStep={currentStep}
          totalSteps={stepTitles.length}
          stepTitles={stepTitles}
        />
      )}
      {renderStep()}
    </div>
  );
};