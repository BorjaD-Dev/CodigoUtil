package utils;

import models.Jugador;
import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.util.List;

/**
 * Clase para gestionar la persistencia de datos en archivos de texto.
 * Demuestra el uso de FileWriters y manejo de excepciones.
 */
public class Persistencia {

    /**
     * Guarda la lista de jugadores en un archivo de texto.
     */
    public static void guardarPlantilla(String nombreArchivo, List<Jugador> plantilla) {
        try (BufferedWriter bw = new BufferedWriter(new FileWriter(nombreArchivo))) {
            for (Jugador j : plantilla) {
                // Guardamos los datos separados por comas (formato CSV simple)
                bw.write(j.getNombre() + "," + j.getDorsal() + "," + j.getPosicion());
                bw.newLine();
            }
            System.out.println("✅ Plantilla guardada correctamente en: " + nombreArchivo);
        } catch (IOException e) {
            System.err.println("❌ Error al guardar el archivo: " + e.getMessage());
        }
    }
}
