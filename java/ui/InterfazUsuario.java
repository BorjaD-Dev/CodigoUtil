package ui;

import java.util.Scanner;
import models.Equipo;
import logic.Simulador;
import utils.Persistencia;

/**
 * Clase que gestiona la interacción con el usuario.
 * Demuestra control de flujo mediante bucles y estructuras switch.
 */
public class InterfazUsuario {
    private Scanner sc = new Scanner(System.in);
    private Equipo equipo;
    private Simulador simulador;

    public InterfazUsuario(Equipo equipo) {
        this.equipo = equipo;
        this.simulador = new Simulador();
    }

    public void iniciar() {
        int opcion;
        do {
            System.out.println("\n--- ⚽ FOOTBALL MANAGER MENU ---");
            System.out.println("1. Ver Plantilla");
            System.out.println("2. Jugar Partido");
            System.out.println("3. Guardar Datos");
            System.out.println("0. Salir");
            System.out.print("Selecciona una opción: ");
            opcion = sc.nextInt();

            switch (opcion) {
                case 1 -> equipo.mostrarPlantilla();
                case 2 -> simulador.jugarPartido(equipo, equipo); // Ejemplo rápido
                case 3 -> Persistencia.guardarPlantilla("datos.txt", null); // Integrar con lista real
                case 0 -> System.out.println("Cerrando el gestor...");
                default -> System.out.println("❌ Opción no válida.");
            }
        } while (opcion != 0);
    }
}
