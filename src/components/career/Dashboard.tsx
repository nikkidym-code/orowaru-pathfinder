import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCareer } from '@/contexts/CareerContext';
import { CoverLetterGenerator } from '@/components/tools/CoverLetterGenerator';
import { CVOptimizer } from '@/components/tools/CVOptimizer';
import { CommunityHub } from '@/components/tools/CommunityHub';
import { 
  User, 
  Target, 
  Calendar,
  TrendingUp,
  Award,
  Clock,
  CheckCircle,
  AlertCircle,
  BarChart3,
  Download,
  RotateCcw,
  FileText,
  Users,
  Wrench
} from 'lucide-react';

export const Dashboard = () => {
  const { userProfile, teOrowaruProfile, actionPlan, resetJourney } = useCareer();

  if (!userProfile || !teOrowaruProfile || !actionPlan) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Dashboard Not Available</h2>
        <p className="text-muted-foreground mb-6">
          Please complete the career assessment to view your dashboard.
        </p>
        <Button onClick={resetJourney}>Start Assessment</Button>
      </div>
    );
  }

  const completedTasks = 0; // In a real app, this would be tracked
  const totalTasks = actionPlan.weeklyTasks.reduce((sum, week) => sum + week.tasks.length, 0);
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const urgentFactors = teOrowaruProfile.factors.filter(f => f.gap > 15);
  const nextMilestone = new Date();
  nextMilestone.setMonth(nextMilestone.getMonth() + 3);

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Career Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {userProfile.email}</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button variant="outline" size="sm" onClick={resetJourney}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Restart Journey
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <div>
              <div className="text-2xl font-bold">{Math.round(teOrowaruProfile.matchPercentage)}%</div>
              <div className="text-sm text-muted-foreground">Match Score</div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">{completedTasks}</div>
              <div className="text-sm text-muted-foreground">Tasks Completed</div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">{urgentFactors.length}</div>
              <div className="text-sm text-muted-foreground">Priority Areas</div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">{actionPlan.duration}</div>
              <div className="text-sm text-muted-foreground">Week Plan</div>
            </div>
          </div>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="tools" className="flex items-center gap-2">
            <Wrench className="h-4 w-4" />
            CV Tools
          </TabsTrigger>
          <TabsTrigger value="cover-letter" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Cover Letter
          </TabsTrigger>
          <TabsTrigger value="community" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Community
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Progress Overview */}
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Progress Overview</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Action Plan Progress</span>
                    <span className="text-sm text-muted-foreground">
                      {completedTasks} / {totalTasks} tasks
                    </span>
                  </div>
                  <Progress value={progressPercentage} className="w-full" />
                  <div className="text-sm text-muted-foreground">
                    {totalTasks - completedTasks} tasks remaining in your current plan
                  </div>
                </div>
              </Card>

              {/* Current Week Tasks */}
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">This Week's Focus</h3>
                {actionPlan.weeklyTasks.length > 0 ? (
                  <div className="space-y-3">
                    {actionPlan.weeklyTasks[0].tasks.map((task) => (
                      <div key={task.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                        <div className="w-4 h-4 rounded border-2" />
                        <div className="flex-1">
                          <div className="font-medium">{task.title}</div>
                          <div className="text-sm text-muted-foreground flex items-center space-x-2">
                            <Clock className="w-3 h-3" />
                            <span>{task.estimatedHours}h</span>
                            <Badge variant="outline">
                              {task.priority}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No tasks scheduled for this week.</p>
                )}
              </Card>

              {/* Te Orowaru Categories */}
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Te Orowaru Category Scores</h3>
                <div className="space-y-4">
                  {Object.entries(teOrowaruProfile.categoryScores).map(([category, scores]) => (
                    <div key={category}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium capitalize">{category.replace('_', ' ')}</span>
                        <span className="text-sm text-muted-foreground">
                          {Math.round((scores.current / scores.target) * 100)}%
                        </span>
                      </div>
                      <Progress value={(scores.current / scores.target) * 100} className="w-full" />
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Profile Summary */}
              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Profile Summary
                </h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-medium">Career Stage:</span>
                    <Badge variant="secondary" className="ml-2 capitalize">
                      {userProfile.careerStage}
                    </Badge>
                  </div>
                  <div>
                    <span className="font-medium">Target Role:</span>
                    <div className="text-muted-foreground mt-1">
                      {userProfile.targetRole || 'Exploring options'}
                    </div>
                  </div>
                  <div>
                    <span className="font-medium">Timeframe:</span>
                    <div className="text-muted-foreground mt-1">{userProfile.timeframe}</div>
                  </div>
                  <div>
                    <span className="font-medium">Key Interests:</span>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {userProfile.interests.slice(0, 3).map((interest, idx) => (
                        <Badge key={idx} variant="outline">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Next Milestone */}
              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4">Next Milestone</h3>
                <div className="text-center">
                  <Calendar className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="font-semibold">3-Month Review</div>
                  <div className="text-sm text-muted-foreground">
                    {nextMilestone.toLocaleDateString()}
                  </div>
                  <Button variant="outline" size="sm" className="mt-3">
                    Schedule Review
                  </Button>
                </div>
              </Card>

              {/* Priority Factors */}
              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4">Priority Development</h3>
                <div className="space-y-3">
                  {urgentFactors.slice(0, 3).map((factor) => (
                    <div key={factor.id} className="flex items-center justify-between">
                      <div className="text-sm font-medium">{factor.name}</div>
                      <Badge variant="destructive">
                        -{Math.round(factor.gap)}
                      </Badge>
                    </div>
                  ))}
                  {urgentFactors.length === 0 && (
                    <p className="text-sm text-muted-foreground">
                      Great! No critical gaps identified.
                    </p>
                  )}
                </div>
              </Card>

              {/* Quick Actions */}
              <Card className="p-6">
                <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View Full Report
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Update Progress
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Calendar className="w-4 h-4 mr-2" />
                    Adjust Timeline
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="tools">
          <CVOptimizer />
        </TabsContent>

        <TabsContent value="cover-letter">
          <CoverLetterGenerator />
        </TabsContent>

        <TabsContent value="community">
          <CommunityHub />
        </TabsContent>
      </Tabs>
    </div>
  );
};