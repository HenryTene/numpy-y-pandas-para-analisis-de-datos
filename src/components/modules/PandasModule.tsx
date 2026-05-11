import { useState } from 'react';
import { pandasExercises } from '@/data/exercises';
import { ExerciseCard } from '@/components/ExerciseCard';
import { Badge } from '@/components/ui/badge';
import { Table, Filter, GitMerge, ChevronDown, ChevronUp, BookOpen, Database, ExternalLink } from 'lucide-react';
import { PythonCode, type LineNote } from '@/components/PythonCode';

interface PandasModuleProps {
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

const pandasExamples: ExampleProps[] = [
  {
    title: 'Ejemplo 1: Crear y explorar DataFrames',
    description: 'Aprende a crear DataFrames y usar métodos básicos de exploración.',
    code: `import pandas as pd

# Crear DataFrame desde diccionario
df = pd.DataFrame({
    'nombre': ['Ana', 'Luis', 'María', 'Pedro', 'Sofía'],
    'edad': [28, 34, 22, 45, 31],
    'ciudad': ['Madrid', 'Barcelona', 'Valencia', 'Madrid', 'Sevilla'],
    'salario': [35000, 42000, 28000, 55000, 38000]
})

print("DataFrame completo:")
print(df)

print("\\n--- Exploración básica ---")
print("Forma (filas, columnas):", df.shape)
print("Columnas:", df.columns.tolist())
print("Tipos de datos:")
print(df.dtypes)

print("\\n--- Primeras y últimas filas ---")
print("Primeras 2 filas:")
print(df.head(2))

print("\\n--- Estadísticas ---")
print(df.describe())`,
    output: `DataFrame completo:
  nombre  edad     ciudad  salario
0    Ana    28     Madrid    35000
1   Luis    34  Barcelona    42000
2  María    22   Valencia    28000
3  Pedro    45     Madrid    55000
4  Sofía    31    Sevilla    38000

--- Exploración básica ---
Forma (filas, columnas): (5, 4)
Columnas: ['nombre', 'edad', 'ciudad', 'salario']
Tipos de datos:
nombre     object
edad        int64
ciudad     object
salario     int64

--- Primeras y últimas filas ---
Primeras 2 filas:
  nombre  edad     ciudad  salario
0    Ana    28     Madrid    35000
1   Luis    34  Barcelona    42000

--- Estadísticas ---
            edad       salario
count   5.000000      5.000000
mean   32.000000  39600.000000
std     8.602325   9939.819405
min    22.000000  28000.000000
max    45.000000  55000.000000`,
    explanation: 'pd.DataFrame() crea una tabla desde un diccionario donde las claves son nombres de columnas. .shape muestra dimensiones, .dtypes los tipos de datos, .head(n) las primeras n filas, y .describe() genera estadísticas de columnas numéricas.',
  },
  {
    title: 'Ejemplo 2: Selección de datos con loc e iloc',
    description: 'Domina las dos formas principales de acceder a datos en un DataFrame.',
    code: `import pandas as pd

df = pd.DataFrame({
    'producto': ['Laptop', 'Mouse', 'Teclado', 'Monitor', 'Webcam'],
    'precio': [999, 29, 79, 299, 89],
    'stock': [50, 200, 150, 80, 120]
}, index=['A', 'B', 'C', 'D', 'E'])  # índice personalizado

print("DataFrame con índice personalizado:")
print(df)

print("\\n--- loc: selección por ETIQUETAS ---")
print("Fila 'B':")
print(df.loc['B'])

print("\\nFilas 'A' a 'C', columnas 'producto' y 'precio':")
print(df.loc['A':'C', ['producto', 'precio']])

print("\\n--- iloc: selección por POSICIÓN (números) ---")
print("Fila en posición 1 (segunda fila):")
print(df.iloc[1])

print("\\nFilas 0-2, columnas 0-1:")
print(df.iloc[0:3, 0:2])

print("\\n--- Selección de columnas ---")
print("Una columna (Serie):", df['precio'].tolist())
print("Múltiples columnas:")
print(df[['producto', 'stock']])`,
    output: `DataFrame con índice personalizado:
  producto  precio  stock
A   Laptop     999     50
B    Mouse      29    200
C  Teclado      79    150
D  Monitor     299     80
E   Webcam      89    120

--- loc: selección por ETIQUETAS ---
Fila 'B':
producto    Mouse
precio         29
stock         200
Name: B, dtype: object

Filas 'A' a 'C', columnas 'producto' y 'precio':
  producto  precio
A   Laptop     999
B    Mouse      29
C  Teclado      79

--- iloc: selección por POSICIÓN (números) ---
Fila en posición 1 (segunda fila):
producto    Mouse
precio         29
stock         200
Name: B, dtype: object

Filas 0-2, columnas 0-1:
  producto  precio
A   Laptop     999
B    Mouse      29
C  Teclado      79

--- Selección de columnas ---
Una columna (Serie): [999, 29, 79, 299, 89]
Múltiples columnas:
  producto  stock
A   Laptop     50
B    Mouse    200
C  Teclado    150
D  Monitor     80
E   Webcam    120`,
    explanation: 'loc usa etiquetas (nombres de índices y columnas). iloc usa posiciones numéricas (0, 1, 2...). En loc, el rango incluye el final ("A":"C" incluye C). En iloc, el rango excluye el final (0:3 son posiciones 0, 1, 2). Para columnas: df["col"] devuelve una Serie, df[["col1","col2"]] devuelve un DataFrame.',
  },
  {
    title: 'Ejemplo 3: Filtrado con condiciones',
    description: 'Filtra filas usando condiciones lógicas, similar a WHERE en SQL.',
    code: `import pandas as pd

df = pd.DataFrame({
    'empleado': ['Ana', 'Luis', 'María', 'Pedro', 'Sofía', 'Carlos'],
    'departamento': ['IT', 'Ventas', 'IT', 'RRHH', 'Ventas', 'IT'],
    'salario': [45000, 38000, 52000, 41000, 35000, 48000],
    'años_exp': [5, 3, 8, 6, 2, 7]
})

print("DataFrame original:")
print(df)

print("\\n--- Filtros simples ---")
print("Salario > 40000:")
print(df[df['salario'] > 40000])

print("\\nDepartamento = IT:")
print(df[df['departamento'] == 'IT'])

print("\\n--- Filtros múltiples ---")
print("IT con salario > 45000 (AND):")
print(df[(df['departamento'] == 'IT') & (df['salario'] > 45000)])

print("\\nVentas O más de 6 años exp (OR):")
print(df[(df['departamento'] == 'Ventas') | (df['años_exp'] > 6)])

print("\\n--- Filtro con isin() ---")
print("Departamentos IT o RRHH:")
print(df[df['departamento'].isin(['IT', 'RRHH'])])

print("\\n--- Filtro con query() (más legible) ---")
print(df.query('salario > 40000 and departamento == "IT"'))`,
    output: `DataFrame original:
  empleado departamento  salario  años_exp
0      Ana           IT    45000         5
1     Luis       Ventas    38000         3
2    María           IT    52000         8
3    Pedro         RRHH    41000         6
4    Sofía       Ventas    35000         2
5   Carlos           IT    48000         7

--- Filtros simples ---
Salario > 40000:
  empleado departamento  salario  años_exp
0      Ana           IT    45000         5
2    María           IT    52000         8
3    Pedro         RRHH    41000         6
5   Carlos           IT    48000         7

Departamento = IT:
  empleado departamento  salario  años_exp
0      Ana           IT    45000         5
2    María           IT    52000         8
5   Carlos           IT    48000         7

--- Filtros múltiples ---
IT con salario > 45000 (AND):
  empleado departamento  salario  años_exp
2    María           IT    52000         8
5   Carlos           IT    48000         7

Ventas O más de 6 años exp (OR):
  empleado departamento  salario  años_exp
1     Luis       Ventas    38000         3
2    María           IT    52000         8
4    Sofía       Ventas    35000         2
5   Carlos           IT    48000         7

--- Filtro con isin() ---
Departamentos IT o RRHH:
  empleado departamento  salario  años_exp
0      Ana           IT    45000         5
2    María           IT    52000         8
3    Pedro         RRHH    41000         6
5   Carlos           IT    48000         7

--- Filtro con query() (más legible) ---
  empleado departamento  salario  años_exp
2    María           IT    52000         8
5   Carlos           IT    48000         7`,
    explanation: 'df[condición] filtra filas donde la condición es True. Para múltiples condiciones usa & (AND) y | (OR) CON PARÉNTESIS obligatorios. isin() es útil para filtrar por una lista de valores. query() permite escribir condiciones como strings, más legible para consultas complejas.',
  },
  {
    title: 'Ejemplo 4: GroupBy y agregaciones',
    description: 'Agrupa datos y calcula estadísticas, como GROUP BY en SQL.',
    code: `import pandas as pd

df = pd.DataFrame({
    'categoria': ['Tech', 'Home', 'Tech', 'Food', 'Home', 'Tech', 'Food'],
    'producto': ['Laptop', 'Silla', 'Mouse', 'Pizza', 'Mesa', 'Monitor', 'Burger'],
    'ventas': [1500, 800, 300, 200, 600, 1200, 150],
    'cantidad': [5, 10, 50, 100, 8, 15, 80]
})

print("DataFrame original:")
print(df)

print("\\n--- GroupBy básico ---")
print("Suma de ventas por categoría:")
print(df.groupby('categoria')['ventas'].sum())

print("\\n--- Múltiples agregaciones ---")
print("Estadísticas por categoría:")
print(df.groupby('categoria')['ventas'].agg(['sum', 'mean', 'count']))

print("\\n--- Agregación en múltiples columnas ---")
print(df.groupby('categoria').agg({
    'ventas': 'sum',
    'cantidad': 'mean'
}))

print("\\n--- Resetear índice ---")
resumen = df.groupby('categoria')['ventas'].sum().reset_index()
resumen.columns = ['categoria', 'total_ventas']
print(resumen)

print("\\n--- Ordenar resultado ---")
print(df.groupby('categoria')['ventas'].sum().sort_values(ascending=False))`,
    output: `DataFrame original:
  categoria producto  ventas  cantidad
0      Tech   Laptop    1500         5
1      Home    Silla     800        10
2      Tech    Mouse     300        50
3      Food    Pizza     200       100
4      Home     Mesa     600         8
5      Tech  Monitor    1200        15
6      Food   Burger     150        80

--- GroupBy básico ---
Suma de ventas por categoría:
categoria
Food     350
Home    1400
Tech    3000
Name: ventas, dtype: int64

--- Múltiples agregaciones ---
Estadísticas por categoría:
            sum   mean  count
categoria                    
Food        350  175.0      2
Home       1400  700.0      2
Tech       3000 1000.0      3

--- Agregación en múltiples columnas ---
           ventas  cantidad
categoria                  
Food          350      90.0
Home         1400       9.0
Tech         3000      23.3

--- Resetear índice ---
  categoria  total_ventas
0      Food           350
1      Home          1400
2      Tech          3000

--- Ordenar resultado ---
categoria
Tech    3000
Home    1400
Food     350
Name: ventas, dtype: int64`,
    explanation: 'groupby() agrupa filas con el mismo valor en una columna. Luego aplicas funciones de agregación: sum(), mean(), count(), min(), max(), etc. agg() permite múltiples funciones o diferentes funciones por columna. reset_index() convierte el resultado en un DataFrame normal.',
  },
  {
    title: 'Ejemplo 5: Merge (JOIN de DataFrames)',
    description: 'Une DataFrames como harías JOIN en SQL.',
    code: `import pandas as pd

# DataFrame de pedidos
pedidos = pd.DataFrame({
    'pedido_id': [1, 2, 3, 4, 5],
    'cliente_id': [101, 102, 101, 103, 104],
    'producto': ['Laptop', 'Mouse', 'Monitor', 'Teclado', 'Webcam'],
    'monto': [999, 29, 299, 79, 89]
})

# DataFrame de clientes
clientes = pd.DataFrame({
    'cliente_id': [101, 102, 103, 105],
    'nombre': ['Ana García', 'Luis López', 'María Ruiz', 'Pedro Sanz'],
    'ciudad': ['Madrid', 'Barcelona', 'Valencia', 'Sevilla']
})

print("Pedidos:")
print(pedidos)
print("\\nClientes:")
print(clientes)

print("\\n--- INNER JOIN (solo coincidencias) ---")
inner = pd.merge(pedidos, clientes, on='cliente_id')
print(inner)

print("\\n--- LEFT JOIN (todos los pedidos) ---")
left = pd.merge(pedidos, clientes, on='cliente_id', how='left')
print(left)

print("\\n--- RIGHT JOIN (todos los clientes) ---")
right = pd.merge(pedidos, clientes, on='cliente_id', how='right')
print(right)

print("\\n--- Columnas con nombres diferentes ---")
clientes2 = clientes.rename(columns={'cliente_id': 'id_cliente'})
merged = pd.merge(pedidos, clientes2, 
                  left_on='cliente_id', 
                  right_on='id_cliente')
print(merged[['pedido_id', 'nombre', 'producto']])`,
    output: `Pedidos:
   pedido_id  cliente_id producto  monto
0          1         101   Laptop    999
1          2         102    Mouse     29
2          3         101  Monitor    299
3          4         103  Teclado     79
4          5         104   Webcam     89

Clientes:
   cliente_id      nombre     ciudad
0         101  Ana García     Madrid
1         102  Luis López  Barcelona
2         103  María Ruiz   Valencia
3         105  Pedro Sanz    Sevilla

--- INNER JOIN (solo coincidencias) ---
   pedido_id  cliente_id producto  monto      nombre     ciudad
0          1         101   Laptop    999  Ana García     Madrid
1          3         101  Monitor    299  Ana García     Madrid
2          2         102    Mouse     29  Luis López  Barcelona
3          4         103  Teclado     79  María Ruiz   Valencia

--- LEFT JOIN (todos los pedidos) ---
   pedido_id  cliente_id producto  monto      nombre     ciudad
0          1         101   Laptop    999  Ana García     Madrid
1          2         102    Mouse     29  Luis López  Barcelona
2          3         101  Monitor    299  Ana García     Madrid
3          4         103  Teclado     79  María Ruiz   Valencia
4          5         104   Webcam     89         NaN        NaN

--- RIGHT JOIN (todos los clientes) ---
   pedido_id  cliente_id producto  monto      nombre     ciudad
0        1.0       101.0   Laptop  999.0  Ana García     Madrid
1        3.0       101.0  Monitor  299.0  Ana García     Madrid
2        2.0       102.0    Mouse   29.0  Luis López  Barcelona
3        4.0       103.0  Teclado   79.0  María Ruiz   Valencia
4        NaN       105.0      NaN    NaN  Pedro Sanz    Sevilla

--- Columnas con nombres diferentes ---
   pedido_id      nombre producto
0          1  Ana García   Laptop
1          3  Ana García  Monitor
2          2  Luis López    Mouse
3          4  María Ruiz  Teclado`,
    explanation: 'pd.merge() une DataFrames por una columna común. INNER (por defecto) solo mantiene coincidencias. LEFT mantiene todas las filas del DataFrame izquierdo. RIGHT todas del derecho. OUTER todas de ambos. Si las columnas tienen nombres diferentes, usa left_on y right_on.',
    lineNotes: [
      { line: 4, note: 'DataFrame de pedidos con 5 registros; nota que cliente_id 104 no estará en clientes.' },
      { line: 12, note: 'DataFrame de clientes; cliente 105 nunca pidió, y 104 no aparece aquí.' },
      { line: 24, note: 'pd.merge con on="cliente_id" hace INNER JOIN: solo conserva las coincidencias en ambas tablas.' },
      { line: 28, note: 'how="left": conserva TODAS las filas de pedidos; rellena con NaN cuando el cliente no existe (104).' },
      { line: 32, note: 'how="right": conserva TODOS los clientes; pone NaN en pedido para los que no compraron (105).' },
      { line: 36, note: 'rename() cambia el nombre de la columna para simular tablas con nombres distintos.' },
      { line: 37, note: 'Cuando las columnas se llaman distinto, usamos left_on y right_on en lugar de on.' },
    ],
  },
  {
    title: 'Ejemplo 6: Manejo de valores nulos',
    description: 'Detecta, elimina o rellena valores faltantes (NaN).',
    code: `import pandas as pd
import numpy as np

df = pd.DataFrame({
    'nombre': ['Ana', 'Luis', 'María', None, 'Carlos'],
    'edad': [28, np.nan, 22, 35, np.nan],
    'salario': [35000, 42000, np.nan, np.nan, 38000],
    'ciudad': ['Madrid', 'Barcelona', None, 'Valencia', 'Sevilla']
})

print("DataFrame con valores nulos:")
print(df)

print("\\n--- Detectar nulos ---")
print("¿Es nulo? (máscara):")
print(df.isna())

print("\\nCantidad de nulos por columna:")
print(df.isna().sum())

print("\\nPorcentaje de nulos:")
print((df.isna().sum() / len(df) * 100).round(1))

print("\\n--- Eliminar nulos ---")
print("Eliminar filas con CUALQUIER nulo:")
print(df.dropna())

print("\\nEliminar filas donde edad es nulo:")
print(df.dropna(subset=['edad']))

print("\\n--- Rellenar nulos ---")
df_fill = df.copy()
df_fill['edad'] = df_fill['edad'].fillna(df_fill['edad'].mean())
df_fill['salario'] = df_fill['salario'].fillna(0)
df_fill['nombre'] = df_fill['nombre'].fillna('Desconocido')
df_fill['ciudad'] = df_fill['ciudad'].fillna('No especificada')

print("DataFrame después de rellenar:")
print(df_fill)`,
    output: `DataFrame con valores nulos:
    nombre  edad   salario     ciudad
0      Ana  28.0   35000.0     Madrid
1     Luis   NaN   42000.0  Barcelona
2    María  22.0       NaN       None
3     None  35.0       NaN   Valencia
4   Carlos   NaN   38000.0    Sevilla

--- Detectar nulos ---
¿Es nulo? (máscara):
   nombre   edad  salario  ciudad
0   False  False    False   False
1   False   True    False   False
2   False  False     True    True
3    True  False     True   False
4   False   True    False   False

Cantidad de nulos por columna:
nombre     1
edad       2
salario    2
ciudad     1
dtype: int64

Porcentaje de nulos:
nombre     20.0
edad       40.0
salario    40.0
ciudad     20.0
dtype: float64

--- Eliminar nulos ---
Eliminar filas con CUALQUIER nulo:
  nombre  edad   salario    ciudad
0    Ana  28.0   35000.0    Madrid

Eliminar filas donde edad es nulo:
  nombre  edad   salario    ciudad
0    Ana  28.0   35000.0    Madrid
2  María  22.0       NaN      None
3   None  35.0       NaN  Valencia

--- Rellenar nulos ---
DataFrame después de rellenar:
       nombre  edad   salario          ciudad
0         Ana  28.0   35000.0          Madrid
1        Luis  28.3   42000.0       Barcelona
2       María  22.0       0.0  No especificada
3  Desconocido  35.0       0.0        Valencia
4      Carlos  28.3   38000.0         Sevilla`,
    explanation: 'isna() detecta valores nulos. dropna() elimina filas/columnas con nulos (subset= para columnas específicas). fillna() reemplaza nulos con un valor: puede ser un número fijo, la media, mediana, moda, o forward/backward fill. Nunca uses == np.nan para comparar.',
    lineNotes: [
      { line: 2, note: 'Importamos numpy para acceder a np.nan, la representación oficial de "Not a Number".' },
      { line: 5, note: 'None es el nulo para strings/objetos en Python.' },
      { line: 6, note: 'np.nan es el nulo para floats; al haber NaN, toda la columna pasa a tipo float64.' },
      { line: 16, note: 'isna() devuelve un DataFrame booleano del mismo tamaño con True en celdas nulas.' },
      { line: 19, note: '.sum() sobre booleanos cuenta los True por columna → cantidad de nulos.' },
      { line: 22, note: 'Dividir entre len(df) y ×100 da el porcentaje de nulos por columna; .round(1) deja 1 decimal.' },
      { line: 26, note: 'dropna() sin argumentos elimina toda fila que tenga AL MENOS un nulo.' },
      { line: 29, note: 'subset=["edad"] limita el dropna a una columna concreta.' },
      { line: 32, note: '.copy() crea una copia independiente para no mutar el DataFrame original.' },
      { line: 33, note: 'Imputación clásica: rellenar nulos numéricos con la media de la columna.' },
      { line: 34, note: 'Para salario, rellenamos con 0 (decisión de negocio).' },
      { line: 35, note: 'Para texto usamos un placeholder descriptivo en lugar de un número.' },
    ],
  },
];

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
          <a 
            href="https://pandas.pydata.org/" 
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
        <h2 className="text-xl font-semibold mb-4">🎯 ¿Qué es Pandas y por qué usarlo?</h2>
        <div className="prose prose-invert max-w-none text-muted-foreground">
          <p className="mb-4">
            <strong className="text-foreground">Pandas</strong> es la librería estrella para análisis de datos en Python.
            Construida sobre NumPy, proporciona estructuras de datos flexibles y herramientas potentes para manipular datos tabulares.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mt-4">
            <div className="p-4 rounded-lg bg-card border border-border">
              <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                <Database className="h-4 w-4 text-primary" />
                Series (1D)
              </h4>
              <p className="text-sm mb-2">Array con índice etiquetado. Una columna del DataFrame.</p>
              <pre className="text-xs bg-code-bg p-2 rounded overflow-x-auto">
{`s = pd.Series([10, 20, 30])
# 0    10
# 1    20
# 2    30`}
              </pre>
            </div>
            <div className="p-4 rounded-lg bg-card border border-success/30">
              <h4 className="font-medium text-success mb-2 flex items-center gap-2">
                <Table className="h-4 w-4" />
                DataFrame (2D)
              </h4>
              <p className="text-sm mb-2">Tabla con filas y columnas etiquetadas. La estructura principal.</p>
              <pre className="text-xs bg-code-bg p-2 rounded overflow-x-auto">
{`df = pd.DataFrame({
    'A': [1, 2],
    'B': [3, 4]
})`}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Theory cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-border bg-card p-4">
          <Table className="h-8 w-8 text-primary mb-3" />
          <h3 className="font-semibold mb-1">DataFrames</h3>
          <p className="text-sm text-muted-foreground">
            Tablas 2D con columnas de diferentes tipos. Como una hoja de Excel pero con superpoderes.
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <Filter className="h-8 w-8 text-warning mb-3" />
          <h3 className="font-semibold mb-1">Filtrado y Selección</h3>
          <p className="text-sm text-muted-foreground">
            Acceso flexible a filas y columnas con loc, iloc y condiciones booleanas.
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <GitMerge className="h-8 w-8 text-success mb-3" />
          <h3 className="font-semibold mb-1">Merge y GroupBy</h3>
          <p className="text-sm text-muted-foreground">
            Une tablas como en SQL y agrupa para calcular estadísticas por categoría.
          </p>
        </div>
      </div>

      {/* Key concepts */}
      <div className="rounded-2xl border border-border bg-card/50 p-6">
        <h2 className="text-xl font-semibold mb-4">📚 Conceptos clave</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="font-medium text-primary">Crear y cargar datos</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><code className="text-primary bg-primary/10 px-1 rounded">pd.DataFrame(dict)</code> - Desde diccionario</li>
              <li><code className="text-primary bg-primary/10 px-1 rounded">pd.read_csv("file.csv")</code> - Desde CSV</li>
              <li><code className="text-primary bg-primary/10 px-1 rounded">pd.read_excel("file.xlsx")</code> - Desde Excel</li>
              <li><code className="text-primary bg-primary/10 px-1 rounded">df.to_csv("out.csv")</code> - Guardar a CSV</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="font-medium text-primary">Exploración</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><code className="text-primary bg-primary/10 px-1 rounded">df.head(n)</code> / <code className="text-primary bg-primary/10 px-1 rounded">df.tail(n)</code> - Primeras/últimas filas</li>
              <li><code className="text-primary bg-primary/10 px-1 rounded">df.shape</code> - Dimensiones (filas, cols)</li>
              <li><code className="text-primary bg-primary/10 px-1 rounded">df.info()</code> - Info de columnas y tipos</li>
              <li><code className="text-primary bg-primary/10 px-1 rounded">df.describe()</code> - Estadísticas numéricas</li>
              <li><code className="text-primary bg-primary/10 px-1 rounded">df.dtypes</code> - Tipos de cada columna</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="font-medium text-primary">Selección de datos</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><code className="text-primary bg-primary/10 px-1 rounded">df["col"]</code> - Una columna (Serie)</li>
              <li><code className="text-primary bg-primary/10 px-1 rounded">df[["col1","col2"]]</code> - Varias columnas</li>
              <li><code className="text-primary bg-primary/10 px-1 rounded">df.loc[row, col]</code> - Por etiquetas</li>
              <li><code className="text-primary bg-primary/10 px-1 rounded">df.iloc[row, col]</code> - Por posición</li>
              <li><code className="text-primary bg-primary/10 px-1 rounded">df[df["col"] &gt; x]</code> - Filtro booleano</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="font-medium text-primary">Transformaciones</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><code className="text-primary bg-primary/10 px-1 rounded">df.groupby("col").agg()</code> - Agrupar</li>
              <li><code className="text-primary bg-primary/10 px-1 rounded">pd.merge(df1, df2)</code> - Unir DataFrames</li>
              <li><code className="text-primary bg-primary/10 px-1 rounded">df.sort_values("col")</code> - Ordenar</li>
              <li><code className="text-primary bg-primary/10 px-1 rounded">df.pivot_table()</code> - Tabla pivote</li>
              <li><code className="text-primary bg-primary/10 px-1 rounded">df.apply(func)</code> - Aplicar función</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="font-medium text-primary">Limpieza</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><code className="text-primary bg-primary/10 px-1 rounded">df.isna().sum()</code> - Contar nulos</li>
              <li><code className="text-primary bg-primary/10 px-1 rounded">df.dropna()</code> - Eliminar nulos</li>
              <li><code className="text-primary bg-primary/10 px-1 rounded">df.fillna(value)</code> - Rellenar nulos</li>
              <li><code className="text-primary bg-primary/10 px-1 rounded">df.drop_duplicates()</code> - Quitar duplicados</li>
              <li><code className="text-primary bg-primary/10 px-1 rounded">df.astype(tipo)</code> - Cambiar tipo</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="font-medium text-primary">Strings y fechas</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><code className="text-primary bg-primary/10 px-1 rounded">df["col"].str.lower()</code> - Minúsculas</li>
              <li><code className="text-primary bg-primary/10 px-1 rounded">df["col"].str.strip()</code> - Quitar espacios</li>
              <li><code className="text-primary bg-primary/10 px-1 rounded">pd.to_datetime(col)</code> - A fecha</li>
              <li><code className="text-primary bg-primary/10 px-1 rounded">df["col"].dt.month</code> - Extraer mes</li>
              <li><code className="text-primary bg-primary/10 px-1 rounded">df["col"].dt.dayofweek</code> - Día semana</li>
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
        
        {pandasExamples.map((example, index) => (
          <CodeExample key={index} {...example} />
        ))}
      </div>

      {/* Exercises */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 pt-4 border-t border-border">
          <Filter className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-semibold">🎯 Retos prácticos</h2>
        </div>
        <p className="text-muted-foreground">
          Ahora es tu turno. Aplica lo que aprendiste en estos ejercicios interactivos.
        </p>
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
