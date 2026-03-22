# 🎮 Unity & C# Utilities

Repositorio de scripts útiles para el desarrollo de videojuegos en Unity, aplicados a mi proyecto de **Action Roguelite**.

---

## 🛠️ Utilidades Disponibles

### 1. Persistencia entre Escenas (`PersistentObject.cs`)
Script sencillo que utiliza `DontDestroyOnLoad` para evitar que un GameObject se destruya al cargar una nueva escena.

- **Uso**: Aplicar a GameObjects que deben mantener su estado (Player, GameManagers, Música).
- [cite_start]**Contexto**: Muy útil para el sistema de inventario o grimorio de mi proyecto actual[cite: 36].
