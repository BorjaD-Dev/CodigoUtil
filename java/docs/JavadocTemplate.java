package docs;

/**
 * PLANTILLA DE DOCUMENTACIÓN ESTÁNDAR
 * * @author BorjaD-Dev
 * @param <T> Ejemplo de tipo genérico
 */
public class JavadocTemplate<T> {

    /**
     * Descripción breve del método.
     * * @param parametro Explicación de lo que recibe
     * @return Explicación de lo que devuelve
     * @throws Exception Explicación de cuándo falla
     */
    public String ejemploMetodo(String parametro) throws Exception {
        return "Hola " + parametro;
    }
}
