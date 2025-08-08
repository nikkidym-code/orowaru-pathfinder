import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Calendar, Users, ExternalLink, Clock, Video } from 'lucide-react';

export const CommunityHub = () => {
  const handleWhatsAppJoin = () => {
    // In a real implementation, this would be a dynamic WhatsApp group link
    window.open('https://chat.whatsapp.com/invite-link-here', '_blank');
  };

  const handleBookingClick = () => {
    // In a real implementation, this would integrate with a booking system like Calendly
    window.open('https://calendly.com/career-coach', '_blank');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Community & Coaching
          </CardTitle>
          <CardDescription>
            Connect with peers and get personalized guidance from career experts.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* WhatsApp Community */}
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/20 dark:to-green-900/10" />
          <CardHeader className="relative">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-green-600" />
                Career Community
              </CardTitle>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <Users className="h-3 w-3 mr-1" />
                500+ Members
              </Badge>
            </div>
            <CardDescription>
              Join our WhatsApp community to connect with fellow job seekers, share opportunities, and get peer support.
            </CardDescription>
          </CardHeader>
          <CardContent className="relative space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Daily Job Postings</p>
                  <p className="text-xs text-muted-foreground">Fresh opportunities shared daily by community members</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Peer Networking</p>
                  <p className="text-xs text-muted-foreground">Connect with professionals across different industries</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Interview Tips & Experience Sharing</p>
                  <p className="text-xs text-muted-foreground">Learn from real interview experiences and success stories</p>
                </div>
              </div>
            </div>
            
            <Button 
              onClick={handleWhatsAppJoin}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Join WhatsApp Community
              <ExternalLink className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        {/* Career Coaching */}
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/20 dark:to-blue-900/10" />
          <CardHeader className="relative">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Video className="h-5 w-5 text-blue-600" />
                1-on-1 Career Coaching
              </CardTitle>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                <Clock className="h-3 w-3 mr-1" />
                30 Min Session
              </Badge>
            </div>
            <CardDescription>
              Book a personalized session with our certified career coaches for tailored guidance.
            </CardDescription>
          </CardHeader>
          <CardContent className="relative space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Resume & CV Review</p>
                  <p className="text-xs text-muted-foreground">Get expert feedback on your resume structure and content</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Interview Preparation</p>
                  <p className="text-xs text-muted-foreground">Practice interviews and get personalized improvement tips</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Career Strategy Planning</p>
                  <p className="text-xs text-muted-foreground">Develop a clear roadmap for your career progression</p>
                </div>
              </div>
            </div>

            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Next Available:</span>
                <span className="font-medium">Today, 2:00 PM</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Duration:</span>
                <span className="font-medium">30 minutes</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Format:</span>
                <span className="font-medium">Video Call</span>
              </div>
            </div>
            
            <Button 
              onClick={handleBookingClick}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Book Coaching Session
              <ExternalLink className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Community Guidelines & Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium text-primary">WhatsApp Community Best Practices:</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-green-500">•</span>
                  <span>Share relevant job opportunities with clear details</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">•</span>
                  <span>Be supportive and encouraging to fellow members</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">•</span>
                  <span>Ask specific questions to get better help</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500">•</span>
                  <span>Celebrate wins and share success stories</span>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-primary">Coaching Session Preparation:</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500">•</span>
                  <span>Prepare specific questions or challenges to discuss</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500">•</span>
                  <span>Have your resume and target job descriptions ready</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500">•</span>
                  <span>Set clear goals for what you want to achieve</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500">•</span>
                  <span>Be open to feedback and ready to take notes</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};