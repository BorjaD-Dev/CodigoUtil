/**
 * @file FocusTrap.js
 * @description Módulo de accesibilidad universal para contener el foco del teclado (Keyboard Trapping).
 * Indispensable para componentes accesibles como Modales, Drawers y Menús flotantes (WCAG 2.1).
 * @version 1.0.0
 * @author Borja <CEO & Developer>
 */

export class FocusTrap {
    /**
     * Inicializa la instancia del capturador de foco.
     * @param {HTMLElement} container - El elemento contenedor del cual el foco no debe salir.
     */
    constructor(container) {
        if (!container) {
            throw new Error('[FocusTrap] Se requiere un contenedor válido en el DOM.');
        }
        
        this.container = container;
        
        // Selectores de elementos nativamente interactivos
        this.focusableSelectors = [
            'a[href]', 'area[href]', 'input:not([disabled])',
            'select:not([disabled])', 'textarea:not([disabled])',
            'button:not([disabled])', 'iframe', 'object', 'embed',
            '[contenteditable]', '[tabindex]:not([tabindex="-1"])'
        ].join(',');

        // Guardar referencia con bind para poder remover el listener correctamente
        this._handleKeyDown = this._handleKeyDown.bind(this);
    }

    /**
     * Activa la trampa de foco y enfoca automáticamente el primer elemento interactivo.
     */
    activate() {
        const focusableElements = this._getFocusableElements();
        if (focusableElements.length > 0) {
            focusableElements[0].focus();
        }
        document.addEventListener('keydown', this._handleKeyDown);
    }

    /**
     * Desactiva la trampa de foco removiendo los escuchadores de eventos globales.
     */
    deactivate() {
        document.removeEventListener('keydown', this._handleKeyDown);
    }

    /**
     * Recupera la lista actualizada de elementos enfocables dentro del contenedor.
     * @returns {NodeListOf<HTMLElement>}
     * @private
     */
    _getFocusableElements() {
        return this.container.querySelectorAll(this.focusableSelectors);
    }

    /**
     * Maneja el evento de teclado para redirigir el foco en bucle.
     * @param {KeyboardEvent} event 
     * @private
     */
    _handleKeyDown(event) {
        if (event.key !== 'Tab') return;

        const focusableElements = this._getFocusableElements();
        if (focusableElements.length === 0) {
            event.preventDefault();
            return;
        }

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        const activeElement = document.activeElement;

        if (event.shiftKey) {
            // Si pulsa Shift + Tab y está en el primer elemento, salta al último
            if (activeElement === firstElement) {
                lastElement.focus();
                event.preventDefault();
            }
        } else {
            // Si pulsa Tab y está en el último elemento, regresa al primero
            if (activeElement === lastElement) {
                firstElement.focus();
                event.preventDefault();
            }
        }
    }
}
