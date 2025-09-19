import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar, Target, Bell, CheckCircle } from 'lucide-react';
import { useCareer } from '@/contexts/CareerContext';
import { ActionPlan, Task, ActionPlanPrefs } from '@/types/career';
import { useState, useEffect } from 'react';
import { IntelligentPlanningModule } from './IntelligentPlanningModule';
import { ExecutionSupportModule } from './ExecutionSupportModule';
import { SmartAdjustmentModule } from './SmartAdjustmentModule';
import { PlatformIntegrationModule } from './PlatformIntegrationModule';

export const ActionPlanStep = () => {
  const { userProfile, teOrowaruProfile, actionPlan, setActionPlan, setCurrentStep } = useCareer();
  const [plan, setPlan] = useState<ActionPlan | null>(actionPlan);
  const [isGenerating, setIsGenerating] = useState(!actionPlan);
  const [strugglingTask, setStrugglingTask] = useState<Task | undefined>();

  useEffect(() => {
    if (!actionPlan) {
      // Generate action plan based on Te Orowaru gaps
      setTimeout(() => {
        const generatedPlan = generateActionPlan();
        setPlan(generatedPlan);
        setActionPlan(generatedPlan);
        setIsGenerating(false);
      }, 2000);
    } else {
      setPlan(actionPlan);
      setIsGenerating(false);
    }
  }, [actionPlan, setActionPlan]);

  const generateActionPlan = (): ActionPlan => {
    if (!teOrowaruProfile) {
      return {
        id: '1',
        preferences: getDefaultPreferences(),
        tasks: [],
        dependencies: [],
        currentCareerFit: 23,
        expectedCareerFit: 48,
        syncStatus: {
          calendar: 'disconnected',
          email: 'disconnected'
        }
      };
    }

    const urgentFactors = teOrowaruProfile.factors.filter(f => f.gap > 15);
    const importantFactors = teOrowaruProfile.factors.filter(f => f.gap >= 5 && f.gap <= 15);

    const tasks: Task[] = [
      // Foundation Tasks
      {
        id: 'f1',
        title: 'Complete Skills Assessment',
        description: 'Take comprehensive assessment to identify skill gaps and strengths',
        estimatedHours: 2,
        category: 'foundation',
        priority: 'high',
        status: 'not-started',
        dependencies: [],
        resources: [
          { type: 'tool', title: 'Skills Assessment Tool', description: 'Interactive assessment platform' },
          { type: 'guide', title: 'Assessment Guide', description: 'How to maximize assessment accuracy' }
        ],
        careerFitImpact: 5,
        targetFactors: urgentFactors.slice(0, 2).map(f => f.id),
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000) // 2 days
      },
      {
        id: 'f2',
        title: 'Update CV with New Skills',
        description: 'Modernize CV to highlight relevant skills and achievements',
        estimatedHours: 3,
        category: 'foundation',
        priority: 'high',
        status: 'not-started',
        dependencies: ['f1'],
        resources: [
          { type: 'template', title: 'Modern CV Template', description: 'ATS-friendly CV format' },
          { type: 'guide', title: 'Achievement Writing Guide', description: 'How to write impactful bullets' }
        ],
        careerFitImpact: 8,
        targetFactors: ['F1'],
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 1 week
      },
      {
        id: 'f3',
        title: 'Set up LinkedIn Profile',
        description: 'Optimize LinkedIn profile for target role visibility',
        estimatedHours: 2,
        category: 'foundation',
        priority: 'medium',
        status: 'not-started',
        dependencies: ['f2'],
        resources: [
          { type: 'guide', title: 'LinkedIn Optimization Guide', description: 'Step-by-step profile optimization' },
          { type: 'tool', title: 'LinkedIn Analytics', description: 'Track profile performance' }
        ],
        careerFitImpact: 6,
        targetFactors: ['F3'],
        dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000) // 10 days
      },
      // Quick Wins
      {
        id: 'q1',
        title: 'Enroll in Excel Course',
        description: 'Complete advanced Excel course to strengthen analytical skills',
        estimatedHours: 8,
        category: 'quick-wins',
        priority: 'medium',
        status: 'not-started',
        dependencies: ['f1'],
        resources: [
          { type: 'course', title: 'Advanced Excel Course', url: 'https://coursera.org/excel', description: 'Comprehensive Excel training' }
        ],
        careerFitImpact: 10,
        targetFactors: ['F2'],
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) // 2 weeks
      },
      {
        id: 'q2',
        title: 'Join Industry Meetup',
        description: 'Attend one professional networking event in your field',
        estimatedHours: 4,
        category: 'quick-wins',
        priority: 'medium',
        status: 'not-started',
        dependencies: ['f3'],
        resources: [
          { type: 'community', title: 'Meetup Groups', description: 'Local professional networking events' }
        ],
        careerFitImpact: 7,
        targetFactors: ['F3'],
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) // 2 weeks
      },
      // Strategic Milestones
      {
        id: 's1',
        title: 'Apply for 5 Relevant Positions',
        description: 'Submit targeted applications to positions matching your profile',
        estimatedHours: 10,
        category: 'strategic',
        priority: 'high',
        status: 'not-started',
        dependencies: ['f2', 'f3'],
        resources: [
          { type: 'guide', title: 'Application Strategy Guide', description: 'How to target applications effectively' }
        ],
        careerFitImpact: 15,
        targetFactors: urgentFactors.map(f => f.id),
        dueDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000) // 2 months
      }
    ];

    return {
      id: Date.now().toString(),
      preferences: getDefaultPreferences(),
      tasks,
      dependencies: [
        { id: 'f2', dependsOn: ['f1'] },
        { id: 'f3', dependsOn: ['f2'] },
        { id: 'q1', dependsOn: ['f1'] },
        { id: 'q2', dependsOn: ['f3'] },
        { id: 's1', dependsOn: ['f2', 'f3'] }
      ],
      currentCareerFit: Math.round(teOrowaruProfile.matchPercentage),
      expectedCareerFit: Math.round(Math.min(teOrowaruProfile.matchPercentage + 25, 100)),
      nextPriorityTask: 'f1',
      syncStatus: {
        calendar: 'disconnected',
        email: 'disconnected'
      }
    };
  };

  const getDefaultPreferences = (): ActionPlanPrefs => ({
    weeklyHours: 5,
    timeSlots: ['Evening (6-9 PM)'],
    timeline: '6',
    learningStyle: 'hybrid',
    calendarAuth: false,
    emailNotifications: false
  });

  const handleTaskUpdate = (taskId: string, updates: Partial<Task>) => {
    if (!plan) return;
    
    const updatedTasks = plan.tasks.map(task => 
      task.id === taskId ? { ...task, ...updates } : task
    );
    
    const updatedPlan = { ...plan, tasks: updatedTasks };
    setPlan(updatedPlan);
    setActionPlan(updatedPlan);
  };

  const getNextPriorityTask = () => {
    if (!plan) return undefined;
    return plan.tasks.find(t => t.id === plan.nextPriorityTask);
  };

  const getWeekProgress = () => {
    if (!plan) return { completed: 0, total: 0, careerFitGain: 0 };
    const completed = plan.tasks.filter(t => t.status === 'completed').length;
    const total = plan.tasks.length;
    const careerFitGain = plan.tasks
      .filter(t => t.status === 'completed')
      .reduce((sum, task) => sum + task.careerFitImpact, 0);
    
    return { completed, total, careerFitGain };
  };

  const getNextWeekPreview = () => {
    if (!plan) return [];
    return plan.tasks
      .filter(t => t.status === 'not-started')
      .slice(0, 3);
  };

  if (isGenerating) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold mb-2">Creating Your Action Plan</h2>
          <p className="text-muted-foreground">
            Generating personalized plan based on your WorkVue assessment...
          </p>
        </div>
      </div>
    );
  }

  if (!plan) return null;

  const todaysFocus = getNextPriorityTask();
  const weekProgress = getWeekProgress();
  const nextWeekPreview = getNextWeekPreview();

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Top Navigation Area - Career Progress Dashboard */}
      <div className="relative overflow-hidden">
        <Card className="p-8 bg-gradient-to-br from-primary/10 via-primary/5 to-background border-primary/20 shadow-xl animate-fade-in">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-50" />
          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 group">
                <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Next Priority</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold">{todaysFocus?.title || 'No active tasks'}</span>
                    {todaysFocus?.dueDate && (
                      <Badge variant="outline" className="animate-pulse border-primary/30 text-primary">
                        Due: {todaysFocus.dueDate.toLocaleDateString()}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 group">
                <div className="p-2 bg-success/10 rounded-lg group-hover:bg-success/20 transition-colors">
                  <CheckCircle className="w-6 h-6 text-success" />
                </div>
                  <div>
                    <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Career Fit Progress</span>
                    <div className="flex items-center space-x-3">
                      <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                        {Math.round(plan.currentCareerFit)}% → {Math.round(plan.expectedCareerFit)}%
                      </span>
                      <Badge variant="secondary" className="bg-success/10 text-success border-success/20 animate-fade-in">
                        +{Math.round(plan.expectedCareerFit - plan.currentCareerFit)}% boost expected
                      </Badge>
                    </div>
                  </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Button 
                variant="outline" 
                size="sm" 
                className="hover-scale group bg-background/50 backdrop-blur-sm"
                onClick={() => console.log('Opening notification settings')}
              >
                <Bell className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                Notification Settings
              </Button>
              
              <div className="flex flex-col space-y-2">
                <span className="text-sm font-medium text-muted-foreground">Sync Status</span>
                <div className="flex items-center space-x-2">
                  <Badge 
                    variant={plan.syncStatus.calendar === 'connected' ? 'default' : 'secondary'}
                    className={`transition-all duration-300 cursor-pointer ${
                      plan.syncStatus.calendar === 'connected' 
                        ? 'bg-success/10 text-success border-success/30 shadow-success/20 shadow-sm' 
                        : 'bg-warning/10 text-warning border-warning/30 hover:bg-warning/20'
                    }`}
                    onClick={() => {
                      if (plan.syncStatus.calendar !== 'connected') {
                        const updatedPlan = {
                          ...plan,
                          syncStatus: { ...plan.syncStatus, calendar: 'connected' as const, lastSync: new Date() }
                        };
                        setPlan(updatedPlan);
                        setActionPlan(updatedPlan);
                      }
                    }}
                  >
                    <Calendar className="w-3 h-3 mr-1" />
                    Calendar {plan.syncStatus.calendar === 'connected' ? '✅' : '⚠️'}
                  </Badge>
                  <Badge 
                    variant={plan.syncStatus.email === 'connected' ? 'default' : 'secondary'}
                    className={`transition-all duration-300 cursor-pointer ${
                      plan.syncStatus.email === 'connected' 
                        ? 'bg-success/10 text-success border-success/30 shadow-success/20 shadow-sm' 
                        : 'bg-warning/10 text-warning border-warning/30 hover:bg-warning/20'
                    }`}
                    onClick={() => {
                      if (plan.syncStatus.email !== 'connected') {
                        const updatedPlan = {
                          ...plan,
                          syncStatus: { ...plan.syncStatus, email: 'connected' as const }
                        };
                        setPlan(updatedPlan);
                        setActionPlan(updatedPlan);
                      }
                    }}
                  >
                    📧 Email {plan.syncStatus.email === 'connected' ? '✅' : '⚠️'}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="space-y-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
        {/* Intelligent Planning Module */}
        <div className="animate-scale-in" style={{ animationDelay: '0.3s' }}>
          <IntelligentPlanningModule
            tasks={plan.tasks}
            onTaskUpdate={handleTaskUpdate}
            onApplyDefaults={() => {
              // Apply smart defaults logic
              console.log('Applying smart defaults...');
            }}
          />
        </div>

        {/* Execution Support Module */}
        <div className="animate-scale-in" style={{ animationDelay: '0.4s' }}>
          <ExecutionSupportModule
            tasks={plan.tasks}
            todaysFocus={todaysFocus}
            weekProgress={weekProgress}
            nextWeekPreview={nextWeekPreview}
            onStartTask={(taskId) => handleTaskUpdate(taskId, { status: 'in-progress' })}
            onBreakDown={(taskId) => setStrugglingTask(plan.tasks.find(t => t.id === taskId))}
            onGetHelp={(taskId) => setStrugglingTask(plan.tasks.find(t => t.id === taskId))}
            onPostpone={(taskId) => {
              const task = plan.tasks.find(t => t.id === taskId);
              if (task?.dueDate) {
                const newDueDate = new Date(task.dueDate.getTime() + 7 * 24 * 60 * 60 * 1000);
                handleTaskUpdate(taskId, { dueDate: newDueDate });
              }
            }}
          />
        </div>

        {/* Smart Adjustment Module (appears when there's a struggling task) */}
        {strugglingTask && (
          <div className="animate-scale-in">
            <SmartAdjustmentModule
              strugglingTask={strugglingTask}
              onBreakdownTask={(taskId) => {
                // Break down task into smaller parts
                console.log(`Breaking down task: ${taskId}`);
                setStrugglingTask(undefined);
              }}
              onGetSupport={(taskId, supportType) => {
                console.log(`Getting ${supportType} support for task: ${taskId}`);
                setStrugglingTask(undefined);
              }}
              onStrategicPivot={(taskId, pivotType) => {
                console.log(`Strategic pivot ${pivotType} for task: ${taskId}`);
                setStrugglingTask(undefined);
              }}
            />
          </div>
        )}

        {/* Platform Integration Module */}
        <div className="animate-scale-in" style={{ animationDelay: '0.5s' }}>
          <PlatformIntegrationModule
            syncStatus={plan.syncStatus}
            onConnectCalendar={() => {
              const updatedPlan = {
                ...plan,
                syncStatus: { ...plan.syncStatus, calendar: 'connected' as const, lastSync: new Date() }
              };
              setPlan(updatedPlan);
              setActionPlan(updatedPlan);
            }}
            onFixEmailPermissions={() => {
              const updatedPlan = {
                ...plan,
                syncStatus: { ...plan.syncStatus, email: 'connected' as const }
              };
              setPlan(updatedPlan);
              setActionPlan(updatedPlan);
            }}
            onTestEmail={() => console.log('Sending test email...')}
            onDownloadBackup={() => console.log('Downloading backup...')}
            onExportPDF={() => console.log('Exporting PDF...')}
          />
        </div>
      </div>

      <div className="flex justify-between pt-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
        <Button variant="outline" onClick={() => setCurrentStep(6)} className="hover-scale group">
          <span className="group-hover:animate-pulse">←</span>
          <span className="ml-2">Back to Preferences</span>
        </Button>
        <Button onClick={() => setCurrentStep(8)} className="hover-scale bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300">
          <span className="mr-2">View Dashboard</span>
          <span className="group-hover:animate-pulse">→</span>
        </Button>
      </div>
    </div>
  );
};