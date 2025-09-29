import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { ArrowLeft, ArrowRight, Users, Home, Target, Lightbulb, BarChart, GraduationCap } from 'lucide-react';
import { useCareer } from '@/contexts/CareerContext';

const workingDimensions = [
  {
    id: 'collaboration',
    title: 'Collaboration Style',
    icon: Users,
    description: 'How do you prefer to work with others?',
    leftLabel: 'Independent Work',
    rightLabel: 'Team Collaboration',
    leftDesc: 'I prefer working autonomously with minimal supervision',
    rightDesc: 'I thrive in collaborative team environments'
  },
  {
    id: 'environment',
    title: 'Work Environment',
    icon: Home,
    description: 'What is your ideal work setting?',
    options: [
      { label: 'Fully Remote', value: 'remote' },
      { label: 'Hybrid', value: 'hybrid' },
      { label: 'Fully In-Office', value: 'office' },
      { label: 'Flexible/Variable', value: 'flexible' }
    ]
  },
  {
    id: 'motivation',
    title: 'Motivation Drivers',
    icon: Target,
    description: 'What motivates you most in your work?',
    options: [
      { label: 'Mission & Purpose', value: 'mission' },
      { label: 'Financial Rewards', value: 'financial' },
      { label: 'Creative Expression', value: 'creativity' },
      { label: 'Technical Mastery', value: 'technical' },
      { label: 'Leadership & Impact', value: 'leadership' },
      { label: 'Work-Life Balance', value: 'balance' }
    ]
  },
  {
    id: 'problemSolving',
    title: 'Problem Solving',
    icon: Lightbulb,
    description: 'How do you approach challenges?',
    leftLabel: 'Research-Oriented',
    rightLabel: 'Action-Oriented',
    leftDesc: 'I prefer to thoroughly research before acting',
    rightDesc: 'I prefer to take quick action and iterate'
  },
  {
    id: 'decisionMaking',
    title: 'Decision Making',
    icon: BarChart,
    description: 'How do you make important decisions?',
    leftLabel: 'Data-Driven',
    rightLabel: 'Intuition-Based',
    leftDesc: 'I rely heavily on data and analysis',
    rightDesc: 'I trust my instincts and gut feelings'
  },
  {
    id: 'growth',
    title: 'Growth Methods',
    icon: GraduationCap,
    description: 'How do you prefer to learn and develop?',
    options: [
      { label: 'Formal Training & Courses', value: 'formal' },
      { label: 'Mentorship & Coaching', value: 'mentorship' },
      { label: 'Self-Directed Learning', value: 'self-directed' },
      { label: 'Learning by Teaching Others', value: 'teaching' },
      { label: 'Hands-On Experience', value: 'experience' },
      { label: 'Peer Learning & Collaboration', value: 'peer' }
    ]
  }
];

export const WorkingPreferencesStep = () => {
  const [preferences, setPreferences] = useState<Record<string, any>>({});
  
  const { setCurrentStep, userProfile, setUserProfile } = useCareer();

  const handleSliderChange = (dimensionId: string, value: number[]) => {
    setPreferences(prev => ({ ...prev, [dimensionId]: value[0] }));
  };

  const handleOptionSelect = (dimensionId: string, value: string) => {
    setPreferences(prev => ({ ...prev, [dimensionId]: value }));
  };

  const handleMultiSelect = (dimensionId: string, value: string) => {
    const current = preferences[dimensionId] || [];
    const updated = current.includes(value)
      ? current.filter((v: string) => v !== value)
      : [...current, value];
    setPreferences(prev => ({ ...prev, [dimensionId]: updated }));
  };

  const getWorkStyleLabel = () => {
    const collaboration = preferences.collaboration || 3;
    const environment = preferences.environment;
    const motivation = preferences.motivation;
    
    let style = '';
    
    if (collaboration >= 4) style += 'Collaborative ';
    else if (collaboration <= 2) style += 'Independent ';
    else style += 'Balanced ';
    
    if (environment === 'remote') style += 'Remote Worker';
    else if (environment === 'office') style += 'Office-Based Professional';
    else style += 'Flexible Professional';
    
    return style;
  };

  const handleNext = () => {
    console.log('Completing working preferences step, moving to Te Orowaru Report');
    const workPreferencesProfile = {
      preferences,
      workStyleLabel: getWorkStyleLabel(),
      completedAt: new Date().toISOString()
    };
    
    setUserProfile({
      ...userProfile!,
      workPreferencesProfile
    });
    setCurrentStep(6); // Go to Te Orowaru Report step
  };

  const canProceed = () => {
    return Object.keys(preferences).length >= 4; // At least 4 dimensions answered
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Working Preferences
          </h1>
          <p className="text-xl text-muted-foreground">
            Define your work style and environment preferences
          </p>
        </div>

        <div className="space-y-8">
          {workingDimensions.map((dimension) => (
            <Card key={dimension.id} className="p-8 shadow-lg border-0 bg-card/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <dimension.icon className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-semibold">{dimension.title}</h2>
              </div>
              
              <p className="text-muted-foreground mb-6">{dimension.description}</p>

              {dimension.leftLabel && dimension.rightLabel ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{dimension.leftLabel}</span>
                    <span>{dimension.rightLabel}</span>
                  </div>
                  
                  <Slider
                    value={[preferences[dimension.id] || 3]}
                    onValueChange={(value) => handleSliderChange(dimension.id, value)}
                    max={5}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span className="max-w-[45%]">{dimension.leftDesc}</span>
                    <span className="max-w-[45%] text-right">{dimension.rightDesc}</span>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {dimension.options?.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        if (dimension.id === 'motivation' || dimension.id === 'growth') {
                          handleMultiSelect(dimension.id, option.value);
                        } else {
                          handleOptionSelect(dimension.id, option.value);
                        }
                      }}
                      className={`p-4 rounded-lg border text-left transition-all ${
                        dimension.id === 'motivation' || dimension.id === 'growth'
                          ? (preferences[dimension.id] || []).includes(option.value)
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border hover:border-primary/50'
                          : preferences[dimension.id] === option.value
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <span className="font-medium">{option.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </Card>
          ))}

          {Object.keys(preferences).length >= 3 && (
            <Card className="p-6 shadow-lg border-0 bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-sm">
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Your Work Style Profile
              </h3>
              <p className="text-lg font-medium text-primary">{getWorkStyleLabel()}</p>
              <p className="text-sm text-muted-foreground mt-2">
                This profile will help us recommend the most suitable career paths and work environments for you.
              </p>
            </Card>
          )}
        </div>

        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(3)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="flex items-center gap-2"
          >
            Continue to Report
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};