/**
 * @file GlobalStateManager.js
 * @description Manejador centralizado de estado global basado en el patrón PubSub con persistencia opcional.
 * Permite la comunicación desacoplada entre componentes independientes del frontend.
 * @version 1.0.0
 * @author Borja <CEO & Developer>
 */

export class GlobalStateManager {
    /**
     * Inicializa el almacén de estados y el registro de escuchadores.
     */
    constructor() {
        /** @type {Map<string, Set<Function>>} */
        this.subscribers = new Map();
        /** @type {Object} */
        this.state = {};
    }

    /**
     * Registra una propiedad en el estado y permite configurar persistencia en LocalStorage.
     * @param {string} key - Identificador único del estado.
     * @param {*} defaultValue - Valor inicial si no existe estado previo.
     * @param {boolean} [persist=false] - Define si se debe sincronizar automáticamente con LocalStorage.
     */
    defineState(key, defaultValue, persist = false) {
        let initialValue = defaultValue;

        if (persist) {
            try {
                const saved = localStorage.getItem(`gs_${key}`);
                if (saved !== null) initialValue = JSON.parse(saved);
            } catch (e) {
                console.error(`[GlobalState] Error al leer persistencia para "${key}":`, e);
            }
        }

        this.state[key] = {
            value: initialValue,
            persist
        };
    }

    /**
     * Obtiene de forma segura el valor actual de una propiedad del estado.
     * @param {string} key - Identificador del estado.
     * @returns {*} Valor de la propiedad o undefined si no está definida.
     */
    get(key) {
        return this.state[key] ? this.state[key].value : undefined;
    }

    /**
     * Actualiza un estado y notifica de manera asíncrona a todos sus componentes suscritos.
     * @param {string} key - Identificador del estado.
     * @param {*} newValue - Nuevo valor a asignar.
     */
    set(key, newValue) {
        if (!this.state[key]) {
            this.defineState(key, newValue);
        }

        if (this.state[key].value === newValue) return; // Evitar renderizados/notificaciones inútiles

        this.state[key].value = newValue;

        if (this.state[key].persist) {
            try {
                localStorage.setItem(`gs_${key}`, JSON.stringify(newValue));
            } catch (e) {
                console.error(`[GlobalState] Error al escribir persistencia para "${key}":`, e);
            }
        }

        this._notify(key, newValue);
    }

    /**
     * Suscribe un componente o función para reaccionar ante los cambios de un estado específico.
     * @param {string} key - Identificador del estado a observar.
     * @param {Function} callback - Función que se ejecutará al actualizarse el valor.
     * @returns {Function} Función de desuscripción para evitar fugas de memoria (Memory Leaks).
     */
    subscribe(key, callback) {
        if (!this.subscribers.has(key)) {
            this.subscribers.set(key, new Set());
        }
        this.subscribers.get(key).add(callback);

        // Retornar limpiador para desacoplar de forma segura
        return () => {
            const listeners = this.subscribers.get(key);
            if (listeners) {
                listeners.delete(callback);
                if (listeners.size === 0) this.subscribers.delete(key);
            }
        };
    }

    /**
     * Emite las actualizaciones a los escuchadores registrados.
     * @param {string} key 
     * @param {*} value 
     * @private
     */
    _notify(key, value) {
        const listeners = this.subscribers.get(key);
        if (listeners) {
            listeners.forEach(callback => {
                try {
                    callback(value);
                } catch (e) {
                    console.error(`[GlobalState] Error en ejecución de suscriptor para "${key}":`, e);
                }
            });
        }
    }
}
