/**
 * @fileoverview ScriptLazyLoader - Utilidad arquitectónica nativa para la carga asíncrona y diferida de scripts externos.
 * Evita la degradación del rendimiento en la carga inicial cargando dependencias bajo demanda mediante Promises.
 * @version 1.0.0
 * @package TealWolfStudios.CodigoUtil.Web
 */

/**
 * Clase que gestiona la inyección dinámica de scripts en el DOM garantizando que no se dupliquen.
 * @class ScriptLazyLoader
 */
export class ScriptLazyLoader {
  /**
   * @private
   * @type {Map<string, Promise<void>>}
   */
  #loadedScripts = new Map();

  /**
   * Carga un script externo de forma asíncrona bajo demanda.
   * @param {string} src - URL absoluta o relativa del script que se desea cargar.
   * @param {Object} [options={}] - Atributos opcionales para la etiqueta script.
   * @param {boolean} [options.async=true] - Atributo async de HTML.
   * @param {boolean} [options.defer=true] - Atributo defer de HTML.
   * @returns {Promise<void>} Promesa que se resuelve cuando el script se ha cargado e interpretado correctamente.
   */
  load(src, { async = true, defer = true } = {}) {
    if (!src) {
      return Promise.reject(new Error('[ScriptLazyLoader] El parámetro "src" es obligatorio.'));
    }

    // Si el script ya se está cargando o ya se cargó, devuelve la promesa existente para evitar duplicados
    if (this.#loadedScripts.has(src)) {
      return this.#loadedScripts.get(src);
    }

    const scriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = async;
      script.defer = defer;

      script.onload = () => resolve();
      script.onerror = () => {
        this.#loadedScripts.delete(src); // Limpiar registro si falla para permitir reintentos
        reject(new Error(`[ScriptLazyLoader] Error al cargar el script: ${src}`));
      };

      document.head.appendChild(script);
    });

    this.#loadedScripts.set(src, scriptPromise);
    return scriptPromise;
  }

  /**
   * Comprueba si un script específico ya ha sido registrado en el gestor.
   * @param {string} src - URL del script.
   * @returns {boolean}
   */
  isRegistered(src) {
    return this.#loadedScripts.has(src);
  }

  /**
   * Limpia el mapa de registro interno de scripts cargados.
   */
  clearRegistry() {
    this.#loadedScripts.clear();
  }
}
