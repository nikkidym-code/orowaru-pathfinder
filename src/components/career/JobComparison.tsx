import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, DollarSign, MapPin, TrendingUp } from 'lucide-react';
import { useCareer } from '@/contexts/CareerContext';
import { JobRole } from '@/types/career';

export const JobComparison = () => {
  const { compareList, removeFromCompare } = useCareer();

  if (compareList.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Job Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No jobs added to comparison yet. Add jobs from the recommendations to compare them side by side.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Job Comparison</h2>
        <Badge variant="secondary">{compareList.length} jobs</Badge>
      </div>
      
      <div className="grid gap-4">
        {compareList.map((job) => (
          <Card key={job.id} className="relative">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 h-8 w-8 p-0"
              onClick={() => removeFromCompare(job.id)}
            >
              <X className="h-4 w-4" />
            </Button>
            
            <CardHeader>
              <CardTitle className="pr-8">{job.title}</CardTitle>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">{job.industry}</Badge>
                {job.workLocationModel && <Badge variant="secondary">{job.workLocationModel[0]}</Badge>}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  <span className="text-sm">${job.salaryRange.min / 1000}k - ${job.salaryRange.max / 1000}k</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">{job.workLocationModel?.[0] || 'Full-time'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-purple-600" />
                  <span className="text-sm">{job.industryOutlook?.demandTrend || 'Stable'}</span>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Core Skills Required</h4>
                <div className="flex flex-wrap gap-1">
                  {job.requiredSkills?.core?.slice(0, 4).map((skill, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-1">Match Score</h4>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: "75%" }}
                  />
                </div>
                <span className="text-sm text-muted-foreground">75% match</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};