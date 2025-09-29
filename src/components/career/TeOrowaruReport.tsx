import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, ChevronDown, ChevronUp, CheckCircle, AlertTriangle, XCircle, BarChart3, Minus } from 'lucide-react';
import { useCareer } from '@/contexts/CareerContext';
import { TeOrowaruProfile, TeOrowaruFactor } from '@/types/career';
import { teOrowaruFactors, categoryNames } from '@/data/teOrowaruFactors';
import { getJobRecommendations } from '@/data/jobRecommendations';
import { JobRecommendation } from './JobRecommendation';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useEffect, useState } from 'react';

export const TeOrowaruReport = () => {
  const { userProfile, setTeOrowaruProfile, setCurrentStep } = useCareer();
  const [profile, setProfile] = useState<TeOrowaruProfile | null>(null);
  const [isGenerating, setIsGenerating] = useState(true);
  const [isScoringSectionOpen, setIsScoringSectionOpen] = useState(false);

  useEffect(() => {
    // Simulate WorkVue evaluation
    setTimeout(() => {
      const mockProfile = generateMockProfile();
      setProfile(mockProfile);
      setTeOrowaruProfile(mockProfile);
      setIsGenerating(false);
    }, 3000);
  }, [setTeOrowaruProfile]);

  const generateMockProfile = (): TeOrowaruProfile => {
    const factors: TeOrowaruFactor[] = teOrowaruFactors.map(factor => {
      // Generate realistic current levels based on career stage
      let currentLevel: number;
      let targetLevel: number;

      switch (userProfile?.careerStage) {
        case 'starter':
          currentLevel = Math.floor(Math.random() * 3) + 1;
          targetLevel = Math.floor(Math.random() * 3) + 4;
          break;
        case 'shifter':
          currentLevel = Math.floor(Math.random() * 3) + 3;
          targetLevel = Math.floor(Math.random() * 3) + 5;
          break;
        case 'advancer':
          currentLevel = Math.floor(Math.random() * 3) + 5;
          targetLevel = Math.floor(Math.random() * 2) + 7;
          break;
        case 'explorer':
          currentLevel = Math.floor(Math.random() * 4) + 3;
          targetLevel = Math.floor(Math.random() * 3) + 6;
          break;
        default:
          currentLevel = Math.floor(Math.random() * 5) + 1;
          targetLevel = Math.floor(Math.random() * 3) + 5;
      }

      targetLevel = Math.min(targetLevel, factor.maxScore);
      currentLevel = Math.min(currentLevel, targetLevel);

      const currentScore = (currentLevel / factor.maxScore) * 100 * factor.weight;
      const targetScore = (targetLevel / factor.maxScore) * 100 * factor.weight;
      const gap = targetScore - currentScore;
      
      let status: 'achieved' | 'needs_improvement' | 'critical_gap';
      if (gap <= 5) status = 'achieved';
      else if (gap <= 15) status = 'needs_improvement';
      else status = 'critical_gap';

      return {
        ...factor,
        currentLevel,
        targetLevel,
        currentScore,
        targetScore,
        gap,
        status
      };
    });

    const totalCurrentScore = factors.reduce((sum, f) => sum + f.currentScore, 0);
    const totalTargetScore = factors.reduce((sum, f) => sum + f.targetScore, 0);
    const matchPercentage = (totalCurrentScore / totalTargetScore) * 100;

    const categoryScores = {
      skills: calculateCategoryScore(factors, 'skills'),
      responsibility: calculateCategoryScore(factors, 'responsibility'),
      effort: calculateCategoryScore(factors, 'effort'),
      working_conditions: calculateCategoryScore(factors, 'working_conditions')
    };

    return {
      factors,
      totalCurrentScore,
      totalTargetScore,
      matchPercentage,
      categoryScores
    };
  };

  const calculateCategoryScore = (factors: TeOrowaruFactor[], category: string) => {
    const categoryFactors = factors.filter(f => f.category === category);
    const current = categoryFactors.reduce((sum, f) => sum + f.currentScore, 0);
    const target = categoryFactors.reduce((sum, f) => sum + f.targetScore, 0);
    const weight = categoryFactors.reduce((sum, f) => sum + f.weight, 0);
    
    return { current, target, weight };
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'achieved':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'needs_improvement':
        return <AlertTriangle className="w-4 h-4 text-warning" />;
      case 'critical_gap':
        return <XCircle className="w-4 h-4 text-destructive" />;
      default:
        return <Minus className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getMatchStatus = (percentage: number) => {
    if (percentage >= 90) return { label: 'Excellent Match', color: 'success' };
    if (percentage >= 70) return { label: 'Good Match', color: 'info' };
    if (percentage >= 50) return { label: 'Needs Improvement', color: 'warning' };
    return { label: 'Significant Gap', color: 'destructive' };
  };

  if (isGenerating) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold mb-2">Analyzing Your WorkVue Profile</h2>
          <p className="text-muted-foreground">
            Processing your responses and generating your comprehensive career assessment...
          </p>
        </div>
      </div>
    );
  }

  if (!profile || !userProfile) return null;

  const matchStatus = getMatchStatus(profile.matchPercentage);
  const jobRecommendations = getJobRecommendations(
    userProfile.careerStage, 
    userProfile.hasGoal, 
    userProfile.targetRole
  );

  const getUserTypeDisplay = () => {
    const typeMap = {
      starter: 'Career Starter',
      advancer: 'Career Advancer', 
      shifter: 'Career Shifter',
      explorer: 'Career Explorer'
    };
    return typeMap[userProfile.careerStage] || userProfile.careerStage;
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">YourVue</h2>
        <p className="text-muted-foreground">
          Comprehensive analysis of your career readiness and development areas
        </p>
      </div>

      {/* Te Orowaru Career Fit Assessment Section (Collapsed by Default) */}
      <div className="max-w-4xl mx-auto mb-6">
        <Card className="p-6">
        <Collapsible open={isScoringSectionOpen} onOpenChange={setIsScoringSectionOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-0 h-auto">
              <div className="flex items-center space-x-4">
                <BarChart3 className="w-6 h-6" />
                <div className="text-left">
                  <h3 className="text-xl font-bold">Te Orowaru Career Fit Assessment</h3>
                  <div className="flex items-center space-x-4 mt-1">
                    <Badge variant="secondary" className="text-sm">
                      {Math.round(profile.matchPercentage)}% Overall Match
                    </Badge>
                    <Badge variant="outline" className="text-sm">
                      Target: 70%+ within 6 months
                    </Badge>
                  </div>
                </div>
              </div>
              {isScoringSectionOpen ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </Button>
          </CollapsibleTrigger>

          <CollapsibleContent className="mt-6 space-y-6">
            {/* Overall Match Score */}
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <div className="w-32 h-32 rounded-full border-8 border-muted flex items-center justify-center relative">
                  <div 
                    className="absolute inset-0 rounded-full border-8 border-transparent"
                    style={{ 
                      transform: `rotate(${(profile.matchPercentage / 100) * 360}deg)`,
                      borderTopColor: `hsl(var(--${matchStatus.color}))`,
                      borderRightColor: `hsl(var(--${matchStatus.color}))`,
                      borderBottomColor: profile.matchPercentage > 50 ? `hsl(var(--${matchStatus.color}))` : 'transparent',
                      borderLeftColor: profile.matchPercentage > 75 ? `hsl(var(--${matchStatus.color}))` : 'transparent'
                    }}
                  />
                  <span className="text-2xl font-bold">{Math.round(profile.matchPercentage)}%</span>
                </div>
              </div>
              <h4 className="text-lg font-bold mb-2">Overall Match Score</h4>
              <Badge variant={matchStatus.color as any} className="text-lg px-4 py-2">
                {matchStatus.label}
              </Badge>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Strength Areas */}
              <div className="space-y-4">
                <h4 className="text-lg font-bold flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-success" />
                  Strength Areas
                </h4>
                <div className="space-y-3">
                  <div className="p-3 border border-success/20 bg-success/5 rounded-lg">
                    <div className="font-medium text-success">Problem-solving</div>
                    <div className="text-sm text-muted-foreground">Strong analytical thinking and solution development</div>
                  </div>
                  <div className="p-3 border border-success/20 bg-success/5 rounded-lg">
                    <div className="font-medium text-success">Planning & Organization</div>
                    <div className="text-sm text-muted-foreground">Excellent project management and strategic thinking</div>
                  </div>
                  <div className="p-3 border border-success/20 bg-success/5 rounded-lg">
                    <div className="font-medium text-success">Technical Skills</div>
                    <div className="text-sm text-muted-foreground">Strong foundation in required technical competencies</div>
                  </div>
                </div>
              </div>

              {/* Growth Areas */}
              <div className="space-y-4">
                <h4 className="text-lg font-bold flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-warning" />
                  Growth Areas
                </h4>
                <div className="space-y-3">
                  <div className="p-3 border border-warning/20 bg-warning/5 rounded-lg">
                    <div className="font-medium text-warning">Interpersonal Communication</div>
                    <div className="text-sm text-muted-foreground">Needs development in team collaboration and presentation skills</div>
                  </div>
                  <div className="p-3 border border-warning/20 bg-warning/5 rounded-lg">
                    <div className="font-medium text-warning">Industry Knowledge</div>
                    <div className="text-sm text-muted-foreground">Requires deeper understanding of market trends and practices</div>
                  </div>
                  <div className="p-3 border border-warning/20 bg-warning/5 rounded-lg">
                    <div className="font-medium text-warning">Leadership Experience</div>
                    <div className="text-sm text-muted-foreground">Limited experience in leading teams and initiatives</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Improvement Suggestions */}
            <div className="space-y-4">
              <h4 className="text-lg font-bold flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Improvement Suggestions
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <div className="font-medium mb-2">Communication Skills Development</div>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Join Toastmasters or similar speaking groups</li>
                    <li>• Take online courses in presentation skills</li>
                    <li>• Practice active listening techniques</li>
                    <li>• Seek feedback from colleagues regularly</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="font-medium mb-2">Industry Knowledge Enhancement</div>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Subscribe to industry publications</li>
                    <li>• Attend conferences and networking events</li>
                    <li>• Complete relevant certification programs</li>
                    <li>• Connect with industry mentors</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="font-medium mb-2">Leadership Experience Building</div>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Volunteer for cross-functional projects</li>
                    <li>• Mentor junior team members</li>
                    <li>• Take on team lead responsibilities</li>
                    <li>• Complete leadership training programs</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="font-medium mb-2">Goal Achievement Timeline</div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>3 months:</span>
                      <span className="text-muted-foreground">45-50% match</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>6 months:</span>
                      <span className="text-primary font-medium">70%+ match target</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>12 months:</span>
                      <span className="text-muted-foreground">85%+ match</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Target Setting */}
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <h4 className="text-lg font-bold text-primary mb-2">Target Setting</h4>
              <div className="text-sm space-y-2">
                <div className="flex items-center justify-between">
                  <span>Current Match Score:</span>
                  <span className="font-medium">{Math.round(profile.matchPercentage)}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>6-Month Target:</span>
                  <span className="font-bold text-primary">70%+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Improvement Needed:</span>
                  <span className="font-medium">{Math.max(0, 70 - Math.round(profile.matchPercentage))}%</span>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
        </Card>
      </div>

      {/* Main Content: Dynamic Logic Based on Goal Status */}
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-2">
            {userProfile.hasGoal ? 'Career Goal Analysis' : 'Recommended Career Paths'}
          </h3>
          <p className="text-muted-foreground">
            {userProfile.hasGoal 
              ? `Analysis for your target role: ${userProfile.targetRole}`
              : `Top ${jobRecommendations.length} career recommendations based on your profile`
            }
          </p>
        </div>

        {/* Job Recommendations */}
        <div className="space-y-4">
          {jobRecommendations.map((job, index) => (
            <JobRecommendation
              key={job.id}
              job={job}
              resumeData={userProfile.resumeData}
              careerStage={userProfile.careerStage}
              isExpanded={userProfile.hasGoal || index === 0}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={() => setCurrentStep(4)}>
          Back to Assessment
        </Button>
        <Button onClick={() => setCurrentStep(7)}>
          Generate Action Plan
        </Button>
      </div>
    </div>
  );
};