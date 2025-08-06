import { TeOrowaruFactor } from '@/types/career';

export const teOrowaruFactors: Omit<TeOrowaruFactor, 'currentLevel' | 'targetLevel' | 'currentScore' | 'targetScore' | 'gap' | 'status'>[] = [
  // Skills (42%)
  {
    id: 'F1',
    name: 'Knowledge & Understanding',
    category: 'skills',
    weight: 0.42 * 0.25,
    maxScore: 10
  },
  {
    id: 'F2',
    name: 'Problem-solving',
    category: 'skills',
    weight: 0.42 * 0.20,
    maxScore: 7
  },
  {
    id: 'F3',
    name: 'Interpersonal & Communication',
    category: 'skills',
    weight: 0.42 * 0.20,
    maxScore: 6
  },
  {
    id: 'F4',
    name: 'Te ao Māori (Cultural capability)',
    category: 'skills',
    weight: 0.42 * 0.15,
    maxScore: 4
  },
  {
    id: 'F5',
    name: 'Planning & Organisational',
    category: 'skills',
    weight: 0.42 * 0.15,
    maxScore: 6
  },
  {
    id: 'F6',
    name: 'Physical Skills',
    category: 'skills',
    weight: 0.42 * 0.05,
    maxScore: 5
  },
  
  // Responsibility (37%)
  {
    id: 'F7',
    name: 'People Leadership',
    category: 'responsibility',
    weight: 0.37 * 0.25,
    maxScore: 7
  },
  {
    id: 'F8',
    name: 'Information Responsibility',
    category: 'responsibility',
    weight: 0.37 * 0.20,
    maxScore: 5
  },
  {
    id: 'F9',
    name: 'Physical & Financial Resources',
    category: 'responsibility',
    weight: 0.37 * 0.20,
    maxScore: 5
  },
  {
    id: 'F10',
    name: 'Organisational Outcomes',
    category: 'responsibility',
    weight: 0.37 * 0.25,
    maxScore: 8
  },
  {
    id: 'F11',
    name: 'Services to People',
    category: 'responsibility',
    weight: 0.37 * 0.10,
    maxScore: 6
  },
  
  // Effort (16%)
  {
    id: 'F12',
    name: 'Emotional Effort',
    category: 'effort',
    weight: 0.16 * 0.40,
    maxScore: 6
  },
  {
    id: 'F13',
    name: 'Sensory Effort',
    category: 'effort',
    weight: 0.16 * 0.30,
    maxScore: 5
  },
  {
    id: 'F14',
    name: 'Physical Effort',
    category: 'effort',
    weight: 0.16 * 0.30,
    maxScore: 6
  },
  
  // Working Conditions (5%)
  {
    id: 'F15',
    name: 'Working Conditions',
    category: 'working_conditions',
    weight: 0.05,
    maxScore: 5
  }
];

export const categoryWeights = {
  skills: 0.42,
  responsibility: 0.37,
  effort: 0.16,
  working_conditions: 0.05
};

export const categoryNames = {
  skills: 'Skills',
  responsibility: 'Responsibility', 
  effort: 'Effort',
  working_conditions: 'Working Conditions'
};