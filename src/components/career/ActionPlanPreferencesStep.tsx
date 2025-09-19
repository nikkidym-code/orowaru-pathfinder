import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, BookOpen, Mail, Link } from 'lucide-react';
import { useCareer } from '@/contexts/CareerContext';
import { ActionPlanPrefs } from '@/types/career';
import { useState } from 'react';

export const ActionPlanPreferencesStep = () => {
  const { setCurrentStep } = useCareer();
  const [preferences, setPreferences] = useState<ActionPlanPrefs>({
    weeklyHours: 5,
    timeSlots: [],
    timeline: '6',
    learningStyle: 'hybrid',
    calendarAuth: false,
    emailNotifications: false,
    email: ''
  });

  const timeSlotOptions = [
    'Early Morning (6-9 AM)', 'Morning (9-12 PM)', 'Afternoon (12-3 PM)',
    'Late Afternoon (3-6 PM)', 'Evening (6-9 PM)', 'Night (9 PM+)',
    'Weekends Only', 'Flexible'
  ];

  const handleTimeSlotChange = (slot: string, checked: boolean) => {
    setPreferences(prev => ({
      ...prev,
      timeSlots: checked 
        ? [...prev.timeSlots, slot]
        : prev.timeSlots.filter(s => s !== slot)
    }));
  };

  const handleSubmit = () => {
    if (preferences.weeklyHours && preferences.timeSlots.length > 0) {
      setCurrentStep(7); // Navigate to main action plan
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Let's Plan Your Journey</h2>
        <p className="text-muted-foreground">
          Help us create a personalized action plan that fits your schedule and preferences
        </p>
      </div>

      <div className="space-y-6">
        {/* Weekly Time Commitment */}
        <Card className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Clock className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Weekly Time Commitment</h3>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="weeklyHours">How many hours per week can you dedicate to career development?</Label>
              <Input
                id="weeklyHours"
                type="number"
                min="1"
                max="40"
                value={preferences.weeklyHours}
                onChange={(e) => setPreferences(prev => ({ ...prev, weeklyHours: parseInt(e.target.value) || 0 }))}
                className="w-24 mt-2"
              />
              <p className="text-sm text-muted-foreground mt-1">
                Recommended: 5-10 hours per week for effective progress
              </p>
            </div>
            
            <div>
              <Label className="text-base">Preferred Time Slots (Select all that apply)</Label>
              <div className="grid md:grid-cols-2 gap-3 mt-3">
                {timeSlotOptions.map((slot) => (
                  <div key={slot} className="flex items-center space-x-2">
                    <Checkbox
                      id={slot}
                      checked={preferences.timeSlots.includes(slot)}
                      onCheckedChange={(checked) => handleTimeSlotChange(slot, checked as boolean)}
                    />
                    <Label htmlFor={slot} className="text-sm">{slot}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Timeline & Learning Style */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Calendar className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Target Timeline</h3>
            </div>
            <Select value={preferences.timeline} onValueChange={(value: '3' | '6' | '12') => 
              setPreferences(prev => ({ ...prev, timeline: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select timeline" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3">3 months (Intensive)</SelectItem>
                <SelectItem value="6">6 months (Balanced)</SelectItem>
                <SelectItem value="12">12 months (Gradual)</SelectItem>
              </SelectContent>
            </Select>
          </Card>

          <Card className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <BookOpen className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Learning Style</h3>
            </div>
            <Select value={preferences.learningStyle} onValueChange={(value: 'online' | 'hands-on' | 'hybrid') => 
              setPreferences(prev => ({ ...prev, learningStyle: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select learning style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="online">Online Courses & Theory</SelectItem>
                <SelectItem value="hands-on">Hands-on Projects</SelectItem>
                <SelectItem value="hybrid">Hybrid Approach</SelectItem>
              </SelectContent>
            </Select>
          </Card>
        </div>

        {/* Platform Integration */}
        <Card className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Link className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Platform Integration</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="calendarAuth"
                checked={preferences.calendarAuth}
                onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, calendarAuth: checked as boolean }))}
              />
              <Label htmlFor="calendarAuth">Connect Google Calendar for automatic scheduling</Label>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="emailNotifications"
                  checked={preferences.emailNotifications}
                  onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, emailNotifications: checked as boolean }))}
                />
                <Label htmlFor="emailNotifications">Enable email reminders and progress reports</Label>
              </div>
              {preferences.emailNotifications && (
                <div className="ml-6">
                  <Label htmlFor="email" className="text-sm">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={preferences.email}
                    onChange={(e) => setPreferences(prev => ({ ...prev, email: e.target.value }))}
                    className="mt-1"
                  />
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-between pt-6">
          <Button variant="outline" onClick={() => setCurrentStep(5)}>
            Back to Report
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!preferences.weeklyHours || preferences.timeSlots.length === 0}
          >
            Create My Action Plan
          </Button>
        </div>
      </div>
    </div>
  );
};