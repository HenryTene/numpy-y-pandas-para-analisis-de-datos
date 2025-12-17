import { numpyExercises } from '@/data/exercises';
import { ExerciseCard } from '@/components/ExerciseCard';
import { Badge } from '@/components/ui/badge';
import { Zap, Box, Layers } from 'lucide-react';

interface NumPyModuleProps {
  completedExercises: string[];
  onCompleteExercise: (exerciseId: string, xp: number) => void;
  onError: () => void;
}

export function NumPyModule({ completedExercises, onCompleteExercise, onError }: NumPyModuleProps) {
  const completedCount = completedExercises.filter(id => id.startsWith('numpy')).length;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-4">
          <Zap className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-primary">Módulo 2 de 6</span>
        </div>
        <h1 className="text-3xl font-bold mb-3">⚡ NumPy Esencial</h1>
        <p className="text-lg text-muted-foreground">
          Domina los arrays y las operaciones vectorizadas
        </p>
        <div className="flex items-center justify-center gap-2 mt-4">
          <Badge variant="outline">{completedCount}/{numpyExercises.length} completados</Badge>
          <Badge variant="outline" className="bg-primary/10 border-primary/30 text-primary">
            35-40 min
          </Badge>
        </div>
      </div>

      {/* Theory cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-border bg-card p-4">
          <Box className="h-8 w-8 text-primary mb-3" />
          <h3 className="font-semibold mb-1">Arrays N-dimensionales</h3>
          <p className="text-sm text-muted-foreground">
            Estructuras de datos homogéneas y eficientes para cálculos numéricos.
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <Zap className="h-8 w-8 text-warning mb-3" />
          <h3 className="font-semibold mb-1">Vectorización</h3>
          <p className="text-sm text-muted-foreground">
            Operaciones sobre arrays completos sin loops explícitos.
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <Layers className="h-8 w-8 text-success mb-3" />
          <h3 className="font-semibold mb-1">Broadcasting</h3>
          <p className="text-sm text-muted-foreground">
            Operaciones entre arrays de diferentes dimensiones automáticamente.
          </p>
        </div>
      </div>

      {/* Key concepts */}
      <div className="rounded-2xl border border-border bg-card/50 p-6">
        <h2 className="text-xl font-semibold mb-4">📚 Conceptos clave</h2>
        <div className="prose prose-invert max-w-none">
          <ul className="space-y-2 text-muted-foreground">
            <li><strong className="text-foreground">ndarray:</strong> El objeto central de NumPy. Tiene <code className="text-primary bg-primary/10 px-1 rounded">shape</code> (forma), <code className="text-primary bg-primary/10 px-1 rounded">dtype</code> (tipo de datos) y métodos potentes.</li>
            <li><strong className="text-foreground">Indexing:</strong> Acceso a elementos con <code className="text-primary bg-primary/10 px-1 rounded">arr[i]</code> o rangos con <code className="text-primary bg-primary/10 px-1 rounded">arr[start:end]</code>.</li>
            <li><strong className="text-foreground">Máscaras booleanas:</strong> Filtrado con condiciones: <code className="text-primary bg-primary/10 px-1 rounded">arr[arr &gt; 5]</code>.</li>
            <li><strong className="text-foreground">Agregaciones:</strong> <code className="text-primary bg-primary/10 px-1 rounded">sum()</code>, <code className="text-primary bg-primary/10 px-1 rounded">mean()</code>, <code className="text-primary bg-primary/10 px-1 rounded">std()</code>, <code className="text-primary bg-primary/10 px-1 rounded">min()</code>, <code className="text-primary bg-primary/10 px-1 rounded">max()</code>.</li>
          </ul>
        </div>
      </div>

      {/* Exercises */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">🎯 Retos prácticos</h2>
        {numpyExercises.map((exercise) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            isCompleted={completedExercises.includes(exercise.id)}
            onComplete={onCompleteExercise}
            onError={onError}
          />
        ))}
      </div>
    </div>
  );
}
