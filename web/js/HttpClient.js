/**
 * @file HttpClient.js
 * @description Cliente HTTP modular con soporte nativo para límites de tiempo (Timeout) y reintentos asíncronos.
 * Abstrae y securiza el consumo de APIs bajo un enfoque de Clean Code y resiliencia.
 * @version 1.0.0
 * @author Borja <CEO & Developer>
 */

export class HttpClient {
    /**
     * Inicializa la configuración base del cliente HTTP.
     * @param {Object} [config={}] - Opciones generales por defecto.
     * @param {string} [config.baseUrl=''] - URL base para todas las peticiones.
     * @param {Object} [config.headers={}] - Cabeceras por defecto (ej: Content-Type).
     * @param {number} [config.timeout=8000] - Tiempo máximo de espera en milisegundos antes de abortar.
     */
    constructor(config = {}) {
        this.baseUrl = config.baseUrl || '';
        this.defaultHeaders = config.headers || { 'Content-Type': 'application/json' };
        this.timeout = config.timeout || 8000;
    }

    /**
     * Realiza una petición segura utilizando el método GET.
     * @param {string} endpoint - Ruta del recurso.
     * @param {Object} [options={}] - Configuraciones adicionales o anulaciones.
     * @returns {Promise<any>} Datos formateados en JSON.
     */
    async get(endpoint, options = {}) {
        return this._request(endpoint, { ...options, method: 'GET' });
    }

    /**
     * Realiza una petición segura enviando datos utilizando el método POST.
     * @param {string} endpoint - Ruta del recurso.
     * @param {Object} body - Datos que se enviarán en el cuerpo de la petición.
     * @param {Object} [options={}] - Configuraciones adicionales.
     * @returns {Promise<any>} Respuesta JSON.
     */
    async post(endpoint, body, options = {}) {
        return this._request(endpoint, {
            ...options,
            method: 'POST',
            body: JSON.stringify(body)
        });
    }

    /**
     * Orquesta la petición envolviéndola en una frontera de control de tiempo y reintentos.
     * @private
     */
    async _request(endpoint, options, retries = 3, delay = 1000) {
        const url = `${this.baseUrl}${endpoint}`;
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), options.timeout || this.timeout);

        const config = {
            ...options,
            headers: { ...this.defaultHeaders, ...options.headers },
            signal: controller.signal
        };

        try {
            const response = await fetch(url, config);
            clearTimeout(id);

            if (!response.ok) {
                throw new Error(`[HttpClient] Error HTTP Código: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            clearTimeout(id);

            // Si el error fue por timeout o fallo de red, reintentar exponencialmente
            if (retries > 0 && (error.name === 'AbortError' || error.message.includes('Fetch'))) {
                console.warn(`[HttpClient] Fallo detectado. Reintentando en ${delay}ms... (Reintentos restantes: ${retries})`);
                await new Promise(resolve => setTimeout(resolve, delay));
                return this._request(endpoint, options, retries - 1, delay * 2);
            }

            throw error;
        }
    }
}
