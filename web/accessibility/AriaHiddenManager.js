/**
 * @file AriaHiddenManager.js
 * @description Módulo utilitario de accesibilidad para aislar selectivamente el árbol del DOM ante lectores de pantalla.
 * Indispensable para mantener la jerarquía focal correcta al desplegar componentes superpuestos (WCAG 2.1 - Criterio 1.3.1).
 * @version 1.0.0
 * @author Borja <CEO & Developer>
 */

export class AriaHiddenManager {
    /**
     * Inicializa el gestor y define los elementos hermanos o contenedores globales que se deben ignorar.
     * @param {HTMLElement[]} [excludeElements=[]] - Lista de elementos que NUNCA deben ocultarse (ej: la modal activa).
     */
    constructor(excludeElements = []) {
        this.excludeElements = excludeElements;
        /** @private @type {Map<HTMLElement, string|null>} */
        this.previousStates = new Map();
    }

    /**
     * Aplica el atributo aria-hidden="true" a todos los elementos hijos directos del body,
     * protegiendo de forma segura los nodos excluidos y sus ancestros.
     */
    isolate() {
        this.preserveAndRelease(); // Limpieza preventiva de seguridad
        
        const rootChildren = Array.from(document.body.children);

        rootChildren.forEach(element => {
            // Ignorar scripts, etiquetas de estilo y nodos explícitamente excluidos
            if (
                element.tagName === 'SCRIPT' || 
                element.tagName === 'STYLE' || 
                this.excludeElements.includes(element) ||
                this._isAncestorOfExcluded(element)
            ) {
                return;
            }

            // Registrar el estado previo para poder restaurarlo con precisión quirúrgica
            this.previousStates.set(element, element.getAttribute('aria-hidden'));
            element.setAttribute('aria-hidden', 'true');
        });
    }

    /**
     * Restaura el árbol del DOM a sus valores semánticos iniciales eliminando la trampa de accesibilidad.
     */
    preserveAndRelease() {
        this.previousStates.forEach((previousValue, element) => {
            if (element) {
                if (previousValue === null) {
                    element.removeAttribute('aria-hidden');
                } else {
                    element.setAttribute('aria-hidden', previousValue);
                }
            }
        });

        this.previousStates.clear();
    }

    /**
     * Determina de manera recursiva si un elemento del DOM contiene a alguno de los nodos excluidos.
     * @param {HTMLElement} element - Elemento raíz a evaluar.
     * @returns {boolean} True si contiene un nodo protegido.
     * @private
     */
    _isAncestorOfExcluded(element) {
        return this.excludeElements.some(excluded => element.contains(excluded));
    }
}
