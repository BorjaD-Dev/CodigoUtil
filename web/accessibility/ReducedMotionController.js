/**
 * @fileoverview ReducedMotionController - Utilidad nativa para la gestión de accesibilidad motriz y vestibular.
 * Escucha de forma reactiva la preferencia de reducción de movimiento del sistema operativo (WCAG 2.1).
 * @version 1.0.0
 * @package TealWolfStudios.CodigoUtil.Web
 */

/**
 * Clase que encapsula la API matchMedia para la monitorización de animaciones y transiciones seguras.
 * @class ReducedMotionController
 */
export class ReducedMotionController {
  /**
   * @private
   * @type {MediaQueryList|null}
   */
  #mediaQuery = null;

  /**
   * @private
   * @type {Map<string, Function>}
   */
  #listeners = new Map();

  /**
   * Inicializa la escucha de las preferencias multimedia del entorno.
   */
  constructor() {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    this.#mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.#initListener();
  }

  /**
   * Configura el listener reactivo para interceptar cambios del sistema en tiempo real.
   * @private
   */
  #initListener() {
    if (!this.#mediaQuery) return;

    const handler = (event) => this.#notifyAll(event.matches);
    if (this.#mediaQuery.addEventListener) {
      this.#mediaQuery.addEventListener('change', handler);
    } else {
      this.#mediaQuery.addListener(handler);
    }
  }

  /**
   * Comunica la mutación de estado a todos los callbacks registrados.
   * @private
   * @param {boolean} shouldReduce 
   */
  #notifyAll(shouldReduce) {
    this.#listeners.forEach((callback) => {
      try {
        callback(shouldReduce);
      } catch (error) {
        console.error('[ReducedMotionController] Error ejecutando callback:', error);
      }
    });
  }

  /**
   * Indica de manera síncrona si el usuario ha solicitado explícitamente reducir movimiento.
   * @returns {boolean}
   */
  get shouldReduceMotion() {
    return this.#mediaQuery ? this.#mediaQuery.matches : false;
  }

  /**
   * Registra una suscripción reactiva para adaptar componentes de interfaz dinámicamente.
   * @param {string} id - Identificador de suscripción único.
   * @param {Function} callback - Función que recibe el estado: (shouldReduce: boolean) => void.
   */
  subscribe(id, callback) {
    if (typeof callback !== 'function') {
      throw new TypeError('[ReducedMotionController] El callback debe ser una función.');
    }
    this.#listeners.set(id, callback);
    
    // Sincronización inmediata al suscribirse
    callback(this.shouldReduceMotion);
  }

  /**
   * Elimina una suscripción del registro.
   * @param {string} id - Identificador de la suscripción a remover.
   * @returns {boolean} True si existía y fue removida.
   */
  unsubscribe(id) {
    return this.#listeners.delete(id);
  }

  /**
   * Desconecta las referencias de memoria.
   */
  destroy() {
    this.#listeners.clear();
  }
}
