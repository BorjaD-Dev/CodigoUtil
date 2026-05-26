/**
 * @file ComponentLoader.js
 * @description Gestor de arquitectura modular para la carga dinámica de scripts y componentes bajo demanda.
 * Minimiza el impacto en el rendimiento de carga inicial (Lazy Loading de lógica).
 * @version 1.0.0
 * @author Borja <CEO & Developer>
 */

export class ComponentLoader {
    /**
     * Inicializa el cargador de componentes.
     */
    constructor() {
        /** @type {Map<string, {selector: string, importFn: Function}>} */
        this.registry = new Map();
    }

    /**
     * Registra un componente en el sistema de carga diferida.
     * @param {string} name - Nombre único del componente.
     * @param {string} selector - Selector CSS que determina si el componente se necesita en el DOM.
     * @param {Function} importFn - Función lambda que ejecuta el import dinámico. () => import('...')
     * @returns {ComponentLoader} Retorna la instancia para encadenamiento de métodos (Fluent API).
     */
    register(name, selector, importFn) {
        if (this.registry.has(name)) {
            console.warn(`[ComponentLoader] El componente "${name}" ya está registrado.`);
            return this;
        }
        this.registry.set(name, { selector, importFn });
        return this;
    }

    /**
     * Escanea el DOM actual y monta únicamente los módulos cuyos selectores estén presentes.
     * @returns {Promise<void>} Resoluciones de las cargas dinámicas.
     */
    async scanAndMount() {
        const activationPromises = [];

        for (const [name, config] of this.registry.entries()) {
            if (document.querySelector(config.selector)) {
                activationPromises.push(this._loadComponent(name, config));
            }
        }

        await Promise.all(activationPromises);
    }

    /**
     * Ejecuta la importación asíncrona del script de manera segura.
     * @param {string} name - Nombre del componente.
     * @param {{selector: string, importFn: Function}} config - Configuración del componente.
     * @private
     */
    async _loadComponent(name, config) {
        try {
            const module = await config.importFn();
            console.log(`[ComponentLoader] Módulo "${name}" cargado y montado con éxito.`);
            
            // Si el módulo exporta una función de inicialización por defecto, la ejecuta.
            if (module && typeof module.default === 'function') {
                module.default();
            }
        } catch (error) {
            console.error(`[ComponentLoader] Error crítico al cargar el módulo "${name}":`, error);
        }
    }
}
