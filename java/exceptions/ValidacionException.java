package exceptions;

/**
 * Excepción genérica para errores de validación de datos.
 * Útil para centralizar la gestión de errores en lógica de negocio.
 * @author BorjaD-Dev
 */
public class ValidacionException extends Exception {
    private String campoAfectado;

    public ValidacionException(String mensaje, String campo) {
        super(mensaje);
        this.campoAfectado = campo;
    }

    public String getCampoAfectado() {
        return campoAfectado;
    }
}
