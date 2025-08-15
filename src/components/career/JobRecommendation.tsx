import { useState } from 'react';
import { JobRecommendationCard } from './JobRecommendationCard';
import { SimilarJobs } from './SimilarJobs';
import { JobRole, ResumeData, CareerStage } from '@/types/career';
import { useCareer } from '@/contexts/CareerContext';

interface JobRecommendationProps {
  job: JobRole;
  resumeData?: ResumeData;
  careerStage: CareerStage;
  isExpanded?: boolean;
}

export const JobRecommendation = ({ job, resumeData, careerStage, isExpanded = false }: JobRecommendationProps) => {
  const { addToCompare, addToGoals, removeFromCompare, removeFromGoals, compareList, goalsList } = useCareer();
  const [showSimilar, setShowSimilar] = useState(false);
  
  const isInCompareList = compareList.some(compareJob => compareJob.id === job.id);
  const isInGoalsList = goalsList.some(goalJob => goalJob.id === job.id);

  if (showSimilar) {
    return <SimilarJobs baseJob={job} onClose={() => setShowSimilar(false)} />;
  }

  return (
    <JobRecommendationCard
      job={job}
      resumeData={resumeData}
      careerStage={careerStage}
      onAddToCompare={addToCompare}
      onAddToGoals={addToGoals}
      onRemoveFromCompare={removeFromCompare}
      onRemoveFromGoals={removeFromGoals}
      onViewSimilar={() => setShowSimilar(true)}
      isInCompareList={isInCompareList}
      isInGoalsList={isInGoalsList}
    />
  );
};