using UnityEngine;
using UnityEngine.Events;

/**
 * Sistema de Salud genérico y reutilizable.
 * Implementa IDamageable para permitir interacciones desacopladas.
 * Basado en la lógica de salud de EnemigoBasico.cs.
 */
public class BaseHealth : MonoBehaviour, IDamageable
{
    [Header("Ajustes de Salud")]
    [SerializeField] private float saludMaxima = 100f;
    private float saludActual;

    [Header("Eventos")]
    public UnityEvent OnDeath; // Se dispara cuando la salud llega a 0

    public bool EstaMuerto { get; private set; }

    private void Awake()
    {
        saludActual = saludMaxima;
        EstaMuerto = false;
    }

    public void RecibirDaño(float cantidad)
    {
        if (EstaMuerto) return;

        saludActual -= cantidad;
        Debug.Log($"{gameObject.name} recibió {cantidad} de daño. Salud restante: {saludActual}");

        if (saludActual <= 0)
        {
            Morir();
        }
    }

    private void Morir()
    {
        if (EstaMuerto) return;
        EstaMuerto = true;
        OnDeath?.Invoke(); // Avisa a otros sistemas (como el loot o la IA) que hemos muerto
    }
}
