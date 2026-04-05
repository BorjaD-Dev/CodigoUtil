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

    /**
     * Lee el archivo de texto y reconstruye la lista de jugadores.
     * Demuestra el uso de BufferedReader y el método split().
     */
    public static List<Jugador> cargarPlantilla(String nombreArchivo) {
        List<Jugador> jugadoresCargados = new ArrayList<>();
        
        try (BufferedReader br = new BufferedReader(new FileReader(nombreArchivo))) {
            String linea;
            while ((linea = br.readLine()) != null) {
                // Separamos los datos (Nombre, Dorsal, Posición)
                String[] datos = linea.split(",");
                if (datos.length == 3) {
                    String nombre = datos[0];
                    int dorsal = Integer.parseInt(datos[1]);
                    String posicion = datos[2];
                    
                    // Recreamos el objeto y lo añadimos a la lista
                    jugadoresCargados.add(new Jugador(nombre, 0, "S/D", posicion, dorsal));
                }
            }
            System.out.println("📂 Datos cargados correctamente desde: " + nombreArchivo);
        } catch (IOException e) {
            System.err.println("❌ Error al leer el archivo: " + e.getMessage());
        }
        return jugadoresCargados;
    }
}
