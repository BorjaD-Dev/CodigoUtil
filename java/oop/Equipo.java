package models;

import java.util.ArrayList;
import java.util.List;

/**
 * Clase que representa un club de fútbol.
 * Aplica el concepto de Composición y gestión de Colecciones (ArrayList).
 */
public class Equipo {
    private String nombre;
    private Entrenador entrenador;
    private List<Jugador> plantilla;

    public Equipo(String nombre, Entrenador entrenador) {
        this.nombre = nombre;
        this.entrenador = entrenador;
        this.plantilla = new ArrayList<>();
    }

    // Métodos de gestión
    public void añadirJugador(Jugador j) {
        plantilla.add(j);
    }

    public void mostrarPlantilla() {
        System.out.println("================================");
        System.out.println("EQUIPO: " + nombre.toUpperCase());
        System.out.println("ENTRENADOR: " + entrenador.getNombre());
        System.out.println("================================");
        for (Jugador j : plantilla) {
            j.mostrarDetalles();
            System.out.println("--------------------------------");
        }
    }

    // Getters y Setters
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public Entrenador getEntrenador() { return entrenador; }
}
