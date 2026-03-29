# ☕ Java Utilities & OOP Patterns

Esta sección contiene fragmentos de código, clases de utilidad y patrones de diseño desarrollados durante mi formación en **DAM**. El objetivo es centralizar soluciones a problemas comunes de lógica de negocio y arquitectura de software.

---

## 🛠️ Utilidades Disponibles

### 1. Validación de Entradas (`Validaciones.java`)
Métodos estáticos para asegurar que los datos introducidos por el usuario a través de la consola sean correctos, evitando excepciones comunes como `NumberFormatException`.
- **Uso**: Menús de selección y captura de rangos numéricos.
- **Técnicas**: Manejo de excepciones (Try-Catch) y bucles de control.

### 2. Estructuras Base OOP (`/oop`)
Patrones de diseño y clases base para implementar arquitecturas sólidas y escalables.
- **`BaseEntity.java`**: Clase abstracta base que implementa los principios de **Herencia** y **Encapsulación**. Define atributos comunes (Nombre, ID) y obliga a las subclases a implementar métodos de visualización mediante polimorfismo.

---

## 🚀 Próximas Implementaciones
- [ ] Implementación de Interfaces para Servicios (DAO Pattern).
- [ ] Conexiones base a Base de Datos (JDBC).
- [ ] Algoritmos de ordenación y búsqueda personalizados.
