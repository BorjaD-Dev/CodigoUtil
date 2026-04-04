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
}
