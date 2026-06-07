/**
 * @file LiveRegionAnnouncer.js
 * @description Gestor de zonas vivas ARIA (Aria Live Regions) para notificaciones asíncronas accesibles.
 * Permite que los lectores de pantalla anuncien cambios dinámicos en la interfaz (Cumplimiento WCAG 2.1 - Criterio 4.1.3).
 * @version 1.0.0
 * @author Borja <CEO & Developer>
 */

export class LiveRegionAnnouncer {
    /**
     * Inicializa la instancia y prepara el contenedor de alertas accesibles.
     * @param {Object} [options={}] - Parámetros de configuración del nodo.
     * @param {string} [options.containerId='aria-live-announcer'] - ID del elemento inyectado en el DOM.
     */
    constructor(options = {}) {
        this.containerId = options.containerId || 'aria-live-announcer';
        this.announcerNode = null;
        
        this._init();
    }

    /**
     * Crea e inyecta de forma segura el nodo raíz oculto visualmente pero legible por lectores.
     * @private
     */
    _init() {
        // Evitar duplicados del nodo en el ciclo de vida del frontend
        this.announcerNode = document.getElementById(this.containerId);
        
        if (!this.announcerNode) {
            this.announcerNode = document.createElement('div');
            this.announcerNode.id = this.containerId;
            
            // Atributos semánticos críticos para lectores de pantalla
            this.announcerNode.setAttribute('aria-live', 'polite');
            this.announcerNode.setAttribute('aria-atomic', 'true');
            
            // Ocultar visualmente el contenedor manteniendo su accesibilidad en el DOM
            Object.assign(this.announcerNode.style, {
                position: 'absolute',
                width: '1px',
                height: '1px',
                padding: '0',
                margin: '-1px',
                overflow: 'hidden',
                clip: 'rect(0, 0, 0, 0)',
                whiteSpace: 'nowrap',
                border: '0'
            });

            document.body.appendChild(this.announcerNode);
        }
    }

    /**
     * Envía un mensaje cortés a la región viva. El lector lo anunciará cuando el usuario termine su acción actual.
     * @param {string} message - Texto plano descriptivo del suceso en la interfaz.
     */
    announcePolite(message) {
        this._updateRegion('polite', message);
    }

    /**
     * Envía un mensaje de carácter urgente. Interrumpe de forma inmediata al lector de pantalla para notificar al usuario.
     * @param {string} message - Texto plano de alerta crítica o error del sistema.
     */
    announceAssertive(message) {
        this._updateRegion('assertive', message);
    }

    /**
     * Muta de manera limpia el contenido y los atributos de prioridad según la urgencia del suceso.
     * @param {'polite'|'assertive'} politeness - Nivel de urgencia del anuncio.
     * @param {string} message - Contenido textual.
     * @private
     */
    _updateRegion(politeness, message) {
        if (!this.announcerNode || !message.trim()) return;

        this.announcerNode.setAttribute('aria-live', politeness);
        
        // Un ligero retraso temporal limpia el buffer y fuerza la ejecución del lector de pantalla
        this.announcerNode.innerText = '';
        setTimeout(() => {
            this.announcerNode.innerText = message;
        }, 50);
    }
}
