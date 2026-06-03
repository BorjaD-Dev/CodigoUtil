/**
 * @file MotionReducer.js
 * @description Módulo de accesibilidad visual enfocado en el manejo y respeto de la reducción de movimiento.
 * Sigue los criterios WCAG 2.1 (Pauta 2.3 - Convulsiones y reacciones físicas) sincronizando el DOM con las preferencias del sistema.
 * @version 1.0.0
 * @author Borja <CEO & Developer>
 */

export class MotionReducer {
    /**
     * Inicializa el monitor de reducción de movimiento y suscribe escuchadores de sistema.
     * @param {string} [reducedClassName='reduce-motion-active'] - Clase inyectada en el documento raíz.
     */
    constructor(reducedClassName = 'reduce-motion-active') {
        this.className = reducedClassName;
        this.rootElement = document.documentElement;
        this.mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        this._handleMatchChange = this._handleMatchChange.bind(this);
        this._init();
    }

    /**
     * Evalúa el estado inicial e instala el detector de cambios en tiempo real del OS.
     * @private
     */
    _init() {
        this._applyMotionRestriction(this.mediaQuery.matches);
        
        // Escuchar cambios vivos del sistema operativo sin recargar la página
        try {
            this.mediaQuery.addEventListener('change', this._handleMatchChange);
        } catch (e) {
            // Fallback para navegadores antiguos en entornos legacy
            this.mediaQuery.addListener(this._handleMatchChange);
        }
    }

    /**
     * Retorna si el usuario tiene restringido el movimiento de forma nativa.
     * @returns {boolean} True si prefiere movimiento reducido.
     */
    isMotionReduced() {
        return this.mediaQuery.matches;
    }

    /**
     * Callback intermedio para canalizar eventos del sistema.
     * @param {MediaQueryListEvent} event 
     * @private
     */
    _handleMatchChange(event) {
        this._applyMotionRestriction(event.matches);
    }

    /**
     * Aplica la clase y atributos de control estructurales en la raíz HTML.
     * @param {boolean} shouldReduce - Determina si se mitigan las animaciones.
     * @private
     */
    _applyMotionRestriction(shouldReduce) {
        if (shouldReduce) {
            this.rootElement.classList.add(this.className);
            this.rootElement.setAttribute('data-reduce-motion', 'true');
            this._pauseGlobalElements();
            console.log('[MotionReducer] Reducción de movimiento activada por configuración del sistema.');
        } else {
            this.rootElement.classList.remove(this.className);
            this.rootElement.removeAttribute('data-reduce-motion');
        }
    }

    /**
     * Pausa de manera complementaria vídeos nativos con reproducción automática.
     * @private
     */
    _pauseGlobalElements() {
        const autoPlayVideos = document.querySelectorAll('video[autoplay]');
        autoPlayVideos.forEach(video => {
            if (!video.paused) {
                video.pause();
            }
        });
    }
}
