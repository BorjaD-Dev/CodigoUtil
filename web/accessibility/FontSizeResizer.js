/**
 * @file FontSizeResizer.js
 * @description Módulo utilitario para la gestión y escalado dinámico del tamaño del texto.
 * Cumple con las directrices WCAG 2.1 (Criterio 1.4.4) garantizando la persistencia local.
 * @version 1.0.0
 * @author Borja <CEO & Developer>
 */

export class FontSizeResizer {
    /**
     * Inicializa el controlador de escala tipográfica.
     * @param {Object} options - Configuración inicial del escalado.
     * @param {number} [options.minScale=0.8] - Escala mínima permitida.
     * @param {number} [options.maxScale=1.6] - Escala máxima permitida.
     * @param {number} [options.step=0.1] - Incremento o decremento por cada paso.
     * @param {string} [options.cssVariable='--base-font-scale'] - Variable CSS a modificar en la raíz.
     * @param {string} [options.storageKey='accessible-font-scale'] - Clave de persistencia local.
     */
    constructor(options = {}) {
        this.minScale = options.minScale || 0.8;
        this.maxScale = options.maxScale || 1.6;
        this.step = options.step || 0.1;
        this.cssVariable = options.cssVariable || '--base-font-scale';
        this.storageKey = options.storageKey || 'accessible-font-scale';
        
        this.rootElement = document.documentElement;
        this.currentScale = 1.0;

        this._init();
    }

    /**
     * Recupera el estado previo guardado o inicializa el valor raíz por defecto.
     * @private
     */
    _init() {
        const savedScale = localStorage.getItem(this.storageKey);
        if (savedScale !== null) {
            const parsed = parseFloat(savedScale);
            if (!isNaN(parsed) && parsed >= this.minScale && parsed <= this.maxScale) {
                this.currentScale = parsed;
            }
        }
        this._applyScale();
    }

    /**
     * Incrementa de forma segura el tamaño de la fuente según el paso configurado.
     * @returns {number} Nueva escala aplicada.
     */
    increase() {
        if (this.currentScale + this.step <= this.maxScale) {
            this.currentScale = parseFloat((this.currentScale + this.step).toFixed(2));
            this._updateAndSave();
        }
        return this.currentScale;
    }

    /**
     * Decrementa de forma segura el tamaño de la fuente según el paso configurado.
     * @returns {number} Nueva escala aplicada.
     */
    decrease() {
        if (this.currentScale - this.step >= this.minScale) {
            this.currentScale = parseFloat((this.currentScale - this.step).toFixed(2));
            this._updateAndSave();
        }
        return this.currentScale;
    }

    /**
     * Restablece la tipografía al tamaño estándar del sistema (1.0).
     */
    reset() {
        this.currentScale = 1.0;
        this._updateAndSave();
    }

    /**
     * Sincroniza la variable en memoria con el almacenamiento y el DOM.
     * @private
     */
    _updateAndSave() {
        this._applyScale();
        try {
            localStorage.setItem(this.storageKey, String(this.currentScale));
        } catch (error) {
            console.error(' [FontSizeResizer] Error al guardar escala de texto:', error);
        }
    }

    /**
     * Inyecta la escala numérica directamente como propiedad CSS nativa en el elemento :root.
     * @private
     */
    _applyScale() {
        this.rootElement.style.setProperty(this.cssVariable, String(this.currentScale));
        this.rootElement.setAttribute('data-font-scale', String(this.currentScale));
    }
}
