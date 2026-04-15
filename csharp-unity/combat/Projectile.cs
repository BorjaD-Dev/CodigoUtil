using UnityEngine;

/**
 * Clase para proyectiles reciclables.
 * Utiliza el sistema de daño IDamageable y se integra con GenericObjectPool.
 */
public class Projectile : MonoBehaviour
{
    [SerializeField] private float speed = 20f;
    [SerializeField] private float damage = 10f;
    [SerializeField] private float lifetime = 3f;

    private float timer;

    private void OnEnable()
    {
        timer = lifetime;
    }

    private void Update()
    {
        transform.Translate(Vector3.forward * speed * Time.deltaTime);

        timer -= Time.deltaTime;
        if (timer <= 0) Desactivar();
    }

    private void OnTriggerEnter(Collider other)
    {
        // Usamos la interfaz que creamos para dañar a cualquier entidad
        IDamageable target = other.GetComponent<IDamageable>();
        if (target != null)
        {
            target.RecibirDaño(damage);
            Desactivar();
        }
    }

    private void Desactivar()
    {
        // En lugar de Destroy, desactivamos para que el pool lo recoja
        gameObject.SetActive(false);
    }
}
