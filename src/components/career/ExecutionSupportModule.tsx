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

  return (
    <div className="space-y-8">
      {/* Today's Focus */}
      <Card className="overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-primary/5 via-background to-background">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/5 opacity-30" />
          <div className="relative p-8">
            <h3 className="text-2xl font-bold mb-6 flex items-center bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              📅 Today's Priority
              <Badge variant="secondary" className="ml-3 text-xs animate-pulse bg-primary/10 text-primary border-primary/20">
                Based on your calendar & deadlines
              </Badge>
            </h3>

            {todaysFocus ? (
              <div className="space-y-6">
                <Card className="p-6 bg-gradient-to-br from-primary/10 via-primary/5 to-background border-primary/30 shadow-inner animate-scale-in">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-3 bg-primary/20 rounded-xl">
                      <Target className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-bold text-xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                      Primary Task
                    </h4>
                  </div>
                  
                  <h5 className="font-semibold text-2xl mb-4 text-primary hover:text-primary/80 transition-colors cursor-pointer">
                    {todaysFocus.title}
                  </h5>
                  <p className="text-muted-foreground mb-6 leading-relaxed text-lg">{todaysFocus.description}</p>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="flex items-center space-x-3 p-4 bg-background/80 rounded-xl hover:bg-background transition-colors group">
                      <Clock className="w-5 h-5 text-primary group-hover:animate-spin transition-transform" />
                      <span className="font-medium">Estimated time: {todaysFocus.estimatedHours}h</span>
                    </div>
                    <div className="flex items-center space-x-3 p-4 bg-background/80 rounded-xl hover:bg-background transition-colors group">
                      <Calendar className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                      <span className="font-medium">Best time slot: 2:00-3:00 PM</span>
                    </div>
                    <div className="flex items-center space-x-3 p-4 bg-background/80 rounded-xl hover:bg-background transition-colors group">
                      <FileText className="w-5 h-5 text-primary group-hover:animate-pulse" />
                      <span className="font-medium">Resources ready: {todaysFocus.resources.length} items</span>
                    </div>
                    <div className="flex items-center space-x-3 p-4 bg-success/10 rounded-xl border border-success/20">
                      <CheckCircle className="w-5 h-5 text-success animate-pulse" />
                      <span className="font-medium text-success">Prerequisites: All completed ✅</span>
                    </div>
                  </div>

                  {/* Resources */}
                  {todaysFocus.resources.length > 0 && (
                    <div className="mb-6">
                      <h6 className="font-semibold mb-3 text-lg flex items-center">
                        🛠️ Resources ready:
                      </h6>
                      <div className="flex flex-wrap gap-3">
                        {todaysFocus.resources.map((resource, index) => (
                          <Badge key={index} variant="outline" className="text-sm p-3 hover-scale cursor-pointer bg-primary/5 hover:bg-primary/10 border-primary/30 text-primary">
                            {resource.title}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <Button onClick={() => onStartTask(todaysFocus.id)} className="hover-scale bg-gradient-to-r from-primary to-primary/80 shadow-lg hover:shadow-xl">
                      <Zap className="w-5 h-5 mr-2 animate-pulse" />
                      Start Now
                    </Button>
                    <Button variant="outline" onClick={() => onBreakDown(todaysFocus.id)} className="hover-scale">
                      Break into 15-min chunks
                    </Button>
                    <Button variant="outline" onClick={() => onGetHelp(todaysFocus.id)} className="hover-scale">
                      Get Help
                    </Button>
                    <Button variant="outline" onClick={() => onPostpone(todaysFocus.id)} className="hover-scale">
                      Postpone Smartly
                    </Button>
                  </div>
                </Card>

                {/* If Stuck Options */}
                <Card className="p-6 bg-gradient-to-r from-warning/5 to-accent/5 border-warning/20">
                  <h6 className="font-semibold mb-4 flex items-center text-lg">
                    🔄 If stuck:
                  </h6>
                  <div className="flex flex-wrap gap-3">
                    <Button size="sm" variant="outline" className="hover-scale hover:bg-warning/10">
                      Break into 15-min chunks
                    </Button>
                    <Button size="sm" variant="outline" className="hover-scale hover:bg-primary/10">
                      Get writing help
                    </Button>
                    <Button size="sm" variant="outline" className="hover-scale hover:bg-accent/20">
                      Postpone smartly
                    </Button>
                  </div>
                </Card>
              </div>
            ) : (
              <div className="text-center py-12 animate-fade-in">
                <div className="p-6 bg-success/10 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                  <Target className="w-12 h-12 text-success opacity-60" />
                </div>
                <h4 className="text-xl font-semibold mb-2 text-success">All caught up! 🎉</h4>
                <p className="text-muted-foreground">No priority task scheduled for today.</p>
                <p className="text-sm text-success font-medium mt-2">Great job staying on track!</p>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Progress Tracking */}
      <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-br from-background via-background to-success/5">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-success/10 via-transparent to-success/5 opacity-30" />
          <div className="relative p-8">
            <h3 className="text-2xl font-bold mb-6 flex items-center bg-gradient-to-r from-success to-success/70 bg-clip-text text-transparent">
              📊 This Week's Momentum
            </h3>

            <div className="space-y-6">
              <div className="p-6 bg-gradient-to-r from-success/10 to-success/5 rounded-xl border border-success/20">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold text-lg">
                    Completed ({weekProgress.completed}/{weekProgress.total})
                  </span>
                  <span className="text-lg font-bold bg-gradient-to-r from-success to-success/70 bg-clip-text text-transparent">
                    {Math.round((weekProgress.completed / weekProgress.total) * 100)}%
                  </span>
                </div>
                <Progress value={(weekProgress.completed / weekProgress.total) * 100} className="h-3 mb-4" />
              </div>

              {/* Completed Tasks This Week */}
              <div className="space-y-3">
                {completedTasks.slice(-3).map((task) => (
                  <Card key={task.id} className="p-4 bg-gradient-to-r from-success/10 to-success/5 border-success/20 hover-scale">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-success animate-pulse" />
                      <div className="flex-1">
                        <span className="font-semibold">{task.title}</span>
                        <ArrowRight className="w-4 h-4 inline mx-2 text-muted-foreground" />
                        <Badge variant="secondary" className="text-xs bg-success/20 text-success border-success/30">
                          +{task.careerFitImpact}% career fit
                        </Badge>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Current Task */}
              {todaysFocus && (
                <Card className="p-4 bg-gradient-to-r from-warning/10 to-warning/5 border-warning/20">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-warning animate-spin" />
                    <div className="flex-1">
                      <span className="font-semibold">{todaysFocus.title}</span>
                      <Badge variant="outline" className="ml-2 text-xs border-warning/30 text-warning">
                        Due: {todaysFocus.dueDate?.toDateString()}
                      </Badge>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Next Week Preview */}
      <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-br from-background via-background to-blue-500/5">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-blue-500/5 opacity-30" />
          <div className="relative p-8">
            <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-blue-400 bg-clip-text text-transparent">
              Next Week Preview
            </h3>
            <div className="space-y-4">
              {nextWeekPreview.slice(0, 3).map((task, index) => (
                <Card key={task.id} className="p-4 hover-scale border-blue-500/20 bg-gradient-to-r from-blue-500/5 to-background">
                  <div className="flex items-center space-x-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold">{task.title}</span>
                        <Badge variant="outline" className="text-xs border-blue-500/30 text-blue-500">
                          {task.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {index === 0 && "Unlocked after CV completion"}
                        {index === 1 && "Opens registration Thursday"}
                        {index === 2 && "Ready to start"}
                      </p>
                    </div>
                    <Badge variant="secondary" className="text-xs bg-blue-500/10 text-blue-500 border-blue-500/20">
                      {task.estimatedHours}h
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};