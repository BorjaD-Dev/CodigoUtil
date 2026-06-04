/**
 * @file CacheManager.js
 * @description Proveedor de almacenamiento intermedio (Caching) sobre Web Storage API con soporte de expiración (TTL).
 * Optimiza el ancho de banda y mitiga la latencia de carga reutilizando recursos temporales de manera segura.
 * @version 1.0.0
 * @author Borja <CEO & Developer>
 */

export class CacheManager {
    /**
     * Inicializa el gestor de caché configurando el motor de almacenamiento base.
     * @param {boolean} [useSessionStorage=false] - Si es true, utiliza sessionStorage en lugar de localStorage.
     */
    constructor(useSessionStorage = false) {
        /** @private */
        this.storage = useSessionStorage ? window.sessionStorage : window.localStorage;
    }

    /**
     * Guarda un elemento en el almacenamiento local asociándole un tiempo de expiración.
     * @param {string} key - Identificador único del registro.
     * @param {*} value - Datos a guardar (objetos, arrays, strings, etc.).
     * @param {number} ttlInSeconds - Tiempo de vida del registro en segundos (Time To Live).
     */
    set(key, value, ttlInSeconds) {
        const now = Date.now();
        const item = {
            data: value,
            expiry: now + (ttlInSeconds * 1000)
        };

        try {
            this.storage.setItem(key, JSON.stringify(item));
        } catch (error) {
            console.error(`[CacheManager] Error al escribir la clave "${key}" en el almacenamiento:`, error);
        }
    }

    /**
     * Recupera un elemento del almacenamiento intermedio. Si ha expirado, lo elimina automáticamente.
     * @param {string} key - Identificador del registro.
     * @returns {*|null} Los datos almacenados o null si no existen o han caducado.
     */
    get(key) {
        const rawItem = this.storage.getItem(key);
        
        if (!rawItem) return null;

        try {
            const item = JSON.parse(rawItem);
            const now = Date.now();

            // Verificar si el registro ha superado su fecha de expiración
            if (now > item.expiry) {
                this.delete(key);
                console.log(`[CacheManager] La clave "${key}" ha expirado y ha sido invalidada.`);
                return null;
            }

            return item.data;
        } catch (error) {
            console.error(`[CacheManager] Error al parsear el registro de la clave "${key}":`, error);
            return null;
        }
    }

    /**
     * Elimina un registro específico del almacenamiento intermedio de manera atómica.
     * @param {string} key - Identificador del registro a remover.
     */
    delete(key) {
        this.storage.removeItem(key);
    }

    /**
     * Vacía por completo todo el contenido del motor de almacenamiento seleccionado.
     */
    clear() {
        this.storage.clear();
    }
}
