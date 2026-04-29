# 🎮 Unity & C# Utilities

Repositorio de scripts útiles para el desarrollo de videojuegos en Unity, aplicados a mi proyecto de **Action Roguelite**.

---

## 🛠️ Utilidades Disponibles

### 1. Persistencia entre Escenas (`PersistentObject.cs`)
Script sencillo que utiliza `DontDestroyOnLoad` para evitar que un GameObject se destruya al cargar una nueva escena.

- **Uso**: Aplicar a GameObjects que deben mantener su estado (Player, GameManagers, Música).
- [cite_start]**Contexto**: Muy útil para el sistema de inventario o grimorio de mi proyecto actual[cite: 36].

### 2. Sistemas de Recompensa (`LootSpawner.cs`)
Lógica para la creación de "drops" con comportamiento físico realista.
- **Uso**: Se añade a cualquier entidad (Enemigos, Cofres, Barriles) para gestionar el lanzamiento de ítems.
- **Técnicas**: Uso de `ForceMode.Impulse` y `AddTorque` para evitar que los ítems caigan de forma estática, mejorando el "juice" del juego.
- **Modularidad**: Extraído de scripts monolíticos para permitir la configuración individual de fuerzas y radio por tipo de drop.

### 3. Arquitectura y Desacoplamiento (`/interfaces`)
Uso de interfaces para crear sistemas modulares y escalables.
- **`IDamageable.cs`**: Interfaz base para cualquier entidad que pueda recibir daño. Facilita la creación de proyectiles y armas universales.
- **Técnicas**: Polimorfismo y Clean Code en Unity.

### 4. Utilidades de Transformación (`TransformUtils.cs`)
Métodos para simplificar el posicionamiento y rotación de objetos en el espacio 3D.
- **`LookAtLockedY`**: Permite orientar un objeto hacia un objetivo bloqueando la rotación vertical. Crucial para evitar deformaciones visuales en enemigos terrestres cuando el jugador salta.
- **Técnicas**: Manipulación de vectores (Vector3) y el método `Transform.LookAt`.

### 5. Sistemas de Salud (`/systems`)
Componentes para la gestión de estados vitales de las entidades.
- **`BaseHealth.cs`**: Implementación base de salud. Utiliza **UnityEvents** para notificar la muerte a otros componentes (como el sistema de partículas o el `LootSpawner`).
- **Técnicas**: Encapsulación, implementación de interfaces y eventos delegados.

### 6. Inteligencia Artificial (`/ai`)
Controladores y utilidades para el comportamiento de entidades no jugables.
- **`NavSteering.cs`**: Envoltorio para `NavMeshAgent` que asegura la navegación y evita errores de "Invalid NavMesh" en tiempo de ejecución.
- **Técnicas**: Validación de estado de agente (`isOnNavMesh`) y gestión de rutas.

### 7. Optimización de Memoria (`/utils`)
Patrones de diseño para juegos de alto rendimiento (Bullet Hell / Roguelite).
- **`GenericObjectPool.cs`**: Clase abstracta que gestiona la lógica de colas (`Queue`). Reduce la fragmentación de memoria.
- **`EnemyPool.cs`**: Ejemplo de implementación heredada. Permite crear pools específicos en segundos simplemente asignando el prefab.
- **Técnicas**: Herencia, expansión dinámica de piscina y gestión de estados `Active/Inactive`.

### 8. Feedback Visual (`/visuals`)
Componentes diseñados para mejorar el "Game Feel" mediante respuestas visuales inmediatas a las acciones del juego.
- **`BlinkEffect.cs`**: Sistema de parpadeo por materiales. Permite que cualquier entidad (jugador, enemigo u objeto rompible) brille al recibir daño.
- **Técnicas**: Gestión de matrices de materiales (`Material[][]`), Corrutinas y soporte nativo para **Object Pooling** (limpieza en `OnDisable`).

### 9. Patrones de Creación (`/utils`)
Implementación de patrones de diseño clásicos adaptados a Unity para mejorar el rendimiento y la legibilidad.
- **`Singleton.cs`**: Clase base genérica para Managers. Elimina la necesidad de usar `GameObject.Find`[cite: 3] o `GetComponent` en cada frame.
- **Técnicas**: Programación genérica, seguridad de instancia única y persistencia opcional.
