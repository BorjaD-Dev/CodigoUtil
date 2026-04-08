package models;

/**
 * Representa a un jugador de fútbol dentro del sistema.
 * Gestiona tanto sus datos personales como sus estadísticas deportivas.
 * * @author BorjaD-Dev
 * @version 1.0
 */
public class Jugador extends Persona {
    private String posicion;
    private int dorsal;

    /**
     * Constructor principal para la creación de un jugador.
     * @param nombre Nombre completo del futbolista.
     * @param edad Edad actual.
     * @param dni Documento de identidad.
     * @param posicion Lugar que ocupa en el campo (ej: Delantero).
     * @param dorsal Número de camiseta (1-99).
     */
    public Jugador(String nombre, int edad, String dni, String posicion, int dorsal) {
        super(nombre, edad, dni);
        this.posicion = posicion;
        this.dorsal = dorsal;
    }

    /**
     * Obtiene la posición táctica del jugador.
     * @return String con la posición actual.
     */
    public String getPosicion() { return posicion; }
}
