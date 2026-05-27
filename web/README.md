# 🌐 Web Development & UX Utilities

Esta sección del repositorio está dedicada a optimizar el flujo de trabajo en el desarrollo frontend, centrándose en la reusabilidad de componentes y la **accesibilidad universal**.

---

## 📂 Organización de la Carpeta

### 1. 🏗️ Estructura y Arquitectura (`/js`)
- **`ComponentLoader.js`**: Utilidad basada en la **Fetch API** para cargar fragmentos de HTML dinámicamente. Permite una arquitectura modular en sitios estáticos.
- | 02 | `ComponentLoader.js` | Enrutador y cargador asíncrono de módulos JS basado en selectores del DOM activos. | `/js/ComponentLoader.js` |
- | 03 | `FocusTrap.js` | Capturador de foco de teclado para asegurar la navegación en elementos modales bajo normas WCAG. | `/accessibility/FocusTrap.js` |

### 2. ♿ Accesibilidad y UX (`/accessibility`)
Herramientas diseñadas para mejorar la experiencia de usuario, reducir la carga cognitiva y eliminar barreras visuales.

- **`/lupa`**: **Lupa Real Óptica**. Implementa clonación del DOM para un zoom del 200% fluido que sigue el cursor.
- **`/contrast`**: **Modo Noche/Día** con persistencia en `localStorage`. Optimiza el contraste según las necesidades lumínicas del usuario.
- **`/menu`**: **Menú Simplificado**. Botones de gran formato con feedback visual reforzado para accesibilidad motriz y visual.
- **`/reading-mode`**: **Modo Lectura Pro**. Modifica la arquitectura de la página para eliminar distracciones, aplica un fondo sepia y utiliza la tipografía **OpenDyslexic** para mejorar la comprensión lectora.

### 3. Herramientas de Accesibilidad e Infraestructura

| # | Componente / Script | Descripción | Ubicación |
|---|---------------------|-------------|-----------|
| 01 | `ContrastController.js` | Controlador modular nativo para conmutar y persistir modos de alto contraste bajo directrices WCAG. | `/accessibility/ContrastController.js` |

---

## 🚀 Tecnologías Aplicadas
- **JavaScript (ES6+)**: Manipulación avanzada del DOM, Promises, persistencia de datos y gestión de eventos.
- **CSS3**: Variables globales (`:root`), layouts adaptables (Flexbox/Grid), y fuentes especializadas.
- **UX Design**: Enfoque en accesibilidad motriz, visual y cognitiva (principios WCAG).

---

## 🛠️ Cómo implementar
Para usar estos snippets, asegúrate de respetar la jerarquía de carpetas definida en los scripts o ajustar las rutas de los archivos `.html` y `.css` correspondientes en cada componente.
