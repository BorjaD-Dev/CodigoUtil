# 🌐 Web Development & UX Utilities

Esta sección del repositorio está dedicada a optimizar el flujo de trabajo en el desarrollo frontend, centrándose en la reusabilidad de componentes y la **accesibilidad universal**.

---

## 📂 Organización de la Carpeta

### 1. 🏗️ Estructura y Arquitectura (`/js`)
- **`ComponentLoader.js`**: Utilidad que utiliza la **Fetch API** para cargar fragmentos de HTML (como headers y footers) de forma dinámica. Permite modularidad sin duplicar código.

### 2. ♿ Accesibilidad y UX (`/accessibility`)
Herramientas diseñadas para mejorar la experiencia de usuario y reducir la carga cognitiva o visual.

- **`/lupa`**: Implementación de una **Lupa Real Óptica** mediante clonación del DOM. Zoom del 200% dinámico siguiendo el cursor.
- **`/contrast`**: Sistema de **Modo Noche/Día** con persistencia en `localStorage`. Optimiza la legibilidad según el entorno.
- **`/menu`**: Sistema de **Menú Simplificado** con botones de gran formato. Diseñado para mejorar la accesibilidad motriz y visual mediante áreas de clic extensas y feedback visual reforzado.
- **Próximamente**: Tipografía para Dislexia (Modo Lectura).

---

## 🚀 Tecnologías Aplicadas
- **JavaScript (ES6+)**: Manipulación avanzada del DOM, Promises y persistencia de preferencias.
- **CSS3**: Layouts adaptables (Flexbox), variables globales, y pseudo-clases de estado (`:focus`, `:hover`).
- **UX Design**: Enfoque en accesibilidad motriz, visual y cognitiva.

---

## 🛠️ Cómo implementar
Para usar estos snippets, asegúrate de respetar la jerarquía de carpetas definida en los scripts o ajustar las rutas de los archivos `.html` y `.css` correspondientes.
