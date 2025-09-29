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
  coreValues?: { id: string; name: string; category: string }[];
  valuesExplanation?: string;
  resumeData?: ResumeData;
  teOrowaruProfile?: TeOrowaruProfile;
  aptitudesProfile?: {
    parsedData: ResumeData | null;
    scenarioAnswers: Record<number, number>;
    resumeData: {
      text: string;
      fileName?: string;
    };
  };
  interestsProfile?: {
    selectedInterests: string[];
    rankedInterests: string[];
    interestThemes: string[];
  };
  workPreferencesProfile?: {
    preferences: Record<string, any>;
    workStyleLabel: string;
    completedAt: string;
  };
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
  preferences: ActionPlanPrefs;
  tasks: Task[];
  dependencies: TaskDependency[];
  currentCareerFit: number;
  expectedCareerFit: number;
  nextPriorityTask?: string;
  syncStatus: {
    calendar: 'connected' | 'partial' | 'disconnected';
    email: 'connected' | 'partial' | 'disconnected';
    lastSync?: Date;
  };
}

export interface ActionPlanPrefs {
  weeklyHours: number;
  timeSlots: string[];
  timeline: '3' | '6' | '12';
  learningStyle: 'online' | 'hands-on' | 'hybrid';
  calendarAuth: boolean;
  emailNotifications: boolean;
  email?: string;
}

export interface TaskDependency {
  id: string;
  dependsOn: string[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  estimatedHours: number;
  category: 'foundation' | 'quick-wins' | 'strategic';
  priority: 'high' | 'medium' | 'low';
  status: 'not-started' | 'in-progress' | 'completed' | 'skipped';
  dueDate?: Date;
  dependencies: string[];
  resources: TaskResource[];
  careerFitImpact: number;
  targetFactors: string[];
}

export interface TaskResource {
  type: 'template' | 'guide' | 'tool' | 'course' | 'community';
  title: string;
  url?: string;
  description: string;
}

export interface JobRole {
  id: string;
  title: string;
  aliases: string[];
  industry: string;
  functionalCategory: string;
  description: string;
  
  // Basic Job Information
  typicalEmployers: string[];
  salaryRange: {
    min: number;
    max: number;
    currency: string;
    region: string;
  };
  workLocationModel: ('full-time' | 'part-time' | 'remote' | 'hybrid')[];
  
  // Job Value & Career Development
  coreResponsibilities: string[];
  careerPath: {
    current: string;
    next: string[];
    timeline: string;
  };
  industryOutlook: {
    demandTrend: 'high' | 'medium' | 'low';
    aiImpact: 'positive' | 'neutral' | 'challenging';
    futureSkillNeeds: string[];
  };
  keyHighlights: string[];
  
  // Skills & Competency Requirements
  requiredSkills: {
    core: { name: string; description: string }[];
    bonus: string[];
    technical: string[];
    soft: string[];
    tools: string[];
  };
  
  // Real-World Job Experience
  dayToDayWork: string[];
  realStories: string[];
  prosAndCons: {
    pros: string[];
    cons: string[];
  };
  relatedDiscussions: {
    title: string;
    url: string;
    platform: string;
  }[];
  
  // Learning & Preparation Path
  recommendedCourses: {
    title: string;
    provider: string;
    url: string;
    type: 'course' | 'certification' | 'bootcamp';
  }[];
  suggestedExperience: {
    internships: string[];
    partTimeJobs: string[];
    projects: string[];
  };
  communityLinks: {
    name: string;
    url: string;
    type: 'association' | 'linkedin' | 'meetup' | 'forum';
  }[];
  
  experienceLevel: 'entry' | 'mid' | 'senior';
  careerStages: ('starter' | 'shifter' | 'advancer' | 'explorer')[];
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