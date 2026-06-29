# ☕ Java Utilities & OOP Patterns

Esta sección contiene fragmentos de código, clases de utilidad y patrones de diseño desarrollados durante mi formación en **DAM**. El objetivo es centralizar soluciones a problemas comunes de lógica de negocio y arquitectura de software.

---

## 🛠️ Utilidades Disponibles

### 1. Validación de Entradas (`Validaciones.java`)
Métodos estáticos para asegurar que los datos introducidos por el usuario a través de la consola sean correctos, evitando excepciones comunes como `NumberFormatException`.
- **Uso**: Menús de selección y captura de rangos numéricos.
- **Técnicas**: Manejo de excepciones (Try-Catch) y bucles de control.

### 2. Utilidades Matemáticas (`MathUtils.java`)
Lógica auxiliar para cálculos estadísticos y probabilísticos, comunes en simuladores y videojuegos.
- **Uso**: Cálculo de porcentajes de victoria, tasas de éxito y redondeo de datos.
- **Técnicas**: Métodos estáticos y casting de tipos (`double`).

### 3. Gestión de Colecciones (`ListUtils.java`)
Herramientas para simplificar el manejo de listas y estructuras de datos complejas.
- **Uso**: Búsqueda lineal de objetos por atributos únicos (DNI, ID, Nombre) en listas genéricas.
- **Técnicas**: Algoritmos de búsqueda, Generics (`<? extends Persona>`) e iteración eficiente.

### 4. Generación Aleatoria (`RandomUtils.java`)
Herramienta para la creación de valores aleatorios controlados, esencial en lógica de juegos y simulaciones.
- **Uso**: Generar resultados de partidos, eventos inesperados o datos de test.
- **Técnicas**: Clase `java.util.Random` y algoritmos de acotación de rangos.

### 5. Gestión de Consola (`ConsoleUtils.java`)
Pequeñas utilidades para mejorar la interacción con el usuario final a través de la terminal.
- **Uso**: Crear pausas de lectura ("Presione Enter para continuar").
- **Técnicas**: Uso de `java.util.Scanner` para control de flujo.

### 6. Gestión de Archivos (`FileUtils.java`)
Utilidades para el manejo y análisis de archivos en el sistema local.
- **Uso**: Verificar existencia y contar volumen de datos (líneas) en ficheros.
- **Técnicas**: Uso de `java.io.File` y `BufferedReader`.

### 7. Excepciones Personalizadas (`/exceptions`)
Patrones para la gestión de errores específica del dominio de la aplicación.
- **Uso**: Crear avisos claros cuando los datos no cumplen las reglas de negocio.
- **Técnicas**: Herencia de la clase `Exception` y sobreescritura de constructores.

### 8. Diseño de Interfaz de Consola (`MenuUtils.java`)
Herramientas para mejorar la estética de aplicaciones por terminal.
- **Uso**: Generar cabeceras dinámicas y limpieza visual de la interfaz.
- **Técnicas**: Manipulación de Strings y métodos repetitivos.

### 9. Estándares de Documentación (`/docs`)
Guías y plantillas para la generación de documentación técnica automatizada.
- **Uso**: Mantener un código legible para equipos de desarrollo.
- **Técnicas**: Uso de etiquetas Javadoc (`@author`, `@version`, `@param`).

### 10. Estructuras Base OOP (`/oop`)
Patrones de diseño y clases base para implementar arquitecturas sólidas y escalables (utilizadas en proyectos como *Football Manager*).
- **`BaseEntity.java`**: Clase abstracta base que implementa **Herencia** y **Encapsulación**. Define atributos comunes y utiliza polimorfismo para obligar a las subclases a implementar sus propios métodos de visualización.

### 11. Arquitectura de Comandos (`CommandQueueExecutor.java`)
Motor de ejecución secuencial desacoplado para encapsular peticiones y transiciones de estado de la lógica de negocio.
- **Uso**: Implementación de sistemas transaccionales con control de operaciones complejas.
- **Técnicas**: Patrón de diseño *Command*, uso de estructuras eficientes de doble entrada (`ArrayDeque`) y control de flujos con pilas (LIFO).

---

## 🚀 Próximas Implementaciones
- [ ] Implementación de Interfaces para Servicios (DAO Pattern).
- [ ] Conexiones base a Base de Datos (JDBC).
- [ ] Algoritmos de ordenación avanzados (QuickSort/BubbleSort).
