import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, Target, BookOpen, Lightbulb } from 'lucide-react';
import { JobRole } from '@/data/jobRecommendations';
import { ResumeData, CareerStage } from '@/types/career';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface JobRecommendationProps {
  job: JobRole;
  resumeData?: ResumeData;
  careerStage: CareerStage;
  isExpanded?: boolean;
}

export const JobRecommendation = ({ job, resumeData, careerStage, isExpanded = false }: JobRecommendationProps) => {
  const [isOpen, setIsOpen] = useState(isExpanded);

  const analyzeSkillMatch = () => {
    if (!resumeData) return { matched: [], missing: job.requiredSkills.technical.concat(job.requiredSkills.soft) };

    const allUserSkills = [
      ...resumeData.hardSkills,
      ...resumeData.softSkills
    ].map(skill => skill.toLowerCase());

    const allRequiredSkills = [
      ...job.requiredSkills.technical,
      ...job.requiredSkills.soft,
      ...job.requiredSkills.tools
    ];

    const matched = allRequiredSkills.filter(skill => 
      allUserSkills.some(userSkill => 
        userSkill.includes(skill.toLowerCase()) || skill.toLowerCase().includes(userSkill)
      )
    );

    const missing = allRequiredSkills.filter(skill => 
      !allUserSkills.some(userSkill => 
        userSkill.includes(skill.toLowerCase()) || skill.toLowerCase().includes(userSkill)
      )
    );

    return { matched, missing };
  };

  const { matched, missing } = analyzeSkillMatch();
  const matchPercentage = Math.round((matched.length / (matched.length + missing.length)) * 100) || 0;

  const getCareerStageGuidance = () => {
    switch (careerStage) {
      case 'starter':
        return {
          tone: 'encouraging',
          focus: 'Basic skills and entry-level opportunities',
          advice: 'Focus on building foundational skills through courses, projects, and internships.'
        };
      case 'advancer':
        return {
          tone: 'growth-focused',
          focus: 'Advanced skills and leadership opportunities',
          advice: 'Develop specialized expertise and consider taking on leadership responsibilities.'
        };
      case 'shifter':
        return {
          tone: 'transition-friendly',
          focus: 'Transferable skills and easy entry points',
          advice: 'Leverage your existing experience while building new domain-specific skills.'
        };
      case 'explorer':
        return {
          tone: 'exploration-driven',
          focus: 'Diverse opportunities and skill experimentation',
          advice: 'Try different aspects of this role through side projects and volunteering.'
        };
      default:
        return {
          tone: 'general',
          focus: 'Skill development',
          advice: 'Focus on continuous learning and practical application.'
        };
    }
  };

  const guidance = getCareerStageGuidance();

  const getActionRecommendations = () => {
    const recommendations = [];
    
    if (missing.length > 0) {
      recommendations.push(`Learn ${missing.slice(0, 3).join(', ')} through online courses or tutorials`);
    }
    
    if (careerStage === 'starter') {
      recommendations.push('Build a portfolio with 2-3 relevant projects');
      recommendations.push('Consider internships or entry-level positions');
    } else if (careerStage === 'shifter') {
      recommendations.push('Identify transferable skills from your current field');
      recommendations.push('Network with professionals in this industry');
    } else if (careerStage === 'advancer') {
      recommendations.push('Contribute to open-source projects or industry publications');
      recommendations.push('Seek mentorship or leadership opportunities');
    }

    return recommendations;
  };

  return (
    <Card className="p-6">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between p-0 h-auto">
            <div className="flex items-center space-x-4">
              <div className="text-left">
                <h3 className="text-xl font-bold">{job.title}</h3>
                <p className="text-sm text-muted-foreground">{job.industry}</p>
              </div>
              <Badge variant="secondary">
                {matchPercentage}% Match
              </Badge>
            </div>
          </Button>
        </CollapsibleTrigger>

        <CollapsibleContent className="mt-4 space-y-6">
          {/* Job Overview */}
          <div>
            <h4 className="font-semibold mb-2 flex items-center">
              <Target className="w-4 h-4 mr-2" />
              Job Overview
            </h4>
            <p className="text-muted-foreground mb-4">{job.description}</p>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <h5 className="font-medium mb-2">Technical Skills</h5>
                <div className="flex flex-wrap gap-1">
                  {job.requiredSkills.technical.map(skill => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h5 className="font-medium mb-2">Soft Skills</h5>
                <div className="flex flex-wrap gap-1">
                  {job.requiredSkills.soft.map(skill => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h5 className="font-medium mb-2">Tools & Technologies</h5>
                <div className="flex flex-wrap gap-1">
                  {job.requiredSkills.tools.map(tool => (
                    <Badge key={tool} variant="outline" className="text-xs">
                      {tool}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Resume-to-Job Matching Analysis */}
          <div>
            <h4 className="font-semibold mb-4 flex items-center">
              <BookOpen className="w-4 h-4 mr-2" />
              Resume-to-Job Matching Analysis
            </h4>
            
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Overall Match</span>
                <span className="text-sm text-muted-foreground">{matchPercentage}%</span>
              </div>
              <Progress value={matchPercentage} className="w-full" />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium mb-2 text-success flex items-center">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Skills Matched ({matched.length})
                </h5>
                {matched.length > 0 ? (
                  <div className="space-y-1">
                    {matched.map(skill => (
                      <div key={skill} className="text-sm text-muted-foreground flex items-center">
                        <CheckCircle className="w-3 h-3 mr-2 text-success" />
                        {skill}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No direct matches found in resume</p>
                )}
              </div>

              <div>
                <h5 className="font-medium mb-2 text-destructive flex items-center">
                  <XCircle className="w-4 h-4 mr-1" />
                  Skills Missing ({missing.length})
                </h5>
                {missing.length > 0 ? (
                  <div className="space-y-1">
                    {missing.slice(0, 8).map(skill => (
                      <div key={skill} className="text-sm text-muted-foreground flex items-center">
                        <XCircle className="w-3 h-3 mr-2 text-destructive" />
                        {skill}
                      </div>
                    ))}
                    {missing.length > 8 && (
                      <p className="text-xs text-muted-foreground">...and {missing.length - 8} more</p>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-success">All required skills found!</p>
                )}
              </div>
            </div>
          </div>

          {/* Next-Step Recommendations */}
          <div>
            <h4 className="font-semibold mb-4 flex items-center">
              <Lightbulb className="w-4 h-4 mr-2" />
              Next-Step Recommendations
              <Badge variant="outline" className="ml-2 text-xs">
                {guidance.tone}
              </Badge>
            </h4>
            
            <div className="bg-muted/50 p-4 rounded-lg mb-4">
              <p className="text-sm font-medium mb-1">{guidance.focus}</p>
              <p className="text-sm text-muted-foreground">{guidance.advice}</p>
            </div>

            <div className="space-y-2">
              {getActionRecommendations().map((recommendation, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <p className="text-sm">{recommendation}</p>
                </div>
              ))}
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};