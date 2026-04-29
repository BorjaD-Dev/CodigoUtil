using UnityEngine;

namespace CodigoUtil.Utils
{
    /// <summary>
    /// Clase base para el patrón Singleton en MonoBehaviour.
    /// Optimiza el acceso a Managers evitando búsquedas costosas en la jerarquía.
    /// </summary>
    /// <typeparam name="T">Tipo de la clase que hereda.</typeparam>
    public abstract class Singleton<T> : MonoBehaviour where T : MonoBehaviour
    {
        private static T _instance;

        public static T Instance
        {
            get
            {
                if (_instance == null)
                {
                    _instance = FindFirstObjectByType<T>();
                    
                    if (_instance == null)
                    {
                        GameObject go = new GameObject(typeof(T).Name);
                        _instance = go.AddComponent<T>();
                    }
                }
                return _instance;
            }
        }

        protected virtual void Awake()
        {
            if (_instance == null)
            {
                _instance = this as T;
                // Si el script PersistentObject.cs está en uso, se puede integrar aquí
                // DontDestroyOnLoad(gameObject); 
            }
            else if (_instance != this)
            {
                Destroy(gameObject);
            }
        }
    }
}
