/**
 * @fileoverview DOMObserver - Utilidad arquitectónica nativa para la gestión eficiente de mutaciones en el DOM.
 * Optimiza el rendimiento evitando listeners redundantes y facilitando la inicialización asíncrona de componentes.
 * @version 1.0.0
 * @package TealWolfStudios.CodigoUtil.Web
 */

/**
 * Clase que encapsula la API nativa MutationObserver con un enfoque modular y limpio.
 * @class DOMObserver
 */
export class DOMObserver {
  /**
   * @private
   * @type {MutationObserver|null}
   */
  #observer = null;

  /**
   * @private
   * @type {Map<string, {selector: string, callback: Function}>}
   */
  #registry = new Map();

  /**
   * Inicializa la instancia del DOMObserver y arranca la escucha en el elemento raíz.
   * @param {HTMLElement} [targetNode=document.body] - Nodo principal a observar.
   */
  constructor(targetNode = document.body) {
    if (!targetNode) return;
    this.#initObserver(targetNode);
  }

  /**
   * Configura e inicia el MutationObserver nativo.
   * @private
   * @param {HTMLElement} targetNode 
   */
  #initObserver(targetNode) {
    this.#observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          this.#checkAddedNodes(mutation.addedNodes);
        }
      });
    });

    this.#observer.observe(targetNode, {
      childList: true,
      subtree: true
    });
  }

  /**
   * Evalúa los nodos añadidos contra las consultas registradas.
   * @private
   * @param {NodeList} addedNodes 
   */
  #checkAddedNodes(addedNodes) {
    addedNodes.forEach((node) => {
      if (!(node instanceof HTMLElement)) return;

      this.#registry.forEach(({ selector, callback }, id) => {
        // Verificar si el nodo mismo o alguno de sus hijos coincide con el selector
        if (node.matches(selector)) {
          callback(node);
        } else {
          const childElement = node.querySelector(selector);
          if (childElement) callback(childElement);
        }
      });
    });
  }

  /**
   * Registra un selector para ejecutar un callback en cuanto aparezca en el DOM.
   * @param {string} id - Identificador único para la suscripción.
   * @param {string} selector - Selector CSS a buscar.
   * @param {Function} callback - Función que recibe el elemento encontrado: (element: HTMLElement) => void.
   */
  watch(id, selector, callback) {
    if (typeof callback !== 'function') {
      throw new TypeError('[DOMObserver] El callback debe ser una función ejecutable.');
    }
    this.#registry.set(id, { selector, callback });
    
    // Ejecución inmediata en caso de que el elemento ya exista en el DOM actual
    const existingElement = document.querySelector(selector);
    if (existingElement) {
      callback(existingElement);
    }
  }

  /**
   * Elimina un selector del registro de observación.
   * @param {string} id - Identificador único de la suscripción a remover.
   * @returns {boolean} True si se eliminó correctamente.
   */
  unwatch(id) {
    return this.#registry.delete(id);
  }

  /**
   * Desconecta por completo el observer del DOM y limpia los registros.
   */
  destroy() {
    if (this.#observer) {
      this.#observer.disconnect();
      this.#observer = null;
    }
    this.#registry.clear();
  }
}
