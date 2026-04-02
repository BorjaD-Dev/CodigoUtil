package utils;

import java.util.Scanner;

/**
 * Utilidades para mejorar la experiencia de usuario en aplicaciones de consola.
 * @author BorjaD-Dev
 */
public class ConsoleUtils {
    private static Scanner sc = new Scanner(System.in);

    /**
     * Detiene la ejecución del programa hasta que el usuario pulsa 'Enter'.
     */
    public static void esperarEnter() {
        System.out.println("\n[Presiona ENTER para continuar...]");
        sc.nextLine();
    }
}
