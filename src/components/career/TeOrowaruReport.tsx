import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, Minus, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { useCareer } from '@/contexts/CareerContext';
import { TeOrowaruProfile, TeOrowaruFactor } from '@/types/career';
import { teOrowaruFactors, categoryNames } from '@/data/teOrowaruFactors';
import { useEffect, useState } from 'react';

export const TeOrowaruReport = () => {
  const { userProfile, setTeOrowaruProfile, setCurrentStep } = useCareer();
  const [profile, setProfile] = useState<TeOrowaruProfile | null>(null);
  const [isGenerating, setIsGenerating] = useState(true);

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

  if (!profile) return null;

  const matchStatus = getMatchStatus(profile.matchPercentage);
  const urgentFactors = profile.factors.filter(f => f.gap > 15);
  const importantFactors = profile.factors.filter(f => f.gap >= 5 && f.gap <= 15);
  const continuousFactors = profile.factors.filter(f => f.gap < 5);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Your Te Orowaru Assessment</h2>
        <p className="text-muted-foreground">
          Comprehensive analysis of your career readiness and development areas
        </p>
      </div>

      {/* Overall Match */}
      <Card className="p-6 mb-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Overall Match Score</h3>
          <div className="relative w-32 h-32 mx-auto mb-4">
            <div className="w-32 h-32 rounded-full border-8 border-muted flex items-center justify-center relative">
              <div 
                className={`absolute inset-0 rounded-full border-8 border-t-primary border-r-primary`}
                style={{ 
                  transform: `rotate(${(profile.matchPercentage / 100) * 360}deg)`,
                  borderColor: `hsl(var(--${matchStatus.color}))`
                }}
              />
              <span className="text-2xl font-bold">{Math.round(profile.matchPercentage)}%</span>
            </div>
          </div>
          <Badge variant="secondary" className="text-lg px-4 py-2">
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
      </Card>

      {/* Category Breakdown */}
      <Card className="p-6 mb-6">
        <h3 className="text-xl font-bold mb-6">Category Breakdown</h3>
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
      </Card>

      {/* Factor Details */}
      <Card className="p-6 mb-6">
        <h3 className="text-xl font-bold mb-6">Factor Analysis</h3>
        <div className="space-y-4">
          {profile.factors.map((factor) => (
            <div key={factor.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                {getStatusIcon(factor.status)}
                <div>
                  <div className="font-medium">{factor.name}</div>
                  <div className="text-sm text-muted-foreground">
                    Level {factor.currentLevel}/{factor.maxScore} → {factor.targetLevel}/{factor.maxScore}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">
                  Gap: {Math.round(factor.gap)} points
                </div>
                <div className="text-sm text-muted-foreground capitalize">
                  {factor.status.replace('_', ' ')}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Priority Ladder */}
      <Card className="p-6 mb-6">
        <h3 className="text-xl font-bold mb-6">Development Priority Ladder</h3>
        <div className="space-y-6">
          {urgentFactors.length > 0 && (
            <div>
              <h4 className="font-semibold text-destructive mb-3 flex items-center">
                <TrendingUp className="w-4 h-4 mr-2" />
                Urgent (Gap &gt; 15 points)
              </h4>
              <div className="grid md:grid-cols-2 gap-2">
                {urgentFactors.map(factor => (
                  <Badge key={factor.id} variant="destructive" className="justify-start">
                    {factor.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {importantFactors.length > 0 && (
            <div>
              <h4 className="font-semibold text-warning mb-3 flex items-center">
                <TrendingUp className="w-4 h-4 mr-2" />
                Important (5-15 points)
              </h4>
              <div className="grid md:grid-cols-2 gap-2">
                {importantFactors.map(factor => (
                  <Badge key={factor.id} variant="secondary" className="justify-start">
                    {factor.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {continuousFactors.length > 0 && (
            <div>
              <h4 className="font-semibold text-success mb-3 flex items-center">
                <Minus className="w-4 h-4 mr-2" />
                Continuous (&lt; 5 points)
              </h4>
              <div className="grid md:grid-cols-2 gap-2">
                {continuousFactors.map(factor => (
                  <Badge key={factor.id} variant="outline" className="justify-start">
                    {factor.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>

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