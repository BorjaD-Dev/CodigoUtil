/**
 * @fileoverview EscapeKeyRegistry - Gestor estructural y accesible para manejar el evento de la tecla 'Escape'.
 * Permite cerrar componentes modales, menús o desplegables de manera jerárquica (LIFO), cumpliendo con las directrices WCAG.
 * @version 1.0.0
 * @package TealWolfStudios.CodigoUtil.Web
 */

/**
 * Clase que administra una pila de callbacks para la tecla Escape, garantizando orden y aislamiento de eventos.
 * @class EscapeKeyRegistry
 */
export class EscapeKeyRegistry {
  /**
   * Pila de callbacks registrados.
   * @private
   * @type {Array<{id: string, callback: Function}>}
   */
  #stack = [];

  /**
   * Instancia única del singleton.
   * @private
   * @type {EscapeKeyRegistry|null}
   */
  static #instance = null;

  /**
   * Obtiene la instancia única global del registro (Pattern Singleton).
   * @returns {EscapeKeyRegistry}
   */
  static getInstance() {
    if (!this.#instance) {
      this.#instance = new EscapeKeyRegistry();
    }
    return this.#instance;
  }

  /**
   * Constructor privado que inicializa el listener global de teclado.
   * @private
   */
  constructor() {
    if (EscapeKeyRegistry.#instance) {
      return EscapeKeyRegistry.#instance;
    }
    this.#initGlobalListener();
  }

  /**
   * Configura el listener global en el objeto window de manera pasiva.
   * @private
   */
  #initGlobalListener() {
    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' || event.key === 'Esc') {
        this.#executeTop();
      }
    }, { passive: false });
  }

  /**
   * Ejecuta el callback que se encuentra en la cima de la pila (el último en abrirse).
   * @private
   */
  #executeTop() {
    if (this.#stack.length === 0) return;

    const target = this.#stack[this.#stack.length - 1];
    if (typeof target.callback === 'function') {
      target.callback();
    }
  }

  /**
   * Añade un callback a la cima de la pila para ser ejecutado ante la tecla Escape.
   * @param {string} id - Identificador único del componente (ej. 'modal-contacto').
   * @param {Function} callback - Función a ejecutar cuando se presione Escape.
   */
  push(id, callback) {
    if (typeof callback !== 'function') {
      throw new TypeError('[EscapeKeyRegistry] El callback provisto debe ser una función.');
    }
    
    // Evitar duplicados del mismo componente en la pila
    this.remove(id);
    
    this.#stack.push({ id, callback });
  }

  /**
   * Remueve un callback específico de la pila por su identificador.
   * @param {string} id - Identificador único del componente a remover.
   * @returns {boolean} True si el elemento existía y fue removido.
   */
  remove(id) {
    const initialLength = this.#stack.length;
    this.#stack = this.#stack.filter(item => item.id !== id);
    return this.#stack.length !== initialLength;
  }

  /**
   * Limpia por completo la pila de callbacks activos.
   */
  clear() {
    this.#stack = [];
  }
}
