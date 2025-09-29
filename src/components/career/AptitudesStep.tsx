import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { FileUploader } from '@/components/ui/file-uploader';
import { ArrowLeft, ArrowRight, Upload, Award, Brain, Plus, X } from 'lucide-react';
import { useCareer } from '@/contexts/CareerContext';
import { ResumeData } from '@/types/career';

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

export const AptitudesStep = () => {
  const [phase, setPhase] = useState<'upload' | 'review' | 'assessment'>('upload');
  const [resumeText, setResumeText] = useState('');
  const [uploadedFile, setUploadedFile] = useState<{url: string; path: string; name: string} | null>(null);
  const [parsedData, setParsedData] = useState<ResumeData | null>(null);
  const [scenarioAnswers, setScenarioAnswers] = useState<Record<number, number>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  
  const { setCurrentStep, userProfile, setUserProfile } = useCareer();

  const parseResume = async () => {
    setIsProcessing(true);
    // Simulate parsing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock parsed data based on the image structure
    const mockParsedData: ResumeData = {
      education: [
        "Bachelor of Computer Science - University of Auckland (2020)",
        "Certified ScrumMaster - Scrum Alliance (2022)"
      ],
      workExperience: [
        "Junior Software Developer - TechCorp (2020-2022)",
        "Software Engineer - StartupXYZ (2022-Present)"
      ],
      hardSkills: ["JavaScript", "React", "Node.js", "Python", "SQL", "Git", "AWS"],
      softSkills: ["Problem Solving", "Team Collaboration", "Communication", "Leadership"],
      projects: [
        "E-commerce Platform - Led development of React-based shopping cart",
        "Mobile App - Built React Native app with 50k+ downloads"
      ],
      awards: [
        "Employee of the Month - StartupXYZ (March 2023)",
        "Best Final Year Project - University of Auckland (2020)"
      ]
    };
    
    setParsedData(mockParsedData);
    setPhase('review');
    setIsProcessing(false);
  };

  const updateEducation = (index: number, value: string) => {
    if (!parsedData) return;
    const newEducation = [...parsedData.education];
    newEducation[index] = value;
    setParsedData({ ...parsedData, education: newEducation });
  };

  const addEducation = () => {
    if (!parsedData) return;
    setParsedData({ ...parsedData, education: [...parsedData.education, ""] });
  };

  const removeEducation = (index: number) => {
    if (!parsedData) return;
    const newEducation = parsedData.education.filter((_, i) => i !== index);
    setParsedData({ ...parsedData, education: newEducation });
  };

  const updateWorkExperience = (index: number, value: string) => {
    if (!parsedData) return;
    const newWorkExperience = [...parsedData.workExperience];
    newWorkExperience[index] = value;
    setParsedData({ ...parsedData, workExperience: newWorkExperience });
  };

  const addWorkExperience = () => {
    if (!parsedData) return;
    setParsedData({ ...parsedData, workExperience: [...parsedData.workExperience, ""] });
  };

  const removeWorkExperience = (index: number) => {
    if (!parsedData) return;
    const newWorkExperience = parsedData.workExperience.filter((_, i) => i !== index);
    setParsedData({ ...parsedData, workExperience: newWorkExperience });
  };

  const updateProjects = (index: number, value: string) => {
    if (!parsedData) return;
    const newProjects = [...parsedData.projects];
    newProjects[index] = value;
    setParsedData({ ...parsedData, projects: newProjects });
  };

  const addProject = () => {
    if (!parsedData) return;
    setParsedData({ ...parsedData, projects: [...parsedData.projects, ""] });
  };

  const removeProject = (index: number) => {
    if (!parsedData) return;
    const newProjects = parsedData.projects.filter((_, i) => i !== index);
    setParsedData({ ...parsedData, projects: newProjects });
  };

  const updateAwards = (index: number, value: string) => {
    if (!parsedData) return;
    const newAwards = [...parsedData.awards];
    newAwards[index] = value;
    setParsedData({ ...parsedData, awards: newAwards });
  };

  const addAward = () => {
    if (!parsedData) return;
    setParsedData({ ...parsedData, awards: [...parsedData.awards, ""] });
  };

  const removeAward = (index: number) => {
    if (!parsedData) return;
    const newAwards = parsedData.awards.filter((_, i) => i !== index);
    setParsedData({ ...parsedData, awards: newAwards });
  };

  const updateHardSkills = (index: number, value: string) => {
    if (!parsedData) return;
    const newHardSkills = [...parsedData.hardSkills];
    newHardSkills[index] = value;
    setParsedData({ ...parsedData, hardSkills: newHardSkills });
  };

  const addHardSkill = () => {
    if (!parsedData) return;
    setParsedData({ ...parsedData, hardSkills: [...parsedData.hardSkills, ""] });
  };

  const removeHardSkill = (index: number) => {
    if (!parsedData) return;
    const newHardSkills = parsedData.hardSkills.filter((_, i) => i !== index);
    setParsedData({ ...parsedData, hardSkills: newHardSkills });
  };

  const updateSoftSkills = (index: number, value: string) => {
    if (!parsedData) return;
    const newSoftSkills = [...parsedData.softSkills];
    newSoftSkills[index] = value;
    setParsedData({ ...parsedData, softSkills: newSoftSkills });
  };

  const addSoftSkill = () => {
    if (!parsedData) return;
    setParsedData({ ...parsedData, softSkills: [...parsedData.softSkills, ""] });
  };

  const removeSoftSkill = (index: number) => {
    if (!parsedData) return;
    const newSoftSkills = parsedData.softSkills.filter((_, i) => i !== index);
    setParsedData({ ...parsedData, softSkills: newSoftSkills });
  };

  const handleScenarioAnswer = (questionId: number, optionIndex: number) => {
    setScenarioAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleNext = () => {
    if (phase === 'upload' && (resumeText || uploadedFile)) {
      parseResume();
    } else if (phase === 'review') {
      setPhase('assessment');
    } else if (phase === 'assessment') {
      // Save aptitudes profile  
      const aptitudesProfile = {
        parsedData,
        scenarioAnswers,
        resumeData: {
          text: resumeText,
          fileName: uploadedFile?.name || ''
        }
      };
      
      setUserProfile({
        ...userProfile!,
        aptitudesProfile
      });
      setCurrentStep(4);
    }
  };

  const canProceed = () => {
    if (phase === 'upload') return resumeText.trim() || uploadedFile;
    if (phase === 'review') return parsedData;
    if (phase === 'assessment') return Object.keys(scenarioAnswers).length === scenarioQuestions.length;
    return false;
  };

  const renderEditableSection = (
    title: string,
    items: string[],
    updateFn: (index: number, value: string) => void,
    addFn: () => void,
    removeFn: (index: number) => void
  ) => (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <Button onClick={addFn} size="sm" variant="outline">
          <Plus className="w-4 h-4" />
        </Button>
      </div>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-start gap-2">
            <Textarea
              value={item}
              onChange={(e) => updateFn(index, e.target.value)}
              className="resize-none min-h-[60px]"
              placeholder={`Enter ${title.toLowerCase()} details...`}
            />
            <Button
              onClick={() => removeFn(index)}
              size="sm"
              variant="ghost"
              className="mt-2"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSkillsSection = (
    title: string,
    skills: string[],
    updateFn: (index: number, value: string) => void,
    addFn: () => void,
    removeFn: (index: number) => void
  ) => (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <Button onClick={addFn} size="sm" variant="outline">
          <Plus className="w-4 h-4" />
        </Button>
      </div>
      <div className="space-y-2">
        {skills.map((skill, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="text"
              value={skill}
              onChange={(e) => updateFn(index, e.target.value)}
              className="flex-1 px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder={`Enter ${title.toLowerCase().slice(0, -1)}...`}
            />
            <Button
              onClick={() => removeFn(index)}
              size="sm"
              variant="ghost"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );

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

        {phase === 'review' && parsedData && (
          <Card className="p-8 shadow-lg border-0 bg-card/80 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <Award className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-semibold">Review & Edit Parsed Information</h2>
            </div>
            
            <div className="space-y-8">
              {renderEditableSection(
                "Education",
                parsedData.education,
                updateEducation,
                addEducation,
                removeEducation
              )}

              {renderEditableSection(
                "Work Experience",
                parsedData.workExperience,
                updateWorkExperience,
                addWorkExperience,
                removeWorkExperience
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {renderSkillsSection(
                  "Hard Skills",
                  parsedData.hardSkills,
                  updateHardSkills,
                  addHardSkill,
                  removeHardSkill
                )}

                {renderSkillsSection(
                  "Soft Skills",
                  parsedData.softSkills,
                  updateSoftSkills,
                  addSoftSkill,
                  removeSoftSkill
                )}
              </div>

              {renderEditableSection(
                "Projects",
                parsedData.projects,
                updateProjects,
                addProject,
                removeProject
              )}

              {renderEditableSection(
                "Awards & Achievements",
                parsedData.awards,
                updateAwards,
                addAward,
                removeAward
              )}
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