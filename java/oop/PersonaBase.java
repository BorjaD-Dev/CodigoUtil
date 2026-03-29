package oop;

/**
 * SNIPPET: Clase Abstracta Base
 * Útil para: Estructuras de Herencia en DAM (Personas, Productos, Entidades).
 */
public abstract class BaseEntity {
    private String nombre;
    private String id;

    public BaseEntity(String nombre, String id) {
        this.nombre = nombre;
        this.id = id;
    }

    // Getters y Setters (Encapsulación)
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    /**
     * Obliga a las subclases a implementar su propia visualización.
     */
    public abstract void mostrarInfo();
}
