/**
 * @fileoverview MemoryCacheProvider - Proveedor de caché volátil en memoria RAM con políticas de expiración por tiempo (TTL).
 * Evita redundancia en peticiones de red y agiliza la comunicación de datos inter-módulo de alta frecuencia.
 * @version 1.0.0
 * @package TealWolfStudios.CodigoUtil.Web
 */

/**
 * Clase que gestiona el almacenamiento temporal en memoria. Implementa el patrón Singleton.
 * @class MemoryCacheProvider
 */
export class MemoryCacheProvider {
  /**
   * @private
   * @type {Map<string, {value: *, expiresAt: number}>}
   */
  #cache = new Map();

  /**
   * @private
   * @type {MemoryCacheProvider|null}
   */
  static #instance = null;

  /**
   * Obtiene la instancia única global del proveedor de caché.
   * @returns {MemoryCacheProvider}
   */
  static getInstance() {
    if (!this.#instance) {
      this.#instance = new MemoryCacheProvider();
    }
    return this.#instance;
  }

  /**
   * Constructor privado para evitar la instanciación directa externa.
   */
  constructor() {
    if (MemoryCacheProvider.#instance) {
      return MemoryCacheProvider.#instance;
    }
    MemoryCacheProvider.#instance = this;
  }

  /**
   * Almacena un elemento en la caché de memoria con un tiempo de vida definido.
   * @param {string} key - Clave única de identificación.
   * @param {*} value - Datos o referencia que se desea almacenar.
   * @param {number} [ttl=30000] - Tiempo de vida en milisegundos (por defecto 30 segundos).
   */
  set(key, value, ttl = 30000) {
    const expiresAt = Date.now() + ttl;
    this.#cache.set(key, { value, expiresAt });
  }

  /**
   * Recupera un elemento de la caché si existe y no ha expirado.
   * @param {string} key - Clave de identificación.
   * @returns {*|null} Los datos almacenados o null si no existen o han expirado.
   */
  get(key) {
    if (!this.#cache.has(key)) return null;

    const entry = this.#cache.get(key);
    
    // Verificar si el registro ha caducado
    if (Date.now() > entry.expiresAt) {
      this.#cache.delete(key); // Evicción proactiva de datos obsoletos
      return null;
    }

    return entry.value;
  }

  /**
   * Verifica la existencia y validez de una clave en caché sin alterar su estado.
   * @param {string} key - Clave de identificación.
   * @returns {boolean} True si la clave existe y es válida.
   */
  has(key) {
    if (!this.#cache.has(key)) return false;
    return Date.now() <= this.#cache.get(key).expiresAt;
  }

  /**
   * Elimina un registro de la caché explícitamente.
   * @param {string} key - Clave a eliminar.
   * @returns {boolean} True si se eliminó con éxito.
   */
  delete(key) {
    return this.#cache.delete(key);
  }

  /**
   * Elimina de forma masiva todas las entradas que hayan expirado del mapa interno.
   */
  prune() {
    const now = Date.now();
    this.#cache.forEach((entry, key) => {
      if (now > entry.expiresAt) {
        this.#cache.delete(key);
      }
    });
  }

  /**
   * Limpia la totalidad de la memoria caché de forma inmediata.
   */
  clear() {
    this.#cache.clear();
  }
}
