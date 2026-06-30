package java.utils;

import java.util.ArrayDeque;
import java.util.Queue;
import java.util.function.Supplier;

/**
 * Gestor genérico y eficiente de Pool de Objetos (Object Pool Pattern).
 * Reduce la sobrecarga del Garbage Collector reutilizando instancias pesadas en memoria.
 * 
 * @author BorjaD-Dev (Teal Wolf Studios)
 * @version 1.0.0
 * @param <T> Tipo de objeto gestionado en el pool.
 */
public class ObjectPoolManager<T> {

    /**
     * Cola interna optimizada para almacenar los objetos disponibles.
     */
    private final Queue<T> availableObjects = new ArrayDeque<>();

    /**
     * Factoría proveedora para instanciar nuevos objetos cuando el pool se vacía.
     */
    private final Supplier<T> objectFactory;

    /**
     * Capacidad máxima de objetos inactivos que el pool mantendrá retenidos.
     */
    private final int maxCapacity;

    /**
     * Inicializa el pool configurando su fábrica y su límite de retención.
     * 
     * @param objectFactory Expresión lambda o referencia a método constructora: () -> new T().
     * @param maxCapacity Límite máximo de objetos alojados simultáneamente en el pool.
     * @throws IllegalArgumentException si la factoría es nula o la capacidad es menor o igual a cero.
     */
    public ObjectPoolManager(Supplier<T> objectFactory, int maxCapacity) {
        if (objectFactory == null) {
            throw new IllegalArgumentException("[ObjectPoolManager] La factoría proveedora no puede ser nula.");
        }
        if (maxCapacity <= 0) {
            throw new IllegalArgumentException("[ObjectPoolManager] La capacidad máxima debe ser mayor que cero.");
        }
        this.objectFactory = objectFactory;
        this.maxCapacity = maxCapacity;
    }

    /**
     * Solicita una instancia del objeto. Si la cola tiene elementos, reutiliza uno;
     * de lo contrario, delega en la factoría la creación de una nueva instancia.
     * 
     * @return Instancia limpia del tipo <T>.
     */
    public synchronized T acquire() {
        if (!availableObjects.isEmpty()) {
            return availableObjects.poll();
        }
        return objectFactory.get();
    }

    /**
     * Devuelve un objeto al pool para que pueda ser reutilizado en solicitudes futuras.
     * Si el pool ha alcanzado su capacidad máxima, el objeto se descarta para liberar memoria.
     * 
     * @param object Instancia a retornar al pool.
     */
    public synchronized void release(T object) {
        if (object == null) return;

        if (availableObjects.size() < maxCapacity) {
            availableObjects.offer(object);
        }
        // Si excede la capacidad, no se encola y el Garbage Collector lo procesará con normalidad
    }

    /**
     * Devuelve la cantidad de instancias inactivas listas para ser reutilizadas.
     * 
     * @return Tamaño actual de la cola de disponibles.
     */
    public synchronized int getAvailableCount() {
        return availableObjects.size();
    }

    /**
     * Vacía por completo el pool liberando las referencias almacenadas.
     */
    public synchronized void clear() {
        availableObjects.clear();
    }
}
