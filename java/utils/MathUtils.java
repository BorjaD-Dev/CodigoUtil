package utils;

/**
 * Utilidades matemáticas para lógica de juegos y estadísticas.
 */
public class MathUtils {

    /**
     * Calcula el porcentaje de éxito basado en victorias y total de partidos.
     */
    public static double calcularPorcentajeVictoria(int victorias, int totalPartidos) {
        if (totalPartidos == 0) return 0.0;
        return ((double) victorias / totalPartidos) * 100;
    }
}
