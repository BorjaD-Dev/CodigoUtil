# 🌐 Web Development & UX Utilities

Esta sección del repositorio está dedicada a optimizar el flujo de trabajo en el desarrollo frontend, centrándose en la reusabilidad de componentes y la **accesibilidad universal**.

---

## 📂 Organización de la Carpeta

### 1. 🏗️ Estructura y Arquitectura (`/js`)
- **`ComponentLoader.js`**: Utilidad basada en la **Fetch API** para cargar fragmentos de HTML dinámicamente. Permite una arquitectura modular en sitios estáticos.

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
| 02 | `ComponentLoader.js` | Enrutador y cargador asíncrono de módulos JS basado en selectores del DOM activos. | `/js/ComponentLoader.js` |
| 03 | `FocusTrap.js` | Capturador de foco de teclado para asegurar la navegación en elementos modales bajo normas WCAG. | `/accessibility/FocusTrap.js` |
| 04 | `PerformanceUtils.js` | Funciones de orden superior (Debounce y Throttle) para optimizar el rendimiento de eventos globales. | `/js/PerformanceUtils.js` |
| 05 | `SkipLinksManager.js` | Inyector automatizado de enlaces de salto para omitir menús y mejorar navegación por teclado. | `/accessibility/SkipLinksManager.js` |
| 06 | `GlobalStateManager.js` | Bus de datos reactivo y persistente basado en PubSub para comunicar componentes aislados. | `/js/GlobalStateManager.js` |
| 07 | `HttpClient.js` | Envoltorio robusto sobre Fetch API con manejo de cancelaciones por timeout y reintentos asíncronos. | `/js/HttpClient.js` |
| 08 | `FontSizeResizer.js` | Controlador de escala tipográfica elástica mediante variables CSS para cumplimiento WCAG. | `/accessibility/FontSizeResizer.js` |
| 09 | `MotionReducer.js` | Detector y adaptador dinámico para la preferencia de reducción de movimiento del sistema operativo (WCAG). | `/accessibility/MotionReducer.js` |
| 10 | `CacheManager.js` | Envoltorio sobre Web Storage para la persistencia temporal de datos con políticas de expiración (TTL). | `/js/CacheManager.js` |
| 11 | `ScreenReaderSpeaker.js` | Motor de síntesis de voz (Text-to-Speech) nativo para asistencia auditiva interactiva. | `/accessibility/ScreenReaderSpeaker.js` |
| 12 | `FormValidator.js` | Validador reactivo de inputs basado en reglas con soporte nativo de atributos semánticos ARIA. | `/js/FormValidator.js` |
| 13 | `LiveRegionAnnouncer.js` | Inyector y puente de notificaciones dynamically accesibles (`aria-live`) para lectores de pantalla. | `/accessibility/LiveRegionAnnouncer.js` |
| 14 | `NetworkStatusMonitor.js` | Monitor reactivo de conectividad de red con sistema de subscripción para control de estados offline. | `/js/NetworkStatusMonitor.js` |
| 15 | `KeyboardNavigationAccordion.js` | Controlador para la navegación cíclica por teclado (flechas de dirección) en acordeones bajo normas WCAG. | `/accessibility/KeyboardNavigationAccordion.js` |
| 16 | `LazyImageLoader.js` | Cargador asíncrono de imágenes optimizado con IntersectionObserver para reducir transferencia de red. | `/js/LazyImageLoader.js` |
| 17 | `AriaHiddenManager.js` | Gestor estructural para alternar y restaurar estados `aria-hidden` en elementos del DOM (WCAG). | `/accessibility/AriaHiddenManager.js` |
| 18 | `HashRouter.js` | Enrutador del lado del cliente basado en eventos `hashchange` para layouts dinámicos (SPA). | `/js/HashRouter.js` |
| 19 | `AccessibleModalController.js` | Controlador de diálogos para memorizar y restaurar el foco del teclado de origen (WCAG). | `/accessibility/AccessibleModalController.js` |

---

## 🚀 Tecnologías Aplicadas
- **JavaScript (ES6+)**: Manipulación avanzada del DOM, Promises, persistencia de datos y gestión de eventos.
- **CSS3**: Variables globales (`:root`), layouts adaptables (Flexbox/Grid), y fuentes especializadas.
- **UX Design**: Enfoque en accesibilidad motriz, visual y cognitiva (principios WCAG).

---

## 🛠️ Cómo implementar
Para usar estos snippets, asegúrate de respetar la jerarquía de carpetas definida en los scripts o ajustar las rutas de los archivos `.html` y `.css` correspondientes en cada componente.
