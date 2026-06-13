/**
 * @file SafeEventEmitter.js
 * @description Gestor de eventos personalizado (Event Bus) desacoplado y seguro contra fallos.
 * Permite la comunicación inter-módulo en el frontend aislando errores de ejecución en los callbacks.
 * @version 1.0.0
 * @author Borja <CEO & Developer>
 */

export class SafeEventEmitter {
    /**
     * Inicializa el registro atómico de eventos.
     */
    constructor() {
        /** @private @type {Map<string, Set<Function>>} */
        this.events = new Map();
    }

    /**
     * Suscribe un callback a un evento específico.
     * @param {string} eventName - Nombre identificador del evento.
     * @param {Function} callback - Función a ejecutar cuando se emita el evento.
     * @returns {Function} Función de desuscripción atómica (limpiador de memoria).
     */
    on(eventName, callback) {
        if (typeof callback !== 'function') {
            throw new Error('[EventEmitter] El callback debe ser una función ejecutable.');
        }

        if (!this.events.has(eventName)) {
            this.events.set(eventName, new Set());
        }

        this.events.get(eventName).add(callback);

        // Retornar clausura limpia para desuscripción inmediata
        return () => this.off(eventName, callback);
    }

    /**
     * Remueve una suscripción específica de un evento de manera explícita.
     * @param {string} eventName - Nombre del evento.
     * @param {Function} callback - Instancia de la función a remover.
     */
    off(eventName, callback) {
        const listeners = this.events.get(eventName);
        if (!listeners) return;

        listeners.delete(callback);
        
        if (listeners.size === 0) {
            this.events.delete(eventName);
        }
    }

    /**
     * Emite un evento propagando argumentos de forma segura a todos los oyentes.
     * Si un callback falla, se captura el error y se continúa la ejecución de los demás.
     * @param {string} eventName - Nombre del evento a disparar.
     * @param {...any} args - Argumentos dinámicos que se pasarán a los callbacks.
     */
    emit(eventName, ...args) {
        const listeners = this.events.get(eventName);
        if (!listeners) return;

        // Clonar el set para evitar mutaciones en caliente durante el ciclo de emisión
        const queue = Array.from(listeners);

        queue.forEach(callback => {
            try {
                callback(...args);
            } catch (error) {
                console.error(`[EventEmitter] Error crítico en suscriptor del evento "${eventName}":`, error);
            }
        });
    }

    /**
     * Vacía por completo el registro de eventos para reiniciar el ciclo de vida del módulo.
     */
    clear() {
        this.events.clear();
    }
}
