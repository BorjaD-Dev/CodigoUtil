/**
 * @file FormValidator.js
 * @description Validador modular e independiente de formularios basado en reglas configurables.
 * Optimiza la UX gestionando estados de error en tiempo real y asegurando datos limpios en el cliente.
 * @version 1.0.0
 * @author Borja <CEO & Developer>
 */

export class FormValidator {
    /**
     * Inicializa el validador asociándolo a un formulario específico.
     * @param {HTMLFormElement} formElement - Elemento del formulario en el DOM.
     * @param {Object} [options={}] - Configuraciones de diseño (clases de error).
     */
    constructor(formElement, options = {}) {
        if (!formElement) throw new Error('[FormValidator] Se requiere un formulario válido.');
        
        this.form = formElement;
        this.errorClass = options.errorClass || 'input-error';
        this.messageClass = options.messageClass || 'error-message';
        
        /** @private */
        this.rules = new Map();
        this._init();
    }

    /**
     * Configura los escuchadores de eventos interactivos para validación al vuelo.
     * @private
     */
    _init() {
        this.form.addEventListener('input', (event) => {
            const field = event.target;
            if (this.rules.has(field.name)) {
                this.validateField(field);
            }
        });
    }

    /**
     * Registra una regla de validación personalizada para un campo.
     * @param {string} fieldName - Atributo 'name' del input.
     * @param {Function} validationFn - Función callback que devuelve boolean (true si es válido).
     * @param {string} errorMessage - Mensaje que se mostrará en caso de fallo.
     * @returns {FormValidator}
     */
    addRule(fieldName, validationFn, errorMessage) {
        this.rules.set(fieldName, { validate: validationFn, message: errorMessage });
        return this; // Permite Fluent API (encadenamiento)
    }

    /**
     * Ejecuta la validación de un campo concreto y gestiona su reflejo visual en el DOM.
     * @param {HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement} field 
     * @returns {boolean} True si el campo cumple la regla.
     */
    validateField(field) {
        const rule = this.rules.get(field.name);
        if (!rule) return true;

        const isValid = rule.validate(field.value);
        
        if (!isValid) {
            this._showError(field, rule.message);
        } else {
            this._clearError(field);
        }

        return isValid;
    }

    /**
     * Valida la totalidad de los campos registrados (ideal para interceptar el evento 'submit').
     * @returns {boolean} True si todo el formulario es completamente válido.
     */
    validateAll() {
        let isFormValid = true;
        for (const fieldName of this.rules.keys()) {
            const field = this.form.elements[fieldName];
            if (field && !this.validateField(field)) {
                isFormValid = false;
            }
        }
        return isFormValid;
    }

    /**
     * Inyecta visualmente el mensaje de error de forma accesible en el DOM.
     * @private
     */
    _showError(field, message) {
        this._clearError(field);
        field.classList.add(this.errorClass);
        
        const errorContainer = document.createElement('span');
        errorContainer.className = this.messageClass;
        errorContainer.innerText = message;
        errorContainer.id = `err-${field.name}`;
        
        // Atributo ARIA para que los lectores de pantalla anuncien el error
        field.setAttribute('aria-describedby', errorContainer.id);
        field.setAttribute('aria-invalid', 'true');
        
        field.parentNode.insertBefore(errorContainer, field.nextSibling);
    }

    /**
     * Elimina los contenedores de error y restaura los atributos semánticos.
     * @private
     */
    _clearError(field) {
        field.classList.remove(this.errorClass);
        field.removeAttribute('aria-describedby');
        field.removeAttribute('aria-invalid');
        
        const nextElement = field.nextSibling;
        if (nextElement && nextElement.className === this.messageClass) {
            nextElement.remove();
        }
    }
}
