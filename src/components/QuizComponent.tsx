import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Check, X, ArrowRight } from 'lucide-react';
import { quizQuestions } from '@/data/exercises';

interface QuizComponentProps {
  onComplete: (score: number) => void;
}

export function QuizComponent({ onComplete }: QuizComponentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const question = quizQuestions[currentQuestion];
  const isCorrect = selectedAnswer === question.correct;
  const isLastQuestion = currentQuestion === quizQuestions.length - 1;

  const handleSelectAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
  };

  const handleCheckAnswer = () => {
    if (selectedAnswer === null) return;
    
    setShowResult(true);
    setAnswers([...answers, selectedAnswer]);
    
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      const finalScore = isCorrect ? score + 1 : score;
      onComplete(finalScore);
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const progressPercentage = ((currentQuestion + 1) / quizQuestions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>Pregunta {currentQuestion + 1} de {quizQuestions.length}</span>
          <span>{score} correctas</span>
        </div>
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-primary transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="rounded-2xl border border-border bg-card p-6 mb-6">
        <h3 className="text-xl font-semibold mb-6">{question.question}</h3>

        <div className="space-y-3">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrectAnswer = index === question.correct;
            
            return (
              <button
                key={index}
                onClick={() => handleSelectAnswer(index)}
                disabled={showResult}
                className={cn(
                  'w-full p-4 rounded-xl border text-left transition-all duration-200',
                  !showResult && isSelected && 'border-primary bg-primary/10',
                  !showResult && !isSelected && 'border-border hover:border-primary/50 hover:bg-secondary/50',
                  showResult && isCorrectAnswer && 'border-success bg-success/10',
                  showResult && isSelected && !isCorrectAnswer && 'border-destructive bg-destructive/10'
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium',
                    !showResult && isSelected && 'bg-primary text-primary-foreground',
                    !showResult && !isSelected && 'bg-secondary text-muted-foreground',
                    showResult && isCorrectAnswer && 'bg-success text-success-foreground',
                    showResult && isSelected && !isCorrectAnswer && 'bg-destructive text-destructive-foreground'
                  )}>
                    {showResult && isCorrectAnswer ? (
                      <Check className="h-4 w-4" />
                    ) : showResult && isSelected && !isCorrectAnswer ? (
                      <X className="h-4 w-4" />
                    ) : (
                      String.fromCharCode(65 + index)
                    )}
                  </div>
                  <span className={cn(
                    'flex-1',
                    showResult && isCorrectAnswer && 'text-success font-medium',
                    showResult && isSelected && !isCorrectAnswer && 'text-destructive'
                  )}>
                    {option}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showResult && (
          <div className={cn(
            'mt-6 p-4 rounded-xl animate-slide-up',
            isCorrect ? 'bg-success/10 border border-success/30' : 'bg-warning/10 border border-warning/30'
          )}>
            <p className={cn(
              'font-medium mb-2',
              isCorrect ? 'text-success' : 'text-warning'
            )}>
              {isCorrect ? '¡Correcto! 🎉' : 'No exactamente 📚'}
            </p>
            <p className="text-sm text-foreground">{question.explanation}</p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        {!showResult ? (
          <Button
            onClick={handleCheckAnswer}
            disabled={selectedAnswer === null}
            variant="hero"
            size="lg"
          >
            Comprobar
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            variant="hero"
            size="lg"
          >
            {isLastQuestion ? 'Ver resultados' : 'Siguiente'}
            <ArrowRight className="h-5 w-5" />
          </Button>
        )}
      </div>
    </div>
  );
}
