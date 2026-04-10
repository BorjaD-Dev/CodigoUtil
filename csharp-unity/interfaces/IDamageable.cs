/**
 * Interfaz universal para objetos que pueden recibir daño.
 * Permite que proyectiles o ataques cuerpo a cuerpo interactúen con cualquier entidad
 * sin conocer su clase específica.
 */
public interface IDamageable
{
    /**
     * Método para procesar el impacto de un ataque.
     * @param daño Cantidad de puntos de salud a restar.
     */
    void RecibirDaño(float daño);
    
    /**
     * Propiedad para consultar si la entidad ha sido derrotada.
     */
    bool EstaMuerto { get; }
}
