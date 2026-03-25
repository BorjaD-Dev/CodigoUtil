# 🌐 Web Development & UX Utilities

Esta sección del repositorio está dedicada a optimizar el flujo de trabajo en el desarrollo frontend, centrándose en la reusabilidad de componentes y la **accesibilidad universal**.

---

## 📂 Organización de la Carpeta

### 1. 🏗️ Estructura y Arquitectura (`/js`)
- **`ComponentLoader.js`**: Utilidad que utiliza la **Fetch API** para cargar fragmentos de HTML (como headers y footers) de forma dinámica. Permite modularidad sin duplicar código.

### 2. ♿ Accesibilidad y UX (`/accessibility`)
Herramientas diseñadas para mejorar la experiencia de usuario y reducir la fatiga visual.

- **`/lupa`**: Implementación de una **Lupa Real Óptica** mediante clonación del DOM. Zoom del 200% dinámico.
- **`/contrast`**: Sistema de **Modo Noche/Día** con persistencia. Utiliza variables CSS para forzar un alto contraste y mejorar la legibilidad en diferentes entornos lumínicos.
- **Próximamente**: Tipografía para Dislexia y Menús de alta visibilidad (Botones Grandes).

---

## 🚀 Tecnologías Aplicadas
- **JavaScript (ES6+)**: Manipulación del DOM, Promises y **Web Storage API (localStorage)** para persistencia de preferencias.
- **CSS3**: Variables globales (`:root`), selectores de clase dinámica y animaciones de transición suave.
- **UX Design**: Enfoque en la autonomía del usuario y reducción de la carga cognitiva.

---

## 🛠️ Cómo implementar
Para usar estos snippets, asegúrate de respetar la jerarquía de carpetas definida en los scripts o ajustar las rutas de los archivos `.html` y `.css` correspondientes.
