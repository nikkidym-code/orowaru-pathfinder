import { useState } from 'react';
import { useCareer } from '@/contexts/CareerContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { valueCategories, Value } from '@/data/values';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const ValuesStep = () => {
  const { setCurrentStep, userProfile, setUserProfile } = useCareer();
  const [currentPhase, setCurrentPhase] = useState<'select' | 'refine' | 'explain'>('select');
  const [selectedByCategory, setSelectedByCategory] = useState<Record<string, Value[]>>({});
  const [finalValues, setFinalValues] = useState<Value[]>([]);
  const [explanation, setExplanation] = useState('');

  const getAllSelectedValues = () => {
    return Object.values(selectedByCategory).flat();
  };

  const handleCategorySelection = (categoryId: string, value: Value, selected: boolean) => {
    setSelectedByCategory(prev => {
      const categoryValues = prev[categoryId] || [];
      if (selected && categoryValues.length < 2) {
        return {
          ...prev,
          [categoryId]: [...categoryValues, value]
        };
      } else if (!selected) {
        return {
          ...prev,
          [categoryId]: categoryValues.filter(v => v.id !== value.id)
        };
      }
      return prev;
    });
  };

  const handleFinalSelection = (value: Value, selected: boolean) => {
    if (selected && finalValues.length < 3) {
      setFinalValues(prev => [...prev, value]);
    } else if (!selected) {
      setFinalValues(prev => prev.filter(v => v.id !== value.id));
    }
  };

  const handleNext = () => {
    if (currentPhase === 'select') {
      setCurrentPhase('refine');
    } else if (currentPhase === 'refine') {
      setCurrentPhase('explain');
    } else {
      setUserProfile({
        ...userProfile,
        coreValues: finalValues,
        valuesExplanation: explanation
      });
      setCurrentStep(2);
    }
  };

  const canProceedFromSelect = () => {
    return valueCategories.every(category => 
      (selectedByCategory[category.id] || []).length === 2
    );
  };

  const canProceedFromRefine = () => {
    return finalValues.length === 3;
  };

  const canProceedFromExplain = () => {
    return explanation.trim().length > 0;
  };

  const renderSelectPhase = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Discover Your Core Values
        </h2>
        <p className="text-muted-foreground">
          Select 2 values from each category that resonate most with you
        </p>
      </div>

      <div className="grid gap-6">
        {valueCategories.map((category) => {
          const selectedCount = (selectedByCategory[category.id] || []).length;
          return (
            <Card key={category.id}>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  {category.name}
                  <Badge variant={selectedCount === 2 ? "default" : "outline"}>
                    {selectedCount}/2
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {category.values.map((value) => {
                    const isSelected = (selectedByCategory[category.id] || []).some(v => v.id === value.id);
                    const canSelect = selectedCount < 2 || isSelected;
                    
                    return (
                      <Button
                        key={value.id}
                        variant={isSelected ? "default" : "outline"}
                        size="sm"
                        className="justify-start"
                        disabled={!canSelect}
                        onClick={() => handleCategorySelection(category.id, value, !isSelected)}
                      >
                        {value.name}
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );

  const renderRefinePhase = () => {
    const allSelected = getAllSelectedValues();
    
    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Choose Your Top 3 Core Values
          </h2>
          <p className="text-muted-foreground">
            From your selected values, choose the 3 most important to you
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              Your Selected Values
              <Badge variant={finalValues.length === 3 ? "default" : "outline"}>
                {finalValues.length}/3
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {allSelected.map((value) => {
                const isSelected = finalValues.some(v => v.id === value.id);
                const canSelect = finalValues.length < 3 || isSelected;
                
                return (
                  <Button
                    key={value.id}
                    variant={isSelected ? "default" : "outline"}
                    size="sm"
                    className="justify-start"
                    disabled={!canSelect}
                    onClick={() => handleFinalSelection(value, !isSelected)}
                  >
                    {value.name}
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {finalValues.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Your Core Values</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {finalValues.map((value) => (
                  <Badge key={value.id} variant="default" className="text-base px-3 py-1">
                    {value.name}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  const renderExplainPhase = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Why These Values Matter to You
        </h2>
        <p className="text-muted-foreground">
          Briefly explain why you chose these 3 core values
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Core Values</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-6">
            {finalValues.map((value) => (
              <Badge key={value.id} variant="default" className="text-base px-3 py-1">
                {value.name}
              </Badge>
            ))}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="explanation">
              Why did you choose these values? How do they guide your decisions?
            </Label>
            <Textarea
              id="explanation"
              placeholder="These values are important to me because..."
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              className="min-h-[120px]"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {currentPhase === 'select' && renderSelectPhase()}
      {currentPhase === 'refine' && renderRefinePhase()}
      {currentPhase === 'explain' && renderExplainPhase()}

      <div className="flex justify-between pt-8">
        <Button 
          variant="outline" 
          onClick={() => {
            if (currentPhase === 'select') {
              setCurrentStep(0);
            } else if (currentPhase === 'refine') {
              setCurrentPhase('select');
            } else {
              setCurrentPhase('refine');
            }
          }}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        
        <Button 
          onClick={handleNext}
          disabled={
            (currentPhase === 'select' && !canProceedFromSelect()) ||
            (currentPhase === 'refine' && !canProceedFromRefine()) ||
            (currentPhase === 'explain' && !canProceedFromExplain())
          }
        >
          {currentPhase === 'explain' ? 'Continue to Profile' : 'Next'}
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};