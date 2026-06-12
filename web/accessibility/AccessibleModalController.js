/**
 * @file AccessibleModalController.js
 * @description Módulo de arquitectura para la gestión y restauración del foco en ventanas modales.
 * Asegura la retención de contexto del teclado siguiendo estrictamente las directrices WCAG 2.1 (Criterio 2.4.3).
 * @version 1.0.0
 * @author Borja <CEO & Developer>
 */

export class AccessibleModalController {
    /**
     * Inicializa el controlador de diálogos accesibles.
     * @param {string} [modalAttribute='data-accessible-modal'] - Atributo que identifica las ventanas modales.
     */
    constructor(modalAttribute = 'data-accessible-modal') {
        this.modalAttribute = modalAttribute;
        
        /** @private @type {HTMLElement|null} */
        this.previouslyFocusedElement = null;
    }

    /**
     * Registra el elemento activo actual y abre la ventana modal de manera accesible.
     * @param {HTMLElement} modalElement - El contenedor de la ventana modal que se va a desplegar.
     */
    open(modalElement) {
        if (!modalElement) {
            console.warn('[ModalController] Elemento modal no válido.');
            return;
        }

        // Memorizar de forma atómica el elemento que tenía el foco (ej: el botón de apertura)
        this.previouslyFocusedElement = document.activeElement;

        // Configurar los atributos de accesibilidad estructurales
        modalElement.setAttribute('aria-hidden', 'false');
        modalElement.style.display = 'block';

        // Mover el foco al contenedor de la modal o a su primer elemento interno interactivo
        const firstInteractive = modalElement.querySelector('button, input, [tabindex="0"]');
        if (firstInteractive) {
            firstInteractive.focus();
        } else {
            modalElement.setAttribute('tabindex', '-1');
            modalElement.focus();
        }
        
        console.log('[ModalController] Ventana modal abierta. Memoria focal registrada de forma segura.');
    }

    /**
     * Oculta la modal y restaura el foco del teclado exactamente al elemento de origen.
     * @param {HTMLElement} modalElement - El contenedor de la ventana modal que se va a cerrar.
     */
    close(modalElement) {
        if (!modalElement) return;

        modalElement.setAttribute('aria-hidden', 'true');
        modalElement.style.display = 'none';

        // Restaurar el foco con precisión quirúrgica para no perder la navegación por teclado
        if (this.previouslyFocusedElement && typeof this.previouslyFocusedElement.focus === 'function') {
            this.previouslyFocusedElement.focus();
            console.log('[ModalController] Foco devuelto con éxito al elemento original.');
        }

        this.previouslyFocusedElement = null;
    }
}
