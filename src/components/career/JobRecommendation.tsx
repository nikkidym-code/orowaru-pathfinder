import { JobRecommendationCard } from './JobRecommendationCard';
import { JobRole, ResumeData, CareerStage } from '@/types/career';

interface JobRecommendationProps {
  job: JobRole;
  resumeData?: ResumeData;
  careerStage: CareerStage;
  isExpanded?: boolean;
}

export const JobRecommendation = ({ job, resumeData, careerStage, isExpanded = false }: JobRecommendationProps) => {
  return (
    <JobRecommendationCard
      job={job}
      resumeData={resumeData}
      careerStage={careerStage}
      onAddToCompare={(job) => console.log('Add to compare:', job.title)}
      onAddToGoals={(job) => console.log('Add to goals:', job.title)}
      onViewSimilar={(job) => console.log('View similar:', job.title)}
    />
  );
};