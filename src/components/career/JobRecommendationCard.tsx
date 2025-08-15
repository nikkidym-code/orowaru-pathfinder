import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  CheckCircle, 
  XCircle, 
  Target, 
  BookOpen, 
  Lightbulb, 
  TrendingUp,
  Users,
  DollarSign,
  MapPin,
  Clock,
  Star,
  ExternalLink,
  Plus,
  GitCompare,
  Heart
} from 'lucide-react';
import { JobRole } from '@/types/career';
import { ResumeData, CareerStage } from '@/types/career';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface JobRecommendationCardProps {
  job: JobRole;
  resumeData?: ResumeData;
  careerStage: CareerStage;
  onAddToCompare?: (job: JobRole) => void;
  onAddToGoals?: (job: JobRole) => void;
  onRemoveFromCompare?: (jobId: string) => void;
  onRemoveFromGoals?: (jobId: string) => void;
  onViewSimilar?: (job: JobRole) => void;
  isInCompareList?: boolean;
  isInGoalsList?: boolean;
}

export const JobRecommendationCard = ({ 
  job, 
  resumeData, 
  careerStage,
  onAddToCompare,
  onAddToGoals,
  onRemoveFromCompare,
  onRemoveFromGoals,
  onViewSimilar,
  isInCompareList = false,
  isInGoalsList = false
}: JobRecommendationCardProps) => {
  const [activeTab, setActiveTab] = useState('overview');

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

  const formatSalary = (min: number, max: number, currency: string) => {
    return `${currency} ${(min / 1000).toFixed(0)}k - ${(max / 1000).toFixed(0)}k`;
  };

  const getDemandColor = (trend: string) => {
    switch (trend) {
      case 'high': return 'text-success';
      case 'medium': return 'text-warning';
      case 'low': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getAIImpactColor = (impact: string) => {
    switch (impact) {
      case 'positive': return 'text-success';
      case 'neutral': return 'text-muted-foreground';
      case 'challenging': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <CardTitle className="text-2xl">{job.title}</CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{job.industry}</span>
              <Separator orientation="vertical" className="h-4" />
              <span>{job.functionalCategory}</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {job.aliases.slice(0, 3).map(alias => (
                <Badge key={alias} variant="outline" className="text-xs">
                  {alias}
                </Badge>
              ))}
            </div>
          </div>
          <div className="text-right space-y-2">
            <Badge variant="secondary" className="text-lg px-3 py-1">
              {matchPercentage}% Match
            </Badge>
            <div className="flex gap-2">
              {job.keyHighlights.map(highlight => (
                <Badge key={highlight} variant="outline" className="text-xs">
                  {highlight}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="learning">Learning</TabsTrigger>
            <TabsTrigger value="career">Career</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            {/* Basic Job Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center">
                  <Target className="w-4 h-4 mr-2" />
                  Job Details
                </h3>
                <p className="text-muted-foreground">{job.description}</p>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">{formatSalary(job.salaryRange.min, job.salaryRange.max, job.salaryRange.currency)}</span>
                    <span className="text-sm text-muted-foreground">({job.salaryRange.region})</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <div className="flex flex-wrap gap-1">
                      {job.workLocationModel.map(model => (
                        <Badge key={model} variant="outline" className="text-xs capitalize">
                          {model.replace('-', ' ')}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">
                      {job.typicalEmployers.slice(0, 2).join(', ')}
                      {job.typicalEmployers.length > 2 && ` +${job.typicalEmployers.length - 2} more`}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold flex items-center">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Core Responsibilities
                </h3>
                <div className="space-y-2">
                  {job.coreResponsibilities.map((responsibility, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm">{responsibility}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Industry Outlook */}
            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3 flex items-center">
                <TrendingUp className="w-4 h-4 mr-2" />
                Industry Outlook
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <span className="text-sm font-medium">Demand Trend</span>
                  <p className={`text-sm capitalize ${getDemandColor(job.industryOutlook.demandTrend)}`}>
                    {job.industryOutlook.demandTrend}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium">AI Impact</span>
                  <p className={`text-sm capitalize ${getAIImpactColor(job.industryOutlook.aiImpact)}`}>
                    {job.industryOutlook.aiImpact}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-medium">Future Skills</span>
                  <p className="text-sm text-muted-foreground">
                    {job.industryOutlook.futureSkillNeeds.slice(0, 2).join(', ')}
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="skills" className="space-y-6 mt-6">
            {/* Skill Match Analysis */}
            <div className="space-y-4">
              <h3 className="font-semibold">Skill Match Analysis</h3>
              <div className="flex items-center justify-between mb-2">
                <span>Overall Match</span>
                <span className="text-sm text-muted-foreground">{matchPercentage}%</span>
              </div>
              <Progress value={matchPercentage} className="w-full" />
            </div>

            {/* Core Skills */}
            <div className="space-y-4">
              <h3 className="font-semibold">Core Required Skills</h3>
              <div className="grid gap-3">
                {job.requiredSkills.core.map((skill, index) => (
                  <div key={index} className="border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{skill.name}</span>
                      {matched.includes(skill.name) ? (
                        <CheckCircle className="w-4 h-4 text-success" />
                      ) : (
                        <XCircle className="w-4 h-4 text-destructive" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{skill.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Skill Gap Suggestions */}
            {missing.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-destructive">Priority Skills to Develop</h3>
                <div className="grid gap-2">
                  {missing.slice(0, 3).map((skill, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-destructive/5 rounded">
                      <XCircle className="w-4 h-4 text-destructive" />
                      <span className="text-sm">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bonus Skills */}
            <div className="space-y-4">
              <h3 className="font-semibold">Bonus Skills</h3>
              <div className="flex flex-wrap gap-2">
                {job.requiredSkills.bonus.map(skill => (
                  <Badge key={skill} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="experience" className="space-y-6 mt-6">
            {/* Day-to-Day Work */}
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                Day-to-Day Work Examples
              </h3>
              <div className="space-y-2">
                {job.dayToDayWork.map((example, index) => (
                  <div key={index} className="bg-muted/50 p-3 rounded-lg">
                    <p className="text-sm">{example}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Real Stories */}
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center">
                <Star className="w-4 h-4 mr-2" />
                Success Stories
              </h3>
              <div className="space-y-3">
                {job.realStories.map((story, index) => (
                  <div key={index} className="border-l-4 border-primary pl-4">
                    <p className="text-sm text-muted-foreground">{story}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Pros & Cons */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-medium text-success">Pros</h4>
                <div className="space-y-2">
                  {job.prosAndCons.pros.map((pro, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-success mt-0.5" />
                      <span className="text-sm">{pro}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium text-warning">Cons</h4>
                <div className="space-y-2">
                  {job.prosAndCons.cons.map((con, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-warning mt-0.5" />
                      <span className="text-sm">{con}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Related Discussions */}
            <div className="space-y-4">
              <h3 className="font-semibold">Related Discussions</h3>
              <div className="space-y-2">
                {job.relatedDiscussions.map((discussion, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded">
                    <div className="flex items-center gap-2">
                      <ExternalLink className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{discussion.title}</span>
                      <Badge variant="outline" className="text-xs">{discussion.platform}</Badge>
                    </div>
                    <Button size="sm" variant="ghost">View</Button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="learning" className="space-y-6 mt-6">
            {/* Recommended Courses */}
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center">
                <BookOpen className="w-4 h-4 mr-2" />
                Recommended Courses & Certifications
              </h3>
              <div className="grid gap-3">
                {job.recommendedCourses.map((course, index) => (
                  <div key={index} className="border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{course.title}</span>
                      <Badge variant="outline" className="text-xs capitalize">{course.type}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{course.provider}</span>
                      <Button size="sm" variant="outline">
                        <ExternalLink className="w-3 h-3 mr-1" />
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Suggested Experience */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <h4 className="font-medium">Internships</h4>
                <div className="space-y-2">
                  {job.suggestedExperience.internships.map((internship, index) => (
                    <div key={index} className="text-sm p-2 bg-muted/50 rounded">
                      {internship}
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium">Part-time Jobs</h4>
                <div className="space-y-2">
                  {job.suggestedExperience.partTimeJobs.map((job, index) => (
                    <div key={index} className="text-sm p-2 bg-muted/50 rounded">
                      {job}
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="font-medium">Projects</h4>
                <div className="space-y-2">
                  {job.suggestedExperience.projects.map((project, index) => (
                    <div key={index} className="text-sm p-2 bg-muted/50 rounded">
                      {project}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Community Links */}
            <div className="space-y-4">
              <h3 className="font-semibold">Community & Networking</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {job.communityLinks.map((link, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{link.name}</span>
                      <Badge variant="outline" className="text-xs capitalize">{link.type}</Badge>
                    </div>
                    <Button size="sm" variant="ghost">Join</Button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="career" className="space-y-6 mt-6">
            {/* Career Path */}
            <div className="space-y-4">
              <h3 className="font-semibold">Typical Career Path</h3>
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-center gap-4 mb-3">
                  <div className="bg-primary text-primary-foreground px-3 py-1 rounded text-sm font-medium">
                    {job.careerPath.current}
                  </div>
                  <span className="text-muted-foreground">→</span>
                  <div className="flex flex-wrap gap-2">
                    {job.careerPath.next.map((role, index) => (
                      <div key={index} className="bg-background border px-3 py-1 rounded text-sm">
                        {role}
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  <Clock className="w-3 h-3 inline mr-1" />
                  {job.careerPath.timeline}
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6 mt-6">
            {/* Career Stage Specific Guidance */}
            <div className="bg-primary/5 p-4 rounded-lg">
              <h3 className="font-semibold mb-3 flex items-center">
                <Lightbulb className="w-4 h-4 mr-2" />
                Guidance for {careerStage.charAt(0).toUpperCase() + careerStage.slice(1)}s
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Based on your career stage, here's targeted advice for pursuing this role.
              </p>
              {/* Add career stage specific content here */}
            </div>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6 pt-4 border-t">
          <Button
            variant={isInCompareList ? "default" : "outline"}
            size="sm"
            onClick={() => isInCompareList ? onRemoveFromCompare?.(job.id) : onAddToCompare?.(job)}
            className={cn(
              "flex items-center gap-2 transition-all duration-200",
              isInCompareList && "bg-primary text-primary-foreground hover:bg-primary/90"
            )}
          >
            <GitCompare className="w-4 h-4" />
            {isInCompareList ? "Remove from Compare" : "Add to Compare"}
          </Button>
          <Button
            variant={isInGoalsList ? "default" : "outline"}
            size="sm"
            onClick={() => isInGoalsList ? onRemoveFromGoals?.(job.id) : onAddToGoals?.(job)}
            className={cn(
              "flex items-center gap-2 transition-all duration-200",
              isInGoalsList && "bg-primary text-primary-foreground hover:bg-primary/90"
            )}
          >
            <Heart className={cn("w-4 h-4", isInGoalsList && "fill-current")} />
            {isInGoalsList ? "Remove from Goals" : "Add to My Goals"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewSimilar?.(job)}
            className="flex items-center gap-2 hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
          >
            <Target className="w-4 h-4" />
            View Similar Roles
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};