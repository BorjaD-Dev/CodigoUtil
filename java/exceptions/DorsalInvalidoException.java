package exceptions;

/**
 * Excepción personalizada para controlar errores en la asignación de dorsales.
 * Demuestra el uso de herencia de la clase Exception.
 */
public class DorsalInvalidoException extends Exception {
    
    public DorsalInvalidoException(int dorsal) {
        super("❌ El dorsal " + dorsal + " no es válido. Debe estar entre 1 y 99.");
    }
}
