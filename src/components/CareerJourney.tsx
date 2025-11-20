import { useCareer } from '@/contexts/CareerContext';
import { ProgressIndicator } from './career/ProgressIndicator';
import { WelcomeStep } from './career/WelcomeStep';
import { OrientationStep } from './career/OrientationStep';
import { ValuesStep } from './career/ValuesStep';
import { AptitudesStep } from './career/AptitudesStep';
import { InterestsStep } from './career/InterestsStep';
import { WorkingPreferencesStep } from './career/WorkingPreferencesStep';
import { TeOrowaruReport } from './career/TeOrowaruReport';
import { ActionPlanPreferencesStep } from './career/ActionPlanPreferencesStep';
import { ActionPlanStep } from './career/ActionPlanStep';
import { Dashboard } from './career/Dashboard';

const stepTitles = [
  'Welcome',
  'Orientation',
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
  
  console.log('CareerJourney rendering, currentStep:', currentStep);

  const renderStep = () => {
    console.log('renderStep called with currentStep:', currentStep);
    
    // Debug: log all step transitions
    if (currentStep < 0 || currentStep > 9) {
      console.error('Invalid currentStep:', currentStep);
      return <WelcomeStep />;
    }
    
    switch (currentStep) {
      case 0:
        console.log('Rendering WelcomeStep');
        return <WelcomeStep />;
      case 1:
        console.log('Rendering OrientationStep');
        return <OrientationStep />;
      case 2:
        console.log('Rendering ValuesStep');
        return <ValuesStep />;
      case 3:
        console.log('Rendering AptitudesStep');
        return <AptitudesStep />;
      case 4:
        console.log('Rendering InterestsStep');
        return <InterestsStep />;
      case 5:
        console.log('Rendering WorkingPreferencesStep');
        return <WorkingPreferencesStep />;
      case 6:
        console.log('Rendering TeOrowaruReport');
        return <TeOrowaruReport />;
      case 7:
        console.log('Rendering ActionPlanPreferencesStep');
        return <ActionPlanPreferencesStep />;
      case 8:
        console.log('Rendering ActionPlanStep');
        return <ActionPlanStep />;
      case 9:
        console.log('Rendering Dashboard');
        return <Dashboard />;
      default:
        console.log('Default case hit - rendering WelcomeStep');
        return <WelcomeStep />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {currentStep > 1 && currentStep < 6 && (
        <ProgressIndicator
          currentStep={currentStep - 1}
          totalSteps={5}
          stepTitles={stepTitles.slice(1, 6)}
        />
      )}
      {renderStep()}
    </div>
  );
};