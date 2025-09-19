import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowDown, ArrowRight, Clock, Target, Settings, Zap } from 'lucide-react';
import { Task } from '@/types/career';
import { useState } from 'react';

interface IntelligentPlanningModuleProps {
  tasks: Task[];
  onTaskUpdate: (taskId: string, updates: Partial<Task>) => void;
  onApplyDefaults: () => void;
}

export const IntelligentPlanningModule = ({ tasks, onTaskUpdate, onApplyDefaults }: IntelligentPlanningModuleProps) => {
  const [showCustomSettings, setShowCustomSettings] = useState(false);

  const foundationTasks = tasks.filter(t => t.category === 'foundation');
  const quickWinTasks = tasks.filter(t => t.category === 'quick-wins');
  const strategicTasks = tasks.filter(t => t.category === 'strategic');

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'foundation': return '🔹';
      case 'quick-wins': return '📘';
      case 'strategic': return '🎯';
      default: return '•';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-success';
      case 'in-progress': return 'text-warning';
      case 'not-started': return 'text-muted-foreground';
      case 'skipped': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const renderTaskGroup = (title: string, tasks: Task[], description: string) => (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center space-x-3">
        <h4 className="font-bold text-xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">{title}</h4>
        <Badge variant="outline" className="text-xs font-medium border-primary/30 text-primary bg-primary/5">
          {description}
        </Badge>
      </div>
      
      <div className="space-y-3 ml-6 relative">
        {/* Connecting line */}
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/30 via-primary/20 to-primary/10" />
        
        {tasks.map((task, index) => (
          <div key={task.id} className="relative group hover-scale">
            {/* Connection dot */}
            <div className="absolute -left-6 top-6 w-3 h-3 bg-primary rounded-full shadow-lg group-hover:scale-125 transition-transform duration-200" />
            
            <Card className="p-5 hover:shadow-xl transition-all duration-300 border-l-4 border-l-primary/30 hover:border-l-primary bg-gradient-to-r from-background to-background/80 group-hover:from-primary/5 group-hover:to-background">
              <div className="flex items-start space-x-4">
                <span className="text-2xl">{getCategoryIcon(task.category)}</span>
                <div className="flex-1 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className={`font-semibold text-lg ${getStatusColor(task.status)} group-hover:text-primary transition-colors`}>
                        {task.title}
                      </span>
                      <Badge variant="outline" className="text-xs animate-pulse">
                        <Clock className="w-3 h-3 mr-1" />
                        {task.estimatedHours}h
                      </Badge>
                      {task.dueDate && (
                        <Badge variant="secondary" className="text-xs bg-primary/10 text-primary border-primary/20">
                          {task.dueDate.toLocaleDateString()}
                        </Badge>
                      )}
                    </div>
                    
                    <select
                      value={task.status}
                      onChange={(e) => onTaskUpdate(task.id, { status: e.target.value as Task['status'] })}
                      className="text-xs border rounded-lg px-3 py-1 bg-background/80 hover:bg-background transition-colors focus:ring-2 focus:ring-primary/30 focus:border-primary/50"
                    >
                      <option value="not-started">Not Started</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="skipped">Skipped</option>
                    </select>
                  </div>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed">{task.description}</p>
                  
                  {/* Dependencies indicator */}
                  {task.dependencies.length > 0 && (
                    <div className="flex items-center space-x-2 text-xs">
                      <span className="font-medium text-muted-foreground">Depends on:</span>
                      <div className="flex flex-wrap gap-1">
                        {task.dependencies.map(depId => {
                          const depTask = tasks.find(t => t.id === depId);
                          return depTask ? (
                            <Badge key={depId} variant="outline" className="text-xs bg-accent/30 hover:bg-accent/50 transition-colors">
                              {depTask.title}
                            </Badge>
                          ) : null;
                        })}
                      </div>
                    </div>
                  )}
                  
                  {/* Impact indicator */}
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <Target className="w-3 h-3 text-success" />
                      <span className="font-medium text-success">+{task.careerFitImpact}% career fit boost</span>
                    </div>
                    {task.targetFactors.length > 0 && (
                      <div className="flex items-center space-x-1">
                        <span className="text-muted-foreground">Targets:</span>
                        <span className="font-medium text-primary">{task.targetFactors.join(', ')}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
      
      {title !== 'Strategic Milestones' && (
        <div className="flex justify-center py-4">
          <div className="flex items-center space-x-2 text-primary/60">
            <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-primary/30" />
            <ArrowDown className="w-6 h-6 animate-bounce" />
            <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-primary/30" />
          </div>
        </div>
      )}
    </div>
  );

  return (
    <Card className="overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-background via-background to-primary/5">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/5 opacity-50" />
        <div className="relative p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold flex items-center bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              📋 Your Career Action Roadmap
            </h3>
            <Button variant="outline" size="sm" onClick={() => setShowCustomSettings(!showCustomSettings)} className="hover-scale group">
              <Settings className="w-4 h-4 mr-2 group-hover:animate-spin transition-transform duration-500" />
              Settings
            </Button>
          </div>

      {/* Smart Defaults Section */}
      {showCustomSettings && (
        <div className="animate-accordion-down">
          <Card className="p-6 mb-8 bg-gradient-to-r from-accent/30 to-accent/10 border-accent/30 shadow-inner">
            <h4 className="font-semibold mb-4 flex items-center text-lg">
              🎛️ Recommended Settings
              <Badge variant="secondary" className="ml-3 text-xs animate-pulse bg-primary/10 text-primary border-primary/20">
                Click to apply all
              </Badge>
            </h4>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-background/50 hover:bg-background/70 transition-colors group">
                  <Checkbox id="ai-timeline" defaultChecked className="group-hover:scale-110 transition-transform" />
                  <label htmlFor="ai-timeline" className="text-sm font-medium cursor-pointer">✅ AI-optimized timeline</label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-background/50 hover:bg-background/70 transition-colors group">
                  <Checkbox id="smart-reminders" defaultChecked className="group-hover:scale-110 transition-transform" />
                  <label htmlFor="smart-reminders" className="text-sm font-medium cursor-pointer">✅ Smart reminders (3 days before)</label>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-background/50 hover:bg-background/70 transition-colors group">
                  <Checkbox id="auto-sync" defaultChecked className="group-hover:scale-110 transition-transform" />
                  <label htmlFor="auto-sync" className="text-sm font-medium cursor-pointer">✅ Auto-sync to Google Calendar</label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-background/50 hover:bg-background/70 transition-colors group">
                  <Checkbox id="weekly-reports" defaultChecked className="group-hover:scale-110 transition-transform" />
                  <label htmlFor="weekly-reports" className="text-sm font-medium cursor-pointer">✅ Weekly progress email reports</label>
                </div>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button onClick={onApplyDefaults} size="sm" className="hover-scale bg-gradient-to-r from-primary to-primary/80">
                <Zap className="w-4 h-4 mr-2" />
                Apply Smart Defaults
              </Button>
              <Button variant="outline" size="sm" className="hover-scale">
                <Settings className="w-4 h-4 mr-2" />
                Customize Settings
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Task Dependency Map */}
      <div className="space-y-8">
        {renderTaskGroup('Foundation Tasks', foundationTasks, 'Must Complete First')}
        {renderTaskGroup('Quick Wins', quickWinTasks, 'Ready to Start')}
        {renderTaskGroup('Strategic Milestones', strategicTasks, 'Build on foundations')}
      </div>

      {/* Summary Stats */}
      <Card className="p-6 mt-8 bg-gradient-to-r from-primary/5 via-primary/3 to-success/5 border-primary/20 shadow-lg">
        <div className="grid grid-cols-3 gap-6 text-center">
          <div className="group hover-scale cursor-pointer">
            <div className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent group-hover:from-primary/80 group-hover:to-primary transition-all duration-300">
              {tasks.length}
            </div>
            <div className="text-sm text-muted-foreground font-medium">Total Tasks</div>
          </div>
          <div className="group hover-scale cursor-pointer">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-blue-400 bg-clip-text text-transparent group-hover:from-blue-400 group-hover:to-blue-300 transition-all duration-300">
              {tasks.reduce((sum, task) => sum + task.estimatedHours, 0)}h
            </div>
            <div className="text-sm text-muted-foreground font-medium">Estimated Time</div>
          </div>
          <div className="group hover-scale cursor-pointer">
            <div className="text-3xl font-bold bg-gradient-to-r from-success to-success/70 bg-clip-text text-transparent group-hover:from-success/80 group-hover:to-success transition-all duration-300">
              {Math.round(tasks.reduce((sum, task) => sum + task.careerFitImpact, 0))}%
            </div>
            <div className="text-sm text-muted-foreground font-medium">Career Fit Boost</div>
          </div>
        </div>
      </Card>
        </div>
      </div>
    </Card>
  );
};