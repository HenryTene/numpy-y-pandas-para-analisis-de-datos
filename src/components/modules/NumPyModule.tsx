import { useState } from 'react';
import { numpyExercises } from '@/data/exercises';
import { ExerciseCard } from '@/components/ExerciseCard';
import { Badge } from '@/components/ui/badge';
import { Zap, Box, Layers, ChevronDown, ChevronUp, BookOpen, ExternalLink } from 'lucide-react';
import { PythonCode, type LineNote } from '@/components/PythonCode';

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
  lineNotes?: LineNote[];
}

function CodeExample({ title, description, code, output, explanation, lineNotes }: ExampleProps) {
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

          <PythonCode code={code} lineNotes={lineNotes} />

          <div className="rounded-lg bg-success/10 border border-success/20 p-4">
            <p className="text-xs font-medium text-success mb-2">📤 Output:</p>
            <pre className="text-sm font-mono text-foreground whitespace-pre-wrap">{output}</pre>
          </div>

          <div className="rounded-lg bg-primary/10 border border-primary/20 p-4">
            <p className="text-xs font-medium text-primary mb-2">💡 Resumen:</p>
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
    lineNotes: [
      { line: 1, note: 'Importamos NumPy con el alias estándar np.' },
      { line: 4, note: 'np.array() crea un array a partir de una lista de Python.' },
      { line: 8, note: 'np.arange(inicio, fin, paso) genera valores enteros sin incluir el final, igual que range().' },
      { line: 12, note: 'np.linspace(inicio, fin, n) crea n valores espaciados uniformemente; SÍ incluye el final.' },
      { line: 16, note: 'np.zeros(n) crea un array de n ceros (tipo float por defecto).' },
      { line: 17, note: 'np.ones(n) crea un array de n unos (también float).' },
    ],
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
    lineNotes: [
      { line: 4, note: 'Array unidimensional con 6 elementos.' },
      { line: 6, note: '.shape devuelve una tupla con las dimensiones. Aquí: (6,) significa 1D con 6 elementos.' },
      { line: 9, note: 'reshape(2, 3) reorganiza los datos como 2 filas × 3 columnas. El total de elementos debe coincidir.' },
      { line: 15, note: 'reshape(2, 1, 3) crea un array 3D: 2 bloques de 1 fila por 3 columnas.' },
      { line: 19, note: 'flatten() devuelve una copia 1D del array, sin importar su forma original.' },
    ],
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
    lineNotes: [
      { line: 3, note: 'Array de 8 elementos numerados 10..80 para visualizar fácilmente las posiciones.' },
      { line: 6, note: 'arr[0]: el primer elemento (los índices empiezan en 0).' },
      { line: 7, note: 'arr[-1]: índice negativo = contar desde el final. -1 es el último.' },
      { line: 11, note: 'arr[2:6]: del índice 2 al 5 (el 6 NO se incluye).' },
      { line: 12, note: 'arr[:3]: desde el inicio hasta el índice 3 (exclusivo).' },
      { line: 13, note: 'arr[-3:]: los últimos 3 elementos.' },
      { line: 14, note: 'arr[::2]: paso 2, toma uno sí y uno no.' },
      { line: 15, note: 'arr[::-1]: paso negativo invierte el array.' },
      { line: 18, note: 'Matriz 2D de 3x3 definida con listas anidadas.' },
      { line: 22, note: 'matriz[1, 2]: fila 1, columna 2 → 6.' },
      { line: 23, note: 'matriz[0]: fila completa (devuelve un array 1D).' },
      { line: 24, note: 'matriz[:, 0]: TODAS las filas, columna 0 → primera columna entera.' },
    ],
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
    lineNotes: [
      { line: 3, note: 'Array base de 5 elementos para demostrar las operaciones.' },
      { line: 8, note: 'arr + 10: NumPy suma 10 a CADA elemento (broadcasting de un escalar).' },
      { line: 9, note: 'arr * 2: multiplicación elemento a elemento, mucho más rápido que un for.' },
      { line: 10, note: '** es el operador de potencia en Python; aquí eleva cada elemento al cuadrado.' },
      { line: 14, note: 'Operaciones entre arrays del mismo tamaño se aplican elemento por elemento (no es producto matricial).' },
      { line: 21, note: 'np.sqrt aplica la raíz cuadrada a todos los elementos.' },
      { line: 22, note: 'np.exp calcula e^x para cada valor.' },
      { line: 23, note: 'np.log es el logaritmo natural (base e); para base 10 usa np.log10.' },
    ],
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
    lineNotes: [
      { line: 4, note: 'Creamos un array de prueba con 8 valores numéricos.' },
      { line: 7, note: 'datos > 50 compara cada elemento con 50 y devuelve un array booleano del mismo tamaño.' },
      { line: 11, note: 'Al indexar el array con la máscara, NumPy conserva solo las posiciones donde la máscara es True.' },
      { line: 16, note: 'Forma compacta: pasamos la condición directamente como índice, sin guardar la máscara.' },
      { line: 18, note: 'Combinación AND con & y paréntesis obligatorios alrededor de cada condición.' },
      { line: 22, note: 'np.sum sobre booleanos cuenta los True (True=1, False=0).' },
      { line: 23, note: 'np.any: devuelve True si AL MENOS UN elemento cumple la condición.' },
      { line: 24, note: 'np.all: devuelve True solo si TODOS los elementos cumplen la condición.' },
      { line: 27, note: 'np.where con un argumento devuelve los índices (posiciones) donde la condición es True.' },
      { line: 30, note: 'np.where(cond, x, y) actúa como if-else vectorizado: x donde cond es True, y donde es False.' },
    ],
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
