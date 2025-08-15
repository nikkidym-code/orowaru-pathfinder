import React, { useState, useRef, useEffect } from 'react';
import { X, ChevronDown, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

// Predefined roles organized by category
const PREDEFINED_ROLES = [
  // Technology
  'Software Engineer', 'Frontend Developer', 'Backend Developer', 'Full Stack Developer',
  'Data Scientist', 'Data Analyst', 'Machine Learning Engineer', 'DevOps Engineer',
  'Product Manager', 'UX Designer', 'UI Designer', 'QA Engineer',
  
  // Business & Management
  'Business Analyst', 'Project Manager', 'Operations Manager', 'Marketing Manager',
  'Sales Manager', 'Account Manager', 'Human Resources Manager', 'Financial Analyst',
  
  // Creative & Marketing
  'Content Writer', 'Social Media Manager', 'Graphic Designer', 'Digital Marketer',
  'Brand Manager', 'SEO Specialist', 'Content Strategist',
  
  // Healthcare & Science
  'Nurse', 'Doctor', 'Pharmacist', 'Research Scientist', 'Lab Technician',
  'Healthcare Administrator', 'Medical Assistant',
  
  // Education & Training
  'Teacher', 'Professor', 'Training Specialist', 'Instructional Designer',
  'Academic Advisor', 'Curriculum Developer',
  
  // Finance & Consulting
  'Financial Advisor', 'Investment Analyst', 'Management Consultant',
  'Tax Advisor', 'Accountant', 'Auditor',
];

interface RoleTag {
  text: string;
  isCustom: boolean;
}

interface RoleSelectorProps {
  selectedRoles: string[];
  onRolesChange: (roles: string[]) => void;
  placeholder?: string;
  maxRoles?: number;
  className?: string;
}

export const RoleSelector: React.FC<RoleSelectorProps> = ({
  selectedRoles,
  onRolesChange,
  placeholder = "Search or add roles...",
  maxRoles = 3,
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRoles, setFilteredRoles] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const filtered = PREDEFINED_ROLES.filter(role =>
      role.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !selectedRoles.includes(role)
    ).slice(0, 8);
    setFilteredRoles(filtered);
  }, [searchTerm, selectedRoles]);

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

  const addRole = (role: string, isCustom = false) => {
    if (selectedRoles.length >= maxRoles) return;
    
    if (!selectedRoles.includes(role)) {
      onRolesChange([...selectedRoles, role]);
    }
    setSearchTerm('');
    setIsOpen(false);
  };

  const removeRole = (roleToRemove: string) => {
    onRolesChange(selectedRoles.filter(role => role !== roleToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      e.preventDefault();
      if (filteredRoles.length > 0) {
        addRole(filteredRoles[0]);
      } else {
        addRole(searchTerm.trim(), true);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setSearchTerm('');
    }
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const canAddMore = selectedRoles.length < maxRoles;
  const hasExactMatch = filteredRoles.some(role => 
    role.toLowerCase() === searchTerm.toLowerCase()
  );

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <div className="min-h-[40px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex flex-wrap gap-1 mb-1">
          {selectedRoles.map((role) => (
            <Badge
              key={role}
              variant="secondary"
              className="text-xs flex items-center gap-1 pr-1"
            >
              {role}
              <button
                type="button"
                onClick={() => removeRole(role)}
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
              placeholder={selectedRoles.length === 0 ? placeholder : "Add another role..."}
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
              {filteredRoles.length > 0 
                ? "Suggested roles:" 
                : "Press Enter to add your custom role"
              }
            </div>
          )}
          
          {filteredRoles.map((role) => (
            <button
              key={role}
              type="button"
              className="w-full px-3 py-2 text-left text-sm hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none"
              onClick={() => addRole(role)}
            >
              {role}
            </button>
          ))}
          
          {searchTerm && !hasExactMatch && filteredRoles.length === 0 && (
            <button
              type="button"
              className="w-full px-3 py-2 text-left text-sm hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none flex items-center gap-2"
              onClick={() => addRole(searchTerm.trim(), true)}
            >
              <Plus className="h-4 w-4" />
              Add "{searchTerm.trim()}" as custom role
            </button>
          )}
          
          {!searchTerm && (
            <div className="p-2">
              <div className="text-xs text-muted-foreground mb-2">Popular roles:</div>
              {PREDEFINED_ROLES.slice(0, 6).filter(role => !selectedRoles.includes(role)).map((role) => (
                <button
                  key={role}
                  type="button"
                  className="w-full px-2 py-1 text-left text-sm hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none rounded"
                  onClick={() => addRole(role)}
                >
                  {role}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
      
      {selectedRoles.length >= maxRoles && (
        <div className="text-xs text-muted-foreground mt-1">
          Maximum {maxRoles} roles selected
        </div>
      )}
    </div>
  );
};