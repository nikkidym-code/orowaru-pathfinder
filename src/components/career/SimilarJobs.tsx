import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { JobRole } from '@/types/career';
import { useCareer } from '@/contexts/CareerContext';
import { Plus, Target, GitCompare, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SimilarJobsProps {
  baseJob: JobRole;
  onClose: () => void;
}

export const SimilarJobs = ({ baseJob, onClose }: SimilarJobsProps) => {
  const { addToCompare, addToGoals, removeFromCompare, removeFromGoals, compareList, goalsList } = useCareer();

  // Generate similar jobs based on the base job
  const getSimilarJobs = (job: JobRole): JobRole[] => {
    const similarJobs: JobRole[] = [];
    
    // Generate some similar jobs based on the base job's characteristics
    if (job.title.toLowerCase().includes('analyst')) {
      similarJobs.push({
        ...job,
        id: job.id + '_similar_1',
        title: 'Senior ' + job.title,
        salaryRange: { min: 75000, max: 95000, currency: 'USD', region: 'US' }
      });
      
      similarJobs.push({
        ...job,
        id: job.id + '_similar_2',
        title: job.title.replace('Analyst', 'Specialist'),
        salaryRange: { min: 65000, max: 80000, currency: 'USD', region: 'US' }
      });
    }
    
    if (job.title.toLowerCase().includes('developer')) {
      similarJobs.push({
        ...job,
        id: job.id + '_similar_1',
        title: 'Senior ' + job.title,
        salaryRange: { min: 90000, max: 120000, currency: 'USD', region: 'US' }
      });
      
      similarJobs.push({
        ...job,
        id: job.id + '_similar_2',
        title: job.title.replace('Developer', 'Engineer'),
        salaryRange: job.salaryRange
      });
    }
    
    // Add a generic similar role if no specific matches
    if (similarJobs.length === 0) {
      similarJobs.push({
        ...job,
        id: job.id + '_similar_1',
        title: 'Senior ' + job.title,
        salaryRange: { min: 70000, max: 90000, currency: 'USD', region: 'US' }
      });
    }
    
    return similarJobs;
  };

  const similarJobs = getSimilarJobs(baseJob);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Similar to "{baseJob.title}"</h2>
        <Button variant="outline" onClick={onClose}>
          Back to Recommendations
        </Button>
      </div>
      
      <div className="grid gap-4">
        {similarJobs.map((job) => (
          <Card key={job.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{job.title}</CardTitle>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="outline">{job.industry}</Badge>
                    <Badge variant="secondary">${job.salaryRange.min / 1000}k - ${job.salaryRange.max / 1000}k</Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  {(() => {
                    const isInCompareList = compareList.some(compareJob => compareJob.id === job.id);
                    const isInGoalsList = goalsList.some(goalJob => goalJob.id === job.id);
                    
                    return (
                      <>
                        <Button
                          variant={isInCompareList ? "default" : "outline"}
                          size="sm"
                          onClick={() => isInCompareList ? removeFromCompare(job.id) : addToCompare(job)}
                          className={cn(
                            "flex items-center gap-2 transition-all duration-200",
                            isInCompareList && "bg-primary text-primary-foreground hover:bg-primary/90"
                          )}
                        >
                          <GitCompare className="h-4 w-4" />
                          {isInCompareList ? "Remove" : "Compare"}
                        </Button>
                        <Button
                          variant={isInGoalsList ? "default" : "outline"}
                          size="sm"
                          onClick={() => isInGoalsList ? removeFromGoals(job.id) : addToGoals(job)}
                          className={cn(
                            "flex items-center gap-2 transition-all duration-200",
                            isInGoalsList && "bg-primary text-primary-foreground hover:bg-primary/90"
                          )}
                        >
                          <Heart className={cn("h-4 w-4", isInGoalsList && "fill-current")} />
                          {isInGoalsList ? "Remove" : "Add Goal"}
                        </Button>
                      </>
                    );
                  })()}
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Core Responsibilities</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {job.coreResponsibilities?.slice(0, 3).map((responsibility, idx) => (
                    <li key={idx}>• {responsibility}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Skill Match</span>
                  <span className="text-sm text-muted-foreground">75%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: "75%" }}
                  />
                </div>
              </div>
              
              {job.requiredSkills?.core && (
                <div>
                  <h4 className="font-medium mb-2">Required Skills</h4>
                  <div className="flex flex-wrap gap-1">
                    {job.requiredSkills.core.slice(0, 4).map((skill, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {skill.name}
                      </Badge>
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