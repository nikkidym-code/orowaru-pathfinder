import React, { useState, useRef, useEffect } from 'react';
import { X, ChevronDown, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

// Predefined interests organized by category
const PREDEFINED_INTERESTS = [
  // Technology
  'Software Development', 'Artificial Intelligence', 'Data Science', 'Cybersecurity',
  'Cloud Computing', 'Mobile Development', 'Web Development', 'Machine Learning',
  'Blockchain', 'DevOps', 'UI/UX Design', 'Game Development',
  
  // Business & Finance
  'Business Strategy', 'Finance', 'Marketing', 'Sales', 'Consulting',
  'Project Management', 'Entrepreneurship', 'Investment', 'Banking',
  'Real Estate', 'Insurance', 'Accounting',
  
  // Healthcare & Science
  'Healthcare', 'Medicine', 'Nursing', 'Research', 'Biotechnology',
  'Pharmaceuticals', 'Mental Health', 'Public Health', 'Veterinary',
  'Laboratory Science', 'Medical Technology',
  
  // Creative & Media
  'Graphic Design', 'Content Creation', 'Video Production', 'Photography',
  'Writing', 'Journalism', 'Social Media', 'Advertising', 'Fashion',
  'Music', 'Film', 'Animation',
  
  // Education & Training
  'Education', 'Training', 'Academic Research', 'Curriculum Development',
  'Educational Technology', 'Language Teaching', 'Adult Education',
  
  // Manufacturing & Engineering
  'Manufacturing', 'Mechanical Engineering', 'Civil Engineering',
  'Electrical Engineering', 'Chemical Engineering', 'Automotive',
  'Aerospace', 'Construction', 'Architecture',
  
  // Services & Others
  'Hospitality', 'Tourism', 'Customer Service', 'Human Resources',
  'Legal Services', 'Non-Profit', 'Government', 'Environmental',
  'Agriculture', 'Transportation', 'Logistics', 'Retail'
];

interface InterestSelectorProps {
  selectedInterests: string[];
  onInterestsChange: (interests: string[]) => void;
  placeholder?: string;
  maxInterests?: number;
  className?: string;
}

export const InterestSelector: React.FC<InterestSelectorProps> = ({
  selectedInterests,
  onInterestsChange,
  placeholder = "Search or add interests...",
  maxInterests = 10,
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredInterests, setFilteredInterests] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const filtered = PREDEFINED_INTERESTS.filter(interest =>
      interest.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !selectedInterests.includes(interest)
    ).slice(0, 8);
    setFilteredInterests(filtered);
  }, [searchTerm, selectedInterests]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const addInterest = (interest: string, isCustom = false) => {
    if (selectedInterests.length >= maxInterests) return;
    
    if (!selectedInterests.includes(interest)) {
      onInterestsChange([...selectedInterests, interest]);
    }
    setSearchTerm('');
    setIsOpen(false);
  };

  const removeInterest = (interestToRemove: string) => {
    onInterestsChange(selectedInterests.filter(interest => interest !== interestToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      e.preventDefault();
      if (filteredInterests.length > 0) {
        addInterest(filteredInterests[0]);
      } else {
        addInterest(searchTerm.trim(), true);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setSearchTerm('');
    }
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const canAddMore = selectedInterests.length < maxInterests;
  const hasExactMatch = filteredInterests.some(interest => 
    interest.toLowerCase() === searchTerm.toLowerCase()
  );

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <div className="min-h-[40px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex flex-wrap gap-1 mb-1">
          {selectedInterests.map((interest) => (
            <Badge
              key={interest}
              variant="secondary"
              className="text-xs flex items-center gap-1 pr-1"
            >
              {interest}
              <button
                type="button"
                onClick={() => removeInterest(interest)}
                className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
        
        {canAddMore && (
          <div className="flex items-center gap-2">
            <Input
              ref={inputRef}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={handleInputFocus}
              onKeyDown={handleKeyDown}
              placeholder={selectedInterests.length === 0 ? placeholder : "Add another interest..."}
              className="border-0 p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <ChevronDown 
              className={cn(
                "h-4 w-4 text-muted-foreground transition-transform duration-200",
                isOpen && "rotate-180"
              )}
            />
          </div>
        )}
      </div>

      {isOpen && canAddMore && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 max-h-60 overflow-auto rounded-md border bg-popover text-popover-foreground shadow-md">
          {searchTerm && (
            <div className="p-2 text-xs text-muted-foreground border-b">
              {filteredInterests.length > 0 
                ? "Suggested interests:" 
                : "Press Enter to add your custom interest"
              }
            </div>
          )}
          
          {filteredInterests.map((interest) => (
            <button
              key={interest}
              type="button"
              className="w-full px-3 py-2 text-left text-sm hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none"
              onClick={() => addInterest(interest)}
            >
              {interest}
            </button>
          ))}
          
          {searchTerm && !hasExactMatch && filteredInterests.length === 0 && (
            <button
              type="button"
              className="w-full px-3 py-2 text-left text-sm hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none flex items-center gap-2"
              onClick={() => addInterest(searchTerm.trim(), true)}
            >
              <Plus className="h-4 w-4" />
              Add "{searchTerm.trim()}" as custom interest
            </button>
          )}
          
          {!searchTerm && (
            <div className="p-2">
              <div className="text-xs text-muted-foreground mb-2">Popular interests:</div>
              {PREDEFINED_INTERESTS.slice(0, 6).filter(interest => !selectedInterests.includes(interest)).map((interest) => (
                <button
                  key={interest}
                  type="button"
                  className="w-full px-2 py-1 text-left text-sm hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none rounded"
                  onClick={() => addInterest(interest)}
                >
                  {interest}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
      
      {selectedInterests.length >= maxInterests && (
        <div className="text-xs text-muted-foreground mt-1">
          Maximum {maxInterests} interests selected
        </div>
      )}
    </div>
  );
};