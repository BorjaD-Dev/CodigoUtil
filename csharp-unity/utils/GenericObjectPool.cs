using System.Collections.Generic;
using UnityEngine;

/**
 * Sistema de Pooling Genérico.
 * Evolución de la lógica de colas para permitir cualquier tipo de Prefab.
 * Basado en el patrón de ObjectPoolEnemigos.cs.
 */
public abstract class GenericObjectPool : MonoBehaviour
{
    [SerializeField] protected GameObject prefab;
    [SerializeField] protected int cantidadInicial = 10;

    protected Queue<GameObject> pool = new Queue<GameObject>();

    protected virtual void Start()
    {
        // Pre-llenado de la piscina
        for (int i = 0; i < cantidadInicial; i++)
        {
            AñadirNuevoAlPool();
        }
    }

    protected GameObject AñadirNuevoAlPool()
    {
        GameObject obj = Instantiate(prefab, transform);
        obj.SetActive(false);
        pool.Enqueue(obj);
        return obj;
    }

    public virtual GameObject Obtener()
    {
        if (pool.Count > 0)
        {
            GameObject obj = pool.Dequeue();
            obj.SetActive(true);
            return obj;
        }
        
        // Expansión dinámica si la piscina se vacía
        return Instantiate(prefab, transform);
    }

    public virtual void Devolver(GameObject obj)
    {
        obj.SetActive(false);
        pool.Enqueue(obj);
    }
}
