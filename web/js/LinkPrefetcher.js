/**
 * @fileoverview LinkPrefetcher - Utilidad de optimización arquitectónica nativa para la precarga de recursos en segundo plano.
 * Utiliza IntersectionObserver y la etiqueta <link rel="prefetch"> para acelerar de forma reactiva la navegación.
 * @version 1.0.0
 * @package TealWolfStudios.CodigoUtil.Web
 */

/**
 * Clase que escanea e inyecta directivas de precarga para enlaces visibles en el viewport.
 * @class LinkPrefetcher
 */
export class LinkPrefetcher {
  /**
   * @private
   * @type {IntersectionObserver|null}
   */
  #observer = null;

  /**
   * @private
   * @type {Set<string>}
   */
  #prefetchedUrls = new Set();

  /**
   * Inicializa el motor de precarga reactivo.
   * @param {Object} [options={}] - Configuración del componente.
   * @param {HTMLElement} [options.root=null] - Contenedor raíz para la observación.
   * @param {string} [options.selector='a[href^="/"]'] - Filtro de enlaces (por defecto internos).
   */
  constructor({ root = null, selector = 'a[href^="/"]' } = {}) {
    if (!('IntersectionObserver' in window)) return;
    this.#initObserver(root, selector);
  }

  /**
   * Configura e inicia el IntersectionObserver para detectar enlaces en pantalla.
   * @private
   * @param {HTMLElement|null} root 
   * @param {string} selector 
   */
  #initObserver(root, selector) {
    this.#observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const link = entry.target;
          const url = link.getAttribute('href');

          if (url && !this.#prefetchedUrls.has(url)) {
            this.#prefetch(url);
          }
          
          // Dejar de observar una vez procesado para liberar recursos
          this.#observer.unobserve(link);
        }
      });
    }, { root, rootMargin: '0px', threshold: 0.1 });

    this.scan(selector);
  }

  /**
   * Inyecta la etiqueta de precarga en el head del documento.
   * @private
   * @param {string} url 
   */
  #prefetch(url) {
    this.#prefetchedUrls.add(url);

    const linkElem = document.createElement('link');
    linkElem.rel = 'prefetch';
    linkElem.href = url;
    linkElem.as = 'document';

    document.head.appendChild(linkElem);
  }

  /**
   * Escanea el DOM actual en busca de nuevos enlaces que cumplan el criterio de selección.
   * @param {string} selector - Selector CSS de los enlaces a monitorizar.
   */
  scan(selector) {
    if (!this.#observer) return;
    
    const links = document.querySelectorAll(selector);
    links.forEach((link) => {
      // Ignorar descargas o enlaces con targets externos explícitos
      if (link.hasAttribute('download') || link.getAttribute('target') === '_blank') return;
      this.#observer.observe(link);
    });
  }

  /**
   * Desconecta el observador y vacía el registro de URLs cacheadas.
   */
  destroy() {
    if (this.#observer) {
      this.#observer.disconnect();
      this.#observer = null;
    }
    this.#prefetchedUrls.clear();
  }
}
