import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { sampleDataset } from '@/data/exercises';
import { Check, AlertTriangle, Trash2, Calendar, Type, Copy, ArrowRight, CheckCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

function CodeBlock({ code, title }: { code: string; title: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success('Código copiado al portapapeles');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-4 rounded-lg bg-code-bg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border/50">
        <span className="text-xs text-muted-foreground">{title}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          {copied ? <CheckCheck className="h-3 w-3 text-success" /> : <Copy className="h-3 w-3" />}
          {copied ? 'Copiado' : 'Copiar'}
        </button>
      </div>
      <pre className="p-4 text-sm font-mono overflow-x-auto">{code}</pre>
    </div>
  );
}

interface CleaningModuleProps {
  onComplete: () => void;
}

export function CleaningModule({ onComplete }: CleaningModuleProps) {
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  const checklistItems = [
    {
      id: 'duplicates',
      title: 'Eliminar duplicados',
      description: 'Identifica y elimina filas duplicadas con drop_duplicates()',
      icon: Copy,
      code: `# Identificar duplicados
print(df.duplicated().sum())

# Eliminar duplicados
df = df.drop_duplicates()`,
      problem: 'El dataset tiene 1 fila duplicada (order_id 1002)',
    },
    {
      id: 'nulls',
      title: 'Tratar valores nulos',
      description: 'Detecta NaN con isna() y decide: eliminar, rellenar o imputar',
      icon: AlertTriangle,
      code: `# Contar nulos por columna
print(df.isna().sum())

# Rellenar con valor
df['ciudad'].fillna('Desconocido', inplace=True)

# Rellenar con media/mediana
df['precio'].fillna(df['precio'].mean(), inplace=True)`,
      problem: 'Hay nulos en precio (2) y ciudad (2)',
    },
    {
      id: 'types',
      title: 'Corregir tipos de datos',
      description: 'Convierte columnas al tipo correcto con astype() o to_numeric()',
      icon: Type,
      code: `# Ver tipos actuales
print(df.dtypes)

# Convertir precio de string a float
df['precio'] = pd.to_numeric(df['precio'], errors='coerce')

# Verificar cambio
print(df.dtypes)`,
      problem: 'La columna precio está como string',
    },
    {
      id: 'dates',
      title: 'Parsear fechas',
      description: 'Convierte strings a datetime con to_datetime()',
      icon: Calendar,
      code: `# Convertir a datetime
df['fecha'] = pd.to_datetime(df['fecha'], dayfirst=True, errors='coerce')

# Extraer componentes
df['mes'] = df['fecha'].dt.month
df['dia_semana'] = df['fecha'].dt.dayofweek`,
      problem: 'Las fechas tienen formatos mixtos (2024-01-15, 15/01/2024, etc.)',
    },
    {
      id: 'text',
      title: 'Limpiar texto',
      description: 'Normaliza strings: espacios, mayúsculas, caracteres especiales',
      icon: Trash2,
      code: `# Limpiar emails
df['cliente_email'] = df['cliente_email'].str.strip()  # Quitar espacios
df['cliente_email'] = df['cliente_email'].str.lower()  # Minúsculas

# Verificar
print(df['cliente_email'].head())`,
      problem: 'Emails con espacios y mayúsculas inconsistentes',
    },
  ];

  const toggleStep = (stepId: string) => {
    setCompletedSteps(prev => 
      prev.includes(stepId) 
        ? prev.filter(id => id !== stepId)
        : [...prev, stepId]
    );
  };

  const allCompleted = completedSteps.length === checklistItems.length;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-warning/10 border border-warning/30 mb-4">
          <Trash2 className="h-4 w-4 text-warning" />
          <span className="text-sm font-medium text-warning">Módulo 4 de 6</span>
        </div>
        <h1 className="text-3xl font-bold mb-3">🧹 Limpieza Profesional</h1>
        <p className="text-lg text-muted-foreground">
          Checklist profesional para limpiar datasets reales
        </p>
        <div className="flex items-center justify-center gap-2 mt-4">
          <Badge variant="outline">{completedSteps.length}/{checklistItems.length} pasos</Badge>
        </div>
      </div>

      {/* Dataset info */}
      <div className="rounded-2xl border border-border bg-card p-6">
        <h2 className="text-xl font-semibold mb-4">📊 Dataset de práctica</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-primary mb-2">{sampleDataset.name}</h3>
            <p className="text-sm text-muted-foreground mb-4">{sampleDataset.description}</p>
            <div className="flex flex-wrap gap-2">
              {sampleDataset.columns.map(col => (
                <Badge key={col} variant="secondary" className="text-xs">{col}</Badge>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-medium text-destructive mb-2">⚠️ Problemas detectados</h3>
            <ul className="text-sm space-y-1">
              {sampleDataset.issues.map((issue, i) => (
                <li key={i} className="flex items-start gap-2 text-muted-foreground">
                  <AlertTriangle className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" />
                  {issue}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sample data table */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {['order_id', 'fecha', 'producto', 'precio', 'ciudad', 'cliente_email'].map(col => (
                  <th key={col} className="px-3 py-2 text-left font-medium text-muted-foreground">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sampleDataset.data.slice(0, 5).map((row, i) => (
                <tr key={i} className="border-b border-border/50">
                  <td className="px-3 py-2">{row.order_id}</td>
                  <td className="px-3 py-2 text-warning">{row.fecha}</td>
                  <td className="px-3 py-2">{row.producto}</td>
                  <td className={cn('px-3 py-2', !row.precio && 'text-destructive')}>{row.precio || 'NULL'}</td>
                  <td className={cn('px-3 py-2', !row.ciudad && 'text-destructive')}>{row.ciudad || 'NULL'}</td>
                  <td className="px-3 py-2 font-mono text-xs text-warning">{row.cliente_email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Checklist */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">✅ Checklist de limpieza</h2>
        
        {checklistItems.map((item, index) => {
          const isCompleted = completedSteps.includes(item.id);
          const Icon = item.icon;
          
          return (
            <div
              key={item.id}
              className={cn(
                'rounded-2xl border transition-all duration-300',
                isCompleted ? 'border-success/30 bg-success/5' : 'border-border bg-card'
              )}
            >
              <button
                onClick={() => toggleStep(item.id)}
                className="w-full p-6 text-left"
              >
                <div className="flex items-start gap-4">
                  <div className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-xl transition-colors',
                    isCompleted ? 'bg-success text-success-foreground' : 'bg-secondary text-muted-foreground'
                  )}>
                    {isCompleted ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm text-muted-foreground">Paso {index + 1}</span>
                      {isCompleted && <Badge className="bg-success/20 text-success border-0">Completado</Badge>}
                    </div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-muted-foreground mt-1">{item.description}</p>
                    
                    {/* Problem highlight */}
                    <div className="mt-3 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                      <p className="text-sm text-destructive flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        {item.problem}
                      </p>
                    </div>
                    
                    {/* Code example */}
                    <CodeBlock code={item.code} title="Python" />
                  </div>
                </div>
              </button>
            </div>
          );
        })}
      </div>

      {/* Complete button */}
      {allCompleted && (
        <div className="text-center animate-slide-up">
          <Button onClick={onComplete} variant="hero" size="xl">
            Continuar al Mini-Proyecto
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      )}
    </div>
  );
}
