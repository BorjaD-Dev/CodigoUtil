/**
 * @fileoverview SystemThemeSync - Utilidad nativa de accesibilidad y adaptación contextual del entorno.
 * Sincroniza y reacciona de forma automática a las preferencias de tema (oscuro/claro) configuradas en el S.O. (WCAG).
 * @version 1.0.0
 * @package TealWolfStudios.CodigoUtil.Web
 */

/**
 * Clase que monitoriza las variables de entorno de color del sistema mediante matchMedia.
 * @class SystemThemeSync
 */
export class SystemThemeSync {
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
   * Inicializa el monitor de consultas multimedia del sistema operativo.
   */
  constructor() {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    this.#mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this.#initListener();
  }

  /**
   * Configura la escucha nativa sobre los cambios de preferencia del sistema.
   * @private
   */
  #initListener() {
    if (!this.#mediaQuery) return;

    // Soporte para navegadores modernos y retrocompatibilidad
    const handler = (event) => this.#notifyAll(event.matches);
    if (this.#mediaQuery.addEventListener) {
      this.#mediaQuery.addEventListener('change', handler);
    } else {
      this.#mediaQuery.addListener(handler);
    }
  }

  /**
   * Envía la actualización a todos los suscriptores.
   * @private
   * @param {boolean} isDark 
   */
  #notifyAll(isDark) {
    this.#listeners.forEach((callback) => {
      try {
        callback(isDark);
      } catch (error) {
        console.error('[SystemThemeSync] Error en callback de suscripción:', error);
      }
    });
  }

  /**
   * Obtiene de forma síncrona el estado actual del esquema de color.
   * @returns {boolean} True si el sistema operativo está en modo oscuro.
   */
  get isDarkModeActive() {
    return this.#mediaQuery ? this.#mediaQuery.matches : false;
  }

  /**
   * Registra un callback para reaccionar inmediatamente al cambio de tema del sistema.
   * @param {string} id - Identificador único de suscripción.
   * @param {Function} callback - Función receptora del estado: (isDark: boolean) => void.
   */
  subscribe(id, callback) {
    if (typeof callback !== 'function') {
      throw new TypeError('[SystemThemeSync] El callback provisto debe ser una función.');
    }
    this.#listeners.set(id, callback);
    
    // Invocación de sincronización inicial
    callback(this.isDarkModeActive);
  }

  /**
   * Remueve un callback del gestor reactivo.
   * @param {string} id - Identificador único a remover.
   * @returns {boolean} True si existía y fue eliminado.
   */
  unsubscribe(id) {
    return this.#listeners.delete(id);
  }

  /**
   * Limpia las referencias en memoria.
   */
  destroy() {
    this.#listeners.clear();
  }
}
