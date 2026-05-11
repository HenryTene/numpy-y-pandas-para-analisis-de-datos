import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { sampleDataset } from '@/data/exercises';
import { Check, Rocket, Target, TrendingUp, AlertCircle, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PythonCode, type LineNote } from '@/components/PythonCode';

interface ProjectModuleProps {
  onComplete: () => void;
}

export function ProjectModule({ onComplete }: ProjectModuleProps) {
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);

  const tasks: Array<{ id: string; title: string; description: string; code: string; lineNotes: LineNote[] }> = [
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
      lineNotes: [
        { line: 1, note: 'Importamos pandas con el alias estándar pd.' },
        { line: 4, note: 'read_csv carga un archivo CSV en un DataFrame. Detecta separador, encoding y tipos automáticamente.' },
        { line: 7, note: '.shape devuelve la tupla (nº filas, nº columnas).' },
        { line: 8, note: '.info() lista columnas, tipos y cuántos no-nulos hay en cada una.' },
        { line: 9, note: '.describe() muestra estadísticas (count, mean, std, min, max, cuartiles) de las columnas numéricas.' },
        { line: 10, note: '.head() muestra las primeras 5 filas para inspeccionar visualmente.' },
      ],
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
      lineNotes: [
        { line: 2, note: 'drop_duplicates() elimina filas idénticas y devuelve un nuevo DataFrame.' },
        { line: 5, note: 'Convertimos precio a número; los strings inválidos se vuelven NaN gracias a errors="coerce".' },
        { line: 6, note: 'Imputamos los precios faltantes con la media de la columna.' },
        { line: 7, note: 'Para texto, rellenamos los nulos de ciudad con "Desconocido".' },
        { line: 10, note: 'Encadenamos .str.strip() y .str.lower() para limpiar espacios y normalizar a minúsculas en una sola línea.' },
        { line: 13, note: 'Convertimos las fechas a datetime con dayfirst=True (formato 15/01/2024) y coerce para errores.' },
      ],
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
      lineNotes: [
        { line: 2, note: '.dt.month extrae el número de mes (1-12) de cada fecha.' },
        { line: 3, note: '.dt.day_name() devuelve el nombre del día ("Monday", "Tuesday"...).' },
        { line: 6, note: 'Operación vectorizada: precio * cantidad se multiplica fila a fila para crear "ingresos".' },
        { line: 9, note: 'split("@") parte el email en lista [usuario, dominio]; .str[1] toma el segundo elemento (el dominio).' },
      ],
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
      lineNotes: [
        { line: 2, note: 'Agrupamos por categoría, sumamos los ingresos y ordenamos descendente para ver el top.' },
        { line: 8, note: 'Mismo patrón pero sumando "cantidad" para ver volumen de unidades vendidas.' },
      ],
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
      lineNotes: [
        { line: 2, note: 'groupby("mes") agrega ingresos por número de mes; útil para detectar estacionalidad.' },
        { line: 8, note: 'Agrupar por día de la semana ordenado descendente revela el día de mayor venta.' },
      ],
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
      lineNotes: [
        { line: 2, note: 'Q1 (cuartil 25%): el 25% de los precios son menores que este valor.' },
        { line: 3, note: 'Q3 (cuartil 75%): el 75% de los precios son menores que este valor.' },
        { line: 4, note: 'IQR (rango intercuartílico) = Q3 - Q1. Mide la dispersión del 50% central.' },
        { line: 6, note: 'Regla de Tukey: por debajo de Q1 - 1.5·IQR se considera outlier.' },
        { line: 7, note: 'Por encima de Q3 + 1.5·IQR también se considera outlier.' },
        { line: 10, note: 'Filtramos las filas cuyo precio está fuera del rango normal usando OR (|).' },
        { line: 12, note: 'f-string con :.2f formatea los números a 2 decimales.' },
      ],
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
                    <div className="mt-4">
                      <PythonCode code={task.code} lineNotes={task.lineNotes} />
                    </div>
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
