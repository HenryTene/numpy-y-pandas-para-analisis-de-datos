import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { CodeEditor } from './CodeEditor';
import { AlertTriangle, Check, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Exercise } from '@/data/exercises';

interface ExerciseCardProps {
  exercise: Exercise;
  isCompleted: boolean;
  onComplete: (exerciseId: string, xp: number) => void;
  onError: () => void;
}

export function ExerciseCard({ exercise, isCompleted, onComplete, onError }: ExerciseCardProps) {
  const [showExplanation, setShowExplanation] = useState(false);
  const [localCompleted, setLocalCompleted] = useState(isCompleted);

  const difficultyColors = {
    facil: 'bg-success/20 text-success border-success/30',
    medio: 'bg-warning/20 text-warning border-warning/30',
    dificil: 'bg-destructive/20 text-destructive border-destructive/30',
  };

  const difficultyLabels = {
    facil: 'Fácil',
    medio: 'Medio',
    dificil: 'Difícil',
  };

  const handleSuccess = () => {
    if (!localCompleted) {
      setLocalCompleted(true);
      setShowExplanation(true);
      onComplete(exercise.id, exercise.xp);
    }
  };

  return (
    <div className={cn(
      'rounded-2xl border transition-all duration-300',
      localCompleted ? 'border-success/30 bg-success/5' : 'border-border bg-card'
    )}>
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {localCompleted && (
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-success">
                  <Check className="h-4 w-4 text-success-foreground" />
                </div>
              )}
              <h3 className="text-lg font-semibold">{exercise.title}</h3>
            </div>
            <p className="text-muted-foreground">{exercise.description}</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge variant="outline" className={difficultyColors[exercise.difficulty]}>
              {difficultyLabels[exercise.difficulty]}
            </Badge>
            <div className="flex items-center gap-1 text-xp-gold">
              <Star className="h-4 w-4" />
              <span className="text-sm font-medium">+{exercise.xp} XP</span>
            </div>
          </div>
        </div>
      </div>

      {/* Code Editor */}
      <div className="px-6 pb-4">
        <CodeEditor
          initialCode={exercise.initialCode}
          solution={exercise.solution}
          expectedOutput={exercise.expectedOutput}
          hint={exercise.hint}
          onSuccess={handleSuccess}
          onError={onError}
        />
      </div>

      {/* Explanation (shown after success) */}
      {showExplanation && (
        <div className="mx-6 mb-6 space-y-4 animate-slide-up">
          {/* Explanation */}
          <div className="rounded-lg bg-primary/10 p-4 border border-primary/20">
            <h4 className="font-medium text-primary mb-2">💡 Explicación</h4>
            <p className="text-sm text-foreground">{exercise.explanation}</p>
          </div>

          {/* Common errors */}
          {exercise.commonErrors.length > 0 && (
            <div className="rounded-lg bg-warning/10 p-4 border border-warning/20">
              <h4 className="font-medium text-warning mb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Errores comunes
              </h4>
              <ul className="text-sm text-foreground space-y-1">
                {exercise.commonErrors.map((error, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-warning">•</span>
                    {error}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
