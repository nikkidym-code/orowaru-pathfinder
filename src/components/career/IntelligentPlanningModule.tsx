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
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <h4 className="font-semibold text-lg">{title}</h4>
        <Badge variant="outline" className="text-xs">{description}</Badge>
      </div>
      
      <div className="space-y-3 ml-4">
        {tasks.map((task, index) => (
          <div key={task.id} className="flex items-start space-x-3">
            <div className="flex items-center space-x-2 flex-1">
              <span className="text-lg">{getCategoryIcon(task.category)}</span>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className={`font-medium ${getStatusColor(task.status)}`}>
                    {task.title}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    <Clock className="w-3 h-3 mr-1" />
                    {task.estimatedHours}h
                  </Badge>
                  {task.dueDate && (
                    <Badge variant="secondary" className="text-xs">
                      {task.dueDate.toLocaleDateString()}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                
                {/* Dependencies indicator */}
                {task.dependencies.length > 0 && (
                  <div className="flex items-center space-x-1 mt-2 text-xs text-muted-foreground">
                    <span>Depends on:</span>
                    {task.dependencies.map(depId => {
                      const depTask = tasks.find(t => t.id === depId);
                      return depTask ? (
                        <Badge key={depId} variant="outline" className="text-xs">
                          {depTask.title}
                        </Badge>
                      ) : null;
                    })}
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <select
                  value={task.status}
                  onChange={(e) => onTaskUpdate(task.id, { status: e.target.value as Task['status'] })}
                  className="text-xs border rounded px-2 py-1"
                >
                  <option value="not-started">Not Started</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="skipped">Skipped</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {title !== 'Strategic Milestones' && (
        <div className="flex justify-center py-2">
          <ArrowDown className="w-5 h-5 text-primary" />
        </div>
      )}
    </div>
  );

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold flex items-center">
          📋 Your Career Action Roadmap
        </h3>
        <Button variant="outline" size="sm" onClick={() => setShowCustomSettings(!showCustomSettings)}>
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </Button>
      </div>

      {/* Smart Defaults Section */}
      {showCustomSettings && (
        <Card className="p-4 mb-6 bg-accent/50">
          <h4 className="font-semibold mb-3 flex items-center">
            🎛️ Recommended Settings
            <Badge variant="secondary" className="ml-2 text-xs">Click to apply all</Badge>
          </h4>
          <div className="space-y-2 mb-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="ai-timeline" defaultChecked />
              <label htmlFor="ai-timeline" className="text-sm">✅ Use AI-optimized timeline</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="smart-reminders" defaultChecked />
              <label htmlFor="smart-reminders" className="text-sm">✅ Enable smart reminders (3 days before)</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="auto-sync" defaultChecked />
              <label htmlFor="auto-sync" className="text-sm">✅ Auto-sync to Google Calendar</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="weekly-reports" defaultChecked />
              <label htmlFor="weekly-reports" className="text-sm">✅ Weekly progress email reports</label>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button onClick={onApplyDefaults} size="sm">
              <Zap className="w-4 h-4 mr-2" />
              Apply Smart Defaults
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Customize Settings
            </Button>
          </div>
        </Card>
      )}

      {/* Task Dependency Map */}
      <div className="space-y-6">
        {renderTaskGroup('Foundation Tasks', foundationTasks, 'Must Complete First')}
        {renderTaskGroup('Quick Wins', quickWinTasks, 'Ready to Start')}
        {renderTaskGroup('Strategic Milestones', strategicTasks, 'Build on foundations')}
      </div>

      {/* Summary Stats */}
      <Card className="p-4 mt-6 bg-primary/5">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-primary">{tasks.length}</div>
            <div className="text-sm text-muted-foreground">Total Tasks</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">
              {tasks.reduce((sum, task) => sum + task.estimatedHours, 0)}h
            </div>
            <div className="text-sm text-muted-foreground">Estimated Time</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">
              {Math.round(tasks.reduce((sum, task) => sum + task.careerFitImpact, 0))}%
            </div>
            <div className="text-sm text-muted-foreground">Career Fit Boost</div>
          </div>
        </div>
      </Card>
    </Card>
  );
};