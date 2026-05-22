/**
 * @file ContrastController.js
 * @description Módulo de arquitectura limpia para la gestión de accesibilidad visual (Modo Alto Contraste).
 * Sigue los principios WCAG 2.1 garantizando la persistencia de estado local.
 * @version 1.0.0
 * @author Borja <CEO & Developer>
 */

export class ContrastController {
    /**
     * Inicializa el controlador de contraste y aplica el estado guardado o por defecto.
     * @param {string} [storageKey='accessible-high-contrast'] - Clave para la persistencia en LocalStorage.
     * @param {string} [className='high-contrast-mode'] - Clase CSS que se inyectará en el elemento raíz.
     */
    constructor(storageKey = 'accessible-high-contrast', className = 'high-contrast-mode') {
        this.storageKey = storageKey;
        this.className = className;
        this.rootElement = document.documentElement;
        
        this._init();
    }

    /**
     * Inicializa el estado del componente evaluando almacenamiento y preferencias del sistema.
     * @private
     */
    _init() {
        const savedState = localStorage.getItem(this.storageKey);
        
        if (savedState !== null) {
            this._applyContrast(savedState === 'true');
        } else {
            // Fallback: Detectar si el sistema operativo tiene activa la preferencia de alto contraste
            const prefersHighContrast = window.matchMedia('(forced-colors: active)').matches || 
                                        window.matchMedia('(prefers-contrast: more)').matches;
            this._applyContrast(prefersHighContrast);
        }
    }

    /**
     * Alterna de forma atómica el estado de alto contraste.
     * @returns {boolean} Nuevo estado del alto contraste (true si está activo).
     */
    toggle() {
        const isCurrentlyActive = this.rootElement.classList.contains(this.className);
        const newState = !isCurrentlyActive;
        
        this._applyContrast(newState);
        this._saveState(newState);
        
        return newState;
    }

    /**
     * Modifica el DOM de manera limpia e inyecta los atributos de accesibilidad necesarios.
     * @param {boolean} isActive - Estado objetivo del modo de contraste.
     * @private
     */
    _applyContrast(isActive) {
        if (isActive) {
            this.rootElement.classList.add(this.className);
            this.rootElement.setAttribute('data-contrast-mode', 'high');
        } else {
            this.rootElement.classList.remove(this.className);
            this.rootElement.removeAttribute('data-contrast-mode');
        }
    }

    /**
     * Sincroniza el estado con el almacenamiento local para persistencia entre sesiones.
     * @param {boolean} state - Estado a persistir.
     * @private
     */
    _saveState(state) {
        try {
            localStorage.setItem(this.storageKey, String(state));
        } catch (error) {
            console.error(' [ContrastController] Error al persistir el estado de accesibilidad:', error);
        }
    }
}
