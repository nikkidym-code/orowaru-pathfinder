export type CareerStage = 'starter' | 'shifter' | 'advancer' | 'explorer';

export type GoalClarity = 'clear' | 'unclear';

export interface UserProfile {
  id: string;
  email: string;
  careerStage: CareerStage;
  hasGoal: boolean;
  targetRole?: string;
  objectives: string[];
  interests: string[];
  timeframe: string;
  preferences?: string;
  resumeData?: ResumeData;
  teOrowaruProfile?: TeOrowaruProfile;
}

export interface ResumeData {
  education: string[];
  workExperience: string[];
  hardSkills: string[];
  softSkills: string[];
  projects: string[];
  awards: string[];
}

export interface TeOrowaruFactor {
  id: string;
  name: string;
  category: 'skills' | 'responsibility' | 'effort' | 'working_conditions';
  weight: number;
  maxScore: number;
  currentLevel: number;
  targetLevel: number;
  currentScore: number;
  targetScore: number;
  gap: number;
  status: 'achieved' | 'needs_improvement' | 'critical_gap';
}

export interface TeOrowaruProfile {
  factors: TeOrowaruFactor[];
  totalCurrentScore: number;
  totalTargetScore: number;
  matchPercentage: number;
  categoryScores: {
    skills: { current: number; target: number; weight: number };
    responsibility: { current: number; target: number; weight: number };
    effort: { current: number; target: number; weight: number };
    working_conditions: { current: number; target: number; weight: number };
  };
}

export interface ActionPlan {
  id: string;
  duration: number; // weeks
  weeklyTasks: WeeklyTask[];
  expectedUplift: { factorId: string; expectedIncrease: number }[];
  riskMitigation: string[];
}

export interface WeeklyTask {
  week: number;
  tasks: Task[];
  measurementCriteria: string[];
  resources: string[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  estimatedHours: number;
  priority: 'urgent' | 'important' | 'continuous';
  targetFactors: string[];
  completed: boolean;
}

export interface CareerRecommendation {
  roleTitle: string;
  industry: string;
  matchPercentage: number;
  advantageFactors: string[];
  gapFactors: string[];
  timeToBaseline: string;
  developmentRoadmap: {
    timeframe: '1year' | '3years' | '5years';
    targetFactors: { factorId: string; targetLevel: number }[];
  }[];
}