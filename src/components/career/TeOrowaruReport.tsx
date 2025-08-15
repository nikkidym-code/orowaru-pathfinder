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
    // Simulate Te Orowaru evaluation
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
          <h2 className="text-2xl font-bold mb-2">Analyzing Your Te Orowaru Profile</h2>
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
        <h2 className="text-3xl font-bold mb-2">Your Te Orowaru Assessment</h2>
        <p className="text-muted-foreground">
          Comprehensive analysis of your career readiness and development areas
        </p>
      </div>

      {/* Te Orowaru Scoring Section (Collapsed by Default) */}
      <Card className="p-6 mb-6">
        <Collapsible open={isScoringSectionOpen} onOpenChange={setIsScoringSectionOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-0 h-auto">
              <div className="flex items-center space-x-4">
                <BarChart3 className="w-6 h-6" />
                <div className="text-left">
                  <h3 className="text-xl font-bold">Te Orowaru Model Scoring</h3>
                  <div className="flex items-center space-x-4 mt-1">
                    <Badge variant="secondary" className="text-sm">
                      {Math.round(profile.matchPercentage)}% Match
                    </Badge>
                    <Badge variant="outline" className="text-sm">
                      {getUserTypeDisplay()}
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
            {/* Overall Match */}
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
              <Badge variant={matchStatus.color as any} className="text-lg px-4 py-2">
                {matchStatus.label}
              </Badge>
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-medium">Current Score</div>
                  <div className="text-muted-foreground">{Math.round(profile.totalCurrentScore)}</div>
                </div>
                <div>
                  <div className="font-medium">Target Score</div>
                  <div className="text-muted-foreground">{Math.round(profile.totalTargetScore)}</div>
                </div>
              </div>
            </div>

            {/* Category Breakdown */}
            <div>
              <h4 className="text-lg font-bold mb-4">Category Breakdown</h4>
              <div className="grid md:grid-cols-2 gap-6">
                {Object.entries(profile.categoryScores).map(([category, scores]) => (
                  <div key={category} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{categoryNames[category as keyof typeof categoryNames]}</span>
                      <span className="text-sm text-muted-foreground">
                        {Math.round((scores.current / scores.target) * 100)}%
                      </span>
                    </div>
                    <Progress 
                      value={(scores.current / scores.target) * 100} 
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Current: {Math.round(scores.current)}</span>
                      <span>Target: {Math.round(scores.target)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Factor Details */}
            <div>
              <h4 className="text-lg font-bold mb-4">Factor Analysis</h4>
              <div className="space-y-3">
                {profile.factors.map((factor) => (
                  <div key={factor.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(factor.status)}
                      <div>
                        <div className="font-medium text-sm">{factor.name}</div>
                        <div className="text-xs text-muted-foreground">
                          Level {factor.currentLevel}/{factor.maxScore} → {factor.targetLevel}/{factor.maxScore}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-sm">
                        Gap: {Math.round(factor.gap)}
                      </div>
                      <div className="text-xs text-muted-foreground capitalize">
                        {factor.status.replace('_', ' ')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Main Content: Dynamic Logic Based on Goal Status */}
      <div className="space-y-6">
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
        <Button variant="outline" onClick={() => setCurrentStep(3)}>
          Back to Assessment
        </Button>
        <Button onClick={() => setCurrentStep(5)}>
          Generate Action Plan
        </Button>
      </div>
    </div>
  );
};