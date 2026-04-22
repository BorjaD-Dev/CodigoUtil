using System.Collections.Generic;
using UnityEngine;

namespace CodigoUtil.Utils
{
    /// <summary>
    /// Base para cualquier sistema de Pooling. 
    /// Optimiza la memoria evitando Instantiate/Destroy constantes.
    /// </summary>
    public abstract class GenericObjectPool : MonoBehaviour
    {
        [Header("Configuración del Pool")]
        [SerializeField] protected GameObject prefab;
        [SerializeField] private int cantidadInicial = 10;

        protected Queue<GameObject> pool = new Queue<GameObject>();

        protected virtual void Start()
        {
            for (int i = 0; i < cantidadInicial; i++)
            {
                CrearNuevoObjeto();
            }
        }

        protected GameObject CrearNuevoObjeto()
        {
            GameObject obj = Instantiate(prefab, transform);
            obj.SetActive(false);
            pool.Enqueue(obj);
            return obj;
        }

        public virtual GameObject Obtener()
        {
            GameObject obj = (pool.Count > 0) ? pool.Dequeue() : Instantiate(prefab, transform);
            obj.SetActive(true);
            return obj;
        }

        public virtual void Devolver(GameObject obj)
        {
            obj.SetActive(false);
            pool.Enqueue(obj);
        }
    }
}
