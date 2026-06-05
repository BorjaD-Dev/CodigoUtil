/**
 * @file ScreenReaderSpeaker.js
 * @description Módulo de accesibilidad universal para la síntesis de voz (Text-to-Speech).
 * Permite la lectura asistida de contenidos bajo demanda cumpliendo las directrices WCAG 2.1.
 * @version 1.0.0
 * @author Borja <CEO & Developer>
 */

export class ScreenReaderSpeaker {
    /**
     * Inicializa el motor de síntesis de voz y configura los parámetros por defecto.
     * @param {string} [lang='es-ES'] - Idioma base para la locución.
     * @param {number} [rate=1.0] - Velocidad de la lectura (0.1 a 10).
     * @param {number} [pitch=1.0] - Tono de la voz (0 a 2).
     */
    constructor(lang = 'es-ES', rate = 1.0, pitch = 1.0) {
        this.synth = window.speechSynthesis;
        this.lang = lang;
        this.rate = rate;
        this.pitch = pitch;
        this.currentUtterance = null;
    }

    /**
     * Cancela cualquier lectura activa y reproduce un texto de forma inmediata.
     * @param {string} text - Contenido de texto plano que será locutado.
     */
    speak(text) {
        if (!this.synth) {
            console.warn('[ScreenReaderSpeaker] La síntesis de voz no es compatible con este navegador.');
            return;
        }

        this.stop();

        if (!text || text.trim() === '') return;

        this.currentUtterance = new SpeechSynthesisUtterance(text);
        this.currentUtterance.lang = this.lang;
        this.currentUtterance.rate = this.rate;
        this.currentUtterance.pitch = this.pitch;

        this.currentUtterance.onerror = (event) => {
            if (event.error !== 'interrupted') {
                console.error('[ScreenReaderSpeaker] Error en la línea de síntesis:', event.error);
            }
        };

        this.synth.speak(this.currentUtterance);
    }

    /**
     * Detiene de forma atómica e inmediata la locución actual y vacía la cola del sistema.
     */
    stop() {
        if (this.synth && this.synth.speaking) {
            this.synth.cancel();
        }
    }

    /**
     * Configura dinámicamente una nueva velocidad de habla.
     * @param {number} newRate 
     */
    setRate(newRate) {
        this.rate = Math.max(0.5, Math.min(newRate, 2.0));
    }
}
