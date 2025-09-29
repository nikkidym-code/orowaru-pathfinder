import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ArrowLeft, ArrowRight, Plus, GripVertical, Sparkles, Building2 } from 'lucide-react';
import { useCareer } from '@/contexts/CareerContext';

const industryCategories = [
  {
    id: 'technology',
    name: 'Technology',
    icon: '💻',
    subcategories: [
      'Software Development', 'Cybersecurity', 'Data Science', 'AI/Machine Learning',
      'Cloud Computing', 'Mobile Development', 'DevOps', 'Product Management'
    ]
  },
  {
    id: 'finance',
    name: 'Finance',
    icon: '💰',
    subcategories: [
      'Investment Banking', 'Financial Planning', 'Insurance', 'Real Estate',
      'Cryptocurrency', 'Risk Management', 'Corporate Finance', 'Accounting'
    ]
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    icon: '⚕️',
    subcategories: [
      'Medical Practice', 'Nursing', 'Mental Health', 'Public Health',
      'Biotech', 'Medical Devices', 'Healthcare Administration', 'Telemedicine'
    ]
  },
  {
    id: 'education',
    name: 'Education',
    icon: '📚',
    subcategories: [
      'K-12 Teaching', 'Higher Education', 'Educational Technology', 'Corporate Training',
      'Curriculum Development', 'Educational Administration', 'Online Learning', 'Special Education'
    ]
  },
  {
    id: 'creative',
    name: 'Creative',
    icon: '🎨',
    subcategories: [
      'Graphic Design', 'Writing & Content', 'Film & Video', 'Music & Audio',
      'Gaming', 'Fashion', 'Architecture', 'Photography'
    ]
  },
  {
    id: 'business',
    name: 'Business',
    icon: '🏢',
    subcategories: [
      'Consulting', 'Marketing & Advertising', 'Sales', 'Human Resources',
      'Operations', 'Strategy', 'Business Development', 'Supply Chain'
    ]
  },
  {
    id: 'engineering',
    name: 'Engineering',
    icon: '⚙️',
    subcategories: [
      'Mechanical Engineering', 'Electrical Engineering', 'Civil Engineering', 'Chemical Engineering',
      'Aerospace', 'Environmental Engineering', 'Biomedical Engineering', 'Industrial Engineering'
    ]
  },
  {
    id: 'science',
    name: 'Science',
    icon: '🔬',
    subcategories: [
      'Research & Development', 'Laboratory Sciences', 'Environmental Science', 'Physics',
      'Chemistry', 'Biology', 'Psychology', 'Data Research'
    ]
  }
];

export const InterestsStep = () => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [rankedInterests, setRankedInterests] = useState<string[]>([]);
  const [customInterest, setCustomInterest] = useState('');
  const [phase, setPhase] = useState<'select' | 'rank'>('select');
  
  const { setCurrentStep, userProfile, setUserProfile } = useCareer();

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(prev => prev.filter(i => i !== interest));
    } else if (selectedInterests.length < 10) {
      setSelectedInterests(prev => [...prev, interest]);
    }
  };

  const addCustomInterest = () => {
    if (customInterest.trim() && !selectedInterests.includes(customInterest) && selectedInterests.length < 10) {
      setSelectedInterests(prev => [...prev, customInterest.trim()]);
      setCustomInterest('');
    }
  };

  const moveInterest = (fromIndex: number, toIndex: number) => {
    const newRanked = [...rankedInterests];
    const [moved] = newRanked.splice(fromIndex, 1);
    newRanked.splice(toIndex, 0, moved);
    setRankedInterests(newRanked);
  };

  const handleNext = () => {
    if (phase === 'select') {
      setRankedInterests([...selectedInterests]);
      setPhase('rank');
    } else {
      // Save interests profile
      const interestsProfile = {
        selectedInterests,
        rankedInterests,
        interestThemes: analyzeInterestThemes(rankedInterests)
      };
      
      setUserProfile({
        ...userProfile!,
        interestsProfile
      });
      setCurrentStep(4);
    }
  };

  const analyzeInterestThemes = (interests: string[]): string[] => {
    const themes: string[] = [];
    const techCount = interests.filter(i => 
      ['Software Development', 'Cybersecurity', 'Data Science', 'AI/Machine Learning'].includes(i)
    ).length;
    
    if (techCount >= 2) themes.push('Technology Innovation');
    
    const creativeCount = interests.filter(i =>
      ['Graphic Design', 'Writing & Content', 'Film & Video', 'Music & Audio'].includes(i)
    ).length;
    
    if (creativeCount >= 2) themes.push('Creative Expression');
    
    const businessCount = interests.filter(i =>
      ['Consulting', 'Marketing & Advertising', 'Sales', 'Strategy'].includes(i)
    ).length;
    
    if (businessCount >= 2) themes.push('Business Leadership');
    
    return themes;
  };

  const canProceed = () => {
    if (phase === 'select') return selectedInterests.length >= 3;
    return rankedInterests.length >= 3;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Interests Exploration
          </h1>
          <p className="text-xl text-muted-foreground">
            {phase === 'select' 
              ? 'Select 8-10 areas that interest you most'
              : 'Rank your selected interests by priority'
            }
          </p>
        </div>

        {phase === 'select' && (
          <div className="space-y-8">
            <Card className="p-6 shadow-lg border-0 bg-card/80 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <Plus className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">Add Custom Interest</h3>
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter an emerging field or special interest..."
                  value={customInterest}
                  onChange={(e) => setCustomInterest(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addCustomInterest()}
                />
                <Button onClick={addCustomInterest} disabled={selectedInterests.length >= 10}>
                  Add
                </Button>
              </div>
            </Card>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {industryCategories.map((category) => (
                <Card key={category.id} className="p-6 shadow-lg border-0 bg-card/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{category.icon}</span>
                    <h3 className="text-lg font-semibold">{category.name}</h3>
                  </div>
                  
                  <div className="space-y-2">
                    {category.subcategories.map((subcategory) => (
                      <Badge
                        key={subcategory}
                        variant={selectedInterests.includes(subcategory) ? "default" : "outline"}
                        className={`cursor-pointer transition-all w-full justify-start ${
                          selectedInterests.includes(subcategory)
                            ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                            : 'hover:bg-primary/10'
                        }`}
                        onClick={() => toggleInterest(subcategory)}
                      >
                        {subcategory}
                      </Badge>
                    ))}
                  </div>
                </Card>
              ))}
            </div>

            <Card className="p-6 shadow-lg border-0 bg-card/80 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <Building2 className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">Selected Interests ({selectedInterests.length}/10)</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedInterests.map((interest) => (
                  <Badge
                    key={interest}
                    variant="default"
                    className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                    onClick={() => toggleInterest(interest)}
                  >
                    {interest} ×
                  </Badge>
                ))}
              </div>
            </Card>
          </div>
        )}

        {phase === 'rank' && (
          <Card className="p-8 shadow-lg border-0 bg-card/80 backdrop-blur-sm max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-semibold">Priority Ranking</h2>
            </div>
            
            <p className="text-muted-foreground mb-6">
              Drag and drop to reorder your interests by priority (most important at the top)
            </p>
            
            <div className="space-y-3">
              {rankedInterests.map((interest, index) => (
                <div
                  key={interest}
                  className="flex items-center gap-4 p-4 bg-accent/20 rounded-lg border hover:border-primary/50 transition-all group cursor-move"
                  draggable
                  onDragStart={(e) => e.dataTransfer.setData('text/plain', index.toString())}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const draggedIndex = parseInt(e.dataTransfer.getData('text/plain'));
                    moveInterest(draggedIndex, index);
                  }}
                >
                  <GripVertical className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-semibold">
                      {index + 1}
                    </div>
                    <span className="font-medium">{interest}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={() => phase === 'rank' ? setPhase('select') : setCurrentStep(2)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="flex items-center gap-2"
          >
            {phase === 'rank' ? 'Continue' : 'Rank Interests'}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};