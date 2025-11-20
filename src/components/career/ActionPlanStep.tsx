import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar, Target, Bell, CheckCircle, Clock, AlertCircle, Star, ArrowRight, Play, SkipForward, HelpCircle, Link as LinkIcon, FileText, Zap, Info } from 'lucide-react';
import { useCareer } from '@/contexts/CareerContext';
import { ActionPlan, Task, ActionPlanPrefs } from '@/types/career';
import { useState, useEffect } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

type PriorityQuadrant = 'important-urgent' | 'important-not-urgent' | 'not-important-urgent' | 'not-important-not-urgent';
type ValueLabel = 'need-to-have' | 'nice-to-have';

export const ActionPlanStep = () => {
  const { userProfile, teOrowaruProfile, actionPlan, setActionPlan, setCurrentStep } = useCareer();
  const [plan, setPlan] = useState<ActionPlan | null>(actionPlan);
  const [isGenerating, setIsGenerating] = useState(!actionPlan);
  const [blockingTaskId, setBlockingTaskId] = useState<string | undefined>();
  const [blockingReason, setBlockingReason] = useState<'no-time' | 'difficult' | 'low-motivation' | undefined>();

  useEffect(() => {
    if (!actionPlan) {
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

  const getPriorityQuadrant = (task: Task): PriorityQuadrant => {
    if (task.priority === 'high') return 'important-urgent';
    if (task.category === 'strategic') return 'important-not-urgent';
    if (task.category === 'quick-wins') return 'not-important-urgent';
    return 'not-important-not-urgent';
  };

  const getValueLabel = (task: Task): ValueLabel => {
    return task.careerFitImpact >= 10 ? 'need-to-have' : 'nice-to-have';
  };

  const getTodaysFocusTasks = () => {
    if (!plan) return [];
    const notStarted = plan.tasks.filter(t => t.status === 'not-started' || t.status === 'in-progress');
    const primary = notStarted.find(t => t.priority === 'high');
    const backup = notStarted.find(t => t.priority === 'medium' && t.estimatedHours <= 3);
    const light = notStarted.find(t => t.estimatedHours <= 1);
    return [primary, backup, light].filter(Boolean) as Task[];
  };

  const weekProgress = getWeekProgress();

  const handleTaskAction = (taskId: string, action: 'start' | 'remind' | 'difficult' | 'skip') => {
    if (action === 'start') {
      handleTaskUpdate(taskId, { status: 'in-progress' });
    } else if (action === 'difficult') {
      setBlockingTaskId(taskId);
      setBlockingReason('difficult');
    } else if (action === 'remind') {
      // Set reminder logic
      console.log('Reminder set for task:', taskId);
    } else if (action === 'skip') {
      const task = plan?.tasks.find(t => t.id === taskId);
      if (task?.dueDate) {
        const newDueDate = new Date(task.dueDate.getTime() + 7 * 24 * 60 * 60 * 1000);
        handleTaskUpdate(taskId, { dueDate: newDueDate });
      }
    }
  };

  const handleBlockingOption = (option: 'prerequisite' | 'break-down' | 'skip') => {
    if (!blockingTaskId) return;
    
    if (option === 'skip') {
      const task = plan?.tasks.find(t => t.id === blockingTaskId);
      if (task?.dueDate) {
        const newDueDate = new Date(task.dueDate.getTime() + 7 * 24 * 60 * 60 * 1000);
        handleTaskUpdate(blockingTaskId, { dueDate: newDueDate });
      }
    }
    
    setBlockingTaskId(undefined);
    setBlockingReason(undefined);
  };

  const renderPriorityBadge = (quadrant: PriorityQuadrant) => {
    const configs = {
      'important-urgent': { label: 'Important + Urgent', color: 'bg-destructive/10 text-destructive border-destructive/30' },
      'important-not-urgent': { label: 'Important + Not Urgent', color: 'bg-primary/10 text-primary border-primary/30' },
      'not-important-urgent': { label: 'Not Important + Urgent', color: 'bg-warning/10 text-warning border-warning/30' },
      'not-important-not-urgent': { label: 'Not Important + Not Urgent', color: 'bg-muted/10 text-muted-foreground border-muted/30' }
    };
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge variant="outline" className={`${configs[quadrant].color} text-xs`}>
              {quadrant === 'important-urgent' ? 'Critical' : quadrant === 'important-not-urgent' ? 'Strategic' : quadrant === 'not-important-urgent' ? 'Time-Sensitive' : 'Deferrable'}
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-sm">{configs[quadrant].label}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  const renderValueBadge = (value: ValueLabel) => {
    return (
      <Badge 
        variant="outline" 
        className={value === 'need-to-have' ? 'bg-success/10 text-success border-success/30 text-xs' : 'bg-info/10 text-info border-info/30 text-xs'}
      >
        {value === 'need-to-have' ? '⭐ Need to Have' : '✨ Nice to Have'}
      </Badge>
    );
  };

  const renderTaskCard = (task: Task, type: 'primary' | 'backup' | 'light') => {
    const quadrant = getPriorityQuadrant(task);
    const value = getValueLabel(task);
    
    const typeConfig = {
      primary: { icon: Target, label: 'Primary Focus', color: 'border-primary/40 bg-primary/5' },
      backup: { icon: Star, label: 'Backup Task', color: 'border-secondary/40 bg-secondary/5' },
      light: { icon: Zap, label: 'Quick Win', color: 'border-success/40 bg-success/5' }
    };
    
    const Icon = typeConfig[type].icon;

    return (
      <Card key={task.id} className={`p-6 ${typeConfig[type].color} border-2 hover:shadow-lg transition-all`}>
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3 flex-1">
              <div className="p-2 bg-background rounded-lg mt-1">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="secondary" className="text-xs">{typeConfig[type].label}</Badge>
                  {renderPriorityBadge(quadrant)}
                  {renderValueBadge(value)}
                </div>
                <h3 className="text-lg font-semibold">{task.title}</h3>
                <p className="text-sm text-muted-foreground">{task.description}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{task.estimatedHours}h</span>
            </div>
            {task.dueDate && (
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>Due: {task.dueDate.toLocaleDateString()}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-warning" />
              <span>+{task.careerFitImpact}% career fit</span>
            </div>
          </div>

          {task.resources && task.resources.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium">
                <LinkIcon className="w-4 h-4" />
                <span>Execution Resources:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {task.resources.map((resource, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => resource.url && window.open(resource.url, '_blank')}
                  >
                    <FileText className="w-3 h-3 mr-1" />
                    {resource.title}
                  </Button>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-2 pt-2">
            <Button 
              onClick={() => handleTaskAction(task.id, 'start')}
              className="flex-1"
            >
              <Play className="w-4 h-4 mr-2" />
              Start Task
            </Button>
            <Button 
              variant="outline"
              onClick={() => handleTaskAction(task.id, 'remind')}
            >
              <Bell className="w-4 h-4" />
            </Button>
            <Button 
              variant="outline"
              onClick={() => handleTaskAction(task.id, 'difficult')}
            >
              <HelpCircle className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    );
  };

  const renderAllTasksMatrix = () => {
    if (!plan) return null;

    const quadrants: Record<PriorityQuadrant, Task[]> = {
      'important-urgent': [],
      'important-not-urgent': [],
      'not-important-urgent': [],
      'not-important-not-urgent': []
    };

    plan.tasks.forEach(task => {
      if (task.status !== 'completed') {
        const quadrant = getPriorityQuadrant(task);
        quadrants[quadrant].push(task);
      }
    });

    return (
      <div className="grid md:grid-cols-2 gap-4">
        {Object.entries(quadrants).map(([quadrant, tasks]) => {
          const configs = {
            'important-urgent': { title: 'Important + Urgent', subtitle: 'Critical path items', color: 'border-destructive/30' },
            'important-not-urgent': { title: 'Important + Not Urgent', subtitle: 'Strategic tasks', color: 'border-primary/30' },
            'not-important-urgent': { title: 'Not Important + Urgent', subtitle: 'Time-sensitive', color: 'border-warning/30' },
            'not-important-not-urgent': { title: 'Not Important + Not Urgent', subtitle: 'Deferrable tasks', color: 'border-muted/30' }
          };
          
          const config = configs[quadrant as PriorityQuadrant];

          return (
            <Card key={quadrant} className={`p-4 border-2 ${config.color}`}>
              <div className="mb-4">
                <h3 className="font-semibold">{config.title}</h3>
                <p className="text-sm text-muted-foreground">{config.subtitle}</p>
              </div>
              <div className="space-y-2">
                {tasks.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No tasks in this category</p>
                ) : (
                  tasks.map(task => (
                    <div key={task.id} className="p-3 bg-background rounded-lg border space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{task.title}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-muted-foreground">{task.estimatedHours}h</span>
                            {renderValueBadge(getValueLabel(task))}
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleTaskUpdate(task.id, { status: task.status === 'completed' ? 'not-started' : 'completed' })}
                        >
                          {task.status === 'completed' ? <CheckCircle className="w-4 h-4 text-success" /> : <div className="w-4 h-4 border-2 rounded-full" />}
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>
          );
        })}
      </div>
    );
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

  const todaysFocusTasks = getTodaysFocusTasks();
  const blockingTask = blockingTaskId ? plan.tasks.find(t => t.id === blockingTaskId) : undefined;

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header Section */}
      <Card className="p-8 bg-gradient-to-br from-primary/10 via-primary/5 to-background border-primary/20 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Your Action Plan</h1>
              <p className="text-muted-foreground">Break big goals into small, doable daily tasks</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-success" />
                <span className="text-sm">
                  <span className="font-bold">{weekProgress.completed}</span> of <span className="font-bold">{weekProgress.total}</span> completed
                </span>
              </div>
              <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                +{weekProgress.careerFitGain}% career fit gained
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              Weekly Summary
            </Button>
            <Button variant="outline" size="sm">
              <Bell className="w-4 h-4 mr-2" />
              Reminders
            </Button>
          </div>
        </div>
      </Card>

      {/* Today's Focus Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Today's Focus</h2>
            <p className="text-muted-foreground">Your top 3 recommended tasks for today</p>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Info className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p className="text-sm">Tasks are prioritized by urgency, importance, and your available time. Each task is designed to be completed in 15-45 minutes.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {todaysFocusTasks.map((task, idx) => 
            renderTaskCard(task, idx === 0 ? 'primary' : idx === 1 ? 'backup' : 'light')
          )}
        </div>
      </div>

      {/* Blocking Task Fallback */}
      {blockingTask && blockingReason === 'difficult' && (
        <Card className="p-6 border-warning/50 bg-warning/5 animate-fade-in">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-warning mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">Task Marked as Difficult</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  You marked "<span className="font-medium">{blockingTask.title}</span>" as difficult. Here are your options:
                </p>
                <div className="grid sm:grid-cols-3 gap-3">
                  <Button 
                    variant="outline" 
                    className="justify-start"
                    onClick={() => handleBlockingOption('prerequisite')}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Switch to prerequisite
                  </Button>
                  <Button 
                    variant="outline"
                    className="justify-start"
                    onClick={() => handleBlockingOption('break-down')}
                  >
                    <SkipForward className="w-4 h-4 mr-2" />
                    Break into subtasks
                  </Button>
                  <Button 
                    variant="outline"
                    className="justify-start"
                    onClick={() => handleBlockingOption('skip')}
                  >
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Skip for now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* All Tasks - Dual Priority Matrix */}
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold">All Tasks - Priority Matrix</h2>
          <p className="text-muted-foreground">View all tasks organized by urgency and importance</p>
        </div>
        {renderAllTasksMatrix()}
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-8">
        <Button variant="outline" onClick={() => setCurrentStep(6)}>
          ← Back to Preferences
        </Button>
        <Button onClick={() => setCurrentStep(9)} className="bg-gradient-to-r from-primary to-primary/80">
          View Dashboard →
        </Button>
      </div>
    </div>
  );
};