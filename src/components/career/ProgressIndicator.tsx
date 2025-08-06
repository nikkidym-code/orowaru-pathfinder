import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepTitles: string[];
}

export const ProgressIndicator = ({ currentStep, totalSteps, stepTitles }: ProgressIndicatorProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between">
        {stepTitles.map((title, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-500",
                index < currentStep
                  ? "bg-primary text-primary-foreground"
                  : index === currentStep
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {index < currentStep ? (
                <Check className="w-5 h-5" />
              ) : (
                <span>{index + 1}</span>
              )}
            </div>
            <div className="mt-2 text-xs text-center max-w-24">
              <span
                className={cn(
                  "font-medium",
                  index <= currentStep ? "text-primary" : "text-muted-foreground"
                )}
              >
                {title}
              </span>
            </div>
            {index < totalSteps - 1 && (
              <div
                className={cn(
                  "absolute h-0.5 w-full top-5 left-1/2 transition-all duration-500 -z-10",
                  index < currentStep ? "bg-primary" : "bg-border"
                )}
                style={{ transform: `translateX(${50 + (index * 100)}%)` }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};