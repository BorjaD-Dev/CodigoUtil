/**
 * @file DynamicComponentHydrator.js
 * @description Módulo de arquitectura avanzada para la hidratación perezosa y dinámica de componentes interactivos.
 * Optimiza los tiempos de carga inicial (TBT y TTI) retrasando la descarga de scripts hasta la interacción del usuario.
 * @version 1.0.0
 * @author Borja <CEO & Developer>
 */

export class DynamicComponentHydrator {
    /**
     * Inicializa el gestor de hidratación dinámica.
     * @param {string} [componentSelector='[data-hydrate-on]'] - Selector para los componentes diferidos.
     */
    constructor(componentSelector = '[data-hydrate-on]') {
        this.selector = componentSelector;
        /** @private @type {Map<HTMLElement, string[]>} */
        this.hydratedElements = new Map();
    }

    /**
     * Escanea el árbol del DOM actual e instala los escuchadores de interacción en los componentes configurados.
     */
    scanAndListen() {
        const elements = document.querySelectorAll(this.selector);

        elements.forEach(element => {
            if (this.hydratedElements.has(element)) return;

            // Extraer eventos disparadores (ej: "mouseenter,focus" o "click")
            const triggerAttr = element.getAttribute('data-hydrate-on') || 'click';
            const triggers = triggerAttr.split(',').map(t => t.trim());
            
            const bootstrapHydration = () => this._hydrate(element);
            
            // Registrar limpiadores para remover eventos tras la hidratación
            const eventCleanups = triggers.map(trigger => {
                element.addEventListener(trigger, bootstrapHydration, { once: true });
                return () => element.removeEventListener(trigger, bootstrapHydration);
            });

            this.hydratedElements.set(element, eventCleanups);
        });
    }

    /**
     * Ejecuta la carga asíncrona del script del componente y remueve los eventos residuales.
     * @param {HTMLElement} element - El nodo del DOM que solicita interactividad.
     * @private
     */
    async _hydrate(element) {
        const cleanups = this.hydratedElements.get(element);
        if (cleanups) {
            // Remover inmediatamente todos los demás escuchadores para evitar colisiones de memoria
            cleanups.forEach(cleanup => cleanup());
        }

        const scriptUrl = element.getAttribute('data-component-script');
        if (!scriptUrl) {
            console.warn('[Hydrator] Elemento marcado para hidratar carece de ruta de script válida.');
            return;
        }

        try {
            console.log(`[Hydrator] Iniciando hidratación bajo demanda para el componente: ${scriptUrl}`);
            
            // Importación dinámica nativa de ES Modules
            const module = await import(scriptUrl);
            
            if (module && typeof module.init === 'function') {
                module.init(element);
            }

            element.setAttribute('data-hydrated', 'true');
            element.removeAttribute('data-hydrate-on');
            
            // Añadir clase estética opcional para transiciones suaves
            element.classList.add('hydrated-ready');
        } catch (error) {
            console.error(`[Hydrator] Error crítico al hidratar el módulo desde la ruta "${scriptUrl}":`, error);
        }
    }

    /**
     * Limpia por completo todas las referencias y escuchadores del gestor.
     */
    destroy() {
        this.hydratedElements.forEach(cleanups => cleanups.forEach(cleanup => cleanup()));
        this.hydratedElements.clear();
    }
}
