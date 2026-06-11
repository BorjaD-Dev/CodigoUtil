/**
 * @file HashRouter.js
 * @description Enrutador frontend ultra ligero basado en hashes de URL para aplicaciones Single Page (SPA).
 * Abstrae y automatiza la navegación del lado del cliente mediante un enfoque modular de eventos nativos.
 * @version 1.0.0
 * @author Borja <CEO & Developer>
 */

export class HashRouter {
    /**
     * Inicializa el enrutador frontend.
     */
    constructor() {
        /** @private @type {Map<string, Function>} */
        this.routes = new Map();
        /** @private @type {Function|null} */
        this.notFoundHandler = null;

        this._handleHashChange = this._handleHashChange.bind(this);
        this._init();
    }

    /**
     * Instala el escuchador global del ciclo de vida de navegación del navegador.
     * @private
     */
    _init() {
        window.addEventListener('hashchange', this._handleHashChange);
        // Disparar la evaluación inicial al cargar la página por primera vez
        window.addEventListener('DOMContentLoaded', this._handleHashChange);
    }

    /**
     * Registra una ruta específica asociada a una función de renderizado o callback.
     * @param {string} path - El fragmento de ruta hash (ej: '/home', '/perfil').
     * @param {Function} callback - Acción que se ejecutará al emparejar la ruta.
     * @returns {HashRouter} Retorna la instancia para encadenamiento (Fluent API).
     */
    addRoute(path, callback) {
        const sanitizedPath = this._sanitizePath(path);
        this.routes.set(sanitizedPath, callback);
        return this;
    }

    /**
     * Establece el manejador por defecto en caso de que la ruta solicitada no esté registrada (Error 404).
     * @param {Function} callback 
     */
    setNotFound(callback) {
        this.notFoundHandler = callback;
    }

    /**
     * Navega programáticamente hacia un hash específico de la aplicación.
     * @param {string} path - Ruta de destino.
     */
    navigateTo(path) {
        window.location.hash = this._sanitizePath(path);
    }

    /**
     * Intercepta el cambio en la URL, extrae el fragmento activo y despacha el callback adecuado.
     * @private
     */
    _handleHashChange() {
        const currentHash = window.location.hash || '#/';
        const sanitizedPath = this._sanitizePath(currentHash.replace('#', ''));

        const handler = this.routes.get(sanitizedPath);

        if (handler) {
            try {
                handler();
            } catch (error) {
                console.error(`[HashRouter] Error en la ejecución de la ruta "${sanitizedPath}":`, error);
            }
        } else if (this.notFoundHandler) {
            this.notFoundHandler();
        } else {
            console.warn(`[HashRouter] Ruta no encontrada y sin manejador 404 asignado: ${sanitizedPath}`);
        }
    }

    /**
     * Normaliza los fragmentos de texto para evitar inconsistencias con barras diagonales.
     * @param {string} path 
     * @returns {string} Ruta formateada.
     * @private
     */
    _sanitizePath(path) {
        let clean = path.trim();
        if (!clean.startsWith('/')) clean = '/' + clean;
        if (clean.endsWith('/') && clean.length > 1) clean = clean.slice(0, -1);
        return clean;
    }

    /**
     * Remueve los escuchadores del entorno global antes de destruir el ciclo del objeto.
     */
    destroy() {
        window.removeEventListener('hashchange', this._handleHashChange);
        window.removeEventListener('DOMContentLoaded', this._handleHashChange);
        this.routes.clear();
    }
}
