import { useCareer } from '@/contexts/CareerContext';
import { ProgressIndicator } from './career/ProgressIndicator';
import { WelcomeStep } from './career/WelcomeStep';
import { ValuesStep } from './career/ValuesStep';
import { AptitudesStep } from './career/AptitudesStep';
import { InterestsStep } from './career/InterestsStep';
import { WorkingPreferencesStep } from './career/WorkingPreferencesStep';
import { TeOrowaruReport } from './career/TeOrowaruReport';
import { ActionPlanPreferencesStep } from './career/ActionPlanPreferencesStep';
import { ActionPlanStep } from './career/ActionPlanStep';
import { Dashboard } from './career/Dashboard';

const stepTitles = [
  'Entry & Orientation',
  'Values Assessment', 
  'Aptitudes Assessment',
  'Interests Exploration',
  'Working Preferences',
  'Report',
  'Preferences',
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
        return <AptitudesStep />;
      case 3:
        return <InterestsStep />;
      case 4:
        return <WorkingPreferencesStep />;
      case 5:
        return <TeOrowaruReport />;
      case 6:
        return <ActionPlanPreferencesStep />;
      case 7:
        return <ActionPlanStep />;
      case 8:
        return <Dashboard />;
      default:
        return <WelcomeStep />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {currentStep > 0 && currentStep < 5 && (
        <ProgressIndicator
          currentStep={currentStep}
          totalSteps={5}
          stepTitles={stepTitles.slice(0, 5)}
        />
      )}
      {renderStep()}
    </div>
  );
};