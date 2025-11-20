import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile, TeOrowaruProfile, ActionPlan, JobRole } from '@/types/career';

interface CareerContextType {
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile | null) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  teOrowaruProfile: TeOrowaruProfile | null;
  setTeOrowaruProfile: (profile: TeOrowaruProfile | null) => void;
  actionPlan: ActionPlan | null;
  setActionPlan: (plan: ActionPlan | null) => void;
  compareList: JobRole[];
  setCompareList: (jobs: JobRole[]) => void;
  goalsList: JobRole[];
  setGoalsList: (jobs: JobRole[]) => void;
  addToCompare: (job: JobRole) => void;
  removeFromCompare: (jobId: string) => void;
  addToGoals: (job: JobRole) => void;
  removeFromGoals: (jobId: string) => void;
  resetJourney: () => void;
}

const CareerContext = createContext<CareerContextType | undefined>(undefined);

export const useCareer = () => {
  const context = useContext(CareerContext);
  if (context === undefined) {
    throw new Error('useCareer must be used within a CareerProvider');
  }
  return context;
};

interface CareerProviderProps {
  children: ReactNode;
}

export const CareerProvider = ({ children }: CareerProviderProps) => {
  // Load initial state from sessionStorage to persist across page reloads
  const loadPersistedState = () => {
    try {
      const saved = sessionStorage.getItem('careerJourneyState');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  };

  const persisted = loadPersistedState();

  const [userProfile, setUserProfile] = useState<UserProfile | null>(persisted.userProfile || null);
  const [currentStep, setCurrentStep] = useState(persisted.currentStep || 0);
  const [teOrowaruProfile, setTeOrowaruProfile] = useState<TeOrowaruProfile | null>(persisted.teOrowaruProfile || null);
  const [actionPlan, setActionPlan] = useState<ActionPlan | null>(persisted.actionPlan || null);
  const [compareList, setCompareList] = useState<JobRole[]>(persisted.compareList || []);
  const [goalsList, setGoalsList] = useState<JobRole[]>(persisted.goalsList || []);

  // Persist state to sessionStorage whenever it changes
  useEffect(() => {
    const state = {
      currentStep,
      userProfile,
      teOrowaruProfile,
      actionPlan,
      compareList,
      goalsList
    };
    sessionStorage.setItem('careerJourneyState', JSON.stringify(state));
  }, [currentStep, userProfile, teOrowaruProfile, actionPlan, compareList, goalsList]);

  const addToCompare = (job: JobRole) => {
    setCompareList(prev => {
      if (prev.find(j => j.id === job.id)) return prev;
      return [...prev, job];
    });
  };

  const removeFromCompare = (jobId: string) => {
    setCompareList(prev => prev.filter(j => j.id !== jobId));
  };

  const addToGoals = (job: JobRole) => {
    setGoalsList(prev => {
      if (prev.find(j => j.id === job.id)) return prev;
      return [...prev, job];
    });
  };

  const removeFromGoals = (jobId: string) => {
    setGoalsList(prev => prev.filter(j => j.id !== jobId));
  };

  const resetJourney = () => {
    setUserProfile(null);
    setCurrentStep(0);
    setTeOrowaruProfile(null);
    setActionPlan(null);
    setCompareList([]);
    setGoalsList([]);
    sessionStorage.removeItem('careerJourneyState');
  };

  return (
    <CareerContext.Provider
      value={{
        userProfile,
        setUserProfile,
        currentStep,
        setCurrentStep,
        teOrowaruProfile,
        setTeOrowaruProfile,
        actionPlan,
        setActionPlan,
        compareList,
        setCompareList,
        goalsList,
        setGoalsList,
        addToCompare,
        removeFromCompare,
        addToGoals,
        removeFromGoals,
        resetJourney,
      }}
    >
      {children}
    </CareerContext.Provider>
  );
};