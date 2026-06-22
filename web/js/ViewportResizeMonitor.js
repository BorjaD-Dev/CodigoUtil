/**
 * @fileoverview ViewportResizeMonitor - Utilidad arquitectónica nativa para monitorizar cambios de tamaño en el viewport.
 * Optimiza el rendimiento mediante un control de flujo de eventos evitando el re-renderizado masivo y costoso del DOM.
 * @version 1.0.0
 * @package TealWolfStudios.CodigoUtil.Web
 */

/**
 * Clase que centraliza las suscripciones al evento resize, garantizando una única escucha global y control de rendimiento.
 * @class ViewportResizeMonitor
 */
export class ViewportResizeMonitor {
  /**
   * @private
   * @type {Map<string, Function>}
   */
  #listeners = new Map();

  /**
   * @private
   * @type {number|null}
   */
  #timeoutId = null;

  /**
   * @private
   * @type {number}
   */
  #delay = 150;

  /**
   * Inicializa la escucha global unificada en el objeto window.
   * @param {number} [delay=150] - Tiempo de espera en milisegundos para estabilizar el evento.
   */
  constructor(delay = 150) {
    this.#delay = delay;
    this.#initListener();
  }

  /**
   * Configura el listener global optimizado con patrón debounce.
   * @private
   */
  #initListener() {
    window.addEventListener('resize', () => {
      if (this.#timeoutId) {
        clearTimeout(this.#timeoutId);
      }

      this.#timeoutId = setTimeout(() => {
        const dimensions = {
          width: window.innerWidth,
          height: window.innerHeight
        };
        this.#notifyAll(dimensions);
      }, this.#delay);
    });
  }

  /**
   * Ejecuta de forma segura todos los callbacks registrados pasando las dimensiones actuales.
   * @private
   * @param {{width: number, height: number}} dimensions 
   */
  #notifyAll(dimensions) {
    this.#listeners.forEach((callback) => {
      try {
        callback(dimensions);
      } catch (error) {
        console.error('[ViewportResizeMonitor] Error ejecutando callback registrado:', error);
      }
    });
  }

  /**
   * Registra una nueva acción ante cambios estables en el tamaño del viewport.
   * @param {string} id - Identificador único de la suscripción.
   * @param {Function} callback - Función que recibe las dimensiones: (dims: {width: number, height: number}) => void.
   */
  subscribe(id, callback) {
    if (typeof callback !== 'function') {
      throw new TypeError('[ViewportResizeMonitor] El callback debe ser una función.');
    }
    this.#listeners.set(id, callback);
    
    // Ejecución inicial inmediata para sincronizar el estado actual del componente implicado
    callback({ width: window.innerWidth, height: window.innerHeight });
  }

  /**
   * Elimina una suscripción activa del registro.
   * @param {string} id - Identificador único de la suscripción a remover.
   * @returns {boolean} True si fue eliminada con éxito.
   */
  unsubscribe(id) {
    return this.#listeners.delete(id);
  }

  /**
   * Limpia el temporizador y todas las suscripciones, liberando memoria.
   */
  destroy() {
    if (this.#timeoutId) {
      clearTimeout(this.#timeoutId);
    }
    this.#listeners.clear();
  }
}
