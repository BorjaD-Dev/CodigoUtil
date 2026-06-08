/**
 * @file NetworkStatusMonitor.js
 * @description Módulo de arquitectura para detectar y reaccionar a los cambios de conectividad de red del cliente.
 * Permite modularizar la respuesta de la UI ante pérdidas de conexión e hilos asíncronos persistentes.
 * @version 1.0.0
 * @author Borja <CEO & Developer>
 */

export class NetworkStatusMonitor {
    /**
     * Inicializa el monitor de red y vincula los eventos nativos del navegador.
     */
    constructor() {
        /** @private @type {Set<Function>} */
        this.listeners = new Set();
        
        this._handleStatusChange = this._handleStatusChange.bind(this);
        this._init();
    }

    /**
     * Registra los escuchadores globales de conectividad en la ventana.
     * @private
     */
    _init() {
        window.addEventListener('online', this._handleStatusChange);
        window.addEventListener('offline', this._handleStatusChange);
    }

    /**
     * Devuelve el estado actual de la conexión de red del navegador.
     * @returns {boolean} True si el navegador está conectado (online).
     */
    isOnline() {
        return navigator.onLine;
    }

    /**
     * Suscribe una función callback que se ejecutará en cada cambio de red.
     * @param {Function} callback - Función que recibe un booleano (true = online, false = offline).
     * @returns {Function} Función de desuscripción limpia para evitar fugas de memoria.
     */
    onChange(callback) {
        this.listeners.add(callback);
        
        // Ejecución inmediata inicial para sincronizar el componente llamante
        callback(this.isOnline());

        return () => {
            this.listeners.delete(callback);
        };
    }

    /**
     * Canaliza los eventos del sistema y propaga el estado a todos los oyentes de forma atómica.
     * @private
     */
    _handleStatusChange() {
        const currentStatus = this.isOnline();
        
        console.log(`[NetworkStatus] Cambio de red detectado: ${currentStatus ? 'ONLINE' : 'OFFLINE'}`);
        
        this.listeners.forEach((callback) => {
            try {
                callback(currentStatus);
            } catch (error) {
                console.error('[NetworkStatus] Error en la ejecución de un suscriptor de red:', error);
            }
        });
    }

    /**
     * Remueve completamente las suscripciones globales del ciclo de vida del navegador.
     */
    destroy() {
        window.removeEventListener('online', this._handleStatusChange);
        window.removeEventListener('offline', this._handleStatusChange);
        this.listeners.clear();
    }
}
