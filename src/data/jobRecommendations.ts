import { JobRole } from '@/types/career';

export const jobRoles: JobRole[] = [
  {
    id: 'frontend-developer',
    title: 'Frontend Developer',
    aliases: ['Front-end Developer', 'UI Developer', 'Web Developer', 'React Developer'],
    industry: 'Technology',
    functionalCategory: 'Software Development',
    description: 'Build user interfaces and experiences for web applications using modern frameworks and tools.',
    
    // Basic Job Information
    typicalEmployers: ['Tech Startups', 'Large Corporations', 'Digital Agencies', 'E-commerce Companies'],
    salaryRange: {
      min: 60000,
      max: 120000,
      currency: 'USD',
      region: 'US Average'
    },
    workLocationModel: ['full-time', 'remote', 'hybrid'],
    
    // Job Value & Career Development
    coreResponsibilities: [
      'Develop responsive user interfaces using React, HTML, CSS, and JavaScript',
      'Collaborate with designers to implement pixel-perfect designs',
      'Optimize applications for maximum speed and scalability',
      'Write clean, maintainable code and participate in code reviews',
      'Debug and troubleshoot frontend issues across different browsers'
    ],
    careerPath: {
      current: 'Frontend Developer',
      next: ['Senior Frontend Developer', 'Full-Stack Developer', 'Frontend Team Lead'],
      timeline: '2-4 years to next level'
    },
    industryOutlook: {
      demandTrend: 'high',
      aiImpact: 'positive',
      futureSkillNeeds: ['AI/ML Integration', 'WebAssembly', 'Progressive Web Apps', 'Mobile-First Development']
    },
    keyHighlights: ['High Demand', 'Remote Friendly', 'Creative & Technical'],
    
    // Skills & Competency Requirements
    requiredSkills: {
      core: [
        { name: 'JavaScript', description: 'Core programming language for web development' },
        { name: 'React', description: 'Popular frontend framework for building user interfaces' },
        { name: 'HTML/CSS', description: 'Fundamental markup and styling languages' },
        { name: 'Responsive Design', description: 'Creating layouts that work across all devices' }
      ],
      bonus: ['TypeScript', 'Node.js', 'Testing Libraries', 'GraphQL'],
      technical: ['JavaScript', 'React', 'HTML/CSS', 'TypeScript', 'Git'],
      soft: ['Problem Solving', 'Communication', 'Attention to Detail', 'Teamwork'],
      tools: ['VS Code', 'Chrome DevTools', 'Figma', 'Webpack', 'npm/yarn']
    },
    
    // Real-World Job Experience
    dayToDayWork: [
      'Code new features based on wireframes and designs; debug issues reported by QA team',
      'Attend daily standups and collaborate with backend developers on API integration'
    ],
    realStories: [
      'Promoted from junior to mid-level developer within 18 months after leading mobile redesign project',
      'Reduced page load times by 40% through code optimization and lazy loading implementation'
    ],
    prosAndCons: {
      pros: ['High demand in job market', 'Creative problem solving', 'Visible impact on user experience'],
      cons: ['Rapid technology changes require constant learning', 'Browser compatibility challenges']
    },
    relatedDiscussions: [
      { title: 'Frontend Developer Career Path - Reddit', url: '#', platform: 'Reddit' },
      { title: 'Day in the Life of a Frontend Dev', url: '#', platform: 'YouTube' }
    ],
    
    // Learning & Preparation Path
    recommendedCourses: [
      { title: 'React - The Complete Guide', provider: 'Udemy', url: '#', type: 'course' },
      { title: 'Frontend Developer Certificate', provider: 'freeCodeCamp', url: '#', type: 'certification' }
    ],
    suggestedExperience: {
      internships: ['Tech startup frontend intern', 'Agency web developer intern'],
      partTimeJobs: ['Freelance website builder', 'WordPress developer'],
      projects: ['Personal portfolio website', 'E-commerce clone', 'Weather app with API integration']
    },
    communityLinks: [
      { name: 'Frontend Developer Community', url: '#', type: 'linkedin' },
      { name: 'ReactJS Meetup', url: '#', type: 'meetup' }
    ],
    
    experienceLevel: 'entry',
    careerStages: ['starter', 'shifter']
  },
  {
    id: 'data-analyst',
    title: 'Data Analyst',
    aliases: ['Business Analyst', 'Data Scientist', 'Business Intelligence Analyst'],
    industry: 'Data & Analytics',
    functionalCategory: 'Analytics & Insights',
    description: 'Analyze data to extract insights and support business decision-making through reporting and visualization.',
    
    typicalEmployers: ['Consulting Firms', 'Financial Services', 'Healthcare', 'E-commerce', 'Government'],
    salaryRange: {
      min: 55000,
      max: 90000,
      currency: 'USD',
      region: 'US Average'
    },
    workLocationModel: ['full-time', 'remote', 'hybrid'],
    
    coreResponsibilities: [
      'Extract and analyze data from multiple sources to identify trends and patterns',
      'Create dashboards and reports to communicate insights to stakeholders',
      'Collaborate with business teams to understand requirements and define KPIs',
      'Clean and validate data to ensure accuracy of analysis',
      'Present findings and recommendations to leadership teams'
    ],
    careerPath: {
      current: 'Data Analyst',
      next: ['Senior Data Analyst', 'Data Scientist', 'Analytics Manager'],
      timeline: '3-5 years to next level'
    },
    industryOutlook: {
      demandTrend: 'high',
      aiImpact: 'positive',
      futureSkillNeeds: ['Machine Learning', 'Cloud Analytics', 'Real-time Analytics', 'Data Ethics']
    },
    keyHighlights: ['Growing Field', 'Business Impact', 'Analytical Thinking'],
    
    requiredSkills: {
      core: [
        { name: 'SQL', description: 'Query language for database management and data extraction' },
        { name: 'Excel/Spreadsheets', description: 'Advanced data manipulation and analysis' },
        { name: 'Statistics', description: 'Statistical methods for data interpretation' },
        { name: 'Data Visualization', description: 'Creating charts and dashboards to communicate insights' }
      ],
      bonus: ['Python/R', 'Machine Learning', 'Cloud Platforms', 'Big Data Tools'],
      technical: ['SQL', 'Python/R', 'Excel', 'Statistics', 'Data Visualization'],
      soft: ['Analytical Thinking', 'Communication', 'Business Acumen', 'Curiosity'],
      tools: ['Tableau', 'Power BI', 'Jupyter', 'SQL Tools', 'Excel']
    },
    
    dayToDayWork: [
      'Query databases to extract sales data; create weekly performance dashboards for management review',
      'Analyze customer behavior patterns to identify opportunities for product improvements'
    ],
    realStories: [
      'Identified $2M revenue opportunity through customer segmentation analysis',
      'Built automated reporting system that saved 15 hours/week of manual work'
    ],
    prosAndCons: {
      pros: ['Direct business impact', 'Variety in projects', 'Growing field with opportunities'],
      cons: ['Data quality issues can be frustrating', 'Stakeholder expectations may be unrealistic']
    },
    relatedDiscussions: [
      { title: 'Data Analyst vs Data Scientist', url: '#', platform: 'Reddit' },
      { title: 'Breaking into Data Analytics', url: '#', platform: 'LinkedIn' }
    ],
    
    recommendedCourses: [
      { title: 'Google Data Analytics Certificate', provider: 'Coursera', url: '#', type: 'certification' },
      { title: 'SQL for Data Analysis', provider: 'Udacity', url: '#', type: 'course' }
    ],
    suggestedExperience: {
      internships: ['Business intelligence intern', 'Market research analyst intern'],
      partTimeJobs: ['Freelance data visualization', 'Survey data analyst'],
      projects: ['Personal finance dashboard', 'Sports statistics analysis', 'Market trend analysis']
    },
    communityLinks: [
      { name: 'Data Analytics Association', url: '#', type: 'association' },
      { name: 'Local Data Science Meetup', url: '#', type: 'meetup' }
    ],
    
    experienceLevel: 'entry',
    careerStages: ['starter', 'shifter', 'explorer']
  },
  {
    id: 'product-manager',
    title: 'Product Manager',
    aliases: ['PM', 'Product Owner', 'Product Lead'],
    industry: 'Product Management',
    functionalCategory: 'Strategy & Operations',
    description: 'Lead product development from conception to launch, working with cross-functional teams.',
    
    typicalEmployers: ['Tech Companies', 'Startups', 'Financial Services', 'Healthcare', 'Retail'],
    salaryRange: {
      min: 90000,
      max: 160000,
      currency: 'USD',
      region: 'US Average'
    },
    workLocationModel: ['full-time', 'hybrid'],
    
    coreResponsibilities: [
      'Define product vision and roadmap based on market research and user feedback',
      'Collaborate with engineering, design, and marketing teams to deliver features',
      'Analyze product metrics and user data to inform product decisions',
      'Manage product backlog and prioritize features based on business value',
      'Communicate progress and results to stakeholders and leadership'
    ],
    careerPath: {
      current: 'Product Manager',
      next: ['Senior Product Manager', 'Principal Product Manager', 'VP of Product'],
      timeline: '3-5 years to next level'
    },
    industryOutlook: {
      demandTrend: 'high',
      aiImpact: 'positive',
      futureSkillNeeds: ['AI Product Strategy', 'Data-Driven Decision Making', 'Customer Experience Design']
    },
    keyHighlights: ['Strategic Impact', 'Cross-functional Leadership', 'High Compensation'],
    
    requiredSkills: {
      core: [
        { name: 'Product Strategy', description: 'Defining product vision and long-term planning' },
        { name: 'Market Research', description: 'Understanding customer needs and competitive landscape' },
        { name: 'Data Analysis', description: 'Using metrics to drive product decisions' },
        { name: 'Stakeholder Management', description: 'Coordinating across multiple teams and functions' }
      ],
      bonus: ['Technical Background', 'Design Thinking', 'Agile/Scrum', 'SQL'],
      technical: ['Product Strategy', 'Market Research', 'Analytics', 'UX/UI Understanding'],
      soft: ['Leadership', 'Communication', 'Strategic Thinking', 'Stakeholder Management'],
      tools: ['Jira', 'Figma', 'Analytics Tools', 'Roadmapping Tools', 'A/B Testing']
    },
    
    dayToDayWork: [
      'Review user feedback and analytics; prioritize feature backlog with engineering team',
      'Lead product planning meetings and present quarterly roadmap to executive team'
    ],
    realStories: [
      'Launched feature that increased user engagement by 35% and generated $5M in additional revenue',
      'Successfully pivoted product strategy based on market research, avoiding potential $10M loss'
    ],
    prosAndCons: {
      pros: ['High strategic impact', 'Variety in daily work', 'Strong compensation'],
      cons: ['High responsibility and pressure', 'Balancing competing priorities', 'Long hours during launches']
    },
    relatedDiscussions: [
      { title: 'How to Break into Product Management', url: '#', platform: 'Reddit' },
      { title: 'PM Interview Prep', url: '#', platform: 'LinkedIn' }
    ],
    
    recommendedCourses: [
      { title: 'Product Management Fundamentals', provider: 'Product School', url: '#', type: 'course' },
      { title: 'Google PM Certificate', provider: 'Coursera', url: '#', type: 'certification' }
    ],
    suggestedExperience: {
      internships: ['Product management intern', 'Strategy consulting intern'],
      partTimeJobs: ['Product marketing coordinator', 'Business analyst'],
      projects: ['Launch a small product/app', 'Conduct market research study', 'Create product roadmap']
    },
    communityLinks: [
      { name: 'Product Management Community', url: '#', type: 'linkedin' },
      { name: 'Local Product Meetup', url: '#', type: 'meetup' }
    ],
    
    experienceLevel: 'mid',
    careerStages: ['advancer', 'shifter']
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