import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Upload, FileText, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { useCareer } from '@/contexts/CareerContext';
import { ResumeData } from '@/types/career';

export const ResumeStep = () => {
  const { userProfile, setUserProfile, setCurrentStep } = useCareer();
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [parsedData, setParsedData] = useState<ResumeData | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Simulated resume parsing
  const parseResume = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const mockParsedData: ResumeData = {
        education: [
          'Bachelor of Computer Science - University of Auckland (2020)',
          'Certified ScrumMaster - Scrum Alliance (2022)'
        ],
        workExperience: [
          'Junior Software Developer - TechCorp (2020-2022)',
          'Software Engineer - StartupXYZ (2022-Present)'
        ],
        hardSkills: [
          'JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'Git', 'AWS'
        ],
        softSkills: [
          'Problem Solving', 'Team Collaboration', 'Communication', 'Leadership'
        ],
        projects: [
          'E-commerce Platform - Led development of React-based shopping cart',
          'Mobile App - Built React Native app with 50k+ downloads'
        ],
        awards: [
          'Employee of the Month - StartupXYZ (March 2023)',
          'Best Final Year Project - University of Auckland (2020)'
        ]
      };
      setParsedData(mockParsedData);
      setIsProcessing(false);
    }, 2000);
  };

  const handleConfirmData = () => {
    if (userProfile && parsedData) {
      setUserProfile({
        ...userProfile,
        resumeData: parsedData
      });
      setCurrentStep(3);
    }
  };

  const handleEditField = (field: keyof ResumeData, index: number, newValue: string) => {
    if (parsedData) {
      const updatedData = { ...parsedData };
      if (Array.isArray(updatedData[field])) {
        (updatedData[field] as string[])[index] = newValue;
        setParsedData(updatedData);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Upload Your Resume</h2>
        <p className="text-muted-foreground">
          We'll parse your resume to understand your background and experience
        </p>
      </div>

      <div className="space-y-6">
        {/* Resume Upload */}
        <Card className="p-6">
          <Label className="text-lg font-semibold mb-4 block">
            Resume Content
          </Label>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-sm text-muted-foreground mb-4">
                Upload your PDF resume or paste the text content below
              </p>
              <Button variant="outline" disabled>
                <FileText className="w-4 h-4 mr-2" />
                Upload PDF (Demo)
              </Button>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="resume-text">Or paste your resume text here:</Label>
              <Textarea
                id="resume-text"
                placeholder="Paste your resume content here..."
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                rows={8}
              />
            </div>
          </div>
        </Card>

        {/* Optional Job Description */}
        <Card className="p-6">
          <Label htmlFor="job-description" className="text-lg font-semibold mb-2 block">
            Target Job Description (Optional)
          </Label>
          <p className="text-sm text-muted-foreground mb-4">
            If you have a specific role in mind, paste the job description to help us better match your profile
          </p>
          <Textarea
            id="job-description"
            placeholder="Paste the job description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows={6}
          />
        </Card>

        {/* Parse Button */}
        {resumeText && !parsedData && (
          <div className="text-center">
            <Button 
              onClick={parseResume}
              disabled={isProcessing}
              size="lg"
              className="px-8"
            >
              {isProcessing ? 'Processing Resume...' : 'Parse Resume'}
            </Button>
          </div>
        )}

        {/* Parsed Data Review */}
        {parsedData && (
          <Card className="p-6">
            <div className="flex items-center mb-4">
              <CheckCircle className="w-5 h-5 text-success mr-2" />
              <h3 className="text-lg font-semibold">Parsed Resume Data</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Please review and edit the extracted information if needed:
            </p>
            
            <div className="space-y-6">
              {/* Education */}
              <div>
                <Label className="font-medium mb-2 block">Education</Label>
                <div className="space-y-2">
                  {parsedData.education.map((edu, index) => (
                    <Textarea
                      key={index}
                      value={edu}
                      onChange={(e) => handleEditField('education', index, e.target.value)}
                      rows={1}
                      className="resize-none"
                    />
                  ))}
                </div>
              </div>

              {/* Work Experience */}
              <div>
                <Label className="font-medium mb-2 block">Work Experience</Label>
                <div className="space-y-2">
                  {parsedData.workExperience.map((exp, index) => (
                    <Textarea
                      key={index}
                      value={exp}
                      onChange={(e) => handleEditField('workExperience', index, e.target.value)}
                      rows={1}
                      className="resize-none"
                    />
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label className="font-medium mb-2 block">Hard Skills</Label>
                  <Textarea
                    value={parsedData.hardSkills.join(', ')}
                    onChange={(e) => setParsedData({
                      ...parsedData,
                      hardSkills: e.target.value.split(',').map(s => s.trim()).filter(s => s)
                    })}
                    rows={3}
                  />
                </div>
                <div>
                  <Label className="font-medium mb-2 block">Soft Skills</Label>
                  <Textarea
                    value={parsedData.softSkills.join(', ')}
                    onChange={(e) => setParsedData({
                      ...parsedData,
                      softSkills: e.target.value.split(',').map(s => s.trim()).filter(s => s)
                    })}
                    rows={3}
                  />
                </div>
              </div>

              {/* Projects and Awards */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label className="font-medium mb-2 block">Projects</Label>
                  <div className="space-y-2">
                    {parsedData.projects.map((project, index) => (
                      <Textarea
                        key={index}
                        value={project}
                        onChange={(e) => handleEditField('projects', index, e.target.value)}
                        rows={2}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="font-medium mb-2 block">Awards & Achievements</Label>
                  <div className="space-y-2">
                    {parsedData.awards.map((award, index) => (
                      <Textarea
                        key={index}
                        value={award}
                        onChange={(e) => handleEditField('awards', index, e.target.value)}
                        rows={2}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        <div className="flex justify-between pt-6">
          <Button variant="outline" onClick={() => setCurrentStep(1)}>
            Back
          </Button>
          <Button 
            onClick={handleConfirmData}
            disabled={!parsedData}
          >
            Continue to Assessment
          </Button>
        </div>
      </div>
    </div>
  );
};