import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useCareer } from '@/contexts/CareerContext';
import { Clock, Target, TrendingUp, Users, MapPin, Award } from 'lucide-react';

export const OrientationStep = () => {
  const { setCurrentStep } = useCareer();

  const handleGetStarted = () => {
    setCurrentStep(2); // Move to Values Assessment
  };

  const exampleRoles = [
    { title: "Product Manager", match: "92%", skills: ["Strategy", "Communication", "Analytics"] },
    { title: "UX Designer", match: "87%", skills: ["Design", "Research", "Empathy"] },
    { title: "Data Scientist", match: "81%", skills: ["Python", "Statistics", "Problem Solving"] }
  ];

  const assessmentAreas = [
    { icon: Target, title: "Values", description: "Core principles that drive your decisions" },
    { icon: TrendingUp, title: "Skills", description: "Your technical and soft skill capabilities" },
    { icon: Users, title: "Interests", description: "Industries and domains that excite you" },
    { icon: MapPin, title: "Preferences", description: "Your ideal work environment and style" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Explore Your Career Map
          </h1>
          <p className="text-xl text-muted-foreground mb-6 max-w-3xl mx-auto">
            Discover personalized career recommendations through a comprehensive assessment of your 
            <span className="text-primary font-semibold"> values, skills, interests, and preferences</span>
          </p>
          
          <div className="flex items-center justify-center gap-2 text-muted-foreground mb-8">
            <Clock className="w-5 h-5" />
            <span className="text-lg">Completion time: 15-20 minutes</span>
          </div>
        </div>

        {/* Assessment Areas */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {assessmentAreas.map((area, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                  <area.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{area.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">{area.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Career Map Preview */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Example Career Map */}
          <Card className="p-6">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Example Career Map
              </CardTitle>
              <CardDescription>
                See how your assessment results translate into personalized recommendations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {exampleRoles.map((role, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <div className="font-medium">{role.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {role.skills.join(" • ")}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-primary">{role.match} match</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* What You'll Get */}
          <Card className="p-6">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                What You'll Discover
              </CardTitle>
              <CardDescription>
                Comprehensive insights to guide your career decisions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-medium">Personalized Role Matches</div>
                    <div className="text-sm text-muted-foreground">Ranked career suggestions based on your profile</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-medium">Skills Gap Analysis</div>
                    <div className="text-sm text-muted-foreground">Identify areas for development and growth</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-medium">Actionable Career Plan</div>
                    <div className="text-sm text-muted-foreground">Step-by-step roadmap to reach your goals</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <div className="font-medium">Industry Insights</div>
                    <div className="text-sm text-muted-foreground">Market trends and opportunities in your areas of interest</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Button 
            size="lg" 
            onClick={handleGetStarted}
            className="px-8 py-3 text-lg font-semibold"
          >
            Get Started
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            Your responses are private and secure
          </p>
        </div>
      </div>
    </div>
  );
};