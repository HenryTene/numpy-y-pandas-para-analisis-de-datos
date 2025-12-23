import { useState } from 'react';
import { numpyExercises } from '@/data/exercises';
import { ExerciseCard } from '@/components/ExerciseCard';
import { Badge } from '@/components/ui/badge';
import { Zap, Box, Layers, ChevronDown, ChevronUp, BookOpen, ExternalLink, Copy, CheckCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success('Código copiado al portapapeles');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
    >
      {copied ? <CheckCheck className="h-3 w-3 text-success" /> : <Copy className="h-3 w-3" />}
      {copied ? 'Copiado' : 'Copiar'}
    </button>
  );
}

interface NumPyModuleProps {
  completedExercises: string[];
  onCompleteExercise: (exerciseId: string, xp: number) => void;
  onError: () => void;
}

interface ExampleProps {
  title: string;
  description: string;
  code: string;
  output: string;
  explanation: string;
}

function CodeExample({ title, description, code, output, explanation }: ExampleProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors"
      >
        <div className="flex items-center gap-3">
          <BookOpen className="h-5 w-5 text-primary" />
          <span className="font-medium">{title}</span>
        </div>
        {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
      </button>
      
      {isExpanded && (
        <div className="px-4 pb-4 space-y-4 animate-fade-in">
          <p className="text-sm text-muted-foreground">{description}</p>
          
          <div className="rounded-lg bg-code-bg overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 border-b border-border/50">
              <span className="text-xs text-muted-foreground">Python</span>
              <CopyButton code={code} />
            </div>
            <pre className="p-4 text-sm font-mono overflow-x-auto">{code}</pre>
          </div>
          
          <div className="rounded-lg bg-success/10 border border-success/20 p-4">
            <p className="text-xs font-medium text-success mb-2">📤 Output:</p>
            <pre className="text-sm font-mono text-foreground">{output}</pre>
          </div>
          
          <div className="rounded-lg bg-primary/10 border border-primary/20 p-4">
            <p className="text-xs font-medium text-primary mb-2">💡 Explicación:</p>
            <p className="text-sm text-foreground">{explanation}</p>
          </div>
        </div>
      )}
    </div>
  );
}

const numpyExamples: ExampleProps[] = [
  {
    title: 'Ejemplo 1: Creación de Arrays',
    description: 'Aprende las diferentes formas de crear arrays en NumPy.',
    code: `import numpy as np

# Desde una lista
arr1 = np.array([1, 2, 3, 4, 5])
print("Desde lista:", arr1)

# Con arange (similar a range)
arr2 = np.arange(0, 10, 2)  # inicio, fin, paso
print("Con arange:", arr2)

# Con linspace (valores espaciados uniformemente)
arr3 = np.linspace(0, 1, 5)  # inicio, fin, cantidad
print("Con linspace:", arr3)

# Arrays especiales
zeros = np.zeros(5)
ones = np.ones(3)
print("Zeros:", zeros)
print("Ones:", ones)`,
    output: `Desde lista: [1 2 3 4 5]
Con arange: [0 2 4 6 8]
Con linspace: [0.   0.25 0.5  0.75 1.  ]
Zeros: [0. 0. 0. 0. 0.]
Ones: [1. 1. 1.]`,
    explanation: 'np.array() convierte listas a arrays. np.arange() es como range() pero para arrays. np.linspace() crea valores espaciados uniformemente entre dos puntos. np.zeros() y np.ones() crean arrays con valores predeterminados.',
  },
  {
    title: 'Ejemplo 2: Shape y Reshape',
    description: 'Entiende las dimensiones de los arrays y cómo cambiarlas.',
    code: `import numpy as np

# Array 1D
arr1d = np.array([1, 2, 3, 4, 5, 6])
print("Array 1D:", arr1d)
print("Shape:", arr1d.shape)

# Convertir a 2D (2 filas, 3 columnas)
arr2d = arr1d.reshape(2, 3)
print("\\nArray 2D:")
print(arr2d)
print("Shape:", arr2d.shape)

# Convertir a 3D (2 matrices de 1x3)
arr3d = arr1d.reshape(2, 1, 3)
print("\\nArray 3D shape:", arr3d.shape)

# Aplanar a 1D
flat = arr2d.flatten()
print("Aplanado:", flat)`,
    output: `Array 1D: [1 2 3 4 5 6]
Shape: (6,)

Array 2D:
[[1 2 3]
 [4 5 6]]
Shape: (2, 3)

Array 3D shape: (2, 1, 3)
Aplanado: [1 2 3 4 5 6]`,
    explanation: 'El shape indica las dimensiones del array. (6,) es 1D con 6 elementos. (2, 3) es 2D con 2 filas y 3 columnas. reshape() cambia la forma sin modificar los datos. flatten() vuelve a convertir en 1D.',
  },
  {
    title: 'Ejemplo 3: Indexing y Slicing',
    description: 'Accede a elementos específicos o rangos de elementos.',
    code: `import numpy as np

arr = np.array([10, 20, 30, 40, 50, 60, 70, 80])
print("Array original:", arr)

# Indexing (acceso a un elemento)
print("\\nPrimer elemento (índice 0):", arr[0])
print("Último elemento (índice -1):", arr[-1])
print("Tercer elemento (índice 2):", arr[2])

# Slicing (rango de elementos)
print("\\nDel índice 2 al 5:", arr[2:6])
print("Primeros 3:", arr[:3])
print("Últimos 3:", arr[-3:])
print("Cada 2 elementos:", arr[::2])
print("Invertido:", arr[::-1])

# En arrays 2D
matriz = np.array([[1, 2, 3],
                   [4, 5, 6],
                   [7, 8, 9]])
print("\\nMatriz:")
print(matriz)
print("Elemento [1,2]:", matriz[1, 2])
print("Primera fila:", matriz[0])
print("Primera columna:", matriz[:, 0])`,
    output: `Array original: [10 20 30 40 50 60 70 80]

Primer elemento (índice 0): 10
Último elemento (índice -1): 80
Tercer elemento (índice 2): 30

Del índice 2 al 5: [30 40 50 60]
Primeros 3: [10 20 30]
Últimos 3: [60 70 80]
Cada 2 elementos: [10 30 50 70]
Invertido: [80 70 60 50 40 30 20 10]

Matriz:
[[1 2 3]
 [4 5 6]
 [7 8 9]]
Elemento [1,2]: 6
Primera fila: [1 2 3]
Primera columna: [1 4 7]`,
    explanation: 'Los índices empiezan en 0. Los negativos cuentan desde el final. El slicing [inicio:fin] NO incluye el índice final. [::paso] define cada cuántos elementos tomar. En 2D, [fila, columna] accede a elementos específicos y [:, columna] selecciona toda una columna.',
  },
  {
    title: 'Ejemplo 4: Operaciones Vectorizadas',
    description: 'Realiza operaciones matemáticas en todos los elementos sin loops.',
    code: `import numpy as np

arr = np.array([1, 2, 3, 4, 5])
print("Array original:", arr)

# Operaciones aritméticas
print("\\n--- Operaciones básicas ---")
print("Suma 10:", arr + 10)
print("Multiplicar por 2:", arr * 2)
print("Elevar al cuadrado:", arr ** 2)
print("Dividir entre 2:", arr / 2)

# Operaciones entre arrays
arr2 = np.array([10, 20, 30, 40, 50])
print("\\n--- Entre arrays ---")
print("arr + arr2:", arr + arr2)
print("arr * arr2:", arr * arr2)

# Funciones matemáticas
print("\\n--- Funciones NumPy ---")
print("Raíz cuadrada:", np.sqrt(arr))
print("Exponencial:", np.exp(arr))
print("Logaritmo:", np.log(arr))

# Comparación con loops (NO recomendado)
# resultado = []
# for x in arr:
#     resultado.append(x * 2)
# Con NumPy es 100x más rápido: arr * 2`,
    output: `Array original: [1 2 3 4 5]

--- Operaciones básicas ---
Suma 10: [11 12 13 14 15]
Multiplicar por 2: [ 2  4  6  8 10]
Elevar al cuadrado: [ 1  4  9 16 25]
Dividir entre 2: [0.5 1.  1.5 2.  2.5]

--- Entre arrays ---
arr + arr2: [11 22 33 44 55]
arr * arr2: [ 10  40  90 160 250]

--- Funciones NumPy ---
Raíz cuadrada: [1.   1.41 1.73 2.   2.24]
Exponencial: [  2.72   7.39  20.09  54.60 148.41]
Logaritmo: [0.   0.69 1.10 1.39 1.61]`,
    explanation: 'Las operaciones se aplican a TODOS los elementos automáticamente. Esto es mucho más rápido que usar loops de Python. NumPy usa código C optimizado internamente. Las operaciones entre arrays de igual tamaño se aplican elemento a elemento.',
  },
  {
    title: 'Ejemplo 5: Máscaras Booleanas',
    description: 'Filtra datos usando condiciones lógicas.',
    code: `import numpy as np

datos = np.array([23, 45, 67, 12, 89, 34, 56, 78])
print("Datos:", datos)

# Crear máscara booleana
mascara = datos > 50
print("\\nMáscara (datos > 50):", mascara)

# Aplicar filtro
filtrados = datos[mascara]
print("Valores > 50:", filtrados)

# Forma directa (más común)
print("\\n--- Forma directa ---")
print("Mayores a 50:", datos[datos > 50])
print("Menores a 30:", datos[datos < 30])
print("Entre 30 y 70:", datos[(datos >= 30) & (datos <= 70)])

# Contar elementos que cumplen condición
print("\\n--- Conteos ---")
print("¿Cuántos > 50?", np.sum(datos > 50))
print("¿Hay alguno > 100?", np.any(datos > 100))
print("¿Todos > 10?", np.all(datos > 10))

# np.where: encontrar índices o reemplazar
indices = np.where(datos > 50)
print("\\nÍndices donde > 50:", indices[0])

reemplazado = np.where(datos > 50, "alto", "bajo")
print("Clasificación:", reemplazado)`,
    output: `Datos: [23 45 67 12 89 34 56 78]

Máscara (datos > 50): [False False  True False  True False  True  True]
Valores > 50: [67 89 56 78]

--- Forma directa ---
Mayores a 50: [67 89 56 78]
Menores a 30: [23 12]
Entre 30 y 70: [45 67 34 56]

--- Conteos ---
¿Cuántos > 50? 4
¿Hay alguno > 100? False
¿Todos > 10? True

Índices donde > 50: [2 4 6 7]
Clasificación: ['bajo' 'bajo' 'alto' 'bajo' 'alto' 'bajo' 'alto' 'alto']`,
    explanation: 'Una condición sobre un array crea una máscara booleana (True/False). Al usar la máscara como índice, NumPy devuelve solo los valores donde es True. Para múltiples condiciones usa & (and) y | (or) con paréntesis. np.where() es muy útil para encontrar posiciones o hacer reemplazos condicionales.',
  },
];

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
          <a 
            href="https://numpy.org/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
          >
            <ExternalLink className="h-3 w-3" />
            Documentación oficial
          </a>
        </div>
      </div>

      {/* Introduction */}
      <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5 p-6">
        <h2 className="text-xl font-semibold mb-4">🎯 ¿Qué es NumPy y por qué usarlo?</h2>
        <div className="prose prose-invert max-w-none text-muted-foreground">
          <p className="mb-4">
            <strong className="text-foreground">NumPy</strong> (Numerical Python) es la librería fundamental para computación científica en Python. 
            Proporciona arrays multidimensionales de alto rendimiento y herramientas para trabajar con ellos.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mt-4">
            <div className="p-4 rounded-lg bg-card border border-border">
              <h4 className="font-medium text-foreground mb-2">❌ Sin NumPy (lento)</h4>
              <pre className="text-xs bg-code-bg p-2 rounded overflow-x-auto">
{`# Multiplicar cada elemento por 2
lista = [1, 2, 3, 4, 5]
resultado = []
for x in lista:
    resultado.append(x * 2)
# [2, 4, 6, 8, 10]`}
              </pre>
            </div>
            <div className="p-4 rounded-lg bg-card border border-success/30">
              <h4 className="font-medium text-success mb-2">✅ Con NumPy (100x más rápido)</h4>
              <pre className="text-xs bg-code-bg p-2 rounded overflow-x-auto">
{`import numpy as np

arr = np.array([1, 2, 3, 4, 5])
resultado = arr * 2
# array([2, 4, 6, 8, 10])`}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Theory cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-border bg-card p-4">
          <Box className="h-8 w-8 text-primary mb-3" />
          <h3 className="font-semibold mb-1">Arrays N-dimensionales</h3>
          <p className="text-sm text-muted-foreground">
            Estructuras de datos homogéneas y eficientes. Tienen <code className="text-primary bg-primary/10 px-1 rounded">shape</code> (forma) y <code className="text-primary bg-primary/10 px-1 rounded">dtype</code> (tipo).
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <Zap className="h-8 w-8 text-warning mb-3" />
          <h3 className="font-semibold mb-1">Vectorización</h3>
          <p className="text-sm text-muted-foreground">
            Operaciones sobre arrays completos sin loops. Usa código C optimizado internamente.
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <Layers className="h-8 w-8 text-success mb-3" />
          <h3 className="font-semibold mb-1">Broadcasting</h3>
          <p className="text-sm text-muted-foreground">
            Operaciones entre arrays de diferentes dimensiones se ajustan automáticamente.
          </p>
        </div>
      </div>

      {/* Key concepts */}
      <div className="rounded-2xl border border-border bg-card/50 p-6">
        <h2 className="text-xl font-semibold mb-4">📚 Conceptos clave</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="font-medium text-primary">Creación de Arrays</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><code className="text-primary bg-primary/10 px-1 rounded">np.array([1,2,3])</code> - Desde lista</li>
              <li><code className="text-primary bg-primary/10 px-1 rounded">np.arange(0, 10)</code> - Rango de valores</li>
              <li><code className="text-primary bg-primary/10 px-1 rounded">np.linspace(0, 1, 5)</code> - Valores espaciados</li>
              <li><code className="text-primary bg-primary/10 px-1 rounded">np.zeros((3, 3))</code> - Array de ceros</li>
              <li><code className="text-primary bg-primary/10 px-1 rounded">np.ones((2, 4))</code> - Array de unos</li>
              <li><code className="text-primary bg-primary/10 px-1 rounded">np.random.rand(5)</code> - Valores aleatorios</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="font-medium text-primary">Propiedades y Métodos</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><code className="text-primary bg-primary/10 px-1 rounded">arr.shape</code> - Dimensiones</li>
              <li><code className="text-primary bg-primary/10 px-1 rounded">arr.dtype</code> - Tipo de datos</li>
              <li><code className="text-primary bg-primary/10 px-1 rounded">arr.reshape(2, 3)</code> - Cambiar forma</li>
              <li><code className="text-primary bg-primary/10 px-1 rounded">arr.flatten()</code> - Aplanar a 1D</li>
              <li><code className="text-primary bg-primary/10 px-1 rounded">arr.T</code> - Transponer</li>
              <li><code className="text-primary bg-primary/10 px-1 rounded">arr.copy()</code> - Copia independiente</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="font-medium text-primary">Agregaciones</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><code className="text-primary bg-primary/10 px-1 rounded">np.sum(arr)</code> - Suma total</li>
              <li><code className="text-primary bg-primary/10 px-1 rounded">np.mean(arr)</code> - Promedio</li>
              <li><code className="text-primary bg-primary/10 px-1 rounded">np.std(arr)</code> - Desviación estándar</li>
              <li><code className="text-primary bg-primary/10 px-1 rounded">np.min(arr)</code> / <code className="text-primary bg-primary/10 px-1 rounded">np.max(arr)</code></li>
              <li><code className="text-primary bg-primary/10 px-1 rounded">np.argmin(arr)</code> - Índice del mínimo</li>
              <li><code className="text-primary bg-primary/10 px-1 rounded">np.median(arr)</code> - Mediana</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="font-medium text-primary">Operadores lógicos</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><code className="text-primary bg-primary/10 px-1 rounded">arr &gt; 5</code> - Máscara booleana</li>
              <li><code className="text-primary bg-primary/10 px-1 rounded">arr[arr &gt; 5]</code> - Filtrar valores</li>
              <li><code className="text-primary bg-primary/10 px-1 rounded">(a &gt; 2) & (a &lt; 8)</code> - AND</li>
              <li><code className="text-primary bg-primary/10 px-1 rounded">(a &lt; 2) | (a &gt; 8)</code> - OR</li>
              <li><code className="text-primary bg-primary/10 px-1 rounded">np.where(cond, x, y)</code> - Condicional</li>
              <li><code className="text-primary bg-primary/10 px-1 rounded">np.any()</code> / <code className="text-primary bg-primary/10 px-1 rounded">np.all()</code></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Examples section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <BookOpen className="h-6 w-6 text-accent" />
          <h2 className="text-xl font-semibold">📖 Ejemplos desarrollados</h2>
        </div>
        <p className="text-muted-foreground">
          Estudia estos ejemplos antes de intentar los retos. Haz clic para expandir/colapsar.
        </p>
        
        {numpyExamples.map((example, index) => (
          <CodeExample key={index} {...example} />
        ))}
      </div>

      {/* Exercises */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 pt-4 border-t border-border">
          <Zap className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-semibold">🎯 Retos prácticos</h2>
        </div>
        <p className="text-muted-foreground">
          Ahora es tu turno. Aplica lo que aprendiste en estos ejercicios interactivos.
        </p>
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
