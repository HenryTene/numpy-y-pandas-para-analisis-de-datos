import { pandasExercises } from '@/data/exercises';
import { ExerciseCard } from '@/components/ExerciseCard';
import { Badge } from '@/components/ui/badge';
import { Table, Filter, GitMerge } from 'lucide-react';

interface PandasModuleProps {
  completedExercises: string[];
  onCompleteExercise: (exerciseId: string, xp: number) => void;
  onError: () => void;
}

export function PandasModule({ completedExercises, onCompleteExercise, onError }: PandasModuleProps) {
  const completedCount = completedExercises.filter(id => id.startsWith('pandas')).length;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-4">
          <Table className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-primary">Módulo 3 de 6</span>
        </div>
        <h1 className="text-3xl font-bold mb-3">🐼 Pandas Esencial</h1>
        <p className="text-lg text-muted-foreground">
          DataFrames, selección, filtrado y transformaciones
        </p>
        <div className="flex items-center justify-center gap-2 mt-4">
          <Badge variant="outline">{completedCount}/{pandasExercises.length} completados</Badge>
          <Badge variant="outline" className="bg-primary/10 border-primary/30 text-primary">
            45-50 min
          </Badge>
        </div>
      </div>

      {/* Theory cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-border bg-card p-4">
          <Table className="h-8 w-8 text-primary mb-3" />
          <h3 className="font-semibold mb-1">DataFrames</h3>
          <p className="text-sm text-muted-foreground">
            Tablas 2D con columnas de diferentes tipos, como una hoja de cálculo potenciada.
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <Filter className="h-8 w-8 text-warning mb-3" />
          <h3 className="font-semibold mb-1">Filtrado y Selección</h3>
          <p className="text-sm text-muted-foreground">
            Acceso a filas y columnas con loc, iloc y condiciones booleanas.
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <GitMerge className="h-8 w-8 text-success mb-3" />
          <h3 className="font-semibold mb-1">Merge y GroupBy</h3>
          <p className="text-sm text-muted-foreground">
            Une tablas como en SQL y agrupa para calcular estadísticas.
          </p>
        </div>
      </div>

      {/* Key concepts */}
      <div className="rounded-2xl border border-border bg-card/50 p-6">
        <h2 className="text-xl font-semibold mb-4">📚 Conceptos clave</h2>
        <div className="prose prose-invert max-w-none">
          <ul className="space-y-2 text-muted-foreground">
            <li><strong className="text-foreground">Series:</strong> Array 1D con índice. Una columna del DataFrame.</li>
            <li><strong className="text-foreground">DataFrame:</strong> Tabla 2D. Creado desde dicts, listas, o archivos CSV/Excel.</li>
            <li><strong className="text-foreground">Selección:</strong> <code className="text-primary bg-primary/10 px-1 rounded">df["col"]</code> para columna, <code className="text-primary bg-primary/10 px-1 rounded">df.loc[fila]</code> para filas.</li>
            <li><strong className="text-foreground">Filtrado:</strong> <code className="text-primary bg-primary/10 px-1 rounded">df[df["col"] &gt; valor]</code> devuelve filas que cumplen la condición.</li>
            <li><strong className="text-foreground">GroupBy:</strong> <code className="text-primary bg-primary/10 px-1 rounded">df.groupby("col")["otra"].sum()</code> agrupa y agrega.</li>
            <li><strong className="text-foreground">Merge:</strong> <code className="text-primary bg-primary/10 px-1 rounded">pd.merge(df1, df2, on="key")</code> une DataFrames.</li>
          </ul>
        </div>
      </div>

      {/* Exercises */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">🎯 Retos prácticos</h2>
        {pandasExercises.map((exercise) => (
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
