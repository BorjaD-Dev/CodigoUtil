using UnityEngine;

/**
 * Utilidades para la manipulación de Transforms y rotaciones.
 * Extraído de la lógica de orientación de EnemigoBasico.
 */
public static class TransformUtils
{
    /**
     * Hace que un objeto mire hacia un objetivo pero manteniendo su eje Y bloqueado.
     * Evita que el modelo se incline hacia arriba o abajo (ideal para enemigos terrestres).
     * @param transform El transform que rotará.
     * @param objetivo El transform al que queremos mirar.
     */
    public static void LookAtLockedY(Transform transform, Transform objetivo)
    {
        if (objetivo == null) return;

        // Creamos una posición virtual a la misma altura que el objeto actual
        Vector3 posicionSombra = new Vector3(
            objetivo.position.x, 
            transform.position.y, 
            objetivo.position.z
        );

        // Orientamos el objeto hacia esa sombra
        transform.LookAt(posicionSombra);
    }
}
