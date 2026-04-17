using UnityEngine;
using UnityEngine.Events;

namespace CodigoUtil.Health
{
    /// <summary>
    /// Componente de salud modular y agnóstico.
    /// Gestiona vida, muerte y eventos de daño.
    /// </summary>
    public class BaseHealth : MonoBehaviour
    {
        [Header("Configuración de Vida")]
        [SerializeField] private float maxHealth = 100f;
        private float currentHealth;

        [Header("Eventos")]
        public UnityEvent OnDamageTaken;
        public UnityEvent OnDeath;

        public bool IsDead { get; private set; }

        private void OnEnable()
        {
            currentHealth = maxHealth;
            IsDead = false;
        }

        public void TakeDamage(float amount)
        {
            if (IsDead) return;

            currentHealth -= amount;
            OnDamageTaken?.Invoke(); // Aquí conectarás el BlinkEffect

            if (currentHealth <= 0)
            {
                Die();
            }
        }

        private void Die()
        {
            IsDead = true;
            OnDeath?.Invoke();
        }
    }
}
