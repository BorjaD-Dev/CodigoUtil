package utils;

import java.util.Random;

/**
 * Utilidades para la generación de datos aleatorios.
 * Útil para simuladores, juegos y generación de datos de prueba.
 * * @author BorjaD-Dev
 */
public class RandomUtils {
    private static Random rnd = new Random();

    /**
     * Genera un número entero aleatorio entre un rango (ambos incluidos).
     * @param min Valor mínimo
     * @param max Valor máximo
     * @return int número aleatorio
     */
    public static int generarNumero(int min, int max) {
        return rnd.nextInt((max - min) + 1) + min;
    }
}
