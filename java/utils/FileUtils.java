package utils;

import java.io.File;

/**
 * Utilidades básicas para la gestión de archivos y directorios.
 * @author BorjaD-Dev
 */
public class FileUtils {

    /**
     * Comprueba si un archivo o carpeta existe en el sistema.
     * @param ruta Ruta del archivo
     * @return boolean true si existe
     */
    public static boolean existeArchivo(String ruta) {
        File archivo = new File(ruta);
        return archivo.exists();
    }

    /**
     * Cuenta el número total de líneas en un archivo.
     * Útil para validar tamaños de archivos de datos antes de procesarlos.
     */
    public static int contarLineas(String ruta) {
        int lineas = 0;
        try (BufferedReader reader = new BufferedReader(new FileReader(ruta))) {
            while (reader.readLine() != null) lineas++;
        } catch (IOException e) {
            return -1; // Indica error en la lectura
        }
        return lineas;
    }
}
