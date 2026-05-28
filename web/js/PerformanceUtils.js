/**
 * @file PerformanceUtils.js
 * @description Módulo de utilidades de alto rendimiento para el control de frecuencia de funciones.
 * Optimiza la ejecución de callbacks en eventos de alta densidad (Scroll, Resize, Keyup).
 * @version 1.0.0
 * @author Borja <CEO & Developer>
 */

/**
 * Crea una función retrasada (Debounce) que pospone la ejecución del callback hasta que 
 * hayan transcurrido N milisegundos desde la última vez que fue invocada.
 * 
 * @param {Function} callback - Función que se desea ejecutar de forma controlada.
 * @param {number} delay - Tiempo de espera en milisegundos.
 * @returns {Function} Función optimizada con mecanismo de temporizador interno.
 */
export function debounce(callback, delay) {
    let timerId = null;

    return function (...args) {
        if (timerId) {
            clearTimeout(timerId);
        }

        timerId = setTimeout(() => {
            callback.apply(this, args);
            timerId = null;
        }, delay);
    };
}

/**
 * Crea una función regulada (Throttle) que garantiza que el callback solo se ejecute
 * una vez cada N milisegundos, ignorando las llamadas intermedias.
 * 
 * @param {Function} callback - Función que se desea regular.
 * @param {number} limit - Intervalo de tiempo mínimo entre ejecuciones en milisegundos.
 * @returns {Function} Función optimizada con bandera de bloqueo temporal.
 */
export function throttle(callback, limit) {
    let inThrottle = false;

    return function (...args) {
        if (!inThrottle) {
            callback.apply(this, args);
            inThrottle = true;
            
            setTimeout(() => {
                inThrottle = false;
            }, limit);
        }
    };
}
