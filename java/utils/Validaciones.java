package utils;

import java.util.Scanner;

/**
 * Biblioteca de utilidades para validación de entradas por consola.
 * Ideal para proyectos de DAM y aplicaciones de gestión.
 */
public class Validaciones {

    private static Scanner sc = new Scanner(System.in);

    /**
     * Asegura la captura de un valor numérico dentro de un margen permitido.
     *
     * @param min Valor inferior.
     * @param max Valor superior.
     * @return Valor filtrado y validado.
     */
    public static int validarOpcion(int min, int max) {
        int opcion = -1;
        boolean valida = false;
        while (!valida) {
            try {
                System.out.print("Selecciona una opción (" + min + "-" + max + "): ");
                opcion = Integer.parseInt(sc.nextLine());
                if (opcion >= min && opcion <= max) {
                    valida = true;
                } else {
                    System.out.println("Error: Opción fuera de rango.");
                }
            } catch (NumberFormatException e) {
                System.out.println("Error: Introduce un número válido.");
            }
        }
        return opcion;
    }
}
