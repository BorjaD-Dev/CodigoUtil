/**
 * @fileoverview PageVisibilityAnnouncer - Utilidad nativa de accesibilidad y optimización de recursos.
 * Monitorea el estado de visibilidad de la pestaña (Page Visibility API) para adaptar la experiencia de usuario (WCAG).
 * @version 1.0.0
 * @package TealWolfStudios.CodigoUtil.Web
 */

/**
 * Clase que gestiona eventos de cambio de visibilidad con un sistema de suscripción limpio.
 * @class PageVisibilityAnnouncer
 */
export class PageVisibilityAnnouncer {
  /**
   * @private
   * @type {Map<string, Function>}
   */
  #listeners = new Map();

  /**
   * Inicializa el escucha global de visibilidad en el documento.
   */
  constructor() {
    this.#initListener();
  }

  /**
   * Configura el listener nativo del Page Visibility API.
   * @private
   */
  #initListener() {
    document.addEventListener('visibilitychange', () => {
      const isHidden = document.hidden;
      this.#listeners.forEach((callback) => {
        try {
          callback(isHidden);
        } catch (error) {
          console.error('[PageVisibilityAnnouncer] Error ejecutando callback:', error);
        }
      });
    });
  }

  /**
   * Suscribe un componente al cambio de visibilidad de la página.
   * @param {string} id - Identificador único de la suscripción.
   * @param {Function} callback - Función que recibe el estado de ocultación: (isHidden: boolean) => void.
   */
  subscribe(id, callback) {
    if (typeof callback !== 'function') {
      throw new TypeError('[PageVisibilityAnnouncer] El callback debe ser una función.');
    }
    this.#listeners.set(id, callback);
    
    // Ejecución inicial para sincronizar el estado actual del componente
    callback(document.hidden);
  }

  /**
   * Elimina una suscripción específica del registro.
   * @param {string} id - Identificador de la suscripción a remover.
   * @returns {boolean} True si fue eliminada correctamente.
   */
  unsubscribe(id) {
    return this.#listeners.delete(id);
  }

  /**
   * Limpia todas las suscripciones activas.
   */
  clear() {
    this.#listeners.clear();
  }
}
