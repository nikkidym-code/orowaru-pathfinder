import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BrainCircuit, Target, TrendingUp, Users } from 'lucide-react';
import { useState } from 'react';
import { useCareer } from '@/contexts/CareerContext';
import heroImage from '@/assets/hero-image.jpg';
export const WelcomeStep = () => {
  const [email, setEmail] = useState('');
  const {
    setCurrentStep,
    setUserProfile
  } = useCareer();
  const handleStart = () => {
    if (email) {
      setUserProfile({
        id: Date.now().toString(),
        email,
        careerStage: 'starter',
        hasGoal: false,
        objectives: [],
        interests: [],
        timeframe: ''
      });
      setCurrentStep(1);
    }
  };
  const features = [{
    icon: BrainCircuit,
    title: 'Personalized Guidance',
    description: 'Personalized career maps based on your unique profile and aspirations'
  }, {
    icon: Target,
    title: 'YourVue',
    description: 'Bespoke, comprehensive scoring assessment for precise career mapping'
  }, {
    icon: TrendingUp,
    title: 'Personalized Plans',
    description: 'Take action with measurable milestones and progress tracking tailored to your own needs'
  }, {
    icon: Users,
    title: 'On-Going Support',
    description: 'Forge a path that develops as you do, with realtime adjustments to meet your needs, no one elses'
  }];
  return <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{
        backgroundImage: `url(${heroImage})`
      }} />
        <div className="relative max-w-6xl mx-auto px-6 py-20">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Your Vue</h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">Take control of your career and forge your own Vue. Assess your future readiness with the Vue Scoring Assessment, receive personalized development plans that grow with you, and join a people-first community.</p>
            
            <Card className="max-w-md mx-auto p-6 shadow-lg border-0 bg-card/80 backdrop-blur-sm">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </Label>
                  <Input id="email" type="email" placeholder="Enter your email to get started" value={email} onChange={e => setEmail(e.target.value)} className="mt-1" />
                </div>
                <Button onClick={handleStart} disabled={!email} className="w-full bg-primary hover:bg-primary/90" size="lg">
                  Start Your Career Journey
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Platform</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => <Card key={index} className="p-6 text-center hover:shadow-lg transition-all duration-300 border-0 bg-card/50">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </Card>)}
        </div>
      </div>
    </div>;
};