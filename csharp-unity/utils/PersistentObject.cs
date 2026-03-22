using UnityEngine;

/**
 * Utilidad para hacer que un objeto persista entre escenas.
 * Ideal para Managers, Jugadores o sistemas de audio.
 */
public class PersistentObject : MonoBehaviour
{
    private void Awake()
    {
        // Protegemos el objeto para que viaje entre escenas sin destruirse
        DontDestroyOnLoad(this.gameObject);
    }
}
