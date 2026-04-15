using UnityEngine;

/**
 * Pool específico para proyectiles.
 * Implementa el patrón Singleton para facilitar el acceso global.
 */
public class ProjectilePool : GenericObjectPool
{
    public static ProjectilePool Instance { get; private set; }

    private void Awake()
    {
        if (Instance == null) Instance = this;
        else Destroy(gameObject);
    }

    /**
     * Facilita el disparo desde cualquier script:
     * ProjectilePool.Instance.Lanzar(pos, rot);
     */
    public void Lanzar(Vector3 posicion, Quaternion rotacion)
    {
        GameObject bala = Obtener();
        bala.transform.position = posicion;
        bala.transform.rotation = rotacion;
    }
}
