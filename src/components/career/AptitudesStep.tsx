import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { FileUploader } from '@/components/ui/file-uploader';
import { Slider } from '@/components/ui/slider';
import { ArrowLeft, ArrowRight, Upload, Plus, X, Brain, Award, TrendingUp } from 'lucide-react';
import { useCareer } from '@/contexts/CareerContext';

const scenarioQuestions = [
  {
    id: 1,
    question: "When facing a complex problem, I prefer to:",
    options: [
      "Break it down systematically and analyze each component",
      "Brainstorm creative solutions and think outside the box",
      "Research best practices and proven methodologies",
      "Collaborate with others to gather diverse perspectives",
      "Trust my intuition and take immediate action"
    ]
  },
  {
    id: 2,
    question: "In a team project, I naturally:",
    options: [
      "Take the lead and coordinate team efforts",
      "Focus on the technical or analytical aspects",
      "Ensure everyone's voice is heard and conflicts are resolved",
      "Generate innovative ideas and creative solutions",
      "Handle the details and ensure quality execution"
    ]
  },
  {
    id: 3,
    question: "When learning new skills, I'm most effective when:",
    options: [
      "Following structured courses and formal training",
      "Learning through hands-on practice and experimentation",
      "Working with a mentor or experienced guide",
      "Teaching others while learning myself",
      "Self-directed study and independent research"
    ]
  },
  {
    id: 4,
    question: "Under pressure, I tend to:",
    options: [
      "Stay calm and work through problems methodically",
      "Become more focused and productive",
      "Seek support and collaborate with others",
      "Find creative workarounds and unconventional solutions",
      "Prioritize ruthlessly and focus on essentials"
    ]
  },
  {
    id: 5,
    question: "When presenting ideas, I'm most confident when:",
    options: [
      "I have comprehensive data and analysis to back up my points",
      "I can tell a compelling story that connects with the audience",
      "I've practiced extensively and anticipate potential questions",
      "I can demonstrate practical applications and real-world examples",
      "I can engage in interactive discussion and adapt on the fly"
    ]
  }
];

const skillSuggestions = [
  "JavaScript", "Python", "React", "Node.js", "SQL", "Project Management", "Data Analysis",
  "Machine Learning", "UI/UX Design", "Digital Marketing", "Leadership", "Communication",
  "Problem Solving", "Team Collaboration", "Strategic Planning", "Financial Analysis",
  "Content Writing", "Public Speaking", "Negotiation", "Customer Service", "Sales",
  "Research", "Technical Writing", "Quality Assurance", "DevOps", "Cloud Computing"
];

export const AptitudesStep = () => {
  const [phase, setPhase] = useState<'upload' | 'skills' | 'assessment'>('upload');
  const [resumeText, setResumeText] = useState('');
  const [uploadedFile, setUploadedFile] = useState<{url: string; path: string; name: string} | null>(null);
  const [skills, setSkills] = useState<Array<{name: string, proficiency: number}>>([]);
  const [newSkill, setNewSkill] = useState('');
  const [scenarioAnswers, setScenarioAnswers] = useState<Record<number, number>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  
  const { setCurrentStep, userProfile, setUserProfile } = useCareer();

  const parseResume = async () => {
    setIsProcessing(true);
    // Simulate parsing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock extracted skills
    const extractedSkills = [
      { name: "JavaScript", proficiency: 4 },
      { name: "React", proficiency: 4 },
      { name: "Project Management", proficiency: 3 },
      { name: "Team Leadership", proficiency: 3 },
      { name: "Data Analysis", proficiency: 2 }
    ];
    
    setSkills(extractedSkills);
    setPhase('skills');
    setIsProcessing(false);
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.find(s => s.name.toLowerCase() === newSkill.toLowerCase())) {
      setSkills([...skills, { name: newSkill.trim(), proficiency: 3 }]);
      setNewSkill('');
    }
  };

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const updateSkillProficiency = (index: number, proficiency: number) => {
    const updatedSkills = [...skills];
    updatedSkills[index].proficiency = proficiency;
    setSkills(updatedSkills);
  };

  const handleScenarioAnswer = (questionId: number, optionIndex: number) => {
    setScenarioAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleNext = () => {
    if (phase === 'upload' && (resumeText || uploadedFile)) {
      parseResume();
    } else if (phase === 'skills') {
      setPhase('assessment');
    } else if (phase === 'assessment') {
      // Save aptitudes profile  
      const aptitudesProfile = {
        skills,
        scenarioAnswers,
        resumeData: {
          text: resumeText,
          fileName: uploadedFile?.name
        }
      };
      
      setUserProfile({
        ...userProfile!,
        aptitudesProfile
      });
      setCurrentStep(3);
    }
  };

  const canProceed = () => {
    if (phase === 'upload') return resumeText.trim() || uploadedFile;
    if (phase === 'skills') return skills.length >= 3;
    if (phase === 'assessment') return Object.keys(scenarioAnswers).length === scenarioQuestions.length;
    return false;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Aptitudes Assessment
          </h1>
          <p className="text-xl text-muted-foreground">
            Identify and validate your skills and capabilities
          </p>
        </div>

        {phase === 'upload' && (
          <Card className="p-8 shadow-lg border-0 bg-card/80 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <Upload className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-semibold">Upload Your Resume</h2>
            </div>
            
            <div className="space-y-6">
              <FileUploader
                onFileUploaded={(fileData) => setUploadedFile(fileData)}
                accept={{
                  'application/pdf': ['.pdf'],
                  'application/msword': ['.doc'],
                  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
                }}
                className="border-2 border-dashed border-primary/20 rounded-lg p-8"
              />
              
              <div className="text-center text-muted-foreground">or</div>
              
              <Textarea
                placeholder="Paste your resume text here..."
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                rows={8}
                className="resize-none"
              />
            </div>
            
            {isProcessing && (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2" />
                <p className="text-muted-foreground">Analyzing your resume...</p>
              </div>
            )}
          </Card>
        )}

        {phase === 'skills' && (
          <Card className="p-8 shadow-lg border-0 bg-card/80 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <Award className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-semibold">Review & Edit Your Skills</h2>
            </div>
            
            <div className="space-y-6">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add a skill..."
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                  className="flex-1 px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <Button onClick={addSkill} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {skillSuggestions.map((skill) => (
                  <Badge
                    key={skill}
                    variant="outline"
                    className="cursor-pointer hover:bg-primary/10"
                    onClick={() => setNewSkill(skill)}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
              
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-accent/20 rounded-lg">
                    <div className="flex-1">
                      <span className="font-medium">{skill.name}</span>
                    </div>
                    <div className="flex-1 max-w-xs">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground w-16">Beginner</span>
                        <Slider
                          value={[skill.proficiency]}
                          onValueChange={([value]) => updateSkillProficiency(index, value)}
                          max={5}
                          min={1}
                          step={1}
                          className="flex-1"
                        />
                        <span className="text-sm text-muted-foreground w-16">Expert</span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSkill(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )}

        {phase === 'assessment' && (
          <Card className="p-8 shadow-lg border-0 bg-card/80 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <Brain className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-semibold">Capability Assessment</h2>
            </div>
            
            <div className="space-y-8">
              {scenarioQuestions.map((question) => (
                <div key={question.id} className="space-y-4">
                  <h3 className="text-lg font-medium">{question.question}</h3>
                  <div className="space-y-2">
                    {question.options.map((option, index) => (
                      <label
                        key={index}
                        className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
                          scenarioAnswers[question.id] === index
                            ? 'border-primary bg-primary/10'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <input
                          type="radio"
                          name={`question-${question.id}`}
                          checked={scenarioAnswers[question.id] === index}
                          onChange={() => handleScenarioAnswer(question.id, index)}
                          className="sr-only"
                        />
                        <span className="text-sm">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(1)}
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
            {phase === 'assessment' ? 'Continue' : 'Next'}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};