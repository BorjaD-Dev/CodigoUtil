/**
 * @file LinearFocusManager.js
 * @description Módulo utilitario de accesibilidad para la secuenciación y control del orden del foco del teclado.
 * Asegura una navegación predecible y lógica en layouts dinámicos (Cumplimiento WCAG 2.1 - Criterio 2.4.3).
 * @version 1.0.0
 * @author Borja <CEO & Developer>
 */

export class LinearFocusManager {
    /**
     * Inicializa el gestor secuencial de foco.
     * @param {string} [focusGroupName='data-focus-group'] - Atributo para agrupar elementos ordenados.
     */
    constructor(focusGroupName = 'data-focus-group') {
        this.groupAttribute = focusGroupName;
        this._handleKeyDown = this._handleKeyDown.bind(this);
    }

    /**
     * Activa el control de foco secuencial sobre un contenedor específico.
     * @param {HTMLElement} container - Elemento raíz que aloja el grupo interactivo.
     */
    bindContainer(container) {
        if (!container) return;
        container.addEventListener('keydown', this._handleKeyDown);
    }

    /**
     * Desvincula los escuchadores para liberar recursos de memoria en el ciclo del frontend.
     * @param {HTMLElement} container - Elemento raíz previamente vinculado.
     */
    unbindContainer(container) {
        if (!container) return;
        container.removeEventListener('keydown', this._handleKeyDown);
    }

    /**
     * Evalúa la pulsación de teclas e intercepta el flujo para redireccionar el foco.
     * @param {KeyboardEvent} event 
     * @private
     */
    _handleKeyDown(event) {
        if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;

        const currentElement = event.target;
        const groupName = currentElement.getAttribute(this.groupAttribute);
        if (!groupName) return;

        // Recuperar y ordenar secuencialmente todos los elementos pertenecientes al mismo grupo
        const elements = Array.from(document.querySelectorAll(`[${this.groupAttribute}="${groupName}"]`))
            .sort((a, b) => {
                const orderA = parseInt(a.getAttribute('data-focus-order') || '0', 10);
                const orderB = parseInt(b.getAttribute('data-focus-order') || '0', 10);
                return orderA - orderB;
            });

        const currentIndex = elements.indexOf(currentElement);
        if (currentIndex === -1) return;

        let nextIndex;

        if (event.key === 'ArrowRight') {
            nextIndex = (currentIndex + 1) % elements.length;
        } else if (event.key === 'ArrowLeft') {
            nextIndex = (currentIndex - 1 + elements.length) % elements.length;
        }

        event.preventDefault();
        elements[nextIndex].focus();
        console.log(`[FocusManager] Foco desplazado al índice de orden: ${nextIndex} dentro del grupo: ${groupName}`);
    }
}
