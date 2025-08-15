import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { X, Target, BookOpen, Users } from 'lucide-react';
import { useCareer } from '@/contexts/CareerContext';

export const CareerGoals = () => {
  const { goalsList, removeFromGoals } = useCareer();

  if (goalsList.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Career Goals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No career goals set yet. Add jobs from the recommendations to create your career roadmap.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Target className="h-6 w-6" />
          Career Goals
        </h2>
        <Badge variant="secondary">{goalsList.length} goals</Badge>
      </div>
      
      <div className="grid gap-4">
        {goalsList.map((job) => (
          <Card key={job.id} className="relative">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 h-8 w-8 p-0"
              onClick={() => removeFromGoals(job.id)}
            >
              <X className="h-4 w-4" />
            </Button>
            
            <CardHeader>
              <CardTitle className="pr-8">{job.title}</CardTitle>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">{job.industry}</Badge>
                <Badge variant="secondary">${job.salaryRange.min / 1000}k - ${job.salaryRange.max / 1000}k</Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Skill Match</span>
                  <span className="text-sm text-muted-foreground">75%</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              
              <div>
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Skills to Develop
                </h4>
                <div className="flex flex-wrap gap-1">
                  {job.industryOutlook.futureSkillNeeds.slice(0, 3).map((skill, idx) => (
                    <Badge key={idx} variant="destructive" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {job.recommendedCourses && job.recommendedCourses.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    Recommended Learning
                  </h4>
                  <div className="space-y-1">
                    {job.recommendedCourses.slice(0, 2).map((course, idx) => (
                      <div key={idx} className="text-sm text-muted-foreground">
                        • {course.title}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {job.communityLinks && job.communityLinks.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Networking Opportunities
                  </h4>
                  <div className="space-y-1">
                    {job.communityLinks.slice(0, 2).map((community, idx) => (
                      <div key={idx} className="text-sm text-muted-foreground">
                        • {community.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};