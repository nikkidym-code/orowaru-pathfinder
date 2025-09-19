import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar, Target, Bell, Sync, CheckCircle } from 'lucide-react';
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

  const toggleTaskCompletion = (taskId: string) => {
    const newCompleted = new Set(completedTasks);
    if (newCompleted.has(taskId)) {
      newCompleted.delete(taskId);
    } else {
      newCompleted.add(taskId);
    }
    setCompletedTasks(newCompleted);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'destructive';
      case 'important': return 'secondary';
      case 'continuous': return 'outline';
      default: return 'outline';
    }
  };

  const calculateProgress = () => {
    if (!plan) return 0;
    const totalTasks = plan.weeklyTasks.reduce((sum, week) => sum + week.tasks.length, 0);
    return totalTasks > 0 ? (completedTasks.size / totalTasks) * 100 : 0;
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

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Your Personalized Action Plan</h2>
        <p className="text-muted-foreground">
          {plan.duration}-week SMART plan to bridge your career development gaps
        </p>
      </div>

      {/* Plan Overview */}
      <Card className="p-6 mb-6">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <Calendar className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="font-semibold">{plan.duration} Weeks</div>
            <div className="text-sm text-muted-foreground">Total Duration</div>
          </div>
          <div className="text-center">
            <Target className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="font-semibold">{plan.expectedUplift.length}</div>
            <div className="text-sm text-muted-foreground">Focus Areas</div>
          </div>
          <div className="text-center">
            <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="font-semibold">
              {plan.weeklyTasks.reduce((sum, week) => 
                sum + week.tasks.reduce((taskSum, task) => taskSum + task.estimatedHours, 0), 0
              )} Hours
            </div>
            <div className="text-sm text-muted-foreground">Est. Total Time</div>
          </div>
        </div>
      </Card>

      {/* Progress Tracking */}
      <Card className="p-6 mb-6">
        <h3 className="text-xl font-bold mb-4">Progress Tracking</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-medium">Overall Completion</span>
            <span className="text-sm text-muted-foreground">
              {completedTasks.size} / {plan.weeklyTasks.reduce((sum, week) => sum + week.tasks.length, 0)} tasks
            </span>
          </div>
          <Progress value={calculateProgress()} className="w-full" />
        </div>
      </Card>

      {/* Weekly Tasks */}
      <div className="space-y-6">
        {plan.weeklyTasks.map((weekData) => (
          <Card key={weekData.week} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-primary" />
                Week {weekData.week}
              </h3>
              <Badge variant="outline">
                {weekData.tasks.filter(t => completedTasks.has(t.id)).length} / {weekData.tasks.length} Complete
              </Badge>
            </div>

            <div className="space-y-4">
              {weekData.tasks.map((task) => (
                <div key={task.id} className="flex items-start space-x-3 p-4 border rounded-lg">
                  <Checkbox
                    checked={completedTasks.has(task.id)}
                    onCheckedChange={() => toggleTaskCompletion(task.id)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className={`font-medium ${completedTasks.has(task.id) ? 'line-through text-muted-foreground' : ''}`}>
                        {task.title}
                      </h4>
                      <Badge variant={getPriorityColor(task.priority)}>
                        {task.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
                    <div className="flex items-center text-xs text-muted-foreground space-x-4">
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {task.estimatedHours}h
                      </span>
                      {task.targetFactors.length > 0 && (
                        <span className="flex items-center">
                          <Target className="w-3 h-3 mr-1" />
                          {task.targetFactors.join(', ')}
                        </span>
                      )}
                    </div>
                  </div>
                  {completedTasks.has(task.id) && (
                    <CheckCircle className="w-5 h-5 text-success" />
                  )}
                </div>
              ))}
            </div>

            {/* Week Resources */}
            <div className="mt-6 p-4 bg-accent/50 rounded-lg">
              <h4 className="font-medium mb-2">Resources & Measurement</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-medium mb-1">Resources:</div>
                  <ul className="text-muted-foreground space-y-1">
                    {weekData.resources.map((resource, idx) => (
                      <li key={idx}>• {resource}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="font-medium mb-1">Success Criteria:</div>
                  <ul className="text-muted-foreground space-y-1">
                    {weekData.measurementCriteria.map((criteria, idx) => (
                      <li key={idx}>• {criteria}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Risk Mitigation */}
      <Card className="p-6 mt-6">
        <h3 className="text-xl font-bold mb-4">Risk Mitigation Strategies</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {plan.riskMitigation.map((strategy, index) => (
            <div key={index} className="flex items-start space-x-2">
              <ArrowRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-sm">{strategy}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Expected Outcomes */}
      <Card className="p-6 mt-6">
        <h3 className="text-xl font-bold mb-4">Expected Factor Improvements</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {plan.expectedUplift.map((uplift) => {
            const factor = teOrowaruProfile?.factors.find(f => f.id === uplift.factorId);
            return (
              <div key={uplift.factorId} className="text-center p-4 border rounded-lg">
                <div className="font-medium mb-1">{factor?.name}</div>
                <div className="text-2xl font-bold text-primary">+{Math.round(uplift.expectedIncrease)}</div>
                <div className="text-sm text-muted-foreground">Expected Points</div>
              </div>
            );
          })}
        </div>
      </Card>

      <div className="flex justify-between pt-6">
        <Button variant="outline" onClick={() => setCurrentStep(5)}>
          Back to Assessment
        </Button>
        <Button onClick={() => setCurrentStep(7)}>
          View Dashboard
        </Button>
      </div>
    </div>
  );
};