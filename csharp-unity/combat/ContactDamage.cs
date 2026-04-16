using UnityEngine;

/**
 * Componente genérico para aplicar daño por colisión.
 * Extraído de la lógica de ataque de EnemigoBasico.cs.
 */
public class ContactDamage : MonoBehaviour
{
    [SerializeField] private float cantidadDaño = 10f;
    [SerializeField] private string tagObjetivo = "Player";

    private void OnCollisionStay(Collision collision)
    {
        // Verificamos si es el objetivo correcto por Tag o por componente
        if (collision.gameObject.CompareTag(tagObjetivo))
        {
            // Buscamos la interfaz de daño en el objeto o sus padres
            IDamageable salud = collision.gameObject.GetComponentInParent<IDamageable>();
            
            if (salud != null && !salud.EstaMuerto)
            {
                salud.RecibirDaño(cantidadDaño);
            }
        }
    }
}
