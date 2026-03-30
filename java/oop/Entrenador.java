package models;

/**
 * Clase que representa al cuerpo técnico.
 * Hereda de Persona y añade especialización en táctica y experiencia.
 */
public class Entrenador extends Persona {
    private int añosExperiencia;
    private String estrategiaFavorita;

    public Entrenador(String nombre, int edad, String dni, int añosExperiencia, String estrategiaFavorita) {
        super(nombre, edad, dni);
        this.añosExperiencia = añosExperiencia;
        this.estrategiaFavorita = estrategiaFavorita;
    }

    // Getters y Setters
    public int getAñosExperiencia() { return añosExperiencia; }
    public void setAñosExperiencia(int años) { this.añosExperiencia = años; }

    public String getEstrategiaFavorita() { return estrategiaFavorita; }
    public void setEstrategiaFavorita(String estrategia) { this.estrategiaFavorita = estrategia; }

    /**
     * Implementación polimórfica del método de Persona.
     */
    @Override
    public void mostrarDetalles() {
        System.out.println("--- FICHA TÉCNICA: ENTRENADOR ---");
        System.out.println(this.toString());
        System.out.println("Experiencia: " + añosExperiencia + " años");
        System.out.println("Sistema Táctico: " + estrategiaFavorita);
    }
}
