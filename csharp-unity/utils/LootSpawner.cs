using UnityEngine;

namespace CodigoUtil.Utils
{
    /// <summary>
    /// Gestiona la instanciación y expulsión física de objetos (Loot).
    /// Extraído de la lógica original de EnemigoBasico.cs para mayor modularidad.
    /// </summary>
    public class LootSpawner : MonoBehaviour
    {
        [Header("Configuración de Físicas")]
        [SerializeField] private float fuerzaExplosion = 4f;
        [SerializeField] private float radioDispersion = 0.3f;

        /// <summary>
        /// Instancia un prefab y le aplica una fuerza física aleatoria hacia arriba.
        /// </summary>
        /// <param name="prefab">El objeto a soltar.</param>
        /// <param name="posicionBase">Punto de origen del drop.</param>
        public void SpawnLoot(GameObject prefab, Vector3 posicionBase)
        {
            if (prefab == null) return;

            // Calculamos el desplazamiento aleatorio basado en el radio de dispersión
            Vector3 desplazamiento = new Vector3(
                Random.Range(-radioDispersion, radioDispersion),
                0f,
                Random.Range(-radioDispersion, radioDispersion)
            );

            Vector3 posicionFinal = posicionBase + (Vector3.up * 0.5f) + desplazamiento;
            
            GameObject objetoInstanciado = Instantiate(prefab, posicionFinal, Quaternion.identity);
            Rigidbody rb = objetoInstanciado.GetComponent<Rigidbody>();

            if (rb != null)
            {
                // Dirección aleatoria con sesgo hacia arriba (1.5f en Y)
                Vector3 direccionImpulso = new Vector3(
                    Random.Range(-1f, 1f), 
                    1.5f, 
                    Random.Range(-1f, 1f)
                ).normalized;

                rb.AddForce(direccionImpulso * fuerzaExplosion, ForceMode.Impulse);
                
                // Aplicamos rotación aleatoria para que el drop se vea más natural
                rb.AddTorque(new Vector3(Random.value, Random.value, Random.value) * 10f);
            }
        }
    }
}
