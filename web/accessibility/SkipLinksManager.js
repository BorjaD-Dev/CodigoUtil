/**
 * @file SkipLinksManager.js
 * @description Módulo de accesibilidad universal para gestionar enlaces de salto rápido (Skip Links).
 * Permite omitir bloques repetitivos de navegación (Cumplimiento WCAG 2.1 - Criterio 2.4.1).
 * @version 1.0.0
 * @author Borja <CEO & Developer>
 */

export class SkipLinksManager {
    /**
     * Inicializa y despliega de manera automática el enlace de salto rápido en el DOM.
     * @param {string} targetId - ID del contenedor principal al que saltará el foco (ej: 'main-content').
     * @param {string} linkText - Texto accesible que leerá el usuario o lector de pantalla.
     */
    constructor(targetId = 'main-content', linkText = 'Saltar al contenido principal') {
        this.targetId = targetId;
        this.linkText = linkText;
        this.linkClass = 'skip-to-content-link';
        
        this._init();
    }

    /**
     * Orquesta la creación e inyección segura en la raíz del documento.
     * @private
     */
    _init() {
        // Evitar duplicados en renderizados dinámicos
        if (document.querySelector(`.${this.linkClass}`)) return;

        const skipLink = this._createLinkElement();
        this._injectStyles();
        
        // Inyectar estrictamente como primer elemento accesible del <body>
        document.body.insertBefore(skipLink, document.body.firstChild);
    }

    /**
     * Construye el elemento ancla con sus respectivos atributos de accesibilidad.
     * @returns {HTMLAnchorElement} Elemento configurado.
     * @private
     */
    _createLinkElement() {
        const link = document.createElement('a');
        link.href = `#${this.targetId}`;
        link.className = this.linkClass;
        link.innerText = this.linkText;

        // Asegurar comportamiento del foco al hacer clic/activar el enlace
        link.addEventListener('click', (event) => {
            const target = document.getElementById(this.targetId);
            if (target) {
                target.setAttribute('tabindex', '-1');
                target.focus();
            }
        });

        return link;
    }

    /**
     * Inyecta estilos CSS mínimos de forma programática.
     * El enlace se mantiene oculto visualmente de forma absoluta pero accesible al foco por teclado.
     * @private
     */
    _injectStyles() {
        const styleId = 'skip-links-styles';
        if (document.getElementById(styleId)) return;

        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
            .${this.linkClass} {
                position: absolute;
                top: -100px;
                left: 0;
                background: #000;
                color: #fff;
                padding: 10px 20px;
                z-index: 99999;
                transition: top 0.2s ease;
            }
            .${this.linkClass}:focus {
                top: 0;
                outline: 2px solid #ffbf00;
            }
        `;
        document.head.appendChild(style);
    }
}
