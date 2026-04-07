package utils;

/**
 * Utilidades para la creación de interfaces de texto atractivas.
 * @author BorjaD-Dev
 */
public class MenuUtils {

    /**
     * Imprime una cabecera elegante para menús de consola.
     */
    public static void imprimirCabecera(String titulo) {
        String linea = "=".repeat(titulo.length() + 10);
        System.out.println("\n" + linea);
        System.out.println("===  " + titulo.toUpperCase() + "  ===");
        System.out.println(linea);
    }

    /**
     * Limpia visualmente la consola (simulado con saltos de línea).
     */
    public static void limpiarPantalla() {
        System.out.println("\n".repeat(50));
    }
}
