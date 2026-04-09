using UnityEngine;

/**
 * Utilidad para instanciar objetos con efecto de "explosión" física.
 * Extraído del sistema de combate de Action Roguelite.
 */
public static class LootSpawner
{
    /**
     * Lanza un prefab con una fuerza y dirección aleatoria.
     * @param prefab El objeto a instanciar (monedas, items, etc).
     * @param posicion Punto de origen del lanzamiento.
     * @param fuerza Magnitud del impulso.
     */
    public static void LanzarObjeto(GameObject prefab, Vector3 posicion, float fuerza)
    {
        if (prefab == null) return;

        GameObject objeto = Object.Instantiate(prefab, posicion, Quaternion.identity);
        Rigidbody rb = objeto.GetComponent<Rigidbody>();

        if (rb != null)
        {
            // Dirección aleatoria hacia arriba y a los lados
            Vector3 direccion = new Vector3(
                Random.Range(-1f, 1f), 
                1.5f, 
                Random.Range(-1f, 1f)
            ).normalized;

            rb.AddForce(direccion * fuerza, ForceMode.Impulse);
            
            // Añade un giro aleatorio para que se vea más natural
            rb.AddTorque(new Vector3(Random.value, Random.value, Random.value) * 10f);
        }
    }
}
