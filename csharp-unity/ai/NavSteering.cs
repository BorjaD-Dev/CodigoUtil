using UnityEngine;
using UnityEngine.AI;

/**
 * Controlador de navegación para agentes NavMesh.
 * Optimiza y asegura el movimiento extraído de EnemigoBasico.cs.
 */
[RequireComponent(typeof(NavMeshAgent))]
public class NavSteering : MonoBehaviour
{
    private NavMeshAgent agente;

    private void Awake()
    {
        agente = GetComponent<NavMeshAgent>();
    }

    /**
     * Establece un nuevo objetivo de forma segura.
     * @param posicion Punto en el mundo al que queremos ir.
     */
    public void IrAPunto(Vector3 posicion)
    {
        // Solo asignamos si el agente está activo y sobre una superficie válida
        if (agente.isOnNavMesh && agente.isActiveAndEnabled)
        {
            agente.SetDestination(posicion);
        }
    }

    /**
     * Detiene el movimiento del agente de forma inmediata.
     */
    public void Detener()
    {
        if (agente.isOnNavMesh)
        {
            agente.isStopped = true;
            agente.ResetPath();
        }
    }
}
