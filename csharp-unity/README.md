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
- **Uso**: Lanzamiento de ítems al destruir enemigos o cofres.
- **Técnicas**: Aplicación de `ForceMode.Impulse` y `AddTorque` mediante `Rigidbody`.

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
