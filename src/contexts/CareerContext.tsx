import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserProfile, TeOrowaruProfile, ActionPlan } from '@/types/career';

interface CareerContextType {
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile | null) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  teOrowaruProfile: TeOrowaruProfile | null;
  setTeOrowaruProfile: (profile: TeOrowaruProfile | null) => void;
  actionPlan: ActionPlan | null;
  setActionPlan: (plan: ActionPlan | null) => void;
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
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [teOrowaruProfile, setTeOrowaruProfile] = useState<TeOrowaruProfile | null>(null);
  const [actionPlan, setActionPlan] = useState<ActionPlan | null>(null);

  const resetJourney = () => {
    setUserProfile(null);
    setCurrentStep(0);
    setTeOrowaruProfile(null);
    setActionPlan(null);
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
        resetJourney,
      }}
    >
      {children}
    </CareerContext.Provider>
  );
};