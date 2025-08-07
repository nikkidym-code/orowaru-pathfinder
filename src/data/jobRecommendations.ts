export interface JobRole {
  id: string;
  title: string;
  industry: string;
  description: string;
  requiredSkills: {
    technical: string[];
    soft: string[];
    tools: string[];
  };
  experienceLevel: 'entry' | 'mid' | 'senior';
  careerStages: ('starter' | 'shifter' | 'advancer' | 'explorer')[];
}

export const jobRoles: JobRole[] = [
  {
    id: 'frontend-developer',
    title: 'Frontend Developer',
    industry: 'Technology',
    description: 'Build user interfaces and experiences for web applications using modern frameworks and tools.',
    requiredSkills: {
      technical: ['JavaScript', 'React', 'HTML/CSS', 'TypeScript', 'Git'],
      soft: ['Problem Solving', 'Communication', 'Attention to Detail', 'Teamwork'],
      tools: ['VS Code', 'Chrome DevTools', 'Figma', 'Webpack', 'npm/yarn']
    },
    experienceLevel: 'entry',
    careerStages: ['starter', 'shifter']
  },
  {
    id: 'data-analyst',
    title: 'Data Analyst',
    industry: 'Data & Analytics',
    description: 'Analyze data to extract insights and support business decision-making through reporting and visualization.',
    requiredSkills: {
      technical: ['SQL', 'Python/R', 'Excel', 'Statistics', 'Data Visualization'],
      soft: ['Analytical Thinking', 'Communication', 'Business Acumen', 'Curiosity'],
      tools: ['Tableau', 'Power BI', 'Jupyter', 'SQL Tools', 'Excel']
    },
    experienceLevel: 'entry',
    careerStages: ['starter', 'shifter', 'explorer']
  },
  {
    id: 'product-manager',
    title: 'Product Manager',
    industry: 'Product Management',
    description: 'Lead product development from conception to launch, working with cross-functional teams.',
    requiredSkills: {
      technical: ['Product Strategy', 'Market Research', 'Analytics', 'UX/UI Understanding'],
      soft: ['Leadership', 'Communication', 'Strategic Thinking', 'Stakeholder Management'],
      tools: ['Jira', 'Figma', 'Analytics Tools', 'Roadmapping Tools', 'A/B Testing']
    },
    experienceLevel: 'mid',
    careerStages: ['advancer', 'shifter']
  },
  {
    id: 'ux-designer',
    title: 'UX Designer',
    industry: 'Design',
    description: 'Design user experiences and interfaces that are intuitive, accessible, and engaging.',
    requiredSkills: {
      technical: ['User Research', 'Wireframing', 'Prototyping', 'Information Architecture'],
      soft: ['Empathy', 'Creative Problem Solving', 'Communication', 'Collaboration'],
      tools: ['Figma', 'Sketch', 'Adobe Creative Suite', 'InVision', 'UsabilityHub']
    },
    experienceLevel: 'entry',
    careerStages: ['starter', 'shifter', 'explorer']
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing Specialist',
    industry: 'Marketing',
    description: 'Create and execute digital marketing campaigns across various channels to drive brand awareness and growth.',
    requiredSkills: {
      technical: ['SEO/SEM', 'Social Media Marketing', 'Content Marketing', 'Analytics', 'Email Marketing'],
      soft: ['Creativity', 'Communication', 'Analytical Thinking', 'Adaptability'],
      tools: ['Google Analytics', 'Google Ads', 'Hootsuite', 'Mailchimp', 'Canva']
    },
    experienceLevel: 'entry',
    careerStages: ['starter', 'shifter', 'explorer']
  },
  {
    id: 'business-analyst',
    title: 'Business Analyst',
    industry: 'Business Operations',
    description: 'Bridge the gap between business needs and technology solutions through analysis and requirements gathering.',
    requiredSkills: {
      technical: ['Requirements Analysis', 'Process Mapping', 'Data Analysis', 'Documentation'],
      soft: ['Critical Thinking', 'Communication', 'Problem Solving', 'Stakeholder Management'],
      tools: ['Microsoft Office', 'Visio', 'JIRA', 'SQL', 'Tableau']
    },
    experienceLevel: 'entry',
    careerStages: ['shifter', 'explorer', 'advancer']
  }
];

export const getJobRecommendations = (careerStage: string, hasGoal: boolean, targetRole?: string): JobRole[] => {
  if (hasGoal && targetRole) {
    // Find exact match or similar roles
    const exactMatch = jobRoles.find(role => 
      role.title.toLowerCase().includes(targetRole.toLowerCase()) ||
      targetRole.toLowerCase().includes(role.title.toLowerCase())
    );
    if (exactMatch) return [exactMatch];
  }

  // Filter by career stage and return top 3
  return jobRoles
    .filter(role => role.careerStages.includes(careerStage as any))
    .slice(0, 3);
};