/**
 * Utilidad para cargar componentes HTML reutilizables (Header/Footer).
 * Evita la duplicación de código y facilita el mantenimiento.
 */
function loadComponent(url, elementId) {
    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error(`Error al cargar ${url}`);
            return response.text();
        })
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
        })
        .catch(error => console.error('Error cargando componente:', error));
}

// Ejemplo de uso:
// loadComponent('../Html/header.html', 'main-header');
// loadComponent('../Html/footer.html', 'main-footer');
