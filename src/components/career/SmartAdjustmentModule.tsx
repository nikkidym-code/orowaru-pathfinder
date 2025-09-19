import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  AlertTriangle, 
  Clock, 
  Users, 
  Bot, 
  Phone, 
  Target, 
  Calendar,
  RotateCcw,
  CheckCircle 
} from 'lucide-react';
import { Task } from '@/types/career';

interface SmartAdjustmentModuleProps {
  strugglingTask?: Task;
  onBreakdownTask: (taskId: string) => void;
  onGetSupport: (taskId: string, supportType: 'call' | 'ai' | 'community') => void;
  onStrategicPivot: (taskId: string, pivotType: 'alternative' | 'extend' | 'replace') => void;
}

export const SmartAdjustmentModule = ({ 
  strugglingTask, 
  onBreakdownTask,
  onGetSupport,
  onStrategicPivot
}: SmartAdjustmentModuleProps) => {

  if (!strugglingTask) {
    return null;
  }

  return (
    <Card className="p-6 border-warning/50 bg-warning/5">
      <div className="flex items-center space-x-2 mb-4">
        <AlertTriangle className="w-5 h-5 text-warning" />
        <h3 className="text-xl font-bold">{strugglingTask.title} seems challenging?</h3>
        <Badge variant="secondary">Let's adapt</Badge>
      </div>

      <Alert className="mb-6">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Don't worry! Most people find this task challenging. Here are some proven strategies that have helped others succeed.
        </AlertDescription>
      </Alert>

      <div className="space-y-6">
        {/* Option 1: Break it down */}
        <Card className="p-4">
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center font-semibold">
              1
            </div>
            <h4 className="font-semibold">Break it down</h4>
          </div>
          
          <div className="space-y-3 ml-8">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">Day 1: List all work experiences (10 min)</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">Day 2: Write 2 achievement bullets (15 min)</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">Day 3: Format and review (20 min)</span>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button size="sm" onClick={() => onBreakdownTask(strugglingTask.id)}>
                ✅ Create mini-tasks
              </Button>
              <Button size="sm" variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Auto-schedule across 3 days
              </Button>
            </div>
          </div>
        </Card>

        {/* Option 2: Get support */}
        <Card className="p-4">
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center font-semibold">
              2
            </div>
            <h4 className="font-semibold">Get support</h4>
          </div>
          
          <div className="space-y-3 ml-8">
            <div className="grid gap-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-primary" />
                  <span className="text-sm">Book 15-min CV review call</span>
                </div>
                <Badge variant="outline" className="text-xs">Available slots shown</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-2">
                  <Bot className="w-4 h-4 text-primary" />
                  <span className="text-sm">Use AI writing assistant</span>
                </div>
                <Button size="sm" onClick={() => onGetSupport(strugglingTask.id, 'ai')}>
                  Generate bullets now
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="text-sm">Ask community for feedback</span>
                </div>
                <Button size="sm" variant="outline" onClick={() => onGetSupport(strugglingTask.id, 'community')}>
                  Post in #cv-help
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Option 3: Strategic pivot */}
        <Card className="p-4">
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center font-semibold">
              3
            </div>
            <h4 className="font-semibold">Strategic pivot</h4>
          </div>
          
          <div className="space-y-3 ml-8">
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-primary" />
                  <span className="text-sm">Focus on LinkedIn optimization instead?</span>
                </div>
                <Button size="sm" variant="outline" onClick={() => onStrategicPivot(strugglingTask.id, 'alternative')}>
                  Switch focus
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-warning" />
                  <span className="text-sm">Extend deadline to next Monday</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-xs">impact: -2% career fit</Badge>
                  <Button size="sm" variant="outline" onClick={() => onStrategicPivot(strugglingTask.id, 'extend')}>
                    Extend
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-2">
                  <RotateCcw className="w-4 h-4 text-primary" />
                  <span className="text-sm">Replace with: "Update 2 key experience bullets"</span>
                </div>
                <Button size="sm" onClick={() => onStrategicPivot(strugglingTask.id, 'replace')}>
                  Replace task
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Impact Assessment */}
      <Card className="p-4 mt-6 bg-accent/30">
        <h5 className="font-medium mb-2">📊 Impact Assessment</h5>
        <div className="text-sm text-muted-foreground space-y-1">
          <p>• Breaking down tasks typically increases completion rate by 80%</p>
          <p>• AI assistance reduces task time by average 40%</p>
          <p>• Community support provides motivation boost equivalent to +15% persistence</p>
          <p>• Strategic pivots maintain 90% of original career fit impact</p>
        </div>
      </Card>
    </Card>
  );
};