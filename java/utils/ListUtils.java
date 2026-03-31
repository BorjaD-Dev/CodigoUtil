package utils;

import java.util.List;
import models.Persona; // O el paquete que corresponda

/**
 * Utilidades para el manejo avanzado de listas y colecciones.
 */
public class ListUtils {

    /**
     * Busca una persona por su DNI dentro de una lista.
     * Ejemplo de lógica de búsqueda lineal reutilizable.
     */
    public static Persona buscarPorDni(List<? extends Persona> lista, String dni) {
        for (Persona p : lista) {
            if (p.getDni().equalsIgnoreCase(dni)) {
                return p;
            }
        }
        return null; // No encontrado
    }
}
