import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { sampleDataset } from '@/data/exercises';
import { Check, Rocket, Target, TrendingUp, AlertCircle, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProjectModuleProps {
  onComplete: () => void;
}

export function ProjectModule({ onComplete }: ProjectModuleProps) {
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);

  const tasks = [
    {
      id: 'load',
      title: 'Cargar y explorar',
      description: 'Carga el dataset y explora sus características básicas',
      code: `import pandas as pd

# Cargar datos
df = pd.read_csv('ventas_ecommerce.csv')

# Exploración inicial
print(df.shape)           # Dimensiones
print(df.info())          # Tipos y nulos
print(df.describe())      # Estadísticas
print(df.head())          # Primeras filas`,
    },
    {
      id: 'clean',
      title: 'Limpieza completa',
      description: 'Aplica el checklist de limpieza aprendido',
      code: `# Eliminar duplicados
df = df.drop_duplicates()

# Tratar nulos
df['precio'] = pd.to_numeric(df['precio'], errors='coerce')
df['precio'].fillna(df['precio'].mean(), inplace=True)
df['ciudad'].fillna('Desconocido', inplace=True)

# Limpiar emails
df['cliente_email'] = df['cliente_email'].str.strip().str.lower()

# Parsear fechas
df['fecha'] = pd.to_datetime(df['fecha'], dayfirst=True, errors='coerce')`,
    },
    {
      id: 'transform',
      title: 'Transformaciones',
      description: 'Crea columnas derivadas para el análisis',
      code: `# Columnas temporales
df['mes'] = df['fecha'].dt.month
df['dia_semana'] = df['fecha'].dt.day_name()

# Columna de ingresos
df['ingresos'] = df['precio'] * df['cantidad']

# Extraer dominio del email
df['dominio_email'] = df['cliente_email'].str.split('@').str[1]`,
    },
    {
      id: 'insight1',
      title: 'Insight 1: Top categorías',
      description: 'Identifica las categorías con más ventas',
      code: `# Ventas por categoría
ventas_categoria = df.groupby('categoria')['ingresos'].sum().sort_values(ascending=False)

print("Top categorías por ingresos:")
print(ventas_categoria)

# Cantidad de productos vendidos
productos_categoria = df.groupby('categoria')['cantidad'].sum()
print("\\nProductos vendidos por categoría:")
print(productos_categoria)`,
    },
    {
      id: 'insight2',
      title: 'Insight 2: Tendencia temporal',
      description: 'Analiza cómo evolucionan las ventas',
      code: `# Ventas por mes
ventas_mes = df.groupby('mes')['ingresos'].sum()

print("Ingresos por mes:")
print(ventas_mes)

# Día de la semana con más ventas
ventas_dia = df.groupby('dia_semana')['ingresos'].sum().sort_values(ascending=False)
print("\\nVentas por día de la semana:")
print(ventas_dia)`,
    },
    {
      id: 'insight3',
      title: 'Insight 3: Detección de outliers',
      description: 'Identifica valores atípicos en precios',
      code: `# Estadísticas de precio
q1 = df['precio'].quantile(0.25)
q3 = df['precio'].quantile(0.75)
iqr = q3 - q1

limite_inferior = q1 - 1.5 * iqr
limite_superior = q3 + 1.5 * iqr

# Detectar outliers
outliers = df[(df['precio'] < limite_inferior) | (df['precio'] > limite_superior)]

print(f"Rango normal: {limite_inferior:.2f} - {limite_superior:.2f}")
print(f"Outliers encontrados: {len(outliers)}")
print(outliers[['producto', 'precio']])`,
    },
  ];

  const toggleTask = (taskId: string) => {
    setCompletedTasks(prev => 
      prev.includes(taskId) 
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  const allCompleted = completedTasks.length === tasks.length;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 mb-4">
          <Rocket className="h-4 w-4 text-accent" />
          <span className="text-sm font-medium text-accent">Módulo 5 de 6</span>
        </div>
        <h1 className="text-3xl font-bold mb-3">🏗️ Mini-Proyecto Integrador</h1>
        <p className="text-lg text-muted-foreground">
          Aplica todo lo aprendido en un caso real de análisis de datos
        </p>
        <div className="flex items-center justify-center gap-2 mt-4">
          <Badge variant="outline">{completedTasks.length}/{tasks.length} tareas</Badge>
        </div>
      </div>

      {/* Objectives */}
      <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5 p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Target className="h-6 w-6 text-primary" />
          Objetivos del proyecto
        </h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">1</div>
            <div>
              <p className="font-medium">Limpiar el dataset</p>
              <p className="text-sm text-muted-foreground">Aplica el checklist completo</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">2</div>
            <div>
              <p className="font-medium">Transformar datos</p>
              <p className="text-sm text-muted-foreground">Crea columnas derivadas</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">3</div>
            <div>
              <p className="font-medium">Generar 3 insights</p>
              <p className="text-sm text-muted-foreground">Análisis con conclusiones</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tasks */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">📋 Tareas del proyecto</h2>
        
        {tasks.map((task, index) => {
          const isCompleted = completedTasks.includes(task.id);
          
          return (
            <div
              key={task.id}
              className={cn(
                'rounded-2xl border transition-all duration-300',
                isCompleted ? 'border-success/30 bg-success/5' : 'border-border bg-card'
              )}
            >
              <button
                onClick={() => toggleTask(task.id)}
                className="w-full p-6 text-left"
              >
                <div className="flex items-start gap-4">
                  <div className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-xl font-semibold transition-colors',
                    isCompleted ? 'bg-success text-success-foreground' : 'bg-secondary text-foreground'
                  )}>
                    {isCompleted ? <Check className="h-5 w-5" /> : index + 1}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {task.id.startsWith('insight') && (
                        <TrendingUp className="h-4 w-4 text-accent" />
                      )}
                      <h3 className="text-lg font-semibold">{task.title}</h3>
                      {isCompleted && <Badge className="bg-success/20 text-success border-0">✓</Badge>}
                    </div>
                    <p className="text-muted-foreground">{task.description}</p>
                    
                    {/* Code */}
                    <pre className="mt-4 p-4 rounded-lg bg-code-bg text-sm font-mono overflow-x-auto">
                      {task.code}
                    </pre>
                  </div>
                </div>
              </button>
            </div>
          );
        })}
      </div>

      {/* Expected output */}
      <div className="rounded-2xl border border-border bg-card/50 p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <AlertCircle className="h-6 w-6 text-warning" />
          Entregable esperado
        </h2>
        <div className="prose prose-invert max-w-none text-muted-foreground">
          <p>Al completar el proyecto, deberías poder responder:</p>
          <ul className="space-y-2 mt-4">
            <li><strong className="text-foreground">¿Cuántos registros únicos hay?</strong> → 9 (después de eliminar duplicados)</li>
            <li><strong className="text-foreground">¿Qué categoría genera más ingresos?</strong> → Tecnología</li>
            <li><strong className="text-foreground">¿Hay tendencia temporal?</strong> → Enero concentra las ventas</li>
            <li><strong className="text-foreground">¿Hay outliers en precios?</strong> → La Laptop (999.99) podría ser outlier</li>
          </ul>
        </div>
      </div>

      {/* Complete button */}
      {allCompleted && (
        <div className="text-center animate-slide-up">
          <Button onClick={onComplete} variant="hero" size="xl">
            Ir a Evaluación Final
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      )}
    </div>
  );
}
