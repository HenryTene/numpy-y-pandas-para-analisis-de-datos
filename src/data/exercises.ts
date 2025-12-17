export interface Exercise {
  id: string;
  title: string;
  description: string;
  difficulty: 'facil' | 'medio' | 'dificil';
  xp: number;
  hint: string;
  initialCode: string;
  solution: string;
  expectedOutput: string;
  explanation: string;
  commonErrors: string[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  icon: string;
  duration: string;
  exercises: Exercise[];
  theory: string[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: string;
  unlocked: boolean;
}

export const badges: Badge[] = [
  {
    id: 'first_step',
    name: 'Primer Paso',
    description: 'Completaste tu primer ejercicio',
    icon: '🚀',
    requirement: 'Completa 1 ejercicio',
    unlocked: false,
  },
  {
    id: 'vectorization_pro',
    name: 'Vectorización Pro',
    description: 'Dominaste las operaciones vectorizadas',
    icon: '⚡',
    requirement: 'Completa todos los ejercicios de NumPy',
    unlocked: false,
  },
  {
    id: 'dataframe_ninja',
    name: 'DataFrame Ninja',
    description: 'Eres un experto en Pandas',
    icon: '🥷',
    requirement: 'Completa todos los ejercicios de Pandas',
    unlocked: false,
  },
  {
    id: 'data_cleaner',
    name: 'Cleaner de Datos',
    description: 'Limpiaste un dataset completo',
    icon: '🧹',
    requirement: 'Completa el módulo de limpieza',
    unlocked: false,
  },
  {
    id: 'streak_master',
    name: 'Racha Imparable',
    description: '5 ejercicios correctos seguidos',
    icon: '🔥',
    requirement: '5 respuestas correctas consecutivas',
    unlocked: false,
  },
  {
    id: 'project_complete',
    name: 'Proyecto Integrador',
    description: 'Completaste el mini-proyecto',
    icon: '🏆',
    requirement: 'Termina el proyecto final',
    unlocked: false,
  },
];

export const numpyExercises: Exercise[] = [
  {
    id: 'numpy_1',
    title: 'Creación de Arrays',
    description: 'Crea un array de NumPy con los números del 1 al 10',
    difficulty: 'facil',
    xp: 10,
    hint: 'Usa np.arange() o np.array() con una lista',
    initialCode: `import numpy as np

# Crea un array con números del 1 al 10
arr = # Tu código aquí

print(arr)`,
    solution: `import numpy as np

# Crea un array con números del 1 al 10
arr = np.arange(1, 11)

print(arr)`,
    expectedOutput: '[ 1  2  3  4  5  6  7  8  9 10]',
    explanation: 'np.arange(start, stop) crea un array con valores desde start hasta stop-1. También podrías usar np.array([1,2,3,4,5,6,7,8,9,10]).',
    commonErrors: [
      'Olvidar que arange no incluye el valor final',
      'Usar range() en lugar de np.arange()',
    ],
  },
  {
    id: 'numpy_2',
    title: 'Indexing y Slicing',
    description: 'Dado un array, extrae los elementos del índice 2 al 5 (inclusive)',
    difficulty: 'facil',
    xp: 15,
    hint: 'Recuerda que el slicing en Python es [inicio:fin+1]',
    initialCode: `import numpy as np

arr = np.array([10, 20, 30, 40, 50, 60, 70, 80])

# Extrae elementos del índice 2 al 5
resultado = # Tu código aquí

print(resultado)`,
    solution: `import numpy as np

arr = np.array([10, 20, 30, 40, 50, 60, 70, 80])

# Extrae elementos del índice 2 al 5
resultado = arr[2:6]

print(resultado)`,
    expectedOutput: '[30 40 50 60]',
    explanation: 'En NumPy, arr[2:6] extrae desde el índice 2 hasta el 5 (el 6 no se incluye). Los índices empiezan en 0.',
    commonErrors: [
      'Olvidar que el índice final no se incluye',
      'Confundir índices con valores',
    ],
  },
  {
    id: 'numpy_3',
    title: 'Máscaras Booleanas',
    description: 'Filtra todos los valores mayores a 50 de un array',
    difficulty: 'medio',
    xp: 20,
    hint: 'Puedes usar una condición directamente: arr[arr > valor]',
    initialCode: `import numpy as np

arr = np.array([23, 65, 12, 89, 45, 67, 34, 91, 28])

# Filtra valores mayores a 50
filtrado = # Tu código aquí

print(filtrado)`,
    solution: `import numpy as np

arr = np.array([23, 65, 12, 89, 45, 67, 34, 91, 28])

# Filtra valores mayores a 50
filtrado = arr[arr > 50]

print(filtrado)`,
    expectedOutput: '[65 89 67 91]',
    explanation: 'arr > 50 crea una máscara booleana [False, True, False, True, False, True, False, True, False]. Al usar esta máscara como índice, NumPy devuelve solo los valores donde la máscara es True.',
    commonErrors: [
      'Usar filter() de Python en lugar de máscaras',
      'Olvidar los corchetes para aplicar la máscara',
    ],
  },
  {
    id: 'numpy_4',
    title: 'Broadcasting',
    description: 'Multiplica todos los elementos de un array 2D por 2 y súmales 10',
    difficulty: 'medio',
    xp: 25,
    hint: 'Las operaciones aritméticas se aplican elemento por elemento automáticamente',
    initialCode: `import numpy as np

matriz = np.array([[1, 2, 3],
                   [4, 5, 6],
                   [7, 8, 9]])

# Multiplica por 2 y suma 10
resultado = # Tu código aquí

print(resultado)`,
    solution: `import numpy as np

matriz = np.array([[1, 2, 3],
                   [4, 5, 6],
                   [7, 8, 9]])

# Multiplica por 2 y suma 10
resultado = matriz * 2 + 10

print(resultado)`,
    expectedOutput: `[[12 14 16]
 [18 20 22]
 [24 26 28]]`,
    explanation: 'NumPy aplica las operaciones a todos los elementos automáticamente (broadcasting). No necesitas loops.',
    commonErrors: [
      'Usar loops para iterar elemento por elemento',
      'Confundir * con np.multiply() (ambos funcionan)',
    ],
  },
  {
    id: 'numpy_5',
    title: 'Agregaciones',
    description: 'Calcula la suma, media y desviación estándar de un array',
    difficulty: 'dificil',
    xp: 30,
    hint: 'Usa np.sum(), np.mean() y np.std()',
    initialCode: `import numpy as np

datos = np.array([45, 67, 89, 23, 56, 78, 34, 91, 12, 55])

# Calcula estadísticas
suma = # Tu código
media = # Tu código
desviacion = # Tu código

print(f"Suma: {suma}")
print(f"Media: {media:.2f}")
print(f"Desviación: {desviacion:.2f}")`,
    solution: `import numpy as np

datos = np.array([45, 67, 89, 23, 56, 78, 34, 91, 12, 55])

# Calcula estadísticas
suma = np.sum(datos)
media = np.mean(datos)
desviacion = np.std(datos)

print(f"Suma: {suma}")
print(f"Media: {media:.2f}")
print(f"Desviación: {desviacion:.2f}")`,
    expectedOutput: `Suma: 550
Media: 55.00
Desviación: 24.82`,
    explanation: 'NumPy proporciona funciones de agregación optimizadas. También puedes usar datos.sum(), datos.mean(), datos.std() como métodos.',
    commonErrors: [
      'Usar sum() de Python (más lento)',
      'Olvidar que std() usa N por defecto, no N-1',
    ],
  },
];

export const pandasExercises: Exercise[] = [
  {
    id: 'pandas_1',
    title: 'Crear DataFrame',
    description: 'Crea un DataFrame con datos de productos: nombre, precio y stock',
    difficulty: 'facil',
    xp: 10,
    hint: 'Usa pd.DataFrame() con un diccionario',
    initialCode: `import pandas as pd

# Crea un DataFrame con 3 productos
# Columnas: nombre, precio, stock
df = # Tu código aquí

print(df)`,
    solution: `import pandas as pd

# Crea un DataFrame con 3 productos
df = pd.DataFrame({
    'nombre': ['Laptop', 'Mouse', 'Teclado'],
    'precio': [999.99, 29.99, 79.99],
    'stock': [50, 200, 150]
})

print(df)`,
    expectedOutput: `   nombre  precio  stock
0  Laptop  999.99     50
1   Mouse   29.99    200
2 Teclado   79.99    150`,
    explanation: 'pd.DataFrame() acepta un diccionario donde las claves son nombres de columnas y los valores son listas con los datos.',
    commonErrors: [
      'Listas de diferente longitud',
      'Olvidar importar pandas',
    ],
  },
  {
    id: 'pandas_2',
    title: 'Selección de Columnas',
    description: 'Selecciona solo las columnas "producto" y "ventas" del DataFrame',
    difficulty: 'facil',
    xp: 15,
    hint: 'Usa df[["col1", "col2"]] con doble corchete',
    initialCode: `import pandas as pd

df = pd.DataFrame({
    'producto': ['A', 'B', 'C', 'D'],
    'categoria': ['Tech', 'Home', 'Tech', 'Food'],
    'ventas': [1500, 800, 2300, 450],
    'costo': [1000, 500, 1500, 200]
})

# Selecciona solo producto y ventas
resultado = # Tu código aquí

print(resultado)`,
    solution: `import pandas as pd

df = pd.DataFrame({
    'producto': ['A', 'B', 'C', 'D'],
    'categoria': ['Tech', 'Home', 'Tech', 'Food'],
    'ventas': [1500, 800, 2300, 450],
    'costo': [1000, 500, 1500, 200]
})

# Selecciona solo producto y ventas
resultado = df[['producto', 'ventas']]

print(resultado)`,
    expectedOutput: `  producto  ventas
0        A    1500
1        B     800
2        C    2300
3        D     450`,
    explanation: 'Para seleccionar múltiples columnas, pasa una lista de nombres dentro de corchetes: df[["col1", "col2"]].',
    commonErrors: [
      'Usar corchete simple df["col1", "col2"] (error)',
      'Escribir mal el nombre de la columna',
    ],
  },
  {
    id: 'pandas_3',
    title: 'Filtrado con Condiciones',
    description: 'Filtra productos con ventas mayores a 1000',
    difficulty: 'medio',
    xp: 20,
    hint: 'Usa df[df["columna"] > valor]',
    initialCode: `import pandas as pd

df = pd.DataFrame({
    'producto': ['A', 'B', 'C', 'D', 'E'],
    'ventas': [1500, 800, 2300, 450, 1100]
})

# Filtra ventas > 1000
filtrado = # Tu código aquí

print(filtrado)`,
    solution: `import pandas as pd

df = pd.DataFrame({
    'producto': ['A', 'B', 'C', 'D', 'E'],
    'ventas': [1500, 800, 2300, 450, 1100]
})

# Filtra ventas > 1000
filtrado = df[df['ventas'] > 1000]

print(filtrado)`,
    expectedOutput: `  producto  ventas
0        A    1500
2        C    2300
4        E    1100`,
    explanation: 'df["ventas"] > 1000 crea una Serie booleana. Al usarla como filtro, Pandas devuelve solo las filas donde la condición es True.',
    commonErrors: [
      'Olvidar repetir df dentro del filtro',
      'Usar AND/OR de Python en lugar de & / |',
    ],
  },
  {
    id: 'pandas_4',
    title: 'GroupBy Básico',
    description: 'Agrupa por categoría y calcula la suma de ventas',
    difficulty: 'medio',
    xp: 25,
    hint: 'Usa df.groupby("columna")["otra_columna"].sum()',
    initialCode: `import pandas as pd

df = pd.DataFrame({
    'categoria': ['Tech', 'Home', 'Tech', 'Food', 'Home'],
    'ventas': [1500, 800, 2300, 450, 600]
})

# Suma de ventas por categoría
resultado = # Tu código aquí

print(resultado)`,
    solution: `import pandas as pd

df = pd.DataFrame({
    'categoria': ['Tech', 'Home', 'Tech', 'Food', 'Home'],
    'ventas': [1500, 800, 2300, 450, 600]
})

# Suma de ventas por categoría
resultado = df.groupby('categoria')['ventas'].sum()

print(resultado)`,
    expectedOutput: `categoria
Food     450
Home    1400
Tech    3800
Name: ventas, dtype: int64`,
    explanation: 'groupby() agrupa los datos y luego aplicamos una función de agregación. Puedes usar .sum(), .mean(), .count(), etc.',
    commonErrors: [
      'Olvidar seleccionar la columna antes de agregar',
      'Confundir groupby con filter',
    ],
  },
  {
    id: 'pandas_5',
    title: 'Merge de DataFrames',
    description: 'Une dos DataFrames usando una columna común',
    difficulty: 'dificil',
    xp: 30,
    hint: 'Usa pd.merge(df1, df2, on="columna_comun")',
    initialCode: `import pandas as pd

ventas = pd.DataFrame({
    'producto_id': [1, 2, 3, 4],
    'cantidad': [100, 50, 200, 75]
})

productos = pd.DataFrame({
    'producto_id': [1, 2, 3, 4],
    'nombre': ['Laptop', 'Mouse', 'Monitor', 'Teclado'],
    'precio': [999, 29, 299, 79]
})

# Une los DataFrames por producto_id
resultado = # Tu código aquí

print(resultado)`,
    solution: `import pandas as pd

ventas = pd.DataFrame({
    'producto_id': [1, 2, 3, 4],
    'cantidad': [100, 50, 200, 75]
})

productos = pd.DataFrame({
    'producto_id': [1, 2, 3, 4],
    'nombre': ['Laptop', 'Mouse', 'Monitor', 'Teclado'],
    'precio': [999, 29, 299, 79]
})

# Une los DataFrames por producto_id
resultado = pd.merge(ventas, productos, on='producto_id')

print(resultado)`,
    expectedOutput: `   producto_id  cantidad   nombre  precio
0            1       100   Laptop     999
1            2        50    Mouse      29
2            3       200  Monitor     299
3            4        75  Teclado      79`,
    explanation: 'pd.merge() une DataFrames como un JOIN de SQL. Por defecto hace inner join. Puedes especificar how="left", "right", "outer".',
    commonErrors: [
      'Columnas con nombres diferentes (usa left_on, right_on)',
      'No especificar el tipo de join cuando se necesita',
    ],
  },
  {
    id: 'pandas_6',
    title: 'Manejo de Valores Nulos',
    description: 'Identifica y rellena valores nulos con la media',
    difficulty: 'medio',
    xp: 25,
    hint: 'Usa .isna() para detectar y .fillna() para rellenar',
    initialCode: `import pandas as pd
import numpy as np

df = pd.DataFrame({
    'producto': ['A', 'B', 'C', 'D', 'E'],
    'ventas': [1500, np.nan, 2300, np.nan, 1100]
})

# 1. Cuenta valores nulos
nulos = # Tu código

# 2. Rellena con la media
df_limpio = # Tu código

print(f"Valores nulos: {nulos}")
print(df_limpio)`,
    solution: `import pandas as pd
import numpy as np

df = pd.DataFrame({
    'producto': ['A', 'B', 'C', 'D', 'E'],
    'ventas': [1500, np.nan, 2300, np.nan, 1100]
})

# 1. Cuenta valores nulos
nulos = df['ventas'].isna().sum()

# 2. Rellena con la media
df_limpio = df.fillna(df['ventas'].mean())

print(f"Valores nulos: {nulos}")
print(df_limpio)`,
    expectedOutput: `Valores nulos: 2
  producto       ventas
0        A  1500.000000
1        B  1633.333333
2        C  2300.000000
3        D  1633.333333
4        E  1100.000000`,
    explanation: '.isna() retorna True donde hay NaN. .fillna(valor) reemplaza los NaN con el valor especificado.',
    commonErrors: [
      'Usar == np.nan (no funciona, usar .isna())',
      'Olvidar que fillna() no modifica in-place por defecto',
    ],
  },
  {
    id: 'pandas_7',
    title: 'Pivot Table',
    description: 'Crea una tabla pivote de ventas por región y producto',
    difficulty: 'dificil',
    xp: 35,
    hint: 'Usa pd.pivot_table(df, values, index, columns, aggfunc)',
    initialCode: `import pandas as pd

df = pd.DataFrame({
    'region': ['Norte', 'Norte', 'Sur', 'Sur', 'Norte', 'Sur'],
    'producto': ['A', 'B', 'A', 'B', 'A', 'B'],
    'ventas': [100, 150, 200, 120, 180, 90]
})

# Crea pivot: filas=region, columnas=producto, valores=suma de ventas
pivot = # Tu código aquí

print(pivot)`,
    solution: `import pandas as pd

df = pd.DataFrame({
    'region': ['Norte', 'Norte', 'Sur', 'Sur', 'Norte', 'Sur'],
    'producto': ['A', 'B', 'A', 'B', 'A', 'B'],
    'ventas': [100, 150, 200, 120, 180, 90]
})

# Crea pivot: filas=region, columnas=producto, valores=suma de ventas
pivot = pd.pivot_table(df, values='ventas', index='region', 
                       columns='producto', aggfunc='sum')

print(pivot)`,
    expectedOutput: `producto    A    B
region              
Norte     280  150
Sur       200  210`,
    explanation: 'pivot_table reorganiza datos para análisis. index define las filas, columns las columnas, y values los datos a agregar.',
    commonErrors: [
      'Confundir index y columns',
      'Olvidar especificar aggfunc',
    ],
  },
  {
    id: 'pandas_8',
    title: 'Conversión de Tipos y Fechas',
    description: 'Convierte una columna de texto a fecha y extrae el mes',
    difficulty: 'dificil',
    xp: 35,
    hint: 'Usa pd.to_datetime() y .dt.month',
    initialCode: `import pandas as pd

df = pd.DataFrame({
    'fecha_texto': ['2024-01-15', '2024-02-20', '2024-03-10', '2024-01-25'],
    'ventas': [1500, 800, 2300, 450]
})

# 1. Convierte a datetime
df['fecha'] = # Tu código

# 2. Extrae el mes
df['mes'] = # Tu código

print(df)`,
    solution: `import pandas as pd

df = pd.DataFrame({
    'fecha_texto': ['2024-01-15', '2024-02-20', '2024-03-10', '2024-01-25'],
    'ventas': [1500, 800, 2300, 450]
})

# 1. Convierte a datetime
df['fecha'] = pd.to_datetime(df['fecha_texto'])

# 2. Extrae el mes
df['mes'] = df['fecha'].dt.month

print(df)`,
    expectedOutput: `  fecha_texto  ventas      fecha  mes
0  2024-01-15    1500 2024-01-15    1
1  2024-02-20     800 2024-02-20    2
2  2024-03-10    2300 2024-03-10    3
3  2024-01-25     450 2024-01-25    1`,
    explanation: 'pd.to_datetime() convierte strings a datetime. Una vez convertido, .dt da acceso a componentes como .month, .year, .day, .dayofweek.',
    commonErrors: [
      'Formato de fecha no reconocido (usa format=)',
      'Olvidar .dt antes de acceder a componentes',
    ],
  },
];

export const quizQuestions = [
  {
    id: 'q1',
    question: '¿Cuál es la principal ventaja de NumPy sobre listas de Python?',
    options: [
      'Sintaxis más simple',
      'Operaciones vectorizadas más rápidas',
      'Mejor documentación',
      'Más tipos de datos',
    ],
    correct: 1,
    explanation: 'NumPy permite operaciones vectorizadas que son mucho más rápidas que iterar con loops en listas Python.',
  },
  {
    id: 'q2',
    question: '¿Qué función usas para ver las primeras 5 filas de un DataFrame?',
    options: [
      'df.first(5)',
      'df.head()',
      'df.top(5)',
      'df.preview()',
    ],
    correct: 1,
    explanation: 'df.head() muestra las primeras 5 filas por defecto. Puedes especificar otro número: df.head(10).',
  },
  {
    id: 'q3',
    question: '¿Cómo filtras filas donde la columna "precio" es mayor a 100?',
    options: [
      'df.filter(precio > 100)',
      'df[df.precio > 100]',
      'df.where(precio > 100)',
      'df.select(precio > 100)',
    ],
    correct: 1,
    explanation: 'La sintaxis correcta es df[df["precio"] > 100] o df[df.precio > 100].',
  },
  {
    id: 'q4',
    question: '¿Qué método elimina filas duplicadas?',
    options: [
      'df.remove_duplicates()',
      'df.unique()',
      'df.drop_duplicates()',
      'df.distinct()',
    ],
    correct: 2,
    explanation: 'df.drop_duplicates() elimina filas duplicadas. Puedes especificar subset= para considerar solo ciertas columnas.',
  },
  {
    id: 'q5',
    question: '¿Cuál es el resultado de np.array([1,2,3]) * 2?',
    options: [
      '[1, 2, 3, 1, 2, 3]',
      'array([2, 4, 6])',
      'Error',
      'array([1, 2, 3, 2])',
    ],
    correct: 1,
    explanation: 'NumPy aplica la multiplicación a cada elemento (broadcasting), resultando en [2, 4, 6].',
  },
];

export const sampleDataset = {
  name: 'ventas_ecommerce.csv',
  description: 'Dataset de ventas de un e-commerce con problemas típicos de limpieza',
  columns: ['order_id', 'fecha', 'producto', 'categoria', 'precio', 'cantidad', 'cliente_email', 'ciudad', 'metodo_pago'],
  issues: [
    'Valores nulos en precio y ciudad',
    'Fechas en diferentes formatos',
    'Emails con espacios y mayúsculas inconsistentes',
    'Duplicados en order_id',
    'Tipos incorrectos (precio como string)',
  ],
  data: [
    { order_id: 1001, fecha: '2024-01-15', producto: 'Laptop HP', categoria: 'Tecnología', precio: '999.99', cantidad: 1, cliente_email: 'juan.perez@email.com', ciudad: 'Madrid', metodo_pago: 'Tarjeta' },
    { order_id: 1002, fecha: '15/01/2024', producto: 'Mouse Logitech', categoria: 'Tecnología', precio: '29.99', cantidad: 2, cliente_email: ' MARIA.LOPEZ@EMAIL.COM ', ciudad: 'Barcelona', metodo_pago: 'PayPal' },
    { order_id: 1003, fecha: '2024-01-16', producto: 'Silla Oficina', categoria: 'Hogar', precio: null, cantidad: 1, cliente_email: 'carlos.garcia@email.com', ciudad: null, metodo_pago: 'Tarjeta' },
    { order_id: 1002, fecha: '15/01/2024', producto: 'Mouse Logitech', categoria: 'Tecnología', precio: '29.99', cantidad: 2, cliente_email: ' MARIA.LOPEZ@EMAIL.COM ', ciudad: 'Barcelona', metodo_pago: 'PayPal' },
    { order_id: 1004, fecha: '2024-01-17', producto: 'Monitor Dell', categoria: 'Tecnología', precio: '349.00', cantidad: 1, cliente_email: 'ana.martinez@email.com', ciudad: 'Valencia', metodo_pago: 'Transferencia' },
    { order_id: 1005, fecha: '17-01-2024', producto: 'Teclado Mecánico', categoria: 'Tecnología', precio: '89.99', cantidad: 3, cliente_email: 'pedro.sanchez@email.com ', ciudad: 'Sevilla', metodo_pago: 'Tarjeta' },
    { order_id: 1006, fecha: '2024-01-18', producto: 'Lámpara LED', categoria: 'Hogar', precio: '45.50', cantidad: 2, cliente_email: 'laura.fernandez@email.com', ciudad: null, metodo_pago: 'PayPal' },
    { order_id: 1007, fecha: '2024/01/19', producto: 'Auriculares Sony', categoria: 'Tecnología', precio: '199.00', cantidad: 1, cliente_email: 'DAVID.RUIZ@EMAIL.COM', ciudad: 'Bilbao', metodo_pago: 'Tarjeta' },
    { order_id: 1008, fecha: '2024-01-20', producto: 'Escritorio', categoria: 'Hogar', precio: '250.00', cantidad: 1, cliente_email: 'sofia.moreno@email.com', ciudad: 'Málaga', metodo_pago: 'Transferencia' },
    { order_id: 1009, fecha: '20/01/2024', producto: 'Webcam HD', categoria: 'Tecnología', precio: null, cantidad: 1, cliente_email: 'pablo.jimenez@email.com', ciudad: 'Zaragoza', metodo_pago: 'PayPal' },
  ],
};

export const modules: Module[] = [
  {
    id: 'diagnostico',
    title: 'Diagnóstico',
    description: 'Evalúa tu nivel actual',
    icon: '🎯',
    duration: '5-8 min',
    exercises: [],
    theory: [],
  },
  {
    id: 'numpy',
    title: 'NumPy Esencial',
    description: 'Arrays y operaciones vectorizadas',
    icon: '⚡',
    duration: '35-40 min',
    exercises: numpyExercises,
    theory: [
      'NumPy es la base del análisis de datos en Python',
      'Los arrays son más eficientes que las listas',
      'Las operaciones vectorizadas evitan loops',
    ],
  },
  {
    id: 'pandas',
    title: 'Pandas Esencial',
    description: 'DataFrames y manipulación',
    icon: '🐼',
    duration: '45-50 min',
    exercises: pandasExercises,
    theory: [
      'Pandas extiende NumPy para datos tabulares',
      'DataFrame es como una hoja de cálculo potenciada',
      'Series es una columna con índice',
    ],
  },
  {
    id: 'limpieza',
    title: 'Limpieza Profesional',
    description: 'Casos reales y checklist',
    icon: '🧹',
    duration: '35-40 min',
    exercises: [],
    theory: [],
  },
  {
    id: 'proyecto',
    title: 'Mini-Proyecto',
    description: 'Integra todo lo aprendido',
    icon: '🏗️',
    duration: '30-35 min',
    exercises: [],
    theory: [],
  },
  {
    id: 'cierre',
    title: 'Evaluación Final',
    description: 'Quiz y próximos pasos',
    icon: '🎓',
    duration: '10-12 min',
    exercises: [],
    theory: [],
  },
];
