import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { FileText, Wand2, Copy, Download } from 'lucide-react';

export const CoverLetterGenerator = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [positionTitle, setPositionTitle] = useState('');
  const [generatedLetter, setGeneratedLetter] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateCoverLetter = async () => {
    if (!jobDescription.trim() || !companyName.trim() || !positionTitle.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields to generate a cover letter.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI generation for now
    setTimeout(() => {
      const template = `Dear Hiring Manager,

I am writing to express my strong interest in the ${positionTitle} position at ${companyName}. With my background and skills, I am confident that I would be a valuable addition to your team.

After reviewing the job description, I am particularly excited about the opportunity to contribute to your organization. My experience aligns well with the requirements you've outlined, and I am eager to bring my passion and expertise to this role.

Key highlights from my background that match your requirements:
• Strong technical and analytical skills developed through hands-on experience
• Proven ability to work collaboratively in team environments
• Demonstrated commitment to continuous learning and professional development
• Experience with relevant tools and technologies mentioned in your job posting

I am particularly drawn to ${companyName} because of your reputation for innovation and excellence in the industry. I would welcome the opportunity to discuss how my skills and enthusiasm can contribute to your team's continued success.

Thank you for considering my application. I look forward to hearing from you soon.

Sincerely,
[Your Name]`;

      setGeneratedLetter(template);
      setIsGenerating(false);
      toast({
        title: "Cover Letter Generated",
        description: "Your personalized cover letter has been created successfully.",
      });
    }, 2000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLetter);
    toast({
      title: "Copied",
      description: "Cover letter copied to clipboard.",
    });
  };

  const downloadLetter = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedLetter], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `cover-letter-${companyName.replace(/\s+/g, '-').toLowerCase()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Cover Letter Generator
          </CardTitle>
          <CardDescription>
            Generate a personalized cover letter based on the job description and your profile.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company">Company Name</Label>
              <Input
                id="company"
                placeholder="e.g., Google, Microsoft, etc."
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">Position Title</Label>
              <Input
                id="position"
                placeholder="e.g., Software Engineer, Product Manager"
                value={positionTitle}
                onChange={(e) => setPositionTitle(e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="jobDescription">Job Description</Label>
            <Textarea
              id="jobDescription"
              placeholder="Paste the job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="min-h-[150px]"
            />
          </div>
          
          <Button 
            onClick={generateCoverLetter} 
            disabled={isGenerating}
            className="w-full"
          >
            <Wand2 className="h-4 w-4 mr-2" />
            {isGenerating ? 'Generating Cover Letter...' : 'Generate Cover Letter'}
          </Button>
        </CardContent>
      </Card>

      {generatedLetter && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Generated Cover Letter</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={copyToClipboard}>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
                <Button variant="outline" size="sm" onClick={downloadLetter}>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="whitespace-pre-wrap bg-muted p-4 rounded-md">
              {generatedLetter}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};