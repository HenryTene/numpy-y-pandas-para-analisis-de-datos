import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BadgeDisplay } from '@/components/BadgeDisplay';
import { QuizComponent } from '@/components/QuizComponent';
import { GraduationCap, Trophy, Star, Flame, BookOpen, ExternalLink, Play, RotateCcw } from 'lucide-react';

interface ClosingModuleProps {
  xp: number;
  level: number;
  streak: number;
  completedExercises: string[];
  unlockedBadges: string[];
  onResetProgress: () => void;
}

export function ClosingModule({ 
  xp, 
  level, 
  streak, 
  completedExercises, 
  unlockedBadges,
  onResetProgress 
}: ClosingModuleProps) {
  const [showFinalQuiz, setShowFinalQuiz] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const numpyCompleted = completedExercises.filter(id => id.startsWith('numpy')).length;
  const pandasCompleted = completedExercises.filter(id => id.startsWith('pandas')).length;

  const handleQuizComplete = (score: number) => {
    setFinalScore(score);
    setQuizCompleted(true);
  };

  const nextSteps = [
    {
      title: 'Visualización con Matplotlib/Seaborn',
      description: 'Crea gráficos profesionales para comunicar insights',
      link: 'https://matplotlib.org/',
    },
    {
      title: 'Machine Learning con Scikit-learn',
      description: 'Aplica modelos predictivos a tus datos limpios',
      link: 'https://scikit-learn.org/',
    },
    {
      title: 'Proyectos en Kaggle',
      description: 'Practica con datasets reales y compite',
      link: 'https://www.kaggle.com/',
    },
    {
      title: 'SQL para consultas avanzadas',
      description: 'Combina Pandas con bases de datos relacionales',
      link: 'https://www.postgresql.org/',
    },
  ];

  if (showFinalQuiz && !quizCompleted) {
    return (
      <div className="animate-fade-in">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold">Evaluación Final</h2>
          <p className="text-muted-foreground">Demuestra lo que has aprendido</p>
        </div>
        <QuizComponent onComplete={handleQuizComplete} />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 border border-success/30 mb-4">
          <GraduationCap className="h-4 w-4 text-success" />
          <span className="text-sm font-medium text-success">Módulo 6 de 6</span>
        </div>
        <h1 className="text-3xl font-bold mb-3">🎓 Cierre y Evaluación</h1>
        <p className="text-lg text-muted-foreground">
          {quizCompleted 
            ? '¡Felicitaciones por completar la sesión!' 
            : 'Revisa tu progreso y realiza la evaluación final'}
        </p>
      </div>

      {/* Stats summary */}
      <div className="grid sm:grid-cols-4 gap-4">
        <div className="rounded-xl border border-border bg-card p-4 text-center">
          <Star className="h-8 w-8 mx-auto mb-2 text-xp-gold" />
          <p className="text-2xl font-bold text-xp-gold">{xp}</p>
          <p className="text-sm text-muted-foreground">XP Total</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 text-center">
          <Trophy className="h-8 w-8 mx-auto mb-2 text-primary" />
          <p className="text-2xl font-bold text-primary">Nivel {level}</p>
          <p className="text-sm text-muted-foreground">Alcanzado</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 text-center">
          <Flame className="h-8 w-8 mx-auto mb-2 text-warning" />
          <p className="text-2xl font-bold text-warning">{streak}</p>
          <p className="text-sm text-muted-foreground">Mejor racha</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4 text-center">
          <BookOpen className="h-8 w-8 mx-auto mb-2 text-success" />
          <p className="text-2xl font-bold text-success">{completedExercises.length}</p>
          <p className="text-sm text-muted-foreground">Ejercicios</p>
        </div>
      </div>

      {/* Module progress */}
      <div className="rounded-2xl border border-border bg-card p-6">
        <h2 className="text-xl font-semibold mb-4">📊 Progreso por módulo</h2>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>NumPy Esencial</span>
              <span className="text-muted-foreground">{numpyCompleted}/5</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-primary transition-all duration-500"
                style={{ width: `${(numpyCompleted / 5) * 100}%` }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Pandas Esencial</span>
              <span className="text-muted-foreground">{pandasCompleted}/8</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-primary transition-all duration-500"
                style={{ width: `${(pandasCompleted / 8) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Badges */}
      <BadgeDisplay unlockedBadges={unlockedBadges} />

      {/* Final quiz or results */}
      {quizCompleted ? (
        <div className="rounded-2xl border border-success/30 bg-success/10 p-8 text-center">
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="text-2xl font-bold mb-2">¡Sesión completada!</h2>
          <p className="text-lg text-muted-foreground mb-4">
            Evaluación final: {finalScore}/5 correctas
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/20 border border-success/30">
            <span className="font-medium text-success">
              {finalScore >= 4 ? 'Excelente' : finalScore >= 3 ? 'Muy bien' : 'Aprobado'}
            </span>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <Button onClick={() => setShowFinalQuiz(true)} variant="hero" size="xl">
            <Play className="h-5 w-5" />
            Comenzar evaluación final
          </Button>
        </div>
      )}

      {/* Next steps */}
      <div className="rounded-2xl border border-border bg-card/50 p-6">
        <h2 className="text-xl font-semibold mb-4">🚀 Próximos pasos</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {nextSteps.map((step, i) => (
            <a
              key={i}
              href={step.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-secondary/50 transition-all duration-200 group"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                {i + 1}
              </div>
              <div className="flex-1">
                <p className="font-medium group-hover:text-primary transition-colors">
                  {step.title}
                  <ExternalLink className="inline h-3 w-3 ml-1 opacity-50" />
                </p>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Key takeaways */}
      <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5 p-6">
        <h2 className="text-xl font-semibold mb-4">💡 Resumen de aprendizajes</h2>
        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          <div>
            <h3 className="font-medium text-primary mb-2">NumPy</h3>
            <ul className="space-y-1 text-muted-foreground">
              <li>• Arrays son más rápidos que listas</li>
              <li>• Vectorización evita loops</li>
              <li>• Broadcasting amplía dimensiones</li>
              <li>• Máscaras filtran eficientemente</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-primary mb-2">Pandas</h3>
            <ul className="space-y-1 text-muted-foreground">
              <li>• DataFrame = tabla potenciada</li>
              <li>• GroupBy + agg para análisis</li>
              <li>• Merge une como SQL JOIN</li>
              <li>• to_datetime() para fechas</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Reset button */}
      <div className="text-center pt-4 border-t border-border">
        <Button 
          variant="outline" 
          onClick={onResetProgress}
          className="text-muted-foreground hover:text-destructive hover:border-destructive"
        >
          <RotateCcw className="h-4 w-4" />
          Reiniciar progreso
        </Button>
      </div>
    </div>
  );
}
