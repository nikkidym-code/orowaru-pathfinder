import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCareer } from '@/contexts/CareerContext';
import { CheckCircle, AlertCircle, Lightbulb, Star, Target } from 'lucide-react';

interface CVSuggestion {
  category: string;
  type: 'improvement' | 'good' | 'suggestion';
  title: string;
  description: string;
  starExample?: string;
}

export const CVOptimizer = () => {
  const { userProfile } = useCareer();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [suggestions, setSuggestions] = useState<CVSuggestion[]>([]);

  const analyzeCv = () => {
    setIsAnalyzing(true);
    
    // Simulate CV analysis
    setTimeout(() => {
      const mockSuggestions: CVSuggestion[] = [
        {
          category: 'Work Experience',
          type: 'improvement',
          title: 'Use STAR Method for Achievements',
          description: 'Transform vague descriptions into specific, measurable achievements.',
          starExample: 'Situation: Led a cross-functional team during product launch\nTask: Increase user engagement by 20%\nAction: Implemented A/B testing and user feedback loops\nResult: Achieved 35% increase in user engagement within 3 months'
        },
        {
          category: 'Skills',
          type: 'good',
          title: 'Technical Skills Well Organized',
          description: 'Your technical skills are clearly categorized and relevant to your target role.'
        },
        {
          category: 'Projects',
          type: 'suggestion',
          title: 'Add Business Impact to Projects',
          description: 'Include metrics and business outcomes for each project to demonstrate value.',
          starExample: 'Situation: Company needed to reduce customer support tickets\nTask: Build automated FAQ system\nAction: Developed AI chatbot using Python and NLP\nResult: Reduced support tickets by 40% and saved $50k annually'
        },
        {
          category: 'Education',
          type: 'improvement',
          title: 'Highlight Relevant Coursework',
          description: 'Include specific courses and projects that align with your target role.'
        },
        {
          category: 'Summary',
          type: 'suggestion',
          title: 'Tailor Summary to Target Role',
          description: 'Customize your professional summary to match the specific job requirements.'
        }
      ];
      
      setSuggestions(mockSuggestions);
      setIsAnalyzing(false);
    }, 2000);
  };

  const getSuggestionIcon = (type: CVSuggestion['type']) => {
    switch (type) {
      case 'good':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'improvement':
        return <AlertCircle className="h-5 w-5 text-orange-600" />;
      case 'suggestion':
        return <Lightbulb className="h-5 w-5 text-blue-600" />;
      default:
        return <Star className="h-5 w-5" />;
    }
  };

  const getSuggestionBadge = (type: CVSuggestion['type']) => {
    switch (type) {
      case 'good':
        return <Badge variant="default" className="bg-green-100 text-green-800">Strong</Badge>;
      case 'improvement':
        return <Badge variant="default" className="bg-orange-100 text-orange-800">Needs Work</Badge>;
      case 'suggestion':
        return <Badge variant="default" className="bg-blue-100 text-blue-800">Suggestion</Badge>;
      default:
        return <Badge variant="secondary">General</Badge>;
    }
  };

  const groupedSuggestions = suggestions.reduce((acc, suggestion) => {
    if (!acc[suggestion.category]) {
      acc[suggestion.category] = [];
    }
    acc[suggestion.category].push(suggestion);
    return acc;
  }, {} as Record<string, CVSuggestion[]>);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            CV Optimization Assistant
          </CardTitle>
          <CardDescription>
            Get STAR-method based suggestions to improve your CV and make it more impactful.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!userProfile?.resumeData ? (
            <div className="text-center p-8">
              <div className="text-muted-foreground mb-4">
                Please complete your resume information first to get personalized CV optimization suggestions.
              </div>
              <Button variant="outline">Go to Resume Step</Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground">
                Analyze your current CV and get actionable suggestions to improve your job application success rate.
              </div>
              <Button 
                onClick={analyzeCv} 
                disabled={isAnalyzing}
                className="w-full"
              >
                {isAnalyzing ? 'Analyzing Your CV...' : 'Analyze My CV'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {suggestions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>CV Analysis Results</CardTitle>
            <CardDescription>
              Review the suggestions below to strengthen your CV using the STAR method.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="space-y-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All Suggestions</TabsTrigger>
                <TabsTrigger value="improvement">Improvements</TabsTrigger>
                <TabsTrigger value="suggestion">Suggestions</TabsTrigger>
                <TabsTrigger value="good">Strengths</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="space-y-4">
                {Object.entries(groupedSuggestions).map(([category, categorySuggestions]) => (
                  <div key={category}>
                    <h3 className="font-semibold text-lg mb-3 text-primary">{category}</h3>
                    <div className="space-y-3">
                      {categorySuggestions.map((suggestion, index) => (
                        <Card key={index} className="border-l-4 border-l-primary/20">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2">
                                {getSuggestionIcon(suggestion.type)}
                                <h4 className="font-medium">{suggestion.title}</h4>
                              </div>
                              {getSuggestionBadge(suggestion.type)}
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">
                              {suggestion.description}
                            </p>
                            {suggestion.starExample && (
                              <div className="bg-muted p-3 rounded-md">
                                <div className="flex items-center gap-2 mb-2">
                                  <Star className="h-4 w-4 text-yellow-600" />
                                  <span className="text-sm font-medium">STAR Method Example:</span>
                                </div>
                                <pre className="text-sm whitespace-pre-wrap text-muted-foreground">
                                  {suggestion.starExample}
                                </pre>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </TabsContent>
              
              <TabsContent value="improvement" className="space-y-4">
                {suggestions.filter(s => s.type === 'improvement').map((suggestion, index) => (
                  <Card key={index} className="border-l-4 border-l-orange-500">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {getSuggestionIcon(suggestion.type)}
                          <h4 className="font-medium">{suggestion.title}</h4>
                        </div>
                        {getSuggestionBadge(suggestion.type)}
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {suggestion.description}
                      </p>
                      {suggestion.starExample && (
                        <div className="bg-muted p-3 rounded-md">
                          <div className="flex items-center gap-2 mb-2">
                            <Star className="h-4 w-4 text-yellow-600" />
                            <span className="text-sm font-medium">STAR Method Example:</span>
                          </div>
                          <pre className="text-sm whitespace-pre-wrap text-muted-foreground">
                            {suggestion.starExample}
                          </pre>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              
              <TabsContent value="suggestion" className="space-y-4">
                {suggestions.filter(s => s.type === 'suggestion').map((suggestion, index) => (
                  <Card key={index} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {getSuggestionIcon(suggestion.type)}
                          <h4 className="font-medium">{suggestion.title}</h4>
                        </div>
                        {getSuggestionBadge(suggestion.type)}
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {suggestion.description}
                      </p>
                      {suggestion.starExample && (
                        <div className="bg-muted p-3 rounded-md">
                          <div className="flex items-center gap-2 mb-2">
                            <Star className="h-4 w-4 text-yellow-600" />
                            <span className="text-sm font-medium">STAR Method Example:</span>
                          </div>
                          <pre className="text-sm whitespace-pre-wrap text-muted-foreground">
                            {suggestion.starExample}
                          </pre>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              
              <TabsContent value="good" className="space-y-4">
                {suggestions.filter(s => s.type === 'good').map((suggestion, index) => (
                  <Card key={index} className="border-l-4 border-l-green-500">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {getSuggestionIcon(suggestion.type)}
                          <h4 className="font-medium">{suggestion.title}</h4>
                        </div>
                        {getSuggestionBadge(suggestion.type)}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {suggestion.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
};