import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Calendar, Clock, Target, CheckCircle, ArrowRight } from 'lucide-react';
import { useCareer } from '@/contexts/CareerContext';
import { ActionPlan, Task } from '@/types/career';
import { useState, useEffect } from 'react';

export const ActionPlanStep = () => {
  const { userProfile, teOrowaruProfile, setActionPlan, setCurrentStep } = useCareer();
  const [plan, setPlan] = useState<ActionPlan | null>(null);
  const [isGenerating, setIsGenerating] = useState(true);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Generate action plan based on Te Orowaru gaps
    setTimeout(() => {
      const generatedPlan = generateActionPlan();
      setPlan(generatedPlan);
      setActionPlan(generatedPlan);
      setIsGenerating(false);
    }, 2000);
  }, [setActionPlan]);

  const generateActionPlan = (): ActionPlan => {
    if (!teOrowaruProfile) {
      return { id: '1', duration: 12, weeklyTasks: [], expectedUplift: [], riskMitigation: [] };
    }

    const urgentFactors = teOrowaruProfile.factors.filter(f => f.gap > 15);
    const importantFactors = teOrowaruProfile.factors.filter(f => f.gap >= 5 && f.gap <= 15);

    const duration = userProfile?.timeframe?.includes('3-6') ? 12 : 
                    userProfile?.timeframe?.includes('6-12') ? 24 : 16;

    const weeklyTasks = [];
    
    // Generate tasks for first 4 weeks as example
    for (let week = 1; week <= Math.min(4, duration); week++) {
      const tasks: Task[] = [];
      
      if (week === 1) {
        tasks.push(
          {
            id: `w${week}-t1`,
            title: 'Complete LinkedIn Learning Course',
            description: 'Enroll in and complete a course related to your top skill gap',
            estimatedHours: 3,
            priority: 'urgent',
            targetFactors: urgentFactors.slice(0, 1).map(f => f.id),
            completed: false
          },
          {
            id: `w${week}-t2`,
            title: 'Set up Learning Schedule',
            description: 'Create a dedicated time slot for daily skill development',
            estimatedHours: 1,
            priority: 'important',
            targetFactors: [],
            completed: false
          }
        );
      } else if (week === 2) {
        tasks.push(
          {
            id: `w${week}-t1`,
            title: 'Practice Problem-Solving',
            description: 'Complete 5 coding challenges or case studies relevant to your field',
            estimatedHours: 4,
            priority: 'urgent',
            targetFactors: ['F2'],
            completed: false
          },
          {
            id: `w${week}-t2`,
            title: 'Join Professional Network',
            description: 'Join 2 professional groups or communities in your industry',
            estimatedHours: 2,
            priority: 'important',
            targetFactors: ['F3'],
            completed: false
          }
        );
      } else if (week === 3) {
        tasks.push(
          {
            id: `w${week}-t1`,
            title: 'Work on Personal Project',
            description: 'Start or contribute to a project that demonstrates your target skills',
            estimatedHours: 5,
            priority: 'urgent',
            targetFactors: urgentFactors.slice(0, 2).map(f => f.id),
            completed: false
          },
          {
            id: `w${week}-t2`,
            title: 'Seek Feedback',
            description: 'Get feedback on your work from a mentor or peer',
            estimatedHours: 1,
            priority: 'important',
            targetFactors: ['F3'],
            completed: false
          }
        );
      } else {
        tasks.push(
          {
            id: `w${week}-t1`,
            title: 'Apply Learning',
            description: 'Apply new skills in your current role or volunteer project',
            estimatedHours: 4,
            priority: 'continuous',
            targetFactors: importantFactors.slice(0, 2).map(f => f.id),
            completed: false
          },
          {
            id: `w${week}-t2`,
            title: 'Document Progress',
            description: 'Update your portfolio or resume with new achievements',
            estimatedHours: 2,
            priority: 'important',
            targetFactors: [],
            completed: false
          }
        );
      }

      weeklyTasks.push({
        week,
        tasks,
        measurementCriteria: [
          'Skill demonstration through practical application',
          'Completion of learning modules with passing scores',
          'Positive feedback from peers or mentors'
        ],
        resources: [
          'LinkedIn Learning, Coursera, or Udemy courses',
          'Professional communities and forums',
          'Mentorship platforms and networking events'
        ]
      });
    }

    return {
      id: Date.now().toString(),
      duration,
      weeklyTasks,
      expectedUplift: urgentFactors.slice(0, 3).map(f => ({
        factorId: f.id,
        expectedIncrease: Math.min(f.gap * 0.6, 10)
      })),
      riskMitigation: [
        'Set realistic daily time commitments to avoid burnout',
        'Regular check-ins with mentor or coach for accountability',
        'Break down large tasks into smaller, manageable chunks',
        'Build flexibility into the schedule for unexpected work demands'
      ]
    };
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
            Generating personalized SMART goals based on your Te Orowaru assessment...
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
        <Button variant="outline" onClick={() => setCurrentStep(4)}>
          Back to Assessment
        </Button>
        <Button onClick={() => setCurrentStep(6)}>
          View Dashboard
        </Button>
      </div>
    </div>
  );
};