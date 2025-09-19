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
        expectedCareerFit: 33,
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
      currentCareerFit: teOrowaruProfile.matchPercentage,
      expectedCareerFit: Math.min(teOrowaruProfile.matchPercentage + 25, 100),
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
    <div className="max-w-7xl mx-auto p-6">
      {/* Top Navigation Area - Career Progress Dashboard */}
      <Card className="p-6 mb-6 bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-primary" />
              <span className="font-medium">Next Priority:</span>
              <span className="font-semibold">{todaysFocus?.title || 'No active tasks'}</span>
              {todaysFocus?.dueDate && (
                <Badge variant="outline" className="text-xs">
                  Due: {todaysFocus.dueDate.toLocaleDateString()}
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span className="font-medium">Career Fit Progress:</span>
              <span className="font-semibold">
                {plan.currentCareerFit}% → {plan.expectedCareerFit}%
              </span>
              <Badge variant="secondary" className="text-xs">
                Expected after completing current tasks
              </Badge>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Bell className="w-4 h-4 mr-2" />
              Notification Settings
            </Button>
            <div className="flex items-center space-x-2 text-sm">
              <span>Sync Status:</span>
              <Badge variant={plan.syncStatus.calendar === 'connected' ? 'default' : 'secondary'}>
                📅 Calendar {plan.syncStatus.calendar === 'connected' ? '✅' : '⚠️'}
              </Badge>
              <Badge variant={plan.syncStatus.email === 'connected' ? 'default' : 'secondary'}>
                📧 Email {plan.syncStatus.email === 'connected' ? '✅' : '⚠️'}
              </Badge>
            </div>
          </div>
        </div>
      </Card>

      <div className="space-y-8">
        {/* Intelligent Planning Module */}
        <IntelligentPlanningModule
          tasks={plan.tasks}
          onTaskUpdate={handleTaskUpdate}
          onApplyDefaults={() => {
            // Apply smart defaults logic
            console.log('Applying smart defaults...');
          }}
        />

        {/* Execution Support Module */}
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

        {/* Smart Adjustment Module (appears when there's a struggling task) */}
        {strugglingTask && (
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
        )}

        {/* Platform Integration Module */}
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

      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={() => setCurrentStep(6)}>
          Back to Preferences
        </Button>
        <Button onClick={() => setCurrentStep(8)}>
          View Dashboard
        </Button>
      </div>
    </div>
  );
};