import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Target, Clock, CheckCircle, Calendar, ArrowRight, Zap, FileText, Users } from 'lucide-react';
import { Task } from '@/types/career';

interface ExecutionSupportModuleProps {
  tasks: Task[];
  todaysFocus?: Task;
  weekProgress: {
    completed: number;
    total: number;
    careerFitGain: number;
  };
  nextWeekPreview: Task[];
  onStartTask: (taskId: string) => void;
  onBreakDown: (taskId: string) => void;
  onGetHelp: (taskId: string) => void;
  onPostpone: (taskId: string) => void;
}

export const ExecutionSupportModule = ({ 
  tasks, 
  todaysFocus, 
  weekProgress, 
  nextWeekPreview,
  onStartTask,
  onBreakDown,
  onGetHelp,
  onPostpone
}: ExecutionSupportModuleProps) => {

  const completedTasks = tasks.filter(t => t.status === 'completed');
  const progressPercentage = tasks.length > 0 ? (completedTasks.length / tasks.length) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Today's Focus */}
      <Card className="p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          📅 Today's Priority
          <Badge variant="secondary" className="ml-2 text-xs">Based on your calendar & deadlines</Badge>
        </h3>

        {todaysFocus ? (
          <div className="space-y-4">
            <div className="bg-primary/5 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-3">
                <Target className="w-5 h-5 text-primary" />
                <h4 className="font-semibold text-lg">Primary Task</h4>
              </div>
              <h5 className="font-medium text-lg mb-3">{todaysFocus.title}</h5>
              <p className="text-muted-foreground mb-4">{todaysFocus.description}</p>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>Estimated time: {todaysFocus.estimatedHours}h</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>Best time slot: 2:00-3:00 PM</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-primary" />
                  <span>Resources ready: {todaysFocus.resources.length} items</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span>Prerequisites: All completed ✅</span>
                </div>
              </div>

              {/* Resources */}
              {todaysFocus.resources.length > 0 && (
                <div className="mb-4">
                  <h6 className="font-medium mb-2">🛠️ Resources ready:</h6>
                  <div className="flex flex-wrap gap-2">
                    {todaysFocus.resources.map((resource, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {resource.title}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2">
                <Button onClick={() => onStartTask(todaysFocus.id)} className="flex items-center">
                  <Zap className="w-4 h-4 mr-2" />
                  Start Now
                </Button>
                <Button variant="outline" onClick={() => onBreakDown(todaysFocus.id)}>
                  Break into 15-min chunks
                </Button>
                <Button variant="outline" onClick={() => onGetHelp(todaysFocus.id)}>
                  Get Help
                </Button>
                <Button variant="outline" onClick={() => onPostpone(todaysFocus.id)}>
                  Postpone Smartly
                </Button>
              </div>
            </div>

            {/* If Stuck Options */}
            <Card className="p-4 bg-accent/30">
              <h6 className="font-medium mb-2 flex items-center">
                🔄 If stuck:
              </h6>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant="outline">Break into 15-min chunks</Button>
                <Button size="sm" variant="outline">Get writing help</Button>
                <Button size="sm" variant="outline">Postpone smartly</Button>
              </div>
            </Card>
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <Target className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No priority task scheduled for today.</p>
            <p className="text-sm">Great job staying on track!</p>
          </div>
        )}
      </Card>

      {/* Progress Tracking */}
      <Card className="p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          📊 This Week's Momentum
        </h3>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">
                Completed ({weekProgress.completed}/{weekProgress.total})
              </span>
              <span className="text-sm text-muted-foreground">
                {Math.round((weekProgress.completed / weekProgress.total) * 100)}%
              </span>
            </div>
            <Progress value={(weekProgress.completed / weekProgress.total) * 100} className="mb-4" />
          </div>

          {/* Completed Tasks This Week */}
          <div className="space-y-2">
            {completedTasks.slice(-3).map((task) => (
              <div key={task.id} className="flex items-center space-x-3 p-3 bg-success/10 rounded-lg">
                <CheckCircle className="w-5 h-5 text-success" />
                <div className="flex-1">
                  <span className="font-medium">{task.title}</span>
                  <ArrowRight className="w-4 h-4 inline mx-2 text-muted-foreground" />
                  <Badge variant="secondary" className="text-xs">
                    +{task.careerFitImpact}% career fit
                  </Badge>
                </div>
              </div>
            ))}
          </div>

          {/* Current Task */}
          {todaysFocus && (
            <div className="flex items-center space-x-3 p-3 bg-warning/10 rounded-lg">
              <Clock className="w-5 h-5 text-warning" />
              <div className="flex-1">
                <span className="font-medium">{todaysFocus.title}</span>
                <Badge variant="outline" className="ml-2 text-xs">
                  Due: {todaysFocus.dueDate?.toDateString()}
                </Badge>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Next Week Preview */}
      <Card className="p-6">
        <h3 className="text-xl font-bold mb-4">Next Week Preview</h3>
        <div className="space-y-3">
          {nextWeekPreview.slice(0, 3).map((task, index) => (
            <div key={task.id} className="flex items-center space-x-3 p-3 border rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{task.title}</span>
                  <Badge variant="outline" className="text-xs">
                    {task.category}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {index === 0 && "Unlocked after CV completion"}
                  {index === 1 && "Opens registration Thursday"}
                  {index === 2 && "Ready to start"}
                </p>
              </div>
              <Badge variant="secondary" className="text-xs">
                {task.estimatedHours}h
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};