/**
 * @fileoverview HapticFeedbackManager - Utilidad nativa de accesibilidad física y cognitiva.
 * Envuelve la API de vibración de manera segura para proporcionar feedback táctil como confirmación de acciones (WCAG).
 * @version 1.0.0
 * @package TealWolfStudios.CodigoUtil.Web
 */

/**
 * Clase que gestiona patrones de vibración háptica con control de preferencias del sistema.
 * @class HapticFeedbackManager
 */
export class HapticFeedbackManager {
  /**
   * @private
   * @type {boolean}
   */
  #hasSupport = false;

  /**
   * Inicializa el gestor y comprueba la disponibilidad de la API en el hardware del cliente.
   */
  constructor() {
    this.#hasSupport = typeof window !== 'undefined' && 'vibrate' in navigator;
  }

  /**
   * Ejecuta una vibración corta e imperceptible ideal para el foco o la pulsación de un botón de gran formato.
   */
  triggerSoft() {
    if (!this.#hasSupport) return;
    navigator.vibrate(10);
  }

  /**
   * Ejecuta una vibración de éxito táctil (doble pulso sutil) para confirmación de acciones válidas.
   */
  triggerSuccess() {
    if (!this.#hasSupport) return;
    navigator.vibrate([15, 30, 15]);
  }

  /**
   * Ejecuta una vibración de alerta/error para advertir de fallos o bloqueos de validación en el formulario.
   */
  triggerError() {
    if (!this.#hasSupport) return;
    navigator.vibrate([60, 50, 60]);
  }

  /**
   * Permite inyectar patrones personalizados evaluando de forma segura el estado de accesibilidad.
   * @param {number|number[]} pattern - Patrón de milisegundos de vibración/pausa.
   */
  triggerCustom(pattern) {
    if (!this.#hasSupport) return;
    navigator.vibrate(pattern);
  }

  /**
   * Detiene de inmediato cualquier vibración activa en el dispositivo.
   */
  stop() {
    if (!this.#hasSupport) return;
    navigator.vibrate(0);
  }
}
