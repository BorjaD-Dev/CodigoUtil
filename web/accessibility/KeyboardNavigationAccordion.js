/**
 * @file KeyboardNavigationAccordion.js
 * @description Controlador de accesibilidad estructural para componentes colapsables y acordeones.
 * Implementa el manejo nativo de foco por teclado bajo las directrices estrictas del estándar WCAG 2.1.
 * @version 1.0.0
 * @author Borja <CEO & Developer>
 */

export class KeyboardNavigationAccordion {
    /**
     * Inicializa el gestor de teclado asociándolo al contenedor del acordeón.
     * @param {HTMLElement} container - Elemento contenedor padre de los paneles.
     * @param {string} [triggerSelector='[data-accordion-trigger]'] - Selector para los botones interactivos.
     */
    constructor(container, triggerSelector = '[data-accordion-trigger]') {
        if (!container) throw new Error('[AccordionNav] Se requiere un contenedor válido en el DOM.');
        
        this.container = container;
        this.triggerSelector = triggerSelector;
        
        this._handleKeyDown = this._handleKeyDown.bind(this);
        this._init();
    }

    /**
     * Inyecta de forma segura el escuchador de eventos de teclado.
     * @private
     */
    _init() {
        this.container.addEventListener('keydown', this._handleKeyDown);
    }

    /**
     * Devuelve un Array indexado con todos los disparadores interactivos del acordeón.
     * @returns {HTMLElement[]}
     * @private
     */
    _getTriggers() {
        return Array.from(this.container.querySelectorAll(this.triggerSelector));
    }

    /**
     * Captura, evalúa e interrumpe de forma controlada el flujo físico de las teclas direccionales.
     * @param {KeyboardEvent} event 
     * @private
     */
    _handleKeyDown(event) {
        const triggers = this._getTriggers();
        const currentTrigger = event.target;
        
        // Ignorar si el evento no ocurre dentro de uno de nuestros disparadores de control
        if (!triggers.includes(currentTrigger)) return;

        const currentIndex = triggers.indexOf(currentTrigger);
        let targetIndex = null;

        switch (event.key) {
            case 'ArrowDown':
                // Saltar al siguiente elemento o volver al inicio si es el último (Bucle cíclico)
                targetIndex = (currentIndex + 1) % triggers.length;
                break;
            case 'ArrowUp':
                // Saltar al elemento anterior
                targetIndex = (currentIndex - 1 + triggers.length) % triggers.length;
                break;
            case 'Home':
                // Redirigir directamente al primer botón del acordeón
                targetIndex = 0;
                break;
            case 'End':
                // Redirigir directamente al último botón del acordeón
                targetIndex = triggers.length - 1;
                break;
            default:
                return; // Permitir comportamiento nativo en otras teclas (Space, Enter)
        }

        if (targetIndex !== null) {
            event.preventDefault();
            triggers[targetIndex].focus();
        }
    }

    /**
     * Elimina el escuchador del árbol de eventos global para prevenir fugas de memoria.
     */
    destroy() {
        this.container.removeEventListener('keydown', this._handleKeyDown);
    }
}
