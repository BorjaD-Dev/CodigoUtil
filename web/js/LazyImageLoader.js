/**
 * @file LazyImageLoader.js
 * @description Módulo de arquitectura para la carga diferida (Lazy Loading) optimizada de imágenes.
 * Utiliza la API nativa IntersectionObserver para maximizar el rendimiento de renderizado en el navegador.
 * @version 1.0.0
 * @author Borja <CEO & Developer>
 */

export class LazyImageLoader {
    /**
     * Inicializa el cargador de imágenes diferidas.
     * @param {string} [selector='img[data-src]'] - Selector de elementos objetivos a observar.
     * @param {Object} [intersectionOptions={}] - Opciones de configuración para el IntersectionObserver.
     */
    constructor(selector = 'img[data-src]', intersectionOptions = {}) {
        this.selector = selector;
        
        // Configuración por defecto optimizada para cargar la imagen justo antes de que entre al viewport
        this.observerOptions = {
            root: intersectionOptions.root || null,
            rootMargin: intersectionOptions.rootMargin || '50px 0px',
            threshold: intersectionOptions.threshold || 0.01
        };

        /** @private @type {IntersectionObserver|null} */
        this.observer = null;

        this._init();
    }

    /**
     * Configura e inicializa el observador nativo sobre los elementos que coinciden con el selector.
     * @private
     */
    _init() {
        if (!('IntersectionObserver' in window)) {
            this._fallbackLoadAll();
            return;
        }

        this.observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this._loadImage(entry.target);
                    observer.unobserve(entry.target); // Detener observación una vez cargada
                }
            });
        }, this.observerOptions);

        this.scanAndObserve();
    }

    /**
     * Escanea el DOM actual en busca de nuevos elementos y los añade a la cola de observación.
     */
    scanAndObserve() {
        const images = document.querySelectorAll(this.selector);
        images.forEach(img => {
            if (this.observer) {
                this.observer.observe(img);
            }
        });
    }

    /**
     * Transfiere de forma atómica los atributos temporales al origen nativo del elemento DOM.
     * @param {HTMLImageElement|HTMLElement} element - Elemento a cargar.
     * @private
     */
    _loadImage(element) {
        const src = element.getAttribute('data-src');
        const srcset = element.getAttribute('data-srcset');

        if (src) {
            element.src = src;
            element.removeAttribute('data-src');
        }

        if (srcset) {
            element.srcset = srcset;
            element.removeAttribute('data-srcset');
        }

        // Si es una imagen oculta por CSS o cargando de fondo, añadir clase de transición suave
        element.classList.add('lazy-loaded');
    }

    /**
     * Mecanismo de respaldo (Fallback) automático en caso de navegadores heredados sin soporte API.
     * @private
     */
    _fallbackLoadAll() {
        console.warn('[LazyImageLoader] IntersectionObserver no soportado. Cargando recursos de forma síncrona.');
        const images = document.querySelectorAll(this.selector);
        images.forEach(img => this._loadImage(img));
    }

    /**
     * Desvincula por completo el observador del árbol del DOM.
     */
    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }
}
