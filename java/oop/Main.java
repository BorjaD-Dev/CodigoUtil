import models.*;
import logic.Simulador;

public class Main {
    public static void main(String[] args) {
        // 1. Crear el cuerpo técnico
        Entrenador mister = new Entrenador("Pep Guardiola", 52, "12345678A", 20, "4-3-3");

        // 2. Crear el equipo
        Equipo miEquipo = new Equipo("Manchester City", mister);

        // 3. Añadir jugadores (Composición)
        miEquipo.añadirJugador(new Jugador("Erling Haaland", 23, "88888888B", "Delantero", 9));
        miEquipo.añadirJugador(new Jugador("Kevin De Bruyne", 32, "77777777C", "Centrocampista", 17));
        miEquipo.añadirJugador(new Jugador("Rodri", 27, "66666666D", "Pivote", 16));

        // 4. Mostrar información inicial
        miEquipo.mostrarPlantilla();

        // 5. Simular un partido (Interacción entre objetos)
        Equipo rival = new Equipo("Real Madrid", new Entrenador("Ancelotti", 64, "11111111E", 30, "4-4-2"));
        
        Simulador partido = new Simulador();
        partido.jugarPartido(miEquipo, rival);
    }
}
