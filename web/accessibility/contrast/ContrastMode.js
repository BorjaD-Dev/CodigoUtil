/* ===============================================
   MODO NOCHE/DÍA - Lógica con Persistencia
   =============================================== */
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('contrast-toggle');
    const body = document.body;
    const icon = btn.querySelector('.icon');

    // 1. Verificar si el usuario ya tenía una preferencia guardada
    if (localStorage.getItem('theme') === 'light') {
        body.classList.add('light-mode');
        if (icon) icon.innerHTML = '🌙'; // Cambia a luna si está en sol
    }

    btn.addEventListener('click', () => {
        // 2. Alternar la clase
        body.classList.toggle('light-mode');
        
        // 3. Guardar la elección y cambiar el icono
        if (body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
            if (icon) icon.innerHTML = '🌙';
        } else {
            localStorage.setItem('theme', 'dark');
            if (icon) icon.innerHTML = '☀️';
        }
    });
});
