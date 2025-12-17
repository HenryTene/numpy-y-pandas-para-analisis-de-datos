import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { QuizComponent } from '@/components/QuizComponent';
import { Play, Target, Clock, Brain } from 'lucide-react';

interface DiagnosticModuleProps {
  onComplete: (score: number) => void;
  isCompleted: boolean;
  score: number;
}

export function DiagnosticModule({ onComplete, isCompleted, score }: DiagnosticModuleProps) {
  const [started, setStarted] = useState(false);

  const handleQuizComplete = (finalScore: number) => {
    onComplete(finalScore);
  };

  if (isCompleted) {
    return (
      <div className="max-w-2xl mx-auto text-center animate-fade-in">
        <div className="rounded-2xl border border-success/30 bg-success/10 p-8">
          <div className="text-6xl mb-4">🎯</div>
          <h2 className="text-2xl font-bold mb-2">¡Diagnóstico completado!</h2>
          <p className="text-muted-foreground mb-6">
            Obtuviste {score} de 5 respuestas correctas
          </p>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4 rounded-xl bg-card border border-border">
              <p className="text-2xl font-bold text-primary">{score}/5</p>
              <p className="text-xs text-muted-foreground">Puntuación</p>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border">
              <p className="text-2xl font-bold text-success">
                {score >= 4 ? 'Alto' : score >= 2 ? 'Medio' : 'Básico'}
              </p>
              <p className="text-xs text-muted-foreground">Nivel</p>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border">
              <p className="text-2xl font-bold text-warning">
                {score >= 4 ? 'NumPy' : 'Fundamentos'}
              </p>
              <p className="text-xs text-muted-foreground">Recomendación</p>
            </div>
          </div>
          
          <p className="mt-6 text-sm text-muted-foreground">
            {score >= 4 
              ? 'Tienes una buena base. Te recomendamos enfocarte en los ejercicios avanzados.'
              : score >= 2
                ? 'Buen inicio. Sigue el orden de los módulos para reforzar conceptos.'
                : 'Perfecto para aprender desde cero. Toma tu tiempo en cada módulo.'}
          </p>
        </div>
      </div>
    );
  }

  if (!started) {
    return (
      <div className="max-w-2xl mx-auto text-center animate-fade-in">
        <div className="mb-8">
          <div className="text-6xl mb-4">🎯</div>
          <h1 className="text-3xl font-bold mb-3">Diagnóstico Inicial</h1>
          <p className="text-lg text-muted-foreground">
            Evaluemos tu nivel actual para personalizar tu experiencia
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <div className="rounded-xl border border-border bg-card p-4 text-center">
            <Target className="h-8 w-8 mx-auto mb-2 text-primary" />
            <p className="font-medium">5 preguntas</p>
            <p className="text-sm text-muted-foreground">Rápidas y directas</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 text-center">
            <Clock className="h-8 w-8 mx-auto mb-2 text-warning" />
            <p className="font-medium">5-8 minutos</p>
            <p className="text-sm text-muted-foreground">Sin presión de tiempo</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 text-center">
            <Brain className="h-8 w-8 mx-auto mb-2 text-success" />
            <p className="font-medium">Adaptativo</p>
            <p className="text-sm text-muted-foreground">Ajusta tu ruta</p>
          </div>
        </div>

        <Button onClick={() => setStarted(true)} variant="hero" size="xl">
          <Play className="h-5 w-5" />
          Comenzar diagnóstico
        </Button>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <QuizComponent onComplete={handleQuizComplete} />
    </div>
  );
}
