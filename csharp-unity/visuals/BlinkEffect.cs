using System.Collections;
using UnityEngine;

namespace CodigoUtil.Visuals
{
    /// <summary>
    /// Componente para feedback visual de impacto. 
    /// Cambia temporalmente los materiales a un color sólido (normalmente blanco).
    /// </summary>
    [AddComponentMenu("CodigoUtil/Visuals/Blink Effect")]
    public class BlinkEffect : MonoBehaviour
    {
        [Header("Configuración")]
        [SerializeField] private Material blinkMaterial;
        [SerializeField] private float blinkDuration = 0.1f;

        [Header("Referencias")]
        [Tooltip("Si se deja vacío, buscará todos los renderers hijos al despertar.")]
        [SerializeField] private Renderer[] targetRenderers;

        private Material[][] originalMaterials;
        private Coroutine activeBlinkCoroutine;

        private void Awake()
        {
            if (targetRenderers == null || targetRenderers.Length == 0)
                targetRenderers = GetComponentsInChildren<Renderer>();

            CacheOriginalMaterials();
        }

        private void CacheOriginalMaterials()
        {
            originalMaterials = new Material[targetRenderers.Length][];
            for (int i = 0; i < targetRenderers.Length; i++)
            {
                originalMaterials[i] = targetRenderers[i].sharedMaterials;
            }
        }

        /// <summary>
        /// Dispara el efecto de parpadeo. Conectar preferiblemente al OnDamage de BaseHealth.
        /// </summary>
        public void TriggerBlink()
        {
            if (!gameObject.activeInHierarchy) return;
            
            if (activeBlinkCoroutine != null) StopCoroutine(activeBlinkCoroutine);
            activeBlinkCoroutine = StartCoroutine(BlinkRoutine());
        }

        private IEnumerator BlinkRoutine()
        {
            ApplyBlink(true);
            yield return new WaitForSeconds(blinkDuration);
            ApplyBlink(false);
            activeBlinkCoroutine = null;
        }

        private void ApplyBlink(bool useBlinkMaterial)
        {
            for (int i = 0; i < targetRenderers.Length; i++)
            {
                if (targetRenderers[i] == null) continue;

                if (useBlinkMaterial)
                {
                    Material[] blinkArray = new Material[originalMaterials[i].Length];
                    for (int j = 0; j < blinkArray.Length; j++) blinkArray[j] = blinkMaterial;
                    targetRenderers[i].materials = blinkArray;
                }
                else
                {
                    targetRenderers[i].materials = originalMaterials[i];
                }
            }
        }

        private void OnDisable()
        {
            // Seguridad para Object Pooling: resetear materiales si el objeto vuelve al pool
            if (activeBlinkCoroutine != null)
            {
                StopCoroutine(activeBlinkCoroutine);
                ApplyBlink(false);
                activeBlinkCoroutine = null;
            }
        }
    }
}
