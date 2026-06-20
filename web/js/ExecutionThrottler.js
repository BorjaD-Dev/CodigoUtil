/**
 * @fileoverview ExecutionThrottler - Utilidad arquitectónica avanzada de optimización de rendimiento.
 * Implementa control de flujo de ejecución (Throttling) con retención de última llamada y desmantelamiento limpio.
 * @version 1.0.0
 * @package TealWolfStudios.CodigoUtil.Web
 */

/**
 * Clase que genera envoltorios controlados por tiempo para mitigar la sobrecarga del hilo principal en eventos críticos.
 * @class ExecutionThrottler
 */
export class ExecutionThrottler {
  /**
   * Crea una función regulada (throttled) que solo se ejecuta una vez por cada período de tiempo especificado.
   * @param {Function} callback - Función original que se desea regular.
   * @param {number} limit - Intervalo de tiempo mínimo entre ejecuciones en milisegundos.
   * @returns {Function} El envoltorio optimizado con métodos de control `.cancel()`.
   */
  static create(callback, limit) {
    if (typeof callback !== 'function') {
      throw new TypeError('[ExecutionThrottler] El parámetro callback debe ser una función.');
    }

    let inThrottle = false;
    let lastResult = null;
    let timeoutId = null;
    let lastArgs = null;

    /**
     * Envoltorio interno que intercepta las llamadas.
     */
    const throttledFunction = function(...args) {
      if (!inThrottle) {
        lastResult = callback.apply(this, args);
        inThrottle = true;
        
        timeoutId = setTimeout(() => {
          inThrottle = false;
          if (lastArgs) {
            callback.apply(this, lastArgs);
            lastArgs = null;
          }
        }, limit);
      } else {
        lastArgs = args;
      }
      
      return lastResult;
    };

    /**
     * Cancela cualquier temporizador activo y libera las referencias en memoria.
     */
    throttledFunction.cancel = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      inThrottle = false;
      lastArgs = null;
      lastResult = null;
    };

    return throttledFunction;
  }
}
