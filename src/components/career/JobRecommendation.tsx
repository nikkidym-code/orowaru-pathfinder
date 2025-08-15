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
  const { addToCompare, addToGoals } = useCareer();
  const [showSimilar, setShowSimilar] = useState(false);

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
      onViewSimilar={() => setShowSimilar(true)}
    />
  );
};