import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RoleSelector } from '@/components/ui/role-selector';
import { useState } from 'react';
import { useCareer } from '@/contexts/CareerContext';
import { CareerStage } from '@/types/career';

export const ProfileStep = () => {
  const { userProfile, setUserProfile, setCurrentStep } = useCareer();
  const [careerStage, setCareerStage] = useState<CareerStage>('starter');
  const [hasGoal, setHasGoal] = useState(false);
  const [targetRoles, setTargetRoles] = useState<string[]>([]);
  const [objectives, setObjectives] = useState<string[]>([]);
  const [interests, setInterests] = useState('');
  const [timeframe, setTimeframe] = useState('');
  const [preferences, setPreferences] = useState('');

  const careerStages = [
    { value: 'starter', label: 'Starter', description: 'Launching my first career or entering the workforce' },
    { value: 'shifter', label: 'Shifter', description: 'Transitioning into a new role or industry' },
    { value: 'advancer', label: 'Advancer', description: 'Progressing and growing within my current field' },
    { value: 'explorer', label: 'Explorer', description: 'Considering and evaluating multiple career paths' },
  ];

  const objectiveOptions = [
    'Find a new job',
    'Change career direction',
    'Get promoted',
    'Develop new skills',
    'Improve work-life balance',
    'Increase salary',
    'Leadership development',
    'Start my own business',
  ];

  const timeframeOptions = [
    '1-3 months',
    '3-6 months',
    '6-12 months',
    '1-2 years',
    '2+ years',
  ];

  const handleObjectiveChange = (objective: string, checked: boolean) => {
    if (checked) {
      setObjectives([...objectives, objective]);
    } else {
      setObjectives(objectives.filter(obj => obj !== objective));
    }
  };

  const handleNext = () => {
    if (userProfile) {
      setUserProfile({
        ...userProfile,
        careerStage,
        hasGoal,
        targetRole: hasGoal && targetRoles.length > 0 ? targetRoles[0] : undefined,
        objectives,
        interests: interests.split(',').map(i => i.trim()).filter(i => i),
        timeframe,
        preferences,
      });
      setCurrentStep(2);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Tell Us About Yourself</h2>
        <p className="text-muted-foreground">
          This helps us understand your career situation and provide personalized guidance
        </p>
      </div>

      <div className="space-y-8">
        {/* Career Stage */}
        <Card className="p-6">
          <Label className="text-lg font-semibold mb-4 block">
            What is your current career stage?
          </Label>
          <RadioGroup value={careerStage} onValueChange={(value) => setCareerStage(value as CareerStage)}>
            <div className="grid md:grid-cols-2 gap-4">
              {careerStages.map((stage) => (
                <div key={stage.value} className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-accent/50 transition-colors">
                  <RadioGroupItem value={stage.value} id={stage.value} className="mt-0.5" />
                  <div className="flex-1">
                    <Label htmlFor={stage.value} className="font-medium cursor-pointer">
                      {stage.label}
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">{stage.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </RadioGroup>
        </Card>

        {/* Goal Clarity */}
        <Card className="p-6">
          <Label className="text-lg font-semibold mb-4 block">
            Do you have a clear target role in mind?
          </Label>
          <RadioGroup value={hasGoal.toString()} onValueChange={(value) => setHasGoal(value === 'true')}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="true" id="has-goal" />
              <Label htmlFor="has-goal">Yes, I have a specific role in mind</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="false" id="no-goal" />
              <Label htmlFor="no-goal">No, I'm exploring my options</Label>
            </div>
          </RadioGroup>
          
          {hasGoal && (
            <div className="mt-4">
              <Label className="text-sm font-medium mb-2 block">
                What role(s) are you targeting?
              </Label>
              <RoleSelector
                selectedRoles={targetRoles}
                onRolesChange={setTargetRoles}
                placeholder="Search for roles or add your own..."
                maxRoles={3}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Start typing to see suggestions or add custom roles. You can select up to 3 roles.
              </p>
            </div>
          )}
        </Card>

        {/* Objectives */}
        <Card className="p-6">
          <Label className="text-lg font-semibold mb-4 block">
            What do you want to achieve? (Select all that apply)
          </Label>
          <div className="grid md:grid-cols-2 gap-3">
            {objectiveOptions.map((objective) => (
              <div key={objective} className="flex items-center space-x-2">
                <Checkbox
                  id={objective}
                  checked={objectives.includes(objective)}
                  onCheckedChange={(checked) => handleObjectiveChange(objective, checked as boolean)}
                />
                <Label htmlFor={objective} className="text-sm cursor-pointer">
                  {objective}
                </Label>
              </div>
            ))}
          </div>
        </Card>

        {/* Interests */}
        <Card className="p-6">
          <Label htmlFor="interests" className="text-lg font-semibold mb-2 block">
            What are your areas of interest?
          </Label>
          <Textarea
            id="interests"
            placeholder="e.g., technology, healthcare, finance, education (separate with commas)"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            className="mt-1"
            rows={3}
          />
        </Card>

        {/* Timeframe */}
        <Card className="p-6">
          <Label className="text-lg font-semibold mb-4 block">
            What is your timeframe for achieving your goal?
          </Label>
          <RadioGroup value={timeframe} onValueChange={setTimeframe}>
            <div className="grid md:grid-cols-3 gap-3">
              {timeframeOptions.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={option} />
                  <Label htmlFor={option} className="text-sm cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </Card>

        {/* Preferences */}
        <Card className="p-6">
          <Label htmlFor="preferences" className="text-lg font-semibold mb-2 block">
            Any preferences or concerns we should consider?
          </Label>
          <Textarea
            id="preferences"
            placeholder="e.g., work-life balance, remote work, salary expectations, location constraints"
            value={preferences}
            onChange={(e) => setPreferences(e.target.value)}
            rows={3}
          />
        </Card>

        <div className="flex justify-between pt-6">
          <Button variant="outline" onClick={() => setCurrentStep(0)}>
            Back
          </Button>
          <Button 
            onClick={handleNext}
            disabled={!careerStage || !timeframe || objectives.length === 0}
          >
            Continue to Resume Upload
          </Button>
        </div>
      </div>
    </div>
  );
};